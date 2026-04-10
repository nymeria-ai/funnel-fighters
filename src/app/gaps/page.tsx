'use client';
import { mockGaps, GapItem } from '@/data/mock';

const priorityColors: Record<string, string> = {
  critical: 'text-score-red bg-score-red/10 border-score-red/30',
  high: 'text-score-orange bg-score-orange/10 border-score-orange/30',
  medium: 'text-score-gold bg-score-gold/10 border-score-gold/30',
  low: 'text-text-muted bg-bg-hover border-bg-border',
};

const statusIcons: Record<string, string> = {
  open: '⭕',
  in_progress: '🔄',
  done: '✅',
};

const duckLabels: Record<string, string> = {
  audience: '🦆 Audience',
  ads: '🦆 Ads',
  landing_pages: '🦆 Landing Pages',
  product: '🦆 Product',
};

export default function GapsPage() {
  const grouped = mockGaps.reduce<Record<string, GapItem[]>>((acc, gap) => {
    if (!acc[gap.duck]) acc[gap.duck] = [];
    acc[gap.duck].push(gap);
    return acc;
  }, {});

  const totalOpen = mockGaps.filter(g => g.status !== 'done').length;
  const critical = mockGaps.filter(g => g.priority === 'critical' && g.status !== 'done').length;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">⚡ Gaps & Next Actions</h1>
          <p className="text-xs text-text-muted mt-1">What&apos;s missing? What do we need to unlock each duck?</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-bg-card border border-bg-border rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold text-score-orange">{totalOpen}</div>
            <div className="text-xs text-text-muted">Open Items</div>
          </div>
          <div className="bg-bg-card border border-score-red/30 rounded-lg px-4 py-2 text-center">
            <div className="text-xl font-bold text-score-red">{critical}</div>
            <div className="text-xs text-text-muted">Critical</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([duck, gaps]) => (
          <div key={duck} className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-bg-border bg-bg-secondary">
              <span className="text-sm font-semibold text-text-primary">{duckLabels[duck] || duck}</span>
              <span className="text-xs text-text-muted ml-2">({gaps.filter(g => g.status !== 'done').length} open)</span>
            </div>
            <div className="divide-y divide-bg-border/50">
              {gaps.map(gap => (
                <div key={gap.id} className="px-5 py-4 hover:bg-bg-hover transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{statusIcons[gap.status]}</span>
                        <span className="text-sm font-medium text-text-primary">{gap.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${priorityColors[gap.priority]}`}>
                          {gap.priority}
                        </span>
                      </div>
                      <p className="text-xs text-text-secondary ml-6">{gap.description}</p>
                    </div>
                  </div>
                  <div className="mt-2 ml-6 bg-bg-hover rounded-lg px-3 py-2">
                    <span className="text-xs text-accent-blue font-medium">→ </span>
                    <span className="text-xs text-text-secondary">{gap.actionRequired}</span>
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
