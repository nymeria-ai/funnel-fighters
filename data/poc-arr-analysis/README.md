# POC: ARR per Dollar — Google Search Campaign Efficiency Analysis

**Date:** 2026-05-13
**Author:** Ygritte (read-only analysis, no platform writes)
**Channel:** Google Ads Search (source = 'adwordssearch')
**Period:** 2023-01-01 to 2024-12-31 (historical), last 30 days (current spend)

## Methodology

### Data Source
- **Table:** `BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH`
- **Attribution data:** `type = 'attribution'` — one row per signup with predicted ARR
- **Spend data:** `type = 'adn_data'` — keyword-level cost data

### Key Metric: Expected ARR per Dollar Spent

```
ARR/$ = total_predicted_arr / total_spend
```

Where:
- `total_predicted_arr` = SUM(predicted_collection_365) for all signups from that campaign × country
- `total_spend` = SUM(kw_cost) for that campaign × country from adn_data

### Why `predicted_collection_365`?
- Actual `collection_365` is NOT populated in BigBrain (NULL for all rows, even 2023 cohorts)
- `predicted_collection_365` is a Data Science model prediction available for 98% of records
- It predicts the 365-day revenue collection for each signup based on early signals
- This is actually BETTER for our use case — forward-looking and available for recent cohorts

### Confidence Score

```
confidence = (1 - stddev_arr / avg_arr)
```

- **Positive values (0 to 1):** Low variance, predictable ARR per signup — high confidence
- **Negative values:** High variance, a few outlier deals inflate the average — lower confidence
- Signups >= 15 required for any segment to appear in the analysis

### Filters Applied
- Only `source = 'adwordssearch'` (Google Search)
- Internal accounts excluded where column available
- Top performers: signups >= 15, spend > $10K
- Bottom performers: signups >= 10, spend > $30K
- Current spend: > $3K in last 30 days

## Files

### 1. `current_spend.json` (60 campaigns)
Current 30-day spend allocation. Fields:
- `campaign` — full campaign name
- `country` — target country/region (US, GB, AU, ROW, WW, CA, EU1)
- `spend30D` — dollars spent in last 30 days
- `clicks30D` — clicks in last 30 days

### 2. `historical_efficiency.json` (80 campaigns)
Top performers sorted by ARR per dollar (DESC). Note: top rows may have NULL predicted ARR. Fields:
- `campaign`, `country`, `signups`
- `totalPredictedArr` — sum of predicted_collection_365
- `avgPredictedArr` — average per signup
- `stddevArr` — standard deviation of predicted ARR
- `historicalSpend` — total spend 2023-2024
- `arrPerDollar` — the key metric

### 3. `bottom_performers.json` (40 campaigns)
Worst performers sorted by ARR per dollar (ASC). Filtered to spend > $30K. Same fields as above.

## Key Findings

### Efficiency Gap: 25-800x between best and worst

| Tier | ARR per $ | Examples |
|------|-----------|---------|
| **Top tier** | $0.50 - $1.15 | GB project_management_free, ROW projectgen, EU1 Trello competitor |
| **Good** | $0.40 - $0.50 | US marketing_calendar, US project_management_free, GB Salesforce competitor |
| **Average** | $0.10 - $0.40 | Most US core campaigns |
| **Poor** | $0.03 - $0.10 | US CRM, GB management, various AU campaigns |
| **Terrible** | < $0.03 | GB CRM ($0.0003), GB Asana-p ($0.00003), US DSA |

### Top Reallocation Opportunities
- GB CRM main: $147K spend → $43 predicted ARR (essentially zero return)
- GB Trello competitor (exact): $256K spend → $204 predicted ARR
- US CRM main: $534K spend → $3.7K predicted ARR
- US project_management_free (exact): $595K spend → $2.7K predicted ARR
- US dashboards: $154K spend → $711 predicted ARR

### Current vs Optimal Allocation
The top spender today (US CRM main at $397K/30d) is one of the WORST performers historically ($0.007 ARR/$).
Meanwhile, high-efficiency campaigns like marketing_calendar ($0.55 ARR/$) and project_management_free-head ($0.60 ARR/$) get moderate budgets.

## Caveats
1. **predicted_collection_365 ≠ actual ARR** — it's a model prediction. May over/underestimate.
2. **Historical ≠ future** — market conditions, competition, and seasonality change.
3. **Campaign naming evolved** — some 2023 campaigns may have been restructured in 2024-2025.
4. **No internal account filter confirmed** — the IS_INTERNAL_ACCOUNT_ID column wasn't available in the tool queries; results may include some internal noise.
5. **CPC inflation** — current spend is likely at higher CPCs than 2023-2024 historical data.
