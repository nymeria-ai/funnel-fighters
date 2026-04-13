/**
 * Shared types used across client and server.
 */

export interface AudienceInfo {
  campaignId: string;
  campaignName: string;
  criterionId: string;
  criterionType: string;
  criterionName: string;
  bidModifier: number;
}

export interface CockpitRow {
  accountId: string;
  accountName: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adType: string;
  finalUrl: string;
  finalUrlDomain: string;
  // Ad info
  headlines: string[];
  descriptions: string[];
  adSellingPoint: string;
  // Audience
  audience: AudienceInfo[];
  // Landing page
  lpSellingPoint: string;
  lpError: boolean;
  // Relevance
  relevanceScore: number;
  relevanceReason: string;
  // Metrics
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface Recommendation {
  id: string;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  type: 'Ad Copy' | 'Landing Page' | 'Budget' | 'Audience' | 'SEO' | 'Alignment';
  description: string;
  reasoning: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'dismissed' | 'doing';
  actionType: 'auto' | 'manual';
  actionDetails?: string;
  relatedAdId?: string;
  relatedUrl?: string;
}

export interface PageRankResult {
  url: string;
  gscPosition: number | null;
  gscImpressions: number | null;
  gscScore: number | null;
  ahrefsUR: number | null;
  ahrefsScore: number | null;
  compositeScore: number | null;
}
