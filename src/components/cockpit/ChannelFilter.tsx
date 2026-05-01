'use client';

export const CHANNEL_OPTIONS = [
  { value: '', label: 'All Channels' },
  { value: 'meta', label: 'Meta' },
  { value: 'adwordssearch', label: 'Search' },
  { value: 'adwordsyoutube', label: 'YouTube / Demand Gen' },
  { value: 'adwordsdisplay', label: 'Display' },
  { value: 'adwordsvideo', label: 'Video' },
  { value: 'pmax', label: 'Performance Max' },
  { value: 'adwordsshopping', label: 'Shopping' },
];

interface ChannelFilterProps extends Record<string, unknown> {
  value: string;
  onChange: (value: string) => void;
}

export default function ChannelFilter({ value, onChange }: ChannelFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-bg-card border border-bg-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-blue transition-colors cursor-pointer"
    >
      {CHANNEL_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-bg-card">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
