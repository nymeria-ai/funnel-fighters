/**
 * Database source for Google Ads cockpit data.
 * This is the ONLY data path for the cockpit — no live API fallback.
 * Reads from ads, campaigns, ad_groups, accounts, ad_metrics_daily,
 * ad_extension, and landing_page_extension.
 */

import { query, isConfigured } from '@/lib/db/client';
import type { CockpitRow } from '@/types';

interface DbAd {
  [key: string]: unknown;
  id: string;
  ad_group_id: string;
  campaign_id: string;
  account_id: string;
  channel: string;
  ad_type: string;
  status: string;
  final_url: string;
  final_url_domain: string;
  headlines: string;
  descriptions: string;
  campaign_name: string;
  ad_group_name: string;
  account_name: string;
  impressions: string;
  clicks: string;
  cost: string;
  conversions: string;
  // ad_extension fields
  selling_point: string | null;
  channel_ad_score: string | null;
  internal_score: string | null;
  lp_relevance_score: string | null;
  relevance_reason: string | null;
  // landing_page_extension fields
  lp_selling_point: string | null;
}

export async function hasAdsInDb(): Promise<boolean> {
  if (!isConfigured()) return false;
  const result = await query<{ count: string }>('SELECT COUNT(*) as count FROM ads');
  return result ? parseInt(result[0]?.count || '0') > 0 : false;
}

export async function getCockpitRowsFromDb(): Promise<CockpitRow[]> {
  if (!isConfigured()) return [];

  const rows = await query<DbAd>(`
    SELECT
      a.id, a.ad_group_id, a.campaign_id, a.account_id,
      a.channel, a.ad_type, a.status,
      a.final_url, a.final_url_domain, a.headlines, a.descriptions,
      c.name  AS campaign_name,
      ag.name AS ad_group_name,
      acc.name AS account_name,
      COALESCE(m.impressions::text, '0') AS impressions,
      COALESCE(m.clicks::text, '0')      AS clicks,
      COALESCE(m.cost::text, '0')        AS cost,
      COALESCE(m.conversions::text, '0') AS conversions,
      ae.selling_point,
      ae.channel_ad_score::text          AS channel_ad_score,
      ae.internal_score::text            AS internal_score,
      ae.lp_relevance_score::text        AS lp_relevance_score,
      ae.relevance_reason,
      lpe.selling_point                  AS lp_selling_point
    FROM ads a
    LEFT JOIN campaigns c       ON a.campaign_id  = c.id
    LEFT JOIN ad_groups ag      ON a.ad_group_id  = ag.id
    LEFT JOIN accounts acc      ON a.account_id   = acc.id
    LEFT JOIN ad_metrics_30d m  ON a.id           = m.ad_id
    LEFT JOIN ad_extension ae   ON a.id           = ae.ad_id
    LEFT JOIN landing_page_extension lpe ON a.final_url = lpe.url
    WHERE acc.is_target = true
    ORDER BY COALESCE(m.cost, 0) DESC
  `);

  if (!rows) return [];

  return rows.map(row => {
    let headlines: string[] = [];
    let descriptions: string[] = [];
    try { headlines = typeof row.headlines === 'string' ? JSON.parse(row.headlines) : row.headlines || []; } catch { /* */ }
    try { descriptions = typeof row.descriptions === 'string' ? JSON.parse(row.descriptions) : row.descriptions || []; } catch { /* */ }

    const sellingPoint = row.selling_point ?? '';

    return {
      accountId: row.account_id || '',
      accountName: row.account_name || '',
      campaignId: row.campaign_id || '',
      campaignName: row.campaign_name || '',
      adGroupId: row.ad_group_id || '',
      adGroupName: row.ad_group_name || '',
      adId: row.id || '',
      adType: row.ad_type || 'RESPONSIVE_SEARCH_AD',
      channel: row.channel || 'google',
      finalUrl: row.final_url || '',
      finalUrlDomain: row.final_url_domain || '',
      headlines,
      descriptions,
      adSellingPoint: sellingPoint,
      sellingPoint,
      audience: [],
      lpSellingPoint: row.lp_selling_point ?? '',
      lpError: false,
      channelAdScore: row.channel_ad_score !== null ? parseInt(row.channel_ad_score!) : null,
      internalScore: row.internal_score !== null ? parseInt(row.internal_score!) : null,
      lpRelevanceScore: row.lp_relevance_score !== null ? parseInt(row.lp_relevance_score!) : null,
      relevanceScore: row.lp_relevance_score !== null ? parseInt(row.lp_relevance_score!) : 0,
      relevanceReason: row.relevance_reason ?? '',
      impressions: parseInt(row.impressions) || 0,
      clicks: parseInt(row.clicks) || 0,
      spend: parseFloat(row.cost) || 0,
      conversions: parseFloat(row.conversions) || 0,
    };
  });
}
