# Google Ads API × DEP Cross-Reference

## Purpose
Deep-dive Google Ads performance analysis that connects in-platform metrics (Quality Score, Impression Share, Auction Insights) with BigBrain DEP data at the keyword and ad group level. Use this skill to diagnose *why* some campaigns produce high-DEP users while others don't, moving beyond aggregate campaign metrics to granular optimization signals. Identify which keywords, match types, and competitive dynamics drive the best signup quality.

## When to Use
- **Performance diagnosis:** Campaign DEP dropped — need to identify the specific keywords responsible
- **Quality Score correlation:** Testing if high QS keywords also drive high DEP
- **Impression Share optimization:** Understanding if limited IS is causing quality loss (missing high-intent searches)
- **Competitive intelligence:** Determining if competitor overlap correlates with DEP degradation
- **Expansion decisions:** Deciding which keywords to scale based on DEP efficiency, not just CPA
- **Match type strategy:** Evaluating broad vs. phrase vs. exact performance through the DEP lens

## Core Methodology

### 1. Google Ads In-Platform Signals
**Quality Score (QS):**
- Composite metric (1-10 scale) reflecting expected CTR, ad relevance, and landing page experience
- QS >7 = high relevance, QS <5 = poor relevance signal
- **QS components:** Expected CTR, ad relevance, landing page experience (each rated Below Average / Average / Above Average)

**Impression Share (IS):**
- **Search IS:** Percentage of eligible impressions your ads received
- **Lost IS (Budget):** Impressions lost due to insufficient budget
- **Lost IS (Rank):** Impressions lost due to low Ad Rank (QS × Bid)
- **Top-of-page IS:** Percentage of impressions shown in top positions
- **Absolute top IS:** Percentage of impressions in the #1 position

**Auction Insights:**
- **Overlap rate:** How often your ad and a competitor's ad appear in the same auction
- **Position above rate:** How often a competitor's ad appears above yours
- **Top of page rate:** How often any ad appears in top positions
- **Outranking share:** How often your ad ranks higher than a competitor's

### 2. Cross-Reference Methodology: In-Platform → DEP
**Step 1: Pull Keyword-Level Google Ads Data**
```python
# Google Ads API query (pseudocode)
query = """
SELECT 
  campaign.name,
  ad_group.name,
  ad_group_criterion.keyword.text,
  ad_group_criterion.keyword.match_type,
  ad_group_criterion.quality_info.quality_score,
  ad_group_criterion.quality_info.creative_quality_score,
  ad_group_criterion.quality_info.post_click_quality_score,
  metrics.impressions,
  metrics.clicks,
  metrics.conversions,
  metrics.cost_micros,
  metrics.search_impression_share,
  metrics.search_budget_lost_impression_share,
  metrics.search_rank_lost_impression_share
FROM keyword_view
WHERE segments.date DURING LAST_30_DAYS
  AND campaign.advertising_channel_type = 'SEARCH'
  AND ad_group_criterion.type = 'KEYWORD'
"""
```

**Step 2: Pull BigBrain Attributed Signups by Keyword**
```sql
-- BigBrain query to get keyword-level DEP data
SELECT 
  gclid,
  keyword_id,
  keyword_text,
  signup_timestamp,
  dep_7,
  no_usage,
  first_value_timestamp,
  retention_30d
FROM bigbrain.attributed_signups_uk
WHERE signup_date >= CURRENT_DATE - 37  -- 30 days of signups + 7 days for DEP_7 measurement
  AND traffic_source = 'google_search'
  AND country = 'GB'
```

