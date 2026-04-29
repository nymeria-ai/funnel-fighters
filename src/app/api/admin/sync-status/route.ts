import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

// Per-table config: which column to use for "last synced" timestamp
const TABLE_CONFIGS: Array<{ table: string; lastSyncedCol: string }> = [
  { table: 'accounts',               lastSyncedCol: 'synced_at' },
  { table: 'campaigns',              lastSyncedCol: 'synced_at' },
  { table: 'ad_groups',              lastSyncedCol: 'synced_at' },
  { table: 'ads',                    lastSyncedCol: 'synced_at' },
  { table: 'ad_metrics_daily',       lastSyncedCol: 'date' },
  { table: 'ad_extension',           lastSyncedCol: 'computed_at' },
  { table: 'landing_page_extension', lastSyncedCol: 'computed_at' },
  { table: 'lp_funnel_metrics',      lastSyncedCol: 'updated_at' },
  { table: 'product_funnel_metrics', lastSyncedCol: 'updated_at' },
];

// GET /api/admin/sync-status — per-table row counts + last synced + last 10 sync_runs
export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tables: Record<string, { rows: number; lastSynced: string | null }> = {};

  for (const { table, lastSyncedCol } of TABLE_CONFIGS) {
    const countResult = await query<{ count: string }>(
      `SELECT COUNT(*) AS count FROM ${table}`
    );
    const lastResult = await query<{ last: string }>(
      `SELECT MAX(${lastSyncedCol})::TEXT AS last FROM ${table}`
    );
    tables[table] = {
      rows: countResult ? parseInt(countResult[0]?.count || '0', 10) : 0,
      lastSynced: lastResult?.[0]?.last ?? null,
    };
  }

  const syncRuns = await query(
    `SELECT id, sync_type, status, started_at, completed_at, rows_processed, error_message
     FROM sync_runs
     ORDER BY started_at DESC
     LIMIT 10`
  );

  return NextResponse.json({
    tables,
    recentSyncRuns: syncRuns ?? [],
  });
}
