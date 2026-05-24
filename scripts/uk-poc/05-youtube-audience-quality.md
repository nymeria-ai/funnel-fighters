# YouTube Audience Quality Scorer — Execution Plan (Skill #6)
# Owner: Nymeria
# Source: Google Ads API (YouTube campaigns)
# Confidence: 🟡 MEDIUM (in-platform only, no DEP attribution)

## Data Pull (via Google Ads API)
- Pull audience segment performance for UK YouTube campaigns
- Metrics: impressions, views, view_rate, conversions, cost_per_conversion, avg_cpv
- Breakdowns: topic, affinity audience, custom intent audience, placement
- Time range: last 30 days

## Audience Quality Proxy Signals (no BigBrain DEP available)
Since YouTube is view-through dominant and BigBrain can't attribute:
1. **CVR (conversion rate)** — signup rate post-view
2. **CPA** — cost per signup by audience segment  
3. **View rate** — proxy for relevance (high view rate = audience match)
4. **Avg CPV** — efficiency signal

## Tiering Logic
- **Tier 1 (Scale):** CVR > campaign avg AND CPA < campaign avg
- **Tier 2 (Maintain):** CVR near avg OR CPA near avg
- **Tier 3 (Cut/Test):** CVR < 50% of avg OR CPA > 2x avg

## Execution
1. Query Google Ads API for UK YouTube campaigns (filter by campaign name "gb" or "uk")
2. Pull audience_segment report with metrics above
3. Rank and tier audiences
4. Output: tiered audience list with recommendations

## Note
YouTube verification deferred to morning run. Need to confirm:
- UK YouTube campaign naming convention (same "gb-en" prefix as Meta?)
- Whether audience segment reports are available at the detail level we need
- Google Ads API has the audience_segment resource — should work
