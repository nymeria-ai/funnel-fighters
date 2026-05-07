"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { FunnelMetricsRow } from "@/lib/types";

// ── Score helpers ─────────────────────────────────────────────────────────────

function scoreBadgeStyle(score: number | null): React.CSSProperties {
  if (score === null) return { background: "#F1EFE8", color: "#444441" };
  if (score >= 75) return { background: "#E1F5EE", color: "#085041" };
  if (score >= 50) return { background: "#FAEEDA", color: "#633806" };
  return { background: "#fef2f2", color: "#991b1b" };
}

function scoreBadgeLabel(score: number | null): string {
  if (score === null) return "—";
  return String(score);
}

// ── Channel badge ─────────────────────────────────────────────────────────────

const CHANNEL_STYLES: Record<string, { bg: string; text: string }> = {
  search:   { bg: "#1e3a5f", text: "#93c5fd" },
  meta:     { bg: "#1e1b4b", text: "#a5b4fc" },
  youtube:  { bg: "#3f0f0f", text: "#fca5a5" },
  linkedin: { bg: "#0c2340", text: "#7dd3fc" },
};

function ChannelBadge({ channel }: { channel: string }) {
  const s = CHANNEL_STYLES[channel] ?? { bg: "#27272a", text: "#a1a1aa" };
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-md text-xs font-medium capitalize"
      style={{ background: s.bg, color: s.text }}
    >
      {channel}
    </span>
  );
}

// ── Sort icon ─────────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc";

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg className="w-3 h-3 text-zinc-600 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return dir === "asc" ? (
    <svg className="w-3 h-3 text-[#5DCAA5] inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-3 h-3 text-[#5DCAA5] inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ── CSV export ────────────────────────────────────────────────────────────────

