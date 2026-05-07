import Link from "next/link";
import { query } from "@/lib/db";
import type { FunnelMetricsRow } from "@/lib/types";
import { CtrChart, type CtrChartDataPoint } from "@/components/ctr-chart";
import { FunnelTable } from "@/components/funnel-table";

// ── Page props ────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{
    audience?: string;
    channel?: string;
    sp?: string;
    range?: string;
  }>;
}

// ── DB row shapes ─────────────────────────────────────────────────────────────

interface AdMetricsRow {
  audience_segment_id: string;
  channel: string;
  audience_name: string;
  keyword_or_adset: string | null;
  total_impressions: string; // numeric comes back as string from neon
  total_clicks: string;
  ctr: string;
}

interface LpMetricsRow {
  audience_segment_id: string;
  avg_scroll_depth: string;
  bounce_rate: string;
  cvr: string;
  sessions: string;
}

interface OnboardingMetricsRow {
  audience_segment_id: string;
  total_signups: string;
  day2_returnees: string;
  day2_rate: string;
}

interface FunnelPathMetricsRow {
  audience_segment_id: string;
  consistency_score: number | null;
  funnel_path_id: string;
}

interface SummaryMetrics {
  adCtr: number | null;
  lpEngagement: number | null;
  lpCvr: number | null;
  day2Rate: number | null;
}

// ── Helper ────────────────────────────────────────────────────────────────────

function parseNum(v: string | number | null | undefined): number {
  if (v === null || v === undefined) return 0;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return isNaN(n) ? 0 : n;
}

// ── Summary card ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  subtitle,
  highlight,
}: {
  label: string;
  value: string;
  subtitle: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">{label}</span>
      <span
        className="text-3xl font-bold tabular-nums leading-tight"
        style={{ color: highlight ? "#5DCAA5" : "#e4e4e7" }}
      >
        {value}
      </span>
      <span className="text-xs text-zinc-600 leading-tight">{subtitle}</span>
    </div>
  );
}

