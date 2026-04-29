/**
 * One-time migration endpoint: drops ALL old tables and recreates from new schema.
 * DESTRUCTIVE — use only for clean-slate migrations.
 * After running once successfully, this endpoint should be removed.
 * 
 * POST /api/admin/migrate?confirm=CLEAN_SLATE_2026
 * Auth: ADMIN_SYNC_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getPool, isConfigured } from '@/lib/db/client';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

const DROP_ALL = `
DROP VIEW IF EXISTS ad_metrics_30d CASCADE;
DROP TABLE IF EXISTS relevance_scores CASCADE;
DROP TABLE IF EXISTS selling_points CASCADE;
DROP TABLE IF EXISTS ad_extension CASCADE;
DROP TABLE IF EXISTS landing_page_extension CASCADE;
DROP TABLE IF EXISTS ad_metrics_daily CASCADE;
DROP TABLE IF EXISTS audience_criteria CASCADE;
DROP TABLE IF EXISTS ads CASCADE;
DROP TABLE IF EXISTS ad_groups CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS landing_pages CASCADE;
DROP TABLE IF EXISTS lp_funnel_metrics CASCADE;
DROP TABLE IF EXISTS product_funnel_metrics CASCADE;
DROP TABLE IF EXISTS funnel_weekly CASCADE;
DROP TABLE IF EXISTS duck_scores CASCADE;
DROP TABLE IF EXISTS sync_runs CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS queries CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS channel_scores CASCADE;
DROP TABLE IF EXISTS funnels CASCADE;
`;

const NEW_SCHEMA = `
CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'google',
  is_manager BOOLEAN DEFAULT FALSE,
  mcc_id TEXT NOT NULL,
  is_target BOOLEAN DEFAULT TRUE,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'google',
  channel_type TEXT,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_groups (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  account_id TEXT NOT NULL REFERENCES accounts(id),
  name TEXT NOT NULL,
  channel TEXT NOT NULL DEFAULT 'google',
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ads (
  id TEXT PRIMARY KEY,
  ad_group_id TEXT NOT NULL REFERENCES ad_groups(id),
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  account_id TEXT NOT NULL REFERENCES accounts(id),
  channel TEXT NOT NULL DEFAULT 'google',
  ad_type TEXT NOT NULL,
  status TEXT NOT NULL,
  final_url TEXT,
  final_url_domain TEXT,
  headlines JSONB DEFAULT '[]',
  descriptions JSONB DEFAULT '[]',
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ads_account ON ads(account_id);
CREATE INDEX IF NOT EXISTS idx_ads_campaign ON ads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ads_final_url ON ads(final_url);

CREATE TABLE IF NOT EXISTS ad_metrics_daily (
  ad_id TEXT NOT NULL REFERENCES ads(id),
  date DATE NOT NULL,
  impressions BIGINT DEFAULT 0,
  clicks BIGINT DEFAULT 0,
  cost DECIMAL(15,6) DEFAULT 0,
  conversions REAL DEFAULT 0,
  PRIMARY KEY (ad_id, date)
);

CREATE INDEX IF NOT EXISTS idx_ad_metrics_date ON ad_metrics_daily(date);

CREATE OR REPLACE VIEW ad_metrics_30d AS
SELECT ad_id, SUM(impressions) AS impressions, SUM(clicks) AS clicks,
  SUM(cost) AS cost, SUM(conversions) AS conversions,
  CASE WHEN SUM(impressions) > 0 THEN ROUND(SUM(clicks)::NUMERIC / SUM(impressions) * 100, 2) ELSE 0 END AS ctr
FROM ad_metrics_daily WHERE date >= CURRENT_DATE - INTERVAL '30 days' GROUP BY ad_id;

CREATE TABLE IF NOT EXISTS landing_pages (
  url TEXT PRIMARY KEY, domain TEXT, content_title TEXT, content_meta TEXT,
  content_h1 TEXT, content_body TEXT, content_fetched_at TIMESTAMPTZ,
  gsc_position REAL, gsc_impressions BIGINT, gsc_score REAL,
  ahrefs_ur INTEGER, ahrefs_score REAL, composite_score REAL,
  rank_fetched_at TIMESTAMPTZ, created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_extension (
  id SERIAL PRIMARY KEY,
  ad_id TEXT NOT NULL REFERENCES ads(id),
  channel_ad_score INTEGER, internal_score INTEGER,
  selling_point TEXT, selling_point_hash TEXT,
  lp_relevance_score INTEGER CHECK (lp_relevance_score >= 0 AND lp_relevance_score <= 100),
  relevance_reason TEXT, computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ad_id)
);

CREATE INDEX IF NOT EXISTS idx_ad_extension_ad ON ad_extension(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_extension_hash ON ad_extension(selling_point_hash);

CREATE TABLE IF NOT EXISTS landing_page_extension (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL REFERENCES landing_pages(url),
  selling_point TEXT, google_lp_score INTEGER, performance_score INTEGER,
  content_summary TEXT, computed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(url)
);

CREATE INDEX IF NOT EXISTS idx_lp_extension_url ON landing_page_extension(url);

CREATE TABLE IF NOT EXISTS audience_criteria (
  id SERIAL PRIMARY KEY,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id),
  criterion_id TEXT NOT NULL, criterion_type TEXT NOT NULL,
  criterion_name TEXT, bid_modifier REAL DEFAULT 1.0,
  synced_at TIMESTAMPTZ, UNIQUE(campaign_id, criterion_id)
);

CREATE TABLE IF NOT EXISTS sync_runs (
  id SERIAL PRIMARY KEY, sync_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'running',
  started_at TIMESTAMPTZ DEFAULT NOW(), completed_at TIMESTAMPTZ,
  rows_processed INTEGER DEFAULT 0, error_message TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY, value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS queries (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('query', 'prompt')),
  name TEXT NOT NULL, content TEXT NOT NULL, description TEXT,
  version INT DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'unverified' CHECK (status IN ('unverified', 'verified', 'disabled')),
  created_by TEXT, approved_by TEXT, approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_queries_type_status ON queries(type, status);

CREATE TABLE IF NOT EXISTS lp_funnel_metrics (
  campaign_name TEXT NOT NULL, landing_page TEXT NOT NULL,
  device TEXT NOT NULL DEFAULT 'all',
  visits INTEGER DEFAULT 0, get_started INTEGER DEFAULT 0,
  gs_rate NUMERIC(5,2) DEFAULT 0, updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (campaign_name, landing_page, device)
);

CREATE TABLE IF NOT EXISTS product_funnel_metrics (
  campaign_name TEXT NOT NULL, landing_page TEXT NOT NULL,
  device TEXT NOT NULL DEFAULT 'all',
  lp_product TEXT NOT NULL DEFAULT '(unknown)',
  signup_product TEXT NOT NULL DEFAULT '(unknown)',
  installed_product TEXT NOT NULL DEFAULT '(unknown)',
  soft_signups INTEGER DEFAULT 0, hard_signups INTEGER DEFAULT 0,
  payers_28d INTEGER DEFAULT 0, acv_28d NUMERIC(12,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (campaign_name, landing_page, device, signup_product)
);

CREATE TABLE IF NOT EXISTS funnel_weekly (
  week_start DATE NOT NULL, device TEXT NOT NULL DEFAULT 'all',
  visits INTEGER DEFAULT 0, get_started INTEGER DEFAULT 0,
  soft_signups INTEGER DEFAULT 0, hard_signups INTEGER DEFAULT 0,
  payers_28d INTEGER DEFAULT 0, acv_28d NUMERIC(12,2) DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (week_start, device)
);

CREATE TABLE IF NOT EXISTS duck_scores (
  measured_at DATE NOT NULL, duck_type TEXT NOT NULL,
  score NUMERIC(5,2), sub_scores JSONB DEFAULT '{}',
  PRIMARY KEY (measured_at, duck_type)
);

INSERT INTO settings (key, value) VALUES
  ('mcc_id', '"7645779471"'),
  ('target_accounts', '["Main","Verticals","Verticals2","Locals","AW mobile","agent factory","Canvas by monday.com","monday.com brand","monday.com CRM - Product Growth","harp AI"]'),
  ('gsc_site_url', '"sc-domain:monday.com"'),
  ('rank_weights', '{"gsc": 0.5, "ahrefs": 0.5}'),
  ('sp_ttl_days', '30'),
  ('rank_ttl_days', '7'),
  ('llm_model', '"claude-opus-4-6"'),
  ('cron_time_utc', '"03:30"'),
  ('retention_days_raw', '180'),
  ('alert_channels', '["whatsapp_marketing_x1000"]')
ON CONFLICT (key) DO NOTHING;
`;

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const confirm = new URL(req.url).searchParams.get('confirm');
  if (confirm !== 'CLEAN_SLATE_2026') {
    return NextResponse.json({ 
      error: 'Safety check failed. Add ?confirm=CLEAN_SLATE_2026 to proceed.',
      warning: 'This will DROP ALL TABLES and recreate from scratch.'
    }, { status: 400 });
  }

  if (!isConfigured()) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const pool = getPool();
  if (!pool) {
    return NextResponse.json({ error: 'Cannot get DB pool' }, { status: 500 });
  }

  try {
    // Step 1: Drop all old tables
    const dropStatements = DROP_ALL.split(';').map(s => s.trim()).filter(s => s.length > 0);
    for (const stmt of dropStatements) {
      await pool.query(stmt + ';');
    }

    // Step 2: Create new schema
    const createStatements = NEW_SCHEMA.split(';').map(s => s.trim()).filter(s => s.length > 0);
    let created = 0;
    for (const stmt of createStatements) {
      await pool.query(stmt + ';');
      created++;
    }

    return NextResponse.json({ 
      success: true, 
      message: `Clean slate migration complete. Dropped old tables, created ${created} new statements.`,
      tables: [
        'accounts', 'campaigns', 'ad_groups', 'ads', 'ad_metrics_daily',
        'landing_pages', 'ad_extension', 'landing_page_extension',
        'audience_criteria', 'sync_runs', 'settings', 'queries',
        'lp_funnel_metrics', 'product_funnel_metrics', 'funnel_weekly', 'duck_scores'
      ]
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: 'Migration failed', details: msg }, { status: 500 });
  }
}
