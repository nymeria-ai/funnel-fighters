# Budget Allocation Recommender

## Purpose
Data-driven weekly budget reallocation system that identifies opportunities to shift spend from lower-efficiency campaigns to higher-efficiency campaigns within product-level budget pools. Applies diminishing returns analysis, portfolio theory principles, and DEP-weighted optimization to maximize quality-adjusted signup volume. Use when preparing weekly budget adjustments, responding to performance shifts, or scaling campaigns while maintaining efficiency targets.

## When to Use
- **Weekly budget reviews:** Every Monday, analyze past week and recommend shifts for upcoming week
- **Performance anomalies:** Campaign DEP or cost/DEP suddenly changes → rebalance budget
- **Scaling decisions:** New budget available → allocate optimally across campaigns
- **Seasonality planning:** Q-end, holiday periods, event-driven budget spikes
- **Plateau detection:** Campaign hitting diminishing returns → shift budget elsewhere
- **New campaign launches:** Determine initial budget split when launching new campaigns

## BigBrain Schema Reference

> **Full schema docs:** `skills/kremer-analyst/references/data-cookbook-campaign-monitoring.md`
>
> **Spend data:** `type = 'adn_data'` in `BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH`
> - Filter: `BUSINESS_GOAL_DTR = 'performance_marketing'`
> - Key columns: `COST`, `CAMPAIGN`, `SOURCE`, `COUNTRY`, `CREATED_AT`
> - `PRODUCT_DTR` for per-product budget pool segmentation
>
> **DEP data:** `type = 'attribution'` in same table
> - `PREDICTED_FIRST_ARR_7_DAYS_LOCK`, `PREDICTED_FIRST_ARR_NO_USAGE_DEP`
> - `COUNT(DISTINCT pulse_account_id)` for signup counts
>
> **⚠️ GOTCHAS:**
> - Spend (adn_data) and attribution are DIFFERENT rows with DIFFERENT `type` values — don't mix
> - adn_data has spend, attribution has DEP — JOIN on campaign + date + country
> - adn_data spend ($3.88M) vs spend_by_country ($4.02M) measure SAME spend differently — NOT additive. Use adn_data only.
> - `type` values are LOWERCASE
> - `IS_INTERNAL_ACCOUNT_ID = FALSE` on attribution side
> - ETL full replace 4x/day — numbers can shift retroactively
> - Not all SLG spend is in this table; PLG spend IS complete

## Core Methodology

### 1. Diminishing Returns Detection
As ad spend increases, the marginal return (additional DEP users per additional £) decreases. Identifying the point of diminishing returns prevents wasted spend.

**Marginal Cost Per DEP Calculation:**
```python
# For each campaign, calculate weekly incremental cost/DEP
df_campaigns['spend_change'] = df_campaigns.groupby('campaign_id')['spend'].diff()
df_campaigns['dep_users_change'] = df_campaigns.groupby('campaign_id')['dep_users'].diff()
df_campaigns['marginal_cost_per_dep'] = df_campaigns['spend_change'] / df_campaigns['dep_users_change']

# Flag campaigns showing diminishing returns
df_campaigns['diminishing_returns'] = df_campaigns['marginal_cost_per_dep'] > (df_campaigns['avg_cost_per_dep'] * 1.5)
```

**Diminishing Returns Curve:**
```
DEP Users
    │     ╱─────  ← Plateau (diminishing returns)
    │    ╱
    │   ╱
    │  ╱
    │ ╱
    └─────────────── Spend
      Optimal zone
```

**Detection Thresholds:**
- **Healthy zone:** Marginal cost/DEP within 20% of average cost/DEP
- **Warning zone:** Marginal cost/DEP 20-50% above average (monitor closely)
- **Diminishing returns:** Marginal cost/DEP >50% above average (reduce budget)

### 2. Portfolio Theory Application
Inspired by Modern Portfolio Theory, diversify ad spend across campaigns that are not perfectly correlated to manage risk and maximize returns.

**Campaign Correlation Analysis:**
```python
# Calculate weekly performance correlation between campaigns
campaign_pivot = df_weekly.pivot_table(
    index='week',
    columns='campaign_id',
    values='dep_7_pct'
)

correlation_matrix = campaign_pivot.corr()

# Identify diversification opportunities
# Low/negative correlation = good portfolio diversification
# Example:
# Campaign A (brand search) vs. Campaign B (non-brand) = low correlation
# Campaign C (Facebook prospecting) vs. Campaign D (Facebook retargeting) = medium correlation
```

