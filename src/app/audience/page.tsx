'use client';
import { useState, useEffect } from 'react';
import DuckIcon from '@/components/ui/DuckIcon';

interface AccountData {
  name: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
  campaignCount?: number;
}

interface CampaignData {
  id: string;
  name: string;
  status: string;
  channelType: string;
  spend: number;
  clicks: number;
  impressions: number;
  conversions: number;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

export default function AudiencePage() {
  const [accounts, setAccounts] = useState<AccountData[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ads?level=accounts')
      .then(r => r.json())
      .then(data => {
        setAccounts(data.accounts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadCampaigns = async (accountName: string) => {
    if (selectedAccount === accountName) {
      setSelectedAccount(null);
      return;
    }
    setSelectedAccount(accountName);
    try {
      const res = await fetch(`/api/ads?level=campaigns&accountName=${encodeURIComponent(accountName)}`);
      const data = await res.json();
      setCampaigns(data.campaigns || []);
    } catch {
      setCampaigns([]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <DuckIcon color="#F97316" size={48} />
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Audience</h1>
          <p className="text-xs text-text-muted mt-1">Target audience definitions across ad channels.</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-score-orange" />
          <span className="text-xs text-text-muted">Partial — Google Ads only</span>
        </div>
      </div>

      {/* Status Card */}
      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4 mb-6">
        <span className="text-xs font-medium text-score-orange">Google Ads Targeting</span>
        <p className="text-xs text-text-secondary mt-1">
          Showing audience targeting criteria defined in Google Ads campaigns. Meta, YouTube, and LinkedIn targeting not yet connected.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-bg-card animate-pulse rounded-xl" />)}
        </div>
      ) : accounts.length === 0 ? (
        <div className="bg-bg-card border border-bg-border rounded-xl p-12 text-center">
          <DuckIcon color="#6B7280" size={80} className="mx-auto mb-4 opacity-40" />
          <h2 className="text-lg font-semibold text-text-primary mb-2">No Accounts Found</h2>
        </div>
      ) : (
        <div className="space-y-2">
          {accounts.map((acc) => (
            <div key={acc.name}>
              <button
                onClick={() => loadCampaigns(acc.name)}
                className="w-full bg-bg-card border border-bg-border rounded-xl p-4 hover:border-bg-hover transition-all text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-muted">{selectedAccount === acc.name ? '▼' : '▶'}</span>
                    <span className="text-sm font-medium text-text-primary">{acc.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{formatNumber(acc.impressions)} imp</span>
                    <span>{formatNumber(acc.clicks)} clicks</span>
                    <span>{Math.round(acc.conversions)} conv</span>
                  </div>
                </div>
              </button>

              {selectedAccount === acc.name && campaigns.length > 0 && (
                <div className="ml-6 mt-1 space-y-1">
                  {campaigns.slice(0, 20).map((c) => (
                    <div key={c.id} className="bg-bg-hover/50 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-text-primary">{c.name}</span>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-card text-text-muted">{c.channelType || 'SEARCH'}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${c.status === 'ENABLED' ? 'bg-score-green/20 text-score-green' : 'bg-bg-card text-text-muted'}`}>
                            {c.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right text-xs text-text-muted">
                        <div>{formatNumber(c.clicks)} clicks</div>
                        <div>{Math.round(c.conversions)} conv</div>
                      </div>
                    </div>
                  ))}
                  {campaigns.length > 20 && (
                    <p className="text-xs text-text-muted pl-3">+{campaigns.length - 20} more campaigns</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Missing Integrations */}
      <div className="bg-bg-card border border-score-orange/30 rounded-xl p-4 mt-6">
        <span className="text-xs font-medium text-score-orange">Missing Channels</span>
        <ul className="mt-2 space-y-1 text-xs text-text-secondary">
          <li>• <strong>Meta Ads</strong> — audience targeting & lookalike definitions</li>
          <li>• <strong>YouTube</strong> — video audience segments</li>
          <li>• <strong>LinkedIn</strong> — B2B targeting criteria</li>
        </ul>
      </div>
    </div>
  );
}
