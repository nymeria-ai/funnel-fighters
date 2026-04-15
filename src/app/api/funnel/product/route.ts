import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const campaign = searchParams.get('campaign');
  const landingPage = searchParams.get('landing_page');

  // Per-campaign/LP product funnel
  let detailSql = `SELECT campaign_name, landing_page, device, lp_product, signup_product, installed_product,
                          soft_signups, hard_signups, payers_28d, acv_28d, updated_at
                   FROM product_funnel_metrics`;
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
    detailSql += ` WHERE ${conditions.join(' AND ')}`;
  }
  detailSql += ` ORDER BY hard_signups DESC LIMIT 500`;

  const rows = await query(detailSql, params);

  // Aggregated product alignment summary (across all campaigns)
  const alignmentRows = await query(
    `SELECT signup_product,
            SUM(soft_signups) AS soft_signups,
            SUM(hard_signups) AS hard_signups,
            SUM(payers_28d) AS payers_28d,
            ROUND(SUM(acv_28d)::numeric, 2) AS acv_28d
     FROM product_funnel_metrics
     GROUP BY signup_product
     ORDER BY hard_signups DESC`
  );

  return NextResponse.json({
    rows: rows || [],
    productSummary: alignmentRows || [],
  });
}
