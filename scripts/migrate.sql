-- Funnel Fighters V2 — Database Schema
-- Run via /api/admin/setup-tables or directly against the DB

-- Selling points taxonomy
CREATE TABLE IF NOT EXISTS selling_points (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Audience segments
CREATE TABLE IF NOT EXISTS audience_segments (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('search', 'meta', 'youtube', 'linkedin')),
  targeting_type TEXT NOT NULL CHECK (targeting_type IN ('keyword', 'interest', 'retargeting', 'lookalike')),
  keyword TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ad variants
CREATE TABLE IF NOT EXISTS ad_variants (
  id TEXT PRIMARY KEY,
  audience_segment_id TEXT NOT NULL REFERENCES audience_segments(id),
  channel TEXT NOT NULL CHECK (channel IN ('search', 'meta', 'youtube', 'linkedin')),
  headline TEXT NOT NULL DEFAULT '',
  body_copy TEXT NOT NULL DEFAULT '',
  cta_label TEXT NOT NULL DEFAULT '',
  asset_url TEXT,
  selling_points JSONB NOT NULL DEFAULT '[]',
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  ctr REAL NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Landing page variants
CREATE TABLE IF NOT EXISTS lp_variants (
  id TEXT PRIMARY KEY,
  url TEXT,
  utm_params JSONB NOT NULL DEFAULT '{}',
  hero_headline TEXT NOT NULL DEFAULT '',
  subheadline TEXT NOT NULL DEFAULT '',
  cta_label TEXT NOT NULL DEFAULT '',
  value_props JSONB NOT NULL DEFAULT '[]',
  selling_points JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LP sessions (quantitative data)
CREATE TABLE IF NOT EXISTS lp_sessions (
  id TEXT PRIMARY KEY,
  lp_variant_id TEXT NOT NULL REFERENCES lp_variants(id),
  audience_segment_id TEXT NOT NULL REFERENCES audience_segments(id),
  session_duration_s REAL NOT NULL DEFAULT 0,
  scroll_depth_pct REAL NOT NULL DEFAULT 0,
  bounced BOOLEAN NOT NULL DEFAULT FALSE,
  cta_clicked BOOLEAN NOT NULL DEFAULT FALSE,
  converted BOOLEAN NOT NULL DEFAULT FALSE,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Onboarding variants
CREATE TABLE IF NOT EXISTS onboarding_variants (
  id TEXT PRIMARY KEY,
  welcome_copy TEXT NOT NULL DEFAULT '',
  steps JSONB NOT NULL DEFAULT '[]',
  selling_points JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User onboarding events
CREATE TABLE IF NOT EXISTS user_onboarding_events (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  ad_variant_id TEXT NOT NULL REFERENCES ad_variants(id),
  lp_variant_id TEXT NOT NULL REFERENCES lp_variants(id),
  onboarding_variant_id TEXT REFERENCES onboarding_variants(id),
  signup_ts TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  day2_returned BOOLEAN NOT NULL DEFAULT FALSE
);

-- Funnel paths (the join key)
CREATE TABLE IF NOT EXISTS funnel_paths (
  id TEXT PRIMARY KEY,
  audience_segment_id TEXT NOT NULL REFERENCES audience_segments(id),
  ad_variant_id TEXT NOT NULL REFERENCES ad_variants(id),
  lp_variant_id TEXT NOT NULL REFERENCES lp_variants(id),
  onboarding_variant_id TEXT REFERENCES onboarding_variants(id),
  consistency_score REAL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_ad_variants_audience ON ad_variants(audience_segment_id);
CREATE INDEX IF NOT EXISTS idx_ad_variants_channel ON ad_variants(channel);
CREATE INDEX IF NOT EXISTS idx_lp_sessions_variant ON lp_sessions(lp_variant_id);
CREATE INDEX IF NOT EXISTS idx_lp_sessions_audience ON lp_sessions(audience_segment_id);
CREATE INDEX IF NOT EXISTS idx_funnel_paths_audience ON funnel_paths(audience_segment_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_ad ON user_onboarding_events(ad_variant_id);
CREATE INDEX IF NOT EXISTS idx_user_onboarding_lp ON user_onboarding_events(lp_variant_id);
