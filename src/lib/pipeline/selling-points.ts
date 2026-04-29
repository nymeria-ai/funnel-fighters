/**
 * Pipeline Step 2: Compute selling points for new/changed ads.
 * Hash-based: only recomputes when MD5(headlines + descriptions) differs from stored hash.
 */

import { createHash } from 'crypto';
import { query } from '@/lib/db/client';

interface AdRow {
  id: string;
  channel: string;
  headlines: unknown;
  descriptions: unknown;
}

function computeHash(headlines: unknown, descriptions: unknown): string {
  const h = JSON.stringify(headlines ?? []);
  const d = JSON.stringify(descriptions ?? []);
  return createHash('md5').update(h + d).digest('hex');
}

function extractSellingPoint(headlines: unknown, descriptions: unknown): string {
  // TODO: Replace with real LLM call (claude-opus-4-6 or configured model from settings table)
  // LLM prompt: "Given these ad headlines and descriptions, extract the single most compelling
  //              selling point in one concise sentence."
  // For now: use first headline + first description as placeholder.
  const h = Array.isArray(headlines) ? headlines : [];
  const d = Array.isArray(descriptions) ? descriptions : [];
  const firstHeadline = typeof h[0] === 'string' ? h[0] : (typeof h[0] === 'object' && h[0] !== null ? String((h[0] as Record<string, unknown>).text ?? '') : '');
  const firstDesc = typeof d[0] === 'string' ? d[0] : (typeof d[0] === 'object' && d[0] !== null ? String((d[0] as Record<string, unknown>).text ?? '') : '');
  return [firstHeadline, firstDesc].filter(Boolean).join(' — ') || '(no content)';
}

/**
 * Finds ads that are new or whose content hash has changed, computes their selling points,
 * and upserts into ad_extension.
 * @param channel Optional channel filter ('google', 'meta', etc.). If omitted, processes all channels.
 * @returns Number of ads processed.
 */
export async function computeSellingPointsForNewAds(channel?: string): Promise<number> {
  const channelFilter = channel ? `AND a.channel = $1` : '';
  const params: unknown[] = channel ? [channel] : [];

  // Select ads where ad_extension row is missing OR hash has changed
  const rows = await query<AdRow>(
    `SELECT a.id, a.channel, a.headlines, a.descriptions
     FROM ads a
     LEFT JOIN ad_extension ae ON ae.ad_id = a.id
     WHERE (
       ae.ad_id IS NULL
       OR ae.selling_point_hash IS DISTINCT FROM MD5(a.headlines::TEXT || a.descriptions::TEXT)
     )
     ${channelFilter}`,
    params
  );

  if (!rows) return 0;

  let processed = 0;
  for (const ad of rows) {
    const hash = computeHash(ad.headlines, ad.descriptions);
    const sellingPoint = extractSellingPoint(ad.headlines, ad.descriptions);

    await query(
      `INSERT INTO ad_extension (ad_id, selling_point, selling_point_hash, computed_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (ad_id) DO UPDATE SET
         selling_point = EXCLUDED.selling_point,
         selling_point_hash = EXCLUDED.selling_point_hash,
         computed_at = NOW()`,
      [ad.id, sellingPoint, hash]
    );
    processed++;
  }

  return processed;
}
