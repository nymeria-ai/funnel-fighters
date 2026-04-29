'use client';
import { useState, useEffect, useRef } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import { getScoreColorHex } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

interface LandingPage extends Record<string, unknown> {
  url: string;
  adCount: number;
  totalClicks: number;
  totalSpend: number;
  totalConversions: number;
  sourceAds: string[];
}

interface PageRankResult extends Record<string, unknown> {
  url: string;
  gscPosition: number | null;
  gscImpressions: number | null;
  gscScore: number | null;
  ahrefsUR: number | null;
  ahrefsScore: number | null;
  compositeScore: number | null;
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function getRankColor(score: number | null): string {
  if (score === null) return '#6B7280';
  if (score >= 8) return '#22C55E';
  if (score >= 6) return '#84CC16';
  if (score >= 4) return '#F97316';
  return '#EF4444';
}

function RankBadge({ score }: { score: number | null }) {
  const color = getRankColor(score);
  if (score === null) {
    return <span className="text-xs text-text-muted">—</span>;
  }
  return (
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {score.toFixed(1)}
    </span>
  );
}

export default function LandingPagesPage() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<LandingPage | null>(null);
  const [rankData, setRankData] = useState<Record<string, PageRankResult>>({});
  const [rankLoading, setRankLoading] = useState(false);
  const rankFetched = useRef(false);

