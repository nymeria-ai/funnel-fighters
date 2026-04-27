# Funnel Fighters — System Spec

**Repo:** github.com/nymeria-ai/funnel-fighters
**Stack:** Next.js 16.2.3 (Turbopack), React, Tailwind CSS, Neon Postgres
**Hosting:** Vercel (project: `ff-new2`, alias: `funnel-fighters.vercel.app`)
**Auth:** ADMIN_SYNC_SECRET (env var, Bearer token for admin endpoints)

---

## 1. Pages

| Route | Status | What it does |
|---|---|---|
| `/` | ✅ | Redirects → `/cockpit` |
| `/cockpit` | ✅ | **New funnel cockpit.** Horizontal funnel rows per channel. Drill-down: channel → country → campaign → ad group. Timeline selector (1d/7d/14d/30d/90d/custom). |
| `/cockpit/ads` | ✅ | **Old cockpit.** Ad alignment matrix (ad ↔ LP relevance scoring). |
| `/overview` | ✅ | Duck scores dashboard + weekly funnel cohorts. |
| `/landing-pages` | ✅ | LP performance table (visits, GS rate, rankings). |
| `/product` | ✅ | Product funnel metrics (signup → payer by product). |
| `/insights` | ✅ | Cross-analysis findings (reads from static JSON file). |
| `/ads` | ✅ | Google Ads browser (campaigns, ads, metrics). |
| `/audience` | ✅ | Audience criteria viewer. |
| `/gaps` | ✅ | Gap analysis (hardcoded static data, not dynamically computed). |
| `/recommendations` | ✅ | Recommendations (placeholder, relies on selling points + relevance scores). |
| `/login` | ✅ | NextAuth login page (Google OAuth + email allowlist). Auth enforced via middleware.ts — redirects unauthenticated users. Admin sync endpoints bypass middleware (own Bearer auth). |

---

## 2. API Endpoints

### 2.1 Cockpit (new funnel view)

**`GET /api/cockpit/funnel`** — Main cockpit data
- **Params:** `days` (1/7/14/30/90), `start_date`, `end_date`, `source` (channel_type for drill-down), `level` (country/campaign/adgroup), `country`, `campaign`
- **Data source:** Joins `ad_metrics_daily` (Google Ads) with `bigbrain_funnel` (BigBrain) via `campaigns` table. Channel mapping: Google Ads `channel_type` enum → display name (2=search, 6=video, etc.)
- **Returns:** Channel rows with: impressions, clicks, CTR, cost, signups, hard_signups, engaged_2nd_day, paying, CVR rates, quality scores
- **Scoring:** Percentile-based within each drill-down level (ad_score from CTR, lp_score from signup CVR, product_score from engagement rate)
- **Computed on the fly:** Yes, no caching

### 2.2 Cockpit (old alignment view)

**`GET /api/cockpit`** — Ad-LP alignment matrix
- **Data source:** Tries Google Ads API live (`getAdsWithUrls`). Falls back to DB (`getCockpitRowsFromDb` from `db-fallback.ts`).
- **Joins:** `ads` → `ad_groups` → `campaigns` → `accounts` + `ad_metrics_30d` (view)
- **Returns:** Ads with headlines, descriptions, final_url, metrics, selling points, relevance scores
- **Computed on the fly:** Yes

### 2.3 Funnel Data

| Endpoint | Source | What |
|---|---|---|
| `GET /api/funnel/health` | DB: `duck_scores` + `funnel_weekly` | Overall duck score + funnel summary |
| `GET /api/funnel/scores` | DB: `duck_scores` | Latest score per duck type + trend sparklines |
| `GET /api/funnel/lp` | DB: `lp_funnel_metrics` | LP funnel rows (campaign, LP, visits, GS rate) |
| `GET /api/funnel/product` | DB: `product_funnel_metrics` | Product funnel (signup→payer by product) |
| `GET /api/funnel/cohorts` | DB: `funnel_weekly` | Weekly cohort data |
| `GET /api/funnel/mismatches` | DB: `product_funnel_metrics` | Product-LP mismatches (where LP product ≠ signup product) |
| `GET /api/funnel/static-data` | Filesystem: `/data/*.json` | Static fallback (files not deployed to Vercel) |

