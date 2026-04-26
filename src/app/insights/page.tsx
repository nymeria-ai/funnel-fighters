'use client';
import { useState, useEffect } from 'react';

interface Insight {
  id: string;
  severity: 'high' | 'medium' | 'low';
  type: 'opportunity' | 'problem' | 'insight' | 'caveat';
  title: string;
  metric: string;
  detail: string;
  action: string;
  duck: string;
}

const severityConfig = {
  high: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', label: '🔴 High Impact' },
  medium: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', label: '🟡 Medium' },
  low: { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', label: '⚪ Low' },
};

const typeEmoji: Record<string, string> = {
  opportunity: '💰',
  problem: '⚠️',
  insight: '💡',
  caveat: '📋',
};

const duckEmoji: Record<string, string> = {
  product: '🦆 Product',
  landing_pages: '🦆 Landing Pages',
  ads: '🦆 Ads',
  audience: '🦆 Audience',
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [filterDuck, setFilterDuck] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  useEffect(() => {
    fetch('/api/insights')
      .then(r => r.json())
      .then(data => {
        setInsights(data.insights || []);
        setGeneratedAt(data.generatedAt || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = insights.filter(i => {
    if (filterDuck !== 'all' && i.duck !== filterDuck) return false;
    if (filterSeverity !== 'all' && i.severity !== filterSeverity) return false;
    return true;
  });

  const ducks = [...new Set(insights.map(i => i.duck))];
  const highCount = insights.filter(i => i.severity === 'high').length;
  const oppCount = insights.filter(i => i.type === 'opportunity').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">🎯 Insights War Room</h1>
          <p className="text-xs text-text-muted mt-1">
            Cross-analysis: BigBrain BI × Google Ads — {insights.length} findings
            {generatedAt && ` · Updated ${new Date(generatedAt).toLocaleDateString()}`}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-red-400">{highCount} high-impact</div>
          <div className="text-xs text-text-muted">{oppCount} opportunities</div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-32 bg-bg-card animate-pulse rounded-xl" />)}
        </div>
      ) : insights.length === 0 ? (
        <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-text-primary mb-2">No Insights Yet</h2>
          <p className="text-sm text-text-muted">Run the BigBrain sync script to generate cross-analysis insights.</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex gap-2 mb-4 flex-wrap">
            <button
              onClick={() => setFilterDuck('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterDuck === 'all' ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
              }`}
            >All Ducks</button>
            {ducks.map(d => (
              <button
                key={d}
                onClick={() => setFilterDuck(d)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterDuck === d ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
                }`}
              >{duckEmoji[d] || d}</button>
            ))}
            <div className="w-px bg-bg-border mx-1" />
            {['all', 'high', 'medium', 'low'].map(s => (
              <button
                key={s}
                onClick={() => setFilterSeverity(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterSeverity === s ? 'bg-accent-blue text-white' : 'bg-bg-card text-text-secondary hover:bg-bg-hover'
                }`}
              >{s === 'all' ? 'All' : severityConfig[s as keyof typeof severityConfig].label}</button>
            ))}
          </div>

          {/* Insight Cards */}
          <div className="space-y-4">
            {filtered.map((insight) => {
              const sev = severityConfig[insight.severity];
              return (
                <div
                  key={insight.id}
                  className="rounded-xl p-5 transition-all hover:scale-[1.005]"
                  style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{typeEmoji[insight.type]}</span>
                      <h3 className="text-sm font-bold text-text-primary">{insight.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-card text-text-muted">
                        {duckEmoji[insight.duck] || insight.duck}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: sev.border, color: sev.color }}>
                        {insight.severity}
                      </span>
                    </div>
                  </div>

                  <div className="mb-3 px-3 py-2 rounded-lg bg-bg-card/50">
                    <div className="text-xs font-mono font-semibold" style={{ color: sev.color }}>
                      {insight.metric}
                    </div>
                  </div>

                  <p className="text-xs text-text-secondary mb-3 leading-relaxed">{insight.detail}</p>

                  <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-bg-card/30">
                    <span className="text-xs shrink-0 mt-0.5">🎯</span>
                    <p className="text-xs text-text-primary font-medium">{insight.action}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
