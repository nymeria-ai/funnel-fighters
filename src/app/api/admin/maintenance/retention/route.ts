import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

// POST /api/admin/maintenance/retention
// Deletes ad_metrics_daily rows older than 180 days.
// Returns: { deleted: number, oldestRemaining: string | null }
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const deleteResult = await query<{ count: string }>(
    `WITH deleted AS (
       DELETE FROM ad_metrics_daily
       WHERE date < CURRENT_DATE - INTERVAL '180 days'
       RETURNING 1
     )
     SELECT COUNT(*) AS count FROM deleted`
  );

  if (deleteResult === null) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const deleted = parseInt(deleteResult[0]?.count ?? '0', 10);

  const oldestResult = await query<{ oldest: string | null }>(
    `SELECT MIN(date)::TEXT AS oldest FROM ad_metrics_daily`
  );

  const oldestRemaining = oldestResult?.[0]?.oldest ?? null;

  return NextResponse.json({ deleted, oldestRemaining });
}