  useEffect(() => {
    fetch('/api/landing-pages')
      .then(r => r.json())
      .then(data => {
        setLandingPages(data.landingPages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch rank data once when landing pages are loaded (cached per session)
  useEffect(() => {
    if (landingPages.length === 0 || rankFetched.current) return;
    rankFetched.current = true;
    setRankLoading(true);

    const urls = landingPages.map(lp => lp.url);
    fetch('/api/page-rank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    })
      .then(r => r.json())
      .then(data => {
        const map: Record<string, PageRankResult> = {};
        for (const result of data.results || []) {
          map[result.url] = result;
        }
        setRankData(map);
        setRankLoading(false);
      })
      .catch(() => setRankLoading(false));
  }, [landingPages]);

  const totalSpend = landingPages.reduce((s, lp) => s + lp.totalSpend, 0);

  // Compute average rank across all pages with data
  const rankedPages = landingPages.filter(lp => rankData[lp.url]?.compositeScore != null);
  const avgRank = rankedPages.length > 0
    ? rankedPages.reduce((s, lp) => s + (rankData[lp.url]?.compositeScore ?? 0), 0) / rankedPages.length
    : null;

  const selectedRank = selected ? rankData[selected.url] : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DuckIcon color="#3B82F6" size={48} />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Landing Pages</h1>
            <p className="text-xs text-text-muted mt-1">
              {loading ? 'Loading...' : `${landingPages.length} unique LPs · ${formatCurrency(totalSpend)} total spend · Live from Google Ads`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {avgRank !== null && (
            <div className="text-right">
              <div className="text-lg font-bold" style={{ color: getRankColor(avgRank) }}>
                {avgRank.toFixed(1)}
              </div>
              <div className="text-xs text-text-muted">Avg Rank</div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
            <span className="text-xs text-text-muted">LIVE</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-text-muted text-sm animate-pulse">Loading landing pages from Google Ads...</div>
        </div>
      ) : (
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="text-text-muted text-xs border-b border-bg-border">
                <th className="text-center px-3 py-3 font-medium">Rank</th>
                <th className="text-left px-5 py-3 font-medium">Landing Page</th>
                <th className="text-right px-4 py-3 font-medium">Spend</th>
                <th className="text-right px-4 py-3 font-medium">Clicks</th>
                <th className="text-right px-4 py-3 font-medium">Conversions</th>
                <th className="text-right px-4 py-3 font-medium">Conv Rate</th>
                <th className="text-center px-4 py-3 font-medium">Ads</th>
              </tr>
            </thead>
            <tbody>
              {landingPages.map(lp => {
                const convRate = lp.totalClicks > 0 ? (lp.totalConversions / lp.totalClicks) * 100 : 0;
                const rank = rankData[lp.url];
                return (
                  <tr
                    key={lp.url}
                    onClick={() => { setSelected(lp); setPanelOpen(true); }}
                    className="border-b border-bg-border/50 hover:bg-bg-hover transition-colors cursor-pointer"
                  >
                    <td className="px-3 py-4 text-center">
                      {rankLoading ? (
                        <span className="text-xs text-text-muted animate-pulse">...</span>
                      ) : (
                        <RankBadge score={rank?.compositeScore ?? null} />
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-medium text-text-primary truncate max-w-[350px]">
                        {lp.url.replace('https://monday.com', '')}
                      </div>
                      <div className="text-xs text-accent-blue truncate max-w-[350px]">{lp.url}</div>
                    </td>
                    <td className="px-4 py-4 text-right text-text-primary font-medium">
                      {formatCurrency(lp.totalSpend)}
                    </td>
                    <td className="px-4 py-4 text-right text-text-secondary">
                      {lp.totalClicks.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right text-text-secondary">
                      {Math.round(lp.totalConversions).toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-right font-medium" style={{ color: getScoreColorHex(convRate > 10 ? 80 : convRate > 5 ? 60 : convRate > 2 ? 40 : 20) }}>
                      {convRate.toFixed(1)}%
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-xs text-text-muted">{lp.adCount}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Data gaps notice */}
      <div className="mt-6 bg-bg-card border border-score-orange/30 rounded-xl p-4">
        <span className="text-xs font-medium text-score-orange">Missing Data</span>
        <p className="text-xs text-text-secondary mt-1">
          Page Speed and on-page conversion rate require Google PageSpeed Insights and GA4 integration.
          Rank scores combine Google Search Console position + Ahrefs URL Rating.
        </p>
      </div>

      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selected ? selected.url.replace('https://monday.com', '') : 'Details'}
        context={selected ? { url: selected.url, totalSpend: selected.totalSpend, totalClicks: selected.totalClicks, totalConversions: selected.totalConversions, rank: selectedRank } : undefined}
      >
        {selected && (
          <div className="space-y-4">
            <a href={selected.url} target="_blank" className="text-xs text-accent-blue hover:underline block truncate">
              {selected.url}
            </a>

            {/* Rank Score Breakdown */}
            {selectedRank && selectedRank.compositeScore != null && (
              <div className="bg-bg-hover rounded-lg p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-muted">PAGE RANK SCORE</span>
                  <span className="text-xl font-bold" style={{ color: getRankColor(selectedRank.compositeScore) }}>
                    {selectedRank.compositeScore.toFixed(1)}/10
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">GSC Avg Position</span>
                    <span className="text-text-primary">
                      {selectedRank.gscPosition != null ? `#${selectedRank.gscPosition.toFixed(1)}` : 'N/A'}
                    </span>
                  </div>
                  {selectedRank.gscScore != null && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">GSC Score</span>
                      <span className="font-medium" style={{ color: getRankColor(selectedRank.gscScore) }}>
                        {selectedRank.gscScore.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Ahrefs URL Rating</span>
                    <span className="text-text-primary">
                      {selectedRank.ahrefsUR != null ? `${selectedRank.ahrefsUR}/100` : 'N/A'}
                    </span>
                  </div>
                  {selectedRank.ahrefsScore != null && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Ahrefs Score</span>
                      <span className="font-medium" style={{ color: getRankColor(selectedRank.ahrefsScore) }}>
                        {selectedRank.ahrefsScore.toFixed(1)}/10
                      </span>
                    </div>
                  )}
                </div>
                {/* Score bar */}
                <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(selectedRank.compositeScore / 10) * 100}%`,
                      backgroundColor: getRankColor(selectedRank.compositeScore),
                    }}
                  />
                </div>
              </div>
            )}

            {rankLoading && !selectedRank && (
              <div className="bg-bg-hover rounded-lg p-3 text-center">
                <span className="text-xs text-text-muted animate-pulse">Loading rank data...</span>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-text-muted">Total Spend</span><span className="text-text-primary font-medium">{formatCurrency(selected.totalSpend)}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Total Clicks</span><span className="text-text-primary">{selected.totalClicks.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-text-muted">Conversions</span><span className="text-text-primary">{Math.round(selected.totalConversions).toLocaleString()}</span></div>
              <div className="flex justify-between">
                <span className="text-text-muted">Conv Rate</span>
                <span className="text-text-primary font-medium">
                  {selected.totalClicks > 0 ? ((selected.totalConversions / selected.totalClicks) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="flex justify-between"><span className="text-text-muted">Ads Pointing Here</span><span className="text-text-primary">{selected.adCount}</span></div>
            </div>

            <div className="border-t border-bg-border pt-3">
              <h4 className="text-xs font-medium text-text-muted mb-2">SOURCE CAMPAIGNS</h4>
              {selected.sourceAds.map((ad, i) => (
                <div key={i} className="text-xs text-text-secondary py-1">• {ad}</div>
              ))}
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}
