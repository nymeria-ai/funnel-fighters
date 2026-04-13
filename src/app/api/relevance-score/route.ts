import { NextResponse } from 'next/server';
import { scoreRelevance } from '@/lib/selling-points/relevance';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { adSellingPoint, lpSellingPoint } = await request.json();

    if (!adSellingPoint || !lpSellingPoint) {
      return NextResponse.json({ error: 'adSellingPoint and lpSellingPoint required' }, { status: 400 });
    }

    const score = await scoreRelevance(adSellingPoint, lpSellingPoint);
    return NextResponse.json({ score });
  } catch (error) {
    console.error('Relevance score API error:', error);
    return NextResponse.json({ error: 'Failed to score relevance' }, { status: 500 });
  }
}
