'use client';
import DuckIcon from '@/components/ui/DuckIcon';

export default function ProductPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <DuckIcon color="#6B7280" size={48} />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Product</h1>
          <p className="text-xs text-text-muted mt-1">The promise delivery. Signup → Activation → Paying.</p>
        </div>
      </div>

      <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center mb-6">
        <DuckIcon color="#6B7280" size={80} className="mx-auto mb-4 opacity-40" />
        <h2 className="text-lg font-semibold text-text-primary mb-2">No Data Connected</h2>
        <p className="text-sm text-text-muted max-w-md mx-auto">
          Product funnel metrics require access to product analytics and billing systems for activation, retention, and TROI calculations.
        </p>
      </div>

      <div className="bg-bg-card border border-score-red/30 rounded-xl p-4">
        <span className="text-xs font-medium text-score-red">🔴 Critical Integrations</span>
        <ul className="mt-2 space-y-1 text-xs text-text-secondary">
          <li>• <strong>Mixpanel/Amplitude</strong> — signup-to-activation, day-7 retention, time to value</li>
          <li>• <strong>Billing/Payment API</strong> — activation-to-paying conversion, TROI calculation</li>
          <li>• <strong>BigQuery</strong> — cohort-level product engagement data</li>
        </ul>
      </div>
    </div>
  );
}
