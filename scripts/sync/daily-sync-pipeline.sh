#!/bin/bash
# Daily Sync Pipeline — Funnel Fighters
# Runs at 06:30 IL (03:30 UTC)
# Pulls data from Google Ads + Meta Ads → POSTs to Funnel Fighters pipeline
#
# This script is triggered by Ygritte's cron job.
# It calls the pipeline trigger endpoint on the Funnel Fighters server.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="/opt/ocana/openclaw/workspace/memory/pipeline-sync.log"
SECRETS_DIR="/opt/ocana/openclaw/.secrets"

# Load secrets
SYNC_SECRET="${ADMIN_SYNC_SECRET:-}"
FF_BASE_URL="${FF_BASE_URL:-https://funnel-fighters.vercel.app}"

log() {
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] $*" | tee -a "$LOG_FILE"
}

alert_failure() {
  local step="$1"
  local error="$2"
  log "PIPELINE FAILURE at step: $step — $error"
  # Alert will be sent via Ygritte's WhatsApp integration
  echo "FAILED:$step:$error"
}

# Step 1: Trigger Google Ads sync
log "=== Starting daily pipeline sync ==="

log "Step 1: Triggering Google channel sync..."
RESULT=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: Bearer $SYNC_SECRET" \
  -H "Content-Type: application/json" \
  "$FF_BASE_URL/api/admin/pipeline/trigger" \
  -d '{"channel": "google"}' \
  --max-time 120)

HTTP_CODE=$(echo "$RESULT" | tail -1)
BODY=$(echo "$RESULT" | head -n -1)

if [ "$HTTP_CODE" != "200" ]; then
  alert_failure "google-sync" "HTTP $HTTP_CODE: $BODY"
  exit 1
fi

SUCCESS=$(echo "$BODY" | jq -r '.success // false')
if [ "$SUCCESS" != "true" ]; then
  FAILED_STEP=$(echo "$BODY" | jq -r '.failedStep // "unknown"')
  ERROR=$(echo "$BODY" | jq -r '.error // "unknown error"')
  alert_failure "$FAILED_STEP" "$ERROR"
  exit 1
fi

log "Google sync complete: $BODY"

# Step 2: Trigger Meta Ads sync
log "Step 2: Triggering Meta channel sync..."
RESULT=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Authorization: Bearer $SYNC_SECRET" \
  -H "Content-Type: application/json" \
  "$FF_BASE_URL/api/admin/pipeline/trigger" \
  -d '{"channel": "meta"}' \
  --max-time 120)

HTTP_CODE=$(echo "$RESULT" | tail -1)
BODY=$(echo "$RESULT" | head -n -1)

if [ "$HTTP_CODE" != "200" ]; then
  alert_failure "meta-sync" "HTTP $HTTP_CODE: $BODY"
  exit 1
fi

SUCCESS=$(echo "$BODY" | jq -r '.success // false')
if [ "$SUCCESS" != "true" ]; then
  FAILED_STEP=$(echo "$BODY" | jq -r '.failedStep // "unknown"')
  ERROR=$(echo "$BODY" | jq -r '.error // "unknown error"')
  alert_failure "$FAILED_STEP" "$ERROR"
  exit 1
fi

log "Meta sync complete: $BODY"

# Step 3: Run data retention cleanup
log "Step 3: Running data retention cleanup..."
curl -s -X POST \
  -H "Authorization: Bearer $SYNC_SECRET" \
  "$FF_BASE_URL/api/admin/maintenance/retention" \
  --max-time 30 | tee -a "$LOG_FILE"

log ""
log "=== Daily pipeline sync COMPLETE ==="
echo "SUCCESS"
