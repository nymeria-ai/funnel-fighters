import { NextRequest, NextResponse } from 'next/server';
import { query, exec } from '@/lib/db/client';

export const maxDuration = 60;

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  return token === SYNC_SECRET;
}

type SyncType = 'lp_funnel' | 'product_funnel' | 'weekly' | 'duck_scores';

interface SyncPayload {
  type: SyncType;
  rows: Record<string, unknown>[];
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) return unauthorized();

  const body = (await req.json()) as SyncPayload;
  const { type, rows } = body;

  if (!type || !rows || !Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: 'Invalid payload: need type and rows[]' }, { status: 400 });
  }

  let upserted = 0;

  try {
    switch (type) {
      case 'lp_funnel':
        for (const row of rows) {
          await query(
            `INSERT INTO lp_funnel_metrics (campaign_name, landing_page, device, visits, get_started, gs_rate, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (campaign_name, landing_page, device)
             DO UPDATE SET visits=$4, get_started=$5, gs_rate=$6, updated_at=NOW()`,
            [
              row.campaign_name || '(not set)',
              row.landing_page || '(not set)',
              row.device || 'all',
              row.visits || 0,
              row.get_started || 0,
              row.gs_rate || 0,
            ]
          );
          upserted++;
        }
        break;

      case 'product_funnel':
        for (const row of rows) {
          await query(
            `INSERT INTO product_funnel_metrics (campaign_name, landing_page, device, lp_product, signup_product, installed_product, soft_signups, hard_signups, payers_28d, acv_28d, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
             ON CONFLICT (campaign_name, landing_page, device, signup_product)
             DO UPDATE SET lp_product=$4, installed_product=$6, soft_signups=$7, hard_signups=$8, payers_28d=$9, acv_28d=$10, updated_at=NOW()`,
            [
              row.campaign_name || '(not set)',
              row.landing_page || '(not set)',
              row.device || 'all',
              row.lp_product || '(unknown)',
              row.signup_product || '(unknown)',
              row.installed_product || '(unknown)',
              row.soft_signups || 0,
              row.hard_signups || 0,
              row.payers_28d || 0,
              row.acv_28d || 0,
            ]
          );
          upserted++;
        }
        break;

      case 'weekly':
        for (const row of rows) {
          await query(
            `INSERT INTO funnel_weekly (week_start, device, visits, get_started, soft_signups, hard_signups, payers_28d, acv_28d, updated_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
             ON CONFLICT (week_start, device)
             DO UPDATE SET visits=$3, get_started=$4, soft_signups=$5, hard_signups=$6, payers_28d=$7, acv_28d=$8, updated_at=NOW()`,
            [
              row.week_start,
              row.device || 'all',
              row.visits || 0,
              row.get_started || 0,
              row.soft_signups || 0,
              row.hard_signups || 0,
              row.payers_28d || 0,
              row.acv_28d || 0,
            ]
          );
          upserted++;
        }
        break;

      case 'duck_scores':
        for (const row of rows) {
          await query(
            `INSERT INTO duck_scores (measured_at, duck_type, score, sub_scores)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (measured_at, duck_type)
             DO UPDATE SET score=$3, sub_scores=$4`,
            [
              row.measured_at,
              row.duck_type,
              row.score,
              JSON.stringify(row.sub_scores || {}),
            ]
          );
          upserted++;
        }
        break;

      default:
        return NextResponse.json({ error: `Unknown sync type: ${type}` }, { status: 400 });
    }

    // Log the sync run
    await query(
      `INSERT INTO sync_runs (sync_type, status, completed_at, rows_processed)
       VALUES ($1, 'completed', NOW(), $2)`,
      [`funnel_${type}`, upserted]
    );

    return NextResponse.json({ success: true, type, upserted });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[sync-funnel] Error syncing ${type}:`, msg);
    return NextResponse.json({ error: 'Sync failed', details: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) return unauthorized();

  // Return sync status: row counts + last updated per table
  const tables = ['lp_funnel_metrics', 'product_funnel_metrics', 'funnel_weekly', 'duck_scores'];
  const status: Record<string, { rows: number; lastUpdated: string | null }> = {};

  for (const table of tables) {
    const countResult = await query<{ count: string }>(`SELECT COUNT(*) as count FROM ${table}`);
    const lastResult = await query<{ last: string }>(`SELECT MAX(updated_at) as last FROM ${table}`);
    status[table] = {
      rows: countResult ? parseInt(countResult[0]?.count || '0') : 0,
      lastUpdated: lastResult?.[0]?.last || null,
    };
  }

  return NextResponse.json({ status });
}
