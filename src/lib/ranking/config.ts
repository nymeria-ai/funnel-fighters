export const RANKING_CONFIG = {
  weights: {
    gsc_position: 0.5,
    ahrefs_ur: 0.5,
  },
  // Normalize GSC position (1=best) to 1-10 score (10=best)
  gsc: {
    bestPosition: 1,
    worstPosition: 50, // positions >= 50 get score 1
  },
  // Normalize Ahrefs UR (0-100) to 1-10 score
  ahrefs: {
    minUR: 0,
    maxUR: 100,
  },
};

/**
 * Convert GSC average position to a 1-10 score (10 = best).
 * 
 * Aggressive curve reflecting real-world CTR drop-off:
 *   Position 1    → 10
 *   Position 2    → 9
 *   Position 3    → 8
 *   Position 4-5  → 6-7  (still page 1, but below the fold)
 *   Position 6-10 → 3-5  (bottom of page 1)
 *   Position 11-20 → 1.5-2.5 (page 2 = almost invisible)
 *   Position 21+  → 1
 */
export function gscPositionToScore(position: number): number {
  if (position <= 1) return 10;
  if (position <= 3) return Math.round((10 - (position - 1)) * 10) / 10;        // 2→9, 3→8
  if (position <= 5) return Math.round((8 - (position - 3) * 1.5) * 10) / 10;   // 4→6.5, 5→5
  if (position <= 10) return Math.round((5 - (position - 5) * 0.4) * 10) / 10;  // 6→4.6, 10→3
  if (position <= 20) return Math.round((2.5 - (position - 11) * 0.15) * 10) / 10; // 11→2.5, 20→1.2
  return 1;
}

/**
 * Convert Ahrefs URL Rating (0-100) to a 1-10 score.
 */
export function ahrefsURToScore(ur: number): number {
  const { minUR, maxUR } = RANKING_CONFIG.ahrefs;
  const clamped = Math.max(minUR, Math.min(maxUR, ur));
  return Math.round((1 + (9 * (clamped - minUR)) / (maxUR - minUR)) * 10) / 10;
}

/**
 * Combine individual metric scores into a weighted composite score (1-10).
 */
export function computeCompositeScore(
  scores: { gscScore?: number | null; ahrefsScore?: number | null }
): number | null {
  const { weights } = RANKING_CONFIG;
  const parts: { score: number; weight: number }[] = [];

  if (scores.gscScore != null) {
    parts.push({ score: scores.gscScore, weight: weights.gsc_position });
  }
  if (scores.ahrefsScore != null) {
    parts.push({ score: scores.ahrefsScore, weight: weights.ahrefs_ur });
  }

  if (parts.length === 0) return null;

  // Re-normalize weights so they sum to 1
  const totalWeight = parts.reduce((s, p) => s + p.weight, 0);
  const weighted = parts.reduce((s, p) => s + (p.score * p.weight) / totalWeight, 0);
  return Math.round(weighted * 10) / 10;
}
