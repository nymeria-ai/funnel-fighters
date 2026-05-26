# Funnel Gate Wrapper

**Mandatory** entry point for all Funnel Gate API calls (Google Ads, Meta Ads, YouTube).

## Why

- Guarantees audit trail: every call is logged to `execution_audit` in Neon DB
- Audit message emitted on stderr for the calling agent to send to WhatsApp audit group
- Single source of truth — both Nymeria and Ygritte use the same wrapper from this repo

## Usage

```bash
python3 scripts/funnel-gate/funnel_gate.py '{
  "requester": "nymeria",
  "action": "get_insights",
  "platform": "meta",
  "scope": { "account_id": "act_xxx", "date_preset": "last_7d", "fields": "spend,impressions", "level": "campaign", "limit": 10 },
  "trail": { "reasoning": "Weekly spend review" },
  "initiator": { "name": "Guy", "context": "Marketing X1000" }
}'
```

## After every call

1. Check stderr for `__FUNNEL_AUDIT__:...:__END_AUDIT__`
2. Extract the audit message
3. Send it to AgenticMarketing-Audit group (`120363408433184712@g.us`) via `message` tool

## Fields

- `requester` — agent name (nymeria, ygritte)
- `action` — what to do (get_insights, list_campaigns, etc.)
- `platform` — meta, google_ads, youtube
- `scope` — API parameters
- `trail.reasoning` — why this call is being made
- `initiator.name` — who/what triggered it (human name or sub-agent id)
- `initiator.context` — where it came from (group name, DM, thread)

⚠️ `initiator` is MANDATORY — every call must include who triggered it.
