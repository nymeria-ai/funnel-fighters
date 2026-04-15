import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export async function GET() {
  // Get latest score per duck type
  const rows = await query(
    `SELECT DISTINCT ON (duck_type) duck_type, score, sub_scores, measured_at
     FROM duck_scores
     ORDER BY duck_type, measured_at DESC`
  );

  // Also get the last 8 weekly scores for trend sparklines
  const trends = await query(
    `SELECT duck_type, score, measured_at
     FROM duck_scores
     ORDER BY measured_at DESC
     LIMIT 32`
  );

  // Group trends by duck_type
  const trendMap: Record<string, number[]> = {};
  if (trends) {
    for (const row of trends) {
      const dt = row.duck_type as string;
      if (!trendMap[dt]) trendMap[dt] = [];
      trendMap[dt].push(Number(row.score));
    }
    // Reverse so oldest first (for sparkline left-to-right)
    for (const dt in trendMap) {
      trendMap[dt].reverse();
    }
  }

  const scores = (rows || []).map((row) => ({
    duckType: row.duck_type,
    score: Number(row.score),
    subScores: row.sub_scores,
    measuredAt: row.measured_at,
    trend: trendMap[row.duck_type as string] || [],
  }));

  return NextResponse.json({ scores });
}
