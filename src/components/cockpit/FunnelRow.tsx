import QualityBadge from './QualityBadge';

export interface FunnelMetrics {
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  signups_est: number | null;
  engagement_est: number | null;
  paying_est: number | null;
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
    signups_est, engagement_est, paying_est,
    ad_quality, lp_quality, product_score,
  } = metrics;

  // CVR: clicks → signups
  const cvrClicksToSignups = pct(signups_est, clicks);
  // CVR: signups → engagement
  const cvrSignupsToEngagement = pct(engagement_est, signups_est);
  // CVR: engagement → paying
  const cvrEngagementToPaying = pct(paying_est, engagement_est);

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

      {/* CVR clicks → signups */}
      <Arrow />
      <RateCell rate={cvrClicksToSignups} />
      <Arrow />

      {/* Signups */}
      <MetricCell
        value={signups_est !== null ? fmt(signups_est) : '—'}
        label="Signups"
        dim={signups_est === null}
      />

      {/* LP Quality badge */}
      {showQuality && (
        <>
          <div className="w-px h-8 bg-bg-border mx-1" />
          <QualityBadge score={lp_quality} label="LP Quality" />
          <div className="w-px h-8 bg-bg-border mx-1" />
        </>
      )}

      {/* CVR signups → engagement */}
      <Arrow />
      <RateCell rate={cvrSignupsToEngagement} />
      <Arrow />

      {/* Engagement */}
      <MetricCell
        value={engagement_est !== null ? fmt(engagement_est) : '—'}
        label="Engaged"
        dim={engagement_est === null}
      />

      {/* CVR engagement → paying */}
      <Arrow />
      <RateCell rate={cvrEngagementToPaying} />
      <Arrow />

      {/* Paying */}
      <MetricCell
        value={paying_est !== null ? fmt(paying_est) : '—'}
        label="Paying"
        dim={paying_est === null}
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
