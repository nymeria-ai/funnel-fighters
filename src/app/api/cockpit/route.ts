import { NextResponse } from 'next/server';
import {
  getAccounts,
  getAdsWithUrls,
  getAdCopy,
  getAudienceTargeting,
  type AdRow,
  type AdCopyRow,
  type AudienceRow,
} from '@/lib/google-ads/queries';
import { extractAdSellingPoint, extractLPSellingPoint, fetchLPContent } from '@/lib/selling-points/extractor';
import { scoreRelevance } from '@/lib/selling-points/relevance';

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

    // 2. Fetch ads + ad copy + audience for all accounts in parallel
    const accountResults = await Promise.allSettled(
      targetAccounts.map(async (account) => {
        const [ads, adCopy, audience] = await Promise.all([
          getAdsWithUrls(account.id),
          getAdCopy(account.id),
          getAudienceTargeting(account.id),
        ]);
        return { account, ads, adCopy, audience };
      })
    );

    // 3. Build flat list of rows
    const rows: CockpitRow[] = [];

    for (const result of accountResults) {
      if (result.status !== 'fulfilled') continue;
      const { account, ads, adCopy, audience } = result.value;

      // Index ad copy by adGroupId + adId for quick lookup
      const copyMap = new Map<string, AdCopyRow>();
      for (const copy of adCopy) {
        copyMap.set(`${copy.adGroupId}:${copy.adId}`, copy);
      }

      // Index audience by campaignId
      const audienceMap = new Map<string, AudienceRow[]>();
      for (const a of audience) {
        if (!audienceMap.has(a.campaignId)) audienceMap.set(a.campaignId, []);
        audienceMap.get(a.campaignId)!.push(a);
      }

      for (const ad of ads) {
        const copy = copyMap.get(`${ad.adGroupId}:${ad.adId}`);
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
          headlines: copy?.headlines || [],
          descriptions: copy?.descriptions || [],
          adSellingPoint: '',
          audience: audienceMap.get(ad.campaignId) || [],
          lpSellingPoint: '',
          lpError: false,
          relevanceScore: 0,
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
      // Collect unique LP URLs to avoid duplicate fetches
      const uniqueUrls = new Set(paginatedRows.map(r => r.finalUrl).filter(Boolean));
      const lpContentMap = new Map<string, string>();

      // Fetch LP content in parallel (max 5 concurrent)
      const urlArray = Array.from(uniqueUrls);
      for (let i = 0; i < urlArray.length; i += 5) {
        const batch = urlArray.slice(i, i + 5);
        const contents = await Promise.allSettled(batch.map(url => fetchLPContent(url)));
        batch.forEach((url, idx) => {
          const result = contents[idx];
          lpContentMap.set(url, result.status === 'fulfilled' ? result.value : '');
        });
      }

      // Extract selling points and score relevance in batches
      await Promise.allSettled(
        paginatedRows.map(async (row) => {
          try {
            // Ad selling point
            if (row.headlines.length > 0 || row.descriptions.length > 0) {
              row.adSellingPoint = await extractAdSellingPoint(row.headlines, row.descriptions);
            }

            // LP selling point
            if (row.finalUrl) {
              const content = lpContentMap.get(row.finalUrl) || '';
              if (content) {
                row.lpSellingPoint = await extractLPSellingPoint(row.finalUrl, content);
              } else {
                row.lpError = true;
              }
            }

            // Relevance score
            if (row.adSellingPoint && row.lpSellingPoint) {
              row.relevanceScore = await scoreRelevance(row.adSellingPoint, row.lpSellingPoint);
            }
          } catch {
            // Individual row errors don't break the whole response
          }
        })
      );
    }

    return NextResponse.json({
      rows: paginatedRows,
      pagination: {
        page,
        pageSize,
        totalRows,
        totalPages: Math.ceil(totalRows / pageSize),
      },
    });
  } catch (error) {
    console.error('Cockpit API error:', error);
    return NextResponse.json({ error: 'Failed to fetch cockpit data' }, { status: 500 });
  }
}
