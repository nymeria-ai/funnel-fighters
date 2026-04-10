'use client';
import { useState } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import { mockLandingPages, LandingPageData } from '@/data/mock';
import { getScoreColorHex, getScoreLabel } from '@/lib/scoring';

export default function LandingPagesPage() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<LandingPageData | null>(null);

  const overallScore = 71;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">🦆 Landing Pages</h1>
          <p className="text-xs text-text-muted mt-1">The enhancer. Don&apos;t ruin the intent!</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: getScoreColorHex(overallScore) }}>{overallScore}</div>
          <div className="text-xs" style={{ color: getScoreColorHex(overallScore) }}>{getScoreLabel(overallScore)}</div>
        </div>
      </div>

      <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-muted text-xs border-b border-bg-border">
              <th className="text-left px-5 py-3 font-medium">Landing Page</th>
              <th className="text-center px-4 py-3 font-medium">Score</th>
              <th className="text-center px-4 py-3 font-medium">Google Rank</th>
              <th className="text-center px-4 py-3 font-medium">Speed</th>
              <th className="text-right px-4 py-3 font-medium">Visits</th>
              <th className="text-right px-4 py-3 font-medium">Signups</th>
              <th className="text-right px-4 py-3 font-medium">Conv. Rate</th>
              <th className="text-center px-4 py-3 font-medium">Source Ads</th>
            </tr>
          </thead>
          <tbody>
            {mockLandingPages.map(lp => (
              <tr
                key={lp.id}
                onClick={() => { setSelected(lp); setPanelOpen(true); }}
                className="border-b border-bg-border/50 hover:bg-bg-hover transition-colors cursor-pointer"
              >
                <td className="px-5 py-4">
                  <div className="text-sm font-medium text-text-primary">{lp.title}</div>
                  <div className="text-xs text-accent-blue truncate max-w-[300px]">{lp.url}</div>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-lg font-bold" style={{ color: getScoreColorHex(lp.score) }}>
                    {lp.score ?? '—'}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-sm font-medium text-text-primary">{lp.googleRank ?? '—'}</span>
                    <span className="text-xs text-text-muted">/10</span>
                  </div>
                  {lp.rankUpdatedAt && (
                    <div className="text-[10px] text-text-muted mt-0.5">
                      {new Date(lp.rankUpdatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm" style={{ color: getScoreColorHex(lp.pageSpeedScore) }}>
                    {lp.pageSpeedScore ?? '—'}
                  </span>
                </td>
                <td className="px-4 py-4 text-right text-text-secondary">
                  {lp.visits.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right text-text-secondary">
                  {lp.signups.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-right font-medium" style={{ color: getScoreColorHex(lp.score) }}>
                  {lp.conversionRate.toFixed(1)}%
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-xs text-text-muted">{lp.sourceAds.length} ads</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selected ? `📄 ${selected.title}` : 'Details'}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold" style={{ color: getScoreColorHex(selected.score) }}>
                {selected.score}
              </div>
              <button className="px-3 py-1.5 bg-bg-hover text-text-secondary text-xs rounded-lg hover:bg-bg-border transition-colors">
                🔄 Refresh Rank
              </button>
            </div>

            <a href={selected.url} target="_blank" className="text-xs text-accent-blue hover:underline block truncate">
              {selected.url}
            </a>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-text-muted">Google Rank</span><span className="text-text-primary font-medium">{selected.googleRank}/10</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Page Speed</span><span style={{ color: getScoreColorHex(selected.pageSpeedScore) }}>{selected.pageSpeedScore}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Visits</span><span className="text-text-primary">{selected.visits.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Signups</span><span className="text-text-primary">{selected.signups.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Conv. Rate</span><span className="font-medium" style={{ color: getScoreColorHex(selected.score) }}>{selected.conversionRate.toFixed(1)}%</span></div>
            </div>

            <div className="border-t border-bg-border pt-3">
              <h4 className="text-xs font-medium text-text-muted mb-2">SOURCE ADS</h4>
              {selected.sourceAds.map((ad, i) => (
                <div key={i} className="text-xs text-text-secondary py-1">• {ad}</div>
              ))}
            </div>

            {selected.rankUpdatedAt && (
              <div className="text-[10px] text-text-muted">
                Rank last updated: {new Date(selected.rankUpdatedAt).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </RightPanel>
    </div>
  );
}
