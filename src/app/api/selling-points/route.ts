import { NextResponse } from 'next/server';
import { extractAdSellingPoint, extractLPSellingPoint, fetchLPContent } from '@/lib/selling-points/extractor';
import { clearAllCaches, getCacheStats } from '@/lib/selling-points/cache';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, headlines, descriptions, url } = body;

    if (type === 'ad') {
      if (!headlines || !descriptions) {
        return NextResponse.json({ error: 'headlines and descriptions required for ad type' }, { status: 400 });
      }
      const sellingPoint = await extractAdSellingPoint(headlines, descriptions);
      return NextResponse.json({ sellingPoint });
    }

    if (type === 'lp') {
      if (!url) {
        return NextResponse.json({ error: 'url required for lp type' }, { status: 400 });
      }
      const content = await fetchLPContent(url);
      if (!content) {
        return NextResponse.json({ sellingPoint: '', error: 'Unable to fetch landing page' });
      }
      const sellingPoint = await extractLPSellingPoint(url, content);
      return NextResponse.json({ sellingPoint });
    }

    if (type === 'clear-cache') {
      clearAllCaches();
      return NextResponse.json({ cleared: true });
    }

    if (type === 'cache-stats') {
      return NextResponse.json(getCacheStats());
    }

    return NextResponse.json({ error: 'Invalid type. Use "ad", "lp", "clear-cache", or "cache-stats"' }, { status: 400 });
  } catch (error) {
    console.error('Selling points API error:', error);
    return NextResponse.json({ error: 'Failed to extract selling point' }, { status: 500 });
  }
}
