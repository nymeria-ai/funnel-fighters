'use client';
import { useState, useEffect, useRef } from 'react';

interface TableStatus extends Record<string, unknown> {
  [table: string]: string | null;
}

function hoursAgo(ts: string | null): number | null {
  if (!ts) return null;
  const ms = Date.now() - new Date(ts).getTime();
  return ms / (1000 * 60 * 60);
}

function badgeColor(hours: number | null): { dot: string; ring: string; label: string } {
  if (hours === null) return { dot: '#6B7280', ring: 'rgba(107,114,128,0.3)', label: 'No data' };
  if (hours < 6) return { dot: '#22C55E', ring: 'rgba(34,197,94,0.25)', label: 'Fresh' };
  if (hours < 24) return { dot: '#EAB308', ring: 'rgba(234,179,8,0.25)', label: 'Aging' };
  return { dot: '#EF4444', ring: 'rgba(239,68,68,0.25)', label: 'Stale' };
}

function formatRelative(ts: string | null): string {
  if (!ts) return 'Never';
  const h = hoursAgo(ts);
  if (h === null) return 'Unknown';
  if (h < 1) return `${Math.round(h * 60)}m ago`;
  if (h < 24) return `${Math.round(h)}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

const TABLE_LABELS: Record<string, string> = {
  accounts: 'Accounts',
  ad_metrics_daily: 'Ad Metrics',
  lp_funnel_metrics: 'LP Funnel',
  product_funnel_metrics: 'Product Funnel',
};

export default function SyncStatusBadge() {
  const [overallLast, setOverallLast] = useState<string | null>(null);
  const [tables, setTables] = useState<TableStatus>({});
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/sync-summary')
      .then((r) => r.json())
      .then((data) => {
        setOverallLast(data.overallLast ?? null);
        setTables(data.tables ?? {});
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const hours = hoursAgo(overallLast);
  const { dot, ring, label } = badgeColor(hours);

  if (!loaded) return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-colors hover:bg-bg-hover text-xs"
        style={{ borderColor: ring, backgroundColor: open ? 'rgba(255,255,255,0.04)' : undefined }}
        title="Sync status — click to expand"
      >
        {/* Pulsing dot */}
        <span className="relative flex h-2 w-2">
          {hours !== null && hours < 6 && (
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
              style={{ backgroundColor: dot }}
            />
          )}
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ backgroundColor: dot }}
          />
        </span>
        <span className="text-text-secondary hidden sm:inline">
          {label}
        </span>
        <span className="text-text-muted">
          {formatRelative(overallLast)}
        </span>
      </button>

      {/* Expandable panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 bg-bg-card border border-bg-border rounded-xl shadow-xl z-50 p-3"
          style={{ boxShadow: `0 0 0 1px ${ring}, 0 8px 32px rgba(0,0,0,0.5)` }}
        >
          <div className="text-[10px] text-text-muted uppercase tracking-wider mb-2 font-semibold">
            Sync Status — Per Table
          </div>
          <div className="space-y-1.5">
            {Object.entries(tables).map(([table, ts]) => {
              const h = hoursAgo(ts);
              const { dot: d } = badgeColor(h);
              return (
                <div key={table} className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {TABLE_LABELS[table] ?? table}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d }} />
                    <span className="text-[11px] text-text-muted">{formatRelative(ts)}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 pt-2 border-t border-bg-border text-[10px] text-text-muted">
            Green: &lt;6h · Yellow: 6–24h · Red: &gt;24h
          </div>
        </div>
      )}
    </div>
  );
}
