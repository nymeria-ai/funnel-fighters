/**
 * Persistent selling point & relevance score cache.
 * Primary: Vercel Postgres (survives deploys).
 * Fallback: in-memory + /tmp file cache (same as before).
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { query } from '@/lib/db/client';

const CACHE_DIR = '/tmp/ff-sp-cache';
const SP_FILE = join(CACHE_DIR, 'selling-points.json');
const REL_FILE = join(CACHE_DIR, 'relevance-scores.json');
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheEntry {
  value: string;
  ts: number;
}

export interface RelevanceResult {
  score: number;
  reason: string;
}

interface RelCacheEntry {
  value: RelevanceResult;
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

// --- DB helpers ---

async function dbGetSellingPoint(key: string): Promise<string | null> {
  try {
    const rows = await query<{ selling_point: string }>(
      `SELECT selling_point FROM selling_points WHERE entity_key = $1 AND expires_at > NOW()`,
      [key],
    );
    return rows && rows.length > 0 ? rows[0].selling_point : null;
  } catch {
    return null;
  }
}

async function dbSetSellingPoint(key: string, value: string, entityType: string): Promise<void> {
  try {
    await query(
      `INSERT INTO selling_points (entity_type, entity_key, selling_point, model_version, computed_at, expires_at)
       VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '30 days')
       ON CONFLICT (entity_key) DO UPDATE SET selling_point = $3, model_version = $4, computed_at = NOW(), expires_at = NOW() + INTERVAL '30 days'`,
      [entityType, key, value, 'claude-sonnet-4-20250514'],
    );
  } catch (e) {
    console.error('[Cache/DB] Failed to write selling point:', e);
  }
}

async function dbGetRelevanceScore(adSp: string, lpSp: string): Promise<RelevanceResult | null> {
  try {
    const rows = await query<{ score: number; reason: string }>(
      `SELECT score, reason FROM relevance_scores WHERE ad_selling_point = $1 AND lp_selling_point = $2 AND expires_at > NOW()`,
      [adSp, lpSp],
    );
    return rows && rows.length > 0 ? { score: rows[0].score, reason: rows[0].reason || '' } : null;
  } catch {
    return null;
  }
}

async function dbSetRelevanceScore(adSp: string, lpSp: string, result: RelevanceResult): Promise<void> {
  try {
    await query(
      `INSERT INTO relevance_scores (ad_selling_point, lp_selling_point, score, reason, model_version, computed_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW() + INTERVAL '30 days')
       ON CONFLICT (ad_selling_point, lp_selling_point) DO UPDATE SET score = $3, reason = $4, model_version = $5, computed_at = NOW(), expires_at = NOW() + INTERVAL '30 days'`,
      [adSp, lpSp, result.score, result.reason, 'claude-sonnet-4-20250514'],
    );
  } catch (e) {
    console.error('[Cache/DB] Failed to write relevance score:', e);
  }
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

export async function getSellingPointAsync(key: string): Promise<string | null> {
  // Check memory/file first (fast)
  const local = getSellingPoint(key);
  if (local) return local;

  // Check DB (slower but survives cold starts)
  const dbResult = await dbGetSellingPoint(key);
  if (dbResult) {
    // Warm local cache
    const cache = loadSpCache();
    cache.set(key, { value: dbResult, ts: Date.now() });
    debouncedPersistSp();
    return dbResult;
  }

  return null;
}

export function setSellingPoint(key: string, value: string): void {
  const cache = loadSpCache();
  cache.set(key, { value, ts: Date.now() });
  debouncedPersistSp();

  // Write to DB in background (fire-and-forget)
  const entityType = key.startsWith('lp:') ? 'lp' : 'ad';
  dbSetSellingPoint(key, value, entityType).catch(() => {});
}

export function getRelevanceScore(adSp: string, lpSp: string): RelevanceResult | null {
  const cache = loadRelCache();
  const key = `${adSp}::${lpSp}`;
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export async function getRelevanceScoreAsync(adSp: string, lpSp: string): Promise<RelevanceResult | null> {
  const local = getRelevanceScore(adSp, lpSp);
  if (local) return local;

  const dbResult = await dbGetRelevanceScore(adSp, lpSp);
  if (dbResult) {
    const cache = loadRelCache();
    const key = `${adSp}::${lpSp}`;
    cache.set(key, { value: dbResult, ts: Date.now() });
    debouncedPersistRel();
    return dbResult;
  }

  return null;
}

export function setRelevanceScore(adSp: string, lpSp: string, result: RelevanceResult): void {
  const cache = loadRelCache();
  const key = `${adSp}::${lpSp}`;
  cache.set(key, { value: result, ts: Date.now() });
  debouncedPersistRel();

  // Write to DB in background
  dbSetRelevanceScore(adSp, lpSp, result).catch(() => {});
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