**Diversification Benefits:**
- **Brand + Non-Brand Search:** Low correlation (different audience intent)
- **Google + Meta:** Medium correlation (different platforms, audience overlap)
- **Prospecting + Retargeting:** Medium/high correlation (same audience, different stages)
- **Product A + Product B:** Low correlation (different ICPs)

**Portfolio Allocation Framework:**
```python
# Efficient Frontier approach (simplified for paid media)
def optimize_portfolio_allocation(campaigns, total_budget, target_dep):
    # Objective: Maximize total DEP users while minimizing cost/DEP variance
    
    allocations = []
    for split_scenario in generate_allocation_scenarios(campaigns):
        projected_dep_users = sum(
            campaign.expected_dep_users(budget=split_scenario[campaign.id])
            for campaign in campaigns
        )
        
        projected_cost_per_dep = sum(
            campaign.expected_spend(split_scenario[campaign.id])
            for campaign in campaigns
        ) / projected_dep_users
        
        portfolio_variance = calculate_portfolio_variance(
            split_scenario,
            correlation_matrix
        )
        
        allocations.append({
            'scenario': split_scenario,
            'projected_dep_users': projected_dep_users,
            'projected_cost_per_dep': projected_cost_per_dep,
            'portfolio_risk': portfolio_variance,
            'sharpe_ratio': (projected_dep_users - target_dep) / portfolio_variance
        })
    
    # Select allocation with highest risk-adjusted return (Sharpe ratio)
    optimal = max(allocations, key=lambda x: x['sharpe_ratio'])
    return optimal
```

### 3. DEP-Weighted Budget Optimization
Traditional budget allocation optimizes for conversions or revenue. In the UK POC, we optimize for **DEP users** (quality-adjusted signups).

**Optimization Objective:**
```
Maximize: Total DEP Users = Σ (Campaign Signups × Campaign DEP_7%)
Subject to:
  - Total spend ≤ Product pool budget
  - Per-campaign spend ≥ Minimum daily budget (£50/day)
  - Per-campaign cost/DEP ≤ Product pool average × 1.3 (efficiency constraint)
  - Product budget isolation (no cross-product shifts)
```

**Greedy Optimization Algorithm (simplified):**
```python
def allocate_budget_greedy(campaigns, total_budget, product_pool):
    # Start with minimum budget for all campaigns
    allocation = {c.id: c.min_daily_budget * 7 for c in campaigns}
    remaining_budget = total_budget - sum(allocation.values())
    
    while remaining_budget > 0:
        # Find campaign with lowest marginal cost/DEP that hasn't hit diminishing returns
        candidates = [
            c for c in campaigns 
            if not c.at_diminishing_returns(allocation[c.id]) 
            and c.cost_per_dep(allocation[c.id]) <= product_pool.avg_cost_per_dep * 1.3
        ]
        
        if not candidates:
            break  # All campaigns at diminishing returns or too expensive
        
        # Sort by marginal cost/DEP (ascending)
        best_campaign = min(candidates, key=lambda c: c.marginal_cost_per_dep(allocation[c.id]))
        
        # Allocate £100 increment
        increment = min(100, remaining_budget)
        allocation[best_campaign.id] += increment
        remaining_budget -= increment
    
    return allocation
```

### 4. Weekly Reallocation Workflow
**Step 1: Pull Weekly Performance Data**
```python
df_weekly = pull_bigbrain_weekly_data(
    date_range='last_4_weeks',
    product_pools=['work_management', 'crm', 'dev']
)

# Calculate per-campaign metrics
campaign_metrics = df_weekly.groupby('campaign_id').agg({
    'spend': 'sum',
    'signups': 'sum',
    'dep_users': 'sum',
    'dep_7_pct': 'mean'
}).reset_index()

campaign_metrics['cost_per_dep'] = campaign_metrics['spend'] / campaign_metrics['dep_users']
campaign_metrics['cost_per_signup'] = campaign_metrics['spend'] / campaign_metrics['signups']
```

