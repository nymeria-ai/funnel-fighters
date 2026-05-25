/**
 * Action Service — HTTP API
 * 
 * Local service that agents call to execute platform actions.
 * Tokens never leave this service. Audit is automatic.
 * 
 * Usage:
 *   VAULT_PASSPHRASE=<secret> DATABASE_URL=<neon-url> node src/index.js
 * 
 * Endpoints:
 *   POST /execute       — Execute an action (audit automatically)
 *   POST /token/store   — Store/update a token (admin only)
 *   GET  /token/list    — List stored credentials (no tokens exposed)
 *   POST /token/update  — Update an existing token
 *   GET  /audit/log     — Query audit trail
 *   GET  /audit/stale   — Find stale (suspicious) runs
 *   GET  /health        — Service health check
 */

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { TokenVault } from './token-vault.js';
import { ActionExecutor } from './executor.js';
import { initAudit, ensureAuditTable, getAuditLog, findStaleRuns } from './audit.js';

const app = new Hono();

// ─── Config ───────────────────────────────────────────────
const PORT = parseInt(process.env.ACTION_SERVICE_PORT || '9400');
const VAULT_PASSPHRASE = process.env.VAULT_PASSPHRASE;
const DATABASE_URL = process.env.DATABASE_URL;
const ADMIN_KEY = process.env.ADMIN_KEY || null; // Optional: protect token management endpoints

if (!VAULT_PASSPHRASE) {
  console.error('❌ VAULT_PASSPHRASE is required');
  process.exit(1);
}
if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL is required (Neon connection string)');
  process.exit(1);
}

// ─── Initialize ───────────────────────────────────────────
const vault = new TokenVault(VAULT_PASSPHRASE);
const executor = new ActionExecutor(vault, {
  auditEnabled: true,
  readOnlyMode: true // Phase 1: read-only. Set false for Phase 2.
});

initAudit(DATABASE_URL);

// ─── Middleware ────────────────────────────────────────────

/** Admin auth check for token management */
function requireAdmin(c, next) {
  if (ADMIN_KEY) {
    const auth = c.req.header('X-Admin-Key');
    if (auth !== ADMIN_KEY) {
      return c.json({ error: 'Unauthorized — admin key required' }, 401);
    }
  }
  return next();
}

// ─── Routes ───────────────────────────────────────────────

/** Health check */
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    version: '1.0.0',
    phase: 'phase-1-read-only',
    tokens_loaded: vault.list().length,
    uptime_seconds: Math.floor(process.uptime())
  });
});

/**
 * POST /execute — Execute a platform action
 * 
 * Body: {
 *   requester: 'nymeria' | 'ygritte',
 *   action: 'get_insights' | 'pause_campaign' | ...,
 *   platform: 'google_ads' | 'meta' | 'youtube',
 *   scope: { campaign_id, ad_account_id, query, fields, ... },
 *   trail: { reasoning, data_points, confidence, trigger },
 *   skill_name: 'google-ads-dep-crossref' (optional)
 * }
 */
app.post('/execute', async (c) => {
  try {
    const body = await c.req.json();
    const { requester, action, platform, scope, trail, skill_name } = body;
    
    if (!requester || !action || !platform) {
      return c.json({
        error: 'Missing required fields: requester, action, platform'
      }, 400);
    }
    
    if (!trail || !trail.reasoning) {
      return c.json({
        error: 'Trail with reasoning is required — explain WHY this action is needed'
      }, 400);
    }
    
    const result = await executor.execute({
      requester, action, platform, scope: scope || {},
      trail, skill_name
    });
    
    return c.json(result);
  } catch (error) {
    const status = error.code === 'READ_ONLY' ? 403 :
                   error.code === 'NO_TOKEN' ? 404 :
                   error.code === 'INVALID_REQUESTER' ? 400 :
                   error.code === 'INVALID_ACTION' ? 400 : 500;
    
    return c.json({
      error: error.message,
      code: error.code || 'INTERNAL'
    }, status);
  }
});

/**
 * POST /token/store — Store a new token
 * Admin only. Token is encrypted at rest.
 * 
 * Body: {
 *   agent: 'nymeria' | 'ygritte',
 *   platform: 'google_ads' | 'meta',
 *   token: '<plaintext token or JSON credentials>',
 *   metadata: { scope, notes, ... }
 * }
 */
app.post('/token/store', requireAdmin, async (c) => {
  const { agent, platform, token, metadata } = await c.req.json();
  
  if (!agent || !platform || !token) {
    return c.json({ error: 'Missing: agent, platform, token' }, 400);
  }
  
  const result = vault.store(agent, platform, token, metadata || {});
  return c.json(result);
});

/**
 * POST /token/update — Update an existing token (e.g. after refresh)
 * Admin only.
 * 
 * Body: {
 *   agent: 'nymeria',
 *   platform: 'meta',
 *   token: '<new token value>'
 * }
 */
app.post('/token/update', requireAdmin, async (c) => {
  const { agent, platform, token } = await c.req.json();
  
  if (!agent || !platform || !token) {
    return c.json({ error: 'Missing: agent, platform, token' }, 400);
  }
  
  try {
    const result = vault.update(agent, platform, token);
    return c.json(result);
  } catch (e) {
    return c.json({ error: e.message }, 404);
  }
});

/**
 * GET /token/list — List stored credentials
 * Returns agent + platform, NOT the actual tokens.
 */
app.get('/token/list', (c) => {
  return c.json({ credentials: vault.list() });
});

/**
 * GET /audit/log — Query audit trail
 * Query params: requester, platform, status, limit
 */
app.get('/audit/log', async (c) => {
  const { requester, platform, status, limit } = c.req.query();
  const entries = await getAuditLog({
    requester, platform, status,
    limit: parseInt(limit || '50')
  });
  return c.json({ entries, count: entries.length });
});

/**
 * GET /audit/stale — Find stale runs (started but never completed)
 */
app.get('/audit/stale', async (c) => {
  const maxAge = parseInt(c.req.query('maxAgeMinutes') || '60');
  const stale = await findStaleRuns(maxAge);
  return c.json({ stale, count: stale.length });
});

// ─── Start ────────────────────────────────────────────────
async function start() {
  await ensureAuditTable();
  
  serve({ fetch: app.fetch, port: PORT }, () => {
    console.log(`\n🐺 Action Service running on http://localhost:${PORT}`);
    console.log(`   Phase: 1 (read-only — write actions blocked)`);
    console.log(`   Tokens loaded: ${vault.list().length}`);
    console.log(`   Audit: writing to Neon DB`);
    console.log(`   Admin key: ${ADMIN_KEY ? 'required' : 'not set (open)'}\n`);
  });
}

start().catch(console.error);
