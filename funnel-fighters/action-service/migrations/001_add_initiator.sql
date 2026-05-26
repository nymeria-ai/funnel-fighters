-- Migration: Add initiator tracking to audit table
-- Who triggered the action (not just who executed it)
-- Format: initiator_name = "Guy", initiator_context = "DM whatsapp"

ALTER TABLE execution_audit ADD COLUMN IF NOT EXISTS initiator_name TEXT;
ALTER TABLE execution_audit ADD COLUMN IF NOT EXISTS initiator_context TEXT;

-- Index for filtering by initiator
CREATE INDEX IF NOT EXISTS idx_audit_initiator ON execution_audit(initiator_name);
