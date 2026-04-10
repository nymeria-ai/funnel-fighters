'use client';
import { geometricMean, getScoreColorHex, getScoreLabel } from '@/lib/scoring';

interface FunnelScoreProps {
  scores: (number | null)[];
}

export default function FunnelScore({ scores }: FunnelScoreProps) {
  const score = geometricMean(scores);
  const colorHex = getScoreColorHex(score);
  const label = getScoreLabel(score);

  // SVG ring
  const size = 160;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 100) * circumference : 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2A2A32"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colorHex}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold" style={{ color: colorHex }}>
            {score !== null ? score : '—'}
          </span>
          <span className="text-xs text-text-muted mt-1">{label}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary mt-3">Overall Funnel Score</p>
      <p className="text-xs text-text-muted">Geometric mean of 4 ducks</p>
    </div>
  );
}
