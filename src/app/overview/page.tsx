'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DuckIcon from '@/components/ui/DuckIcon';
import RightPanel from '@/components/layout/RightPanel';
import { getScoreColorHex, geometricMean } from '@/lib/scoring';

interface AccountSummary extends Record<string, unknown> {
  name: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
}

interface DuckScore extends Record<string, unknown> {
  duckType: string;
  score: number;
  subScores: Record<string, unknown>;
  trend: number[];
}

interface WeeklyCohort extends Record<string, unknown> {
  week_start: string;
  visits: number;
  get_started: number;
  soft_signups: number;
  hard_signups: number;
  payers_28d: number;
  acv_28d: number;
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

interface DuckInfo extends Record<string, unknown> {
  label: string;
  duckType: string;
  baseStatus: 'live' | 'partial' | 'no_data';
  description: string;
  route: string;
}

const duckDefs: DuckInfo[] = [
  { label: 'Audience', duckType: 'audience', baseStatus: 'partial', description: 'Google Ads targeting', route: '/audience' },
  { label: 'Ads', duckType: 'ads', baseStatus: 'live', description: 'Google Ads connected', route: '/ads' },
  { label: 'Landing Pages', duckType: 'landing_pages', baseStatus: 'partial', description: 'Rank + Funnel data', route: '/landing-pages' },
  { label: 'Product', duckType: 'product', baseStatus: 'no_data', description: 'Signup → Paying funnel', route: '/product' },
];

function rateColor(rate: number, thresholds: [number, number, number]): string {
  if (rate >= thresholds[2]) return '#22C55E';
  if (rate >= thresholds[1]) return '#84CC16';
  if (rate >= thresholds[0]) return '#F97316';
  return '#EF4444';
}

function getRankColor(score: number | null): string {
  if (score === null) return '#6B7280';
  if (score >= 8) return '#22C55E';
  if (score >= 6) return '#84CC16';
  if (score >= 4) return '#F97316';
  return '#EF4444';
}

export default function OverviewPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedDuck, setSelectedDuck] = useState<DuckInfo | null>(null);
  const [lpAvgRank, setLpAvgRank] = useState<number | null>(null);
  const [duckScores, setDuckScores] = useState<DuckScore[]>([]);
  const [cohorts, setCohorts] = useState<WeeklyCohort[]>([]);
  const rankFetched = useRef(false);

  useEffect(() => {
    // Fetch all data in parallel
    Promise.all([
      fetch('/api/ads?level=accounts').then(r => r.json()).catch(() => ({ accounts: [] })),
      fetch('/api/funnel/scores').then(r => r.json()).catch(() => ({ scores: [] })),
      fetch('/api/funnel/cohorts').then(r => r.json()).catch(() => ({ rows: [] })),
    ]).then(([adsData, scoresData, cohortsData]) => {
      setAccounts(adsData.accounts || []);
      setDuckScores(scoresData.scores || []);
      setCohorts(cohortsData.rows || []);
      setLoading(false);
    });
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

  // Build score map from API
  const scoreMap = new Map<string, DuckScore>();
  for (const ds of duckScores) scoreMap.set(ds.duckType, ds);

  const allDuckScoreValues = duckDefs.map(d => scoreMap.get(d.duckType)?.score ?? null);
  const overallScore = geometricMean(allDuckScoreValues);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Funnel Overview</h1>
        <p className="text-sm text-text-muted mt-1">
          Get your ducks in a row. Improve the whole funnel.
        </p>
      </div>

      {/* Overall Score */}
      {overallScore !== null && (
        <div className="flex items-center gap-4 mb-6 bg-bg-card border border-bg-border rounded-xl p-4">
          <div className="text-4xl font-bold" style={{ color: getScoreColorHex(overallScore) }}>{overallScore}</div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Overall Funnel Score</div>
            <div className="text-xs text-text-muted">Geometric mean of all duck scores</div>
          </div>
        </div>
      )}

      {/* 4 Duck Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {duckDefs.map(duck => {
          const ds = scoreMap.get(duck.duckType);
          const score = ds?.score ?? null;
          const hasScore = score !== null;
          const status = hasScore ? 'live' : duck.baseStatus;
          const color = hasScore ? getScoreColorHex(score) : (status === 'live' ? '#22C55E' : status === 'partial' ? '#F97316' : '#6B7280');
          const showRank = duck.duckType === 'landing_pages' && lpAvgRank !== null && !hasScore;

          return (
            <button
              key={duck.label}
              onClick={() => router.push(duck.route)}
              className="bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <DuckIcon color={color} size={48} />
                  <div>
                    <span className="text-sm font-medium text-text-primary block">{duck.label}</span>
                    <p className="text-xs text-text-muted mt-1">{duck.description}</p>
                  </div>
                </div>
                {hasScore ? (
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color }}>{score}</div>
                    <div className="text-xs text-text-muted">Score</div>
                  </div>
                ) : showRank ? (
                  <div className="text-right">
                    <div className="text-2xl font-bold" style={{ color: getRankColor(lpAvgRank) }}>{lpAvgRank!.toFixed(1)}</div>
                    <div className="text-xs text-text-muted">Avg Rank</div>
                  </div>
                ) : null}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: color }} />
                  <span className="text-xs text-text-muted capitalize">{status.replace('_', ' ')}</span>
                </span>
                <span className="text-xs text-text-muted group-hover:text-accent-blue transition-colors">View →</span>
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

      {/* Weekly Cohort Table */}
      {cohorts.length > 0 && (
        <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-8">
          <h3 className="text-sm font-semibold text-text-primary mb-4">Weekly Funnel Cohorts</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-bg-border">
                  <th className="text-left text-text-muted py-2 px-2">Week</th>
                  <th className="text-right text-text-muted py-2 px-2">Visits</th>
                  <th className="text-right text-text-muted py-2 px-2">Get Started</th>
                  <th className="text-right text-text-muted py-2 px-2">%GS</th>
                  <th className="text-right text-text-muted py-2 px-2">Signups</th>
                  <th className="text-right text-text-muted py-2 px-2">%Signup</th>
                  <th className="text-right text-text-muted py-2 px-2">Payers</th>
                  <th className="text-right text-text-muted py-2 px-2">%Pay</th>
                  <th className="text-right text-text-muted py-2 px-2">ACV</th>
                </tr>
              </thead>
              <tbody>
                {cohorts.map((c, i) => {
                  const v = Number(c.visits); const gs = Number(c.get_started); const hs = Number(c.hard_signups);
                  const p = Number(c.payers_28d); const acv = Number(c.acv_28d);
                  const gsRate = v > 0 ? (gs / v * 100) : 0;
                  const signupRate = gs > 0 ? (hs / gs * 100) : 0;
                  const payRate = hs > 0 ? (p / hs * 100) : 0;
                  // Compare to previous week for color
                  const prev = cohorts[i + 1];
                  const prevGsRate = prev ? (Number(prev.visits) > 0 ? Number(prev.get_started) / Number(prev.visits) * 100 : 0) : null;
                  const prevPayRate = prev ? (Number(prev.hard_signups) > 0 ? Number(prev.payers_28d) / Number(prev.hard_signups) * 100 : 0) : null;

                  return (
                    <tr key={c.week_start} className="border-b border-bg-border/50 hover:bg-bg-hover/30">
                      <td className="py-2 px-2 text-text-secondary">{c.week_start}</td>
                      <td className="py-2 px-2 text-right text-text-primary">{formatNumber(v)}</td>
                      <td className="py-2 px-2 text-right text-text-primary">{formatNumber(gs)}</td>
                      <td className="py-2 px-2 text-right font-medium" style={{ color: prevGsRate !== null ? (gsRate >= prevGsRate ? '#22C55E' : '#EF4444') : rateColor(gsRate, [10, 20, 30]) }}>{gsRate.toFixed(1)}%</td>
                      <td className="py-2 px-2 text-right text-text-primary">{formatNumber(hs)}</td>
                      <td className="py-2 px-2 text-right font-medium" style={{ color: rateColor(signupRate, [20, 35, 50]) }}>{signupRate.toFixed(1)}%</td>
                      <td className="py-2 px-2 text-right text-text-primary">{p}</td>
                      <td className="py-2 px-2 text-right font-medium" style={{ color: prevPayRate !== null ? (payRate >= prevPayRate ? '#22C55E' : '#EF4444') : rateColor(payRate, [0.3, 0.7, 1.5]) }}>{payRate.toFixed(2)}%</td>
                      <td className="py-2 px-2 text-right text-score-gold">{formatCurrency(acv)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Gaps Alert */}
      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-score-orange">⚠️</span>
          <span className="text-sm font-medium text-score-orange">Missing Integrations</span>
        </div>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>• <strong>Audience</strong> — Meta, YouTube, LinkedIn targeting not yet connected</li>
          <li>• <strong>Landing Pages</strong> — PageSpeed Insights for speed scores</li>
          <li>• <strong>Product</strong> — Sync BigBrain data from Admin → Sync for full funnel</li>
          <li>• <strong>Meta/YouTube/LinkedIn</strong> — API connections for cross-channel view</li>
        </ul>
      </div>

      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedDuck ? selectedDuck.label : 'Details'}
        context={selectedDuck ? { label: selectedDuck.label, description: selectedDuck.description } : undefined}
      >
        {selectedDuck && (
          <div className="space-y-4">
            <DuckIcon color="#6B7280" size={64} className="mx-auto" />
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">{selectedDuck.label}</div>
              <div className="text-xs text-text-muted mt-1">{selectedDuck.description}</div>
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}
