import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

type SyncType = 'accounts' | 'campaigns' | 'ad_groups' | 'ads' | 'ad_metrics' | 'ad_extension' | 'lp_extension';

interface SyncPayload {
  type: SyncType;
  rows: Record<string, unknown>[];
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as SyncPayload;
  const { type, rows } = body;

  if (!type || !rows || !Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: 'Invalid payload: need type and rows[]' }, { status: 400 });
  }

  let upserted = 0;

  try {
    switch (type) {
      case 'accounts':
        for (const row of rows) {
          await query(
            `INSERT INTO accounts (id, name, channel, is_manager, mcc_id, is_target, synced_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (id) DO UPDATE SET name=$2, channel=$3, is_manager=$4, mcc_id=$5, is_target=$6, synced_at=NOW()`,
            [row.id, row.name, row.channel || 'google', row.is_manager ?? false, row.mcc_id || '7645779471', row.is_target ?? true]
          );
          upserted++;
        }
        break;

      case 'campaigns':
        for (const row of rows) {
          await query(
            `INSERT INTO campaigns (id, account_id, name, status, channel, channel_type, synced_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             ON CONFLICT (id) DO UPDATE SET account_id=$2, name=$3, status=$4, channel=$5, channel_type=$6, synced_at=NOW()`,
            [row.id, row.account_id, row.name, row.status || 'ENABLED', row.channel || 'google', row.channel_type || 'SEARCH']
          );
          upserted++;
        }
        break;

      case 'ad_groups':
        for (const row of rows) {
          await query(
            `INSERT INTO ad_groups (id, campaign_id, account_id, name, channel, synced_at)
             VALUES ($1, $2, $3, $4, $5, NOW())
             ON CONFLICT (id) DO UPDATE SET campaign_id=$2, account_id=$3, name=$4, channel=$5, synced_at=NOW()`,
            [row.id, row.campaign_id, row.account_id, row.name, row.channel || 'google']
          );
          upserted++;
        }
        break;

      case 'ads':
        for (const row of rows) {
          let domain = '';
          const finalUrl = (row.final_url || (Array.isArray(row.final_urls) ? row.final_urls[0] : '') || '') as string;
          try { if (finalUrl) domain = new URL(finalUrl).hostname; } catch { /* */ }

          await query(
            `INSERT INTO ads (id, ad_group_id, campaign_id, account_id, channel, ad_type, status, final_url, final_url_domain, headlines, descriptions, synced_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
             ON CONFLICT (id) DO UPDATE SET ad_group_id=$2, campaign_id=$3, account_id=$4, channel=$5, ad_type=$6, status=$7, final_url=$8, final_url_domain=$9, headlines=$10, descriptions=$11, synced_at=NOW()`,
            [
              row.ad_id || row.id,
              row.ad_group_id,
              row.campaign_id,
              row.account_id || '',
              row.channel || 'google',
              row.ad_type || 'RESPONSIVE_SEARCH_AD',
              row.status || 'ENABLED',
              finalUrl,
              domain,
              JSON.stringify(row.headlines || []),
              JSON.stringify(row.descriptions || []),
            ]
          );
          upserted++;
        }
        break;

      case 'ad_metrics':
        for (const row of rows) {
          // Normalize cost to dollars: accept cost (dollars) or cost_micros (micros from Google Ads)
          const costDollars = row.cost != null
            ? Number(row.cost)
            : (Number(row.cost_micros) || 0) / 1_000_000;
          await query(
            `INSERT INTO ad_metrics_daily (ad_id, date, impressions, clicks, cost, conversions)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (ad_id, date) DO UPDATE SET impressions=$3, clicks=$4, cost=$5, conversions=$6`,
            [
              row.ad_id,
              row.date || new Date().toISOString().split('T')[0],
              row.impressions || 0,
              row.clicks || 0,
              costDollars,
              row.conversions || 0,
            ]
          );
          upserted++;
        }
        break;

      case 'ad_extension':
        for (const row of rows) {
          await query(
            `INSERT INTO ad_extension (ad_id, channel_ad_score, internal_score, selling_point, selling_point_hash, lp_relevance_score, relevance_reason, computed_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
             ON CONFLICT (ad_id) DO UPDATE SET
               channel_ad_score=$2, internal_score=$3, selling_point=$4, selling_point_hash=$5,
               lp_relevance_score=$6, relevance_reason=$7, computed_at=NOW()`,
            [
              row.ad_id,
              row.channel_ad_score ?? null,
              row.internal_score ?? null,
              row.selling_point ?? null,
              row.selling_point_hash ?? null,
              row.lp_relevance_score ?? null,
              row.relevance_reason ?? null,
            ]
          );
          upserted++;
        }
        break;

      case 'lp_extension':
        for (const row of rows) {
          await query(
            `INSERT INTO landing_page_extension (url, selling_point, google_lp_score, performance_score, content_summary, computed_at)
             VALUES ($1, $2, $3, $4, $5, NOW())
             ON CONFLICT (url) DO UPDATE SET
               selling_point=$2, google_lp_score=$3, performance_score=$4, content_summary=$5, computed_at=NOW()`,
            [
              row.url,
              row.selling_point ?? null,
              row.google_lp_score ?? null,
              row.performance_score ?? null,
              row.content_summary ?? null,
            ]
          );
          upserted++;
        }
        break;

      default:
        return NextResponse.json({ error: `Unknown sync type: ${type}` }, { status: 400 });
    }

    // Log the sync run
    await query(
      `INSERT INTO sync_runs (sync_type, status, completed_at, rows_processed)
       VALUES ($1, 'completed', NOW(), $2)`,
      [`ads_${type}`, upserted]
    );

    return NextResponse.json({ success: true, type, upserted });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`[sync-ads] Error syncing ${type}:`, msg);
    return NextResponse.json({ error: 'Sync failed', details: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tables = ['accounts', 'campaigns', 'ad_groups', 'ads', 'ad_metrics_daily'];
  const status: Record<string, { rows: number; lastSynced: string | null }> = {};

  for (const table of tables) {
    const countResult = await query<{ count: string }>(`SELECT COUNT(*) as count FROM ${table}`);
    const lastResult = await query<{ last: string }>(`SELECT MAX(synced_at) as last FROM ${table}`);
    status[table] = {
      rows: countResult ? parseInt(countResult[0]?.count || '0') : 0,
      lastSynced: lastResult?.[0]?.last || null,
    };
  }

  return NextResponse.json({ status });
}
