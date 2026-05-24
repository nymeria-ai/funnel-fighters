-- UK POC: Landing Page × DEP Quality (Skill #4 - data pull for Nymera)
-- Owner: Shared (Ygritte pulls BigBrain, Nymera analyzes)
-- Output: LP-level DEP efficiency ranking

-- STEP 1: LP performance by DEP (30-day)
SELECT 
  LANDING_PAGE,
  LANDING_PAGE_PRODUCT,
  PRODUCT_DTR,
  COUNT(DISTINCT PULSE_ACCOUNT_ID) AS signups,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS total_dep7_arr,
  SUM(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS total_no_usage_dep_arr,
  AVG(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS avg_dep7_per_signup,
  AVG(PREDICTED_FIRST_ARR_NO_USAGE_DEP) AS avg_no_usage_per_signup
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND LANDING_PAGE IS NOT NULL AND LANDING_PAGE != ''
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND IS_INTERNAL_ACCOUNT_ID = FALSE
  AND BUSINESS_GOAL_DTR = 'performance_marketing'
GROUP BY LANDING_PAGE, LANDING_PAGE_PRODUCT, PRODUCT_DTR
HAVING signups >= 10  -- minimum for statistical relevance
ORDER BY avg_dep7_per_signup DESC;

-- STEP 2: LP × Source breakdown (which traffic sources send to which LPs)
SELECT 
  LANDING_PAGE,
  SOURCE,
  GROUPED_CHANNEL,
  COUNT(DISTINCT PULSE_ACCOUNT_ID) AS signups,
  SUM(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS total_dep7_arr,
  AVG(PREDICTED_FIRST_ARR_7_DAYS_LOCK) AS avg_dep7_per_signup
FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
WHERE TYPE = 'attribution'
  AND COUNTRY IN ('GB', 'UK', 'United Kingdom')
  AND LANDING_PAGE IS NOT NULL AND LANDING_PAGE != ''
  AND CREATED_AT >= DATEADD('day', -30, CURRENT_DATE())
  AND IS_INTERNAL_ACCOUNT_ID = FALSE
GROUP BY LANDING_PAGE, SOURCE, GROUPED_CHANNEL
HAVING signups >= 5
ORDER BY LANDING_PAGE, total_dep7_arr DESC;

-- NOTE: Interesting analysis = same LP, different sources → different DEP?
-- If google_search users on /lp/crm have higher DEP than facebook users on same LP,
-- that tells us about traffic quality, not LP quality.
-- LP quality signal = consistent DEP regardless of source.
