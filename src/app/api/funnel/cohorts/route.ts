import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const device = searchParams.get('device') || 'all';

  let sql: string;
  let params: unknown[];

  if (device === 'all') {
    // Aggregate across devices
    sql = `SELECT week_start,
                  SUM(visits) AS visits,
                  SUM(get_started) AS get_started,
                  SUM(soft_signups) AS soft_signups,
                  SUM(hard_signups) AS hard_signups,
                  SUM(payers_28d) AS payers_28d,
                  ROUND(SUM(acv_28d)::numeric, 2) AS acv_28d
           FROM funnel_weekly
           GROUP BY week_start
           ORDER BY week_start DESC
           LIMIT 13`;
    params = [];
  } else {
    sql = `SELECT week_start, visits, get_started, soft_signups, hard_signups, payers_28d, acv_28d
           FROM funnel_weekly
           WHERE device = $1
           ORDER BY week_start DESC
           LIMIT 13`;
    params = [device];
  }

  const rows = await query(sql, params);
  return NextResponse.json({ rows: rows || [] });
}
