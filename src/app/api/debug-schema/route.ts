import { NextResponse } from 'next/server';
import { query } from '@/lib/db/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const tables = ['ads', 'campaigns', 'ad_groups', 'ad_metrics_daily'];
  const result: Record<string, unknown> = {};
  
  for (const table of tables) {
    const cols = await query<{ column_name: string; data_type: string }>(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position`,
      [table]
    );
    
    const count = await query<{ count: string }>(`SELECT COUNT(*) as count FROM ${table}`);
    
    const sample = await query<Record<string, unknown>>(`SELECT * FROM ${table} LIMIT 1`);
    
    result[table] = {
      columns: cols?.map(c => `${c.column_name} (${c.data_type})`) || [],
      rows: count ? parseInt(count[0]?.count || '0') : 0,
      sample: sample?.[0] || null,
    };
  }
  
  // Test the exact join query
  const testJoin = await query<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM ad_metrics_daily amd JOIN ads a ON amd.ad_id = a.id`
  );
  result['join_test_ad_id_to_id'] = testJoin?.[0]?.cnt || 'FAILED';
  
  const testJoin2 = await query<{ cnt: string }>(
    `SELECT COUNT(*) as cnt FROM ads a JOIN campaigns c ON a.campaign_id = c.id`
  );
  result['join_test_campaign_id_to_id'] = testJoin2?.[0]?.cnt || 'FAILED';
  
  return NextResponse.json(result);
}
