import Link from "next/link";
import { query } from "@/lib/db";
import {
  ConsistencyTable,
  type ConsistencyTableRow,
} from "@/components/consistency-table";

// ── Types coming from the DB joins ───────────────────────────────────────────

interface FunnelPathJoined {
  // funnel_paths
  fp_id: string;
  fp_consistency_score: number | null;
  fp_updated_at: string;
  // audience_segments
  aud_id: string;
  aud_name: string;
  aud_channel: string;
  // ad_variants
  ad_id: string;
  ad_headline: string;
  ad_body_copy: string;
  ad_cta_label: string;
  ad_selling_points: string[]; // Postgres array
  // lp_variants
  lp_id: string | null;
  lp_hero_headline: string | null;
  lp_subheadline: string | null;
  lp_cta_label: string | null;
  lp_selling_points: string[] | null;
  lp_value_props: Array<{ text: string; fold_position: "above" | "below" }> | null;
  lp_updated_at: string | null;
  // onboarding_variants
  ob_id: string | null;
  ob_welcome_copy: string | null;
  ob_selling_points: string[] | null;
  ob_updated_at: string | null;
}

interface SellingPointRow {
  id: string;
  name: string;
}

type SellingPointPresence = "above_fold" | "below_fold" | "absent";

interface StageConsistencyItem {
  sp_id: string;
  sp_name: string;
  in_ad: boolean;
  lp_presence: SellingPointPresence;
  ob_presence: SellingPointPresence;
}

// ── Scoring helpers ───────────────────────────────────────────────────────────

function computeAdToLp(
  adSps: string[],
  lpSps: string[],
  valueProps: Array<{ text: string; fold_position: string }> | null
): number {
  if (!lpSps || lpSps.length === 0) return 0;
  const adSet = new Set(adSps);
  const aboveFoldSps = new Set(
    (valueProps ?? [])
      .filter((vp) => vp.fold_position === "above")
      .map((_, i) => lpSps[i])
      .filter(Boolean)
  );
  let score = 0;
  let total = 0;
  for (const sp of adSet) {
    total += 2; // max points per sp
    if (lpSps.includes(sp)) {
      score += aboveFoldSps.has(sp) ? 2 : 1; // above = full, below = half
    }
  }
  if (total === 0) return 100;
  return Math.round((score / total) * 100);
}

function computeLpToOb(lpSps: string[], obSps: string[]): number {
  if (!lpSps || lpSps.length === 0) return 0;
  if (!obSps || obSps.length === 0) return 0;
  const lpSet = new Set(lpSps);
  let matched = 0;
  for (const sp of lpSet) {
    if (obSps.includes(sp)) matched++;
  }
  return Math.round((matched / lpSet.size) * 100);
}

function computeOverall(adToLp: number, lpToOb: number): number {
  return Math.round((adToLp * 0.5 + lpToOb * 0.5));
}

// ── Selling point presence derivation ────────────────────────────────────────

function lpPresence(
  spId: string,
  lpSps: string[] | null,
  valueProps: Array<{ text: string; fold_position: string }> | null
): SellingPointPresence {
  if (!lpSps || !lpSps.includes(spId)) return "absent";
  // If there are value_props with fold_position, use index mapping to determine placement
  // The lpSps array items match the selling_points column; value_props ordering mirrors it
  const idx = lpSps.indexOf(spId);
  if (valueProps && valueProps[idx]) {
    return valueProps[idx].fold_position === "above" ? "above_fold" : "below_fold";
  }
  // Fallback: assume above fold if it's in the LP
  return "above_fold";
}

function obPresence(spId: string, obSps: string[] | null): SellingPointPresence {
  if (!obSps || !obSps.includes(spId)) return "absent";
  return "above_fold";
}

// ── Presence badge component (server-renderable) ──────────────────────────────

