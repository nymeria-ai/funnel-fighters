'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import ChannelFilter from '@/components/cockpit/ChannelFilter';
import FunnelRow, { fmt, fmtCost } from '@/components/cockpit/FunnelRow';
import type { ChannelData, DrilldownItem, AdCreative } from '@/app/api/cockpit/funnel/route';

const CHANNEL_ICONS: Record<string, string> = {
  adwordssearch: '🔍',
  adwordsyoutube: '📺',
  adwordsdisplay: '🖼️',
  adwordsvideo: '🎬',
  pmax: '⚡',
  adwordsshopping: '🛍️',
};

const CHANNEL_LABELS: Record<string, string> = {
  adwordssearch: 'Search',
  adwordsyoutube: 'YouTube / Demand Gen',
  adwordsdisplay: 'Display',
  adwordsvideo: 'Video',
  pmax: 'Performance Max',
  adwordsshopping: 'Shopping',
};

function sourceLabel(source: string): string {
  return CHANNEL_LABELS[source] ?? source;
}

type Days = 7 | 30 | 90;

interface DrilldownState {
  /** key: channel source → country-level rows */
  countries: Record<string, DrilldownItem[]>;
  /** key: `${source}::${country}` → campaign-level rows */
  campaigns: Record<string, DrilldownItem[]>;
  /** key: campaign_id → ad-group-level rows */
  adGroups: Record<string, DrilldownItem[]>;
  /** key: campaign_id → ad creatives keyed by ad_group_id */
  adCreatives: Record<string, AdCreative[]>;
}

