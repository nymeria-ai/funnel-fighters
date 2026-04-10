'use client';
import { getScoreColorHex, getScoreLabel } from '@/lib/scoring';

export default function ProductPage() {
  const score = 55;
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">🦆 Product</h1>
          <p className="text-xs text-text-muted mt-1">The promise. Fix everything in the product.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: getScoreColorHex(score) }}>{score}</div>
          <div className="text-xs" style={{ color: getScoreColorHex(score) }}>{getScoreLabel(score)}</div>
        </div>
      </div>

      {/* Activation Funnel */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Activation Funnel</h3>
        <div className="space-y-4">
          {[
            { stage: 'Signups', value: 4180, pct: 100, color: '#3B82F6' },
            { stage: 'Activated', value: 752, pct: 18, color: '#22C55E' },
            { stage: 'Paying', value: 32, pct: 4.3, color: '#EAB308' },
          ].map((s) => (
            <div key={s.stage}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-secondary">{s.stage}</span>
                <span className="text-xs text-text-primary font-medium">{s.value.toLocaleString()} ({s.pct}%)</span>
              </div>
              <div className="w-full h-2 bg-bg-hover rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <span className="text-xs text-text-muted px-2 py-1 bg-bg-hover rounded">MOCK DATA — Week of Apr 6</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-bg-card border border-bg-border rounded-xl p-5">
          <div className="text-xs text-text-muted mb-1">Day-7 Retention</div>
          <div className="text-2xl font-bold text-score-green">72%</div>
          <div className="text-xs text-text-muted mt-1">of activated users return after 7 days</div>
        </div>
        <div className="bg-bg-card border border-bg-border rounded-xl p-5">
          <div className="text-xs text-text-muted mb-1">Time to Value</div>
          <div className="text-2xl font-bold text-score-orange">4.2 min</div>
          <div className="text-xs text-text-muted mt-1">median time to first meaningful action</div>
        </div>
      </div>

      <div className="bg-bg-card border border-score-red/30 rounded-xl p-4">
        <span className="text-xs font-medium text-score-red">🔴 Critical Gap</span>
        <p className="text-xs text-text-secondary mt-1">
          No product analytics access. Need Mixpanel/Amplitude connection to get real activation, retention, and payment data.
          Currently showing estimates based on cohort table.
        </p>
      </div>
    </div>
  );
}
