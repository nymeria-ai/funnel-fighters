'use client';
import { useState, useEffect } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import { getScoreColorHex, getScoreLabel } from '@/lib/scoring';
import DuckIcon from '@/components/ui/DuckIcon';

interface AccountData {
  id: string;
  name: string;
  campaignCount: number;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  ctr: number;
  cpa: number;
}

interface CampaignData {
  accountId: string;
  campaignId: string;
  campaignName: string;
  status: string;
  channelType: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  spend: number;
  conversions: number;
  ctr: number;
  cpa: number;
}

interface AdData {
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adName: string;
  adType: string;
  status: string;
  finalUrls: string[];
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

type DrillLevel = 'accounts' | 'campaigns' | 'ads';

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function AdsPage() {
  const [level, setLevel] = useState<DrillLevel>('accounts');
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [ads, setAds] = useState<AdData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<AccountData | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelTitle, setPanelTitle] = useState('');
  const [panelContent, setPanelContent] = useState<React.ReactNode>(null);

  // Fetch accounts on load
  useEffect(() => {
    fetch('/api/ads?level=accounts')
      .then(r => r.json())
      .then(data => {
        setAccounts(data.accounts || []);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const drillToCampaigns = async (account: AccountData) => {
    setSelectedAccount(account);
    setLevel('campaigns');
    setLoading(true);
    try {
      const res = await fetch(`/api/ads?level=campaigns&accountId=${account.id}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
    setLoading(false);
  };

  const drillToAds = async (campaign: CampaignData) => {
    setSelectedCampaign(campaign);
    setLevel('ads');
    setLoading(true);
    try {
      const res = await fetch(`/api/ads?level=ads&accountId=${selectedAccount?.id}`);
      const data = await res.json();
      const filtered = (data.ads || []).filter((a: AdData) => a.campaignId === campaign.campaignId);
      setAds(filtered);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    }
    setLoading(false);
  };

  const totalSpend = accounts.reduce((s, a) => s + a.spend, 0);

  const breadcrumb = () => {
    const parts: { label: string; onClick: () => void; isDuck?: boolean }[] = [
      { label: 'Ads', onClick: () => { setLevel('accounts'); setSelectedAccount(null); }, isDuck: true },
    ];
    if (selectedAccount) {
      parts.push({ label: selectedAccount.name, onClick: () => { setLevel('campaigns'); setSelectedCampaign(null); } });
    }
    if (selectedCampaign) {
      parts.push({ label: selectedCampaign.campaignName.split('-').slice(3, 5).join(' '), onClick: () => {} });
    }
    return parts;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {breadcrumb().map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <span className="text-text-muted">/</span>}
                <button onClick={b.onClick} className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {b.isDuck && <DuckIcon color="#3B82F6" size={24} />}
                  {b.label}
                </button>
              </span>
            ))}
          </div>
          <p className="text-xs text-text-muted">
            {level === 'accounts' ? `Live data from Google Ads MCC · Last 30 days · ${formatCurrency(totalSpend)} total spend` :
             level === 'campaigns' ? `${selectedAccount?.name} · ${campaigns.length} campaigns` :
             `${selectedCampaign?.campaignName}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-score-green animate-pulse" />
          <span className="text-xs text-text-muted">LIVE</span>
        </div>
      </div>

      {error && (
        <div className="bg-score-red/10 border border-score-red/30 rounded-xl p-4 mb-6 text-sm text-score-red">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-text-muted text-sm animate-pulse">Loading Google Ads data...</div>
        </div>
      )}

      {/* Accounts View */}
      {!loading && level === 'accounts' && (
        <div className="space-y-3">
          {accounts.map(acc => (
            <button
              key={acc.id}
              onClick={() => drillToCampaigns(acc)}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-text-primary">{acc.name}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 lg:gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: {formatCurrency(acc.spend)}</span>
                  <span>Clicks: {formatNumber(acc.clicks)}</span>
                  <span>Impressions: {formatNumber(acc.impressions)}</span>
                  <span>Conversions: {formatNumber(Math.round(acc.conversions))}</span>
                  <span>CTR: {acc.ctr.toFixed(2)}%</span>
                  <span>CPA: {formatCurrency(acc.cpa)}</span>
                  <span>{acc.campaignCount} campaigns</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-xl font-bold text-text-primary">{formatCurrency(acc.spend)}</div>
                <div className="text-xs text-text-muted">30d spend</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Campaigns View */}
      {!loading && level === 'campaigns' && (
        <div className="space-y-3">
          {campaigns.map(camp => (
            <button
              key={camp.campaignId}
              onClick={() => drillToAds(camp)}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{camp.campaignName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    camp.status === 'ENABLED' ? 'bg-score-green/20 text-score-green' :
                    camp.status === 'PAUSED' ? 'bg-score-orange/20 text-score-orange' :
                    'bg-bg-hover text-text-muted'
                  }`}>
                    {camp.status.toLowerCase()}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-bg-hover rounded text-text-muted">{camp.channelType}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 lg:gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: {formatCurrency(camp.spend)}</span>
                  <span>Clicks: {formatNumber(camp.clicks)}</span>
                  <span>Impressions: {formatNumber(camp.impressions)}</span>
                  <span>Conv: {Math.round(camp.conversions).toLocaleString()}</span>
                  <span>CTR: {(camp.ctr * 100).toFixed(2)}%</span>
                  <span>CPA: {formatCurrency(camp.cpa)}</span>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-xl font-bold text-text-primary">{formatCurrency(camp.spend)}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Ads View */}
      {!loading && level === 'ads' && (
        <div className="space-y-3">
          {ads.map(ad => (
            <button
              key={ad.adId}
              onClick={() => {
                setPanelTitle(ad.adName);
                setPanelContent(
                  <div className="space-y-3">
                    <div className="space-y-2 text-xs text-text-secondary">
                      <div className="flex justify-between"><span>Type</span><span>{ad.adType}</span></div>
                      <div className="flex justify-between"><span>Spend</span><span>{formatCurrency(ad.spend)}</span></div>
                      <div className="flex justify-between"><span>Impressions</span><span>{formatNumber(ad.impressions)}</span></div>
                      <div className="flex justify-between"><span>Clicks</span><span>{formatNumber(ad.clicks)}</span></div>
                      <div className="flex justify-between"><span>Conversions</span><span>{Math.round(ad.conversions)}</span></div>
                      <div className="flex justify-between"><span>CTR</span><span>{ad.impressions > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : 0}%</span></div>
                      <div className="flex justify-between"><span>CPA</span><span>{ad.conversions > 0 ? formatCurrency(ad.spend / ad.conversions) : 'N/A'}</span></div>
                    </div>
                    {ad.finalUrls.length > 0 && (
                      <div className="border-t border-bg-border pt-3">
                        <span className="text-xs font-medium text-text-muted">DESTINATION URLs</span>
                        {ad.finalUrls.map((url, i) => (
                          <a key={i} href={url} target="_blank" className="block text-xs text-accent-blue mt-1 hover:underline truncate">
                            {url}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
                setPanelOpen(true);
              }}
              className="w-full bg-bg-card border border-bg-border rounded-xl p-5 hover:border-bg-hover hover:bg-bg-hover transition-all text-left flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-primary">{ad.adGroupName}</span>
                  <span className="text-xs px-2 py-0.5 bg-bg-hover rounded text-text-muted">{ad.adType}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 lg:gap-6 mt-2 text-xs text-text-muted">
                  <span>Spend: {formatCurrency(ad.spend)}</span>
                  <span>Clicks: {formatNumber(ad.clicks)}</span>
                  <span>Conv: {Math.round(ad.conversions)}</span>
                  {ad.finalUrls[0] && <span className="text-accent-blue truncate max-w-[250px]">{ad.finalUrls[0]}</span>}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-lg font-bold text-text-primary">{formatCurrency(ad.spend)}</div>
              </div>
            </button>
          ))}
          {ads.length === 0 && (
            <div className="text-center py-10 text-text-muted text-sm">No ads found for this campaign</div>
          )}
        </div>
      )}

      <RightPanel isOpen={panelOpen} onClose={() => setPanelOpen(false)} title={panelTitle}>
        {panelContent}
      </RightPanel>
    </div>
  );
}
