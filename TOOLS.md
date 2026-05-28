# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

## ⚠️ Funnel Gate — MANDATORY for Platform API Access

**All Google Ads, Meta Ads, and YouTube Ads API calls MUST go through Funnel Gate.**

Service: `http://localhost:9400`
- `POST /execute` — run any platform action (tokens are inside, never exposed)
- `GET /token/list` — check what credentials are stored
- `GET /audit/log` — query audit trail
- `GET /audit/dashboard` — HTML dashboard with search/filter

**DO NOT:**
- Access `.secrets/google-ads-*` or `.secrets/meta-ads-*` files (deleted)
- Call `googleads.googleapis.com` or `graph.facebook.com` directly
- Store tokens in plaintext anywhere
- Ask Guy for OAuth credentials — tokens are in the vault

**Example (MUST use wrapper):**
```bash
python3 ~/funnel-fighters/action-service/funnel_gate.py '{
  "requester":"nymeria",
  "action":"get_insights",
  "platform":"meta",
  "scope":{...},
  "trail":{"reasoning":"..."},
  "skill_name":"...",
  "initiator":{"name":"Guy","context":"DM whatsapp"}
}'
```

⚠️ **`initiator` is MANDATORY** — always include who/what triggered the action and from where.

⚠️ **NEVER call localhost:9400/execute directly.** The wrapper sends audit notifications to the WhatsApp group automatically. Direct calls = broken audit pipeline.

---

## md.page — Authenticated Publishing

- **API Key:** stored in `.secrets/mdpage-api-key.md` (starts with `mdp_`)
- **Subdomain:** `diego-malamute-1.md.page`
- **Always use authenticated API** (`POST /api/pages` with Bearer token) for permanent URLs
- **Page limit:** 10 — check/delete stale pages before creating new ones
- **Never use anonymous `POST /api/publish`** unless auth is broken

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 📊 GA4 (Google Analytics 4) Access

- **Token file:** `.secrets/ga4-token.json` (OAuth2 with refresh token)
- **Scope:** `analytics.readonly`
- **Account:** dapulse LTD (27333868)
- **Key properties:**
  - `properties/403390805` — **Monday Main - GA4** (primary website analytics)
  - `properties/446626355` — Monday Main - GA4 - Server (server-side)
  - `properties/304797524` — Digital-Lift - GA4
  - `properties/311910299` — Monday-u.com - GA4
- **How to use:** Call GA4 Data API v1beta with Bearer token from the token file
  - List properties: `GET https://analyticsadmin.googleapis.com/v1beta/accountSummaries`
  - Run report: `POST https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}:runReport`
- **Token refresh:** Use client credentials from `.secrets/gsc-oauth-credentials.json` (project: `agentic-marketing-491712`, client ID: `233078300872-p4nu0nqd2he70vi9rpe5esgjckviktt0`)
- **Refresh command:**
  ```bash
  REFRESH_TOKEN=$(python3 -c "import json; print(json.load(open('$HOME/.openclaw/workspace/.secrets/ga4-token.json'))['refresh_token'])")
  CLIENT_ID="233078300872-p4nu0nqd2he70vi9rpe5esgjckviktt0.apps.googleusercontent.com"
  CLIENT_SECRET=$(python3 -c "import json; print(json.load(open('$HOME/.openclaw/workspace/.secrets/gsc-oauth-credentials.json'))['installed']['client_secret'])")
  curl -s -X POST "https://oauth2.googleapis.com/token" -d "client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET&refresh_token=$REFRESH_TOKEN&grant_type=refresh_token"
  ```
- **Note:** Token expires after ~1hr. Refresh before use if needed.

---

## 🌐 Browser — ALWAYS Use `nymeria` Profile

**NEVER use the managed `openclaw` browser.** Always use `profile="nymeria"` (CDP port 9222).
- Start it: `browser action=start profile=nymeria`
- This is a persistent Chrome profile with saved sessions (Lemlist, Clay, Google, etc.)
- The `openclaw` profile is ephemeral (like incognito) — sessions are lost every time
- The `user` profile requires Guy's Chrome to be open — don't depend on it

### Lemlist UI Access
- Logged in via nymeria profile (NOT SSO/Okta — it's regular email/password login)
- Can manage campaigns, launch leads, assign senders directly from the UI
- Previous wrong assumption about Okta/SSO was incorrect — Lemlist uses standard auth
