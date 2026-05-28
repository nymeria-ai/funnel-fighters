# DEP Scorecard Automation

## Purpose
Automated daily monitoring and analysis of Deep Engagement Percentage (DEP_7) metrics from BigBrain, cross-referenced with paid media cost data to identify performance anomalies, cost efficiency trends, and signup quality signals by campaign and country. Use when you need to track the health of user acquisition quality, detect performance degradation early, or report on cost-per-DEP trends across the UK POC funnel.

## When to Use
- **Daily monitoring:** Automated check of DEP_7 health by campaign/country
- **Anomaly detection:** Sudden drops in DEP or spikes in cost/DEP ratio
- **Reporting:** Weekly/monthly scorecards for stakeholders on signup quality
- **Optimization triggers:** Identifying campaigns that are acquiring low-quality signups (high no_usage_DEP)
- **Budget reallocation signals:** Campaigns with rising cost/DEP deserve attention

## Core Methodology

### 1. DEP Metric Framework
**DEP metrics** are predicted ARR (Annual Recurring Revenue) values from BigBrain's ML models — NOT percentages. They predict the revenue potential of signups based on engagement signals.

- **DEP_7 (PREDICTED_FIRST_ARR_7_DAYS_LOCK)**: Predicted first-year ARR based on engagement within 7 days of signup (dollar value)
- **no_usage_DEP (PREDICTED_FIRST_ARR_NO_USAGE_DEP)**: Predicted first-year ARR for zero-usage signups (dollar value, quality baseline)
- **Source table**: `BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH` (type = 'attribution')
- **Granularity**: Daily, by campaign and country

**Why predicted ARR matters more than raw signup volume:**
- A campaign with 100 signups and $5K total predicted ARR delivers more value than 200 signups with $3K predicted ARR
- DEP_7 is a leading indicator of retention — higher predicted ARR correlates with trial-to-paid conversion
- Cost / SUM(predicted_arr) is the true efficiency metric, not just CPA

### 2. Data Sources & Inputs

> **Schema Reference:** `skills/kremer-analyst/references/data-cookbook-campaign-monitoring.md`
> Read this before writing queries. Key gotchas below.

**BigBrain Attribution Data (`BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH`):**
- DEP_7 by cohort (daily signup cohorts tracked for 7 days)
- no_usage_DEP by cohort
- Signup timestamp, campaign attribution, country
- User journey signals: first value action, feature adoption depth

**⚠️ CRITICAL COOKBOOK GOTCHAS (inline — do not skip):**
- `type` values are LOWERCASE: `'attribution'` not `'Attribution'`
- Always use `COUNT(DISTINCT pulse_account_id)` — never `COUNT(1)` (VISITORS + ATTRIBUTION overlap = double-counting)
- Leading timestamp: `CREATED_AT` (not SIGNUP_DATE for spend queries)
- Filter `IS_INTERNAL_ACCOUNT_ID = FALSE` always
- Filter `BUSINESS_GOAL_DTR = 'performance_marketing'` for spend (adn_data)
- ETL runs 4x/day full replace — attribution can change retroactively
- `PRODUCT_DTR` = product the campaign TARGETS (not what user installed)
- `COUNTRY` combines TP_COUNTRY_DTR + TARGET_COUNTRY_DTR logic
- For spend: use `type = 'adn_data'` not attribution
- For signups: use `type = 'attribution'`
- QE (Qualified Entities) available via `IS_QUALIFIED_SIGNUP` column — use for quality filtering

**Paid Media Cost Data:**
- Google Ads: Campaign spend by day/country (from Google Ads API via BigBrain attribution)
- Meta: In-platform spend data (view-through not measured, direct attribution only)
- YouTube: In-platform spend data (view-through not measurable)

**UK POC Constraint:** 
- Google Search uses BigBrain attributed data + in-platform signals
- Meta & YouTube are in-platform only (no view-through tracking)
- All optimizations stay within product-level budgets (no cross-product reallocation)

### 3. Daily Scorecard Workflow
**Step 1: Pull DEP Predicted ARR Data (daily from FACT_CAMPAIGN_MONITORING_DWH)**
```sql
-- BigBrain query: predicted ARR by campaign/country
SELECT 
  DATE,
  CAMPAIGN_ID,
  COUNTRY,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) as total_dep7_arr,
  SUM(PREDICTED_FIRST_ARR_NO_USAGE_DEP) as total_no_usage_dep_arr,
  SUM(PREDICTED_FIRST_ARR_STD_NO_USAGE_DEP) as total_no_usage_dep_std
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY = 'GB'
  AND DATE = CURRENT_DATE - 1
GROUP BY DATE, CAMPAIGN_ID, COUNTRY
```

