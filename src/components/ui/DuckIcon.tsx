'use client';

interface DuckIconProps {
  color: string;
  size?: number;
  className?: string;
}

/**
 * Funnel Fighters rubber duck — vector illustration.
 * Color-coded by score: red/orange/green/gold/gray.
 */
export default function DuckIcon({ color, size = 64, className = '' }: DuckIconProps) {
  // Derive a lighter shade for highlights
  const lighten = (hex: string, amount: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, (num >> 16) + amount);
    const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
    const b = Math.min(255, (num & 0x0000ff) + amount);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  };

  const darken = (hex: string, amount: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.max(0, (num >> 16) - amount);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
    const b = Math.max(0, (num & 0x0000ff) - amount);
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
  };

  const highlight = lighten(color, 60);
  const shadow = darken(color, 40);
  const beakColor = '#F59E0B';
  const beakDark = '#D97706';
  const eyeWhite = '#FFFFFF';
  const eyePupil = '#1A1A1F';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body */}
      <ellipse cx="50" cy="62" rx="34" ry="28" fill={color} />
      {/* Body highlight */}
      <ellipse cx="44" cy="55" rx="20" ry="14" fill={highlight} opacity="0.3" />
      {/* Body shadow */}
      <ellipse cx="54" cy="76" rx="26" ry="10" fill={shadow} opacity="0.3" />

      {/* Tail */}
      <path
        d="M18 55 C12 48, 10 40, 16 35 C18 38, 20 44, 24 50"
        fill={color}
        stroke={shadow}
        strokeWidth="1"
      />
      <path
        d="M16 35 C14 30, 18 26, 22 30 C20 34, 18 36, 18 40"
        fill={color}
        stroke={shadow}
        strokeWidth="0.5"
      />

      {/* Neck */}
      <ellipse cx="62" cy="44" rx="14" ry="16" fill={color} />

      {/* Head */}
      <circle cx="66" cy="30" r="16" fill={color} />
      {/* Head highlight */}
      <circle cx="62" cy="26" r="9" fill={highlight} opacity="0.25" />

      {/* Beak */}
      <ellipse cx="82" cy="32" rx="10" ry="5" fill={beakColor} />
      <ellipse cx="82" cy="34" rx="9" ry="4" fill={beakDark} />
      {/* Beak detail */}
      <ellipse cx="84" cy="31" rx="6" ry="2.5" fill={lighten(beakColor, 40)} opacity="0.4" />

      {/* Eye */}
      <circle cx="72" cy="26" r="5" fill={eyeWhite} />
      <circle cx="73" cy="25.5" r="3" fill={eyePupil} />
      {/* Eye shine */}
      <circle cx="74" cy="24" r="1.2" fill={eyeWhite} />

      {/* Wing */}
      <path
        d="M38 52 C32 56, 30 64, 36 70 C40 66, 42 60, 42 54 Z"
        fill={shadow}
        opacity="0.4"
      />

      {/* Water line ripple (subtle) */}
      <ellipse cx="50" cy="86" rx="36" ry="4" fill={shadow} opacity="0.15" />
    </svg>
  );
}
