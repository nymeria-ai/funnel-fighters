"use client";

import { useState } from "react";
import type { ScrapedLPContent } from "@/lib/types";

interface ScrapeResult {
  url: string;
  status: "pending" | "loading" | "success" | "error";
  data?: ScrapedLPContent & { warning?: string };
  error?: string;
}

export default function ScrapePage() {
  const [urls, setUrls] = useState("");
  const [results, setResults] = useState<ScrapeResult[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  async function handleScrape() {
    const urlList = urls
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    if (urlList.length === 0) return;

    const initial: ScrapeResult[] = urlList.map((url) => ({
      url,
      status: "pending",
    }));
    setResults(initial);

    for (let i = 0; i < urlList.length; i++) {
      setResults((prev) =>
        prev.map((r, idx) => (idx === i ? { ...r, status: "loading" } : r))
      );

      try {
        const res = await fetch("/api/scrape-lp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlList[i] }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Scrape failed");
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i ? { ...r, status: "success", data } : r
          )
        );
      } catch (err) {
        setResults((prev) =>
          prev.map((r, idx) =>
            idx === i
              ? { ...r, status: "error", error: (err as Error).message }
              : r
          )
        );
      }
    }
  }

  async function handleSaveToDb(result: ScrapeResult) {
    if (!result.data) return;
    setSaving(result.url);
    try {
      const res = await fetch("/api/admin/save-lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to save");
      } else {
        alert("LP variant saved to database");
      }
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-xl font-semibold">Landing Page Scraper</h1>
        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">
          LLM-powered extraction
        </span>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-6">
        <label className="block text-sm text-zinc-400 mb-2">
          Enter landing page URLs (one per line)
        </label>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder={"https://example.com/landing-page-1\nhttps://example.com/landing-page-2"}
          rows={4}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-zinc-500 resize-none"
        />
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-zinc-500">
            URLs will be fetched and analyzed by Claude to extract structured content
          </span>
          <button
            onClick={handleScrape}
            disabled={!urls.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Scrape URLs
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-zinc-400">Results</h2>
          {results.map((result, i) => (
            <div
              key={i}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                {result.status === "loading" && (
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                )}
                {result.status === "success" && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                {result.status === "error" && (
                  <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-400 text-xs">!</span>
                  </div>
                )}
                {result.status === "pending" && (
                  <div className="w-4 h-4 rounded-full bg-zinc-700" />
                )}
                <span className="text-sm text-zinc-300 font-mono truncate">
                  {result.url}
                </span>
              </div>

              {result.status === "error" && (
                <p className="text-sm text-red-400">{result.error}</p>
              )}

              {result.data?.warning && (
                <p className="text-xs text-amber-400 mb-3 px-2 py-1 bg-amber-900/20 rounded">
                  {result.data.warning}
                </p>
              )}

              {result.data && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 mb-1">
                        Hero Headline
                      </div>
                      <div className="text-sm text-zinc-200">
                        {result.data.hero_headline || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-zinc-500 mb-1">
                        Subheadline
                      </div>
                      <div className="text-sm text-zinc-200">
                        {result.data.subheadline || "—"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase text-zinc-500 mb-1">
                      CTA
                    </div>
                    <div className="text-sm text-zinc-200">
                      {result.data.cta_label || "—"}
                    </div>
                  </div>

                  {result.data.value_props &&
                    result.data.value_props.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase text-zinc-500 mb-1">
                          Value Props
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.data.value_props.map((vp, j) => (
                            <span
                              key={j}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor:
                                  vp.fold_position === "above"
                                    ? "#E1F5EE"
                                    : "#FAEEDA",
                                color:
                                  vp.fold_position === "above"
                                    ? "#085041"
                                    : "#633806",
                              }}
                            >
                              {vp.text}{" "}
                              <span className="opacity-60">
                                ({vp.fold_position} fold)
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {result.data.selling_points &&
                    result.data.selling_points.length > 0 && (
                      <div>
                        <div className="text-[10px] uppercase text-zinc-500 mb-1">
                          Selling Points
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {result.data.selling_points.map((sp, j) => (
                            <span
                              key={j}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                backgroundColor: "#EEEDFE",
                                color: "#3C3489",
                              }}
                            >
                              {sp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => handleSaveToDb(result)}
                      disabled={saving === result.url}
                      className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {saving === result.url
                        ? "Saving..."
                        : "Save as LP Variant"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
