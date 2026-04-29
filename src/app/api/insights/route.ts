import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export type InsightPriority = 'P0' | 'P1' | 'P2' | 'P3';
export type InsightStatus = 'active' | 'dismissed' | 'applied';

export interface Insight extends Record<string, unknown> {
  id: string;
  priority: InsightPriority;
  headline: string;
  description: string;
  impact: string;
  details: string;
  duck: string;
  status: InsightStatus;
}

// In-memory store for status updates (resets on deploy — acceptable for mock data)
const statusOverrides = new Map<string, InsightStatus>();

const MOCK_INSIGHTS: Insight[] = [
  {
    id: 'ins-001',
    priority: 'P0',
    headline: 'YouTube Demand Gen CPL 3× higher than Search with 40% fewer conversions',
    description: 'YouTube/Demand Gen is spending $82K/month at $340 CPL vs Search at $110 CPL.',
    impact: 'Reallocating 30% of YouTube budget to Search could yield ~240 more conversions/month at the same spend.',
    details: 'Over the last 30 days, adwordsyoutube channel recorded 241 clicks, $82,340 spend, and 13 signups (CVR 5.4%). Search in the same window: 1,840 clicks, $202,000 spend, 412 signups (CVR 22.4%). YouTube CPC is 4× higher and signup rate is 4× lower. The Demand Gen audiences show high impression-to-click drop-off (0.08% CTR vs Search 3.2%). Creative fatigue is likely — top creative has been running 60+ days without refresh.',
    duck: 'ads',
    status: 'active',
  },
  {
    id: 'ins-002',
    priority: 'P0',
    headline: 'monday.com CRM landing page get-started rate collapsed — 8.2% vs 19% sitewide',
    description: 'The CRM product LP is converting at less than half the sitewide average across all devices.',
    impact: 'Fixing to sitewide average would add ~180 get-started events/month from current traffic.',
    details: 'LP /lp/crm/main shows 8.2% get-started rate (visits→get_started) over last 30 days, down from 14.1% 60 days ago. Mobile is worse at 5.9%. The page was last updated 45 days ago. Competitor GSC data shows monday CRM ranking position dropped from 3.2 to 6.1 for "crm software" in the same window. The LP headline still references "Work OS" rather than "CRM". Ad-to-LP message mismatch score is high — ads lead with "CRM" but LP leads with "project management".',
    duck: 'landing_pages',
    status: 'active',
  },
  {
    id: 'ins-003',
    priority: 'P1',
    headline: 'Israel traffic 68% of spend but only 31% of payers — audience-to-product mismatch',
    description: 'IL campaigns dominate budget but IL users convert to paying at less than half the rate of US/EU.',
    impact: 'Shifting 20% of IL budget to US could improve overall payer rate by ~12% with no spend increase.',
    details: 'Segmenting by country: IL (68% spend, 31% payers_28d), US (22% spend, 51% payers_28d), EU (10% spend, 18% payers_28d). IL hard signup rate is competitive (18%) but payers_28d/hard_signup ratio is 0.31 vs 0.63 for US. ACV_28d per IL payer is also 40% lower. This suggests IL traffic skews toward SMB/free-tier users. The IL campaigns are targeting broad "productivity" keywords rather than vertical-specific. monday CRM and monday Sales CRM campaigns show better IL→payer ratios — worth scaling these specifically.',
    duck: 'audience',
    status: 'active',
  },
  {
    id: 'ins-004',
    priority: 'P1',
    headline: 'Performance Max cannibalizing Search — PMax taking credit for branded queries',
    description: 'PMax campaigns show high conversion volume but overlap analysis suggests ~35% attributed conversions are branded searches.',
    impact: 'Excluding brand terms from PMax could clarify true incremental PMax value and reduce wasted CPL measurement.',
    details: 'PMax accounts for 28% of total conversions but 41% of total spend. Search Impression Share for brand terms dropped 12pp since PMax launched. Query-level data (via Search Terms report) shows "monday.com" and "monday crm" appear frequently in PMax attribution. True incremental test: pausing PMax for 2 weeks in a small geo showed -8% total signups (not -28%), suggesting 20%+ of PMax conversions are cannibalizing Search. Recommendation: add brand exclusion lists to PMax asset groups.',
    duck: 'ads',
    status: 'active',
  },
  {
    id: 'ins-005',
    priority: 'P2',
    headline: '2nd-day engagement rate trending down — 34% this week vs 41% baseline',
    description: 'Users who signed up via paid ads are engaging less on day 2, indicating an onboarding or product fit gap.',
    impact: 'Closing half the gap to baseline would translate to ~60 more engaged users/week compounding into payer pipeline.',
    details: 'engaged_2nd_day / hard_signups ratio has dropped from 41% (90-day baseline) to 34% over the last 14 days. The drop is concentrated in campaigns targeting "project management" keywords — these users may expect a simpler tool than monday.com delivers. By contrast, CRM-targeted campaigns maintain 44% 2nd-day engagement. Hypothesis: "project management" audience is converting on a generic value prop and not activating on the monday.com core use cases. Recommended fix: update onboarding flow for this segment with PM-specific templates.',
    duck: 'product',
    status: 'active',
  },
  {
    id: 'ins-006',
    priority: 'P3',
    headline: 'Ahrefs DR score for 3 high-traffic LPs has not been refreshed in 14+ days',
    description: 'Rank data is stale for /lp/project-management, /lp/crm/main, and /lp/monday-sales-crm.',
    impact: 'Stale rank data may mask ranking drops. Refreshing would give accurate LP quality scores.',
    details: 'rank_ttl_days setting is 7, but these 3 LPs have rank_fetched_at timestamps older than 14 days. This is likely due to Ahrefs API rate limit hits during the last pipeline run. The /lp/project-management page is our highest-traffic LP (8,200 visits/30d) and accurate DR/GSC data is critical for scoring. Action: trigger a manual rank refresh for these 3 URLs via the page rank API, and verify the Ahrefs API key quota.',
    duck: 'landing_pages',
    status: 'active',
  },
];

// GET /api/insights — return 6 mock marketing insights sorted by priority
export async function GET() {
  const priorityOrder: Record<InsightPriority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };

  const insights = MOCK_INSIGHTS.map((ins) => ({
    ...ins,
    status: statusOverrides.get(ins.id) ?? ins.status,
  })).sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return NextResponse.json({ insights });
}

// PUT /api/insights — update insight status
// Body: { id: string, status: 'dismissed' | 'applied' | 'active' }
export async function PUT(req: NextRequest) {
  const body = await req.json() as { id?: string; status?: string };
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: 'Body must include id and status' }, { status: 400 });
  }

  if (!['active', 'dismissed', 'applied'].includes(status)) {
    return NextResponse.json({ error: 'status must be active, dismissed, or applied' }, { status: 400 });
  }

  const exists = MOCK_INSIGHTS.some((ins) => ins.id === id);
  if (!exists) {
    return NextResponse.json({ error: 'Insight not found' }, { status: 404 });
  }

  statusOverrides.set(id, status as InsightStatus);
  return NextResponse.json({ id, status });
}
