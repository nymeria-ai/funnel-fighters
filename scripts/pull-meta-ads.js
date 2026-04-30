#!/usr/bin/env node
/**
 * Pull Meta Ads data and POST to Funnel Fighters sync endpoint.
 * Uses the Meta Marketing API v21.0.
 * 
 * Reads token from /opt/ocana/openclaw/.secrets/meta_ads_token.txt
 * Posts results to FF_BASE_URL/api/admin/sync-ads
 */

const fs = require('fs');
const https = require('https');

const SECRETS_DIR = '/opt/ocana/openclaw/.secrets';
const TOKEN_FILE = `${SECRETS_DIR}/meta_ads_token.txt`;
const FF_BASE_URL = process.env.FF_BASE_URL || 'https://funnel-fighters.vercel.app';
const SYNC_SECRET = process.env.ADMIN_SYNC_SECRET || '';
const API_VERSION = 'v21.0';

// Approved Meta ad accounts — only sync these (per Ido 2026-04-30)
const AD_ACCOUNTS = [
  'act_1455743984512059',  // monday.com 1
];

// Full list kept for reference (uncomment to add back):
// 'act_16678057', 'act_965827523503710', 'act_1104545689631892',
// 'act_1137320209687773', 'act_1138216572931470', 'act_1307585425994583',
// 'act_1319999961419796', 'act_2109261066004662', 'act_202037794020916',
// 'act_272979697885968', 'act_4029668940657354'

function getToken() {
  return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
}

function metaApiGet(path, params = {}) {
  const token = getToken();
  const queryParams = new URLSearchParams({ access_token: token, ...params });
  const url = `https://graph.facebook.com/${API_VERSION}/${path}?${queryParams}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Meta API ${res.statusCode}: ${data}`));
          return;
        }
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 500)}`));
        }
      });
    }).on('error', reject);
  });
}

function postToSync(type, rows) {
  const postData = JSON.stringify({ type, rows });
  
  return new Promise((resolve, reject) => {
    const url = new URL(`${FF_BASE_URL}/api/admin/sync-ads`);
    const protocol = url.protocol === 'https:' ? https : require('http');
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SYNC_SECRET}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Sync API ${res.statusCode}: ${data}`));
          return;
        }
        resolve(JSON.parse(data));
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

// Get date range for last 30 days
function getDateRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 30);
  return {
    since: start.toISOString().split('T')[0],
    until: end.toISOString().split('T')[0]
  };
}

async function main() {
  console.log('[meta-ads] Starting data pull...');
  
  const { since, until } = getDateRange();
  console.log(`[meta-ads] Date range: ${since} to ${until}`);

  for (const accountId of AD_ACCOUNTS) {
    console.log(`[meta-ads] Processing account: ${accountId}`);
    
    try {
      // Get account info
      const accountInfo = await metaApiGet(accountId, {
        fields: 'name,account_status'
      });
      
      // Sync account
      await postToSync('accounts', [{
        id: accountId,
        name: accountInfo.name || accountId,
        is_manager: false,
        mcc_id: 'meta',
        channel: 'meta'
      }]);

      // Get campaigns
      const campaignsData = await metaApiGet(`${accountId}/campaigns`, {
        fields: 'id,name,status,objective',
        limit: '500'
      });
      
      const campaigns = (campaignsData.data || []).map(c => ({
        id: c.id,
        account_id: accountId,
        name: c.name,
        status: c.status,
        channel: 'meta',
        channel_type: c.objective || 'UNKNOWN'
      }));
      
      if (campaigns.length > 0) await postToSync('campaigns', campaigns);

      // Get ad sets (= ad groups in our schema)
      const adSetsData = await metaApiGet(`${accountId}/adsets`, {
        fields: 'id,name,campaign_id,status',
        limit: '500'
      });
      
      const adSets = (adSetsData.data || []).map(as => ({
        id: as.id,
        campaign_id: as.campaign_id,
        account_id: accountId,
        name: as.name,
        channel: 'meta'
      }));
      
      if (adSets.length > 0) await postToSync('ad_groups', adSets);

      // Get ads with creative info
      const adsData = await metaApiGet(`${accountId}/ads`, {
        fields: 'id,name,status,adset_id,campaign_id,creative{id,title,body,link_url,effective_object_story_id}',
        limit: '500'
      });
      
      const ads = (adsData.data || []).map(ad => {
        const creative = ad.creative || {};
        return {
          ad_id: ad.id,
          ad_group_id: ad.adset_id || '',
          campaign_id: ad.campaign_id || '',
          account_id: accountId,
          ad_type: 'META_AD',
          status: ad.status || 'ACTIVE',
          final_url: creative.link_url || '',
          headlines: [creative.title || ad.name || ''].filter(Boolean),
          descriptions: [creative.body || ''].filter(Boolean),
          channel: 'meta'
        };
      });
      
      if (ads.length > 0) await postToSync('ads', ads);

      // Get daily metrics (insights)
      const insightsData = await metaApiGet(`${accountId}/insights`, {
        fields: 'ad_id,impressions,clicks,spend,actions',
        level: 'ad',
        time_increment: '1',
        time_range: JSON.stringify({ since, until }),
        limit: '5000'
      });
      
      const metrics = [];
      for (const row of insightsData.data || []) {
        const conversions = (row.actions || [])
          .filter(a => a.action_type === 'offsite_conversion.fb_pixel_purchase' || 
                       a.action_type === 'lead' ||
                       a.action_type === 'complete_registration')
          .reduce((sum, a) => sum + Number(a.value || 0), 0);
        
        metrics.push({
          ad_id: row.ad_id,
          date: row.date_start,
          impressions: Number(row.impressions || 0),
          clicks: Number(row.clicks || 0),
          cost: Number(row.spend || 0), // Meta already reports in dollars
          conversions
        });
      }
      
      if (metrics.length > 0) {
        for (let i = 0; i < metrics.length; i += 500) {
          await postToSync('ad_metrics', metrics.slice(i, i + 500));
        }
      }
      
      console.log(`[meta-ads] Account ${accountInfo.name}: ${campaigns.length} campaigns, ${adSets.length} ad sets, ${ads.length} ads, ${metrics.length} metric rows`);
      
      // Rate limiting — Meta allows ~200 calls/hour per ad account
      await new Promise(r => setTimeout(r, 2000));
      
    } catch (err) {
      console.error(`[meta-ads] Error processing ${accountId}:`, err.message);
      // Continue with other accounts
    }
  }
  
  console.log('[meta-ads] Done!');
}

main().catch(err => {
  console.error('[meta-ads] FATAL:', err.message);
  process.exit(1);
});