**Step 2: Merge with Paid Media Spend**
```python
# Pseudocode: Join predicted ARR data with cost data
df_dep = pull_bigbrain_dep_data(date=yesterday)
df_cost = pull_google_ads_spend(date=yesterday) + pull_meta_spend(date=yesterday)

df_scorecard = df_dep.merge(df_cost, on=['campaign_id', 'date', 'country'])
df_scorecard['cost_per_predicted_arr'] = df_scorecard['spend'] / df_scorecard['total_dep7_arr']
df_scorecard['arr_efficiency'] = df_scorecard['total_dep7_arr'] / df_scorecard['spend']  # >1 = profitable
df_scorecard['no_usage_ratio'] = df_scorecard['total_no_usage_dep_arr'] / df_scorecard['total_dep7_arr']
```

**Step 3: Anomaly Detection Rules**
Flag campaigns that meet any of these conditions:

| Condition | Threshold | Severity | Action |
|-----------|-----------|----------|--------|
| DEP_7 drop week-over-week | > -15% | 🔴 High | Immediate review |
| Cost/DEP increase | > +25% week-over-week | 🟠 Medium | Budget review |
| no_usage_DEP spike | > 30% absolute | 🔴 High | Pause & investigate |
| DEP_7 below baseline | < 25% for 3+ consecutive days | 🟠 Medium | Creative/landing page audit |
| Cost/DEP above product avg | > 1.5x product pool average | 🟡 Low | Optimization opportunity |

**Step 4: Anomaly Explanation Hypotheses**
When anomalies are detected, automatically generate hypotheses:

**If DEP_7 drops:**
- Landing page change detection (check UTM → LP mapping)
- Targeting expansion (broad match queries, new audience segments)
- Creative fatigue (check ad frequency, CTR decay)
- External factors (holiday, competitor action, news event)

**If cost/DEP spikes:**
- Rising CPCs without quality improvement (auction pressure)
- Audience oversaturation (frequency too high on retargeting)
- Budget increase without corresponding quality gains

**If no_usage_DEP spikes:**
- Misleading ad copy (value prop mismatch)
- Broken onboarding flow
- Poor traffic source (bot traffic, incentivized clicks)

### 4. Output Format
**Daily Automated Report (Slack/Email):**
```markdown
## UK POC DEP Scorecard — [Date]
**Cohort:** Signups from [Date - 7 days] (7-day lookback complete)

### 🟢 Healthy Campaigns
| Campaign | Country | Signups | DEP_7% | Cost/DEP | vs. Product Avg |
|----------|---------|---------|--------|----------|-----------------|
| Campaign A | GB | 120 | 48% | £12.50 | -15% ✅ |

### 🔴 Anomalies Detected
**Campaign B — Work Management — GB**
- DEP_7 dropped from 42% → 29% (-31% WoW) 🔴
- Cost/DEP increased £11 → £18 (+64%) 🔴
- Hypothesis: Landing page change on May 20 + broad match expansion
- Action: Revert LP, tighten match types, review search term report

### 📊 Product Pool Benchmarks (7-day rolling avg)
- Work Management: DEP_7 38%, Cost/DEP £14.20
- CRM: DEP_7 35%, Cost/DEP £16.80
- Dev: DEP_7 41%, Cost/DEP £13.10

### 💡 Recommendations
1. **Shift £500/day from Campaign C → Campaign A** (higher DEP efficiency)
2. **Pause Campaign D until creative refresh** (3-day DEP below 20%)
```

**Weekly Executive Summary:**
- DEP_7 trend chart (campaign-level, 4-week view)
- Cost/DEP distribution histogram (identify outliers)
- Product pool health scores
- Top 3 optimization opportunities with projected impact

## Key Metrics & KPIs
- **DEP_7%**: Primary quality metric (target: maintain product baseline ± 5%)
- **Cost per DEP**: Efficiency metric (target: <20% variance from product pool avg)
- **no_usage_DEP%**: Inverse quality signal (target: <15% of signups)
- **Week-over-week DEP stability**: Variance metric (target: <10% weekly swing)
- **Anomaly response time**: Speed to detection → action (target: <24 hours)

## Decision Framework
**When DEP_7 is strong (>40%) but cost/DEP is high:**
- Negotiate: Worth paying premium for quality if LTV supports it
- Scale cautiously: Monitor retention before aggressive scaling

**When DEP_7 is weak (<30%) regardless of cost:**
- Red flag: Something is broken in acquisition or onboarding
- Immediate action: Audit creative → landing page → onboarding flow
- Do not scale until DEP recovers

**When cost/DEP spikes but DEP_7 stable:**
- Auction pressure: Competitor activity or market shift
- Test: Shift budget to alternative channels temporarily

**When no_usage_DEP spikes:**
- Traffic quality issue: Check for fraud, bot traffic, or poor targeting
- Message mismatch: Ad promise vs. product reality gap

## Constraints (UK POC Specific)
- **Product-level budgets only:** No cross-product reallocation without approval
- **Google Search:** BigBrain attribution + in-platform signals available
- **Meta & YouTube:** In-platform data only, view-through conversions unmeasurable
- **7-day reporting lag:** DEP_7 data not actionable until 7 days post-signup
- **Attribution window:** Standard 7-day click, 1-day view (where measurable)

