import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import {
  gscPositionToScore,
  ahrefsURToScore,
  computeCompositeScore,
} from '@/lib/ranking/config';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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
      siteUrl: 'sc-domain:monday.com',
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

async function fetchAhrefsUR(url: string): Promise<number | null> {
  try {
    const apiKey = process.env.AHREFS_API_KEY;
    if (!apiKey) return null;

    const params = new URLSearchParams({
      target: url,
      output: 'json',
    });

    const res = await fetch(
      `https://api.ahrefs.com/v3/site-explorer/url-rating?${params}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.error(`Ahrefs error for ${url}: ${res.status} ${await res.text()}`);
      return null;
    }

    const data = await res.json();
    return data.url_rating ?? null;
  } catch (err) {
    console.error(`Ahrefs error for ${url}:`, err);
    return null;
  }
}

export interface PageRankResult {
  url: string;
  gscPosition: number | null;
  gscImpressions: number | null;
  gscScore: number | null;
  ahrefsUR: number | null;
  ahrefsScore: number | null;
  compositeScore: number | null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls || [];

    if (urls.length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Fetch data for all URLs in parallel
    const results: PageRankResult[] = await Promise.all(
      urls.map(async (url): Promise<PageRankResult> => {
        const [gscData, ahrefsUR] = await Promise.all([
          fetchGSCPosition(url),
          fetchAhrefsUR(url),
        ]);

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
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in page-rank API:', error);
    return NextResponse.json({ error: 'Failed to fetch page rank data' }, { status: 500 });
  }
}
