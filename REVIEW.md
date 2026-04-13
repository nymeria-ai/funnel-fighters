# Funnel Fighters HQ — Architecture Review

**Date:** 2026-04-14
**Reviewer:** Claude (automated deep review)
**Scope:** Full codebase — architecture, data model, scalability, caching, security

---

## 1. Current State Summary

Funnel Fighters HQ is a Next.js App Router dashboard for performance marketing analysis. It pulls data from Google Ads (MCC), Google Search Console, Ahrefs (via MCP), and Anthropic Claude to build a "4-duck alignment matrix" (Audience → Ads → Landing Pages → Product).

### What exists today

| Layer | Implementation | Status |
|---|---|---|
| **Auth** | NextAuth v5 + Google OAuth, email allowlist | Working |
| **Google Ads** | REST API v23, OAuth refresh token, read-only | Working |
| **Selling Points** | Claude Sonnet 4 extraction (ad + LP) | Working, slow |
| **Relevance Scoring** | Claude Sonnet 4, 0-100 scale | Working, slow |
| **Page Rank** | GSC position + Ahrefs UR → composite 1-10 | Working |
| **Caching** | /tmp file-based (selling points) + in-memory (rank) | Fragile |
| **Database** | **None** | Critical gap |
| **Background Jobs** | **None** | Critical gap |
| **Historical Tracking** | **None** | Not possible without DB |

### File inventory (source files only)

- **6 pages** (cockpit, ads, landing-pages, overview, audience, product, gaps, login)
- **8 API routes** (cockpit, ads, ad-details, accounts, landing-pages, page-rank, selling-points, relevance-score, chat)
- **4 lib modules** (google-ads, selling-points, ranking, scoring)
- **6 UI components** (Sidebar, RightPanel, DuckIcon, CollapsibleSection, DuckCard, FunnelScore)
- **1 mock data file** (`src/lib/data/mock.ts` — 337 lines, partially unused)

---

## 2. Architecture Issues

### CRITICAL

#### C1. No database — all computed data is ephemeral
Every page load either re-computes expensive data (selling points, relevance scores) or relies on `/tmp` cache that vanishes on Vercel cold starts. A single redeploy wipes all cached selling points and relevance scores.

- **Files:** `src/lib/selling-points/cache.ts:12` (`CACHE_DIR = '/tmp/ff-sp-cache'`)
- **Files:** `src/lib/ranking/cache.ts:15` (pure in-memory `Map`, no persistence at all)
- **Impact:** Every cold start = full re-computation. With 200 ads × 3 LLM calls each = 600 Anthropic API calls per cold cockpit load.
- **Cost:** At ~$0.003/call (Sonnet input+output), that's ~$1.80 per cold start. Multiple users = $10-50+/day.

#### C2. Cockpit API is a synchronous mega-request
`src/app/api/cockpit/route.ts` does ALL of this in a single GET request with a 120s timeout:
1. Fetch accounts from Google Ads (line 60)
2. Fetch ads + audience for 10 accounts in parallel (lines 66-74)
3. Fetch LP content for ~30 unique URLs (lines 142-149)
4. Extract ad selling points via LLM for 50 rows (lines 157-168)
5. Extract LP selling points via LLM for 50 rows (lines 171-188)
6. Score relevance via LLM for 50 rows (lines 191-204)

This is 150+ LLM calls in a single HTTP request. The 120s `maxDuration` is regularly hit.

#### C3. All API routes are unauthenticated
`src/middleware.ts:13` explicitly excludes ALL API routes from auth protection:
```
"/((?!login|api/auth|api/landing-pages|api/page-rank|api/ads|api/ad-details|api/accounts|api/cockpit|api/selling-points|api/relevance-score|..."
```
Anyone with the URL can call `/api/cockpit`, `/api/ads`, `/api/selling-points`, etc. without authentication. This exposes Google Ads data and allows unlimited Anthropic API consumption.