**Step 2: Identify Reallocation Opportunities**
```python
# HIGH-PRIORITY SHIFTS (do these first)
# 1. Campaigns with poor DEP efficiency (cost/DEP > 1.3x product avg)
underperformers = campaign_metrics[
    campaign_metrics['cost_per_dep'] > product_pool_avg_cost_per_dep * 1.3
]

# 2. Campaigns at diminishing returns (marginal cost/DEP > 1.5x avg)
diminishing = campaign_metrics[
    campaign_metrics['marginal_cost_per_dep'] > campaign_metrics['avg_cost_per_dep'] * 1.5
]

# MEDIUM-PRIORITY SHIFTS
# 3. Campaigns with strong efficiency but budget-constrained
high_performers_limited = campaign_metrics[
    (campaign_metrics['cost_per_dep'] < product_pool_avg_cost_per_dep * 0.85) &
    (campaign_metrics['search_lost_is_budget'] > 0.15)  # Lost >15% impressions due to budget
]

# LOW-PRIORITY SHIFTS (test these cautiously)
# 4. New campaigns showing early promise (need scale test)
new_campaigns_promising = campaign_metrics[
    (campaign_metrics['days_active'] < 14) &
    (campaign_metrics['dep_7_pct'] > product_pool_avg_dep * 1.1) &
    (campaign_metrics['signups'] > 30)  # Enough data to be confident
]
```

**Step 3: Generate Shift Recommendations**
```python
recommendations = []

# Shift 1: Reduce budget from underperformers
for campaign in underperformers:
    current_budget = campaign['weekly_budget']
    recommended_budget = current_budget * 0.70  # 30% reduction
    savings = current_budget - recommended_budget
    
    recommendations.append({
        'action': 'reduce',
        'campaign': campaign['name'],
        'current_budget': current_budget,
        'recommended_budget': recommended_budget,
        'amount': -savings,
        'reason': f"Cost/DEP £{campaign['cost_per_dep']:.2f} is {(campaign['cost_per_dep'] / product_pool_avg_cost_per_dep - 1) * 100:.0f}% above product avg",
        'priority': 'high'
    })

# Shift 2: Increase budget to high performers
for campaign in high_performers_limited:
    current_budget = campaign['weekly_budget']
    recommended_budget = current_budget * 1.25  # 25% increase
    investment = recommended_budget - current_budget
    
    recommendations.append({
        'action': 'increase',
        'campaign': campaign['name'],
        'current_budget': current_budget,
        'recommended_budget': recommended_budget,
        'amount': investment,
        'reason': f"Strong DEP efficiency (£{campaign['cost_per_dep']:.2f}) + {campaign['search_lost_is_budget']*100:.0f}% Lost IS (Budget)",
        'priority': 'high',
        'expected_dep_gain': estimate_dep_gain(campaign, investment)
    })

# Ensure budget neutrality within product pool
total_shifts = sum(r['amount'] for r in recommendations)
if total_shifts > 0:
    # Need to find more budget from lower performers
    pass
```

### 5. Scenario Modeling
Before executing shifts, model expected outcomes:

**Scenario A: Shift £500/week from Campaign X → Campaign Y**
```python
scenario_a = {
    'campaign_x_before': {'budget': 1500, 'dep_users': 85, 'cost_per_dep': 17.65},
    'campaign_x_after': {'budget': 1000, 'dep_users': 60, 'cost_per_dep': 16.67},  # Better efficiency at lower spend
    'campaign_y_before': {'budget': 1200, 'dep_users': 92, 'cost_per_dep': 13.04},
    'campaign_y_after': {'budget': 1700, 'dep_users': 128, 'cost_per_dep': 13.28},  # Slight efficiency loss but more volume
}

net_dep_change = (scenario_a['campaign_x_after']['dep_users'] + scenario_a['campaign_y_after']['dep_users']) - \
                 (scenario_a['campaign_x_before']['dep_users'] + scenario_a['campaign_y_before']['dep_users'])

# Expected outcome: +11 DEP users with same total spend
```

**Confidence Levels:**
- **High confidence (90%+):** Historical data shows consistent efficiency at target budget levels
- **Medium confidence (70-90%):** Some data, but campaign behavior may change at new budget level
- **Low confidence (<70%):** New campaign or untested budget range, requires monitoring

## Decision Framework
**When campaign cost/DEP is >30% above product average:**
- **Immediate action:** Reduce budget by 20-30%
- **Root cause:** Diagnose (creative fatigue? audience exhaustion? targeting drift?)
- **Budget destination:** Shift to campaigns within 15% of product average efficiency