function PresenceBadge({ presence }: { presence: SellingPointPresence }) {
  if (presence === "above_fold") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
        style={{ background: "#E1F5EE", color: "#085041" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#085041] inline-block" />
        Present above fold
      </span>
    );
  }
  if (presence === "below_fold") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
        style={{ background: "#FAEEDA", color: "#633806" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#633806] inline-block" />
        Below fold
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={{ background: "#F1EFE8", color: "#444441" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#444441] inline-block" />
      Absent
    </span>
  );
}

// ── Score ring (visual) ───────────────────────────────────────────────────────

function ScoreRing({ score, label }: { score: number; label: string }) {
  const color = score >= 75 ? "#085041" : score >= 50 ? "#633806" : "#991b1b";
  const bg = score >= 75 ? "#E1F5EE" : score >= 50 ? "#FAEEDA" : "#fef2f2";
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold"
        style={{ background: bg, color }}
      >
        {score}
      </div>
      <span className="text-[10px] text-zinc-500 text-center leading-tight">{label}</span>
    </div>
  );
}

// ── Stage card ────────────────────────────────────────────────────────────────

interface StageCardProps {
  stage: 1 | 2 | 3;
  headline: string;
  body: string;
  cta: string;
  sellingPoints: string[];
  allSellingPoints: SellingPointRow[];
}

const STAGE_STYLES = {
  1: {
    label: "Ad Creative",
    badgeBg: "#EEEDFE",
    badgeText: "#3C3489",
    border: "border-[#3C3489]/30",
    headerBg: "bg-[#EEEDFE]/10",
    dot: "bg-[#3C3489]",
    tag: { bg: "#EEEDFE", text: "#3C3489" },
  },
  2: {
    label: "LP Content",
    badgeBg: "#E1F5EE",
    badgeText: "#085041",
    border: "border-[#085041]/30",
    headerBg: "bg-[#E1F5EE]/10",
    dot: "bg-[#085041]",
    tag: { bg: "#E1F5EE", text: "#085041" },
  },
  3: {
    label: "Onboarding",
    badgeBg: "#FAECE7",
    badgeText: "#712B13",
    border: "border-[#712B13]/30",
    headerBg: "bg-[#FAECE7]/10",
    dot: "bg-[#712B13]",
    tag: { bg: "#FAECE7", text: "#712B13" },
  },
} as const;

function StageCard({ stage, headline, body, cta, sellingPoints, allSellingPoints }: StageCardProps) {
  const s = STAGE_STYLES[stage];
  const spNames = sellingPoints
    .map((id) => allSellingPoints.find((sp) => sp.id === id)?.name)
    .filter(Boolean) as string[];

  return (
    <div className={`flex flex-col rounded-lg border ${s.border} bg-zinc-900 overflow-hidden flex-1 min-w-0`}>
      {/* Stage header */}
      <div className={`px-4 py-2.5 ${s.headerBg} border-b border-zinc-800 flex items-center gap-2`}>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: s.badgeBg, color: s.badgeText }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          Stage {stage} — {s.label}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">Headline</span>
          <p className="mt-1 text-zinc-100 font-semibold text-sm leading-snug">{headline}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">
            {stage === 1 ? "Body copy" : "Subheadline / Welcome"}
          </span>
          <p className="mt-1 text-zinc-300 text-sm leading-relaxed line-clamp-4">{body}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">CTA</span>
          <p className="mt-1">
            <span
              className="inline-block px-3 py-1 rounded-md text-xs font-semibold"
              style={{ background: s.badgeBg, color: s.badgeText }}
            >
              {cta}
            </span>
          </p>
        </div>

        {/* Selling point tags */}
        {spNames.length > 0 && (
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-medium">Selling points</span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {spNames.map((name) => (
                <span
                  key={name}
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ background: s.tag.bg, color: s.tag.text }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Arrow connector ───────────────────────────────────────────────────────────

function ArrowConnector() {
  return (
    <div className="flex-shrink-0 flex items-center justify-center self-center px-1">
      <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 7.5-6 7.5M5.25 4.5l6 7.5-6 7.5" />
      </svg>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ message, hint }: { message: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-zinc-300 font-medium text-sm">{message}</p>
      {hint && <p className="text-zinc-600 text-xs mt-1 max-w-xs">{hint}</p>}
    </div>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
      {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface PageProps {
  searchParams: Promise<{
    audience?: string;
    channel?: string;
    sp?: string;
    range?: string;
  }>;
}

export default async function ConsistencyPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const audience = params.audience ?? "all";
  const channel = params.channel ?? "all";
  const sp = params.sp ?? "all";
  // range is available for future use
  // const range = params.range ?? "30d";

  // ── 1. Build WHERE clauses ──────────────────────────────────────────────────

  const whereClauses: string[] = [];
  const queryParams: unknown[] = [];
  let paramIdx = 1;

  if (audience !== "all") {
    whereClauses.push(`aud.targeting_type = $${paramIdx++}`);
    queryParams.push(audience);
  }
  if (channel !== "all") {
    whereClauses.push(`aud.channel = $${paramIdx++}`);
    queryParams.push(channel);
  }

  const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // ── 2. Load all selling points (for name resolution) ───────────────────────

  let sellingPoints: SellingPointRow[] = [];
  try {
    sellingPoints = await query<SellingPointRow>(
      `SELECT id, name FROM selling_points ORDER BY name`,
      []
    );
  } catch {
    // Table may not exist yet; continue gracefully
  }

  // ── 3. Load funnel paths with all joins ────────────────────────────────────

  let paths: FunnelPathJoined[] = [];
  try {
    paths = await query<FunnelPathJoined>(
      `
      SELECT
        fp.id                     AS fp_id,
        fp.consistency_score      AS fp_consistency_score,
        fp.updated_at             AS fp_updated_at,

        aud.id                    AS aud_id,
        aud.name                  AS aud_name,
        aud.channel               AS aud_channel,

        av.id                     AS ad_id,
        av.headline               AS ad_headline,
        av.body_copy              AS ad_body_copy,
        av.cta_label              AS ad_cta_label,
        av.selling_points         AS ad_selling_points,

        lp.id                     AS lp_id,
        lp.hero_headline          AS lp_hero_headline,
        lp.subheadline            AS lp_subheadline,
        lp.cta_label              AS lp_cta_label,
        lp.selling_points         AS lp_selling_points,
        lp.value_props            AS lp_value_props,
        lp.updated_at             AS lp_updated_at,

        ob.id                     AS ob_id,
        ob.welcome_copy           AS ob_welcome_copy,
        ob.selling_points         AS ob_selling_points,
        ob.updated_at             AS ob_updated_at

      FROM funnel_paths fp
      JOIN audience_segments aud ON aud.id = fp.audience_segment_id
      JOIN ad_variants       av  ON av.id  = fp.ad_variant_id
      LEFT JOIN lp_variants  lp  ON lp.id  = fp.lp_variant_id
      LEFT JOIN onboarding_variants ob ON ob.id = fp.onboarding_variant_id

      ${whereSQL}

      ORDER BY fp.consistency_score DESC NULLS LAST, fp.updated_at DESC
      `,
      queryParams
    );
  } catch {
    // DB unavailable or tables missing — show empty state below
  }

  // ── 4. Filter by selling point if requested ────────────────────────────────

  const filteredPaths =
    sp !== "all"
      ? paths.filter((p) => {
          const adHas = Array.isArray(p.ad_selling_points) && p.ad_selling_points.includes(sp);
          const lpHas = Array.isArray(p.lp_selling_points) && p.lp_selling_points.includes(sp);
          const obHas = Array.isArray(p.ob_selling_points) && p.ob_selling_points.includes(sp);
          return adHas || lpHas || obHas;
        })
      : paths;

  // ── 5. Top funnel path (for 3-stage view) ─────────────────────────────────

  const topPath = filteredPaths[0] ?? null;

  // ── 6. Consistency score detail (for top path) ────────────────────────────

  let consistencyItems: StageConsistencyItem[] = [];
  if (topPath) {
    const allSps = new Set([
      ...(topPath.ad_selling_points ?? []),
      ...(topPath.lp_selling_points ?? []),
      ...(topPath.ob_selling_points ?? []),
    ]);
    consistencyItems = Array.from(allSps).map((spId) => {
      const found = sellingPoints.find((s) => s.id === spId);
      return {
        sp_id: spId,
        sp_name: found?.name ?? spId,
        in_ad: Array.isArray(topPath.ad_selling_points) && topPath.ad_selling_points.includes(spId),
        lp_presence: lpPresence(spId, topPath.lp_selling_points, topPath.lp_value_props),
        ob_presence: obPresence(spId, topPath.ob_selling_points),
      };
    });
  }

  // ── 7. Build table rows ────────────────────────────────────────────────────

  const tableRows: ConsistencyTableRow[] = filteredPaths.flatMap((p) => {
    const adSps: string[] = Array.isArray(p.ad_selling_points) ? p.ad_selling_points : [];
    const lpSps: string[] = Array.isArray(p.lp_selling_points) ? p.lp_selling_points : [];
    const obSps: string[] = Array.isArray(p.ob_selling_points) ? p.ob_selling_points : [];

    const adToLp = computeAdToLp(adSps, lpSps, p.lp_value_props ?? null);
    const lpToOb = computeLpToOb(lpSps, obSps);
    const overall = p.fp_consistency_score ?? computeOverall(adToLp, lpToOb);

    // One row per unique selling point that appears in the ad
    const spsForRows = adSps.length > 0 ? adSps : ["(none)"];
    return spsForRows.map((spId) => {
      const spRow = sellingPoints.find((s) => s.id === spId);
      return {
        funnel_path_id: p.fp_id,
        audience_name: p.aud_name,
        channel: p.aud_channel,
        selling_point_name: spRow?.name ?? spId,
        ad_variant_id: p.ad_id,
        lp_variant_id: p.lp_id,
        onboarding_variant_id: p.ob_id,
        ad_to_lp_score: adToLp,
        lp_to_onboarding_score: lpToOb,
        overall_score: overall,
        last_updated: p.fp_updated_at,
      };
    });
  });

  // ── Computed scores for top path ───────────────────────────────────────────

  const topAdSps: string[] = Array.isArray(topPath?.ad_selling_points) ? topPath!.ad_selling_points : [];
  const topLpSps: string[] = Array.isArray(topPath?.lp_selling_points) ? topPath!.lp_selling_points : [];
  const topObSps: string[] = Array.isArray(topPath?.ob_selling_points) ? topPath!.ob_selling_points : [];
  const topAdToLp = topPath ? computeAdToLp(topAdSps, topLpSps, topPath.lp_value_props ?? null) : 0;
  const topLpToOb = topPath ? computeLpToOb(topLpSps, topObSps) : 0;
  const topOverall = topPath
    ? (topPath.fp_consistency_score ?? computeOverall(topAdToLp, topLpToOb))
    : 0;

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-8">
      {/* ── Section 1: Tabs ── */}
      <div className="flex items-center gap-1 border-b border-zinc-800 -mt-1">
        {/* Active tab: Qualitative */}
        <div
          className="relative px-4 py-2.5 text-sm font-semibold cursor-default select-none"
          style={{ color: "#3C3489" }}
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold"
            style={{ background: "#EEEDFE", color: "#3C3489" }}
          >
            Qualitative
          </span>
          {/* Active underline */}
          <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full" style={{ background: "#3C3489" }} />
        </div>

        {/* Inactive tab: Quantitative */}
        <Link
          href="/consistency/quantitative"
          className="relative px-4 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors font-medium"
        >
          Quantitative
        </Link>
      </div>

      {/* ── Section 2: 3-Stage Side-by-Side View ── */}
      <section>
        <SectionHeading
          title="Funnel Path — Messaging Consistency"
          subtitle={
            topPath
              ? `Top path: ${topPath.aud_name} · ${topPath.aud_channel}`
              : "No path selected"
          }
        />

        {!topPath ? (
          <EmptyState
            message="No funnel paths found"
            hint="Make sure funnel_paths, ad_variants, lp_variants, and onboarding_variants are populated. Try removing filters."
          />
        ) : (
          <div className="flex items-stretch gap-0">
            {/* Stage 1 — Ad */}
            <StageCard
              stage={1}
              headline={topPath.ad_headline}
              body={topPath.ad_body_copy}
              cta={topPath.ad_cta_label}
              sellingPoints={topPath.ad_selling_points ?? []}
              allSellingPoints={sellingPoints}
            />

            <ArrowConnector />

            {/* Stage 2 — LP */}
            {topPath.lp_id ? (
              <StageCard
                stage={2}
                headline={topPath.lp_hero_headline ?? "—"}
                body={topPath.lp_subheadline ?? "—"}
                cta={topPath.lp_cta_label ?? "—"}
                sellingPoints={topPath.lp_selling_points ?? []}
                allSellingPoints={sellingPoints}
              />
            ) : (
              <div className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center p-6 min-h-[200px]">
                <div className="text-center">
                  <p className="text-zinc-500 text-sm font-medium">No LP variant linked</p>
                  <p className="text-zinc-700 text-xs mt-1">Assign an lp_variant_id to this funnel path</p>
                </div>
              </div>
            )}

            <ArrowConnector />

            {/* Stage 3 — Onboarding */}
            {topPath.ob_id ? (
              <StageCard
                stage={3}
                headline="Onboarding"
                body={topPath.ob_welcome_copy ?? "—"}
                cta="Get started"
                sellingPoints={topPath.ob_selling_points ?? []}
                allSellingPoints={sellingPoints}
              />
            ) : (
              <div className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 flex items-center justify-center p-6 min-h-[200px]">
                <div className="text-center">
                  <p className="text-zinc-500 text-sm font-medium">No onboarding variant linked</p>
                  <p className="text-zinc-700 text-xs mt-1">Assign an onboarding_variant_id to this funnel path</p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── Section 3: Consistency Score Card ── */}
      {topPath && (
        <section>
          <SectionHeading
            title="Consistency Score Breakdown"
            subtitle="How selling points flow through each stage for the top path"
          />

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 overflow-hidden">
            {/* Score summary row */}
            <div className="px-5 py-4 border-b border-zinc-800 flex items-center gap-8">
              <ScoreRing score={topAdToLp} label={`Ad → LP`} />
              <ScoreRing score={topLpToOb} label={`LP → Onboarding`} />
              <ScoreRing score={topOverall} label="Overall" />
              <div className="ml-auto text-xs text-zinc-500 text-right leading-relaxed">
                <div>Path ID: <span className="font-mono text-zinc-400">{topPath.fp_id}</span></div>
                <div className="mt-0.5">Audience: <span className="text-zinc-300">{topPath.aud_name}</span></div>
                <div className="mt-0.5">Channel: <span className="text-zinc-300 capitalize">{topPath.aud_channel}</span></div>
              </div>
            </div>

            {/* Per selling point table */}
            {consistencyItems.length === 0 ? (
              <div className="px-5 py-8 text-center text-zinc-600 text-sm">
                No selling points associated with this path.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60">
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      Selling point
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      <span style={{ color: "#3C3489" }}>Ad (Stage 1)</span>
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      <span style={{ color: "#085041" }}>LP (Stage 2)</span>
                    </th>
                    <th className="px-5 py-2.5 text-left text-xs font-medium text-zinc-500 uppercase tracking-wide">
                      <span style={{ color: "#712B13" }}>Onboarding (Stage 3)</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {consistencyItems.map((item) => (
                    <tr key={item.sp_id} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-5 py-3 font-medium text-zinc-200">{item.sp_name}</td>
                      <td className="px-5 py-3">
                        {item.in_ad ? (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ background: "#EEEDFE", color: "#3C3489" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3C3489] inline-block" />
                            Present
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
                            style={{ background: "#F1EFE8", color: "#444441" }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#444441] inline-block" />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <PresenceBadge presence={item.lp_presence} />
                      </td>
                      <td className="px-5 py-3">
                        <PresenceBadge presence={item.ob_presence} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {/* ── Section 4: Row-Level Table ── */}
      <section className="pb-8">
        <SectionHeading
          title="All Funnel Paths — Row Level"
          subtitle={`${tableRows.length} row${tableRows.length !== 1 ? "s" : ""} · one per audience × channel × selling point × ad variant combination`}
        />

        <ConsistencyTable rows={tableRows} />
      </section>
    </div>
  );
}
