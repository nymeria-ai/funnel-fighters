/**
 * In-memory cache for selling points and relevance scores.
 * 7-day TTL, survives across requests in the same serverless instance.
 */

interface CacheEntry<T> {
  data: T;
  fetchedAt: number;
}

const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const sellingPointCache = new Map<string, CacheEntry<string>>();
const relevanceScoreCache = new Map<string, CacheEntry<number>>();

// --- Selling Points ---

export function getSellingPoint(key: string): string | null {
  const entry = sellingPointCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > TTL_MS) {
    sellingPointCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setSellingPoint(key: string, value: string): void {
  sellingPointCache.set(key, { data: value, fetchedAt: Date.now() });
}

// --- Relevance Scores ---

function relevanceKey(adSP: string, lpSP: string): string {
  return `${adSP}|||${lpSP}`;
}

export function getRelevanceScore(adSP: string, lpSP: string): number | null {
  const key = relevanceKey(adSP, lpSP);
  const entry = relevanceScoreCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > TTL_MS) {
    relevanceScoreCache.delete(key);
    return null;
  }
  return entry.data;
}

export function setRelevanceScore(adSP: string, lpSP: string, score: number): void {
  const key = relevanceKey(adSP, lpSP);
  relevanceScoreCache.set(key, { data: score, fetchedAt: Date.now() });
}

// --- Cache management ---

export function clearAllCaches(): void {
  sellingPointCache.clear();
  relevanceScoreCache.clear();
}

export function getCacheStats() {
  return {
    sellingPoints: sellingPointCache.size,
    relevanceScores: relevanceScoreCache.size,
  };
}
