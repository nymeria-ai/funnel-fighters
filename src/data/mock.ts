import { DuckData } from '@/lib/scoring';

export const mockDucks: DuckData[] = [
  {
    type: 'audience',
    label: 'Audience',
    emoji: '🦆',
    score: 62,
    trend: [45, 48, 52, 55, 58, 60, 61, 62],
    subLabel: 'Source Quality',
  },
  {
    type: 'ads',
    label: 'Ads',
    emoji: '🦆',
    score: 47,
    trend: [30, 35, 38, 40, 42, 44, 45, 47],
    subLabel: 'Filter Effectiveness',
  },
  {
    type: 'landing_pages',
    label: 'Landing Pages',
    emoji: '🦆',
    score: 71,
    trend: [60, 62, 65, 67, 68, 70, 70, 71],
    subLabel: 'Intent Enhancement',
  },
  {
    type: 'product',
    label: 'Product',
    emoji: '🦆',
    score: 55,
    trend: [50, 51, 52, 53, 53, 54, 55, 55],
    subLabel: 'Promise Delivery',
  },
];

export interface ChannelData {
  id: string;
  name: string;
  icon: string;
  score: number | null;
  connected: boolean;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  campaigns: CampaignData[];
}

export interface CampaignData {
  id: string;
  name: string;
  score: number | null;
  status: 'active' | 'paused' | 'ended';
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpa: number;
  adGroups: AdGroupData[];
}

export interface AdGroupData {
  id: string;
  name: string;
  score: number | null;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ads: AdData[];
}

export interface AdData {
  id: string;
  name: string;
  score: number | null;
  type: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  destinationUrl: string;
}

