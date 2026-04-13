'use client';
import { useState, useEffect, useMemo } from 'react';
import type { Recommendation } from '@/types';

const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
  P0: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  P1: { bg: 'rgba(249,115,22,0.15)', text: '#F97316' },
  P2: { bg: 'rgba(234,179,8,0.15)', text: '#EAB308' },
  P3: { bg: 'rgba(59,130,246,0.15)', text: '#3B82F6' },
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'Ad Copy': { bg: 'rgba(249,115,22,0.15)', text: '#F97316' },
  'Landing Page': { bg: 'rgba(59,130,246,0.15)', text: '#3B82F6' },
  Budget: { bg: 'rgba(234,179,8,0.15)', text: '#EAB308' },
  Audience: { bg: 'rgba(34,197,94,0.15)', text: '#22C55E' },
  SEO: { bg: 'rgba(6,182,212,0.15)', text: '#06B6D4' },
  Alignment: { bg: 'rgba(168,85,247,0.15)', text: '#A855F7' },
};

function Badge({ label, colors }: { label: string; colors: { bg: string; text: string } }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}

function ActionPanel({ rec, onClose }: { rec: Recommendation; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div
        className="bg-bg-card border border-bg-border rounded-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-bg-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge label={rec.priority} colors={PRIORITY_COLORS[rec.priority]} />
            <Badge label={rec.type} colors={TYPE_COLORS[rec.type] || TYPE_COLORS['Ad Copy']} />
          </div>
          <button onClick={onClose} className="text-text-muted hover:text-text-primary text-lg">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">{rec.description}</h3>
            <p className="text-xs text-text-secondary leading-relaxed">{rec.reasoning}</p>
          </div>
          <div className="border-t border-bg-border pt-4">
            <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Action Steps</h4>
            <div className="text-xs text-text-secondary whitespace-pre-line leading-relaxed bg-bg-hover rounded-lg p-3">
              {rec.actionDetails || 'No specific action steps defined. Review the recommendation and apply changes manually in Google Ads.'}
            </div>
          </div>
          {(rec.relatedAdId || rec.relatedUrl) && (
            <div className="border-t border-bg-border pt-4 space-y-1">
              <h4 className="text-xs font-semibold text-text-muted uppercase mb-2">Related Resources</h4>
              {rec.relatedAdId && (
                <div className="text-xs text-text-secondary">Ad ID: <span className="text-text-primary font-mono">{rec.relatedAdId}</span></div>
              )}
              {rec.relatedUrl && (
                <div className="text-xs">
                  <a href={rec.relatedUrl} target="_blank" rel="noopener noreferrer" className="text-accent-blue hover:underline truncate block">
                    {rec.relatedUrl}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SortField = 'priority' | 'type';
type SortDir = 'asc' | 'desc';

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [showArchived, setShowArchived] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [actionPanel, setActionPanel] = useState<Recommendation | null>(null);
  const [sortField, setSortField] = useState<SortField>('priority');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [updating, setUpdating] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/recommendations')
      .then(r => r.json())
      .then(data => {
        setRecommendations(data.recommendations || []);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to load recommendations');
        setLoading(false);
      });
  }, []);

  async function updateStatus(id: string, action: 'acknowledge' | 'dismiss' | 'doing') {
    setUpdating(prev => new Set(prev).add(id));
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecommendations(prev =>
          prev.map(r => r.id === id ? data.recommendation : r)
        );
      }
    } finally {
      setUpdating(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  }

  function toggleExpand(id: string) {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  const counts = useMemo(() => {
    const active = recommendations.filter(r => r.status === 'active').length;
    const acknowledged = recommendations.filter(r => r.status === 'acknowledged').length;
    const archived = recommendations.filter(r => r.status === 'dismissed').length;
    const doing = recommendations.filter(r => r.status === 'doing').length;
    return { active, acknowledged, archived, doing };
  }, [recommendations]);

  const filtered = useMemo(() => {
    const priorityOrder: Record<string, number> = { P0: 0, P1: 1, P2: 2, P3: 3 };
    let recs = recommendations.filter(r => {
      if (!showArchived && r.status === 'dismissed') return false;
      if (priorityFilter !== 'All' && r.priority !== priorityFilter) return false;
      return true;
    });

    recs.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'priority') {
        cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortField === 'type') {
        cmp = a.type.localeCompare(b.type);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return recs;
  }, [recommendations, priorityFilter, showArchived, sortField, sortDir]);

  const SortIndicator = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <span className="text-text-muted/40 ml-1">↕</span>;
    return <span className="text-accent-blue ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">💡</span>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Recommendations</h1>
            <p className="text-xs text-text-muted mt-1">
              {loading ? 'Analyzing your funnel...' : `${counts.active} active · Data-driven insights from your ads & landing pages`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
          <span className="text-xs text-text-muted">LIVE</span>
        </div>
      </div>

      {/* Count badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-text-secondary bg-bg-card border border-bg-border rounded-lg px-3 py-1.5">
          <span className="font-semibold text-text-primary">{counts.active}</span> Active
        </span>
        <span className="text-xs text-text-secondary bg-bg-card border border-bg-border rounded-lg px-3 py-1.5">
          <span className="font-semibold text-text-primary">{counts.acknowledged}</span> Acknowledged
        </span>
        {counts.doing > 0 && (
          <span className="text-xs text-text-secondary bg-bg-card border border-accent-blue/30 rounded-lg px-3 py-1.5">
            <span className="font-semibold text-accent-blue">{counts.doing}</span> In Progress
          </span>
        )}
        <span className="text-xs text-text-secondary bg-bg-card border border-bg-border rounded-lg px-3 py-1.5">
          <span className="font-semibold text-text-primary">{counts.archived}</span> Archived
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {['All', 'P0', 'P1', 'P2', 'P3'].map(p => (
          <button
            key={p}
            onClick={() => setPriorityFilter(p)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              priorityFilter === p
                ? 'bg-accent-blue text-white'
                : 'bg-bg-card text-text-secondary border border-bg-border hover:bg-bg-hover'
            }`}
          >
            {p}
          </button>
        ))}
        <div className="h-4 w-px bg-bg-border mx-1" />
        <button
          onClick={() => setShowArchived(!showArchived)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            showArchived
              ? 'bg-bg-hover text-text-primary border border-bg-border'
              : 'bg-bg-card text-text-muted border border-bg-border hover:bg-bg-hover'
          }`}
        >
          {showArchived ? 'Hide' : 'Show'} Archived
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-bg-border/50">
              <div className="w-10 h-5 bg-bg-hover rounded animate-pulse" />
              <div className="w-16 h-5 bg-bg-hover rounded animate-pulse" />
              <div className="flex-1 h-5 bg-bg-hover rounded animate-pulse" />
              <div className="w-24 h-5 bg-bg-hover rounded animate-pulse" />
              <div className="w-32 h-5 bg-bg-hover rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-bg-card border border-score-red/30 rounded-xl p-8 text-center">
          <p className="text-sm text-score-red">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center">
          <span className="text-3xl mb-3 block">🎉</span>
          <p className="text-sm text-text-secondary">
            {recommendations.length === 0 ? 'No recommendations yet — data is being analyzed.' : 'No matching recommendations.'}
          </p>
        </div>
      ) : (
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="text-text-muted text-xs border-b border-bg-border">
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer select-none hover:text-text-primary transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  Priority<SortIndicator field="priority" />
                </th>
                <th
                  className="text-left px-4 py-3 font-medium cursor-pointer select-none hover:text-text-primary transition-colors"
                  onClick={() => handleSort('type')}
                >
                  Type<SortIndicator field="type" />
                </th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-left px-4 py-3 font-medium">Reasoning</th>
                <th className="text-left px-4 py-3 font-medium">Time</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(rec => {
                const isExpanded = expandedIds.has(rec.id);
                const isDimmed = rec.status === 'acknowledged' || rec.status === 'dismissed';
                const isUpdating = updating.has(rec.id);

                return (
                  <tr
                    key={rec.id}
                    className={`border-b border-bg-border/50 transition-colors ${
                      isDimmed ? 'opacity-50' : 'hover:bg-bg-hover'
                    } ${rec.status === 'doing' ? 'bg-accent-blue/5' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <Badge label={rec.priority} colors={PRIORITY_COLORS[rec.priority]} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={rec.type} colors={TYPE_COLORS[rec.type] || TYPE_COLORS['Ad Copy']} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-text-primary text-xs leading-relaxed">{rec.description}</span>
                    </td>
                    <td className="px-4 py-3 max-w-[250px]">
                      <div className="text-xs text-text-secondary leading-relaxed">
                        {isExpanded ? rec.reasoning : rec.reasoning.slice(0, 100)}
                        {rec.reasoning.length > 100 && (
                          <button
                            onClick={() => toggleExpand(rec.id)}
                            className="text-accent-blue hover:underline ml-1 whitespace-nowrap"
                          >
                            {isExpanded ? 'less' : '...more'}
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-xs text-text-muted">
                        {new Date(rec.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {rec.status !== 'acknowledged' && rec.status !== 'dismissed' && (
                          <button
                            onClick={() => updateStatus(rec.id, 'acknowledge')}
                            disabled={isUpdating}
                            className="text-xs px-2 py-1 rounded bg-bg-hover text-text-muted hover:text-text-primary hover:bg-bg-border transition-colors disabled:opacity-50"
                            title="Acknowledge"
                          >
                            👁️
                          </button>
                        )}
                        {rec.status !== 'dismissed' && (
                          <button
                            onClick={() => updateStatus(rec.id, 'dismiss')}
                            disabled={isUpdating}
                            className="text-xs px-2 py-1 rounded bg-bg-hover text-text-muted hover:text-text-primary hover:bg-bg-border transition-colors disabled:opacity-50"
                            title="Dismiss"
                          >
                            🗑️
                          </button>
                        )}
                        <button
                          onClick={() => {
                            updateStatus(rec.id, 'doing');
                            setActionPanel(rec);
                          }}
                          disabled={isUpdating}
                          className="text-xs px-2.5 py-1 rounded bg-accent-blue/20 text-accent-blue hover:bg-accent-blue/30 font-medium transition-colors disabled:opacity-50"
                          title="Do It"
                        >
                          ▶️ Do It
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Action panel modal */}
      {actionPanel && <ActionPanel rec={actionPanel} onClose={() => setActionPanel(null)} />}
    </div>
  );
}
