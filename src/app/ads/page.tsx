'use client';
import { useState } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import { mockChannels, ChannelData, CampaignData, AdGroupData, AdData } from '@/data/mock';
import { getScoreColorHex, getScoreLabel } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

type DrillLevel = 'channels' | 'campaigns' | 'adgroups' | 'ads';

export default function AdsPage() {
  const [level, setLevel] = useState<DrillLevel>('channels');
  const [selectedChannel, setSelectedChannel] = useState<ChannelData | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [selectedAdGroup, setSelectedAdGroup] = useState<AdGroupData | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [panelContent, setPanelContent] = useState<React.ReactNode>(null);

  const overallScore = 47;

  const openPanel = (title: string, content: React.ReactNode) => {
    setPanelTitle(title);
    setPanelContent(content);
    setPanelOpen(true);
  };

  const breadcrumb = () => {
    const parts: { label: string; onClick: () => void; isDuck?: boolean }[] = [
      { label: 'Ads', onClick: () => { setLevel('channels'); setSelectedChannel(null); }, isDuck: true },
    ];
    if (selectedChannel) {
      parts.push({ label: `${selectedChannel.icon} ${selectedChannel.name}`, onClick: () => { setLevel('campaigns'); setSelectedCampaign(null); } });
    }
    if (selectedCampaign) {
      parts.push({ label: selectedCampaign.name, onClick: () => { setLevel('adgroups'); setSelectedAdGroup(null); } });
    }
    if (selectedAdGroup) {
      parts.push({ label: selectedAdGroup.name, onClick: () => {} });
    }
    return parts;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {breadcrumb().map((b: { label: string; onClick: () => void; isDuck?: boolean }, i: number) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-text-muted">/</span>}
                <button onClick={b.onClick} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {b.isDuck && <DuckIcon color={getScoreColorHex(overallScore)} size={24} />}
                  {b.label}
                </button>
              </span>
            ))}
          </div>
          <p className="text-xs text-text-muted">The ad is a filter, not a persuasion tool. Be clear, not clever.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold" style={{ color: getScoreColorHex(overallScore) }}>
            {overallScore}
          </div>
          <div className="text-xs" style={{ color: getScoreColorHex(overallScore) }}>
            {getScoreLabel(overallScore)}
          </div>
        </div>
      </div>

      {/* Channels View */}
      {level === 'channels' && (
        <div className="grid grid-cols-5 gap-4">
          {mockChannels.map(ch => (
            <button
              key={ch.id}
              onClick={() => {
                if (ch.campaigns.length > 0) {
                  setSelectedChannel(ch);
                  setLevel('campaigns');
                } else {
                  openPanel(`${ch.icon} ${ch.name}`, (
                    <div className="space-y-3">
                      <div className="text-sm text-text-muted">
                        {ch.connected ? 'Connected but no campaign data yet.' : 'Not connected.'}
                      </div>
                      <div className="bg-bg-hover rounded-lg p-3">
                        <span className="text-xs font-medium text-score-orange">⚡ Action Required</span>
                        <p className="text-xs text-text-secondary mt-1">Connect {ch.name} API to start tracking.</p>
                      </div>
                    </div>
                  ));
                }
              }}
              className="bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{ch.icon}</span>
                {ch.connected ? (
                  <span className="w-2 h-2 rounded-full bg-score-green" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-score-gray" />
                )}
              </div>
              <div className="text-sm font-medium text-text-primary">{ch.name}</div>
              <div className="mt-2">
                <span className="text-2xl font-bold" style={{ color: getScoreColorHex(ch.score) }}>
                  {ch.score ?? '—'}
                </span>
                <span className="text-xs ml-2" style={{ color: getScoreColorHex(ch.score) }}>
                  {getScoreLabel(ch.score)}
                </span>
              </div>
              {ch.connected && ch.spend > 0 && (
                <div className="mt-3 text-xs text-text-muted space-y-1">
                  <div>Spend: ${(ch.spend / 1000).toFixed(0)}K</div>
                  <div>CTR: {ch.ctr.toFixed(2)}%</div>
                  <div>CPA: ${ch.cpa.toFixed(2)}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Campaigns View */}
      {level === 'campaigns' && selectedChannel && (
        <div className="space-y-3">
          {selectedChannel.campaigns.map(camp => (
            <button
              key={camp.id}
              onClick={() => { setSelectedCampaign(camp); setLevel('adgroups'); }}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{camp.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    camp.status === 'active' ? 'bg-score-green/20 text-score-green' :
                    camp.status === 'paused' ? 'bg-score-orange/20 text-score-orange' :
                    'bg-bg-hover text-text-muted'
                  }`}>
                    {camp.status}
                  </span>
                </div>
                <div className="flex gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: ${(camp.spend / 1000).toFixed(0)}K</span>
                  <span>Impressions: {(camp.impressions / 1000000).toFixed(1)}M</span>
                  <span>CTR: {camp.ctr.toFixed(2)}%</span>
                  <span>CPA: ${camp.cpa.toFixed(2)}</span>
                  <span>Conversions: {camp.conversions.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-2xl font-bold" style={{ color: getScoreColorHex(camp.score) }}>
                  {camp.score ?? '—'}
                </div>
                <div className="text-xs" style={{ color: getScoreColorHex(camp.score) }}>
                  {getScoreLabel(camp.score)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Ad Groups View */}
      {level === 'adgroups' && selectedCampaign && (
        <div className="space-y-3">
          {selectedCampaign.adGroups.map(ag => (
            <button
              key={ag.id}
              onClick={() => { setSelectedAdGroup(ag); setLevel('ads'); }}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">{ag.name}</div>
                <div className="flex gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: ${(ag.spend / 1000).toFixed(0)}K</span>
                  <span>Clicks: {ag.clicks.toLocaleString()}</span>
                  <span>Conversions: {ag.conversions.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-2xl font-bold" style={{ color: getScoreColorHex(ag.score) }}>
                  {ag.score ?? '—'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Individual Ads View */}
      {level === 'ads' && selectedAdGroup && (
        <div className="space-y-3">
          {selectedAdGroup.ads.map(ad => (
            <button
              key={ad.id}
              onClick={() => openPanel(`📄 ${ad.name}`, (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold" style={{ color: getScoreColorHex(ad.score) }}>{ad.score}</span>
                    <span className="text-xs px-2 py-1 bg-bg-hover rounded">{ad.type}</span>
                  </div>
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between"><span>Spend</span><span>${ad.spend.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Impressions</span><span>{ad.impressions.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Clicks</span><span>{ad.clicks.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>Conversions</span><span>{ad.conversions.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>CTR</span><span>{((ad.clicks / ad.impressions) * 100).toFixed(2)}%</span></div>
                    <div className="flex justify-between"><span>CPA</span><span>${(ad.spend / ad.conversions).toFixed(2)}</span></div>
                  </div>
                  <div className="border-t border-bg-border pt-3">
                    <span className="text-xs font-medium text-text-muted">DESTINATION</span>
                    <a href={ad.destinationUrl} target="_blank" className="block text-xs text-accent-blue mt-1 hover:underline truncate">
                      {ad.destinationUrl}
                    </a>
                  </div>
                </div>
              ))}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{ad.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-bg-hover rounded text-text-muted">{ad.type}</span>
                </div>
                <div className="flex gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: ${ad.spend.toLocaleString()}</span>
                  <span>Clicks: {ad.clicks.toLocaleString()}</span>
                  <span>Conv: {ad.conversions.toLocaleString()}</span>
                  <span className="text-accent-blue truncate max-w-[200px]">{ad.destinationUrl}</span>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-2xl font-bold" style={{ color: getScoreColorHex(ad.score) }}>
                  {ad.score ?? '—'}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <RightPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} title={panelTitle}>
        {panelContent}
      </RightPanel>
    </div>
  );
}
