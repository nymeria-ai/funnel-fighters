'use client';
import DuckIcon from '@/components/ui/DuckIcon';

export default function AudiencePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <DuckIcon color="#6B7280" size={48} />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Audience</h1>
          <p className="text-xs text-text-muted mt-1">The source. Pure water, murky water, or dirty water?</p>
        </div>
      </div>

      <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center mb-6">
        <DuckIcon color="#6B7280" size={80} className="mx-auto mb-4 opacity-40" />
        <h2 className="text-lg font-semibold text-text-primary mb-2">No Data Connected</h2>
        <p className="text-sm text-text-muted max-w-md mx-auto">
          Audience quality scoring requires BI data pipeline access to segment traffic sources by intent quality.
        </p>
      </div>

      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4">
        <span className="text-xs font-medium text-score-orange">⚡ Required Integrations</span>
        <ul className="mt-2 space-y-1 text-xs text-text-secondary">
          <li>• <strong>Snowflake/Looker</strong> — audience segmentation data (via Ido)</li>
          <li>• <strong>HubSpot</strong> — lead quality and lifecycle data</li>
          <li>• <strong>Google Analytics</strong> — traffic source classification</li>
        </ul>
      </div>
    </div>
  );
}
