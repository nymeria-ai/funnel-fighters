#!/usr/bin/env node
/**
 * Pull Google Ads data using googleapis library and POST to Funnel Fighters.
 *
 * v3.0 — 2026-05-01
 * - STREAMING pagination: process and POST each page as it arrives (no memory accumulation)
 * - DAILY vs WEEKLY mode: daily skips ads metadata (already in DB), only pulls metrics
 * - Better concurrency: 4 for small accounts, 1 for mega accounts
 * - Progress logging per page for large accounts
 * - Fixed: LAST_3_DAYS is invalid — use LAST_7_DAYS for daily, LAST_30_DAYS for weekly
 */
const fs = require('fs');
const https = require('https');

const SECRETS_DIR = process.env.SECRETS_DIR || '/opt/ocana/openclaw/.secrets';
const OAUTH_FILE = `${SECRETS_DIR}/google_ads_oauth.json`;
const TOKENS_FILE = `${SECRETS_DIR}/google_ads_tokens.json`;
const FF_BASE_URL = process.env.FF_BASE_URL || 'https://funnel-fighters.vercel.app';
const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET || '';
const MCC_ID = '7645779471';

// Approved accounts — only sync these (per Ido 2026-04-30)
const APPROVED_ACCOUNTS = new Set([
  '7193445013',  // monday.com youtube (YouTube)
  '6236109472',  // monday service - youtube (YouTube)
  '3520202243',  // AW mobile (Search)
  '9441310809',  // Locals (Search)
  '3746504118',  // Main (Search)
  '6629846296',  // Verticals (Search)
  '9194503735',  // Verticals2 (Search)
  '6073520942',  // monday.com brand (Search)
  '9318044395',  // monday service - search (Search) — added 2026-04-30
]);

// Mega accounts — known to have >50K ads, process with concurrency 1
const MEGA_ACCOUNTS = new Set(['3746504118', '9441310809', '6629846296']);

// Tuning knobs
const METRICS_BATCH = Number(process.env.METRICS_BATCH) || 500;
const GAQL_TIMEOUT_MS = 120_000;  // 120s — large accounts need more time
const SYNC_TIMEOUT_MS = 60_000;   // 60s — Vercel cold starts can be slow
const GLOBAL_TIMEOUT_MS = Number(process.env.SYNC_GLOBAL_TIMEOUT_MS) || 25 * 60 * 1000; // 25 min

// Sync mode: daily (metrics only) or weekly (full refresh including ads metadata)
const SYNC_MODE = process.env.SYNC_MODE || 'daily';
// Date range — only valid Google Ads DURING values:
// TODAY, YESTERDAY, LAST_7_DAYS, LAST_14_DAYS, LAST_30_DAYS, THIS_MONTH, LAST_MONTH
const DATE_RANGE = process.env.SYNC_DATE_RANGE || (SYNC_MODE === 'weekly' ? 'LAST_30_DAYS' : 'LAST_7_DAYS');

const startTime = Date.now();

function elapsed() {
  return `${((Date.now() - startTime) / 1000).toFixed(1)}s`;
}

function loadSecrets() {
  const oauth = JSON.parse(fs.readFileSync(OAUTH_FILE, 'utf8'));
  const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf8'));
  const installed = oauth.installed || oauth;
  return {
    clientId: installed.client_id,
    clientSecret: installed.client_secret,
    refreshToken: tokens.refresh_token,
    devToken: process.env.GOOGLE_ADS_DEV_TOKEN || oauth.developer_token || ''
  };
}

