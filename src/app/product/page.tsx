'use client';
import { useState, useEffect } from 'react';
import DuckIcon from '@/components/ui/DuckIcon';
import { getScoreColorHex } from '@/lib/scoring';

interface ProductSummary {
  signup_product: string;
  soft_signups: number;
  hard_signups: number;
  payers_28d: number;
  acv_28d: number;
}

interface WeeklyCohort {
  week_start: string;
  visits: number;
  get_started: number;
  soft_signups: number;
  hard_signups: number;
  payers_28d: number;
  acv_28d: number;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function rateColor(rate: number, thresholds: [number, number, number]): string {
  if (rate >= thresholds[2]) return '#22C55E';
  if (rate >= thresholds[1]) return '#84CC16';
  if (rate >= thresholds[0]) return '#F97316';
  return '#EF4444';
}

export default function ProductPage() {
  const [productSummary, setProductSummary] = useState<ProductSummary[]>([]);
  const [cohorts, setCohorts] = useState<WeeklyCohort[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/funnel/product').then(r => r.json()),
      fetch('/api/funnel/cohorts').then(r => r.json()),
    ])
      .then(([prodData, cohortData]) => {
        setProductSummary(prodData.productSummary || []);
        setCohorts(cohortData.rows || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalHard = productSummary.reduce((s, r) => s + Number(r.hard_signups), 0);
  const totalPayers = productSummary.reduce((s, r) => s + Number(r.payers_28d), 0);
  const totalAcv = productSummary.reduce((s, r) => s + Number(r.acv_28d), 0);
  const totalSoft = productSummary.reduce((s, r) => s + Number(r.soft_signups), 0);
  const payerRate = totalHard > 0 ? (totalPayers / totalHard * 100) : 0;

  const hasData = productSummary.length > 0 || cohorts.length > 0;
  const scoreEstimate = hasData ? Math.min(100, Math.round(payerRate * 50 + (totalPayers > 0 ? 30 : 0))) : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <DuckIcon color={hasData ? getScoreColorHex(scoreEstimate) : '#6B7280'} size={48} />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Product</h1>
          <p className="text-xs text-text-muted mt-1">The promise delivery. Signup → Activation → Paying.</p>
        </div>
        {scoreEstimate !== null && (
          <div className="ml-auto text-right">
            <div className="text-3xl font-bold" style={{ color: getScoreColorHex(scoreEstimate) }}>{scoreEstimate}</div>
            <div className="text-xs text-text-muted">Score</div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-bg-card animate-pulse rounded-xl" />)}
        </div>
      ) : !hasData ? (
        <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center mb-6">
          <DuckIcon color="#6B7280" size={80} className="mx-auto mb-4 opacity-40" />
          <h2 className="text-lg font-semibold text-text-primary mb-2">No Data Connected</h2>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            Sync BigBrain funnel data from Admin → Sync to see product metrics.
          </p>
        </div>
      ) : (
        <>
          {/* Funnel Overview */}
          <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Full Funnel — Last 30 Days</h3>
            <div className="flex items-center gap-2">
              {[
                { label: 'Soft Signups', value: totalSoft, color: '#6B7280' },
                { label: 'Hard Signups', value: totalHard, color: '#3B82F6' },
                { label: 'Payers (28d)', value: totalPayers, color: '#22C55E' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center gap-2 flex-1">
                  <div className="flex-1 bg-bg-hover rounded-lg p-3 text-center">
                    <div className="text-xl font-bold" style={{ color: step.color }}>{formatNumber(step.value)}</div>
                    <div className="text-[10px] text-text-muted mt-1">{step.label}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="text-center shrink-0">
                      <div className="text-xs font-bold" style={{ color: rateColor(
                        i === 0 ? (totalSoft > 0 ? totalHard / totalSoft * 100 : 0) : payerRate,
                        i === 0 ? [30, 50, 70] : [0.3, 0.7, 1.5]
                      )}}>
                        {i === 0
                          ? (totalSoft > 0 ? (totalHard / totalSoft * 100).toFixed(1) : '0')
                          : payerRate.toFixed(2)}%
                      </div>
                      <div className="text-text-muted">→</div>
                    </div>
                  )}
                </div>
              ))}
              <div className="bg-bg-hover rounded-lg p-3 text-center shrink-0 min-w-[100px]">
                <div className="text-xl font-bold text-score-gold">{formatCurrency(totalAcv)}</div>
                <div className="text-[10px] text-text-muted mt-1">ACV (28d)</div>
              </div>
            </div>
          </div>

          {/* Product Alignment */}
          <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-6">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Product Alignment — Where Do Signups Land?</h3>
            <div className="space-y-2">
              {productSummary.map((p) => {
                const pct = totalHard > 0 ? (Number(p.hard_signups) / totalHard * 100) : 0;
                return (
                  <div key={p.signup_product} className="flex items-center gap-3">
                    <span className="text-xs text-text-primary w-32 truncate font-medium">{p.signup_product}</span>
                    <div className="flex-1 h-3 bg-bg-hover rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent-blue"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary w-12 text-right">{pct.toFixed(1)}%</span>
                    <span className="text-xs text-text-muted w-16 text-right">{formatNumber(Number(p.hard_signups))}</span>
                    <span className="text-xs text-score-gold w-16 text-right">{formatCurrency(Number(p.acv_28d))}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weekly Trend */}
          {cohorts.length > 0 && (
            <div className="bg-bg-card border border-bg-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-text-primary mb-4">Weekly Funnel Trend</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-bg-border">
                      <th className="text-left text-text-muted py-2 px-2">Week</th>
                      <th className="text-right text-text-muted py-2 px-2">Visits</th>
                      <th className="text-right text-text-muted py-2 px-2">Get Started</th>
                      <th className="text-right text-text-muted py-2 px-2">%GS</th>
                      <th className="text-right text-text-muted py-2 px-2">Hard Signups</th>
                      <th className="text-right text-text-muted py-2 px-2">Payers</th>
                      <th className="text-right text-text-muted py-2 px-2">%Payer</th>
                      <th className="text-right text-text-muted py-2 px-2">ACV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cohorts.map((c) => {
                      const gsRate = Number(c.visits) > 0 ? (Number(c.get_started) / Number(c.visits) * 100) : 0;
                      const pRate = Number(c.hard_signups) > 0 ? (Number(c.payers_28d) / Number(c.hard_signups) * 100) : 0;
                      return (
                        <tr key={c.week_start} className="border-b border-bg-border/50 hover:bg-bg-hover/30">
                          <td className="py-2 px-2 text-text-secondary">{c.week_start}</td>
                          <td className="py-2 px-2 text-right text-text-primary">{formatNumber(Number(c.visits))}</td>
                          <td className="py-2 px-2 text-right text-text-primary">{formatNumber(Number(c.get_started))}</td>
                          <td className="py-2 px-2 text-right font-medium" style={{ color: rateColor(gsRate, [10, 20, 30]) }}>{gsRate.toFixed(1)}%</td>
                          <td className="py-2 px-2 text-right text-text-primary">{formatNumber(Number(c.hard_signups))}</td>
                          <td className="py-2 px-2 text-right text-text-primary">{Number(c.payers_28d)}</td>
                          <td className="py-2 px-2 text-right font-medium" style={{ color: rateColor(pRate, [0.3, 0.7, 1.5]) }}>{pRate.toFixed(2)}%</td>
                          <td className="py-2 px-2 text-right text-score-gold">{formatCurrency(Number(c.acv_28d))}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