export default function CockpitFunnelPage() {
  const [channels, setChannels] = useState<ChannelData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [channelFilter, setChannelFilter] = useState('');
  const [days, setDays] = useState<Days>(30);

  // Expansion state
  const [expandedChannels, setExpandedChannels] = useState<Set<string>>(new Set());
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set()); // key: `${source}::${country}`
  const [expandedCampaigns, setExpandedCampaigns] = useState<Set<string>>(new Set()); // key: campaign_id
  const [expandedAdGroups, setExpandedAdGroups] = useState<Set<string>>(new Set()); // key: ad_group_id

  // Drill-down data cache
  const [drilldown, setDrilldown] = useState<DrilldownState>({
    countries: {},
    campaigns: {},
    adGroups: {},
    adCreatives: {},
  });
  const [drillLoading, setDrillLoading] = useState<Set<string>>(new Set());

  const abortRef = useRef<AbortController | null>(null);

  const fetchChannels = useCallback(async (d: Days) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError('');
    // Reset drill state on reload
    setExpandedChannels(new Set());
    setExpandedCountries(new Set());
    setExpandedCampaigns(new Set());
    setExpandedAdGroups(new Set());
    setDrilldown({ countries: {}, campaigns: {}, adGroups: {}, adCreatives: {} });

    try {
      const res = await fetch(`/api/cockpit/funnel?days=${d}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setChannels(data.channels ?? []);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError('Failed to load funnel data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels(days);
  }, [days, fetchChannels]);

  // ── Drill-down fetchers ──────────────────────────────────────────────────

  async function fetchCountries(source: string) {
    if (drilldown.countries[source] !== undefined) return; // cached
    const key = source;
    setDrillLoading((s) => new Set(s).add(key));
    try {
      const res = await fetch(`/api/cockpit/funnel?source=${source}&days=${days}`);
      const data = await res.json();
      setDrilldown((prev) => ({
        ...prev,
        countries: { ...prev.countries, [source]: data.drilldown ?? [] },
      }));
    } catch {
      setDrilldown((prev) => ({
        ...prev,
        countries: { ...prev.countries, [source]: [] },
      }));
    } finally {
      setDrillLoading((s) => { const n = new Set(s); n.delete(key); return n; });
    }
  }

  async function fetchCampaigns(source: string, country: string) {
    const stateKey = `${source}::${country}`;
    if (drilldown.campaigns[stateKey] !== undefined) return;
    setDrillLoading((s) => new Set(s).add(stateKey));
    try {
      const res = await fetch(`/api/cockpit/funnel?source=${source}&country=${encodeURIComponent(country)}&days=${days}`);
      const data = await res.json();
      setDrilldown((prev) => ({
        ...prev,
        campaigns: { ...prev.campaigns, [stateKey]: data.drilldown ?? [] },
      }));
    } catch {
      setDrilldown((prev) => ({
        ...prev,
        campaigns: { ...prev.campaigns, [stateKey]: [] },
      }));
    } finally {
      setDrillLoading((s) => { const n = new Set(s); n.delete(stateKey); return n; });
    }
  }

  async function fetchAdGroups(source: string, country: string, campaignId: string) {
    if (drilldown.adGroups[campaignId] !== undefined) return;
    setDrillLoading((s) => new Set(s).add(campaignId));
    try {
      const res = await fetch(`/api/cockpit/funnel?source=${source}&country=${encodeURIComponent(country)}&campaign_id=${encodeURIComponent(campaignId)}&days=${days}`);
      const data = await res.json();
      setDrilldown((prev) => ({
        ...prev,
        adGroups: { ...prev.adGroups, [campaignId]: data.drilldown ?? [] },
        adCreatives: { ...prev.adCreatives, [campaignId]: data.adCreatives ?? [] },
      }));
    } catch {
      setDrilldown((prev) => ({
        ...prev,
        adGroups: { ...prev.adGroups, [campaignId]: [] },
        adCreatives: { ...prev.adCreatives, [campaignId]: [] },
      }));
    } finally {
      setDrillLoading((s) => { const n = new Set(s); n.delete(campaignId); return n; });
    }
  }

  // ── Toggle handlers ──────────────────────────────────────────────────────

  function toggleChannel(source: string) {
    const expanding = !expandedChannels.has(source);
    if (expanding) fetchCountries(source);
    setExpandedChannels((prev) => {
      const next = new Set(prev);
      if (next.has(source)) next.delete(source); else next.add(source);
      return next;
    });
  }

  function toggleCountry(source: string, country: string) {
    const stateKey = `${source}::${country}`;
    const expanding = !expandedCountries.has(stateKey);
    if (expanding) fetchCampaigns(source, country);
    setExpandedCountries((prev) => {
      const next = new Set(prev);
      if (next.has(stateKey)) next.delete(stateKey); else next.add(stateKey);
      return next;
    });
  }

  function toggleCampaign(source: string, country: string, campaignId: string) {
    const expanding = !expandedCampaigns.has(campaignId);
    if (expanding) fetchAdGroups(source, country, campaignId);
    setExpandedCampaigns((prev) => {
      const next = new Set(prev);
      if (next.has(campaignId)) next.delete(campaignId); else next.add(campaignId);
      return next;
    });
  }

  function toggleAdGroup(adGroupId: string) {
    setExpandedAdGroups((prev) => {
      const next = new Set(prev);
      if (next.has(adGroupId)) next.delete(adGroupId); else next.add(adGroupId);
      return next;
    });
  }

  // ── Filtered channels ────────────────────────────────────────────────────

  const visibleChannels = channelFilter
    ? channels.filter((c) => c.source === channelFilter)
    : channels;

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1800px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cockpit</h1>
          <p className="text-sm text-text-muted mt-1">
            Full-funnel performance by marketing channel
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Channel filter */}
          <ChannelFilter value={channelFilter} onChange={setChannelFilter} />

          {/* Date range */}
          <div className="flex rounded-lg border border-bg-border overflow-hidden">
            {([7, 30, 90] as Days[]).map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  days === d
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>

          {/* Link to old ads view */}
          <a
            href="/cockpit/ads"
            className="px-3 py-1.5 bg-bg-card border border-bg-border rounded-lg text-xs text-text-secondary hover:text-text-primary transition-colors"
          >
            Ads View →
          </a>
        </div>
      </div>

      {error && (
        <div className="bg-bg-card border border-red-500/30 rounded-xl p-4 mb-6 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">

        {/* Sticky header row */}
        <div className="sticky top-0 z-10 bg-bg-secondary border-b border-bg-border">
          <div className="flex items-center gap-2 px-4 py-2 text-[10px] text-text-muted uppercase tracking-wider overflow-x-auto">
            <span className="min-w-[160px]">Channel</span>
            <span className="min-w-[56px] text-center">Impr</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[48px] text-center">CTR%</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[56px] text-center">Clicks</span>
            <span className="min-w-[8px]" />
            <span className="min-w-[52px] text-center">Ad Quality</span>
            <span className="min-w-[8px]" />
            <span className="w-4 text-center">→</span>
            <span className="min-w-[48px] text-center">CVR%</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[56px] text-center">Signups</span>
            <span className="min-w-[8px]" />
            <span className="min-w-[52px] text-center">LP Quality</span>
            <span className="min-w-[8px]" />
            <span className="w-4 text-center">→</span>
            <span className="min-w-[48px] text-center">CVR%</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[56px] text-center">Engaged</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[48px] text-center">CVR%</span>
            <span className="w-4 text-center">→</span>
            <span className="min-w-[56px] text-center">Paying</span>
            <span className="min-w-[8px]" />
            <span className="min-w-[52px] text-center">Product</span>
          </div>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="p-8 text-center space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 bg-bg-hover animate-pulse rounded-lg" />
            ))}
            <p className="text-sm text-text-muted mt-2">Loading funnel data…</p>
          </div>
        ) : visibleChannels.length === 0 ? (
          <div className="p-8 text-center text-text-muted text-sm">
            No data available. Make sure Google Ads is connected and metrics have been synced.
          </div>
        ) : (
          visibleChannels.map((ch) => {
            const isExpanded = expandedChannels.has(ch.source);
            const countries = drilldown.countries[ch.source] ?? [];
            const isLoadingCountries = drillLoading.has(ch.source);

            return (
              <div key={ch.source} className="border-b border-bg-border last:border-0">
                {/* Channel row */}
                <button
                  onClick={() => toggleChannel(ch.source)}
                  className="w-full flex items-center hover:bg-bg-hover/40 transition-colors text-left group"
                >
                  {/* Channel label */}
                  <div className="flex items-center gap-2 px-4 py-3 min-w-[160px] shrink-0">
                    <span className="text-text-muted text-xs group-hover:text-text-primary transition-colors">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                    <span className="text-base">{CHANNEL_ICONS[ch.source] ?? '📊'}</span>
                    <div>
                      <span className="text-sm font-semibold text-text-primary block">
                        {sourceLabel(ch.source)}
                      </span>
                      <span className="text-[10px] text-text-muted">{fmtCost(ch.cost)} spend</span>
                    </div>
                  </div>

                  {/* Funnel metrics */}
                  <div className="flex-1">
                    <FunnelRow
                      metrics={{
                        impressions: ch.impressions,
                        clicks: ch.clicks,
                        ctr: ch.ctr,
                        cost: ch.cost,
                        conversions: ch.conversions,
                        signups_est: ch.signups_est,
                        engagement_est: ch.engagement_est,
                        paying_est: ch.paying_est,
                        ad_quality: ch.ad_quality,
                        lp_quality: ch.lp_quality,
                        product_score: ch.product_score,
                      }}
                      showQuality
                    />
                  </div>
                </button>

                {/* Country drill-down */}
                {isExpanded && (
                  <div className="bg-bg-primary/50 border-t border-bg-border">
                    {isLoadingCountries ? (
                      <div className="px-8 py-3 text-xs text-text-muted animate-pulse">Loading countries…</div>
                    ) : countries.length === 0 ? (
                      <div className="px-8 py-3 text-xs text-text-muted">No breakdown data available.</div>
                    ) : (
                      countries.map((cty) => {
                        const countryKey = `${ch.source}::${cty.key}`;
                        const isCountryExpanded = expandedCountries.has(countryKey);
                        const campaigns = drilldown.campaigns[countryKey] ?? [];
                        const isLoadingCampaigns = drillLoading.has(countryKey);

                        return (
                          <div key={cty.key} className="border-b border-bg-border/50 last:border-0">
                            {/* Country row */}
                            <button
                              onClick={() => toggleCountry(ch.source, cty.key)}
                              className="w-full flex items-center hover:bg-bg-hover/30 transition-colors text-left group"
                            >
                              <div className="flex items-center gap-2 px-4 py-2 min-w-[160px] shrink-0 pl-10">
                                <span className="text-text-muted text-xs">
                                  {isCountryExpanded ? '▼' : '▶'}
                                </span>
                                <span className="text-xs font-medium text-text-secondary uppercase">{cty.label || '—'}</span>
                              </div>
                              <div className="flex-1">
                                <DrillRow item={cty} />
                              </div>
                            </button>

                            {/* Campaign drill-down */}
                            {isCountryExpanded && (
                              <div className="bg-bg-secondary/30 border-t border-bg-border/40">
                                {isLoadingCampaigns ? (
                                  <div className="px-12 py-2 text-xs text-text-muted animate-pulse">Loading campaigns…</div>
                                ) : campaigns.length === 0 ? (
                                  <div className="px-12 py-2 text-xs text-text-muted">No campaigns found.</div>
                                ) : (
                                  campaigns.map((camp) => {
                                    const isCampExpanded = expandedCampaigns.has(camp.key);
                                    const adGroups = drilldown.adGroups[camp.key] ?? [];
                                    const isLoadingAdGroups = drillLoading.has(camp.key);

                                    return (
                                      <div key={camp.key} className="border-b border-bg-border/30 last:border-0">
                                        {/* Campaign row */}
                                        <button
                                          onClick={() => toggleCampaign(ch.source, cty.key, camp.key)}
                                          className="w-full flex items-center hover:bg-bg-hover/20 transition-colors text-left"
                                        >
                                          <div className="flex items-center gap-2 px-4 py-2 min-w-[160px] shrink-0 pl-16">
                                            <span className="text-text-muted text-xs">
                                              {isCampExpanded ? '▼' : '▶'}
                                            </span>
                                            <span className="text-xs text-text-muted truncate max-w-[120px]" title={camp.label}>
                                              {camp.label}
                                            </span>
                                          </div>
                                          <div className="flex-1">
                                            <DrillRow item={camp} />
                                          </div>
                                        </button>

                                        {/* Ad Group drill-down */}
                                        {isCampExpanded && (
                                          <div className="bg-bg-card/20 border-t border-bg-border/30">
                                            {isLoadingAdGroups ? (
                                              <div className="px-16 py-2 text-xs text-text-muted animate-pulse">Loading ad groups…</div>
                                            ) : adGroups.length === 0 ? (
                                              <div className="px-16 py-2 text-xs text-text-muted">No ad groups found.</div>
                                            ) : (
                                              adGroups.map((ag) => {
                                                const isAgExpanded = expandedAdGroups.has(ag.key);
                                                const campCreatives = drilldown.adCreatives[camp.key] ?? [];
                                                const creative = campCreatives.find((c) => c.ad_group_id === ag.key) ?? null;
                                                return (
                                                  <div key={ag.key} className="border-b border-bg-border/20 last:border-0">
                                                    <button
                                                      onClick={() => toggleAdGroup(ag.key)}
                                                      className="w-full flex items-center hover:bg-bg-hover/10 transition-colors text-left"
                                                    >
                                                      <div className="flex items-center gap-2 px-4 py-1.5 min-w-[160px] shrink-0 pl-[84px]">
                                                        <span className="text-text-muted text-[10px]">
                                                          {isAgExpanded ? '▼' : '▶'}
                                                        </span>
                                                        <span className="text-[10px] text-text-muted truncate max-w-[90px]" title={ag.label}>
                                                          {ag.label}
                                                        </span>
                                                      </div>
                                                      <div className="flex-1">
                                                        <DrillRow item={ag} compact />
                                                      </div>
                                                    </button>
                                                    {isAgExpanded && creative && (
                                                      <AdCreativePanel creative={creative} />
                                                    )}
                                                    {isAgExpanded && !creative && (
                                                      <div className="pl-[100px] pr-4 py-2 text-[10px] text-text-muted italic">
                                                        No ad creative available for this ad group.
                                                      </div>
                                                    )}
                                                  </div>
                                                );
                                              })
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Summary row */}
        {!loading && visibleChannels.length > 0 && (
          <div className="bg-bg-secondary border-t border-bg-border px-4 py-2">
            <div className="flex items-center gap-6 text-xs text-text-muted flex-wrap">
              <span>
                Total impressions:{' '}
                <span className="text-text-primary font-semibold">
                  {fmt(visibleChannels.reduce((s, c) => s + c.impressions, 0))}
                </span>
              </span>
              <span>
                Total clicks:{' '}
                <span className="text-text-primary font-semibold">
                  {fmt(visibleChannels.reduce((s, c) => s + c.clicks, 0))}
                </span>
              </span>
              <span>
                Total spend:{' '}
                <span className="text-text-primary font-semibold">
                  {fmtCost(visibleChannels.reduce((s, c) => s + c.cost, 0))}
                </span>
              </span>
              <span>
                Total conversions:{' '}
                <span className="text-text-primary font-semibold">
                  {fmt(visibleChannels.reduce((s, c) => s + c.conversions, 0))}
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-muted">
        <span className="font-semibold text-text-secondary">Quality scores:</span>
        {[
          { label: '75–100 Excellent', color: '#22C55E' },
          { label: '50–74 Good', color: '#EAB308' },
          { label: '25–49 Fair', color: '#F97316' },
          { label: '0–24 Poor', color: '#EF4444' },
        ].map(({ label, color }) => (
          <span key={label} className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
        <span className="text-text-muted">· Scores are percentile-based within channel set</span>
      </div>
    </div>
  );
}

// ── Ad creative panel ─────────────────────────────────────────────────────

function AdCreativePanel({ creative }: { creative: AdCreative }) {
  const { headlines, descriptions, final_url } = creative;
  return (
    <div className="pl-[100px] pr-4 py-3 space-y-2 bg-bg-secondary/40 border-t border-bg-border/20">
      {final_url && (
        <div className="flex items-start gap-2">
          <span className="text-[10px] text-text-muted uppercase tracking-wide w-16 shrink-0 pt-0.5">LP URL</span>
          <a
            href={final_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-blue hover:underline break-all"
          >
            {final_url}
          </a>
        </div>
      )}
      {headlines && headlines.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-[10px] text-text-muted uppercase tracking-wide w-16 shrink-0 pt-0.5">Headlines</span>
          <div className="flex flex-wrap gap-1">
            {headlines.map((h, i) => (
              <span key={i} className="text-[11px] text-text-primary bg-bg-card border border-bg-border rounded px-1.5 py-0.5">
                {h}
              </span>
            ))}
          </div>
        </div>
      )}
      {descriptions && descriptions.length > 0 && (
        <div className="flex items-start gap-2">
          <span className="text-[10px] text-text-muted uppercase tracking-wide w-16 shrink-0 pt-0.5">Desc</span>
          <div className="space-y-1">
            {descriptions.map((d, i) => (
              <p key={i} className="text-[11px] text-text-secondary">{d}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Drill-down row (no quality badges, compact metrics) ─────────────────────

function DrillRow({ item, compact }: { item: DrilldownItem; compact?: boolean }) {
  const { impressions, clicks, ctr, cost, conversions } = item;

  return (
    <div className={`flex items-center gap-2 px-3 ${compact ? 'py-1' : 'py-2'} flex-nowrap overflow-x-auto`}>
      <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-text-secondary tabular-nums min-w-[56px]`}>
        {fmt(impressions)}
      </span>
      <span className="text-text-muted text-xs">→</span>
      <span className="text-xs text-text-muted tabular-nums min-w-[48px]">
        {ctr.toFixed(2)}%
      </span>
      <span className="text-text-muted text-xs">→</span>
      <span className={`${compact ? 'text-xs' : 'text-sm'} font-medium text-text-secondary tabular-nums min-w-[56px]`}>
        {fmt(clicks)}
      </span>
      <span className="text-[10px] text-text-muted whitespace-nowrap">({fmtCost(cost)})</span>
      {conversions > 0 && (
        <>
          <span className="text-text-muted text-xs">→</span>
          <span className="text-xs text-text-muted tabular-nums">
            {fmt(conversions)} conv
          </span>
        </>
      )}
    </div>
  );
}
