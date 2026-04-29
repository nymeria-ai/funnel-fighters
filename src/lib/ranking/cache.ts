/**
 * Server-side rank cache.
 * Primary: Vercel Postgres landing_pages table.
 * Fallback: in-memory cache with TTL.
 */

import type { PageRankResult } from '@/types';
import { query } from '@/lib/db/client';

interface CacheEntry extends Record<string, unknown> {
  data: PageRankResult;
  fetchedAt: number; // epoch ms
}

// In-memory cache (survives across requests in the same serverless instance)
const cache = new Map<string, CacheEntry>();

// Default TTL: 7 days (weekly refresh cycle)
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

async function dbGetRank(url: string): Promise<PageRankResult | null> {
  try {
    const rows = await query<{
      url: string;
      gsc_position: number | null;
      gsc_impressions: string | null;
      gsc_score: number | null;
      ahrefs_ur: number | null;
      ahrefs_score: number | null;
      composite_score: number | null;
    }>(
      `SELECT url, gsc_position, gsc_impressions, gsc_score, ahrefs_ur, ahrefs_score, composite_score
       FROM landing_pages
       WHERE url = $1 AND rank_fetched_at > NOW() - INTERVAL '7 days'`,
      [url],
    );
    if (!rows || rows.length === 0) return null;
    const r = rows[0];
    return {
      url: r.url,
      gscPosition: r.gsc_position,
      gscImpressions: r.gsc_impressions != null ? Number(r.gsc_impressions) : null,
      gscScore: r.gsc_score,
      ahrefsUR: r.ahrefs_ur,
      ahrefsScore: r.ahrefs_score,
      compositeScore: r.composite_score,
    };
  } catch {
    return null;
  }
}

async function dbSetRank(data: PageRankResult): Promise<void> {
  try {
    let domain: string | null = null;
    try { domain = new URL(data.url).hostname; } catch { /* invalid URL */ }

    await query(
      `INSERT INTO landing_pages (url, domain, gsc_position, gsc_impressions, gsc_score, ahrefs_ur, ahrefs_score, composite_score, rank_fetched_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (url) DO UPDATE SET
         gsc_position = $3, gsc_impressions = $4, gsc_score = $5,
         ahrefs_ur = $6, ahrefs_score = $7, composite_score = $8,
         rank_fetched_at = NOW()`,
      [data.url, domain, data.gscPosition, data.gscImpressions, data.gscScore, data.ahrefsUR, data.ahrefsScore, data.compositeScore],
    );
  } catch (e) {
    console.error('[RankCache/DB] Failed to write rank:', e);
  }
}

export function getCached(url: string): PageRankResult | null {
  const entry = cache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > DEFAULT_TTL_MS) {
    cache.delete(url);
    return null;
  }
  return entry.data;
}

export async function getCachedAsync(url: string): Promise<PageRankResult | null> {
  const local = getCached(url);
  if (local) return local;

  const dbResult = await dbGetRank(url);
  if (dbResult) {
    cache.set(url, { data: dbResult, fetchedAt: Date.now() });
    return dbResult;
  }

  return null;
}

export function setCached(url: string, data: PageRankResult): void {
  cache.set(url, { data, fetchedAt: Date.now() });
  // Write to DB in background
  dbSetRank(data).catch(() => {});
}

export function getAllCached(): Map<string, CacheEntry> {
  return cache;
}

export function getCacheStats(): { total: number; expired: number; fresh: number } {
  const now = Date.now();
  let expired = 0;
  let fresh = 0;
  for (const [, entry] of cache) {
    if (now - entry.fetchedAt > DEFAULT_TTL_MS) expired++;
    else fresh++;
  }
  return { total: cache.size, expired, fresh };
}

export function clearCache(): void {
  cache.clear();
}
