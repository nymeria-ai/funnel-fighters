import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

type ChannelRow = {
  channel_type: string;
  impressions: string;
  clicks: string;
  cost: string;
  total_signups: string | null;
  engaged_2nd_day: string | null;
  paying: string | null;
};

type DrillRow = {
  label: string;
  key: string;
  impressions: string;
  clicks: string;
  cost: string;
  total_signups: string | null;
  engaged_2nd_day: string | null;
  paying: string | null;
  final_url?: string | null;
};

export interface ChannelData {
  source: string;
  channel_type: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  signups: number | null;
  engaged_2nd_day: number | null;
  paying: number | null;
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
  signups: number | null;
  engaged_2nd_day: number | null;
  paying: number | null;
  ad_quality: number | null;
  lp_quality: number | null;
  product_score: number | null;
  final_url?: string | null;
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

/**
 * All channel_type values (numeric + string label) stored per source.
 * Used for drill-down WHERE c.channel_type = $1 OR c.channel_type = $2 queries so both
 * numeric ('2') and string ('SEARCH') representations match.
 */
const SOURCE_TO_CHANNEL_TYPES: Record<string, string[]> = {
  adwordssearch: ['2', 'SEARCH'],
  adwordsyoutube: ['13', 'DEMAND_GEN', 'DEMAND_GEN_MULTI'],
  adwordsdisplay: ['3', 'DISPLAY'],
  adwordsvideo: ['7', 'VIDEO'],
  pmax: ['8', 'PERFORMANCE_MAX'],
  adwordsshopping: ['6', 'SHOPPING'],
};

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

/** Ad Quality = CTR percentile rank across channels */
function computeAdQualities(channels: { impressions: number; clicks: number }[]): (number | null)[] {
  const ctrs = channels.map((c) => (c.impressions > 0 ? c.clicks / c.impressions : 0));
  return computePercentiles(ctrs);
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

  // Date range: prefer explicit start_date/end_date, else compute from days param
  const startDateParam = searchParams.get('start_date');
  const endDateParam = searchParams.get('end_date');

  let startDateStr: string;
  let endDateStr: string;

  if (startDateParam && endDateParam) {
    startDateStr = startDateParam;
    endDateStr = endDateParam;
  } else {
    const daysParam = parseInt(searchParams.get('days') || '30');
    const days = [1, 7, 14, 30, 90].includes(daysParam) ? daysParam : 30;
    const start = new Date();
    start.setDate(start.getDate() - days);
    startDateStr = start.toISOString().split('T')[0];
    endDateStr = new Date().toISOString().split('T')[0];
  }

  // ── Main channel aggregation ──────────────────────────────────────────────
  const channelRows = await query<ChannelRow>(
    `
    WITH ad_agg AS (
      SELECT
        c.channel_type,
        SUM(amd.impressions)::bigint  AS impressions,
        SUM(amd.clicks)::bigint       AS clicks,
        SUM(amd.cost_micros) / 1e6   AS cost
      FROM ad_metrics_daily amd
      JOIN ads a ON amd.ad_id = a.id
      JOIN campaigns c ON a.campaign_id = c.id
      WHERE (amd.date IS NULL OR (amd.date >= $1::date AND amd.date <= $2::date))
      GROUP BY c.channel_type
    ),
    bb_agg AS (
      SELECT
        c.channel_type,
        SUM(bb.total_signups)::bigint    AS total_signups,
        SUM(bb.engaged_2nd_day)::bigint AS engaged_2nd_day,
        SUM(bb.paying)::bigint          AS paying
      FROM bigbrain_funnel bb
      JOIN campaigns c ON c.name = bb.campaign_name
      WHERE bb.period_start <= $2::date AND bb.period_end >= $1::date
      GROUP BY c.channel_type
    )
    SELECT
      aa.channel_type,
      aa.impressions,
      aa.clicks,
      aa.cost,
      ba.total_signups,
      ba.engaged_2nd_day,
      ba.paying
    FROM ad_agg aa
    LEFT JOIN bb_agg ba ON ba.channel_type = aa.channel_type
    ORDER BY aa.impressions DESC
    `,
    [startDateStr, endDateStr]
  );

  if (!channelRows) {
    return NextResponse.json({ channels: [], drilldown: null });
  }

  // Compute quality scores
  // Ad Quality = CTR percentile rank
  const adQualities = computeAdQualities(
    channelRows.map((r) => ({
      impressions: Number(r.impressions),
      clicks: Number(r.clicks),
    }))
  );

  // LP Quality = signups / clicks (CVR to signup) percentile rank
  const lpCvrs = channelRows.map((r) => {
    const hs = n(r.total_signups);
    const clk = Number(r.clicks);
    if (hs === null || clk === 0) return null;
    return hs / clk;
  });
  const lpPercentiles = computePercentiles(lpCvrs);

  // Product Score = engaged_2nd_day / signups (engagement rate) percentile rank
  const productCvrs = channelRows.map((r) => {
    const e2d = n(r.engaged_2nd_day);
    const hs = n(r.total_signups);
    if (e2d === null || hs === null || hs === 0) return null;
    return e2d / hs;
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
      signups: n(r.total_signups),
      engaged_2nd_day: n(r.engaged_2nd_day),
      paying: n(r.paying),
      ad_quality: adQualities[i] !== null ? Math.round(adQualities[i]!) : null,
      lp_quality: lpPercentiles[i] !== null ? Math.round(lpPercentiles[i]!) : null,
      product_score: productPercentiles[i] !== null ? Math.round(productPercentiles[i]!) : null,
    };
  });

