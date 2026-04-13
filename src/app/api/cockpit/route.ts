import { NextResponse } from 'next/server';
import {
  getAccounts,
  getAdsWithUrls,
  getAudienceTargeting,
  type AdRow,
  type AudienceRow,
} from '@/lib/google-ads/queries';
import { extractAdSellingPoint, extractLPSellingPoint, fetchLPContent } from '@/lib/selling-points/extractor';
import { scoreRelevance } from '@/lib/selling-points/relevance';
import { flushCaches, getCacheStats } from '@/lib/selling-points/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const TARGET_ACCOUNTS = [
  'Main', 'Verticals', 'Verticals2', 'Locals', 'AW mobile',
  'agent factory', 'Canvas by monday.com', 'monday.com brand',
  'monday.com CRM - Product Growth', 'harp AI',
];

interface CockpitRow {
  accountId: string;
  accountName: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adType: string;
  finalUrl: string;
  finalUrlDomain: string;
  // Ad info
  headlines: string[];
  descriptions: string[];
  adSellingPoint: string;
  // Audience
  audience: AudienceRow[];
  // Landing page
  lpSellingPoint: string;
  lpError: boolean;
  // Relevance
  relevanceScore: number;
  relevanceReason: string;
  // Metrics
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const analyze = searchParams.get('analyze') !== 'false'; // default true
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');

    // 1. Get all accounts
    const accounts = await getAccounts();
    const targetAccounts = accounts.filter(
      a => !a.isManager && TARGET_ACCOUNTS.includes(a.name)
    );

    // 2. Fetch ads (with RSA headlines) + audience for all accounts in parallel
    const accountResults = await Promise.allSettled(
      targetAccounts.map(async (account) => {
        const [ads, audience] = await Promise.all([
          getAdsWithUrls(account.id),
          getAudienceTargeting(account.id),
        ]);
        return { account, ads, audience };
      })
    );

    // 3. Build flat list of rows
    const rows: CockpitRow[] = [];

    for (const result of accountResults) {
      if (result.status !== 'fulfilled') continue;
      const { account, ads, audience } = result.value;

      // Index audience by campaignId
      const audienceMap = new Map<string, AudienceRow[]>();
      for (const a of audience) {
        if (!audienceMap.has(a.campaignId)) audienceMap.set(a.campaignId, []);
        audienceMap.get(a.campaignId)!.push(a);
      }

      for (const ad of ads) {
        const url = ad.finalUrls[0] || '';
        let domain = '';
        try {
          domain = url ? new URL(url).hostname : '';
        } catch { /* invalid URL */ }

        rows.push({
          accountId: account.id,
          accountName: account.name,
          campaignId: ad.campaignId,
          campaignName: ad.campaignName,
          adGroupId: ad.adGroupId,
          adGroupName: ad.adGroupName,
          adId: ad.adId,
          adType: ad.adType,
          finalUrl: url,
          finalUrlDomain: domain,
          headlines: ad.headlines || [],
          descriptions: ad.descriptions || [],
          adSellingPoint: '',
          audience: audienceMap.get(ad.campaignId) || [],
          lpSellingPoint: '',
          lpError: false,
          relevanceScore: 0,
          relevanceReason: '',
          impressions: ad.impressions,
          clicks: ad.clicks,
          spend: ad.costMicros / 1_000_000,
          conversions: ad.conversions,
        });
      }
    }

    // Sort by spend descending
    rows.sort((a, b) => b.spend - a.spend);

    // Paginate
    const totalRows = rows.length;
    const paginatedRows = rows.slice((page - 1) * pageSize, page * pageSize);

    // 4. If analyze=true, run selling point extraction + relevance scoring
    if (analyze && paginatedRows.length > 0) {
      console.log(`[Cockpit] Starting analysis for ${paginatedRows.length} rows...`);
      
      // Collect unique LP URLs to avoid duplicate fetches
      const uniqueUrls = new Set(paginatedRows.map(r => r.finalUrl).filter(Boolean));
      const lpContentMap = new Map<string, string>();

      // Fetch LP content in parallel (max 5 concurrent)
      const urlArray = Array.from(uniqueUrls);
      console.log(`[Cockpit] Fetching ${urlArray.length} unique LP URLs...`);
      for (let i = 0; i < urlArray.length; i += 5) {
        const batch = urlArray.slice(i, i + 5);
        const contents = await Promise.allSettled(batch.map(url => fetchLPContent(url)));
        batch.forEach((url, idx) => {
          const result = contents[idx];
          lpContentMap.set(url, result.status === 'fulfilled' ? result.value : '');
        });
      }

      // Extract selling points in batches of 10 to avoid overwhelming the API
      const batchSize = 10;
      for (let i = 0; i < paginatedRows.length; i += batchSize) {
        const batch = paginatedRows.slice(i, i + batchSize);
        
        // Step 1: Extract ad selling points
        const adSpResults = await Promise.allSettled(
          batch.map(async (row) => {
            if (row.headlines.length > 0 || row.descriptions.length > 0) {
              try {
                row.adSellingPoint = await extractAdSellingPoint(row.headlines, row.descriptions);
                console.log(`[Cockpit] Ad SP extracted for ${row.adId}: ${row.adSellingPoint.slice(0, 50)}`);
              } catch (e) {
                console.error(`[Cockpit] Ad SP failed for ${row.adId}:`, e);
              }
            }
          })
        );

        // Step 2: Extract LP selling points
        const lpSpResults = await Promise.allSettled(
          batch.map(async (row) => {
            if (row.finalUrl) {
              const content = lpContentMap.get(row.finalUrl) || '';
              if (content) {
                try {
                  row.lpSellingPoint = await extractLPSellingPoint(row.finalUrl, content);
                  console.log(`[Cockpit] LP SP extracted for ${row.finalUrl.slice(0, 40)}: ${row.lpSellingPoint.slice(0, 50)}`);
                } catch (e) {
                  console.error(`[Cockpit] LP SP failed for ${row.finalUrl}:`, e);
                  row.lpError = true;
                }
              } else {
                row.lpError = true;
              }
            }
          })
        );

        // Step 3: Score relevance
        const relResults = await Promise.allSettled(
          batch.map(async (row) => {
            if (row.adSellingPoint && row.lpSellingPoint) {
              try {
                const result = await scoreRelevance(row.adSellingPoint, row.lpSellingPoint);
                row.relevanceScore = result.score;
                row.relevanceReason = result.reason;
                console.log(`[Cockpit] Relevance for ${row.adId}: ${result.score}% — ${result.reason.slice(0, 60)}`);
              } catch (e) {
                console.error(`[Cockpit] Relevance failed for ${row.adId}:`, e);
              }
            }
          })
        );
      }
      
      console.log(`[Cockpit] Analysis complete. Rows with ad SP: ${paginatedRows.filter(r => r.adSellingPoint).length}, LP SP: ${paginatedRows.filter(r => r.lpSellingPoint).length}, Relevance: ${paginatedRows.filter(r => r.relevanceScore > 0).length}`);
      
      // Flush cache to disk
      flushCaches();
    }

    const cacheStats = getCacheStats();
    return NextResponse.json({
      rows: paginatedRows,
      pagination: {
        page,
        pageSize,
        totalRows,
        totalPages: Math.ceil(totalRows / pageSize),
      },
      cache: cacheStats,
    });
  } catch (error) {
    console.error('Cockpit API error:', error);
    return NextResponse.json({ error: 'Failed to fetch cockpit data' }, { status: 500 });
  }
}
