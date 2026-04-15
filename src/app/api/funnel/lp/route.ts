import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaign = searchParams.get('campaign');
  const landingPage = searchParams.get('landing_page');

  let sql = `SELECT campaign_name, landing_page, device, visits, get_started, gs_rate, updated_at
             FROM lp_funnel_metrics`;
  const params: unknown[] = [];
  const conditions: string[] = [];

  if (campaign) {
    conditions.push(`campaign_name = $${params.length + 1}`);
    params.push(campaign);
  }
  if (landingPage) {
    conditions.push(`landing_page = $${params.length + 1}`);
    params.push(landingPage);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }
  sql += ` ORDER BY visits DESC LIMIT 500`;

  const rows = await query(sql, params);
  return NextResponse.json({ rows: rows || [] });
}
