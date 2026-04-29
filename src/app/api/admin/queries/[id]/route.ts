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

type RouteContext = { params: { id: string } };

// GET /api/admin/queries/[id] — get single query
export async function GET(req: NextRequest, { params }: RouteContext) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const rows = await query(
    `SELECT id, type, name, content, description, version, status, created_by, approved_by, approved_at, created_at
     FROM queries WHERE id = $1`,
    [id]
  );

  if (!rows) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ query: rows[0] });
}

// PUT /api/admin/queries/[id] — update query
// Body can include: content, description, status, approved_by
// If content changes → bump version
// If status changes to verified → set approved_at=NOW()
export async function PUT(req: NextRequest, { params }: RouteContext) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json() as {
    content?: string;
    description?: string;
    status?: string;
    approved_by?: string;
  };

  if (body.status && !['unverified', 'verified', 'disabled'].includes(body.status)) {
    return NextResponse.json({ error: 'status must be unverified, verified, or disabled' }, { status: 400 });
  }

  // Fetch current row
  const existing = await query<{ content: string; version: number; status: string }>(
    `SELECT content, version, status FROM queries WHERE id = $1`,
    [id]
  );

  if (!existing) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  if (existing.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const current = existing[0];
  const contentChanged = body.content !== undefined && body.content !== current.content;
  const becomingVerified = body.status === 'verified' && current.status !== 'verified';

  const setClauses: string[] = [];
  const queryParams: unknown[] = [];

  const push = (clause: string, val: unknown) => {
    queryParams.push(val);
    setClauses.push(`${clause} = $${queryParams.length}`);
  };

  if (body.content !== undefined) push('content', body.content);
  if (body.description !== undefined) push('description', body.description);
  if (body.status !== undefined) push('status', body.status);
  if (body.approved_by !== undefined) push('approved_by', body.approved_by);

  if (contentChanged) {
    queryParams.push(current.version + 1);
    setClauses.push(`version = $${queryParams.length}`);
  }

  if (becomingVerified) {
    setClauses.push(`approved_at = NOW()`);
  }

  if (setClauses.length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  queryParams.push(id);
  const updated = await query(
    `UPDATE queries SET ${setClauses.join(', ')}
     WHERE id = $${queryParams.length}
     RETURNING id, type, name, content, description, version, status, created_by, approved_by, approved_at, created_at`,
    queryParams
  );

  if (!updated) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  return NextResponse.json({ query: updated[0] });
}

// DELETE /api/admin/queries/[id] — soft delete (set status=disabled)
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const rows = await query(
    `UPDATE queries SET status = 'disabled'
     WHERE id = $1 AND status != 'disabled'
     RETURNING id`,
    [id]
  );

  if (!rows) {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Not found or already disabled' }, { status: 404 });
  }

  return NextResponse.json({ success: true, id });
}
