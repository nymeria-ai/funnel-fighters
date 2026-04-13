/**
 * Database client wrapper.
 * Uses @vercel/postgres when POSTGRES_URL is set, otherwise returns null.
 * All callers must handle the null case (graceful fallback).
 */

import { sql, createPool } from '@vercel/postgres';
import type { VercelPool } from '@vercel/postgres';

let pool: VercelPool | null = null;

function isConfigured(): boolean {
  return !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
}

export function getPool(): VercelPool | null {
  if (!isConfigured()) return null;
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

/**
 * Execute a SQL query with graceful fallback.
 * Returns null if the database is not configured or the query fails.
 */
export async function query<T extends Record<string, unknown>>(
  text: string,
  params?: unknown[],
): Promise<T[] | null> {
  if (!isConfigured()) return null;

  try {
    const pool = getPool();
    if (!pool) return null;
    const result = await pool.query(text, params);
    return result.rows as T[];
  } catch (error) {
    console.error('[DB] Query failed:', error);
    return null;
  }
}

/**
 * Execute a raw SQL statement (for migrations).
 */
export async function exec(text: string): Promise<boolean> {
  if (!isConfigured()) return false;

  try {
    const pool = getPool();
    if (!pool) return false;
    await pool.query(text);
    return true;
  } catch (error) {
    console.error('[DB] Exec failed:', error);
    return false;
  }
}

export { sql, isConfigured };
