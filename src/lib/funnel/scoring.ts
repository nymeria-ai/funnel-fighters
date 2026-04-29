/**
 * Funnel-based scoring for Landing Page and Product ducks.
 * Uses BigBrain funnel data to compute 0-100 scores.
 */

// ============================================================
// Landing Page Score (0-100)
// ============================================================
// Weights per BRIEF.md:
//   Visit-to-GS rate:      35% (from BigBrain)
//   Ad-to-LP relevance:    25% (existing LLM scoring)
//   Page rank:              20% (existing GSC + Ahrefs)
//   Page speed:             20% (placeholder — not yet integrated)

interface LPScoreInputs extends Record<string, unknown> {
  gsRate: number | null;           // visit-to-get-started rate (0-100%)
  relevanceScore: number | null;   // 0-100 from LLM
  rankScore: number | null;        // 0-10 composite from GSC + Ahrefs
  pageSpeedScore?: number | null;  // 0-100 from PageSpeed Insights (future)
}

// Benchmarks derived from BigBrain data (last 30 days)
const GS_RATE_BENCHMARKS = {
  excellent: 30, // 30%+ GS rate = excellent
  good: 20,
  fair: 10,
  poor: 5,
};

function gsRateToScore(gsRate: number): number {
  // Map GS rate % to 0-100 score
  if (gsRate >= GS_RATE_BENCHMARKS.excellent) return Math.min(100, 80 + (gsRate - 30) * 0.67);
  if (gsRate >= GS_RATE_BENCHMARKS.good) return 60 + (gsRate - 20) * 2;
  if (gsRate >= GS_RATE_BENCHMARKS.fair) return 30 + (gsRate - 10) * 3;
  if (gsRate >= GS_RATE_BENCHMARKS.poor) return 10 + (gsRate - 5) * 4;
  return Math.max(0, gsRate * 2);
}

function rankToScore100(rank: number): number {
  // Convert 0-10 rank to 0-100
  return rank * 10;
}

export function computeLPScore(inputs: LPScoreInputs): { score: number; breakdown: Record<string, number | null> } {
  const gsScore = inputs.gsRate !== null ? gsRateToScore(inputs.gsRate) : null;
  const relevance = inputs.relevanceScore;
  const rank = inputs.rankScore !== null ? rankToScore100(inputs.rankScore) : null;
  const speed = inputs.pageSpeedScore ?? null;

  // Weighted average, skipping null components and redistributing weight
  const components: { score: number; weight: number; label: string }[] = [];
  if (gsScore !== null) components.push({ score: gsScore, weight: 35, label: 'gsRate' });
  if (relevance !== null) components.push({ score: relevance, weight: 25, label: 'relevance' });
  if (rank !== null) components.push({ score: rank, weight: 20, label: 'rank' });
  if (speed !== null) components.push({ score: speed, weight: 20, label: 'speed' });

  if (components.length === 0) {
    return { score: 0, breakdown: { gsRate: null, relevance: null, rank: null, speed: null } };
  }

  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const weighted = components.reduce((sum, c) => sum + c.score * (c.weight / totalWeight), 0);

  return {
    score: Math.round(weighted),
    breakdown: {
      gsRate: gsScore,
      relevance: relevance,
      rank: rank !== null ? Math.round(rank) : null,
      speed: speed,
    },
  };
}

// ============================================================
// Product Score (0-100)
// ============================================================
// Weights:
//   Hard signup rate (GS → hard signup):     30%
//   Hard signup → payer rate:                35%
//   Product alignment rate:                  20%
//   Week-over-week stability:                15%

interface ProductScoreInputs extends Record<string, unknown> {
  gsToHardSignupRate: number | null;    // % of get_started that become hard signups
  hardSignupToPayerRate: number | null; // % of hard signups that become payers within 28d
  productAlignmentRate: number | null;  // % of signups where signup_product matches lp_product
  weeklyRates: number[];               // last N weeks of hard_signup rates for stability
}

// Benchmarks from BigBrain data
const PRODUCT_BENCHMARKS = {
  gsToHardSignup: { excellent: 50, good: 35, fair: 20 },   // % rates
  hardToPayer: { excellent: 2, good: 1, fair: 0.5 },       // % rates (low numbers are normal for freemium)
  alignment: { excellent: 80, good: 60, fair: 40 },        // % alignment
};

function rateToScore(rate: number, benchmarks: { excellent: number; good: number; fair: number }): number {
  if (rate >= benchmarks.excellent) return Math.min(100, 80 + (rate - benchmarks.excellent) * 0.5);
  if (rate >= benchmarks.good) return 60 + (rate - benchmarks.good) / (benchmarks.excellent - benchmarks.good) * 20;
  if (rate >= benchmarks.fair) return 30 + (rate - benchmarks.fair) / (benchmarks.good - benchmarks.fair) * 30;
  return Math.max(0, rate / benchmarks.fair * 30);
}

function stabilityScore(rates: number[]): number {
  if (rates.length < 2) return 50; // neutral if not enough data
  // Calculate coefficient of variation (lower = more stable = higher score)
  const mean = rates.reduce((a, b) => a + b, 0) / rates.length;
  if (mean === 0) return 0;
  const variance = rates.reduce((sum, r) => sum + (r - mean) ** 2, 0) / rates.length;
  const cv = Math.sqrt(variance) / mean;
  // CV of 0 = perfect stability (100), CV of 1+ = very unstable (0)
  return Math.max(0, Math.min(100, Math.round((1 - cv) * 100)));
}

export function computeProductScore(inputs: ProductScoreInputs): { score: number; breakdown: Record<string, number | null> } {
  const signupScore = inputs.gsToHardSignupRate !== null
    ? rateToScore(inputs.gsToHardSignupRate, PRODUCT_BENCHMARKS.gsToHardSignup) : null;
  const payerScore = inputs.hardSignupToPayerRate !== null
    ? rateToScore(inputs.hardSignupToPayerRate, PRODUCT_BENCHMARKS.hardToPayer) : null;
  const alignScore = inputs.productAlignmentRate !== null
    ? rateToScore(inputs.productAlignmentRate, PRODUCT_BENCHMARKS.alignment) : null;
  const stability = inputs.weeklyRates.length >= 2
    ? stabilityScore(inputs.weeklyRates) : null;

  const components: { score: number; weight: number }[] = [];
  if (signupScore !== null) components.push({ score: signupScore, weight: 30 });
  if (payerScore !== null) components.push({ score: payerScore, weight: 35 });
  if (alignScore !== null) components.push({ score: alignScore, weight: 20 });
  if (stability !== null) components.push({ score: stability, weight: 15 });

  if (components.length === 0) {
    return { score: 0, breakdown: { signup: null, payer: null, alignment: null, stability: null } };
  }

  const totalWeight = components.reduce((sum, c) => sum + c.weight, 0);
  const weighted = components.reduce((sum, c) => sum + c.score * (c.weight / totalWeight), 0);

  return {
    score: Math.round(weighted),
    breakdown: {
      signup: signupScore !== null ? Math.round(signupScore) : null,
      payer: payerScore !== null ? Math.round(payerScore) : null,
      alignment: alignScore !== null ? Math.round(alignScore) : null,
      stability: stability,
    },
  };
}
