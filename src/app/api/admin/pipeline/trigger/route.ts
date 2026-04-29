/**
 * POST /api/admin/pipeline/trigger
 *
 * Kicks off the daily sync pipeline. Orchestrates 5 steps in sequence.
 * If ANY step fails, the pipeline stops immediately and reports the failure.
 *
 * Body: { channel: "google" | "meta" | "all", date?: string }
 * Auth: Bearer ADMIN_SYNC_SECRET
 */

import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { query } from '@/lib/db/client';
import { computeSellingPointsForNewAds } from '@/lib/pipeline/selling-points';
import { discoverAndProcessNewLandingPages } from '@/lib/pipeline/landing-pages';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET;

function verifyAuth(req: NextRequest): boolean {
  if (!SYNC_SECRET) return false;
  const auth = req.headers.get('authorization');
  if (!auth) return false;
  const token = auth.replace(/^Bearer\s+/i, '');
  if (token.length !== SYNC_SECRET.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(SYNC_SECRET));
}

interface TriggerBody {
  channel: 'google' | 'meta' | 'all';
  date?: string;
}

interface StepResult {
  step: string;
  status: 'ok' | 'skipped' | 'pending' | 'error';
  result?: unknown;
  error?: string;
}

async function logSyncRun(
  syncType: string,
  status: 'running' | 'completed' | 'failed',
  rowsProcessed?: number,
  errorMessage?: string
): Promise<number | null> {
  if (status === 'running') {
    const rows = await query<{ id: number }>(
      `INSERT INTO sync_runs (sync_type, status, started_at)
       VALUES ($1, 'running', NOW())
       RETURNING id`,
      [syncType]
    );
    return rows?.[0]?.id ?? null;
  }

  await query(
    `INSERT INTO sync_runs (sync_type, status, completed_at, rows_processed, error_message)
     VALUES ($1, $2, NOW(), $3, $4)`,
    [syncType, status, rowsProcessed ?? 0, errorMessage ?? null]
  );
  return null;
}

async function runStep1SyncAds(channel: string, date?: string): Promise<{ rowsSynced: number }> {
  // Step 1: Sync ads data for the channel.
  // In production this would call the Google Ads / Meta Ads API and push rows through
  // /api/admin/sync-ads internally. For now we verify the channel is valid and
  // report how many ads are currently in the DB for that channel (sync already happened
  // via the external cron calling sync-ads directly before triggering the pipeline).
  const channelFilter = channel === 'all' ? '' : `WHERE channel = $1`;
  const params = channel === 'all' ? [] : [channel];

  const result = await query<{ count: string }>(
    `SELECT COUNT(*) AS count FROM ads ${channelFilter}`,
    params
  );
  const count = parseInt(result?.[0]?.count ?? '0', 10);
  return { rowsSynced: count };
}

export async function POST(req: NextRequest) {
  if (!verifyAuth(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: TriggerBody;
  try {
    body = (await req.json()) as TriggerBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { channel, date } = body;
  if (!channel || !['google', 'meta', 'all'].includes(channel)) {
    return NextResponse.json({ error: 'channel must be "google", "meta", or "all"' }, { status: 400 });
  }

  const channelArg = channel === 'all' ? undefined : channel;
  const steps: StepResult[] = [];

  // Log pipeline start
  await logSyncRun(`pipeline:${channel}`, 'running');

  // ──────────────────────────────────────────────────────────────────────────
  // Step 1: Sync ads data
  // ──────────────────────────────────────────────────────────────────────────
  const step1RunId = await logSyncRun('pipeline:step1:sync-ads', 'running');
  try {
    const result = await runStep1SyncAds(channel, date);
    await logSyncRun('pipeline:step1:sync-ads', 'completed', result.rowsSynced);
    steps.push({ step: 'step1:sync-ads', status: 'ok', result });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    await logSyncRun('pipeline:step1:sync-ads', 'failed', 0, errorMsg);
    await logSyncRun(`pipeline:${channel}`, 'failed', 0, `step1:sync-ads failed: ${errorMsg}`);
    console.error('[pipeline] Step 1 failed:', errorMsg);
    return NextResponse.json({ success: false, failedStep: 'step1:sync-ads', error: errorMsg, steps });
  }
  void step1RunId; // referenced to avoid unused-var lint

  // ──────────────────────────────────────────────────────────────────────────
  // Step 2: Compute selling points for new/changed ads
  // ──────────────────────────────────────────────────────────────────────────
  await logSyncRun('pipeline:step2:selling-points', 'running');
  try {
    const count = await computeSellingPointsForNewAds(channelArg);
    await logSyncRun('pipeline:step2:selling-points', 'completed', count);
    steps.push({ step: 'step2:selling-points', status: 'ok', result: { adsProcessed: count } });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    await logSyncRun('pipeline:step2:selling-points', 'failed', 0, errorMsg);
    await logSyncRun(`pipeline:${channel}`, 'failed', 0, `step2:selling-points failed: ${errorMsg}`);
    console.error('[pipeline] Step 2 failed:', errorMsg);
    return NextResponse.json({ success: false, failedStep: 'step2:selling-points', error: errorMsg, steps });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Step 3: Discover new landing pages + compute LP selling points + relevance
  // ──────────────────────────────────────────────────────────────────────────
  await logSyncRun('pipeline:step3:landing-pages', 'running');
  try {
    const count = await discoverAndProcessNewLandingPages(channelArg);
    await logSyncRun('pipeline:step3:landing-pages', 'completed', count);
    steps.push({ step: 'step3:landing-pages', status: 'ok', result: { lpsProcessed: count } });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    await logSyncRun('pipeline:step3:landing-pages', 'failed', 0, errorMsg);
    await logSyncRun(`pipeline:${channel}`, 'failed', 0, `step3:landing-pages failed: ${errorMsg}`);
    console.error('[pipeline] Step 3 failed:', errorMsg);
    return NextResponse.json({ success: false, failedStep: 'step3:landing-pages', error: errorMsg, steps });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Step 4: BigBrain sync (placeholder — Phase 2)
  // ──────────────────────────────────────────────────────────────────────────
  await logSyncRun('pipeline:step4:bigbrain', 'completed', 0);
  steps.push({
    step: 'step4:bigbrain',
    status: 'skipped',
    result: { status: 'skipped', reason: 'phase2' },
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Step 5: Generate insights/recommendations (placeholder — needs LLM integration)
  // ──────────────────────────────────────────────────────────────────────────
  await logSyncRun('pipeline:step5:insights', 'completed', 0);
  steps.push({
    step: 'step5:insights',
    status: 'pending',
    result: { status: 'pending', reason: 'needs LLM integration' },
  });

  // Log pipeline completion
  await logSyncRun(`pipeline:${channel}`, 'completed', steps.length);

  return NextResponse.json({ success: true, channel, date: date ?? null, steps });
}
