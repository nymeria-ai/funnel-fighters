-- ============================================================
-- ACCOUNTS & CAMPAIGNS (synced from Google Ads and other channels)
-- ============================================================

-- Data retention policy (enforced by scheduled cleanup cron):
--   Raw daily metrics (ad_metrics_daily): kept 180 days
--   Monthly rollups (future): kept forever
-- Cleanup query: DELETE FROM ad_metrics_daily WHERE date < CURRENT_DATE - INTERVAL '180 days'

CREATE TABLE IF NOT EXISTS accounts (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  channel          TEXT NOT NULL DEFAULT 'google',  -- 'google', 'meta', 'linkedin', etc.
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
  channel          TEXT NOT NULL DEFAULT 'google',
  channel_type     TEXT,
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ad_groups (
  id               TEXT PRIMARY KEY,
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  name             TEXT NOT NULL,
  channel          TEXT NOT NULL DEFAULT 'google',
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ADS (synced from all channels)
-- ============================================================

CREATE TABLE IF NOT EXISTS ads (
  id               TEXT PRIMARY KEY,
  ad_group_id      TEXT NOT NULL REFERENCES ad_groups(id),
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  channel          TEXT NOT NULL DEFAULT 'google',
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
-- cost stored in dollars DECIMAL(15,6) — normalize from any channel before insert.
-- Data retention: raw daily kept 180 days (cleanup via scheduled cron).
-- ============================================================

CREATE TABLE IF NOT EXISTS ad_metrics_daily (
  ad_id            TEXT NOT NULL REFERENCES ads(id),
  date             DATE NOT NULL,
  impressions      BIGINT DEFAULT 0,
  clicks           BIGINT DEFAULT 0,
  cost             DECIMAL(15,6) DEFAULT 0,  -- in dollars, normalized from any channel
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
  SUM(cost) AS cost,
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
-- AD EXTENSION (replaces selling_points + relevance_scores)
-- LLM-computed per ad. Hash-based recomputation:
--   Hash(headlines + descriptions) → only recompute when hash changes.
-- ============================================================

CREATE TABLE IF NOT EXISTS ad_extension (
  id                   SERIAL PRIMARY KEY,
  ad_id                TEXT NOT NULL REFERENCES ads(id),
  channel_ad_score     INTEGER,                           -- platform quality score (0-100)
  internal_score       INTEGER,                           -- our computed score (0-100)
  selling_point        TEXT,                              -- LLM-extracted selling point
  selling_point_hash   TEXT,                              -- MD5 of headlines+descriptions; recompute when changed
  lp_relevance_score   INTEGER CHECK (lp_relevance_score >= 0 AND lp_relevance_score <= 100),
  relevance_reason     TEXT,
  computed_at          TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(ad_id)
);

CREATE INDEX IF NOT EXISTS idx_ad_extension_ad ON ad_extension(ad_id);
CREATE INDEX IF NOT EXISTS idx_ad_extension_hash ON ad_extension(selling_point_hash);

-- ============================================================
-- LANDING PAGE EXTENSION (LLM-computed per LP)
-- ============================================================

CREATE TABLE IF NOT EXISTS landing_page_extension (
  id               SERIAL PRIMARY KEY,
  url              TEXT NOT NULL REFERENCES landing_pages(url),
  selling_point    TEXT,
  google_lp_score  INTEGER,
  performance_score INTEGER,
  content_summary  TEXT,
  computed_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(url)
);

CREATE INDEX IF NOT EXISTS idx_lp_extension_url ON landing_page_extension(url);

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
-- Configurable: LLM model, cron time, retention period, alert channels.
-- ============================================================

CREATE TABLE IF NOT EXISTS settings (
  key              TEXT PRIMARY KEY,
  value            JSONB NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- QUERIES & PROMPTS
-- Stores both BigBrain SQL queries AND LLM prompts.
-- Runtime pulls from this table — never hardcoded.
-- New queries start as 'unverified'; approved → 'verified'; 'disabled' = soft-deleted.
-- ============================================================

CREATE TABLE IF NOT EXISTS queries (
  id               SERIAL PRIMARY KEY,
  type             TEXT NOT NULL CHECK (type IN ('query', 'prompt')),
  name             TEXT NOT NULL,
  content          TEXT NOT NULL,
  description      TEXT,
  version          INT DEFAULT 1,
  status           TEXT NOT NULL DEFAULT 'unverified' CHECK (status IN ('unverified', 'verified', 'disabled')),
  created_by       TEXT,
  approved_by      TEXT,
  approved_at      TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_queries_type_status ON queries(type, status);

-- ============================================================
-- FUNNEL DATA (seeded from BigBrain via admin sync)
-- All tables store AGGREGATED data only — no PII.
-- ============================================================

-- LP funnel metrics: visit → get_started per campaign/LP
CREATE TABLE IF NOT EXISTS lp_funnel_metrics (
  campaign_name     TEXT NOT NULL,
  landing_page      TEXT NOT NULL,
  device            TEXT NOT NULL DEFAULT 'all',
  visits            INTEGER DEFAULT 0,
  get_started       INTEGER DEFAULT 0,
  gs_rate           NUMERIC(5,2) DEFAULT 0,
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (campaign_name, landing_page, device)
);

-- Product funnel metrics: signup → payer + product alignment
CREATE TABLE IF NOT EXISTS product_funnel_metrics (
  campaign_name       TEXT NOT NULL,
  landing_page        TEXT NOT NULL,
  device              TEXT NOT NULL DEFAULT 'all',
  lp_product          TEXT NOT NULL DEFAULT '(unknown)',
  signup_product      TEXT NOT NULL DEFAULT '(unknown)',
  installed_product   TEXT NOT NULL DEFAULT '(unknown)',
  soft_signups        INTEGER DEFAULT 0,
  hard_signups        INTEGER DEFAULT 0,
  payers_28d          INTEGER DEFAULT 0,
  acv_28d             NUMERIC(12,2) DEFAULT 0,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (campaign_name, landing_page, device, signup_product)
);

-- Weekly cohort funnel (Roy's funnel table)
CREATE TABLE IF NOT EXISTS funnel_weekly (
  week_start        DATE NOT NULL,
  device            TEXT NOT NULL DEFAULT 'all',
  visits            INTEGER DEFAULT 0,
  get_started       INTEGER DEFAULT 0,
  soft_signups      INTEGER DEFAULT 0,
  hard_signups      INTEGER DEFAULT 0,
  payers_28d        INTEGER DEFAULT 0,
  acv_28d           NUMERIC(12,2) DEFAULT 0,
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (week_start, device)
);

-- Product campaign funnel: source × campaign × product breakdown from BigBrain l4.dim_accounts
-- Synced via product_funnel_by_campaign query (query #4)
CREATE TABLE IF NOT EXISTS product_campaign_funnel (
  source              TEXT NOT NULL,
  campaign            TEXT NOT NULL,
  product             TEXT NOT NULL DEFAULT '(unknown)',
  total_signups       INTEGER DEFAULT 0,
  engaged_2nd_day     INTEGER DEFAULT 0,
  paying_accounts     INTEGER DEFAULT 0,
  engagement_rate     NUMERIC(5,2) DEFAULT 0,
  payer_rate          NUMERIC(5,2) DEFAULT 0,
  updated_at          TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (source, campaign, product)
);

CREATE INDEX IF NOT EXISTS idx_pcf_source ON product_campaign_funnel(source);
CREATE INDEX IF NOT EXISTS idx_pcf_product ON product_campaign_funnel(product);

-- Duck scores over time
CREATE TABLE IF NOT EXISTS duck_scores (
  measured_at       DATE NOT NULL,
  duck_type         TEXT NOT NULL,
  score             NUMERIC(5,2),
  sub_scores        JSONB DEFAULT '{}',
  PRIMARY KEY (measured_at, duck_type)
);

-- Seed defaults (only if not already present)
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
