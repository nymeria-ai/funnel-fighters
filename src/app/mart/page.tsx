import { query } from "@/lib/db";
import Link from "next/link";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SummaryRow {
  total_spend: string;
  total_signups: string;
  total_paying_28d: string;
  total_collection_28d: string;
  total_arr_lifetime: string;
  total_rows: string;
  min_day: string;
  max_day: string;
}

interface ChannelRow {
  channel: string;
  spend: string;
  signups: string;
  collection_28d: string;
  paying_28d: string;
  campaigns: string;
  avg_ctr: string;
  avg_cost_per_signup: string;
}

interface TierRow {
  priority_tier: string;
  cnt: string;
  spend: string;
  signups: string;
}

interface DailyRow {
  day: string;
  spend: string;
  signups: string;
}

interface CampaignRow {
  campaign: string;
  channel: string;
  spend: string;
  signups: string;
  collection_28d: string;
  paying_28d: string;
  priority_tier: string;
  cost_per_signup: string;
  arr_proxy_per_spend: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number | null, decimals = 0): string {
  if (n === null || isNaN(n)) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtUSD(n: number | null, decimals = 0): string {
  if (n === null || isNaN(n)) return "—";
  return "$" + fmt(n, decimals);
}

function tierColor(tier: string) {
  switch (tier) {
    case "T1_CUT": return { bg: "#fef2f2", text: "#991b1b" };
    case "T2_SCALE": return { bg: "#E1F5EE", text: "#085041" };
    case "T3_OPTIMIZE_QS": return { bg: "#FAEEDA", text: "#633806" };
    case "T4_MONITOR": return { bg: "#F1EFE8", text: "#444441" };
    default: return { bg: "#F1EFE8", text: "#444441" };
  }
}

// ── Components ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-medium">{label}</span>
      <span className="text-2xl font-bold text-zinc-100">{value}</span>
      {sub && <span className="text-xs text-zinc-500">{sub}</span>}
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const c = tierColor(tier || "unknown");
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
      style={{ background: c.bg, color: c.text }}
    >
      {tier || "—"}
    </span>
  );
}

// ── Bar chart (simple CSS) ────────────────────────────────────────────────────

