#!/bin/bash
# ─── Funnel Gate Wrapper ───────────────────────────────────
# ALL Funnel Gate calls MUST go through this script.
# Direct calls to localhost:9400/execute are FORBIDDEN.
#
# Usage: funnel-gate.sh '<JSON payload>'
# Returns: Full Funnel Gate JSON response on stdout.
# Side effect: Sends audit.message to AgenticMarketing-Audit WhatsApp group.

exec python3 "$(dirname "$0")/funnel_gate.py" "$@"