#### C4. Rate limiter is per-instance, not global
`src/lib/selling-points/extractor.ts:12-13` and `src/lib/selling-points/relevance.ts:12-13` both have independent `activeCalls` counters:
```typescript
let activeCalls = 0;
const queue: Array<{ resolve: () => void }> = [];
```
Each serverless instance has its own counter. 10 concurrent users = 10 × 5 = 50 concurrent Anthropic calls, easily hitting rate limits.

### MAJOR

#### M1. CockpitRow interface duplicated in 2 files
The `CockpitRow` interface is defined separately in:
- `src/app/cockpit/page.tsx:17-40` (client-side)
- `src/app/api/cockpit/route.ts:22-50` (server-side)

These can drift. The client version uses `AudienceInfo` while the server uses `AudienceRow` — they have the same shape but different names.

#### M2. `getRelevanceColor()` duplicated in 2 files
- `src/app/cockpit/page.tsx:59-70`
- `src/lib/selling-points/relevance.ts:101-112`

Identical function, copy-pasted. The cockpit page doesn't import from the lib.

#### M3. Two-phase data fetching creates race conditions
`src/app/cockpit/page.tsx:401-405`:
```typescript
fetchData(1, false).then(() => {
  fetchData(1, true);
});
```
First fetch (fast, no analysis) sets rows. Second fetch (slow, with analysis) replaces them entirely. If the user navigates or searches during the analysis phase, state can be inconsistent. The rank data useEffect (line 408) also re-fires on every row change, causing duplicate rank fetches.

#### M4. No retry logic anywhere
- `src/lib/google-ads/client.ts:55-68` — Google Ads API calls fail silently, return empty array
- `src/lib/selling-points/extractor.ts:57-61` — Anthropic calls fail silently
- `src/lib/ranking/ahrefs-mcp.ts:77-98` — Ahrefs MCP calls fail silently

No exponential backoff, no retry on transient 429/5xx errors. A single network blip = missing data for that page load.

#### M5. Google Ads queries have no rate limiting
`src/lib/google-ads/queries.ts` fires queries directly without any concurrency control. The cockpit route fires 10 parallel `getAdsWithUrls` + `getAudienceTargeting` = 20 concurrent Google Ads API calls. Google Ads API has per-account quotas that can be exhausted.

#### M6. MCC ID and TARGET_ACCOUNTS are hardcoded
- `src/lib/google-ads/client.ts:80` — `MCC_ID = '7645779471'`
- `src/app/api/cockpit/route.ts:16-20` — hardcoded account names

These should be configuration, not code. Adding/removing accounts requires a code change and redeploy.

#### M7. GSC site is hardcoded to `monday.com`
`src/app/api/page-rank/route.ts:44` — `siteUrl: 'sc-domain:monday.com'`

This makes the entire page-rank feature unusable for any other client/domain.

#### M8. Ahrefs MCP session state is global mutable
`src/lib/ranking/ahrefs-mcp.ts:10-11`:
```typescript
let sessionId: string | null = null;
let messageId = 0;
```
Global mutable state in serverless = undefined behavior. Two concurrent requests may interleave `messageId` increments or use a stale `sessionId`.

#### M9. Anthropic client instantiated at module scope in 3 places
- `src/lib/selling-points/extractor.ts:9`
- `src/lib/selling-points/relevance.ts:10`
- `src/app/api/chat/route.ts` (inline)

Should be a shared singleton.

### MINOR

#### m1. Oversized page components
- `src/app/cockpit/page.tsx` — 787 lines (should be ~200 max)
- `src/app/ads/page.tsx` — 547 lines

The cockpit page has 3 sub-components (`AdTab`, `LandingPageTab`, `CockpitPage`), 5 utility functions, 3 interfaces, and the main page — all in one file.

#### m2. `mock.ts` is 337 lines and partially unused
`src/lib/data/mock.ts` contains `mockGaps` that isn't imported anywhere (gaps page has its own hardcoded data). `mockChannels` and `mockCohorts` also appear unused in production.

