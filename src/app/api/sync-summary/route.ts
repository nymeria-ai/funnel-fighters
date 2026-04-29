import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

// GET /api/sync-summary — public (no auth) lightweight sync status for the badge
// Returns the most recent synced_at timestamp across key ad tables.
export async function GET() {
  const tableQueries = [
    { table: 'accounts', col: 'synced_at' },
    { table: 'ad_metrics_daily', col: 'date' },
    { table: 'lp_funnel_metrics', col: 'updated_at' },
    { table: 'product_funnel_metrics', col: 'updated_at' },
  ];

  const results: Record<string, string | null> = {};

  for (const { table, col } of tableQueries) {
    const rows = await query<{ last: string | null }>(
      `SELECT MAX(${col})::TEXT AS last FROM ${table}`
    );
    results[table] = rows?.[0]?.last ?? null;
  }

  // Overall last sync = max across all tables
  const timestamps = Object.values(results).filter(Boolean) as string[];
  const overallLast = timestamps.length
    ? timestamps.sort().at(-1) ?? null
    : null;

  return NextResponse.json({ overallLast, tables: results });
}
