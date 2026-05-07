"use client";

import { useState, useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

export interface ConsistencyTableRow {
  funnel_path_id: string;
  audience_name: string;
  channel: string;
  selling_point_name: string;
  ad_variant_id: string;
  lp_variant_id: string | null;
  onboarding_variant_id: string | null;
  ad_to_lp_score: number;
  lp_to_onboarding_score: number;
  overall_score: number;
  last_updated: string;
}

type SortKey = keyof ConsistencyTableRow;
type SortDir = "asc" | "desc";

// ── Helpers ──────────────────────────────────────────────────────────────────

function scoreColor(score: number): string {
  if (score >= 75) return "text-teal-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

function scoreBg(score: number): string {
  if (score >= 75) return "bg-[#E1F5EE] text-[#085041]";
  if (score >= 50) return "bg-[#FAEEDA] text-[#633806]";
  return "bg-red-950 text-red-300";
}

function channelBadge(channel: string): string {
  const map: Record<string, string> = {
    search: "bg-blue-950 text-blue-300",
    meta: "bg-indigo-950 text-indigo-300",
    youtube: "bg-red-950 text-red-300",
    linkedin: "bg-sky-950 text-sky-300",
  };
  return map[channel] ?? "bg-zinc-800 text-zinc-300";
}

function shortId(id: string | null): string {
  if (!id) return "—";
  return id.length > 10 ? `…${id.slice(-8)}` : id;
}

function formatDate(ts: string): string {
  try {
    return new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return ts;
  }
}

// ── Column definitions ────────────────────────────────────────────────────────

interface Column {
  key: SortKey;
  label: string;
  sortable: boolean;
  align?: "left" | "right" | "center";
}

const COLUMNS: Column[] = [
  { key: "audience_name",          label: "Audience",          sortable: true,  align: "left"   },
  { key: "channel",                label: "Channel",           sortable: true,  align: "left"   },
  { key: "selling_point_name",     label: "Selling point",     sortable: true,  align: "left"   },
  { key: "ad_variant_id",          label: "Ad variant",        sortable: false, align: "left"   },
  { key: "lp_variant_id",          label: "LP variant",        sortable: false, align: "left"   },
  { key: "onboarding_variant_id",  label: "Onboarding variant",sortable: false, align: "left"   },
  { key: "ad_to_lp_score",         label: "Ad → LP",           sortable: true,  align: "center" },
  { key: "lp_to_onboarding_score", label: "LP → Onboarding",   sortable: true,  align: "center" },
  { key: "overall_score",          label: "Overall",           sortable: true,  align: "center" },
  { key: "last_updated",           label: "Last updated",      sortable: true,  align: "left"   },
];

// ── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) {
    return (
      <svg className="w-3 h-3 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return dir === "asc" ? (
    <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

// ── Score pill ───────────────────────────────────────────────────────────────

function ScorePill({ score }: { score: number }) {
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold tabular-nums ${scoreBg(score)}`}>
      {score}
    </span>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface ConsistencyTableProps {
  rows: ConsistencyTableRow[];
}

export function ConsistencyTable({ rows }: ConsistencyTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("overall_score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
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
  }, [rows, sortKey, sortDir]);

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-zinc-400 text-sm">No consistency rows match the current filters.</p>
        <p className="text-zinc-600 text-xs mt-1">Try broadening audience, channel, or selling point selection.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-4 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide whitespace-nowrap select-none
                  ${col.align === "center" ? "text-center" : col.align === "right" ? "text-right" : "text-left"}
                  ${col.sortable ? "cursor-pointer hover:text-zinc-200 transition-colors" : ""}
                `}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {sorted.map((row) => (
            <tr
              key={`${row.funnel_path_id}-${row.selling_point_name}`}
              className="bg-zinc-900 hover:bg-zinc-800/50 transition-colors"
            >
              {/* Audience */}
              <td className="px-4 py-3 text-zinc-200 font-medium whitespace-nowrap">
                {row.audience_name}
              </td>

              {/* Channel */}
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium capitalize ${channelBadge(row.channel)}`}>
                  {row.channel}
                </span>
              </td>

              {/* Selling point */}
              <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                {row.selling_point_name}
              </td>

              {/* Ad variant ID */}
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-zinc-400" title={row.ad_variant_id}>
                  {shortId(row.ad_variant_id)}
                </span>
              </td>

              {/* LP variant ID */}
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-zinc-400" title={row.lp_variant_id ?? ""}>
                  {shortId(row.lp_variant_id)}
                </span>
              </td>

              {/* Onboarding variant ID */}
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-zinc-400" title={row.onboarding_variant_id ?? ""}>
                  {shortId(row.onboarding_variant_id)}
                </span>
              </td>

              {/* Ad → LP score */}
              <td className="px-4 py-3 text-center">
                <ScorePill score={row.ad_to_lp_score} />
              </td>

              {/* LP → Onboarding score */}
              <td className="px-4 py-3 text-center">
                <ScorePill score={row.lp_to_onboarding_score} />
              </td>

              {/* Overall score */}
              <td className="px-4 py-3 text-center">
                <span className={`text-sm font-bold tabular-nums ${scoreColor(row.overall_score)}`}>
                  {row.overall_score}
                </span>
              </td>

              {/* Last updated */}
              <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">
                {formatDate(row.last_updated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-zinc-800 bg-zinc-900/60">
        <p className="text-xs text-zinc-600">
          {sorted.length} row{sorted.length !== 1 ? "s" : ""} — sorted by{" "}
          <span className="text-zinc-400">
            {COLUMNS.find((c) => c.key === sortKey)?.label ?? sortKey}
          </span>{" "}
          ({sortDir === "asc" ? "ascending" : "descending"})
        </p>
      </div>
    </div>
  );
}