function exportCsv(rows: FunnelMetricsRow[]) {
  const headers = [
    "Audience",
    "Channel",
    "KW / Ad set",
    "Impressions",
    "Clicks",
    "CTR%",
    "Bounce rate%",
    "Scroll depth%",
    "CVR%",
    "Day-2 DAU%",
    "Consistency score",
  ];

  const escape = (v: string | number | null) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const body = rows.map((r) =>
    [
      escape(r.audience_name),
      escape(r.channel),
      escape(r.keyword_or_adset),
      escape(r.impressions),
      escape(r.clicks),
      escape((r.ctr * 100).toFixed(2)),
      escape((r.bounce_rate * 100).toFixed(2)),
      escape(r.scroll_depth.toFixed(1)),
      escape((r.cvr * 100).toFixed(2)),
      escape((r.day2_rate * 100).toFixed(2)),
      escape(r.consistency_score ?? ""),
    ].join(",")
  );

  const csv = [headers.join(","), ...body].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `funnel-metrics-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ── Column definitions ────────────────────────────────────────────────────────

type SortableKey =
  | "audience_name"
  | "channel"
  | "keyword_or_adset"
  | "ctr"
  | "bounce_rate"
  | "scroll_depth"
  | "cvr"
  | "day2_rate"
  | "consistency_score";

interface ColDef {
  key: SortableKey;
  label: string;
  align: "left" | "right" | "center";
}

const COLUMNS: ColDef[] = [
  { key: "audience_name",      label: "Audience",          align: "left"   },
  { key: "channel",            label: "Channel",           align: "left"   },
  { key: "keyword_or_adset",   label: "KW / Ad set",       align: "left"   },
  { key: "ctr",                label: "CTR%",              align: "right"  },
  { key: "bounce_rate",        label: "Bounce rate",       align: "right"  },
  { key: "scroll_depth",       label: "Scroll depth",      align: "right"  },
  { key: "cvr",                label: "CVR%",              align: "right"  },
  { key: "day2_rate",          label: "Day-2 DAU%",        align: "right"  },
  { key: "consistency_score",  label: "Consistency",       align: "center" },
];

// ── Score filter options ──────────────────────────────────────────────────────

type ScoreFilter = "all" | "high" | "partial" | "low";

const SCORE_FILTER_LABELS: Record<ScoreFilter, string> = {
  all:     "All scores",
  high:    "High (75+)",
  partial: "Partial (50–74)",
  low:     "Low (<50)",
};

function matchesScoreFilter(score: number | null, filter: ScoreFilter): boolean {
  if (filter === "all") return true;
  if (score === null) return filter === "low";
  if (filter === "high") return score >= 75;
  if (filter === "partial") return score >= 50 && score < 75;
  return score < 50;
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface FunnelTableProps {
  rows: FunnelMetricsRow[];
}

// ── Main component ────────────────────────────────────────────────────────────

export function FunnelTable({ rows }: FunnelTableProps) {
  const router = useRouter();

  const [sortKey, setSortKey] = useState<SortableKey>("consistency_score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [scoreFilter, setScoreFilter] = useState<ScoreFilter>("all");

  const handleSort = (key: SortableKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(
    () => rows.filter((r) => matchesScoreFilter(r.consistency_score, scoreFilter)),
    [rows, scoreFilter]
  );

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];

      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;

      let cmp = 0;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const handleRowClick = (row: FunnelMetricsRow) => {
    const params = new URLSearchParams();
    params.set("audience", row.audience_id);
    params.set("channel", row.channel);
    if (row.keyword_or_adset) params.set("sp", row.keyword_or_adset);
    router.push(`/consistency?${params.toString()}`);
  };

  const pct = (v: number) => `${(v * 100).toFixed(1)}%`;
  const pct2 = (v: number) => `${(v * 100).toFixed(2)}%`;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Score filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">Filter:</span>
          <div className="flex gap-1">
            {(Object.keys(SCORE_FILTER_LABELS) as ScoreFilter[]).map((f) => {
              const active = scoreFilter === f;
              let style: React.CSSProperties = {};
              if (active && f === "all") style = { background: "#3f3f46", color: "#e4e4e7" };
              else if (active && f === "high") style = { background: "#E1F5EE", color: "#085041" };
              else if (active && f === "partial") style = { background: "#FAEEDA", color: "#633806" };
              else if (active && f === "low") style = { background: "#fef2f2", color: "#991b1b" };

              return (
                <button
                  key={f}
                  onClick={() => setScoreFilter(f)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors border ${
                    active
                      ? "border-transparent"
                      : "border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600"
                  }`}
                  style={active ? style : undefined}
                >
                  {SCORE_FILTER_LABELS[f]}
                </button>
              );
            })}
          </div>
        </div>

        {/* CSV export */}
        <button
          onClick={() => exportCsv(sorted)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:border-zinc-500 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Table */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-zinc-800 bg-zinc-900">
          <p className="text-zinc-400 text-sm">No rows match the current filter.</p>
          <p className="text-zinc-600 text-xs mt-1">Try changing the score filter above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/80">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => handleSort(col.key)}
                    className={`px-4 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide whitespace-nowrap cursor-pointer select-none hover:text-zinc-200 transition-colors
                      ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}
                    `}
                  >
                    {col.label}
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  </th>
                ))}
                {/* Non-sortable "View" column */}
                <th
                  scope="col"
                  className="px-4 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide text-center"
                >
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {sorted.map((row, i) => {
                const score = row.consistency_score;
                return (
                  <tr
                    key={`${row.audience_id}-${row.channel}-${row.keyword_or_adset}-${i}`}
                    onClick={() => handleRowClick(row)}
                    className="bg-zinc-900 hover:bg-zinc-800/50 transition-colors cursor-pointer"
                  >
                    {/* Audience */}
                    <td className="px-4 py-3 text-zinc-200 font-medium whitespace-nowrap">
                      {row.audience_name}
                    </td>

                    {/* Channel */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <ChannelBadge channel={row.channel} />
                    </td>

                    {/* KW / Ad set */}
                    <td className="px-4 py-3 text-zinc-400 max-w-[180px] truncate" title={row.keyword_or_adset}>
                      {row.keyword_or_adset || "—"}
                    </td>

                    {/* CTR% */}
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 tabular-nums">
                      {pct2(row.ctr)}
                    </td>

                    {/* Bounce rate */}
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 tabular-nums">
                      {pct(row.bounce_rate)}
                    </td>

                    {/* Scroll depth */}
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 tabular-nums">
                      {row.scroll_depth.toFixed(1)}%
                    </td>

                    {/* CVR% */}
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 tabular-nums">
                      {pct2(row.cvr)}
                    </td>

                    {/* Day-2 DAU% */}
                    <td className="px-4 py-3 text-right font-mono text-zinc-300 tabular-nums">
                      {pct(row.day2_rate)}
                    </td>

                    {/* Consistency score badge */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tabular-nums"
                        style={scoreBadgeStyle(score)}
                      >
                        {scoreBadgeLabel(score)}
                      </span>
                    </td>

                    {/* View link */}
                    <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleRowClick(row)}
                        className="text-zinc-500 hover:text-[#5DCAA5] transition-colors text-base leading-none"
                        title="View qualitative breakdown"
                        aria-label="View qualitative breakdown"
                      >
                        &rarr;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
            <p className="text-xs text-zinc-600">
              {sorted.length} row{sorted.length !== 1 ? "s" : ""}
              {scoreFilter !== "all" && (
                <> &middot; filtered to <span className="text-zinc-400">{SCORE_FILTER_LABELS[scoreFilter]}</span></>
              )}
            </p>
            <p className="text-xs text-zinc-700">
              Click any row to see qualitative breakdown
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
