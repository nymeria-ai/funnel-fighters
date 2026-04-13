-- ============================================================
-- ACCOUNTS & CAMPAIGNS (synced from Google Ads)
-- ============================================================

CREATE TABLE IF NOT EXISTS accounts (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  is_manager       BOOLEAN DEFAULT FALSE,
  mcc_id           TEXT NOT NULL,
  is_target        BOOLEAN DEFAULT TRUE,
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaigns (
  id               TEXT PRIMARY KEY,
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  name             TEXT NOT NULL,
  status           TEXT NOT NULL,
  channel_type     TEXT,
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_groups (
  id               TEXT PRIMARY KEY,
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  name             TEXT NOT NULL,
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADS (synced from Google Ads)
-- ============================================================

CREATE TABLE IF NOT EXISTS ads (
  id               TEXT PRIMARY KEY,
  ad_group_id      TEXT NOT NULL REFERENCES ad_groups(id),
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  ad_type          TEXT NOT NULL,
  status           TEXT NOT NULL,
  final_url        TEXT,
  final_url_domain TEXT,
  headlines        JSONB DEFAULT '[]',
  descriptions     JSONB DEFAULT '[]',
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ads_account ON ads(account_id);
CREATE INDEX IF NOT EXISTS idx_ads_campaign ON ads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_ads_final_url ON ads(final_url);

-- ============================================================
-- METRICS (daily snapshots)
-- ============================================================

CREATE TABLE IF NOT EXISTS ad_metrics_daily (
  ad_id            TEXT NOT NULL REFERENCES ads(id),
  date             DATE NOT NULL,
  impressions      BIGINT DEFAULT 0,
  clicks           BIGINT DEFAULT 0,
  cost_micros      BIGINT DEFAULT 0,
  conversions      REAL DEFAULT 0,
  PRIMARY KEY (ad_id, date)
);

CREATE INDEX IF NOT EXISTS idx_ad_metrics_date ON ad_metrics_daily(date);

-- 30-day rollup view
CREATE OR REPLACE VIEW ad_metrics_30d AS
SELECT
  ad_id,
  SUM(impressions) AS impressions,
  SUM(clicks) AS clicks,
  SUM(cost_micros) AS cost_micros,
  SUM(conversions) AS conversions,
  CASE WHEN SUM(impressions) > 0
    THEN ROUND(SUM(clicks)::NUMERIC / SUM(impressions) * 100, 2)
    ELSE 0
  END AS ctr
FROM ad_metrics_daily
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY ad_id;

-- ============================================================
-- LANDING PAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS landing_pages (
  url              TEXT PRIMARY KEY,
  domain           TEXT,
  content_title    TEXT,
  content_meta     TEXT,
  content_h1       TEXT,
  content_body     TEXT,
  content_fetched_at TIMESTAMPTZ,
  gsc_position     REAL,
  gsc_impressions  BIGINT,
  gsc_score        REAL,
  ahrefs_ur        INTEGER,
  ahrefs_score     REAL,
  composite_score  REAL,
  rank_fetched_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SELLING POINTS (LLM-computed, cached in DB)
-- ============================================================

CREATE TABLE IF NOT EXISTS selling_points (
  id               SERIAL PRIMARY KEY,
  entity_type      TEXT NOT NULL,
  entity_key       TEXT NOT NULL UNIQUE,
  selling_point    TEXT NOT NULL,
  model_version    TEXT,
  computed_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at       TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);

CREATE INDEX IF NOT EXISTS idx_sp_entity ON selling_points(entity_type, entity_key);
CREATE INDEX IF NOT EXISTS idx_sp_expires ON selling_points(expires_at);

-- ============================================================
-- RELEVANCE SCORES (LLM-computed, cached in DB)
-- ============================================================

CREATE TABLE IF NOT EXISTS relevance_scores (
  id               SERIAL PRIMARY KEY,
  ad_selling_point TEXT NOT NULL,
  lp_selling_point TEXT NOT NULL,
  score            INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  reason           TEXT,
  model_version    TEXT,
  computed_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at       TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  UNIQUE(ad_selling_point, lp_selling_point)
);

CREATE INDEX IF NOT EXISTS idx_rel_pair ON relevance_scores(ad_selling_point, lp_selling_point);

-- ============================================================
-- AUDIENCE TARGETING (synced from Google Ads)
-- ============================================================

CREATE TABLE IF NOT EXISTS audience_criteria (
  id               SERIAL PRIMARY KEY,
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  criterion_id     TEXT NOT NULL,
  criterion_type   TEXT NOT NULL,
  criterion_name   TEXT,
  bid_modifier     REAL DEFAULT 1.0,
  synced_at        TIMESTAMPTZ,
  UNIQUE(campaign_id, criterion_id)
);

-- ============================================================
-- SYNC STATE
-- ============================================================

CREATE TABLE IF NOT EXISTS sync_runs (
  id               SERIAL PRIMARY KEY,
  sync_type        TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'running',
  started_at       TIMESTAMPTZ DEFAULT NOW(),
  completed_at     TIMESTAMPTZ,
  rows_processed   INTEGER DEFAULT 0,
  error_message    TEXT
);

-- ============================================================
-- APP SETTINGS
-- ============================================================

CREATE TABLE IF NOT EXISTS settings (
  key              TEXT PRIMARY KEY,
  value            JSONB NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Seed defaults (only if not already present)
INSERT INTO settings (key, value) VALUES
  ('mcc_id', '"7645779471"'),
  ('target_accounts', '["Main","Verticals","Verticals2","Locals","AW mobile","agent factory","Canvas by monday.com","monday.com brand","monday.com CRM - Product Growth","harp AI"]'),
  ('gsc_site_url', '"sc-domain:monday.com"'),
  ('rank_weights', '{"gsc": 0.5, "ahrefs": 0.5}'),
  ('sp_ttl_days', '30'),
  ('rank_ttl_days', '7')
ON CONFLICT (key) DO NOTHING;
