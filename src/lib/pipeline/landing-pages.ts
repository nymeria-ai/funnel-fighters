/**
 * Pipeline Step 3: Discover new landing pages from ads and compute their selling points
 * and relevance scores against the ad's selling point.
 */

import { query } from '@/lib/db/client';

interface NewLpRow extends Record<string, unknown> {
  final_url: string;
}

interface AdForLp extends Record<string, unknown> {
  ad_id: string;
  selling_point: string | null;
}

function computeLpSellingPoint(_url: string): string {
  // TODO: Replace with real LLM call (claude-opus-4-6 or configured model from settings table)
  // Flow:
  //   1. Fetch LP content (title, h1, meta description, body text)
  //   2. Call LLM: "Given this landing page content, extract the single most compelling selling point."
  // Placeholder: return empty string; content will be populated by a future content-fetch step.
  return '';
}

function computeRelevanceScore(
  _adSellingPoint: string | null,
  _lpSellingPoint: string,
  _url: string
): { score: number; reason: string } {
  // TODO: Replace with real LLM call
  // Flow:
  //   1. Call LLM: "On a scale of 0-100, how relevant is this landing page to the ad?
  //                 Ad selling point: {adSellingPoint}. LP selling point: {lpSellingPoint}.
  //                 Return JSON: { score: number, reason: string }"
  // Placeholder: neutral score with a pending reason.
  return { score: 50, reason: 'Relevance computation pending LLM integration' };
}

/**
 * Discovers landing pages referenced in ads that are not yet in the landing_pages table,
 * inserts them, and computes placeholder selling points + relevance scores.
 * @param channel Optional channel filter. If omitted, processes all channels.
 * @returns Number of new landing pages processed.
 */
export async function discoverAndProcessNewLandingPages(channel?: string): Promise<number> {
  const channelFilter = channel ? `AND a.channel = $1` : '';
  const params: unknown[] = channel ? [channel] : [];

  // Find URLs in ads not yet tracked in landing_pages
  const newUrls = await query<NewLpRow>(
    `SELECT DISTINCT a.final_url
     FROM ads a
     WHERE a.final_url IS NOT NULL
       AND a.final_url != ''
       AND a.final_url NOT IN (SELECT url FROM landing_pages)
     ${channelFilter}`,
    params
  );

  if (!newUrls || newUrls.length === 0) return 0;

  let processed = 0;

  for (const { final_url } of newUrls) {
    let domain = '';
    try { domain = new URL(final_url).hostname; } catch { /* invalid URL */ }

    // Insert into landing_pages
    await query(
      `INSERT INTO landing_pages (url, domain, created_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (url) DO NOTHING`,
      [final_url, domain]
    );

    // Compute LP selling point (placeholder)
    const lpSellingPoint = computeLpSellingPoint(final_url);

    // Upsert into landing_page_extension
    await query(
      `INSERT INTO landing_page_extension (url, selling_point, computed_at)
       VALUES ($1, $2, NOW())
       ON CONFLICT (url) DO UPDATE SET
         selling_point = EXCLUDED.selling_point,
         computed_at = NOW()`,
      [final_url, lpSellingPoint || null]
    );

    // Score ALL ads pointing to this LP individually (not just the first one)
    // Each ad may have a different selling point → different relevance to the same LP
    const adRows = await query<AdForLp>(
      `SELECT a.id AS ad_id, ae.selling_point
       FROM ads a
       LEFT JOIN ad_extension ae ON ae.ad_id = a.id
       WHERE a.final_url = $1`,
      [final_url]
    );

    for (const ad of adRows ?? []) {
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
    }

    processed++;
  }

  return processed;
}
