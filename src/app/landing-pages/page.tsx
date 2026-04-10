'use client';
import { useState, useEffect } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import { getScoreColorHex } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

interface LandingPage {
  url: string;
  adCount: number;
  totalClicks: number;
  totalSpend: number;
  totalConversions: number;
  sourceAds: string[];
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

export default function LandingPagesPage() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selected, setSelected] = useState<LandingPage | null>(null);

  useEffect(() => {
    fetch('/api/landing-pages')
      .then(r => r.json())
      .then(data => {
        setLandingPages(data.landingPages || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalSpend = landingPages.reduce((s, lp) => s + lp.totalSpend, 0);
  const totalClicks = landingPages.reduce((s, lp) => s + lp.totalClicks, 0);

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
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
          <span className="text-xs text-text-muted">LIVE</span>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-text-muted text-sm animate-pulse">Loading landing pages from Google Ads...</div>
        </div>
      ) : (
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-text-muted text-xs border-b border-bg-border">
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
                return (
                  <tr
                    key={lp.url}
                    onClick={() => { setSelected(lp); setPanelOpen(true); }}
                    className="border-b border-bg-border/50 hover:bg-bg-hover transition-colors cursor-pointer"
                  >
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
        <span className="text-xs font-medium text-score-orange">⚡ Missing Data</span>
        <p className="text-xs text-text-secondary mt-1">
          Google Rank, Page Speed, and on-page conversion rate require Ahrefs API and Google PageSpeed Insights integration.
          Currently showing spend/clicks/conversions from Google Ads only.
        </p>
      </div>

      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selected ? selected.url.replace('https://monday.com', '') : 'Details'}
      >
        {selected && (
          <div className="space-y-4">
            <a href={selected.url} target="_blank" className="text-xs text-accent-blue hover:underline block truncate">
              {selected.url}
            </a>

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

            <div className="border-t border-bg-border pt-3">
              <h4 className="text-xs font-medium text-text-muted mb-2">MISSING DATA</h4>
              <div className="space-y-1 text-xs text-text-muted">
                <div>• Google Rank — needs Ahrefs API</div>
                <div>• Page Speed — needs PageSpeed Insights API</div>
                <div>• On-page analytics — needs GA4 access</div>
              </div>
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}