**Step 3: Merge Datasets**
```python
# Join on keyword_id
df_merged = df_google_ads.merge(
    df_bigbrain, 
    on='keyword_id', 
    how='left'
)

# Calculate keyword-level DEP metrics
df_analysis = df_merged.groupby(['keyword_text', 'match_type', 'quality_score']).agg({
    'signups': 'count',
    'dep_7': 'mean',
    'no_usage': 'mean',
    'cost': 'sum',
    'impressions': 'sum',
    'clicks': 'sum',
    'search_impression_share': 'mean',
    'search_rank_lost_impression_share': 'mean'
}).reset_index()

df_analysis['dep_7_pct'] = df_analysis['dep_7'] * 100
df_analysis['cost_per_dep'] = df_analysis['cost'] / (df_analysis['signups'] * df_analysis['dep_7'])
df_analysis['quality_score_bucket'] = pd.cut(df_analysis['quality_score'], bins=[0, 4, 6, 8, 10], labels=['Low (1-4)', 'Med (5-6)', 'High (7-8)', 'Excellent (9-10)'])
```

### 3. Analytical Patterns & Insights
**Pattern 1: Quality Score → DEP Correlation**
Hypothesis: High QS keywords should produce higher DEP users (better ad relevance = better message match = engaged signups)

**Analysis:**
```python
# Group by QS bucket and calculate avg DEP
qs_dep_analysis = df_analysis.groupby('quality_score_bucket').agg({
    'dep_7_pct': 'mean',
    'cost_per_dep': 'mean',
    'signups': 'sum'
}).sort_values('quality_score_bucket')

# Expected pattern:
# QS 9-10: DEP ~45-50%, Cost/DEP £12
# QS 7-8:  DEP ~38-42%, Cost/DEP £15
# QS 5-6:  DEP ~30-35%, Cost/DEP £18
# QS 1-4:  DEP ~20-28%, Cost/DEP £25+
```

**Pattern 2: Impression Share Gaps & DEP**
Hypothesis: Lost IS (Rank) indicates we're missing high-intent searches → lower overall DEP

**Analysis:**
```python
# Filter keywords with high Lost IS (Rank)
df_high_lost_rank = df_analysis[df_analysis['search_rank_lost_impression_share'] > 0.30]

# Compare DEP of keywords with <10% lost rank vs >30% lost rank
low_lost_rank_dep = df_analysis[df_analysis['search_rank_lost_impression_share'] < 0.10]['dep_7_pct'].mean()
high_lost_rank_dep = df_high_lost_rank['dep_7_pct'].mean()

# Insight: If high_lost_rank_dep is significantly lower, we're losing high-quality traffic to competitors
```

**Pattern 3: Match Type Performance**
Hypothesis: Exact match keywords produce higher DEP (precise intent) vs. broad match (exploratory, lower quality)

**Analysis:**
```python
match_type_analysis = df_analysis.groupby('match_type').agg({
    'dep_7_pct': 'mean',
    'cost_per_dep': 'mean',
    'no_usage_pct': 'mean',
    'signups': 'sum'
})

# Typical pattern:
# Exact:  DEP 42%, Cost/DEP £13, no_usage 12%
# Phrase: DEP 38%, Cost/DEP £15, no_usage 15%
# Broad:  DEP 32%, Cost/DEP £19, no_usage 22%
```

**Pattern 4: Auction Insights × DEP**
Hypothesis: High competitor overlap might degrade DEP if competitors are offering aggressive discounts/incentives

**Auction Insights Analysis:**
```python
# Pull auction insights for top campaigns
auction_insights = google_ads_api.pull_auction_insights(
    campaign_ids=top_campaigns,
    date_range='LAST_30_DAYS'
)

# Merge with DEP data
df_competitive = df_merged.merge(auction_insights, on='campaign_id')

# Identify if high overlap with specific competitors correlates with lower DEP
competitor_impact = df_competitive.groupby('competitor_domain').agg({
    'overlap_rate': 'mean',
    'dep_7_pct': 'mean',
    'cost_per_dep': 'mean'
})

# Hypothesis test: Does overlap_rate > 0.60 correlate with DEP < 35%?
```

### 4. Optimization Workflows
**Workflow 1: Low-QS, Low-DEP Keyword Purge**
```python
# Identify keywords failing on both dimensions
bad_keywords = df_analysis[
    (df_analysis['quality_score'] < 5) & 
    (df_analysis['dep_7_pct'] < 28) & 
    (df_analysis['signups'] > 10)  # Minimum sample size
]

# Action: Pause these keywords immediately
# Expected impact: 10-15% cost reduction with minimal signup loss (low quality signups)
```

