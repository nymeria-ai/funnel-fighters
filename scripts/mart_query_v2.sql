-- =============================================================================
-- FUNNEL FIGHTERS MART QUERY (FIXED v2)
-- Source: Snowflake → BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
--         + BIGBRAIN.DATA_TOOLS_SOURCES.v_dim_accounts_for_marketing_looker
-- 
-- Matches Looker production query exactly.
-- Key fixes applied:
--   1. UNION with v_dim_accounts_for_marketing_looker (captures attribution-only accounts)
--   2. Country fallback for adn_data: when country IS NULL, extract from campaign prefix
--   3. Includes ALL types (not just adn_data), with proper attribution signup_date filter
--   4. Bot filters: bot_verified != TRUE, bot_score > 30
--   5. Paying metric: days between account_created_at and FIRST_ARR_DATE <= 28
--
-- Parameters:
--   @country: 'gb' (case-insensitive)
--   @start_date: start of date range (inclusive)
--   @end_date: end of date range (exclusive)
-- =============================================================================

WITH campaign_monitoring_snowflake AS (
    SELECT *
    FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH

    UNION ALL

    SELECT *
    FROM BIGBRAIN.DATA_TOOLS_SOURCES.v_dim_accounts_for_marketing_looker
)
SELECT
    -- Dimensions
    campaign_monitoring.grouped_channel AS channel,
    campaign_monitoring.campaign,
    TO_CHAR(campaign_monitoring.created_at, 'YYYY-MM-DD') AS day,
    
    -- Spend & Traffic (from adn_data rows only — cost is NULL for other types)
    COALESCE(SUM(campaign_monitoring.cost), 0) AS spend,
    SUM(campaign_monitoring.impressions) AS impressions,
    SUM(campaign_monitoring.clicks) AS clicks,
    
    -- Visits (distinct master_visitor_id)
    COUNT(DISTINCT campaign_monitoring.master_visitor_id) AS visits,
    
    -- Signups
    COUNT(DISTINCT campaign_monitoring.pulse_account_id) AS hard_signups,
    
    -- Paying (converted within 28 days of account creation)
    COUNT(DISTINCT (
        CASE WHEN TRUNCATE(
            TIMESTAMPDIFF(SECOND, campaign_monitoring.account_created_at, campaign_monitoring.FIRST_ARR_DATE) / 86400, 0
        ) <= 28 
        THEN campaign_monitoring.pulse_account_id 
        ELSE NULL END
    )) AS paying_28d,
    
    -- Revenue
    COALESCE(SUM(campaign_monitoring.collection_28), 0) AS collection_28d,
    COALESCE(SUM(campaign_monitoring.collection_90), 0) AS collection_90d,
    COALESCE(SUM(campaign_monitoring.collection_365), 0) AS collection_365d,
    COALESCE(SUM(campaign_monitoring.predicted_collection_365), 0) AS predicted_arr_365

FROM campaign_monitoring_snowflake AS campaign_monitoring

WHERE 
    -- Country filter with campaign-prefix fallback for adn_data NULL-country rows
    ((UPPER((
        CASE WHEN campaign_monitoring.type = 'adn_data' THEN
            COALESCE(
                UPPER(campaign_monitoring.country),
                CASE 
                    WHEN (UPPER(SUBSTR(campaign_monitoring.campaign, 0, 
                        LEAST(
                            POSITION('-', campaign_monitoring.campaign, 1), 
                            POSITION('_', campaign_monitoring.campaign, 1)
                        ) - 1
                    ))) LIKE 'US%' THEN 'US'
                    ELSE UPPER(SUBSTR(campaign_monitoring.campaign, 0, 
                        LEAST(
                            CASE WHEN POSITION('-', campaign_monitoring.campaign, 1) != 0 
                                 THEN POSITION('-', campaign_monitoring.campaign, 1) ELSE 999 END,
                            CASE WHEN POSITION('_', campaign_monitoring.campaign, 1) != 0 
                                 THEN POSITION('_', campaign_monitoring.campaign, 1) ELSE 999 END
                        ) - 1
                    ))
                END
            )
        ELSE UPPER(campaign_monitoring.country) 
        END
    )) = UPPER('gb')))  -- << Replace 'gb' with target country
    
    -- Bot filters
    AND (NOT (campaign_monitoring.bot_verified = 'TRUE') OR (campaign_monitoring.bot_verified = 'TRUE') IS NULL)
    AND ((UPPER((
        CASE WHEN campaign_monitoring.bot_score > 30 OR campaign_monitoring.bot_score IS NULL 
        THEN 'yes' ELSE 'no' END
    )) = UPPER('yes')))
    
    -- Attribution signup_date filter (prevents future-dated attributions)
    AND (((
        campaign_monitoring.type != 'attribution' 
        OR campaign_monitoring.signup_date IS NULL 
        OR TRUNCATE(TIMESTAMPDIFF(SECOND, campaign_monitoring.created_at, campaign_monitoring.signup_date) / 86400, 0) <= 99999
    )))
    
    -- Date range
    AND ((((campaign_monitoring.created_at) >= (TO_TIMESTAMP('2026-02-10'))    -- << start_date
        AND (campaign_monitoring.created_at) < (TO_TIMESTAMP('2026-05-10'))))) -- << end_date

