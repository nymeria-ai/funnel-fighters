# Meta Creative Analyzer

## Purpose
Systematic creative performance analysis for Meta (Facebook/Instagram) campaigns, focusing on in-platform CPA, CTR, hold rate (video watch time), and creative fatigue detection. Provides creative scoring framework and refresh recommendations based on engagement decay patterns. Use when creative performance is degrading, when planning creative refreshes, or when scaling Meta campaigns to maintain efficiency.

## When to Use
- **Creative fatigue monitoring:** Weekly checks to identify ads showing decay signals
- **Creative testing:** Evaluate which creative angles, formats, and hooks drive best CPA and hold rate
- **Refresh planning:** Determine which ads need rotation and what creative themes to test next
- **Scale preparation:** Ensure creative library is deep enough to support budget increases without fatigue
- **Format optimization:** Compare video vs. carousel vs. static image performance
- **Hook testing:** Identify which opening 3 seconds drive highest thumb-stop rates

## Core Methodology

### 1. Creative Fatigue Detection Framework
Creative fatigue occurs when an audience has seen an ad too many times, leading to declining engagement and rising costs. **Early detection is critical** — by the time CPA spikes, fatigue has been building for days.

**Leading Indicators (detect fatigue early):**
- **CTR decline:** Week-over-week drop of 10-15%+ (primary signal)
- **Rising frequency:** Average frequency >3 for prospecting, >6 for retargeting
- **Increasing CPM:** Rising cost to reach same audience (algorithm deprioritizing)

**Lagging Indicators (confirm fatigue):**
- **CPA spike:** +25%+ week-over-week
- **Declining ROAS:** Below campaign targets
- **Negative feedback:** Ad hides, "stop seeing this" clicks

**Detection Workflow:**
```python
# Pull Meta ad-level data for last 30 days
df_ads = meta_api.get_ads_insights(
    fields=[
        'ad_id', 'ad_name', 'creative_id',
        'impressions', 'clicks', 'frequency',
        'cpm', 'cpc', 'ctr', 'spend',
        'actions',  # Contains conversions by type
        'action_values'  # Contains conversion values
    ],
    time_range={'since': '30d', 'until': 'today'},
    breakdowns=['date'],
    level='ad'
)

# Calculate daily metrics
df_ads['cpa'] = df_ads['spend'] / df_ads['conversions']
df_ads['date'] = pd.to_datetime(df_ads['date'])

# Group by ad and calculate week-over-week changes
df_fatigue = df_ads.groupby(['ad_id', pd.Grouper(key='date', freq='W')]).agg({
    'ctr': 'mean',
    'frequency': 'mean',
    'cpm': 'mean',
    'cpa': 'mean',
    'impressions': 'sum'
}).reset_index()

# Calculate WoW % change
df_fatigue['ctr_change_pct'] = df_fatigue.groupby('ad_id')['ctr'].pct_change() * 100
df_fatigue['cpm_change_pct'] = df_fatigue.groupby('ad_id')['cpm'].pct_change() * 100
df_fatigue['cpa_change_pct'] = df_fatigue.groupby('ad_id')['cpa'].pct_change() * 100

# Flag fatigued ads
df_fatigue['fatigue_score'] = 0
df_fatigue.loc[df_fatigue['ctr_change_pct'] < -10, 'fatigue_score'] += 2  # CTR drop = high signal
df_fatigue.loc[df_fatigue['frequency'] > 3, 'fatigue_score'] += 1  # Frequency threshold
df_fatigue.loc[df_fatigue['cpm_change_pct'] > 15, 'fatigue_score'] += 1  # Rising CPM
df_fatigue.loc[df_fatigue['cpa_change_pct'] > 25, 'fatigue_score'] += 2  # CPA spike = confirm

# Fatigue severity levels
# Score 0-1: Healthy
# Score 2-3: Monitor (yellow flag)
# Score 4+: Fatigued (red flag, refresh needed)
```

### 2. Creative Scoring Framework
Every creative asset gets a multi-dimensional score based on performance and lifecycle stage.

**Performance Dimensions:**
1. **Efficiency Score** (0-100): CPA relative to campaign target
   - Score = 100 × (target_cpa / actual_cpa), capped at 100
   - 90-100: Excellent (beating target by 10%+)
   - 70-89: Good (within target range)
   - 50-69: Acceptable (10-30% above target)
   - <50: Poor (30%+ above target)

2. **Engagement Score** (0-100): CTR + hold rate (video) or engagement rate (static)
   - Video: 50% CTR weight + 50% hold rate weight (% who watch 75%+)
   - Static/Carousel: 100% CTR weight, normalized to campaign avg
   - Score = (metric / campaign_top_decile) × 100

