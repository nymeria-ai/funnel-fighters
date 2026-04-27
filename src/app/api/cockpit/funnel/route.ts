import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

type ChannelRow = {
  channel_type: string;
  impressions: string;
  clicks: string;
  cost: string;
  conversions: string;
  signups_est: string | null;
  engagement_est: string | null;
  paying_est: string | null;
};

type DrillRow = {
  label: string;
  key: string;
  impressions: string;
  clicks: string;
  cost: string;
  conversions: string;
};

export interface ChannelData {
  source: string;
  channel_type: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  signups_est: number | null;
  engagement_est: number | null;
  paying_est: number | null;
  ad_quality: number | null;
  lp_quality: number | null;
  product_score: number | null;
}

export interface DrilldownItem {
  label: string;
  key: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  signups_est: number | null;
  engagement_est: number | null;
  paying_est: number | null;
}

export interface AdCreative {
  ad_group_id: string;
  final_url: string | null;
  headlines: string[] | null;
  descriptions: string[] | null;
}

const CHANNEL_TYPE_TO_SOURCE: Record<string, string> = {
  // String labels
  SEARCH: 'adwordssearch',
  DEMAND_GEN: 'adwordsyoutube',
  DISPLAY: 'adwordsdisplay',
  VIDEO: 'adwordsvideo',
  PERFORMANCE_MAX: 'pmax',
  SHOPPING: 'adwordsshopping',
  // Numeric enum values from Google Ads API
  '2': 'adwordssearch',
  '3': 'adwordsdisplay',
  '6': 'adwordsshopping',
  '7': 'adwordsvideo',
  '8': 'pmax',
  '13': 'adwordsyoutube',
  DEMAND_GEN_MULTI: 'adwordsyoutube',
};

const SOURCE_TO_CHANNEL_TYPE: Record<string, string> = Object.fromEntries(
  Object.entries(CHANNEL_TYPE_TO_SOURCE).map(([k, v]) => [v, k])
);

function channelTypeToSource(channelType: string): string {
  return CHANNEL_TYPE_TO_SOURCE[channelType] ?? channelType.toLowerCase().replace(/_/g, '');
}

/**
 * Compute percentile ranks (0-100) for an array of values.
 * Nulls and non-finite values are returned as null.
 * Returns null for all if fewer than 2 valid values.
 */
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

function computeAdQualities(channels: { impressions: number; clicks: number; conversions: number }[]): (number | null)[] {
  const ctrs = channels.map((c) => (c.impressions > 0 ? c.clicks / c.impressions : 0));
  const cvrs = channels.map((c) => (c.clicks > 0 ? c.conversions / c.clicks : 0));
  const ctrPcts = computePercentiles(ctrs);
  const cvrPcts = computePercentiles(cvrs);
  return channels.map((_, i) => {
    const ctr = ctrPcts[i];
    const cvr = cvrPcts[i];
    if (ctr === null || cvr === null) return null;
    return ctr * 0.6 + cvr * 0.4;
  });
}

