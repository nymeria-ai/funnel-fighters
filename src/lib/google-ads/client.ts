/**
 * Google Ads API client — READ ONLY.
 * Uses server-side environment variables.
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const ADS_BASE = 'https://googleads.googleapis.com/v23';

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60000) {
    return tokenCache.accessToken;
  }

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });

  const data = await res.json();
  tokenCache = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return data.access_token;
}

export async function queryGoogleAds(
  customerId: string,
  query: string,
  loginCustomerId?: string
): Promise<Record<string, unknown>[]> {
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
    'Content-Type': 'application/json',
  };
  if (loginCustomerId) {
    headers['login-customer-id'] = loginCustomerId;
  }

  const res = await fetch(
    `${ADS_BASE}/customers/${customerId}/googleAds:searchStream`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    }
  );

  const data = await res.json();
  if (data.error) {
    console.error('Google Ads API error:', JSON.stringify(data.error));
    return [];
  }

  // searchStream returns array of batches
  const results: Record<string, unknown>[] = [];
  for (const batch of data) {
    if (batch.results) {
      results.push(...batch.results);
    }
  }
  return results;
}

export const MCC_ID = process.env.GOOGLE_ADS_MCC_ID || '7645779471';
