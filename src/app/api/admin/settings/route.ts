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

// GET /api/admin/settings — return all settings as key-value object
export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await query<{ key: string; value: unknown; updated_at: string }>(
    `SELECT key, value, updated_at FROM settings ORDER BY key`
  );

  if (!rows) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  const settings: Record<string, unknown> = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }

  return NextResponse.json({ settings });
}

// PUT /api/admin/settings — update a setting by key
// Body: { key: string, value: unknown }
export async function PUT(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as { key?: string; value?: unknown };
  const { key, value } = body;

  if (!key || value === undefined) {
    return NextResponse.json({ error: 'Body must include key and value' }, { status: 400 });
  }

  const rows = await query<{ key: string; value: unknown; updated_at: string }>(
    `INSERT INTO settings (key, value, updated_at)
     VALUES ($1, $2::jsonb, NOW())
     ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = NOW()
     RETURNING key, value, updated_at`,
    [key, JSON.stringify(value)]
  );

  if (!rows) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  return NextResponse.json({ setting: rows[0] });
}
