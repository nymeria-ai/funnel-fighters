# UK POC Execution Scripts

## Overview
Pre-validated SQL queries and execution notes for the UK DEP Optimization POC.
All queries stress-tested on 2026-05-24 (iteration 4) — confirmed non-zero results.

## Execution Order
```
PARALLEL PHASE:
├── Ygritte: 01-dep-scorecard.sql (BigBrain)
├── Ygritte: 02-google-ads-dep-crossref.sql (BigBrain + Google Ads API)
├── Ygritte: 03-lp-dep-quality.sql (BigBrain — shared with Nymera)
├── Nymera: Meta API creative pull (her scripts)
└── Nymera: YouTube audience segments (Google Ads API)

SEQUENTIAL (after parallel):
└── Shared: Budget recommendations (merge all outputs)
```

## Report Structure (v3 final)
```
UK POC Analysis — May 25, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
0. Data Freshness & Confidence Key (🟢🟡🔴)
1. Executive Summary (5 bullets max)
2. DEP Scorecard by Product [WM | CRM | Dev] (🟢)
3. Google Search Deep Dive (🟢)
4. Meta Creative Health (🟡)
5. Landing Page Quality (🟢)
6. YouTube Audience Tiers (🟡)
7. Budget Recommendations (constrained by #3 + #4)
8. Approval Checklist (P1/P2/P3 prioritized)
9. Known Blind Spots
```

## Approval Flow
- Report published as single URL (GitHub or md.page)
- Each recommendation marked: 🔥 P1 / ⚡ P2 / 📋 P3
- Guy approves via WhatsApp: "approve all P1s" or specific items
- Execution split: Ygritte (Google), Nymera (Meta/YouTube), Ido's team (LP changes)

## Validated Parameters
- Country filter: `COUNTRY IN ('GB', 'UK', 'United Kingdom')` (99.7% is GB)
- Product values: `work_management`, `crm`, `dev`, `service`, `workos`
- Performance filter: `BUSINESS_GOAL_DTR = 'performance_marketing'` (98% of spend)
- Type values: LOWERCASE (`'attribution'`, `'adn_data'`)
- Internal filter: `IS_INTERNAL_ACCOUNT_ID = FALSE`
- Total UK spend (30d): ~$1.4M across 150 campaigns
- Keyword coverage: 60% of attribution rows have KEYWORD populated
- LP coverage: clean paths (`monday.com/lp/...`), no UTM noise
- NULL PRODUCT_DTR: ~29% — include as "Untagged" section
