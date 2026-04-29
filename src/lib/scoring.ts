export type ScoreColor = 'gray' | 'red' | 'orange' | 'green' | 'gold';

export function getScoreColor(score: number | null): ScoreColor {
  if (score === null || score === undefined) return 'gray';
  if (score <= 30) return 'red';
  if (score <= 60) return 'orange';
  if (score <= 80) return 'green';
  return 'gold';
}

export function getScoreColorHex(score: number | null): string {
  const color = getScoreColor(score);
  const map: Record<ScoreColor, string> = {
    gray: '#6B7280',
    red: '#EF4444',
    orange: '#F97316',
    green: '#22C55E',
    gold: '#EAB308',
  };
  return map[color];
}

export function getScoreLabel(score: number | null): string {
  if (score === null || score === undefined) return 'No Data';
  if (score <= 30) return 'Poor';
  if (score <= 60) return 'Needs Work';
  if (score <= 80) return 'Good';
  return 'Excellent';
}

export function geometricMean(scores: (number | null)[]): number | null {
  const valid = scores.filter((s): s is number => s !== null && s > 0);
  if (valid.length === 0) return null;
  const product = valid.reduce((acc, s) => acc * s, 1);
  return Math.round(Math.pow(product, 1 / valid.length));
}

export type DuckType = 'audience' | 'ads' | 'landing_pages' | 'product';

export interface DuckData extends Record<string, unknown> {
  type: DuckType;
  label: string;
  emoji: string;
  score: number | null;
  trend: number[];
  subLabel: string;
}
