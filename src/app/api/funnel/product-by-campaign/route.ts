import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

/**
 * GET /api/funnel/product-by-campaign
 *
 * Returns product funnel data from the product_campaign_funnel table.
 * Populated by BigBrain query #4 (product_funnel_by_campaign).
 *
 * Query params:
 *   ?source=adwordsbrand       — filter by source
 *   ?product=core              — filter by product
 *   ?min_signups=50            — minimum total_signups (default: 10)
 *   ?limit=100                 — max rows (default: 500)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const source = searchParams.get('source');
  const product = searchParams.get('product');
  const minSignups = parseInt(searchParams.get('min_signups') || '10', 10);
  const limit = Math.min(parseInt(searchParams.get('limit') || '500', 10), 5000);

  const conditions: string[] = ['total_signups >= $1'];
  const params: unknown[] = [minSignups];

  if (source) {
    params.push(source);
    conditions.push(`source = $${params.length}`);
  }
  if (product) {
    params.push(product);
    conditions.push(`product = $${params.length}`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  // Detail rows
  const rows = await query(
    `SELECT source, campaign, product, total_signups, engaged_2nd_day, paying_accounts,
            engagement_rate, payer_rate, updated_at
     FROM product_campaign_funnel
     ${where}
     ORDER BY total_signups DESC
     LIMIT ${limit}`,
    params
  );

  // Product summary (aggregated across all campaigns)
  const productSummary = await query(
    `SELECT product,
            SUM(total_signups) AS total_signups,
            SUM(engaged_2nd_day) AS engaged_2nd_day,
            SUM(paying_accounts) AS paying_accounts,
            ROUND(SUM(engaged_2nd_day) * 100.0 / NULLIF(SUM(total_signups), 0), 2) AS engagement_rate,
            ROUND(SUM(paying_accounts) * 100.0 / NULLIF(SUM(total_signups), 0), 2) AS payer_rate
     FROM product_campaign_funnel
     GROUP BY product
     ORDER BY total_signups DESC`
  );

  // Source summary (aggregated across all campaigns per source)
  const sourceSummary = await query(
    `SELECT source,
            SUM(total_signups) AS total_signups,
            SUM(engaged_2nd_day) AS engaged_2nd_day,
            SUM(paying_accounts) AS paying_accounts,
            ROUND(SUM(engaged_2nd_day) * 100.0 / NULLIF(SUM(total_signups), 0), 2) AS engagement_rate,
            ROUND(SUM(paying_accounts) * 100.0 / NULLIF(SUM(total_signups), 0), 2) AS payer_rate
     FROM product_campaign_funnel
     GROUP BY source
     ORDER BY total_signups DESC`
  );

  // Last sync timestamp
  const syncInfo = await query(
    `SELECT MAX(updated_at) AS last_synced, COUNT(*) AS total_rows
     FROM product_campaign_funnel`
  );

  return NextResponse.json({
    rows: rows || [],
    productSummary: productSummary || [],
    sourceSummary: sourceSummary || [],
    syncInfo: (syncInfo && syncInfo[0]) || { last_synced: null, total_rows: 0 },
  });
}
