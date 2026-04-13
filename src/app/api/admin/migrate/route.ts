import { NextResponse } from 'next/server';
import { runMigrations } from '@/lib/db/migrate';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = await runMigrations();
    return NextResponse.json(result, { status: result.success ? 200 : 500 });
  } catch (error) {
    console.error('[Migrate] Error:', error);
    return NextResponse.json(
      { success: false, message: 'Migration failed unexpectedly' },
      { status: 500 },
    );
  }
}