**Workflow 2: High-QS, High-DEP Expansion**
```python
# Identify expansion opportunities
expansion_candidates = df_analysis[
    (df_analysis['quality_score'] >= 8) & 
    (df_analysis['dep_7_pct'] >= 40) & 
    (df_analysis['search_rank_lost_impression_share'] > 0.20)  # Limited by rank
]

# Action: Increase bids to capture more high-quality traffic
# Expected impact: 15-25% DEP user volume increase at stable cost/DEP
```

**Workflow 3: Match Type Optimization**
```python
# Identify broad match keywords with poor DEP that have exact/phrase equivalents
broad_to_tighten = df_analysis[
    (df_analysis['match_type'] == 'BROAD') & 
    (df_analysis['dep_7_pct'] < 30) & 
    (df_analysis['cost_per_dep'] > product_avg * 1.3)
]

# Action: Shift budget from broad to exact/phrase variants
# Expected impact: 20-30% cost/DEP improvement
```

**Workflow 4: Competitive Defense**
```python
# Identify campaigns where competitors are outranking us and DEP is suffering
competitive_pressure = df_competitive[
    (df_competitive['position_above_rate'] > 0.50) & 
    (df_competitive['dep_7_pct'] < 35)
]

# Action: Increase bids OR improve creative/landing page to improve Ad Rank
# Decision: If competitor is discounting heavily, may not be worth competing on price
```

## Decision Framework
**When QS is high but DEP is low:**
- Message mismatch: Ad relevance is good, but landing page or onboarding fails to deliver value
- Action: Audit landing page experience, not keyword targeting

**When QS is low and DEP is low:**
- Poor keyword-ad-landing page alignment
- Action: Pause keyword or rewrite ads + LP to improve relevance

**When Lost IS (Rank) is high and DEP is strong:**
- Opportunity: Increase bids to capture more high-quality traffic
- ROI test: If incremental cost/DEP stays within target, scale aggressively

**When Lost IS (Budget) is high:**
- Campaign is constrained, not by quality but by budget cap
- Action: Reallocate budget from lower-DEP campaigns to this one

**When competitor overlap is high and DEP drops:**
- Investigate: Are competitors offering better value props, lower pricing, or more aggressive incentives?
- Action: May need to differentiate messaging, not just bid higher

## Key Metrics & KPIs
- **QS × DEP correlation:** Strength of relationship between Quality Score and DEP_7 (target: r > 0.60)
- **High-QS keyword DEP:** Average DEP for QS ≥8 keywords (target: >42%)
- **Match type DEP gap:** DEP difference between exact and broad match (target: broad within 10% of exact)
- **Lost IS (Rank) impact:** DEP delta between high IS (>80%) and low IS (<50%) keywords
- **Keyword purge impact:** Cost savings from pausing low-QS, low-DEP keywords (target: 10-15% monthly spend reduction)

## Output Format
**Weekly Report: Google Ads × DEP Insights**
```markdown
## Google Ads Quality × DEP Analysis — Week of [Date]

### 📊 Quality Score Distribution
| QS Bucket | Avg DEP_7% | Cost/DEP | Signups | % of Spend |
|-----------|-----------|----------|---------|-----------|
| Excellent (9-10) | 47% | £11.80 | 320 | 28% |
| High (7-8) | 40% | £14.20 | 580 | 42% |
| Medium (5-6) | 33% | £17.50 | 290 | 22% |
| Low (1-4) | 26% | £23.10 | 110 | 8% |

### 🎯 Optimization Actions
**🔴 Pause: 18 keywords** (QS <5, DEP <28%, spend >£50/week)
- Projected savings: £1,240/week
- Signup loss: ~45 signups (low quality)

**🟢 Scale: 12 keywords** (QS ≥8, DEP >42%, Lost IS Rank >25%)
- Recommended bid increase: +20-30%
- Projected DEP user gain: +85 users/week

**🔄 Match Type Shift: 8 broad → exact/phrase**
- Current broad DEP: 29%, Cost/DEP £19.50
- Exact equivalent DEP: 41%, Cost/DEP £14.20
- Expected impact: £420/week savings, +15 DEP users

### 🏆 Top Performers (by DEP efficiency)
1. **Keyword: "project management software uk"** — QS 9, DEP 52%, Cost/DEP £9.80
2. **Keyword: "crm for small business"** — QS 8, DEP 48%, Cost/DEP £11.20
3. **Keyword: "team collaboration tools"** — QS 8, DEP 46%, Cost/DEP £12.50

### ⚠️ Underperformers (high spend, low DEP)
1. **Keyword: "free project management"** — QS 4, DEP 22%, Cost/DEP £28.40 → Pause
2. **Keyword: "best crm software"** — QS 5, DEP 27%, Cost/DEP £21.70 → Lower bid

### 🔍 Competitive Pressure Analysis
- **Competitor: asana.com** — Overlap 68%, Position Above 52%
  - Our DEP in high-overlap campaigns: 34% (vs 40% product avg)
  - Hypothesis: Asana's free tier messaging pulling lower-intent users
  - Action: Test value prop differentiation ("Enterprise-ready from day one")
```

