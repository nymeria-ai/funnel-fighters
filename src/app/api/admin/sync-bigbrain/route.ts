import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';

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

interface BigBrainRow {
  source: string;
  campaign_name: string;
  ad_group_name?: string;
  period_start: string;
  period_end: string;
  total_signups?: number;
  hard_signups?: number;
  engaged_2nd_day?: number;
  paying?: number;
}

interface Payload {
  rows: BigBrainRow[];
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await req.json()) as Payload;
  const { rows } = body;

  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return NextResponse.json({ error: 'Invalid payload: need rows[]' }, { status: 400 });
  }

  let upserted = 0;

  try {
    for (const row of rows) {
      const total = row.total_signups ?? 0;
      const hard = row.hard_signups ?? 0;
      const engaged = row.engaged_2nd_day ?? 0;
      const paying = row.paying ?? 0;

      const hard_signup_rate = total > 0 ? (hard / total) * 100 : 0;
      const engagement_rate = hard > 0 ? (engaged / hard) * 100 : 0;
      const paying_rate = hard > 0 ? (paying / hard) * 100 : 0;

      await query(
        `INSERT INTO bigbrain_funnel
           (source, campaign_name, ad_group_name, period_start, period_end,
            total_signups, hard_signups, engaged_2nd_day, paying,
            hard_signup_rate, engagement_rate, paying_rate, synced_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
         ON CONFLICT (source, campaign_name, ad_group_name, period_start)
         DO UPDATE SET
           period_end       = EXCLUDED.period_end,
           total_signups    = EXCLUDED.total_signups,
           hard_signups     = EXCLUDED.hard_signups,
           engaged_2nd_day  = EXCLUDED.engaged_2nd_day,
           paying           = EXCLUDED.paying,
           hard_signup_rate = EXCLUDED.hard_signup_rate,
           engagement_rate  = EXCLUDED.engagement_rate,
           paying_rate      = EXCLUDED.paying_rate,
           synced_at        = NOW()`,
        [
          row.source,
          row.campaign_name,
          row.ad_group_name ?? '',
          row.period_start,
          row.period_end,
          total,
          hard,
          engaged,
          paying,
          hard_signup_rate.toFixed(2),
          engagement_rate.toFixed(2),
          paying_rate.toFixed(2),
        ]
      );
      upserted++;
    }

    await query(
      `INSERT INTO sync_runs (sync_type, status, completed_at, rows_processed)
       VALUES ($1, 'completed', NOW(), $2)`,
      ['bigbrain', upserted]
    );

    return NextResponse.json({ success: true, upserted });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('[sync-bigbrain] Error:', msg);
    return NextResponse.json({ error: 'Sync failed', details: msg }, { status: 500 });
  }
}
