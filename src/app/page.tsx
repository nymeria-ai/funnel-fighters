'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DuckCard from '@/components/ducks/DuckCard';
import FunnelScore from '@/components/ducks/FunnelScore';
import CohortTable from '@/components/charts/CohortTable';
import RightPanel from '@/components/layout/RightPanel';
import { mockDucks, mockCohorts } from '@/data/mock';
import { DuckData, getScoreColorHex, getScoreLabel } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

const duckRoutes: Record<string, string> = {
  audience: '/audience',
  ads: '/ads',
  landing_pages: '/landing-pages',
  product: '/product',
};

export default function HomePage() {
  const router = useRouter();
  const [selectedDuck, setSelectedDuck] = useState<DuckData | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const scores = mockDucks.map(d => d.score);

  const handleDuckClick = (duck: DuckData) => {
    setSelectedDuck(duck);
    setPanelOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Funnel Overview</h1>
        <p className="text-sm text-text-muted mt-1">
          Get your ducks in a row. Improve the whole funnel.
        </p>
      </div>

      {/* Top Section: Score + Ducks */}
      <div className="grid grid-cols-5 gap-6 mb-8">
        {/* Overall Score */}
        <div className="bg-bg-card border border-bg-border rounded-xl p-6 flex items-center justify-center">
          <FunnelScore scores={scores} />
        </div>

        {/* 4 Duck Cards */}
        <div className="col-span-4 grid grid-cols-4 gap-4">
          {mockDucks.map(duck => (
            <DuckCard
              key={duck.type}
              duck={duck}
              onClick={() => handleDuckClick(duck)}
            />
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4 mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-score-orange">⚠️</span>
          <span className="text-sm font-medium text-score-orange">Attention Needed</span>
        </div>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>• <strong>Ads</strong> duck scored 47 (Needs Work) — AI Agents campaign has low CTR and misaligned targeting</li>
          <li>• <strong>4 integrations</strong> pending — Meta, YouTube, LinkedIn, Product Analytics not connected</li>
          <li>• <strong>Product</strong> duck needs data — no product analytics access yet</li>
        </ul>
      </div>

      {/* Cohort Table */}
      <CohortTable data={mockCohorts} />

      {/* Right Panel */}
      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedDuck ? `${selectedDuck.label} — Details` : 'Details'}
      >
        {selectedDuck && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DuckIcon color={getScoreColorHex(selectedDuck.score)} size={40} />
                <div>
                  <div className="text-2xl font-bold" style={{ color: getScoreColorHex(selectedDuck.score) }}>
                    {selectedDuck.score}
                  </div>
                  <div className="text-xs text-text-muted">{getScoreLabel(selectedDuck.score)}</div>
                </div>
              </div>
              <button
                onClick={() => router.push(duckRoutes[selectedDuck.type])}
                className="px-3 py-1.5 bg-accent-blue text-white text-xs rounded-lg hover:bg-blue-600"
              >
                Full Analysis →
              </button>
            </div>

            <div className="border-t border-bg-border pt-3">
              <h4 className="text-xs font-medium text-text-muted mb-2">SCORE BREAKDOWN</h4>
              <div className="space-y-2">
                {selectedDuck.type === 'ads' && (
                  <>
                    <ScoreRow label="CTR Quality" value={52} />
                    <ScoreRow label="Creative Freshness" value={38} />
                    <ScoreRow label="Message-LP Alignment" value={45} />
                    <ScoreRow label="Cost Trend" value={53} />
                  </>
                )}
                {selectedDuck.type === 'audience' && (
                  <>
                    <ScoreRow label="Source Conversion Quality" value={65} />
                    <ScoreRow label="Cost Efficiency Trend" value={58} />
                    <ScoreRow label="Audience-to-Paying Alignment" value={63} />
                  </>
                )}
                {selectedDuck.type === 'landing_pages' && (
                  <>
                    <ScoreRow label="Visit-to-Signup Rate" value={75} />
                    <ScoreRow label="Google PageRank" value={62} />
                    <ScoreRow label="Page Speed" value={70} />
                    <ScoreRow label="Ad-LP Alignment" value={77} />
                  </>
                )}
                {selectedDuck.type === 'product' && (
                  <>
                    <ScoreRow label="Signup-to-Activation" value={48} />
                    <ScoreRow label="Activation-to-Paying" value={42} />
                    <ScoreRow label="Day-7 Retention" value={72} />
                    <ScoreRow label="Time to Value" value={58} />
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-bg-border pt-3">
              <h4 className="text-xs font-medium text-text-muted mb-2">TREND (8 WEEKS)</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm text-text-secondary">
                  {selectedDuck.trend[0]} → {selectedDuck.trend[selectedDuck.trend.length - 1]}
                </span>
                <span className="text-xs text-score-green">
                  +{selectedDuck.trend[selectedDuck.trend.length - 1] - selectedDuck.trend[0]} pts
                </span>
              </div>
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const colorHex = getScoreColorHex(value);
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-bg-hover rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${value}%`, backgroundColor: colorHex }}
          />
        </div>
        <span className="text-xs font-medium w-8 text-right" style={{ color: colorHex }}>
          {value}
        </span>
      </div>
    </div>
  );
}