#### m3. `debug: true` in auth config
`src/auth.ts:30` — verbose NextAuth debug logging is on in production. This logs session tokens and auth flow details to stdout.

#### m4. Missing TypeScript strictness
Heavy use of `any` type assertions in Google Ads queries (`src/lib/google-ads/queries.ts:49,69,101,186,216,247,285`). API responses are not validated — a schema change could silently produce wrong data.

#### m5. Error messages leak internal state
`src/app/api/cockpit/route.ts:226` — error responses are generic, but `console.error` logs may contain sensitive data in Vercel's log drain.

#### m6. No loading/error boundaries
Pages use local `useState` for error handling. A thrown error in any component crashes the entire page with no recovery. React Error Boundaries are not used.

#### m7. Unused adSpResults/lpSpResults/relResults variables
`src/app/api/cockpit/route.ts:157,171,191` — `Promise.allSettled` results are captured but never inspected. Failed promises are silently ignored.

---

## 3. Proposed Data Model

### Core Entities

```
┌─────────────┐     ┌──────────────┐     ┌──────────────────┐
│   Account    │────▶│   Campaign   │────▶│     Ad Group      │
│ (google_ads) │     │              │     │                   │
└─────────────┘     └──────────────┘     └──────────────────┘
                                                │
                                                ▼
                                          ┌──────────┐     ┌──────────────┐
                                          │    Ad     │────▶│ Landing Page │
                                          │          │     │              │
                                          └──────────┘     └──────────────┘
                                                │                  │
                                                ▼                  ▼
                                          ┌──────────┐     ┌──────────────┐
                                          │ Ad SP    │     │   LP SP      │
                                          │(computed)│     │  (computed)  │
                                          └──────────┘     └──────────────┘
                                                │                  │
                                                └──────┬───────────┘
                                                       ▼
                                                ┌──────────────┐
                                                │  Relevance   │
                                                │   Score      │
                                                └──────────────┘
```

### What should be stored vs computed

| Data | Store in DB? | Why |
|---|---|---|
| Account/Campaign/AdGroup/Ad metadata | Yes (synced) | Avoid re-fetching from Google Ads API on every page load |
| Ad performance metrics (30d) | Yes (daily snapshot) | Enable historical tracking, reduce API calls |
| Landing page URLs | Yes | Stable entity, referenced by ads |
| Ad selling points | **Yes** | Expensive to compute ($0.003/call), changes rarely |
| LP selling points | **Yes** | Expensive to compute, LP content changes slowly |
| LP content (extracted text) | **Yes** | Avoid re-crawling on every analysis |
| Relevance scores | **Yes** | Expensive, depends on SPs which change rarely |
| Page rank (GSC + Ahrefs) | **Yes** | External API calls, 7-day refresh is fine |
| Audience targeting criteria | Yes (synced) | Relatively static, avoid repeated API calls |
| User preferences | Yes | Currently impossible to store |

---

## 4. Recommended Changes (Prioritized)

### P0 — Do Now (blocks everything else)

| # | Change | Effort | Impact |
|---|---|---|---|
| 1 | **Add a database** (Vercel Postgres or Turso) | 2-3 days | Enables persistence, history, proper caching |
| 2 | **Authenticate API routes** — remove API exclusions from middleware matcher | 2 hours | Fixes critical security hole |
| 3 | **Move selling points + relevance scores to DB** | 1 day | Eliminates /tmp dependency, survives deploys |

### P1 — Do Next (critical for usability)

| # | Change | Effort | Impact |
|---|---|---|---|
| 4 | **Background sync job** — cron to fetch Google Ads data + pre-compute selling points | 2-3 days | Eliminates mega-request, page loads become fast |
| 5 | **Move rank cache to DB** | 0.5 day | Rank data survives cold starts |
| 6 | **Extract shared types** into `src/types/` | 0.5 day | Eliminates CockpitRow duplication |
| 7 | **Global rate limiter** for Anthropic API (Redis or DB-backed) | 1 day | Prevents quota exhaustion from concurrent users |
| 8 | **Make MCC_ID, TARGET_ACCOUNTS, GSC site configurable** (env vars or DB settings) | 0.5 day | No more hardcoded client-specific values |

