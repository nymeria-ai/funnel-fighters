'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import ChannelFilter from '@/components/cockpit/ChannelFilter';
import FunnelRow, { FunnelMetrics, fmt, fmtCost } from '@/components/cockpit/FunnelRow';
import SyncStatusBadge from '@/components/SyncStatusBadge';
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

function computePercentiles(values: (number | null)[]): (number | null)[] {
  const valids = values.filter((v): v is number => v !== null && isFinite(v));
  if (valids.length < 2) return values.map(() => null);
  const sorted = [...valids].sort((a, b) => a - b);
  return values.map((v) => {
    if (v === null || !isFinite(v)) return null;
    const rank = sorted.filter((s) => s <= v).length;
    return (rank / sorted.length) * 100;
  });
}

function computeDrillQuality(items: DrilldownItem[]): DrilldownItem[] {
  const ctrs = items.map((i) => (i.impressions > 0 ? i.clicks / i.impressions : 0));
  const cvrs = items.map((i) => {
    if (i.signups === null || i.clicks === 0) return null;
    return i.signups / i.clicks;
  });
  const engRates = items.map((i) => {
    if (i.engaged_2nd_day === null || i.signups === null || i.signups === 0) return null;
    return i.engaged_2nd_day / i.signups;
  });
  const adQuals = computePercentiles(ctrs);
  const lpQuals = computePercentiles(cvrs);
  const prodScores = computePercentiles(engRates);
  return items.map((item, i) => ({
    ...item,
    ad_quality: adQuals[i] !== null ? Math.round(adQuals[i]!) : null,
    lp_quality: lpQuals[i] !== null ? Math.round(lpQuals[i]!) : null,
    product_score: prodScores[i] !== null ? Math.round(prodScores[i]!) : null,
  }));
}

function toMetrics(item: DrilldownItem): FunnelMetrics {
  return {
    impressions: item.impressions,
    clicks: item.clicks,
    ctr: item.ctr,
    cost: item.cost,
    signups: item.signups,
    engaged_2nd_day: item.engaged_2nd_day,
    paying: item.paying,
    ad_quality: item.ad_quality,
    lp_quality: item.lp_quality,
    product_score: item.product_score,
  };
}