function n(v: string | null): number | null {
  if (v === null) return null;
  const parsed = parseFloat(v);
  return isFinite(parsed) ? parsed : null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const country = searchParams.get('country');
  const campaignId = searchParams.get('campaign_id');
  const daysParam = parseInt(searchParams.get('days') || '30');
  const days = [7, 30, 90].includes(daysParam) ? daysParam : 30;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];

  // ── Main channel aggregation ──────────────────────────────────────────────
  const channelRows = await query<ChannelRow>(
    `
    WITH ad_agg AS (
      SELECT
        c.channel_type,
        SUM(amd.impressions)::bigint  AS impressions,
        SUM(amd.clicks)::bigint       AS clicks,
        SUM(amd.cost_micros) / 1e6   AS cost,
        SUM(amd.conversions)          AS conversions
      FROM ad_metrics_daily amd
      JOIN ads a ON amd.ad_id = a.id
      JOIN campaigns c ON a.campaign_id = c.id
      WHERE (amd.date IS NULL OR amd.date >= $1::date)
      GROUP BY c.channel_type
    ),
    lp_agg AS (
      SELECT
        c.channel_type,
        SUM(lp.get_started)::bigint AS signups_est
      FROM lp_funnel_metrics lp
      JOIN campaigns c ON c.name = lp.campaign_name
      GROUP BY c.channel_type
    ),
    product_agg AS (
      SELECT
        c.channel_type,
        SUM(pf.hard_signups)::bigint AS engagement_est,
        SUM(pf.payers_28d)::bigint   AS paying_est
      FROM product_funnel_metrics pf
      JOIN campaigns c ON c.name = pf.campaign_name
      GROUP BY c.channel_type
    )
    SELECT
      aa.channel_type,
      aa.impressions,
      aa.clicks,
      aa.cost,
      aa.conversions,
      la.signups_est,
      pa.engagement_est,
      pa.paying_est
    FROM ad_agg aa
    LEFT JOIN lp_agg     la ON la.channel_type = aa.channel_type
    LEFT JOIN product_agg pa ON pa.channel_type = aa.channel_type
    ORDER BY aa.impressions DESC
    `,
    [startDateStr]
  );

  if (!channelRows) {
    return NextResponse.json({ channels: [], drilldown: null });
  }

  // Compute quality scores
  const adQualities = computeAdQualities(
    channelRows.map((r) => ({
      impressions: Number(r.impressions),
      clicks: Number(r.clicks),
      conversions: Number(r.conversions),
    }))
  );

  const lpCvrs = channelRows.map((r) => {
    const sig = n(r.signups_est);
    const eng = n(r.engagement_est);
    if (sig === null || eng === null || sig === 0) return null;
    return eng / sig;
  });
  const lpPercentiles = computePercentiles(lpCvrs);

  const productCvrs = channelRows.map((r) => {
    const eng = n(r.engagement_est);
    const pay = n(r.paying_est);
    if (eng === null || pay === null || eng === 0) return null;
    return pay / eng;
  });
  const productPercentiles = computePercentiles(productCvrs);

  const channels: ChannelData[] = channelRows.map((r, i) => {
    const imp = Number(r.impressions);
    const clk = Number(r.clicks);
    return {
      source: channelTypeToSource(r.channel_type),
      channel_type: r.channel_type,
      impressions: imp,
      clicks: clk,
      ctr: imp > 0 ? (clk / imp) * 100 : 0,
      cost: Number(r.cost),
      conversions: Number(r.conversions),
      signups_est: n(r.signups_est),
      engagement_est: n(r.engagement_est),
      paying_est: n(r.paying_est),
      ad_quality: adQualities[i] !== null ? Math.round(adQualities[i]!) : null,
      lp_quality: lpPercentiles[i] !== null ? Math.round(lpPercentiles[i]!) : null,
      product_score: productPercentiles[i] !== null ? Math.round(productPercentiles[i]!) : null,
    };
  });

  // ── Drill-down ────────────────────────────────────────────────────────────
  if (!source) {
    return NextResponse.json({ channels, drilldown: null });
  }

  const targetChannelType = SOURCE_TO_CHANNEL_TYPE[source] ?? source.toUpperCase();

  let drillRows: DrillRow[] | null = null;

  if (!country && !campaignId) {
    // Level 1: by country (first segment of campaign name)
    drillRows = await query<DrillRow>(
      `
      SELECT
        SPLIT_PART(c.name, '-', 1)     AS label,
        SPLIT_PART(c.name, '-', 1)     AS key,
        SUM(amd.impressions)::bigint   AS impressions,
        SUM(amd.clicks)::bigint        AS clicks,
        SUM(amd.cost_micros) / 1e6    AS cost,
        SUM(amd.conversions)           AS conversions
      FROM ad_metrics_daily amd
      JOIN ads a ON amd.ad_id = a.id
      JOIN campaigns c ON a.campaign_id = c.id
      WHERE c.channel_type = $1
        AND (amd.date IS NULL OR amd.date >= $2::date)
      GROUP BY SPLIT_PART(c.name, '-', 1)
      ORDER BY SUM(amd.impressions) DESC
      `,
      [targetChannelType, startDateStr]
    );
  } else if (country && !campaignId) {
    // Level 2: by campaign
    drillRows = await query<DrillRow>(
      `
      SELECT
        c.name                         AS label,
        c.id                           AS key,
        SUM(amd.impressions)::bigint   AS impressions,
        SUM(amd.clicks)::bigint        AS clicks,
        SUM(amd.cost_micros) / 1e6    AS cost,
        SUM(amd.conversions)           AS conversions
      FROM ad_metrics_daily amd
      JOIN ads a ON amd.ad_id = a.id
      JOIN campaigns c ON a.campaign_id = c.id
      WHERE c.channel_type = $1
        AND SPLIT_PART(c.name, '-', 1) = $2
        AND (amd.date IS NULL OR amd.date >= $3::date)
      GROUP BY c.id, c.name
      ORDER BY SUM(amd.impressions) DESC
      `,
      [targetChannelType, country, startDateStr]
    );
  } else if (campaignId) {
    // Level 3: by ad group
    drillRows = await query<DrillRow>(
      `
      SELECT
        COALESCE(ag.name, a.ad_group_id) AS label,
        a.ad_group_id                    AS key,
        SUM(amd.impressions)::bigint     AS impressions,
        SUM(amd.clicks)::bigint          AS clicks,
        SUM(amd.cost_micros) / 1e6      AS cost,
        SUM(amd.conversions)             AS conversions
      FROM ad_metrics_daily amd
      JOIN ads a ON amd.ad_id = a.id
      LEFT JOIN ad_groups ag ON a.ad_group_id = ag.id
      WHERE a.campaign_id = $1
        AND (amd.date IS NULL OR amd.date >= $2::date)
      GROUP BY a.ad_group_id, ag.name
      ORDER BY SUM(amd.impressions) DESC
      `,
      [campaignId, startDateStr]
    );
  }

  const drilldown: DrilldownItem[] = (drillRows ?? []).map((r) => {
    const imp = Number(r.impressions);
    const clk = Number(r.clicks);
    return {
      label: r.label,
      key: r.key,
      impressions: imp,
      clicks: clk,
      ctr: imp > 0 ? (clk / imp) * 100 : 0,
      cost: Number(r.cost),
      conversions: Number(r.conversions),
      signups_est: null,
      engagement_est: null,
      paying_est: null,
    };
  });

  // ── Ad creatives (level 3 only) ───────────────────────────────────────────
  let adCreatives: AdCreative[] | null = null;
  if (campaignId) {
    type CreativeRow = {
      ad_group_id: string;
      final_url: string | null;
      headlines: string | null;
      descriptions: string | null;
    };
    const creativeRows = await query<CreativeRow>(
      `
      SELECT
        a.ad_group_id,
        a.final_url,
        a.headlines::text    AS headlines,
        a.descriptions::text AS descriptions
      FROM ads a
      WHERE a.campaign_id = $1
        AND a.status != 'REMOVED'
      ORDER BY a.synced_at DESC
      `,
      [campaignId]
    );
    if (creativeRows) {
      // Group by ad_group_id, take first (most-recently-synced) per group
      const seen = new Set<string>();
      adCreatives = [];
      for (const r of creativeRows) {
        if (seen.has(r.ad_group_id)) continue;
        seen.add(r.ad_group_id);
        let headlines: string[] | null = null;
        let descriptions: string[] | null = null;
        try {
          const h = r.headlines ? JSON.parse(r.headlines) : null;
          headlines = Array.isArray(h)
            ? h.map((x: { text?: string } | string) => (typeof x === 'string' ? x : x?.text ?? '')).filter(Boolean)
            : null;
        } catch { /* ignore */ }
        try {
          const d = r.descriptions ? JSON.parse(r.descriptions) : null;
          descriptions = Array.isArray(d)
            ? d.map((x: { text?: string } | string) => (typeof x === 'string' ? x : x?.text ?? '')).filter(Boolean)
            : null;
        } catch { /* ignore */ }
        adCreatives.push({
          ad_group_id: r.ad_group_id,
          final_url: r.final_url,
          headlines,
          descriptions,
        });
      }
    }
  }

  return NextResponse.json({ channels, drilldown, adCreatives });
}