## Tooling & Automation
**BigBrain API/SQL:**
- Daily pull of DEP_7 cohort data with campaign attribution
- User-level event stream for hypothesis validation

**Google Ads API:**
- Campaign spend by day/geo via BigBrain integration
- In-platform quality signals (Quality Score, IS, CTR)

**Meta API:**
- Spend and conversion data (in-platform attribution only)

**GA4 (Early Warning Signals) — ✅ CONNECTED 2026-05-28:**
- **Property:** Monday Main - GA4 (ID: `403390805`)
- **Endpoint:** `https://analyticsdata.googleapis.com/v1beta/properties/403390805:runReport`
- **Auth:** OAuth2 refresh token (see each agent's TOOLS.md for token path, client credentials, and refresh method)
- **Scope:** `analytics.readonly`

**GA4 Query Template — Campaign Engagement (Leading Indicator):**
```json
{
  "dateRanges": [{"startDate": "7daysAgo", "endDate": "today"}],
  "dimensions": [{"name": "sessionCampaignName"}],
  "metrics": [
    {"name": "sessions"},
    {"name": "engagedSessions"},
    {"name": "engagementRate"},
    {"name": "averageSessionDuration"},
    {"name": "conversions"},
    {"name": "bounceRate"}
  ],
  "dimensionFilter": {
    "andGroup": {
      "expressions": [
        {"filter": {"fieldName": "landingPage", "stringFilter": {"matchType": "CONTAINS", "value": "/ap/"}}},
        {"filter": {"fieldName": "sessionSource", "stringFilter": {"matchType": "EXACT", "value": "google"}}},
        {"filter": {"fieldName": "sessionMedium", "stringFilter": {"matchType": "EXACT", "value": "cpc"}}}
      ]
    }
  },
  "orderBys": [{"metric": {"metricName": "sessions"}, "desc": true}],
  "limit": 30
}
```

**GA4 Early Warning Logic:**
- On-site engagement metrics as leading indicators (available same-day, no 7-day DEP lag)
- Session quality by campaign: bounce rate, engagement rate, avg session duration
- If GA4 session quality drops for a campaign, flag it as a DEP risk 7 days before BigBrain confirms
- Join path: UTM parameters (source/medium/campaign) → GA4 session metrics → match to BigBrain campaign name
- **Key value:** Reduces effective detection lag from 8 days (7-day cohort + 1 day processing) to ~1 day for leading indicators
- **Dimensions available:** sessionSource, sessionMedium, sessionCampaignName, sessionManualAdContent (ad ID), landingPage, deviceCategory, country
- **Metrics available:** sessions, engagedSessions, engagementRate, averageSessionDuration, bounceRate, conversions, newUsers, totalUsers, screenPageViewsPerSession, scrolledUsers, keyEvents, eventCount, eventsPerSession

**GA4 Anomaly Thresholds (leading indicators):**
| Signal | Threshold | Implication |
|--------|-----------|-------------|
| Engagement rate drops >15% WoW | 🟡 Warning | Likely DEP drop in 7 days |
| Bounce rate spikes >20% WoW | 🔴 Alert | LP or targeting issue |
| Avg duration drops >25% | 🟡 Warning | Content/audience mismatch |
| Pages/session drops below 1.5 | 🟡 Warning | Users not exploring |
| Conversion rate drops >20% WoW | 🔴 Alert | Immediate investigation |

**Automation:**
- Scheduled daily BigBrain query at 8:00 AM GMT (after 7-day cohort completes)
- Anomaly detection script runs immediately after data pull
- Slack alert posted to #funnel-fighters-uk channel with flagged campaigns
- Weekly summary emailed to stakeholders every Monday 9:00 AM

**Monitoring Dashboard:**
- Real-time DEP_7 heatmap by campaign/country
- Cost/DEP trend lines with product pool benchmarks
- Anomaly alert log with resolution status tracking

## Success Criteria
- **Early detection:** Flag DEP degradation within 1 day of 7-day cohort completing (8-day total lag)
- **False positive rate:** <10% of alerts are noise (maintain signal quality)
- **Action rate:** 80%+ of flagged anomalies result in optimization action within 48 hours
- **DEP stability:** Reduce week-over-week DEP variance by 30% through proactive monitoring
- **Cost efficiency:** Identify 3-5 cost/DEP optimization opportunities per week

## Related Skills
- **Google Ads API × DEP:** Keyword-level quality scoring for deeper diagnosis
- **LP → DEP Mapper:** Landing page variant performance tracking
- **Budget Allocation Recommender:** Use DEP efficiency as primary reallocation signal

---

**Inspired by:** Product Manager agent (outcome-focused metrics) + Paid Media Auditor (systematic checkpoints)

**Research additions:**
- DEP metric framework from SaaS product analytics best practices (activation, retention correlation)
- Anomaly detection thresholds based on statistical control charts (2-sigma rules)
- Behavioral nudge principles: DEP as a leading indicator of habit formation
