/**
 * GET /api/admin/pipeline/status
 *
 * Returns current pipeline status: last run time, per-step results, next scheduled run.
 * Auth: Bearer ADMIN_SYNC_SECRET
 */

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

// Pipeline step names in order
const PIPELINE_STEPS = [
  'pipeline:step1:sync-ads',
  'pipeline:step2:selling-points',
  'pipeline:step3:landing-pages',
  'pipeline:step4:bigbrain',
  'pipeline:step5:insights',
];

interface SyncRunRow extends Record<string, unknown> {
  id: number;
  sync_type: string;
  status: string;
  started_at: string;
  completed_at: string | null;
  rows_processed: number;
  error_message: string | null;
}

export async function GET(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Last overall pipeline run (any channel)
  const lastPipelineRuns = await query<SyncRunRow>(
    `SELECT id, sync_type, status, started_at, completed_at, rows_processed, error_message
     FROM sync_runs
     WHERE sync_type LIKE 'pipeline:%'
       AND sync_type NOT LIKE 'pipeline:step%'
     ORDER BY started_at DESC
     LIMIT 5`
  );

  // Per-step results from the most recent pipeline run
  const latestPipelineRun = lastPipelineRuns?.[0] ?? null;

  // Get last result for each step
  const stepResults: Record<string, SyncRunRow | null> = {};
  for (const stepName of PIPELINE_STEPS) {
    const rows = await query<SyncRunRow>(
      `SELECT id, sync_type, status, started_at, completed_at, rows_processed, error_message
       FROM sync_runs
       WHERE sync_type = $1
       ORDER BY started_at DESC
       LIMIT 1`,
      [stepName]
    );
    stepResults[stepName] = rows?.[0] ?? null;
  }

  // Fetch next scheduled run time from settings
  const cronSetting = await query<{ value: string }>(
    `SELECT value FROM settings WHERE key = 'cron_time_utc'`
  );
  const cronTimeUtc = cronSetting?.[0]?.value
    ? (JSON.parse(cronSetting[0].value) as string)
    : '03:30';

  // Compute next run: today or tomorrow at cronTimeUtc
  const [cronHour, cronMin] = cronTimeUtc.split(':').map(Number);
  const now = new Date();
  const nextRun = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), cronHour, cronMin, 0, 0)
  );
  if (nextRun <= now) {
    nextRun.setUTCDate(nextRun.getUTCDate() + 1);
  }

  return NextResponse.json({
    lastRun: latestPipelineRun,
    recentRuns: lastPipelineRuns ?? [],
    steps: stepResults,
    nextScheduledRun: nextRun.toISOString(),
    cronSchedule: `Daily at ${cronTimeUtc} UTC (06:30 IL)`,
  });
}
