'use client';
import { useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function CollapsibleSection({
  title,
  badge,
  badgeColor = '#6B7280',
  children,
  defaultOpen = false,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-bg-border rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-3 py-2.5 bg-bg-hover/50 hover:bg-bg-hover transition-colors text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-text-muted transition-transform duration-200" style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
          <span className="text-xs font-medium text-text-primary truncate">{title}</span>
        </div>
        {badge && (
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ml-2"
            style={{
              backgroundColor: `${badgeColor}20`,
              color: badgeColor,
              border: `1px solid ${badgeColor}40`,
            }}
          >
            {badge}
          </span>
        )}
      </button>
      <div
        className="transition-all duration-200 ease-in-out overflow-hidden"
        style={{ maxHeight: open ? '1000px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-3 py-3 border-t border-bg-border">
          {children}
        </div>
      </div>
    </div>
  );
}
