# Data Directory

This directory contains generated data files from BigBrain and Google Ads.
Files here are gitignored — they contain real campaign data.

## How to Generate

```bash
# Pull BI product data from BigBrain (via Kremer)
python scripts/sync_bigbrain_data.py --dry-run

# Pull fresh Google Ads data
python scripts/refresh_google_ads.py

# Push BI data to Vercel DB
python scripts/sync_bigbrain_data.py --url https://funnel-fighters.vercel.app --secret $ADMIN_SYNC_SECRET
```

## File Descriptions

| File | Source | Contents |
|------|--------|----------|
| `weekly_cohorts.json` | BigBrain | Weekly funnel cohorts (visits→GS→signups→payers→ACV) |
| `product_funnel.json` | BigBrain | Product alignment (campaign×LP→signup_product→payers) |
| `lp_funnel.json` | BigBrain | LP-level qualified signup rates |
| `duck_scores.json` | Calculated | 4-duck scoring (product, LPs, ads, audience) |
| `google_ads_campaigns.json` | Google Ads | Campaign metrics (last 30d) |
| `google_ads_ads.json` | Google Ads | Ad-level data with headlines/URLs |
| `google_ads_keywords.json` | Google Ads | Keyword metrics (last 30d) |
| `insights.json` | Cross-analysis | Actionable findings from BI×Ads |
