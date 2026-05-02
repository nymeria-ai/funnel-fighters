# Funnel Fighters Sync Scripts

Data sync pipeline scripts that pull from ad platforms and push to the Funnel Fighters API.

## Schedule

| Job | Schedule | Mode | Lookback |
|-----|----------|------|----------|
| Daily sync | 03:30 UTC every day | `daily` | 3 days |
| Weekly backfill | 04:00 UTC every Saturday | `weekly` | 30 days |

## Scripts

- **`run-daily-sync.sh`** — Daily wrapper: Google Ads + Meta Ads (3 days) + pipeline triggers
- **`run-weekly-sync.sh`** — Weekly wrapper: Google Ads + Meta Ads (30 days) + pipeline triggers
- **`pull-google-ads-v3.js`** — Google Ads API sync with streaming pagination
- **`pull-meta-ads.js`** — Meta Marketing API sync with weekly date chunking + pagination
- **`sync-bigbrain.py`** — BigBrain/Kremer funnel data sync
- **`daily-sync-pipeline.sh`** — Legacy pipeline trigger script

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_SYNC_SECRET` | ✅ | Auth token for FF sync API |
| `FF_BASE_URL` | ❌ | FF server URL (default: `https://funnel-fighters.vercel.app`) |
| `SYNC_MODE` | ❌ | `daily` (3 days) or `weekly` (30 days). Default: `daily` |
| `SECRETS_DIR` | ❌ | Path to secrets directory (default: `/opt/ocana/openclaw/.secrets`) |
| `META_ADS_TOKEN_FILE` | ❌ | Path to Meta ads token file |
| `SYNC_GLOBAL_TIMEOUT_MS` | ❌ | Global timeout in ms (default: 25 min daily, 60 min weekly) |

## Meta Ads Chunking

The Meta script chunks 30-day date ranges into 7-day windows to avoid Meta's "reduce data amount" API error (error 500). Each chunk is further paginated with cursor-based navigation.

## Google Ads Modes

- **Daily mode**: Only pulls metrics (ads metadata already in DB)
- **Weekly mode**: Full refresh including ads metadata, campaigns, ad groups
