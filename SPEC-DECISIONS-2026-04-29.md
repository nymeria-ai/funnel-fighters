# Funnel Fighters — Spec Decisions (2026-04-29)

Approved by Guy in Marketing X1000 group chat.
Reviewed by: Ygritte + Nymera

## Schema Changes

1. **Channel-agnostic tables** — Add `channel` column (e.g. 'google', 'meta', 'linkedin') to accounts, campaigns, ad_groups, ads
2. **ad_extension table** — Replaces selling_points + relevance_scores. Fields: ad_id (FK), channel_ad_score, internal_score, selling_point, selling_point_hash, lp_relevance_score, relevance_reason, computed_at
3. **landing_page_extension table** — Fields: url (FK), selling_point, google_lp_score, performance_score, content_summary, computed_at
4. **Cost normalization** — DECIMAL(15,6) in dollars. Normalize all channels before insert.
5. **Settings table** — Configurable: LLM model, cron time, retention period, alert channels. Expose in UI as a Settings section.
6. **Queries/prompts table** — Stores both BigBrain SQL queries AND LLM prompts. Fields: id, type (query/prompt), content, description, version, status (unverified/verified/disabled), created_at, approved_by, approved_at. Initial prompts can default to verified. Runtime pulls from this table — never hardcoded.

## Pipeline (Daily 06:30 IL / 03:30 UTC)

7. **Failure strategy** — Full stop on failure + WhatsApp alert to Marketing X1000 group. NO partial data.
8. **Selling point recomputation** — Hash-based. Hash(headlines + descriptions) → only recompute when hash changes.
9. **Insights generation** — LLM (Opus 4.7, configurable in settings) generates insights with headline + short description + impact. Expandable detail on click. Dismiss (X) or Apply button.
10. **Apply action (v1)** — Creates a monday.com task with the recommendation. No live ad modifications until write permissions are added (future phase).

## BigBrain Sync

11. **Trigger** — Ygritte runs cron → calls Funnel Fighters server → pulls list of verified queries → executes against BigBrain/Kremer → POSTs results back to sync API. Server validates completion via separate validation cron.
12. **Query security** — Server signs query payloads so Ygritte can verify authenticity.
13. **Retry** — If first attempt fails, retry after 15 min. If still fails, show last-known-good data with "stale" badge.
14. **Non-ad BigBrain data** (signups, conversions, non-direct effects) — **Phase 2**. Not in current scope.

## Operations

15. **Data retention** — 180 days raw daily metrics, monthly rollup kept forever.
16. **Alerts** — WhatsApp (Marketing X1000 group) for pipeline failures.
17. **Stale data UX** — If sync fails, show last-known-good data with "stale" timestamp badge.

## Cockpit

18. **All data from tables** — Kill live API fallback. DB is single source of truth.
19. **Sync status indicator** — Show last update timestamp. Click to expand per-table sync breakdown.

## Cleanup

20. **Start from scratch** — No data migration scripts. Clean schema from zero.
21. **Strip dead code** — Remove unused mock data, legacy sections, junk from early stage.

## Work Procedure

22. **Code PRs** — Nymera approves
23. **Data structure + query PRs** — Guy + Nymera approve
24. **New BigBrain queries** — Guy approves, verified in queries table + UI before use
25. **LLM prompt changes** — Same approval gate as queries (stored in queries table with status)
