import { NextResponse } from 'next/server';
import { getAccounts, getCampaigns, getAdsWithUrls, type CampaignRow, type AdRow } from '@/lib/google-ads/queries';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get('accountId');
    const level = searchParams.get('level') || 'accounts'; // accounts | campaigns | ads

    // Level 1: Get all accounts with aggregate campaign data
    if (level === 'accounts') {
      const accounts = await getAccounts();
      const nonManager = accounts.filter(a => !a.isManager);

      // Fetch campaigns for top accounts in parallel
      const topAccounts = nonManager.filter(a =>
        ['Main', 'Verticals', 'Verticals2', 'Locals', 'AW mobile', 'agent factory', 'Canvas by monday.com', 'monday.com brand', 'monday.com CRM - Product Growth', 'harp AI'].includes(a.name)
      );

      const allCampaigns: CampaignRow[] = [];
      const results = await Promise.allSettled(
        topAccounts.map(a => getCampaigns(a.id, a.name))
      );

      for (const r of results) {
        if (r.status === 'fulfilled') {
          allCampaigns.push(...r.value);
        }
      }

      // Aggregate by account
      const accountData = topAccounts.map(a => {
        const camps = allCampaigns.filter(c => c.accountId === a.id);
        const totalSpend = camps.reduce((s, c) => s + c.cost, 0);
        const totalClicks = camps.reduce((s, c) => s + c.clicks, 0);
        const totalImpressions = camps.reduce((s, c) => s + c.impressions, 0);
        const totalConversions = camps.reduce((s, c) => s + c.conversions, 0);
        return {
          id: a.id,
          name: a.name,
          campaignCount: camps.length,
          spend: totalSpend / 1_000_000,
          clicks: totalClicks,
          impressions: totalImpressions,
          conversions: totalConversions,
          ctr: totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0,
          cpa: totalConversions > 0 ? (totalSpend / 1_000_000) / totalConversions : 0,
        };
      }).sort((a, b) => b.spend - a.spend);

      return NextResponse.json({ accounts: accountData });
    }

    // Level 2: Get campaigns for a specific account
    if (level === 'campaigns' && accountId) {
      const accounts = await getAccounts();
      const account = accounts.find(a => a.id === accountId);
      const campaigns = await getCampaigns(accountId, account?.name || accountId);
      return NextResponse.json({
        campaigns: campaigns.map(c => ({
          ...c,
          spend: c.cost,
          cpa: c.conversions > 0 ? c.cost / c.conversions : 0,
        }))
      });
    }

    // Level 3: Get ads for a specific account
    if (level === 'ads' && accountId) {
      const ads = await getAdsWithUrls(accountId);
      return NextResponse.json({
        ads: ads.map(a => ({
          ...a,
          spend: a.cost,
        }))
      });
    }

    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  } catch (error) {
    console.error('Error fetching ads data:', error);
    return NextResponse.json({ error: 'Failed to fetch ads data' }, { status: 500 });
  }
}
