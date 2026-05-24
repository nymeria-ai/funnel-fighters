#!/bin/bash
# UK POC: Meta Creative Health Analysis (Skill #3)
# Owner: Nymeria
# Output: Per-ad creative health scores, fatigue detection, refresh recommendations

# Config
META_TOKEN="${META_ADS_TOKEN}"
ACCOUNT_ID="act_1455743984512059"  # monday.com 1
API_VERSION="v21.0"
BASE_URL="https://graph.facebook.com/${API_VERSION}"

# STEP 1: Get all UK ad-level insights (last 14 days for trend detection)
# UK campaigns prefixed "gb-en" in naming convention
echo "=== STEP 1: Pull UK ad-level creative metrics (14d) ==="
curl -s "${BASE_URL}/${ACCOUNT_ID}/insights?\
level=ad&\
fields=ad_id,ad_name,campaign_name,impressions,clicks,spend,ctr,cpc,cpm,frequency,actions,cost_per_action_type&\
date_preset=last_14d&\
time_increment=1&\
filtering=%5B%7B%22field%22%3A%22campaign.name%22%2C%22operator%22%3A%22CONTAIN%22%2C%22value%22%3A%22gb%22%7D%5D&\
limit=500&\
access_token=${META_TOKEN}" > /tmp/uk-poc-meta-ads-14d.json

echo "Raw ad data saved to /tmp/uk-poc-meta-ads-14d.json"

# STEP 2: Get 7-day snapshot for current state
echo "=== STEP 2: Pull UK ad-level (7d snapshot) ==="
curl -s "${BASE_URL}/${ACCOUNT_ID}/insights?\
level=ad&\
fields=ad_id,ad_name,campaign_name,impressions,clicks,spend,ctr,cpc,frequency,actions&\
date_preset=last_7d&\
filtering=%5B%7B%22field%22%3A%22campaign.name%22%2C%22operator%22%3A%22CONTAIN%22%2C%22value%22%3A%22gb%22%7D%5D&\
limit=500&\
access_token=${META_TOKEN}" > /tmp/uk-poc-meta-ads-7d.json

echo "7d snapshot saved to /tmp/uk-poc-meta-ads-7d.json"

# STEP 3: Video-specific metrics (for video creatives)
echo "=== STEP 3: Pull video engagement metrics ==="
curl -s "${BASE_URL}/${ACCOUNT_ID}/insights?\
level=ad&\
fields=ad_id,ad_name,video_avg_time_watched_actions,video_p25_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p100_watched_actions&\
date_preset=last_7d&\
filtering=%5B%7B%22field%22%3A%22campaign.name%22%2C%22operator%22%3A%22CONTAIN%22%2C%22value%22%3A%22gb%22%7D%5D&\
limit=500&\
access_token=${META_TOKEN}" > /tmp/uk-poc-meta-video-7d.json

echo "Video metrics saved to /tmp/uk-poc-meta-video-7d.json"

# ANALYSIS: Run in Python
# - Parse ad naming convention: {country}-{goal}_{platform}_{product}_{format}_{creative}_{lang}
# - Calculate fatigue score per ad:
#   * frequency > 3.5 = +2
#   * CTR declining 7d vs 14d avg = +1
#   * CPA increasing > 20% = +1  
#   * impression volume dropping > 30% = +1 (Meta auto-throttling signal)
#   * fatigue_score >= 4 = REFRESH NEEDED
# - Extract product from campaign name (workos_crm, workos_work-mgmt, etc.)
# - Separate static vs video creatives
# - Output: creative_health_report.md with per-ad scores + recommendations

echo "=== Data pull complete. Run analysis script next. ==="
