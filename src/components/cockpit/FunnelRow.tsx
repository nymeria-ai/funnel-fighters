import QualityBadge from './QualityBadge';

export interface FunnelMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  hard_signups: number | null;
  engaged_2nd_day: number | null;
  paying: number | null;
  ad_quality: number | null;
  lp_quality: number | null;
  product_score: number | null;
}

export function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export function fmtCost(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function pct(num: number | null, den: number | null): string {
  if (num === null || den === null || den === 0) return '—';
  return `${((num / den) * 100).toFixed(2)}%`;
}

function Arrow() {
  return <span className="text-text-muted text-xs select-none">→</span>;
}

function MetricCell({ value, label, dim }: { value: string; label?: string; dim?: boolean }) {
  return (
    <div className="flex flex-col items-center min-w-[56px]">
      <span className={`text-sm font-semibold tabular-nums ${dim ? 'text-text-muted' : 'text-text-primary'}`}>
        {value}
      </span>
      {label && <span className="text-[9px] text-text-muted uppercase tracking-wider mt-0.5">{label}</span>}
    </div>
  );
}

function RateCell({ rate }: { rate: string }) {
  return (
    <div className="flex flex-col items-center min-w-[48px]">
      <span className="text-xs font-medium text-text-secondary tabular-nums">{rate}</span>
    </div>
  );
}

interface FunnelRowProps {
  metrics: FunnelMetrics;
  /** If true, show quality badges (channel level). Drill-down rows skip them. */
  showQuality?: boolean;
  /** Indent level for drill-down rows */
  indent?: number;
}

export default function FunnelRow({ metrics, showQuality = true, indent = 0 }: FunnelRowProps) {
  const {
    impressions, clicks, ctr, cost,
    hard_signups, engaged_2nd_day, paying,
    ad_quality, lp_quality, product_score,
  } = metrics;

  // CVR: clicks → hard signups (LP conversion rate)
  const cvrClicksToSignups = pct(hard_signups, clicks);
  // CVR: hard signups → 2nd day engaged
  const cvrSignupsToEngagement = pct(engaged_2nd_day, hard_signups);
  // CVR: engaged → paying
  const cvrEngagementToPaying = pct(paying, engaged_2nd_day);

  return (
    <div
      className="flex items-center gap-2 px-4 py-3 flex-nowrap overflow-x-auto"
      style={{ paddingLeft: indent ? `${indent * 24 + 16}px` : undefined }}
    >
      {/* Impressions */}
      <MetricCell value={fmt(impressions)} label="Impr" />
      <Arrow />

      {/* CTR */}
      <RateCell rate={`${ctr.toFixed(2)}%`} />
      <Arrow />

      {/* Clicks */}
      <MetricCell value={fmt(clicks)} label="Clicks" />

      {/* Cost inline */}
      <span className="text-[10px] text-text-muted whitespace-nowrap">({fmtCost(cost)})</span>

      {/* Ad Quality badge */}
      {showQuality && (
        <>
          <div className="w-px h-8 bg-bg-border mx-1" />
          <QualityBadge score={ad_quality} label="Ad Quality" />
          <div className="w-px h-8 bg-bg-border mx-1" />
        </>
      )}

      {/* CVR clicks → hard signups */}
      <Arrow />
      <RateCell rate={cvrClicksToSignups} />
      <Arrow />

      {/* Hard Signups */}
      <MetricCell
        value={hard_signups !== null ? fmt(hard_signups) : '—'}
        label="H.Signups"
        dim={hard_signups === null}
      />

      {/* LP Quality badge */}
      {showQuality && (
        <>
          <div className="w-px h-8 bg-bg-border mx-1" />
          <QualityBadge score={lp_quality} label="LP Quality" />
          <div className="w-px h-8 bg-bg-border mx-1" />
        </>
      )}

      {/* CVR hard signups → 2nd day engaged */}
      <Arrow />
      <RateCell rate={cvrSignupsToEngagement} />
      <Arrow />

      {/* 2nd Day DAU */}
      <MetricCell
        value={engaged_2nd_day !== null ? fmt(engaged_2nd_day) : '—'}
        label="2nd Day"
        dim={engaged_2nd_day === null}
      />

      {/* CVR engaged → paying */}
      <Arrow />
      <RateCell rate={cvrEngagementToPaying} />
      <Arrow />

      {/* Paying */}
      <MetricCell
        value={paying !== null ? fmt(paying) : '—'}
        label="Paying"
        dim={paying === null}
      />

      {/* Product Score badge */}
      {showQuality && (
        <>
          <div className="w-px h-8 bg-bg-border mx-1" />
          <QualityBadge score={product_score} label="Product" />
        </>
      )}
    </div>
  );
}
