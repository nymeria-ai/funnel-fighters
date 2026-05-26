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
const AUDIT_WA_GROUP = process.env.AUDIT_WA_GROUP || '120363408433184712@g.us';
const OPENCLAW_GW = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3284';

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
const READ_ONLY = process.env.READ_ONLY_MODE === 'true'; // Default: writes enabled
const executor = new ActionExecutor(vault, {
  auditEnabled: true,
  readOnlyMode: READ_ONLY
});

initAudit(DATABASE_URL);

// ─── Middleware ────────────────────────────────────────────

/** Admin auth check for token management */
async function requireAdmin(c, next) {
  if (ADMIN_KEY) {
    const auth = c.req.header('X-Admin-Key');
    if (auth !== ADMIN_KEY) {
      return c.json({ error: 'Unauthorized — admin key required' }, 401);
    }
  }
  await next();
}

// ─── Audit Notification ───────────────────────────────────

/**
 * Send audit message to WhatsApp group via OpenClaw gateway
 * Best effort — never blocks the action response
 */
async function notifyAuditGroup(message) {
  try {
    const resp = await fetch(`${OPENCLAW_GW}/v1/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: 'whatsapp',
        target: AUDIT_WA_GROUP,
        message
      })
    });
    if (!resp.ok) {
      console.warn(`Audit WA notification failed: ${resp.status}`);
    }
  } catch (e) {
    console.warn(`Audit WA notification error: ${e.message}`);
  }
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
    const { requester, action, platform, scope, trail, skill_name, initiator } = body;
    
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
    
    if (!initiator || !initiator.name) {
      return c.json({
        error: 'initiator.name is required — who triggered this action? e.g. {"name": "Guy", "context": "DM whatsapp"}'
      }, 400);
    }
    
    const result = await executor.execute({
      requester, action, platform, scope: scope || {},
      trail, skill_name, initiator
    });
    
    // Send audit notification to WhatsApp group (best effort)
    if (result.audit?.message) {
      notifyAuditGroup(result.audit.message).catch(() => {});
    }
    
    return c.json(result);
  } catch (error) {
    const status = error.code === 'READ_ONLY' ? 403 :
                   error.code === 'NO_TOKEN' ? 404 :
                   error.code === 'INVALID_REQUESTER' ? 400 :
                   error.code === 'INVALID_ACTION' ? 400 : 500;
    
    // Notify audit group on failure too
    if (error.auditMessage) {
      notifyAuditGroup(error.auditMessage).catch(() => {});
    }
    
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
app.use('/token/store', requireAdmin);
app.post('/token/store', async (c) => {
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
app.use('/token/update', requireAdmin);
app.post('/token/update', async (c) => {
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
 * GET /audit/dashboard — HTML dashboard with search & filters
 */
app.get('/audit/dashboard', async (c) => {
  const entries = await getAuditLog({ limit: 200 });
  
  const html = `<!DOCTYPE html>
<html><head>
<title>FF Action Service — Audit Dashboard</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, sans-serif; background: #0a0a0a; color: #e0e0e0; padding: 20px; }
  h1 { margin-bottom: 16px; font-size: 24px; }
  .filters { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
  input, select { background: #1a1a1a; border: 1px solid #333; color: #e0e0e0; padding: 8px 12px; border-radius: 6px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th { background: #1a1a1a; padding: 10px 8px; text-align: left; position: sticky; top: 0; cursor: pointer; }
  th:hover { background: #252525; }
  td { padding: 8px; border-bottom: 1px solid #1a1a1a; }
  tr:hover { background: #111; }
  .success { color: #22c55e; } .failed { color: #ef4444; } .running { color: #f59e0b; } .rejected { color: #a855f7; }
  .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
  .tag-success { background: #052e16; color: #22c55e; }
  .tag-failed { background: #2d0a0a; color: #ef4444; }
  .tag-running { background: #2d1f04; color: #f59e0b; }
  .trail { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
  .trail:hover { white-space: normal; }
  .stats { display: flex; gap: 20px; margin-bottom: 16px; }
  .stat { background: #1a1a1a; padding: 12px 20px; border-radius: 8px; }
  .stat-value { font-size: 28px; font-weight: bold; }
  .stat-label { font-size: 12px; color: #888; }
</style>
</head><body>
<h1>🔍 Action Service Audit Dashboard</h1>
<div class="stats">
  <div class="stat"><div class="stat-value">${entries.length}</div><div class="stat-label">Total Actions</div></div>
  <div class="stat"><div class="stat-value success">${entries.filter(e => e.status === 'success').length}</div><div class="stat-label">Success</div></div>
  <div class="stat"><div class="stat-value failed">${entries.filter(e => e.status === 'failed').length}</div><div class="stat-label">Failed</div></div>
  <div class="stat"><div class="stat-value running">${entries.filter(e => e.status === 'running').length}</div><div class="stat-label">Running</div></div>
</div>
<div class="filters">
  <input type="text" id="search" placeholder="Search actions..." oninput="filterTable()">
  <select id="filterAgent" onchange="filterTable()"><option value="">All agents</option><option>nymeria</option><option>ygritte</option></select>
  <select id="filterPlatform" onchange="filterTable()"><option value="">All platforms</option><option>google_ads</option><option>meta</option><option>youtube</option></select>
  <select id="filterStatus" onchange="filterTable()"><option value="">All status</option><option>success</option><option>failed</option><option>running</option><option>rejected</option></select>
</div>
<table id="auditTable">
<thead><tr><th>Time</th><th>Agent</th><th>Initiator</th><th>Action</th><th>Platform</th><th>Status</th><th>Skill</th><th>Reasoning</th><th>Duration</th></tr></thead>
<tbody>
${entries.map(e => {
  const trail = e.trail || {};
  const duration = e.completed_at && e.started_at ? Math.round((new Date(e.completed_at) - new Date(e.started_at)) / 1000) + 's' : '-';
  const initiatorStr = e.initiator_name ? (e.initiator_name + (e.initiator_context ? ' | ' + e.initiator_context : '')) : '-';
  return '<tr>' +
    '<td>' + new Date(e.created_at).toLocaleString('en-GB', {timeZone:'Europe/London'}) + '</td>' +
    '<td>' + (e.requester || '-') + '</td>' +
    '<td>' + initiatorStr + '</td>' +
    '<td>' + (e.action || '-') + '</td>' +
    '<td>' + (e.platform || '-') + '</td>' +
    '<td><span class="tag tag-' + (e.status || '') + '">' + (e.status || '-') + '</span></td>' +
    '<td>' + (e.skill_name || '-') + '</td>' +
    '<td class="trail" title="' + (trail.reasoning || '').replace(/"/g, '&quot;') + '">' + (trail.reasoning || '-') + '</td>' +
    '<td>' + duration + '</td>' +
    '</tr>';
}).join('\n')}
</tbody></table>
<script>
function filterTable() {
  const search = document.getElementById('search').value.toLowerCase();
  const agent = document.getElementById('filterAgent').value;
  const platform = document.getElementById('filterPlatform').value;
  const status = document.getElementById('filterStatus').value;
  document.querySelectorAll('#auditTable tbody tr').forEach(row => {
    const text = row.textContent.toLowerCase();
    const cells = row.querySelectorAll('td');
    const show = text.includes(search) &&
      (!agent || cells[1].textContent === agent) &&
      (!platform || cells[3].textContent === platform) &&
      (!status || cells[4].textContent.trim() === status);
    row.style.display = show ? '' : 'none';
  });
}
</script>
</body></html>`;
  
  return c.html(html);
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
    console.log(`   Phase: ${READ_ONLY ? '1 (read-only)' : '2 (read + write enabled)'}`);
    console.log(`   Tokens loaded: ${vault.list().length}`);
    console.log(`   Audit: writing to Neon DB`);
    console.log(`   Admin key: ${ADMIN_KEY ? 'required' : 'not set (open)'}\n`);
  });
}

start().catch(console.error);
