# LP → DEP Mapper

## Purpose
Landing page variant performance tracking system that connects UTM-tagged traffic sources to specific landing page experiences and measures downstream DEP_7 correlation. Identifies which landing page elements (headlines, CTAs, form fields, imagery, social proof) drive higher-quality signups that become deeply engaged users. Use this to optimize landing page testing roadmap and prevent shipping LP changes that tank signup quality despite boosting conversion rates.

## When to Use
- **A/B testing validation:** Pre-launch hypothesis → post-launch DEP correlation check
- **Landing page audits:** Identify which current LP variants produce best DEP outcomes
- **Traffic source optimization:** Determine if certain traffic sources need different LP experiences
- **Message match analysis:** Verify ad copy → LP headline → onboarding alignment
- **Conversion vs. quality trade-offs:** Decide if a high-converting LP variant is actually worth it (DEP lens)
- **Personalization decisions:** Test if dynamic LP content based on UTM params improves DEP

## Core Methodology

### 1. UTM → LP Variant Mapping Architecture
**UTM Structure for LP Tracking:**
```
utm_source: google / facebook / linkedin / email
utm_medium: cpc / social / email / organic
utm_campaign: uk_work_mgmt_q2 / crm_smb_prospecting
utm_content: lp_variant_a / lp_variant_b / lp_control
utm_term: [keyword] (Google Ads only)
```

**Landing Page Variant Taxonomy:**
- **Control (baseline):** Current production LP
- **Variant A, B, C...:** A/B test variations
- **Personalized:** Dynamic content based on UTM params (e.g., industry-specific headlines)

**Technical Implementation:**
```javascript
// JavaScript snippet on LP to capture UTM + assign variant
const urlParams = new URLSearchParams(window.location.search);
const utmContent = urlParams.get('utm_content') || 'lp_control';
const utmSource = urlParams.get('utm_source');
const utmCampaign = urlParams.get('utm_campaign');

// Log LP variant impression to analytics
dataLayer.push({
  'event': 'lp_impression',
  'lp_variant': utmContent,
  'utm_source': utmSource,
  'utm_campaign': utmCampaign,
  'timestamp': Date.now()
});

// On form submit, pass LP variant to BigBrain
form.addEventListener('submit', function() {
  dataLayer.push({
    'event': 'signup',
    'lp_variant': utmContent,
    'user_id': generatedUserId  // Will be joined with DEP_7 later
  });
});
```

### 2. BigBrain LP → DEP Attribution
**Data Pipeline:**
```sql
-- BigBrain schema: user signups with LP variant attribution
CREATE TABLE lp_attributed_signups AS
SELECT 
  u.user_id,
  u.signup_timestamp,
  u.utm_source,
  u.utm_medium,
  u.utm_campaign,
  u.utm_content as lp_variant,
  u.country,
  u.product_pool,
  -- DEP metrics (calculated 7 days post-signup)
  CASE WHEN e.deep_engagement_flag = 1 THEN 1 ELSE 0 END as dep_7,
  CASE WHEN e.no_usage_flag = 1 THEN 1 ELSE 0 END as no_usage,
  e.first_value_timestamp,
  e.retention_30d,
  e.trial_to_paid_flag
FROM bigbrain.user_signups u
LEFT JOIN bigbrain.engagement_metrics_7d e ON u.user_id = e.user_id
WHERE u.signup_date >= CURRENT_DATE - 37  -- 30 days + 7 day DEP lookback
  AND u.country = 'GB'
```

**Analysis Query:**
```sql
-- LP Variant Performance Report
SELECT 
  lp_variant,
  utm_source,
  utm_campaign,
  COUNT(DISTINCT user_id) as signups,
  AVG(dep_7) * 100 as dep_7_pct,
  AVG(no_usage) * 100 as no_usage_pct,
  AVG(retention_30d) * 100 as retention_30d_pct,
  AVG(trial_to_paid_flag) * 100 as trial_to_paid_pct
FROM lp_attributed_signups
WHERE signup_timestamp >= CURRENT_DATE - 37
GROUP BY lp_variant, utm_source, utm_campaign
HAVING COUNT(DISTINCT user_id) >= 50  -- Minimum sample size for statistical significance
ORDER BY dep_7_pct DESC
```

### 3. LP Element Correlation Analysis
Break down LP variants by specific elements tested to identify which changes drive DEP improvement:

**Element Categories:**
1. **Headline / Value Prop**
   - Control: "Work management that scales with your team"
   - Variant A: "From chaos to clarity in 5 minutes"
   - Variant B: "The work OS trusted by 200,000+ teams"

2. **Social Proof**
   - Control: No logos
   - Variant A: Customer logo bar (5 brands)
   - Variant B: Testimonial quote + headshot

