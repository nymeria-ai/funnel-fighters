# YouTube Audience Quality Scorer

## Purpose
Evaluate and rank YouTube advertising audience segments (topics, affinity groups, custom intent, placements) by their downstream signup quality — measured through in-platform conversion signals since BigBrain attribution is not available for YouTube.

## When to Use
- Weekly audience performance review for YouTube campaigns
- Before scaling YouTube spend into new audience segments
- When evaluating new topic/affinity targeting options
- When YouTube CPA looks good but signup quality is unclear
- Quarterly audience portfolio rebalancing

## Inspiration
- agency-agents: `paid-media/paid-media-paid-social-strategist.md` (audience engineering, cross-platform budget allocation)
- agency-agents: `marketing/marketing-video-optimization-specialist.md` (YouTube algorithm understanding, audience retention)

## Core Methodology

### 1. Audience Segment Inventory
Map all active YouTube audience segments across campaigns:

```
Segment Types to Track:
├── Affinity audiences (broad interest categories)
├── In-market audiences (active purchase intent)
├── Custom intent audiences (keyword/URL-based)
├── Topic targeting (content categories)
├── Placement targeting (specific channels/videos)
└── Customer match / similar audiences
```

### 2. Quality Signal Framework
Since YouTube lacks BigBrain DEP attribution (view-through is unmeasurable), use proxy quality signals:

**Primary Signals (in-platform):**
- **Cost per conversion** (signup) — lower = more efficient
- **View-through rate (VTR)** — higher = more engaged audience
- **Click-through rate (CTR)** — higher = better intent match
- **Conversion rate (clicks → signup)** — the critical funnel step
- **Watch time / completion rate** — audience attention quality

**Derived Quality Score:**
```
Audience Quality Score = (
  0.35 × Conversion Rate Percentile +
  0.25 × CPA Efficiency Percentile +
  0.20 × VTR Percentile +
  0.10 × CTR Percentile +
  0.10 × Watch Completion Percentile
)
```

### 3. Segment Ranking Matrix

For each audience segment, calculate:

| Metric | Calculation | Weight |
|--------|------------|--------|
| CPA Efficiency | 1 - (segment CPA / worst CPA) | 0.25 |
| Conversion Rate | segment CR / best CR | 0.35 |
| View-Through Rate | segment VTR / best VTR | 0.20 |
| CTR | segment CTR / best CTR | 0.10 |
| Completion Rate | segment completion / best completion | 0.10 |

### 4. Tiering System

**Tier 1 — Scale** (Quality Score ≥ 0.75):
- Increase budget allocation
- Create lookalike/similar audiences based on converters
- Test adjacent topics and affinity segments

**Tier 2 — Maintain** (Quality Score 0.50–0.74):
- Hold current spend
- A/B test creative variations to improve
- Monitor for trend changes (improving or degrading)

**Tier 3 — Optimize** (Quality Score 0.25–0.49):
- Reduce budget or pause
- Test different creative approaches before killing
- Check if poor performance is creative-driven or audience-driven

**Tier 4 — Cut** (Quality Score < 0.25):
- Pause immediately
- Reallocate budget to Tier 1 segments
- Negative-target these segments in other campaigns

## Data Sources and Inputs

| Source | Data | Access |
|--------|------|--------|
| Google Ads API | Campaign/ad group metrics, audience segment reports | API (via Nymeria's Google Ads skill) |
| YouTube Analytics | Watch time, audience retention, demographics | In-platform |
| Google Ads Audience Manager | Segment definitions, sizes, overlap | In-platform |

**NOT available for YouTube:**
- BigBrain DEP data (view-through attribution gap)
- Post-signup product usage metrics
- Cross-device attribution beyond Google's model

## Key Metrics and KPIs

### Performance KPIs
- **Cost per Quality Signup** — CPA adjusted by conversion rate
- **Audience Quality Score** — composite score (0–1) per segment
- **Budget Efficiency Ratio** — spend on Tier 1+2 / total YouTube spend (target: ≥70%)
- **Segment Diversity Index** — avoid over-concentration in single audience

### Monitoring KPIs
- **Week-over-week CPA trend** per segment
- **Audience fatigue indicator** — declining VTR/CTR over 4+ weeks
- **New segment test velocity** — # of new audiences tested per month

## Decision Framework

### When to Scale an Audience
All must be true:
1. Quality Score ≥ 0.75 for 2+ consecutive weeks
2. Conversion rate above campaign average
3. CPA within 120% of target
4. Segment size large enough (>100K users) to absorb more spend

### When to Cut an Audience
Any is true:
1. Quality Score < 0.25 for 2+ weeks
2. Zero conversions after £500+ spend
3. CPA > 200% of target with no improvement trend
4. Audience overlap >60% with a better-performing segment

### Creative vs Audience Diagnosis
When a segment underperforms:
1. Check if the SAME creative works in other segments → audience problem
2. Check if OTHER creatives work in this segment → creative problem
3. If both fail → audience is wrong, cut it

## Output Format

### Weekly Audience Scorecard
```
YouTube Audience Quality Report — Week of [DATE]
Product: [PRODUCT]  |  Country: UK  |  Total Spend: £X

TIER 1 — SCALE (X segments, Y% of spend)
┌─────────────────────────────┬───────┬────────┬─────┬───────┐
│ Segment                     │ Score │ CPA    │ CR  │ Trend │
├─────────────────────────────┼───────┼────────┼─────┼───────┤
│ In-market: Project Mgmt     │ 0.89  │ £12.30 │ 4.2%│ ↑     │
│ Affinity: Tech Professionals│ 0.82  │ £14.10 │ 3.8%│ →     │
└─────────────────────────────┴───────┴────────┴─────┴───────┘

TIER 2 — MAINTAIN (X segments, Y% of spend)
[...]

TIER 3 — OPTIMIZE (X segments, Y% of spend)
[...]

TIER 4 — CUT (X segments, Y% of spend)
[...]

RECOMMENDATIONS:
1. Scale [segment] — +£X/week (reason)
2. Cut [segment] — save £X/week (reason)
3. Test [new segment] — pilot at £X/week (hypothesis)
```

## Constraints (UK POC)
- All budget optimization within product-level pools (no cross-product reallocation)
- YouTube = **in-platform metrics only** (no BigBrain DEP attribution)
- View-through conversions are acknowledged as unmeasurable — do NOT claim DEP correlation for YouTube
- Creative testing budget: max 20% of YouTube spend on Tier 3/new segments
- Minimum 2-week observation window before tiering decisions

## Integration with Other Skills
- **Budget Allocation Recommender** — feeds YouTube segment recommendations into cross-channel budget model
- **Meta Creative Analyzer** — share creative learnings (hooks, formats) across platforms where applicable
- **DEP Scorecard** — cannot directly integrate (no YouTube DEP), but can correlate aggregate YouTube spend periods with overall DEP trends as a directional signal