### 2.4 Google Ads

| Endpoint | Source | What |
|---|---|---|
| `GET /api/ads` | **Live Google Ads API** (`getAdsWithUrls`) | 3-level browser: accounts → campaigns → ads. Query param `level` controls depth. |
| `GET /api/ad-details` | **Live Google Ads API** | Single ad: keywords, ad copy, audience targeting, search terms (parallel fetch) |
| `GET /api/accounts` | **Live Google Ads API** (`getAccounts`) | List accounts |
| `GET /api/landing-pages` | **Live Google Ads API** (`getAdsWithUrls` → `extractLandingPages`) | Deduplicated LP list from ad final_urls (not from DB `landing_pages` table) |
| `GET /api/page-rank` | **Live GSC API + Ahrefs MCP protocol** (not REST) + in-memory/DB cache | LP composite score (GSC position + Ahrefs UR) |

### 2.5 LLM-Computed (cached in DB)

| Endpoint | Source | What |
|---|---|---|
| `GET /api/selling-points` | **Anthropic Claude** (claude-sonnet-4) → 3-tier cache: in-memory Map → /tmp JSON → DB `selling_points` (TTL 7d). Max 5 concurrent LLM calls (semaphore). | LLM-generated selling points per ad/LP |
| `GET /api/relevance-score` | **Anthropic Claude** (claude-sonnet-4) → cached in DB `relevance_scores` (TTL 30d) | Ad↔LP relevance score (0-100) with reason |
| `GET /api/recommendations` | **In-memory** (server-side Map), generated from CockpitRow analysis | Action recommendations |
| `GET /api/insights` | Filesystem: `/data/insights.json` | Static insights (not DB) |
| `POST /api/chat` | **Anthropic SDK** (claude-sonnet-4, streaming) | Chat with data context |

### 2.6 Admin (write endpoints)

| Endpoint | Auth | What |
|---|---|---|
| `POST /api/admin/sync-funnel` | Bearer token | Sync LP funnel, product funnel, weekly cohorts, duck scores |
| `POST /api/admin/sync-ads` | Bearer token | Sync accounts, campaigns, ad_groups, ads, ad_metrics |
| `POST /api/admin/sync-bigbrain` | Bearer token | Sync BigBrain funnel data (signups, 2DAU, paying by campaign/adgroup) |
| `POST /api/admin/setup-tables` | Bearer token | Create missing DB tables (inline SQL) |
| `POST /api/admin/migrate` | No auth | Run full schema.sql migration |

---

## 3. Data Flow

```
Google Ads API                        BigBrain (Snowflake)
     │                                      │
     │ sync-ads                              │ sync-bigbrain
     ▼                                      ▼
┌─────────────────────┐           ┌──────────────────┐
│ accounts            │           │ bigbrain_funnel   │
│ campaigns           │           │  - source         │
│ ad_groups           │◄──JOIN───►│  - campaign_name  │
│ ads                 │           │  - ad_group_name  │
│ ad_metrics_daily    │           │  - signups        │
└─────────────────────┘           │  - hard_signups   │
                                  │  - engaged_2nd_day│
sync-funnel                       │  - paying         │
     │                            └──────────────────┘
     ▼
┌─────────────────────┐
│ lp_funnel_metrics   │
│ product_funnel_metrics│
│ funnel_weekly       │
│ duck_scores         │
└─────────────────────┘
```

**Join logic (cockpit/funnel):**
- Google Ads → BigBrain: `campaigns.name = bigbrain_funnel.campaign_name`
- Grouped by `campaigns.channel_type` (Google Ads enum: 2=SEARCH, 6=VIDEO, etc.)
- Date filter on `ad_metrics_daily.date`

---

## 4. Scoring

### Ad Quality Score
- Based on CTR percentile within drill-down level
- Percentile → 0-100 scale
- Future: incorporate Google Ads Quality Score

