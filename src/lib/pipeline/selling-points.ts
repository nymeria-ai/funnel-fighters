/**
 * Pipeline Step 2: Compute selling points for new/changed ads.
 * Hash-based: only recomputes when MD5(headlines + descriptions) differs from stored hash.
 *
 * v2 — 2026-05-03: Added LIMIT + batch upserts to prevent Vercel timeout on large backlogs.
 */

import { createHash } from 'crypto';
import { query } from '@/lib/db/client';

/** Max ads to process per SELECT batch. */
const BATCH_LIMIT = Number(process.env.SELLING_POINTS_BATCH_LIMIT) || 5000;

/** Number of rows per multi-row INSERT. */
const UPSERT_CHUNK = 100;

/** Stop fetching new batches when this many seconds remain before Vercel timeout. */
const TIME_BUDGET_MS = Number(process.env.SELLING_POINTS_TIME_BUDGET_MS) || 240_000; // 240s of 300s

interface AdRow extends Record<string, unknown> {
  id: string;
  channel: string;
  headlines: unknown;
  descriptions: unknown;
}

/**
 * Compute MD5 hash matching the Postgres expression:
 *   MD5(headlines::TEXT || descriptions::TEXT)
 * Postgres casts JSONB to TEXT with no spaces after colons/commas.
 * JSON.stringify also produces no-space output, so they match for simple arrays.
 * We normalize by parsing (if string) to ensure consistent JSONB→text representation.
 */
function computeHash(headlines: unknown, descriptions: unknown): string {
  const h = normalizeJsonb(headlines);
  const d = normalizeJsonb(descriptions);
  return createHash('md5').update(h + d).digest('hex');
}

/** Normalize a JSONB value to match Postgres ::TEXT cast (compact JSON, sorted keys) */
function normalizeJsonb(val: unknown): string {
  if (typeof val === 'string') {
    try { return JSON.stringify(JSON.parse(val)); } catch { return val; }
  }
  return JSON.stringify(val ?? []);
}

function extractSellingPoint(headlines: unknown, descriptions: unknown): string {
  // TODO: Replace with real LLM call (claude-opus-4-6 or configured model from settings table)
  const h = Array.isArray(headlines) ? headlines : [];
  const d = Array.isArray(descriptions) ? descriptions : [];
  const firstHeadline = typeof h[0] === 'string' ? h[0] : (typeof h[0] === 'object' && h[0] !== null ? String((h[0] as Record<string, unknown>).text ?? '') : '');
  const firstDesc = typeof d[0] === 'string' ? d[0] : (typeof d[0] === 'object' && d[0] !== null ? String((d[0] as Record<string, unknown>).text ?? '') : '');
  return [firstHeadline, firstDesc].filter(Boolean).join(' — ') || '(no content)';
}

/**
 * Upsert a chunk of selling points in a single multi-row INSERT.
 */
async function upsertChunk(
  chunk: Array<{ id: string; sellingPoint: string; hash: string }>
): Promise<void> {
  if (chunk.length === 0) return;

  // Build VALUES ($1,$2,$3), ($4,$5,$6), ...
  const values: unknown[] = [];
  const placeholders: string[] = [];
  for (let i = 0; i < chunk.length; i++) {
    const offset = i * 3;
    placeholders.push(`($${offset + 1}, $${offset + 2}, $${offset + 3}, NOW())`);
    values.push(chunk[i].id, chunk[i].sellingPoint, chunk[i].hash);
  }

  await query(
    `INSERT INTO ad_extension (ad_id, selling_point, selling_point_hash, computed_at)
     VALUES ${placeholders.join(', ')}
     ON CONFLICT (ad_id) DO UPDATE SET
       selling_point = EXCLUDED.selling_point,
       selling_point_hash = EXCLUDED.selling_point_hash,
       computed_at = NOW()`,
    values
  );
}

/**
 * Finds ads that are new or whose content hash has changed, computes their selling points,
 * and upserts into ad_extension.
 *
 * Loops through BATCH_LIMIT-sized batches until either no more rows remain or the
 * time budget is exhausted (default 240s of Vercel's 300s limit). This clears large
 * backlogs in a single invocation instead of needing many pipeline triggers.
 *
 * @param channel Optional channel filter ('google', 'meta', etc.). If omitted, processes all channels.
 * @returns Number of ads processed.
 */
export async function computeSellingPointsForNewAds(channel?: string): Promise<number> {
  const channelFilter = channel ? `AND a.channel = $1` : '';
  const params: unknown[] = channel ? [channel, BATCH_LIMIT] : [BATCH_LIMIT];
  const limitParam = channel ? '$2' : '$1';
  const startTime = Date.now();
  let totalProcessed = 0;

  while (Date.now() - startTime < TIME_BUDGET_MS) {
    // Select next batch of ads needing selling points
    const rows = await query<AdRow>(
      `SELECT a.id, a.channel, a.headlines, a.descriptions
       FROM ads a
       LEFT JOIN ad_extension ae ON ae.ad_id = a.id
       WHERE (
         ae.ad_id IS NULL
         OR ae.selling_point_hash IS DISTINCT FROM MD5(a.headlines::TEXT || a.descriptions::TEXT)
       )
       ${channelFilter}
       LIMIT ${limitParam}`,
      params
    );

    if (!rows || rows.length === 0) break; // backlog cleared

    // Compute all selling points + hashes in memory (CPU-only, fast)
    const computed = rows.map(ad => ({
      id: ad.id,
      sellingPoint: extractSellingPoint(ad.headlines, ad.descriptions),
      hash: computeHash(ad.headlines, ad.descriptions),
    }));

    // Batch upsert in chunks
    for (let i = 0; i < computed.length; i += UPSERT_CHUNK) {
      await upsertChunk(computed.slice(i, i + UPSERT_CHUNK));
    }

    totalProcessed += computed.length;
    console.log(`[selling-points] Batch done: +${computed.length} (total: ${totalProcessed}, elapsed: ${((Date.now() - startTime) / 1000).toFixed(1)}s)`);

    // If we got fewer than BATCH_LIMIT, there's no more to process
    if (rows.length < BATCH_LIMIT) break;
  }

  return totalProcessed;
}
