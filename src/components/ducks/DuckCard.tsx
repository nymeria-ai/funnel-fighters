'use client';
import { DuckData, getScoreColor, getScoreColorHex, getScoreLabel } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

interface DuckCardProps {
  duck: DuckData;
  onClick: () => void;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h * 0.8 - h * 0.1;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function DuckCard({ duck, onClick }: DuckCardProps) {
  const color = getScoreColor(duck.score);
  const colorHex = getScoreColorHex(duck.score);
  const label = getScoreLabel(duck.score);

  return (
    <button
      onClick={onClick}
      className="bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all cursor-pointer text-left w-full group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <DuckIcon color={colorHex} size={48} />
          <div>
            <span className="text-sm font-medium text-text-primary block">{duck.label}</span>
            <p className="text-xs text-text-muted">{duck.subLabel}</p>
          </div>
        </div>
        <div className="text-right">
          <div
            className="text-3xl font-bold"
            style={{ color: colorHex }}
          >
            {duck.score !== null ? duck.score : '—'}
          </div>
          <div
            className="text-xs font-medium mt-0.5"
            style={{ color: colorHex }}
          >
            {label}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <MiniSparkline data={duck.trend} color={colorHex} />
        <span className="text-xs text-text-muted group-hover:text-accent-blue transition-colors">
          View details →
        </span>
      </div>
    </button>
  );
}
