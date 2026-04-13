import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import {
  gscPositionToScore,
  ahrefsURToScore,
  computeCompositeScore,
} from '@/lib/ranking/config';
import { getCached, setCached } from '@/lib/ranking/cache';
import { fetchAhrefsURLRatings } from '@/lib/ranking/ahrefs-mcp';
import type { PageRankResult } from '@/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GSC_SITE_URL = process.env.GSC_SITE_URL || 'sc-domain:monday.com';

interface GSCRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  position?: number;
}

function getGSCClient(): OAuth2Client {
  const oauth2 = new OAuth2Client(
    process.env.GSC_CLIENT_ID,
    process.env.GSC_CLIENT_SECRET,
    'urn:ietf:wg:oauth:2.0:oob'
  );
  oauth2.setCredentials({
    refresh_token: process.env.GSC_REFRESH_TOKEN,
  });
  return oauth2;
}

async function fetchGSCPosition(url: string): Promise<{ position: number; impressions: number } | null> {
  try {
    const auth = getGSCClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_SITE_URL,
      requestBody: {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        dimensions: ['page'],
        dimensionFilterGroups: [{
          filters: [{
            dimension: 'page',
            operator: 'equals',
            expression: url,
          }],
        }],
        rowLimit: 1,
      },
    });

    const rows = (res.data.rows || []) as GSCRow[];
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      position: row.position ?? 0,
      impressions: row.impressions ?? 0,
    };
  } catch (err) {
    console.error(`GSC error for ${url}:`, err);
    return null;
  }
}

// Ahrefs URL Rating is now fetched via MCP batch call (fetchAhrefsURLRatings)

async function fetchAndScoreBatch(urls: string[]): Promise<PageRankResult[]> {
  // Fetch GSC data per URL + Ahrefs batch in parallel
  const [gscResults, ahrefsRatings] = await Promise.all([
    Promise.all(urls.map(fetchGSCPosition)),
    fetchAhrefsURLRatings(urls),
  ]);

  return urls.map((url, i) => {
    const gscData = gscResults[i];
    const ahrefsUR = ahrefsRatings.get(url) ?? null;
    const gscScore = gscData ? gscPositionToScore(gscData.position) : null;
    const ahrefsScore = ahrefsUR != null ? ahrefsURToScore(ahrefsUR) : null;
    const compositeScore = computeCompositeScore({ gscScore, ahrefsScore });

    return {
      url,
      gscPosition: gscData?.position ?? null,
      gscImpressions: gscData?.impressions ?? null,
      gscScore,
      ahrefsUR,
      ahrefsScore,
      compositeScore,
    };
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];
    const forceRefresh: boolean = body.forceRefresh || false;

    if (urls.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Split into cached vs needs-fetch
    const results: PageRankResult[] = [];
    const toFetch: string[] = [];

    for (const url of urls) {
      if (!forceRefresh) {
        const cached = getCached(url);
        if (cached) {
          results.push(cached);
          continue;
        }
      }
      toFetch.push(url);
    }

    // Fetch uncached URLs in batch (GSC per-URL + Ahrefs single batch call)
    if (toFetch.length > 0) {
      const batchResults = await fetchAndScoreBatch(toFetch);
      for (const result of batchResults) {
        setCached(result.url, result);
        results.push(result);
      }
    }

    return NextResponse.json({
      results,
      meta: {
        total: urls.length,
        cached: urls.length - toFetch.length,
        fetched: toFetch.length,
      },
    });
  } catch (error) {
    console.error('Error in page-rank API:', error);
    return NextResponse.json({ error: 'Failed to fetch page rank data' }, { status: 500 });
  }
}