// ── Section heading ────────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
      {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function QuantitativePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const audienceFilter = params.audience ?? "all";
  const channelFilter = params.channel ?? "all";
  // const spFilter = params.sp ?? "all"; // available for future use
  // const range = params.range ?? "30d"; // available for future use

  // ── Build WHERE clause fragments ───────────────────────────────────────────

  const adWhere: string[] = [];
  const adParams: unknown[] = [];
  let pi = 1;

  if (audienceFilter !== "all") {
    adWhere.push(`av.audience_segment_id = $${pi++}`);
    adParams.push(audienceFilter);
  }
  if (channelFilter !== "all") {
    adWhere.push(`av.channel = $${pi++}`);
    adParams.push(channelFilter);
  }

  const adWhereSQL = adWhere.length > 0 ? `WHERE ${adWhere.join(" AND ")}` : "";

  // Separate params for other queries that filter on audience_segment_id
  const segWhere: string[] = [];
  const segParams: unknown[] = [];
  let si = 1;
  if (audienceFilter !== "all") {
    segWhere.push(`audience_segment_id = $${si++}`);
    segParams.push(audienceFilter);
  }
  const segWhereSQL = segWhere.length > 0 ? `WHERE ${segWhere.join(" AND ")}` : "";

  // ── 1. Ad variant metrics ──────────────────────────────────────────────────

  let adMetrics: AdMetricsRow[] = [];
  try {
    adMetrics = await query<AdMetricsRow>(
      `
      SELECT
        av.audience_segment_id,
        av.channel,
        COALESCE(aud.name, av.audience_segment_id::text) AS audience_name,
        COALESCE(aud.keyword, aud.targeting_type::text)  AS keyword_or_adset,
        SUM(av.impressions)::text                         AS total_impressions,
        SUM(av.clicks)::text                              AS total_clicks,
        CASE
          WHEN SUM(av.impressions) = 0 THEN '0'
          ELSE (SUM(av.clicks)::numeric / SUM(av.impressions) * 100)::text
        END                                               AS ctr
      FROM ad_variants av
      LEFT JOIN audience_segments aud ON aud.id = av.audience_segment_id
      ${adWhereSQL}
      GROUP BY
        av.audience_segment_id,
        av.channel,
        aud.name,
        aud.keyword,
        aud.targeting_type
      ORDER BY ctr DESC
      `,
      adParams
    );
  } catch {
    // Table not yet seeded — graceful degradation
  }

  // ── 2. LP session metrics ──────────────────────────────────────────────────

  let lpMetrics: LpMetricsRow[] = [];
  try {
    lpMetrics = await query<LpMetricsRow>(
      `
      SELECT
        audience_segment_id,
        AVG(scroll_depth_pct)::text                               AS avg_scroll_depth,
        (COUNT(*) FILTER (WHERE bounced) ::numeric / COUNT(*))::text AS bounce_rate,
        (COUNT(*) FILTER (WHERE converted) ::numeric / COUNT(*))::text AS cvr,
        COUNT(*)::text                                             AS sessions
      FROM lp_sessions
      ${segWhereSQL}
      GROUP BY audience_segment_id
      `,
      segParams
    );
  } catch {
    // Table not yet seeded — graceful degradation
  }

  // ── 3. Onboarding / DAU metrics ────────────────────────────────────────────

  let onboardingMetrics: OnboardingMetricsRow[] = [];
  let adVariantAudMap: Record<string, string> = {};

  try {
    // user_onboarding_events doesn't have audience_segment_id directly;
    // we join via ad_variants to get it.
    const obWhere: string[] = [];
    const obParams: unknown[] = [];
    let oi = 1;
    if (audienceFilter !== "all") {
      obWhere.push(`av.audience_segment_id = $${oi++}`);
      obParams.push(audienceFilter);
    }
    const obWhereSQL = obWhere.length > 0 ? `WHERE ${obWhere.join(" AND ")}` : "";

    onboardingMetrics = await query<OnboardingMetricsRow>(
      `
      SELECT
        av.audience_segment_id,
        COUNT(uoe.id)::text                                              AS total_signups,
        COUNT(uoe.id) FILTER (WHERE uoe.day2_returned)::text            AS day2_returnees,
        CASE
          WHEN COUNT(uoe.id) = 0 THEN '0'
          ELSE (COUNT(uoe.id) FILTER (WHERE uoe.day2_returned)::numeric / COUNT(uoe.id))::text
        END                                                              AS day2_rate
      FROM user_onboarding_events uoe
      JOIN ad_variants av ON av.id = uoe.ad_variant_id
      ${obWhereSQL}
      GROUP BY av.audience_segment_id
      `,
      obParams
    );

    // Build a map from audience_segment_id -> audience_segment_id for the join below
    adVariantAudMap = Object.fromEntries(
      onboardingMetrics.map((r) => [r.audience_segment_id, r.audience_segment_id])
    );
  } catch {
    // graceful degradation
  }

  // ── 4. Funnel path consistency scores ──────────────────────────────────────

  let fpMetrics: FunnelPathMetricsRow[] = [];
  try {
    const fpWhere: string[] = [];
    const fpParams: unknown[] = [];
    let fpi = 1;
    if (audienceFilter !== "all") {
      fpWhere.push(`audience_segment_id = $${fpi++}`);
      fpParams.push(audienceFilter);
    }
    const fpWhereSQL = fpWhere.length > 0 ? `WHERE ${fpWhere.join(" AND ")}` : "";

    fpMetrics = await query<FunnelPathMetricsRow>(
      `
      SELECT
        audience_segment_id,
        consistency_score,
        id AS funnel_path_id
      FROM funnel_paths
      ${fpWhereSQL}
      ORDER BY consistency_score DESC NULLS LAST
      `,
      fpParams
    );
  } catch {
    // graceful degradation
  }

  // ── 5. Build summary metrics ───────────────────────────────────────────────

  // Ad CTR: sum clicks / sum impressions across all filtered ad rows
  let totalImpressions = 0;
  let totalClicks = 0;
  for (const r of adMetrics) {
    totalImpressions += parseNum(r.total_impressions);
    totalClicks += parseNum(r.total_clicks);
  }
  const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : null;

  // LP engagement: global avg scroll depth
  let scrollSum = 0;
  let scrollCount = 0;
  for (const r of lpMetrics) {
    const sessions = parseNum(r.sessions);
    scrollSum += parseNum(r.avg_scroll_depth) * sessions;
    scrollCount += sessions;
  }
  const overallScrollDepth = scrollCount > 0 ? scrollSum / scrollCount : null;

  // LP CVR: weighted average
  let cvrSum = 0;
  let cvrCount = 0;
  for (const r of lpMetrics) {
    const sessions = parseNum(r.sessions);
    cvrSum += parseNum(r.cvr) * sessions;
    cvrCount += sessions;
  }
  const overallCvr = cvrCount > 0 ? cvrSum / cvrCount : null;

  // Day-2 rate: weighted average
  let day2Sum = 0;
  let day2Count = 0;
  for (const r of onboardingMetrics) {
    const signups = parseNum(r.total_signups);
    day2Sum += parseNum(r.day2_rate) * signups;
    day2Count += signups;
  }
  const overallDay2 = day2Count > 0 ? day2Sum / day2Count : null;

  const summary: SummaryMetrics = {
    adCtr: overallCtr,
    lpEngagement: overallScrollDepth,
    lpCvr: overallCvr,
    day2Rate: overallDay2,
  };

  // ── 6. CTR chart data ──────────────────────────────────────────────────────

  const ctrChartData: CtrChartDataPoint[] = adMetrics.map((r) => ({
    name: `${r.audience_name} / ${r.channel}`,
    ctr: parseNum(r.ctr),
    impressions: parseNum(r.total_impressions),
    clicks: parseNum(r.total_clicks),
  }));

  // ── 7. Build funnel table rows ─────────────────────────────────────────────

  // Index LP and onboarding metrics by audience_segment_id
  const lpByAud = Object.fromEntries(lpMetrics.map((r) => [r.audience_segment_id, r]));
  const obByAud = Object.fromEntries(onboardingMetrics.map((r) => [r.audience_segment_id, r]));

  // Best consistency score per audience segment
  const fpByAud: Record<string, FunnelPathMetricsRow> = {};
  for (const fp of fpMetrics) {
    if (
      !fpByAud[fp.audience_segment_id] ||
      (fp.consistency_score ?? -1) > (fpByAud[fp.audience_segment_id].consistency_score ?? -1)
    ) {
      fpByAud[fp.audience_segment_id] = fp;
    }
  }

  const tableRows: FunnelMetricsRow[] = adMetrics.map((r) => {
    const audId = r.audience_segment_id;
    const lp = lpByAud[audId];
    const ob = obByAud[audId];
    const fp = fpByAud[audId];

    const impressions = parseNum(r.total_impressions);
    const clicks = parseNum(r.total_clicks);
    const sessions = parseNum(lp?.sessions);

    return {
      audience_id: audId,
      audience_name: r.audience_name,
      channel: r.channel as FunnelMetricsRow["channel"],
      keyword_or_adset: r.keyword_or_adset ?? "",
      impressions,
      clicks,
      ctr: parseNum(r.ctr) / 100, // store as decimal
      ctr_delta: 0,
      sessions,
      avg_session_duration: 0,
      scroll_depth: parseNum(lp?.avg_scroll_depth),
      bounce_rate: parseNum(lp?.bounce_rate),
      cta_click_rate: 0,
      conversions: Math.round(parseNum(lp?.cvr) * sessions),
      cvr: parseNum(lp?.cvr),
      cvr_delta: 0,
      signups: parseNum(ob?.total_signups),
      day2_returnees: parseNum(ob?.day2_returnees),
      day2_rate: parseNum(ob?.day2_rate),
      day2_delta: 0,
      consistency_score: fp?.consistency_score ?? null,
      funnel_path_id: fp?.funnel_path_id ?? null,
    };
  });

  // ── Render ─────────────────────────────────────────────────────────────────

  const fmt = (v: number | null, decimals = 1, suffix = "%") =>
    v === null ? "—" : `${v.toFixed(decimals)}${suffix}`;

  return (
    <div className="space-y-8">
      {/* ── Tab bar ── */}
      <div className="flex items-center gap-1 border-b border-zinc-800 -mt-1">
        {/* Inactive: Qualitative */}
        <Link
          href="/consistency"
          className="relative px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
        >
          Qualitative
        </Link>

        {/* Active: Quantitative */}
        <div className="relative px-4 py-2.5 text-sm font-semibold cursor-default select-none">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold"
            style={{ background: "#E1F5EE", color: "#085041" }}
          >
            Quantitative
          </span>
          {/* Active underline */}
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
            style={{ background: "#085041" }}
          />
        </div>
      </div>

      {/* ── Summary metric cards ── */}
      <section>
        <SectionHeading
          title="Performance Summary"
          subtitle="Aggregate metrics across all funnel stages"
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <MetricCard
            label="Ad CTR"
            value={fmt(summary.adCtr, 2)}
            subtitle="Clicks / impressions across all ad variants"
            highlight={summary.adCtr !== null && summary.adCtr >= 2}
          />
          <MetricCard
            label="LP Engagement Score"
            value={fmt(summary.lpEngagement, 1)}
            subtitle="Avg scroll depth across all LP sessions"
            highlight={summary.lpEngagement !== null && summary.lpEngagement >= 60}
          />
          <MetricCard
            label="LP Conversion Rate"
            value={fmt(summary.lpCvr !== null ? summary.lpCvr * 100 : null, 2)}
            subtitle="Sessions that converted on the landing page"
            highlight={summary.lpCvr !== null && summary.lpCvr >= 0.03}
          />
          <MetricCard
            label="Day-2 DAU Rate"
            value={fmt(summary.day2Rate !== null ? summary.day2Rate * 100 : null, 1)}
            subtitle="Signed-up users who returned the next day"
            highlight={summary.day2Rate !== null && summary.day2Rate >= 0.3}
          />
        </div>
      </section>

      {/* ── CTR breakdown bar chart ── */}
      <section>
        <SectionHeading
          title="CTR Breakdown by Audience / Channel"
          subtitle={
            ctrChartData.length === 0
              ? "No ad variant data available yet"
              : `${ctrChartData.length} audience–channel combination${ctrChartData.length !== 1 ? "s" : ""}`
          }
        />
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-5">
          <CtrChart data={ctrChartData} />
        </div>
      </section>

      {/* ── Full funnel breakdown table ── */}
      <section className="pb-8">
        <SectionHeading
          title="Full Funnel Breakdown"
          subtitle={`${tableRows.length} row${tableRows.length !== 1 ? "s" : ""} — one per audience × channel combination. Click a row to see qualitative detail.`}
        />
        <FunnelTable rows={tableRows} />
      </section>
    </div>
  );
}
