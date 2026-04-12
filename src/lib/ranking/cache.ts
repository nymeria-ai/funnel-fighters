/**
 * Server-side rank cache.
 * Stores rank results in memory with TTL.
 * Weekly cron refreshes all pages; new pages get scored on first access.
 */

import type { PageRankResult } from '@/app/api/page-rank/route';

interface CacheEntry {
  data: PageRankResult;
  fetchedAt: number; // epoch ms
}

// In-memory cache (survives across requests in the same serverless instance)
const cache = new Map<string, CacheEntry>();

// Default TTL: 7 days (weekly refresh cycle)
const DEFAULT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export function getCached(url: string): PageRankResult | null {
  const entry = cache.get(url);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > DEFAULT_TTL_MS) {
    cache.delete(url);
    return null;
  }
  return entry.data;
}

export function setCached(url: string, data: PageRankResult): void {
  cache.set(url, { data, fetchedAt: Date.now() });
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
