'use client';
import DuckIcon from '@/components/ui/DuckIcon';

interface GapItem {
  duck: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium';
  status: 'done' | 'in_progress' | 'open';
  action: string;
}

const gaps: GapItem[] = [
  // Ads
  { duck: 'ads', title: 'Google Ads API', description: 'Connected to MCC with all child accounts', priority: 'critical', status: 'done', action: 'Live — pulling campaigns, ad groups, ads, and destination URLs' },
  { duck: 'ads', title: 'Meta Marketing API', description: 'Facebook/Instagram ad data', priority: 'critical', status: 'in_progress', action: 'System User token setup via Agentic Push group with Shirley' },
  { duck: 'ads', title: 'YouTube Ads', description: 'Video ad metrics from Google Ads YouTube channel', priority: 'high', status: 'open', action: 'Request YouTube channel linking from marketing team' },
  { duck: 'ads', title: 'LinkedIn Campaign Manager', description: 'LinkedIn ad performance data', priority: 'high', status: 'open', action: 'Request API credentials from LinkedIn ads team' },
  // LP
  { duck: 'landing_pages', title: 'LP URLs from Google Ads', description: 'Destination URLs extracted from all active ads', priority: 'critical', status: 'done', action: 'Live — 16+ unique LPs identified from Main account' },
  { duck: 'landing_pages', title: 'Ahrefs API', description: 'SEO scoring, domain rating, keyword rankings', priority: 'high', status: 'open', action: 'Set up Ahrefs API access' },
  { duck: 'landing_pages', title: 'PageSpeed Insights', description: 'Page load speed scoring', priority: 'medium', status: 'open', action: 'Free API — can integrate immediately' },
  { duck: 'landing_pages', title: 'Google Analytics 4', description: 'On-page behavior, bounce rate, engagement', priority: 'critical', status: 'open', action: 'Request GA4 access for diego.malamute.1@gmail.com' },
  // Audience
  { duck: 'audience', title: 'Snowflake/Looker', description: 'BI data for audience quality segmentation', priority: 'critical', status: 'open', action: 'Work with Ido to set up read access to Snowflake' },
  { duck: 'audience', title: 'HubSpot Integration', description: 'Lead quality and lifecycle data', priority: 'medium', status: 'open', action: 'Request HubSpot API key from marketing ops' },
  // Product
  { duck: 'product', title: 'Product Analytics', description: 'Activation, retention, and engagement metrics', priority: 'critical', status: 'open', action: 'Identify and request access to Mixpanel/Amplitude' },
  { duck: 'product', title: 'Billing/Payment Data', description: 'Conversion to paying, ARPU, TROI', priority: 'critical', status: 'open', action: 'Connect to billing system API' },
];

const priorityColors: Record<string, string> = {
  critical: 'text-score-red bg-score-red/10 border-score-red/30',
  high: 'text-score-orange bg-score-orange/10 border-score-orange/30',
  medium: 'text-score-gold bg-score-gold/10 border-score-gold/30',
};

const statusIcons: Record<string, string> = { open: '⭕', in_progress: '🔄', done: '✅' };

const duckConfig: Record<string, { label: string; color: string }> = {
  audience: { label: 'Audience', color: '#6B7280' },
  ads: { label: 'Ads', color: '#22C55E' },
  landing_pages: { label: 'Landing Pages', color: '#F97316' },
  product: { label: 'Product', color: '#6B7280' },
};

export default function GapsPage() {
  const grouped = gaps.reduce<Record<string, GapItem[]>>((acc, gap) => {
    if (!acc[gap.duck]) acc[gap.duck] = [];
    acc[gap.duck].push(gap);
    return acc;
  }, {});

  const totalOpen = gaps.filter(g => g.status !== 'done').length;
  const done = gaps.filter(g => g.status === 'done').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">⚡ Gaps & Next Actions</h1>
          <p className="text-xs text-text-muted mt-1">What&apos;s connected, what&apos;s missing, what to do next.</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-bg-card border border-score-green/30 rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold text-score-green">{done}</div>
            <div className="text-xs text-text-muted">Done</div>
          </div>
          <div className="bg-bg-card border border-bg-border rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold text-score-orange">{totalOpen}</div>
            <div className="text-xs text-text-muted">Remaining</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([duck, items]) => (
          <div key={duck} className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-bg-border bg-bg-secondary flex items-center gap-2">
              <DuckIcon color={duckConfig[duck]?.color || '#6B7280'} size={24} />
              <span className="text-sm font-semibold text-text-primary">{duckConfig[duck]?.label || duck}</span>
              <span className="text-xs text-text-muted">({items.filter(g => g.status === 'done').length}/{items.length} done)</span>
            </div>
            <div className="divide-y divide-bg-border/50">
              {items.map((gap, i) => (
                <div key={i} className="px-5 py-4 hover:bg-bg-hover transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{statusIcons[gap.status]}</span>
                        <span className={`text-sm font-medium ${gap.status === 'done' ? 'text-score-green' : 'text-text-primary'}`}>{gap.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityColors[gap.priority]}`}>
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary ml-6">{gap.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 ml-6 bg-bg-hover rounded-lg px-3 py-2">
                    <span className="text-xs text-accent-blue font-medium">→ </span>
                    <span className="text-xs text-text-secondary">{gap.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
