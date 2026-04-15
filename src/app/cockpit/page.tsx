'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import RightPanel from '@/components/layout/RightPanel';
import type { TabDef } from '@/components/layout/RightPanel';
import CollapsibleSection from '@/components/ui/CollapsibleSection';
import DuckIcon from '@/components/ui/DuckIcon';
import { getRelevanceColor } from '@/lib/selling-points/colors';
import type { CockpitRow, PageRankResult } from '@/types';

interface LPFunnelData {
  campaign_name: string;
  landing_page: string;
  device: string;
  visits: number;
  get_started: number;
  gs_rate: number;
}

interface ProductFunnelData {
  campaign_name: string;
  landing_page: string;
  device: string;
  lp_product: string;
  signup_product: string;
  installed_product: string;
  soft_signups: number;
  hard_signups: number;
  payers_28d: number;
  acv_28d: number;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
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

function getGsRateColor(rate: number): string {
  if (rate >= 30) return '#22C55E';
  if (rate >= 20) return '#84CC16';
  if (rate >= 10) return '#F97316';
  return '#EF4444';
}

// --- Landing Page Tab content ---
function LandingPageTab({ row, rankData, lpFunnel }: { row: CockpitRow; rankData: PageRankResult | null; lpFunnel: LPFunnelData[] }) {
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

      {/* 2. Funnel Performance (from BigBrain) */}
      <CollapsibleSection
        title="Funnel Performance"
        badge={lpFunnel.length > 0 ? `${lpFunnel.reduce((s, r) => s + r.gs_rate, 0) / lpFunnel.length > 0 ? (lpFunnel.reduce((s, r) => s + r.gs_rate, 0) / lpFunnel.length).toFixed(1) : '0'}%` : 'N/A'}
        badgeColor={lpFunnel.length > 0 ? getGsRateColor(lpFunnel.reduce((s, r) => s + r.gs_rate, 0) / lpFunnel.length) : '#6B7280'}
        defaultOpen={false}
      >
        {lpFunnel.length > 0 ? (
          <div className="space-y-3">
            {lpFunnel.map((f, i) => {
              const gsRate = f.gs_rate || (f.visits > 0 ? (f.get_started / f.visits * 100) : 0);
              return (
                <div key={i} className="space-y-2">
                  {lpFunnel.length > 1 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-card text-text-muted uppercase">{f.device}</span>
                  )}
                  {/* Visits → Get Started bar */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-muted">Visits</span>
                        <span className="text-text-primary font-medium">{formatNumber(f.visits)}</span>
                      </div>
                      <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-accent-blue" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <span className="text-text-muted text-xs">→</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-muted">Get Started</span>
                        <span className="text-text-primary font-medium">{formatNumber(f.get_started)}</span>
                      </div>
                      <div className="w-full h-2 bg-bg-card rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, gsRate)}%`,
                            backgroundColor: getGsRateColor(gsRate),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${getGsRateColor(gsRate)}20`,
                        color: getGsRateColor(gsRate),
                      }}
                    >
                      {gsRate.toFixed(1)}% conversion
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-text-muted">No funnel data available. Sync BigBrain data from Admin → Sync.</p>
        )}
      </CollapsibleSection>

      {/* 3. Page Rank */}
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


// --- Product Tab content ---
function ProductTab({ row, productFunnel }: { row: CockpitRow; productFunnel: ProductFunnelData[] }) {
  const totalSoft = productFunnel.reduce((s, r) => s + r.soft_signups, 0);
  const totalHard = productFunnel.reduce((s, r) => s + r.hard_signups, 0);
  const totalPayers = productFunnel.reduce((s, r) => s + r.payers_28d, 0);
  const totalAcv = productFunnel.reduce((s, r) => s + r.acv_28d, 0);

  // Group by signup_product for alignment view
  const byProduct = new Map<string, { signups: number; payers: number; acv: number; installed: string }>();
  for (const r of productFunnel) {
    const key = r.signup_product || '(unknown)';
    const existing = byProduct.get(key) || { signups: 0, payers: 0, acv: 0, installed: r.installed_product };
    existing.signups += r.hard_signups;
    existing.payers += r.payers_28d;
    existing.acv += r.acv_28d;
    byProduct.set(key, existing);
  }

  // Check product alignment: does the ad's selling point match the signup product?
  const adSP = row.adSellingPoint?.toLowerCase() || '';
  const lpProduct = productFunnel[0]?.lp_product?.toLowerCase() || '';

  return (
    <div className="space-y-4">
      {productFunnel.length === 0 ? (
        <div className="text-center py-6">
          <span className="text-xs text-text-muted">No product funnel data available. Sync BigBrain data from Admin → Sync.</span>
        </div>
      ) : (
        <>
          {/* Funnel Summary */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Signup → Payer Funnel</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-bg-hover rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-text-primary">{formatNumber(totalSoft)}</div>
                <div className="text-[10px] text-text-muted">Soft Signups</div>
              </div>
              <div className="bg-bg-hover rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-text-primary">{formatNumber(totalHard)}</div>
                <div className="text-[10px] text-text-muted">Hard Signups</div>
              </div>
              <div className="bg-bg-hover rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-score-green">{totalPayers}</div>
                <div className="text-[10px] text-text-muted">Payers (28d)</div>
              </div>
              <div className="bg-bg-hover rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-score-gold">{formatCurrency(totalAcv)}</div>
                <div className="text-[10px] text-text-muted">ACV (28d)</div>
              </div>
            </div>

            {/* Conversion rates */}
            {totalHard > 0 && (
              <div className="mt-2 flex gap-2 justify-center">
                {totalSoft > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover text-text-secondary">
                    Soft→Hard: {(totalHard / totalSoft * 100).toFixed(1)}%
                  </span>
                )}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-bg-hover text-text-secondary">
                  Hard→Payer: {(totalPayers / totalHard * 100).toFixed(2)}%
                </span>
              </div>
            )}
          </div>

          {/* Product Alignment */}
          <div>
            <h3 className="text-xs font-semibold text-text-muted uppercase mb-2">Product Alignment</h3>
            {row.adSellingPoint && (
              <div className="bg-bg-card rounded-lg p-2.5 border-l-2 border-accent-blue mb-2">
                <span className="text-[10px] font-semibold text-text-muted uppercase block mb-1">Ad Promise</span>
                <p className="text-xs text-text-secondary">{row.adSellingPoint}</p>
              </div>
            )}

            <div className="space-y-1.5">
              {Array.from(byProduct.entries()).map(([product, data]) => {
                // Simple alignment check: does the product name appear in the ad selling point or LP product?
                const productLower = product.toLowerCase();
                const isAligned = adSP.includes(productLower) || lpProduct.includes(productLower) || productLower === lpProduct;
                const alignColor = isAligned ? '#22C55E' : product === '(unknown)' ? '#6B7280' : '#F97316';

                return (
                  <div key={product} className="bg-bg-hover rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: alignColor }}
                      />
                      <div>
                        <span className="text-xs font-medium text-text-primary">{product}</span>
                        <span className="text-[10px] text-text-muted ml-2">{data.signups} signups</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-text-primary">{data.payers} payers</div>
                      {data.acv > 0 && <div className="text-[10px] text-score-gold">{formatCurrency(data.acv)}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
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
  const [lpFunnelData, setLpFunnelData] = useState<LPFunnelData[]>([]);
  const [productFunnelData, setProductFunnelData] = useState<ProductFunnelData[]>([]);

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

    // Fetch funnel data for this row's campaign + landing page
    const params = new URLSearchParams();
    if (row.campaignName) params.set('campaign', row.campaignName);
    if (row.finalUrl) params.set('landing_page', row.finalUrl);
    const qs = params.toString();

    fetch(`/api/funnel/lp?${qs}`)
      .then(r => r.json())
      .then(data => setLpFunnelData(data.rows || []))
      .catch(() => setLpFunnelData([]));

    fetch(`/api/funnel/product?${qs}`)
      .then(r => r.json())
      .then(data => setProductFunnelData(data.rows || []))
      .catch(() => setProductFunnelData([]));
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
      content: <LandingPageTab row={selectedRow} rankData={rankData[selectedRow.finalUrl] || null} lpFunnel={lpFunnelData} />,
    },
    {
      id: 'product',
      label: 'Product',
      content: <ProductTab row={selectedRow} productFunnel={productFunnelData} />,
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
