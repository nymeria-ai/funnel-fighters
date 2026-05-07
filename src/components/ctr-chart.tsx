"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CtrChartDataPoint {
  name: string;
  ctr: number;       // e.g. 3.42 (already %)
  impressions: number;
  clicks: number;
}

interface CtrChartProps {
  data: CtrChartDataPoint[];
}

// ── Custom tooltip ─────────────────────────────────────────────────────────────
// Recharts v3 passes tooltip props as a plain object via the `content` render prop.
// We use an explicit interface rather than TooltipProps/TooltipContentProps to avoid
// version-specific type mismatches.

interface TooltipRenderProps {
  active?: boolean;
  payload?: Array<{ payload: CtrChartDataPoint }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipRenderProps) {
  if (!active || !payload || payload.length === 0) return null;

  const d = payload[0]?.payload;
  if (!d) return null;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-zinc-100 mb-2">{label}</p>
      <div className="space-y-1 text-zinc-400">
        <div className="flex items-center justify-between gap-6">
          <span>CTR</span>
          <span className="font-mono font-semibold text-[#5DCAA5]">{d.ctr.toFixed(2)}%</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span>Impressions</span>
          <span className="font-mono text-zinc-300">{d.impressions.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span>Clicks</span>
          <span className="font-mono text-zinc-300">{d.clicks.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CtrChart({ data }: CtrChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-600 text-sm">
        No CTR data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        barCategoryGap="30%"
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#3f3f46" /* zinc-700 */
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fill: "#a1a1aa", fontSize: 12 }}
          axisLine={{ stroke: "#3f3f46" }}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v: number) => `${v}%`}
          tick={{ fill: "#a1a1aa", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={42}
        />
        <Tooltip
          content={(props) => <CustomTooltip {...(props as unknown as TooltipRenderProps)} />}
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
        />
        <Bar
          dataKey="ctr"
          fill="#5DCAA5"
          radius={[4, 4, 0, 0]}
          maxBarSize={56}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
