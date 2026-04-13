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
  headlines: string[];
  descriptions: string[];
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
            ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.responsive_search_ad.descriptions,
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

  return results.map((r: any) => {
    const rsa = r.adGroupAd?.ad?.responsiveSearchAd;
    return {
      campaignId: r.campaign.id,
      campaignName: r.campaign.name,
      adGroupId: r.adGroup.id,
      adGroupName: r.adGroup.name,
      adId: r.adGroupAd.ad.id,
      adName: r.adGroupAd.ad.name || `Ad ${r.adGroupAd.ad.id}`,
      adType: r.adGroupAd.ad.type || 'UNKNOWN',
      status: r.adGroupAd.status,
      finalUrls: r.adGroupAd.ad.finalUrls || [],
      headlines: rsa?.headlines?.map((h: any) => h.text).filter(Boolean) || [],
      descriptions: rsa?.descriptions?.map((d: any) => d.text).filter(Boolean) || [],
      impressions: parseInt(r.metrics.impressions) || 0,
      clicks: parseInt(r.metrics.clicks) || 0,
      costMicros: parseInt(r.metrics.costMicros) || 0,
      conversions: r.metrics.conversions || 0,
    };
  });
}

export interface KeywordRow {
  adGroupId: string;
  adGroupName: string;
  criterionId: string;
  keyword: string;
  matchType: string;
  status: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
}

export interface AdCopyRow {
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adType: string;
  headlines: string[];
  descriptions: string[];
  finalUrls: string[];
  status: string;
}

export interface AudienceRow {
  campaignId: string;
  campaignName: string;
  criterionId: string;
  criterionType: string;
  criterionName: string;
  bidModifier: number;
}

export interface SearchTermRow {
  searchTerm: string;
  adGroupId: string;
  adGroupName: string;
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
}

export async function getKeywords(accountId: string, adGroupId?: string): Promise<KeywordRow[]> {
  const adGroupFilter = adGroupId ? `AND ad_group.id = ${adGroupId}` : '';
  const results = await queryGoogleAds(
    accountId,
    `SELECT ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
            ad_group_criterion.keyword.match_type, ad_group_criterion.status,
            ad_group.id, ad_group.name,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
     FROM ad_group_criterion
     WHERE segments.date DURING LAST_30_DAYS
       AND ad_group_criterion.type = 'KEYWORD'
       AND ad_group_criterion.status != 'REMOVED'
       ${adGroupFilter}
     ORDER BY metrics.cost_micros DESC
     LIMIT 100`,
    MCC_ID
  );

  return results.map((r: any) => ({
    adGroupId: r.adGroup.id,
    adGroupName: r.adGroup.name,
    criterionId: r.adGroupCriterion.criterionId,
    keyword: r.adGroupCriterion.keyword?.text || '',
    matchType: r.adGroupCriterion.keyword?.matchType || 'UNKNOWN',
    status: r.adGroupCriterion.status,
    impressions: parseInt(r.metrics.impressions) || 0,
    clicks: parseInt(r.metrics.clicks) || 0,
    costMicros: parseInt(r.metrics.costMicros) || 0,
    conversions: r.metrics.conversions || 0,
  }));
}

export async function getAdCopy(accountId: string, adGroupId?: string): Promise<AdCopyRow[]> {
  const adGroupFilter = adGroupId ? `AND ad_group.id = ${adGroupId}` : '';
  const results = await queryGoogleAds(
    accountId,
    `SELECT ad_group_ad.ad.id, ad_group_ad.ad.type, ad_group_ad.ad.final_urls,
            ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.responsive_search_ad.descriptions,
            ad_group_ad.status, ad_group.id, ad_group.name
     FROM ad_group_ad
     WHERE ad_group_ad.status != 'REMOVED'
       AND campaign.status = 'ENABLED'
       ${adGroupFilter}
     LIMIT 100`,
    MCC_ID
  );

  return results.map((r: any) => {
    const ad = r.adGroupAd.ad;
    const rsa = ad.responsiveSearchAd;
    return {
      adGroupId: r.adGroup.id,
      adGroupName: r.adGroup.name,
      adId: ad.id,
      adType: ad.type || 'UNKNOWN',
      headlines: rsa?.headlines?.map((h: any) => h.text) || [],
      descriptions: rsa?.descriptions?.map((d: any) => d.text) || [],
      finalUrls: ad.finalUrls || [],
      status: r.adGroupAd.status,
    };
  });
}

export async function getAudienceTargeting(accountId: string, campaignId?: string): Promise<AudienceRow[]> {
  const campaignFilter = campaignId ? `AND campaign.id = ${campaignId}` : '';
  const results = await queryGoogleAds(
    accountId,
    `SELECT campaign_criterion.criterion_id, campaign_criterion.type,
            campaign_criterion.bid_modifier,
            campaign.id, campaign.name
     FROM campaign_criterion
     WHERE campaign_criterion.type IN ('LOCATION', 'LANGUAGE', 'DEVICE', 'AGE_RANGE', 'GENDER', 'USER_LIST', 'USER_INTEREST')
       AND campaign.status = 'ENABLED'
       ${campaignFilter}
     LIMIT 100`,
    MCC_ID
  );

  return results.map((r: any) => {
    const cc = r.campaignCriterion;
    let name = `Criterion ${cc.criterionId}`;
    // Extract human-readable name based on type
    if (cc.location) name = cc.location.geoTargetConstant || name;
    if (cc.language) name = cc.language.languageConstant || name;
    if (cc.device) name = cc.device.type || name;
    if (cc.ageRange) name = cc.ageRange.type || name;
    if (cc.gender) name = cc.gender.type || name;
    if (cc.userList) name = cc.userList.userList || name;
    if (cc.userInterest) name = cc.userInterest.userInterestCategory || name;

    return {
      campaignId: r.campaign.id,
      campaignName: r.campaign.name,
      criterionId: cc.criterionId,
      criterionType: cc.type || 'UNKNOWN',
      criterionName: name,
      bidModifier: cc.bidModifier || 1.0,
    };
  });
}

export async function getSearchTerms(accountId: string, adGroupId?: string): Promise<SearchTermRow[]> {
  const adGroupFilter = adGroupId ? `AND ad_group.id = ${adGroupId}` : '';
  const results = await queryGoogleAds(
    accountId,
    `SELECT search_term_view.search_term, ad_group.id, ad_group.name,
            campaign.id, campaign.name,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions
     FROM search_term_view
     WHERE segments.date DURING LAST_30_DAYS
       ${adGroupFilter}
     ORDER BY metrics.impressions DESC
     LIMIT 100`,
    MCC_ID
  );

  return results.map((r: any) => ({
    searchTerm: r.searchTermView.searchTerm || '',
    adGroupId: r.adGroup.id,
    adGroupName: r.adGroup.name,
    campaignId: r.campaign.id,
    campaignName: r.campaign.name,
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
