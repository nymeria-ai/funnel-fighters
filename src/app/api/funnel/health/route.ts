import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Funnel Health API — aggregates all duck scores + key funnel metrics
 * into a single lightweight response for the overview dashboard.
 * Falls back to static data files when DB is not configured.
 */
export async function GET() {
  // Try DB first
  const dbScores = await query<{ duck_type: string; score: string; sub_scores: unknown; measured_at: string }>(
    `SELECT DISTINCT ON (duck_type) duck_type, score, sub_scores, measured_at
     FROM duck_scores ORDER BY duck_type, measured_at DESC`
  );

  const dbCohorts = await query<{ total_signups: string; total_payers: string; total_acv: string; weeks: string }>(
    `SELECT SUM(hard_signups) AS total_signups, SUM(payers_28d) AS total_payers,
            ROUND(SUM(acv_28d)::numeric, 2) AS total_acv, COUNT(*) AS weeks
     FROM funnel_weekly`
  );

  if (dbScores && dbScores.length > 0) {
    const scores = Object.fromEntries(dbScores.map(s => [s.duck_type, {
      score: Number(s.score),
      subScores: s.sub_scores,
      measuredAt: s.measured_at,
    }]));

    const funnel = dbCohorts?.[0] || { total_signups: '0', total_payers: '0', total_acv: '0', weeks: '0' };
    const overallScore = Math.round(
      Math.pow(
        Object.values(scores).reduce((acc, s) => acc * s.score, 1),
        1 / Math.max(1, Object.keys(scores).length)
      )
    );

    return NextResponse.json({
      overallScore,
      ducks: scores,
      funnel: {
        totalSignups: Number(funnel.total_signups),
        totalPayers: Number(funnel.total_payers),
        totalAcv: Number(funnel.total_acv),
        weeks: Number(funnel.weeks),
        payerRate: Number(funnel.total_signups) > 0
          ? (Number(funnel.total_payers) / Number(funnel.total_signups) * 100)
          : 0,
      },
      source: 'database',
    });
  }

  // Fallback to static files
  const scoresPath = join(process.cwd(), 'data', 'duck_scores.json');
  const cohortsPath = join(process.cwd(), 'data', 'weekly_cohorts.json');

  if (!existsSync(scoresPath)) {
    return NextResponse.json({ overallScore: null, ducks: {}, funnel: null, source: 'none' });
  }

  const scoresData = JSON.parse(readFileSync(scoresPath, 'utf-8'));
  const latestScores: Record<string, any> = {};
  for (const row of scoresData.rows) {
    if (!latestScores[row.duck_type] || row.measured_at > latestScores[row.duck_type].measured_at) {
      latestScores[row.duck_type] = { score: row.score, subScores: row.sub_scores, measuredAt: row.measured_at };
    }
  }

  let funnelData = null;
  if (existsSync(cohortsPath)) {
    const cohorts = JSON.parse(readFileSync(cohortsPath, 'utf-8'));
    const totalSignups = cohorts.rows.reduce((s: number, r: any) => s + r.hard_signups, 0);
    const totalPayers = cohorts.rows.reduce((s: number, r: any) => s + r.payers_28d, 0);
    const totalAcv = cohorts.rows.reduce((s: number, r: any) => s + r.acv_28d, 0);
    funnelData = {
      totalSignups,
      totalPayers,
      totalAcv,
      weeks: cohorts.rows.length,
      payerRate: totalSignups > 0 ? (totalPayers / totalSignups * 100) : 0,
    };
  }

  const scoreValues = Object.values(latestScores).map((s: any) => s.score);
  const overallScore = scoreValues.length > 0
    ? Math.round(Math.pow(scoreValues.reduce((a: number, b: number) => a * b, 1), 1 / scoreValues.length))
    : null;

  return NextResponse.json({
    overallScore,
    ducks: latestScores,
    funnel: funnelData,
    source: 'static',
  });
}
