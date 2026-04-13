'use client';
import { useState, useEffect, useCallback } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import DuckIcon from '@/components/ui/DuckIcon';

interface AudienceInfo {
  campaignId: string;
  campaignName: string;
  criterionId: string;
  criterionType: string;
  criterionName: string;
  bidModifier: number;
}

interface CockpitRow {
  accountId: string;
  accountName: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  adGroupName: string;
  adId: string;
  adType: string;
  finalUrl: string;
  finalUrlDomain: string;
  headlines: string[];
  descriptions: string[];
  adSellingPoint: string;
  audience: AudienceInfo[];
  lpSellingPoint: string;
  lpError: boolean;
  relevanceScore: number;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
}

function getRelevanceColor(score: number): string {
  if (score >= 91) return '#059669';
  if (score >= 81) return '#16A34A';
  if (score >= 71) return '#22C55E';
  if (score >= 61) return '#84CC16';
  if (score >= 51) return '#A3E635';
  if (score >= 41) return '#EAB308';
  if (score >= 31) return '#FB923C';
  if (score >= 21) return '#F97316';
  if (score >= 11) return '#EF4444';
  return '#DC2626';
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

// Group rows by account → campaign
function groupRows(rows: CockpitRow[]): Map<string, Map<string, CockpitRow[]>> {
  const map = new Map<string, Map<string, CockpitRow[]>>();
  for (const row of rows) {
    const accountKey = `${row.accountId}:${row.accountName}`;
    if (!map.has(accountKey)) map.set(accountKey, new Map());
    const campaigns = map.get(accountKey)!;
    const campaignKey = `${row.campaignId}:${row.campaignName}`;
    if (!campaigns.has(campaignKey)) campaigns.set(campaignKey, []);
    campaigns.get(campaignKey)!.push(row);
  }
  return map;
}

export default function CockpitPage() {
  const [rows, setRows] = useState<CockpitRow[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [collapsedAccounts, setCollapsedAccounts] = useState<Set<string>>(new Set());
  const [collapsedCampaigns, setCollapsedCampaigns] = useState<Set<string>>(new Set());
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<CockpitRow | null>(null);
  const [page, setPage] = useState(1);

  const fetchData = useCallback(async (pageNum: number, analyze: boolean = true) => {
    if (analyze) setAnalyzing(true);
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/cockpit?page=${pageNum}&pageSize=50&analyze=${analyze}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setRows(data.rows || []);
      setPagination(data.pagination || null);
    } catch {
      setError('Failed to load cockpit data. Please try again.');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    // First load: fetch without analysis for quick render
    fetchData(1, false).then(() => {
      // Then re-fetch with analysis
      fetchData(1, true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = async () => {
    // Clear cache then re-fetch
    await fetch('/api/selling-points', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'clear-cache' }),
    });
    fetchData(page, true);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchData(newPage, true);
  };

  const toggleAccount = (key: string) => {
    setCollapsedAccounts(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const toggleCampaign = (key: string) => {
    setCollapsedCampaigns(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const openRow = (row: CockpitRow) => {
    setSelectedRow(row);
    setPanelOpen(true);
  };

  const grouped = groupRows(rows);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cockpit</h1>
          <p className="text-sm text-text-muted mt-1">
            4-duck alignment matrix — see how ads, landing pages, and audiences connect
          </p>
        </div>
        <div className="flex items-center gap-3">
          {analyzing && (
            <span className="text-xs text-accent-blue animate-pulse">Analyzing selling points...</span>
          )}
          <button
            onClick={handleRefresh}
            disabled={analyzing}
            className="px-3 py-1.5 bg-bg-card border border-bg-border rounded-lg text-xs text-text-secondary hover:text-text-primary hover:border-bg-hover transition-colors disabled:opacity-50"
          >
            Refresh Selling Points
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-bg-card border border-score-red/30 rounded-xl p-4 mb-6 text-sm text-score-red">
          {error}
        </div>
      )}

      {/* Table Header */}
      <div className="bg-bg-secondary border border-bg-border rounded-t-xl">
        <div className="grid grid-cols-[1.2fr_1.5fr_1.5fr_0.8fr] gap-0">
          <div className="px-4 py-3 border-r border-bg-border flex items-center gap-2">
            <DuckIcon color="#22C55E" size={22} />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Audience</span>
          </div>
          <div className="px-4 py-3 border-r border-bg-border flex items-center gap-2">
            <DuckIcon color="#F97316" size={22} />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Ads</span>
          </div>
          <div className="px-4 py-3 border-r border-bg-border flex items-center gap-2">
            <DuckIcon color="#EAB308" size={22} />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Landing Page</span>
          </div>
          <div className="px-4 py-3 flex items-center gap-2">
            <DuckIcon color="#3B82F6" size={22} />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Product</span>
          </div>
        </div>
      </div>

      {/* Table Body */}
      <div className="border-x border-b border-bg-border rounded-b-xl overflow-hidden">
        {loading && rows.length === 0 ? (
          <div className="p-8 text-center">
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-bg-card animate-pulse rounded-lg" />
              ))}
            </div>
            <p className="text-sm text-text-muted mt-4">Loading ads data...</p>
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-text-muted text-sm">
            No ads data available. Make sure Google Ads is connected.
          </div>
        ) : (
          Array.from(grouped.entries()).map(([accountKey, campaigns]) => {
            const [, accountName] = accountKey.split(':');
            const isAccountCollapsed = collapsedAccounts.has(accountKey);
            const accountAdCount = Array.from(campaigns.values()).reduce((sum, ads) => sum + ads.length, 0);

            return (
              <div key={accountKey}>
                {/* Account Header */}
                <button
                  onClick={() => toggleAccount(accountKey)}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-bg-hover/50 border-b border-bg-border hover:bg-bg-hover transition-colors text-left"
                >
                  <span className="text-xs text-text-muted">{isAccountCollapsed ? '▶' : '▼'}</span>
                  <span className="text-xs font-semibold text-text-primary">{accountName}</span>
                  <span className="text-xs text-text-muted">({accountAdCount} ads)</span>
                </button>

                {!isAccountCollapsed && Array.from(campaigns.entries()).map(([campaignKey, campaignRows]) => {
                  const [, campaignName] = campaignKey.split(':');
                  const isCampaignCollapsed = collapsedCampaigns.has(campaignKey);

                  return (
                    <div key={campaignKey}>
                      {/* Campaign Header */}
                      <button
                        onClick={() => toggleCampaign(campaignKey)}
                        className="w-full flex items-center gap-2 px-6 py-1.5 bg-bg-card/50 border-b border-bg-border hover:bg-bg-hover/30 transition-colors text-left"
                      >
                        <span className="text-xs text-text-muted">{isCampaignCollapsed ? '▶' : '▼'}</span>
                        <span className="text-xs text-text-secondary">{campaignName}</span>
                        <span className="text-xs text-text-muted">({campaignRows.length})</span>
                      </button>

                      {!isCampaignCollapsed && campaignRows.map((row) => (
                        <button
                          key={`${row.adId}-${row.adGroupId}`}
                          onClick={() => openRow(row)}
                          className="w-full grid grid-cols-[1.2fr_1.5fr_1.5fr_0.8fr] gap-0 border-b border-bg-border hover:bg-bg-hover/30 transition-colors text-left"
                        >
                          {/* Audience Column */}
                          <div className="px-4 py-3 border-r border-bg-border">
                            {row.audience.length > 0 ? (
                              <div className="space-y-1">
                                {row.audience.slice(0, 4).map((a) => (
                                  <div key={a.criterionId} className="flex items-center gap-1">
                                    <span className="text-[10px] px-1 py-0.5 rounded bg-bg-hover text-text-muted uppercase">
                                      {a.criterionType.replace('_', ' ').slice(0, 8)}
                                    </span>
                                    <span className="text-xs text-text-secondary truncate">
                                      {a.criterionName}
                                    </span>
                                  </div>
                                ))}
                                {row.audience.length > 4 && (
                                  <span className="text-[10px] text-text-muted">+{row.audience.length - 4} more</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-text-muted">No targeting data</span>
                            )}
                          </div>

                          {/* Ads Column */}
                          <div className="px-4 py-3 border-r border-bg-border">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[10px] px-1 py-0.5 rounded bg-accent-blue/20 text-accent-blue">
                                  {row.adType.replace('RESPONSIVE_SEARCH_AD', 'RSA').replace('EXPANDED_TEXT_AD', 'ETA')}
                                </span>
                                <span className="text-xs text-text-muted">
                                  {formatCurrency(row.spend)} · {row.clicks} clicks
                                </span>
                              </div>
                              {row.headlines.length > 0 ? (
                                <p className="text-xs text-text-primary line-clamp-2">
                                  {row.headlines.slice(0, 3).join(' | ')}
                                </p>
                              ) : (
                                <p className="text-[10px] text-text-muted">No headlines available</p>
                              )}
                              {row.descriptions.length > 0 && (
                                <p className="text-[11px] text-text-muted line-clamp-1">
                                  {row.descriptions[0]}
                                </p>
                              )}
                              {row.adSellingPoint ? (
                                <p className="text-[11px] italic text-accent-cyan mt-1 line-clamp-2 bg-accent-cyan/10 px-2 py-1 rounded">
                                  💡 {row.adSellingPoint}
                                </p>
                              ) : row.headlines.length === 0 ? (
                                <span className="text-[10px] text-score-orange mt-1 block">⚠ No ad copy to extract SP from</span>
                              ) : analyzing ? (
                                <span className="text-[10px] text-text-muted animate-pulse mt-1 block">⏳ Extracting selling point...</span>
                              ) : (
                                <span className="text-[10px] text-score-red mt-1 block">⚠ No selling point</span>
                              )}
                            </div>
                          </div>

                          {/* Landing Page Column */}
                          <div
                            className="px-4 py-3 border-r border-bg-border"
                            style={row.relevanceScore > 0 ? {
                              backgroundColor: `${getRelevanceColor(row.relevanceScore)}30`,
                              borderLeft: `3px solid ${getRelevanceColor(row.relevanceScore)}`,
                            } : undefined}
                          >
                            <div className="space-y-1">
                              {row.finalUrl ? (
                                <>
                                  <p className="text-xs text-text-secondary truncate">{row.finalUrl.replace(/^https?:\/\//, '')}</p>
                                  {row.relevanceScore > 0 ? (
                                    <div className="flex items-center gap-2 mt-1">
                                      <span
                                        className="inline-block text-xs font-bold px-2.5 py-1 rounded-full"
                                        style={{
                                          backgroundColor: `${getRelevanceColor(row.relevanceScore)}25`,
                                          color: getRelevanceColor(row.relevanceScore),
                                          border: `1px solid ${getRelevanceColor(row.relevanceScore)}50`,
                                        }}
                                      >
                                        {row.relevanceScore}% match
                                      </span>
                                    </div>
                                  ) : analyzing ? (
                                    <span className="text-[10px] text-text-muted animate-pulse mt-1 block">⏳ Scoring relevance...</span>
                                  ) : (
                                    <span className="text-[10px] text-score-orange mt-1 block">⚠ No relevance score</span>
                                  )}
                                  {row.lpSellingPoint ? (
                                    <p className="text-[11px] italic text-accent-cyan mt-1 line-clamp-2 bg-accent-cyan/10 px-2 py-1 rounded">
                                      💡 {row.lpSellingPoint}
                                    </p>
                                  ) : row.lpError ? (
                                    <span className="text-[10px] text-score-red mt-1 block">Unable to analyze LP</span>
                                  ) : analyzing ? (
                                    <span className="text-[10px] text-text-muted animate-pulse mt-1 block">Analyzing LP...</span>
                                  ) : null}
                                </>
                              ) : (
                                <span className="text-xs text-text-muted">No URL</span>
                              )}
                            </div>
                          </div>

                          {/* Product Column */}
                          <div className="px-4 py-3">
                            <span className="text-xs text-text-muted">{row.finalUrlDomain || 'Coming soon'}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-text-muted">
            Page {pagination.page} of {pagination.totalPages} ({pagination.totalRows} total ads)
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1 text-xs bg-bg-card border border-bg-border rounded hover:bg-bg-hover disabled:opacity-30 text-text-secondary"
            >
              ← Prev
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.totalPages}
              className="px-3 py-1 text-xs bg-bg-card border border-bg-border rounded hover:bg-bg-hover disabled:opacity-30 text-text-secondary"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Right Panel */}
      <RightPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        title={selectedRow ? `Ad: ${selectedRow.adGroupName}` : 'Ad Details'}
        context={selectedRow ? {
          adId: selectedRow.adId,
          accountName: selectedRow.accountName,
          campaignName: selectedRow.campaignName,
          adGroupName: selectedRow.adGroupName,
          headlines: selectedRow.headlines,
          descriptions: selectedRow.descriptions,
          adSellingPoint: selectedRow.adSellingPoint,
          lpSellingPoint: selectedRow.lpSellingPoint,
          relevanceScore: selectedRow.relevanceScore,
          finalUrl: selectedRow.finalUrl,
          spend: selectedRow.spend,
          clicks: selectedRow.clicks,
          conversions: selectedRow.conversions,
        } : undefined}
      >
        {selectedRow && (
          <div className="space-y-4">
            {/* Ad Info */}
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Ad Copy</h3>
              <div className="bg-bg-hover rounded-lg p-3 space-y-2">
                <div>
                  <span className="text-[10px] text-text-muted">Headlines</span>
                  <p className="text-sm text-text-primary">{selectedRow.headlines.join(' | ')}</p>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted">Descriptions</span>
                  <p className="text-xs text-text-secondary">{selectedRow.descriptions.join(' | ')}</p>
                </div>
                {selectedRow.adSellingPoint && (
                  <div>
                    <span className="text-[10px] text-text-muted">Selling Point</span>
                    <p className="text-xs italic text-accent-cyan">{selectedRow.adSellingPoint}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Metrics (30d)</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-bg-hover rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-text-primary">{formatCurrency(selectedRow.spend)}</div>
                  <div className="text-[10px] text-text-muted">Spend</div>
                </div>
                <div className="bg-bg-hover rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-text-primary">{selectedRow.clicks}</div>
                  <div className="text-[10px] text-text-muted">Clicks</div>
                </div>
                <div className="bg-bg-hover rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-text-primary">{Math.round(selectedRow.conversions)}</div>
                  <div className="text-[10px] text-text-muted">Conv</div>
                </div>
              </div>
            </div>

            {/* Landing Page */}
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Landing Page</h3>
              <div className="bg-bg-hover rounded-lg p-3 space-y-2">
                <p className="text-xs text-text-secondary break-all">{selectedRow.finalUrl || 'No URL'}</p>
                {selectedRow.lpSellingPoint && (
                  <div>
                    <span className="text-[10px] text-text-muted">LP Selling Point</span>
                    <p className="text-xs italic text-accent-cyan">{selectedRow.lpSellingPoint}</p>
                  </div>
                )}
                {selectedRow.relevanceScore > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-muted">Relevance:</span>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${getRelevanceColor(selectedRow.relevanceScore)}20`,
                        color: getRelevanceColor(selectedRow.relevanceScore),
                      }}
                    >
                      {selectedRow.relevanceScore}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Audience */}
            <div>
              <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Audience Targeting</h3>
              <div className="bg-bg-hover rounded-lg p-3">
                {selectedRow.audience.length > 0 ? (
                  <div className="space-y-1">
                    {selectedRow.audience.map((a) => (
                      <div key={a.criterionId} className="flex items-center gap-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-card text-text-muted uppercase">
                          {a.criterionType.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-text-secondary">{a.criterionName}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-text-muted">No targeting criteria available</span>
                )}
              </div>
            </div>
          </div>
        )}
      </RightPanel>
    </div>
  );
}