  // ── Drill-down ────────────────────────────────────────────────────────────
  if (!source) {
    return NextResponse.json({ channels, drilldown: null });
  }

  // Match both numeric ('2') and string ('SEARCH') channel_type values
  const targetChannelTypes = SOURCE_TO_CHANNEL_TYPES[source] ?? [source.toUpperCase(), source];
  const ct1 = targetChannelTypes[0] || source;
  const ct2 = targetChannelTypes[1] || targetChannelTypes[0] || source;

  let drillRows: DrillRow[] | null = null;

  if (!country && !campaignId) {
    // Level 1: by country (first segment of campaign name)
    drillRows = await query<DrillRow>(
      `
      WITH ad_agg AS (
        SELECT
          SPLIT_PART(c.name, '-', 1)     AS country,
          SUM(amd.impressions)::bigint   AS impressions,
          SUM(amd.clicks)::bigint        AS clicks,
          SUM(amd.cost_micros) / 1e6    AS cost
        FROM ad_metrics_daily amd
        JOIN ads a ON amd.ad_id = a.id
        JOIN campaigns c ON a.campaign_id = c.id
        WHERE (c.channel_type = $1 OR c.channel_type = $2)
          AND (amd.date IS NULL OR (amd.date >= $3::date AND amd.date <= $4::date))
        GROUP BY SPLIT_PART(c.name, '-', 1)
      ),
      bb_agg AS (
        SELECT
          SPLIT_PART(bb.campaign_name, '-', 1) AS country,
          SUM(bb.total_signups)::bigint          AS total_signups,
          SUM(bb.engaged_2nd_day)::bigint       AS engaged_2nd_day,
          SUM(bb.paying)::bigint                AS paying
        FROM bigbrain_funnel bb
        JOIN campaigns c ON c.name = bb.campaign_name
        WHERE (c.channel_type = $1 OR c.channel_type = $2)
          AND bb.period_start <= $4::date AND bb.period_end >= $3::date
        GROUP BY SPLIT_PART(bb.campaign_name, '-', 1)
      )
      SELECT
        aa.country AS label,
        aa.country AS key,
        aa.impressions,
        aa.clicks,
        aa.cost,
        ba.total_signups,
        ba.engaged_2nd_day,
        ba.paying
      FROM ad_agg aa
      LEFT JOIN bb_agg ba ON ba.country = aa.country
      ORDER BY aa.impressions DESC
      `,
      [ct1, ct2, startDateStr, endDateStr]
    );
  } else if (country && !campaignId) {
    // Level 2: by campaign
    drillRows = await query<DrillRow>(
      `
      WITH ad_agg AS (
        SELECT
          c.name                         AS campaign_name,
          c.id                           AS campaign_id,
          SUM(amd.impressions)::bigint   AS impressions,
          SUM(amd.clicks)::bigint        AS clicks,
          SUM(amd.cost_micros) / 1e6    AS cost
        FROM ad_metrics_daily amd
        JOIN ads a ON amd.ad_id = a.id
        JOIN campaigns c ON a.campaign_id = c.id
        WHERE (c.channel_type = $1 OR c.channel_type = $2)
          AND SPLIT_PART(c.name, '-', 1) = $3
          AND (amd.date IS NULL OR (amd.date >= $4::date AND amd.date <= $5::date))
        GROUP BY c.id, c.name
      ),
      bb_agg AS (
        SELECT
          bb.campaign_name,
          SUM(bb.total_signups)::bigint    AS total_signups,
          SUM(bb.engaged_2nd_day)::bigint AS engaged_2nd_day,
          SUM(bb.paying)::bigint          AS paying
        FROM bigbrain_funnel bb
        WHERE bb.period_start <= $5::date AND bb.period_end >= $4::date
        GROUP BY bb.campaign_name
      )
      SELECT
        aa.campaign_name AS label,
        aa.campaign_id   AS key,
        aa.impressions,
        aa.clicks,
        aa.cost,
        ba.total_signups,
        ba.engaged_2nd_day,
        ba.paying
      FROM ad_agg aa
      LEFT JOIN bb_agg ba ON ba.campaign_name = aa.campaign_name
      ORDER BY aa.impressions DESC
      `,
      [ct1, ct2, country, startDateStr, endDateStr]
    );
  } else if (campaignId) {
    // Level 3: by ad group
    drillRows = await query<DrillRow>(
      `
      WITH ad_agg AS (
        SELECT
          COALESCE(ag.name, a.ad_group_id) AS label,
          a.ad_group_id,
          ag.name                          AS ag_name,
          SUM(amd.impressions)::bigint     AS impressions,
          SUM(amd.clicks)::bigint          AS clicks,
          SUM(amd.cost_micros) / 1e6      AS cost
        FROM ad_metrics_daily amd
        JOIN ads a ON amd.ad_id = a.id
        LEFT JOIN ad_groups ag ON a.ad_group_id = ag.id
        WHERE a.campaign_id = $1
          AND (amd.date IS NULL OR (amd.date >= $2::date AND amd.date <= $3::date))
        GROUP BY a.ad_group_id, ag.name
      ),
      bb_agg AS (
        SELECT
          bb.ad_group_name,
          SUM(bb.total_signups)::bigint    AS total_signups,
          SUM(bb.engaged_2nd_day)::bigint AS engaged_2nd_day,
          SUM(bb.paying)::bigint          AS paying
        FROM bigbrain_funnel bb
        WHERE bb.campaign_name = (SELECT name FROM campaigns WHERE id = $1)
          AND bb.period_start <= $3::date AND bb.period_end >= $2::date
        GROUP BY bb.ad_group_name
      ),
      url_lookup AS (
        SELECT DISTINCT ON (a.ad_group_id)
          a.ad_group_id,
          a.final_url
        FROM ads a
        WHERE a.campaign_id = $1
          AND a.final_url IS NOT NULL
          AND a.status != 'REMOVED'
        ORDER BY a.ad_group_id, a.synced_at DESC
      )
      SELECT
        aa.label,
        aa.ad_group_id AS key,
        aa.impressions,
        aa.clicks,
        aa.cost,
        ba.total_signups,
        ba.engaged_2nd_day,
        ba.paying,
        ul.final_url
      FROM ad_agg aa
      LEFT JOIN bb_agg ba ON ba.ad_group_name = aa.ag_name
      LEFT JOIN url_lookup ul ON ul.ad_group_id = aa.ad_group_id
      ORDER BY aa.impressions DESC
      `,
      [campaignId, startDateStr, endDateStr]
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
      signups: n(r.total_signups),
      engaged_2nd_day: n(r.engaged_2nd_day),
      paying: n(r.paying),
      ad_quality: null,
      lp_quality: null,
      product_score: null,
      final_url: r.final_url ?? null,
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
