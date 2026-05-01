import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

type ChannelRow = {
  channel: string;
  channel_type: string;
  impressions: string;
  clicks: string;
  cost: string;
  avg_channel_ad_score: string | null;
  avg_internal_score: string | null;
  avg_lp_relevance_score: string | null;
};

type DrillRow = {
  label: string;
  key: string;
  channel: string;
  impressions: string;
  clicks: string;
  cost: string;
  final_url?: string | null;
};

export interface ChannelData extends Record<string, unknown> {
  source: string;
  channel: string;
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
  product_score: null;
  avg_channel_ad_score: number | null;
  avg_internal_score: number | null;
  avg_lp_relevance_score: number | null;
}

export interface DrilldownItem extends Record<string, unknown> {
  label: string;
  key: string;
  channel: string;
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

export interface AdCreative extends Record<string, unknown> {
  ad_group_id: string;
  final_url: string | null;
  headlines: string[] | null;
  descriptions: string[] | null;
}

const CHANNEL_TYPE_TO_SOURCE: Record<string, string> = {
  // Google Ads channel types
  SEARCH: 'adwordssearch',
  DEMAND_GEN: 'adwordsyoutube',
  DISPLAY: 'adwordsdisplay',
  VIDEO: 'adwordsvideo',
  PERFORMANCE_MAX: 'pmax',
  SHOPPING: 'adwordsshopping',
  '2': 'adwordssearch',
  '3': 'adwordsdisplay',
  '6': 'adwordsshopping',
  '7': 'adwordsvideo',
  '8': 'pmax',
  '13': 'adwordsyoutube',
  DEMAND_GEN_MULTI: 'adwordsyoutube',
  // Meta Ads objectives → unified "meta" source
  OUTCOME_SALES: 'meta',
  OUTCOME_AWARENESS: 'meta',
  OUTCOME_ENGAGEMENT: 'meta',
  OUTCOME_LEADS: 'meta',
  OUTCOME_TRAFFIC: 'meta',
  OUTCOME_APP_PROMOTION: 'meta',
  CONVERSIONS: 'meta',
  LINK_CLICKS: 'meta',
  REACH: 'meta',
  BRAND_AWARENESS: 'meta',
  POST_ENGAGEMENT: 'meta',
  VIDEO_VIEWS: 'meta',
  LEAD_GENERATION: 'meta',
  MESSAGES: 'meta',
  APP_INSTALLS: 'meta',
};

const SOURCE_TO_CHANNEL_TYPES: Record<string, string[]> = {
  adwordssearch: ['2', 'SEARCH'],
  adwordsyoutube: ['13', 'DEMAND_GEN', 'DEMAND_GEN_MULTI'],
  adwordsdisplay: ['3', 'DISPLAY'],
  adwordsvideo: ['7', 'VIDEO'],
  pmax: ['8', 'PERFORMANCE_MAX'],
  adwordsshopping: ['6', 'SHOPPING'],
  meta: ['OUTCOME_SALES', 'OUTCOME_AWARENESS', 'OUTCOME_ENGAGEMENT', 'OUTCOME_LEADS', 'OUTCOME_TRAFFIC', 'OUTCOME_APP_PROMOTION', 'CONVERSIONS', 'LINK_CLICKS', 'REACH', 'BRAND_AWARENESS', 'POST_ENGAGEMENT', 'VIDEO_VIEWS', 'LEAD_GENERATION', 'MESSAGES', 'APP_INSTALLS'],
};

function channelTypeToSource(channelType: string | null, channel?: string): string {
  if (!channelType) return channel === 'meta' ? 'meta' : 'unknown';
  if (CHANNEL_TYPE_TO_SOURCE[channelType]) return CHANNEL_TYPE_TO_SOURCE[channelType];
  // If channel is 'meta', map any unknown objective to 'meta'
  if (channel === 'meta') return 'meta';
  return channelType.toLowerCase().replace(/_/g, '');
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

export async function GET(req: NextRequest) {
 try {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const country = searchParams.get('country');
  const campaignId = searchParams.get('campaign_id');

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

  // Last successful sync timestamp
  const syncResult = await query<{ completed_at: string | null }>(
    `SELECT completed_at FROM sync_runs
     WHERE sync_type = 'ads' AND status = 'completed'
     ORDER BY completed_at DESC LIMIT 1`
  );
  const lastSynced = syncResult?.[0]?.completed_at ?? null;

  // ── Main channel aggregation ──────────────────────────────────────────────
  const channelRows = await query<ChannelRow>(
    `
    SELECT
      c.channel,
      c.channel_type,
      SUM(amd.impressions)::bigint        AS impressions,
      SUM(amd.clicks)::bigint             AS clicks,
      SUM(amd.cost)                       AS cost,
      AVG(ae.channel_ad_score)::text      AS avg_channel_ad_score,
      AVG(ae.internal_score)::text        AS avg_internal_score,
      AVG(ae.lp_relevance_score)::text    AS avg_lp_relevance_score
    FROM ad_metrics_daily amd
    JOIN ads a          ON amd.ad_id    = a.id
    JOIN campaigns c    ON a.campaign_id = c.id
    JOIN accounts acc   ON a.account_id  = acc.id AND acc.is_target = true
    LEFT JOIN ad_extension ae ON a.id   = ae.ad_id
    WHERE amd.date >= $1::date AND amd.date <= $2::date
      AND amd.cost > 0
    GROUP BY c.channel, c.channel_type
    ORDER BY SUM(amd.impressions) DESC
    `,
    [startDateStr, endDateStr]
  );

  if (!channelRows) {
    return NextResponse.json({ channels: [], drilldown: null, lastSynced });
  }

  // ── BigBrain funnel data (signups → engaged → paying) ──────────────────
  const bbRows = await query<{ source: string; total_signups: string; hard_signups: string; engaged_2nd_day: string; paying: string }>(
    `SELECT source,
            SUM(total_signups)::bigint AS total_signups,
            SUM(hard_signups)::bigint AS hard_signups,
            SUM(engaged_2nd_day)::bigint AS engaged_2nd_day,
            SUM(paying)::bigint AS paying
     FROM bigbrain_funnel
     GROUP BY source`
  );
  const bbBySource: Record<string, { signups: number; engaged: number; paying: number }> = {};
  if (bbRows) {
    for (const b of bbRows) {
      bbBySource[b.source] = {
        signups: Number(b.total_signups),
        engaged: Number(b.engaged_2nd_day),
        paying: Number(b.paying),
      };
    }
  }

  // Merge rows by derived source (consolidates all Meta objectives into one "meta" row)
  const sourceMap = new Map<string, {
    channel: string; channel_type: string;
    impressions: number; clicks: number; cost: number;
    avgCasSum: number; avgCasCount: number;
    avgIsSum: number; avgIsCount: number;
    avgLprSum: number; avgLprCount: number;
  }>();
  for (const r of channelRows) {
    const src = channelTypeToSource(r.channel_type, r.channel);
    const existing = sourceMap.get(src);
    const imp = Number(r.impressions);
    const clk = Number(r.clicks);
    const cost = Number(r.cost);
    const avgCas = r.avg_channel_ad_score !== null ? parseFloat(r.avg_channel_ad_score) : null;
    const avgIs = r.avg_internal_score !== null ? parseFloat(r.avg_internal_score) : null;
    const avgLpr = r.avg_lp_relevance_score !== null ? parseFloat(r.avg_lp_relevance_score) : null;
    if (existing) {
      existing.impressions += imp;
      existing.clicks += clk;
      existing.cost += cost;
      if (avgCas !== null && isFinite(avgCas)) { existing.avgCasSum += avgCas; existing.avgCasCount++; }
      if (avgIs !== null && isFinite(avgIs)) { existing.avgIsSum += avgIs; existing.avgIsCount++; }
      if (avgLpr !== null && isFinite(avgLpr)) { existing.avgLprSum += avgLpr; existing.avgLprCount++; }
    } else {
      sourceMap.set(src, {
        channel: r.channel,
        channel_type: r.channel_type,
        impressions: imp, clicks: clk, cost,
        avgCasSum: avgCas !== null && isFinite(avgCas) ? avgCas : 0,
        avgCasCount: avgCas !== null && isFinite(avgCas) ? 1 : 0,
        avgIsSum: avgIs !== null && isFinite(avgIs) ? avgIs : 0,
        avgIsCount: avgIs !== null && isFinite(avgIs) ? 1 : 0,
        avgLprSum: avgLpr !== null && isFinite(avgLpr) ? avgLpr : 0,
        avgLprCount: avgLpr !== null && isFinite(avgLpr) ? 1 : 0,
      });
    }
  }

  const mergedRows = Array.from(sourceMap.entries()).map(([src, d]) => ({
    source: src,
    channel: d.channel,
    channel_type: d.channel_type,
    impressions: d.impressions,
    clicks: d.clicks,
    cost: d.cost,
    avgCas: d.avgCasCount > 0 ? d.avgCasSum / d.avgCasCount : null,
    avgIs: d.avgIsCount > 0 ? d.avgIsSum / d.avgIsCount : null,
    avgLpr: d.avgLprCount > 0 ? d.avgLprSum / d.avgLprCount : null,
  }));
  mergedRows.sort((a, b) => b.impressions - a.impressions);

  // Ad Quality = CTR percentile rank across merged channels
  const ctrs = mergedRows.map((r) => r.impressions > 0 ? r.clicks / r.impressions : 0);
  const adQualities = computePercentiles(ctrs);

  const channels: ChannelData[] = mergedRows.map((r, i) => {
    const bb = bbBySource[r.source] || null;
    return {
      source: r.source,
      channel: r.channel,
      channel_type: r.channel_type,
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.impressions > 0 ? (r.clicks / r.impressions) * 100 : 0,
      cost: r.cost,
      signups: bb?.signups ?? null,
      engaged_2nd_day: bb?.engaged ?? null,
      paying: bb?.paying ?? null,
      ad_quality: adQualities[i] !== null ? Math.round(adQualities[i]!) : null,
      lp_quality: null,
      product_score: null,
      avg_channel_ad_score: r.avgCas !== null ? Math.round(r.avgCas) : null,
      avg_internal_score:   r.avgIs  !== null ? Math.round(r.avgIs)  : null,
      avg_lp_relevance_score: r.avgLpr !== null ? Math.round(r.avgLpr) : null,
    };
  });

  // ── Drill-down ────────────────────────────────────────────────────────────
  if (!source) {
    return NextResponse.json({ channels, drilldown: null, lastSynced });
  }

  const targetChannelTypes = SOURCE_TO_CHANNEL_TYPES[source] ?? [source.toUpperCase(), source];
  const isMeta = source === 'meta';

  let drillRows: DrillRow[] | null = null;

  if (!country && !campaignId) {
    // Level 1: by country (first segment of campaign name)
    drillRows = isMeta
      ? await query<DrillRow>(
          `
          SELECT
            SPLIT_PART(c.name, '-', 1)   AS label,
            SPLIT_PART(c.name, '-', 1)   AS key,
            c.channel,
            SUM(amd.impressions)::bigint AS impressions,
            SUM(amd.clicks)::bigint      AS clicks,
            SUM(amd.cost)                AS cost
          FROM ad_metrics_daily amd
          JOIN ads a       ON amd.ad_id    = a.id
          JOIN campaigns c ON a.campaign_id = c.id
          WHERE c.channel = 'meta'
            AND amd.date >= $1::date AND amd.date <= $2::date
          GROUP BY SPLIT_PART(c.name, '-', 1), c.channel
          ORDER BY SUM(amd.impressions) DESC
          LIMIT 200
          `,
          [startDateStr, endDateStr]
        )
      : await query<DrillRow>(
          `
          SELECT
            SPLIT_PART(c.name, '-', 1)   AS label,
            SPLIT_PART(c.name, '-', 1)   AS key,
            c.channel,
            SUM(amd.impressions)::bigint AS impressions,
            SUM(amd.clicks)::bigint      AS clicks,
            SUM(amd.cost)                AS cost
          FROM ad_metrics_daily amd
          JOIN ads a       ON amd.ad_id    = a.id
          JOIN campaigns c ON a.campaign_id = c.id
          WHERE c.channel_type = ANY($1::text[])
            AND amd.date >= $2::date AND amd.date <= $3::date
          GROUP BY SPLIT_PART(c.name, '-', 1), c.channel
          ORDER BY SUM(amd.impressions) DESC
          LIMIT 200
          `,
          [targetChannelTypes, startDateStr, endDateStr]
        );
  } else if (country && !campaignId) {
    // Level 2: by campaign
    drillRows = isMeta
      ? await query<DrillRow>(
          `
          SELECT
            c.name                       AS label,
            c.id                         AS key,
            c.channel,
            SUM(amd.impressions)::bigint AS impressions,
            SUM(amd.clicks)::bigint      AS clicks,
            SUM(amd.cost)                AS cost
          FROM ad_metrics_daily amd
          JOIN ads a       ON amd.ad_id    = a.id
          JOIN campaigns c ON a.campaign_id = c.id
          WHERE c.channel = 'meta'
            AND SPLIT_PART(c.name, '-', 1) = $1
            AND amd.date >= $2::date AND amd.date <= $3::date
          GROUP BY c.id, c.name, c.channel
          ORDER BY SUM(amd.impressions) DESC
          LIMIT 500
          `,
          [country, startDateStr, endDateStr]
        )
      : await query<DrillRow>(
          `
          SELECT
            c.name                       AS label,
            c.id                         AS key,
            c.channel,
            SUM(amd.impressions)::bigint AS impressions,
            SUM(amd.clicks)::bigint      AS clicks,
            SUM(amd.cost)                AS cost
          FROM ad_metrics_daily amd
          JOIN ads a       ON amd.ad_id    = a.id
          JOIN campaigns c ON a.campaign_id = c.id
          WHERE c.channel_type = ANY($1::text[])
            AND SPLIT_PART(c.name, '-', 1) = $2
            AND amd.date >= $3::date AND amd.date <= $4::date
          GROUP BY c.id, c.name, c.channel
          ORDER BY SUM(amd.impressions) DESC
          LIMIT 500
          `,
          [targetChannelTypes, country, startDateStr, endDateStr]
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
          c.channel,
          SUM(amd.impressions)::bigint     AS impressions,
          SUM(amd.clicks)::bigint          AS clicks,
          SUM(amd.cost)                    AS cost
        FROM ad_metrics_daily amd
        JOIN ads a          ON amd.ad_id    = a.id
        JOIN campaigns c    ON a.campaign_id = c.id
        LEFT JOIN ad_groups ag ON a.ad_group_id = ag.id
        WHERE a.campaign_id = $1
          AND amd.date >= $2::date AND amd.date <= $3::date
        GROUP BY a.ad_group_id, ag.name, c.channel
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
        aa.channel,
        aa.impressions,
        aa.clicks,
        aa.cost,
        ul.final_url
      FROM ad_agg aa
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
      channel: r.channel,
      impressions: imp,
      clicks: clk,
      ctr: imp > 0 ? (clk / imp) * 100 : 0,
      cost: Number(r.cost),
      signups: null,
      engaged_2nd_day: null,
      paying: null,
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

  return NextResponse.json({ channels, drilldown, adCreatives, lastSynced });
 } catch (error) {
  console.error('[Cockpit Funnel] Unhandled error:', error);
  return NextResponse.json({ error: String(error), channels: [], drilldown: null, lastSynced: null }, { status: 500 });
 }
}
