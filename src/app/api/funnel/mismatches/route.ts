import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Product-LP Mismatch Detector
 * Identifies campaigns where the LP product doesn't match what users actually sign up for.
 * This is a key "Product Duck" insight — are we delivering on the promise?
 */
export async function GET() {
  // Try DB first
  const dbRows = await query<{
    campaign_name: string;
    landing_page: string;
    lp_product: string;
    signup_product: string;
    hard_signups: number;
    payers_28d: number;
    acv_28d: number;
  }>(
    `SELECT campaign_name, landing_page, lp_product, signup_product,
            hard_signups, payers_28d, acv_28d
     FROM product_funnel_metrics
     WHERE lp_product != signup_product
       AND lp_product != '(unknown)'
       AND signup_product != '(unknown)'
     ORDER BY hard_signups DESC
     LIMIT 50`
  );

  if (dbRows && dbRows.length > 0) {
    return NextResponse.json({ mismatches: dbRows, source: 'database' });
  }

  // Fallback to static data
  const pfPath = join(process.cwd(), 'data', 'product_funnel.json');
  if (!existsSync(pfPath)) {
    return NextResponse.json({ mismatches: [], source: 'none' });
  }

  const data = JSON.parse(readFileSync(pfPath, 'utf-8'));
  const mismatches = data.rows
    .filter((r: any) =>
      r.lp_product &&
      r.signup_product &&
      r.lp_product !== '(unknown)' &&
      r.signup_product !== '(unknown)' &&
      r.lp_product !== r.signup_product
    )
    .sort((a: any, b: any) => b.hard_signups - a.hard_signups);

  return NextResponse.json({ mismatches, source: 'static' });
}
