-- UK POC: DEP Scorecard (Skill #1)
-- Owner: Ygritte
-- Run: Daily, after Guy approves
-- Output: Campaign-level DEP efficiency by product

-- STEP 1A: DEP Attribution (7-day trailing)
SELECT 
  CAMPAIGN,
  PRODUCT_DTR,
  SOURCE,
  GROUPED_CHANNEL,
  COUNT(DISTINCT PULSE_ACCOUNT_ID) AS signups,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS total_dep7_arr,
  SUM(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS total_no_usage_dep_arr,
  AVG(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS avg_dep7_per_signup,
  AVG(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS avg_no_usage_per_signup
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND CREATED_AT >= DATEADD('day', -7, CURRENT_DATE())
  AND IS_INTERNAL_ACCOUNT_ID = FALSE
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY CAMPAIGN, PRODUCT_DTR, SOURCE, GROUPED_CHANNEL
ORDER BY total_dep7_arr DESC;

-- STEP 1B: DEP Attribution (30-day baseline)
SELECT 
  CAMPAIGN,
  PRODUCT_DTR,
  SOURCE,
  GROUPED_CHANNEL,
  COUNT(DISTINCT PULSE_ACCOUNT_ID) AS signups,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS total_dep7_arr,
  SUM(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS total_no_usage_dep_arr,
  AVG(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS avg_dep7_per_signup,
  AVG(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS avg_no_usage_per_signup
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND IS_INTERNAL_ACCOUNT_ID = FALSE
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY CAMPAIGN, PRODUCT_DTR, SOURCE, GROUPED_CHANNEL
ORDER BY total_dep7_arr DESC;

-- STEP 2: Spend by campaign (30-day, for cost/DEP ratio)
SELECT 
  CAMPAIGN,
  PRODUCT_DTR,
  SOURCE,
  SUM(COST) AS total_spend,
  COUNT(DISTINCT CREATED_AT::DATE) AS active_days
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'adn_data'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY CAMPAIGN, PRODUCT_DTR, SOURCE
ORDER BY total_spend DESC;

-- STEP 3: Anomaly detection (7d vs 30d comparison)
-- Logic: Calculate 7d avg and 30d avg per campaign
-- Flag if 7d DEP/signup < 30d DEP/signup by >15%
-- Flag if 7d cost/DEP > 30d cost/DEP by >25%
-- (Applied in Python/analysis layer after pulling raw data)