3. **Freshness Score** (0-100): Time-based decay curve
   - Days 1-7: 100 (fresh)
   - Days 8-14: 90
   - Days 15-21: 75
   - Days 22-30: 50
   - Days 31+: 25 (stale, likely fatigued)

4. **Scale Score** (0-100): Impression volume vs. audience size
   - % of target audience reached
   - <20%: 100 (room to scale)
   - 20-40%: 80
   - 40-60%: 60
   - 60-80%: 40
   - 80%+: 20 (oversaturated)

**Composite Creative Score:**
```python
creative_score = (
    efficiency_score * 0.40 +  # Performance is king
    engagement_score * 0.30 +  # Engagement predicts longevity
    freshness_score * 0.20 +   # Time decay matters
    scale_score * 0.10         # Saturation signal
)
```

**Creative Health Tiers:**
- **🟢 Champion (85-100):** Scale aggressively, high performance + fresh
- **🟡 Contender (70-84):** Solid performer, monitor for fatigue
- **🟠 Challenged (50-69):** Showing stress, prepare replacement
- **🔴 Retired (<50):** Pause immediately, creative is burned

### 3. Hold Rate & Engagement Analysis
For video creatives, **hold rate** (% of video watched) is a leading indicator of creative quality.

**Video Hold Rate Benchmarks:**
- **Hook strength (0-3s):** 60%+ retention = strong hook
- **Mid-video (50% mark):** 35-45% retention = engaging content
- **Completion rate:** 20-30% = excellent (most users don't finish)

**Analysis Pattern:**
```python
# Pull video engagement data from Meta API
df_video = meta_api.get_video_insights(
    video_ids=active_video_ads,
    metrics=[
        'video_3_sec_views',
        'video_10_sec_views',
        'video_p25_watched',
        'video_p50_watched',
        'video_p75_watched',
        'video_p100_watched'
    ]
)

# Calculate hold rates
df_video['hook_rate'] = df_video['video_3_sec_views'] / df_video['impressions']
df_video['hold_rate_50'] = df_video['video_p50_watched'] / df_video['video_3_sec_views']
df_video['completion_rate'] = df_video['video_p100_watched'] / df_video['video_3_sec_views']

# Identify strong vs. weak hooks
strong_hooks = df_video[df_video['hook_rate'] > 0.60]  # 60%+ thumb-stop
weak_hooks = df_video[df_video['hook_rate'] < 0.40]  # <40% = boring opening

# Creative insight: Extract hook themes from strong performers
# Example: "Scroll-stopping question" vs. "Logo + product shot" performance
```

### 4. Creative Refresh Strategy
**Rotation Cadence:**
- **Prospecting campaigns:** Refresh every 10-14 days (or when fatigue_score ≥4)
- **Retargeting campaigns:** Refresh every 14-21 days (higher frequency tolerance)
- **High-spend campaigns:** Maintain 3-5 active creatives per ad set (built-in rotation)

**Creative Variation Levels:**
1. **Minor refresh:** Swap hook (first 3s), update CTA, add seasonal element (25% effort)
2. **Medium refresh:** New visuals, same value prop angle (50% effort)
3. **Major refresh:** New creative concept, different value prop angle (100% effort)

**Decision Matrix:**
| Fatigue Score | Refresh Type | Timeline | Action |
|--------------|-------------|----------|--------|
| 0-1 (Healthy) | None | Monitor weekly | Continue running |
| 2-3 (Warning) | Minor refresh | Prepare backup creative | Queue replacement |
| 4-5 (Fatigued) | Medium refresh | Deploy within 3 days | Launch new variant |
| 6+ (Burned) | Major refresh | Pause immediately | Full creative overhaul |

**Creative Testing Framework:**
- Always test 2-3 new creatives against champion
- Run for minimum 3-5 days or 500 conversions (whichever first) for statistical significance
- Graduate winner to champion, pause losers
- Archive winning creative insights for future briefs

### 5. Format Performance Analysis
Compare creative formats to identify what resonates with audience:

**Format Comparison:**
```python
format_performance = df_ads.groupby('format').agg({
    'cpa': 'mean',
    'ctr': 'mean',
    'frequency': 'mean',
    'spend': 'sum',
    'conversions': 'sum'
}).reset_index()

format_performance['spend_share'] = format_performance['spend'] / format_performance['spend'].sum()
format_performance['cpa_vs_avg'] = (format_performance['cpa'] / format_performance['cpa'].mean() - 1) * 100
```

**Expected Patterns (UK B2B SaaS):**
- **Video (UGC style):** Often highest CTR (5-8%), good CPA, but fatigues faster
- **Carousel (feature showcase):** Lower CTR (3-5%), but strong conversion rate (educational journey)
- **Static image (clean design):** Mid CTR (4-6%), longest lifespan before fatigue
- **Collection ads:** Best for retargeting, high intent, premium CPA

## Decision Framework
**When CPA is rising but CTR is stable:**
- Issue is likely post-click (landing page, offer) not creative
- Action: Audit landing page, don't refresh creative yet

**When CTR drops but CPA stable:**
- Engagement declining but quality of traffic still good
- Action: Monitor closely, prepare creative refresh, but no immediate panic

**When both CTR and CPA degrade:**
- Clear creative fatigue signal
- Action: Deploy new creative within 48 hours

**When frequency >4 (prospecting) or >8 (retargeting):**
- Audience oversaturation, even if metrics still okay
- Action: Expand audience OR rotate creative proactively

**When hold rate <35% at 50% mark:**
- Video content is boring or mismatched to audience
- Action: Test new hooks, shorter video length, or different value prop angle

## Key Metrics & KPIs
- **Creative fatigue detection rate:** Flag fatigued ads before CPA spikes by >30% (target: 85% early detection)
- **Creative rotation cadence:** Average days active before refresh (target: 12-15 days prospecting, 18-22 days retargeting)
- **Hook strength:** % of video ads with >55% hook rate (target: 60%+)
- **Creative library depth:** Active creatives per campaign (target: minimum 3-5 per ad set)
- **Refresh impact:** CPA improvement after creative refresh (target: 15-25% reduction)
- **Format diversity:** % of spend across 3+ formats (target: no single format >60% of spend)

## Output Format
**Weekly Creative Health Report:**
```markdown
## Meta Creative Performance — Week of [Date]

### 🚨 Fatigued Ads (Action Required)
| Ad Name | Fatigue Score | CTR Change | CPA Change | Days Active | Action |
|---------|--------------|-----------|-----------|-------------|--------|
| Video_WorkMgt_Feature | 6 | -28% | +42% | 18 days | 🔴 Pause, deploy new creative |
| Carousel_CRM_Social | 4 | -12% | +18% | 15 days | 🟠 Refresh hook |

### 🟢 Champion Creatives (Scale These)
| Ad Name | Creative Score | CPA | CTR | Hold Rate | Days Active |
|---------|---------------|-----|-----|-----------|-------------|
| Video_UGC_Testimonial | 92 | £8.20 | 6.8% | 62% | 8 days |
| Static_ValueProp_Clean | 88 | £9.10 | 5.2% | N/A | 11 days |

### 🎬 Video Hold Rate Analysis
**Strong Hooks (>60% 3-sec retention):**
- "What if managing projects didn't feel like herding cats?" — 68% hook rate
- Customer testimonial opening (B-roll factory) — 64% hook rate

**Weak Hooks (<40% 3-sec retention):**
- Logo intro + product UI demo — 32% hook rate → Retire

### 📊 Format Performance (30-day view)
| Format | CPA | CTR | Spend Share | Days to Fatigue |
|--------|-----|-----|-------------|----------------|
| Video (UGC style) | £8.90 | 6.4% | 42% | 10-12 days |
| Carousel | £10.20 | 4.8% | 28% | 16-18 days |
| Static image | £9.50 | 5.1% | 22% | 18-22 days |
| Collection | £11.80 | 4.2% | 8% | 20-25 days |

### 💡 Creative Recommendations
1. **Deploy 2 new video creatives** to replace fatigued Video_WorkMgt_Feature
   - Test: "Day in the life" angle (not yet tried)
   - Test: Problem/solution contrast hook
2. **Expand carousel library** — format showing longest lifespan, underweight in rotation
3. **Retire all logo-intro videos** — consistently worst hook rates across tests
```

## GA4 Integration — Post-Click Quality Layer

Meta in-platform metrics (CTR, CPA, hold rate) measure ad engagement but NOT post-click quality. GA4 fills this gap as a **leading indicator** — detecting creative-to-page mismatches before they show up in DEP data (which has a 7-day+ lag).

### GA4 Access
- **Property:** Monday Main - GA4 (`properties/403390805`)
- **Endpoint:** `https://analyticsdata.googleapis.com/v1beta/properties/403390805:runReport`
- **Auth:** OAuth2 Bearer token (each agent stores token path + refresh method in their own TOOLS.md)
- **Scope:** `analytics.readonly`

### Post-Click Quality Query (by campaign + ad)
```bash
curl -s -X POST \
  "https://analyticsdata.googleapis.com/v1beta/properties/403390805:runReport" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "dateRanges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
    "dimensions": [
      {"name": "sessionCampaignName"},
      {"name": "sessionManualAdContent"}
    ],
    "metrics": [
      {"name": "sessions"},
      {"name": "engagedSessions"},
      {"name": "engagementRate"},
      {"name": "averageSessionDuration"},
      {"name": "bounceRate"},
      {"name": "conversions"},
      {"name": "screenPageViewsPerSession"},
      {"name": "newUsers"}
    ],
    "dimensionFilter": {
      "filter": {
        "fieldName": "sessionSourceMedium",
        "stringFilter": {"matchType": "EXACT", "value": "facebook / social_ads"}
      }
    },
    "orderBys": [{"metric": {"metricName": "sessions"}, "desc": true}],
    "limit": 50
  }'
```

### GA4 Anomaly Thresholds for Meta Creatives
| Signal | Threshold | Meaning |
|--------|-----------|--------|
| Engagement rate drop | >15% WoW | Creative-to-page mismatch worsening |
| Bounce rate spike | >20% WoW | Ad promise ≠ landing page delivery |
| Avg session duration drop | >25% WoW | Users losing interest post-click |
| Pages/session < 1.1 | Sustained | Users not exploring — instant bounce |
| Conversion rate < 3% (from Meta) | vs. 60%+ from SEM | Normal for Meta; flag only if declining |

### Key GA4 Dimensions for Meta Analysis
- `sessionSourceMedium` = `facebook / social_ads` (filter for Meta traffic)
- `sessionCampaignName` = campaign name (matches Meta campaign naming convention)
- `sessionManualAdContent` = Meta ad ID (numeric, e.g. `120245093902000562`)
- `landingPage` = destination URL path
- `deviceCategory` = mobile/desktop/tablet (Meta is ~99% mobile)

### Creative × Landing Page Cross-Analysis
The GA4 data revealed a critical pattern (May 2026 analysis):
- **Same landing page, wildly different results by source:** `/ap/project-management` converts at 61.5% from Google CPC but 2.7% from Meta
- **Same Meta campaign, different pages = different results:** CRM MSC uitest → `/ap/crm/lead-agent-push` = 66.3% CR; same campaign → `/ap/project-management` = 0.4% CR
- **The `-push` page pattern works:** Purpose-built paid social landing pages (shorter, mobile-first, single CTA) dramatically outperform generic /ap/ pages for Meta traffic

**Implication for creative analysis:** Always cross-reference Meta ad performance with GA4 post-click quality. A "high-performing" Meta ad (low CPA in-platform) may be sending traffic that bounces 90%+ on the actual site.

## Constraints (UK POC Specific)
- **In-platform only:** Meta attribution is in-platform (no BigBrain view-through data)
- **GA4 as bridge:** Use GA4 engagement data as a leading indicator between in-platform metrics and DEP
- **Product budget pools:** Creative tests must stay within product-level budgets
- **Creative production capacity:** Assume 2-4 new creatives can be produced per week (limited by design resources)
- **UK audience size:** Creative fatigue happens faster in smaller geo (vs. US)

## Tooling & Automation
**Meta Marketing API:**
- Ad-level insights with frequency, creative ID, engagement metrics
- Video engagement breakdowns (3s, 10s, p25, p50, p75, p100)
- Creative asset metadata (format, length, UTM parameters)

**Automation:**
- Weekly creative health scan (every Monday 8:00 AM GMT)
- Automated fatigue alerts posted to Slack when fatigue_score ≥4
- Creative performance dashboard updated daily

**Creative Library Management:**
- Tag creatives by theme, format, hook type, value prop angle
- Track creative lineage (which creatives are variants of winners)
- Archive retired creatives with performance notes for future reference

## Success Criteria
- **Zero surprise fatigue:** Catch 90%+ of fatiguing ads before CPA spikes >30%
- **Creative velocity:** Maintain pipeline of 3-5 queued creatives ready to deploy per product
- **Refresh impact:** Average 20% CPA improvement post-refresh vs. pre-refresh
- **Format optimization:** Identify best-performing format per product within 30 days
- **Hook library:** Document 10+ proven hook themes for future creative briefs

## Related Skills
- **DEP Scorecard Automation:** Cross-reference Meta CPA with DEP data to assess signup quality
- **LP → DEP Mapper:** Identify if creative messaging aligns with landing page (message match)
- **Budget Allocation Recommender:** Creative health influences budget shift decisions (don't scale fatigued ads)

---

**Inspired by:** Paid Social Strategist agent (creative testing velocity) + Creative Strategist agent (systematic testing frameworks)

**Research additions:**
- Creative fatigue detection methodology from Meta optimization studies (CTR as leading indicator, frequency thresholds)
- Hold rate benchmarks from video engagement research (3-second retention = hook quality predictor)
- Format performance patterns from B2B SaaS case studies
