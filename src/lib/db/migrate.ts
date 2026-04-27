/**
 * Database migration runner.
 * Uses inline SQL to ensure it works on Vercel serverless
 * (where filesystem access to src/ files is not available at runtime).
 */

import { exec, isConfigured } from './client';

const FUNNEL_SCHEMA = `
CREATE TABLE IF NOT EXISTS sync_runs (
  id               SERIAL PRIMARY KEY,
  sync_type        TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'running',
  started_at       TIMESTAMPTZ DEFAULT NOW(),
  completed_at     TIMESTAMPTZ,
  rows_processed   INTEGER DEFAULT 0,
  error_message    TEXT
);

CREATE TABLE IF NOT EXISTS settings (
  key              TEXT PRIMARY KEY,
  value            JSONB NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS duck_scores (
  measured_at       DATE NOT NULL,
  duck_type         TEXT NOT NULL,
  score             NUMERIC(5,2),
  sub_scores        JSONB DEFAULT '{}',
  PRIMARY KEY (measured_at, duck_type)
);

INSERT INTO settings (key, value) VALUES
  ('mcc_id', '"7645779471"'),
  ('target_accounts', '["Main","Verticals","Verticals2","Locals","AW mobile","agent factory","Canvas by monday.com","monday.com brand","monday.com CRM - Product Growth","harp AI"]'),
  ('gsc_site_url', '"sc-domain:monday.com"'),
  ('rank_weights', '{"gsc": 0.5, "ahrefs": 0.5}'),
  ('sp_ttl_days', '30'),
  ('rank_ttl_days', '7')
ON CONFLICT (key) DO NOTHING;
`;

export async function runMigrations(): Promise<{ success: boolean; message: string }> {
  if (!isConfigured()) {
    return { success: false, message: 'Database not configured (no POSTGRES_URL)' };
  }

  try {
    // Split by semicolons, filter empty/comment-only lines
    const statements = FUNNEL_SCHEMA
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let executed = 0;
    for (const statement of statements) {
      const ok = await exec(statement + ';');
      if (!ok) {
        return { success: false, message: `Failed at statement ${executed + 1}: ${statement.substring(0, 80)}...` };
      }
      executed++;
    }

    return { success: true, message: `Executed ${executed} statements successfully` };
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Migration error: ${msg}` };
  }
}
