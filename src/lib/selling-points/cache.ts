/**
 * Persistent selling point & relevance score cache.
 * Uses in-memory cache with file-based persistence.
 * On Vercel serverless, /tmp persists within the same function instance
 * but not across cold starts — so we also write to a data directory
 * that gets deployed with the app.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const CACHE_DIR = '/tmp/ff-sp-cache';
const SP_FILE = join(CACHE_DIR, 'selling-points.json');
const REL_FILE = join(CACHE_DIR, 'relevance-scores.json');
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
  value: string;
  ts: number;
}

interface RelCacheEntry {
  score: number;
  ts: number;
}

// In-memory caches (fast reads)
let spCache: Map<string, CacheEntry> | null = null;
let relCache: Map<string, RelCacheEntry> | null = null;

function ensureDir(): void {
  if (!existsSync(CACHE_DIR)) {
    mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function loadSpCache(): Map<string, CacheEntry> {
  if (spCache) return spCache;
  ensureDir();
  try {
    if (existsSync(SP_FILE)) {
      const data = JSON.parse(readFileSync(SP_FILE, 'utf-8'));
      spCache = new Map(Object.entries(data));
      // Prune expired entries
      const now = Date.now();
      for (const [k, v] of spCache.entries()) {
        if (now - v.ts > TTL_MS) spCache.delete(k);
      }
      return spCache;
    }
  } catch (e) {
    console.error('[Cache] Failed to load SP cache:', e);
  }
  spCache = new Map();
  return spCache;
}

function loadRelCache(): Map<string, RelCacheEntry> {
  if (relCache) return relCache;
  ensureDir();
  try {
    if (existsSync(REL_FILE)) {
      const data = JSON.parse(readFileSync(REL_FILE, 'utf-8'));
      relCache = new Map(Object.entries(data));
      const now = Date.now();
      for (const [k, v] of relCache.entries()) {
        if (now - v.ts > TTL_MS) relCache.delete(k);
      }
      return relCache;
    }
  } catch (e) {
    console.error('[Cache] Failed to load REL cache:', e);
  }
  relCache = new Map();
  return relCache;
}

function persistSpCache(): void {
  try {
    ensureDir();
    const cache = loadSpCache();
    const obj: Record<string, CacheEntry> = {};
    for (const [k, v] of cache.entries()) obj[k] = v;
    writeFileSync(SP_FILE, JSON.stringify(obj));
  } catch (e) {
    console.error('[Cache] Failed to persist SP cache:', e);
  }
}

function persistRelCache(): void {
  try {
    ensureDir();
    const cache = loadRelCache();
    const obj: Record<string, RelCacheEntry> = {};
    for (const [k, v] of cache.entries()) obj[k] = v;
    writeFileSync(REL_FILE, JSON.stringify(obj));
  } catch (e) {
    console.error('[Cache] Failed to persist REL cache:', e);
  }
}

// Debounced persistence to avoid writing on every single set
let spPersistTimer: ReturnType<typeof setTimeout> | null = null;
let relPersistTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedPersistSp(): void {
  if (spPersistTimer) clearTimeout(spPersistTimer);
  spPersistTimer = setTimeout(persistSpCache, 1000);
}

function debouncedPersistRel(): void {
  if (relPersistTimer) clearTimeout(relPersistTimer);
  relPersistTimer = setTimeout(persistRelCache, 1000);
}

// --- Public API ---

export function getSellingPoint(key: string): string | null {
  const cache = loadSpCache();
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setSellingPoint(key: string, value: string): void {
  const cache = loadSpCache();
  cache.set(key, { value, ts: Date.now() });
  debouncedPersistSp();
}

export function getRelevanceScore(adSp: string, lpSp: string): number | null {
  const cache = loadRelCache();
  const key = `${adSp}::${lpSp}`;
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.score;
}

export function setRelevanceScore(adSp: string, lpSp: string, score: number): void {
  const cache = loadRelCache();
  const key = `${adSp}::${lpSp}`;
  cache.set(key, { score, ts: Date.now() });
  debouncedPersistRel();
}

export function clearAllCaches(): void {
  spCache = new Map();
  relCache = new Map();
  persistSpCache();
  persistRelCache();
}

export function getCacheStats(): { sellingPoints: number; relevanceScores: number } {
  return {
    sellingPoints: loadSpCache().size,
    relevanceScores: loadRelCache().size,
  };
}

/** Force flush pending writes (call at end of API request) */
export function flushCaches(): void {
  if (spPersistTimer) { clearTimeout(spPersistTimer); spPersistTimer = null; persistSpCache(); }
  if (relPersistTimer) { clearTimeout(relPersistTimer); relPersistTimer = null; persistRelCache(); }
}