### P2 — Do Soon (quality of life)

| # | Change | Effort | Impact |
|---|---|---|---|
| 9 | **Split cockpit page into components** (AdTab, LPTab, CockpitTable, SearchBar) | 0.5 day | Maintainability |
| 10 | **Add retry with exponential backoff** to Google Ads + Anthropic calls | 0.5 day | Resilience |
| 11 | **Validate Google Ads API responses** with zod schemas | 1 day | Type safety, catch API changes |
| 12 | **Add React Error Boundaries** | 0.5 day | Graceful degradation |
| 13 | **Disable auth debug mode in production** | 5 min | Security hygiene |
| 14 | **Clean up mock data** — remove unused mockGaps, mockChannels | 15 min | Reduce dead code |

### P3 — Do Later (strategic)

| # | Change | Effort | Impact |
|---|---|---|---|
| 15 | **Historical metrics snapshots** (daily cron stores 30d metrics) | 2 days | Trend analysis, the sparkline charts become real |
| 16 | **Incremental sync** — only fetch changed ads since last sync | 2 days | 10x faster sync at scale |
| 17 | **Multi-tenant support** — configurable accounts per user/org | 3-5 days | SaaS-readiness |
| 18 | **WebSocket/SSE for analysis progress** — stream SP extraction status | 1-2 days | Better UX than polling |

---

## 5. Proposed DB Schema

### Recommended: **Vercel Postgres** (Neon under the hood)

Reasons:
- Zero-config with Vercel deployment
- Serverless-friendly connection pooling
- SQL (familiar, powerful for aggregations)
- Free tier sufficient for current scale
- `@vercel/postgres` SDK integrates with Next.js

Alternative: **Turso** (libSQL/SQLite edge) if latency is critical — but Postgres is better for the aggregation queries this app needs.

### Schema