3. **Form Fields**
   - Control: Email + Full Name + Company Size + Phone
   - Variant A: Email only (progressive profiling)
   - Variant B: Email + Full Name (minimal friction)

4. **CTA Copy**
   - Control: "Start Free Trial"
   - Variant A: "Get Started Free"
   - Variant B: "Try monday.com Free"

5. **Hero Image/Video**
   - Control: Product UI screenshot
   - Variant A: Team collaboration photo
   - Variant B: 15-second product demo video

**Element Impact Scoring:**
```python
# Isolate element changes and calculate DEP lift
element_analysis = []

for element_type in ['headline', 'social_proof', 'form_fields', 'cta', 'hero']:
    variants_with_element = get_variants_testing(element_type)
    
    for variant in variants_with_element:
        control_dep = get_dep(lp_variant='control', date_range='30d')
        variant_dep = get_dep(lp_variant=variant, date_range='30d')
        
        dep_lift = ((variant_dep - control_dep) / control_dep) * 100
        
        # Statistical significance test
        p_value = ttest_ind(
            get_dep_distribution('control'),
            get_dep_distribution(variant)
        ).pvalue
        
        element_analysis.append({
            'element_type': element_type,
            'variant': variant,
            'control_dep': control_dep,
            'variant_dep': variant_dep,
            'dep_lift_pct': dep_lift,
            'statistically_significant': p_value < 0.05,
            'p_value': p_value
        })

# Identify winning elements
winning_elements = [e for e in element_analysis if e['dep_lift_pct'] > 5 and e['statistically_significant']]
```

### 4. Traffic Source × LP Personalization
Different traffic sources may need different LP experiences to maximize DEP:

**Hypothesis Testing Framework:**
```python
# Example: Do Google Search users need different LP than Facebook users?
traffic_source_analysis = df_lp.groupby(['utm_source', 'lp_variant']).agg({
    'signups': 'count',
    'dep_7_pct': 'mean',
    'no_usage_pct': 'mean'
}).reset_index()

# Pivot to compare
pivot_table = traffic_source_analysis.pivot_table(
    index='lp_variant',
    columns='utm_source',
    values='dep_7_pct'
)

# Insight: If Google users have 42% DEP on Variant A but Facebook users only 35%,
# while Facebook users have 44% DEP on Variant B, personalize by source
```

**Personalization Scenarios:**
| Traffic Source | Hypothesis | LP Adjustment | Expected DEP Lift |
|---------------|-----------|---------------|-------------------|
| Google Search (high-intent) | Users know what they want | Shorter copy, direct CTA, focus on features | +8% DEP |
| Facebook/LinkedIn (interrupt) | Users need education | Longer copy, social proof, value prop focus | +12% DEP |
| Email (warm audience) | Already familiar with brand | Minimal copy, fast onboarding, personalized greeting | +6% DEP |

### 5. Message Match Scoring
Measure alignment between ad creative → LP headline → onboarding flow:

**Message Match Audit:**
```python
# Pull ad copy + LP headline + first onboarding step copy
message_chain = []

for campaign in active_campaigns:
    ad_headline = get_ad_primary_text(campaign)
    lp_headline = get_lp_headline(campaign.utm_content)
    onboarding_step_1 = get_onboarding_welcome_text(campaign.product_pool)
    
    # Calculate semantic similarity (NLP)
    ad_to_lp_similarity = cosine_similarity(
        embed_text(ad_headline),
        embed_text(lp_headline)
    )
    
    lp_to_onboarding_similarity = cosine_similarity(
        embed_text(lp_headline),
        embed_text(onboarding_step_1)
    )
    
    # Get DEP for this message chain
    dep_7 = get_dep(utm_campaign=campaign.id)
    
    message_chain.append({
        'campaign': campaign.name,
        'ad_headline': ad_headline,
        'lp_headline': lp_headline,
        'onboarding_text': onboarding_step_1,
        'ad_lp_match': ad_to_lp_similarity,
        'lp_onboarding_match': lp_to_onboarding_similarity,
        'dep_7_pct': dep_7
    })

# Hypothesis: High message match scores (>0.80) correlate with higher DEP
```

**Expected Correlation:**
- Message match score >0.85: DEP typically 40-45%
- Message match score 0.70-0.85: DEP typically 35-40%
- Message match score <0.70: DEP typically 28-35%

### 6. Conversion Rate vs. DEP Trade-off Analysis
**Critical Question:** What if a landing page variant converts 20% more signups but those signups have 15% lower DEP?

