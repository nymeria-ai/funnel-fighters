# Action Service — Funnel Fighters

Local service that enforces audit on all platform actions. Agents send **intent**, the service executes with its own hidden credentials.

## Architecture

```
Agent → POST /execute → Audit row created → Action executed → Result returned
                                                    ↑
                                          Tokens live HERE only
                                          (encrypted, never exposed)
```

**Key principle:** Tokens never leave the service. Agents cannot read, copy, or bypass credentials. Every action is automatically audited.

## Quick Start

```bash
# 1. Install dependencies
cd action-service
npm install

# 2. Set environment
export VAULT_PASSPHRASE="your-secret-passphrase-min-16-chars"
export DATABASE_URL="postgres://...@...neon.tech/..."  # FF Neon DB
export ADMIN_KEY="optional-admin-secret"  # Protects token management endpoints
export ACTION_SERVICE_PORT=9400  # Default

# 3. Store tokens (first time only)
node src/setup-tokens.js

# 4. Start the service
npm start
```

## API

### Execute an Action
```bash
POST http://localhost:9400/execute
{
  "requester": "nymeria",
  "action": "get_insights",
  "platform": "meta",
  "scope": {
    "fields": "impressions,clicks,spend,ctr,frequency",
    "level": "ad",
    "time_range": {"since": "2024-05-01", "until": "2026-05-24"}
  },
  "trail": {
    "reasoning": "Pulling 2-year ad-level data for UK restructure analysis",
    "skill_name": "meta-creative-analyzer",
    "confidence": "high",
    "trigger": "workstream-2-restructure"
  }
}
```

### Store a Token (Admin)
```bash
POST http://localhost:9400/token/store
X-Admin-Key: <admin-key>
{
  "agent": "nymeria",
  "platform": "meta",
  "token": "<access-token>",
  "metadata": { "scope": "ads_read", "notes": "System User token" }
}
```

### Update a Token (after refresh)
```bash
POST http://localhost:9400/token/update
X-Admin-Key: <admin-key>
{
  "agent": "nymeria",
  "platform": "google_ads",
  "token": "<new-token-json>"
}
```

### List Stored Credentials (no tokens exposed)
```bash
GET http://localhost:9400/token/list
```

### Query Audit Trail
```bash
GET http://localhost:9400/audit/log?requester=nymeria&platform=meta&limit=20
```

### Find Stale Runs (suspicious)
```bash
GET http://localhost:9400/audit/stale?maxAgeMinutes=60
```

## Phases

| Phase | Mode | Capabilities |
|-------|------|-------------|
| **1 (current)** | Read-only | Audit all reads. Write actions blocked. |
| **2** | Read + Write | Audit all actions. Writes enabled with trail. |
| **3** | Reviewer | Sub-agent challenges reasoning before execution. |

## File Structure

```
action-service/
├── .vault/              # Encrypted tokens (gitignored, never committed)
├── src/
│   ├── index.js         # HTTP server (Hono)
│   ├── token-vault.js   # Encrypted credential storage
│   ├── executor.js       # Platform action execution
│   ├── audit.js          # Audit DB layer (Neon)
│   └── setup-tokens.js  # Interactive token setup CLI
├── package.json
└── README.md
```

## Security

- `.vault/` directory is 700 permissions, files are 600
- Tokens encrypted with AES-256-GCM (scrypt key derivation)
- Passphrase required at startup (env var, not stored)
- Admin key protects token management endpoints
- Audit trail is immutable (append-only to Neon DB)
- Read-only mode prevents accidental writes in Phase 1

## Per-Agent Setup

Each agent runs their own instance with their own tokens:
- **Nymeria's instance:** holds Nymeria's Meta + Google Ads credentials
- **Ygritte's instance:** holds Ygritte's Meta + Google Ads credentials
- **Shared:** Both write to the same FF Neon audit table
