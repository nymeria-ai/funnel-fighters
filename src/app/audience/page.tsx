'use client';
import { getScoreColorHex, getScoreLabel } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

export default function AudiencePage() {
  const score = 62;
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DuckIcon color={getScoreColorHex(score)} size={48} />
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Audience</h1>
            <p className="text-xs text-text-muted mt-1">The source. Pure water, murky water, or dirty water?</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: getScoreColorHex(score) }}>{score}</div>
          <div className="text-xs" style={{ color: getScoreColorHex(score) }}>{getScoreLabel(score)}</div>
        </div>
      </div>

      {/* Water Quality Visualization */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
        <div className="bg-bg-card border border-bg-border rounded-xl p-5 text-center">
          <DuckIcon color="#22C55E" size={56} className="mx-auto mb-2" />
          <div className="text-sm font-medium text-score-green">Pure Water</div>
          <div className="text-xs text-text-muted mt-1">Brand search, direct intent</div>
          <div className="text-2xl font-bold text-score-green mt-3">72</div>
          <div className="text-xs text-text-muted">35% of traffic</div>
        </div>
        <div className="bg-bg-card border border-bg-border rounded-xl p-5 text-center">
          <DuckIcon color="#F97316" size={56} className="mx-auto mb-2" />
          <div className="text-sm font-medium text-score-orange">Murky Water</div>
          <div className="text-xs text-text-muted mt-1">Category search, mixed intent</div>
          <div className="text-2xl font-bold text-score-orange mt-3">55</div>
          <div className="text-xs text-text-muted">45% of traffic</div>
        </div>
        <div className="bg-bg-card border border-bg-border rounded-xl p-5 text-center">
          <DuckIcon color="#EF4444" size={56} className="mx-auto mb-2" />
          <div className="text-sm font-medium text-score-red">Dirty Water</div>
          <div className="text-xs text-text-muted mt-1">Broad push, low intent</div>
          <div className="text-2xl font-bold text-score-red mt-3">28</div>
          <div className="text-xs text-text-muted">20% of traffic</div>
        </div>
      </div>

      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4">
        <span className="text-xs font-medium text-score-orange">⚡ Next Action</span>
        <p className="text-xs text-text-secondary mt-1">
          Connect Snowflake/Looker via Ido to get real audience quality segmentation data.
          Currently showing estimates based on Google Ads campaign types.
        </p>
      </div>

      <div className="mt-4 text-center">
        <span className="text-xs text-text-muted px-2 py-1 bg-bg-hover rounded">MOCK DATA — Awaiting BI integration</span>
      </div>
    </div>
  );
}
