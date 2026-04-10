import { NextResponse } from 'next/server';
import { getAdsWithUrls, extractLandingPages } from '@/lib/google-ads/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Primary accounts to scan for landing pages
const ACCOUNTS_TO_SCAN = [
  '3746504118', // Main
  '6629846296', // Verticals
  '9194503735', // Verticals2
  '9441310809', // Locals
  '2807461091', // agent factory
  '6073520942', // monday.com brand
];

export async function GET() {
  try {
    const allAds = [];
    const results = await Promise.allSettled(
      ACCOUNTS_TO_SCAN.map(id => getAdsWithUrls(id))
    );

    for (const r of results) {
      if (r.status === 'fulfilled') {
        allAds.push(...r.value);
      }
    }

    const landingPages = extractLandingPages(allAds);

    return NextResponse.json({ landingPages });
  } catch (error) {
    console.error('Error fetching landing pages:', error);
    return NextResponse.json({ error: 'Failed to fetch landing pages' }, { status: 500 });
  }
}
