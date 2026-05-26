/**
 * Action Executor — The service that holds tokens and executes actions
 * 
 * Agents send INTENT ("pause campaign X because DEP dropped").
 * This service:
 * 1. Writes audit trail
 * 2. Executes with its own credentials (never exposed)
 * 3. Returns result
 * 
 * Tokens NEVER leave this service.
 */

import { createAuditEntry, completeAudit, failAudit } from './audit.js';

/**
 * Supported actions per platform
 */
const SUPPORTED_ACTIONS = {
  google_ads: [
    'get_campaign', 'list_campaigns', 'get_ad_group', 'list_ad_groups',
    'get_keywords', 'get_ads', 'get_insights',
    // Write actions (Phase 2+)
    'pause_campaign', 'enable_campaign', 'pause_ad_group', 'enable_ad_group',
    'adjust_bid', 'adjust_budget', 'add_negative_keyword'
  ],
  meta: [
    'get_campaign', 'list_campaigns', 'get_ad_set', 'list_ad_sets',
    'get_ads', 'get_ad', 'get_insights', 'get_creative',
    // Write actions (Phase 2+)
    'pause_campaign', 'enable_campaign', 'pause_ad_set', 'enable_ad_set',
    'adjust_budget'
  ],
  youtube: [
    'get_campaign', 'list_campaigns', 'get_ad_group', 'list_ad_groups',
    'get_ads', 'get_insights', 'get_video_metrics'
  ]
};

/**
 * Read-only actions (no write enforcement needed in Phase 1)
 */
const READ_ACTIONS = new Set([
  'get_campaign', 'list_campaigns', 'get_ad_group', 'list_ad_groups',
  'get_keywords', 'get_ads', 'get_ad', 'get_insights', 'get_creative',
  'get_ad_set', 'list_ad_sets', 'get_video_metrics'
]);

export class ActionExecutor {
  #vault;
  #auditEnabled;
  #readOnlyMode; // Phase 1: audit reads, block writes
  
  constructor(vault, { auditEnabled = true, readOnlyMode = true } = {}) {
    this.#vault = vault;
    this.#auditEnabled = auditEnabled;
    this.#readOnlyMode = readOnlyMode;
  }
  
  /**
   * Execute an action — the ONLY way to interact with platforms
   * 
   * @param {object} request
   * @param {string} request.requester - Agent ID ('nymeria' | 'ygritte')
   * @param {string} request.action - Action to perform
   * @param {string} request.platform - Target platform
   * @param {object} request.scope - Action parameters (campaign_id, etc.)
   * @param {object} request.trail - Reasoning trail (why this action)
   * @param {string} request.skill_name - Which skill triggered this
   * @param {object} request.initiator - Who triggered this action
   * @param {string} request.initiator.name - Initiator name ('Guy' | 'Ido' | 'analyst-subagent-6758')
   * @param {string} request.initiator.context - Initiator context ('DM whatsapp' | 'Marketing X1000' | 'campaign thread')
   */
  async execute({ requester, action, platform, scope, trail, skill_name, initiator }) {
    // Validate request
    this._validate(requester, action, platform);
    
    // Check if token exists for this agent + platform
    if (!this.#vault.hasToken(requester, platform)) {
      throw new ActionError('NO_TOKEN', `No ${platform} token stored for ${requester}`);
    }
    
    // Block write actions in Phase 1
    if (this.#readOnlyMode && !READ_ACTIONS.has(action)) {
      throw new ActionError('READ_ONLY', 
        `Write action "${action}" blocked — service is in read-only mode (Phase 1). ` +
        `Set readOnlyMode=false to enable writes.`
      );
    }
    
    // Create audit entry BEFORE execution
    let auditEntry;
    if (this.#auditEnabled) {
      auditEntry = await createAuditEntry({
        requester, skill_name, action, platform, scope, trail,
        initiator_name: initiator?.name,
        initiator_context: initiator?.context
      });
    }
    
    try {
      // Get token (internal — never exposed outside this class)
      const token = this.#vault._getToken(requester, platform);
      
      // Execute platform-specific action
      const result = await this._executeAction(platform, action, scope, token);
      
      // Update audit on success
      if (auditEntry) {
        await completeAudit(auditEntry.run_id, result);
      }
      
      // Build audit message for notification
      const initiatorLine = initiator?.name
        ? `\n👤 Initiated by: *${initiator.name}*${initiator.context ? ` | ${initiator.context}` : ''}`
        : '';
      const auditMsg = `✅ *${requester}* → ${action} on ${platform}` +
        initiatorLine +
        (trail?.reasoning ? `\n_${trail.reasoning}_` : '') +
        (scope?.campaign_id ? `\nCampaign: ${scope.campaign_id}` : '') +
        `\nRun: ${auditEntry?.run_id || 'n/a'}`;

      return {
        success: true,
        run_id: auditEntry?.run_id,
        result,
        audit: { run_id: auditEntry?.run_id, message: auditMsg }
      };
    } catch (error) {
      // Update audit on failure
      if (auditEntry) {
        await failAudit(auditEntry.run_id, error.message);
      }
      
      const failInitiatorLine = initiator?.name
        ? `\n👤 Initiated by: *${initiator.name}*${initiator.context ? ` | ${initiator.context}` : ''}`
        : '';
      const failMsg = `❌ *${requester}* → ${action} on ${platform} FAILED` +
        failInitiatorLine +
        `\n${error.message}` +
        `\nRun: ${auditEntry?.run_id || 'n/a'}`;

      error.auditMessage = failMsg;
      throw error;
    }
  }
  
