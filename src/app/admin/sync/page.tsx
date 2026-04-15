'use client';
import { useState, useEffect } from 'react';

interface TableStatus {
  rows: number;
  lastUpdated: string | null;
}

const SYNC_COMMAND = `claude -p "Query BigBrain via Kremer MCP for the last 30 days of funnel data (adwords sources, signup_flow record_source) and POST each result set to the Funnel Fighters sync endpoint. Run these 3 queries against bigbrain.l3.fact_tof_visits_daily:

1. LP Funnel: GROUP BY visit_campaign_name, visit_landing_page, device → POST as type 'lp_funnel' with fields: campaign_name, landing_page, device, visits, get_started, gs_rate

2. Product Funnel: GROUP BY visit_campaign_name, visit_landing_page, device, lp_product, signup_product, installed_product → POST as type 'product_funnel' with fields: campaign_name, landing_page, device, lp_product, signup_product, installed_product, soft_signups, hard_signups, payers_28d, acv_28d

3. Weekly Cohorts: GROUP BY DATE_TRUNC(week, day), device → POST as type 'weekly' with fields: week_start, device, visits, get_started, soft_signups, hard_signups, payers_28d, acv_28d

POST to: /api/admin/sync-funnel with Authorization Bearer header using ADMIN_SYNC_SECRET env var. Report row counts when done."`;

function formatDate(d: string | null): string {
  if (!d) return 'Never';
  return new Date(d).toLocaleString();
}

export default function AdminSyncPage() {
  const [status, setStatus] = useState<Record<string, TableStatus> | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const fetchStatus = () => {
    setLoading(true);
    const secret = prompt('Enter ADMIN_SYNC_SECRET to view status:');
    if (!secret) { setLoading(false); return; }

    fetch('/api/admin/sync-funnel', {
      headers: { Authorization: `Bearer ${secret}` },
    })
      .then(r => {
        if (!r.ok) throw new Error('Unauthorized');
        return r.json();
      })
      .then(data => {
        setStatus(data.status);
        setError('');
      })
      .catch(() => setError('Failed to fetch status. Check your ADMIN_SYNC_SECRET.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(SYNC_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = SYNC_COMMAND;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const tables = [
    { key: 'lp_funnel_metrics', label: 'LP Funnel Metrics', desc: 'Visit → Get Started per campaign/LP' },
    { key: 'product_funnel_metrics', label: 'Product Funnel Metrics', desc: 'Signup → Payer + product alignment' },
    { key: 'funnel_weekly', label: 'Weekly Cohorts', desc: 'Roy\'s weekly funnel table' },
    { key: 'duck_scores', label: 'Duck Scores', desc: 'Historical duck scores' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Admin — Funnel Data Sync</h1>
        <p className="text-sm text-text-muted mt-1">
          Sync BigBrain funnel data into the dashboard via Claude Code CLI.
        </p>
      </div>

      {/* Sync Button */}
      <div className="bg-bg-card border border-accent-blue/30 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Sync Now</h3>
            <p className="text-xs text-text-muted mt-1">
              Copy the Claude Code CLI command and paste it in your terminal.
            </p>
          </div>
          <button
            onClick={copyCommand}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              copied
                ? 'bg-score-green/20 text-score-green border border-score-green/30'
                : 'bg-accent-blue text-white hover:bg-accent-blue/80'
            }`}
          >
            {copied ? 'Copied!' : 'Copy CLI Command'}
          </button>
        </div>
        <div className="bg-bg-hover rounded-lg p-3 max-h-32 overflow-y-auto">
          <code className="text-[11px] text-text-secondary whitespace-pre-wrap break-all font-mono">
            {SYNC_COMMAND}
          </code>
        </div>
      </div>

      {/* Table Status */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Sync Status</h3>
          <button
            onClick={fetchStatus}
            className="text-xs text-accent-blue hover:underline"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="text-xs text-score-red mb-3 bg-score-red/10 rounded-lg p-2">{error}</div>
        )}

        <div className="space-y-3">
          {tables.map(t => {
            const s = status?.[t.key];
            return (
              <div key={t.key} className="flex items-center justify-between bg-bg-hover rounded-lg p-3">
                <div>
                  <span className="text-xs font-medium text-text-primary">{t.label}</span>
                  <p className="text-[10px] text-text-muted">{t.desc}</p>
                </div>
                <div className="text-right">
                  {s ? (
                    <>
                      <div className="text-xs text-text-primary font-medium">{s.rows} rows</div>
                      <div className="text-[10px] text-text-muted">{formatDate(s.lastUpdated)}</div>
                    </>
                  ) : (
                    <span className="text-[10px] text-text-muted">{loading ? 'Loading...' : 'No data'}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-bg-card border border-bg-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-3">How It Works</h3>
        <ol className="space-y-2 text-xs text-text-secondary list-decimal list-inside">
          <li>Click <strong>"Copy CLI Command"</strong> above</li>
          <li>Paste into your terminal (Claude Code must be installed)</li>
          <li>Claude queries BigBrain via Kremer MCP for the last 30 days of funnel data</li>
          <li>Data is POSTed to <code className="text-accent-blue">/api/admin/sync-funnel</code> (bearer auth)</li>
          <li>Dashboard reads from Vercel Postgres — pages light up with real data</li>
        </ol>
        <p className="text-xs text-text-muted mt-3">
          Required env var: <code className="text-accent-blue">ADMIN_SYNC_SECRET</code>
        </p>
      </div>
    </div>
  );
}
