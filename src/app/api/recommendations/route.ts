import { NextResponse } from 'next/server';
import type { CockpitRow, Recommendation } from '@/types';

export const dynamic = 'force-dynamic';

// In-memory store (persists across requests within the same server instance)
const recommendationStore = new Map<string, Recommendation>();
let lastGenerated = 0;

function generateId(): string {
  return `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function analyzeAds(rows: CockpitRow[]): Recommendation[] {
  const recs: Recommendation[] = [];
  const now = new Date().toISOString();

  // Compute averages for comparison
  const adsWithSpend = rows.filter(r => r.spend > 0);
  const avgCPA = adsWithSpend.filter(r => r.conversions > 0).length > 0
    ? adsWithSpend.reduce((s, r) => s + r.spend, 0) / adsWithSpend.reduce((s, r) => s + r.conversions, 0)
    : 0;
  const avgCTR = adsWithSpend.length > 0
    ? adsWithSpend.reduce((s, r) => s + (r.impressions > 0 ? r.clicks / r.impressions : 0), 0) / adsWithSpend.length
    : 0;

  for (const row of rows) {
    const headline = row.headlines[0] || `Ad ${row.adId}`;
    const shortUrl = row.finalUrl ? row.finalUrl.replace(/https?:\/\//, '').slice(0, 60) : '';

    // --- Ad Copy issues ---
    if (row.relevanceScore > 0 && row.relevanceScore < 50) {
      recs.push({
        id: generateId(),
        priority: row.relevanceScore < 25 ? 'P0' : 'P1',
        type: 'Ad Copy',
        description: `Rewrite ad copy for "${headline}" — current relevance to LP is only ${row.relevanceScore}%`,
        reasoning: `This ad's selling point is poorly aligned with the landing page content. ${row.relevanceReason || 'The messaging doesn\'t match what the user sees after clicking.'}. Improving alignment typically increases conversion rates by 20-40%.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Review the ad's selling point: "${row.adSellingPoint || 'N/A'}"\n2. Review the LP's selling point: "${row.lpSellingPoint || 'N/A'}"\n3. Rewrite ad headlines to match LP messaging\n4. Consider creating a dedicated LP for this ad's angle`,
        relatedAdId: row.adId,
        relatedUrl: row.finalUrl,
      });
    }

    if ((row.headlines.length > 0 || row.descriptions.length > 0) && !row.adSellingPoint) {
      recs.push({
        id: generateId(),
        priority: 'P2',
        type: 'Ad Copy',
        description: `Review ad "${headline}" — unable to extract value proposition`,
        reasoning: `The system couldn't identify a clear selling point from this ad's copy. This usually means the ad lacks a specific, compelling value proposition that differentiates it from competitors.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Review current headlines: ${row.headlines.join(', ')}\n2. Ensure at least one headline contains a clear benefit or USP\n3. Add specific numbers, outcomes, or differentiators`,
        relatedAdId: row.adId,
      });
    }

    // --- Budget issues ---
    if (row.spend > 100 && row.conversions === 0) {
      recs.push({
        id: generateId(),
        priority: row.spend > 500 ? 'P0' : 'P1',
        type: 'Budget',
        description: `Pause or restructure "${headline}" — spent $${Math.round(row.spend)} with zero conversions`,
        reasoning: `This ad has consumed $${Math.round(row.spend)} in budget over the last 30 days without generating any conversions. The spend-to-conversion ratio suggests either targeting, ad copy, or landing page issues. Reallocating this budget to better-performing ads could improve overall ROAS.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Check if conversion tracking is set up correctly for this campaign\n2. Review search terms triggering this ad\n3. Consider pausing and reallocating budget to top performers\n4. If keeping, test new ad copy or audience targeting`,
        relatedAdId: row.adId,
        relatedUrl: row.finalUrl,
      });
    }

    if (row.conversions > 0 && avgCPA > 0) {
      const adCPA = row.spend / row.conversions;
      if (adCPA > avgCPA * 2) {
        recs.push({
          id: generateId(),
          priority: 'P1',
          type: 'Budget',
          description: `Review targeting for "${headline}" — CPA is $${Math.round(adCPA)} vs avg $${Math.round(avgCPA)}`,
          reasoning: `This ad's cost per acquisition ($${Math.round(adCPA)}) is more than double the account average ($${Math.round(avgCPA)}). While the ad is converting, the efficiency is significantly below average. Refining targeting or adjusting bids could bring CPA in line.`,
          timestamp: now,
          status: 'active',
          actionType: 'manual',
          actionDetails: `1. Review audience targeting and exclude underperforming segments\n2. Check search term report for irrelevant queries\n3. Consider lowering bids or switching bid strategy\n4. Test different ad copy emphasizing stronger CTAs`,
          relatedAdId: row.adId,
        });
      }
    }

    const ctr = row.impressions > 0 ? row.clicks / row.impressions : 0;
    if (ctr > avgCTR * 1.5 && row.spend < 50 && row.impressions > 100) {
      recs.push({
        id: generateId(),
        priority: 'P2',
        type: 'Budget',
        description: `Increase budget for "${headline}" — CTR is ${(ctr * 100).toFixed(1)}% (above avg) but limited by budget`,
        reasoning: `This ad has a CTR of ${(ctr * 100).toFixed(1)}% which is ${((ctr / avgCTR - 1) * 100).toFixed(0)}% above average, indicating strong ad relevance. However, low spend ($${Math.round(row.spend)}) suggests budget constraints are limiting its reach. Increasing budget could capture more high-intent clicks.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Increase daily budget for this campaign/ad group\n2. Monitor CPA after scaling — ensure it stays within targets\n3. Consider promoting this ad to its own campaign with dedicated budget`,
        relatedAdId: row.adId,
      });
    }

    // --- Alignment issues ---
    if (row.adSellingPoint && row.lpSellingPoint && row.relevanceScore > 0 && row.relevanceScore < 40) {
      const adFocus = row.adSellingPoint.slice(0, 60);
      const lpFocus = row.lpSellingPoint.slice(0, 60);
      if (adFocus !== lpFocus) {
        recs.push({
          id: generateId(),
          priority: row.relevanceScore < 20 ? 'P0' : 'P1',
          type: 'Alignment',
          description: `Ad promotes "${adFocus}..." but LP focuses on "${lpFocus}..." — align messaging`,
          reasoning: `There's a significant disconnect between what the ad promises and what the landing page delivers. The relevance score is only ${row.relevanceScore}%. This mismatch typically leads to high bounce rates and wasted ad spend as users don't find what they expected.`,
          timestamp: now,
          status: 'active',
          actionType: 'manual',
          actionDetails: `1. Option A: Update ad copy to match LP messaging\n2. Option B: Create a new LP that matches this ad's angle\n3. Option C: Add a section to the existing LP addressing "${adFocus}"\n4. Verify the CTA on the LP matches the ad's promise`,
          relatedAdId: row.adId,
          relatedUrl: row.finalUrl,
        });
      }
    }

    // --- Landing Page issues ---
    if (row.lpError && row.finalUrl) {
      recs.push({
        id: generateId(),
        priority: 'P1',
        type: 'Landing Page',
        description: `Fix landing page at ${shortUrl} — content could not be fetched`,
        reasoning: `The system was unable to fetch content from this landing page. This could mean the page is down, returns errors, or blocks automated access. If it's down, all ads pointing to it are wasting budget.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Manually visit ${row.finalUrl} and verify it loads correctly\n2. Check for 404, 500, or redirect issues\n3. If page is down, pause related ads immediately\n4. If page blocks bots, ensure Google can still crawl it`,
        relatedUrl: row.finalUrl,
      });
    }
  }

  // --- LP-level analysis (aggregate) ---
  const lpGroups = new Map<string, CockpitRow[]>();
  for (const row of rows) {
    if (!row.finalUrl) continue;
    if (!lpGroups.has(row.finalUrl)) lpGroups.set(row.finalUrl, []);
    lpGroups.get(row.finalUrl)!.push(row);
  }

  for (const [url, ads] of lpGroups) {
    const lowRelevanceAds = ads.filter(a => a.relevanceScore > 0 && a.relevanceScore < 50);
    if (lowRelevanceAds.length >= 3) {
      const shortUrl = url.replace(/https?:\/\//, '').slice(0, 60);
      recs.push({
        id: generateId(),
        priority: 'P1',
        type: 'Landing Page',
        description: `Landing page "${shortUrl}" misaligned with ${lowRelevanceAds.length} ads — consider dedicated LPs`,
        reasoning: `${lowRelevanceAds.length} ads pointing to this landing page have relevance scores below 50%. This suggests the LP is too generic or doesn't address the specific angles these ads are promoting. Creating dedicated landing pages for each ad angle typically improves conversion rates.`,
        timestamp: now,
        status: 'active',
        actionType: 'manual',
        actionDetails: `1. Group the ${lowRelevanceAds.length} low-relevance ads by theme\n2. Create variant LPs for each theme\n3. Use dynamic text replacement if possible\n4. A/B test new LPs against the current one`,
        relatedUrl: url,
      });
    }
  }

  return recs;
}