  /**
   * Validate request parameters
   */
  _validate(requester, action, platform) {
    if (!requester || !['nymeria', 'ygritte'].includes(requester)) {
      throw new ActionError('INVALID_REQUESTER', `Unknown requester: ${requester}`);
    }
    if (!platform || !SUPPORTED_ACTIONS[platform]) {
      throw new ActionError('INVALID_PLATFORM', `Unknown platform: ${platform}`);
    }
    if (!action || !SUPPORTED_ACTIONS[platform].includes(action)) {
      throw new ActionError('INVALID_ACTION', 
        `Action "${action}" not supported for ${platform}. ` +
        `Valid: ${SUPPORTED_ACTIONS[platform].join(', ')}`
      );
    }
  }
  
  /**
   * Route to platform-specific executor
   */
  async _executeAction(platform, action, scope, token) {
    switch (platform) {
      case 'google_ads':
        return this._executeGoogleAds(action, scope, token);
      case 'meta':
        return this._executeMeta(action, scope, token);
      case 'youtube':
        return this._executeYouTube(action, scope, token);
      default:
        throw new ActionError('UNSUPPORTED', `Platform ${platform} not implemented`);
    }
  }
  
  /**
   * Google Ads executor
   */
  async _executeGoogleAds(action, scope, token) {
    const credentials = JSON.parse(token);
    // token is JSON: { client_id, client_secret, refresh_token, developer_token, login_customer_id }
    
    const accessToken = await this._refreshGoogleToken(credentials);
    
    const baseUrl = 'https://googleads.googleapis.com/v23';
    const customerId = scope.customer_id || credentials.default_customer_id;
    
    switch (action) {
      case 'get_insights': {
        const query = scope.query; // GAQL query
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'pause_campaign':
      case 'enable_campaign': {
        const status = action === 'pause_campaign' ? 'PAUSED' : 'ENABLED';
        const res = await fetch(`${baseUrl}/customers/${customerId}/campaigns:mutate`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            operations: [{
              update: {
                resourceName: `customers/${customerId}/campaigns/${scope.campaign_id}`,
                status
              },
              updateMask: 'status'
            }]
          })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'list_campaigns': {
        const query = scope.query || `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign_budget.amount_micros FROM campaign ORDER BY campaign.id`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_campaign': {
        const query = scope.query || `SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type, campaign_budget.amount_micros, campaign.start_date, campaign.end_date FROM campaign WHERE campaign.id = ${scope.campaign_id}`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'list_ad_groups': {
        const campaignFilter = scope.campaign_id ? ` WHERE campaign.id = ${scope.campaign_id}` : '';
        const query = scope.query || `SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.type, campaign.id, campaign.name FROM ad_group${campaignFilter} ORDER BY ad_group.id`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ad_group': {
        const query = scope.query || `SELECT ad_group.id, ad_group.name, ad_group.status, ad_group.type, ad_group.cpc_bid_micros, campaign.id FROM ad_group WHERE ad_group.id = ${scope.ad_group_id}`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_keywords': {
        const adGroupFilter = scope.ad_group_id ? ` WHERE ad_group.id = ${scope.ad_group_id}` : '';
        const query = scope.query || `SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ad_group_criterion.quality_info.quality_score, ad_group.id, campaign.id FROM ad_group_criterion WHERE ad_group_criterion.type = 'KEYWORD'${adGroupFilter ? ' AND' + adGroupFilter.replace(' WHERE ', ' ') : ''} ORDER BY ad_group_criterion.keyword.text`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ads': {
        const adGroupFilter = scope.ad_group_id ? ` WHERE ad_group.id = ${scope.ad_group_id}` : (scope.campaign_id ? ` WHERE campaign.id = ${scope.campaign_id}` : '');
        const query = scope.query || `SELECT ad_group_ad.ad.id, ad_group_ad.ad.name, ad_group_ad.ad.type, ad_group_ad.ad.responsive_search_ad.headlines, ad_group_ad.ad.responsive_search_ad.descriptions, ad_group_ad.status, ad_group_ad.ad.final_urls, ad_group.id, campaign.id FROM ad_group_ad${adGroupFilter} ORDER BY ad_group_ad.ad.id`;
        const res = await fetch(`${baseUrl}/customers/${customerId}/googleAds:searchStream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'developer-token': credentials.developer_token,
            'login-customer-id': credentials.login_customer_id,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        });
        if (!res.ok) throw new Error(`Google Ads API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      default:
        throw new ActionError('NOT_IMPLEMENTED', `Google Ads action "${action}" not yet implemented`);
    }
  }
  
  /**
   * Meta Ads executor
   */
  async _executeMeta(action, scope, token) {
    const baseUrl = 'https://graph.facebook.com/v23.0';
    const adAccount = scope.ad_account_id || 'act_1455743984512059';
    
    switch (action) {
      case 'get_insights': {
        const fields = scope.fields || 'impressions,clicks,spend,ctr,cpc,actions';
        const accountId = scope.account_id || scope.ad_account_id || adAccount;
        const params = new URLSearchParams({
          level: scope.level || 'ad',
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        if (scope.date_preset) params.set('date_preset', scope.date_preset);
        if (scope.time_range) params.set('time_range', JSON.stringify(scope.time_range));
        if (scope.time_increment) params.set('time_increment', String(scope.time_increment));
        if (scope.breakdowns) params.set('breakdowns', scope.breakdowns);
        if (scope.action_breakdowns) params.set('action_breakdowns', scope.action_breakdowns);
        if (scope.action_attribution_windows) params.set('action_attribution_windows', JSON.stringify(scope.action_attribution_windows));
        if (scope.use_account_attribution_setting) params.set('use_account_attribution_setting', 'true');
        if (scope.use_unified_attribution_setting) params.set('use_unified_attribution_setting', 'true');
        if (scope.filtering || scope.filters) params.set('filtering', JSON.stringify(scope.filtering || scope.filters));
        if (scope.after) params.set('after', scope.after);
        if (scope.sort) params.set('sort', scope.sort);
        
        const res = await fetch(`${baseUrl}/${accountId}/insights?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'list_campaigns': {
        const fields = scope.fields || 'id,name,status,objective,daily_budget,lifetime_budget';
        const accountId = scope.account_id || scope.ad_account_id || adAccount;
        const params = new URLSearchParams({
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        if (scope.after) params.set('after', scope.after);
        if (scope.filtering || scope.filters) params.set('filtering', JSON.stringify(scope.filtering || scope.filters));
        if (scope.effective_status) params.set('effective_status', JSON.stringify(scope.effective_status));
        if (scope.date_preset) params.set('date_preset', scope.date_preset);
        
        const res = await fetch(`${baseUrl}/${accountId}/campaigns?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'list_ad_sets': {
        const fields = scope.fields || 'id,name,status,daily_budget,lifetime_budget,targeting,optimization_goal,bid_strategy';
        const accountId = scope.account_id || scope.ad_account_id || adAccount;
        const endpoint = scope.campaign_id
          ? `${baseUrl}/${scope.campaign_id}/adsets`
          : `${baseUrl}/${accountId}/adsets`;
        const params = new URLSearchParams({ fields, access_token: token, limit: String(scope.limit || 50) });
        if (scope.after) params.set('after', scope.after);
        if (scope.filtering || scope.filters) params.set('filtering', JSON.stringify(scope.filtering || scope.filters));
        if (scope.effective_status) params.set('effective_status', JSON.stringify(scope.effective_status));
        
        const res = await fetch(`${endpoint}?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ad_set': {
        const fields = scope.fields || 'id,name,status,daily_budget,lifetime_budget,targeting,optimization_goal,bid_strategy,start_time,end_time';
        const params = new URLSearchParams({ fields, access_token: token });
        const res = await fetch(`${baseUrl}/${scope.adset_id || scope.ad_set_id}?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_creative': {
        const fields = scope.fields || 'id,name,title,body,image_url,image_hash,video_id,call_to_action_type,object_story_spec,asset_feed_spec,thumbnail_url';
        const params = new URLSearchParams({ fields, access_token: token });
        const res = await fetch(`${baseUrl}/${scope.creative_id}?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ads': {
        const fields = scope.fields || 'id,name,status,creative{id,title,body,image_url,video_id}';
        const accountId = scope.account_id || scope.ad_account_id || adAccount;
        const endpoint = scope.campaign_id
          ? `${baseUrl}/${scope.campaign_id}/ads`
          : `${baseUrl}/${accountId}/ads`;
        
        const params = new URLSearchParams({
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        
        if (scope.after) params.set('after', scope.after);
        if (scope.filters || scope.filtering) {
          params.set('filtering', JSON.stringify(scope.filters || scope.filtering));
        }
        if (scope.effective_status) {
          params.set('effective_status', JSON.stringify(scope.effective_status));
        }
        
        const res = await fetch(`${endpoint}?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ad': {
        const fields = scope.fields || 'id,name,creative{body,title,asset_feed_spec},effective_status';
        const params = new URLSearchParams({ fields, access_token: token });
        const res = await fetch(`${baseUrl}/${scope.ad_id}?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      default:
        throw new ActionError('NOT_IMPLEMENTED', `Meta action "${action}" not yet implemented`);
    }
  }
  
  /**
   * YouTube executor (via Google Ads API — YouTube campaigns are managed there)
   */
  async _executeYouTube(action, scope, token) {
    // YouTube ads are managed through Google Ads API
    // Reuse Google Ads executor with YouTube-specific queries
    return this._executeGoogleAds(action, scope, token);
  }
  
  /**
   * Refresh Google OAuth token
   */
  async _refreshGoogleToken(credentials) {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: credentials.refresh_token,
        grant_type: 'refresh_token'
      })
    });
    if (!res.ok) throw new Error(`Google OAuth refresh failed: ${res.status}`);
    const data = await res.json();
    return data.access_token;
  }
}

class ActionError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'ActionError';
  }
}
