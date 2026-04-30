#!/usr/bin/env node
/**
 * Pull Google Ads data using googleapis library and POST to Funnel Fighters.
 *
 * v2.1 — 2026-04-30
 * - Process accounts in parallel batches of CONCURRENCY (default 4)
 * - Increase metrics POST batch size from 200 → 500
 * - Add per-account and total timing logs
 * - Add request timeouts (30s GAQL, 45s sync POST) to prevent silent hangs
 * - Add global safety-net timeout (25 min) so we always exit before cron kills us
 */
const fs = require('fs');
const https = require('https');

const SECRETS_DIR = '/opt/ocana/openclaw/.secrets';
const OAUTH_FILE = `${SECRETS_DIR}/google_ads_oauth.json`;
const TOKENS_FILE = `${SECRETS_DIR}/google_ads_tokens.json`;
const FF_BASE_URL = process.env.FF_BASE_URL || 'https://funnel-fighters.vercel.app';
const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET || '';
const MCC_ID = '7645779471';

// Tuning knobs
const CONCURRENCY = Number(process.env.SYNC_CONCURRENCY) || 4;
const METRICS_BATCH = Number(process.env.METRICS_BATCH) || 500;
const GAQL_TIMEOUT_MS = 30_000;
const SYNC_TIMEOUT_MS = 45_000;
const GLOBAL_TIMEOUT_MS = Number(process.env.SYNC_GLOBAL_TIMEOUT_MS) || 25 * 60 * 1000; // 25 min

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

async function gaqlQuery(accessToken, devToken, customerId, loginCustomerId, query) {
  const postData = JSON.stringify({ query });
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

/** Process a single account: campaigns → ad groups → ads + metrics */
async function processAccount(account, accessToken, devToken) {
  const t0 = Date.now();
  let campCount = 0, agCount = 0, adCount = 0, metricCount = 0;

  // Campaigns
  const campResult = await gaqlQuery(accessToken, devToken, account.id, MCC_ID,
    `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type
     FROM campaign WHERE campaign.status != 'REMOVED' LIMIT 1000`
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
  if (campaigns.length > 0) await postToSync('campaigns', campaigns);

  // Ad Groups
  const agResult = await gaqlQuery(accessToken, devToken, account.id, MCC_ID,
    `SELECT ad_group.id, ad_group.name, ad_group.campaign
     FROM ad_group WHERE ad_group.status != 'REMOVED' LIMIT 5000`
  );
  const adGroups = (agResult.results || []).map(r => ({
    id: String(r.adGroup.id),
    campaign_id: String(r.adGroup.campaign).split('/').pop(),
    account_id: account.id,
    name: r.adGroup.name,
    channel: 'google'
  }));
  agCount = adGroups.length;
  if (adGroups.length > 0) await postToSync('ad_groups', adGroups);

  // Ads + metrics (last 30 days)
  const adsResult = await gaqlQuery(accessToken, devToken, account.id, MCC_ID,
    `SELECT ad_group_ad.ad.id, ad_group_ad.ad.type, ad_group_ad.status,
            ad_group_ad.ad.final_urls, ad_group_ad.ad.responsive_search_ad.headlines,
            ad_group_ad.ad.responsive_search_ad.descriptions,
            ad_group.id, campaign.id,
            metrics.impressions, metrics.clicks, metrics.cost_micros, metrics.conversions,
            segments.date
     FROM ad_group_ad
     WHERE segments.date DURING LAST_30_DAYS AND ad_group_ad.status != 'REMOVED'
     LIMIT 50000`
  );

  const ads = [];
  const metrics = [];
  const seenAdIds = new Set();

  for (const r of adsResult.results || []) {
    const adId = String(r.adGroupAd?.ad?.id || '');
    if (!adId) continue;

    if (!seenAdIds.has(adId)) {
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

    metrics.push({
      ad_id: adId,
      date: r.segments?.date,
      impressions: Number(r.metrics?.impressions || 0),
      clicks: Number(r.metrics?.clicks || 0),
      cost: Number(r.metrics?.costMicros || 0) / 1000000,
      conversions: Number(r.metrics?.conversions || 0)
    });
  }
  adCount = ads.length;
  metricCount = metrics.length;

  if (ads.length > 0) await postToSync('ads', ads);
  // Post metrics in larger batches (500 instead of 200)
  for (let i = 0; i < metrics.length; i += METRICS_BATCH) {
    await postToSync('ad_metrics', metrics.slice(i, i + METRICS_BATCH));
  }

  const dur = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[google-ads] ✓ ${account.name} (${account.id}): ${campCount} campaigns, ${agCount} ad_groups, ${adCount} ads, ${metricCount} metrics [${dur}s]`);
  return { campCount, agCount, adCount, metricCount };
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

  console.log(`[google-ads] Starting (concurrency=${CONCURRENCY}, metricsBatch=${METRICS_BATCH})...`);
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

  const accounts = (accountsResult.results || []).map(r => ({
    id: String(r.customerClient.id),
    name: r.customerClient.descriptiveName || '',
    is_manager: false,
    mcc_id: MCC_ID,
    channel: 'google'
  }));

  console.log(`[google-ads] Found ${accounts.length} accounts [${elapsed()}]`);
  if (accounts.length > 0) {
    await postToSync('accounts', accounts);
    console.log(`[google-ads] Accounts synced [${elapsed()}]`);
  }

  // Step 2: Process accounts in parallel batches
  let totalCamp = 0, totalAg = 0, totalAds = 0, totalMetrics = 0;
  let errors = 0;

  const tasks = accounts.map(account => async () => {
    try {
      const r = await processAccount(account, accessToken, devToken);
      totalCamp += r.campCount;
      totalAg += r.agCount;
      totalAds += r.adCount;
      totalMetrics += r.metricCount;
    } catch (err) {
      errors++;
      console.error(`[google-ads] ✗ ${account.name} (${account.id}): ${err.message}`);
    }
  });

  await parallelLimit(tasks, CONCURRENCY);

  clearTimeout(safetyTimer);
  const errorRate = errors / accounts.length;
  console.log(`[google-ads] Done! ${accounts.length} accounts (${errors} errors, ${(errorRate * 100).toFixed(0)}%) — ${totalCamp} campaigns, ${totalAg} ad_groups, ${totalAds} ads, ${totalMetrics} metrics [${elapsed()}]`);
  // Fail only if >25% of accounts errored (transient network issues are expected)
  if (errorRate > 0.25) {
    console.error(`[google-ads] FAILED: error rate ${(errorRate * 100).toFixed(0)}% exceeds 25% threshold`);
    process.exit(1);
  }
}

main().catch(e => { console.error('[google-ads] FATAL:', e.message); process.exit(1); });