## Constraints (UK POC Specific)
- **BigBrain attribution:** Google Search has full attribution via gclid → keyword mapping
- **7-day DEP lag:** Keyword-level DEP analysis has 7-day delay (37 days total for 30-day analysis window)
- **Product budget isolation:** Keyword optimizations must stay within product pools (work_management, crm, dev)
- **Sample size threshold:** Require minimum 20 signups per keyword before making DEP-based decisions (statistical significance)

## Tooling & Automation
**Google Ads API:**
- Keyword performance report with QS, IS, and auction insights
- Campaign and ad group metadata for hierarchy

**BigBrain SQL/API:**
- gclid-to-keyword attribution with DEP_7 flag
- User-level journey data for deep dives

**Ahrefs (Organic/Paid Overlap Analysis):**
- Organic keyword rankings for monday.com UK: identify keywords where we rank #1-3 organically
- Paid/organic overlap detection: flag keywords where we're paying CPC but already dominate organically
- Incremental lift analysis: for overlap keywords, test pausing paid to measure if organic absorbs the traffic
- Competitor keyword gaps: keywords competitors bid on that we don't (new opportunities)
- Access: Ahrefs API via MCP (subscription: Advanced 2022, 500K units/month)
- **Key value:** Stop wasting budget on keywords organic already owns; redirect spend to keywords where paid is the only path

**Analysis Scripts:**
- Python pandas for merge and aggregation
- Statistical correlation tests (Pearson r for QS × DEP)
- Ahrefs organic position data merged with Google Ads keyword report
- Automated weekly report generation

**Dashboard:**
- Tableau/Looker visualization of QS × DEP scatter plots
- Keyword performance heatmap (QS on X-axis, DEP on Y-axis, bubble size = spend)
- Organic/paid overlap view: keywords where both channels are active (potential waste)

## Success Criteria
- **QS improvement:** Increase % of spend on QS ≥7 keywords from 70% → 85%
- **DEP lift:** High-QS keyword cohort (QS ≥8) maintains DEP >42%
- **Cost efficiency:** Keyword-level cost/DEP variance reduced by 25% through pruning
- **IS optimization:** Reduce Lost IS (Rank) on high-DEP keywords from 30% → <15%
- **Match type wins:** Exact match DEP remains 8-12% higher than broad match

## Related Skills
- **DEP Scorecard Automation:** Campaign-level anomaly feeds into keyword-level diagnosis
- **LP → DEP Mapper:** Landing page variant DEP can be cross-referenced with keyword intent
- **Budget Allocation Recommender:** Keyword-level DEP efficiency is an input to budget shifts

---

**Inspired by:** PPC Strategist agent (keyword optimization, QS focus) + Search Query Analyst agent (granular query-level analysis)

**Research additions:**
- Quality Score components and their correlation with landing page experience (user activation)
- Impression Share strategy from competitive auction dynamics research
- Match type performance patterns from broad match + smart bidding studies
