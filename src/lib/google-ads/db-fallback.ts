/**
 * Database fallback for Google Ads data.
 * Used when the Google Ads API credentials are not configured on the server.
 * Reads from the accounts, campaigns, ad_groups, ads, and ad_metrics_daily tables.
 */

import { query, isConfigured } from '@/lib/db/client';
import type { CockpitRow } from '@/types';

interface DbAccount {
  id: string;
  name: string;
  is_manager: boolean;
  is_target: boolean;
}

interface DbAd {
  [key: string]: unknown;
  id: string;
  ad_group_id: string;
  campaign_id: string;
  account_id: string;
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
  cost_micros: string;
  conversions: string;
}

export async function hasAdsInDb(): Promise<boolean> {
  if (!isConfigured()) return false;
  const result = await query<{ count: string }>('SELECT COUNT(*) as count FROM ads');
  return result ? parseInt(result[0]?.count || '0') > 0 : false;
}

export async function getCockpitRowsFromDb(targetAccountNames: string[]): Promise<CockpitRow[]> {
  if (!isConfigured()) return [];

  // Get ads joined with campaigns, ad_groups, accounts, and metrics
  const rows = await query<DbAd>(`
    SELECT 
      a.id, a.ad_group_id, a.campaign_id, a.account_id, a.ad_type, a.status,
      a.final_url, a.final_url_domain, a.headlines, a.descriptions,
      c.name as campaign_name,
      ag.name as ad_group_name,
      acc.name as account_name,
      COALESCE(m.impressions::text, '0') as impressions,
      COALESCE(m.clicks::text, '0') as clicks,
      COALESCE(m.cost_micros::text, '0') as cost_micros,
      COALESCE(m.conversions::text, '0') as conversions
    FROM ads a
    LEFT JOIN campaigns c ON a.campaign_id = c.id
    LEFT JOIN ad_groups ag ON a.ad_group_id = ag.id
    LEFT JOIN accounts acc ON a.account_id = acc.id
    LEFT JOIN ad_metrics_30d m ON a.id = m.ad_id
    WHERE acc.is_target = true
    ORDER BY COALESCE(m.cost_micros, 0) DESC
  `);

  if (!rows) return [];

  return rows.map(row => {
    let headlines: string[] = [];
    let descriptions: string[] = [];
    try { headlines = typeof row.headlines === 'string' ? JSON.parse(row.headlines) : row.headlines || []; } catch { /* */ }
    try { descriptions = typeof row.descriptions === 'string' ? JSON.parse(row.descriptions) : row.descriptions || []; } catch { /* */ }

    return {
      accountId: row.account_id || '',
      accountName: row.account_name || '',
      campaignId: row.campaign_id || '',
      campaignName: row.campaign_name || '',
      adGroupId: row.ad_group_id || '',
      adGroupName: row.ad_group_name || '',
      adId: row.id || '',
      adType: row.ad_type || 'RESPONSIVE_SEARCH_AD',
      finalUrl: row.final_url || '',
      finalUrlDomain: row.final_url_domain || '',
      headlines,
      descriptions,
      adSellingPoint: '',
      audience: [],
      lpSellingPoint: '',
      lpError: false,
      relevanceScore: 0,
      relevanceReason: '',
      impressions: parseInt(row.impressions) || 0,
      clicks: parseInt(row.clicks) || 0,
      spend: (parseInt(row.cost_micros) || 0) / 1_000_000,
      conversions: parseFloat(row.conversions) || 0,
    };
  });
}