```sql
-- ============================================================
-- ACCOUNTS & CAMPAIGNS (synced from Google Ads)
-- ============================================================

CREATE TABLE accounts (
  id               TEXT PRIMARY KEY,          -- Google Ads customer ID
  name             TEXT NOT NULL,
  is_manager       BOOLEAN DEFAULT FALSE,
  mcc_id           TEXT NOT NULL,             -- parent MCC
  is_target        BOOLEAN DEFAULT TRUE,      -- in scope for analysis
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE campaigns (
  id               TEXT PRIMARY KEY,          -- Google Ads campaign ID
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  name             TEXT NOT NULL,
  status           TEXT NOT NULL,             -- ENABLED, PAUSED, REMOVED
  channel_type     TEXT,                      -- SEARCH, DISPLAY, etc.
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ad_groups (
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

CREATE TABLE ads (
  id               TEXT PRIMARY KEY,          -- Google Ads ad ID
  ad_group_id      TEXT NOT NULL REFERENCES ad_groups(id),
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  account_id       TEXT NOT NULL REFERENCES accounts(id),
  ad_type          TEXT NOT NULL,             -- RESPONSIVE_SEARCH_AD, EXPANDED_TEXT_AD
  status           TEXT NOT NULL,
  final_url        TEXT,
  final_url_domain TEXT,                      -- computed: extracted hostname
  headlines        JSONB DEFAULT '[]',        -- string[] for RSA
  descriptions     JSONB DEFAULT '[]',        -- string[] for RSA
  synced_at        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ads_account ON ads(account_id);
CREATE INDEX idx_ads_campaign ON ads(campaign_id);
CREATE INDEX idx_ads_final_url ON ads(final_url);

-- ============================================================
-- METRICS (daily snapshots — enables historical tracking)
-- ============================================================

CREATE TABLE ad_metrics_daily (
  ad_id            TEXT NOT NULL REFERENCES ads(id),
  date             DATE NOT NULL,
  impressions      BIGINT DEFAULT 0,
  clicks           BIGINT DEFAULT 0,
  cost_micros      BIGINT DEFAULT 0,
  conversions      REAL DEFAULT 0,
  PRIMARY KEY (ad_id, date)
);

CREATE INDEX idx_ad_metrics_date ON ad_metrics_daily(date);

-- Materialized 30-day rollup (refresh via cron)
CREATE VIEW ad_metrics_30d AS
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
-- LANDING PAGES (derived from ads, enriched with rank + content)
-- ============================================================

CREATE TABLE landing_pages (
  url              TEXT PRIMARY KEY,
  domain           TEXT,
  -- Extracted content (for SP analysis)
  content_title    TEXT,
  content_meta     TEXT,
  content_h1       TEXT,
  content_body     TEXT,                      -- truncated to ~3000 chars
  content_fetched_at TIMESTAMPTZ,
  -- Rank data
  gsc_position     REAL,
  gsc_impressions  BIGINT,
  gsc_score        REAL,                      -- 1-10 computed
  ahrefs_ur        INTEGER,                   -- 0-100 raw
  ahrefs_score     REAL,                      -- 1-10 computed
  composite_score  REAL,                      -- 1-10 weighted
  rank_fetched_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SELLING POINTS (LLM-computed, cached in DB)
-- ============================================================

CREATE TABLE selling_points (
  id               SERIAL PRIMARY KEY,
  entity_type      TEXT NOT NULL,             -- 'ad' or 'lp'
  entity_key       TEXT NOT NULL UNIQUE,      -- 'ad:{headlines}:{descriptions}' or 'lp:{url}'
  selling_point    TEXT NOT NULL,
  model_version    TEXT,                      -- 'claude-sonnet-4-20250514'
  computed_at      TIMESTAMPTZ DEFAULT NOW(),
  expires_at       TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
);

CREATE INDEX idx_sp_entity ON selling_points(entity_type, entity_key);
CREATE INDEX idx_sp_expires ON selling_points(expires_at);

-- ============================================================
-- RELEVANCE SCORES (LLM-computed, cached in DB)
-- ============================================================

CREATE TABLE relevance_scores (
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

CREATE INDEX idx_rel_pair ON relevance_scores(ad_selling_point, lp_selling_point);

-- ============================================================
-- AUDIENCE TARGETING (synced from Google Ads)
-- ============================================================

CREATE TABLE audience_criteria (
  id               SERIAL PRIMARY KEY,
  campaign_id      TEXT NOT NULL REFERENCES campaigns(id),
  criterion_id     TEXT NOT NULL,
  criterion_type   TEXT NOT NULL,             -- LOCATION, LANGUAGE, DEVICE, etc.
  criterion_name   TEXT,
  bid_modifier     REAL DEFAULT 1.0,
  synced_at        TIMESTAMPTZ,
  UNIQUE(campaign_id, criterion_id)
);

-- ============================================================
-- SYNC STATE (tracks background job progress)
-- ============================================================

CREATE TABLE sync_runs (
  id               SERIAL PRIMARY KEY,
  sync_type        TEXT NOT NULL,             -- 'google_ads', 'selling_points', 'page_rank'
  status           TEXT NOT NULL DEFAULT 'running', -- running, completed, failed
  started_at       TIMESTAMPTZ DEFAULT NOW(),
  completed_at     TIMESTAMPTZ,
  rows_processed   INTEGER DEFAULT 0,
  error_message    TEXT
);

-- ============================================================
-- APP SETTINGS (replaces hardcoded values)
-- ============================================================

CREATE TABLE settings (
  key              TEXT PRIMARY KEY,
  value            JSONB NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with current hardcoded values
INSERT INTO settings (key, value) VALUES
  ('mcc_id', '"7645779471"'),
  ('target_accounts', '["Main","Verticals","Verticals2","Locals","AW mobile","agent factory","Canvas by monday.com","monday.com brand","monday.com CRM - Product Growth","harp AI"]'),
  ('gsc_site_url', '"sc-domain:monday.com"'),
  ('rank_weights', '{"gsc": 0.5, "ahrefs": 0.5}'),
  ('sp_ttl_days', '30'),
  ('rank_ttl_days', '7');
```

