interface QualityBadgeProps {
  score: number | null;
  label: string;
}

function getColor(score: number): string {
  if (score >= 75) return '#22C55E';
  if (score >= 50) return '#EAB308';
  if (score >= 25) return '#F97316';
  return '#EF4444';
}

export default function QualityBadge({ score, label }: QualityBadgeProps) {
  return (
    <div className="flex flex-col items-center gap-0.5 min-w-[52px]">
      <span className="text-[9px] text-text-muted uppercase tracking-wider whitespace-nowrap">{label}</span>
      {score === null ? (
        <span className="text-xs text-text-muted">—</span>
      ) : (
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full tabular-nums"
          style={{
            backgroundColor: `${getColor(score)}20`,
            color: getColor(score),
            border: `1px solid ${getColor(score)}50`,
          }}
        >
          {score}
        </span>
      )}
    </div>
  );
}
