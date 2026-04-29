'use client';
import { useState, useEffect } from 'react';
import type { Insight, InsightPriority } from '@/app/api/insights/route';

const PRIORITY_CONFIG: Record<InsightPriority, { color: string; bg: string; border: string; label: string }> = {
  P0: { color: '#EF4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)', label: 'P0 — Critical' },
  P1: { color: '#F97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.3)', label: 'P1 — High' },
  P2: { color: '#EAB308', bg: 'rgba(234,179,8,0.08)', border: 'rgba(234,179,8,0.3)', label: 'P2 — Medium' },
  P3: { color: '#6B7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.3)', label: 'P3 — Low' },
};

const DUCK_LABELS: Record<string, string> = {
  ads: '🎯 Ads',
  audience: '🌊 Audience',
  landing_pages: '📄 Landing Pages',
  product: '📦 Product',
};

function PriorityBadge({ priority }: { priority: InsightPriority }) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold tracking-wide"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {priority}
    </span>
  );
}

interface InsightCardProps extends Record<string, unknown> {
  insight: Insight;
  onDismiss: (id: string) => void;
  onApply: (id: string) => void;
}

function InsightCard({ insight, onDismiss, onApply }: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cfg = PRIORITY_CONFIG[insight.priority];

  return (
    <div
      className="rounded-xl overflow-hidden transition-all"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {/* Main row */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          {/* Priority + content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <PriorityBadge priority={insight.priority} />
              <span
                className="text-[10px] px-2 py-0.5 rounded-full bg-bg-card border border-bg-border text-text-muted"
              >
                {DUCK_LABELS[insight.duck] ?? insight.duck}
              </span>
            </div>

            <h3 className="text-sm font-bold text-text-primary mb-1 leading-snug">
              {insight.headline}
            </h3>

            <p className="text-xs text-text-secondary leading-relaxed">
              {insight.description}
            </p>

            {/* Impact callout */}
            <div
              className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ color: cfg.color, background: 'rgba(0,0,0,0.2)' }}
            >
              ⚡ {insight.impact}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={() => onDismiss(insight.id)}
              className="w-7 h-7 rounded-lg bg-bg-card border border-bg-border text-text-muted hover:text-red-400 hover:border-red-400/30 text-xs transition-colors flex items-center justify-center"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Footer: expand + apply */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
          >
            {expanded ? '▼ Hide details' : '▶ Show details'}
          </button>
          <div className="flex-1" />
          <button
            onClick={() => onApply(insight.id)}
            className="px-3 py-1 rounded-lg text-xs font-medium transition-colors text-white"
            style={{ backgroundColor: cfg.color, opacity: 0.9 }}
          >
            Apply →
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 sm:px-5 pb-4 pt-0 border-t border-white/5">
          <p className="text-xs text-text-secondary leading-relaxed pt-3 whitespace-pre-line">
            {insight.details}
          </p>
        </div>
      )}
    </div>
  );
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDismissed, setShowDismissed] = useState(false);

  useEffect(() => {
    fetch('/api/insights')
      .then((r) => r.json())
      .then((data) => setInsights(data.insights ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: 'dismissed' | 'applied' | 'active') {
    // Optimistic UI
    setInsights((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, status } : ins))
    );
    // Persist to API
    await fetch('/api/insights', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    }).catch(() => {});
  }

  function handleDismiss(id: string) {
    updateStatus(id, 'dismissed');
  }

  function handleApply(id: string) {
    alert('Action queued. In a future phase, this will create a monday.com task with the recommendation.');
    updateStatus(id, 'applied');
  }

  const active = insights.filter((ins) => ins.status === 'active');
  const dismissed = insights.filter((ins) => ins.status === 'dismissed' || ins.status === 'applied');

  const p0Count = active.filter((ins) => ins.priority === 'P0').length;
  const p1Count = active.filter((ins) => ins.priority === 'P1').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Insights</h1>
          <p className="text-sm text-text-muted mt-1">
            LLM-generated marketing recommendations — sorted by priority.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {p0Count > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-400">{p0Count} P0</span>
            </div>
          )}
          {p1Count > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-400">{p1Count} P1</span>
            </div>
          )}
        </div>
      </div>

      {/* Priority legend */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {(Object.entries(PRIORITY_CONFIG) as [InsightPriority, typeof PRIORITY_CONFIG[InsightPriority]][]).map(([p, cfg]) => (
          <div
            key={p}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px]"
            style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <span className="font-bold">{p}</span>
            <span className="text-text-muted">{cfg.label.split(' — ')[1]}</span>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-bg-card animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          {/* Active insights */}
          {active.length === 0 ? (
            <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="text-base font-semibold text-text-primary mb-1">No active insights</h2>
              <p className="text-sm text-text-muted">All caught up! Check back after the next pipeline run.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {active.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  onDismiss={handleDismiss}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}

          {/* Dismissed / applied */}
          {dismissed.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() => setShowDismissed((v) => !v)}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors flex items-center gap-1"
              >
                {showDismissed ? '▼' : '▶'} {dismissed.length} dismissed / applied
              </button>
              {showDismissed && (
                <div className="mt-3 space-y-3 opacity-50">
                  {dismissed.map((insight) => (
                    <div
                      key={insight.id}
                      className="rounded-xl p-4 flex items-start justify-between gap-3"
                      style={{
                        background: PRIORITY_CONFIG[insight.priority].bg,
                        border: `1px solid ${PRIORITY_CONFIG[insight.priority].border}`,
                      }}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <PriorityBadge priority={insight.priority} />
                          <span className="text-[10px] text-text-muted uppercase">{insight.status}</span>
                        </div>
                        <p className="text-xs text-text-secondary truncate">{insight.headline}</p>
                      </div>
                      <button
                        onClick={() => updateStatus(insight.id, 'active')}
                        className="shrink-0 text-[10px] text-text-muted hover:text-text-primary transition-colors px-2 py-1 bg-bg-card rounded border border-bg-border"
                      >
                        Restore
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