**Trade-off Calculator:**
```python
def evaluate_lp_variant(variant_name, control_metrics):
    variant = get_lp_metrics(variant_name)
    
    # Calculate net DEP users (quality-adjusted signups)
    control_dep_users = control_metrics['signups'] * control_metrics['dep_7_pct']
    variant_dep_users = variant['signups'] * variant['dep_7_pct']
    
    net_dep_lift = ((variant_dep_users - control_dep_users) / control_dep_users) * 100
    
    # Cost-adjusted analysis
    control_cost_per_dep = control_metrics['spend'] / control_dep_users
    variant_cost_per_dep = variant['spend'] / variant_dep_users
    
    # Decision recommendation
    if net_dep_lift > 0 and variant_cost_per_dep < control_cost_per_dep * 1.10:
        recommendation = "🟢 Ship variant — more DEP users at similar or better efficiency"
    elif net_dep_lift > 10:
        recommendation = "🟢 Ship variant — DEP gain outweighs any cost increase"
    elif net_dep_lift < -5:
        recommendation = "🔴 Reject variant — DEP loss not worth conversion rate gain"
    else:
        recommendation = "🟡 Marginal — A/B test longer for more data"
    
    return {
        'variant': variant_name,
        'signup_lift_pct': ((variant['signups'] - control_metrics['signups']) / control_metrics['signups']) * 100,
        'dep_change_pct': ((variant['dep_7_pct'] - control_metrics['dep_7_pct']) / control_metrics['dep_7_pct']) * 100,
        'net_dep_lift_pct': net_dep_lift,
        'cost_per_dep_change_pct': ((variant_cost_per_dep - control_cost_per_dep) / control_cost_per_dep) * 100,
        'recommendation': recommendation
    }
```

**Example Scenario:**
- **Control LP:** 1,000 signups, 40% DEP → 400 DEP users, £15 cost/DEP
- **Variant A:** 1,200 signups (+20%), 36% DEP (-10%) → 432 DEP users (+8%), £14.50 cost/DEP (-3%)
- **Decision:** 🟢 Ship Variant A — net gain of 32 DEP users at better efficiency despite lower DEP %

## Decision Framework
**When signup conversion increases but DEP decreases:**
- Calculate net DEP users (quality-adjusted volume)
- If net DEP users increase >5%, consider shipping despite lower DEP %
- If net DEP users decrease, reject variant (acquiring low-quality signups)

**When DEP increases but signup conversion drops:**
- Acceptable if cost/DEP improves (fewer signups, higher quality)
- Unacceptable if total DEP users decrease by >10% (insufficient volume)

**When both conversion and DEP increase:**
- Strong winner — ship immediately and scale budget

**When both conversion and DEP decrease:**
- Clear loser — revert to control, analyze what went wrong

**When message match score is low (<0.70):**
- Diagnose: Ad copy overpromising vs. LP underdelivering?
- Action: Align ad → LP → onboarding messaging before scaling

## Key Metrics & KPIs
- **LP variant DEP correlation:** R-squared between LP variant and DEP_7 (target: r² > 0.15 to confirm LP matters)
- **Message match impact:** DEP lift from high-match (>0.85) vs. low-match (<0.70) campaigns (target: 10-15% lift)
- **Element win rate:** % of LP element tests that produce statistically significant DEP lift (target: 30%+ win rate)
- **Net DEP user gain:** Quality-adjusted signup volume increase from LP optimization (target: +10% per quarter)
- **Traffic source personalization lift:** DEP improvement from personalized LP vs. one-size-fits-all (target: +8-12%)

