/**
 * Color utilities for relevance scores.
 * Safe to import from both client and server components.
 */

export function getRelevanceColor(score: number): string {
  if (score >= 91) return '#059669';
  if (score >= 81) return '#16A34A';
  if (score >= 71) return '#22C55E';
  if (score >= 61) return '#84CC16';
  if (score >= 51) return '#A3E635';
  if (score >= 41) return '#EAB308';
  if (score >= 31) return '#FB923C';
  if (score >= 21) return '#F97316';
  if (score >= 11) return '#EF4444';
  return '#DC2626';
}
