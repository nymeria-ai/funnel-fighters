-- UK POC: Google Ads × DEP Cross-Reference (Skill #2)
-- Owner: Ygritte
-- Run: After scorecard, for keyword-level diagnosis
-- Output: Keyword-level DEP efficiency for UK Search campaigns

-- STEP 1: Keyword-level DEP from BigBrain
SELECT 
  KEYWORD,
  AD_GROUP,
  CAMPAIGN,
  PRODUCT_DTR,
  COUNT(DISTINCT PULSE_ACCOUNT_ID) AS signups,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS total_dep7_arr,
  SUM(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS total_no_usage_dep_arr,
  AVG(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS avg_dep7_per_signup
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND SOURCE = 'adwordssearch'
  AND KEYWORD IS NOT NULL AND KEYWORD != ''
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND IS_INTERNAL_ACCOUNT_ID = FALSE
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY KEYWORD, AD_GROUP, CAMPAIGN, PRODUCT_DTR
HAVING signups >= 3  -- minimum sample size
ORDER BY total_dep7_arr DESC;

-- STEP 2: Spend per keyword (from adn_data)
SELECT 
  KEYWORD,
  AD_GROUP,
  CAMPAIGN,
  SUM(COST) AS keyword_spend
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'adn_data'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND SOURCE = 'adwordssearch'
  AND KEYWORD IS NOT NULL AND KEYWORD != ''
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY KEYWORD, AD_GROUP, CAMPAIGN
ORDER BY keyword_spend DESC;

-- STEP 3: Cross-reference (in analysis layer)
-- Join Step 1 + Step 2 on KEYWORD + CAMPAIGN
-- Calculate: cost_per_dep7_arr = keyword_spend / total_dep7_arr
-- Flag: keywords where cost_per_dep7_arr > 2x campaign average
-- Flag: keywords with high spend but zero/low DEP (waste)
-- Flag: keywords with great DEP but low impression share (scale opportunity)

-- NOTE: Google Ads API will supplement with:
-- - Quality Score (1-10)
-- - Search Impression Share %
-- - Auction Insights (competitor overlap)
-- These are NOT in BigBrain — pulled separately via Google Ads API
-- Join key: keyword text + campaign name matching
