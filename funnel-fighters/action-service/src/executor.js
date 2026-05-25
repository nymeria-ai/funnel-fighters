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
    'get_ads', 'get_insights', 'get_creative',
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
  'get_keywords', 'get_ads', 'get_insights', 'get_creative',
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
   */
  async execute({ requester, action, platform, scope, trail, skill_name }) {
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
        requester, skill_name, action, platform, scope, trail
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
      const auditMsg = `✅ *${requester}* → ${action} on ${platform}` +
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
      
      const failMsg = `❌ *${requester}* → ${action} on ${platform} FAILED` +
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
      
      default:
        throw new ActionError('NOT_IMPLEMENTED', `Google Ads action "${action}" not yet implemented`);
    }
  }
  
  /**
   * Meta Ads executor
   */
  async _executeMeta(action, scope, token) {
    const baseUrl = 'https://graph.facebook.com/v21.0';
    const adAccount = scope.ad_account_id || 'act_1455743984512059';
    
    switch (action) {
      case 'get_insights': {
        const fields = scope.fields || 'impressions,clicks,spend,ctr,cpc,actions';
        const params = new URLSearchParams({
          level: scope.level || 'ad',
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        if (scope.time_range) {
          params.set('time_range', JSON.stringify(scope.time_range));
        }
        if (scope.breakdowns) {
          params.set('breakdowns', scope.breakdowns);
        }
        if (scope.filtering) {
          params.set('filtering', JSON.stringify(scope.filtering));
        }
        
        const res = await fetch(`${baseUrl}/${adAccount}/insights?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'list_campaigns': {
        const fields = scope.fields || 'id,name,status,objective,daily_budget,lifetime_budget';
        const params = new URLSearchParams({
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        
        const res = await fetch(`${baseUrl}/${adAccount}/campaigns?${params}`);
        if (!res.ok) throw new Error(`Meta API: ${res.status} ${await res.text()}`);
        return res.json();
      }
      
      case 'get_ads': {
        const fields = scope.fields || 'id,name,status,creative{id,title,body,image_url,video_id}';
        const params = new URLSearchParams({
          fields,
          access_token: token,
          limit: String(scope.limit || 50)
        });
        
        const res = await fetch(`${baseUrl}/${adAccount}/ads?${params}`);
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
