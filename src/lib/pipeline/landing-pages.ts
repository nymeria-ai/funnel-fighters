/**
 * Pipeline Step 3: Discover new landing pages from ads and compute their selling points
 * and relevance scores against the ad's selling point.
 *
 * v2 — 2026-05-03: Added LIMIT + batch inserts to prevent Vercel timeout on large backlogs.
 */

import { query } from '@/lib/db/client';

/** Max new landing pages to process per SELECT batch. */
const BATCH_LIMIT = Number(process.env.LANDING_PAGES_BATCH_LIMIT) || 2000;

/** Number of rows per multi-row INSERT for landing_pages. */
const INSERT_CHUNK = 100;

/** Stop fetching new batches when this many seconds remain before Vercel timeout. */
const TIME_BUDGET_MS = Number(process.env.LANDING_PAGES_TIME_BUDGET_MS) || 240_000;

interface NewLpRow extends Record<string, unknown> {
  final_url: string;
  domain: string;
}

interface AdForLp extends Record<string, unknown> {
  ad_id: string;
  selling_point: string | null;
}

function computeLpSellingPoint(_url: string): string {
  // TODO: Replace with real LLM call (claude-opus-4-6 or configured model from settings table)
  return '';
}

function computeRelevanceScore(
  _adSellingPoint: string | null,
  _lpSellingPoint: string,
  _url: string
): { score: number; reason: string } {
  // TODO: Replace with real LLM call
  return { score: 50, reason: 'Relevance computation pending LLM integration' };
}

/**
 * Batch insert landing pages.
 */
async function insertLandingPagesChunk(
  chunk: Array<{ url: string; domain: string }>
): Promise<void> {
  if (chunk.length === 0) return;

  const values: unknown[] = [];
  const placeholders: string[] = [];
  for (let i = 0; i < chunk.length; i++) {
    const offset = i * 2;
    placeholders.push(`($${offset + 1}, $${offset + 2}, NOW())`);
    values.push(chunk[i].url, chunk[i].domain);
  }

  await query(
    `INSERT INTO landing_pages (url, domain, created_at)
     VALUES ${placeholders.join(', ')}
     ON CONFLICT (url) DO NOTHING`,
    values
  );
}

/**
 * Batch upsert landing page extensions.
 */
async function upsertLpExtensionsChunk(
  chunk: Array<{ url: string; sellingPoint: string | null }>
): Promise<void> {
  if (chunk.length === 0) return;

  const values: unknown[] = [];
  const placeholders: string[] = [];
  for (let i = 0; i < chunk.length; i++) {
    const offset = i * 2;
    placeholders.push(`($${offset + 1}, $${offset + 2}, NOW())`);
    values.push(chunk[i].url, chunk[i].sellingPoint);
  }

  await query(
    `INSERT INTO landing_page_extension (url, selling_point, computed_at)
     VALUES ${placeholders.join(', ')}
     ON CONFLICT (url) DO UPDATE SET
       selling_point = EXCLUDED.selling_point,
       computed_at = NOW()`,
    values
  );
}

/**
 * Discovers landing pages referenced in ads that are not yet in the landing_pages table,
 * inserts them, and computes placeholder selling points + relevance scores.
 *
 * Loops through BATCH_LIMIT-sized batches until either no new URLs remain or the
 * time budget is exhausted.
 *
 * @param channel Optional channel filter. If omitted, processes all channels.
 * @returns Number of new landing pages processed.
 */
export async function discoverAndProcessNewLandingPages(channel?: string): Promise<number> {
  const channelFilter = channel ? `AND a.channel = $1` : '';
  const params: unknown[] = channel ? [channel, BATCH_LIMIT] : [BATCH_LIMIT];
  const limitParam = channel ? '$2' : '$1';
  const startTime = Date.now();
  let totalProcessed = 0;

  while (Date.now() - startTime < TIME_BUDGET_MS) {
    // Find URLs in ads not yet tracked — with LIMIT
    const newUrls = await query<NewLpRow>(
      `SELECT DISTINCT a.final_url,
         COALESCE(
           CASE WHEN a.final_url ~ '^https?://'
                THEN SPLIT_PART(SPLIT_PART(a.final_url, '://', 2), '/', 1)
                ELSE '' END,
           ''
         ) AS domain
       FROM ads a
       WHERE a.final_url IS NOT NULL
         AND a.final_url != ''
         AND a.final_url NOT IN (SELECT url FROM landing_pages)
       ${channelFilter}
       LIMIT ${limitParam}`,
      params
    );

    if (!newUrls || newUrls.length === 0) break; // backlog cleared

    // Batch insert landing pages
    const lpRows = newUrls.map(r => ({ url: r.final_url, domain: r.domain || '' }));
    for (let i = 0; i < lpRows.length; i += INSERT_CHUNK) {
      await insertLandingPagesChunk(lpRows.slice(i, i + INSERT_CHUNK));
    }

    // Batch upsert LP extensions (placeholder selling points)
    const extRows = newUrls.map(r => ({
      url: r.final_url,
      sellingPoint: computeLpSellingPoint(r.final_url) || null,
    }));
    for (let i = 0; i < extRows.length; i += INSERT_CHUNK) {
      await upsertLpExtensionsChunk(extRows.slice(i, i + INSERT_CHUNK));
    }

    // Relevance scoring: batch per LP (each LP may have many ads)
    let scoredAds = 0;
    const MAX_SCORE_ADS = BATCH_LIMIT;

    for (const { final_url } of newUrls) {
      if (scoredAds >= MAX_SCORE_ADS) break;
      if (Date.now() - startTime >= TIME_BUDGET_MS) break;

      const lpSellingPoint = computeLpSellingPoint(final_url);

      const adRows = await query<AdForLp>(
        `SELECT a.id AS ad_id, ae.selling_point
         FROM ads a
         LEFT JOIN ad_extension ae ON ae.ad_id = a.id
         WHERE a.final_url = $1
         LIMIT 100`,
        [final_url]
      );

      if (!adRows || adRows.length === 0) continue;

      for (const ad of adRows) {
        const { score: relevanceScore, reason: relevanceReason } = computeRelevanceScore(
          ad.selling_point,
          lpSellingPoint,
          final_url
        );

        await query(
          `UPDATE ad_extension
           SET lp_relevance_score = $1, relevance_reason = $2, computed_at = NOW()
           WHERE ad_id = $3`,
          [relevanceScore, relevanceReason, ad.ad_id]
        );
        scoredAds++;
        if (scoredAds >= MAX_SCORE_ADS) break;
      }
    }

    totalProcessed += newUrls.length;
    console.log(`[landing-pages] Batch done: +${newUrls.length} (total: ${totalProcessed}, elapsed: ${((Date.now() - startTime) / 1000).toFixed(1)}s)`);

    // If we got fewer than BATCH_LIMIT, there's no more to process
    if (newUrls.length < BATCH_LIMIT) break;
  }

  return totalProcessed;
}
