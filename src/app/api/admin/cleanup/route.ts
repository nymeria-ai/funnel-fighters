import { NextRequest, NextResponse } from 'next/server';
import { query, queryOrThrow } from '@/lib/db/client';

const ADMIN_SECRET = process.env.ADMIN_SYNC_SECRET;

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!ADMIN_SECRET || auth !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, confirm } = body;

    if (confirm !== 'yes-prune-data') {
      return NextResponse.json({ error: 'Must pass confirm: "yes-prune-data"' }, { status: 400 });
    }

    const results: Record<string, unknown> = {};

    if (action === 'stats') {
      // Just show table sizes
      const tables = ['accounts', 'campaigns', 'ad_groups', 'ads', 'ad_metrics_daily', 'ad_extension', 'sync_runs', 'landing_page_extension', 'product_campaign_funnel', 'product_funnel_metrics', 'lp_funnel_metrics'];
      for (const t of tables) {
        try {
          const r = await queryOrThrow<{ count: string }>(`SELECT COUNT(*) as count FROM ${t}`);
          results[t] = Number(r[0]?.count ?? 0);
        } catch {
          results[t] = 'error';
        }
      }
      // DB size
      try {
        const sz = await queryOrThrow<{ size: string }>(`SELECT pg_size_pretty(pg_database_size(current_database())) as size`);
        results['db_size'] = sz[0]?.size;
      } catch {
        results['db_size'] = 'unknown';
      }
      return NextResponse.json({ action: 'stats', results });
    }

    if (action === 'prune-sync-runs') {
      // Keep only last 100 sync runs
      const r = await queryOrThrow(`DELETE FROM sync_runs WHERE id NOT IN (SELECT id FROM sync_runs ORDER BY id DESC LIMIT 100)`);
      results['sync_runs_deleted'] = 'done';
      return NextResponse.json({ action, results });
    }

    if (action === 'prune-old-metrics') {
      // Delete ad_metrics_daily older than N days (default 45)
      const days = body.days ?? 45;
      await queryOrThrow(`DELETE FROM ad_metrics_daily WHERE date < CURRENT_DATE - INTERVAL '${Number(days)} days'`);
      results['ad_metrics_pruned'] = `older than ${days} days`;
      return NextResponse.json({ action, results });
    }

    if (action === 'prune-orphan-extensions') {
      // Delete ad_extension rows where ad_id not in current ads
      await queryOrThrow(`DELETE FROM ad_extension WHERE ad_id NOT IN (SELECT id FROM ads)`);
      results['orphan_extensions'] = 'done';
      return NextResponse.json({ action, results });
    }

    if (action === 'vacuum') {
      // VACUUM to reclaim space (may not work on Neon free tier but worth trying)
      try {
        await queryOrThrow(`VACUUM`);
        results['vacuum'] = 'done';
      } catch (err) {
        results['vacuum'] = `failed: ${err instanceof Error ? err.message : String(err)}`;
      }
      return NextResponse.json({ action, results });
    }

    if (action === 'prune-all') {
      // Nuclear option: prune sync_runs + old metrics + orphan extensions
      const steps: string[] = [];
      
      try {
        await queryOrThrow(`DELETE FROM sync_runs WHERE id NOT IN (SELECT id FROM sync_runs ORDER BY id DESC LIMIT 100)`);
        steps.push('sync_runs pruned to last 100');
      } catch (e) { steps.push(`sync_runs: ${e instanceof Error ? e.message : String(e)}`); }

      const days = body.days ?? 45;
      try {
        await queryOrThrow(`DELETE FROM ad_metrics_daily WHERE date < CURRENT_DATE - INTERVAL '${Number(days)} days'`);
        steps.push(`ad_metrics_daily pruned (>${days} days old)`);
      } catch (e) { steps.push(`ad_metrics: ${e instanceof Error ? e.message : String(e)}`); }

      try {
        await queryOrThrow(`DELETE FROM ad_extension WHERE ad_id NOT IN (SELECT id FROM ads)`);
        steps.push('orphan ad_extensions pruned');
      } catch (e) { steps.push(`ad_extension: ${e instanceof Error ? e.message : String(e)}`); }

      return NextResponse.json({ action: 'prune-all', steps });
    }

    if (action === 'truncate-table') {
      const table = body.table;
      const allowed = ['ad_extension', 'sync_runs', 'lp_funnel_metrics', 'product_funnel_metrics', 'product_campaign_funnel'];
      if (!table || !allowed.includes(table)) {
        return NextResponse.json({ error: `Table must be one of: ${allowed.join(', ')}` }, { status: 400 });
      }
      await queryOrThrow(`TRUNCATE TABLE ${table}`);
      return NextResponse.json({ action: 'truncate-table', table, result: 'truncated' });
    }

    return NextResponse.json({ error: `Unknown action: ${action}`, available: ['stats', 'prune-sync-runs', 'prune-old-metrics', 'prune-orphan-extensions', 'vacuum', 'prune-all', 'truncate-table'] }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
