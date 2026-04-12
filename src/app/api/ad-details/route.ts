import { NextResponse } from 'next/server';
import { getKeywords, getAdCopy, getAudienceTargeting, getSearchTerms } from '@/lib/google-ads/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const adGroupId = searchParams.get('adGroupId') || undefined;
    const campaignId = searchParams.get('campaignId') || undefined;

    if (!accountId) {
      return NextResponse.json({ error: 'accountId is required' }, { status: 400 });
    }

    // Fetch all data in parallel
    const [keywords, adCopy, audience, searchTerms] = await Promise.all([
      getKeywords(accountId, adGroupId).catch(() => []),
      getAdCopy(accountId, adGroupId).catch(() => []),
      getAudienceTargeting(accountId, campaignId).catch(() => []),
      getSearchTerms(accountId, adGroupId).catch(() => []),
    ]);

    return NextResponse.json({
      keywords: keywords.map(k => ({
        ...k,
        spend: k.costMicros / 1_000_000,
      })),
      adCopy,
      audience,
      searchTerms: searchTerms.map(s => ({
        ...s,
        spend: s.costMicros / 1_000_000,
      })),
    });
  } catch (error) {
    console.error('Error fetching ad details:', error);
    return NextResponse.json({ error: 'Failed to fetch ad details' }, { status: 500 });
  }
}
