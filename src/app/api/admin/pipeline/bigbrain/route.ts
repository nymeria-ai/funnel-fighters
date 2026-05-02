/**
 * POST /api/admin/pipeline/bigbrain
 *
 * BigBrain bridge endpoint — called by Ygritte (the external agent) during the daily sync.
 *
 * Body: { action: "get-queries" | "submit-results", ... }
 *
 *   action=get-queries:
 *     Returns all verified queries from the queries table (type='query', status='verified').
 *     Response: { queries: QueryRow[] }
 *
 *   action=submit-results:
 *     Accepts { queryId, rows: [...] } and upserts into the appropriate table
 *     based on the query's name/description metadata.
 *     Response: { success: true, upserted: number }
 *
 * Auth: Bearer ADMIN_SYNC_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

interface GetQueriesBody extends Record<string, unknown> {
  action: 'get-queries';
}

interface SubmitResultsBody extends Record<string, unknown> {
  action: 'submit-results';
  queryId: number;
  rows: Record<string, unknown>[];
}

type BigBrainBody = GetQueriesBody | SubmitResultsBody;

interface QueryRow extends Record<string, unknown> {
  id: number;
  name: string;
  content: string;
  description: string | null;
  version: number;
  approved_by: string | null;
  approved_at: string | null;
}

// Map query names to target tables for submit-results routing.
// Query names are registered in the queries table; this maps them to upsert logic.
const QUERY_TARGET_MAP: Record<string, string> = {
  lp_funnel_metrics: 'lp_funnel_metrics',
  product_funnel_metrics: 'product_funnel_metrics',
  product_funnel_by_campaign: 'product_campaign_funnel',
  funnel_weekly: 'funnel_weekly',
  duck_scores: 'duck_scores',
};

async function upsertLpFunnelMetrics(rows: Record<string, unknown>[]): Promise<number> {
  let upserted = 0;
  for (const row of rows) {
    await query(
      `INSERT INTO lp_funnel_metrics (campaign_name, landing_page, device, visits, get_started, gs_rate, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (campaign_name, landing_page, device) DO UPDATE SET
         visits = EXCLUDED.visits,
         get_started = EXCLUDED.get_started,
         gs_rate = EXCLUDED.gs_rate,
         updated_at = NOW()`,
      [
        row.campaign_name,
        row.landing_page,
        row.device ?? 'all',
        row.visits ?? 0,
        row.get_started ?? 0,
        row.gs_rate ?? 0,
      ]
    );
    upserted++;
  }
  return upserted;
}

async function upsertProductFunnelMetrics(rows: Record<string, unknown>[]): Promise<number> {
  let upserted = 0;
  for (const row of rows) {
    await query(
      `INSERT INTO product_funnel_metrics
         (campaign_name, landing_page, device, lp_product, signup_product, installed_product,
          soft_signups, hard_signups, payers_28d, acv_28d, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
       ON CONFLICT (campaign_name, landing_page, device, signup_product) DO UPDATE SET
         lp_product = EXCLUDED.lp_product,
         installed_product = EXCLUDED.installed_product,
         soft_signups = EXCLUDED.soft_signups,
         hard_signups = EXCLUDED.hard_signups,
         payers_28d = EXCLUDED.payers_28d,
         acv_28d = EXCLUDED.acv_28d,
         updated_at = NOW()`,
      [
        row.campaign_name,
        row.landing_page,
        row.device ?? 'all',
        row.lp_product ?? '(unknown)',
        row.signup_product ?? '(unknown)',
        row.installed_product ?? '(unknown)',
        row.soft_signups ?? 0,
        row.hard_signups ?? 0,
        row.payers_28d ?? 0,
        row.acv_28d ?? 0,
      ]
    );
    upserted++;
  }
  return upserted;
}

async function upsertFunnelWeekly(rows: Record<string, unknown>[]): Promise<number> {
  let upserted = 0;
  for (const row of rows) {
    await query(
      `INSERT INTO funnel_weekly
         (week_start, device, visits, get_started, soft_signups, hard_signups, payers_28d, acv_28d, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
       ON CONFLICT (week_start, device) DO UPDATE SET
         visits = EXCLUDED.visits,
         get_started = EXCLUDED.get_started,
         soft_signups = EXCLUDED.soft_signups,
         hard_signups = EXCLUDED.hard_signups,
         payers_28d = EXCLUDED.payers_28d,
         acv_28d = EXCLUDED.acv_28d,
         updated_at = NOW()`,
      [
        row.week_start,
        row.device ?? 'all',
        row.visits ?? 0,
        row.get_started ?? 0,
        row.soft_signups ?? 0,
        row.hard_signups ?? 0,
        row.payers_28d ?? 0,
        row.acv_28d ?? 0,
      ]
    );
    upserted++;
  }
  return upserted;
}

async function upsertProductCampaignFunnel(rows: Record<string, unknown>[]): Promise<number> {
  // Ensure table exists (migration may not have run)
  await query(
    `CREATE TABLE IF NOT EXISTS product_campaign_funnel (
      source TEXT NOT NULL,
      campaign TEXT NOT NULL,
      product TEXT NOT NULL DEFAULT '(unknown)',
      total_signups INTEGER DEFAULT 0,
      engaged_2nd_day INTEGER DEFAULT 0,
      paying_accounts INTEGER DEFAULT 0,
      engagement_rate NUMERIC(5,2) DEFAULT 0,
      payer_rate NUMERIC(5,2) DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      PRIMARY KEY (source, campaign, product)
    )`
  );

  let upserted = 0;
  const errors: string[] = [];
  for (const row of rows) {
    try {
      const result = await query(
        `INSERT INTO product_campaign_funnel (source, campaign, product, total_signups, engaged_2nd_day, paying_accounts, engagement_rate, payer_rate, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         ON CONFLICT (source, campaign, product) DO UPDATE SET
           total_signups = EXCLUDED.total_signups,
           engaged_2nd_day = EXCLUDED.engaged_2nd_day,
           paying_accounts = EXCLUDED.paying_accounts,
           engagement_rate = EXCLUDED.engagement_rate,
           payer_rate = EXCLUDED.payer_rate,
           updated_at = NOW()
         RETURNING source`,
        [
          String(row.source ?? '(unknown)'),
          String(row.campaign ?? '(unknown)'),
          String(row.product ?? '(unknown)'),
          Number(row.total_signups ?? 0),
          Number(row.engaged_2nd_day ?? 0),
          Number(row.paying_accounts ?? 0),
          Number(row.engagement_rate ?? 0),
          Number(row.payer_rate ?? 0),
        ]
      );
      if (result && result.length > 0) {
        upserted++;
      } else {
        errors.push(`Row ${row.source}/${row.campaign}: result=${JSON.stringify(result)}`);
      }
    } catch (err) {
      errors.push(`Row ${row.source}/${row.campaign}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
  if (errors.length > 0) {
    console.error('[bigbrain] product_campaign_funnel errors:', errors.slice(0, 5));
  }
  return upserted;
}

async function upsertDuckScores(rows: Record<string, unknown>[]): Promise<number> {
  let upserted = 0;
  for (const row of rows) {
    await query(
      `INSERT INTO duck_scores (measured_at, duck_type, score, sub_scores)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (measured_at, duck_type) DO UPDATE SET
         score = EXCLUDED.score,
         sub_scores = EXCLUDED.sub_scores`,
      [
        row.measured_at,
        row.duck_type,
        row.score ?? null,
        JSON.stringify(row.sub_scores ?? {}),
      ]
    );
    upserted++;
  }
  return upserted;
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: BigBrainBody;
  try {
    body = (await req.json()) as BigBrainBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!body.action || !['get-queries', 'submit-results'].includes(body.action)) {
    return NextResponse.json({ error: 'action must be "get-queries" or "submit-results"' }, { status: 400 });
  }

  // ── action=get-queries ────────────────────────────────────────────────────
  if (body.action === 'get-queries') {
    const rows = await query<QueryRow>(
      `SELECT id, name, content, description, version, approved_by, approved_at
       FROM queries
       WHERE type = 'query' AND status = 'verified'
       ORDER BY id`
    );

    return NextResponse.json({ queries: rows ?? [] });
  }

  // ── action=submit-results ─────────────────────────────────────────────────
  const submitBody = body as SubmitResultsBody;
  const { queryId, rows } = submitBody;

  if (!queryId || !rows || !Array.isArray(rows)) {
    return NextResponse.json({ error: 'submit-results requires queryId and rows[]' }, { status: 400 });
  }

  // Look up query metadata to determine which table to upsert into
  const queryMeta = await query<{ name: string; description: string | null }>(
    `SELECT name, description FROM queries WHERE id = $1 AND type = 'query' AND status = 'verified'`,
    [queryId]
  );

  if (!queryMeta || queryMeta.length === 0) {
    return NextResponse.json({ error: `Query ${queryId} not found or not verified` }, { status: 404 });
  }

  const { name: queryName } = queryMeta[0];
  const targetTable = QUERY_TARGET_MAP[queryName];

  if (!targetTable) {
    return NextResponse.json(
      { error: `No upsert handler registered for query "${queryName}". Add it to QUERY_TARGET_MAP.` },
      { status: 400 }
    );
  }

  try {
    let upserted = 0;
    switch (targetTable) {
      case 'lp_funnel_metrics':
        upserted = await upsertLpFunnelMetrics(rows);
        break;
      case 'product_funnel_metrics':
        upserted = await upsertProductFunnelMetrics(rows);
        break;
      case 'product_campaign_funnel':
        upserted = await upsertProductCampaignFunnel(rows);
        break;
      case 'funnel_weekly':
        upserted = await upsertFunnelWeekly(rows);
        break;
      case 'duck_scores':
        upserted = await upsertDuckScores(rows);
        break;
    }

    await query(
      `INSERT INTO sync_runs (sync_type, status, completed_at, rows_processed)
       VALUES ($1, 'completed', NOW(), $2)`,
      [`bigbrain:query:${queryId}:${queryName}`, upserted]
    );

    return NextResponse.json({ success: true, queryId, queryName, targetTable, upserted });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[bigbrain] submit-results error:', errorMsg);
    return NextResponse.json({ error: 'Upsert failed', details: errorMsg }, { status: 500 });
  }
}