async function refreshAccessToken(clientId, clientSecret, refreshToken) {
  return new Promise((resolve, reject) => {
    const postData = `client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&refresh_token=${encodeURIComponent(refreshToken)}&grant_type=refresh_token`;
    const req = https.request({
      hostname: 'oauth2.googleapis.com', port: 443, path: '/token',
      method: 'POST',
      timeout: GAQL_TIMEOUT_MS,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`Token refresh ${res.statusCode}: ${data}`));
        resolve(JSON.parse(data).access_token);
      });
    });
    req.on('timeout', () => { req.destroy(); reject(new Error('Token refresh timed out')); });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function gaqlQueryPage(accessToken, devToken, customerId, loginCustomerId, body) {
  const postData = JSON.stringify(body);
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'googleads.googleapis.com', port: 443,
      path: `/v23/customers/${customerId}/googleAds:search`,
      method: 'POST',
      timeout: GAQL_TIMEOUT_MS,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': devToken,
        'login-customer-id': loginCustomerId,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`GAQL ${res.statusCode} for ${customerId}: ${data.substring(0, 500)}`));
        resolve(JSON.parse(data));
      });
    });
    req.on('timeout', () => { req.destroy(); reject(new Error(`GAQL timeout for ${customerId}`)); });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Streaming GAQL query — processes each page via callback instead of accumulating in memory.
 * Returns total count of results processed.
 */
async function gaqlQueryStreaming(accessToken, devToken, customerId, loginCustomerId, query, processPage) {
  let pageToken = null;
  let totalResults = 0;
  let pageNum = 0;
  while (true) {
    const body = { query };
    if (pageToken) body.pageToken = pageToken;
    const data = await gaqlQueryPage(accessToken, devToken, customerId, loginCustomerId, body);
    const results = data.results || [];
    pageNum++;
    totalResults += results.length;
    if (results.length > 0) {
      await processPage(results, pageNum, totalResults);
    }
    if (!data.nextPageToken || results.length === 0) break;
    pageToken = data.nextPageToken;
  }
  return totalResults;
}

/** Legacy non-streaming — for small queries (campaigns, accounts) */
async function gaqlQuery(accessToken, devToken, customerId, loginCustomerId, query) {
  let allResults = [];
  let pageToken = null;
  while (true) {
    const body = { query };
    if (pageToken) body.pageToken = pageToken;
    const data = await gaqlQueryPage(accessToken, devToken, customerId, loginCustomerId, body);
    const results = data.results || [];
    allResults = allResults.concat(results);
    if (!data.nextPageToken || results.length === 0) break;
    pageToken = data.nextPageToken;
  }
  return { results: allResults };
}

