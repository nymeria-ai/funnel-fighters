/**
 * Audit Layer — Writes to Funnel Fighters Neon DB
 * 
 * Every action creates an audit row BEFORE execution.
 * Audit is automatic — it's a byproduct of the service functioning,
 * not a voluntary step agents can skip.
 */

import { neon } from '@neondatabase/serverless';

let sql;

/**
 * Initialize the audit DB connection
 */
export function initAudit(databaseUrl) {
  sql = neon(databaseUrl);
}

/**
 * Create the execution_audit table if it doesn't exist
 */
export async function ensureAuditTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS execution_audit (
      id SERIAL PRIMARY KEY,
      run_id UUID DEFAULT gen_random_uuid(),
      
      -- Who
      requester TEXT NOT NULL,          -- 'nymeria' | 'ygritte'
      skill_name TEXT,                  -- which skill triggered this
      initiator_name TEXT,              -- who triggered: 'Guy' | 'Ido' | 'analyst-subagent-6758'
      initiator_context TEXT,           -- where from: 'DM whatsapp' | 'Marketing X1000' | 'campaign en-xxx deep dive thread'
      
      -- What
      action TEXT NOT NULL,             -- 'pause_campaign', 'adjust_bid', etc.
      platform TEXT NOT NULL,           -- 'google_ads' | 'meta' | 'youtube'
      scope JSONB NOT NULL DEFAULT '{}', -- { campaign_id, ad_group_id, etc. }
      
      -- Why (the trail — forces agents to explain reasoning)
      trail JSONB NOT NULL DEFAULT '{}', -- { reasoning, data_points, trigger, confidence }
      
      -- Execution
      status TEXT NOT NULL DEFAULT 'pending', -- pending → running → success | failed | rejected
      started_at TIMESTAMPTZ DEFAULT NOW(),
      completed_at TIMESTAMPTZ,
      
      -- Result
      result JSONB,                     -- platform API response
      error_message TEXT,
      
      -- Phase 2: Review
      reviewed_by TEXT,                 -- future: sub-agent reviewer
      review_decision TEXT,             -- 'approved' | 'rejected' | 'escalated'
      review_reasoning TEXT,
      
      -- Metadata
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  
  // Index for common queries
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_requester ON execution_audit(requester)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_status ON execution_audit(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_platform ON execution_audit(platform)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_created ON execution_audit(created_at DESC)`;
  
  // Migration: add initiator columns (safe to run on existing tables)
  await sql`ALTER TABLE execution_audit ADD COLUMN IF NOT EXISTS initiator_name TEXT`;
  await sql`ALTER TABLE execution_audit ADD COLUMN IF NOT EXISTS initiator_context TEXT`;
  await sql`CREATE INDEX IF NOT EXISTS idx_audit_initiator ON execution_audit(initiator_name)`;
  
  console.log('✅ execution_audit table ready');
}

/**
 * Create an audit row BEFORE execution begins
 * Returns the run_id — required to complete the action
 */
export async function createAuditEntry({ requester, skill_name, action, platform, scope, trail, initiator_name, initiator_context }) {
  const [row] = await sql`
    INSERT INTO execution_audit (requester, skill_name, action, platform, scope, trail, status, initiator_name, initiator_context)
    VALUES (${requester}, ${skill_name}, ${action}, ${platform}, ${JSON.stringify(scope)}, ${JSON.stringify(trail)}, 'running', ${initiator_name || null}, ${initiator_context || null})
    RETURNING run_id, id
  `;
  return row;
}

/**
 * Update audit row on success
 */
export async function completeAudit(runId, result) {
  await sql`
    UPDATE execution_audit 
    SET status = 'success', 
        completed_at = NOW(),
        result = ${JSON.stringify(result)}
    WHERE run_id = ${runId}
  `;
}

/**
 * Update audit row on failure
 */
export async function failAudit(runId, errorMessage) {
  await sql`
    UPDATE execution_audit 
    SET status = 'failed', 
        completed_at = NOW(),
        error_message = ${errorMessage}
    WHERE run_id = ${runId}
  `;
}

/**
 * Reject an action (Phase 2 — reviewer sub-agent)
 */
export async function rejectAudit(runId, reviewedBy, reasoning) {
  await sql`
    UPDATE execution_audit 
    SET status = 'rejected',
        completed_at = NOW(),
        reviewed_by = ${reviewedBy},
        review_decision = 'rejected',
        review_reasoning = ${reasoning}
    WHERE run_id = ${runId}
  `;
}

/**
 * Get recent audit entries
 */
export async function getAuditLog({ limit = 50, requester, platform, status } = {}) {
  // Build simple query — Neon tagged templates don't handle conditionals well
  if (requester && platform && status) {
    return sql`SELECT * FROM execution_audit WHERE requester = ${requester} AND platform = ${platform} AND status = ${status} ORDER BY created_at DESC LIMIT ${limit}`;
  } else if (requester && platform) {
    return sql`SELECT * FROM execution_audit WHERE requester = ${requester} AND platform = ${platform} ORDER BY created_at DESC LIMIT ${limit}`;
  } else if (requester) {
    return sql`SELECT * FROM execution_audit WHERE requester = ${requester} ORDER BY created_at DESC LIMIT ${limit}`;
  } else if (platform) {
    return sql`SELECT * FROM execution_audit WHERE platform = ${platform} ORDER BY created_at DESC LIMIT ${limit}`;
  } else if (status) {
    return sql`SELECT * FROM execution_audit WHERE status = ${status} ORDER BY created_at DESC LIMIT ${limit}`;
  } else {
    return sql`SELECT * FROM execution_audit ORDER BY created_at DESC LIMIT ${limit}`;
  }
}

/**
 * Find stale runs (started but never completed — suspicious)
 */
export async function findStaleRuns(maxAgeMinutes = 60) {
  return sql`
    SELECT * FROM execution_audit
    WHERE status = 'running'
    AND started_at < NOW() - make_interval(mins => ${maxAgeMinutes})
    ORDER BY started_at ASC
  `;
}
