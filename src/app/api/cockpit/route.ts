import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';
import { hasAdsInDb, getCockpitRowsFromDb } from '@/lib/google-ads/db-fallback';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '50');

    const dbHasAds = await hasAdsInDb();
    if (!dbHasAds) {
      return NextResponse.json({
        rows: [],
        pagination: { page, pageSize, totalRows: 0, totalPages: 0 },
        lastSynced: null,
        source: 'none',
      });
    }

    const allRows = await getCockpitRowsFromDb();
    allRows.sort((a, b) => b.spend - a.spend);

    const totalRows = allRows.length;
    const paginatedRows = allRows.slice((page - 1) * pageSize, page * pageSize);

    // Last successful ads sync
    const syncResult = await query<{ completed_at: string | null }>(
      `SELECT completed_at FROM sync_runs
       WHERE sync_type = 'ads' AND status = 'completed'
       ORDER BY completed_at DESC LIMIT 1`
    );
    const lastSynced = syncResult?.[0]?.completed_at ?? null;

    return NextResponse.json({
      rows: paginatedRows,
      pagination: { page, pageSize, totalRows, totalPages: Math.ceil(totalRows / pageSize) },
      lastSynced,
      source: 'database',
    });
  } catch (error) {
    console.error('Cockpit API error:', error);
    return NextResponse.json({ error: 'Failed to fetch cockpit data' }, { status: 500 });
  }
}