async function postToSync(type, rows, retries = 2) {
  const postData = JSON.stringify({ type, rows });
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await new Promise((resolve, reject) => {
        const url = new URL(`${FF_BASE_URL}/api/admin/sync-ads`);
        const req = https.request({
          hostname: url.hostname, port: 443, path: url.pathname, method: 'POST',
          timeout: SYNC_TIMEOUT_MS,
          headers: { 'Authorization': `Bearer ${SYNC_SECRET}`, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
        }, res => {
          let data = '';
          res.on('data', c => data += c);
          res.on('end', () => {
            if (res.statusCode === 504 || res.statusCode === 502) return reject(new Error(`RETRY:${res.statusCode}`));
            if (res.statusCode !== 200) return reject(new Error(`Sync ${res.statusCode}: ${data}`));
            resolve(JSON.parse(data));
          });
        });
        req.on('timeout', () => { req.destroy(); reject(new Error(`RETRY:timeout`)); });
        req.on('error', reject);
        req.write(postData);
        req.end();
      });
      return result;
    } catch (err) {
      if (err.message.startsWith('RETRY:') && attempt < retries) {
        console.log(`[google-ads] Sync retry (${attempt + 1}/${retries}): ${err.message}`);
        await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
}

/** Process a single account with streaming */
async function processAccount(account, accessToken, devToken, mode) {
  const t0 = Date.now();
  let campCount = 0, agCount = 0, adCount = 0, metricCount = 0;
  const isMega = MEGA_ACCOUNTS.has(account.id);
  const label = `${account.name} (${account.id})${isMega ? ' [MEGA]' : ''}`;

  // === CAMPAIGNS (always, small payload) ===
  const campResult = await gaqlQuery(accessToken, devToken, account.id, MCC_ID,
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type
     FROM campaign WHERE campaign.status != 'REMOVED'`
  );
  const campaigns = (campResult.results || []).map(r => ({
    id: String(r.campaign.id),
    account_id: account.id,
    name: r.campaign.name,
    status: r.campaign.status,
    channel: 'google',
    channel_type: r.campaign.advertisingChannelType
  }));
  campCount = campaigns.length;
  for (let i = 0; i < campaigns.length; i += METRICS_BATCH) {
    await postToSync('campaigns', campaigns.slice(i, i + METRICS_BATCH));
  }

  // === AD GROUPS (always, medium payload — stream for mega accounts) ===
  if (isMega) {
    agCount = await gaqlQueryStreaming(accessToken, devToken, account.id, MCC_ID,
      `SELECT ad_group.id, ad_group.name, ad_group.campaign
       FROM ad_group WHERE ad_group.status != 'REMOVED'`,
      async (results, pageNum, total) => {
        const adGroups = results.map(r => ({
          id: String(r.adGroup.id),
          campaign_id: String(r.adGroup.campaign).split('/').pop(),
          account_id: account.id,
          name: r.adGroup.name,
          channel: 'google'
        }));
        for (let i = 0; i < adGroups.length; i += METRICS_BATCH) {
          await postToSync('ad_groups', adGroups.slice(i, i + METRICS_BATCH));
        }
        if (pageNum % 5 === 0) console.log(`[google-ads]   ${label}: ad_groups page ${pageNum} (${total} total)`);
      }
    );
  } else {
    const agResult = await gaqlQuery(accessToken, devToken, account.id, MCC_ID,
      `SELECT ad_group.id, ad_group.name, ad_group.campaign
       FROM ad_group WHERE ad_group.status != 'REMOVED'`
    );
    const adGroups = (agResult.results || []).map(r => ({
      id: String(r.adGroup.id),
      campaign_id: String(r.adGroup.campaign).split('/').pop(),
      account_id: account.id,
      name: r.adGroup.name,
      channel: 'google'
    }));
    agCount = adGroups.length;
    for (let i = 0; i < adGroups.length; i += METRICS_BATCH) {
      await postToSync('ad_groups', adGroups.slice(i, i + METRICS_BATCH));
    }
  }

  // === ADS METADATA (WEEKLY mode only — skip on daily to save time) ===
  if (mode === 'weekly') {
    console.log(`[google-ads]   ${label}: pulling ads metadata (weekly mode)...`);
    adCount = await gaqlQueryStreaming(accessToken, devToken, account.id, MCC_ID,
      `SELECT ad_group_ad.ad.id, ad_group_ad.ad.type, ad_group_ad.status,
              ad_group_ad.ad.final_urls, ad_group_ad.ad.responsive_search_ad.headlines,
              ad_group_ad.ad.responsive_search_ad.descriptions,
              ad_group.id, campaign.id
       FROM ad_group_ad
       WHERE ad_group_ad.status = 'ENABLED'`,
      async (results, pageNum, total) => {
        const seenAdIds = new Set();
        const ads = [];
        for (const r of results) {
          const adId = String(r.adGroupAd?.ad?.id || '');
          if (!adId || seenAdIds.has(adId)) continue;
          seenAdIds.add(adId);
          const finalUrls = r.adGroupAd?.ad?.finalUrls || [];
          const headlines = (r.adGroupAd?.ad?.responsiveSearchAd?.headlines || []).map(h => h.text || '');
          const descriptions = (r.adGroupAd?.ad?.responsiveSearchAd?.descriptions || []).map(d => d.text || '');
          ads.push({
            ad_id: adId,
            ad_group_id: String(r.adGroup?.id || ''),
            campaign_id: String(r.campaign?.id || ''),
            account_id: account.id,
            ad_type: r.adGroupAd?.ad?.type || 'RESPONSIVE_SEARCH_AD',
            status: r.adGroupAd?.status || 'ENABLED',
            final_url: finalUrls[0] || '',
            headlines, descriptions, channel: 'google'
          });
        }
        for (let i = 0; i < ads.length; i += METRICS_BATCH) {
          await postToSync('ads', ads.slice(i, i + METRICS_BATCH));
        }
        if (pageNum % 3 === 0) console.log(`[google-ads]   ${label}: ads page ${pageNum} (${total} total)`);
      }
    );
  } else {
    // Daily mode: skip ads metadata
    adCount = -1; // indicates skipped
  }

  // === METRICS (always — this is the daily bread) ===
  console.log(`[google-ads]   ${label}: pulling metrics (${DATE_RANGE})...`);
  metricCount = await gaqlQueryStreaming(accessToken, devToken, account.id, MCC_ID,
    `SELECT ad_group_ad.ad.id, ad_group.id, campaign.id,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions,
            segments.date
     FROM ad_group_ad
     WHERE segments.date DURING ${DATE_RANGE} AND ad_group_ad.status != 'REMOVED'`,
    async (results, pageNum, total) => {
      const metrics = [];
      for (const r of results) {
        const adId = String(r.adGroupAd?.ad?.id || '');
        if (!adId) continue;
        metrics.push({
          ad_id: adId,
          date: r.segments?.date,
          impressions: Number(r.metrics?.impressions || 0),
          clicks: Number(r.metrics?.clicks || 0),
          cost: Number(r.metrics?.costMicros || 0) / 1000000,
          conversions: Number(r.metrics?.conversions || 0)
        });
      }
      for (let i = 0; i < metrics.length; i += METRICS_BATCH) {
        await postToSync('ad_metrics', metrics.slice(i, i + METRICS_BATCH));
      }
      if (pageNum % 5 === 0) console.log(`[google-ads]   ${label}: metrics page ${pageNum} (${total} total)`);
    }
  );

  const dur = ((Date.now() - t0) / 1000).toFixed(1);
  const adStr = adCount === -1 ? 'skipped' : String(adCount);
  console.log(`[google-ads] ✓ ${label}: ${campCount} campaigns, ${agCount} ad_groups, ${adStr} ads, ${metricCount} metrics [${dur}s]`);
  return { campCount, agCount, adCount: Math.max(adCount, 0), metricCount };
}

/** Run an array of async fns with max concurrency */
async function parallelLimit(fns, limit) {
  const results = [];
  let idx = 0;
  async function worker() {
    while (idx < fns.length) {
      const i = idx++;
      results[i] = await fns[i]();
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, fns.length) }, () => worker()));
  return results;
}

async function main() {
  // Global safety-net timeout
  const safetyTimer = setTimeout(() => {
    console.error(`[google-ads] FATAL: global timeout (${GLOBAL_TIMEOUT_MS / 1000}s) — aborting`);
    process.exit(2);
  }, GLOBAL_TIMEOUT_MS);

  console.log(`[google-ads] v3.0 | mode=${SYNC_MODE} | dateRange=${DATE_RANGE} | timeout=${GLOBAL_TIMEOUT_MS/1000}s`);
  const { clientId, clientSecret, refreshToken, devToken } = loadSecrets();
  console.log('[google-ads] Dev token:', devToken ? devToken.substring(0, 8) + '...' : 'MISSING');

  const accessToken = await refreshAccessToken(clientId, clientSecret, refreshToken);
  console.log(`[google-ads] Access token refreshed [${elapsed()}]`);

  // Step 1: Get child accounts from MCC
  console.log('[google-ads] Fetching accounts from MCC...');
  const accountsResult = await gaqlQuery(accessToken, devToken, MCC_ID, MCC_ID,
    `SELECT customer_client.id, customer_client.descriptive_name, customer_client.manager, customer_client.status
     FROM customer_client
     WHERE customer_client.status = 'ENABLED' AND customer_client.manager = false`
  );

  const allAccounts = (accountsResult.results || []).map(r => ({
    id: String(r.customerClient.id),
    name: r.customerClient.descriptiveName || '',
    is_manager: false,
    mcc_id: MCC_ID,
    channel: 'google'
  }));

  // Filter to approved accounts only
  const accounts = allAccounts.filter(a => APPROVED_ACCOUNTS.has(a.id));
  const skipped = allAccounts.length - accounts.length;
  console.log(`[google-ads] Found ${allAccounts.length} accounts, ${accounts.length} approved, ${skipped} skipped [${elapsed()}]`);

  if (accounts.length > 0) {
    await postToSync('accounts', accounts);
    console.log(`[google-ads] Accounts synced [${elapsed()}]`);
  }

  // Step 2: Split accounts into small (parallel) and mega (sequential)
  const smallAccounts = accounts.filter(a => !MEGA_ACCOUNTS.has(a.id));
  const megaAccounts = accounts.filter(a => MEGA_ACCOUNTS.has(a.id));
  
  console.log(`[google-ads] Processing ${smallAccounts.length} small accounts (concurrency=4) + ${megaAccounts.length} mega accounts (sequential)...`);

  let totalCamp = 0, totalAg = 0, totalAds = 0, totalMetrics = 0;
  let errors = 0;

  // Process small accounts with higher concurrency
  const smallTasks = smallAccounts.map(account => async () => {
    const MAX_RETRIES = 2;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const r = await processAccount(account, accessToken, devToken, SYNC_MODE);
        totalCamp += r.campCount;
        totalAg += r.agCount;
        totalAds += r.adCount;
        totalMetrics += r.metricCount;
        return;
      } catch (err) {
        const isRetryable = err.message.includes('ETIMEDOUT') || err.message.includes('ECONNRESET') || err.message.includes('timeout');
        if (isRetryable && attempt < MAX_RETRIES) {
          const wait = 5000 * (attempt + 1);
          console.log(`[google-ads] ⟳ ${account.name} (${account.id}): ${err.message} — retrying in ${wait/1000}s (${attempt+1}/${MAX_RETRIES})`);
          await new Promise(r => setTimeout(r, wait));
          continue;
        }
        errors++;
        console.error(`[google-ads] ✗ ${account.name} (${account.id}): ${err.message}`);
      }
    }
  });

  await parallelLimit(smallTasks, 4);
  console.log(`[google-ads] Small accounts done [${elapsed()}]`);

  // Process mega accounts sequentially (they need all the bandwidth)
  for (const account of megaAccounts) {
    const MAX_RETRIES = 1;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const r = await processAccount(account, accessToken, devToken, SYNC_MODE);
        totalCamp += r.campCount;
        totalAg += r.agCount;
        totalAds += r.adCount;
        totalMetrics += r.metricCount;
        break;
      } catch (err) {
        const isRetryable = err.message.includes('ETIMEDOUT') || err.message.includes('ECONNRESET') || err.message.includes('timeout');
        if (isRetryable && attempt < MAX_RETRIES) {
          console.log(`[google-ads] ⟳ ${account.name} (${account.id}): ${err.message} — retrying (${attempt+1}/${MAX_RETRIES})`);
          await new Promise(r => setTimeout(r, 10000));
          continue;
        }
        errors++;
        console.error(`[google-ads] ✗ ${account.name} (${account.id}): ${err.message}`);
      }
    }
  }

  clearTimeout(safetyTimer);
  const errorRate = accounts.length > 0 ? errors / accounts.length : 0;
  console.log(`[google-ads] Done! ${accounts.length} accounts (${errors} errors, ${(errorRate * 100).toFixed(0)}%) — ${totalCamp} campaigns, ${totalAg} ad_groups, ${totalAds} ads, ${totalMetrics} metrics [${elapsed()}]`);
  
  if (errorRate > 0.25) {
    console.error(`[google-ads] FAILED: error rate ${(errorRate * 100).toFixed(0)}% exceeds 25% threshold`);
    process.exit(1);
  }
}

main().catch(e => { console.error('[google-ads] FATAL:', e.message); process.exit(1); });
