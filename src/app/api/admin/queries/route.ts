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

// GET /api/admin/queries — list all queries
// Query params: ?type=query|prompt  ?status=verified|unverified|disabled
export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const typeFilter = searchParams.get('type');
  const statusFilter = searchParams.get('status');

  const conditions: string[] = [];
  const params: unknown[] = [];

  if (typeFilter) {
    if (!['query', 'prompt'].includes(typeFilter)) {
      return NextResponse.json({ error: 'type must be query or prompt' }, { status: 400 });
    }
    params.push(typeFilter);
    conditions.push(`type = $${params.length}`);
  }

  if (statusFilter) {
    if (!['verified', 'unverified', 'disabled'].includes(statusFilter)) {
      return NextResponse.json({ error: 'status must be verified, unverified, or disabled' }, { status: 400 });
    }
    params.push(statusFilter);
    conditions.push(`status = $${params.length}`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

  const rows = await query(
    `SELECT id, type, name, content, description, version, status, created_by, approved_by, approved_at, created_at
     FROM queries
     ${where}
     ORDER BY created_at DESC`,
    params
  );

  if (rows === null) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  return NextResponse.json({ queries: rows });
}

// POST /api/admin/queries — create a new query
// Body: { type, name, content, description?, created_by? }
export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json() as {
    type?: string;
    name?: string;
    content?: string;
    description?: string;
    created_by?: string;
  };

  const { type, name, content, description, created_by } = body;

  if (!type || !name || !content) {
    return NextResponse.json({ error: 'Body must include type, name, and content' }, { status: 400 });
  }

  if (!['query', 'prompt'].includes(type)) {
    return NextResponse.json({ error: 'type must be query or prompt' }, { status: 400 });
  }

  const rows = await query(
    `INSERT INTO queries (type, name, content, description, version, status, created_by)
     VALUES ($1, $2, $3, $4, 1, 'unverified', $5)
     RETURNING id, type, name, content, description, version, status, created_by, approved_by, approved_at, created_at`,
    [type, name, content, description || null, created_by || null]
  );

  if (!rows) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  return NextResponse.json({ query: rows[0] }, { status: 201 });
}
