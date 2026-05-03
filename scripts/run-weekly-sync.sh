#!/bin/bash
# Funnel Fighters Weekly Sync - full 30-day backfill
# Runs weekly (Sunday 04:00 UTC) — pulls full 30 days of data

set -e

export FF_BASE_URL="https://funnel-fighters.vercel.app"
export ADMIN_SYNC_SECRET="3UNizM0a2vFkQrFXGlLXDG3oQ5If6O8Zn7UAThwA"
export SYNC_MODE="weekly"
export SYNC_GLOBAL_TIMEOUT_MS="3600000"

SCRIPTS_DIR="/opt/ocana/openclaw/workspace/scripts"

echo "=== Funnel Fighters Weekly Sync (30-day backfill) ==="
echo "Started: $(date -u)"
echo ""

# Step 1: Pull Google Ads data (full 30 days)
echo "--- Step 1: Google Ads Sync (weekly) ---"
if [ -f "$SCRIPTS_DIR/pull-google-ads-v3.js" ]; then
  node "$SCRIPTS_DIR/pull-google-ads-v3.js"
else
  node "$SCRIPTS_DIR/pull-google-ads-v2.js"
fi
echo ""

# Step 2: Pull Meta Ads data (full 30 days, chunked weekly)
echo "--- Step 2: Meta Ads Sync (weekly) ---"
node "$SCRIPTS_DIR/pull-meta-ads.js" || echo "⚠️ Meta sync failed (may be API issue), continuing..."
echo ""

# Step 3: Trigger Google pipeline
echo "--- Step 3: Trigger Google Pipeline ---"
curl -sf -X POST \
  -H "Authorization: Bearer $ADMIN_SYNC_SECRET" \
  -H "Content-Type: application/json" \
  "$FF_BASE_URL/api/admin/pipeline/trigger" \
  -d '{"channel":"google"}' || echo "⚠️ Google pipeline trigger failed"
echo ""

# Step 4: Trigger Meta pipeline
echo "--- Step 4: Trigger Meta Pipeline ---"
curl -sf -X POST \
  -H "Authorization: Bearer $ADMIN_SYNC_SECRET" \
  -H "Content-Type: application/json" \
  "$FF_BASE_URL/api/admin/pipeline/trigger" \
  -d '{"channel":"meta"}' || echo "⚠️ Meta pipeline trigger failed"
echo ""

# Step 5: Check sync status
echo "--- Step 5: Sync Status ---"
curl -sf \
  -H "Authorization: Bearer $ADMIN_SYNC_SECRET" \
  "$FF_BASE_URL/api/admin/sync-status"
echo ""

echo "=== Weekly Sync Complete: $(date -u) ==="
