'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DuckIcon from '@/components/ui/DuckIcon';

const navItems = [
  { href: '/cockpit', label: 'Cockpit', type: 'icon', icon: '🎛️' },
  { href: '/overview', label: 'Overview', type: 'icon', icon: '🎯' },
  { href: '/audience', label: 'Audience', type: 'duck', color: '#22C55E' },
  { href: '/ads', label: 'Ads', type: 'duck', color: '#F97316' },
  { href: '/landing-pages', label: 'Landing Pages', type: 'duck', color: '#22C55E' },
  { href: '/product', label: 'Product', type: 'duck', color: '#F97316' },
  { href: '/gaps', label: 'Gaps & Actions', type: 'icon', icon: '⚡' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      <div className="p-5 border-b border-bg-border">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-text-primary flex items-center gap-2">
            🥊 <span>Funnel Fighters</span>
          </h1>
          {/* Close button on mobile */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-text-muted hover:text-text-primary text-xl"
          >
            ✕
          </button>
        </div>
        <p className="text-xs text-text-muted mt-1">Performance HQ</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-text-primary bg-bg-hover border-r-2 border-accent-blue'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              {item.type === 'duck' ? (
                <DuckIcon color={item.color!} size={22} />
              ) : (
                <span className="text-base w-[22px] text-center">{item.icon}</span>
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-5 border-t border-bg-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
          <span className="text-xs text-text-muted">Google Ads connected</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-2 h-2 rounded-full bg-score-gray" />
          <span className="text-xs text-text-muted">4 integrations pending</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-bg-border px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-text-primary text-xl p-1"
          aria-label="Open menu"
        >
          ☰
        </button>
        <h1 className="text-sm font-bold text-text-primary flex items-center gap-2">
          🥊 Funnel Fighters
        </h1>
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-[260px] bg-bg-secondary border-r border-bg-border flex flex-col z-50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[220px] bg-bg-secondary border-r border-bg-border flex-col z-50">
        {navContent}
      </aside>
    </>
  );
}