// Deduplicate by description similarity to avoid near-identical recs
function deduplicate(recs: Recommendation[]): Recommendation[] {
  const seen = new Set<string>();
  return recs.filter(r => {
    // Create a normalized key from type + related ad/url
    const key = `${r.type}:${r.relatedAdId || ''}:${r.relatedUrl || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function GET() {
  try {
    const CACHE_TTL = 5 * 60 * 1000; // 5 min
    const now = Date.now();

    // Return cached if fresh
    if (recommendationStore.size > 0 && (now - lastGenerated) < CACHE_TTL) {
      const all = Array.from(recommendationStore.values());
      return NextResponse.json({ recommendations: all, cached: true });
    }

    // Fetch cockpit data (without heavy LLM analysis to be fast, use cached data)
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const cockpitRes = await fetch(`${baseUrl}/api/cockpit?pageSize=200`, {
      headers: { cookie: '' },
    });

    if (!cockpitRes.ok) {
      // If cockpit fails, return whatever we have cached
      if (recommendationStore.size > 0) {
        return NextResponse.json({
          recommendations: Array.from(recommendationStore.values()),
          cached: true,
          warning: 'Using cached recommendations — cockpit data unavailable',
        });
      }
      return NextResponse.json({ recommendations: [], error: 'Could not fetch cockpit data' });
    }

    const cockpitData = await cockpitRes.json();
    const rows: CockpitRow[] = cockpitData.rows || [];

    // Generate recommendations from real data
    let recs = analyzeAds(rows);
    recs = deduplicate(recs);

    // Sort by priority
    const priorityOrder = { P0: 0, P1: 1, P2: 2, P3: 3 };
    recs.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    // Merge with existing statuses (preserve acknowledge/dismiss state)
    const existingByDesc = new Map<string, Recommendation>();
    for (const r of recommendationStore.values()) {
      existingByDesc.set(r.description, r);
    }

    recommendationStore.clear();
    for (const rec of recs) {
      const existing = existingByDesc.get(rec.description);
      if (existing) {
        // Keep existing status and id
        rec.id = existing.id;
        rec.status = existing.status;
      }
      recommendationStore.set(rec.id, rec);
    }

    lastGenerated = now;
    return NextResponse.json({ recommendations: recs });
  } catch (error) {
    console.error('Recommendations API error:', error);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body as { id: string; action: 'acknowledge' | 'dismiss' | 'doing' };

    const rec = recommendationStore.get(id);
    if (!rec) {
      return NextResponse.json({ error: 'Recommendation not found' }, { status: 404 });
    }

    const statusMap: Record<string, Recommendation['status']> = {
      acknowledge: 'acknowledged',
      dismiss: 'dismissed',
      doing: 'doing',
    };

    rec.status = statusMap[action] || rec.status;
    recommendationStore.set(id, rec);

    return NextResponse.json({ recommendation: rec });
  } catch (error) {
    console.error('Recommendations POST error:', error);
    return NextResponse.json({ error: 'Failed to update recommendation' }, { status: 500 });
  }
}