### LP Quality Score
- Based on CVR (clicks → hard signups) percentile
- Percentile → 0-100 scale
- Future: weighted with GSC rank, Ahrefs UR, page speed

### Product Score
- Based on engagement rate (2nd day DAU / signups) percentile
- Percentile → 0-100 scale

### Duck Scores (overview page)
- Product Duck: manual/synced score (0-100)
- LP Duck: weighted formula (GS rate 35%, relevance 25%, rank 20%, speed 20%)
- Ads Duck: manual/synced score
- Audience Duck: manual/synced score

All scores are **auto-computed + overridable** (option C per Ido's spec).

---

## 5. Infra

| Component | Detail |
|---|---|
| DB | Neon Postgres (Vercel integration) |
| Vercel project | `ff-new2` (auto-deploy from `main` branch) |
| Domain | `funnel-fighters.vercel.app` (alias to ff-new2) |
| Git | `nymeria-ai/funnel-fighters` (private) |
| Google Ads | API v23, MCC 764-577-9471, read-only via Nymeria's OAuth |
| Meta Ads | Graph API v21.0, System User token, 12 ad accounts |
| BigBrain | Snowflake, accessed via Ygritte's credentials |
| Env vars | DB: `POSTGRES_URL`, `DATABASE_URL` + 15 PG vars. Auth: `ADMIN_SYNC_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `ALLOWED_EMAILS`. Google Ads: `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_MCC_ID`, `GOOGLE_ADS_TARGET_ACCOUNTS`. GSC: `GSC_CLIENT_ID`, `GSC_CLIENT_SECRET`, `GSC_REFRESH_TOKEN`, `GSC_SITE_URL`. Other: `AHREFS_API_KEY` |

---

## 6. Known Gaps / Not Implemented

| Item | Status |
|---|---|
| Multi-channel cockpit (Meta, LinkedIn, Reddit, Bing) | Channels defined, no data synced yet |
| Google Ads Quality Score in ad scoring | Field exists in API, not synced |
| Page speed scoring | Placeholder in code, no integration |
| Automated data refresh (cron) | No scheduled sync — all manual via admin endpoints |
| LP content fetching | Table exists, no scraper implemented |
| Audience criteria in cockpit | Table exists, not connected to funnel view |

---

## Appendix A: Database Schema

### accounts
| Column | Type | Notes |
|---|---|---|
| id | text PK | Google Ads account ID |
| name | text | |
| is_manager | boolean | |
| mcc_id | text | Parent MCC ID |
| is_target | boolean | |
| synced_at | timestamptz | Last sync timestamp |
**Rows: 1**

### campaigns
| Column | Type | Notes |
|---|---|---|
| id | text PK | Google Ads campaign ID |
| account_id | text FK→accounts | |
| name | text | |
| status | text | ENABLED/PAUSED/REMOVED |
| channel_type | text | Google Ads enum (2=SEARCH, 6=VIDEO, etc.) |
| synced_at | timestamptz | Last sync timestamp |
**Rows: 100**

### ad_groups
| Column | Type | Notes |
|---|---|---|
| id | text PK | Google Ads ad group ID |
| campaign_id | text FK→campaigns | |
| account_id | text FK→accounts | |
| name | text | |
| synced_at | timestamptz | Last sync timestamp |
**Rows: 201**

### ads
| Column | Type | Notes |
|---|---|---|
| id | text PK | Google Ads ad ID |
| ad_group_id | text FK→ad_groups | |
| campaign_id | text FK→campaigns | |
| account_id | text FK→accounts | |
| ad_type | text | RESPONSIVE_SEARCH_AD etc. |
| status | text | |
| final_url | text | Landing page URL |
| headlines | jsonb | Array of headline strings |
| descriptions | jsonb | Array of description strings |
| final_url_domain | text | Extracted domain from final_url |
| synced_at | timestamptz | Last sync timestamp |
**Rows: 297**

### ad_metrics_daily
| Column | Type | Notes |
|---|---|---|
| ad_id | text PK (composite) | FK→ads |
| date | date PK (composite) | |
| impressions | bigint | |
| clicks | bigint | |
| cost_micros | bigint | Cost in micros (÷1M for dollars) |
| conversions | real | Google Ads conversions (not used in new cockpit) |
**Rows: 297** (all same date — single snapshot, not daily)

### bigbrain_funnel
| Column | Type | Notes |
|---|---|---|
| source | text PK (composite) | UTM source (adwordssearch, adwordsbrand, etc.) |
| campaign_name | text PK (composite) | Matches campaigns.name |
| ad_group_name | text PK (composite) | Matches ad_groups.name |
| period_start | date PK (composite) | |
| period_end | date | End of period (not part of PK) |
| total_signups | integer | All signups |
| hard_signups | integer | Qualified signups |
| engaged_2nd_day | integer | 2nd day DAU |
| paying | integer | Converted to paying |
| hard_signup_rate | numeric | Hard signup / total signup rate |
| engagement_rate | numeric | 2nd day DAU / signups rate |
| paying_rate | numeric | Paying / signups rate |
| synced_at | timestamptz | Last sync timestamp |
**Rows: 68** (partial — 3,863 available in BigBrain)

### lp_funnel_metrics
| Column | Type | Notes |
|---|---|---|
| campaign_name | text PK (composite) | |
| landing_page | text PK (composite) | |
| device | text PK (composite) | |
| visits | integer | |
| get_started | integer | |
| gs_rate | numeric | Visit-to-GS conversion rate |
**Rows: 34**

### product_funnel_metrics
| Column | Type | Notes |
|---|---|---|
| campaign_name | text PK (composite) | |
| landing_page | text PK (composite) | |
| device | text PK (composite) | |
| signup_product | text PK (composite) | |
| lp_product | text | What LP promotes |
| installed_product | text | What user actually installed |
| soft_signups | integer | |
| hard_signups | integer | |
| payers_28d | integer | |
| acv_28d | numeric | |
**Rows: 20**

### funnel_weekly
| Column | Type | Notes |
|---|---|---|
| week_start | date PK (composite) | |
| device | text PK (composite) | |
| visits→get_started→soft_signups→hard_signups→payers_28d→acv_28d | integers/numeric | Full weekly funnel |
**Rows: 14**

### duck_scores
| Column | Type | Notes |
|---|---|---|
| measured_at | date PK (composite) | |
| duck_type | text PK (composite) | Product/LPs/Ads/Audience |
| score | numeric | 0-100 |
| sub_scores | jsonb | Component breakdown |
**Rows: 10**

### landing_pages (15 rows)
| Column | Type | Notes |
|---|---|---|
| url | text PK | LP URL |
| domain | text | |
| content_title, content_meta, content_h1, content_body | text | Scraped content (mostly empty) |
| gsc_position | real | GSC avg position |
| gsc_impressions | bigint | GSC impressions |
| gsc_score | real | GSC composite |
| ahrefs_ur | integer | Ahrefs URL Rating |
| ahrefs_score | real | Ahrefs composite |
| composite_score | real | Combined rank score |

### settings (6 rows)
| Column | Type | Notes |
|---|---|---|
| key | text PK | Config key (mcc_id, target_accounts, etc.) |
| value | jsonb | Config value |
| updated_at | timestamptz | |

### sync_runs (16 rows)
| Column | Type | Notes |
|---|---|---|
| id | serial PK | |
| sync_type | text | Type of sync operation |
| status | text | running/completed/failed |
| started_at | timestamptz | |
| completed_at | timestamptz | |
| rows_processed | integer | |
| error_message | text | |

### Other tables (exist but empty)
- `selling_points` (0 rows) — LLM-generated, TTL 7d, 3-tier cache
- `relevance_scores` (0 rows) — LLM-generated ad↔LP scores, TTL 7d
- `audience_criteria` (0 rows) — Google Ads audience targeting

### View
- `ad_metrics_30d` — Aggregates `ad_metrics_daily` WHERE date >= CURRENT_DATE - 30d