function SparkBar({ data, label }: { data: { day: string; value: number }[]; label: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">{label}</span>
      <div className="flex items-end gap-[2px] h-24 mt-2">
        {data.map((d) => (
          <div
            key={d.day}
            className="flex-1 rounded-t bg-indigo-500/80 hover:bg-indigo-400 transition-colors relative group"
            style={{ height: `${(d.value / max) * 100}%`, minWidth: 3 }}
            title={`${d.day}: ${fmtUSD(d.value)}`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-zinc-600">{data[0]?.day}</span>
        <span className="text-[10px] text-zinc-600">{data[data.length - 1]?.day}</span>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{
    channel?: string;
    tier?: string;
    from?: string;
    to?: string;
  }>;
}

export default async function MartPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const channelFilter = params.channel ?? "all";
  const tierFilter = params.tier ?? "all";
  const fromDate = params.from ?? "";
  const toDate = params.to ?? "";

  // Build WHERE
  const clauses: string[] = [];
  const qp: unknown[] = [];
  let pi = 1;
  if (channelFilter !== "all") { clauses.push(`channel = $${pi++}`); qp.push(channelFilter); }
  if (tierFilter !== "all") { clauses.push(`priority_tier = $${pi++}`); qp.push(tierFilter); }
  if (fromDate) { clauses.push(`day >= $${pi++}::date`); qp.push(fromDate); }
  if (toDate) { clauses.push(`day <= $${pi++}::date`); qp.push(toDate); }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  // Queries
  let summary: SummaryRow[] = [];
  let channels: ChannelRow[] = [];
  let tiers: TierRow[] = [];
  let daily: DailyRow[] = [];
  let campaigns: CampaignRow[] = [];
  let allChannels: string[] = [];
  let allTiers: string[] = [];
  let hasData = false;

  try {
    [summary, channels, tiers, daily, campaigns] = await Promise.all([
      query<SummaryRow>(
        `SELECT
          COALESCE(SUM(spend),0) as total_spend,
          COALESCE(SUM(hard_signups_n),0) as total_signups,
          COALESCE(SUM(paying_28d_n),0) as total_paying_28d,
          COALESCE(SUM(collection_28d),0) as total_collection_28d,
          COALESCE(SUM(arr_lifetime),0) as total_arr_lifetime,
          COUNT(*) as total_rows,
          MIN(day) as min_day,
          MAX(day) as max_day
        FROM campaign_metrics ${where}`, qp
      ),
      query<ChannelRow>(
        `SELECT channel,
          SUM(spend) as spend,
          SUM(hard_signups_n) as signups,
          SUM(collection_28d) as collection_28d,
          SUM(paying_28d_n) as paying_28d,
          COUNT(DISTINCT campaign) as campaigns,
          AVG(ctr) as avg_ctr,
          CASE WHEN SUM(hard_signups_n) > 0 THEN SUM(spend)/SUM(hard_signups_n) ELSE NULL END as avg_cost_per_signup
        FROM campaign_metrics ${where}
        GROUP BY channel ORDER BY SUM(COALESCE(spend,0)) DESC`, qp
      ),
      query<TierRow>(
        `SELECT priority_tier, COUNT(*) as cnt, SUM(spend) as spend, SUM(hard_signups_n) as signups
        FROM campaign_metrics ${where}
        GROUP BY priority_tier ORDER BY cnt DESC`, qp
      ),
      query<DailyRow>(
        `SELECT day::text, SUM(spend) as spend, SUM(hard_signups_n) as signups
        FROM campaign_metrics ${where}
        GROUP BY day ORDER BY day`, qp
      ),
      query<CampaignRow>(
        `SELECT campaign, channel,
          SUM(spend) as spend,
          SUM(hard_signups_n) as signups,
          SUM(collection_28d) as collection_28d,
          SUM(paying_28d_n) as paying_28d,
          MAX(priority_tier) as priority_tier,
          CASE WHEN SUM(hard_signups_n) > 0 THEN SUM(spend)/SUM(hard_signups_n) ELSE NULL END as cost_per_signup,
          AVG(arr_proxy_per_spend) as arr_proxy_per_spend
        FROM campaign_metrics ${where}
        GROUP BY campaign, channel
        ORDER BY SUM(COALESCE(spend,0)) DESC
        LIMIT 100`, qp
      ),
    ]);

    // Get all filter options (unfiltered)
    const channelOpts = await query<{ channel: string }>("SELECT DISTINCT channel FROM campaign_metrics ORDER BY channel");
    allChannels = channelOpts.map((r) => r.channel);
    const tierOpts = await query<{ priority_tier: string }>("SELECT DISTINCT priority_tier FROM campaign_metrics WHERE priority_tier IS NOT NULL ORDER BY priority_tier");
    allTiers = tierOpts.map((r) => r.priority_tier);
    hasData = Number(summary[0]?.total_rows || 0) > 0;
  } catch {
    // Table may not exist yet
  }

  const s = summary[0];

  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-100">Mart Analytics</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Campaign performance from Snowflake DWH
            {hasData && ` · ${String(s.min_day).slice(0,10)} → ${String(s.max_day).slice(0,10)} · ${fmt(Number(s.total_rows))} rows`}
          </p>
        </div>
        <Link href="/consistency" className="text-xs text-indigo-400 hover:text-indigo-300">
          ← Consistency View
        </Link>
      </div>

      {!hasData ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-zinc-300 font-medium">No mart data loaded yet</p>
          <p className="text-zinc-600 text-xs mt-1">Run: node scripts/import-mart.mjs</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <form className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Channel</label>
              <select name="channel" defaultValue={channelFilter}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200"

              >
                <option value="all">All Channels</option>
                {allChannels.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">Priority Tier</label>
              <select name="tier" defaultValue={tierFilter}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200"
              >
                <option value="all">All Tiers</option>
                {allTiers.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">From</label>
              <input type="date" name="from" defaultValue={fromDate}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-1">To</label>
              <input type="date" name="to" defaultValue={toDate}
                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200" />
            </div>
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded text-sm font-medium">
              Apply
            </button>
          </form>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <StatCard label="Total Spend" value={fmtUSD(Number(s.total_spend))} />
            <StatCard label="Hard Signups" value={fmt(Number(s.total_signups))} />
            <StatCard label="Paying 28d" value={fmt(Number(s.total_paying_28d))} />
            <StatCard label="Collection 28d" value={fmtUSD(Number(s.total_collection_28d))} />
            <StatCard label="ARR Lifetime" value={fmtUSD(Number(s.total_arr_lifetime))} />
            <StatCard label="CPS"
              value={Number(s.total_signups) > 0
                ? fmtUSD(Number(s.total_spend) / Number(s.total_signups), 2)
                : "—"}
              sub="Cost per signup"
            />
          </div>

          {/* Daily Spend Trend */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
            <SparkBar
              data={daily.map((d) => ({ day: d.day, value: Number(d.spend) }))}
              label="Daily Spend"
            />
          </div>

          {/* Priority Tiers */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">Priority Tiers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {tiers.map((t) => (
                <div key={t.priority_tier} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                  <TierBadge tier={t.priority_tier} />
                  <div className="mt-2 text-lg font-bold text-zinc-100">{fmt(Number(t.cnt))}</div>
                  <div className="text-xs text-zinc-500">
                    {fmtUSD(Number(t.spend))} spend · {fmt(Number(t.signups))} signups
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Channel Breakdown */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">Channel Breakdown</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Channel</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Spend</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Signups</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">CPS</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Collection 28d</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Paying 28d</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Campaigns</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {channels.map((c) => (
                    <tr key={c.channel} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-zinc-200">{c.channel}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmtUSD(Number(c.spend))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmt(Number(c.signups))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{c.avg_cost_per_signup ? fmtUSD(Number(c.avg_cost_per_signup), 2) : "—"}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmtUSD(Number(c.collection_28d))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmt(Number(c.paying_28d))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-400">{fmt(Number(c.campaigns))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Campaigns */}
          <div>
            <h2 className="text-sm font-semibold text-zinc-300 mb-3">Top 100 Campaigns by Spend</h2>
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Campaign</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase">Channel</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Spend</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Signups</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">CPS</th>
                    <th className="px-4 py-2.5 text-right text-xs font-medium text-zinc-500 uppercase">Collection 28d</th>
                    <th className="px-4 py-2.5 text-center text-xs font-medium text-zinc-500 uppercase">Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {campaigns.map((c, i) => (
                    <tr key={`${c.campaign}-${i}`} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-2.5 text-zinc-200 max-w-[300px] truncate font-mono text-xs">{c.campaign}</td>
                      <td className="px-4 py-2.5 text-zinc-400 text-xs">{c.channel}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmtUSD(Number(c.spend))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmt(Number(c.signups))}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{c.cost_per_signup ? fmtUSD(Number(c.cost_per_signup), 2) : "—"}</td>
                      <td className="px-4 py-2.5 text-right text-zinc-300">{fmtUSD(Number(c.collection_28d))}</td>
                      <td className="px-4 py-2.5 text-center"><TierBadge tier={c.priority_tier} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
