import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Serves static data files from /data/ directory.
 * Useful as fallback when Postgres DB is not configured.
 * Query param: ?type=weekly_cohorts|product_funnel|lp_funnel|duck_scores|google_ads_campaigns|google_ads_ads|google_ads_keywords
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  const validTypes = [
    'weekly_cohorts', 'product_funnel', 'lp_funnel', 'duck_scores',
    'google_ads_campaigns', 'google_ads_ads', 'google_ads_keywords', 'insights',
  ];

  if (!type || !validTypes.includes(type)) {
    return NextResponse.json(
      { error: `Invalid type. Valid: ${validTypes.join(', ')}` },
      { status: 400 }
    );
  }

  const filepath = join(process.cwd(), 'data', `${type}.json`);

  if (!existsSync(filepath)) {
    return NextResponse.json(
      { error: `Data file not found: ${type}.json. Run sync scripts first.` },
      { status: 404 }
    );
  }

  try {
    const raw = readFileSync(filepath, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse data file' }, { status: 500 });
  }
}
