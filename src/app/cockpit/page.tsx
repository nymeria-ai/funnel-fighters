'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import type { TabDef } from '@/components/layout/RightPanel';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
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
  relevanceReason: string;
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

interface PageRankResult {
  url: string;
  gscPosition: number | null;
  gscImpressions: number | null;
  gscScore: number | null;
  ahrefsUR: number | null;
  ahrefsScore: number | null;
  compositeScore: number | null;
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

function getRankColor(score: number | null): string {
  if (score === null) return '#6B7280';
  if (score >= 8) return '#22C55E';
  if (score >= 6) return '#84CC16';
  if (score >= 4) return '#F97316';
  return '#EF4444';
}

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

// --- Ad Tab content ---
function AdTab({ row }: { row: CockpitRow }) {
  const ctr = row.impressions > 0 ? ((row.clicks / row.impressions) * 100).toFixed(2) : '0.00';
  const cpa = row.conversions > 0 ? formatCurrency(row.spend / row.conversions) : 'N/A';

  return (
    <div className="space-y-4">
      {/* Ad Copy */}
      <div>
        <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Ad Copy</h3>
        <div className="bg-bg-hover rounded-lg p-3 space-y-2">
          {row.headlines.length > 0 && (
            <div>
              <span className="text-[10px] text-text-muted">Headlines</span>
              <p className="text-sm text-text-primary">{row.headlines.join(' | ')}</p>
            </div>
          )}
          {row.descriptions.length > 0 && (
            <div>
              <span className="text-[10px] text-text-muted">Descriptions</span>
              <p className="text-xs text-text-secondary">{row.descriptions.join(' | ')}</p>
            </div>
          )}
          {row.adSellingPoint && (
            <div>
              <span className="text-[10px] text-text-muted">Selling Point</span>
              <p className="text-xs italic text-accent-cyan">{row.adSellingPoint}</p>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div>
        <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Details</h3>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between"><span className="text-text-muted">Campaign</span><span className="text-text-primary truncate ml-2">{row.campaignName}</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Ad Group</span><span className="text-text-primary truncate ml-2">{row.adGroupName}</span></div>
          <div className="flex justify-between"><span className="text-text-muted">Type</span><span className="text-text-secondary">{row.adType.replace('RESPONSIVE_SEARCH_AD', 'RSA').replace('EXPANDED_TEXT_AD', 'ETA')}</span></div>
          {row.finalUrl && (
            <div className="flex justify-between items-start">
              <span className="text-text-muted shrink-0">Final URL</span>
              <a href={row.finalUrl} target="_blank" rel="noopener" className="text-accent-blue hover:underline truncate ml-2">
                {row.finalUrl.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Performance (30d)</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{formatNumber(row.impressions)}</div>
            <div className="text-[10px] text-text-muted">Impressions</div>
          </div>
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{formatNumber(row.clicks)}</div>
            <div className="text-[10px] text-text-muted">Clicks</div>
          </div>
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{ctr}%</div>
            <div className="text-[10px] text-text-muted">CTR</div>
          </div>
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{Math.round(row.conversions)}</div>
            <div className="text-[10px] text-text-muted">Conversions</div>
          </div>
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{formatCurrency(row.spend)}</div>
            <div className="text-[10px] text-text-muted">Spend</div>
          </div>
          <div className="bg-bg-hover rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-text-primary">{cpa}</div>
            <div className="text-[10px] text-text-muted">CPA</div>
          </div>
        </div>
      </div>

      {/* Audience */}
      <div>
        <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Audience Targeting</h3>
        <div className="bg-bg-hover rounded-lg p-3">
          {row.audience.length > 0 ? (
            <div className="space-y-1">
              {row.audience.map((a) => (
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
  );
}

// --- Landing Page Tab content ---
function LandingPageTab({ row, rankData }: { row: CockpitRow; rankData: PageRankResult | null }) {
  if (!row.finalUrl) {
    return <div className="text-sm text-text-muted py-4 text-center">No landing page URL for this ad.</div>;
  }

  const rank = rankData;

  return (
    <div className="space-y-3">
      <a href={row.finalUrl} target="_blank" rel="noopener" className="text-xs text-accent-blue hover:underline block truncate">
        {row.finalUrl}
      </a>

      {/* 1. Ad → LP Relevance */}
      <CollapsibleSection
        title="Ad → Landing Page Relevance"
        badge={row.relevanceScore > 0 ? `${row.relevanceScore}%` : 'N/A'}
        badgeColor={row.relevanceScore > 0 ? getRelevanceColor(row.relevanceScore) : '#6B7280'}
        defaultOpen={false}
      >
        <div className="space-y-3">
          {row.relevanceScore > 0 ? (
            <>
              {/* Score bar */}
              <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${row.relevanceScore}%`,
                    backgroundColor: getRelevanceColor(row.relevanceScore),
                  }}
                />
              </div>

              {/* Selling points comparison */}
              <div className="space-y-2">
                {row.adSellingPoint && (
                  <div className="bg-bg-card rounded-lg p-2.5 border-l-2 border-accent-blue">
                    <span className="text-[10px] font-semibold text-text-muted uppercase block mb-1">Ad Selling Point</span>
                    <p className="text-xs text-text-secondary">{row.adSellingPoint}</p>
                  </div>
                )}
                {row.lpSellingPoint && (
                  <div className="bg-bg-card rounded-lg p-2.5 border-l-2 border-accent-cyan">
                    <span className="text-[10px] font-semibold text-text-muted uppercase block mb-1">LP Selling Point</span>
                    <p className="text-xs text-text-secondary">{row.lpSellingPoint}</p>
                  </div>
                )}
              </div>

              {/* Explanation */}
              {row.relevanceReason && (
                <div className="bg-bg-card rounded-lg p-2.5 border-l-2" style={{ borderColor: getRelevanceColor(row.relevanceScore) }}>
                  <span className="text-[10px] font-semibold text-text-muted uppercase block mb-1">Why this score</span>
                  <p className="text-xs text-text-secondary leading-relaxed">{row.relevanceReason}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-xs text-text-muted">No relevance analysis available for this ad.</p>
          )}
        </div>
      </CollapsibleSection>

      {/* 2. Page Rank */}
      <CollapsibleSection
        title="Page Rank"
        badge={rank?.compositeScore != null ? `${rank.compositeScore.toFixed(1)}/10` : 'N/A'}
        badgeColor={getRankColor(rank?.compositeScore ?? null)}
        defaultOpen={false}
      >
        {rank && rank.compositeScore != null ? (
          <div className="space-y-3">
            {/* Score bar */}
            <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(rank.compositeScore / 10) * 100}%`,
                  backgroundColor: getRankColor(rank.compositeScore),
                }}
              />
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">GSC Avg Position</span>
                <span className="text-text-primary">{rank.gscPosition != null ? `#${rank.gscPosition.toFixed(1)}` : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">GSC Impressions</span>
                <span className="text-text-primary">{rank.gscImpressions != null ? formatNumber(rank.gscImpressions) : 'N/A'}</span>
              </div>
              {rank.gscScore != null && (
                <div className="flex justify-between">
                  <span className="text-text-muted">GSC Score</span>
                  <span className="font-medium" style={{ color: getRankColor(rank.gscScore) }}>{rank.gscScore.toFixed(1)}/10</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-muted">Ahrefs URL Rating</span>
                <span className="text-text-primary">{rank.ahrefsUR != null ? `${rank.ahrefsUR}/100` : 'N/A'}</span>
              </div>
              {rank.ahrefsScore != null && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Ahrefs Score</span>
                  <span className="font-medium" style={{ color: getRankColor(rank.ahrefsScore) }}>{rank.ahrefsScore.toFixed(1)}/10</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-text-muted">No page rank data available. Requires GSC and Ahrefs integration.</p>
        )}
      </CollapsibleSection>

      {/* 3. Page Speed */}
      <CollapsibleSection
        title="Page Speed"
        badge="—"
        badgeColor="#6B7280"
        defaultOpen={false}
      >
        <p className="text-xs text-text-muted">
          Page Speed analysis requires Google PageSpeed Insights integration.
          Core Web Vitals (LCP, FID, CLS) will appear here once connected.
        </p>
      </CollapsibleSection>

      {/* 4. Content Quality */}
      <CollapsibleSection
        title="Content Quality"
        badge="—"
        badgeColor="#6B7280"
        defaultOpen={false}
      >
        <div className="space-y-2">
          {row.lpSellingPoint ? (
            <div>
              <span className="text-[10px] font-semibold text-text-muted uppercase block mb-1">Extracted Selling Point</span>
              <p className="text-xs text-text-secondary italic">{row.lpSellingPoint}</p>
            </div>
          ) : row.lpError ? (
            <p className="text-xs text-score-red">Unable to analyze landing page content.</p>
          ) : (
            <p className="text-xs text-text-muted">No content analysis available.</p>
          )}
          <p className="text-xs text-text-muted mt-2">
            Full content quality scoring (readability, keyword density, content structure) coming soon.
          </p>
        </div>
      </CollapsibleSection>
    </div>
  );
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
  const [searchQuery, setSearchQuery] = useState('');
  const [rankData, setRankData] = useState<Record<string, PageRankResult>>({});

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
    fetchData(1, false).then(() => {
      fetchData(1, true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch rank data when rows have URLs
  useEffect(() => {
    if (rows.length === 0) return;
    const urls = [...new Set(rows.map(r => r.finalUrl).filter(Boolean))];
    if (urls.length === 0) return;

    fetch('/api/page-rank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls }),
    })
      .then(r => r.json())
      .then(data => {
        const map: Record<string, PageRankResult> = {};
        for (const result of (data.results || [])) {
          map[result.url] = result;
        }
        setRankData(map);
      })
      .catch(() => { /* silently fail */ });
  }, [rows]);

  const handleRefresh = async () => {
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

  // Filter rows by search
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter(row =>
      row.headlines.some(h => h.toLowerCase().includes(q)) ||
      row.descriptions.some(d => d.toLowerCase().includes(q)) ||
      row.adGroupName.toLowerCase().includes(q) ||
      row.campaignName.toLowerCase().includes(q) ||
      row.finalUrl.toLowerCase().includes(q)
    );
  }, [rows, searchQuery]);

  const grouped = groupRows(filteredRows);

  // Build tabs for selected row
  const panelTabs: TabDef[] | undefined = selectedRow ? [
    {
      id: 'ad',
      label: 'Ad',
      content: <AdTab row={selectedRow} />,
    },
    {
      id: 'landing-page',
      label: 'Landing Page',
      content: <LandingPageTab row={selectedRow} rankData={rankData[selectedRow.finalUrl] || null} />,
    },
  ] : undefined;

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

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search ads by headline, description, ad group, campaign, or URL..."
          className="w-full bg-bg-card border border-bg-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-blue transition-colors"
        />
        {searchQuery.trim() && (
          <p className="text-xs text-text-muted mt-1.5 ml-1">
            {filteredRows.length} of {rows.length} ads match &quot;{searchQuery}&quot;
          </p>
        )}
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
        ) : filteredRows.length === 0 ? (
          <div className="p-8 text-center text-text-muted text-sm">
            {searchQuery.trim() ? `No ads matching "${searchQuery}"` : 'No ads data available. Make sure Google Ads is connected.'}
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
        tabs={panelTabs}
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
          relevanceReason: selectedRow.relevanceReason,
          finalUrl: selectedRow.finalUrl,
          spend: selectedRow.spend,
          clicks: selectedRow.clicks,
          conversions: selectedRow.conversions,
        } : undefined}
      />
    </div>
  );
}
