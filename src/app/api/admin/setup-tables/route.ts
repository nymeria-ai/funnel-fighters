import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getPool } from '@/lib/db/client';

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

const TABLES = [
  `CREATE TABLE IF NOT EXISTS sync_runs (
    id SERIAL PRIMARY KEY,
    sync_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'running',
    started_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    rows_processed INTEGER DEFAULT 0,
    error_message TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  )`,
  `CREATE TABLE IF NOT EXISTS lp_funnel_metrics (
    campaign_name TEXT NOT NULL,
    landing_page TEXT NOT NULL,
    device TEXT NOT NULL DEFAULT 'all',
    visits INTEGER DEFAULT 0,
    get_started INTEGER DEFAULT 0,
    gs_rate NUMERIC(5,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (campaign_name, landing_page, device)
  )`,
  `CREATE TABLE IF NOT EXISTS product_funnel_metrics (
    campaign_name TEXT NOT NULL,
    landing_page TEXT NOT NULL,
    device TEXT NOT NULL DEFAULT 'all',
    lp_product TEXT NOT NULL DEFAULT '(unknown)',
    signup_product TEXT NOT NULL DEFAULT '(unknown)',
    installed_product TEXT NOT NULL DEFAULT '(unknown)',
    soft_signups INTEGER DEFAULT 0,
    hard_signups INTEGER DEFAULT 0,
    payers_28d INTEGER DEFAULT 0,
    acv_28d NUMERIC(12,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (campaign_name, landing_page, device, signup_product)
  )`,
  `CREATE TABLE IF NOT EXISTS funnel_weekly (
    week_start DATE NOT NULL,
    device TEXT NOT NULL DEFAULT 'all',
    visits INTEGER DEFAULT 0,
    get_started INTEGER DEFAULT 0,
    soft_signups INTEGER DEFAULT 0,
    hard_signups INTEGER DEFAULT 0,
    payers_28d INTEGER DEFAULT 0,
    acv_28d NUMERIC(12,2) DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (week_start, device)
  )`,
  `CREATE TABLE IF NOT EXISTS duck_scores (
    measured_at DATE NOT NULL,
    duck_type TEXT NOT NULL,
    score NUMERIC(5,2),
    sub_scores JSONB DEFAULT '{}',
    PRIMARY KEY (measured_at, duck_type)
  )`,
];

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pool = getPool();
  if (!pool) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const results: string[] = [];
  let failed = false;

  for (let i = 0; i < TABLES.length; i++) {
    try {
      await pool.query(TABLES[i]);
      results.push(`Statement ${i + 1}: OK`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      results.push(`Statement ${i + 1}: FAILED — ${msg}`);
      failed = true;
    }
  }

  return NextResponse.json({
    success: !failed,
    results,
  }, { status: failed ? 500 : 200 });
}