type PresetDays = 1 | 7 | 14 | 30 | 90;

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

  // Date selection state
  const [presetDays, setPresetDays] = useState<PresetDays>(30);
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  // When non-null, this query string is used instead of the preset
  const [customDateQuery, setCustomDateQuery] = useState<string | null>(null);

  // The active date query string passed to all API calls
  const dateQueryStr = customDateQuery ?? `days=${presetDays}`;

  // Map source display name to raw channel_type for API calls
  const sourceToChannelType = useRef<Record<string, string>>({});

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

  const fetchChannels = useCallback(async (dqs: string) => {
    setLoading(true);
    setError('');
    // Reset drill state on reload
    setExpandedChannels(new Set());
    setExpandedCountries(new Set());
    setExpandedCampaigns(new Set());
    setExpandedAdGroups(new Set());
    setDrilldown({ countries: {}, campaigns: {}, adGroups: {}, adCreatives: {} });

    try {
      const res = await fetch(`/api/cockpit/funnel?${dqs}`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      const chs = data.channels ?? [];
      setChannels(chs);
      // Build source → channel_type mapping
      for (const ch of chs) {
        sourceToChannelType.current[ch.source] = ch.channel_type;
      }
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setError('Failed to load funnel data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChannels(dateQueryStr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateQueryStr, fetchChannels]);

  // ── Drill-down fetchers ──────────────────────────────────────────────────

  async function fetchCountries(source: string, apiSource?: string) {
    if (drilldown.countries[source] !== undefined) return; // cached
    const key = source;
    setDrillLoading((s) => new Set(s).add(key));
    try {
      const res = await fetch(`/api/cockpit/funnel?source=${encodeURIComponent(apiSource || source)}&${dateQueryStr}`);
      const data = await res.json();
      setDrilldown((prev) => ({
        ...prev,
        countries: { ...prev.countries, [source]: computeDrillQuality(data.drilldown ?? []) },
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
      const res = await fetch(`/api/cockpit/funnel?source=${encodeURIComponent(sourceToChannelType.current[source] || source)}&country=${encodeURIComponent(country)}&${dateQueryStr}`);
      const data = await res.json();
      setDrilldown((prev) => ({
        ...prev,
        campaigns: { ...prev.campaigns, [stateKey]: computeDrillQuality(data.drilldown ?? []) },
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
      const res = await fetch(`/api/cockpit/funnel?source=${encodeURIComponent(sourceToChannelType.current[source] || source)}&country=${encodeURIComponent(country)}&campaign_id=${encodeURIComponent(campaignId)}&${dateQueryStr}`);
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

  function toggleChannel(source: string, channelType?: string) {
    const expanding = !expandedChannels.has(source);
    if (expanding) fetchCountries(source, channelType || source);
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

  // ── Date selection helpers ────────────────────────────────────────────────

  function selectPreset(d: PresetDays) {
    setPresetDays(d);
    setCustomDateQuery(null);
    setShowCustomPicker(false);
  }

  function applyCustomRange() {
    if (customStart && customEnd) {
      setCustomDateQuery(`start_date=${customStart}&end_date=${customEnd}`);
    }
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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary">Cockpit</h1>
            <SyncStatusBadge />
          </div>
          <p className="text-sm text-text-muted mt-1">
            Full-funnel performance by marketing channel
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Channel filter */}
          <ChannelFilter value={channelFilter} onChange={setChannelFilter} />

          {/* Date range */}
          <div className="flex flex-col gap-1.5">
            <div className="flex rounded-lg border border-bg-border overflow-hidden">
              {([1, 7, 14, 30, 90] as PresetDays[]).map((d) => (
                <button
                  key={d}
                  onClick={() => selectPreset(d)}
                  className={`px-3 py-1.5 text-xs transition-colors ${
                    !customDateQuery && presetDays === d
                      ? 'bg-accent-blue text-white'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                  }`}
                >
                  {d}d
                </button>
              ))}
              <button
                onClick={() => setShowCustomPicker((v) => !v)}
                className={`px-3 py-1.5 text-xs transition-colors border-l border-bg-border ${
                  showCustomPicker || !!customDateQuery
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-hover'
                }`}
              >
                Custom
              </button>
            </div>

            {/* Custom date picker */}
            {showCustomPicker && (
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="bg-bg-card border border-bg-border rounded px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-blue"
                />
                <span className="text-xs text-text-muted">to</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="bg-bg-card border border-bg-border rounded px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-blue"
                />
                <button
                  onClick={applyCustomRange}
                  disabled={!customStart || !customEnd}
                  className="px-3 py-1 text-xs bg-accent-blue text-white rounded disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </div>
            )}
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
            <span className="min-w-[56px] text-center">2nd Day</span>
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
                  onClick={() => toggleChannel(ch.source, ch.channel_type)}
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
                        signups: ch.signups,
                        engaged_2nd_day: ch.engaged_2nd_day,
                        paying: ch.paying,
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
                                <FunnelRow metrics={toMetrics(cty)} showQuality />
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
                                            <FunnelRow metrics={toMetrics(camp)} showQuality />
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
                                                        <div className="flex flex-col min-w-0">
                                                          <span className="text-[10px] text-text-muted truncate max-w-[90px]" title={ag.label}>
                                                            {ag.label}
                                                          </span>
                                                          {ag.final_url && (
                                                            <a
                                                              href={ag.final_url}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                              className="text-[9px] text-accent-blue truncate max-w-[90px] hover:underline"
                                                              title={ag.final_url}
                                                              onClick={(e) => e.stopPropagation()}
                                                            >
                                                              {ag.final_url.replace(/^https?:\/\//, '')}
                                                            </a>
                                                          )}
                                                        </div>
                                                      </div>
                                                      <div className="flex-1">
                                                        <FunnelRow metrics={toMetrics(ag)} showQuality={false} />
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
                Total signups:{' '}
                <span className="text-text-primary font-semibold">
                  {fmt(visibleChannels.reduce((s, c) => s + (c.signups ?? 0), 0))}
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