export const mockChannels: ChannelData[] = [
  {
    id: 'google',
    name: 'Google Ads',
    icon: '🔍',
    score: 58,
    connected: true,
    spend: 125000,
    impressions: 8500000,
    clicks: 127500,
    conversions: 3825,
    ctr: 1.5,
    cpa: 32.68,
    campaigns: [
      {
        id: 'g-camp-1',
        name: 'Brand - Work Management',
        score: 72,
        status: 'active',
        spend: 45000,
        impressions: 2200000,
        clicks: 55000,
        conversions: 1650,
        ctr: 2.5,
        cpa: 27.27,
        adGroups: [
          {
            id: 'g-ag-1',
            name: 'monday.com Brand Terms',
            score: 85,
            spend: 25000,
            impressions: 1200000,
            clicks: 36000,
            conversions: 1080,
            ads: [
              { id: 'g-ad-1', name: 'Brand - RSA Main', score: 88, type: 'RSA', spend: 15000, impressions: 750000, clicks: 22500, conversions: 675, destinationUrl: 'https://monday.com/work-management' },
              { id: 'g-ad-2', name: 'Brand - RSA Alt', score: 76, type: 'RSA', spend: 10000, impressions: 450000, clicks: 13500, conversions: 405, destinationUrl: 'https://monday.com/work-management' },
            ],
          },
          {
            id: 'g-ag-2',
            name: 'Competitor Terms',
            score: 61,
            spend: 20000,
            impressions: 1000000,
            clicks: 19000,
            conversions: 570,
            ads: [
              { id: 'g-ad-3', name: 'vs Asana RSA', score: 65, type: 'RSA', spend: 12000, impressions: 600000, clicks: 11400, conversions: 342, destinationUrl: 'https://monday.com/vs/asana' },
              { id: 'g-ad-4', name: 'vs Trello RSA', score: 58, type: 'RSA', spend: 8000, impressions: 400000, clicks: 7600, conversions: 228, destinationUrl: 'https://monday.com/vs/trello' },
            ],
          },
        ],
      },
      {
        id: 'g-camp-2',
        name: 'Non-Brand - Project Management',
        score: 45,
        status: 'active',
        spend: 50000,
        impressions: 4000000,
        clicks: 48000,
        conversions: 1440,
        ctr: 1.2,
        cpa: 34.72,
        adGroups: [
          {
            id: 'g-ag-3',
            name: 'Project Management Software',
            score: 48,
            spend: 30000,
            impressions: 2500000,
            clicks: 30000,
            conversions: 900,
            ads: [
              { id: 'g-ad-5', name: 'PM Software RSA', score: 50, type: 'RSA', spend: 30000, impressions: 2500000, clicks: 30000, conversions: 900, destinationUrl: 'https://monday.com/lp/project-management' },
            ],
          },
          {
            id: 'g-ag-4',
            name: 'Gantt Chart',
            score: 38,
            spend: 20000,
            impressions: 1500000,
            clicks: 18000,
            conversions: 540,
            ads: [
              { id: 'g-ad-6', name: 'Gantt Chart RSA', score: 38, type: 'RSA', spend: 20000, impressions: 1500000, clicks: 18000, conversions: 540, destinationUrl: 'https://monday.com/lp/gantt-chart' },
            ],
          },
        ],
      },
      {
        id: 'g-camp-3',
        name: 'AI Agents - Search',
        score: 33,
        status: 'active',
        spend: 30000,
        impressions: 2300000,
        clicks: 24500,
        conversions: 735,
        ctr: 1.07,
        cpa: 40.82,
        adGroups: [
          {
            id: 'g-ag-5',
            name: 'AI Agent Builder',
            score: 33,
            spend: 30000,
            impressions: 2300000,
            clicks: 24500,
            conversions: 735,
            ads: [
              { id: 'g-ad-7', name: 'Build AI Agents RSA', score: 35, type: 'RSA', spend: 18000, impressions: 1400000, clicks: 14700, conversions: 441, destinationUrl: 'https://monday.com/lp/ai-agents' },
              { id: 'g-ad-8', name: 'AI Workflow RSA', score: 28, type: 'RSA', spend: 12000, impressions: 900000, clicks: 9800, conversions: 294, destinationUrl: 'https://monday.com/lp/ai-workflow' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'meta',
    name: 'Meta',
    icon: '📘',
    score: 41,
    connected: false,
    spend: 180000,
    impressions: 25000000,
    clicks: 187500,
    conversions: 2812,
    ctr: 0.75,
    cpa: 64.0,
    campaigns: [],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: '📺',
    score: null,
    connected: false,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    campaigns: [],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '💼',
    score: null,
    connected: false,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    campaigns: [],
  },
  {
    id: 'affiliates',
    name: 'Affiliates',
    icon: '🤝',
    score: null,
    connected: false,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    campaigns: [],
  },
];

export interface LandingPageData {
  id: string;
  url: string;
  title: string;
  googleRank: number | null;
  rankUpdatedAt: string | null;
  pageSpeedScore: number | null;
  conversionRate: number;
  visits: number;
  signups: number;
  score: number | null;
  sourceAds: string[];
}

export const mockLandingPages: LandingPageData[] = [
  { id: 'lp-1', url: 'https://monday.com/work-management', title: 'Work Management Platform', googleRank: 8, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 85, conversionRate: 12.5, visits: 55000, signups: 6875, score: 78, sourceAds: ['Brand - RSA Main', 'Brand - RSA Alt'] },
  { id: 'lp-2', url: 'https://monday.com/vs/asana', title: 'monday.com vs Asana', googleRank: 5, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 72, conversionRate: 8.2, visits: 11400, signups: 934, score: 62, sourceAds: ['vs Asana RSA'] },
  { id: 'lp-3', url: 'https://monday.com/vs/trello', title: 'monday.com vs Trello', googleRank: 6, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 70, conversionRate: 7.8, visits: 7600, signups: 593, score: 59, sourceAds: ['vs Trello RSA'] },
  { id: 'lp-4', url: 'https://monday.com/lp/project-management', title: 'Project Management Software', googleRank: 3, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 68, conversionRate: 6.5, visits: 30000, signups: 1950, score: 48, sourceAds: ['PM Software RSA'] },
  { id: 'lp-5', url: 'https://monday.com/lp/gantt-chart', title: 'Gantt Chart Software', googleRank: 4, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 65, conversionRate: 5.2, visits: 18000, signups: 936, score: 42, sourceAds: ['Gantt Chart RSA'] },
  { id: 'lp-6', url: 'https://monday.com/lp/ai-agents', title: 'AI Agent Builder', googleRank: 2, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 60, conversionRate: 4.1, visits: 14700, signups: 603, score: 35, sourceAds: ['Build AI Agents RSA'] },
  { id: 'lp-7', url: 'https://monday.com/lp/ai-workflow', title: 'AI Workflow Automation', googleRank: 2, rankUpdatedAt: '2026-04-10T10:00:00Z', pageSpeedScore: 58, conversionRate: 3.8, visits: 9800, signups: 372, score: 31, sourceAds: ['AI Workflow RSA'] },
];

export interface CohortRow {
  weekStart: string;
  spend: number;
  visits: number;
  costPerVisit: number;
  signups: number;
  signupRate: number;
  active: number;
  activeRate: number;
  paying: number;
  payingRate: number;
}

export const mockCohorts: CohortRow[] = [
  { weekStart: '2026-02-23', spend: 42000, visits: 28000, costPerVisit: 1.50, signups: 2520, signupRate: 9.0, active: 378, activeRate: 15.0, paying: 8, payingRate: 2.1 },
  { weekStart: '2026-03-02', spend: 45000, visits: 30000, costPerVisit: 1.50, signups: 2850, signupRate: 9.5, active: 428, activeRate: 15.0, paying: 11, payingRate: 2.6 },
  { weekStart: '2026-03-09', spend: 48000, visits: 31000, costPerVisit: 1.55, signups: 3100, signupRate: 10.0, active: 496, activeRate: 16.0, paying: 15, payingRate: 3.0 },
  { weekStart: '2026-03-16', spend: 50000, visits: 33000, costPerVisit: 1.52, signups: 3300, signupRate: 10.0, active: 561, activeRate: 17.0, paying: 19, payingRate: 3.4 },
  { weekStart: '2026-03-23', spend: 52000, visits: 35000, costPerVisit: 1.49, signups: 3675, signupRate: 10.5, active: 625, activeRate: 17.0, paying: 23, payingRate: 3.7 },
  { weekStart: '2026-03-30', spend: 55000, visits: 37000, costPerVisit: 1.49, signups: 4070, signupRate: 11.0, active: 733, activeRate: 18.0, paying: 29, payingRate: 4.0 },
  { weekStart: '2026-04-06', spend: 55000, visits: 38000, costPerVisit: 1.45, signups: 4180, signupRate: 11.0, active: 752, activeRate: 18.0, paying: 32, payingRate: 4.3 },
];

export interface GapItem {
  id: string;
  duck: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'done';
  actionRequired: string;
}

export const mockGaps: GapItem[] = [
  { id: 'gap-1', duck: 'ads', title: 'Meta Marketing API', description: 'Connect Meta Business Manager for Facebook/Instagram ad data', priority: 'critical', status: 'in_progress', actionRequired: 'System User token setup in progress via Agentic Push group' },
  { id: 'gap-2', duck: 'ads', title: 'YouTube Ads Access', description: 'Link Google Ads to YouTube channel for video ad metrics', priority: 'high', status: 'open', actionRequired: 'Request YouTube channel linking from marketing team' },
  { id: 'gap-3', duck: 'ads', title: 'LinkedIn Campaign Manager', description: 'API access for LinkedIn ad performance data', priority: 'high', status: 'open', actionRequired: 'Request API credentials from LinkedIn ads team' },
  { id: 'gap-4', duck: 'landing_pages', title: 'Google Analytics Full Access', description: 'Complete GA4 property access for LP conversion tracking', priority: 'critical', status: 'open', actionRequired: 'Request GA4 access for diego.malamute.1@gmail.com' },
  { id: 'gap-5', duck: 'landing_pages', title: 'Ahrefs API Key', description: 'For automated SEO scoring and domain rating', priority: 'medium', status: 'open', actionRequired: 'Set up Ahrefs API access (we have account)' },
  { id: 'gap-6', duck: 'product', title: 'Product Analytics Access', description: 'Mixpanel/Amplitude data for activation and retention metrics', priority: 'critical', status: 'open', actionRequired: 'Identify and request access to product analytics tool' },
  { id: 'gap-7', duck: 'product', title: 'Payment System Data', description: 'Conversion to paying and TROI calculation', priority: 'high', status: 'open', actionRequired: 'Connect to billing/payment system API' },
  { id: 'gap-8', duck: 'audience', title: 'BI Data Pipeline', description: 'Snowflake/Looker data for audience quality scoring', priority: 'medium', status: 'open', actionRequired: 'Work with Ido to set up read access to Snowflake' },
  { id: 'gap-9', duck: 'audience', title: 'HubSpot Integration', description: 'Lead quality and lifecycle data from HubSpot', priority: 'medium', status: 'open', actionRequired: 'Request HubSpot API key from marketing ops' },
];
