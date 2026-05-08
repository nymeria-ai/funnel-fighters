-- Funnel Fighters — Mart Campaign Metrics Schema
-- Source: BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH (Snowflake)

DROP TABLE IF EXISTS campaign_metrics;

CREATE TABLE campaign_metrics (
  id SERIAL PRIMARY KEY,

  -- Dimensions
  day DATE NOT NULL,
  channel TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'GB',
  campaign TEXT NOT NULL,
  ad_group TEXT,
  ad_name TEXT,
  keyword TEXT,
  match_type TEXT,

  -- Spend & traffic
  spend REAL DEFAULT 0,
  impressions INTEGER,
  clicks INTEGER,

  -- Signup funnel
  hard_signups_n INTEGER DEFAULT 0,
  qualified_signups_n INTEGER DEFAULT 0,
  gmail_signups_n INTEGER DEFAULT 0,
  work_manager_n INTEGER DEFAULT 0,
  twoday_active_n INTEGER DEFAULT 0,
  mkt_twoday_active_n INTEGER DEFAULT 0,
  invited_others_n INTEGER DEFAULT 0,
  setup_24h_crm_n INTEGER DEFAULT 0,
  contact_sales_n INTEGER DEFAULT 0,
  distributed_leads_n INTEGER DEFAULT 0,
  distributed_signup_leads_n INTEGER DEFAULT 0,
  distributed_cs_leads_n INTEGER DEFAULT 0,
  sql_n INTEGER DEFAULT 0,
  opp_n INTEGER DEFAULT 0,
  deal_n INTEGER DEFAULT 0,

  -- Paying cohorts
  paying_7d_n INTEGER DEFAULT 0,
  paying_14d_n INTEGER DEFAULT 0,
  paying_21d_n INTEGER DEFAULT 0,
  paying_28d_n INTEGER DEFAULT 0,
  paying_35d_n INTEGER DEFAULT 0,
  paying_60d_n INTEGER DEFAULT 0,
  paying_90d_n INTEGER DEFAULT 0,
  paying_120d_n INTEGER DEFAULT 0,
  paying_lifetime_n INTEGER DEFAULT 0,

  -- Collection cohorts
  collection_7d REAL,
  collection_14d REAL,
  collection_21d REAL,
  collection_28d REAL,
  collection_35d REAL,
  collection_60d REAL,
  collection_90d REAL,
  collection_120d REAL,
  collection_365d REAL,

  -- MRR cohorts
  mrr_7d REAL,
  mrr_14d REAL,
  mrr_21d REAL,
  mrr_28d REAL,
  mrr_35d REAL,
  mrr_60d REAL,
  mrr_90d REAL,
  mrr_120d REAL,
  mrr_lifetime REAL,

  -- ARR
  claimed_arr REAL,
  pipeline_arr_28d REAL,
  pipeline_arr_ratio REAL,
  arr_7d REAL,
  arr_14d REAL,
  arr_21d REAL,
  arr_28d REAL,
  arr_35d REAL,
  arr_60d REAL,
  arr_90d REAL,
  arr_lifetime REAL,

  -- ML scores
  avg_qe_score REAL,
  avg_payer_probability REAL,
  avg_predicted_first_arr REAL,
  avg_calibrated_prediction REAL,

  -- Account-level
  avg_company_size REAL,
  avg_team_size REAL,
  company_size_group TEXT,

  -- Google Ads quality
  quality_score REAL,
  landing_page_experience TEXT,
  ad_relevance TEXT,
  predicted_ctr_label TEXT,

  -- Auction metrics
  bid_strategy_type TEXT,
  search_impr_share REAL,
  headroom_pct REAL,
  abs_top_impr_share REAL,

  -- Calculated rates
  ctr REAL,
  cpc REAL,
  cvr_signup REAL,
  cvr_contact_sales REAL,
  work_manager_pct REAL,
  twoday_active_pct REAL,
  deal_pct REAL,

  -- Unit economics
  cost_per_signup REAL,
  cost_per_contact_sales REAL,
  cost_per_deal REAL,

  -- Composite scores
  arr_proxy_per_spend REAL,
  waste_score REAL,
  scale_score REAL,
  predicted_value_score REAL,
  priority_tier TEXT
);

-- Dedup index with COALESCE to handle NULLs
CREATE UNIQUE INDEX idx_cm_dedup ON campaign_metrics (
  day, channel, country, campaign,
  COALESCE(ad_group, ''), COALESCE(ad_name, ''), COALESCE(keyword, '')
);

-- Performance indexes
CREATE INDEX idx_cm_day ON campaign_metrics(day);
CREATE INDEX idx_cm_channel ON campaign_metrics(channel);
CREATE INDEX idx_cm_country ON campaign_metrics(country);
CREATE INDEX idx_cm_campaign ON campaign_metrics(campaign);
CREATE INDEX idx_cm_priority ON campaign_metrics(priority_tier);
CREATE INDEX idx_cm_country_day ON campaign_metrics(country, day);
CREATE INDEX idx_cm_country_channel ON campaign_metrics(country, channel);