## Output Format
**LP Variant Performance Report (30-day cohort):**
```markdown
## LP → DEP Analysis — Cohort: [Start Date] to [End Date]

### 🏆 Winning Variants (by net DEP users)
| LP Variant | Signups | DEP_7% | DEP Users | Cost/DEP | vs. Control |
|-----------|---------|--------|-----------|----------|-------------|
| lp_variant_headline_v2 | 1,240 | 42% | 521 | £13.20 | +18% DEP users ✅ |
| lp_variant_social_proof | 1,180 | 44% | 519 | £12.80 | +16% DEP users ✅ |
| Control | 1,150 | 38% | 437 | £15.10 | Baseline |

### ❌ Losing Variants (by net DEP users)
| LP Variant | Signups | DEP_7% | DEP Users | Cost/DEP | vs. Control |
|-----------|---------|--------|-----------|----------|-------------|
| lp_variant_minimal_form | 1,420 | 28% | 398 | £18.40 | -9% DEP users 🔴 |

**Insight:** Minimal form drove 23% more signups but 26% lower DEP → net loss of quality users. Reject.

### 📐 Element Impact Analysis
| Element Tested | Winning Variant | DEP Lift | Stat. Sig? | Recommendation |
|---------------|----------------|----------|------------|----------------|
| Headline | "From chaos to clarity in 5 min" | +11% | Yes (p<0.01) | 🟢 Ship |
| Social Proof | Customer logo bar | +8% | Yes (p<0.03) | 🟢 Ship |
| Form Fields | Email only (progressive) | -10% | Yes (p<0.02) | 🔴 Reject |
| CTA Copy | "Get Started Free" | +2% | No (p=0.18) | 🟡 Inconclusive |

### 🔗 Message Match Analysis
**High-Match Campaigns (>0.85 similarity):**
- Avg DEP: 43%
- Example: Ad "Manage projects without chaos" → LP "From chaos to clarity" → Onboarding "Let's organize your projects"

**Low-Match Campaigns (<0.70 similarity):**
- Avg DEP: 32%
- Example: Ad "Free trial, no credit card" → LP "Enterprise-ready work OS" → Onboarding "Tell us about your company"
- Issue: Ad focuses on free trial, LP focuses on features, onboarding asks for company info (friction)

### 💡 Recommendations
1. **Ship headline_v2 + social_proof elements** → Expected combined DEP lift +15-18%
2. **Revert minimal form test** → Acquiring low-quality signups
3. **Fix message match for Campaign X** → Rewrite LP headline to align with ad promise
4. **Test traffic source personalization** → Google users see feature-focused LP, Facebook users see value prop-focused LP
```

## Constraints (UK POC Specific)
- **7-day DEP lag:** LP test results not actionable until 7 days after test concludes (must run test for minimum 14-21 days total)
- **Sample size requirements:** Minimum 50 signups per LP variant for statistical validity (may take 1-2 weeks depending on traffic volume)
- **Product budget isolation:** LP tests within product pools only (no cross-product LP changes)
- **UTM tagging discipline:** Requires strict UTM hygiene (broken UTMs = lost attribution)

## Tooling & Automation
**Frontend Tracking:**
- Google Tag Manager for LP impression + variant logging
- dataLayer events pushed to BigBrain on signup

**BigBrain Attribution:**
- UTM parameters stored with user_id on signup (confirmed columns: SOURCE, MEDIUM, CONTENT, CAMPAIGN, LANDING_PAGE, LANDING_PAGE_PRODUCT)
- Table: `BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH` (type = 'attribution')
- 7-day post-signup DEP calculation joined back to LP variant via CONTENT + LANDING_PAGE

**GA4 (Behavioral Diagnostic Layer):**
- On-page engagement per LP variant: scroll depth, time on page, bounce rate
- Form interaction events: field focus, abandonment point, completion rate
- Session quality signals: pages/session, engagement rate by traffic source
- Post-signup onboarding flow: first-session feature adoption (if tracked)
- **Join path:** GA4 session data linked via UTM parameters (source/medium/campaign/content) to BigBrain attribution
- **Key insight:** BigBrain tells us WHICH LP wins on DEP; GA4 explains WHY (behavioral diagnostics)

**Analytics:**
- Python/SQL for LP variant → DEP correlation analysis
- GA4 Data API for behavioral metrics extraction
- Statistical significance testing (t-tests, chi-square)
- Semantic similarity scoring for message match (sentence transformers)

**Dashboard:**
- Real-time LP variant performance (signup volume, conversion rate)
- GA4 behavioral overlay: scroll depth, bounce rate, time on page per variant
- 7-day lagged DEP metrics overlay
- Message match heatmap by campaign

## Success Criteria
- **LP testing velocity:** 2-3 LP element tests running concurrently at any time
- **Win rate:** 30%+ of LP tests produce statistically significant DEP lift
- **Net DEP gain:** LP optimization drives 10%+ increase in quality-adjusted signups per quarter
- **Message match improvement:** Increase % of campaigns with >0.80 message match score from 40% → 70%
- **Trade-off decisions:** Zero LP variants shipped that decrease net DEP users (quality gate maintained)

## Related Skills
- **DEP Scorecard Automation:** Campaign-level DEP anomalies may trace back to LP changes
- **Google Ads API × DEP:** Keyword → LP alignment testing (certain keywords need specific LP variants)
- **Meta Creative Analyzer:** Ad creative → LP message match validation

---

**Inspired by:** Tracking Specialist agent (UTM architecture, attribution) + Product Manager agent (metrics-driven decision frameworks, trade-off analysis)

**Research additions:**
- Landing page A/B testing best practices from SaaS conversion optimization studies
- Message match scoring methodology (semantic similarity applied to funnel continuity)
- Conversion vs. retention trade-off frameworks (quality-adjusted volume thinking)
- UTM-to-downstream-value correlation analysis patterns
