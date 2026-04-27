import { NextResponse } from 'next/server';
import {
  getAccounts,
  getAdsWithUrls,
  getAudienceTargeting,
  type AudienceRow,
} from '@/lib/google-ads/queries';
import { extractAdSellingPoint, extractLPSellingPoint, fetchLPContent } from '@/lib/selling-points/extractor';
import { scoreRelevance } from '@/lib/selling-points/relevance';
import { flushCaches, getCacheStats, getSellingPointAsync, getRelevanceScoreAsync } from '@/lib/selling-points/cache';
import { hasAdsInDb, getCockpitRowsFromDb } from '@/lib/google-ads/db-fallback';
import type { CockpitRow } from '@/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const TARGET_ACCOUNTS = (process.env.GOOGLE_ADS_TARGET_ACCOUNTS || 'Main,Verticals,Verticals2,Locals,AW mobile,agent factory,Canvas by monday.com,monday.com brand,monday.com CRM - Product Growth,harp AI')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

const HAS_GOOGLE_ADS_API = !!(process.env.GOOGLE_ADS_CLIENT_ID && process.env.GOOGLE_ADS_REFRESH_TOKEN);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const analyze = searchParams.get('analyze') !== 'false'; // default true
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');

    // DB FALLBACK: If no Google Ads API credentials, try reading from database
    if (!HAS_GOOGLE_ADS_API) {
      const dbHasAds = await hasAdsInDb();
      if (dbHasAds) {
        const allRows = await getCockpitRowsFromDb(TARGET_ACCOUNTS);
        allRows.sort((a, b) => b.spend - a.spend);
        const totalRows = allRows.length;
        const paginatedRows = allRows.slice((page - 1) * pageSize, page * pageSize);
        return NextResponse.json({
          rows: paginatedRows,
          pagination: { page, pageSize, totalRows, totalPages: Math.ceil(totalRows / pageSize) },
          cache: { sellingPoints: 0, relevanceScores: 0 },
          source: 'database',
        });
      }
      // No API and no DB data — return empty
      return NextResponse.json({
        rows: [],
        pagination: { page, pageSize, totalRows: 0, totalPages: 0 },
        cache: { sellingPoints: 0, relevanceScores: 0 },
        source: 'none',
      });
    }

    // LIVE API PATH: Google Ads credentials available
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

      // DB fast path: try to hydrate selling points + relevance from cache/DB first
      await Promise.allSettled(
        paginatedRows.map(async (row) => {
          const adKey = `ad:${row.headlines.join('|')}:${row.descriptions.join('|')}`;
          const lpKey = `lp:${row.finalUrl}`;
          const [adSp, lpSp] = await Promise.all([
            (row.headlines.length > 0 || row.descriptions.length > 0) ? getSellingPointAsync(adKey) : null,
            row.finalUrl ? getSellingPointAsync(lpKey) : null,
          ]);
          if (adSp) row.adSellingPoint = adSp;
          if (lpSp) row.lpSellingPoint = lpSp;
          if (adSp && lpSp) {
            const rel = await getRelevanceScoreAsync(adSp, lpSp);
            if (rel) { row.relevanceScore = rel.score; row.relevanceReason = rel.reason; }
          }
        }),
      );

      const preHydrated = paginatedRows.filter(r => r.relevanceScore > 0).length;
      console.log(`[Cockpit] DB fast path: ${preHydrated}/${paginatedRows.length} rows fully hydrated`);

      // Only fetch + compute for rows that are still missing data
      const needsAnalysis = paginatedRows.filter(r => !r.adSellingPoint || !r.lpSellingPoint || r.relevanceScore === 0);
      if (needsAnalysis.length === 0) {
        console.log('[Cockpit] All rows served from cache/DB — skipping LLM calls');
      } else {
        console.log(`[Cockpit] ${needsAnalysis.length} rows need analysis...`);
      }

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