**When campaign has strong efficiency (<15% below product average) and Lost IS (Budget) >20%:**
- **Opportunity:** Scale this campaign
- **Test increase:** +20-30% budget for 1 week, monitor marginal cost/DEP
- **Continue if:** Marginal cost/DEP stays within target range

**When campaign shows diminishing returns (marginal cost/DEP >1.5x avg):**
- **Action:** Reduce budget or pause scaling
- **Alternative:** Expand targeting (new audiences, broader match types) to find fresh inventory

**When launching new campaign:**
- **Initial budget:** Start with 10-15% of product pool budget
- **Ramp schedule:** Week 1 → 10%, Week 2 → 15%, Week 3 → 20% if performance validates
- **Protection:** Don't shift budget away from proven campaigns until new campaign proves itself (minimum 3 weeks, 100+ signups)

**When reallocating within a product pool:**
- **Budget neutrality:** Total product pool budget stays constant unless additional budget approved
- **Minimum viable budget:** Never reduce campaign below £50/day (£350/week) or it loses auction participation
- **Reallocation cap:** No single shift >£1,000/week to avoid shocking the system

## Key Metrics & KPIs
- **Reallocation efficiency:** DEP user gain per £100 shifted (target: +2-3 DEP users per £100 shifted)
- **Optimal allocation score:** % of spend within efficient zone (cost/DEP within 15% of product average) (target: 85%+)
- **Diminishing returns management:** % of budget on campaigns past diminishing returns point (target: <10%)
- **Portfolio diversification:** Campaign correlation coefficient (target: maintain campaigns with <0.70 correlation for at least 30% of spend)
- **Budget utilization:** Daily budget pacing (target: 95-100% utilization, avoiding overspend)

## Output Format
**Weekly Budget Reallocation Report:**
```markdown
## Budget Allocation Recommendations — Week of [Date]
**Product Pool:** Work Management | **Total Budget:** £12,500/week

### 📊 Current Allocation Health
- **Optimal zone (cost/DEP within 15% of avg):** 68% of spend
- **Warning zone (15-30% above avg):** 22% of spend
- **Inefficient zone (>30% above avg):** 10% of spend
- **Product avg cost/DEP:** £14.80

### 🔄 High-Priority Shifts (Execute This Week)
**Reduce:**
| Campaign | Current Budget | Recommended | Shift | Reason |
|----------|---------------|-------------|-------|--------|
| Google_NonBrand_Broad | £1,800/week | £1,200/week | -£600 | Cost/DEP £19.40 (+31% vs avg), diminishing returns detected |
| Meta_Prospecting_Video | £1,400/week | £1,050/week | -£350 | Creative fatigue, DEP dropped to 28% (-26% WoW) |

**Increase:**
| Campaign | Current Budget | Recommended | Shift | Expected DEP Gain |
|----------|---------------|-------------|-------|-------------------|
| Google_Brand_Exact | £1,200/week | £1,500/week | +£300 | +22 DEP users (strong efficiency £11.20) |
| Meta_Retargeting_Carousel | £900/week | £1,250/week | +£350 | +28 DEP users (DEP 48%, low frequency) |
| LinkedIn_ABM_Pilot | £600/week | £900/week | +£300 | +18 DEP users (early promise, DEP 44%) |

**Net Impact:** 
- Budget shifts: 0 (neutral reallocation within product pool)
- Expected DEP user gain: +68 users/week (+12% increase)
- Expected cost/DEP improvement: £14.80 → £13.90 (-6%)

### 📈 Scenario Modeling
**Scenario: Implement all recommended shifts**
- **Before:** 12,500 weekly spend → 842 DEP users → £14.80 cost/DEP
- **After:** 12,500 weekly spend → 910 DEP users → £13.74 cost/DEP
- **Confidence level:** High (85%) — all campaigns have 4+ weeks of data

### 🎯 Medium-Priority Tests (Consider Next Week)
1. **Test expansion:** Google_NonBrand_Phrase showing strong efficiency at current budget — test +£400/week increase to see if scales
2. **New audience pilot:** Meta lookalike (1% of converters) — allocate £500/week from Meta_Prospecting_Interest budget

### ⚠️ Risks & Monitoring
- **Google_Brand_Exact:** Monitor for impression share ceiling (currently 78% IS, may hit 100% with increased budget)
- **LinkedIn_ABM_Pilot:** Small sample size (42 signups), watch marginal cost/DEP closely after increase
- **Meta_Retargeting_Carousel:** Creative is 11 days old, plan refresh in 7-10 days to avoid fatigue

### 📌 Product Pool Benchmarks (4-week rolling avg)
| Product Pool | Spend | DEP Users | Avg Cost/DEP | Top Campaign |
|-------------|-------|-----------|--------------|--------------|
| Work Management | £50,000 | 3,380 | £14.80 | Google_Brand_Exact (£11.20) |
| CRM | £38,000 | 2,240 | £16.96 | Meta_Retargeting_All (£13.80) |
| Dev | £28,000 | 2,140 | £13.08 | Google_NonBrand_Exact (£10.50) |
```

