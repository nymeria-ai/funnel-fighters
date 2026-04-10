import { queryGoogleAds, MCC_ID } from './client';

export interface AccountInfo {
  id: string;
  name: string;
  isManager: boolean;
}

export interface CampaignRow {
  accountId: string;
  accountName: string;
  campaignId: string;
  campaignName: string;
  status: string;
  channelType: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
  ctr: number;
}

export interface AdRow {
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adName: string;
  adType: string;
  status: string;
  finalUrls: string[];
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
}

export async function getAccounts(): Promise<AccountInfo[]> {
  const results = await queryGoogleAds(
    MCC_ID,
    `SELECT customer_client.id, customer_client.descriptive_name, customer_client.manager
     FROM customer_client
     WHERE customer_client.status = 'ENABLED'`
  );

  return results.map((r: any) => ({
    id: r.customerClient.id,
    name: r.customerClient.descriptiveName || '',
    isManager: r.customerClient.manager || false,
  }));
}

export async function getCampaigns(accountId: string, accountName: string): Promise<CampaignRow[]> {
  const results = await queryGoogleAds(
    accountId,
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions, metrics.ctr
     FROM campaign
     WHERE segments.date DURING LAST_30_DAYS
       AND campaign.status != 'REMOVED'
     ORDER BY metrics.cost_micros DESC
     LIMIT 50`,
    MCC_ID
  );

  return results.map((r: any) => ({
    accountId,
    accountName,
    campaignId: r.campaign.id,
    campaignName: r.campaign.name,
    status: r.campaign.status,
    channelType: r.campaign.advertisingChannelType || 'SEARCH',
    impressions: parseInt(r.metrics.impressions) || 0,
    clicks: parseInt(r.metrics.clicks) || 0,
    costMicros: parseInt(r.metrics.costMicros) || 0,
    conversions: r.metrics.conversions || 0,
    ctr: r.metrics.ctr || 0,
  }));
}

export async function getAdsWithUrls(accountId: string): Promise<AdRow[]> {
  const results = await queryGoogleAds(
    accountId,
    `SELECT ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.ad.final_urls, ad_group_ad.ad.type,
            ad_group_ad.status, ad_group.name, ad_group.id, campaign.name, campaign.id,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
     FROM ad_group_ad
     WHERE segments.date DURING LAST_30_DAYS
       AND ad_group_ad.status != 'REMOVED'
       AND campaign.status = 'ENABLED'
     ORDER BY metrics.cost_micros DESC
     LIMIT 200`,
    MCC_ID
  );

  return results.map((r: any) => ({
    campaignId: r.campaign.id,
    campaignName: r.campaign.name,
    adGroupId: r.adGroup.id,
    adGroupName: r.adGroup.name,
    adId: r.adGroupAd.ad.id,
    adName: r.adGroupAd.ad.name || `Ad ${r.adGroupAd.ad.id}`,
    adType: r.adGroupAd.ad.type || 'UNKNOWN',
    status: r.adGroupAd.status,
    finalUrls: r.adGroupAd.ad.finalUrls || [],
    impressions: parseInt(r.metrics.impressions) || 0,
    clicks: parseInt(r.metrics.clicks) || 0,
    costMicros: parseInt(r.metrics.costMicros) || 0,
    conversions: r.metrics.conversions || 0,
  }));
}

export function extractLandingPages(ads: AdRow[]): { url: string; adCount: number; totalClicks: number; totalSpend: number; totalConversions: number; sourceAds: string[] }[] {
  const lpMap = new Map<string, { adCount: number; totalClicks: number; totalSpend: number; totalConversions: number; sourceAds: Set<string> }>();

  for (const ad of ads) {
    for (const url of ad.finalUrls) {
      const clean = url.replace(/\/$/, ''); // normalize trailing slash
      if (!lpMap.has(clean)) {
        lpMap.set(clean, { adCount: 0, totalClicks: 0, totalSpend: 0, totalConversions: 0, sourceAds: new Set() });
      }
      const lp = lpMap.get(clean)!;
      lp.adCount++;
      lp.totalClicks += ad.clicks;
      lp.totalSpend += ad.costMicros;
      lp.totalConversions += ad.conversions;
      lp.sourceAds.add(ad.campaignName);
    }
  }

  return Array.from(lpMap.entries())
    .map(([url, data]) => ({
      url,
      adCount: data.adCount,
      totalClicks: data.totalClicks,
      totalSpend: data.totalSpend / 1_000_000,
      totalConversions: data.totalConversions,
      sourceAds: Array.from(data.sourceAds),
    }))
    .sort((a, b) => b.totalSpend - a.totalSpend);
}
