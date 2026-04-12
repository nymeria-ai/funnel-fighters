'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DuckIcon from '@/components/ui/DuckIcon';
import RightPanel from '@/components/layout/RightPanel';
import { getScoreColorHex } from '@/lib/scoring';

interface AccountSummary {
  name: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

interface DuckStatus {
  label: string;
  status: 'live' | 'partial' | 'no_data';
  description: string;
  route: string;
  avgRank?: number | null;
}

const ducks: DuckStatus[] = [
  { label: 'Audience', status: 'no_data', description: 'Needs Snowflake/Looker integration', route: '/audience' },
  { label: 'Ads', status: 'live', description: 'Google Ads connected — all accounts', route: '/ads' },
  { label: 'Landing Pages', status: 'partial', description: 'Rank: GSC + Ahrefs', route: '/landing-pages' },
  { label: 'Product', status: 'no_data', description: 'Needs product analytics access', route: '/product' },
];

const statusColors: Record<string, string> = {
  live: '#22C55E',
  partial: '#F97316',
  no_data: '#6B7280',
};

function getRankColor(score: number | null): string {
  if (score === null) return '#6B7280';
  if (score >= 8) return '#22C55E';
  if (score >= 6) return '#84CC16';
  if (score >= 4) return '#F97316';
  return '#EF4444';
}

export default function HomePage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDuck, setSelectedDuck] = useState<DuckStatus | null>(null);
  const [lpAvgRank, setLpAvgRank] = useState<number | null>(null);
  const rankFetched = useRef(false);

  useEffect(() => {
    fetch('/api/ads?level=accounts')
      .then(r => r.json())
      .then(data => {
        setAccounts(data.accounts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch landing page rank data for overview
  useEffect(() => {
    if (rankFetched.current) return;
    rankFetched.current = true;

    fetch('/api/landing-pages')
      .then(r => r.json())
      .then(data => {
        const urls = (data.landingPages || []).map((lp: { url: string }) => lp.url);
        if (urls.length === 0) return;
        return fetch('/api/page-rank', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls }),
        });
      })
      .then(r => r?.json())
      .then(data => {
        if (!data?.results) return;
        const scores = data.results
          .map((r: { compositeScore: number | null }) => r.compositeScore)
          .filter((s: number | null): s is number => s != null);
        if (scores.length > 0) {
          setLpAvgRank(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
        }
      })
      .catch(() => {});
  }, []);

  const totalSpend = accounts.reduce((s, a) => s + a.spend, 0);
  const totalClicks = accounts.reduce((s, a) => s + a.clicks, 0);
  const totalImpressions = accounts.reduce((s, a) => s + a.impressions, 0);
  const totalConversions = accounts.reduce((s, a) => s + a.conversions, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Funnel Overview</h1>
        <p className="text-sm text-text-muted mt-1">
          Get your ducks in a row. Improve the whole funnel.
        </p>
      </div>

      {/* 4 Duck Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {ducks.map(duck => {
          const showRank = duck.label === 'Landing Pages' && lpAvgRank !== null;
          return (
            <button
              key={duck.label}
              onClick={() => {
                if (duck.status === 'no_data') {
                  setSelectedDuck(duck);
                  setPanelOpen(true);
                } else {
                  router.push(duck.route);
                }
              }}
              className="bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <DuckIcon color={statusColors[duck.status]} size={48} />
                  <div>
                    <span className="text-sm font-medium text-text-primary block">{duck.label}</span>
                    <p className="text-xs text-text-muted mt-1">{duck.description}</p>
                  </div>
                </div>
                {showRank && (
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: getRankColor(lpAvgRank) }}>
                      {lpAvgRank!.toFixed(1)}
                    </div>
                    <div className="text-xs text-text-muted">Avg Rank</div>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    duck.status === 'live' ? 'bg-score-green animate-pulse' :
                    duck.status === 'partial' ? 'bg-score-orange' :
                    'bg-score-gray'
                  }`} />
                  <span className="text-xs text-text-muted capitalize">{duck.status.replace('_', ' ')}</span>
                </span>
                <span className="text-xs text-text-muted group-hover:text-accent-blue transition-colors">
                  {duck.status !== 'no_data' ? 'View →' : 'Details →'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Metrics from Google Ads */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Google Ads — Last 30 Days</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
            <span className="text-xs text-text-muted">LIVE</span>
          </div>
        </div>

        {loading ? (
          <div className="text-text-muted text-sm animate-pulse py-8 text-center">Loading Google Ads data...</div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-2xl font-bold text-text-primary">{formatCurrency(totalSpend)}</div>
                <div className="text-xs text-text-muted">Total Spend</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">{formatNumber(totalImpressions)}</div>
                <div className="text-xs text-text-muted">Impressions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">{formatNumber(totalClicks)}</div>
                <div className="text-xs text-text-muted">Clicks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-text-primary">{formatNumber(Math.round(totalConversions))}</div>
                <div className="text-xs text-text-muted">Conversions</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium text-text-muted mb-2">ACCOUNTS BY SPEND</div>
              {accounts.slice(0, 8).map(acc => (
                <div key={acc.name} className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">{acc.name}</span>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-1.5 bg-bg-hover rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-blue"
                        style={{ width: `${Math.min(100, (acc.spend / (accounts[0]?.spend || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-text-primary font-medium w-16 text-right">{formatCurrency(acc.spend)}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Gaps Alert */}
      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-score-orange">⚠️</span>
          <span className="text-sm font-medium text-score-orange">Missing Integrations</span>
        </div>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>• <strong>Audience</strong> — Snowflake/Looker access needed for source quality scoring</li>
          <li>• <strong>Landing Pages</strong> — PageSpeed Insights for speed (GSC + Ahrefs rank connected)</li>
          <li>• <strong>Product</strong> — Mixpanel/Amplitude for activation, retention, TROI</li>
          <li>• <strong>Meta/YouTube/LinkedIn</strong> — API connections for cross-channel view</li>
        </ul>
      </div>

      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedDuck ? `${selectedDuck.label} — Not Connected` : 'Details'}
        context={selectedDuck ? { label: selectedDuck.label, status: selectedDuck.status, description: selectedDuck.description } : undefined}
      >
        {selectedDuck && (
          <div className="space-y-4">
            <DuckIcon color={statusColors[selectedDuck.status]} size={64} className="mx-auto" />
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">{selectedDuck.label}</div>
              <div className="text-xs text-text-muted mt-1">No data available</div>
            </div>
            <div className="bg-bg-hover rounded-lg p-3">
              <span className="text-xs font-medium text-score-orange">⚡ Action Required</span>
              <p className="text-xs text-text-secondary mt-1">{selectedDuck.description}</p>
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}