## Mandatory Rules (added 2026-06-01)

1. **Brand vs non-brand: never mix in comparisons** — Brand campaigns have inflated DEP from brand intent. Never use brand campaign DEP as the benchmark for non-brand reallocation decisions. Separate brand and non-brand in all analysis and recommendations.

2. **Impression share check before reallocation** — Before recommending budget increase for a campaign, confirm it is losing IS to budget (not rank). If losing to rank → fix QS/ad rank first, adding budget won't help. Pull IS data from Google Ads API.

3. **Explicit budget flow required** — Every reallocation must specify: total freed (from which campaigns, how much each), and exactly where each dollar goes. Numbers must add up. No vague "shift budget from X to Y."

4. **DEP is the primary metric** — Rank campaigns by DEP/signup, not CPA. CPA is directional. When CPA says "good" but DEP says "bad" (e.g., gantt_template: low CPA, $0.91 DEP), DEP wins.

## Constraints (UK POC Specific)
- **Product budget isolation:** Reallocations within work_management, crm, or dev pools only (no cross-product shifts without approval)
- **Minimum campaign budgets:** £50/day minimum to maintain auction viability
- **Google Search attribution:** Full BigBrain + in-platform data available
- **Meta & YouTube:** In-platform only (view-through not measurable, limits multi-touch attribution)
- **Weekly cadence:** Budget changes weekly (Monday go-live), not daily/mid-week

## Tooling & Automation
**Data Sources:**
- BigBrain: Weekly campaign performance with DEP_7 attribution
- Google Ads API: Impression share, auction insights, quality score
- Meta API: In-platform CPA, frequency, creative fatigue signals

**Optimization Engine:**
- Python-based allocation optimizer (greedy algorithm + scenario modeling)
- Statistical correlation analysis for portfolio diversification
- Marginal cost/DEP calculation for diminishing returns detection

**Automation:**
- Weekly report auto-generated every Monday 7:00 AM GMT
- Slack notification to #funnel-fighters-uk with recommendations
- Draft budget changes prepared in Google Ads / Meta interfaces (requires manual approval)

**Monitoring Dashboard:**
- Real-time budget pacing (prevent overspend)
- Campaign efficiency heatmap (cost/DEP vs. product avg)
- Diminishing returns alerts (marginal cost/DEP threshold breached)

## Success Criteria
- **DEP efficiency improvement:** Reduce product pool avg cost/DEP by 8-12% per quarter through reallocation
- **Budget utilization:** Maintain 95-100% daily budget pacing across all campaigns
- **Reallocation win rate:** 75%+ of executed shifts produce expected or better DEP gains
- **Diminishing returns avoidance:** <10% of spend on campaigns past diminishing returns point
- **Portfolio resilience:** Maintain campaign diversification (at least 5 active campaigns per product pool, <0.75 correlation)

## Related Skills
- **DEP Scorecard Automation:** Anomaly detection feeds into urgent reallocation decisions
- **Google Ads API × DEP:** Keyword-level efficiency informs campaign-level budget decisions
- **Meta Creative Analyzer:** Creative fatigue signals trigger budget reductions
- **LP → DEP Mapper:** LP variant DEP performance influences traffic allocation

---

**Inspired by:** PPC Strategist agent (budget pacing frameworks) + Paid Media Auditor agent (diminishing returns analysis)

**Research additions:**
- Diminishing returns detection methodology from paid media economics
- Portfolio theory application to paid media diversification
- Marginal cost analysis frameworks from microeconomics
- Budget allocation optimization algorithms (greedy, efficient frontier)