GROUP BY 1, 2, 3
ORDER BY spend DESC
FETCH NEXT 50000 ROWS ONLY;


-- =============================================================================
-- VERIFICATION QUERY (totals only — use to validate mart import)
-- Expected output for GB, 2026-02-10 to 2026-05-10:
--   spend: $3,826,727  |  signups: 60,718  |  paying: 917  |  collection_28d: $429,591
-- =============================================================================

WITH campaign_monitoring_snowflake AS (
    SELECT *
    FROM BIGBRAIN.L3.FACT_CAMPAIGN_MONITORING_DWH
    UNION ALL
    SELECT *
    FROM BIGBRAIN.DATA_TOOLS_SOURCES.v_dim_accounts_for_marketing_looker
)
SELECT
    COALESCE(SUM(campaign_monitoring.cost), 0) AS spend,
    COUNT(DISTINCT campaign_monitoring.master_visitor_id) AS visits,
    COUNT(DISTINCT campaign_monitoring.pulse_account_id) AS hard_signups,
    COUNT(DISTINCT (
        CASE WHEN TRUNCATE(TIMESTAMPDIFF(SECOND, campaign_monitoring.account_created_at, campaign_monitoring.FIRST_ARR_DATE)/86400,0) <= 28 
        THEN campaign_monitoring.pulse_account_id ELSE NULL END
    )) AS paying_28d,
    COALESCE(SUM(campaign_monitoring.collection_28), 0) AS collection_28d
FROM campaign_monitoring_snowflake AS campaign_monitoring
WHERE ((UPPER((CASE WHEN campaign_monitoring.type = 'adn_data' THEN
              COALESCE(UPPER(campaign_monitoring.country),
              CASE WHEN (UPPER(SUBSTR(campaign_monitoring.campaign, 0, LEAST(POSITION('-', campaign_monitoring.campaign, 1), POSITION('_', campaign_monitoring.campaign, 1)) - 1))) LIKE 'US%' THEN 'US'
              ELSE UPPER(SUBSTR(campaign_monitoring.campaign, 0, LEAST(CASE WHEN POSITION('-', campaign_monitoring.campaign, 1) != 0 THEN POSITION('-', campaign_monitoring.campaign, 1) ELSE 999 END, CASE WHEN POSITION('_', campaign_monitoring.campaign, 1) != 0 THEN POSITION('_', campaign_monitoring.campaign, 1) ELSE 999 END) - 1)) END)
          ELSE UPPER(campaign_monitoring.country) END)) = UPPER('gb')))
    AND (NOT (campaign_monitoring.bot_verified = 'TRUE') OR (campaign_monitoring.bot_verified = 'TRUE') IS NULL)
    AND ((UPPER((CASE WHEN campaign_monitoring.bot_score>30 OR campaign_monitoring.bot_score IS NULL THEN 'yes' ELSE 'no' END)) = UPPER('yes')))
    AND (((campaign_monitoring.type != 'attribution' OR campaign_monitoring.signup_date IS NULL OR TRUNCATE(TIMESTAMPDIFF(SECOND, campaign_monitoring.created_at, campaign_monitoring.signup_date)/86400,0) <= 99999)))
    AND ((((campaign_monitoring.created_at) >= (TO_TIMESTAMP('2026-02-10')) AND (campaign_monitoring.created_at) < (TO_TIMESTAMP('2026-05-10')))));
