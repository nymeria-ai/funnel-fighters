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
 * Position 1 → 10, position >= worstPosition → 1.
 */
export function gscPositionToScore(position: number): number {
  const { bestPosition, worstPosition } = RANKING_CONFIG.gsc;
  if (position <= bestPosition) return 10;
  if (position >= worstPosition) return 1;
  // Linear interpolation: position 1 → 10, position 50 → 1
  return Math.round((1 + (9 * (worstPosition - position)) / (worstPosition - bestPosition)) * 10) / 10;
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
