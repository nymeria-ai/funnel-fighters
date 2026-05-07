"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const audiences = [
  { value: "all", label: "All audiences" },
  { value: "retargeting", label: "Retargeting" },
  { value: "lookalike", label: "Lookalike" },
  { value: "branded-kw", label: "Branded KW" },
  { value: "non-brand-kw", label: "Non-brand KW" },
];

const channels = [
  { value: "all", label: "All channels" },
  { value: "search", label: "Search" },
  { value: "meta", label: "Meta" },
  { value: "youtube", label: "YouTube" },
];

const sellingPoints = [
  { value: "all", label: "All selling points" },
  { value: "speed", label: "Speed" },
  { value: "price", label: "Price" },
  { value: "ease-of-use", label: "Ease of use" },
  { value: "social-proof", label: "Social proof" },
  { value: "security", label: "Security" },
];

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5">
      <span className="text-[11px] text-zinc-500 whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer appearance-none pr-4"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0 center' }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-zinc-900">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const audience = searchParams.get("audience") || "all";
  const channel = searchParams.get("channel") || "all";
  const sellingPoint = searchParams.get("sp") || "all";
  const dateRange = searchParams.get("range") || "30d";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all" || value === "30d") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.push(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <FilterSelect label="Audience" value={audience} options={audiences} onChange={(v) => updateParam("audience", v)} />
      <FilterSelect label="Channel" value={channel} options={channels} onChange={(v) => updateParam("channel", v)} />
      <FilterSelect label="Selling point" value={sellingPoint} options={sellingPoints} onChange={(v) => updateParam("sp", v)} />
      <FilterSelect label="Date range" value={dateRange} options={dateRanges} onChange={(v) => updateParam("range", v)} />
    </div>
  );
}