### Background Sync Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Vercel Cron Jobs                    │
├─────────────────────────────────────────────────────┤
│                                                       │
│  Every 6h: /api/cron/sync-ads                        │
│    → Fetch accounts, campaigns, ads from Google Ads  │
│    → Upsert into DB                                  │
│    → Snapshot daily metrics                           │
│                                                       │
│  Every 6h: /api/cron/compute-selling-points          │
│    → Query ads without selling points                │
│    → Extract via Claude (batched, rate-limited)      │
│    → Store in selling_points table                   │
│                                                       │
│  Weekly: /api/cron/refresh-ranks                     │
│    → Query all unique landing page URLs              │
│    → Fetch GSC + Ahrefs data                         │
│    → Update landing_pages table                      │
│                                                       │
│  Every 6h: /api/cron/score-relevance                 │
│    → Query ad-LP pairs without relevance scores      │
│    → Score via Claude (batched)                      │
│    → Store in relevance_scores table                 │
│                                                       │
└─────────────────────────────────────────────────────┘
```

With this architecture, the cockpit API becomes a simple DB query:

```sql
SELECT
  a.id, a.name AS account_name,
  c.name AS campaign_name,
  ad.headlines, ad.descriptions, ad.final_url,
  m.impressions, m.clicks, m.cost_micros, m.conversions,
  sp_ad.selling_point AS ad_selling_point,
  sp_lp.selling_point AS lp_selling_point,
  rs.score AS relevance_score,
  rs.reason AS relevance_reason,
  lp.composite_score AS rank_score
FROM ads ad
JOIN accounts a ON ad.account_id = a.id
JOIN campaigns c ON ad.campaign_id = c.id
LEFT JOIN ad_metrics_30d m ON m.ad_id = ad.id
LEFT JOIN selling_points sp_ad ON sp_ad.entity_key = 'ad:' || ...
LEFT JOIN landing_pages lp ON lp.url = ad.final_url
LEFT JOIN selling_points sp_lp ON sp_lp.entity_key = 'lp:' || ad.final_url
LEFT JOIN relevance_scores rs ON rs.ad_selling_point = sp_ad.selling_point
  AND rs.lp_selling_point = sp_lp.selling_point
WHERE a.is_target = TRUE
ORDER BY m.cost_micros DESC
LIMIT 50 OFFSET 0;
```

Response time: **<200ms** instead of **30-120 seconds**.

---

## 6. Quick Wins (can do today)

1. **Fix the security hole** — remove API routes from middleware exclusion (`src/middleware.ts:13`). Keep only `/api/auth` excluded.

2. **Disable auth debug** — `src/auth.ts:30`: change `debug: true` to `debug: process.env.NODE_ENV === 'development'`

3. **Deduplicate `getRelevanceColor`** — delete from `cockpit/page.tsx:59-70`, import from `@/lib/selling-points/relevance`

4. **Extract shared types** — create `src/types/cockpit.ts` with `CockpitRow`, `PageRankResult`, `AudienceInfo`

5. **Move hardcoded values to env** — `MCC_ID`, `TARGET_ACCOUNTS`, `GSC_SITE_URL`

---

## 7. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Cold start wipes all cache → 600 LLM calls | **High** (every deploy) | $2-5 per occurrence | Add DB (P0) |
| Unauthenticated API abuse | **Medium** | Unlimited Anthropic spend | Fix middleware (P0) |
| Cockpit timeout at 120s | **High** (regularly hits) | Broken UX | Background sync (P1) |
| Google Ads API quota exhaustion | **Low** (small account set) | No data for hours | Add rate limiter (P2) |
| Anthropic rate limit (concurrent users) | **Medium** | Failed analysis | Global rate limiter (P1) |
| Ahrefs MCP session interleaving | **Low** | Wrong rank data | Make session per-request (P2) |

---

*End of review.*
