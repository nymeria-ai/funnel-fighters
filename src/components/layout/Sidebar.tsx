'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Overview', icon: '🎯' },
  { href: '/audience', label: 'Audience', icon: '🦆' },
  { href: '/ads', label: 'Ads', icon: '🦆' },
  { href: '/landing-pages', label: 'Landing Pages', icon: '🦆' },
  { href: '/product', label: 'Product', icon: '🦆' },
  { href: '/gaps', label: 'Gaps & Actions', icon: '⚡' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] bg-bg-secondary border-r border-bg-border flex flex-col z-50">
      <div className="p-5 border-b border-bg-border">
        <h1 className="text-lg font-bold text-text-primary flex items-center gap-2">
          🥊 <span>Funnel Fighters</span>
        </h1>
        <p className="text-xs text-text-muted mt-1">Performance HQ</p>
      </div>

      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-text-primary bg-bg-hover border-r-2 border-accent-blue'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
              }`}
            >
              <span className="text-base">{item.icon}</span>
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
    </aside>
  );
}
