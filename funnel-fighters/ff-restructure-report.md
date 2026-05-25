# GB Restructure Forensic Audit — YouTube & Meta Ads
**Analysis Period:** May 2024 – May 2026 (2 years)
**Generated:** 2026-05-25 16:54
**North Star Metric:** DEP_7 (proxied by `conversions_value` / `purchase action_values`)

---

## 1. Executive Summary

- **Total YouTube spend:** £4,316,948 | DEP: 475,321 | Overall DEP/Spend: 0.11 | Non-brand DEP/Spend: 0.10
- **Total Meta spend:** £6,808,612 | DEP: 18,835 | Overall DEP/Spend: 0.0028 | Non-brand DEP/Spend: 0.0028
- **Combined GB spend:** £11,125,561 | Combined DEP: 494,156
- **YouTube campaigns:** 53 (12 brand, 41 non-brand) | **Meta campaigns:** 12 (0 brand, 12 non-brand)
- **Critical finding:** Meta DEP values are extremely low (appears to be fraction/normalized values, not £ amounts). YouTube conversions_value appears to be raw count-based. Cross-channel DEP/Spend comparison requires caution — the DEP proxy differs in scale between platforms.

---

## 2. YouTube — Full Campaign Audit

### 2.1 All Campaigns Overview (sorted by spend)

| # | Campaign | Status | Bid Strategy | Spend £ | DEP | DEP/Spend | Conv | Months Active | Brand? |
|---|----------|--------|-------------|---------|-----|-----------|------|---------------|--------|
| 1 | `gb-en-prm-work_mgmt-desktop-ron-v` | REMOVED | TARGET_CPA | 607,468 | 250,500 | 0.41 | 2,505 | 12 |  |
| 2 | `gb-en-prm-work_mgmt-desktop-ron_regular-dg` | PAUSED | TARGET_CPA | 483,070 | 1,298 | 0.00 | 1,298 | 11 |  |
| 3 | `gb-en-prm-work_mgmt-desktop-demandgen-v` | ENABLED | TARGET_CPA | 329,289 | 13,458 | 0.04 | 1,506 | 11 |  |
| 4 | `gb-en-prm-workos-crm-desktop-verticals-v` | REMOVED | TARGET_CPA | 256,181 | 12,360 | 0.05 | 1,236 | 13 |  |
| 5 | `gb-en-prm-workos-work_mgmt-desktop-topics-v` | REMOVED | TARGET_CPA | 236,110 | 11,690 | 0.05 | 1,169 | 14 |  |
| 6 | `gb-en-prm-work_mgmt-desktop-employment-v` | REMOVED | TARGET_CPA | 212,289 | 81,300 | 0.38 | 813 | 6 |  |
| 7 | `gb-en-prm-work_mgmt-desktop-employment-dg` | PAUSED | TARGET_CPA | 195,860 | 905 | 0.00 | 905 | 9 |  |
| 8 | `gb-en-prm-crm-desktop-main2-dg` | PAUSED | TARGET_CPA | 179,418 | 4,439 | 0.02 | 444 | 4 |  |
| 9 | `gb-en-prm-workos-crm-desktop-trgt-dg` | PAUSED | TARGET_CPA | 169,099 | 4,285 | 0.03 | 429 | 8 |  |
| 10 | `gb-en-prm-crm-desktop-ron-dg` | PAUSED | TARGET_CPA | 167,583 | 4,526 | 0.03 | 453 | 5 |  |
| 11 | `gb-en-prm-service-desktop-competitors-dg` | PAUSED | TARGET_CPA | 144,875 | 607 | 0.00 | 607 | 5 |  |
| 12 | `gb-en-prm-work_mgmt-desktop-topics-dg` | ENABLED | TARGET_CPA | 125,751 | 728 | 0.01 | 728 | 12 |  |
| 13 | `gb-en-prm-work_mgmt-desktop-ron_instream-dg` | PAUSED | TARGET_CPA | 122,877 | 329 | 0.00 | 329 | 4 |  |
| 14 | `gb-en-prm-work_mgmt-desktop-personas-dg` | ENABLED | TARGET_CPA | 98,556 | 592 | 0.01 | 592 | 5 |  |
| 15 | `gb-en-prm-service-desktop-trgt-dg` | PAUSED | TARGET_CPA | 93,193 | 220 | 0.00 | 220 | 5 |  |
| 16 | `gb-en-prm-workos-crm-desktop-competitors-dg` | PAUSED | TARGET_CPA | 78,937 | 1,340 | 0.02 | 134 | 5 |  |
| 17 | `gb-en-prm-work_mgmt-desktop-lookalike-dg` | ENABLED | TARGET_CPA | 72,441 | 401 | 0.01 | 401 | 5 |  |
| 18 | `gb-en-prm-workos-work_mgmt-desktop-employment-v` | REMOVED | TARGET_CPA | 56,281 | 10,100 | 0.18 | 101 | 3 |  |
| 19 | `gb-en-prm-crm-desktop-main3-dg` | ENABLED | TARGET_CPA | 54,393 | 1,031 | 0.02 | 103 | 2 |  |
| 20 | `gb-en-prm-crm-desktop-ron1-dg` | PAUSED | TARGET_CPA | 48,528 | 1,408 | 0.03 | 141 | 4 |  |
| 21 | `gb-en-prm-service-desktop-trgt1-dg` | PAUSED | TARGET_CPA | 44,854 | 247 | 0.01 | 247 | 2 |  |
| 22 | `gb-en-brand-multi-ctv-expanded-t-regional_awareness_uk_25q1` | PAUSED | TARGET_CPM | 41,310 | 870 | 0.02 | 87 | 2 | ✅ |
| 23 | `gb-en-brand-work_mgmt-multi-trgt-t-cpv-regional_awareness-uk-25q4` | PAUSED | TARGET_CPV | 40,559 | 5,309 | 0.13 | 5,309 | 2 | ✅ |
| 24 | `gb-en-brand-work_mgmt-multi-trgt-t-cpm-regional_awareness-uk-25q4` | PAUSED | TARGET_CPM | 37,777 | 2,195 | 0.06 | 2,195 | 2 | ✅ |
| 25 | `gb-en-prm-crm-desktop-lookalike-dg` | PAUSED | TARGET_CPA | 37,333 | 1,130 | 0.03 | 113 | 8 |  |
| 26 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday-v` | REMOVED | TARGET_CPA | 36,709 | 1,660 | 0.05 | 166 | 9 |  |
| 27 | `gb-en-brand-multi-desktop-expanded-t-regional_awareness_uk_25q1` | PAUSED | TARGET_CPM | 33,086 | 14,020 | 0.42 | 1,402 | 2 | ✅ |
| 28 | `gb-en-prm-workos-work_mgmt-desktop-topics_productivity-v` | REMOVED | TARGET_CPA | 28,562 | 870 | 0.03 | 87 | 3 |  |
| 29 | `gb-en-brand-work_mgmt-desktop-expanded-t-regional_awareness_london_24q4` | PAUSED | TARGET_CPM | 24,731 | 1,509 | 0.06 | 151 | 2 | ✅ |
| 30 | `gb-en-brand-multi-mobile-expanded-t-regional_awareness_uk_25q1` | PAUSED | TARGET_CPM | 22,615 | 34,550 | 1.53 | 3,455 | 2 | ✅ |
| 31 | `gb-en-prm-workos-work_mgmt-desktop-topics_freqcap-v` | REMOVED | TARGET_CPA | 20,967 | 1,260 | 0.06 | 126 | 3 |  |
| 32 | `gb-en-prm-work_mgmt-desktop-inmarket-dg` | PAUSED | TARGET_CPA | 20,641 | 100 | 0.00 | 100 | 2 |  |
| 33 | `gb-en-brand-work_mgmt-mobile-expanded-t-regional_awareness_london_24q4` | PAUSED | TARGET_CPM | 18,998 | 1,040 | 0.05 | 104 | 2 | ✅ |
| 34 | `gb-en-prm-crm-desktop-broad-dg` | PAUSED | TARGET_CPA | 18,787 | 250 | 0.01 | 25 | 1 |  |
| 35 | `gb-en-brand-work_mgmt-multi-trgt-t-cpm-bumper-regional_awareness-uk-25q4` | PAUSED | TARGET_CPM | 18,622 | 393 | 0.02 | 393 | 2 | ✅ |
| 36 | `gb-en-prm-workos-crm-desktop-topics_cpm-t` | PAUSED | TARGET_CPM | 18,395 | 280 | 0.02 | 28 | 8 |  |
| 37 | `gb-en-prm-work_mgmt-desktop-competitors-dg` | PAUSED | TARGET_CPA | 15,135 | 33 | 0.00 | 33 | 2 |  |
| 38 | `gb-en-prm-work_mgmt-desktop-new_topics-v` | REMOVED | TARGET_CPA | 13,587 | 3,400 | 0.25 | 34 | 3 |  |
| 39 | `gb-en-prm-workos-crm-ctv-trgt-dg` | PAUSED | TARGET_CPA | 12,623 | 128 | 0.01 | 29 | 5 |  |
| 40 | `gb-en-prm-work_mgmt-desktop-topics-t` | PAUSED | TARGET_CPM | 12,406 | 25 | 0.00 | 25 | 2 |  |
| 41 | `gb-en-brand-work_mgmt-desktop-expanded-t-360_uk_24q4` | PAUSED | TARGET_CPM | 11,499 | 570 | 0.05 | 57 | 2 | ✅ |
| 42 | `gb-en-prm-crm-desktop-main-dg` | PAUSED | TARGET_CPA | 8,972 | 231 | 0.03 | 23 | 1 |  |
| 43 | `gb-en-prm-work_mgmt-desktop-inmarket-v` | REMOVED | TARGET_CPA | 8,065 | 1,100 | 0.14 | 11 | 3 |  |
| 44 | `gb-en-brand-work_mgmt-mobile-expanded-t-360_uk_24q4` | PAUSED | TARGET_CPM | 6,822 | 470 | 0.07 | 47 | 2 | ✅ |
| 45 | `gb-en-prm-workos-work_mgmt-desktop-sqa-v` | REMOVED | TARGET_CPA | 5,934 | 260 | 0.04 | 26 | 3 |  |
| 46 | `gb-en-brand-work_mgmt-mobile-core-t-regional_awareness_london_24q4` | PAUSED | TARGET_CPM | 4,078 | 120 | 0.03 | 12 | 2 | ✅ |
| 47 | `gb-en-prm-work_mgmt-desktop-agents_contextual-dg` | ENABLED | TARGET_CPA | 3,997 | 15 | 0.00 | 15 | 1 |  |
| 48 | `gb-en-prm-work_mgmt-desktop-agents_audience-dg` | ENABLED | TARGET_CPA | 3,935 | 17 | 0.00 | 17 | 1 |  |
| 49 | `gb-en-prm-work_mgmt-desktop-topics_new-dg` | ENABLED | TARGET_CPA | 3,053 | 12 | 0.00 | 12 | 1 |  |
| 50 | `gb-en-prm-crm-desktop-lookalike1-dg` | PAUSED | TARGET_CPA | 2,998 | 19 | 0.01 | 19 | 1 |  |
| 51 | `gb-en-brand-multi-mobile-expanded_shorts-t-regional_awareness_uk_25q1` | PAUSED | TARGET_CPM | 2,799 | 1,610 | 0.58 | 161 | 1 | ✅ |
| 52 | `gb-en-prm-workos-work_mgmt-desktop-pm_dlu-v` | REMOVED | TARGET_CPA | 2,613 | 70 | 0.03 | 7 | 2 |  |
| 53 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday_freqcap-v` | REMOVED | TARGET_CPA | 2,288 | 40 | 0.02 | 4 | 1 |  |

### 2.2 Non-Brand Campaign Efficiency Ranking

| Rank | Campaign | Spend £ | DEP | DEP/Spend | CPC £ | CTR | Status |
|------|----------|---------|-----|-----------|-------|-----|--------|
| 1 | `gb-en-prm-work_mgmt-desktop-ron-v` | 607,468 | 250,500 | 0.41 | 4.19 | 0.108% | REMOVED |
| 2 | `gb-en-prm-work_mgmt-desktop-employment-v` | 212,289 | 81,300 | 0.38 | 6.24 | 0.146% | REMOVED |
| 3 | `gb-en-prm-work_mgmt-desktop-new_topics-v` | 13,587 | 3,400 | 0.25 | 14.09 | 0.096% | REMOVED |
| 4 | `gb-en-prm-workos-work_mgmt-desktop-employment-v` | 56,281 | 10,100 | 0.18 | 16.82 | 0.078% | REMOVED |
| 5 | `gb-en-prm-work_mgmt-desktop-inmarket-v` | 8,065 | 1,100 | 0.14 | 20.11 | 0.102% | REMOVED |
| 6 | `gb-en-prm-workos-work_mgmt-desktop-topics_freqcap-v` | 20,967 | 1,260 | 0.06 | 137.04 | 0.110% | REMOVED |
| 7 | `gb-en-prm-workos-work_mgmt-desktop-topics-v` | 236,110 | 11,690 | 0.05 | 59.61 | 0.195% | REMOVED |
| 8 | `gb-en-prm-workos-crm-desktop-verticals-v` | 256,181 | 12,360 | 0.05 | 33.55 | 0.116% | REMOVED |
| 9 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday-v` | 36,709 | 1,660 | 0.05 | 52.22 | 0.104% | REMOVED |
| 10 | `gb-en-prm-workos-work_mgmt-desktop-sqa-v` | 5,934 | 260 | 0.04 | 88.56 | 0.057% | REMOVED |
| 11 | `gb-en-prm-work_mgmt-desktop-demandgen-v` | 329,289 | 13,458 | 0.04 | 13.45 | 0.120% | ENABLED |
| 12 | `gb-en-prm-workos-work_mgmt-desktop-topics_productivity-v` | 28,562 | 870 | 0.03 | 26.57 | 0.123% | REMOVED |
| 13 | `gb-en-prm-crm-desktop-lookalike-dg` | 37,333 | 1,130 | 0.03 | 9.52 | 0.136% | PAUSED |
| 14 | `gb-en-prm-crm-desktop-ron1-dg` | 48,528 | 1,408 | 0.03 | 8.80 | 0.150% | PAUSED |
| 15 | `gb-en-prm-crm-desktop-ron-dg` | 167,583 | 4,526 | 0.03 | 6.24 | 0.110% | PAUSED |
| 16 | `gb-en-prm-workos-work_mgmt-desktop-pm_dlu-v` | 2,613 | 70 | 0.03 | 23.54 | 0.123% | REMOVED |
| 17 | `gb-en-prm-crm-desktop-main-dg` | 8,972 | 231 | 0.03 | 5.99 | 0.182% | PAUSED |
| 18 | `gb-en-prm-workos-crm-desktop-trgt-dg` | 169,099 | 4,285 | 0.03 | 15.81 | 0.159% | PAUSED |
| 19 | `gb-en-prm-crm-desktop-main2-dg` | 179,418 | 4,439 | 0.02 | 5.09 | 0.226% | PAUSED |
| 20 | `gb-en-prm-crm-desktop-main3-dg` | 54,393 | 1,031 | 0.02 | 4.06 | 0.274% | ENABLED |
| 21 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday_freqcap-v` | 2,288 | 40 | 0.02 | 95.33 | 0.083% | REMOVED |
| 22 | `gb-en-prm-workos-crm-desktop-competitors-dg` | 78,937 | 1,340 | 0.02 | 12.55 | 0.146% | PAUSED |
| 23 | `gb-en-prm-workos-crm-desktop-topics_cpm-t` | 18,395 | 280 | 0.02 | 68.38 | 0.107% | PAUSED |
| 24 | `gb-en-prm-crm-desktop-broad-dg` | 18,787 | 250 | 0.01 | 4.54 | 0.180% | PAUSED |
| 25 | `gb-en-prm-workos-crm-ctv-trgt-dg` | 12,623 | 128 | 0.01 | 31.09 | 0.042% | PAUSED |
| 26 | `gb-en-prm-crm-desktop-lookalike1-dg` | 2,998 | 19 | 0.01 | 11.85 | 0.119% | PAUSED |
| 27 | `gb-en-prm-work_mgmt-desktop-personas-dg` | 98,556 | 592 | 0.01 | 9.17 | 0.155% | ENABLED |
| 28 | `gb-en-prm-work_mgmt-desktop-topics-dg` | 125,751 | 728 | 0.01 | 14.00 | 0.289% | ENABLED |
| 29 | `gb-en-prm-work_mgmt-desktop-lookalike-dg` | 72,441 | 401 | 0.01 | 4.65 | 0.160% | ENABLED |
| 30 | `gb-en-prm-service-desktop-trgt1-dg` | 44,854 | 247 | 0.01 | 8.70 | 0.088% | PAUSED |
| 31 | `gb-en-prm-work_mgmt-desktop-inmarket-dg` | 20,641 | 100 | 0.00 | 9.45 | 0.139% | PAUSED |
| 32 | `gb-en-prm-work_mgmt-desktop-employment-dg` | 195,860 | 905 | 0.00 | 5.48 | 0.171% | PAUSED |
| 33 | `gb-en-prm-work_mgmt-desktop-agents_audience-dg` | 3,935 | 17 | 0.00 | 7.34 | 0.226% | ENABLED |
| 34 | `gb-en-prm-service-desktop-competitors-dg` | 144,875 | 607 | 0.00 | 10.61 | 0.087% | PAUSED |
| 35 | `gb-en-prm-work_mgmt-desktop-topics_new-dg` | 3,053 | 12 | 0.00 | 8.46 | 0.366% | ENABLED |
| 36 | `gb-en-prm-work_mgmt-desktop-agents_contextual-dg` | 3,997 | 15 | 0.00 | 9.17 | 0.336% | ENABLED |
| 37 | `gb-en-prm-work_mgmt-desktop-ron_regular-dg` | 483,070 | 1,298 | 0.00 | 6.40 | 0.105% | PAUSED |
| 38 | `gb-en-prm-work_mgmt-desktop-ron_instream-dg` | 122,877 | 329 | 0.00 | 7.92 | 0.114% | PAUSED |
| 39 | `gb-en-prm-service-desktop-trgt-dg` | 93,193 | 220 | 0.00 | 14.61 | 0.121% | PAUSED |
| 40 | `gb-en-prm-work_mgmt-desktop-competitors-dg` | 15,135 | 33 | 0.00 | 12.17 | 0.108% | PAUSED |
| 41 | `gb-en-prm-work_mgmt-desktop-topics-t` | 12,406 | 25 | 0.00 | 43.68 | 0.067% | PAUSED |

### 2.3 Individual Campaign Audits (YouTube)

#### Campaign: `gb-en-prm-work_mgmt-desktop-ron-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £607,468 | **DEP:** 250,500 | **DEP/Spend:** 0.41
- **Impressions:** 134,527,179 | **Clicks:** 145,075 | **Conversions:** 2,505
- **All Conversions Value:** 4,073,508 | **All Conversions:** 497,122
- **Active Months:** 12 (2024-05-01 → 2025-04-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 2,596 | 800 | 0.31 | 566,858 | 416 | 8 |
| 2024-06-01 | 4,087 | 1,000 | 0.24 | 661,256 | 470 | 10 |
| 2024-07-01 | 37,815 | 13,400 | 0.35 | 4,989,145 | 4,628 | 134 |
| 2024-08-01 | 46,002 | 26,000 | 0.57 | 12,906,677 | 11,965 | 260 |
| 2024-09-01 | 51,785 | 22,200 | 0.43 | 9,400,166 | 8,211 | 222 |
| 2024-10-01 | 55,514 | 18,400 | 0.33 | 23,425,323 | 22,273 | 184 |
| 2024-11-01 | 56,526 | 18,500 | 0.33 | 13,986,618 | 13,618 | 185 |
| 2024-12-01 | 50,870 | 23,200 | 0.46 | 10,860,950 | 11,226 | 232 |
| 2025-01-01 | 79,528 | 37,900 | 0.48 | 11,313,160 | 12,040 | 379 |
| 2025-02-01 | 53,232 | 26,800 | 0.50 | 10,857,604 | 14,769 | 268 |
| 2025-03-01 | 137,346 | 50,800 | 0.37 | 27,139,969 | 34,181 | 508 |
| 2025-04-01 | 32,167 | 11,500 | 0.36 | 8,419,453 | 11,278 | 115 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | ENABLED | 607,468 | 250,500 | 0.41 | 134,527,179 | 26.5 | 17.1 | 13.9 | 11.8 | 36% | 31% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 723034279379 | ENABLED | 247,748 | 109,200 | 0.44 | 18,700,121 | 31.3 | 19.0 | 15.3 | 13.2 | 39% | 31% |
| `PD_ArtOfWork_Customize` | 704564166193 | PAUSED | 157,212 | 67,700 | 0.43 | 16,267,661 | 18.7 | 12.7 | 10.1 | 8.2 | 32% | 36% |
| `PD_WorkOS_21sec` | 700015704635 | PAUSED | 55,067 | 18,600 | 0.34 | 45,791,194 | 30.7 | 16.1 | 13.1 | 11.4 | 48% | 29% |
| `PD_WorkOS_Long` | 700015704683 | PAUSED | 52,200 | 16,100 | 0.31 | 43,435,081 | 13.9 | 9.7 | 8.2 | 7.2 | 30% | 26% |
| `CR_MakesSense_Long` | 723034279424 | PAUSED | 28,616 | 14,200 | 0.50 | 2,131,544 | 28.3 | 20.1 | 16.9 | 14.6 | 29% | 27% |
| `PD_TikToker_HackW` | 701554801414 | PAUSED | 26,664 | 7,300 | 0.27 | 2,579,702 | 29.4 | 19.0 | 15.7 | 13.5 | 35% | 29% |
| `PD_TikToker_GoodNewsW` | 701554802332 | PAUSED | 7,397 | 2,600 | 0.35 | 669,822 | 31.9 | 21.9 | 18.3 | 15.9 | 32% | 28% |
| `PD_Linear_Actress` | 700015704692 | PAUSED | 6,876 | 3,000 | 0.44 | 634,000 | 33.2 | 24.5 | 20.5 | 18.0 | 26% | 27% |
| `PD_TikToker_HackM` | 701554802386 | PAUSED | 4,372 | 2,800 | 0.64 | 586,990 | 22.1 | 14.0 | 11.5 | 9.7 | 37% | 30% |
| `PD_ArtOfWork_Flexibility` | 704564166889 | PAUSED | 4,297 | 2,300 | 0.54 | 405,806 | 31.5 | 23.3 | 19.5 | 16.7 | 26% | 28% |
| `PD_Reports_woman` | 706690849818 | PAUSED | 4,247 | 1,900 | 0.45 | 579,998 | 19.0 | 12.4 | 10.2 | 8.6 | 35% | 30% |
| `AT_Shmuel_NewSplit` | 700168357171 | PAUSED | 1,843 | 500 | 0.27 | 268,419 | 41.2 | 26.0 | 21.2 | 18.3 | 37% | 30% |
| `AT_NYwoman_Short` | 729134252156 | PAUSED | 1,746 | 1,100 | 0.63 | 261,966 | 41.8 | 25.5 | 21.1 | 18.7 | 39% | 27% |
| `AT_NYwoman_NotKnowing` | 729134252537 | PAUSED | 1,692 | 900 | 0.53 | 403,279 | 29.5 | 18.7 | 15.2 | 13.3 | 37% | 29% |
| `PD_Linear_Group` | 700015704620 | PAUSED | 1,390 | 400 | 0.29 | 186,171 | 33.9 | 25.4 | 21.4 | 18.8 | 25% | 26% |
| `PD_TikToker_GoodNewsM` | 701554801873 | PAUSED | 1,279 | 400 | 0.31 | 283,806 | 21.0 | 13.6 | 10.6 | 8.9 | 35% | 34% |
| `PD_YesBut_GoodAtWW` | 700015704668 | PAUSED | 613 | 400 | 0.65 | 452,152 | 40.1 | 31.5 | 27.6 | 24.5 | 21% | 22% |
| `UT_SOH_Flexibility` | 700015704602 | PAUSED | 578 | 300 | 0.52 | 52,990 | 33.0 | 21.3 | 17.6 | 15.1 | 35% | 29% |
| `EfficiencyProductDemoTeams` | 700015704698 | PAUSED | 429 | 0 | 0.00 | 52,189 | 44.1 | 33.9 | 29.7 | 26.9 | 23% | 21% |
| `AT_NYwoman_Manager` | 729134252078 | PAUSED | 395 | 0 | 0.00 | 76,685 | 30.0 | 19.3 | 15.8 | 13.8 | 36% | 29% |
| `PD_YesBut_DeliverWW` | 700015704689 | PAUSED | 346 | 200 | 0.58 | 97,171 | 34.1 | 26.7 | 22.2 | 19.6 | 22% | 26% |
| `AT_Shmuel_NewRegular` | 700168357345 | PAUSED | 325 | 0 | 0.00 | 54,823 | 42.9 | 25.1 | 20.4 | 17.9 | 42% | 29% |
| `UT_Frank_Mix` | 700015704674 | PAUSED | 254 | 0 | 0.00 | 80,284 | 39.4 | 28.6 | 24.9 | 22.3 | 27% | 22% |
| `AllConnectedOnePlace` | 700015704665 | PAUSED | 225 | 0 | 0.00 | 85,499 | 41.7 | 32.7 | 29.0 | 27.0 | 21% | 17% |
| `AT_Shmuel_ShortRegular` | 700015704611 | PAUSED | 184 | 100 | 0.54 | 32,317 | 63.6 | 36.4 | 31.2 | 27.5 | 43% | 25% |
| `CR_Confidence_Women_UK` | 730045613969 | ENABLED | 173 | 0 | 0.00 | 37,104 | 28.7 | 18.9 | 15.7 | 13.5 | 34% | 28% |
| `CR_HiGoogie` | 700015704653 | PAUSED | 166 | 0 | 0.00 | 27,147 | 47.2 | 29.6 | 24.7 | 21.9 | 37% | 26% |
| `AT_Crystal_Short` | 727210948723 | PAUSED | 163 | 0 | 0.00 | 31,392 | 75.6 | 31.8 | 24.9 | 21.3 | 58% | 33% |
| `PD_YesBut_GoodAtMW` | 700015704659 | PAUSED | 161 | 0 | 0.00 | 46,855 | 35.1 | 27.5 | 23.8 | 21.5 | 22% | 22% |
| `UT_Frank_Client` | 700015704656 | PAUSED | 145 | 300 | 2.07 | 44,163 | 29.7 | 21.7 | 18.8 | 16.4 | 27% | 24% |
| `AT_Llama_Product` | 732926753452 | PAUSED | 141 | 0 | 0.00 | 15,210 | 23.3 | 15.5 | 13.1 | 11.3 | 33% | 27% |
| `CR_Confidence_Men_UK` | 730045613993 | ENABLED | 133 | 100 | 0.75 | 42,676 | 30.5 | 18.1 | 14.4 | 12.4 | 40% | 31% |
| `AT_Shmuel_ShortSplit` | 700015704644 | PAUSED | 116 | 0 | 0.00 | 22,853 | 62.9 | 34.2 | 28.6 | 24.9 | 46% | 27% |
| `PD_YesBut_DeliverMM` | 700015704623 | PAUSED | 91 | 0 | 0.00 | 38,176 | 28.3 | 21.6 | 18.0 | 15.7 | 24% | 27% |
| `PD_Reports_VO` | 706690849881 | PAUSED | 87 | 0 | 0.00 | 28,931 | 29.6 | 21.2 | 17.7 | 15.8 | 28% | 25% |
| `AT_Crystal_Long` | 727210948531 | PAUSED | 52 | 100 | 1.94 | 11,220 | 34.2 | 20.6 | 17.0 | 15.1 | 40% | 27% |
| `UT_SOH_Collaboration` | 700015704641 | PAUSED | 32 | 0 | 0.00 | 5,220 | 32.1 | 25.1 | 21.0 | 18.9 | 22% | 24% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 607,468 | 250,500 | 0.41 | 134,527,179 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 189,482 | 74,200 | 0.39 |
| geoTargetConstants/1007850 | 17,168 | 8,000 | 0.47 |
| geoTargetConstants/1006524 | 10,474 | 3,300 | 0.32 |
| geoTargetConstants/1006912 | 10,131 | 3,600 | 0.36 |
| geoTargetConstants/1006567 | 5,313 | 2,100 | 0.40 |
| geoTargetConstants/1007336 | 4,857 | 1,400 | 0.29 |
| geoTargetConstants/1006864 | 4,398 | 1,700 | 0.39 |
| geoTargetConstants/1007326 | 4,379 | 1,400 | 0.32 |
| geoTargetConstants/1006656 | 3,936 | 2,300 | 0.58 |
| geoTargetConstants/1006884 | 3,460 | 1,200 | 0.35 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006959 | 1,070 | 0 | 0.00 |
| geoTargetConstants/9226434 | 795 | 0 | 0.00 |
| geoTargetConstants/1007151 | 572 | 0 | 0.00 |
| geoTargetConstants/9197716 | 512 | 0 | 0.00 |
| geoTargetConstants/1006500 | 464 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-ron_regular-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £483,070 | **DEP:** 1,298 | **DEP/Spend:** 0.00
- **Impressions:** 72,007,374 | **Clicks:** 75,491 | **Conversions:** 1,298
- **All Conversions Value:** 1,938,651 | **All Conversions:** 284,520
- **Active Months:** 11 (2025-04-01 → 2026-02-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-04-01 | 32,983 | 126 | 0.00 | 6,659,728 | 6,261 | 126 |
| 2025-05-01 | 57,282 | 176 | 0.00 | 10,576,124 | 12,002 | 176 |
| 2025-06-01 | 58,399 | 155 | 0.00 | 8,538,870 | 8,924 | 155 |
| 2025-07-01 | 62,133 | 137 | 0.00 | 6,074,939 | 6,337 | 137 |
| 2025-08-01 | 81,612 | 203 | 0.00 | 11,414,005 | 11,228 | 203 |
| 2025-09-01 | 55,463 | 149 | 0.00 | 9,141,812 | 9,167 | 149 |
| 2025-10-01 | 30,349 | 86 | 0.00 | 5,772,112 | 5,478 | 86 |
| 2025-11-01 | 26,095 | 65 | 0.00 | 2,448,765 | 2,658 | 65 |
| 2025-12-01 | 15,298 | 37 | 0.00 | 1,372,507 | 1,643 | 37 |
| 2026-01-01 | 42,332 | 108 | 0.00 | 7,197,521 | 8,291 | 108 |
| 2026-02-01 | 21,125 | 56 | 0.00 | 2,810,991 | 3,502 | 56 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | ENABLED | 483,070 | 1,298 | 0.00 | 72,007,374 | 42.1 | 30.6 | 26.6 | 24.1 | 27% | 21% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 744431892896 | PAUSED | 41,603 | 163 | 0.00 | 6,005,228 | 34.4 | 22.3 | 18.5 | 16.1 | 35% | 28% |
| `PD_InShort_AI` | 754334955337 | PAUSED | 35,119 | 71 | 0.00 | 4,358,485 | 28.8 | 20.3 | 16.8 | 14.3 | 30% | 30% |
| `PD_Llama_Angry_Short_NoIntro` | 761006542699 | ENABLED | 24,126 | 73 | 0.00 | 3,761,287 | 47.3 | 33.5 | 29.0 | 26.4 | 29% | 21% |
| `CR_Confidence_Women_UK` | 744431892926 | PAUSED | 22,279 | 42 | 0.00 | 3,663,145 | 41.1 | 28.8 | 24.8 | 22.2 | 30% | 23% |
| `PD_AI_Llama` | 745352523500 | PAUSED | 19,910 | 45 | 0.00 | 2,995,529 | 45.8 | 33.9 | 29.9 | 27.4 | 26% | 19% |
| `PD_Llama_Skeleton_UK` | 761006542741 | ENABLED | 19,591 | 43 | 0.00 | 2,567,099 | 26.5 | 19.2 | 15.8 | 13.6 | 28% | 29% |
| `DL_AI_Llama_Long` | 751463327445 | PAUSED | 19,347 | 47 | 0.00 | 2,509,084 | 39.1 | 31.2 | 27.8 | 25.4 | 20% | 19% |
| `AT_NYwoman_Short` | 744431892893 | PAUSED | 19,147 | 70 | 0.00 | 3,119,778 | 51.3 | 36.2 | 31.8 | 29.2 | 29% | 19% |
| `AT_NYwoman_NotKnowing` | 744431892890 | PAUSED | 18,163 | 56 | 0.00 | 3,300,793 | 44.3 | 33.6 | 29.7 | 27.4 | 24% | 18% |
| `PD_Linear_Actress` | 744431892899 | PAUSED | 17,221 | 63 | 0.00 | 2,433,586 | 29.4 | 21.0 | 17.1 | 14.8 | 29% | 29% |
| `DL_Llama_Long` | 761006542732 | PAUSED | 16,602 | 34 | 0.00 | 2,120,484 | 31.2 | 22.9 | 19.1 | 16.5 | 27% | 28% |
| `PD_Llama_Skeleton` | 761006542696 | PAUSED | 16,109 | 30 | 0.00 | 2,055,654 | 27.2 | 19.7 | 16.1 | 13.8 | 27% | 30% |
| `CR_Confidence_Men_UK` | 744431892923 | PAUSED | 14,069 | 36 | 0.00 | 2,172,146 | 39.4 | 26.4 | 22.6 | 20.4 | 33% | 23% |
| `AT_NYwoman_Manager` | 744431892887 | PAUSED | 13,776 | 37 | 0.00 | 2,157,774 | 43.3 | 33.0 | 29.3 | 27.0 | 24% | 18% |
| `PD_Linear_Group` | 744431892902 | PAUSED | 12,750 | 26 | 0.00 | 1,741,011 | 31.9 | 23.2 | 19.1 | 16.7 | 27% | 28% |
| `DL_Llama_Dashboards_30s` | 761006542729 | PAUSED | 12,189 | 42 | 0.00 | 1,752,058 | 61.8 | 42.9 | 38.0 | 35.2 | 31% | 18% |
| `DL_Llama_47s` | 761006542720 | PAUSED | 10,179 | 23 | 0.00 | 1,568,926 | 55.3 | 45.8 | 42.2 | 39.4 | 17% | 14% |
| `AT_Llama_short` | 761006542717 | PAUSED | 10,078 | 20 | 0.00 | 1,217,527 | 44.0 | 35.7 | 32.1 | 29.7 | 19% | 17% |
| `PD_Reports_woman` | 744431892905 | PAUSED | 9,501 | 25 | 0.00 | 1,388,394 | 48.1 | 38.4 | 34.4 | 32.0 | 20% | 17% |
| `DL_Llama_Angry_Long` | 761006542723 | PAUSED | 8,966 | 20 | 0.00 | 989,561 | 34.5 | 26.6 | 22.6 | 19.7 | 23% | 26% |
| `PD_Llama_Angry` | 761006542702 | PAUSED | 8,939 | 28 | 0.00 | 985,013 | 29.4 | 22.3 | 18.1 | 15.8 | 24% | 29% |
| `DL_Llama_Templates_30s` | 761006542735 | PAUSED | 7,548 | 25 | 0.00 | 1,155,727 | 65.0 | 47.3 | 42.7 | 39.7 | 27% | 16% |
| `AT_W_GameOver` | 791076124722 | ENABLED | 7,475 | 25 | 0.00 | 1,093,688 | 39.8 | 29.8 | 26.1 | 23.7 | 25% | 21% |
| `AT_W_Hear` | 791195441651 | ENABLED | 7,471 | 23 | 0.00 | 1,101,175 | 37.4 | 28.8 | 25.3 | 23.0 | 23% | 20% |
| `PD_WorkOS_21sec` | 744431892917 | PAUSED | 7,134 | 30 | 0.00 | 3,257,236 | 93.4 | 46.6 | 38.9 | 35.2 | 50% | 24% |
| `PD_Llama_Angry_Short` | 761006542738 | PAUSED | 7,001 | 13 | 0.00 | 1,065,638 | 48.9 | 38.4 | 34.7 | 32.3 | 21% | 16% |
| `DL_AI_Llama_Short` | 751463327448 | ENABLED | 6,836 | 25 | 0.00 | 964,530 | 52.7 | 41.4 | 37.1 | 34.4 | 22% | 17% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006542744 | PAUSED | 6,333 | 20 | 0.00 | 938,468 | 51.9 | 39.2 | 34.9 | 32.5 | 24% | 17% |
| `DL_Llama_AnyType_30s` | 761006542726 | PAUSED | 5,994 | 16 | 0.00 | 905,626 | 63.2 | 45.0 | 40.3 | 37.5 | 29% | 17% |
| `PD_AI_Eduardo` | 745352523503 | PAUSED | 5,939 | 12 | 0.00 | 742,718 | 52.4 | 42.5 | 38.7 | 36.0 | 19% | 15% |
| `PD_TikToker_GoodNewsM` | 744431892908 | PAUSED | 5,642 | 8 | 0.00 | 874,751 | 41.4 | 30.9 | 27.0 | 24.5 | 25% | 21% |
| `PD_TikToker_HackW` | 744431892914 | PAUSED | 5,366 | 9 | 0.00 | 1,061,871 | 58.2 | 47.9 | 43.8 | 41.0 | 18% | 15% |
| `PD_TikToker_HackM` | 744431892911 | PAUSED | 4,830 | 10 | 0.00 | 804,751 | 46.8 | 35.8 | 31.7 | 29.1 | 24% | 19% |
| `AT_Llama_30s` | 761006542705 | PAUSED | 4,049 | 11 | 0.00 | 565,548 | 63.2 | 44.0 | 38.9 | 36.1 | 30% | 18% |
| `AT_Jay_Say` | 791076124719 | ENABLED | 4,039 | 9 | 0.00 | 557,311 | 39.4 | 29.9 | 26.2 | 23.6 | 24% | 21% |
| `AT_Llama_long-alt` | 761006542714 | PAUSED | 3,499 | 14 | 0.00 | 328,366 | 32.4 | 23.6 | 19.7 | 17.2 | 27% | 27% |
| `DL_sidekick_30s` | 780359147720 | ENABLED | 3,307 | 10 | 0.00 | 578,900 | 65.3 | 45.2 | 40.5 | 37.8 | 31% | 16% |
| `UT_Frank_Mix` | 744431892920 | PAUSED | 3,112 | 9 | 0.00 | 503,695 | 53.0 | 41.9 | 37.9 | 35.2 | 21% | 16% |
| `DL_sidekick_66s` | 780359147714 | ENABLED | 2,711 | 6 | 0.00 | 403,693 | 33.9 | 25.5 | 21.7 | 19.1 | 25% | 25% |
| `AT_Jay_Honest` | 791076124716 | ENABLED | 2,514 | 6 | 0.00 | 307,485 | 41.3 | 31.4 | 27.7 | 25.0 | 24% | 20% |
| `AT_Llama_long` | 761006542711 | PAUSED | 2,241 | 5 | 0.00 | 196,977 | 33.2 | 24.5 | 20.5 | 18.0 | 26% | 26% |
| `AT_Llama_30s-alt` | 761006542708 | PAUSED | 1,859 | 2 | 0.00 | 231,930 | 66.9 | 49.3 | 44.4 | 41.6 | 26% | 15% |
| `SH_PMO_Long` | 785438830556 | ENABLED | 1,721 | 7 | 0.00 | 396,475 | 95.4 | 62.2 | 48.5 | 43.8 | 35% | 30% |
| `DL_sidekick_47s` | 780359147717 | ENABLED | 1,629 | 5 | 0.00 | 188,476 | 58.2 | 49.9 | 46.4 | 43.9 | 14% | 12% |
| `SH_Finance_Long` | 785438830682 | ENABLED | 1,050 | 0 | 0.00 | 150,652 | 95.6 | 63.9 | 50.6 | 45.7 | 33% | 28% |
| `PD_Manager_WoF` | 791195441657 | PAUSED | 950 | 1 | 0.00 | 182,851 | 30.8 | 22.9 | 19.4 | 16.8 | 26% | 27% |
| `PD_Manager_Celebration` | 791195441654 | PAUSED | 933 | 2 | 0.00 | 170,787 | 31.1 | 23.2 | 19.7 | 17.2 | 25% | 26% |
| `SH_Marketing_Long` | 785438830550 | ENABLED | 917 | 1 | 0.00 | 200,876 | 95.6 | 66.1 | 55.4 | 51.0 | 31% | 23% |
| `SH_Operations_Long` | 785438830553 | ENABLED | 659 | 1 | 0.00 | 102,860 | 95.7 | 67.6 | 59.2 | 55.3 | 29% | 18% |
| `SH_Leadership_Long` | 785438830559 | ENABLED | 648 | 1 | 0.00 | 111,751 | 95.7 | 64.5 | 54.8 | 50.8 | 33% | 21% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 483,070 | 1,298 | 0.00 | 72,007,374 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 105,240 | 302 | 0.00 |
| geoTargetConstants/1007850 | 30,164 | 70 | 0.00 |
| geoTargetConstants/1006524 | 8,902 | 24 | 0.00 |
| geoTargetConstants/1006912 | 6,609 | 14 | 0.00 |
| geoTargetConstants/1007336 | 3,917 | 9 | 0.00 |
| geoTargetConstants/1006864 | 3,573 | 13 | 0.00 |
| geoTargetConstants/1006567 | 3,547 | 8 | 0.00 |
| geoTargetConstants/1006656 | 3,275 | 7 | 0.00 |
| geoTargetConstants/1007326 | 3,075 | 5 | 0.00 |
| geoTargetConstants/1006884 | 2,894 | 10 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9255051 | 1,053 | 0 | 0.00 |
| geoTargetConstants/1006959 | 976 | 0 | 0.00 |
| geoTargetConstants/1006907 | 814 | 0 | 0.00 |
| geoTargetConstants/1006707 | 694 | 0 | 0.00 |
| geoTargetConstants/9198034 | 672 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-demandgen-v`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £329,289 | **DEP:** 13,458 | **DEP/Spend:** 0.04
- **Impressions:** 20,468,878 | **Clicks:** 24,491 | **Conversions:** 1,506
- **All Conversions Value:** 1,406,231 | **All Conversions:** 126,383
- **Active Months:** 11 (2024-09-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-09-01 | 20,973 | 640 | 0.03 | 939,190 | 776 | 64 |
| 2024-10-01 | 97,260 | 3,950 | 0.04 | 5,491,882 | 4,201 | 395 |
| 2024-11-01 | 50,645 | 2,370 | 0.05 | 2,173,988 | 1,816 | 237 |
| 2024-12-01 | 33,918 | 1,910 | 0.06 | 1,617,316 | 1,630 | 191 |
| 2025-01-01 | 41,687 | 3,910 | 0.09 | 2,714,011 | 2,711 | 391 |
| 2025-02-01 | 5,287 | 500 | 0.09 | 403,702 | 436 | 50 |
| 2026-01-01 | 13,689 | 37 | 0.00 | 1,518,361 | 2,465 | 37 |
| 2026-02-01 | 8,432 | 17 | 0.00 | 466,927 | 898 | 17 |
| 2026-03-01 | 12,855 | 28 | 0.00 | 1,084,608 | 2,289 | 28 |
| 2026-04-01 | 12,708 | 23 | 0.00 | 788,970 | 1,485 | 23 |
| 2026-05-01 | 31,835 | 72 | 0.00 | 3,269,923 | 5,784 | 72 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `HardSU_DG-MultiAds` | ENABLED | 117,207 | 5,036 | 0.04 | 7,148,069 | 38.6 | 26.7 | 22.6 | 20.0 | 31% | 25% |
| `EntQE_DG-MultiAds` | ENABLED | 95,552 | 4,745 | 0.05 | 6,200,328 | 36.3 | 23.7 | 19.7 | 17.1 | 35% | 28% |
| `Payers_DG-MultiAds` | ENABLED | 65,420 | 1,967 | 0.03 | 4,109,993 | 39.0 | 27.3 | 23.1 | 20.4 | 30% | 25% |
| `QE_DG-MultiAds` | PAUSED | 51,110 | 1,710 | 0.03 | 3,010,488 | 38.5 | 24.8 | 20.6 | 17.8 | 36% | 28% |

**Ads in `HardSU_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_All` | 713707877178 | PAUSED | 18,594 | 940 | 0.05 | 1,761,263 | 50.5 | 27.0 | 22.1 | 19.2 | 47% | 29% |
| `PD_TikToker_All` | 713707962675 | PAUSED | 15,518 | 610 | 0.04 | 442,995 | 33.7 | 23.0 | 19.2 | 16.3 | 32% | 29% |
| `PD_YesBut_All` | 713707877193 | PAUSED | 11,289 | 570 | 0.05 | 397,777 | 33.6 | 25.5 | 21.5 | 18.9 | 24% | 26% |
| `CR_MakesSense_All` | 724984706290 | PAUSED | 9,841 | 1,160 | 0.12 | 491,696 | 31.6 | 21.2 | 17.7 | 15.2 | 33% | 28% |
| `PD_Reports_All` | 713707962648 | PAUSED | 9,355 | 540 | 0.06 | 354,682 | 30.3 | 21.2 | 17.7 | 15.1 | 30% | 29% |
| `PD_Linear_All` | 713707962645 | PAUSED | 8,608 | 550 | 0.06 | 290,507 | 34.8 | 26.2 | 22.0 | 19.2 | 25% | 26% |
| `AT_Shmuel_All` | 713707962444 | PAUSED | 8,128 | 270 | 0.03 | 247,125 | 44.9 | 26.9 | 21.7 | 18.7 | 40% | 31% |
| `AT_Reni_AI_V2` | 798225663595 | ENABLED | 5,177 | 7 | 0.00 | 450,164 | 25.9 | 18.1 | 14.7 | 12.4 | 30% | 32% |
| `AT_W_GameOver` | 791823636923 | ENABLED | 3,780 | 14 | 0.00 | 304,502 | 43.8 | 33.7 | 30.1 | 27.7 | 23% | 18% |
| `UT_Frank_All` | 713707947576 | PAUSED | 3,541 | 150 | 0.04 | 108,948 | 35.0 | 24.6 | 20.8 | 17.9 | 30% | 27% |
| `AT_Jay_Honest` | 791823636902 | ENABLED | 3,433 | 9 | 0.00 | 314,645 | 43.3 | 32.4 | 28.4 | 25.5 | 25% | 22% |
| `AT_W_Hear` | 791823636926 | ENABLED | 2,967 | 4 | 0.00 | 258,733 | 37.9 | 28.6 | 25.1 | 22.8 | 25% | 20% |
| `AllConnectedOnePlace` | 713711313508 | PAUSED | 2,626 | 80 | 0.03 | 110,912 | 36.6 | 26.4 | 22.3 | 19.9 | 28% | 25% |
| `AT_Reni_AI_V1` | 798225663592 | ENABLED | 2,309 | 6 | 0.00 | 246,500 | 29.2 | 20.8 | 17.0 | 14.4 | 29% | 31% |
| `AT_Jay_Say` | 791823636905 | ENABLED | 1,431 | 1 | 0.00 | 83,863 | 40.3 | 30.7 | 26.9 | 24.2 | 24% | 21% |
| `AT_NYwoman_All` | 730022166629 | PAUSED | 839 | 90 | 0.11 | 44,650 | 37.8 | 25.1 | 20.8 | 18.2 | 33% | 27% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 791823636872 | ENABLED | 815 | 3 | 0.00 | 84,143 | 59.3 | 46.4 | 41.6 | 39.0 | 22% | 16% |
| `PD_Dots_UK` | 713707976064 | PAUSED | 721 | 20 | 0.03 | 28,399 | 80.0 | 27.0 | 20.3 | 16.9 | 66% | 37% |
| `DL_sidekick_30s` | 791823636845 | ENABLED | 715 | 1 | 0.00 | 114,557 | 70.4 | 51.0 | 46.1 | 43.5 | 28% | 15% |
| `SH_PMO_Long` | 791823636899 | ENABLED | 620 | 5 | 0.01 | 116,425 | 95.8 | 67.1 | 52.9 | 47.6 | 30% | 29% |
| `PD_AI_Llama` | 791823636857 | ENABLED | 599 | 0 | 0.00 | 118,090 | 65.0 | 54.7 | 50.5 | 47.9 | 16% | 12% |
| `PD_Llama_Angry_Short_NoIntro` | 791823636869 | ENABLED | 487 | 0 | 0.00 | 50,930 | 59.4 | 46.8 | 42.2 | 39.3 | 21% | 16% |
| `PD_Llama_Skeleton_UK` | 791823636878 | ENABLED | 446 | 0 | 0.00 | 61,818 | 34.3 | 26.1 | 22.0 | 19.3 | 24% | 26% |
| `PD_Llama_Skeleton` | 791823636875 | ENABLED | 361 | 0 | 0.00 | 53,838 | 36.4 | 28.2 | 23.4 | 20.4 | 22% | 28% |
| `SH_Marketing_Long` | 791823636893 | ENABLED | 355 | 0 | 0.00 | 45,078 | 96.4 | 67.3 | 55.0 | 49.8 | 30% | 26% |
| `PD_InShort_AI` | 791823636860 | PAUSED | 339 | 0 | 0.00 | 36,104 | 36.6 | 27.2 | 23.0 | 20.0 | 26% | 27% |
| `DL_Llama_Long` | 791823636719 | PAUSED | 333 | 0 | 0.00 | 60,751 | 37.1 | 28.3 | 24.0 | 21.3 | 24% | 25% |
| `PD_AI_Eduardo` | 791823636854 | ENABLED | 315 | 0 | 0.00 | 53,763 | 52.1 | 41.8 | 37.7 | 34.9 | 20% | 16% |
| `DL_sidekick_66s` | 791823636851 | ENABLED | 298 | 0 | 0.00 | 60,790 | 40.7 | 32.0 | 27.0 | 24.0 | 22% | 25% |
| `DL_sidekick_47s` | 791823636848 | ENABLED | 298 | 0 | 0.00 | 31,189 | 60.9 | 52.4 | 48.9 | 46.2 | 14% | 12% |
| `SH_Finance_Long` | 791823636887 | ENABLED | 255 | 0 | 0.00 | 22,997 | 96.7 | 69.2 | 55.7 | 50.1 | 28% | 28% |
| `DL_AI_Llama_Long` | 791823636701 | ENABLED | 251 | 0 | 0.00 | 15,710 | 46.3 | 38.2 | 34.4 | 31.6 | 17% | 17% |
| `PD_Llama_Angry` | 791823636863 | PAUSED | 242 | 2 | 0.01 | 42,384 | 37.7 | 30.3 | 25.5 | 22.7 | 20% | 25% |
| `DL_Llama_Templates_30s` | 791823636842 | PAUSED | 230 | 1 | 0.00 | 21,805 | 79.1 | 65.6 | 61.3 | 58.3 | 17% | 11% |
| `SH_Operations_Long` | 791823636896 | ENABLED | 230 | 0 | 0.00 | 22,789 | 96.2 | 69.1 | 59.1 | 54.5 | 28% | 21% |
| `PD_Manager_Celebration` | 791823636881 | PAUSED | 208 | 0 | 0.00 | 24,466 | 37.9 | 29.9 | 25.5 | 22.7 | 21% | 24% |
| `SH_Leadership_Long` | 791823636890 | ENABLED | 203 | 0 | 0.00 | 28,888 | 96.4 | 66.4 | 54.7 | 50.6 | 31% | 24% |
| `DL_Llama_47s` | 791823636707 | PAUSED | 169 | 0 | 0.00 | 28,330 | 63.0 | 53.9 | 49.8 | 46.9 | 14% | 13% |
| `DL_Llama_Dashboards_30s` | 791823636716 | PAUSED | 166 | 0 | 0.00 | 20,722 | 73.2 | 55.2 | 50.6 | 47.7 | 25% | 14% |
| `PD_Manager_WoF` | 791823636884 | PAUSED | 159 | 1 | 0.01 | 15,381 | 37.1 | 29.1 | 25.2 | 21.8 | 21% | 25% |
| `CR_Confidence_Women_UK` | 730208558768 | PAUSED | 154 | 0 | 0.00 | 11,734 | 40.8 | 29.2 | 25.6 | 23.1 | 28% | 21% |
| `DL_Llama_Angry_Long` | 791823636710 | PAUSED | 152 | 0 | 0.00 | 21,333 | 40.3 | 32.2 | 27.3 | 24.0 | 20% | 25% |
| `PD_Llama_Angry_Short` | 791823636866 | PAUSED | 143 | 1 | 0.01 | 13,211 | 53.6 | 42.2 | 38.0 | 34.6 | 21% | 18% |
| `DL_Llama_AnyType_30s` | 791823636713 | PAUSED | 126 | 0 | 0.00 | 10,797 | 76.3 | 61.0 | 57.0 | 54.4 | 20% | 11% |
| `CR_Confidence_Men_UK` | 730208558765 | PAUSED | 107 | 0 | 0.00 | 8,445 | 33.8 | 22.3 | 18.1 | 16.0 | 34% | 28% |
| `DL_AI_Llama_Short` | 791823636704 | ENABLED | 81 | 0 | 0.00 | 5,194 | 59.1 | 47.1 | 43.1 | 39.8 | 20% | 15% |
| `AT_Llama_short` | 791823636920 | PAUSED | 69 | 0 | 0.00 | 3,572 | 39.5 | 30.3 | 26.8 | 24.6 | 23% | 19% |
| `AT_Llama_long-alt` | 791823636917 | PAUSED | 38 | 0 | 0.00 | 1,696 | 34.7 | 26.6 | 22.8 | 19.5 | 23% | 27% |
| `AT_Llama_30s-alt` | 791823636911 | PAUSED | 30 | 0 | 0.00 | 1,260 | 63.5 | 41.9 | 38.6 | 35.7 | 34% | 15% |
| `AT_Llama_30s` | 791823636908 | PAUSED | 28 | 0 | 0.00 | 1,365 | 62.8 | 39.0 | 32.4 | 29.8 | 38% | 24% |
| `AT_Llama_long` | 791823636914 | PAUSED | 22 | 0 | 0.00 | 1,050 | 34.1 | 25.1 | 21.5 | 19.5 | 26% | 22% |

**Ads in `EntQE_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_All` | 714448603560 | PAUSED | 16,992 | 970 | 0.06 | 1,992,205 | 50.7 | 27.0 | 22.0 | 19.1 | 47% | 29% |
| `CR_MakesSense_All` | 724984706293 | PAUSED | 11,286 | 1,200 | 0.11 | 718,670 | 31.2 | 20.7 | 17.2 | 14.8 | 33% | 29% |
| `PD_TikToker_All` | 714448603563 | PAUSED | 11,221 | 650 | 0.06 | 363,018 | 32.2 | 21.5 | 17.7 | 15.1 | 33% | 30% |
| `PD_Reports_All` | 714448603566 | PAUSED | 8,458 | 600 | 0.07 | 368,397 | 31.1 | 21.6 | 18.0 | 15.4 | 31% | 29% |
| `PD_YesBut_All` | 714448603437 | PAUSED | 7,966 | 300 | 0.04 | 310,464 | 31.9 | 23.9 | 20.1 | 17.7 | 25% | 26% |
| `AT_Shmuel_All` | 714448603572 | PAUSED | 6,689 | 340 | 0.05 | 216,067 | 43.3 | 25.2 | 20.1 | 17.1 | 42% | 32% |
| `PD_Linear_All` | 714448603569 | PAUSED | 5,921 | 320 | 0.05 | 239,330 | 34.1 | 25.6 | 21.5 | 18.8 | 25% | 26% |
| `AT_W_GameOver` | 791823637379 | ENABLED | 3,666 | 13 | 0.00 | 297,800 | 33.9 | 23.5 | 19.9 | 17.6 | 31% | 25% |
| `UT_Frank_All` | 714448603434 | PAUSED | 3,038 | 100 | 0.03 | 114,665 | 33.2 | 22.9 | 19.1 | 16.6 | 31% | 28% |
| `AT_W_Hear` | 791823637382 | ENABLED | 2,872 | 4 | 0.00 | 250,294 | 30.7 | 21.6 | 18.2 | 16.1 | 30% | 25% |
| `AT_Reni_AI_V2` | 798225663727 | ENABLED | 2,785 | 7 | 0.00 | 166,220 | 25.1 | 17.5 | 14.2 | 11.9 | 30% | 32% |
| `AllConnectedOnePlace` | 713711313514 | PAUSED | 1,960 | 60 | 0.03 | 80,570 | 37.9 | 27.1 | 22.9 | 20.6 | 28% | 24% |
| `AT_Jay_Honest` | 791823637358 | ENABLED | 1,675 | 2 | 0.00 | 91,898 | 38.1 | 27.4 | 23.6 | 21.0 | 28% | 23% |
| `AT_Reni_AI_V1` | 798225663724 | ENABLED | 1,551 | 1 | 0.00 | 128,789 | 28.4 | 20.0 | 16.3 | 13.8 | 29% | 31% |
| `AT_NYwoman_All` | 730022166632 | PAUSED | 1,494 | 80 | 0.05 | 95,801 | 34.8 | 22.2 | 18.4 | 16.1 | 36% | 28% |
| `AT_Jay_Say` | 791823637361 | ENABLED | 1,186 | 1 | 0.00 | 68,477 | 32.1 | 22.6 | 18.9 | 16.5 | 30% | 27% |
| `PD_Dots_UK` | 713821993832 | PAUSED | 695 | 80 | 0.12 | 24,059 | 90.1 | 28.5 | 21.7 | 18.3 | 68% | 36% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 791823637328 | ENABLED | 619 | 2 | 0.00 | 41,408 | 49.3 | 35.9 | 31.1 | 28.5 | 27% | 21% |
| `DL_sidekick_30s` | 791823637181 | ENABLED | 532 | 2 | 0.00 | 69,587 | 61.9 | 39.6 | 35.3 | 32.9 | 36% | 17% |
| `PD_Llama_Angry_Short_NoIntro` | 791823637325 | ENABLED | 434 | 1 | 0.00 | 40,442 | 46.5 | 32.3 | 28.0 | 25.6 | 31% | 21% |
| `SH_PMO_Long` | 791823637355 | ENABLED | 383 | 0 | 0.00 | 58,357 | 95.6 | 60.9 | 46.1 | 40.8 | 36% | 33% |
| `PD_InShort_AI` | 791823637196 | PAUSED | 328 | 1 | 0.00 | 27,456 | 30.6 | 21.7 | 18.0 | 15.0 | 29% | 31% |
| `PD_Llama_Skeleton_UK` | 791823637334 | ENABLED | 280 | 0 | 0.00 | 27,739 | 29.6 | 21.3 | 17.7 | 15.3 | 28% | 28% |
| `SH_Marketing_Long` | 791823637349 | ENABLED | 253 | 0 | 0.00 | 39,009 | 95.2 | 63.8 | 49.6 | 45.5 | 33% | 29% |
| `DL_Llama_Long` | 791823637175 | PAUSED | 250 | 0 | 0.00 | 30,350 | 32.2 | 23.4 | 19.7 | 16.9 | 27% | 28% |
| `DL_sidekick_66s` | 791823637187 | ENABLED | 234 | 0 | 0.00 | 48,359 | 30.5 | 22.3 | 18.9 | 16.4 | 27% | 27% |
| `PD_Llama_Skeleton` | 791823637331 | ENABLED | 214 | 0 | 0.00 | 32,460 | 32.9 | 25.1 | 20.5 | 18.5 | 24% | 26% |
| `PD_Manager_Celebration` | 791823637337 | PAUSED | 198 | 0 | 0.00 | 24,568 | 30.5 | 21.4 | 17.0 | 14.8 | 30% | 31% |
| `PD_AI_Eduardo` | 791823637190 | ENABLED | 194 | 1 | 0.01 | 30,863 | 49.2 | 38.5 | 34.6 | 31.9 | 22% | 17% |
| `CR_Confidence_Women_UK` | 730208558762 | PAUSED | 190 | 1 | 0.01 | 17,623 | 36.5 | 24.5 | 20.4 | 17.9 | 33% | 27% |
| `CR_Confidence_Men_UK` | 730208558639 | PAUSED | 175 | 0 | 0.00 | 14,760 | 29.1 | 16.7 | 13.1 | 11.1 | 43% | 34% |
| `PD_Manager_WoF` | 791823637340 | PAUSED | 169 | 2 | 0.01 | 25,210 | 29.3 | 20.6 | 17.3 | 14.6 | 30% | 29% |
| `DL_AI_Llama_Long` | 791823637157 | ENABLED | 165 | 1 | 0.00 | 9,050 | 40.1 | 32.6 | 29.0 | 26.4 | 19% | 19% |
| `SH_Finance_Long` | 791823637343 | ENABLED | 132 | 0 | 0.00 | 13,924 | 95.5 | 62.1 | 46.8 | 40.9 | 35% | 34% |
| `SH_Leadership_Long` | 791823637346 | ENABLED | 125 | 0 | 0.00 | 15,239 | 95.8 | 61.7 | 50.2 | 47.0 | 36% | 24% |
| `DL_sidekick_47s` | 791823637184 | ENABLED | 124 | 0 | 0.00 | 8,659 | 54.8 | 46.8 | 43.1 | 40.5 | 15% | 13% |
| `DL_Llama_Templates_30s` | 791823637178 | PAUSED | 121 | 0 | 0.00 | 9,202 | 68.4 | 50.0 | 45.7 | 42.3 | 27% | 15% |
| `SH_Operations_Long` | 791823637352 | ENABLED | 117 | 0 | 0.00 | 11,793 | 94.3 | 59.3 | 48.2 | 43.8 | 37% | 26% |
| `PD_Llama_Angry_Short` | 791823637322 | PAUSED | 112 | 0 | 0.00 | 11,101 | 41.9 | 31.3 | 27.2 | 24.4 | 25% | 22% |
| `PD_AI_Llama` | 791823637193 | ENABLED | 107 | 0 | 0.00 | 17,407 | 54.3 | 42.6 | 38.0 | 35.2 | 22% | 17% |
| `PD_Llama_Angry` | 791823637199 | PAUSED | 99 | 1 | 0.01 | 8,874 | 32.3 | 24.9 | 19.9 | 16.7 | 23% | 33% |
| `DL_Llama_47s` | 791823637163 | PAUSED | 96 | 0 | 0.00 | 8,359 | 57.2 | 48.0 | 44.2 | 41.2 | 16% | 14% |
| `DL_Llama_AnyType_30s` | 791823637169 | PAUSED | 86 | 2 | 0.02 | 5,865 | 66.2 | 48.3 | 43.5 | 40.7 | 27% | 16% |
| `DL_Llama_Dashboards_30s` | 791823637172 | PAUSED | 68 | 0 | 0.00 | 4,667 | 68.2 | 48.7 | 44.4 | 41.6 | 29% | 15% |
| `DL_Llama_Angry_Long` | 791823637166 | PAUSED | 68 | 3 | 0.04 | 5,978 | 37.3 | 29.5 | 25.4 | 22.7 | 21% | 23% |
| `AT_Llama_short` | 791823637376 | PAUSED | 56 | 0 | 0.00 | 4,117 | 39.6 | 30.1 | 26.4 | 24.1 | 24% | 20% |
| `DL_AI_Llama_Short` | 791823637160 | ENABLED | 51 | 0 | 0.00 | 4,110 | 49.1 | 37.6 | 33.9 | 31.6 | 23% | 16% |
| `AT_Llama_long-alt` | 791823637373 | PAUSED | 32 | 0 | 0.00 | 2,311 | 34.9 | 25.3 | 20.9 | 17.9 | 28% | 29% |
| `AT_Llama_30s` | 791823637364 | PAUSED | 29 | 0 | 0.00 | 1,709 | 59.9 | 38.0 | 32.0 | 28.8 | 37% | 24% |
| `AT_Llama_30s-alt` | 791823637367 | PAUSED | 25 | 0 | 0.01 | 1,411 | 60.2 | 40.2 | 35.9 | 32.7 | 33% | 19% |
| `AT_Llama_long` | 791823637370 | PAUSED | 22 | 0 | 0.00 | 1,409 | 37.2 | 28.1 | 23.5 | 20.4 | 24% | 28% |

**Ads in `Payers_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 798225663733 | ENABLED | 7,966 | 17 | 0.00 | 617,810 | 25.7 | 17.8 | 14.5 | 12.1 | 31% | 32% |
| `PD_WorkOS_All` | 717017438635 | PAUSED | 6,184 | 380 | 0.06 | 488,883 | 58.4 | 32.6 | 27.0 | 23.7 | 44% | 27% |
| `PD_TikToker_All` | 717017438638 | PAUSED | 5,880 | 270 | 0.05 | 175,594 | 37.1 | 25.2 | 21.1 | 18.1 | 32% | 28% |
| `CR_MakesSense_All` | 724984706296 | PAUSED | 5,069 | 490 | 0.10 | 243,297 | 36.2 | 25.2 | 21.3 | 18.5 | 30% | 27% |
| `PD_Linear_All` | 717017438764 | PAUSED | 4,111 | 200 | 0.05 | 132,513 | 37.1 | 28.2 | 23.9 | 21.1 | 24% | 25% |
| `AT_W_GameOver` | 791823637607 | ENABLED | 3,812 | 16 | 0.00 | 285,554 | 42.7 | 32.2 | 28.4 | 25.9 | 25% | 19% |
| `AT_Reni_AI_V1` | 798225663730 | ENABLED | 3,507 | 6 | 0.00 | 375,023 | 27.7 | 19.5 | 15.8 | 13.3 | 30% | 32% |
| `PD_YesBut_All` | 717017438632 | PAUSED | 3,453 | 150 | 0.04 | 133,246 | 34.2 | 25.6 | 21.7 | 19.1 | 25% | 26% |
| `AT_Jay_Honest` | 791823637586 | ENABLED | 3,425 | 9 | 0.00 | 248,192 | 39.5 | 28.1 | 24.0 | 21.2 | 29% | 24% |
| `AT_Shmuel_All` | 717017438767 | PAUSED | 2,847 | 100 | 0.04 | 101,931 | 47.5 | 27.9 | 22.5 | 19.3 | 41% | 31% |
| `AT_W_Hear` | 791823637610 | ENABLED | 2,749 | 10 | 0.00 | 200,346 | 35.0 | 25.5 | 22.0 | 19.7 | 27% | 23% |
| `PD_Reports_All` | 717017438761 | PAUSED | 2,655 | 130 | 0.05 | 108,330 | 37.1 | 26.9 | 22.8 | 20.0 | 27% | 26% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 791823637436 | ENABLED | 1,393 | 6 | 0.00 | 139,059 | 57.3 | 43.7 | 38.8 | 36.1 | 24% | 18% |
| `AT_Jay_Say` | 791823637589 | ENABLED | 1,391 | 1 | 0.00 | 76,743 | 37.6 | 27.8 | 23.9 | 21.3 | 26% | 23% |
| `UT_Frank_All` | 717017438629 | PAUSED | 1,346 | 70 | 0.05 | 44,213 | 36.4 | 26.0 | 22.1 | 19.2 | 29% | 26% |
| `DL_sidekick_30s` | 791823637409 | ENABLED | 699 | 2 | 0.00 | 70,665 | 67.0 | 45.8 | 40.9 | 38.1 | 32% | 17% |
| `PD_Llama_Angry_Short_NoIntro` | 791823637433 | ENABLED | 669 | 1 | 0.00 | 65,613 | 58.3 | 45.5 | 40.8 | 38.1 | 22% | 16% |
| `EfficiencyProductDemoTeams` | 717017438623 | PAUSED | 585 | 20 | 0.03 | 16,728 | 39.9 | 28.1 | 23.8 | 21.0 | 30% | 25% |
| `AllConnectedOnePlace` | 717017438620 | PAUSED | 565 | 40 | 0.07 | 21,630 | 41.9 | 30.5 | 26.3 | 23.5 | 27% | 23% |
| `SH_PMO_Long` | 791823637583 | ENABLED | 557 | 0 | 0.00 | 56,973 | 96.1 | 67.6 | 53.4 | 48.1 | 30% | 29% |
| `PD_Llama_Skeleton_UK` | 791823637562 | ENABLED | 522 | 0 | 0.00 | 54,270 | 30.4 | 22.5 | 19.2 | 16.5 | 26% | 27% |
| `AT_NYwoman_All` | 730022166635 | PAUSED | 516 | 30 | 0.06 | 20,204 | 44.2 | 30.9 | 26.8 | 24.0 | 30% | 23% |
| `DL_AI_Llama_Long` | 791823637385 | ENABLED | 410 | 1 | 0.00 | 25,896 | 41.4 | 33.0 | 29.0 | 26.1 | 20% | 21% |
| `DL_sidekick_47s` | 791823637412 | ENABLED | 397 | 0 | 0.00 | 39,914 | 51.6 | 41.5 | 37.3 | 34.8 | 19% | 16% |
| `PD_Llama_Skeleton` | 791823637439 | ENABLED | 364 | 1 | 0.00 | 32,131 | 32.8 | 24.7 | 20.7 | 18.1 | 25% | 27% |
| `SH_Marketing_Long` | 791823637577 | ENABLED | 335 | 1 | 0.00 | 30,224 | 96.0 | 62.8 | 49.0 | 44.1 | 35% | 30% |
| `PD_InShort_AI` | 791823637424 | PAUSED | 301 | 1 | 0.00 | 19,159 | 35.2 | 25.5 | 21.3 | 18.1 | 28% | 29% |
| `DL_Llama_Long` | 791823637403 | PAUSED | 281 | 1 | 0.00 | 20,496 | 30.9 | 22.6 | 18.6 | 16.0 | 27% | 29% |
| `DL_sidekick_66s` | 791823637415 | ENABLED | 279 | 0 | 0.00 | 30,940 | 37.1 | 27.7 | 23.7 | 21.3 | 25% | 23% |
| `PD_AI_Eduardo` | 791823637418 | ENABLED | 242 | 0 | 0.00 | 24,971 | 51.7 | 39.5 | 33.7 | 31.7 | 24% | 20% |
| `PD_Dots_UK` | 717017438626 | PAUSED | 239 | 0 | 0.00 | 8,261 | 92.1 | 33.9 | 26.1 | 22.2 | 63% | 35% |
| `SH_Finance_Long` | 791823637571 | ENABLED | 235 | 2 | 0.01 | 16,146 | 96.0 | 67.5 | 52.8 | 47.1 | 30% | 30% |
| `SH_Operations_Long` | 791823637580 | ENABLED | 219 | 0 | 0.00 | 16,655 | 96.6 | 65.9 | 56.2 | 51.6 | 32% | 22% |
| `SH_Leadership_Long` | 791823637574 | ENABLED | 217 | 0 | 0.00 | 14,407 | 96.0 | 61.6 | 48.8 | 44.1 | 36% | 28% |
| `PD_AI_Llama` | 791823637421 | ENABLED | 202 | 0 | 0.00 | 17,020 | 56.8 | 44.5 | 40.4 | 37.4 | 22% | 16% |
| `DL_Llama_Templates_30s` | 791823637406 | PAUSED | 194 | 0 | 0.00 | 17,409 | 70.0 | 52.0 | 46.9 | 43.8 | 26% | 16% |
| `PD_Llama_Angry` | 791823637427 | PAUSED | 175 | 0 | 0.00 | 15,333 | 33.9 | 28.3 | 23.8 | 19.5 | 17% | 31% |
| `PD_Manager_WoF` | 791823637568 | PAUSED | 169 | 0 | 0.00 | 15,425 | 33.5 | 26.0 | 23.2 | 20.8 | 22% | 20% |
| `PD_Llama_Angry_Short` | 791823637430 | PAUSED | 152 | 0 | 0.00 | 13,269 | 48.0 | 37.9 | 33.9 | 31.7 | 21% | 16% |
| `PD_Manager_Celebration` | 791823637565 | PAUSED | 145 | 0 | 0.00 | 8,241 | 32.1 | 24.2 | 21.1 | 18.8 | 25% | 22% |
| `CR_Confidence_Women_UK` | 730208558774 | PAUSED | 144 | 0 | 0.00 | 8,250 | 46.3 | 33.2 | 28.9 | 26.0 | 28% | 22% |
| `DL_Llama_AnyType_30s` | 791823637397 | PAUSED | 135 | 0 | 0.00 | 11,296 | 72.5 | 56.0 | 50.7 | 47.9 | 23% | 14% |
| `DL_Llama_Angry_Long` | 791823637394 | PAUSED | 129 | 1 | 0.01 | 8,438 | 34.8 | 25.8 | 21.4 | 18.6 | 26% | 28% |
| `DL_Llama_47s` | 791823637391 | PAUSED | 128 | 0 | 0.00 | 13,492 | 57.2 | 47.2 | 42.8 | 40.4 | 17% | 14% |
| `DL_AI_Llama_Short` | 791823637388 | ENABLED | 106 | 0 | 0.00 | 7,464 | 52.4 | 40.5 | 35.9 | 33.1 | 23% | 18% |
| `DL_Llama_Dashboards_30s` | 791823637400 | PAUSED | 93 | 0 | 0.00 | 6,771 | 67.2 | 46.6 | 41.5 | 38.6 | 31% | 17% |
| `CR_Confidence_Men_UK` | 730208558771 | PAUSED | 92 | 10 | 0.11 | 4,733 | 36.2 | 23.4 | 19.7 | 17.5 | 35% | 25% |
| `AT_Llama_short` | 791823637604 | PAUSED | 42 | 0 | 0.00 | 2,477 | 38.4 | 29.1 | 25.7 | 23.6 | 24% | 19% |
| `AT_Llama_long-alt` | 791823637601 | PAUSED | 29 | 0 | 0.00 | 1,223 | 35.0 | 25.2 | 21.2 | 18.8 | 28% | 25% |
| `AT_Llama_long` | 791823637598 | PAUSED | 23 | 0 | 0.00 | 1,230 | 35.6 | 28.3 | 24.0 | 21.0 | 20% | 26% |
| `AT_Llama_30s-alt` | 791823637595 | PAUSED | 23 | 0 | 0.00 | 1,058 | 60.0 | 39.3 | 33.9 | 31.3 | 34% | 20% |
| `AT_Llama_30s` | 791823637592 | PAUSED | 19 | 0 | 0.00 | 847 | 61.1 | 39.2 | 34.6 | 32.1 | 36% | 18% |

**Ads in `QE_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_All` | 714448603419 | PAUSED | 11,251 | 320 | 0.03 | 1,402,450 | 50.1 | 26.9 | 22.2 | 19.3 | 46% | 28% |
| `PD_TikToker_All` | 714448603422 | PAUSED | 11,011 | 350 | 0.03 | 379,494 | 32.8 | 22.6 | 18.9 | 16.2 | 31% | 28% |
| `PD_YesBut_All` | 714448603416 | PAUSED | 7,008 | 260 | 0.04 | 329,166 | 35.6 | 27.2 | 23.1 | 20.3 | 24% | 25% |
| `AT_Shmuel_All` | 714448603431 | PAUSED | 6,895 | 280 | 0.04 | 254,410 | 44.3 | 26.8 | 21.7 | 18.6 | 39% | 31% |
| `PD_Reports_All` | 714448603425 | PAUSED | 6,045 | 160 | 0.03 | 272,686 | 27.3 | 19.2 | 16.1 | 13.7 | 30% | 29% |
| `PD_Linear_All` | 714448603428 | PAUSED | 4,042 | 180 | 0.04 | 147,946 | 37.5 | 28.9 | 24.3 | 21.4 | 23% | 26% |
| `AllConnectedOnePlace` | 713711313511 | PAUSED | 1,990 | 40 | 0.02 | 101,174 | 38.2 | 27.7 | 23.5 | 21.0 | 28% | 24% |
| `UT_Frank_All` | 714448603413 | PAUSED | 1,972 | 90 | 0.05 | 75,871 | 34.7 | 24.5 | 20.6 | 17.9 | 29% | 27% |
| `PD_Dots_UK` | 713821993637 | PAUSED | 887 | 30 | 0.03 | 47,055 | 84.9 | 28.3 | 21.6 | 18.3 | 67% | 36% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 329,289 | 13,458 | 0.04 | 20,468,878 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 85,373 | 3,469 | 0.04 |
| geoTargetConstants/1006524 | 7,544 | 324 | 0.04 |
| geoTargetConstants/1006912 | 5,756 | 373 | 0.06 |
| geoTargetConstants/1007850 | 3,898 | 30 | 0.01 |
| geoTargetConstants/1007336 | 3,517 | 71 | 0.02 |
| geoTargetConstants/1006567 | 3,482 | 102 | 0.03 |
| geoTargetConstants/1006656 | 3,312 | 192 | 0.06 |
| geoTargetConstants/1006864 | 3,080 | 140 | 0.05 |
| geoTargetConstants/1007326 | 2,793 | 172 | 0.06 |
| geoTargetConstants/1006884 | 2,677 | 150 | 0.06 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007249 | 555 | 0 | 0.00 |
| geoTargetConstants/1006992 | 428 | 0 | 0.00 |
| geoTargetConstants/1007097 | 383 | 0 | 0.00 |
| geoTargetConstants/9248776 | 372 | 0 | 0.00 |
| geoTargetConstants/9198634 | 363 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-crm-desktop-verticals-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £256,181 | **DEP:** 12,360 | **DEP/Spend:** 0.05
- **Impressions:** 6,583,410 | **Clicks:** 7,635 | **Conversions:** 1,236
- **All Conversions Value:** 608,858 | **All Conversions:** 52,562
- **Active Months:** 13 (2024-05-01 → 2025-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 18,952 | 830 | 0.04 | 339,778 | 236 | 83 |
| 2024-06-01 | 19,016 | 490 | 0.03 | 299,321 | 208 | 49 |
| 2024-07-01 | 22,863 | 660 | 0.03 | 421,119 | 454 | 66 |
| 2024-08-01 | 22,070 | 1,120 | 0.05 | 544,824 | 638 | 112 |
| 2024-09-01 | 14,142 | 570 | 0.04 | 428,836 | 487 | 57 |
| 2024-10-01 | 21,591 | 850 | 0.04 | 450,365 | 509 | 85 |
| 2024-11-01 | 22,047 | 1,130 | 0.05 | 497,513 | 618 | 113 |
| 2024-12-01 | 16,879 | 930 | 0.06 | 462,677 | 558 | 93 |
| 2025-01-01 | 28,327 | 1,370 | 0.05 | 751,004 | 978 | 137 |
| 2025-02-01 | 19,914 | 1,230 | 0.06 | 583,084 | 772 | 123 |
| 2025-03-01 | 17,616 | 1,200 | 0.07 | 510,551 | 628 | 120 |
| 2025-04-01 | 28,389 | 1,700 | 0.06 | 1,128,487 | 1,345 | 170 |
| 2025-05-01 | 4,376 | 280 | 0.06 | 165,851 | 204 | 28 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CompCRMBig_S-MultiAds` | ENABLED | 126,734 | 5,390 | 0.04 | 3,669,079 | 25.4 | 15.2 | 11.9 | 9.9 | 40% | 35% |
| `CRM_KW-MultiAds` | ENABLED | 34,503 | 1,620 | 0.05 | 288,934 | 20.1 | 10.4 | 7.7 | 6.0 | 48% | 42% |
| `CRM_T-multiAds` | ENABLED | 32,968 | 990 | 0.03 | 294,329 | 22.8 | 12.3 | 9.2 | 7.2 | 46% | 42% |
| `CRMsolutions-IMcrm-MultiAds` | ENABLED | 27,737 | 2,930 | 0.11 | 1,170,360 | 28.2 | 18.1 | 14.7 | 12.6 | 36% | 30% |
| `Marketing_Sales_T-multiAds` | ENABLED | 18,635 | 730 | 0.04 | 232,255 | 20.1 | 11.2 | 8.5 | 6.8 | 44% | 39% |
| `CompCRMSmall_S-MultiAds` | ENABLED | 15,604 | 700 | 0.04 | 928,453 | 25.3 | 16.7 | 13.5 | 11.5 | 34% | 31% |

**Ads in `CompCRMBig_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_3Reasons_Team_CRM` | 687009381343 | ENABLED | 26,928 | 1,160 | 0.04 | 481,177 | 19.9 | 13.4 | 10.7 | 8.8 | 33% | 34% |
| `PD_Yuval_Formula_CRM` | 706383695020 | ENABLED | 21,970 | 1,030 | 0.05 | 513,864 | 16.8 | 10.9 | 8.7 | 7.2 | 35% | 34% |
| `CRMQuickWinDemoPerson` | 643126492998 | ENABLED | 20,057 | 800 | 0.04 | 1,077,912 | 21.7 | 13.5 | 10.7 | 8.8 | 38% | 35% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702510251917 | ENABLED | 19,366 | 950 | 0.05 | 257,160 | 28.5 | 17.9 | 14.1 | 12.0 | 37% | 33% |
| `CRMKnightUsingCRM` | 643126493166 | PAUSED | 7,736 | 280 | 0.04 | 222,480 | 43.0 | 22.7 | 17.3 | 14.4 | 47% | 37% |
| `CRMDegreeAri` | 643126493016 | PAUSED | 6,269 | 180 | 0.03 | 147,316 | 40.9 | 18.9 | 13.8 | 10.7 | 54% | 43% |
| `PD_POV_Dashboard_CRM` | 679455393506 | ENABLED | 5,401 | 110 | 0.02 | 547,218 | 84.3 | 39.2 | 29.7 | 25.5 | 54% | 35% |
| `PD_Yuval_Headache_CRM` | 706383695239 | PAUSED | 3,863 | 190 | 0.05 | 54,390 | 22.1 | 14.9 | 12.2 | 10.1 | 33% | 32% |
| `PD_AIPodcast_Long_CRM` | 733275978628 | ENABLED | 2,832 | 210 | 0.07 | 57,185 | 22.8 | 14.7 | 11.5 | 9.4 | 36% | 36% |
| `CR_President_Long_CRM` | 728084440200 | ENABLED | 2,704 | 90 | 0.03 | 43,910 | 16.5 | 11.0 | 8.7 | 7.3 | 34% | 34% |
| `CR_President_ShortNo_CRM` | 728084440260 | ENABLED | 2,045 | 120 | 0.06 | 32,026 | 25.0 | 13.9 | 10.7 | 7.8 | 45% | 44% |
| `CR_President_Short_CRM` | 728084440071 | ENABLED | 1,142 | 30 | 0.03 | 18,843 | 22.8 | 12.9 | 9.7 | 7.6 | 43% | 41% |
| `CR_Pens_CRM` | 669531085404 | PAUSED | 854 | 0 | 0.00 | 13,923 | 33.6 | 17.1 | 12.7 | 10.5 | 49% | 39% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702510251518 | PAUSED | 820 | 60 | 0.07 | 12,346 | 26.8 | 17.3 | 13.9 | 11.8 | 36% | 32% |
| `UT_FinanceConfeti_CRM` | 722187348934 | PAUSED | 750 | 50 | 0.07 | 11,558 | 22.5 | 15.3 | 12.5 | 10.5 | 32% | 31% |
| `PD_3Reasons_Type_CRM` | 687009381505 | PAUSED | 719 | 10 | 0.01 | 15,576 | 19.3 | 13.5 | 11.2 | 9.1 | 30% | 32% |
| `PD_Yuval_Dog_CRM` | 706383695014 | PAUSED | 461 | 20 | 0.04 | 17,609 | 19.4 | 13.3 | 11.2 | 9.6 | 31% | 28% |
| `TA_Harry_NoBrainer_CRM` | 663766163439 | PAUSED | 438 | 10 | 0.02 | 38,571 | 20.3 | 13.4 | 10.4 | 8.6 | 34% | 36% |
| `UT_FinanceJoke_CRM` | 722187349363 | ENABLED | 367 | 0 | 0.00 | 8,673 | 23.4 | 15.3 | 12.3 | 10.9 | 34% | 29% |
| `AT_Realestate_Long_Platform_CRM` | 694509591591 | PAUSED | 302 | 10 | 0.03 | 29,307 | 21.0 | 15.2 | 12.7 | 10.1 | 28% | 34% |
| `AT_Realestate_Short_CRM` | 694509591990 | ENABLED | 283 | 10 | 0.04 | 10,924 | 20.7 | 13.3 | 10.2 | 8.0 | 36% | 40% |
| `PD_WomanPink_Face_CRM` | 700287471074 | ENABLED | 275 | 0 | 0.00 | 9,920 | 23.7 | 13.6 | 10.8 | 8.9 | 43% | 35% |
| `AT_Realestate_Long_PP_CRM` | 694509591771 | PAUSED | 257 | 10 | 0.04 | 15,650 | 21.0 | 13.7 | 11.2 | 9.1 | 35% | 34% |
| `PD_WomanPink_Platform_CRM` | 700287471095 | ENABLED | 225 | 30 | 0.13 | 7,032 | 22.8 | 14.4 | 11.3 | 9.4 | 37% | 34% |
| `CR_President_LongNo_CRM` | 728084440479 | PAUSED | 220 | 20 | 0.09 | 6,331 | 13.5 | 9.1 | 6.7 | 5.5 | 33% | 40% |
| `PD_3Reasons_Platform_CRM` | 687009381526 | PAUSED | 210 | 10 | 0.05 | 6,859 | 20.6 | 13.3 | 10.5 | 8.7 | 36% | 34% |
| `PD_POV_Mix_CRM` | 679455393014 | PAUSED | 145 | 0 | 0.00 | 6,839 | 87.1 | 34.0 | 25.0 | 19.6 | 61% | 42% |
| `PD_AIPodcast_Short_CRM` | 733275978211 | ENABLED | 34 | 0 | 0.00 | 2,370 | 23.3 | 12.7 | 10.7 | 9.9 | 46% | 22% |
| `AT_WomanUS_Team_CRM` | 737856292058 | ENABLED | 30 | 0 | 0.00 | 1,119 | 18.0 | 11.2 | 8.5 | 6.7 | 38% | 40% |
| `AT_WomanUS_TimeIsMoney_CRM` | 737856291785 | ENABLED | 28 | 0 | 0.00 | 991 | 17.9 | 10.2 | 8.7 | 7.2 | 43% | 29% |

**Ads in `CRM_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_3Reasons_Team_CRM` | 687009381514 | ENABLED | 8,727 | 460 | 0.05 | 92,843 | 14.0 | 8.5 | 6.5 | 5.2 | 39% | 39% |
| `PD_Yuval_Formula_CRM` | 706383652303 | ENABLED | 5,029 | 260 | 0.05 | 46,223 | 16.5 | 9.5 | 7.3 | 5.9 | 42% | 39% |
| `CRMKnightUsingCRM` | 669774574767 | PAUSED | 4,350 | 180 | 0.04 | 22,615 | 38.8 | 16.7 | 11.4 | 8.6 | 57% | 49% |
| `CRMQuickWinDemoPerson` | 669774574923 | ENABLED | 3,749 | 170 | 0.05 | 24,974 | 16.5 | 8.9 | 6.5 | 5.1 | 46% | 43% |
| `CR_President_Long_CRM` | 728084440221 | ENABLED | 2,147 | 180 | 0.08 | 23,377 | 10.8 | 6.9 | 5.4 | 4.3 | 36% | 39% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702510251437 | ENABLED | 1,929 | 90 | 0.05 | 16,326 | 21.8 | 11.6 | 8.4 | 6.7 | 47% | 42% |
| `PD_POV_Dashboard_CRM` | 679455393083 | ENABLED | 1,700 | 30 | 0.02 | 7,928 | 90.8 | 29.8 | 20.1 | 15.1 | 67% | 49% |
| `CR_President_ShortNo_CRM` | 728084441016 | ENABLED | 1,489 | 110 | 0.07 | 11,334 | 22.4 | 11.7 | 8.5 | 5.9 | 48% | 50% |
| `PD_Yuval_Headache_CRM` | 706383694978 | PAUSED | 1,000 | 50 | 0.05 | 7,540 | 15.8 | 8.8 | 7.0 | 5.8 | 44% | 34% |
| `CR_President_Short_CRM` | 728084440716 | ENABLED | 834 | 10 | 0.01 | 6,625 | 21.9 | 10.8 | 8.5 | 6.1 | 51% | 43% |
| `CRMDegreeAri` | 669774574782 | PAUSED | 824 | 20 | 0.02 | 6,562 | 39.5 | 16.5 | 11.5 | 8.1 | 58% | 51% |
| `PD_3Reasons_Type_CRM` | 687009381553 | PAUSED | 405 | 10 | 0.02 | 2,835 | 14.9 | 9.1 | 7.0 | 6.0 | 39% | 34% |
| `PD_AIPodcast_Long_CRM` | 733275978181 | ENABLED | 383 | 0 | 0.00 | 7,212 | 16.0 | 9.1 | 6.8 | 5.2 | 43% | 43% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702510251692 | PAUSED | 274 | 20 | 0.07 | 1,044 | 24.1 | 13.0 | 10.1 | 8.1 | 46% | 38% |
| `AT_Realestate_Long_Platform_CRM` | 694509591357 | PAUSED | 269 | 0 | 0.00 | 1,120 | 13.6 | 8.4 | 6.7 | 5.2 | 38% | 38% |
| `CR_President_LongNo_CRM` | 728084440284 | PAUSED | 251 | 0 | 0.00 | 1,697 | 11.9 | 8.7 | 7.2 | 6.1 | 27% | 30% |
| `CR_Pens_CRM` | 669774574932 | PAUSED | 221 | 0 | 0.00 | 803 | 34.5 | 16.6 | 12.4 | 9.3 | 52% | 44% |
| `PD_3Reasons_Platform_CRM` | 687009381331 | PAUSED | 186 | 10 | 0.05 | 892 | 16.4 | 11.4 | 8.5 | 6.5 | 30% | 43% |
| `TA_Harry_NoBrainer_CRM` | 669774574785 | PAUSED | 128 | 0 | 0.00 | 1,726 | 15.5 | 8.8 | 7.1 | 6.0 | 43% | 32% |
| `UT_FinanceJoke_CRM` | 722187349144 | ENABLED | 117 | 0 | 0.00 | 1,151 | 13.7 | 8.1 | 6.1 | 5.6 | 40% | 31% |
| `PD_Yuval_Dog_CRM` | 706383695461 | PAUSED | 100 | 10 | 0.10 | 423 | 19.7 | 12.3 | 9.9 | 7.9 | 37% | 36% |
| `UT_FinanceConfeti_CRM` | 722187348952 | PAUSED | 73 | 10 | 0.14 | 924 | 18.1 | 12.7 | 10.2 | 9.2 | 30% | 27% |
| `AT_Realestate_Long_PP_CRM` | 694509591999 | PAUSED | 72 | 0 | 0.00 | 518 | 11.9 | 6.5 | 5.3 | 4.9 | 45% | 24% |
| `AT_Realestate_Short_CRM` | 694509591777 | ENABLED | 67 | 0 | 0.00 | 656 | 13.3 | 8.0 | 6.2 | 5.8 | 40% | 28% |
| `PD_WomanPink_Platform_CRM` | 700287471050 | ENABLED | 60 | 0 | 0.00 | 505 | 23.1 | 11.6 | 8.1 | 6.7 | 50% | 42% |
| `PD_WomanPink_Face_CRM` | 700287471260 | ENABLED | 57 | 0 | 0.00 | 543 | 18.1 | 10.3 | 7.8 | 6.4 | 43% | 37% |
| `PD_POV_Mix_CRM` | 679455393557 | PAUSED | 46 | 0 | 0.00 | 374 | 90.9 | 30.7 | 20.0 | 17.3 | 66% | 44% |

**Ads in `CRM_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_3Reasons_Team_CRM` | 687009381496 | ENABLED | 5,586 | 170 | 0.03 | 33,996 | 15.3 | 10.0 | 7.8 | 6.4 | 35% | 36% |
| `CRMQuickWinDemoPerson` | 643126493217 | ENABLED | 5,516 | 160 | 0.03 | 61,922 | 23.2 | 15.0 | 12.0 | 9.0 | 35% | 40% |
| `PD_POV_Dashboard_CRM` | 679455393323 | ENABLED | 3,959 | 90 | 0.02 | 55,537 | 89.9 | 38.2 | 28.0 | 22.0 | 57% | 42% |
| `PD_Yuval_Headache_CRM` | 706383652222 | PAUSED | 3,043 | 90 | 0.03 | 23,249 | 18.5 | 11.7 | 9.4 | 7.7 | 37% | 34% |
| `PD_Yuval_Formula_CRM` | 706383652066 | PAUSED | 2,656 | 50 | 0.02 | 19,513 | 16.6 | 10.0 | 7.7 | 6.0 | 40% | 40% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702510251752 | ENABLED | 2,205 | 120 | 0.05 | 18,570 | 22.1 | 12.1 | 8.9 | 7.1 | 46% | 41% |
| `CRMKnightUsingCRM` | 643126493208 | PAUSED | 2,182 | 60 | 0.03 | 6,217 | 41.1 | 18.9 | 13.0 | 9.4 | 54% | 50% |
| `CR_President_ShortNo_CRM` | 728084440545 | ENABLED | 1,417 | 30 | 0.02 | 10,373 | 23.1 | 12.1 | 9.1 | 6.3 | 48% | 48% |
| `CRMDegreeAri` | 643126493010 | PAUSED | 1,133 | 20 | 0.02 | 5,414 | 38.3 | 17.0 | 11.3 | 8.3 | 56% | 51% |
| `CR_President_Long_CRM` | 728084440533 | ENABLED | 1,010 | 80 | 0.08 | 16,184 | 10.6 | 7.1 | 5.5 | 4.4 | 33% | 38% |
| `UT_FinanceJoke_CRM` | 722187349345 | ENABLED | 667 | 20 | 0.03 | 6,075 | 14.1 | 8.8 | 6.7 | 5.7 | 38% | 35% |
| `CR_President_LongNo_CRM` | 728084440002 | PAUSED | 576 | 10 | 0.02 | 5,476 | 11.7 | 7.6 | 6.2 | 4.8 | 35% | 37% |
| `CR_President_Short_CRM` | 728084440272 | ENABLED | 491 | 20 | 0.04 | 4,934 | 22.4 | 11.2 | 8.0 | 6.1 | 50% | 46% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702510251401 | PAUSED | 476 | 10 | 0.02 | 2,808 | 25.9 | 15.8 | 11.8 | 8.7 | 39% | 45% |
| `CR_Pens_CRM` | 669531085344 | PAUSED | 343 | 10 | 0.03 | 2,322 | 39.9 | 26.2 | 20.1 | 15.2 | 34% | 42% |
| `PD_3Reasons_Type_CRM` | 687009381541 | PAUSED | 332 | 10 | 0.03 | 2,966 | 19.1 | 13.6 | 11.1 | 8.0 | 29% | 41% |
| `UT_FinanceConfeti_CRM` | 722187349132 | PAUSED | 264 | 20 | 0.08 | 2,985 | 17.4 | 12.2 | 10.2 | 8.5 | 30% | 30% |
| `PD_3Reasons_Platform_CRM` | 687009381517 | PAUSED | 262 | 0 | 0.00 | 1,527 | 17.5 | 12.7 | 10.1 | 7.9 | 27% | 37% |
| `TA_Harry_NoBrainer_CRM` | 663766163424 | PAUSED | 202 | 0 | 0.00 | 2,324 | 21.4 | 13.3 | 10.4 | 8.8 | 38% | 34% |
| `PD_Yuval_Dog_CRM` | 706383695509 | PAUSED | 130 | 0 | 0.00 | 612 | 19.2 | 10.0 | 8.5 | 6.4 | 48% | 36% |
| `PD_AIPodcast_Long_CRM` | 733275978637 | ENABLED | 118 | 0 | 0.00 | 3,643 | 16.8 | 9.2 | 6.4 | 4.5 | 45% | 51% |
| `AT_Realestate_Long_Platform_CRM` | 694509591762 | PAUSED | 94 | 0 | 0.00 | 1,336 | 11.4 | 10.9 | 5.8 | 5.6 | 5% | 49% |
| `PD_WomanPink_Face_CRM` | 700287471026 | ENABLED | 75 | 0 | 0.00 | 2,296 | 15.8 | 6.8 | 5.8 | 4.2 | 57% | 38% |
| `AT_Realestate_Long_PP_CRM` | 694509591489 | PAUSED | 65 | 0 | 0.00 | 394 | 18.4 | 10.7 | 9.2 | 8.5 | 41% | 21% |
| `AT_Realestate_Short_CRM` | 694509591558 | ENABLED | 58 | 0 | 0.00 | 406 | 11.9 | 7.9 | 6.2 | 4.4 | 34% | 44% |
| `PD_WomanPink_Platform_CRM` | 700287470879 | ENABLED | 51 | 20 | 0.39 | 663 | 23.4 | 14.2 | 12.1 | 10.1 | 39% | 29% |
| `PD_POV_Mix_CRM` | 679455393266 | PAUSED | 44 | 0 | 0.00 | 2,375 | 88.3 | 30.0 | 19.3 | 16.0 | 66% | 47% |

**Ads in `CRMsolutions-IMcrm-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Yuval_Formula_CRM` | 710385622071 | ENABLED | 6,829 | 760 | 0.11 | 266,858 | 25.5 | 18.4 | 15.7 | 13.8 | 28% | 25% |
| `CR_President_Long_CRM` | 728084440989 | ENABLED | 3,891 | 450 | 0.12 | 146,092 | 16.9 | 11.7 | 9.4 | 7.9 | 31% | 33% |
| `PD_3Reasons_Team_CRM` | 710385622059 | ENABLED | 3,410 | 400 | 0.12 | 137,558 | 27.9 | 20.5 | 17.2 | 15.1 | 27% | 26% |
| `CRMKnightUsingCRM` | 643596426229 | PAUSED | 3,086 | 210 | 0.07 | 103,515 | 41.4 | 20.1 | 15.0 | 12.4 | 51% | 39% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 710385622206 | ENABLED | 3,039 | 280 | 0.09 | 152,404 | 30.1 | 19.2 | 15.5 | 13.3 | 36% | 31% |
| `CRMQuickWinDemoPerson` | 643596426208 | ENABLED | 1,714 | 180 | 0.11 | 115,490 | 24.5 | 16.1 | 13.2 | 11.5 | 34% | 29% |
| `CR_President_Short_CRM` | 728084440686 | ENABLED | 1,444 | 140 | 0.10 | 44,667 | 25.4 | 14.4 | 11.3 | 9.1 | 43% | 37% |
| `CR_President_ShortNo_CRM` | 728084440263 | ENABLED | 1,313 | 180 | 0.14 | 57,959 | 26.2 | 15.0 | 11.5 | 8.8 | 43% | 41% |
| `PD_Yuval_Headache_CRM` | 710385622224 | PAUSED | 1,125 | 80 | 0.07 | 36,972 | 27.9 | 19.9 | 16.8 | 14.8 | 29% | 25% |
| `PD_POV_Dashboard_CRM` | 679455393593 | ENABLED | 704 | 60 | 0.09 | 55,633 | 89.2 | 44.8 | 35.0 | 30.8 | 50% | 31% |
| `PD_AIPodcast_Long_CRM` | 733275978469 | ENABLED | 309 | 60 | 0.19 | 18,984 | 26.3 | 18.5 | 15.0 | 12.7 | 30% | 31% |
| `CR_President_LongNo_CRM` | 728084440689 | PAUSED | 235 | 20 | 0.09 | 8,511 | 18.3 | 13.0 | 10.7 | 9.0 | 29% | 31% |
| `UT_FinanceJoke_CRM` | 722187349177 | ENABLED | 183 | 20 | 0.11 | 7,584 | 29.4 | 22.6 | 19.4 | 17.4 | 23% | 23% |
| `CR_Pens_CRM` | 669531085332 | PAUSED | 141 | 20 | 0.14 | 5,029 | 44.3 | 25.1 | 19.8 | 17.1 | 43% | 32% |
| `UT_FinanceConfeti_CRM` | 722187349321 | PAUSED | 81 | 20 | 0.25 | 3,817 | 36.6 | 27.7 | 24.0 | 21.3 | 24% | 23% |
| `PD_ActuallyLikeIt_Logo_CRM` | 710385622203 | PAUSED | 43 | 10 | 0.23 | 1,224 | 32.1 | 22.7 | 18.6 | 16.0 | 29% | 30% |
| `PD_POV_Mix_CRM` | 679455393272 | PAUSED | 39 | 10 | 0.26 | 1,290 | 89.3 | 33.1 | 23.7 | 20.3 | 63% | 39% |
| `PD_WomanPink_Face_CRM` | 710385622272 | ENABLED | 28 | 0 | 0.00 | 1,295 | 30.6 | 19.8 | 15.9 | 14.2 | 35% | 28% |
| `AT_Realestate_Long_Platform_CRM` | 710385622278 | PAUSED | 24 | 0 | 0.00 | 859 | 33.7 | 27.4 | 23.1 | 21.1 | 19% | 23% |
| `PD_WomanPink_Platform_CRM` | 710385622284 | ENABLED | 21 | 20 | 0.93 | 824 | 30.3 | 21.0 | 17.7 | 15.4 | 31% | 27% |
| `PD_Yuval_Dog_CRM` | 710385622062 | PAUSED | 21 | 10 | 0.48 | 811 | 32.6 | 25.0 | 22.3 | 18.1 | 23% | 28% |
| `AT_Realestate_Short_CRM` | 710385622077 | ENABLED | 18 | 0 | 0.00 | 767 | 31.0 | 22.4 | 20.1 | 17.7 | 28% | 21% |
| `AT_WomanUS_Team_CRM` | 737856291833 | ENABLED | 13 | 0 | 0.00 | 716 | 33.2 | 21.1 | 17.0 | 14.4 | 36% | 32% |
| `AT_WomanUS_TimeIsMoney_CRM` | 737856292049 | ENABLED | 12 | 0 | 0.00 | 669 | 32.9 | 20.4 | 18.9 | 16.9 | 38% | 17% |

**Ads in `Marketing_Sales_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_3Reasons_Team_CRM` | 687009381487 | ENABLED | 5,798 | 280 | 0.05 | 72,415 | 15.0 | 9.2 | 7.2 | 5.8 | 38% | 37% |
| `CR_President_Long_CRM` | 728084440050 | ENABLED | 1,706 | 70 | 0.04 | 16,681 | 11.1 | 7.2 | 5.6 | 4.5 | 35% | 37% |
| `CRMQuickWinDemoPerson` | 675781903405 | ENABLED | 1,706 | 60 | 0.04 | 29,261 | 19.8 | 12.0 | 9.4 | 7.3 | 39% | 39% |
| `PD_Yuval_Formula_CRM` | 706383695029 | PAUSED | 1,591 | 100 | 0.06 | 19,031 | 15.6 | 9.4 | 7.3 | 5.8 | 40% | 38% |
| `CRMKnightUsingCRM` | 675781903174 | PAUSED | 1,433 | 20 | 0.01 | 15,078 | 37.0 | 16.4 | 11.7 | 9.2 | 56% | 44% |
| `PD_Yuval_Headache_CRM` | 706383695170 | PAUSED | 1,263 | 10 | 0.01 | 12,449 | 18.2 | 11.8 | 9.5 | 8.0 | 35% | 32% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702510251908 | ENABLED | 1,188 | 120 | 0.10 | 12,030 | 23.3 | 13.2 | 10.0 | 8.1 | 43% | 38% |
| `PD_AIPodcast_Long_CRM` | 733275978451 | ENABLED | 891 | 30 | 0.03 | 10,594 | 17.4 | 10.2 | 7.5 | 5.9 | 42% | 42% |
| `CR_President_ShortNo_CRM` | 728084440941 | ENABLED | 628 | 0 | 0.00 | 7,096 | 25.2 | 13.5 | 10.5 | 7.7 | 47% | 43% |
| `PD_POV_Dashboard_CRM` | 679455393104 | ENABLED | 442 | 0 | 0.00 | 10,863 | 87.7 | 34.6 | 21.0 | 17.4 | 61% | 50% |
| `CRMDegreeAri` | 675781903123 | PAUSED | 419 | 10 | 0.02 | 4,504 | 37.6 | 16.9 | 11.7 | 9.3 | 55% | 45% |
| `UT_FinanceJoke_CRM` | 722187348955 | ENABLED | 310 | 10 | 0.03 | 3,054 | 17.6 | 11.2 | 9.1 | 7.8 | 36% | 30% |
| `CR_President_LongNo_CRM` | 728084440026 | PAUSED | 249 | 0 | 0.00 | 2,783 | 13.4 | 8.9 | 7.2 | 5.7 | 34% | 36% |
| `CR_President_Short_CRM` | 728084440929 | ENABLED | 213 | 10 | 0.05 | 2,013 | 22.1 | 11.6 | 8.5 | 6.6 | 48% | 43% |
| `PD_3Reasons_Type_CRM` | 687009381286 | PAUSED | 158 | 0 | 0.00 | 1,952 | 16.7 | 11.9 | 9.7 | 8.0 | 29% | 33% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702510251440 | PAUSED | 96 | 0 | 0.00 | 818 | 23.7 | 13.7 | 10.6 | 8.3 | 42% | 40% |
| `UT_FinanceConfeti_CRM` | 722187348958 | PAUSED | 85 | 0 | 0.00 | 1,032 | 16.6 | 10.7 | 8.5 | 7.5 | 36% | 30% |
| `TA_Harry_NoBrainer_CRM` | 675781903360 | PAUSED | 70 | 0 | 0.00 | 1,046 | 17.0 | 9.4 | 7.9 | 6.5 | 45% | 31% |
| `AT_Realestate_Long_Platform_CRM` | 694509591792 | PAUSED | 63 | 0 | 0.00 | 1,136 | 17.0 | 11.3 | 8.8 | 7.8 | 34% | 31% |
| `PD_3Reasons_Platform_CRM` | 687009381511 | PAUSED | 62 | 0 | 0.00 | 1,228 | 15.6 | 11.9 | 9.9 | 7.5 | 24% | 37% |
| `CR_Pens_CRM` | 675781903135 | PAUSED | 59 | 10 | 0.17 | 689 | 31.1 | 17.1 | 13.0 | 10.8 | 45% | 36% |
| `PD_WomanPink_Platform_CRM` | 700287471035 | ENABLED | 44 | 0 | 0.00 | 2,743 | 18.2 | 9.8 | 9.0 | 6.4 | 46% | 34% |
| `PD_WomanPink_Face_CRM` | 700287470795 | ENABLED | 41 | 0 | 0.00 | 1,802 | 19.1 | 11.5 | 8.2 | 6.5 | 40% | 44% |
| `AT_Realestate_Long_PP_CRM` | 694509592026 | PAUSED | 35 | 0 | 0.00 | 575 | 17.8 | 13.1 | 11.2 | 9.5 | 26% | 28% |
| `AT_Realestate_Short_CRM` | 694509591579 | ENABLED | 34 | 0 | 0.00 | 553 | 18.7 | 10.4 | 8.4 | 7.5 | 44% | 28% |
| `PD_Yuval_Dog_CRM` | 706383652072 | PAUSED | 24 | 0 | 0.00 | 360 | 20.5 | 13.0 | 10.8 | 9.9 | 37% | 24% |
| `PD_POV_Mix_CRM` | 679455393734 | PAUSED | 13 | 0 | 0.00 | 313 | 87.9 | 27.3 | 16.4 | 14.7 | 69% | 46% |

**Ads in `CompCRMSmall_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702510251686 | ENABLED | 3,633 | 200 | 0.06 | 87,496 | 32.2 | 21.2 | 17.2 | 15.0 | 34% | 29% |
| `PD_Yuval_Formula_CRM` | 706383695413 | ENABLED | 2,481 | 180 | 0.07 | 97,269 | 16.7 | 11.3 | 9.3 | 7.9 | 33% | 30% |
| `PD_POV_Dashboard_CRM` | 679455393317 | ENABLED | 2,156 | 70 | 0.03 | 445,173 | 75.2 | 39.5 | 30.3 | 23.8 | 47% | 40% |
| `PD_3Reasons_Team_CRM` | 687009381532 | ENABLED | 2,132 | 40 | 0.02 | 58,093 | 22.7 | 15.7 | 12.8 | 10.6 | 31% | 32% |
| `CR_President_Long_CRM` | 728084440068 | ENABLED | 1,398 | 100 | 0.07 | 32,469 | 18.7 | 12.7 | 9.9 | 8.4 | 32% | 34% |
| `CRMQuickWinDemoPerson` | 643126493199 | ENABLED | 1,048 | 0 | 0.00 | 116,564 | 23.7 | 15.9 | 12.5 | 10.5 | 33% | 34% |
| `PD_AIPodcast_Long_CRM` | 733275978679 | ENABLED | 966 | 50 | 0.05 | 30,242 | 25.5 | 17.1 | 13.5 | 11.3 | 33% | 34% |
| `CRMKnightUsingCRM` | 643126493205 | PAUSED | 387 | 0 | 0.00 | 16,455 | 43.3 | 23.4 | 18.0 | 15.0 | 46% | 36% |
| `CR_President_Short_CRM` | 728084440770 | ENABLED | 295 | 10 | 0.03 | 6,030 | 26.2 | 14.4 | 11.3 | 9.2 | 45% | 36% |
| `CR_President_ShortNo_CRM` | 728084440251 | ENABLED | 255 | 20 | 0.08 | 4,839 | 24.5 | 12.9 | 9.6 | 7.2 | 47% | 44% |
| `CRMDegreeAri` | 643126493187 | PAUSED | 207 | 0 | 0.00 | 7,093 | 42.3 | 19.6 | 14.6 | 11.6 | 54% | 41% |
| `PD_Yuval_Headache_CRM` | 706383652318 | PAUSED | 178 | 0 | 0.00 | 4,686 | 22.3 | 14.8 | 11.7 | 9.6 | 34% | 35% |
| `UT_FinanceConfeti_CRM` | 722187349378 | PAUSED | 60 | 0 | 0.00 | 1,999 | 32.1 | 23.1 | 18.2 | 15.9 | 28% | 31% |
| `CR_President_LongNo_CRM` | 728084439993 | PAUSED | 59 | 10 | 0.17 | 1,572 | 17.9 | 12.4 | 9.9 | 8.0 | 31% | 35% |
| `CR_Pens_CRM` | 669531085080 | PAUSED | 54 | 10 | 0.19 | 1,276 | 36.1 | 19.2 | 14.4 | 11.8 | 47% | 38% |
| `PD_3Reasons_Type_CRM` | 687009381523 | PAUSED | 44 | 0 | 0.00 | 1,538 | 22.6 | 15.3 | 12.4 | 9.6 | 33% | 37% |
| `UT_FinanceJoke_CRM` | 722187348910 | ENABLED | 42 | 0 | 0.00 | 1,363 | 27.0 | 20.0 | 17.8 | 15.7 | 26% | 22% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702510251698 | PAUSED | 34 | 0 | 0.00 | 1,121 | 33.4 | 21.0 | 18.6 | 16.0 | 37% | 24% |
| `TA_Harry_NoBrainer_CRM` | 663766163277 | PAUSED | 28 | 0 | 0.00 | 2,513 | 23.7 | 19.4 | 16.8 | 9.9 | 18% | 49% |
| `AT_WomanUS_TimeIsMoney_CRM` | 737856291590 | ENABLED | 22 | 0 | 0.00 | 1,855 | 8.9 | 5.7 | 5.3 | 4.1 | 36% | 29% |
| `PD_WomanPink_Face_CRM` | 700287471248 | ENABLED | 19 | 0 | 0.00 | 806 | 31.0 | 20.5 | 17.4 | 14.8 | 34% | 28% |
| `AT_Realestate_Long_Platform_CRM` | 694509591585 | PAUSED | 16 | 0 | 0.00 | 1,837 | 20.0 | 15.5 | 12.2 | 6.2 | 23% | 60% |
| `AT_Realestate_Short_CRM` | 694509591978 | ENABLED | 16 | 0 | 0.00 | 964 | 26.4 | 22.1 | 16.2 | 14.6 | 16% | 34% |
| `PD_Yuval_Dog_CRM` | 706383695032 | PAUSED | 14 | 0 | 0.00 | 581 | 22.9 | 18.7 | 17.4 | 15.3 | 18% | 18% |
| `AT_WomanUS_Team_CRM` | 737856291803 | ENABLED | 13 | 10 | 0.75 | 1,124 | 19.1 | 13.3 | 11.1 | 9.2 | 31% | 31% |
| `PD_3Reasons_Platform_CRM` | 687009381328 | PAUSED | 12 | 0 | 0.00 | 604 | 24.2 | 14.5 | 12.9 | 10.6 | 40% | 27% |
| `PD_WomanPink_Platform_CRM` | 700287471068 | ENABLED | 12 | 0 | 0.00 | 642 | 24.8 | 12.9 | 10.5 | 9.1 | 48% | 30% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 256,181 | 12,360 | 0.05 | 6,583,410 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 63,541 | 3,510 | 0.06 |
| geoTargetConstants/1006524 | 4,592 | 200 | 0.04 |
| geoTargetConstants/1006912 | 4,564 | 220 | 0.05 |
| geoTargetConstants/1007850 | 4,545 | 290 | 0.06 |
| geoTargetConstants/1006567 | 2,508 | 80 | 0.03 |
| geoTargetConstants/1007336 | 2,120 | 140 | 0.07 |
| geoTargetConstants/1006864 | 2,036 | 120 | 0.06 |
| geoTargetConstants/1007326 | 1,734 | 40 | 0.02 |
| geoTargetConstants/1006656 | 1,579 | 70 | 0.04 |
| geoTargetConstants/1006884 | 1,484 | 50 | 0.03 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006668 | 1,016 | 0 | 0.00 |
| geoTargetConstants/9255051 | 581 | 0 | 0.00 |
| geoTargetConstants/1007249 | 418 | 0 | 0.00 |
| geoTargetConstants/1007204 | 413 | 0 | 0.00 |
| geoTargetConstants/9194745 | 346 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-topics-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £236,110 | **DEP:** 11,690 | **DEP/Spend:** 0.05
- **Impressions:** 2,026,252 | **Clicks:** 3,961 | **Conversions:** 1,169
- **All Conversions Value:** 521,392 | **All Conversions:** 47,717
- **Active Months:** 14 (2024-05-01 → 2025-06-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 13,618 | 660 | 0.05 | 136,947 | 146 | 66 |
| 2024-06-01 | 14,422 | 700 | 0.05 | 130,357 | 163 | 70 |
| 2024-07-01 | 14,868 | 650 | 0.04 | 127,794 | 181 | 65 |
| 2024-08-01 | 21,176 | 810 | 0.04 | 140,395 | 158 | 81 |
| 2024-09-01 | 18,477 | 560 | 0.03 | 134,209 | 149 | 56 |
| 2024-10-01 | 11,931 | 660 | 0.06 | 98,289 | 97 | 66 |
| 2024-11-01 | 8,247 | 580 | 0.07 | 59,246 | 62 | 58 |
| 2024-12-01 | 8,284 | 380 | 0.05 | 56,818 | 58 | 38 |
| 2025-01-01 | 32,496 | 1,870 | 0.06 | 198,661 | 398 | 187 |
| 2025-02-01 | 26,910 | 1,420 | 0.05 | 197,167 | 510 | 142 |
| 2025-03-01 | 24,971 | 1,250 | 0.05 | 274,571 | 615 | 125 |
| 2025-04-01 | 20,136 | 1,120 | 0.06 | 217,708 | 575 | 112 |
| 2025-05-01 | 11,447 | 560 | 0.05 | 127,012 | 409 | 56 |
| 2025-06-01 | 9,127 | 470 | 0.05 | 127,078 | 440 | 47 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Mgmt_ProjectManagement_T-MultiAds` | ENABLED | 108,259 | 5,310 | 0.05 | 800,809 | 25.6 | 14.0 | 10.7 | 8.2 | 45% | 41% |
| `BussP_ProjectManagement_T-MultiAds` | ENABLED | 97,495 | 4,410 | 0.05 | 799,996 | 27.8 | 14.0 | 10.5 | 7.9 | 49% | 44% |
| `mondayProjectManagement_S-MultiAds` | ENABLED | 22,595 | 1,440 | 0.06 | 269,847 | 26.9 | 15.8 | 12.5 | 10.2 | 42% | 35% |
| `mondayWorkManagement_S-MultiAds` | PAUSED | 4,132 | 240 | 0.06 | 142,805 | 27.1 | 15.3 | 11.8 | 9.7 | 44% | 36% |
| `mondayProjectManagement_KW-MultiAds` | ENABLED | 3,629 | 290 | 0.08 | 12,795 | 25.5 | 14.3 | 11.0 | 8.0 | 44% | 44% |

**Ads in `Mgmt_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 723034279568 | PAUSED | 35,771 | 1,970 | 0.06 | 211,342 | 27.3 | 13.9 | 10.4 | 8.0 | 49% | 42% |
| `PD_ArtOfWork_Customize` | 701996300861 | PAUSED | 15,094 | 700 | 0.05 | 115,375 | 17.7 | 11.9 | 9.3 | 6.8 | 33% | 43% |
| `CR_MakesSense_Long` | 723034279565 | PAUSED | 9,643 | 460 | 0.05 | 53,762 | 20.3 | 12.5 | 9.9 | 7.8 | 39% | 38% |
| `PD_WorkOS_21sec_UK` | 686100294228 | PAUSED | 6,218 | 260 | 0.04 | 50,888 | 74.6 | 25.6 | 18.6 | 14.3 | 66% | 44% |
| `PD_TikToker_HackW` | 701554800643 | PAUSED | 5,868 | 340 | 0.06 | 39,293 | 28.8 | 16.7 | 13.1 | 9.6 | 42% | 43% |
| `PD_TikToker_HackM` | 701554801897 | PAUSED | 5,830 | 200 | 0.03 | 43,224 | 25.9 | 14.8 | 11.6 | 8.2 | 43% | 45% |
| `PD_WorkOS_Long` | 686100294174 | PAUSED | 4,319 | 120 | 0.03 | 56,683 | 22.6 | 13.5 | 10.3 | 8.6 | 40% | 37% |
| `PD_Linear_Actress` | 691098937184 | PAUSED | 2,878 | 110 | 0.04 | 16,352 | 21.0 | 13.8 | 10.9 | 9.4 | 34% | 32% |
| `PD_Llama_Skeleton_UK` | 744779604419 | ENABLED | 2,690 | 260 | 0.10 | 23,862 | 14.9 | 9.5 | 7.5 | 6.3 | 36% | 34% |
| `PD_WorkOS_21sec` | 686100294222 | PAUSED | 2,607 | 90 | 0.03 | 47,385 | 86.7 | 31.0 | 22.2 | 16.9 | 64% | 45% |
| `PD_TikToker_GoodNewsM` | 701554801642 | PAUSED | 2,256 | 80 | 0.04 | 21,982 | 27.7 | 18.5 | 15.5 | 10.5 | 33% | 43% |
| `PD_Linear_Group` | 691098937166 | PAUSED | 2,043 | 100 | 0.05 | 14,754 | 19.2 | 12.1 | 9.6 | 8.0 | 37% | 34% |
| `PD_TikToker_GoodNewsW` | 701554800412 | PAUSED | 1,768 | 160 | 0.09 | 9,486 | 24.0 | 14.0 | 10.7 | 8.0 | 42% | 43% |
| `PD_Reports_woman` | 705146928185 | PAUSED | 1,675 | 60 | 0.04 | 13,693 | 23.9 | 14.3 | 11.0 | 8.0 | 40% | 44% |
| `AT_NYwoman_Short` | 729134252573 | PAUSED | 1,400 | 20 | 0.01 | 6,927 | 33.9 | 15.9 | 11.9 | 9.6 | 53% | 40% |
| `PD_InShort_AI` | 754325961103 | ENABLED | 1,199 | 60 | 0.05 | 8,941 | 20.2 | 12.4 | 9.5 | 6.4 | 39% | 48% |
| `AT_Llama_Product` | 732926753440 | PAUSED | 951 | 20 | 0.02 | 4,993 | 21.3 | 13.6 | 10.7 | 8.5 | 36% | 37% |
| `AT_Shmuel_NewSplit` | 700168358086 | PAUSED | 906 | 40 | 0.04 | 7,030 | 34.1 | 18.0 | 13.3 | 10.1 | 47% | 44% |
| `PD_ArtOfWork_Flexibility` | 701996300609 | PAUSED | 763 | 30 | 0.04 | 6,531 | 24.5 | 17.6 | 14.8 | 12.4 | 28% | 30% |
| `AT_NYwoman_NotKnowing` | 729134252780 | PAUSED | 741 | 40 | 0.05 | 4,013 | 27.0 | 14.7 | 11.3 | 8.9 | 46% | 40% |
| `PD_YesBut_DeliverWW` | 680474229255 | PAUSED | 396 | 30 | 0.08 | 5,113 | 24.0 | 17.0 | 14.5 | 12.8 | 29% | 25% |
| `UT_Frank_Mix` | 675135937099 | PAUSED | 346 | 10 | 0.03 | 6,889 | 42.1 | 27.0 | 18.6 | 15.7 | 36% | 42% |
| `AT_NYwoman_Manager` | 729134252588 | PAUSED | 244 | 0 | 0.00 | 1,105 | 23.8 | 14.6 | 11.4 | 9.6 | 39% | 34% |
| `PD_WorkOS_Long_UK` | 686100294363 | PAUSED | 240 | 20 | 0.08 | 1,792 | 24.7 | 17.0 | 13.7 | 11.9 | 31% | 30% |
| `EfficiencyProductDemoTeams` | 639296169271 | PAUSED | 233 | 10 | 0.04 | 1,817 | 30.6 | 20.8 | 17.1 | 13.5 | 32% | 35% |
| `UT_SOH_Collaboration` | 688149281742 | PAUSED | 210 | 10 | 0.05 | 2,171 | 36.2 | 30.6 | 26.1 | 19.4 | 16% | 37% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604428 | ENABLED | 189 | 0 | 0.00 | 1,380 | 31.3 | 17.2 | 13.5 | 10.9 | 45% | 37% |
| `AT_Crystal_Short` | 727210948690 | PAUSED | 181 | 30 | 0.17 | 814 | 76.9 | 23.1 | 15.5 | 12.0 | 70% | 48% |
| `PD_Llama_Skeleton` | 744779604395 | ENABLED | 169 | 10 | 0.06 | 2,081 | 16.0 | 10.3 | 8.0 | 6.9 | 35% | 33% |
| `PD_YesBut_GoodAtWW` | 680474229522 | PAUSED | 165 | 10 | 0.06 | 2,245 | 24.6 | 17.5 | 15.1 | 12.2 | 29% | 30% |
| `PD_Dialogue_Long` | 683514804909 | PAUSED | 158 | 10 | 0.06 | 2,602 | 17.5 | 11.5 | 8.8 | 6.7 | 34% | 42% |
| `PD_YesBut_GoodAtMW` | 680474229282 | PAUSED | 101 | 0 | 0.00 | 1,315 | 25.0 | 18.8 | 14.4 | 12.7 | 25% | 32% |
| `PD_Dots_UK` | 694328003403 | PAUSED | 95 | 10 | 0.11 | 1,255 | 89.0 | 25.5 | 15.4 | 11.7 | 71% | 54% |
| `UT_Frank_Client` | 675135937336 | PAUSED | 91 | 0 | 0.00 | 565 | 23.5 | 15.4 | 10.7 | 9.1 | 34% | 41% |
| `AT_Shmuel_ShortRegular` | 698964744654 | PAUSED | 88 | 10 | 0.11 | 1,082 | 53.9 | 24.8 | 19.0 | 14.8 | 54% | 41% |
| `UT_SOH_Flexibility` | 688149281733 | PAUSED | 88 | 10 | 0.11 | 1,416 | 33.9 | 20.1 | 17.1 | 14.0 | 41% | 30% |
| `PD_YesBut_DeliverBritishRU` | 671499022011 | PAUSED | 81 | 0 | 0.00 | 962 | 18.5 | 10.3 | 8.7 | 7.2 | 45% | 30% |
| `AllConnectedOnePlace` | 660333415617 | PAUSED | 74 | 0 | 0.00 | 1,612 | 25.5 | 19.4 | 14.0 | 11.2 | 24% | 42% |
| `AT_Shmuel_NewRegular` | 700168357606 | PAUSED | 64 | 10 | 0.16 | 804 | 34.7 | 16.6 | 13.1 | 9.5 | 52% | 43% |
| `CR_Confidence_Men_UK` | 730045613990 | ENABLED | 59 | 0 | 0.00 | 455 | 30.6 | 14.8 | 9.6 | 7.2 | 52% | 52% |
| `CR_Confidence_Women_UK` | 730045614128 | ENABLED | 56 | 10 | 0.18 | 367 | 27.1 | 13.5 | 10.2 | 7.9 | 50% | 41% |
| `PD_YesBut_DeliverMM` | 671185832617 | PAUSED | 56 | 0 | 0.00 | 3,262 | 22.4 | 12.6 | 9.4 | 7.7 | 43% | 39% |
| `CR_HiGoogie` | 677777097299 | PAUSED | 55 | 0 | 0.00 | 1,174 | 41.2 | 24.8 | 18.0 | 15.5 | 40% | 38% |
| `AT_Crystal_Long` | 727210948525 | PAUSED | 55 | 0 | 0.00 | 234 | 32.6 | 13.2 | 8.7 | 6.3 | 59% | 52% |
| `PD_Llama_Angry_Short_NoIntro` | 744779604410 | ENABLED | 44 | 0 | 0.00 | 445 | 32.7 | 17.7 | 12.2 | 9.8 | 46% | 45% |
| `AT_Shmuel_ShortSplit` | 698964745380 | PAUSED | 39 | 0 | 0.00 | 704 | 57.2 | 22.8 | 18.2 | 13.2 | 60% | 42% |
| `PD_Reports_VO` | 705146928176 | PAUSED | 25 | 0 | 0.00 | 239 | 24.2 | 10.9 | 10.3 | 9.1 | 55% | 17% |
| `DL_AI_Llama_Long` | 751474622871 | ENABLED | 23 | 0 | 0.00 | 198 | 16.9 | 9.0 | 6.8 | 4.5 | 47% | 50% |
| `DL_AI_Llama_Short` | 751474623510 | ENABLED | 13 | 0 | 0.00 | 178 | 36.5 | 18.3 | 11.2 | 9.9 | 50% | 46% |

**Ads in `BussP_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec_UK` | 686100294168 | PAUSED | 15,037 | 480 | 0.03 | 52,607 | 72.5 | 24.1 | 16.7 | 12.6 | 67% | 48% |
| `PD_ArtOfWork_Customize` | 701996300615 | PAUSED | 12,470 | 630 | 0.05 | 88,750 | 16.1 | 10.6 | 8.0 | 5.6 | 34% | 47% |
| `CR_MakesSense_Short` | 723034279385 | PAUSED | 11,145 | 530 | 0.05 | 70,039 | 27.4 | 14.1 | 10.5 | 8.1 | 49% | 42% |
| `PD_TikToker_HackM` | 701554802785 | PAUSED | 10,538 | 370 | 0.04 | 86,324 | 24.3 | 13.7 | 10.4 | 7.1 | 44% | 48% |
| `PD_TikToker_HackW` | 701554802638 | PAUSED | 10,129 | 490 | 0.05 | 94,599 | 30.6 | 20.0 | 16.4 | 11.0 | 35% | 45% |
| `PD_WorkOS_21sec` | 686100293970 | PAUSED | 4,802 | 160 | 0.03 | 83,312 | 89.8 | 36.3 | 26.8 | 21.2 | 60% | 41% |
| `PD_TikToker_GoodNewsM` | 701554800457 | PAUSED | 3,831 | 240 | 0.06 | 50,433 | 30.6 | 19.9 | 16.5 | 11.3 | 35% | 44% |
| `PD_Linear_Actress` | 691098936917 | PAUSED | 3,156 | 160 | 0.05 | 23,232 | 19.1 | 12.0 | 9.5 | 7.9 | 37% | 34% |
| `PD_WorkOS_Long` | 686100293967 | PAUSED | 2,921 | 160 | 0.05 | 70,037 | 32.9 | 21.5 | 17.5 | 14.8 | 34% | 31% |
| `PD_Llama_Skeleton_UK` | 744779604479 | ENABLED | 2,895 | 200 | 0.07 | 24,298 | 14.0 | 8.6 | 6.5 | 5.3 | 39% | 38% |
| `PD_Linear_Group` | 691098936899 | PAUSED | 2,775 | 200 | 0.07 | 19,081 | 17.7 | 11.0 | 8.5 | 7.0 | 38% | 36% |
| `AT_NYwoman_Short` | 729134252321 | PAUSED | 2,207 | 120 | 0.05 | 12,680 | 32.9 | 15.3 | 11.2 | 8.7 | 54% | 43% |
| `AT_Shmuel_NewSplit` | 700168358080 | PAUSED | 1,939 | 70 | 0.04 | 12,536 | 32.7 | 16.7 | 12.1 | 9.3 | 49% | 44% |
| `PD_InShort_AI` | 754325960866 | ENABLED | 1,895 | 90 | 0.05 | 13,270 | 19.5 | 12.0 | 9.3 | 6.4 | 38% | 47% |
| `PD_Dialogue_Long` | 683514805341 | PAUSED | 1,605 | 90 | 0.06 | 12,573 | 15.5 | 9.2 | 6.8 | 4.9 | 41% | 46% |
| `CR_MakesSense_Long` | 723034279613 | PAUSED | 1,327 | 50 | 0.04 | 5,727 | 21.6 | 13.2 | 11.0 | 8.8 | 39% | 33% |
| `PD_TikToker_GoodNewsW` | 701554800931 | PAUSED | 963 | 120 | 0.12 | 3,263 | 24.6 | 14.5 | 11.4 | 8.4 | 41% | 42% |
| `AT_Shmuel_ShortRegular` | 698964745353 | PAUSED | 724 | 20 | 0.03 | 4,707 | 49.0 | 20.8 | 14.5 | 10.9 | 58% | 48% |
| `PD_Reports_woman` | 705146927954 | PAUSED | 713 | 20 | 0.03 | 9,955 | 23.4 | 14.2 | 10.7 | 7.3 | 39% | 49% |
| `PD_YesBut_DeliverWW` | 680474229285 | PAUSED | 672 | 20 | 0.03 | 10,451 | 20.8 | 13.9 | 11.4 | 9.7 | 33% | 31% |
| `PD_WorkOS_Long_UK` | 686100294195 | PAUSED | 525 | 20 | 0.04 | 2,920 | 22.6 | 14.6 | 11.3 | 9.6 | 36% | 34% |
| `EfficiencyProductDemoTeams` | 639296168830 | PAUSED | 482 | 20 | 0.04 | 3,144 | 21.7 | 12.1 | 9.1 | 7.3 | 44% | 40% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604440 | ENABLED | 426 | 10 | 0.02 | 4,052 | 31.2 | 15.8 | 11.8 | 9.9 | 49% | 38% |
| `PD_ArtOfWork_Flexibility` | 701996300588 | PAUSED | 396 | 10 | 0.03 | 2,059 | 32.3 | 24.4 | 21.6 | 16.9 | 24% | 31% |
| `PD_YesBut_GoodAtWW` | 680474229510 | PAUSED | 364 | 40 | 0.11 | 3,195 | 20.7 | 13.3 | 11.0 | 9.1 | 36% | 32% |
| `PD_YesBut_DeliverBritishRU` | 671499021822 | PAUSED | 299 | 0 | 0.00 | 3,340 | 16.7 | 9.3 | 7.5 | 6.0 | 44% | 36% |
| `AT_NYwoman_Manager` | 729134252639 | PAUSED | 281 | 10 | 0.04 | 1,546 | 26.4 | 15.3 | 11.2 | 9.5 | 42% | 38% |
| `PD_Llama_Skeleton` | 744779604461 | ENABLED | 278 | 10 | 0.04 | 4,268 | 15.3 | 10.1 | 7.5 | 5.8 | 34% | 42% |
| `UT_Frank_Mix` | 675135937333 | PAUSED | 275 | 10 | 0.04 | 3,029 | 30.9 | 21.7 | 17.9 | 13.4 | 30% | 38% |
| `AT_NYwoman_NotKnowing` | 729134251877 | PAUSED | 263 | 10 | 0.04 | 1,545 | 27.4 | 15.6 | 11.7 | 9.5 | 43% | 39% |
| `UT_SOH_Flexibility` | 688149281655 | PAUSED | 246 | 10 | 0.04 | 2,258 | 28.5 | 15.7 | 12.2 | 10.1 | 45% | 36% |
| `PD_Dots_UK` | 694328003271 | PAUSED | 242 | 0 | 0.00 | 2,454 | 89.7 | 23.4 | 17.6 | 13.3 | 74% | 43% |
| `DL_AI_Llama_Short` | 751474623030 | ENABLED | 167 | 0 | 0.00 | 1,473 | 28.9 | 15.4 | 11.2 | 8.4 | 47% | 46% |
| `PD_YesBut_GoodAtMW` | 680474229087 | PAUSED | 159 | 20 | 0.13 | 1,241 | 18.6 | 9.3 | 7.8 | 6.8 | 50% | 26% |
| `UT_SOH_Collaboration` | 688149281484 | PAUSED | 156 | 0 | 0.00 | 589 | 32.7 | 25.2 | 19.6 | 16.6 | 23% | 34% |
| `UT_Frank_Client` | 675135936853 | PAUSED | 134 | 0 | 0.00 | 717 | 18.6 | 11.7 | 9.2 | 8.8 | 37% | 25% |
| `PD_Llama_Angry_Short_NoIntro` | 744779604458 | ENABLED | 125 | 0 | 0.00 | 1,139 | 26.7 | 13.2 | 8.5 | 7.5 | 51% | 43% |
| `AT_Llama_Product` | 732926753458 | PAUSED | 119 | 10 | 0.08 | 496 | 23.6 | 13.1 | 9.5 | 6.8 | 44% | 48% |
| `CR_Confidence_Men_UK` | 730045613987 | ENABLED | 119 | 0 | 0.00 | 1,818 | 26.5 | 14.6 | 9.3 | 7.7 | 45% | 47% |
| `PD_YesBut_DeliverMM` | 671185832803 | PAUSED | 107 | 0 | 0.00 | 3,746 | 17.8 | 12.5 | 11.8 | 8.0 | 30% | 36% |
| `AllConnectedOnePlace` | 660333415344 | PAUSED | 94 | 0 | 0.00 | 1,648 | 22.7 | 13.1 | 10.9 | 8.0 | 42% | 39% |
| `CR_HiGoogie` | 677777097962 | PAUSED | 88 | 0 | 0.00 | 1,062 | 45.2 | 19.4 | 15.0 | 12.6 | 57% | 35% |
| `AT_Shmuel_NewRegular` | 700168358065 | PAUSED | 79 | 0 | 0.00 | 865 | 32.6 | 14.3 | 9.9 | 7.8 | 56% | 46% |
| `DL_AI_Llama_Long` | 751474622808 | ENABLED | 67 | 0 | 0.00 | 550 | 22.9 | 14.9 | 12.4 | 10.6 | 35% | 29% |
| `AT_Shmuel_ShortSplit` | 698964745437 | PAUSED | 65 | 0 | 0.00 | 851 | 52.4 | 25.3 | 18.0 | 15.6 | 52% | 38% |
| `AT_Crystal_Short` | 727210948792 | PAUSED | 65 | 0 | 0.00 | 268 | 75.3 | 24.4 | 16.0 | 11.2 | 68% | 54% |
| `PD_Reports_VO` | 705146927981 | PAUSED | 58 | 0 | 0.00 | 1,145 | 19.9 | 10.1 | 9.1 | 7.9 | 49% | 22% |
| `CR_Confidence_Women_UK` | 730045613978 | ENABLED | 51 | 10 | 0.20 | 416 | 32.7 | 19.3 | 10.3 | 7.6 | 41% | 61% |
| `AT_Crystal_Long` | 727210948939 | PAUSED | 16 | 0 | 0.00 | 70 | 58.1 | 36.6 | 28.8 | 18.3 | 37% | 50% |

**Ads in `mondayProjectManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 727538395199 | PAUSED | 9,331 | 680 | 0.07 | 65,790 | 27.8 | 15.1 | 11.7 | 9.4 | 46% | 38% |
| `CR_MakesSense_Long` | 727538395370 | PAUSED | 2,252 | 180 | 0.08 | 10,916 | 20.5 | 13.0 | 10.7 | 8.4 | 36% | 35% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604476 | ENABLED | 1,526 | 40 | 0.03 | 17,114 | 33.7 | 19.8 | 15.6 | 13.4 | 41% | 32% |
| `AT_NYwoman_Short` | 729134252618 | PAUSED | 1,300 | 110 | 0.08 | 15,348 | 36.8 | 20.7 | 16.8 | 14.5 | 44% | 30% |
| `PD_TikToker_GoodNewsM` | 727538395598 | PAUSED | 1,248 | 60 | 0.05 | 46,557 | 27.2 | 18.3 | 14.9 | 12.1 | 33% | 34% |
| `PD_InShort_AI` | 754325961088 | ENABLED | 1,228 | 90 | 0.07 | 13,470 | 22.5 | 14.8 | 11.6 | 8.8 | 34% | 40% |
| `AT_NYwoman_Manager` | 729134252546 | PAUSED | 1,068 | 40 | 0.04 | 8,625 | 30.7 | 19.8 | 16.4 | 14.5 | 36% | 27% |
| `PD_WorkOS_21sec` | 727538394695 | PAUSED | 918 | 40 | 0.04 | 34,724 | 89.7 | 36.1 | 28.5 | 24.2 | 60% | 33% |
| `PD_Linear_Group` | 727538395124 | PAUSED | 733 | 70 | 0.10 | 8,012 | 23.5 | 15.7 | 12.6 | 10.9 | 33% | 30% |
| `PD_TikToker_HackW` | 727538395367 | PAUSED | 673 | 40 | 0.06 | 10,350 | 26.2 | 16.0 | 12.6 | 9.8 | 39% | 39% |
| `PD_Llama_Skeleton_UK` | 744779604455 | ENABLED | 610 | 10 | 0.02 | 6,088 | 19.7 | 13.6 | 11.1 | 9.5 | 31% | 30% |
| `PD_Linear_Actress` | 727538394902 | PAUSED | 322 | 10 | 0.03 | 2,253 | 24.0 | 16.2 | 13.4 | 11.4 | 32% | 29% |
| `PD_TikToker_HackM` | 727538395562 | PAUSED | 249 | 10 | 0.04 | 1,785 | 29.2 | 18.4 | 14.6 | 12.5 | 37% | 32% |
| `AT_NYwoman_NotKnowing` | 729134252597 | PAUSED | 191 | 0 | 0.00 | 3,449 | 35.5 | 24.5 | 20.2 | 19.0 | 31% | 22% |
| `PD_Reports_woman` | 727538394923 | PAUSED | 172 | 10 | 0.06 | 3,791 | 7.2 | 4.1 | 3.0 | 2.3 | 43% | 45% |
| `PD_Llama_Skeleton` | 744779604473 | ENABLED | 161 | 10 | 0.06 | 2,855 | 15.1 | 10.3 | 7.9 | 6.2 | 32% | 39% |
| `UT_Frank_Mix` | 727538394848 | PAUSED | 156 | 10 | 0.06 | 11,107 | 35.1 | 23.3 | 16.8 | 15.7 | 34% | 33% |
| `PD_WorkOS_Long` | 727538395337 | PAUSED | 104 | 10 | 0.10 | 1,871 | 28.6 | 20.0 | 18.1 | 14.6 | 30% | 27% |
| `PD_Llama_Angry_Short_NoIntro` | 744779604434 | ENABLED | 77 | 10 | 0.13 | 1,026 | 29.3 | 13.6 | 11.4 | 8.9 | 54% | 35% |
| `DL_AI_Llama_Short` | 751474623564 | ENABLED | 63 | 10 | 0.16 | 1,562 | 30.3 | 17.4 | 14.0 | 11.3 | 42% | 35% |
| `DL_AI_Llama_Long` | 751474622865 | ENABLED | 61 | 0 | 0.00 | 962 | 25.1 | 15.8 | 12.0 | 11.2 | 37% | 29% |
| `CR_Confidence_Men_UK` | 730045613975 | ENABLED | 45 | 0 | 0.00 | 999 | 29.5 | 19.5 | 13.8 | 10.7 | 34% | 45% |
| `CR_Confidence_Women_UK` | 730045614131 | ENABLED | 33 | 0 | 0.00 | 574 | 38.4 | 22.1 | 18.8 | 13.9 | 42% | 37% |
| `AT_Crystal_Short` | 727538394659 | PAUSED | 32 | 0 | 0.00 | 243 | 71.5 | 22.1 | 14.7 | 12.3 | 69% | 44% |
| `AT_Llama_Product` | 732926753668 | PAUSED | 26 | 0 | 0.00 | 225 | 20.3 | 12.1 | 10.2 | 8.0 | 40% | 34% |
| `AT_Crystal_Long` | 727538394884 | PAUSED | 15 | 0 | 0.00 | 151 | 30.8 | 15.7 | 13.8 | 10.9 | 49% | 30% |

**Ads in `mondayWorkManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 727538394845 | PAUSED | 2,550 | 110 | 0.04 | 31,007 | 28.1 | 15.8 | 12.3 | 10.0 | 44% | 37% |
| `PD_WorkOS_21sec` | 727538394917 | PAUSED | 661 | 40 | 0.06 | 89,941 | 66.3 | 22.3 | 17.3 | 15.3 | 66% | 31% |
| `CR_MakesSense_Long` | 727538395436 | PAUSED | 398 | 60 | 0.15 | 5,238 | 21.4 | 14.2 | 11.0 | 9.2 | 34% | 35% |
| `AT_NYwoman_Short` | 729134251916 | PAUSED | 110 | 10 | 0.09 | 1,907 | 37.2 | 19.1 | 14.3 | 12.7 | 49% | 34% |
| `PD_Linear_Actress` | 727538394893 | PAUSED | 88 | 0 | 0.00 | 1,223 | 24.6 | 16.1 | 11.9 | 9.5 | 34% | 41% |
| `AT_NYwoman_NotKnowing` | 729134251898 | PAUSED | 50 | 0 | 0.00 | 1,125 | 23.8 | 14.8 | 10.8 | 8.7 | 38% | 42% |
| `PD_TikToker_HackM` | 727538395196 | PAUSED | 42 | 0 | 0.00 | 1,392 | 31.4 | 25.0 | 19.7 | 15.1 | 20% | 40% |
| `PD_Llama_Skeleton_UK` | 744779604389 | ENABLED | 42 | 10 | 0.24 | 1,646 | 20.9 | 14.4 | 12.0 | 9.4 | 31% | 35% |
| `PD_TikToker_HackW` | 727538394698 | PAUSED | 29 | 0 | 0.00 | 1,665 | 11.1 | 6.2 | 5.2 | 2.6 | 45% | 58% |
| `PD_WorkOS_Long` | 727538395328 | PAUSED | 26 | 0 | 0.00 | 1,491 | 23.6 | 16.8 | 14.6 | 12.3 | 29% | 27% |
| `AT_NYwoman_Manager` | 729134252816 | PAUSED | 25 | 10 | 0.40 | 706 | 28.6 | 16.3 | 13.9 | 13.0 | 43% | 20% |
| `PD_Reports_woman` | 727538394908 | PAUSED | 24 | 0 | 0.00 | 1,375 | 5.3 | 2.7 | 2.1 | 1.4 | 49% | 48% |
| `PD_TikToker_GoodNewsM` | 727538395127 | PAUSED | 19 | 0 | 0.00 | 633 | 20.0 | 8.3 | 4.1 | 4.1 | 59% | 51% |
| `PD_Linear_Group` | 727538395439 | PAUSED | 17 | 0 | 0.00 | 264 | 26.4 | 19.6 | 15.8 | 14.6 | 26% | 25% |
| `AT_Llama_Product` | 732926753515 | PAUSED | 11 | 0 | 0.00 | 295 | 23.5 | 13.0 | 12.3 | 11.2 | 45% | 14% |

**Ads in `mondayProjectManagement_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 727538395613 | PAUSED | 1,373 | 160 | 0.12 | 5,817 | 27.1 | 14.3 | 11.0 | 8.1 | 47% | 43% |
| `CR_MakesSense_Long` | 727538394671 | PAUSED | 268 | 20 | 0.07 | 1,033 | 23.1 | 14.8 | 11.5 | 7.2 | 36% | 51% |
| `PD_WorkOS_21sec` | 727538395190 | PAUSED | 231 | 10 | 0.04 | 581 | 86.8 | 33.2 | 29.9 | 24.4 | 62% | 27% |
| `AT_NYwoman_Short` | 729134251892 | PAUSED | 228 | 20 | 0.09 | 587 | 35.7 | 16.1 | 10.8 | 7.8 | 55% | 52% |
| `PD_Llama_Skeleton_UK` | 744779604449 | ENABLED | 213 | 10 | 0.05 | 1,060 | 15.0 | 10.2 | 8.6 | 6.5 | 32% | 36% |
| `PD_Linear_Actress` | 727538395604 | PAUSED | 210 | 0 | 0.00 | 460 | 21.3 | 12.3 | 10.1 | 8.5 | 42% | 31% |
| `PD_Linear_Group` | 727538394704 | PAUSED | 207 | 10 | 0.05 | 614 | 16.7 | 11.3 | 8.7 | 6.4 | 32% | 44% |
| `PD_TikToker_GoodNewsM` | 727538395382 | PAUSED | 164 | 20 | 0.12 | 412 | 35.2 | 24.0 | 19.4 | 9.9 | 32% | 59% |
| `PD_InShort_AI` | 754325960836 | ENABLED | 152 | 10 | 0.07 | 599 | 25.9 | 17.3 | 13.6 | 8.9 | 33% | 48% |
| `PD_TikToker_HackM` | 727538395331 | PAUSED | 128 | 0 | 0.00 | 279 | 30.2 | 19.2 | 16.4 | 11.9 | 36% | 38% |
| `PD_TikToker_HackW` | 727538394926 | PAUSED | 114 | 0 | 0.00 | 299 | 39.1 | 31.2 | 31.2 | 13.2 | 20% | 58% |
| `AT_NYwoman_NotKnowing` | 729134251889 | PAUSED | 78 | 10 | 0.13 | 194 | 23.2 | 12.1 | 6.7 | 4.4 | 48% | 63% |
| `AT_NYwoman_Manager` | 729134252297 | PAUSED | 62 | 0 | 0.00 | 112 | 22.0 | 14.7 | 10.7 | 9.8 | 33% | 34% |
| `PD_Llama_Skeleton` | 744779604452 | ENABLED | 39 | 10 | 0.25 | 254 | 14.0 | 9.2 | 6.8 | 5.2 | 34% | 43% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604398 | ENABLED | 37 | 0 | 0.00 | 129 | 33.8 | 20.2 | 14.5 | 13.7 | 40% | 32% |
| `AT_Llama_Product` | 732926753269 | PAUSED | 26 | 0 | 0.00 | 63 | 16.1 | 6.4 | 1.6 | 0.0 | 60% | 100% |
| `PD_WorkOS_Long` | 727538395385 | PAUSED | 17 | 0 | 0.00 | 44 | 13.1 | 5.3 | 5.3 | 2.6 | 60% | 50% |
| `CR_Confidence_Men_UK` | 730045613981 | ENABLED | 14 | 0 | 0.00 | 46 | 32.1 | 19.8 | 17.1 | 17.1 | 38% | 13% |
| `AT_Crystal_Short` | 727538395595 | PAUSED | 14 | 10 | 0.72 | 30 | 70.0 | 20.0 | 10.0 | 10.0 | 71% | 50% |
| `PD_Reports_woman` | 727538394842 | PAUSED | 14 | 0 | 0.00 | 41 | 31.7 | 22.0 | 12.2 | 9.8 | 31% | 56% |
| `UT_Frank_Mix` | 727538395616 | PAUSED | 11 | 0 | 0.00 | 27 | 34.7 | 22.9 | 4.0 | 4.0 | 34% | 82% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 236,110 | 11,690 | 0.05 | 2,026,252 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 55,974 | 3,060 | 0.05 |
| geoTargetConstants/1006912 | 6,166 | 200 | 0.03 |
| geoTargetConstants/1007850 | 5,013 | 180 | 0.04 |
| geoTargetConstants/1006524 | 4,321 | 150 | 0.03 |
| geoTargetConstants/1006567 | 2,632 | 100 | 0.04 |
| geoTargetConstants/1007336 | 2,265 | 60 | 0.03 |
| geoTargetConstants/1006864 | 2,176 | 130 | 0.06 |
| geoTargetConstants/1006656 | 1,900 | 80 | 0.04 |
| geoTargetConstants/1007326 | 1,899 | 90 | 0.05 |
| geoTargetConstants/1007064 | 1,516 | 90 | 0.06 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006988 | 829 | 0 | 0.00 |
| geoTargetConstants/9225752 | 571 | 0 | 0.00 |
| geoTargetConstants/1007835 | 455 | 0 | 0.00 |
| geoTargetConstants/1007089 | 449 | 0 | 0.00 |
| geoTargetConstants/9226434 | 405 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-employment-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £212,289 | **DEP:** 81,300 | **DEP/Spend:** 0.38
- **Impressions:** 23,346,510 | **Clicks:** 34,038 | **Conversions:** 813
- **All Conversions Value:** 1,321,766 | **All Conversions:** 196,461
- **Active Months:** 6 (2025-01-01 → 2025-06-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-01-01 | 40,884 | 19,000 | 0.46 | 5,078,451 | 5,612 | 190 |
| 2025-02-01 | 46,660 | 19,500 | 0.42 | 4,475,734 | 5,920 | 195 |
| 2025-03-01 | 45,682 | 19,100 | 0.42 | 4,462,795 | 5,862 | 191 |
| 2025-04-01 | 41,869 | 11,100 | 0.27 | 4,036,712 | 5,875 | 111 |
| 2025-05-01 | 30,160 | 10,100 | 0.33 | 4,028,645 | 7,617 | 101 |
| 2025-06-01 | 7,035 | 2,500 | 0.36 | 1,264,173 | 3,152 | 25 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `IndustryTechnology_EM-MultiAds` | ENABLED | 138,498 | 55,300 | 0.40 | 14,602,334 | 30.7 | 19.4 | 15.8 | 13.6 | 37% | 30% |
| `EmployerLarge_EM-MultiAds` | ENABLED | 73,539 | 25,800 | 0.35 | 8,719,037 | 33.8 | 21.4 | 17.7 | 15.2 | 37% | 29% |
| `IndustryRealEstate_EM-MultiAds` | ENABLED | 252 | 200 | 0.79 | 25,139 | 18.9 | 12.8 | 10.8 | 8.7 | 32% | 32% |

**Ads in `IndustryTechnology_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 727538395187 | REMOVED | 94,724 | 41,300 | 0.44 | 5,193,931 | 32.5 | 20.1 | 16.3 | 14.0 | 38% | 30% |
| `PD_WorkOS_21sec` | 727538395103 | REMOVED | 19,333 | 6,500 | 0.34 | 7,112,969 | 21.9 | 10.4 | 8.0 | 6.6 | 53% | 37% |
| `CR_MakesSense_Long` | 727538395376 | REMOVED | 15,649 | 5,500 | 0.35 | 1,009,213 | 25.3 | 17.3 | 14.2 | 12.1 | 32% | 30% |
| `PD_Linear_Actress` | 727538395427 | REMOVED | 1,303 | 300 | 0.23 | 58,485 | 35.1 | 26.7 | 22.7 | 20.1 | 24% | 25% |
| `PD_WorkOS_Long` | 727538394692 | REMOVED | 1,295 | 300 | 0.23 | 515,616 | 7.8 | 5.1 | 4.1 | 3.5 | 35% | 30% |
| `PD_WorkOS_21sec` | 758711070927 | PAUSED | 1,058 | 400 | 0.38 | 310,978 | 11.5 | 6.0 | 4.9 | 3.6 | 48% | 39% |
| `PD_Reports_woman` | 727538395409 | REMOVED | 825 | 200 | 0.24 | 107,432 | 5.3 | 3.1 | 2.4 | 1.8 | 42% | 42% |
| `AT_NYwoman_NotKnowing` | 729134252126 | REMOVED | 748 | 100 | 0.13 | 43,514 | 28.5 | 18.5 | 15.0 | 13.0 | 35% | 29% |
| `PD_InShort_AI` | 758711127486 | ENABLED | 619 | 200 | 0.32 | 21,575 | 23.3 | 15.7 | 12.8 | 10.4 | 33% | 34% |
| `AT_NYwoman_Short` | 729134252117 | REMOVED | 406 | 200 | 0.49 | 25,689 | 38.0 | 23.2 | 19.3 | 17.0 | 39% | 27% |
| `PD_Llama_Skeleton_UK` | 744779604413 | REMOVED | 305 | 100 | 0.33 | 13,907 | 25.1 | 18.4 | 15.4 | 13.1 | 27% | 29% |
| `PD_Llama_Skeleton` | 744779604404 | REMOVED | 234 | 0 | 0.00 | 18,343 | 26.7 | 20.0 | 16.5 | 14.3 | 25% | 28% |
| `PD_Linear_Group` | 727538395181 | REMOVED | 209 | 0 | 0.00 | 12,607 | 34.7 | 25.9 | 21.5 | 19.1 | 25% | 26% |
| `PD_Llama_Skeleton` | 758711127798 | ENABLED | 206 | 0 | 0.00 | 12,136 | 18.2 | 13.1 | 10.7 | 9.0 | 28% | 31% |
| `PD_TikToker_GoodNewsM` | 727538394662 | REMOVED | 183 | 0 | 0.00 | 19,642 | 14.2 | 9.6 | 7.9 | 6.4 | 33% | 33% |
| `AT_NYwoman_Manager` | 729134252795 | REMOVED | 180 | 0 | 0.00 | 14,991 | 29.0 | 19.3 | 16.1 | 14.0 | 34% | 27% |
| `PD_TikToker_HackM` | 727538394950 | REMOVED | 174 | 100 | 0.58 | 13,685 | 26.5 | 18.1 | 15.3 | 12.9 | 32% | 29% |
| `PD_TikToker_HackW` | 727538394701 | REMOVED | 152 | 0 | 0.00 | 18,345 | 18.9 | 11.9 | 9.9 | 8.0 | 37% | 32% |
| `PD_Reports_woman` | 758711127492 | PAUSED | 138 | 0 | 0.00 | 14,539 | 3.7 | 2.0 | 1.4 | 1.0 | 47% | 50% |
| `AT_Llama_Product` | 732926753278 | REMOVED | 95 | 0 | 0.00 | 2,572 | 25.1 | 16.9 | 13.7 | 11.2 | 33% | 33% |
| `PD_TikToker_GoodNewsM` | 758711070933 | PAUSED | 74 | 0 | 0.00 | 4,751 | 29.8 | 20.7 | 17.2 | 15.3 | 30% | 26% |
| `PD_InShort_AI` | 754325961049 | REMOVED | 68 | 0 | 0.00 | 4,827 | 22.5 | 15.0 | 12.5 | 10.1 | 33% | 33% |
| `AT_Crystal_Short` | 727538395364 | REMOVED | 65 | 0 | 0.00 | 7,702 | 67.8 | 26.5 | 20.1 | 17.5 | 61% | 34% |
| `PD_Llama_Angry_Short_NoIntro` | 758711127723 | ENABLED | 59 | 100 | 1.71 | 3,785 | 31.8 | 20.3 | 17.1 | 14.6 | 36% | 28% |
| `CR_Confidence_Men_UK` | 730045613966 | REMOVED | 52 | 0 | 0.00 | 6,554 | 23.4 | 13.5 | 10.5 | 8.7 | 42% | 35% |
| `PD_Linear_Actress` | 758711127567 | PAUSED | 51 | 0 | 0.00 | 2,336 | 27.3 | 18.8 | 15.6 | 13.5 | 31% | 28% |
| `CR_Confidence_Women_UK` | 730045614125 | REMOVED | 51 | 0 | 0.00 | 7,108 | 24.0 | 15.7 | 12.6 | 10.8 | 35% | 31% |
| `UT_Frank_Mix` | 727538394851 | REMOVED | 43 | 0 | 0.00 | 4,866 | 39.2 | 28.2 | 24.5 | 21.5 | 28% | 24% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604422 | REMOVED | 37 | 0 | 0.00 | 5,707 | 12.7 | 8.1 | 6.4 | 5.9 | 37% | 27% |
| `DL_AI_Llama_Long` | 751474622811 | REMOVED | 21 | 0 | 0.00 | 1,560 | 25.4 | 19.3 | 15.9 | 14.4 | 24% | 26% |
| `PD_Llama_Skeleton_UK` | 758711127543 | ENABLED | 21 | 0 | 0.00 | 1,015 | 33.3 | 25.7 | 22.4 | 19.7 | 23% | 23% |
| `AT_Crystal_Long` | 727538395421 | REMOVED | 19 | 0 | 0.00 | 2,812 | 36.9 | 21.8 | 17.7 | 14.9 | 41% | 32% |
| `PD_Llama_Angry_Short_NoIntro` | 744779604401 | REMOVED | 16 | 0 | 0.00 | 1,404 | 29.0 | 18.6 | 15.7 | 13.5 | 36% | 27% |
| `PD_TikToker_HackM` | 758711127531 | PAUSED | 15 | 0 | 0.00 | 774 | 27.0 | 23.0 | 20.6 | 16.2 | 15% | 30% |
| `DL_AI_Llama_Short` | 751474623060 | REMOVED | 14 | 0 | 0.00 | 1,618 | 26.2 | 18.3 | 16.6 | 14.3 | 30% | 22% |
| `AT_NYwoman_Short` | 758711127762 | PAUSED | 11 | 0 | 0.00 | 625 | 44.6 | 30.4 | 26.6 | 23.1 | 32% | 24% |
| `AT_NYwoman_Manager` | 758711127597 | PAUSED | 10 | 0 | 0.00 | 876 | 48.2 | 39.3 | 35.7 | 34.6 | 18% | 12% |

**Ads in `EmployerLarge_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 727538394887 | PAUSED | 50,644 | 17,100 | 0.34 | 2,452,835 | 36.4 | 22.8 | 18.8 | 16.2 | 37% | 29% |
| `PD_WorkOS_21sec` | 727538394707 | PAUSED | 14,833 | 5,400 | 0.36 | 5,455,065 | 17.7 | 9.1 | 6.9 | 5.5 | 48% | 39% |
| `CR_MakesSense_Long` | 727538394944 | PAUSED | 3,424 | 1,900 | 0.55 | 248,102 | 26.7 | 18.2 | 15.0 | 12.7 | 32% | 31% |
| `PD_Linear_Actress` | 727538394941 | PAUSED | 667 | 100 | 0.15 | 27,470 | 37.5 | 28.9 | 24.8 | 22.1 | 23% | 23% |
| `PD_Reports_woman` | 727538394896 | PAUSED | 604 | 200 | 0.33 | 90,217 | 4.7 | 2.6 | 2.0 | 1.5 | 43% | 44% |
| `AT_NYwoman_Short` | 729134252309 | PAUSED | 524 | 100 | 0.19 | 20,697 | 44.9 | 29.0 | 24.4 | 21.8 | 35% | 25% |
| `PD_WorkOS_Long` | 727538395601 | PAUSED | 469 | 200 | 0.43 | 226,307 | 5.1 | 3.1 | 2.5 | 2.1 | 39% | 33% |
| `AT_NYwoman_NotKnowing` | 729134252606 | PAUSED | 399 | 0 | 0.00 | 28,503 | 32.0 | 21.6 | 18.1 | 15.9 | 32% | 27% |
| `PD_TikToker_GoodNewsM` | 727538395403 | PAUSED | 368 | 100 | 0.27 | 37,730 | 16.7 | 10.3 | 8.8 | 7.2 | 38% | 30% |
| `PD_InShort_AI` | 754325961016 | ENABLED | 332 | 200 | 0.60 | 14,650 | 23.5 | 15.2 | 12.2 | 9.6 | 36% | 37% |
| `PD_Llama_Skeleton` | 744779604467 | ENABLED | 291 | 100 | 0.34 | 21,415 | 27.1 | 20.9 | 17.5 | 15.2 | 23% | 27% |
| `PD_Llama_Skeleton_UK` | 744779604425 | ENABLED | 247 | 0 | 0.00 | 13,926 | 28.2 | 21.1 | 18.1 | 15.7 | 25% | 26% |
| `PD_TikToker_HackM` | 727538394686 | PAUSED | 171 | 200 | 1.17 | 14,028 | 25.1 | 16.5 | 13.7 | 11.1 | 34% | 33% |
| `PD_TikToker_HackW` | 727538394668 | PAUSED | 161 | 100 | 0.62 | 21,955 | 10.6 | 5.9 | 4.6 | 3.3 | 44% | 45% |
| `PD_Linear_Group` | 727538395091 | PAUSED | 97 | 0 | 0.00 | 7,286 | 33.4 | 25.1 | 21.0 | 18.8 | 25% | 25% |
| `AT_NYwoman_Manager` | 729134252813 | PAUSED | 71 | 100 | 1.40 | 7,870 | 29.7 | 21.0 | 17.8 | 15.9 | 29% | 24% |
| `PD_Llama_Angry_Short_NoIntro` | 744779604470 | ENABLED | 42 | 0 | 0.00 | 3,216 | 32.7 | 21.6 | 17.6 | 15.4 | 34% | 29% |
| `CR_Confidence_Women_UK` | 730045613984 | ENABLED | 36 | 0 | 0.00 | 4,089 | 28.3 | 21.1 | 18.2 | 16.2 | 25% | 23% |
| `CR_Confidence_Men_UK` | 730045613996 | ENABLED | 32 | 0 | 0.00 | 4,645 | 27.8 | 18.0 | 15.1 | 13.5 | 35% | 25% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 744779604392 | ENABLED | 32 | 0 | 0.00 | 5,994 | 9.2 | 5.4 | 4.7 | 4.3 | 41% | 21% |
| `AT_Crystal_Short` | 727538395412 | PAUSED | 31 | 0 | 0.00 | 3,509 | 74.4 | 27.8 | 21.3 | 18.7 | 63% | 33% |
| `UT_Frank_Mix` | 727538395424 | PAUSED | 28 | 0 | 0.00 | 5,256 | 38.7 | 25.7 | 22.3 | 20.1 | 34% | 22% |
| `AT_Crystal_Long` | 727538394959 | PAUSED | 11 | 0 | 0.00 | 1,729 | 36.5 | 21.3 | 18.1 | 15.2 | 42% | 28% |

**Ads in `IndustryRealEstate_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec` | 758711127498 | PAUSED | 115 | 200 | 1.75 | 21,263 | 12.1 | 3.0 | 3.0 | 1.5 | 75% | 50% |
| `PD_InShort_AI` | 758711127750 | ENABLED | 77 | 0 | 0.00 | 1,443 | 24.3 | 15.9 | 13.5 | 10.3 | 34% | 35% |
| `PD_Llama_Skeleton` | 758711127546 | ENABLED | 19 | 0 | 0.00 | 568 | 22.2 | 16.6 | 14.2 | 12.1 | 25% | 27% |
| `PD_Reports_woman` | 758711127480 | PAUSED | 13 | 0 | 0.00 | 820 | 3.1 | 1.7 | 1.1 | 1.0 | 44% | 43% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 212,289 | 81,300 | 0.38 | 23,346,510 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 57,120 | 22,700 | 0.40 |
| geoTargetConstants/1007850 | 14,174 | 5,000 | 0.35 |
| geoTargetConstants/1006524 | 3,652 | 1,200 | 0.33 |
| geoTargetConstants/1006912 | 3,123 | 1,400 | 0.45 |
| geoTargetConstants/1006656 | 1,590 | 300 | 0.19 |
| geoTargetConstants/1007336 | 1,564 | 500 | 0.32 |
| geoTargetConstants/1006864 | 1,434 | 600 | 0.42 |
| geoTargetConstants/1006567 | 1,316 | 900 | 0.68 |
| geoTargetConstants/1007326 | 1,165 | 200 | 0.17 |
| geoTargetConstants/1006884 | 1,072 | 300 | 0.28 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006867 | 741 | 0 | 0.00 |
| geoTargetConstants/1007210 | 599 | 0 | 0.00 |
| geoTargetConstants/9225752 | 544 | 0 | 0.00 |
| geoTargetConstants/1006816 | 483 | 0 | 0.00 |
| geoTargetConstants/1006548 | 476 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-employment-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £195,860 | **DEP:** 905 | **DEP/Spend:** 0.00
- **Impressions:** 20,953,729 | **Clicks:** 35,731 | **Conversions:** 905
- **All Conversions Value:** 744,092 | **All Conversions:** 118,105
- **Active Months:** 9 (2025-06-01 → 2026-02-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-06-01 | 1,040 | 4 | 0.00 | 142,644 | 261 | 4 |
| 2025-07-01 | 15,793 | 36 | 0.00 | 1,943,137 | 3,210 | 36 |
| 2025-08-01 | 7,428 | 18 | 0.00 | 912,595 | 1,495 | 18 |
| 2025-09-01 | 36,136 | 171 | 0.00 | 5,369,269 | 8,114 | 171 |
| 2025-10-01 | 16,409 | 60 | 0.00 | 2,138,263 | 3,817 | 60 |
| 2025-11-01 | 33,893 | 151 | 0.00 | 3,361,171 | 5,615 | 151 |
| 2025-12-01 | 17,421 | 72 | 0.00 | 1,898,736 | 4,719 | 72 |
| 2026-01-01 | 53,703 | 311 | 0.01 | 4,164,828 | 6,867 | 311 |
| 2026-02-01 | 14,038 | 81 | 0.01 | 1,023,086 | 1,633 | 81 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-MultiAds` | ENABLED | 90,750 | 417 | 0.00 | 11,038,569 | 48.2 | 35.6 | 31.1 | 28.3 | 26% | 21% |
| `IndustryTechnology_EM-MultiAds` | ENABLED | 86,365 | 365 | 0.00 | 8,632,526 | 46.4 | 34.6 | 30.3 | 27.6 | 25% | 20% |
| `IndustryFinancial_EM-MultiAds` | ENABLED | 15,319 | 108 | 0.01 | 1,021,547 | 44.2 | 31.7 | 27.2 | 24.5 | 28% | 23% |
| `IndustryRealEstate_EM-MultiAds` | PAUSED | 3,426 | 15 | 0.00 | 261,087 | 46.2 | 34.8 | 30.5 | 27.8 | 25% | 20% |

**Ads in `EmployerLarge_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Angry_Short_NoIntro` | 761006543467 | ENABLED | 5,760 | 30 | 0.01 | 712,157 | 50.3 | 35.4 | 30.7 | 27.9 | 30% | 21% |
| `AT_W_GameOver` | 791195435240 | ENABLED | 4,948 | 22 | 0.00 | 364,778 | 42.6 | 31.1 | 27.0 | 24.3 | 27% | 22% |
| `PD_InShort_AI` | 760423837856 | PAUSED | 4,927 | 16 | 0.00 | 528,307 | 32.3 | 23.0 | 19.2 | 16.2 | 29% | 30% |
| `AT_W_Hear` | 791195435243 | ENABLED | 4,853 | 32 | 0.01 | 341,621 | 40.5 | 30.5 | 26.6 | 24.0 | 25% | 21% |
| `DL_Llama_Long` | 761006543500 | PAUSED | 4,354 | 18 | 0.00 | 558,818 | 34.8 | 25.8 | 21.6 | 18.7 | 26% | 27% |
| `PD_Llama_Skeleton` | 761006543464 | ENABLED | 4,226 | 20 | 0.00 | 579,101 | 31.2 | 23.0 | 18.9 | 16.2 | 26% | 29% |
| `PD_Llama_Skeleton_UK` | 761006543509 | ENABLED | 3,784 | 16 | 0.00 | 425,218 | 30.4 | 22.3 | 18.5 | 16.0 | 27% | 29% |
| `PD_WorkOS_21sec` | 760423837829 | PAUSED | 3,507 | 15 | 0.00 | 689,565 | 94.6 | 54.9 | 46.8 | 43.2 | 42% | 21% |
| `PD_Llama_Angry` | 761006543470 | PAUSED | 3,267 | 12 | 0.00 | 409,698 | 33.9 | 25.9 | 21.4 | 18.7 | 24% | 28% |
| `PD_AI_Llama` | 760423837847 | ENABLED | 3,089 | 16 | 0.01 | 471,985 | 58.3 | 46.3 | 42.2 | 39.4 | 21% | 15% |
| `AT_Jay_Say` | 791195435237 | ENABLED | 2,943 | 16 | 0.01 | 180,824 | 41.3 | 30.5 | 26.4 | 23.4 | 26% | 23% |
| `DL_Llama_Dashboards_30s` | 761006543497 | PAUSED | 2,352 | 11 | 0.00 | 351,361 | 67.7 | 48.0 | 42.7 | 39.8 | 29% | 17% |
| `DL_sidekick_30s` | 780359151503 | ENABLED | 2,343 | 14 | 0.01 | 342,921 | 65.7 | 41.9 | 36.7 | 33.9 | 36% | 19% |
| `DL_Llama_47s` | 761006543488 | PAUSED | 2,289 | 17 | 0.01 | 318,266 | 59.3 | 49.1 | 45.3 | 42.6 | 17% | 13% |
| `CR_Confidence_Women_UK` | 760423837808 | PAUSED | 2,253 | 3 | 0.00 | 271,282 | 50.1 | 37.0 | 32.5 | 29.6 | 26% | 20% |
| `PD_Llama_Angry_Short` | 761006543506 | PAUSED | 2,029 | 6 | 0.00 | 272,851 | 50.6 | 39.0 | 35.1 | 32.6 | 23% | 16% |
| `AT_Jay_Honest` | 791195435234 | ENABLED | 2,003 | 13 | 0.01 | 118,979 | 43.3 | 31.7 | 27.7 | 24.8 | 27% | 22% |
| `DL_sidekick_66s` | 780359151497 | ENABLED | 1,974 | 11 | 0.01 | 216,415 | 34.0 | 24.9 | 20.9 | 18.3 | 27% | 26% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543512 | PAUSED | 1,922 | 12 | 0.01 | 218,510 | 54.9 | 41.0 | 36.3 | 33.8 | 25% | 18% |
| `DL_Llama_Templates_30s` | 761006543503 | PAUSED | 1,860 | 9 | 0.00 | 264,983 | 69.5 | 50.2 | 45.1 | 42.0 | 28% | 16% |
| `DL_Llama_AnyType_30s` | 761006543494 | PAUSED | 1,833 | 13 | 0.01 | 248,262 | 68.6 | 49.4 | 44.5 | 41.4 | 28% | 16% |
| `DL_Llama_Angry_Long` | 761006543491 | PAUSED | 1,640 | 5 | 0.00 | 216,530 | 36.6 | 28.0 | 23.9 | 20.7 | 23% | 26% |
| `AT_Llama_short` | 761006543485 | PAUSED | 1,598 | 8 | 0.00 | 132,491 | 46.1 | 37.2 | 33.4 | 30.8 | 19% | 17% |
| `PD_AI_Eduardo` | 760423837850 | PAUSED | 1,477 | 5 | 0.00 | 216,031 | 58.7 | 48.8 | 44.7 | 41.9 | 17% | 14% |
| `AT_NYwoman_Short` | 760423837811 | PAUSED | 1,348 | 8 | 0.01 | 211,979 | 59.6 | 44.2 | 39.2 | 36.4 | 26% | 18% |
| `AT_NYwoman_NotKnowing` | 760423837805 | PAUSED | 1,341 | 3 | 0.00 | 223,893 | 47.2 | 35.6 | 31.4 | 29.0 | 25% | 18% |
| `CR_Confidence_Men_UK` | 760423837817 | PAUSED | 1,330 | 4 | 0.00 | 152,676 | 47.2 | 33.7 | 29.4 | 26.9 | 29% | 20% |
| `SH_PMO_Long` | 785312753748 | ENABLED | 1,283 | 6 | 0.00 | 158,977 | 96.0 | 65.0 | 49.4 | 43.9 | 32% | 32% |
| `DL_sidekick_47s` | 780359151500 | ENABLED | 1,249 | 7 | 0.01 | 154,855 | 55.7 | 46.5 | 42.8 | 40.2 | 16% | 13% |
| `PD_TikToker_HackM` | 760423837835 | PAUSED | 1,143 | 2 | 0.00 | 177,025 | 52.5 | 40.9 | 36.8 | 33.8 | 22% | 17% |
| `AT_NYwoman_Manager` | 760423837820 | PAUSED | 1,065 | 4 | 0.00 | 180,047 | 47.7 | 36.7 | 32.7 | 30.0 | 23% | 18% |
| `DL_AI_Llama_Short` | 760423837853 | ENABLED | 956 | 7 | 0.01 | 105,948 | 61.2 | 49.6 | 45.0 | 42.3 | 19% | 15% |
| `PD_TikToker_GoodNewsM` | 760423837841 | PAUSED | 925 | 2 | 0.00 | 138,619 | 51.0 | 41.3 | 38.3 | 35.6 | 19% | 14% |
| `PD_TikToker_HackW` | 760423837838 | PAUSED | 909 | 4 | 0.00 | 158,107 | 64.0 | 53.9 | 50.4 | 47.9 | 16% | 11% |
| `AT_Llama_long-alt` | 761006543482 | PAUSED | 858 | 4 | 0.00 | 75,889 | 37.5 | 27.7 | 23.0 | 20.1 | 26% | 27% |
| `AT_Llama_long` | 761006543479 | PAUSED | 803 | 2 | 0.00 | 87,004 | 37.8 | 28.5 | 23.8 | 21.0 | 25% | 26% |
| `SH_Marketing_Long` | 785312753742 | ENABLED | 788 | 0 | 0.00 | 116,372 | 96.1 | 68.2 | 55.7 | 50.6 | 29% | 26% |
| `AT_Llama_30s` | 761006543473 | PAUSED | 748 | 4 | 0.00 | 82,028 | 67.4 | 48.2 | 42.8 | 39.8 | 29% | 17% |
| `SH_Finance_Long` | 785312753754 | PAUSED | 700 | 4 | 0.01 | 88,057 | 96.0 | 68.2 | 53.4 | 48.3 | 29% | 29% |
| `PD_Manager_Celebration` | 791195435246 | PAUSED | 661 | 3 | 0.00 | 42,087 | 35.3 | 26.5 | 22.7 | 19.9 | 25% | 25% |
| `PD_Manager_WoF` | 791195435249 | PAUSED | 594 | 3 | 0.01 | 38,721 | 35.3 | 26.4 | 22.3 | 19.5 | 25% | 26% |
| `SH_Operations_Long` | 785312753745 | ENABLED | 538 | 3 | 0.01 | 71,937 | 95.6 | 66.8 | 56.5 | 51.6 | 30% | 23% |
| `AT_Llama_30s-alt` | 761006543476 | PAUSED | 499 | 2 | 0.00 | 50,493 | 70.0 | 50.3 | 44.7 | 41.7 | 28% | 17% |
| `SH_Leadership_Long` | 785312753751 | PAUSED | 493 | 0 | 0.00 | 66,882 | 95.6 | 64.2 | 52.6 | 48.2 | 33% | 25% |
| `PD_Linear_Actress` | 760423837832 | PAUSED | 429 | 1 | 0.00 | 79,222 | 37.4 | 28.3 | 23.8 | 20.7 | 24% | 27% |
| `PD_Reports_woman` | 760423837844 | PAUSED | 365 | 1 | 0.00 | 40,085 | 53.1 | 43.0 | 38.9 | 36.3 | 19% | 16% |
| `PD_Linear_Group` | 760423837814 | PAUSED | 358 | 2 | 0.01 | 63,219 | 38.5 | 29.6 | 24.7 | 21.9 | 23% | 26% |
| `UT_Frank_Mix` | 760423837826 | PAUSED | 136 | 2 | 0.01 | 23,493 | 65.3 | 54.5 | 51.3 | 48.2 | 16% | 12% |

**Ads in `IndustryTechnology_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Angry_Short_NoIntro` | 761006543518 | ENABLED | 6,288 | 31 | 0.00 | 650,794 | 47.8 | 34.3 | 29.9 | 27.3 | 28% | 21% |
| `PD_InShort_AI` | 760423837910 | PAUSED | 5,984 | 20 | 0.00 | 463,291 | 31.3 | 22.7 | 19.0 | 16.1 | 28% | 29% |
| `PD_Llama_Skeleton_UK` | 761006543680 | ENABLED | 4,635 | 15 | 0.00 | 392,291 | 28.8 | 21.2 | 17.6 | 15.1 | 26% | 28% |
| `PD_Llama_Skeleton` | 761006543515 | ENABLED | 4,310 | 26 | 0.01 | 441,109 | 28.9 | 21.2 | 17.4 | 14.8 | 26% | 30% |
| `DL_Llama_Long` | 761006543671 | PAUSED | 3,672 | 13 | 0.00 | 373,766 | 33.4 | 24.9 | 21.0 | 18.1 | 25% | 27% |
| `PD_WorkOS_21sec` | 760423837883 | PAUSED | 3,448 | 14 | 0.00 | 600,992 | 94.0 | 52.6 | 45.6 | 42.0 | 44% | 20% |
| `DL_sidekick_30s` | 780359151494 | ENABLED | 3,370 | 18 | 0.01 | 332,997 | 61.8 | 40.4 | 35.5 | 32.8 | 35% | 19% |
| `PD_Llama_Angry` | 761006543641 | PAUSED | 2,851 | 17 | 0.01 | 335,329 | 32.4 | 24.9 | 20.3 | 17.8 | 23% | 29% |
| `PD_AI_Llama` | 760423837901 | ENABLED | 2,708 | 8 | 0.00 | 347,327 | 55.1 | 44.2 | 40.2 | 37.3 | 20% | 16% |
| `DL_Llama_Dashboards_30s` | 761006543668 | PAUSED | 2,690 | 9 | 0.00 | 292,727 | 63.1 | 44.7 | 39.7 | 36.9 | 29% | 17% |
| `CR_Confidence_Women_UK` | 760423837862 | PAUSED | 2,489 | 7 | 0.00 | 222,309 | 47.4 | 35.4 | 31.1 | 28.4 | 25% | 20% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543683 | ENABLED | 2,474 | 20 | 0.01 | 208,329 | 54.0 | 41.6 | 37.2 | 34.6 | 23% | 17% |
| `AT_W_GameOver` | 791195435222 | ENABLED | 2,470 | 12 | 0.00 | 166,997 | 42.8 | 32.5 | 28.7 | 26.1 | 24% | 20% |
| `DL_Llama_47s` | 761006543659 | PAUSED | 2,354 | 10 | 0.00 | 242,638 | 57.7 | 48.7 | 45.0 | 42.2 | 16% | 13% |
| `AT_W_Hear` | 791195435225 | ENABLED | 2,318 | 7 | 0.00 | 150,023 | 41.9 | 33.1 | 29.5 | 26.9 | 21% | 19% |
| `DL_Llama_Templates_30s` | 761006543674 | PAUSED | 2,102 | 11 | 0.01 | 221,505 | 63.6 | 45.8 | 41.1 | 38.4 | 28% | 16% |
| `PD_Llama_Angry_Short` | 761006543677 | PAUSED | 2,075 | 6 | 0.00 | 243,038 | 50.3 | 40.1 | 36.4 | 34.0 | 20% | 15% |
| `DL_Llama_AnyType_30s` | 761006543665 | PAUSED | 1,942 | 16 | 0.01 | 211,170 | 67.7 | 51.2 | 46.6 | 43.6 | 24% | 15% |
| `AT_Llama_short` | 761006543656 | PAUSED | 1,889 | 4 | 0.00 | 144,077 | 42.5 | 34.1 | 30.4 | 27.9 | 20% | 18% |
| `DL_Llama_Angry_Long` | 761006543662 | PAUSED | 1,733 | 2 | 0.00 | 177,390 | 35.9 | 27.9 | 23.7 | 20.6 | 22% | 26% |
| `AT_NYwoman_NotKnowing` | 760423837859 | PAUSED | 1,673 | 6 | 0.00 | 222,557 | 44.4 | 33.2 | 29.0 | 26.7 | 25% | 20% |
| `AT_NYwoman_Short` | 760423837865 | PAUSED | 1,603 | 6 | 0.00 | 161,361 | 55.3 | 41.1 | 36.3 | 33.5 | 26% | 19% |
| `AT_Jay_Say` | 791195435219 | ENABLED | 1,598 | 9 | 0.01 | 92,048 | 42.6 | 32.9 | 29.0 | 26.2 | 23% | 20% |
| `DL_sidekick_66s` | 780359151488 | ENABLED | 1,584 | 9 | 0.01 | 126,564 | 33.7 | 25.2 | 21.3 | 18.6 | 25% | 26% |
| `CR_Confidence_Men_UK` | 760423837871 | PAUSED | 1,583 | 6 | 0.00 | 134,500 | 44.7 | 31.6 | 27.6 | 25.3 | 29% | 20% |
| `PD_AI_Eduardo` | 760423837904 | PAUSED | 1,488 | 5 | 0.00 | 189,233 | 56.4 | 47.2 | 43.1 | 40.4 | 16% | 14% |
| `AT_NYwoman_Manager` | 760423837874 | PAUSED | 1,386 | 4 | 0.00 | 167,479 | 44.1 | 33.8 | 29.7 | 27.0 | 23% | 20% |
| `DL_sidekick_47s` | 780359151491 | ENABLED | 1,093 | 3 | 0.00 | 105,416 | 53.4 | 44.9 | 41.4 | 38.9 | 16% | 13% |
| `SH_PMO_Long` | 785312753883 | ENABLED | 1,077 | 5 | 0.00 | 114,196 | 95.8 | 66.7 | 54.1 | 49.5 | 30% | 26% |
| `AT_Llama_30s` | 761006543644 | PAUSED | 963 | 4 | 0.00 | 81,180 | 65.0 | 46.5 | 41.6 | 38.6 | 28% | 17% |
| `PD_TikToker_HackM` | 760423837889 | PAUSED | 907 | 2 | 0.00 | 99,450 | 52.6 | 41.5 | 37.7 | 34.9 | 21% | 16% |
| `PD_TikToker_GoodNewsM` | 760423837895 | PAUSED | 892 | 9 | 0.01 | 115,698 | 52.7 | 42.8 | 38.4 | 35.3 | 19% | 18% |
| `AT_Jay_Honest` | 791195435216 | ENABLED | 838 | 4 | 0.00 | 46,649 | 46.6 | 36.6 | 32.7 | 30.0 | 21% | 18% |
| `DL_AI_Llama_Short` | 760423837907 | PAUSED | 780 | 2 | 0.00 | 72,977 | 59.8 | 49.1 | 44.6 | 41.7 | 18% | 15% |
| `AT_Llama_long-alt` | 761006543653 | PAUSED | 743 | 1 | 0.00 | 46,704 | 36.0 | 26.8 | 22.6 | 19.6 | 25% | 27% |
| `PD_TikToker_HackW` | 760423837892 | PAUSED | 662 | 0 | 0.00 | 84,684 | 63.0 | 53.5 | 49.6 | 46.9 | 15% | 12% |
| `PD_Reports_woman` | 760423837898 | PAUSED | 651 | 0 | 0.00 | 51,434 | 47.9 | 38.3 | 34.3 | 31.7 | 20% | 17% |
| `SH_Finance_Long` | 785312753889 | ENABLED | 642 | 5 | 0.01 | 76,706 | 95.7 | 70.6 | 59.4 | 55.3 | 26% | 22% |
| `AT_Llama_long` | 761006543650 | PAUSED | 629 | 4 | 0.01 | 59,814 | 35.6 | 26.6 | 22.4 | 19.5 | 25% | 27% |
| `SH_Marketing_Long` | 785312753757 | ENABLED | 616 | 2 | 0.00 | 66,658 | 96.4 | 71.8 | 62.4 | 58.3 | 25% | 19% |
| `AT_Llama_30s-alt` | 761006543647 | PAUSED | 557 | 2 | 0.00 | 44,270 | 67.8 | 51.2 | 46.4 | 43.7 | 24% | 15% |
| `PD_Linear_Actress` | 760423837886 | PAUSED | 540 | 3 | 0.01 | 69,218 | 36.5 | 28.0 | 23.2 | 20.3 | 23% | 27% |
| `SH_Leadership_Long` | 785312753886 | ENABLED | 435 | 2 | 0.00 | 48,947 | 95.3 | 69.0 | 59.9 | 55.9 | 28% | 19% |
| `PD_Linear_Group` | 760423837868 | PAUSED | 396 | 3 | 0.01 | 43,075 | 37.1 | 28.7 | 23.7 | 20.6 | 23% | 28% |
| `PD_Manager_WoF` | 791195435231 | PAUSED | 360 | 3 | 0.01 | 18,696 | 35.5 | 26.8 | 22.8 | 20.0 | 25% | 25% |
| `SH_Operations_Long` | 785312753880 | ENABLED | 349 | 1 | 0.00 | 39,111 | 95.8 | 71.5 | 64.0 | 60.1 | 25% | 16% |
| `PD_Manager_Celebration` | 791195435228 | PAUSED | 330 | 1 | 0.00 | 18,413 | 36.1 | 27.7 | 23.7 | 21.2 | 23% | 24% |
| `UT_Frank_Mix` | 760423837880 | PAUSED | 189 | 0 | 0.00 | 17,389 | 63.4 | 52.6 | 49.1 | 46.2 | 17% | 12% |

**Ads in `IndustryFinancial_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_GameOver` | 791195435276 | ENABLED | 1,976 | 22 | 0.01 | 120,865 | 39.2 | 27.8 | 23.8 | 21.3 | 29% | 24% |
| `AT_W_Hear` | 791195435279 | ENABLED | 1,736 | 15 | 0.01 | 104,186 | 38.5 | 28.5 | 24.6 | 22.0 | 26% | 23% |
| `AT_Jay_Say` | 791195435273 | ENABLED | 935 | 15 | 0.02 | 45,451 | 38.6 | 28.3 | 24.3 | 21.4 | 27% | 24% |
| `PD_Llama_Angry_Short_NoIntro` | 761006543416 | ENABLED | 918 | 5 | 0.01 | 73,253 | 45.9 | 31.6 | 27.0 | 24.3 | 31% | 23% |
| `PD_InShort_AI` | 760423837802 | PAUSED | 812 | 3 | 0.00 | 47,084 | 31.2 | 22.3 | 18.5 | 15.7 | 29% | 30% |
| `DL_sidekick_30s` | 780359151521 | ENABLED | 671 | 8 | 0.01 | 55,661 | 61.8 | 39.6 | 34.7 | 31.9 | 36% | 19% |
| `DL_Llama_Long` | 761006543449 | PAUSED | 556 | 3 | 0.01 | 37,001 | 32.9 | 24.2 | 20.4 | 17.7 | 26% | 27% |
| `AT_Jay_Honest` | 791195435270 | ENABLED | 537 | 4 | 0.01 | 25,689 | 41.2 | 30.3 | 26.1 | 23.2 | 27% | 23% |
| `PD_Llama_Skeleton_UK` | 761006543458 | PAUSED | 507 | 1 | 0.00 | 30,139 | 28.2 | 20.6 | 17.2 | 15.0 | 27% | 27% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543461 | ENABLED | 468 | 4 | 0.01 | 28,466 | 50.4 | 36.7 | 31.9 | 29.4 | 27% | 20% |
| `PD_Llama_Skeleton` | 761006543413 | PAUSED | 452 | 1 | 0.00 | 31,980 | 29.1 | 21.1 | 17.4 | 15.0 | 27% | 29% |
| `DL_sidekick_66s` | 780359151515 | ENABLED | 426 | 2 | 0.00 | 31,193 | 33.4 | 24.4 | 20.5 | 17.9 | 27% | 27% |
| `PD_Llama_Angry` | 761006543419 | PAUSED | 425 | 5 | 0.01 | 25,713 | 32.7 | 24.5 | 20.1 | 17.5 | 25% | 29% |
| `CR_Confidence_Women_UK` | 760423837634 | PAUSED | 349 | 4 | 0.01 | 22,131 | 46.0 | 33.4 | 29.0 | 26.1 | 27% | 22% |
| `AT_Llama_short` | 761006543434 | PAUSED | 338 | 0 | 0.00 | 16,713 | 39.2 | 29.8 | 26.1 | 23.6 | 24% | 21% |
| `PD_Llama_Angry_Short` | 761006543455 | PAUSED | 331 | 4 | 0.01 | 25,743 | 43.4 | 31.5 | 27.2 | 24.7 | 28% | 22% |
| `SH_PMO_Long` | 785312753733 | ENABLED | 272 | 0 | 0.00 | 24,774 | 95.6 | 61.5 | 47.3 | 42.1 | 36% | 32% |
| `DL_sidekick_47s` | 780359151518 | ENABLED | 232 | 1 | 0.00 | 17,427 | 52.8 | 43.6 | 39.9 | 37.7 | 17% | 14% |
| `DL_Llama_Dashboards_30s` | 761006543446 | PAUSED | 223 | 1 | 0.00 | 17,093 | 63.8 | 45.2 | 39.8 | 37.1 | 29% | 18% |
| `DL_Llama_Angry_Long` | 761006543440 | PAUSED | 212 | 1 | 0.00 | 13,149 | 37.3 | 29.1 | 24.8 | 21.5 | 22% | 26% |
| `DL_Llama_47s` | 761006543437 | PAUSED | 211 | 1 | 0.00 | 15,967 | 56.0 | 45.9 | 42.5 | 39.7 | 18% | 13% |
| `PD_AI_Llama` | 760423837673 | PAUSED | 206 | 0 | 0.00 | 20,113 | 53.8 | 42.2 | 38.2 | 35.6 | 22% | 16% |
| `DL_Llama_AnyType_30s` | 761006543443 | PAUSED | 202 | 0 | 0.00 | 15,371 | 68.2 | 51.6 | 46.7 | 43.9 | 24% | 15% |
| `PD_Manager_Celebration` | 791195435402 | PAUSED | 198 | 2 | 0.01 | 10,264 | 32.8 | 24.2 | 20.1 | 17.3 | 26% | 28% |
| `PD_Manager_WoF` | 791195435405 | PAUSED | 190 | 1 | 0.01 | 9,752 | 31.7 | 23.0 | 19.6 | 16.9 | 27% | 27% |
| `DL_Llama_Templates_30s` | 761006543452 | PAUSED | 168 | 1 | 0.00 | 12,218 | 61.9 | 42.3 | 37.6 | 34.9 | 32% | 17% |
| `SH_Marketing_Long` | 785312753727 | ENABLED | 168 | 0 | 0.00 | 16,271 | 95.2 | 66.2 | 53.9 | 49.4 | 30% | 25% |
| `PD_AI_Eduardo` | 760423837676 | ENABLED | 163 | 2 | 0.01 | 15,095 | 54.1 | 43.6 | 38.9 | 36.2 | 19% | 17% |
| `SH_Finance_Long` | 785312753739 | ENABLED | 154 | 0 | 0.00 | 14,322 | 95.6 | 65.4 | 51.8 | 46.5 | 32% | 29% |
| `CR_Confidence_Men_UK` | 760423837643 | PAUSED | 145 | 0 | 0.00 | 8,115 | 44.0 | 30.6 | 26.5 | 24.4 | 30% | 20% |
| `AT_Llama_long-alt` | 761006543431 | PAUSED | 138 | 1 | 0.01 | 5,259 | 35.4 | 25.5 | 21.2 | 18.5 | 28% | 28% |
| `DL_AI_Llama_Short` | 760423837679 | ENABLED | 128 | 0 | 0.00 | 8,643 | 57.5 | 45.6 | 41.0 | 37.9 | 21% | 17% |
| `AT_Llama_30s` | 761006543422 | PAUSED | 116 | 0 | 0.00 | 5,759 | 62.0 | 42.6 | 37.7 | 34.4 | 31% | 19% |
| `AT_Llama_long` | 761006543428 | PAUSED | 102 | 0 | 0.00 | 4,155 | 36.9 | 26.9 | 22.0 | 19.3 | 27% | 28% |
| `PD_WorkOS_21sec` | 760423837655 | PAUSED | 91 | 1 | 0.01 | 15,420 | 94.8 | 52.8 | 44.2 | 41.5 | 44% | 21% |
| `SH_Leadership_Long` | 785312753736 | ENABLED | 90 | 0 | 0.00 | 10,024 | 94.6 | 62.3 | 52.2 | 48.0 | 34% | 23% |
| `AT_NYwoman_NotKnowing` | 760423837631 | PAUSED | 79 | 0 | 0.00 | 6,837 | 43.2 | 31.3 | 27.7 | 25.3 | 28% | 19% |
| `AT_Llama_30s-alt` | 761006543425 | PAUSED | 76 | 0 | 0.00 | 4,154 | 64.8 | 46.1 | 41.0 | 37.7 | 29% | 18% |
| `SH_Operations_Long` | 785312753730 | ENABLED | 62 | 0 | 0.00 | 6,771 | 94.8 | 64.2 | 53.9 | 49.5 | 32% | 23% |
| `AT_NYwoman_Short` | 760423837637 | PAUSED | 61 | 0 | 0.00 | 5,386 | 52.8 | 36.1 | 31.6 | 29.3 | 32% | 19% |
| `AT_NYwoman_Manager` | 760423837646 | PAUSED | 55 | 0 | 0.00 | 5,214 | 42.0 | 31.0 | 26.6 | 24.2 | 26% | 22% |
| `PD_TikToker_HackM` | 760423837661 | PAUSED | 30 | 0 | 0.00 | 2,810 | 49.6 | 39.1 | 34.1 | 31.3 | 21% | 20% |
| `PD_TikToker_GoodNewsM` | 760423837667 | PAUSED | 27 | 1 | 0.04 | 2,753 | 40.7 | 30.9 | 27.0 | 25.2 | 24% | 19% |
| `PD_Linear_Actress` | 760423837658 | PAUSED | 21 | 0 | 0.00 | 1,657 | 34.9 | 26.0 | 22.5 | 19.5 | 25% | 25% |
| `PD_Reports_woman` | 760423837670 | PAUSED | 21 | 0 | 0.00 | 1,396 | 47.6 | 37.7 | 33.0 | 30.4 | 21% | 19% |
| `PD_TikToker_HackW` | 760423837664 | PAUSED | 19 | 0 | 0.00 | 2,205 | 61.7 | 52.9 | 46.3 | 43.8 | 14% | 17% |
| `PD_Linear_Group` | 760423837640 | PAUSED | 16 | 0 | 0.00 | 1,495 | 40.1 | 28.3 | 24.4 | 22.8 | 29% | 19% |

**Ads in `IndustryRealEstate_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Angry_Short_NoIntro` | 761006543245 | ENABLED | 234 | 0 | 0.00 | 19,530 | 47.2 | 33.6 | 28.9 | 26.2 | 29% | 22% |
| `PD_Llama_Skeleton_UK` | 761006543407 | ENABLED | 226 | 2 | 0.01 | 13,739 | 31.4 | 23.6 | 19.7 | 17.2 | 25% | 27% |
| `PD_InShort_AI` | 760423837628 | PAUSED | 220 | 2 | 0.01 | 13,417 | 33.3 | 24.0 | 19.9 | 17.4 | 28% | 28% |
| `PD_Llama_Skeleton` | 761006543242 | ENABLED | 168 | 1 | 0.01 | 15,476 | 30.6 | 22.7 | 19.4 | 16.3 | 26% | 28% |
| `PD_WorkOS_21sec` | 760423837601 | PAUSED | 164 | 1 | 0.01 | 21,259 | 96.7 | 54.9 | 47.5 | 43.0 | 43% | 22% |
| `AT_W_GameOver` | 791195435258 | ENABLED | 137 | 2 | 0.01 | 8,415 | 39.1 | 28.1 | 24.3 | 21.8 | 28% | 23% |
| `DL_Llama_Long` | 761006543278 | PAUSED | 135 | 0 | 0.00 | 10,226 | 33.7 | 25.4 | 21.0 | 19.0 | 25% | 25% |
| `PD_AI_Llama` | 760423837619 | ENABLED | 122 | 1 | 0.01 | 10,981 | 57.7 | 44.1 | 39.8 | 36.2 | 24% | 18% |
| `DL_Llama_Dashboards_30s` | 761006543275 | PAUSED | 120 | 0 | 0.00 | 9,219 | 60.2 | 41.1 | 36.8 | 33.9 | 32% | 18% |
| `AT_NYwoman_NotKnowing` | 760423837577 | PAUSED | 116 | 0 | 0.00 | 8,037 | 47.1 | 35.7 | 31.8 | 29.2 | 24% | 18% |
| `PD_Llama_Angry` | 761006543248 | PAUSED | 110 | 0 | 0.00 | 10,903 | 33.0 | 25.9 | 20.7 | 17.9 | 22% | 31% |
| `AT_W_Hear` | 791195435261 | ENABLED | 109 | 0 | 0.00 | 5,854 | 38.1 | 29.8 | 26.4 | 23.9 | 22% | 20% |
| `AT_NYwoman_Manager` | 760423837592 | PAUSED | 107 | 1 | 0.01 | 7,745 | 44.3 | 33.6 | 28.9 | 26.6 | 24% | 21% |
| `AT_NYwoman_Short` | 760423837583 | PAUSED | 103 | 0 | 0.00 | 7,254 | 53.5 | 40.3 | 35.8 | 34.1 | 25% | 15% |
| `AT_Jay_Say` | 791195435255 | ENABLED | 102 | 1 | 0.01 | 5,192 | 38.6 | 28.9 | 25.4 | 22.9 | 25% | 21% |
| `DL_Llama_Angry_Long` | 761006543269 | PAUSED | 84 | 0 | 0.00 | 6,437 | 34.3 | 27.5 | 23.4 | 21.0 | 20% | 23% |
| `AT_Llama_short` | 761006543263 | PAUSED | 68 | 0 | 0.00 | 3,795 | 43.8 | 35.9 | 32.3 | 29.8 | 18% | 17% |
| `DL_Llama_47s` | 761006543266 | PAUSED | 68 | 0 | 0.00 | 5,018 | 59.4 | 51.1 | 47.8 | 45.1 | 14% | 12% |
| `DL_sidekick_30s` | 780359151512 | ENABLED | 67 | 0 | 0.00 | 6,607 | 67.1 | 48.1 | 42.9 | 40.3 | 28% | 16% |
| `PD_Llama_Angry_Short` | 761006543404 | PAUSED | 66 | 0 | 0.00 | 5,755 | 50.0 | 39.2 | 35.6 | 33.5 | 22% | 15% |
| `CR_Confidence_Women_UK` | 760423837580 | PAUSED | 63 | 0 | 0.00 | 4,614 | 47.7 | 36.8 | 32.3 | 30.3 | 23% | 17% |
| `DL_Llama_Templates_30s` | 761006543401 | PAUSED | 63 | 0 | 0.00 | 5,428 | 65.7 | 50.2 | 44.1 | 41.0 | 24% | 18% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543410 | ENABLED | 58 | 0 | 0.00 | 4,520 | 52.1 | 40.0 | 35.6 | 33.8 | 23% | 15% |
| `CR_Confidence_Men_UK` | 760423837589 | PAUSED | 58 | 0 | 0.00 | 3,878 | 45.7 | 33.7 | 29.5 | 27.5 | 26% | 18% |
| `PD_AI_Eduardo` | 760423837622 | ENABLED | 57 | 0 | 0.00 | 5,629 | 59.2 | 50.9 | 46.8 | 43.6 | 14% | 14% |
| `DL_sidekick_66s` | 780359151506 | ENABLED | 48 | 0 | 0.00 | 4,062 | 32.9 | 25.2 | 21.8 | 19.1 | 24% | 24% |
| `PD_Reports_woman` | 760423837616 | PAUSED | 45 | 0 | 0.00 | 2,339 | 53.1 | 43.9 | 39.8 | 36.8 | 17% | 16% |
| `PD_TikToker_HackM` | 760423837607 | PAUSED | 42 | 0 | 0.00 | 3,062 | 56.3 | 46.9 | 44.6 | 39.6 | 17% | 16% |
| `PD_TikToker_GoodNewsM` | 760423837613 | PAUSED | 42 | 1 | 0.02 | 2,662 | 49.2 | 37.6 | 33.0 | 29.2 | 24% | 22% |
| `DL_Llama_AnyType_30s` | 761006543272 | PAUSED | 42 | 0 | 0.00 | 3,571 | 63.6 | 44.3 | 40.2 | 37.1 | 30% | 16% |
| `DL_sidekick_47s` | 780359151509 | ENABLED | 33 | 0 | 0.00 | 2,682 | 56.9 | 49.4 | 46.9 | 43.7 | 13% | 12% |
| `PD_Linear_Actress` | 760423837604 | PAUSED | 32 | 0 | 0.00 | 2,112 | 44.9 | 34.7 | 29.6 | 25.9 | 23% | 25% |
| `SH_PMO_Long` | 785312753718 | ENABLED | 31 | 0 | 0.00 | 2,851 | 94.2 | 63.6 | 51.9 | 48.4 | 33% | 24% |
| `AT_Llama_long-alt` | 761006543260 | PAUSED | 30 | 0 | 0.00 | 1,499 | 35.9 | 27.5 | 22.0 | 18.6 | 23% | 32% |
| `AT_Llama_30s` | 761006543251 | PAUSED | 30 | 0 | 0.00 | 1,821 | 65.8 | 49.5 | 43.7 | 40.8 | 25% | 18% |
| `PD_Linear_Group` | 760423837586 | PAUSED | 28 | 0 | 0.00 | 1,997 | 42.4 | 32.2 | 25.7 | 23.6 | 24% | 27% |
| `PD_TikToker_HackW` | 760423837610 | PAUSED | 27 | 2 | 0.07 | 2,115 | 67.4 | 56.2 | 51.8 | 48.5 | 17% | 14% |
| `SH_Marketing_Long` | 785312753712 | ENABLED | 24 | 0 | 0.00 | 1,925 | 96.6 | 73.8 | 63.9 | 58.2 | 24% | 21% |
| `AT_Jay_Honest` | 791195435252 | ENABLED | 21 | 1 | 0.05 | 1,082 | 47.4 | 39.1 | 34.3 | 31.7 | 18% | 19% |
| `DL_AI_Llama_Short` | 760423837625 | ENABLED | 20 | 0 | 0.00 | 1,498 | 61.2 | 51.1 | 47.3 | 45.0 | 17% | 12% |
| `AT_Llama_long` | 761006543257 | PAUSED | 19 | 0 | 0.00 | 1,030 | 35.9 | 27.9 | 24.6 | 22.0 | 22% | 21% |
| `PD_Manager_Celebration` | 791195435264 | PAUSED | 17 | 0 | 0.00 | 795 | 34.4 | 24.3 | 20.6 | 18.3 | 29% | 24% |
| `AT_Llama_30s-alt` | 761006543254 | PAUSED | 16 | 0 | 0.00 | 901 | 68.9 | 52.8 | 47.9 | 45.3 | 23% | 14% |
| `PD_Manager_WoF` | 791195435267 | PAUSED | 14 | 0 | 0.00 | 705 | 29.4 | 22.5 | 20.2 | 17.8 | 24% | 21% |
| `SH_Finance_Long` | 785312753724 | ENABLED | 12 | 0 | 0.00 | 1,192 | 95.8 | 71.6 | 58.4 | 53.3 | 25% | 26% |
| `UT_Frank_Mix` | 760423837598 | PAUSED | 11 | 0 | 0.00 | 739 | 61.3 | 51.7 | 49.3 | 44.7 | 16% | 13% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 195,860 | 905 | 0.00 | 20,953,729 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 37,878 | 168 | 0.00 |
| geoTargetConstants/1007850 | 15,148 | 61 | 0.00 |
| geoTargetConstants/1006524 | 3,858 | 24 | 0.01 |
| geoTargetConstants/1006912 | 2,669 | 12 | 0.00 |
| geoTargetConstants/1007336 | 1,751 | 6 | 0.00 |
| geoTargetConstants/1006656 | 1,701 | 4 | 0.00 |
| geoTargetConstants/1006864 | 1,536 | 8 | 0.01 |
| geoTargetConstants/1007835 | 1,377 | 7 | 0.00 |
| geoTargetConstants/1006567 | 1,353 | 5 | 0.00 |
| geoTargetConstants/1006884 | 1,247 | 8 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9255051 | 426 | 0 | 0.00 |
| geoTargetConstants/1007133 | 381 | 0 | 0.00 |
| geoTargetConstants/9198116 | 366 | 0 | 0.00 |
| geoTargetConstants/1007091 | 306 | 0 | 0.00 |
| geoTargetConstants/1006707 | 289 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-crm-desktop-main2-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £179,418 | **DEP:** 4,439 | **DEP/Spend:** 0.02
- **Impressions:** 15,642,008 | **Clicks:** 35,273 | **Conversions:** 444
- **All Conversions Value:** 1,198,233 | **All Conversions:** 154,074
- **Active Months:** 4 (2026-01-01 → 2026-04-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-01-01 | 32,791 | 952 | 0.03 | 3,185,812 | 6,708 | 95 |
| 2026-02-01 | 75,507 | 1,820 | 0.02 | 7,802,610 | 17,137 | 182 |
| 2026-03-01 | 51,960 | 1,332 | 0.03 | 3,595,287 | 8,642 | 133 |
| 2026-04-01 | 19,161 | 335 | 0.02 | 1,058,299 | 2,786 | 34 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Employment_CRM_EM` | ENABLED | 63,155 | 1,597 | 0.03 | 5,118,778 | 33.7 | 22.4 | 18.4 | 15.9 | 33% | 29% |
| `LookalikeHigh_CRM_L` | ENABLED | 33,623 | 721 | 0.02 | 4,042,717 | 31.2 | 20.3 | 16.4 | 14.0 | 35% | 31% |
| `Lookalike_CRM_L` | ENABLED | 27,670 | 647 | 0.02 | 2,952,389 | 29.3 | 18.6 | 15.0 | 12.7 | 36% | 32% |
| `CompBig_CRM_CA` | ENABLED | 27,669 | 620 | 0.02 | 2,333,660 | 34.8 | 23.4 | 19.3 | 16.6 | 33% | 29% |
| `Competitors_CRM_M` | ENABLED | 12,017 | 366 | 0.03 | 692,786 | 37.6 | 26.1 | 21.8 | 19.0 | 31% | 27% |
| `SQA_CRM_S` | ENABLED | 9,849 | 314 | 0.03 | 376,819 | 36.3 | 24.5 | 20.2 | 17.4 | 32% | 29% |
| `Keywords_CRM_KW` | ENABLED | 3,564 | 70 | 0.02 | 78,303 | 26.5 | 16.4 | 12.7 | 10.0 | 38% | 39% |
| `Topics_CRM_T` | ENABLED | 1,870 | 105 | 0.06 | 46,556 | 23.7 | 13.6 | 10.4 | 7.9 | 42% | 42% |

**Ads in `Employment_CRM_EM`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792525732886 | ENABLED | 14,159 | 433 | 0.03 | 1,077,597 | 29.8 | 18.6 | 14.8 | 12.4 | 38% | 33% |
| `AT_TheMillionaire_Wow_CRM` | 792484779327 | ENABLED | 5,389 | 142 | 0.03 | 355,538 | 31.3 | 20.6 | 16.7 | 14.2 | 34% | 31% |
| `CR_Intervention_WeNeed_CRM` | 792525796780 | ENABLED | 4,931 | 146 | 0.03 | 348,442 | 27.2 | 20.0 | 16.3 | 13.7 | 26% | 32% |
| `DL_Switchto_CRM` | 792603052223 | ENABLED | 3,939 | 85 | 0.02 | 316,026 | 26.5 | 19.2 | 15.6 | 12.8 | 28% | 33% |
| `AT_Car_Bestadvice_CRM` | 792525733612 | ENABLED | 3,930 | 133 | 0.03 | 389,690 | 40.8 | 26.5 | 22.4 | 19.7 | 35% | 26% |
| `DL_Stayinglateagain_CRM` | 792603007565 | ENABLED | 3,923 | 165 | 0.04 | 313,142 | 26.6 | 19.3 | 15.7 | 13.0 | 28% | 33% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792525753778 | PAUSED | 3,762 | 94 | 0.03 | 307,164 | 40.8 | 29.7 | 25.9 | 23.8 | 27% | 20% |
| `DL_Nightmare_Long_CRM` | 792484731501 | PAUSED | 3,755 | 70 | 0.02 | 317,573 | 26.5 | 19.4 | 16.0 | 13.6 | 27% | 30% |
| `CR_Intervention_Launch_CRM` | 792525736033 | ENABLED | 3,323 | 36 | 0.01 | 326,200 | 27.1 | 20.0 | 16.2 | 13.5 | 26% | 32% |
| `AT_Podcast_HateCRM_CRM` | 792603051800 | ENABLED | 2,480 | 10 | 0.00 | 173,888 | 30.9 | 22.7 | 18.7 | 15.8 | 27% | 30% |
| `CR_Enthusiast_StopIt_CRM` | 792525734119 | PAUSED | 2,027 | 30 | 0.01 | 164,459 | 40.8 | 29.2 | 25.5 | 23.1 | 29% | 21% |
| `DL_Nightmare_Short_CRM` | 792484761093 | PAUSED | 1,990 | 10 | 0.01 | 227,243 | 45.3 | 34.1 | 30.7 | 28.4 | 25% | 17% |
| `AT_Car_Tip_CRM` | 792525751402 | ENABLED | 1,985 | 63 | 0.03 | 166,113 | 43.9 | 30.0 | 25.9 | 23.3 | 32% | 22% |
| `PD_5features_Automations_CRM` | 792525752536 | ENABLED | 1,941 | 20 | 0.01 | 169,392 | 95.3 | 46.6 | 37.0 | 33.1 | 51% | 29% |
| `PD_Thebiggestdeal_Bam_CRM` | 792603052973 | ENABLED | 1,715 | 50 | 0.03 | 198,223 | 30.3 | 21.9 | 18.3 | 15.8 | 28% | 28% |
| `AT_Podcast_BeHonest_CRM` | 792484731318 | ENABLED | 1,129 | 15 | 0.01 | 75,680 | 32.7 | 24.6 | 20.8 | 17.9 | 25% | 27% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792603052268 | ENABLED | 1,102 | 30 | 0.03 | 82,146 | 31.6 | 23.2 | 19.3 | 16.8 | 27% | 28% |
| `PD_5features_Sequences_CRM` | 792603050297 | ENABLED | 1,018 | 44 | 0.04 | 87,488 | 95.2 | 53.3 | 46.3 | 43.0 | 44% | 19% |
| `AT_ManUS_Nothing_CRM` | 803014300306 | ENABLED | 241 | 0 | 0.00 | 8,885 | 30.2 | 21.1 | 17.5 | 14.8 | 30% | 30% |
| `AT_ManUS_Efficiency_CRM` | 803014300309 | ENABLED | 166 | 10 | 0.06 | 5,907 | 31.2 | 22.3 | 18.7 | 15.6 | 28% | 30% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300303 | ENABLED | 149 | 10 | 0.07 | 4,738 | 39.4 | 30.5 | 26.4 | 23.5 | 23% | 23% |
| `CR_Enthusiast_ComStopIt_CRM` | 803014300300 | ENABLED | 103 | 0 | 0.00 | 3,244 | 40.8 | 31.5 | 27.4 | 24.2 | 23% | 23% |

**Ads in `LookalikeHigh_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792484762254 | ENABLED | 8,097 | 175 | 0.02 | 776,077 | 27.5 | 16.6 | 12.9 | 10.7 | 40% | 36% |
| `AT_TheMillionaire_Wow_CRM` | 792525754441 | ENABLED | 2,852 | 40 | 0.01 | 237,879 | 29.2 | 18.5 | 14.7 | 12.3 | 37% | 34% |
| `CR_Intervention_WeNeed_CRM` | 792525735280 | ENABLED | 2,767 | 110 | 0.04 | 269,101 | 25.2 | 18.2 | 14.6 | 12.1 | 28% | 34% |
| `DL_Switchto_CRM` | 792603016211 | ENABLED | 2,591 | 67 | 0.03 | 387,831 | 24.2 | 17.2 | 13.8 | 11.2 | 29% | 35% |
| `AT_Car_Bestadvice_CRM` | 792603006866 | ENABLED | 2,105 | 20 | 0.01 | 472,283 | 37.3 | 23.2 | 19.2 | 16.7 | 38% | 28% |
| `DL_Stayinglateagain_CRM` | 792525752308 | ENABLED | 1,941 | 20 | 0.01 | 249,452 | 24.4 | 17.2 | 13.8 | 11.2 | 30% | 35% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792603017906 | PAUSED | 1,885 | 58 | 0.03 | 217,095 | 39.5 | 28.5 | 24.8 | 22.8 | 28% | 20% |
| `DL_Nightmare_Long_CRM` | 792525733672 | PAUSED | 1,547 | 30 | 0.02 | 134,365 | 26.1 | 19.0 | 15.6 | 13.1 | 27% | 31% |
| `AT_Podcast_HateCRM_CRM` | 792525750919 | ENABLED | 1,354 | 30 | 0.02 | 192,552 | 30.8 | 22.7 | 18.7 | 15.8 | 26% | 30% |
| `AT_Car_Tip_CRM` | 792525736297 | ENABLED | 1,273 | 20 | 0.02 | 150,369 | 41.8 | 27.9 | 23.9 | 21.4 | 33% | 23% |
| `PD_5features_Automations_CRM` | 792603007814 | ENABLED | 1,261 | 10 | 0.01 | 200,653 | 95.1 | 44.8 | 34.8 | 30.8 | 53% | 31% |
| `CR_Intervention_Launch_CRM` | 792484761084 | ENABLED | 1,260 | 20 | 0.02 | 143,276 | 26.0 | 18.7 | 15.1 | 12.5 | 28% | 33% |
| `CR_Enthusiast_StopIt_CRM` | 792603007625 | PAUSED | 909 | 30 | 0.03 | 135,568 | 42.4 | 31.0 | 27.2 | 24.8 | 27% | 20% |
| `DL_Nightmare_Short_CRM` | 792525718720 | PAUSED | 847 | 20 | 0.02 | 112,130 | 47.2 | 35.9 | 32.5 | 30.2 | 24% | 16% |
| `PD_Thebiggestdeal_Bam_CRM` | 792603000662 | ENABLED | 846 | 20 | 0.02 | 154,279 | 30.3 | 21.9 | 17.9 | 15.5 | 28% | 29% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792484729563 | ENABLED | 653 | 30 | 0.05 | 79,848 | 30.7 | 22.2 | 18.5 | 16.0 | 28% | 28% |
| `AT_Podcast_BeHonest_CRM` | 792484760874 | ENABLED | 550 | 0 | 0.00 | 61,292 | 37.3 | 29.2 | 23.9 | 21.0 | 22% | 28% |
| `PD_5features_Sequences_CRM` | 792484729863 | ENABLED | 441 | 20 | 0.05 | 52,907 | 94.6 | 49.2 | 42.2 | 38.9 | 48% | 21% |
| `AT_ManUS_Nothing_CRM` | 803014300270 | ENABLED | 218 | 0 | 0.00 | 8,640 | 29.4 | 20.0 | 16.8 | 13.9 | 32% | 31% |
| `AT_ManUS_Efficiency_CRM` | 803014300273 | ENABLED | 97 | 0 | 0.00 | 3,547 | 28.1 | 18.5 | 15.5 | 13.5 | 34% | 27% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300267 | ENABLED | 80 | 0 | 0.00 | 2,309 | 35.1 | 24.5 | 21.6 | 19.9 | 30% | 19% |
| `CR_Enthusiast_ComStopIt_CRM` | 803014300264 | ENABLED | 51 | 0 | 0.00 | 1,264 | 35.8 | 26.1 | 22.1 | 19.8 | 27% | 24% |

**Ads in `Lookalike_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792484762731 | ENABLED | 9,892 | 273 | 0.03 | 986,750 | 26.8 | 15.9 | 12.4 | 10.2 | 41% | 36% |
| `CR_Intervention_WeNeed_CRM` | 792525733180 | ENABLED | 2,364 | 60 | 0.03 | 231,483 | 23.6 | 16.8 | 13.5 | 11.2 | 29% | 34% |
| `AT_TheMillionaire_Wow_CRM` | 792603051023 | ENABLED | 1,959 | 20 | 0.01 | 117,765 | 29.7 | 18.9 | 15.0 | 12.4 | 36% | 34% |
| `DL_Stayinglateagain_CRM` | 792603006959 | ENABLED | 1,491 | 20 | 0.01 | 139,835 | 24.5 | 17.3 | 13.9 | 11.3 | 29% | 35% |
| `AT_Car_Bestadvice_CRM` | 792525751117 | ENABLED | 1,486 | 80 | 0.05 | 258,089 | 36.6 | 22.1 | 18.3 | 15.8 | 40% | 28% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792603000923 | PAUSED | 1,385 | 20 | 0.01 | 167,157 | 35.9 | 25.0 | 21.4 | 19.5 | 30% | 22% |
| `DL_Switchto_CRM` | 792484778853 | ENABLED | 1,381 | 10 | 0.01 | 150,301 | 24.3 | 17.2 | 13.8 | 11.2 | 29% | 35% |
| `DL_Nightmare_Long_CRM` | 792603016076 | PAUSED | 1,241 | 40 | 0.03 | 115,354 | 25.0 | 18.2 | 14.9 | 12.6 | 27% | 31% |
| `CR_Intervention_Launch_CRM` | 792603052070 | ENABLED | 1,084 | 10 | 0.01 | 96,425 | 25.3 | 18.1 | 14.6 | 11.8 | 28% | 35% |
| `AT_Podcast_HateCRM_CRM` | 792603007337 | ENABLED | 918 | 20 | 0.02 | 107,195 | 30.5 | 22.3 | 18.5 | 15.6 | 27% | 30% |
| `PD_5features_Automations_CRM` | 792603018845 | ENABLED | 812 | 10 | 0.01 | 136,914 | 95.4 | 44.6 | 34.5 | 30.7 | 53% | 31% |
| `CR_Enthusiast_StopIt_CRM` | 792603006623 | PAUSED | 689 | 43 | 0.06 | 104,533 | 39.1 | 28.0 | 24.3 | 22.1 | 28% | 21% |
| `AT_Car_Tip_CRM` | 792525719677 | ENABLED | 623 | 0 | 0.00 | 63,048 | 42.2 | 28.7 | 24.6 | 22.1 | 32% | 23% |
| `DL_Nightmare_Short_CRM` | 792484761549 | PAUSED | 586 | 20 | 0.03 | 69,788 | 44.9 | 33.6 | 30.2 | 28.1 | 25% | 17% |
| `PD_Thebiggestdeal_Bam_CRM` | 792603000857 | ENABLED | 543 | 10 | 0.02 | 81,562 | 30.5 | 21.9 | 18.0 | 15.4 | 28% | 30% |
| `AT_Podcast_BeHonest_CRM` | 792484731288 | ENABLED | 432 | 0 | 0.00 | 54,403 | 36.5 | 26.7 | 22.1 | 19.4 | 27% | 28% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792603052967 | ENABLED | 353 | 0 | 0.00 | 34,382 | 29.2 | 21.0 | 17.2 | 14.6 | 28% | 31% |
| `PD_5features_Sequences_CRM` | 792525751891 | ENABLED | 252 | 10 | 0.04 | 31,428 | 94.9 | 48.4 | 41.1 | 38.0 | 49% | 22% |
| `AT_ManUS_Nothing_CRM` | 803014300258 | ENABLED | 69 | 0 | 0.00 | 1,933 | 27.8 | 18.9 | 15.8 | 13.2 | 32% | 30% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300255 | ENABLED | 49 | 0 | 0.00 | 1,596 | 38.6 | 27.7 | 24.0 | 21.9 | 28% | 21% |
| `AT_ManUS_Efficiency_CRM` | 803014300261 | ENABLED | 31 | 0 | 0.00 | 1,543 | 32.4 | 21.5 | 17.8 | 14.5 | 34% | 33% |
| `CR_Enthusiast_ComStopIt_CRM` | 803014300252 | ENABLED | 29 | 0 | 0.00 | 905 | 42.5 | 32.5 | 26.8 | 23.0 | 24% | 29% |

**Ads in `CompBig_CRM_CA`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 794804748196 | ENABLED | 8,002 | 210 | 0.03 | 564,997 | 30.3 | 18.6 | 14.7 | 12.2 | 38% | 34% |
| `CR_Intervention_WeNeed_CRM` | 794804748202 | ENABLED | 3,115 | 55 | 0.02 | 270,337 | 28.1 | 20.6 | 16.6 | 13.9 | 27% | 33% |
| `AT_TheMillionaire_Wow_CRM` | 794804748190 | ENABLED | 1,819 | 33 | 0.02 | 108,274 | 33.2 | 22.0 | 17.8 | 15.1 | 34% | 31% |
| `AT_Car_Bestadvice_CRM` | 794804748226 | ENABLED | 1,547 | 20 | 0.01 | 169,391 | 42.8 | 27.9 | 23.8 | 21.0 | 35% | 25% |
| `DL_Switchto_CRM` | 794804748214 | ENABLED | 1,538 | 18 | 0.01 | 147,343 | 29.6 | 21.7 | 17.8 | 14.7 | 27% | 32% |
| `DL_Stayinglateagain_CRM` | 794804748217 | ENABLED | 1,360 | 11 | 0.01 | 128,353 | 29.0 | 21.0 | 17.1 | 14.3 | 27% | 32% |
| `CR_Enthusiast_AnotherDeal_CRM` | 794804748205 | PAUSED | 1,311 | 50 | 0.04 | 122,519 | 45.6 | 34.9 | 31.0 | 28.8 | 24% | 18% |
| `AT_Podcast_HateCRM_CRM` | 794804748208 | ENABLED | 1,157 | 10 | 0.01 | 102,706 | 35.2 | 26.6 | 22.3 | 18.9 | 24% | 29% |
| `CR_Intervention_Launch_CRM` | 794804748187 | ENABLED | 1,129 | 27 | 0.02 | 102,982 | 30.1 | 22.1 | 18.2 | 15.2 | 27% | 31% |
| `DL_Nightmare_Long_CRM` | 794804748211 | PAUSED | 1,106 | 30 | 0.03 | 86,401 | 30.4 | 22.7 | 18.9 | 16.2 | 25% | 29% |
| `PD_5features_Automations_CRM` | 794804748238 | ENABLED | 996 | 20 | 0.02 | 83,611 | 96.1 | 51.6 | 42.4 | 38.6 | 46% | 25% |
| `AT_Car_Tip_CRM` | 794804748223 | ENABLED | 830 | 36 | 0.04 | 83,199 | 48.1 | 34.5 | 30.4 | 27.4 | 28% | 20% |
| `DL_Nightmare_Short_CRM` | 794804748220 | PAUSED | 680 | 20 | 0.03 | 73,776 | 52.5 | 40.8 | 37.1 | 34.8 | 22% | 15% |
| `CR_Enthusiast_StopIt_CRM` | 794804748193 | PAUSED | 628 | 40 | 0.06 | 75,940 | 48.7 | 37.5 | 33.4 | 31.0 | 23% | 17% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 794804748232 | ENABLED | 528 | 10 | 0.02 | 70,920 | 36.8 | 27.8 | 23.6 | 20.6 | 25% | 26% |
| `PD_Thebiggestdeal_Bam_CRM` | 794804748229 | ENABLED | 522 | 10 | 0.02 | 74,176 | 36.2 | 27.4 | 23.1 | 20.2 | 24% | 26% |
| `PD_5features_Sequences_CRM` | 794804748235 | ENABLED | 341 | 10 | 0.03 | 28,790 | 96.5 | 62.8 | 56.1 | 52.9 | 35% | 16% |
| `AT_Podcast_BeHonest_CRM` | 794804748199 | ENABLED | 323 | 10 | 0.03 | 19,398 | 40.6 | 31.4 | 26.6 | 23.3 | 23% | 26% |
| `AT_ManUS_Nothing_CRM` | 803014300462 | ENABLED | 276 | 0 | 0.00 | 8,145 | 29.0 | 20.0 | 16.5 | 14.0 | 31% | 30% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300459 | ENABLED | 184 | 0 | 0.00 | 4,593 | 34.4 | 25.3 | 21.2 | 17.8 | 26% | 30% |
| `AT_ManUS_Efficiency_CRM` | 803014300465 | ENABLED | 167 | 0 | 0.00 | 4,397 | 29.2 | 20.9 | 17.2 | 14.2 | 29% | 32% |
| `CR_Enthusiast_ComStopIt_CRM` | 803014300456 | ENABLED | 112 | 0 | 0.00 | 3,412 | 38.5 | 28.8 | 23.9 | 21.0 | 25% | 27% |

**Ads in `Competitors_CRM_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792603015836 | ENABLED | 2,044 | 70 | 0.03 | 96,939 | 30.5 | 18.6 | 14.6 | 12.1 | 39% | 35% |
| `CR_Intervention_WeNeed_CRM` | 792484730589 | ENABLED | 908 | 10 | 0.01 | 46,386 | 31.0 | 23.1 | 18.8 | 15.7 | 25% | 32% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792603053414 | PAUSED | 908 | 50 | 0.06 | 52,860 | 46.7 | 35.7 | 31.8 | 29.6 | 24% | 17% |
| `AT_TheMillionaire_Wow_CRM` | 792603000422 | ENABLED | 850 | 40 | 0.05 | 32,236 | 31.9 | 21.1 | 17.0 | 14.4 | 34% | 32% |
| `AT_Car_Bestadvice_CRM` | 792525733663 | ENABLED | 819 | 10 | 0.01 | 71,098 | 40.4 | 26.6 | 22.4 | 19.5 | 34% | 27% |
| `AT_Car_Tip_CRM` | 792603053690 | ENABLED | 736 | 5 | 0.01 | 42,109 | 44.9 | 32.0 | 27.9 | 25.0 | 29% | 22% |
| `DL_Nightmare_Long_CRM` | 792525733369 | PAUSED | 731 | 40 | 0.05 | 41,268 | 31.0 | 23.0 | 19.3 | 16.7 | 26% | 27% |
| `DL_Stayinglateagain_CRM` | 792525733168 | ENABLED | 730 | 30 | 0.04 | 37,487 | 30.8 | 22.8 | 18.6 | 15.4 | 26% | 32% |
| `DL_Switchto_CRM` | 792603017210 | ENABLED | 711 | 0 | 0.00 | 35,326 | 30.9 | 22.7 | 18.3 | 15.1 | 26% | 34% |
| `AT_Podcast_HateCRM_CRM` | 792603000908 | ENABLED | 696 | 10 | 0.01 | 47,943 | 38.1 | 29.0 | 24.6 | 21.3 | 24% | 27% |
| `CR_Intervention_Launch_CRM` | 792484731303 | ENABLED | 677 | 20 | 0.03 | 30,805 | 32.0 | 24.2 | 19.9 | 16.5 | 25% | 32% |
| `CR_Enthusiast_StopIt_CRM` | 792484779561 | PAUSED | 528 | 10 | 0.02 | 37,450 | 47.3 | 36.3 | 32.1 | 29.7 | 23% | 18% |
| `PD_5features_Automations_CRM` | 792484778835 | ENABLED | 410 | 50 | 0.12 | 25,985 | 95.7 | 52.0 | 44.4 | 40.7 | 46% | 22% |
| `DL_Nightmare_Short_CRM` | 792603052286 | PAUSED | 407 | 10 | 0.02 | 29,502 | 53.4 | 42.8 | 39.0 | 36.5 | 20% | 15% |
| `PD_Thebiggestdeal_Bam_CRM` | 792525733837 | ENABLED | 333 | 0 | 0.00 | 34,531 | 38.1 | 29.1 | 24.7 | 21.6 | 23% | 26% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792484762467 | ENABLED | 249 | 10 | 0.04 | 14,322 | 38.4 | 29.3 | 24.7 | 21.4 | 24% | 27% |
| `PD_5features_Sequences_CRM` | 792603000407 | ENABLED | 135 | 0 | 0.00 | 8,612 | 95.5 | 58.9 | 53.2 | 50.4 | 38% | 14% |
| `AT_Podcast_BeHonest_CRM` | 792484771866 | ENABLED | 105 | 0 | 0.00 | 6,747 | 44.6 | 35.3 | 29.5 | 25.6 | 21% | 28% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300447 | ENABLED | 15 | 0 | 0.00 | 418 | 40.6 | 30.1 | 29.0 | 26.9 | 26% | 11% |
| `AT_ManUS_Nothing_CRM` | 803014300450 | ENABLED | 12 | 0 | 0.00 | 324 | 30.4 | 19.7 | 17.1 | 13.8 | 35% | 30% |

**Ads in `SQA_CRM_S`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792484731012 | ENABLED | 1,463 | 60 | 0.04 | 44,851 | 27.8 | 16.3 | 12.5 | 10.2 | 41% | 37% |
| `AT_Car_Bestadvice_CRM` | 792484761735 | ENABLED | 749 | 0 | 0.00 | 41,852 | 39.4 | 25.2 | 20.9 | 18.1 | 36% | 28% |
| `CR_Intervention_WeNeed_CRM` | 792603018410 | ENABLED | 723 | 35 | 0.05 | 24,293 | 30.1 | 22.2 | 17.9 | 14.9 | 26% | 33% |
| `DL_Stayinglateagain_CRM` | 792603015974 | ENABLED | 642 | 19 | 0.03 | 21,268 | 28.3 | 20.1 | 15.9 | 12.8 | 29% | 37% |
| `AT_TheMillionaire_Wow_CRM` | 792603000122 | ENABLED | 638 | 10 | 0.02 | 18,138 | 31.4 | 20.4 | 16.1 | 13.6 | 35% | 33% |
| `DL_Switchto_CRM` | 792603008090 | ENABLED | 633 | 0 | 0.00 | 21,907 | 29.2 | 21.3 | 17.0 | 13.9 | 27% | 35% |
| `DL_Nightmare_Long_CRM` | 792603018953 | PAUSED | 612 | 81 | 0.13 | 20,360 | 31.1 | 23.2 | 19.1 | 16.3 | 25% | 29% |
| `CR_Intervention_Launch_CRM` | 792525751666 | ENABLED | 565 | 30 | 0.05 | 16,022 | 28.5 | 20.7 | 16.6 | 13.7 | 27% | 34% |
| `AT_Car_Tip_CRM` | 792484731057 | ENABLED | 565 | 21 | 0.04 | 24,612 | 42.6 | 29.3 | 25.2 | 22.2 | 31% | 24% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792525796696 | PAUSED | 540 | 20 | 0.04 | 23,141 | 45.3 | 34.8 | 30.8 | 28.4 | 23% | 19% |
| `AT_Podcast_HateCRM_CRM` | 792603017234 | ENABLED | 532 | 0 | 0.00 | 24,190 | 34.0 | 24.7 | 20.5 | 17.3 | 27% | 30% |
| `PD_5features_Automations_CRM` | 792603007613 | ENABLED | 487 | 10 | 0.02 | 23,826 | 94.9 | 48.9 | 40.1 | 36.2 | 48% | 26% |
| `CR_Enthusiast_StopIt_CRM` | 792603053180 | PAUSED | 448 | 20 | 0.04 | 23,604 | 47.2 | 36.2 | 32.0 | 29.5 | 23% | 18% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792525751882 | ENABLED | 285 | 0 | 0.00 | 8,614 | 36.8 | 27.4 | 23.6 | 20.5 | 26% | 25% |
| `DL_Nightmare_Short_CRM` | 792525735529 | PAUSED | 250 | 0 | 0.00 | 11,738 | 49.0 | 38.5 | 34.6 | 31.4 | 21% | 18% |
| `PD_Thebiggestdeal_Bam_CRM` | 792484760604 | ENABLED | 245 | 1 | 0.00 | 14,511 | 36.2 | 27.1 | 22.7 | 19.9 | 25% | 26% |
| `PD_5features_Sequences_CRM` | 792525751195 | ENABLED | 177 | 0 | 0.00 | 6,344 | 94.4 | 54.1 | 47.2 | 44.1 | 43% | 18% |
| `AT_Podcast_BeHonest_CRM` | 792525752521 | ENABLED | 121 | 0 | 0.00 | 4,267 | 40.1 | 31.9 | 26.6 | 22.6 | 21% | 29% |
| `CR_Enthusiast_ComIntuitive_CRM` | 803014300315 | ENABLED | 85 | 0 | 0.00 | 1,365 | 34.0 | 26.3 | 22.8 | 19.3 | 23% | 27% |
| `AT_ManUS_Nothing_CRM` | 803014300318 | ENABLED | 41 | 0 | 0.00 | 862 | 33.4 | 23.8 | 19.1 | 16.5 | 29% | 31% |
| `AT_ManUS_Efficiency_CRM` | 803014300441 | ENABLED | 31 | 5 | 0.16 | 620 | 30.0 | 19.8 | 16.4 | 14.2 | 34% | 28% |
| `CR_Enthusiast_ComStopIt_CRM` | 803014300312 | ENABLED | 18 | 0 | 0.00 | 434 | 43.4 | 35.6 | 29.8 | 28.3 | 18% | 21% |

**Ads in `Keywords_CRM_KW`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792525752563 | ENABLED | 957 | 0 | 0.00 | 25,762 | 28.3 | 15.4 | 11.2 | 8.4 | 46% | 45% |
| `CR_Intervention_WeNeed_CRM` | 792525753547 | ENABLED | 561 | 0 | 0.00 | 14,402 | 22.5 | 16.3 | 13.2 | 10.6 | 28% | 35% |
| `DL_Switchto_CRM` | 792603007406 | ENABLED | 309 | 20 | 0.06 | 8,282 | 21.5 | 15.5 | 12.6 | 9.7 | 28% | 38% |
| `DL_Stayinglateagain_CRM` | 792603017426 | ENABLED | 290 | 10 | 0.03 | 6,497 | 22.3 | 16.5 | 13.4 | 10.4 | 26% | 37% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792603017441 | PAUSED | 242 | 0 | 0.00 | 4,778 | 27.4 | 17.1 | 14.0 | 11.8 | 38% | 31% |
| `AT_Podcast_HateCRM_CRM` | 792603050159 | ENABLED | 208 | 20 | 0.10 | 2,780 | 25.6 | 18.5 | 14.3 | 12.1 | 28% | 34% |
| `DL_Nightmare_Long_CRM` | 792525734131 | PAUSED | 204 | 20 | 0.10 | 4,176 | 21.3 | 15.3 | 12.6 | 10.6 | 28% | 31% |
| `AT_TheMillionaire_Wow_CRM` | 792603053174 | ENABLED | 171 | 0 | 0.00 | 2,752 | 30.0 | 17.2 | 12.9 | 9.7 | 43% | 44% |
| `CR_Intervention_Launch_CRM` | 792603000869 | ENABLED | 135 | 0 | 0.00 | 2,016 | 19.9 | 13.5 | 11.2 | 8.8 | 32% | 35% |
| `PD_5features_Automations_CRM` | 792603052274 | ENABLED | 87 | 0 | 0.00 | 1,181 | 92.5 | 35.2 | 25.3 | 22.2 | 62% | 37% |
| `AT_Car_Bestadvice_CRM` | 792603008120 | ENABLED | 77 | 0 | 0.00 | 1,399 | 34.8 | 20.6 | 17.9 | 13.5 | 41% | 35% |
| `CR_Enthusiast_StopIt_CRM` | 792603017750 | PAUSED | 64 | 0 | 0.00 | 1,072 | 30.9 | 17.2 | 12.8 | 10.5 | 44% | 39% |
| `AT_Podcast_BeHonest_CRM` | 792603052298 | ENABLED | 59 | 0 | 0.00 | 546 | 31.5 | 30.1 | 25.9 | 20.1 | 5% | 33% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792525736201 | ENABLED | 50 | 0 | 0.00 | 698 | 25.7 | 19.3 | 16.3 | 13.7 | 25% | 29% |
| `AT_Car_Tip_CRM` | 792484761057 | ENABLED | 36 | 0 | 0.00 | 427 | 41.3 | 24.8 | 18.4 | 13.1 | 40% | 47% |
| `PD_Thebiggestdeal_Bam_CRM` | 792525733321 | ENABLED | 35 | 0 | 0.00 | 644 | 28.4 | 21.3 | 16.9 | 15.1 | 25% | 29% |
| `PD_5features_Sequences_CRM` | 792484761483 | ENABLED | 33 | 0 | 0.00 | 216 | 90.4 | 36.8 | 26.9 | 24.6 | 59% | 33% |
| `DL_Nightmare_Short_CRM` | 792525751612 | PAUSED | 28 | 0 | 0.00 | 438 | 31.7 | 24.0 | 19.8 | 17.7 | 24% | 26% |

**Ads in `Topics_CRM_T`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 792603015731 | ENABLED | 367 | 20 | 0.05 | 8,122 | 24.5 | 12.7 | 8.9 | 6.5 | 48% | 49% |
| `CR_Intervention_WeNeed_CRM` | 792525750937 | ENABLED | 247 | 30 | 0.12 | 6,896 | 19.1 | 12.9 | 10.3 | 8.2 | 33% | 36% |
| `CR_Enthusiast_AnotherDeal_CRM` | 792525719476 | PAUSED | 179 | 0 | 0.00 | 5,124 | 33.1 | 23.5 | 18.2 | 13.9 | 29% | 41% |
| `DL_Stayinglateagain_CRM` | 792603051251 | ENABLED | 173 | 10 | 0.06 | 6,106 | 16.9 | 12.2 | 10.0 | 7.5 | 28% | 39% |
| `AT_Podcast_HateCRM_CRM` | 792525754051 | ENABLED | 139 | 5 | 0.04 | 2,648 | 29.1 | 24.9 | 23.4 | 21.2 | 15% | 15% |
| `DL_Switchto_CRM` | 792603016541 | ENABLED | 128 | 20 | 0.16 | 3,551 | 19.1 | 13.0 | 11.2 | 8.3 | 32% | 36% |
| `AT_TheMillionaire_Wow_CRM` | 792603053255 | ENABLED | 80 | 0 | 0.00 | 1,728 | 24.7 | 12.5 | 10.5 | 7.6 | 49% | 39% |
| `AT_Car_Bestadvice_CRM` | 792525751087 | ENABLED | 66 | 0 | 0.00 | 1,449 | 30.1 | 15.7 | 11.1 | 7.7 | 48% | 51% |
| `AT_Podcast_BeHonest_CRM` | 792603018416 | ENABLED | 61 | 0 | 0.00 | 866 | 40.6 | 38.8 | 38.8 | 33.5 | 4% | 14% |
| `CR_Intervention_Launch_CRM` | 792603015743 | ENABLED | 57 | 0 | 0.00 | 1,614 | 15.7 | 8.6 | 7.5 | 6.2 | 45% | 28% |
| `PD_Thebiggestdeal_Bam_CRM` | 792525752041 | ENABLED | 54 | 0 | 0.00 | 1,457 | 37.3 | 22.1 | 19.4 | 16.1 | 41% | 27% |
| `PD_5features_Automations_CRM` | 792603018362 | ENABLED | 54 | 0 | 0.00 | 798 | 88.8 | 43.8 | 36.0 | 25.7 | 51% | 41% |
| `CR_Enthusiast_StopIt_CRM` | 792484762512 | PAUSED | 51 | 0 | 0.00 | 1,316 | 31.4 | 19.0 | 16.1 | 13.5 | 40% | 29% |
| `AT_Car_Tip_CRM` | 792525719206 | ENABLED | 47 | 0 | 0.00 | 513 | 30.0 | 21.3 | 16.7 | 13.2 | 29% | 38% |
| `DL_Nightmare_Long_CRM` | 792525754291 | PAUSED | 45 | 0 | 0.00 | 1,013 | 21.9 | 14.6 | 11.7 | 9.9 | 33% | 32% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 792525753520 | ENABLED | 41 | 20 | 0.49 | 1,566 | 18.1 | 8.0 | 7.6 | 4.5 | 56% | 44% |
| `PD_5features_Sequences_CRM` | 792484761030 | ENABLED | 37 | 0 | 0.00 | 713 | 80.6 | 29.0 | 19.1 | 19.1 | 64% | 34% |
| `DL_Nightmare_Short_CRM` | 792603006449 | PAUSED | 34 | 0 | 0.00 | 991 | 38.3 | 28.6 | 26.2 | 26.2 | 25% | 8% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 179,418 | 4,439 | 0.02 | 15,642,008 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 39,920 | 981 | 0.02 |
| geoTargetConstants/1007850 | 5,622 | 150 | 0.03 |
| geoTargetConstants/1006524 | 4,701 | 144 | 0.03 |
| geoTargetConstants/1006912 | 2,871 | 78 | 0.03 |
| geoTargetConstants/1006656 | 1,712 | 60 | 0.04 |
| geoTargetConstants/1007336 | 1,655 | 50 | 0.03 |
| geoTargetConstants/1006864 | 1,515 | 50 | 0.03 |
| geoTargetConstants/1006567 | 1,332 | 50 | 0.04 |
| geoTargetConstants/9197981 | 1,320 | 20 | 0.02 |
| geoTargetConstants/1006884 | 1,319 | 20 | 0.02 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9198013 | 1,010 | 0 | 0.00 |
| geoTargetConstants/1006539 | 498 | 0 | 0.00 |
| geoTargetConstants/1007274 | 479 | 0 | 0.00 |
| geoTargetConstants/1006959 | 462 | 0 | 0.00 |
| geoTargetConstants/1007089 | 391 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-crm-desktop-trgt-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £169,099 | **DEP:** 4,285 | **DEP/Spend:** 0.03
- **Impressions:** 6,708,558 | **Clicks:** 10,698 | **Conversions:** 429
- **All Conversions Value:** 485,596 | **All Conversions:** 61,303
- **Active Months:** 8 (2025-05-01 → 2025-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 20,483 | 1,030 | 0.05 | 852,505 | 1,041 | 103 |
| 2025-06-01 | 20,830 | 535 | 0.03 | 682,178 | 929 | 53 |
| 2025-07-01 | 12,915 | 275 | 0.02 | 423,118 | 585 | 27 |
| 2025-08-01 | 6,282 | 211 | 0.03 | 207,409 | 307 | 21 |
| 2025-09-01 | 28,801 | 560 | 0.02 | 1,132,624 | 1,644 | 56 |
| 2025-10-01 | 34,854 | 692 | 0.02 | 1,813,290 | 2,789 | 69 |
| 2025-11-01 | 32,346 | 643 | 0.02 | 1,084,721 | 2,348 | 64 |
| 2025-12-01 | 12,589 | 340 | 0.03 | 512,713 | 1,055 | 34 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CRM_S-MultiAds` | ENABLED | 32,248 | 938 | 0.03 | 1,283,105 | 33.7 | 23.8 | 20.0 | 17.4 | 29% | 27% |
| `CompCRMBig4_S-MultiAds` | ENABLED | 28,490 | 544 | 0.02 | 1,182,328 | 32.9 | 22.6 | 18.7 | 16.0 | 31% | 29% |
| `CRM_KW-MultiAds` | ENABLED | 25,765 | 569 | 0.02 | 517,463 | 24.3 | 15.2 | 12.1 | 9.9 | 38% | 35% |
| `CompCRMBig4_KW-MultiAds` | ENABLED | 25,373 | 521 | 0.02 | 743,638 | 24.3 | 14.6 | 11.4 | 9.1 | 40% | 37% |
| `CRMsolutions-IMcrm-MultiAds` | ENABLED | 21,948 | 841 | 0.04 | 1,462,859 | 33.7 | 23.9 | 20.1 | 17.5 | 29% | 27% |
| `BusinessOperations_T-multiAds` | ENABLED | 15,891 | 321 | 0.02 | 658,601 | 23.6 | 15.3 | 12.3 | 10.3 | 35% | 33% |
| `CompCRMSmall_S-MultiAds` | ENABLED | 10,481 | 211 | 0.02 | 548,543 | 38.0 | 27.2 | 23.0 | 20.2 | 28% | 26% |
| `CompCRMBig_S-MultiAds` | PAUSED | 5,822 | 310 | 0.05 | 239,861 | 29.3 | 19.9 | 16.4 | 14.1 | 32% | 29% |
| `Marketing_Sales_T-multiAds` | ENABLED | 1,953 | 10 | 0.01 | 47,416 | 17.1 | 10.4 | 8.0 | 6.3 | 39% | 40% |
| `CRM_T-multiAds` | ENABLED | 1,058 | 11 | 0.01 | 23,193 | 22.8 | 14.2 | 11.7 | 8.8 | 37% | 38% |
| `CompetitorsCRMV2_KW-MultiAds` | PAUSED | 68 | 10 | 0.15 | 1,551 | 31.3 | 19.8 | 16.8 | 14.6 | 37% | 26% |

**Ads in `CRM_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750716688179 | ENABLED | 3,907 | 133 | 0.03 | 151,975 | 27.8 | 19.0 | 15.0 | 12.4 | 32% | 35% |
| `PD_TheFastWay_Short_CRM` | 753056275911 | ENABLED | 3,905 | 85 | 0.02 | 106,621 | 39.5 | 29.7 | 25.7 | 23.0 | 25% | 23% |
| `PD_AIPodcast_Short_CRM` | 750716688182 | ENABLED | 2,198 | 41 | 0.02 | 118,087 | 36.9 | 26.7 | 23.3 | 20.8 | 27% | 22% |
| `CR_President_ShortNo_CRM` | 750716688167 | PAUSED | 1,679 | 95 | 0.06 | 63,481 | 32.1 | 21.4 | 17.9 | 15.7 | 33% | 27% |
| `CR_President_Long_CRM` | 750716688161 | PAUSED | 1,645 | 70 | 0.04 | 47,821 | 21.6 | 14.6 | 11.5 | 10.0 | 33% | 31% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750716688176 | PAUSED | 1,487 | 40 | 0.03 | 45,424 | 38.7 | 28.3 | 24.3 | 21.9 | 27% | 23% |
| `DL_Nightmare_Long_CRM` | 765080211808 | ENABLED | 1,265 | 40 | 0.03 | 42,299 | 28.5 | 21.1 | 17.4 | 14.6 | 26% | 31% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714243 | ENABLED | 1,239 | 30 | 0.02 | 44,891 | 30.1 | 17.5 | 13.4 | 11.0 | 42% | 37% |
| `AT_TheMillionaire_Wow_CRM` | 774439714240 | ENABLED | 1,103 | 43 | 0.04 | 35,912 | 31.8 | 19.4 | 15.2 | 12.6 | 39% | 35% |
| `DL_Switchto_CRM` | 774462736498 | ENABLED | 1,004 | 13 | 0.01 | 42,139 | 28.2 | 20.2 | 16.3 | 13.2 | 29% | 35% |
| `CR_Intervention_WeNeed_CRM` | 774422560944 | ENABLED | 978 | 10 | 0.01 | 32,640 | 28.9 | 21.2 | 17.1 | 14.0 | 27% | 34% |
| `AT_Podcast_HateCRM_CRM` | 774551147193 | ENABLED | 952 | 30 | 0.03 | 35,552 | 29.1 | 20.9 | 16.8 | 14.0 | 28% | 33% |
| `DL_Stayinglateagain_CRM` | 774462736495 | ENABLED | 944 | 32 | 0.03 | 39,441 | 27.7 | 20.1 | 16.2 | 13.1 | 27% | 35% |
| `CR_President_Short_CRM` | 750716688164 | PAUSED | 918 | 40 | 0.04 | 26,185 | 31.9 | 21.9 | 18.3 | 16.1 | 32% | 26% |
| `AT_Car_Bestadvice_CRM` | 774399548364 | ENABLED | 914 | 10 | 0.01 | 37,023 | 39.7 | 25.6 | 21.3 | 18.3 | 36% | 28% |
| `CR_Intervention_Launch_CRM` | 774422978337 | ENABLED | 812 | 23 | 0.03 | 28,160 | 27.2 | 19.5 | 15.9 | 13.2 | 29% | 32% |
| `PD_Yuval_Formula_CRM` | 750716688194 | PAUSED | 787 | 10 | 0.01 | 35,943 | 24.9 | 20.2 | 18.2 | 16.6 | 19% | 18% |
| `PD_POV_Dashboard_CRM` | 750716688185 | PAUSED | 781 | 20 | 0.03 | 88,446 | 86.9 | 43.2 | 33.3 | 28.7 | 50% | 34% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131358 | ENABLED | 600 | 10 | 0.02 | 25,028 | 43.6 | 32.7 | 28.7 | 26.7 | 25% | 18% |
| `PD_TheFastWay_Long_CRM` | 753056275914 | ENABLED | 593 | 20 | 0.03 | 42,228 | 32.4 | 23.8 | 20.0 | 16.8 | 27% | 30% |
| `DL_Nightmare_Short_CRM` | 765080146462 | ENABLED | 513 | 10 | 0.02 | 20,265 | 45.3 | 35.0 | 31.6 | 29.1 | 23% | 17% |
| `CR_Enthusiast_StopIt_CRM` | 774423802032 | ENABLED | 504 | 0 | 0.00 | 21,039 | 43.4 | 31.8 | 27.7 | 25.0 | 27% | 21% |
| `AT_WomanUS_Team_CRM` | 750716688155 | PAUSED | 474 | 0 | 0.00 | 24,249 | 34.4 | 26.0 | 22.8 | 20.5 | 24% | 21% |
| `PD_WomanPink_Face_CRM` | 750716688188 | PAUSED | 460 | 50 | 0.11 | 22,124 | 34.3 | 25.8 | 22.1 | 19.8 | 25% | 23% |
| `CRMQuickWinDemoPerson` | 750716688170 | PAUSED | 445 | 20 | 0.04 | 18,387 | 39.9 | 31.2 | 27.3 | 24.8 | 22% | 20% |
| `AT_Car_Tip_CRM` | 774399548367 | ENABLED | 430 | 22 | 0.05 | 14,707 | 45.3 | 32.2 | 27.6 | 24.8 | 29% | 23% |
| `PD_3Reasons_Team_CRM` | 750716688173 | PAUSED | 413 | 10 | 0.02 | 14,478 | 34.0 | 25.4 | 21.3 | 18.4 | 25% | 28% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750716688158 | PAUSED | 372 | 30 | 0.08 | 17,874 | 40.2 | 30.6 | 27.2 | 24.8 | 24% | 19% |
| `AT_Podcast_BeHonest_CRM` | 774679698449 | ENABLED | 305 | 0 | 0.00 | 12,205 | 33.2 | 24.2 | 19.8 | 17.5 | 27% | 28% |
| `PD_WomanPink_Platform_CRM` | 750716688191 | PAUSED | 278 | 0 | 0.00 | 13,415 | 32.2 | 24.6 | 21.7 | 19.3 | 24% | 22% |
| `AT_Realestate_Short_CRM` | 750716688152 | PAUSED | 212 | 0 | 0.00 | 8,796 | 29.8 | 22.2 | 18.3 | 16.3 | 25% | 27% |
| `UT_FinanceJoke_CRM` | 750716688197 | PAUSED | 133 | 0 | 0.00 | 6,270 | 35.6 | 26.6 | 22.4 | 20.0 | 25% | 25% |

**Ads in `CompCRMBig4_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `DL_Nightmare_Long_CRM` | 772316772666 | ENABLED | 2,876 | 50 | 0.02 | 96,437 | 25.6 | 18.4 | 15.0 | 12.6 | 28% | 31% |
| `AT_TheMillionaire_Wow_CRM` | 774439714270 | ENABLED | 2,618 | 70 | 0.03 | 84,338 | 29.6 | 17.3 | 13.3 | 11.0 | 42% | 37% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714273 | ENABLED | 2,044 | 63 | 0.03 | 75,172 | 29.6 | 16.8 | 12.9 | 10.6 | 43% | 37% |
| `CR_Intervention_WeNeed_CRM` | 774422560959 | ENABLED | 1,841 | 10 | 0.01 | 60,959 | 25.5 | 18.3 | 14.5 | 11.9 | 28% | 35% |
| `PD_AIPodcast_Long_CRM` | 772364067571 | ENABLED | 1,777 | 75 | 0.04 | 92,366 | 31.1 | 21.6 | 17.5 | 14.5 | 31% | 33% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131373 | ENABLED | 1,768 | 30 | 0.02 | 76,549 | 39.4 | 28.0 | 24.1 | 21.8 | 29% | 22% |
| `AT_Car_Bestadvice_CRM` | 774399548394 | ENABLED | 1,764 | 30 | 0.02 | 84,116 | 40.0 | 26.0 | 21.8 | 19.0 | 35% | 27% |
| `DL_Switchto_CRM` | 774462736528 | ENABLED | 1,745 | 40 | 0.02 | 64,148 | 26.7 | 19.2 | 15.5 | 12.5 | 28% | 35% |
| `AT_Podcast_HateCRM_CRM` | 774551147208 | ENABLED | 1,521 | 40 | 0.03 | 61,268 | 28.1 | 19.9 | 16.2 | 13.4 | 29% | 33% |
| `CR_Intervention_Launch_CRM` | 774422978352 | ENABLED | 1,459 | 10 | 0.01 | 54,056 | 26.6 | 18.9 | 15.2 | 12.4 | 29% | 35% |
| `DL_Stayinglateagain_CRM` | 774462736525 | ENABLED | 1,416 | 10 | 0.01 | 53,256 | 26.9 | 19.3 | 15.4 | 12.4 | 28% | 36% |
| `PD_AIPodcast_Short_CRM` | 772364056741 | ENABLED | 1,386 | 30 | 0.02 | 92,324 | 38.5 | 27.2 | 23.5 | 20.8 | 29% | 24% |
| `DL_Nightmare_Short_CRM` | 772364076955 | ENABLED | 1,183 | 13 | 0.01 | 41,886 | 44.7 | 33.6 | 29.8 | 27.1 | 25% | 19% |
| `AT_Car_Tip_CRM` | 774399548397 | ENABLED | 1,022 | 40 | 0.04 | 40,977 | 42.9 | 28.8 | 24.4 | 21.5 | 33% | 25% |
| `CR_Enthusiast_StopIt_CRM` | 774423802047 | ENABLED | 969 | 20 | 0.02 | 40,191 | 40.7 | 29.4 | 25.3 | 22.7 | 28% | 23% |
| `PD_TheFastWay_Short_CRM` | 772364079076 | ENABLED | 857 | 0 | 0.00 | 34,399 | 44.2 | 34.2 | 30.1 | 27.5 | 22% | 20% |
| `AT_Podcast_BeHonest_CRM` | 774679698464 | ENABLED | 568 | 0 | 0.00 | 18,022 | 29.8 | 21.3 | 17.4 | 14.8 | 28% | 31% |
| `PD_TheFastWay_Long_CRM` | 772448500271 | ENABLED | 454 | 0 | 0.00 | 35,544 | 33.0 | 23.5 | 18.9 | 16.5 | 29% | 30% |
| `PD_POV_Dashboard_CRM` | 772316775996 | PAUSED | 300 | 0 | 0.00 | 26,716 | 95.0 | 45.9 | 34.9 | 29.7 | 52% | 35% |
| `CR_President_ShortNo_CRM` | 772364056060 | PAUSED | 272 | 0 | 0.00 | 16,670 | 39.2 | 27.2 | 23.2 | 20.1 | 31% | 26% |
| `PD_WomanPink_Face_CRM` | 772316777487 | PAUSED | 191 | 1 | 0.00 | 11,059 | 37.5 | 27.3 | 23.6 | 21.0 | 27% | 23% |
| `AT_WomanUS_TimeIsMoney_CRM` | 772448518079 | PAUSED | 148 | 10 | 0.07 | 7,983 | 38.6 | 27.7 | 23.9 | 21.3 | 28% | 23% |
| `CR_President_Short_CRM` | 772316761320 | PAUSED | 93 | 0 | 0.00 | 3,717 | 40.5 | 28.9 | 25.1 | 23.0 | 29% | 20% |
| `PD_3Reasons_Team_CRM` | 772364075989 | PAUSED | 90 | 0 | 0.00 | 3,608 | 33.0 | 24.7 | 21.0 | 17.4 | 25% | 30% |
| `AT_Realestate_Short_CRM` | 772364067013 | PAUSED | 55 | 0 | 0.00 | 2,751 | 34.0 | 24.3 | 19.5 | 18.1 | 29% | 25% |
| `AT_WomanUS_Team_CRM` | 772316771232 | PAUSED | 49 | 0 | 0.00 | 2,774 | 47.9 | 37.6 | 31.8 | 28.3 | 21% | 25% |
| `UT_FinanceJoke_CRM` | 772448494733 | PAUSED | 23 | 0 | 0.00 | 1,042 | 42.7 | 32.4 | 27.6 | 24.4 | 24% | 25% |

**Ads in `CRM_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750628528225 | ENABLED | 3,905 | 70 | 0.02 | 89,001 | 20.0 | 12.3 | 9.4 | 7.5 | 38% | 39% |
| `PD_TheFastWay_Short_CRM` | 753056275893 | ENABLED | 2,016 | 40 | 0.02 | 35,380 | 27.1 | 18.3 | 15.3 | 13.2 | 32% | 28% |
| `CR_President_ShortNo_CRM` | 750628481707 | PAUSED | 1,894 | 95 | 0.05 | 32,643 | 27.9 | 16.8 | 13.2 | 10.7 | 40% | 36% |
| `CR_President_Long_CRM` | 750605023410 | PAUSED | 1,833 | 20 | 0.01 | 33,788 | 13.8 | 9.2 | 7.1 | 5.7 | 33% | 38% |
| `PD_AIPodcast_Short_CRM` | 750713987183 | ENABLED | 1,769 | 20 | 0.01 | 37,283 | 26.4 | 16.6 | 13.4 | 11.2 | 37% | 33% |
| `DL_Nightmare_Long_CRM` | 765080211802 | ENABLED | 1,197 | 20 | 0.02 | 27,419 | 18.7 | 12.8 | 10.5 | 8.6 | 32% | 33% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750605066094 | PAUSED | 991 | 20 | 0.02 | 17,518 | 28.9 | 18.6 | 15.0 | 12.9 | 36% | 30% |
| `CR_President_Short_CRM` | 750605099745 | PAUSED | 920 | 60 | 0.07 | 14,445 | 26.8 | 15.9 | 12.6 | 10.5 | 41% | 34% |
| `DL_Switchto_CRM` | 774462726886 | ENABLED | 843 | 60 | 0.07 | 17,887 | 19.4 | 13.7 | 11.0 | 8.2 | 30% | 40% |
| `AT_TheMillionaire_Wow_CRM` | 774439714228 | ENABLED | 791 | 30 | 0.04 | 19,200 | 28.5 | 14.9 | 10.6 | 7.8 | 48% | 48% |
| `DL_Stayinglateagain_CRM` | 774462726883 | ENABLED | 776 | 10 | 0.01 | 17,446 | 19.9 | 14.3 | 11.3 | 8.3 | 28% | 42% |
| `AT_Podcast_HateCRM_CRM` | 774551147187 | ENABLED | 765 | 19 | 0.03 | 16,728 | 19.8 | 13.2 | 10.6 | 8.8 | 33% | 33% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714231 | ENABLED | 744 | 0 | 0.00 | 17,368 | 28.7 | 14.6 | 10.3 | 7.4 | 49% | 49% |
| `CR_Intervention_Launch_CRM` | 774422978331 | ENABLED | 715 | 0 | 0.00 | 14,320 | 18.7 | 12.3 | 9.7 | 7.5 | 34% | 39% |
| `CR_Intervention_WeNeed_CRM` | 774422560938 | ENABLED | 711 | 0 | 0.00 | 15,482 | 19.5 | 13.3 | 10.5 | 8.3 | 32% | 37% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750628375156 | PAUSED | 592 | 0 | 0.00 | 11,129 | 28.7 | 19.5 | 16.3 | 14.3 | 32% | 27% |
| `PD_TheFastWay_Long_CRM` | 753056275896 | ENABLED | 556 | 0 | 0.00 | 8,165 | 21.5 | 14.1 | 11.2 | 9.3 | 35% | 34% |
| `PD_POV_Dashboard_CRM` | 750605183667 | PAUSED | 542 | 0 | 0.00 | 9,258 | 89.5 | 35.3 | 24.9 | 20.6 | 61% | 42% |
| `DL_Nightmare_Short_CRM` | 765080146456 | ENABLED | 479 | 20 | 0.04 | 10,014 | 29.0 | 19.1 | 16.2 | 14.2 | 34% | 26% |
| `PD_WomanPink_Face_CRM` | 750628308193 | PAUSED | 463 | 5 | 0.01 | 8,671 | 25.5 | 16.9 | 14.3 | 12.7 | 34% | 25% |
| `PD_Yuval_Formula_CRM` | 750597057042 | PAUSED | 391 | 10 | 0.03 | 9,561 | 21.1 | 15.7 | 13.8 | 12.5 | 26% | 20% |
| `PD_3Reasons_Team_CRM` | 750605025264 | PAUSED | 384 | 10 | 0.03 | 7,627 | 20.5 | 14.2 | 11.6 | 9.8 | 31% | 31% |
| `CR_Enthusiast_StopIt_CRM` | 774423802026 | ENABLED | 364 | 0 | 0.00 | 7,211 | 28.5 | 17.8 | 14.6 | 12.5 | 38% | 30% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131352 | ENABLED | 325 | 0 | 0.00 | 6,773 | 30.2 | 19.6 | 16.1 | 14.3 | 35% | 27% |
| `AT_Car_Bestadvice_CRM` | 774399548352 | ENABLED | 315 | 10 | 0.03 | 7,067 | 34.3 | 19.5 | 15.9 | 13.2 | 43% | 32% |
| `AT_WomanUS_Team_CRM` | 750713721554 | PAUSED | 298 | 0 | 0.00 | 5,880 | 25.9 | 18.5 | 15.4 | 13.9 | 28% | 25% |
| `PD_WomanPink_Platform_CRM` | 750713767910 | PAUSED | 297 | 0 | 0.00 | 5,234 | 27.1 | 18.4 | 15.5 | 13.7 | 32% | 26% |
| `AT_Realestate_Short_CRM` | 750605186838 | PAUSED | 269 | 0 | 0.00 | 4,038 | 22.8 | 15.9 | 13.1 | 11.3 | 30% | 29% |
| `AT_Car_Tip_CRM` | 774399548355 | ENABLED | 185 | 0 | 0.00 | 3,023 | 36.9 | 21.9 | 17.7 | 14.8 | 41% | 32% |
| `AT_Podcast_BeHonest_CRM` | 774679698443 | ENABLED | 182 | 10 | 0.05 | 3,168 | 20.8 | 14.5 | 11.8 | 9.9 | 30% | 32% |
| `CRMQuickWinDemoPerson` | 750628475992 | PAUSED | 150 | 40 | 0.27 | 2,994 | 27.5 | 19.6 | 17.0 | 15.2 | 29% | 22% |
| `UT_FinanceJoke_CRM` | 750713986709 | PAUSED | 106 | 0 | 0.00 | 1,742 | 22.0 | 16.1 | 14.0 | 12.4 | 27% | 23% |

**Ads in `CompCRMBig4_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `DL_Nightmare_Long_CRM` | 772448500496 | ENABLED | 3,556 | 65 | 0.02 | 116,407 | 17.9 | 12.1 | 9.6 | 7.8 | 33% | 36% |
| `PD_AIPodcast_Long_CRM` | 772316771934 | ENABLED | 2,980 | 55 | 0.02 | 91,440 | 20.6 | 12.7 | 9.6 | 7.7 | 38% | 40% |
| `AT_TheMillionaire_Wow_CRM` | 774439714264 | ENABLED | 1,745 | 50 | 0.03 | 47,887 | 28.2 | 14.7 | 10.5 | 7.8 | 48% | 47% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714267 | ENABLED | 1,719 | 30 | 0.02 | 44,335 | 28.6 | 14.3 | 10.1 | 7.3 | 50% | 49% |
| `PD_AIPodcast_Short_CRM` | 772364069254 | ENABLED | 1,702 | 30 | 0.02 | 52,068 | 27.2 | 16.1 | 12.5 | 10.3 | 41% | 36% |
| `CR_Intervention_WeNeed_CRM` | 774422560956 | ENABLED | 1,382 | 10 | 0.01 | 37,279 | 18.8 | 12.5 | 9.9 | 8.0 | 34% | 36% |
| `DL_Switchto_CRM` | 774462736522 | ENABLED | 1,371 | 20 | 0.01 | 36,676 | 19.2 | 13.1 | 10.3 | 7.8 | 32% | 40% |
| `DL_Nightmare_Short_CRM` | 772316762154 | ENABLED | 1,336 | 30 | 0.02 | 42,883 | 28.0 | 17.1 | 14.1 | 12.1 | 39% | 30% |
| `DL_Stayinglateagain_CRM` | 774462736519 | ENABLED | 1,210 | 20 | 0.02 | 33,776 | 19.2 | 13.2 | 10.6 | 8.0 | 31% | 39% |
| `AT_Podcast_HateCRM_CRM` | 774551147205 | ENABLED | 1,121 | 10 | 0.01 | 29,743 | 20.3 | 13.7 | 10.8 | 8.8 | 33% | 35% |
| `CR_Intervention_Launch_CRM` | 774422978349 | ENABLED | 1,043 | 10 | 0.01 | 25,115 | 17.5 | 11.5 | 9.0 | 7.1 | 35% | 38% |
| `PD_TheFastWay_Short_CRM` | 772448494022 | ENABLED | 874 | 4 | 0.00 | 24,301 | 26.2 | 16.6 | 13.4 | 11.4 | 37% | 32% |
| `AT_Car_Bestadvice_CRM` | 774399548388 | ENABLED | 742 | 50 | 0.07 | 22,552 | 35.5 | 20.1 | 16.1 | 13.2 | 43% | 34% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131370 | ENABLED | 687 | 30 | 0.04 | 20,355 | 29.0 | 18.5 | 14.9 | 12.8 | 36% | 31% |
| `AT_Podcast_BeHonest_CRM` | 774679698461 | ENABLED | 630 | 16 | 0.03 | 16,333 | 19.4 | 12.8 | 10.1 | 8.2 | 34% | 36% |
| `CR_Enthusiast_StopIt_CRM` | 774423802044 | ENABLED | 577 | 20 | 0.03 | 16,424 | 28.6 | 17.5 | 14.1 | 12.1 | 39% | 31% |
| `AT_Car_Tip_CRM` | 774399548391 | ENABLED | 504 | 20 | 0.04 | 15,565 | 34.6 | 20.0 | 16.1 | 13.4 | 42% | 33% |
| `CR_President_ShortNo_CRM` | 772448514365 | PAUSED | 494 | 20 | 0.04 | 16,080 | 29.7 | 17.8 | 13.7 | 10.6 | 40% | 41% |
| `PD_TheFastWay_Long_CRM` | 772364068072 | ENABLED | 374 | 0 | 0.00 | 9,540 | 19.7 | 12.2 | 9.4 | 7.9 | 38% | 36% |
| `AT_WomanUS_TimeIsMoney_CRM` | 772316781342 | PAUSED | 342 | 0 | 0.00 | 10,696 | 26.1 | 15.7 | 12.7 | 10.6 | 40% | 32% |
| `PD_WomanPink_Face_CRM` | 772364067778 | PAUSED | 271 | 0 | 0.00 | 9,592 | 25.9 | 16.1 | 12.7 | 10.6 | 38% | 34% |
| `PD_POV_Dashboard_CRM` | 772316754186 | PAUSED | 246 | 30 | 0.12 | 9,079 | 91.0 | 33.4 | 22.3 | 17.6 | 63% | 47% |
| `CR_President_Short_CRM` | 772448495177 | PAUSED | 168 | 0 | 0.00 | 5,053 | 28.1 | 16.8 | 13.0 | 10.4 | 40% | 38% |
| `PD_3Reasons_Team_CRM` | 772448500754 | PAUSED | 154 | 0 | 0.00 | 5,970 | 19.7 | 13.3 | 10.5 | 8.8 | 33% | 34% |
| `AT_WomanUS_Team_CRM` | 772316754462 | PAUSED | 64 | 0 | 0.00 | 1,901 | 31.4 | 20.7 | 17.4 | 14.9 | 34% | 28% |
| `AT_Realestate_Short_CRM` | 772316761335 | PAUSED | 57 | 0 | 0.00 | 1,726 | 22.7 | 14.7 | 11.8 | 10.0 | 35% | 32% |
| `UT_FinanceJoke_CRM` | 772448503814 | PAUSED | 25 | 0 | 0.00 | 862 | 22.8 | 14.8 | 12.7 | 11.3 | 35% | 24% |

**Ads in `CRMsolutions-IMcrm-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750713796668 | ENABLED | 2,390 | 113 | 0.05 | 179,811 | 29.4 | 20.6 | 16.8 | 14.2 | 30% | 31% |
| `AT_TheMillionaire_Wow_CRM` | 774439714258 | ENABLED | 1,977 | 75 | 0.04 | 121,647 | 31.7 | 19.5 | 15.4 | 12.6 | 38% | 35% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714261 | ENABLED | 1,695 | 45 | 0.03 | 104,570 | 31.2 | 18.7 | 14.5 | 11.7 | 40% | 37% |
| `PD_AIPodcast_Short_CRM` | 750628398145 | ENABLED | 1,675 | 23 | 0.01 | 169,674 | 39.6 | 29.0 | 25.4 | 23.0 | 27% | 21% |
| `DL_Stayinglateagain_CRM` | 774462736513 | ENABLED | 1,338 | 20 | 0.01 | 74,822 | 25.3 | 18.3 | 14.9 | 12.0 | 28% | 34% |
| `AT_Podcast_HateCRM_CRM` | 774551147202 | ENABLED | 1,285 | 30 | 0.02 | 72,849 | 27.5 | 19.8 | 16.3 | 13.7 | 28% | 31% |
| `DL_Nightmare_Long_CRM` | 765080211817 | ENABLED | 1,275 | 50 | 0.04 | 74,396 | 26.1 | 19.1 | 15.9 | 13.6 | 27% | 29% |
| `CR_Intervention_Launch_CRM` | 774422978346 | ENABLED | 1,230 | 20 | 0.02 | 57,563 | 25.5 | 18.2 | 14.9 | 12.2 | 29% | 33% |
| `DL_Switchto_CRM` | 774462736516 | ENABLED | 1,230 | 20 | 0.02 | 67,191 | 25.3 | 18.5 | 15.2 | 12.1 | 27% | 35% |
| `CR_Intervention_WeNeed_CRM` | 774422560953 | ENABLED | 1,158 | 43 | 0.04 | 58,084 | 27.2 | 20.1 | 16.5 | 13.6 | 26% | 32% |
| `AT_Car_Bestadvice_CRM` | 774399548382 | ENABLED | 1,067 | 10 | 0.01 | 86,771 | 42.6 | 28.3 | 24.2 | 21.4 | 34% | 24% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131367 | ENABLED | 783 | 45 | 0.06 | 61,144 | 39.9 | 29.2 | 25.7 | 23.6 | 27% | 19% |
| `DL_Nightmare_Short_CRM` | 765080146471 | ENABLED | 682 | 36 | 0.05 | 43,102 | 46.5 | 35.5 | 32.1 | 29.8 | 24% | 16% |
| `CR_Enthusiast_StopIt_CRM` | 774423802041 | ENABLED | 604 | 10 | 0.02 | 39,898 | 38.7 | 27.5 | 23.9 | 21.6 | 29% | 21% |
| `PD_TheFastWay_Short_CRM` | 753056276049 | ENABLED | 521 | 0 | 0.00 | 34,936 | 47.3 | 38.5 | 35.1 | 32.8 | 19% | 15% |
| `CR_President_Long_CRM` | 750628339609 | PAUSED | 503 | 30 | 0.06 | 17,790 | 26.4 | 19.3 | 15.7 | 13.8 | 27% | 29% |
| `AT_Car_Tip_CRM` | 774399548385 | ENABLED | 389 | 20 | 0.05 | 28,305 | 49.1 | 35.3 | 31.1 | 28.2 | 28% | 20% |
| `CR_President_ShortNo_CRM` | 750625473559 | PAUSED | 335 | 180 | 0.54 | 18,341 | 38.6 | 27.3 | 23.2 | 20.7 | 29% | 24% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750628383010 | PAUSED | 278 | 0 | 0.00 | 14,319 | 49.8 | 39.8 | 35.8 | 33.1 | 20% | 17% |
| `PD_TheFastWay_Long_CRM` | 753056276052 | ENABLED | 267 | 0 | 0.00 | 48,551 | 33.7 | 24.7 | 21.0 | 18.7 | 27% | 24% |
| `AT_Podcast_BeHonest_CRM` | 774679698458 | ENABLED | 229 | 10 | 0.04 | 11,918 | 33.0 | 24.4 | 20.3 | 17.7 | 26% | 28% |
| `CR_President_Short_CRM` | 750713861726 | PAUSED | 224 | 20 | 0.09 | 8,773 | 39.0 | 27.5 | 23.8 | 21.5 | 29% | 22% |
| `PD_Yuval_Formula_CRM` | 750713815352 | PAUSED | 127 | 0 | 0.00 | 8,226 | 58.0 | 51.6 | 48.2 | 45.8 | 11% | 11% |
| `PD_POV_Dashboard_CRM` | 750713761820 | PAUSED | 124 | 0 | 0.00 | 25,564 | 88.6 | 45.7 | 36.0 | 32.3 | 48% | 29% |
| `PD_3Reasons_Team_CRM` | 750628381867 | PAUSED | 114 | 10 | 0.09 | 5,573 | 40.7 | 31.6 | 26.8 | 24.0 | 22% | 24% |
| `AT_WomanUS_Team_CRM` | 750605099712 | PAUSED | 91 | 0 | 0.00 | 6,711 | 51.0 | 43.4 | 39.8 | 37.4 | 15% | 14% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750628483195 | PAUSED | 90 | 0 | 0.00 | 6,607 | 50.0 | 41.1 | 37.8 | 35.2 | 18% | 14% |
| `PD_WomanPink_Face_CRM` | 750713771228 | PAUSED | 86 | 20 | 0.23 | 5,364 | 44.0 | 35.7 | 32.0 | 29.0 | 19% | 19% |
| `CRMQuickWinDemoPerson` | 750628468042 | PAUSED | 67 | 0 | 0.00 | 4,217 | 57.2 | 49.4 | 45.6 | 42.5 | 14% | 14% |
| `PD_WomanPink_Platform_CRM` | 750605100219 | PAUSED | 42 | 0 | 0.00 | 2,264 | 50.6 | 42.0 | 38.7 | 35.8 | 17% | 15% |
| `AT_Realestate_Short_CRM` | 750628434844 | PAUSED | 42 | 10 | 0.24 | 2,231 | 43.6 | 35.2 | 30.6 | 26.9 | 19% | 24% |
| `UT_FinanceJoke_CRM` | 750628407835 | PAUSED | 30 | 0 | 0.00 | 1,647 | 48.4 | 38.1 | 33.4 | 30.9 | 21% | 19% |

**Ads in `BusinessOperations_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750716688227 | ENABLED | 5,570 | 141 | 0.03 | 206,503 | 21.5 | 13.6 | 10.6 | 8.6 | 37% | 37% |
| `DL_Nightmare_Long_CRM` | 765080211814 | ENABLED | 865 | 40 | 0.05 | 32,092 | 20.5 | 14.3 | 11.6 | 9.8 | 30% | 32% |
| `PD_AIPodcast_Short_CRM` | 750716688230 | ENABLED | 829 | 10 | 0.01 | 49,630 | 25.5 | 16.8 | 14.0 | 12.3 | 34% | 27% |
| `CR_President_ShortNo_CRM` | 750716688215 | PAUSED | 763 | 0 | 0.00 | 29,732 | 22.9 | 14.0 | 11.3 | 9.5 | 39% | 32% |
| `CR_President_Long_CRM` | 750716688209 | PAUSED | 762 | 20 | 0.03 | 32,514 | 14.0 | 9.5 | 7.4 | 6.2 | 32% | 35% |
| `PD_TheFastWay_Short_CRM` | 753056276043 | ENABLED | 725 | 10 | 0.01 | 22,267 | 31.6 | 23.0 | 19.6 | 17.3 | 27% | 25% |
| `AT_TheMillionaire_Wow_CRM` | 774439714252 | ENABLED | 531 | 5 | 0.01 | 24,314 | 29.4 | 15.7 | 12.0 | 9.1 | 47% | 42% |
| `DL_Stayinglateagain_CRM` | 774462736507 | ENABLED | 431 | 0 | 0.00 | 21,541 | 22.2 | 15.6 | 12.8 | 10.2 | 29% | 35% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714255 | ENABLED | 424 | 0 | 0.00 | 14,148 | 29.9 | 15.7 | 11.4 | 8.9 | 47% | 43% |
| `CR_President_Short_CRM` | 750716688212 | PAUSED | 419 | 10 | 0.02 | 17,519 | 23.3 | 14.4 | 11.8 | 10.3 | 38% | 28% |
| `DL_Switchto_CRM` | 774462736510 | ENABLED | 409 | 0 | 0.00 | 20,456 | 21.5 | 15.4 | 12.2 | 9.4 | 28% | 39% |
| `CR_Intervention_WeNeed_CRM` | 774422560950 | ENABLED | 386 | 0 | 0.00 | 16,191 | 21.4 | 14.7 | 11.8 | 9.5 | 31% | 35% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750716688224 | PAUSED | 372 | 10 | 0.03 | 12,752 | 29.6 | 20.3 | 16.9 | 15.0 | 31% | 26% |
| `PD_POV_Dashboard_CRM` | 750716688233 | PAUSED | 343 | 20 | 0.06 | 15,038 | 79.7 | 36.0 | 27.4 | 23.6 | 55% | 35% |
| `CR_Intervention_Launch_CRM` | 774422978343 | ENABLED | 302 | 0 | 0.00 | 13,815 | 20.7 | 14.2 | 11.3 | 8.9 | 31% | 38% |
| `AT_Podcast_HateCRM_CRM` | 774551147199 | ENABLED | 293 | 0 | 0.00 | 11,673 | 22.7 | 15.3 | 12.2 | 10.1 | 33% | 34% |
| `DL_Nightmare_Short_CRM` | 765080146468 | ENABLED | 258 | 10 | 0.04 | 9,072 | 33.5 | 23.7 | 20.4 | 18.3 | 29% | 23% |
| `PD_WomanPink_Face_CRM` | 750716688236 | PAUSED | 224 | 0 | 0.00 | 8,604 | 25.5 | 18.5 | 15.9 | 14.2 | 27% | 23% |
| `PD_Yuval_Formula_CRM` | 750716688362 | PAUSED | 216 | 0 | 0.00 | 18,959 | 9.9 | 7.6 | 6.5 | 5.9 | 23% | 23% |
| `PD_3Reasons_Team_CRM` | 750716688221 | PAUSED | 213 | 0 | 0.00 | 8,857 | 21.6 | 15.4 | 13.1 | 11.3 | 29% | 27% |
| `PD_TheFastWay_Long_CRM` | 753056276046 | ENABLED | 203 | 10 | 0.05 | 10,052 | 23.9 | 16.8 | 13.5 | 10.9 | 30% | 35% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750716688206 | PAUSED | 196 | 0 | 0.00 | 7,478 | 30.5 | 22.3 | 19.2 | 17.1 | 27% | 23% |
| `AT_Car_Bestadvice_CRM` | 774399548376 | ENABLED | 170 | 0 | 0.00 | 6,874 | 37.6 | 22.8 | 19.0 | 16.4 | 39% | 28% |
| `AT_WomanUS_Team_CRM` | 750716688203 | PAUSED | 168 | 10 | 0.06 | 12,451 | 17.8 | 13.2 | 11.6 | 10.2 | 26% | 23% |
| `CR_Enthusiast_StopIt_CRM` | 774423802038 | ENABLED | 157 | 0 | 0.00 | 8,671 | 35.5 | 23.7 | 20.4 | 18.4 | 33% | 22% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131364 | ENABLED | 136 | 0 | 0.00 | 6,073 | 35.3 | 24.7 | 21.0 | 18.8 | 30% | 24% |
| `PD_WomanPink_Platform_CRM` | 750716688239 | PAUSED | 126 | 0 | 0.00 | 4,204 | 24.5 | 17.3 | 14.6 | 13.2 | 29% | 23% |
| `CRMQuickWinDemoPerson` | 750716688218 | PAUSED | 102 | 10 | 0.10 | 5,236 | 29.4 | 22.6 | 20.2 | 18.5 | 23% | 18% |
| `AT_Realestate_Short_CRM` | 750716688200 | PAUSED | 89 | 0 | 0.00 | 3,228 | 19.9 | 13.9 | 11.7 | 10.1 | 30% | 27% |
| `UT_FinanceJoke_CRM` | 750716688365 | PAUSED | 79 | 0 | 0.00 | 3,295 | 27.0 | 19.3 | 15.8 | 14.1 | 29% | 27% |
| `AT_Car_Tip_CRM` | 774399548379 | ENABLED | 66 | 15 | 0.23 | 2,775 | 42.7 | 28.4 | 24.4 | 21.4 | 33% | 25% |
| `AT_Podcast_BeHonest_CRM` | 774679698455 | ENABLED | 65 | 0 | 0.00 | 2,587 | 25.0 | 16.5 | 12.8 | 10.1 | 34% | 39% |

**Ads in `CompCRMSmall_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750628519666 | ENABLED | 1,772 | 30 | 0.02 | 80,583 | 30.6 | 21.2 | 16.9 | 14.0 | 31% | 34% |
| `CR_President_Long_CRM` | 750713928635 | PAUSED | 832 | 10 | 0.01 | 31,087 | 24.2 | 16.6 | 12.9 | 11.1 | 32% | 33% |
| `PD_AIPodcast_Short_CRM` | 750713721968 | ENABLED | 661 | 10 | 0.02 | 41,054 | 41.9 | 31.2 | 27.4 | 24.5 | 25% | 22% |
| `PD_TheFastWay_Short_CRM` | 753056275881 | ENABLED | 659 | 10 | 0.02 | 25,043 | 45.1 | 35.5 | 31.4 | 28.4 | 21% | 20% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750628413355 | PAUSED | 650 | 20 | 0.03 | 27,270 | 42.9 | 31.9 | 27.4 | 24.9 | 26% | 22% |
| `CR_President_ShortNo_CRM` | 750713700377 | PAUSED | 620 | 30 | 0.05 | 32,293 | 38.4 | 26.2 | 22.1 | 19.6 | 32% | 25% |
| `PD_POV_Dashboard_CRM` | 750628524610 | PAUSED | 414 | 0 | 0.00 | 64,756 | 94.3 | 49.2 | 39.1 | 35.0 | 48% | 29% |
| `AT_TheMillionaire_Wow_CRM` | 774439714222 | ENABLED | 394 | 0 | 0.00 | 16,960 | 34.6 | 20.8 | 16.5 | 13.6 | 40% | 35% |
| `CR_President_Short_CRM` | 750605090613 | PAUSED | 392 | 10 | 0.03 | 13,008 | 37.7 | 26.7 | 23.0 | 20.3 | 29% | 24% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714225 | ENABLED | 345 | 0 | 0.00 | 15,463 | 33.3 | 18.8 | 14.2 | 11.4 | 43% | 39% |
| `DL_Nightmare_Long_CRM` | 765080211799 | ENABLED | 345 | 10 | 0.03 | 13,912 | 30.2 | 22.4 | 18.7 | 15.8 | 26% | 29% |
| `CR_Intervention_WeNeed_CRM` | 774422560935 | ENABLED | 306 | 0 | 0.00 | 11,445 | 31.3 | 23.6 | 19.4 | 16.4 | 25% | 30% |
| `PD_Yuval_Formula_CRM` | 750605059650 | PAUSED | 270 | 10 | 0.04 | 14,419 | 49.8 | 41.6 | 38.1 | 35.3 | 16% | 15% |
| `AT_Podcast_HateCRM_CRM` | 774551147184 | ENABLED | 240 | 0 | 0.00 | 11,682 | 30.7 | 22.1 | 18.2 | 14.8 | 28% | 33% |
| `DL_Stayinglateagain_CRM` | 774462726877 | ENABLED | 240 | 1 | 0.00 | 9,709 | 29.1 | 21.0 | 17.1 | 13.9 | 28% | 34% |
| `DL_Switchto_CRM` | 774462726880 | ENABLED | 228 | 0 | 0.00 | 10,414 | 29.0 | 21.4 | 17.0 | 13.7 | 26% | 36% |
| `PD_TheFastWay_Long_CRM` | 753056275884 | ENABLED | 219 | 10 | 0.05 | 22,898 | 35.9 | 25.9 | 21.7 | 18.7 | 28% | 28% |
| `AT_WomanUS_Team_CRM` | 750713798114 | PAUSED | 204 | 0 | 0.00 | 12,685 | 47.4 | 36.8 | 32.8 | 29.9 | 22% | 19% |
| `PD_WomanPink_Face_CRM` | 750605183469 | PAUSED | 184 | 0 | 0.00 | 9,905 | 44.6 | 34.8 | 30.9 | 27.8 | 22% | 20% |
| `PD_3Reasons_Team_CRM` | 750605215587 | PAUSED | 180 | 20 | 0.11 | 8,081 | 39.4 | 30.4 | 25.7 | 21.6 | 23% | 29% |
| `CRMQuickWinDemoPerson` | 750605194941 | PAUSED | 178 | 20 | 0.11 | 11,184 | 42.9 | 33.8 | 29.5 | 26.8 | 21% | 21% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750628443313 | PAUSED | 175 | 10 | 0.06 | 10,803 | 51.0 | 40.9 | 37.0 | 34.1 | 20% | 16% |
| `AT_Car_Bestadvice_CRM` | 774399548346 | ENABLED | 170 | 0 | 0.00 | 11,402 | 43.4 | 28.1 | 23.6 | 20.9 | 35% | 26% |
| `CR_Intervention_Launch_CRM` | 774422978328 | ENABLED | 168 | 0 | 0.00 | 6,510 | 30.9 | 22.7 | 18.4 | 15.4 | 26% | 32% |
| `DL_Nightmare_Short_CRM` | 765080146453 | ENABLED | 127 | 10 | 0.08 | 6,143 | 50.4 | 40.4 | 36.6 | 34.1 | 20% | 15% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131349 | ENABLED | 108 | 0 | 0.00 | 7,796 | 45.7 | 35.0 | 30.5 | 28.2 | 23% | 20% |
| `AT_Realestate_Short_CRM` | 750628587814 | PAUSED | 95 | 0 | 0.00 | 4,399 | 40.7 | 30.4 | 26.1 | 23.0 | 25% | 24% |
| `PD_WomanPink_Platform_CRM` | 750628496053 | PAUSED | 91 | 0 | 0.00 | 5,291 | 46.4 | 37.0 | 33.6 | 30.7 | 20% | 17% |
| `CR_Enthusiast_StopIt_CRM` | 774423802023 | ENABLED | 86 | 0 | 0.00 | 5,513 | 42.7 | 31.7 | 27.9 | 25.8 | 26% | 19% |
| `UT_FinanceJoke_CRM` | 750713797625 | PAUSED | 54 | 0 | 0.00 | 3,272 | 46.3 | 36.7 | 32.2 | 27.9 | 21% | 24% |
| `AT_Car_Tip_CRM` | 774399548349 | ENABLED | 46 | 0 | 0.00 | 2,578 | 47.9 | 34.5 | 30.3 | 27.9 | 28% | 19% |
| `AT_Podcast_BeHonest_CRM` | 774679698440 | ENABLED | 28 | 0 | 0.00 | 985 | 36.5 | 27.2 | 22.3 | 18.2 | 26% | 33% |

**Ads in `CompCRMBig_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750713720843 | PAUSED | 1,100 | 90 | 0.08 | 38,203 | 26.3 | 17.7 | 13.7 | 11.1 | 33% | 37% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750628496356 | ENABLED | 850 | 70 | 0.08 | 24,967 | 34.8 | 24.2 | 20.2 | 17.7 | 31% | 27% |
| `CR_President_Long_CRM` | 750713700125 | ENABLED | 752 | 10 | 0.01 | 20,762 | 18.2 | 12.1 | 9.4 | 7.8 | 33% | 36% |
| `CR_President_ShortNo_CRM` | 750605223750 | ENABLED | 594 | 30 | 0.05 | 23,095 | 28.0 | 17.8 | 14.6 | 12.4 | 36% | 31% |
| `PD_Yuval_Formula_CRM` | 750628426201 | ENABLED | 410 | 30 | 0.07 | 19,982 | 21.3 | 16.5 | 14.7 | 13.3 | 23% | 19% |
| `CR_President_Short_CRM` | 750605062782 | ENABLED | 404 | 0 | 0.00 | 10,164 | 28.8 | 18.8 | 15.7 | 13.3 | 35% | 29% |
| `CRMQuickWinDemoPerson` | 750628443304 | ENABLED | 328 | 10 | 0.03 | 13,065 | 31.1 | 23.0 | 19.3 | 17.2 | 26% | 25% |
| `PD_POV_Dashboard_CRM` | 750604968699 | ENABLED | 285 | 30 | 0.11 | 36,467 | 88.9 | 41.2 | 32.2 | 27.4 | 54% | 33% |
| `PD_3Reasons_Team_CRM` | 750604969827 | ENABLED | 216 | 10 | 0.05 | 6,757 | 32.8 | 23.6 | 19.8 | 17.0 | 28% | 28% |
| `PD_AIPodcast_Short_CRM` | 750597057048 | PAUSED | 184 | 0 | 0.00 | 11,689 | 28.1 | 20.0 | 17.2 | 14.6 | 29% | 27% |
| `AT_WomanUS_Team_CRM` | 750713720141 | ENABLED | 179 | 0 | 0.00 | 9,823 | 29.7 | 21.7 | 18.7 | 16.4 | 27% | 24% |
| `PD_WomanPink_Face_CRM` | 750713921939 | ENABLED | 151 | 0 | 0.00 | 5,919 | 32.7 | 23.7 | 20.1 | 17.7 | 28% | 25% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750628464625 | ENABLED | 111 | 20 | 0.18 | 6,150 | 29.6 | 22.6 | 19.8 | 17.8 | 24% | 21% |
| `PD_WomanPink_Platform_CRM` | 750713815811 | ENABLED | 95 | 0 | 0.00 | 4,106 | 30.1 | 22.2 | 18.4 | 16.4 | 26% | 26% |
| `UT_FinanceJoke_CRM` | 750628398139 | ENABLED | 62 | 0 | 0.00 | 2,868 | 36.8 | 26.5 | 21.7 | 19.5 | 28% | 26% |
| `AT_Realestate_Short_CRM` | 750605101185 | ENABLED | 49 | 0 | 0.00 | 3,163 | 26.4 | 20.4 | 15.5 | 13.7 | 23% | 33% |
| `PD_TheFastWay_Short_CRM` | 753056275887 | ENABLED | 32 | 10 | 0.31 | 1,333 | 35.1 | 26.2 | 22.1 | 18.8 | 25% | 28% |
| `PD_TheFastWay_Long_CRM` | 753056275890 | ENABLED | 21 | 0 | 0.00 | 1,348 | 28.6 | 20.2 | 16.7 | 14.7 | 29% | 28% |

**Ads in `Marketing_Sales_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750713681933 | ENABLED | 480 | 0 | 0.00 | 11,017 | 15.8 | 9.8 | 7.3 | 5.7 | 38% | 41% |
| `CR_President_ShortNo_CRM` | 750605060127 | PAUSED | 170 | 0 | 0.00 | 3,579 | 18.3 | 11.0 | 8.3 | 6.5 | 40% | 41% |
| `CR_President_Long_CRM` | 750713815109 | PAUSED | 164 | 0 | 0.00 | 3,000 | 12.1 | 8.0 | 6.7 | 5.6 | 34% | 29% |
| `PD_AIPodcast_Short_CRM` | 750713836517 | ENABLED | 125 | 0 | 0.00 | 4,815 | 16.4 | 9.3 | 7.9 | 6.2 | 43% | 33% |
| `DL_Nightmare_Long_CRM` | 765080211805 | ENABLED | 115 | 0 | 0.00 | 2,261 | 14.9 | 9.7 | 7.6 | 6.1 | 35% | 37% |
| `AT_TheMillionaire_Wow_CRM` | 774439714234 | ENABLED | 98 | 0 | 0.00 | 1,961 | 25.6 | 13.2 | 8.5 | 5.5 | 49% | 58% |
| `PD_TheFastWay_Short_CRM` | 753056275899 | ENABLED | 85 | 0 | 0.00 | 1,720 | 18.0 | 12.8 | 10.3 | 8.6 | 29% | 33% |
| `CR_Intervention_WeNeed_CRM` | 774422560941 | ENABLED | 73 | 0 | 0.00 | 1,431 | 19.0 | 11.8 | 9.3 | 7.2 | 38% | 39% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750628308460 | PAUSED | 62 | 0 | 0.00 | 1,128 | 23.3 | 15.4 | 12.1 | 10.5 | 34% | 32% |
| `CR_President_Short_CRM` | 750713796692 | PAUSED | 61 | 0 | 0.00 | 1,620 | 17.5 | 10.3 | 8.7 | 6.6 | 41% | 36% |
| `DL_Stayinglateagain_CRM` | 774462736489 | ENABLED | 60 | 0 | 0.00 | 1,618 | 18.4 | 12.9 | 9.1 | 6.4 | 30% | 50% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714237 | ENABLED | 58 | 0 | 0.00 | 1,055 | 22.4 | 9.7 | 6.4 | 4.2 | 57% | 56% |
| `AT_Podcast_HateCRM_CRM` | 774551147190 | ENABLED | 43 | 0 | 0.00 | 843 | 19.1 | 11.8 | 9.1 | 6.7 | 38% | 43% |
| `PD_WomanPink_Face_CRM` | 750628503028 | PAUSED | 36 | 0 | 0.00 | 995 | 19.4 | 12.7 | 10.5 | 8.6 | 34% | 33% |
| `DL_Switchto_CRM` | 774462736492 | ENABLED | 36 | 0 | 0.00 | 1,180 | 11.4 | 6.4 | 4.5 | 2.3 | 44% | 64% |
| `PD_WomanPink_Platform_CRM` | 750628527100 | PAUSED | 31 | 0 | 0.00 | 647 | 14.1 | 9.1 | 7.2 | 6.4 | 35% | 30% |
| `PD_3Reasons_Team_CRM` | 750605225994 | PAUSED | 29 | 0 | 0.00 | 830 | 15.7 | 9.7 | 8.4 | 7.1 | 38% | 26% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131355 | ENABLED | 28 | 10 | 0.36 | 670 | 22.4 | 13.4 | 8.4 | 8.1 | 40% | 40% |
| `CR_Intervention_Launch_CRM` | 774422978334 | ENABLED | 28 | 0 | 0.00 | 587 | 11.0 | 8.1 | 6.0 | 3.7 | 27% | 54% |
| `AT_WomanUS_Team_CRM` | 750602966349 | PAUSED | 23 | 0 | 0.00 | 1,600 | 9.5 | 5.7 | 4.7 | 3.6 | 41% | 37% |
| `AT_Realestate_Short_CRM` | 750628423666 | PAUSED | 21 | 0 | 0.00 | 643 | 16.8 | 13.2 | 11.8 | 10.3 | 21% | 22% |
| `CRMQuickWinDemoPerson` | 750713681030 | PAUSED | 20 | 0 | 0.00 | 519 | 23.8 | 16.7 | 13.2 | 11.4 | 30% | 32% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750713814389 | PAUSED | 19 | 0 | 0.00 | 683 | 16.2 | 10.7 | 8.6 | 7.4 | 34% | 31% |
| `DL_Nightmare_Short_CRM` | 765080146459 | ENABLED | 17 | 0 | 0.00 | 582 | 15.0 | 8.9 | 7.3 | 5.7 | 40% | 37% |
| `PD_TheFastWay_Long_CRM` | 753056275902 | ENABLED | 16 | 0 | 0.00 | 556 | 11.9 | 9.0 | 8.3 | 7.0 | 24% | 23% |
| `CR_Enthusiast_StopIt_CRM` | 774423802029 | ENABLED | 15 | 0 | 0.00 | 479 | 21.5 | 14.7 | 4.9 | 3.6 | 32% | 76% |
| `PD_POV_Dashboard_CRM` | 750713828126 | PAUSED | 14 | 0 | 0.00 | 734 | 56.9 | 23.4 | 16.9 | 11.2 | 59% | 52% |
| `AT_Car_Bestadvice_CRM` | 774399548358 | ENABLED | 12 | 0 | 0.00 | 229 | 27.9 | 16.5 | 11.1 | 8.6 | 41% | 48% |

**Ads in `CRM_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750713765405 | ENABLED | 125 | 0 | 0.00 | 4,145 | 19.7 | 12.9 | 10.6 | 8.1 | 35% | 37% |
| `PD_AIPodcast_Short_CRM` | 750713918564 | ENABLED | 76 | 0 | 0.00 | 2,397 | 49.4 | 28.6 | 27.1 | 20.7 | 42% | 28% |
| `AT_TheMillionaire_Excuseme_CRM` | 774439714249 | ENABLED | 64 | 0 | 0.00 | 897 | 26.2 | 13.9 | 10.8 | 8.1 | 47% | 41% |
| `DL_Switchto_CRM` | 774462736504 | ENABLED | 62 | 0 | 0.00 | 2,006 | 18.9 | 13.1 | 10.7 | 7.4 | 31% | 44% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131361 | ENABLED | 57 | 0 | 0.00 | 1,134 | 13.3 | 7.2 | 7.2 | 7.2 | 46% | 0% |
| `AT_Podcast_HateCRM_CRM` | 774551147196 | ENABLED | 49 | 0 | 0.00 | 1,228 | 16.7 | 10.5 | 10.5 | 8.1 | 37% | 23% |
| `CR_President_ShortNo_CRM` | 750628512673 | PAUSED | 49 | 0 | 0.00 | 579 | 22.8 | 12.9 | 10.6 | 8.8 | 43% | 32% |
| `DL_Stayinglateagain_CRM` | 774462736501 | ENABLED | 45 | 0 | 0.00 | 1,316 | 17.3 | 12.8 | 10.1 | 7.9 | 26% | 38% |
| `CR_Intervention_WeNeed_CRM` | 774422560947 | ENABLED | 41 | 0 | 0.00 | 836 | 15.6 | 11.0 | 9.0 | 5.9 | 30% | 46% |
| `CR_President_Short_CRM` | 750628384288 | PAUSED | 41 | 0 | 0.00 | 805 | 21.3 | 16.6 | 11.6 | 10.4 | 22% | 37% |
| `CR_President_Long_CRM` | 750605186571 | PAUSED | 37 | 0 | 0.00 | 698 | 13.8 | 9.3 | 8.0 | 5.2 | 33% | 44% |
| `AT_TheMillionaire_Wow_CRM` | 774439714246 | ENABLED | 35 | 0 | 0.00 | 823 | 25.7 | 14.3 | 10.0 | 7.1 | 44% | 51% |
| `PD_TheFastWay_Short_CRM` | 753056275917 | ENABLED | 35 | 0 | 0.00 | 464 | 21.6 | 16.4 | 14.9 | 13.2 | 24% | 19% |
| `DL_Nightmare_Long_CRM` | 765080211811 | ENABLED | 34 | 11 | 0.31 | 577 | 16.9 | 11.7 | 9.0 | 6.5 | 31% | 45% |
| `AT_Car_Bestadvice_CRM` | 774399548370 | ENABLED | 29 | 0 | 0.00 | 364 | 32.1 | 18.1 | 16.5 | 10.0 | 44% | 45% |
| `CR_Intervention_Launch_CRM` | 774422978340 | ENABLED | 26 | 0 | 0.00 | 535 | 21.5 | 14.3 | 14.3 | 8.7 | 34% | 39% |
| `PD_TheFastWay_Long_CRM` | 753056276040 | ENABLED | 25 | 0 | 0.00 | 559 | 7.5 | 4.7 | 4.4 | 1.9 | 37% | 59% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750605099022 | PAUSED | 23 | 0 | 0.00 | 266 | 27.9 | 19.8 | 14.1 | 11.1 | 29% | 44% |
| `AT_WomanUS_Team_CRM` | 750605222529 | PAUSED | 22 | 0 | 0.00 | 521 | 43.1 | 39.5 | 39.5 | 21.2 | 8% | 46% |
| `PD_POV_Dashboard_CRM` | 750628383334 | PAUSED | 22 | 0 | 0.00 | 590 | 87.8 | 37.2 | 35.4 | 32.4 | 58% | 13% |
| `CR_Enthusiast_StopIt_CRM` | 774423802035 | ENABLED | 22 | 0 | 0.00 | 321 | 14.0 | 4.2 | 3.1 | 2.1 | 70% | 50% |
| `PD_WomanPink_Face_CRM` | 750628339912 | PAUSED | 22 | 0 | 0.00 | 281 | 35.9 | 27.7 | 27.7 | 5.5 | 23% | 80% |
| `PD_3Reasons_Team_CRM` | 750713768138 | PAUSED | 21 | 0 | 0.00 | 324 | 30.1 | 26.2 | 24.7 | 21.3 | 13% | 19% |
| `AT_Car_Tip_CRM` | 774399548373 | ENABLED | 14 | 0 | 0.00 | 125 | 12.0 | 12.0 | 4.4 | 4.4 | 0% | 63% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750628523977 | PAUSED | 14 | 0 | 0.00 | 148 | 18.5 | 15.5 | 14.5 | 14.5 | 16% | 6% |
| `AT_Podcast_BeHonest_CRM` | 774679698452 | ENABLED | 13 | 0 | 0.00 | 383 | 60.7 | 0.0 | 0.0 | 0.0 | 100% | 0% |
| `PD_WomanPink_Platform_CRM` | 750628445236 | PAUSED | 13 | 0 | 0.00 | 80 | 26.8 | 12.6 | 10.4 | 6.7 | 53% | 47% |
| `DL_Nightmare_Short_CRM` | 765080146465 | ENABLED | 12 | 0 | 0.00 | 207 | 32.7 | 22.1 | 18.8 | 15.5 | 33% | 30% |
| `UT_FinanceJoke_CRM` | 750713930084 | PAUSED | 10 | 0 | 0.00 | 130 | 25.9 | 4.6 | 4.6 | 4.6 | 82% | 0% |

**Ads in `CompetitorsCRMV2_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750716688395 | PAUSED | 12 | 0 | 0.00 | 362 | 27.1 | 14.4 | 12.1 | 10.3 | 47% | 29% |
| `CR_President_ShortNo_CRM` | 750716688383 | ENABLED | 11 | 0 | 0.00 | 190 | 35.4 | 20.4 | 16.6 | 14.4 | 42% | 30% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 169,099 | 4,285 | 0.03 | 6,708,558 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 35,759 | 862 | 0.02 |
| geoTargetConstants/1007850 | 7,208 | 171 | 0.02 |
| geoTargetConstants/1006524 | 3,576 | 110 | 0.03 |
| geoTargetConstants/1006912 | 2,412 | 34 | 0.01 |
| geoTargetConstants/1006864 | 1,463 | 30 | 0.02 |
| geoTargetConstants/1007336 | 1,461 | 160 | 0.11 |
| geoTargetConstants/1006567 | 1,399 | 20 | 0.01 |
| geoTargetConstants/1006656 | 1,363 | 10 | 0.01 |
| geoTargetConstants/1007326 | 1,130 | 30 | 0.03 |
| geoTargetConstants/9197981 | 1,068 | 40 | 0.04 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007043 | 829 | 0 | 0.00 |
| geoTargetConstants/1007210 | 642 | 0 | 0.00 |
| geoTargetConstants/9198013 | 606 | 0 | 0.00 |
| geoTargetConstants/1006668 | 554 | 0 | 0.00 |
| geoTargetConstants/1006897 | 533 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-crm-desktop-ron-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £167,583 | **DEP:** 4,526 | **DEP/Spend:** 0.03
- **Impressions:** 24,441,087 | **Clicks:** 26,861 | **Conversions:** 453
- **All Conversions Value:** 647,691 | **All Conversions:** 107,904
- **Active Months:** 5 (2025-05-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 50,970 | 1,047 | 0.02 | 8,950,314 | 9,917 | 105 |
| 2025-06-01 | 57,137 | 1,351 | 0.02 | 6,820,104 | 6,518 | 135 |
| 2025-07-01 | 29,776 | 911 | 0.03 | 5,336,712 | 6,023 | 91 |
| 2025-08-01 | 26,614 | 1,128 | 0.04 | 3,019,773 | 3,870 | 113 |
| 2025-09-01 | 3,086 | 90 | 0.03 | 314,184 | 533 | 9 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | ENABLED | 167,583 | 4,526 | 0.03 | 24,441,087 | 29.3 | 19.5 | 16.0 | 13.9 | 33% | 29% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 750293458258 | PAUSED | 60,971 | 1,660 | 0.03 | 8,626,786 | 24.3 | 16.1 | 12.6 | 10.4 | 34% | 35% |
| `PD_AIPodcast_Short_CRM` | 750293458249 | PAUSED | 21,862 | 628 | 0.03 | 3,283,950 | 32.1 | 21.4 | 18.0 | 15.8 | 33% | 26% |
| `CR_President_Long_CRM` | 750293458267 | PAUSED | 17,691 | 473 | 0.03 | 2,231,999 | 20.3 | 13.7 | 10.8 | 9.3 | 32% | 32% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 750293458240 | PAUSED | 13,092 | 307 | 0.02 | 2,010,461 | 33.5 | 23.0 | 19.3 | 17.1 | 31% | 26% |
| `CR_President_ShortNo_CRM` | 750293458228 | PAUSED | 12,196 | 338 | 0.03 | 1,845,375 | 31.9 | 20.3 | 16.7 | 14.6 | 36% | 28% |
| `PD_3Reasons_Team_CRM` | 750293458243 | PAUSED | 5,817 | 110 | 0.02 | 845,880 | 27.2 | 19.3 | 15.9 | 13.5 | 29% | 30% |
| `CR_President_Short_CRM` | 750293458255 | PAUSED | 5,362 | 110 | 0.02 | 745,432 | 31.4 | 20.4 | 17.0 | 15.0 | 35% | 26% |
| `DL_Nightmare_Long_CRM` | 765080211820 | ENABLED | 5,156 | 175 | 0.03 | 486,951 | 22.4 | 16.0 | 13.1 | 11.0 | 29% | 31% |
| `AT_WomanUS_TimeIsMoney_CRM` | 750293458231 | PAUSED | 4,942 | 178 | 0.04 | 789,011 | 36.7 | 26.8 | 23.3 | 21.2 | 27% | 21% |
| `PD_POV_Dashboard_CRM` | 750293458246 | PAUSED | 3,719 | 61 | 0.02 | 1,066,306 | 91.8 | 40.1 | 29.7 | 25.7 | 56% | 36% |
| `AT_WomanUS_Team_CRM` | 750293458234 | PAUSED | 3,693 | 133 | 0.04 | 587,751 | 39.4 | 29.4 | 25.9 | 23.7 | 25% | 20% |
| `PD_Yuval_Formula_CRM` | 750293458252 | PAUSED | 3,343 | 83 | 0.02 | 563,015 | 31.7 | 26.3 | 24.0 | 22.4 | 17% | 15% |
| `PD_WomanPink_Face_CRM` | 750293458237 | PAUSED | 3,279 | 100 | 0.03 | 451,331 | 34.4 | 24.9 | 21.4 | 19.1 | 28% | 23% |
| `PD_WomanPink_Platform_CRM` | 750293458270 | PAUSED | 2,255 | 42 | 0.02 | 372,749 | 42.4 | 33.1 | 29.5 | 27.1 | 22% | 18% |
| `DL_Nightmare_Short_CRM` | 765080146474 | ENABLED | 1,954 | 95 | 0.05 | 199,513 | 31.8 | 20.8 | 17.6 | 15.5 | 35% | 26% |
| `AT_Realestate_Short_CRM` | 750293458261 | PAUSED | 1,169 | 13 | 0.01 | 170,578 | 29.1 | 20.6 | 16.7 | 14.4 | 29% | 30% |
| `UT_FinanceJoke_CRM` | 750293458264 | PAUSED | 1,082 | 20 | 0.02 | 163,914 | 34.6 | 25.8 | 21.7 | 19.0 | 26% | 26% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 167,583 | 4,526 | 0.03 | 24,441,087 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 41,974 | 1,416 | 0.03 |
| geoTargetConstants/1007850 | 7,236 | 210 | 0.03 |
| geoTargetConstants/1006524 | 3,665 | 100 | 0.03 |
| geoTargetConstants/1006912 | 2,325 | 35 | 0.01 |
| geoTargetConstants/1007336 | 1,349 | 20 | 0.01 |
| geoTargetConstants/1006864 | 1,300 | 30 | 0.02 |
| geoTargetConstants/1006656 | 1,272 | 10 | 0.01 |
| geoTargetConstants/1006567 | 1,177 | 40 | 0.03 |
| geoTargetConstants/1007326 | 1,062 | 50 | 0.05 |
| geoTargetConstants/9197981 | 1,049 | 60 | 0.06 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006884 | 1,027 | 0 | 0.00 |
| geoTargetConstants/1007009 | 564 | 0 | 0.00 |
| geoTargetConstants/9225752 | 539 | 0 | 0.00 |
| geoTargetConstants/1006668 | 523 | 0 | 0.00 |
| geoTargetConstants/1006548 | 502 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-service-desktop-competitors-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £144,875 | **DEP:** 607 | **DEP/Spend:** 0.00
- **Impressions:** 15,717,056 | **Clicks:** 13,651 | **Conversions:** 607
- **All Conversions Value:** 401,735 | **All Conversions:** 65,159
- **Active Months:** 5 (2025-05-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 25,902 | 116 | 0.00 | 2,051,787 | 2,065 | 116 |
| 2025-06-01 | 45,666 | 181 | 0.00 | 3,153,306 | 3,076 | 181 |
| 2025-07-01 | 54,375 | 281 | 0.01 | 7,993,809 | 6,485 | 281 |
| 2025-08-01 | 18,396 | 25 | 0.00 | 2,456,597 | 1,968 | 25 |
| 2025-09-01 | 537 | 4 | 0.01 | 61,557 | 57 | 4 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ServiceCompBig_CA-MultiAds` | ENABLED | 142,016 | 597 | 0.00 | 15,630,200 | 38.3 | 29.7 | 25.7 | 23.2 | 23% | 22% |
| `ServiceComp_SQA-MultiAds` | ENABLED | 2,352 | 9 | 0.00 | 72,225 | 37.2 | 28.6 | 24.4 | 21.7 | 23% | 24% |
| `ServiceComp_KW-MultiAds` | ENABLED | 506 | 1 | 0.00 | 14,631 | 22.2 | 14.7 | 12.1 | 10.3 | 34% | 30% |

**Ads in `ServiceCompBig_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 753156123090 | ENABLED | 77,277 | 362 | 0.00 | 9,543,084 | 42.6 | 34.0 | 30.1 | 27.5 | 20% | 19% |
| `PD_Zen_Long_Service` | 753156123087 | ENABLED | 64,739 | 235 | 0.00 | 6,087,116 | 31.6 | 22.9 | 19.0 | 16.4 | 27% | 29% |

**Ads in `ServiceComp_SQA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 753156123078 | ENABLED | 1,341 | 5 | 0.00 | 41,012 | 41.0 | 32.2 | 28.0 | 25.3 | 21% | 22% |
| `PD_Zen_Long_Service` | 753156123075 | ENABLED | 1,011 | 4 | 0.00 | 31,213 | 32.2 | 23.7 | 19.6 | 16.8 | 26% | 29% |

**Ads in `ServiceComp_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Long_Service` | 753156123081 | ENABLED | 264 | 1 | 0.00 | 8,725 | 19.5 | 12.2 | 9.8 | 8.0 | 38% | 34% |
| `PD_Zen_Short_Service` | 753156123084 | ENABLED | 242 | 0 | 0.00 | 5,906 | 26.2 | 18.5 | 15.4 | 13.5 | 29% | 27% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 144,875 | 607 | 0.00 | 15,717,056 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 30,036 | 116 | 0.00 |
| geoTargetConstants/1007850 | 7,054 | 20 | 0.00 |
| geoTargetConstants/1006524 | 2,817 | 15 | 0.01 |
| geoTargetConstants/1006912 | 2,020 | 10 | 0.00 |
| geoTargetConstants/1006567 | 1,292 | 2 | 0.00 |
| geoTargetConstants/1007336 | 1,278 | 3 | 0.00 |
| geoTargetConstants/1006864 | 1,133 | 6 | 0.01 |
| geoTargetConstants/1007326 | 1,102 | 2 | 0.00 |
| geoTargetConstants/1006656 | 982 | 11 | 0.01 |
| geoTargetConstants/1006884 | 915 | 5 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006996 | 347 | 0 | 0.00 |
| geoTargetConstants/1006815 | 266 | 0 | 0.00 |
| geoTargetConstants/9198116 | 252 | 0 | 0.00 |
| geoTargetConstants/1006753 | 231 | 0 | 0.00 |
| geoTargetConstants/1007321 | 218 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-topics-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £125,751 | **DEP:** 728 | **DEP/Spend:** 0.01
- **Impressions:** 3,108,444 | **Clicks:** 8,982 | **Conversions:** 728
- **All Conversions Value:** 785,456 | **All Conversions:** 66,931
- **Active Months:** 12 (2025-06-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-06-01 | 690 | 12 | 0.02 | 11,102 | 61 | 12 |
| 2025-07-01 | 1,926 | 20 | 0.01 | 44,529 | 167 | 20 |
| 2025-08-01 | 1,887 | 14 | 0.01 | 50,222 | 181 | 14 |
| 2025-09-01 | 4,671 | 33 | 0.01 | 91,438 | 252 | 33 |
| 2025-10-01 | 8,559 | 61 | 0.01 | 192,296 | 422 | 61 |
| 2025-11-01 | 7,937 | 44 | 0.01 | 127,958 | 389 | 44 |
| 2025-12-01 | 6,655 | 32 | 0.00 | 111,773 | 301 | 32 |
| 2026-01-01 | 17,608 | 63 | 0.00 | 226,601 | 554 | 63 |
| 2026-02-01 | 7,916 | 55 | 0.01 | 94,759 | 200 | 55 |
| 2026-03-01 | 23,299 | 162 | 0.01 | 914,455 | 2,502 | 162 |
| 2026-04-01 | 35,431 | 186 | 0.01 | 980,622 | 2,882 | 186 |
| 2026-05-01 | 9,169 | 47 | 0.01 | 262,689 | 1,071 | 47 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessProductivitySoftware_T-MultiAds` | ENABLED | 31,769 | 151 | 0.00 | 1,033,926 | 26.6 | 15.8 | 12.3 | 10.1 | 41% | 36% |
| `Mgmt_ProjectManagement_T-MultiAds` | ENABLED | 26,777 | 150 | 0.01 | 349,876 | 29.1 | 16.9 | 13.0 | 10.6 | 42% | 37% |
| `BussP_ProjectManagement_T-MultiAds` | ENABLED | 22,755 | 131 | 0.01 | 260,601 | 29.1 | 16.7 | 12.6 | 10.1 | 43% | 40% |
| `TopWorkManagementSEM_S-MultiAds` | PAUSED | 16,660 | 76 | 0.00 | 708,824 | 36.4 | 24.7 | 20.6 | 18.0 | 32% | 27% |
| `mondayProjectManagement_S-MultiAds` | ENABLED | 15,679 | 132 | 0.01 | 475,782 | 37.8 | 24.9 | 20.5 | 17.7 | 34% | 29% |
| `BussP_Spreadsheet_T-MultiAds` | PAUSED | 5,001 | 31 | 0.01 | 140,460 | 25.3 | 14.8 | 11.5 | 9.5 | 42% | 36% |
| `Management_T-MultiAds` | ENABLED | 4,033 | 29 | 0.01 | 125,145 | 25.0 | 15.0 | 11.6 | 9.5 | 40% | 37% |
| `mondayProjectManagement_KW-MultiAds` | ENABLED | 3,077 | 27 | 0.01 | 13,830 | 31.0 | 18.0 | 13.6 | 10.1 | 42% | 44% |

**Ads in `BusinessProductivitySoftware_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 799175717493 | ENABLED | 7,322 | 44 | 0.01 | 248,361 | 18.7 | 12.2 | 9.6 | 7.6 | 35% | 37% |
| `AT_Reni_AI_V1` | 799175717490 | ENABLED | 5,027 | 24 | 0.00 | 177,570 | 17.8 | 11.4 | 9.0 | 7.1 | 36% | 38% |
| `AT_W_GameOver` | 799175717496 | ENABLED | 4,246 | 24 | 0.01 | 102,272 | 29.6 | 18.2 | 14.9 | 12.8 | 39% | 30% |
| `AT_W_Hear` | 799175717499 | ENABLED | 2,941 | 7 | 0.00 | 76,169 | 23.7 | 14.6 | 11.5 | 9.5 | 38% | 35% |
| `AT_Jay_Say` | 799175717481 | ENABLED | 2,042 | 13 | 0.01 | 44,370 | 25.9 | 15.7 | 12.4 | 10.2 | 40% | 35% |
| `PD_Llama_Angry_Short_NoIntro` | 799175717646 | ENABLED | 1,327 | 8 | 0.01 | 41,517 | 34.8 | 19.8 | 15.3 | 13.0 | 43% | 34% |
| `SH_PMO_Long` | 799175717658 | ENABLED | 1,315 | 4 | 0.00 | 62,988 | 93.2 | 46.7 | 26.6 | 20.7 | 50% | 56% |
| `PD_Llama_Skeleton` | 799175717649 | ENABLED | 1,139 | 1 | 0.00 | 54,288 | 16.0 | 10.5 | 8.2 | 7.0 | 34% | 33% |
| `DL_sidekick_47s` | 799175717517 | ENABLED | 969 | 2 | 0.00 | 34,999 | 27.7 | 18.5 | 15.8 | 13.7 | 33% | 26% |
| `PD_InShort_AI` | 799175717640 | PAUSED | 954 | 3 | 0.00 | 34,746 | 20.4 | 12.4 | 9.5 | 7.0 | 39% | 43% |
| `SH_Operations_Long` | 799175717655 | ENABLED | 893 | 4 | 0.00 | 33,970 | 92.8 | 39.9 | 25.5 | 19.4 | 57% | 51% |
| `DL_Llama_Templates_30s` | 799175717514 | PAUSED | 787 | 2 | 0.00 | 18,592 | 48.2 | 24.1 | 19.4 | 16.8 | 50% | 30% |
| `PD_Llama_Angry_Short` | 799175717643 | PAUSED | 683 | 5 | 0.01 | 31,297 | 30.0 | 18.1 | 14.3 | 11.8 | 40% | 35% |
| `DL_AI_Llama_Short` | 799175717502 | ENABLED | 501 | 0 | 0.00 | 12,870 | 30.4 | 17.3 | 13.6 | 11.3 | 43% | 35% |
| `DL_Llama_AnyType_30s` | 799175717508 | PAUSED | 463 | 6 | 0.01 | 10,886 | 45.8 | 22.5 | 17.4 | 14.6 | 51% | 35% |
| `PD_Manager_WoF` | 799175717652 | PAUSED | 446 | 1 | 0.00 | 25,111 | 21.5 | 14.9 | 12.3 | 10.4 | 31% | 30% |
| `DL_Llama_47s` | 799175717505 | PAUSED | 367 | 2 | 0.01 | 14,734 | 31.3 | 20.9 | 17.8 | 15.8 | 33% | 25% |
| `DL_Llama_Dashboards_30s` | 799175717511 | PAUSED | 337 | 1 | 0.00 | 9,016 | 46.8 | 23.8 | 18.8 | 16.1 | 49% | 32% |

**Ads in `Mgmt_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_InShort_AI` | 759740264526 | PAUSED | 2,278 | 13 | 0.01 | 28,966 | 21.3 | 13.7 | 10.5 | 7.4 | 35% | 46% |
| `PD_Llama_Angry_Short_NoIntro` | 761006543194 | ENABLED | 1,713 | 5 | 0.00 | 27,372 | 33.4 | 18.9 | 14.9 | 12.7 | 44% | 33% |
| `AT_W_GameOver` | 791195435186 | ENABLED | 1,362 | 3 | 0.00 | 17,061 | 27.7 | 16.7 | 13.5 | 11.1 | 40% | 33% |
| `AT_W_Hear` | 791195435189 | ENABLED | 1,254 | 7 | 0.01 | 16,097 | 25.1 | 16.2 | 12.9 | 10.8 | 36% | 33% |
| `DL_sidekick_30s` | 780359151485 | ENABLED | 1,185 | 6 | 0.01 | 10,015 | 48.5 | 21.4 | 15.5 | 13.0 | 56% | 39% |
| `PD_Llama_Skeleton_UK` | 761006543236 | PAUSED | 1,175 | 9 | 0.01 | 19,698 | 18.6 | 12.6 | 10.2 | 8.7 | 32% | 31% |
| `AT_Jay_Say` | 791195435183 | ENABLED | 959 | 8 | 0.01 | 12,502 | 26.2 | 16.5 | 13.5 | 11.2 | 37% | 32% |
| `AT_Jay_Honest` | 791195435180 | ENABLED | 956 | 8 | 0.01 | 12,918 | 29.1 | 17.6 | 14.1 | 11.2 | 39% | 37% |
| `SH_PMO_Long` | 785312753478 | ENABLED | 907 | 7 | 0.01 | 13,136 | 92.9 | 48.3 | 28.7 | 22.2 | 48% | 54% |
| `PD_Llama_Angry` | 761006543197 | PAUSED | 904 | 8 | 0.01 | 18,796 | 16.2 | 11.1 | 8.2 | 7.4 | 31% | 33% |
| `PD_Llama_Skeleton` | 761006543191 | ENABLED | 807 | 1 | 0.00 | 14,169 | 17.5 | 11.7 | 9.3 | 7.9 | 33% | 33% |
| `DL_Llama_Long` | 761006543227 | PAUSED | 647 | 0 | 0.00 | 8,953 | 17.3 | 10.8 | 8.5 | 6.7 | 38% | 37% |
| `DL_AI_Llama_Long` | 759740264523 | PAUSED | 607 | 4 | 0.01 | 6,284 | 20.9 | 13.1 | 10.6 | 8.8 | 37% | 33% |
| `AT_Reni_AI_V2` | 798225664261 | ENABLED | 557 | 7 | 0.01 | 12,013 | 22.5 | 16.0 | 13.4 | 11.0 | 29% | 31% |
| `PD_Llama_Angry_Short` | 761006543233 | PAUSED | 545 | 2 | 0.00 | 6,185 | 26.5 | 15.0 | 12.2 | 10.2 | 43% | 32% |
| `DL_sidekick_66s` | 780359151359 | ENABLED | 540 | 3 | 0.01 | 5,375 | 18.4 | 11.0 | 8.6 | 7.0 | 40% | 37% |
| `DL_Llama_Templates_30s` | 761006543230 | PAUSED | 531 | 1 | 0.00 | 4,751 | 48.2 | 24.2 | 19.8 | 16.9 | 50% | 30% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543239 | PAUSED | 525 | 1 | 0.00 | 5,196 | 35.3 | 20.8 | 15.8 | 13.3 | 41% | 36% |
| `DL_sidekick_47s` | 780359151482 | ENABLED | 500 | 2 | 0.01 | 6,935 | 27.2 | 17.0 | 14.3 | 12.9 | 38% | 24% |
| `DL_Llama_AnyType_30s` | 761006543221 | PAUSED | 493 | 3 | 0.01 | 4,232 | 48.3 | 24.0 | 19.5 | 16.3 | 50% | 32% |
| `DL_Llama_47s` | 761006543215 | PAUSED | 488 | 4 | 0.01 | 5,078 | 28.1 | 17.7 | 14.8 | 12.7 | 37% | 28% |
| `DL_Llama_Dashboards_30s` | 761006543224 | PAUSED | 476 | 2 | 0.00 | 4,675 | 47.2 | 23.3 | 18.0 | 15.1 | 51% | 35% |
| `AT_Reni_AI_V1` | 798225664258 | ENABLED | 465 | 2 | 0.00 | 8,605 | 20.3 | 13.6 | 11.1 | 8.8 | 33% | 35% |
| `PD_Manager_Celebration` | 791195435192 | PAUSED | 440 | 1 | 0.00 | 3,565 | 19.6 | 13.2 | 10.6 | 8.3 | 33% | 37% |
| `PD_AI_Eduardo` | 759740264397 | ENABLED | 396 | 3 | 0.01 | 6,625 | 25.4 | 14.9 | 11.5 | 9.6 | 41% | 36% |
| `CR_Confidence_Women_UK` | 759740264352 | PAUSED | 396 | 2 | 0.01 | 4,918 | 32.9 | 19.2 | 13.7 | 10.9 | 41% | 44% |
| `AT_Llama_short` | 761006543212 | PAUSED | 374 | 4 | 0.01 | 4,096 | 21.9 | 13.4 | 10.6 | 9.0 | 39% | 33% |
| `AT_Llama_30s` | 761006543200 | PAUSED | 365 | 5 | 0.01 | 2,577 | 48.0 | 21.3 | 14.9 | 12.1 | 56% | 43% |
| `SH_Finance_Long` | 785312753484 | ENABLED | 360 | 4 | 0.01 | 3,347 | 91.2 | 43.8 | 26.3 | 21.2 | 52% | 52% |
| `SH_Operations_Long` | 785312753475 | ENABLED | 321 | 1 | 0.00 | 2,977 | 93.1 | 39.7 | 25.6 | 18.9 | 57% | 52% |
| `CR_Confidence_Men_UK` | 759740264379 | PAUSED | 313 | 3 | 0.01 | 3,530 | 33.5 | 17.4 | 12.5 | 9.6 | 48% | 45% |
| `AT_NYwoman_NotKnowing` | 759740264373 | PAUSED | 306 | 2 | 0.00 | 5,408 | 29.0 | 17.0 | 12.7 | 10.4 | 41% | 39% |
| `DL_Llama_Angry_Long` | 761006543218 | PAUSED | 303 | 1 | 0.00 | 4,194 | 19.0 | 13.2 | 10.5 | 9.0 | 31% | 32% |
| `SH_Leadership_Long` | 785312753481 | ENABLED | 294 | 1 | 0.00 | 2,111 | 92.4 | 36.1 | 19.5 | 15.3 | 61% | 57% |
| `SH_Marketing_Long` | 785312753472 | ENABLED | 269 | 2 | 0.01 | 2,114 | 91.5 | 46.4 | 28.4 | 21.8 | 49% | 53% |
| `AT_Llama_long-alt` | 761006543209 | PAUSED | 264 | 1 | 0.00 | 2,886 | 17.6 | 10.9 | 8.3 | 6.5 | 38% | 40% |
| `PD_Manager_WoF` | 791195435195 | PAUSED | 255 | 1 | 0.00 | 2,832 | 23.1 | 16.6 | 13.0 | 10.4 | 28% | 37% |
| `AT_Llama_30s-alt` | 761006543203 | PAUSED | 254 | 0 | 0.00 | 1,996 | 47.0 | 22.4 | 15.8 | 13.3 | 52% | 41% |
| `DL_AI_Llama_Short` | 759740264520 | ENABLED | 248 | 2 | 0.01 | 2,159 | 31.2 | 17.4 | 14.6 | 12.3 | 44% | 29% |
| `PD_AI_Llama` | 759740264394 | PAUSED | 221 | 1 | 0.00 | 2,485 | 35.9 | 22.2 | 16.7 | 13.3 | 38% | 40% |
| `AT_Llama_long` | 761006543206 | PAUSED | 214 | 0 | 0.00 | 2,776 | 23.0 | 13.6 | 10.6 | 8.7 | 41% | 36% |
| `AT_NYwoman_Short` | 759740264391 | PAUSED | 196 | 2 | 0.01 | 2,901 | 36.7 | 19.1 | 14.4 | 12.4 | 48% | 35% |
| `PD_TikToker_HackM` | 759740264355 | PAUSED | 183 | 1 | 0.01 | 2,314 | 26.7 | 15.8 | 13.0 | 9.3 | 41% | 41% |
| `AT_NYwoman_Manager` | 759740264382 | PAUSED | 165 | 1 | 0.01 | 2,902 | 25.8 | 15.5 | 12.3 | 10.4 | 40% | 33% |
| `PD_WorkOS_21sec` | 759740264367 | PAUSED | 162 | 1 | 0.01 | 3,165 | 94.3 | 26.1 | 16.4 | 10.9 | 72% | 58% |
| `PD_TikToker_GoodNewsM` | 759740264361 | PAUSED | 139 | 0 | 0.00 | 2,134 | 30.8 | 18.0 | 14.0 | 9.5 | 42% | 47% |
| `PD_TikToker_HackW` | 759740264376 | PAUSED | 119 | 1 | 0.01 | 2,359 | 32.0 | 20.5 | 17.9 | 12.8 | 36% | 38% |
| `PD_Linear_Actress` | 759740264388 | PAUSED | 116 | 1 | 0.01 | 1,707 | 20.1 | 11.1 | 7.6 | 6.0 | 45% | 46% |
| `PD_Linear_Group` | 759740264364 | PAUSED | 102 | 1 | 0.01 | 1,306 | 23.2 | 13.8 | 11.4 | 10.0 | 41% | 27% |
| `PD_Reports_woman` | 759740264358 | PAUSED | 82 | 0 | 0.00 | 940 | 29.5 | 17.3 | 14.5 | 10.3 | 41% | 40% |
| `UT_Frank_Mix` | 759740264370 | PAUSED | 48 | 1 | 0.02 | 540 | 41.4 | 26.7 | 19.2 | 15.6 | 36% | 41% |

**Ads in `BussP_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Angry_Short_NoIntro` | 761006542750 | ENABLED | 1,943 | 10 | 0.01 | 23,107 | 34.7 | 21.0 | 16.6 | 14.0 | 39% | 33% |
| `AT_W_GameOver` | 791195434751 | ENABLED | 1,491 | 10 | 0.01 | 16,390 | 28.4 | 16.7 | 13.3 | 11.1 | 41% | 34% |
| `PD_InShort_AI` | 759740264058 | PAUSED | 1,429 | 8 | 0.01 | 14,417 | 22.1 | 13.8 | 10.4 | 7.0 | 38% | 49% |
| `AT_W_Hear` | 791195434754 | ENABLED | 1,063 | 4 | 0.00 | 10,865 | 24.6 | 14.8 | 11.3 | 9.1 | 40% | 39% |
| `DL_sidekick_30s` | 780359151338 | ENABLED | 1,009 | 3 | 0.00 | 6,592 | 47.1 | 19.3 | 14.1 | 11.7 | 59% | 39% |
| `AT_Jay_Honest` | 791195434745 | ENABLED | 1,000 | 8 | 0.01 | 10,541 | 28.2 | 16.8 | 13.3 | 10.6 | 40% | 37% |
| `AT_Jay_Say` | 791195434748 | ENABLED | 898 | 4 | 0.00 | 7,371 | 24.9 | 14.8 | 11.2 | 8.7 | 41% | 41% |
| `SH_PMO_Long` | 785312753418 | ENABLED | 875 | 6 | 0.01 | 9,177 | 93.5 | 45.9 | 26.2 | 19.3 | 51% | 58% |
| `PD_Llama_Skeleton` | 761006542747 | ENABLED | 871 | 8 | 0.01 | 16,301 | 17.2 | 12.1 | 8.6 | 7.5 | 30% | 38% |
| `PD_Llama_Angry` | 761006542753 | PAUSED | 680 | 12 | 0.02 | 10,702 | 17.0 | 11.9 | 8.9 | 7.1 | 30% | 40% |
| `DL_Llama_Long` | 761006542783 | PAUSED | 670 | 3 | 0.00 | 8,880 | 18.1 | 11.1 | 8.9 | 7.1 | 38% | 37% |
| `PD_Llama_Skeleton_UK` | 761006542792 | PAUSED | 657 | 2 | 0.00 | 8,178 | 17.0 | 11.0 | 8.8 | 7.3 | 35% | 34% |
| `AT_Reni_AI_V2` | 798225664237 | ENABLED | 608 | 7 | 0.01 | 10,566 | 18.9 | 12.8 | 10.2 | 7.7 | 33% | 40% |
| `AT_Reni_AI_V1` | 798225664234 | ENABLED | 593 | 4 | 0.01 | 9,148 | 18.1 | 11.7 | 9.4 | 7.3 | 35% | 38% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006542795 | PAUSED | 539 | 2 | 0.00 | 4,809 | 33.0 | 18.0 | 13.5 | 11.0 | 46% | 39% |
| `DL_sidekick_47s` | 780359151335 | ENABLED | 486 | 1 | 0.00 | 7,064 | 25.4 | 17.1 | 13.9 | 11.7 | 33% | 32% |
| `DL_AI_Llama_Long` | 759740264055 | PAUSED | 482 | 0 | 0.00 | 5,139 | 21.8 | 14.4 | 12.3 | 9.9 | 34% | 31% |
| `PD_Llama_Angry_Short` | 761006542789 | PAUSED | 480 | 5 | 0.01 | 5,777 | 29.0 | 16.2 | 12.8 | 10.6 | 44% | 34% |
| `DL_Llama_47s` | 761006542771 | PAUSED | 458 | 4 | 0.01 | 4,548 | 29.7 | 18.0 | 15.4 | 13.4 | 39% | 25% |
| `DL_Llama_Templates_30s` | 761006542786 | PAUSED | 451 | 2 | 0.00 | 3,137 | 46.8 | 23.3 | 17.8 | 14.6 | 50% | 37% |
| `SH_Finance_Long` | 785312753424 | ENABLED | 385 | 1 | 0.00 | 4,744 | 92.4 | 49.0 | 23.9 | 18.0 | 47% | 63% |
| `AT_Llama_short` | 761006542768 | PAUSED | 345 | 2 | 0.00 | 3,858 | 21.9 | 13.7 | 11.4 | 9.4 | 38% | 32% |
| `DL_Llama_Dashboards_30s` | 761006542780 | PAUSED | 341 | 1 | 0.00 | 2,916 | 46.4 | 22.9 | 17.1 | 13.5 | 51% | 41% |
| `DL_sidekick_66s` | 780359151332 | ENABLED | 304 | 2 | 0.01 | 2,605 | 16.5 | 10.0 | 8.2 | 6.5 | 39% | 35% |
| `PD_Manager_Celebration` | 791195434757 | PAUSED | 303 | 2 | 0.01 | 2,449 | 16.7 | 10.3 | 7.8 | 5.7 | 38% | 44% |
| `PD_AI_Llama` | 759740264046 | ENABLED | 299 | 2 | 0.01 | 3,503 | 27.1 | 16.9 | 12.1 | 9.1 | 38% | 46% |
| `SH_Marketing_Long` | 785312753412 | ENABLED | 281 | 0 | 0.00 | 3,848 | 93.6 | 47.9 | 29.1 | 20.9 | 49% | 56% |
| `DL_Llama_Angry_Long` | 761006542774 | PAUSED | 271 | 2 | 0.01 | 3,713 | 19.6 | 14.6 | 11.7 | 9.8 | 26% | 32% |
| `CR_Confidence_Women_UK` | 759740263884 | PAUSED | 246 | 2 | 0.01 | 2,762 | 31.7 | 17.6 | 13.2 | 9.9 | 44% | 44% |
| `AT_Llama_30s` | 761006542756 | PAUSED | 242 | 2 | 0.01 | 1,517 | 48.2 | 18.7 | 12.1 | 8.9 | 61% | 52% |
| `PD_AI_Eduardo` | 759740264049 | PAUSED | 222 | 3 | 0.02 | 3,257 | 25.1 | 13.8 | 11.4 | 9.2 | 45% | 33% |
| `DL_Llama_AnyType_30s` | 761006542777 | PAUSED | 212 | 1 | 0.00 | 1,592 | 43.0 | 16.8 | 13.7 | 11.3 | 61% | 33% |
| `SH_Leadership_Long` | 785312753421 | ENABLED | 211 | 0 | 0.00 | 1,948 | 90.6 | 35.8 | 18.7 | 14.1 | 60% | 61% |
| `AT_Llama_30s-alt` | 761006542759 | PAUSED | 195 | 0 | 0.00 | 1,336 | 46.4 | 22.0 | 16.9 | 13.3 | 53% | 40% |
| `CR_Confidence_Men_UK` | 759740263911 | PAUSED | 189 | 0 | 0.00 | 1,474 | 29.5 | 13.2 | 9.0 | 7.0 | 55% | 47% |
| `AT_Llama_long` | 761006542762 | PAUSED | 174 | 1 | 0.01 | 2,170 | 20.9 | 11.9 | 9.3 | 7.3 | 43% | 39% |
| `SH_Operations_Long` | 785312753415 | ENABLED | 174 | 0 | 0.00 | 1,453 | 93.5 | 48.1 | 33.0 | 23.9 | 49% | 50% |
| `PD_Manager_WoF` | 791195434760 | PAUSED | 167 | 0 | 0.00 | 2,214 | 15.5 | 8.5 | 6.1 | 4.7 | 45% | 44% |
| `AT_NYwoman_NotKnowing` | 759740263905 | PAUSED | 164 | 1 | 0.01 | 1,784 | 30.8 | 15.4 | 10.7 | 9.0 | 50% | 42% |
| `AT_NYwoman_Manager` | 759740263914 | PAUSED | 160 | 1 | 0.01 | 1,103 | 26.2 | 14.2 | 9.4 | 7.3 | 46% | 49% |
| `AT_NYwoman_Short` | 759740264043 | PAUSED | 151 | 0 | 0.00 | 2,728 | 40.6 | 23.5 | 17.4 | 13.9 | 42% | 41% |
| `PD_TikToker_GoodNewsM` | 759740263893 | PAUSED | 146 | 2 | 0.01 | 2,980 | 26.8 | 15.6 | 13.3 | 10.5 | 42% | 33% |
| `PD_TikToker_HackM` | 759740263887 | PAUSED | 145 | 0 | 0.00 | 2,667 | 24.2 | 15.1 | 13.0 | 8.9 | 38% | 41% |
| `AT_Llama_long-alt` | 761006542765 | PAUSED | 142 | 0 | 0.00 | 1,469 | 21.5 | 13.2 | 10.6 | 8.3 | 39% | 37% |
| `PD_WorkOS_21sec` | 759740263899 | PAUSED | 135 | 3 | 0.02 | 2,374 | 92.6 | 36.7 | 24.7 | 20.7 | 60% | 44% |
| `DL_AI_Llama_Short` | 759740264052 | PAUSED | 128 | 1 | 0.01 | 917 | 30.4 | 19.1 | 15.1 | 10.9 | 37% | 43% |
| `PD_TikToker_HackW` | 759740263908 | PAUSED | 104 | 1 | 0.01 | 1,960 | 30.8 | 19.9 | 16.6 | 8.8 | 35% | 56% |
| `PD_Linear_Actress` | 759740264040 | PAUSED | 82 | 0 | 0.00 | 825 | 18.1 | 12.2 | 9.0 | 7.1 | 33% | 42% |
| `PD_Reports_woman` | 759740263890 | PAUSED | 64 | 0 | 0.00 | 715 | 30.3 | 19.8 | 16.5 | 13.2 | 35% | 34% |
| `PD_Linear_Group` | 759740263896 | PAUSED | 57 | 0 | 0.00 | 753 | 18.5 | 12.7 | 11.4 | 8.5 | 31% | 33% |
| `UT_Frank_Mix` | 759740263902 | PAUSED | 29 | 0 | 0.00 | 258 | 28.3 | 8.2 | 6.4 | 3.8 | 71% | 54% |

**Ads in `TopWorkManagementSEM_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 798225664267 | ENABLED | 1,685 | 13 | 0.01 | 60,524 | 24.0 | 16.1 | 12.7 | 10.3 | 33% | 36% |
| `AT_W_Hear` | 792252533406 | ENABLED | 1,403 | 4 | 0.00 | 43,049 | 33.5 | 23.9 | 20.3 | 17.9 | 29% | 25% |
| `AT_W_GameOver` | 792252533418 | ENABLED | 1,381 | 4 | 0.00 | 38,932 | 35.3 | 24.2 | 20.3 | 17.8 | 32% | 26% |
| `AT_Jay_Honest` | 792252533412 | ENABLED | 1,287 | 11 | 0.01 | 39,205 | 33.9 | 22.5 | 18.7 | 16.0 | 34% | 29% |
| `AT_Reni_AI_V1` | 798225664264 | ENABLED | 796 | 3 | 0.00 | 46,561 | 24.1 | 16.2 | 13.0 | 10.5 | 33% | 35% |
| `AT_Jay_Say` | 792252533409 | ENABLED | 731 | 3 | 0.00 | 19,222 | 33.0 | 22.8 | 19.2 | 16.2 | 31% | 29% |
| `DL_sidekick_30s` | 792252533265 | ENABLED | 653 | 0 | 0.00 | 39,264 | 65.9 | 43.6 | 38.8 | 36.2 | 34% | 17% |
| `PD_Llama_Skeleton_UK` | 792252533250 | ENABLED | 636 | 2 | 0.00 | 31,075 | 26.2 | 19.0 | 16.0 | 14.0 | 28% | 26% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 792252533196 | ENABLED | 597 | 2 | 0.00 | 31,539 | 42.5 | 27.5 | 22.7 | 20.1 | 35% | 27% |
| `PD_Llama_Angry_Short_NoIntro` | 792252533232 | ENABLED | 550 | 2 | 0.00 | 21,477 | 55.5 | 42.8 | 38.2 | 35.3 | 23% | 17% |
| `DL_AI_Llama_Long` | 792252533190 | ENABLED | 476 | 5 | 0.01 | 23,054 | 36.4 | 27.8 | 23.9 | 21.4 | 24% | 23% |
| `PD_Llama_Skeleton` | 792252533238 | ENABLED | 433 | 3 | 0.01 | 26,832 | 24.9 | 16.9 | 13.8 | 11.3 | 32% | 33% |
| `DL_Llama_Long` | 792252533220 | PAUSED | 403 | 0 | 0.00 | 20,196 | 28.2 | 19.9 | 16.7 | 13.5 | 30% | 32% |
| `SH_PMO_Long` | 792252533277 | ENABLED | 357 | 1 | 0.00 | 24,536 | 94.7 | 55.3 | 36.7 | 32.8 | 42% | 41% |
| `PD_InShort_AI` | 792252533247 | PAUSED | 355 | 2 | 0.01 | 10,358 | 25.8 | 16.9 | 13.7 | 11.0 | 34% | 35% |
| `SH_Marketing_Long` | 792252533271 | ENABLED | 347 | 2 | 0.01 | 17,074 | 95.1 | 54.2 | 39.6 | 33.7 | 43% | 38% |
| `DL_Llama_Templates_30s` | 792252533223 | PAUSED | 323 | 1 | 0.00 | 25,608 | 64.3 | 42.6 | 37.6 | 34.5 | 34% | 19% |
| `PD_AI_Eduardo` | 792252533214 | ENABLED | 311 | 1 | 0.00 | 20,808 | 36.1 | 24.9 | 21.1 | 18.7 | 31% | 25% |
| `DL_sidekick_47s` | 792252533268 | ENABLED | 284 | 1 | 0.00 | 12,788 | 38.3 | 28.1 | 24.2 | 22.1 | 27% | 21% |
| `DL_Llama_AnyType_30s` | 792252533208 | PAUSED | 273 | 0 | 0.00 | 15,570 | 68.1 | 49.4 | 44.4 | 41.7 | 28% | 16% |
| `PD_Manager_Celebration` | 792252533421 | PAUSED | 265 | 0 | 0.00 | 6,933 | 25.9 | 19.4 | 16.4 | 14.3 | 25% | 26% |
| `PD_Llama_Angry_Short` | 792252533193 | PAUSED | 260 | 1 | 0.00 | 13,444 | 40.0 | 27.8 | 24.3 | 21.7 | 30% | 22% |
| `DL_sidekick_66s` | 792252533262 | ENABLED | 258 | 2 | 0.01 | 11,615 | 27.6 | 18.2 | 15.0 | 13.1 | 34% | 28% |
| `DL_Llama_47s` | 792252533226 | PAUSED | 249 | 2 | 0.01 | 10,037 | 48.8 | 39.6 | 35.9 | 33.9 | 19% | 14% |
| `PD_AI_Llama` | 792252533211 | ENABLED | 247 | 1 | 0.00 | 13,258 | 42.8 | 29.2 | 25.2 | 23.2 | 32% | 20% |
| `PD_Llama_Angry` | 792252533256 | PAUSED | 243 | 0 | 0.00 | 11,044 | 24.8 | 18.3 | 14.4 | 11.9 | 26% | 35% |
| `SH_Leadership_Long` | 792252533400 | ENABLED | 242 | 1 | 0.00 | 14,069 | 96.1 | 55.3 | 42.6 | 38.8 | 43% | 30% |
| `SH_Finance_Long` | 792252533403 | ENABLED | 230 | 2 | 0.01 | 11,553 | 95.1 | 53.6 | 35.9 | 29.7 | 44% | 45% |
| `PD_Manager_WoF` | 792252533415 | PAUSED | 229 | 3 | 0.01 | 9,207 | 28.3 | 19.0 | 15.9 | 13.3 | 33% | 30% |
| `DL_Llama_Angry_Long` | 792252533202 | PAUSED | 208 | 1 | 0.00 | 9,068 | 28.8 | 21.8 | 19.0 | 16.2 | 24% | 25% |
| `DL_Llama_Dashboards_30s` | 792252533235 | PAUSED | 195 | 0 | 0.00 | 7,213 | 62.4 | 43.6 | 38.1 | 35.5 | 30% | 18% |
| `SH_Operations_Long` | 792252533274 | ENABLED | 188 | 2 | 0.01 | 11,905 | 95.1 | 58.9 | 46.9 | 42.7 | 38% | 28% |
| `CR_Confidence_Women_UK` | 792252533199 | PAUSED | 127 | 0 | 0.00 | 3,803 | 41.7 | 28.1 | 24.2 | 21.6 | 33% | 23% |
| `DL_AI_Llama_Short` | 792252533229 | ENABLED | 109 | 1 | 0.01 | 3,195 | 40.2 | 27.1 | 22.7 | 20.3 | 33% | 25% |
| `AT_Llama_short` | 792252533217 | PAUSED | 88 | 0 | 0.00 | 815 | 28.1 | 22.7 | 20.7 | 18.4 | 19% | 19% |
| `CR_Confidence_Men_UK` | 792252533244 | PAUSED | 82 | 0 | 0.00 | 2,353 | 32.9 | 20.1 | 16.1 | 14.7 | 39% | 27% |
| `AT_Llama_30s-alt` | 792252533241 | PAUSED | 45 | 0 | 0.00 | 568 | 56.5 | 32.6 | 25.4 | 24.9 | 42% | 24% |
| `AT_Llama_30s` | 792252533253 | PAUSED | 39 | 0 | 0.00 | 341 | 57.8 | 36.6 | 29.8 | 23.6 | 37% | 36% |
| `AT_Llama_long` | 792252533205 | PAUSED | 36 | 0 | 0.00 | 403 | 26.3 | 17.8 | 11.9 | 10.2 | 32% | 43% |
| `AT_Llama_long-alt` | 792252533259 | PAUSED | 36 | 0 | 0.00 | 328 | 27.8 | 19.2 | 17.2 | 15.2 | 31% | 21% |

**Ads in `mondayProjectManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Angry_Short_NoIntro` | 761006542921 | ENABLED | 866 | 14 | 0.02 | 32,361 | 42.1 | 28.3 | 23.8 | 20.9 | 33% | 26% |
| `AT_W_GameOver` | 791195435168 | ENABLED | 802 | 7 | 0.01 | 13,630 | 31.9 | 21.2 | 17.7 | 15.3 | 34% | 28% |
| `PD_Llama_Skeleton_UK` | 761006542963 | ENABLED | 726 | 8 | 0.01 | 25,702 | 24.0 | 16.7 | 13.7 | 11.7 | 31% | 30% |
| `DL_sidekick_30s` | 780359151356 | ENABLED | 631 | 4 | 0.01 | 17,536 | 52.3 | 28.3 | 23.1 | 20.7 | 46% | 27% |
| `AT_W_Hear` | 791195435171 | ENABLED | 612 | 3 | 0.00 | 10,521 | 28.0 | 19.0 | 15.5 | 12.8 | 32% | 33% |
| `PD_Llama_Skeleton` | 761006542798 | ENABLED | 599 | 4 | 0.01 | 24,920 | 24.1 | 17.2 | 13.8 | 11.7 | 28% | 32% |
| `DL_Llama_Long` | 761006542954 | PAUSED | 574 | 5 | 0.01 | 17,634 | 25.3 | 17.6 | 14.6 | 12.1 | 31% | 31% |
| `AT_Jay_Say` | 791195435165 | ENABLED | 564 | 9 | 0.02 | 8,888 | 30.0 | 19.3 | 15.7 | 12.9 | 36% | 33% |
| `PD_InShort_AI` | 759740264115 | PAUSED | 541 | 4 | 0.01 | 14,313 | 27.3 | 18.7 | 15.2 | 11.9 | 32% | 36% |
| `AT_Jay_Honest` | 791195435162 | ENABLED | 488 | 3 | 0.01 | 7,082 | 31.0 | 20.3 | 16.4 | 13.4 | 35% | 34% |
| `DL_Llama_Templates_30s` | 761006542957 | PAUSED | 474 | 4 | 0.01 | 15,473 | 53.1 | 32.6 | 27.7 | 24.3 | 39% | 25% |
| `DL_Llama_AnyType_30s` | 761006542948 | PAUSED | 441 | 4 | 0.01 | 14,973 | 55.0 | 33.6 | 27.8 | 25.0 | 39% | 25% |
| `PD_Llama_Angry` | 761006542924 | PAUSED | 412 | 2 | 0.01 | 13,759 | 25.1 | 18.4 | 14.1 | 12.0 | 27% | 34% |
| `DL_Llama_47s` | 761006542942 | PAUSED | 410 | 3 | 0.01 | 14,256 | 42.6 | 33.1 | 29.3 | 26.7 | 22% | 19% |
| `DL_Llama_Dashboards_30s` | 761006542951 | PAUSED | 399 | 5 | 0.01 | 16,043 | 54.4 | 34.1 | 29.1 | 26.6 | 37% | 22% |
| `PD_Llama_Angry_Short` | 761006542960 | PAUSED | 385 | 0 | 0.00 | 16,614 | 38.5 | 28.3 | 24.6 | 22.0 | 27% | 22% |
| `SH_PMO_Long` | 785312753433 | ENABLED | 370 | 3 | 0.01 | 11,403 | 93.5 | 45.8 | 28.9 | 21.8 | 51% | 52% |
| `AT_Reni_AI_V2` | 798225664243 | ENABLED | 338 | 4 | 0.01 | 7,169 | 22.2 | 15.0 | 11.5 | 8.1 | 33% | 46% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006542966 | PAUSED | 329 | 1 | 0.00 | 10,206 | 42.0 | 28.6 | 23.9 | 20.9 | 32% | 27% |
| `DL_Llama_Angry_Long` | 761006542945 | PAUSED | 321 | 1 | 0.00 | 11,059 | 30.3 | 22.4 | 18.3 | 15.7 | 26% | 30% |
| `DL_sidekick_66s` | 780359151350 | ENABLED | 300 | 0 | 0.00 | 8,127 | 24.3 | 17.2 | 14.4 | 12.3 | 29% | 29% |
| `AT_Reni_AI_V1` | 798225664240 | ENABLED | 286 | 6 | 0.02 | 6,792 | 23.5 | 16.1 | 13.3 | 9.3 | 32% | 42% |
| `DL_AI_Llama_Long` | 759740264112 | PAUSED | 285 | 1 | 0.00 | 8,041 | 31.4 | 23.1 | 20.0 | 17.4 | 26% | 25% |
| `AT_NYwoman_Short` | 759740264100 | PAUSED | 280 | 3 | 0.01 | 10,618 | 49.1 | 34.2 | 29.5 | 26.9 | 30% | 21% |
| `PD_AI_Llama` | 759740264103 | PAUSED | 275 | 1 | 0.00 | 12,639 | 43.7 | 33.3 | 29.2 | 25.9 | 24% | 22% |
| `DL_sidekick_47s` | 780359151353 | ENABLED | 261 | 2 | 0.01 | 7,008 | 35.4 | 26.1 | 21.6 | 19.3 | 26% | 26% |
| `PD_WorkOS_21sec` | 759740264076 | PAUSED | 239 | 2 | 0.01 | 18,096 | 93.7 | 38.7 | 30.4 | 27.0 | 59% | 30% |
| `AT_NYwoman_NotKnowing` | 759740264082 | PAUSED | 232 | 1 | 0.00 | 10,060 | 40.9 | 29.5 | 25.7 | 23.2 | 28% | 22% |
| `SH_Marketing_Long` | 785312753427 | ENABLED | 221 | 1 | 0.00 | 6,671 | 94.5 | 44.8 | 28.5 | 20.8 | 53% | 54% |
| `CR_Confidence_Men_UK` | 759740264088 | PAUSED | 218 | 1 | 0.00 | 6,460 | 36.5 | 21.6 | 17.4 | 15.1 | 41% | 30% |
| `SH_Finance_Long` | 785312753439 | ENABLED | 210 | 2 | 0.01 | 5,730 | 92.2 | 46.5 | 27.8 | 21.3 | 50% | 54% |
| `AT_Llama_short` | 761006542939 | PAUSED | 201 | 0 | 0.00 | 4,511 | 33.0 | 23.8 | 20.3 | 17.8 | 28% | 25% |
| `CR_Confidence_Women_UK` | 759740264061 | PAUSED | 199 | 2 | 0.01 | 5,156 | 40.2 | 26.6 | 21.5 | 18.7 | 34% | 30% |
| `SH_Leadership_Long` | 785312753436 | ENABLED | 189 | 3 | 0.02 | 4,746 | 93.4 | 37.1 | 24.6 | 19.0 | 60% | 49% |
| `PD_AI_Eduardo` | 759740264106 | PAUSED | 181 | 3 | 0.01 | 8,341 | 40.2 | 30.5 | 26.0 | 24.1 | 24% | 21% |
| `PD_Manager_Celebration` | 791195435174 | PAUSED | 178 | 3 | 0.02 | 3,019 | 22.9 | 14.9 | 12.3 | 9.1 | 35% | 39% |
| `SH_Operations_Long` | 785312753430 | ENABLED | 166 | 0 | 0.00 | 3,570 | 93.8 | 42.7 | 31.9 | 25.9 | 54% | 39% |
| `AT_NYwoman_Manager` | 759740264091 | PAUSED | 162 | 3 | 0.02 | 6,504 | 39.3 | 27.8 | 23.2 | 20.4 | 29% | 27% |
| `AT_Llama_30s` | 761006542927 | PAUSED | 148 | 1 | 0.01 | 3,697 | 53.7 | 32.0 | 26.2 | 23.0 | 40% | 28% |
| `PD_Manager_WoF` | 791195435177 | PAUSED | 143 | 6 | 0.04 | 3,409 | 27.8 | 18.3 | 13.8 | 10.5 | 34% | 43% |
| `PD_TikToker_HackM` | 759740264064 | PAUSED | 135 | 1 | 0.01 | 5,340 | 44.8 | 34.1 | 28.4 | 23.5 | 24% | 31% |
| `AT_Llama_30s-alt` | 761006542930 | PAUSED | 118 | 2 | 0.02 | 2,360 | 51.7 | 32.0 | 27.0 | 24.6 | 38% | 23% |
| `AT_Llama_long-alt` | 761006542936 | PAUSED | 118 | 0 | 0.00 | 2,181 | 28.1 | 18.6 | 15.6 | 13.1 | 34% | 29% |
| `DL_AI_Llama_Short` | 759740264109 | PAUSED | 113 | 1 | 0.01 | 2,967 | 44.4 | 30.2 | 26.1 | 23.1 | 32% | 24% |
| `PD_Reports_woman` | 759740264067 | PAUSED | 105 | 0 | 0.00 | 3,076 | 41.7 | 31.1 | 27.1 | 23.5 | 25% | 24% |
| `PD_TikToker_GoodNewsM` | 759740264070 | PAUSED | 91 | 0 | 0.00 | 3,260 | 42.8 | 30.4 | 26.5 | 23.6 | 29% | 22% |
| `AT_Llama_long` | 761006542933 | PAUSED | 88 | 0 | 0.00 | 1,676 | 29.2 | 17.9 | 14.1 | 11.6 | 39% | 35% |
| `PD_Linear_Actress` | 759740264097 | PAUSED | 74 | 0 | 0.00 | 1,931 | 31.8 | 22.9 | 18.0 | 15.1 | 28% | 34% |
| `PD_Linear_Group` | 759740264073 | PAUSED | 72 | 0 | 0.00 | 2,040 | 32.4 | 25.2 | 19.6 | 17.0 | 22% | 33% |
| `PD_TikToker_HackW` | 759740264085 | PAUSED | 70 | 0 | 0.00 | 2,985 | 51.4 | 38.3 | 34.0 | 30.8 | 26% | 20% |
| `UT_Frank_Mix` | 759740264079 | PAUSED | 42 | 0 | 0.00 | 1,229 | 40.6 | 31.5 | 26.8 | 24.4 | 23% | 22% |

**Ads in `BussP_Spreadsheet_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_GameOver` | 799175717436 | ENABLED | 1,093 | 7 | 0.01 | 21,547 | 28.0 | 16.1 | 13.0 | 11.1 | 42% | 31% |
| `AT_Reni_AI_V2` | 799175717433 | ENABLED | 1,046 | 8 | 0.01 | 36,726 | 17.7 | 11.7 | 9.5 | 7.8 | 34% | 34% |
| `AT_W_Hear` | 799175717439 | ENABLED | 620 | 4 | 0.01 | 12,546 | 22.7 | 13.4 | 10.3 | 8.5 | 41% | 37% |
| `AT_Reni_AI_V1` | 799175717430 | ENABLED | 578 | 4 | 0.01 | 22,467 | 15.7 | 9.9 | 7.4 | 6.0 | 37% | 39% |
| `AT_Jay_Say` | 799175717421 | ENABLED | 418 | 3 | 0.01 | 8,294 | 25.5 | 15.2 | 12.2 | 9.8 | 40% | 36% |
| `PD_Llama_Angry_Short_NoIntro` | 799175717466 | ENABLED | 240 | 0 | 0.00 | 7,631 | 33.6 | 18.0 | 12.7 | 10.4 | 47% | 42% |
| `SH_PMO_Long` | 799175717478 | ENABLED | 178 | 0 | 0.00 | 8,041 | 93.0 | 45.4 | 23.7 | 17.4 | 51% | 62% |
| `DL_Llama_Templates_30s` | 799175717454 | PAUSED | 148 | 2 | 0.01 | 2,913 | 49.9 | 27.4 | 23.3 | 20.5 | 45% | 25% |
| `DL_sidekick_47s` | 799175717457 | ENABLED | 145 | 1 | 0.01 | 4,673 | 27.4 | 17.4 | 15.1 | 13.4 | 36% | 23% |
| `PD_Llama_Skeleton` | 799175717469 | ENABLED | 92 | 1 | 0.01 | 3,239 | 15.1 | 9.1 | 7.0 | 6.0 | 40% | 34% |
| `PD_InShort_AI` | 799175717460 | PAUSED | 85 | 0 | 0.00 | 2,775 | 17.4 | 9.9 | 7.5 | 5.8 | 43% | 42% |
| `SH_Operations_Long` | 799175717475 | ENABLED | 79 | 0 | 0.00 | 1,875 | 94.1 | 38.2 | 22.7 | 16.5 | 59% | 57% |
| `DL_Llama_AnyType_30s` | 799175717448 | PAUSED | 65 | 1 | 0.02 | 1,123 | 43.7 | 20.8 | 16.3 | 14.2 | 52% | 32% |
| `PD_Llama_Angry_Short` | 799175717463 | PAUSED | 63 | 0 | 0.00 | 1,791 | 24.6 | 14.2 | 10.9 | 9.3 | 42% | 34% |
| `DL_AI_Llama_Short` | 799175717442 | ENABLED | 59 | 0 | 0.00 | 1,137 | 24.5 | 10.8 | 8.1 | 6.5 | 56% | 39% |
| `DL_Llama_Dashboards_30s` | 799175717451 | PAUSED | 34 | 0 | 0.00 | 786 | 44.7 | 18.1 | 13.7 | 12.0 | 59% | 34% |
| `PD_Manager_WoF` | 799175717472 | PAUSED | 32 | 0 | 0.00 | 2,147 | 20.2 | 11.0 | 8.8 | 5.7 | 46% | 48% |
| `DL_Llama_47s` | 799175717445 | PAUSED | 27 | 0 | 0.00 | 688 | 29.7 | 17.8 | 15.5 | 13.2 | 40% | 26% |

**Ads in `Management_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 799175642520 | ENABLED | 1,043 | 4 | 0.00 | 30,407 | 17.8 | 11.2 | 8.5 | 6.6 | 37% | 41% |
| `AT_W_GameOver` | 799175642523 | ENABLED | 640 | 3 | 0.00 | 17,239 | 29.7 | 18.4 | 15.1 | 13.0 | 38% | 29% |
| `AT_Reni_AI_V1` | 799175642397 | ENABLED | 577 | 5 | 0.01 | 19,590 | 17.3 | 11.1 | 8.8 | 6.9 | 36% | 37% |
| `AT_W_Hear` | 799175642526 | ENABLED | 484 | 8 | 0.02 | 12,549 | 24.5 | 15.1 | 11.7 | 9.7 | 38% | 36% |
| `AT_Jay_Say` | 799175642388 | ENABLED | 343 | 4 | 0.01 | 7,397 | 25.9 | 15.3 | 12.3 | 9.9 | 41% | 36% |
| `SH_PMO_Long` | 799175717418 | ENABLED | 174 | 1 | 0.01 | 6,406 | 91.6 | 46.9 | 29.9 | 23.7 | 49% | 49% |
| `PD_Llama_Angry_Short_NoIntro` | 799175717406 | ENABLED | 133 | 1 | 0.01 | 5,575 | 32.4 | 18.8 | 14.0 | 12.7 | 42% | 32% |
| `DL_sidekick_47s` | 799175717277 | ENABLED | 110 | 0 | 0.00 | 3,571 | 21.1 | 13.9 | 10.1 | 8.6 | 34% | 38% |
| `PD_Llama_Skeleton` | 799175717409 | ENABLED | 93 | 0 | 0.00 | 6,397 | 16.6 | 11.2 | 8.2 | 6.5 | 32% | 43% |
| `SH_Operations_Long` | 799175717415 | ENABLED | 83 | 1 | 0.01 | 2,719 | 91.5 | 40.3 | 25.9 | 20.2 | 56% | 50% |
| `PD_Manager_WoF` | 799175717412 | PAUSED | 57 | 1 | 0.02 | 2,293 | 18.1 | 11.7 | 9.3 | 7.9 | 35% | 33% |
| `PD_Llama_Angry_Short` | 799175717403 | PAUSED | 53 | 0 | 0.00 | 2,515 | 30.2 | 19.1 | 14.7 | 11.5 | 37% | 40% |
| `PD_InShort_AI` | 799175717400 | PAUSED | 52 | 0 | 0.00 | 1,672 | 18.9 | 11.1 | 8.6 | 6.9 | 41% | 38% |
| `DL_Llama_Templates_30s` | 799175717274 | PAUSED | 48 | 0 | 0.00 | 1,321 | 46.3 | 25.3 | 20.3 | 15.9 | 45% | 37% |
| `DL_Llama_Dashboards_30s` | 799175717271 | PAUSED | 40 | 0 | 0.00 | 2,040 | 44.3 | 24.7 | 18.4 | 15.2 | 44% | 39% |
| `DL_AI_Llama_Short` | 799175717262 | ENABLED | 38 | 1 | 0.03 | 869 | 31.9 | 16.4 | 13.6 | 11.2 | 49% | 32% |
| `DL_Llama_AnyType_30s` | 799175717268 | PAUSED | 35 | 0 | 0.00 | 1,170 | 46.0 | 22.5 | 17.7 | 14.0 | 51% | 38% |
| `DL_Llama_47s` | 799175717265 | PAUSED | 28 | 0 | 0.00 | 1,407 | 23.0 | 13.8 | 12.6 | 10.6 | 40% | 23% |

**Ads in `mondayProjectManagement_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_GameOver` | 791195434733 | ENABLED | 417 | 4 | 0.01 | 2,551 | 29.9 | 16.8 | 13.5 | 9.9 | 44% | 41% |
| `AT_W_Hear` | 791195434736 | ENABLED | 214 | 3 | 0.01 | 1,081 | 24.0 | 14.0 | 11.0 | 8.0 | 42% | 43% |
| `AT_Jay_Say` | 791195434730 | ENABLED | 190 | 5 | 0.03 | 751 | 26.0 | 14.5 | 12.0 | 7.0 | 44% | 52% |
| `AT_Jay_Honest` | 791195434727 | ENABLED | 183 | 0 | 0.00 | 1,005 | 27.2 | 17.1 | 13.6 | 10.4 | 37% | 39% |
| `PD_Llama_Angry_Short_NoIntro` | 761006543023 | ENABLED | 163 | 1 | 0.01 | 706 | 33.7 | 18.8 | 13.9 | 10.8 | 44% | 43% |
| `AT_Reni_AI_V2` | 798225664255 | ENABLED | 130 | 4 | 0.03 | 1,299 | 21.3 | 14.5 | 12.1 | 8.5 | 32% | 41% |
| `DL_sidekick_30s` | 780359151329 | ENABLED | 122 | 0 | 0.00 | 263 | 43.0 | 16.5 | 12.7 | 10.7 | 62% | 35% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006543188 | ENABLED | 115 | 1 | 0.01 | 440 | 36.8 | 22.8 | 16.0 | 14.7 | 38% | 36% |
| `PD_InShort_AI` | 759740264349 | PAUSED | 115 | 2 | 0.02 | 580 | 26.2 | 16.2 | 11.7 | 7.9 | 38% | 51% |
| `SH_PMO_Long` | 785312753463 | ENABLED | 107 | 1 | 0.01 | 216 | 96.6 | 55.3 | 29.8 | 21.5 | 43% | 61% |
| `SH_Marketing_Long` | 785312753457 | ENABLED | 87 | 0 | 0.00 | 158 | 91.6 | 46.0 | 33.0 | 22.2 | 50% | 52% |
| `SH_Finance_Long` | 785312753469 | ENABLED | 81 | 0 | 0.00 | 147 | 93.2 | 43.3 | 25.0 | 18.4 | 54% | 57% |
| `PD_Llama_Angry` | 761006543026 | PAUSED | 69 | 0 | 0.00 | 285 | 21.8 | 10.9 | 8.1 | 6.2 | 50% | 43% |
| `AT_Llama_short` | 761006543161 | PAUSED | 66 | 0 | 0.00 | 429 | 26.1 | 19.2 | 15.3 | 13.7 | 27% | 29% |
| `PD_Llama_Skeleton_UK` | 761006543185 | PAUSED | 65 | 0 | 0.00 | 411 | 22.7 | 15.4 | 12.5 | 11.5 | 32% | 25% |
| `AT_Reni_AI_V1` | 798225664252 | ENABLED | 59 | 0 | 0.01 | 420 | 21.6 | 16.2 | 12.0 | 7.2 | 25% | 56% |
| `DL_AI_Llama_Long` | 759740264346 | ENABLED | 55 | 1 | 0.02 | 258 | 24.4 | 17.0 | 15.3 | 13.0 | 30% | 24% |
| `DL_Llama_Dashboards_30s` | 761006543173 | PAUSED | 48 | 0 | 0.00 | 138 | 45.5 | 27.6 | 22.5 | 19.0 | 39% | 31% |
| `SH_Operations_Long` | 785312753460 | ENABLED | 48 | 0 | 0.00 | 113 | 96.8 | 43.3 | 25.7 | 18.3 | 55% | 58% |
| `DL_Llama_Long` | 761006543176 | PAUSED | 47 | 0 | 0.00 | 163 | 21.9 | 14.5 | 8.6 | 5.3 | 34% | 63% |
| `DL_Llama_Templates_30s` | 761006543179 | PAUSED | 46 | 0 | 0.00 | 129 | 40.9 | 16.4 | 9.3 | 4.8 | 60% | 71% |
| `DL_Llama_47s` | 761006543164 | PAUSED | 45 | 0 | 0.00 | 181 | 33.9 | 21.5 | 14.5 | 12.4 | 37% | 42% |
| `AT_Llama_long-alt` | 761006543038 | PAUSED | 45 | 0 | 0.00 | 191 | 22.7 | 12.1 | 9.1 | 8.5 | 47% | 29% |
| `PD_Llama_Skeleton` | 761006543020 | ENABLED | 41 | 1 | 0.02 | 194 | 17.8 | 12.8 | 9.7 | 7.5 | 28% | 41% |
| `SH_Leadership_Long` | 785312753466 | ENABLED | 39 | 0 | 0.00 | 76 | 95.8 | 43.9 | 24.7 | 14.6 | 54% | 67% |
| `PD_TikToker_HackW` | 759740264319 | PAUSED | 38 | 0 | 0.00 | 155 | 32.9 | 22.6 | 18.3 | 13.1 | 31% | 42% |
| `CR_Confidence_Women_UK` | 759740264295 | PAUSED | 33 | 0 | 0.00 | 90 | 30.9 | 18.2 | 8.3 | 8.3 | 41% | 55% |
| `DL_sidekick_66s` | 780359151323 | ENABLED | 29 | 1 | 0.03 | 90 | 14.4 | 5.7 | 4.6 | 3.5 | 60% | 39% |
| `CR_Confidence_Men_UK` | 759740264322 | PAUSED | 29 | 0 | 0.00 | 79 | 36.7 | 16.7 | 14.1 | 9.8 | 54% | 42% |
| `PD_AI_Llama` | 759740264337 | ENABLED | 28 | 0 | 0.00 | 75 | 23.4 | 13.5 | 11.7 | 8.7 | 43% | 35% |
| `PD_Manager_Celebration` | 791195434739 | PAUSED | 28 | 0 | 0.00 | 90 | 9.3 | 8.1 | 8.1 | 5.5 | 13% | 32% |
| `DL_sidekick_47s` | 780359151326 | ENABLED | 27 | 0 | 0.00 | 106 | 31.1 | 16.7 | 13.8 | 12.2 | 46% | 27% |
| `DL_AI_Llama_Short` | 759740264343 | ENABLED | 24 | 1 | 0.04 | 54 | 37.4 | 20.2 | 13.9 | 9.4 | 46% | 54% |
| `PD_AI_Eduardo` | 759740264340 | ENABLED | 23 | 0 | 0.00 | 69 | 29.8 | 15.6 | 15.6 | 4.3 | 48% | 72% |
| `DL_Llama_Angry_Long` | 761006543167 | PAUSED | 20 | 0 | 0.00 | 54 | 21.3 | 19.0 | 19.0 | 9.2 | 10% | 52% |
| `PD_Manager_WoF` | 791195434742 | PAUSED | 20 | 1 | 0.05 | 58 | 17.9 | 14.3 | 14.3 | 12.5 | 20% | 13% |
| `DL_Llama_AnyType_30s` | 761006543170 | PAUSED | 19 | 0 | 0.00 | 54 | 57.3 | 19.7 | 8.7 | 6.4 | 66% | 67% |
| `AT_Llama_30s-alt` | 761006543032 | PAUSED | 17 | 0 | 0.00 | 45 | 35.9 | 21.1 | 11.0 | 7.8 | 41% | 63% |
| `PD_TikToker_HackM` | 759740264298 | PAUSED | 16 | 0 | 0.00 | 62 | 32.4 | 22.3 | 18.5 | 12.6 | 31% | 44% |
| `AT_NYwoman_Short` | 759740264334 | PAUSED | 15 | 0 | 0.00 | 67 | 46.7 | 28.8 | 22.5 | 19.4 | 38% | 33% |
| `PD_Llama_Angry_Short` | 761006543182 | PAUSED | 15 | 0 | 0.00 | 67 | 23.3 | 15.7 | 11.1 | 11.1 | 33% | 29% |
| `AT_Llama_30s` | 761006543029 | PAUSED | 14 | 0 | 0.00 | 44 | 38.3 | 16.7 | 11.7 | 7.0 | 56% | 58% |
| `AT_NYwoman_Manager` | 759740264325 | PAUSED | 13 | 1 | 0.07 | 63 | 30.3 | 15.2 | 13.4 | 9.7 | 50% | 36% |
| `AT_Llama_long` | 761006543035 | PAUSED | 13 | 0 | 0.00 | 45 | 16.2 | 14.0 | 14.0 | 5.3 | 14% | 62% |
| `PD_TikToker_GoodNewsM` | 759740264304 | PAUSED | 13 | 0 | 0.00 | 43 | 16.8 | 8.5 | 5.7 | 5.7 | 49% | 33% |
| `AT_NYwoman_NotKnowing` | 759740264316 | PAUSED | 11 | 0 | 0.00 | 69 | 31.7 | 16.5 | 12.7 | 12.7 | 48% | 23% |
| `PD_Linear_Actress` | 759740264331 | PAUSED | 10 | 0 | 0.00 | 54 | 19.3 | 10.6 | 8.4 | 4.2 | 45% | 60% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 125,751 | 728 | 0.01 | 3,108,444 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 26,118 | 172 | 0.01 |
| geoTargetConstants/1007850 | 5,198 | 27 | 0.01 |
| geoTargetConstants/1006912 | 2,272 | 17 | 0.01 |
| geoTargetConstants/1006524 | 2,248 | 16 | 0.01 |
| geoTargetConstants/1007336 | 1,202 | 7 | 0.01 |
| geoTargetConstants/1006567 | 1,130 | 3 | 0.00 |
| geoTargetConstants/1006864 | 1,066 | 9 | 0.01 |
| geoTargetConstants/1006656 | 964 | 7 | 0.01 |
| geoTargetConstants/1007326 | 948 | 6 | 0.01 |
| geoTargetConstants/1007064 | 775 | 6 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007043 | 667 | 0 | 0.00 |
| geoTargetConstants/1007089 | 326 | 0 | 0.00 |
| geoTargetConstants/1007864 | 299 | 0 | 0.00 |
| geoTargetConstants/1007880 | 270 | 0 | 0.00 |
| geoTargetConstants/9226434 | 255 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-ron_instream-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £122,877 | **DEP:** 329 | **DEP/Spend:** 0.00
- **Impressions:** 13,587,543 | **Clicks:** 15,510 | **Conversions:** 329
- **All Conversions Value:** 443,694 | **All Conversions:** 64,693
- **Active Months:** 4 (2025-04-01 → 2025-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-04-01 | 23,725 | 80 | 0.00 | 3,292,287 | 2,553 | 80 |
| 2025-05-01 | 33,222 | 85 | 0.00 | 3,272,370 | 4,099 | 85 |
| 2025-06-01 | 59,965 | 146 | 0.00 | 6,116,284 | 7,906 | 146 |
| 2025-07-01 | 5,965 | 18 | 0.00 | 906,602 | 952 | 18 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-InStream` | ENABLED | 122,877 | 329 | 0.00 | 13,587,543 | 43.3 | 31.8 | 27.6 | 24.9 | 27% | 22% |

**Ads in `ExcludingDefault_RON-InStream`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_MakesSense_Short` | 744431892944 | PAUSED | 24,809 | 81 | 0.00 | 2,754,822 | 39.6 | 27.5 | 23.4 | 20.9 | 31% | 24% |
| `PD_Linear_Actress` | 744431892947 | PAUSED | 11,206 | 27 | 0.00 | 1,197,966 | 33.3 | 24.4 | 20.2 | 17.7 | 27% | 28% |
| `PD_InShort_AI` | 754334955334 | PAUSED | 10,750 | 20 | 0.00 | 928,480 | 30.9 | 22.0 | 18.3 | 15.6 | 29% | 29% |
| `CR_Confidence_Women_UK` | 744431892941 | PAUSED | 8,686 | 17 | 0.00 | 1,187,539 | 43.8 | 31.2 | 26.9 | 24.1 | 29% | 23% |
| `PD_AI_Llama` | 745352523494 | ENABLED | 8,064 | 21 | 0.00 | 873,543 | 50.4 | 38.5 | 34.1 | 31.3 | 24% | 19% |
| `PD_Linear_Group` | 744431892950 | PAUSED | 7,895 | 16 | 0.00 | 844,733 | 37.0 | 27.7 | 23.1 | 20.3 | 25% | 27% |
| `AT_NYwoman_Short` | 744431892935 | PAUSED | 6,728 | 26 | 0.00 | 718,422 | 52.7 | 37.4 | 32.7 | 30.0 | 29% | 20% |
| `CR_Confidence_Men_UK` | 744431892938 | PAUSED | 5,946 | 12 | 0.00 | 697,597 | 39.5 | 26.1 | 22.0 | 19.6 | 34% | 25% |
| `AT_NYwoman_NotKnowing` | 744431892932 | PAUSED | 5,437 | 17 | 0.00 | 695,751 | 48.7 | 38.0 | 34.0 | 31.6 | 22% | 17% |
| `AT_NYwoman_Manager` | 744431892929 | PAUSED | 4,744 | 16 | 0.00 | 519,499 | 46.3 | 35.9 | 32.0 | 29.5 | 23% | 18% |
| `PD_Reports_woman` | 744431892953 | PAUSED | 4,094 | 9 | 0.00 | 453,346 | 50.1 | 40.1 | 35.8 | 33.2 | 20% | 17% |
| `DL_AI_Llama_Long` | 751463327439 | ENABLED | 4,052 | 4 | 0.00 | 399,224 | 41.4 | 33.3 | 29.8 | 27.3 | 20% | 18% |
| `PD_TikToker_GoodNewsM` | 744431892956 | PAUSED | 3,654 | 11 | 0.00 | 392,239 | 42.9 | 32.0 | 27.9 | 25.2 | 25% | 21% |
| `DL_AI_Llama_Short` | 751463327442 | ENABLED | 3,219 | 11 | 0.00 | 330,019 | 53.9 | 42.2 | 37.8 | 35.0 | 22% | 17% |
| `PD_AI_Eduardo` | 745352523497 | ENABLED | 2,663 | 8 | 0.00 | 228,107 | 56.3 | 46.1 | 41.8 | 38.8 | 18% | 16% |
| `PD_TikToker_HackM` | 744431892959 | PAUSED | 2,473 | 4 | 0.00 | 264,229 | 50.0 | 38.9 | 34.5 | 31.5 | 22% | 19% |
| `PD_WorkOS_21sec` | 744431893085 | PAUSED | 1,667 | 4 | 0.00 | 184,039 | 94.2 | 54.7 | 47.4 | 43.7 | 42% | 20% |
| `UT_Frank_Mix` | 744431893088 | PAUSED | 1,643 | 9 | 0.01 | 172,683 | 55.8 | 44.2 | 39.7 | 36.6 | 21% | 17% |
| `PD_TikToker_HackW` | 744431893082 | PAUSED | 1,619 | 6 | 0.00 | 173,656 | 55.7 | 44.8 | 40.3 | 37.3 | 20% | 17% |
| `PD_Llama_Skeleton` | 761006542525 | ENABLED | 660 | 0 | 0.00 | 104,180 | 28.1 | 20.2 | 16.4 | 13.8 | 28% | 31% |
| `PD_Llama_Skeleton_UK` | 761006542690 | ENABLED | 504 | 0 | 0.00 | 78,243 | 27.7 | 19.9 | 16.3 | 13.8 | 28% | 31% |
| `DL_Llama_Long` | 761006542681 | PAUSED | 453 | 4 | 0.01 | 66,124 | 29.6 | 21.0 | 17.3 | 14.6 | 29% | 31% |
| `PD_Llama_Angry_Short_NoIntro` | 761006542528 | ENABLED | 443 | 0 | 0.00 | 78,251 | 51.1 | 37.5 | 32.8 | 29.9 | 27% | 20% |
| `PD_Llama_Angry` | 761006542531 | PAUSED | 198 | 0 | 0.00 | 31,498 | 31.4 | 23.4 | 18.9 | 16.2 | 26% | 30% |
| `DL_Llama_Dashboards_30s` | 761006542558 | PAUSED | 197 | 1 | 0.01 | 34,669 | 62.7 | 42.6 | 37.4 | 34.6 | 32% | 19% |
| `PD_Llama_Angry_Short` | 761006542687 | PAUSED | 193 | 0 | 0.00 | 35,892 | 56.9 | 46.9 | 42.9 | 40.1 | 18% | 14% |
| `AT_Llama_short` | 761006542546 | PAUSED | 170 | 1 | 0.01 | 27,883 | 47.0 | 38.5 | 34.7 | 32.0 | 18% | 17% |
| `DL_Llama_Angry_Long` | 761006542552 | PAUSED | 148 | 1 | 0.01 | 20,648 | 34.9 | 27.1 | 23.0 | 19.9 | 22% | 27% |
| `DL_Llama_47s` | 761006542549 | PAUSED | 112 | 1 | 0.01 | 21,303 | 62.9 | 54.1 | 50.2 | 47.1 | 14% | 13% |
| `AT_Llama_long-alt` | 761006542543 | PAUSED | 96 | 0 | 0.00 | 13,162 | 34.0 | 24.8 | 20.4 | 17.7 | 27% | 29% |
| `AT_Llama_long` | 761006542540 | PAUSED | 82 | 0 | 0.00 | 10,266 | 34.3 | 24.7 | 20.4 | 17.8 | 28% | 28% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 761006542693 | ENABLED | 79 | 1 | 0.01 | 15,067 | 59.7 | 48.1 | 43.5 | 40.7 | 19% | 15% |
| `DL_Llama_AnyType_30s` | 761006542555 | PAUSED | 61 | 1 | 0.02 | 11,506 | 69.9 | 52.9 | 48.0 | 45.0 | 24% | 15% |
| `AT_Llama_30s` | 761006542534 | PAUSED | 59 | 2 | 0.04 | 10,080 | 68.4 | 51.5 | 46.6 | 43.5 | 25% | 16% |
| `DL_Llama_Templates_30s` | 761006542684 | PAUSED | 40 | 0 | 0.00 | 7,685 | 73.4 | 57.2 | 52.5 | 49.5 | 22% | 13% |
| `AT_Llama_30s-alt` | 761006542537 | PAUSED | 31 | 0 | 0.00 | 5,192 | 74.6 | 59.3 | 54.0 | 50.7 | 21% | 14% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 122,877 | 329 | 0.00 | 13,587,543 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 27,628 | 60 | 0.00 |
| geoTargetConstants/1007850 | 7,357 | 19 | 0.00 |
| geoTargetConstants/1006524 | 2,630 | 11 | 0.00 |
| geoTargetConstants/1006912 | 1,874 | 6 | 0.00 |
| geoTargetConstants/1007336 | 1,058 | 6 | 0.01 |
| geoTargetConstants/1006864 | 963 | 3 | 0.00 |
| geoTargetConstants/1006567 | 956 | 2 | 0.00 |
| geoTargetConstants/1006656 | 877 | 3 | 0.00 |
| geoTargetConstants/1007326 | 871 | 2 | 0.00 |
| geoTargetConstants/1006884 | 791 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006884 | 791 | 0 | 0.00 |
| geoTargetConstants/1007043 | 541 | 0 | 0.00 |
| geoTargetConstants/1006548 | 366 | 0 | 0.00 |
| geoTargetConstants/1006965 | 352 | 0 | 0.00 |
| geoTargetConstants/9255051 | 338 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-personas-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £98,556 | **DEP:** 592 | **DEP/Spend:** 0.01
- **Impressions:** 6,937,067 | **Clicks:** 10,753 | **Conversions:** 592
- **All Conversions Value:** 457,784 | **All Conversions:** 62,817
- **Active Months:** 5 (2026-01-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-01-01 | 6,338 | 47 | 0.01 | 505,417 | 821 | 47 |
| 2026-02-01 | 47,860 | 289 | 0.01 | 3,004,483 | 5,490 | 289 |
| 2026-03-01 | 35,496 | 216 | 0.01 | 2,921,435 | 3,810 | 216 |
| 2026-04-01 | 7,336 | 34 | 0.00 | 425,997 | 516 | 34 |
| 2026-05-01 | 1,526 | 6 | 0.00 | 79,735 | 116 | 6 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Audience_ProjectManagement_M` | ENABLED | 60,073 | 352 | 0.01 | 4,251,277 | 54.1 | 40.5 | 35.8 | 32.7 | 25% | 19% |
| `Audience_Marketing_M` | PAUSED | 21,841 | 124 | 0.01 | 1,508,261 | 45.3 | 31.0 | 26.5 | 23.4 | 32% | 24% |
| `Contextual_ProjectManagement_M` | ENABLED | 14,007 | 93 | 0.01 | 977,073 | 39.6 | 25.3 | 21.1 | 18.6 | 36% | 27% |
| `Contextual_Marketing_M` | PAUSED | 2,635 | 22 | 0.01 | 200,456 | 40.5 | 26.5 | 22.3 | 19.5 | 35% | 27% |

**Ads in `Audience_ProjectManagement_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Personas_Templates_V1` | 793447714714 | ENABLED | 31,196 | 195 | 0.01 | 2,405,705 | 53.9 | 40.5 | 35.7 | 32.6 | 25% | 20% |
| `PD_Personas_ProjectPlanning` | 793447714720 | ENABLED | 7,192 | 37 | 0.01 | 360,682 | 45.7 | 32.4 | 28.4 | 25.7 | 29% | 21% |
| `PD_Personas_Templates_V2` | 793447714723 | ENABLED | 6,532 | 32 | 0.00 | 487,925 | 53.7 | 43.7 | 39.4 | 36.3 | 19% | 17% |
| `PD_Personas_Tracking_V2` | 798985181739 | ENABLED | 3,756 | 22 | 0.01 | 237,683 | 55.2 | 37.9 | 32.5 | 29.4 | 31% | 22% |
| `PD_Personas_ProjectPlanning_V2` | 798985181736 | ENABLED | 3,416 | 22 | 0.01 | 269,700 | 58.3 | 44.2 | 39.2 | 36.1 | 24% | 18% |
| `PD_Personas_Tracking` | 793447714717 | ENABLED | 3,201 | 20 | 0.01 | 162,881 | 56.9 | 45.2 | 41.1 | 38.0 | 21% | 16% |
| `PD_Personas_Templates_V3` | 798985181733 | ENABLED | 2,528 | 9 | 0.00 | 192,360 | 57.3 | 43.7 | 38.8 | 35.9 | 24% | 18% |
| `PD_Personas_FireFighting` | 798985181730 | ENABLED | 2,253 | 14 | 0.01 | 134,341 | 62.7 | 42.8 | 37.2 | 33.9 | 32% | 21% |

**Ads in `Audience_Marketing_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Personas_ContentCalendar_V1` | 793447714690 | ENABLED | 16,195 | 91 | 0.01 | 1,072,319 | 44.9 | 30.0 | 25.4 | 22.3 | 33% | 26% |
| `PD_Personas_SMCalendar` | 793447714696 | ENABLED | 2,432 | 9 | 0.00 | 181,681 | 47.9 | 35.0 | 30.8 | 27.9 | 27% | 20% |
| `PD_Personas_ContentCalendar_V2` | 793447714699 | ENABLED | 1,743 | 13 | 0.01 | 107,072 | 44.1 | 32.1 | 28.0 | 25.2 | 27% | 21% |
| `PD_Personas_Sidekick` | 793447714693 | ENABLED | 1,471 | 11 | 0.01 | 147,189 | 50.2 | 37.6 | 33.3 | 30.5 | 25% | 19% |

**Ads in `Contextual_ProjectManagement_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Personas_Templates_V1` | 793447714702 | ENABLED | 7,091 | 45 | 0.01 | 540,794 | 39.2 | 25.1 | 20.9 | 18.4 | 36% | 27% |
| `PD_Personas_ProjectPlanning` | 793447714708 | ENABLED | 1,687 | 9 | 0.01 | 108,415 | 32.7 | 19.1 | 15.8 | 13.6 | 42% | 29% |
| `PD_Personas_Templates_V2` | 793447714711 | ENABLED | 1,526 | 9 | 0.01 | 86,774 | 35.3 | 25.4 | 21.9 | 19.5 | 28% | 23% |
| `PD_Personas_Tracking_V2` | 798985181727 | ENABLED | 1,033 | 10 | 0.01 | 73,862 | 44.0 | 25.3 | 20.4 | 17.4 | 42% | 31% |
| `PD_Personas_Tracking` | 793447714705 | ENABLED | 763 | 8 | 0.01 | 45,666 | 41.9 | 30.0 | 26.3 | 23.6 | 28% | 21% |
| `PD_Personas_ProjectPlanning_V2` | 798985181724 | ENABLED | 666 | 3 | 0.00 | 55,269 | 43.5 | 28.2 | 23.9 | 21.2 | 35% | 25% |
| `PD_Personas_Templates_V3` | 798984869886 | ENABLED | 660 | 1 | 0.00 | 33,934 | 43.4 | 29.0 | 24.5 | 22.1 | 33% | 24% |
| `PD_Personas_FireFighting` | 798984869883 | ENABLED | 580 | 8 | 0.01 | 32,359 | 53.0 | 30.9 | 25.6 | 22.5 | 42% | 27% |

**Ads in `Contextual_Marketing_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Personas_ContentCalendar_V1` | 793447714558 | ENABLED | 2,006 | 17 | 0.01 | 150,758 | 40.2 | 25.9 | 21.6 | 18.8 | 36% | 28% |
| `PD_Personas_SMCalendar` | 793447714684 | ENABLED | 274 | 1 | 0.00 | 23,090 | 42.1 | 28.8 | 25.0 | 22.3 | 32% | 23% |
| `PD_Personas_ContentCalendar_V2` | 793447714687 | ENABLED | 180 | 3 | 0.02 | 12,892 | 40.9 | 28.9 | 24.9 | 22.1 | 29% | 24% |
| `PD_Personas_Sidekick` | 793447714681 | ENABLED | 175 | 1 | 0.01 | 13,716 | 42.1 | 29.8 | 25.8 | 23.2 | 29% | 22% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 98,556 | 592 | 0.01 | 6,937,067 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 19,070 | 97 | 0.01 |
| geoTargetConstants/1007850 | 3,857 | 19 | 0.00 |
| geoTargetConstants/1006524 | 2,025 | 9 | 0.00 |
| geoTargetConstants/1006912 | 1,630 | 10 | 0.01 |
| geoTargetConstants/1007336 | 1,017 | 8 | 0.01 |
| geoTargetConstants/1006656 | 928 | 3 | 0.00 |
| geoTargetConstants/1006864 | 865 | 4 | 0.00 |
| geoTargetConstants/1006567 | 839 | 6 | 0.01 |
| geoTargetConstants/1007326 | 790 | 9 | 0.01 |
| geoTargetConstants/1006884 | 707 | 8 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007274 | 339 | 0 | 0.00 |
| geoTargetConstants/1006668 | 285 | 0 | 0.00 |
| geoTargetConstants/1006984 | 278 | 0 | 0.00 |
| geoTargetConstants/1007864 | 207 | 0 | 0.00 |
| geoTargetConstants/9072509 | 199 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-service-desktop-trgt-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £93,193 | **DEP:** 220 | **DEP/Spend:** 0.00
- **Impressions:** 5,260,805 | **Clicks:** 6,377 | **Conversions:** 220
- **All Conversions Value:** 162,073 | **All Conversions:** 25,948
- **Active Months:** 5 (2025-05-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 39,859 | 115 | 0.00 | 2,544,852 | 3,156 | 115 |
| 2025-06-01 | 35,676 | 63 | 0.00 | 1,648,569 | 1,990 | 63 |
| 2025-07-01 | 13,953 | 38 | 0.00 | 792,444 | 994 | 38 |
| 2025-08-01 | 2,945 | 0 | 0.00 | 222,975 | 192 | 0 |
| 2025-09-01 | 759 | 4 | 0.01 | 51,965 | 45 | 4 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `HelpDeskCS_IM-MultiAds` | ENABLED | 64,819 | 149 | 0.00 | 4,414,976 | 33.4 | 25.1 | 21.5 | 19.2 | 25% | 24% |
| `MultiService_KW-MultiAds` | ENABLED | 23,677 | 46 | 0.00 | 701,261 | 27.7 | 19.9 | 16.8 | 14.7 | 28% | 26% |
| `MultiService_SQA-MultiAds` | ENABLED | 4,244 | 25 | 0.01 | 125,138 | 35.2 | 26.5 | 22.5 | 19.9 | 25% | 25% |
| `ServiceOther_Tax-MultiAds` | ENABLED | 237 | 0 | 0.00 | 7,361 | 30.2 | 22.2 | 18.9 | 16.1 | 26% | 28% |
| `IndustryManufacturing_EM-MultiAds` | ENABLED | 126 | 1 | 0.01 | 8,645 | 46.7 | 38.5 | 34.1 | 31.4 | 17% | 18% |
| `HelpDeskCS_T-MultiAds` | ENABLED | 65 | 0 | 0.00 | 2,457 | 19.8 | 14.3 | 11.0 | 8.6 | 28% | 40% |
| `ServiceComp_SQA-MultiAds` | ENABLED | 25 | 0 | 0.00 | 928 | 42.4 | 36.1 | 31.1 | 27.7 | 15% | 23% |
| `TechSupp_T-MultiAds` | ENABLED | 1 | 0 | 0.00 | 38 | 23.7 | 18.4 | 15.8 | 15.8 | 22% | 14% |
| `ServiceComp_KW-MultiAds` | ENABLED | 0 | 0 | 0.00 | 1 | 0.0 | 0.0 | 0.0 | 0.0 | 0% | 0% |

**Ads in `HelpDeskCS_IM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Long_Service` | 751052152927 | ENABLED | 35,382 | 82 | 0.00 | 2,269,286 | 27.4 | 19.3 | 15.8 | 13.5 | 30% | 30% |
| `PD_Zen_Short_Service` | 751052152930 | ENABLED | 29,437 | 67 | 0.00 | 2,145,690 | 39.8 | 31.2 | 27.5 | 25.1 | 22% | 19% |

**Ads in `MultiService_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Long_Service` | 751052152951 | ENABLED | 14,697 | 24 | 0.00 | 420,155 | 22.9 | 15.5 | 12.4 | 10.4 | 32% | 32% |
| `PD_Zen_Short_Service` | 751052152954 | ENABLED | 8,980 | 22 | 0.00 | 281,106 | 34.7 | 26.5 | 23.1 | 20.9 | 24% | 21% |

**Ads in `MultiService_SQA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 751052152798 | ENABLED | 2,180 | 13 | 0.01 | 68,834 | 39.9 | 30.9 | 26.8 | 24.0 | 23% | 22% |
| `PD_Zen_Long_Service` | 751052152795 | ENABLED | 2,064 | 12 | 0.01 | 56,304 | 29.8 | 21.5 | 17.6 | 15.1 | 28% | 30% |

**Ads in `ServiceOther_Tax-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Long_Service` | 751052152921 | ENABLED | 126 | 0 | 0.00 | 3,806 | 26.2 | 18.7 | 15.4 | 12.6 | 29% | 33% |
| `PD_Zen_Short_Service` | 751052152924 | ENABLED | 111 | 0 | 0.00 | 3,555 | 34.4 | 26.0 | 22.7 | 19.8 | 24% | 24% |

**Ads in `IndustryManufacturing_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 751052152942 | ENABLED | 89 | 0 | 0.00 | 6,475 | 48.7 | 40.8 | 36.7 | 34.1 | 16% | 16% |
| `PD_Zen_Long_Service` | 751052152939 | ENABLED | 36 | 1 | 0.03 | 2,170 | 40.5 | 31.8 | 26.2 | 23.2 | 21% | 27% |

**Ads in `HelpDeskCS_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Long_Service` | 751052152945 | ENABLED | 40 | 0 | 0.00 | 1,644 | 17.9 | 14.0 | 10.5 | 7.6 | 22% | 46% |
| `PD_Zen_Short_Service` | 751052152948 | ENABLED | 25 | 0 | 0.00 | 813 | 24.4 | 16.7 | 13.1 | 11.7 | 31% | 30% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 93,193 | 220 | 0.00 | 5,260,805 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 18,776 | 46 | 0.00 |
| geoTargetConstants/1007850 | 4,329 | 8 | 0.00 |
| geoTargetConstants/1006524 | 1,970 | 2 | 0.00 |
| geoTargetConstants/1006912 | 1,507 | 2 | 0.00 |
| geoTargetConstants/1007336 | 839 | 3 | 0.00 |
| geoTargetConstants/1006567 | 792 | 2 | 0.00 |
| geoTargetConstants/1006864 | 787 | 2 | 0.00 |
| geoTargetConstants/1006656 | 752 | 3 | 0.00 |
| geoTargetConstants/1007326 | 650 | 2 | 0.00 |
| geoTargetConstants/1006884 | 607 | 3 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9197981 | 538 | 0 | 0.00 |
| geoTargetConstants/9198013 | 304 | 0 | 0.00 |
| geoTargetConstants/1007274 | 296 | 0 | 0.00 |
| geoTargetConstants/1007121 | 290 | 0 | 0.00 |
| geoTargetConstants/1007210 | 289 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-crm-desktop-competitors-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £78,937 | **DEP:** 1,340 | **DEP/Spend:** 0.02
- **Impressions:** 4,315,550 | **Clicks:** 6,291 | **Conversions:** 134
- **All Conversions Value:** 181,497 | **All Conversions:** 27,070
- **Active Months:** 5 (2025-05-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 19,097 | 200 | 0.01 | 766,264 | 1,045 | 20 |
| 2025-06-01 | 30,296 | 490 | 0.02 | 1,826,398 | 2,579 | 49 |
| 2025-07-01 | 10,906 | 250 | 0.02 | 695,650 | 1,080 | 25 |
| 2025-08-01 | 16,989 | 390 | 0.02 | 944,138 | 1,469 | 39 |
| 2025-09-01 | 1,649 | 10 | 0.01 | 83,100 | 118 | 1 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CompCRMZoho_KW-MultiAds` | ENABLED | 36,232 | 555 | 0.02 | 1,814,717 | 20.8 | 12.1 | 9.3 | 7.7 | 42% | 37% |
| `CompCRMPipedrive_S-MultiAds` | ENABLED | 16,507 | 410 | 0.02 | 1,420,324 | 30.4 | 20.1 | 16.5 | 14.2 | 34% | 29% |
| `CompCRMHubpsot_S-MultiAds` | ENABLED | 11,225 | 175 | 0.02 | 455,698 | 31.2 | 21.2 | 17.5 | 15.1 | 32% | 29% |
| `CompCRMSalesforce_S-MultiAds` | ENABLED | 5,944 | 50 | 0.01 | 344,330 | 28.3 | 18.6 | 15.1 | 12.9 | 34% | 31% |
| `CompCRMZoho_S-MultiAds` | ENABLED | 4,414 | 70 | 0.02 | 133,035 | 33.2 | 22.8 | 18.8 | 16.3 | 31% | 28% |
| `CompCRMHubspot_KW-MultiAds` | ENABLED | 2,442 | 40 | 0.02 | 67,398 | 22.4 | 12.6 | 9.6 | 7.6 | 44% | 40% |
| `CompCRMPipedrive_KW-MultiAds` | ENABLED | 1,138 | 20 | 0.02 | 38,538 | 25.2 | 15.6 | 12.4 | 10.4 | 38% | 33% |
| `CompCRMSalesforce_KW-MultiAds` | ENABLED | 1,035 | 20 | 0.02 | 41,510 | 19.8 | 10.9 | 8.1 | 6.4 | 45% | 41% |

**Ads in `CompCRMZoho_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625539083 | PAUSED | 9,622 | 163 | 0.02 | 445,116 | 17.9 | 10.7 | 8.1 | 6.4 | 40% | 40% |
| `CR_President_Long_CRM` | 753625539056 | PAUSED | 3,879 | 60 | 0.02 | 186,816 | 12.4 | 8.1 | 6.4 | 5.3 | 34% | 35% |
| `PD_TheFastWay_Short_CRM` | 753625539098 | ENABLED | 3,717 | 75 | 0.02 | 186,058 | 22.2 | 13.5 | 10.5 | 8.7 | 39% | 35% |
| `PD_AIPodcast_Short_CRM` | 753625539074 | PAUSED | 3,390 | 63 | 0.02 | 176,722 | 24.0 | 13.8 | 10.7 | 8.7 | 43% | 37% |
| `CR_President_ShortNo_CRM` | 753625539092 | ENABLED | 3,221 | 40 | 0.01 | 157,348 | 24.9 | 13.9 | 10.6 | 8.3 | 44% | 40% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625539053 | PAUSED | 1,894 | 20 | 0.01 | 101,630 | 23.4 | 13.3 | 10.2 | 8.5 | 43% | 36% |
| `PD_Yuval_Formula_CRM` | 753625539077 | PAUSED | 1,859 | 20 | 0.01 | 105,437 | 18.9 | 12.2 | 10.0 | 8.7 | 35% | 29% |
| `CR_President_Short_CRM` | 753625539065 | ENABLED | 1,548 | 13 | 0.01 | 77,481 | 23.9 | 13.2 | 10.3 | 8.3 | 45% | 37% |
| `DL_Nightmare_Long_CRM` | 765080211994 | ENABLED | 1,032 | 10 | 0.01 | 44,940 | 16.6 | 11.1 | 8.7 | 7.0 | 33% | 37% |
| `PD_3Reasons_Team_CRM` | 753625539071 | ENABLED | 1,019 | 20 | 0.02 | 56,208 | 16.6 | 10.5 | 8.2 | 6.9 | 37% | 34% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625539095 | ENABLED | 977 | 30 | 0.03 | 55,984 | 23.4 | 13.6 | 10.8 | 9.1 | 42% | 33% |
| `PD_TheFastWay_Long_CRM` | 753625539101 | ENABLED | 865 | 10 | 0.01 | 40,973 | 17.7 | 10.9 | 8.4 | 6.9 | 39% | 36% |
| `AT_WomanUS_Team_CRM` | 753625539059 | ENABLED | 687 | 10 | 0.01 | 40,558 | 23.2 | 13.4 | 10.8 | 9.1 | 42% | 32% |
| `PD_WomanPink_Face_CRM` | 753625539062 | ENABLED | 559 | 0 | 0.00 | 29,563 | 22.2 | 12.9 | 10.0 | 8.4 | 42% | 36% |
| `CRMQuickWinDemoPerson` | 753625539089 | PAUSED | 413 | 0 | 0.00 | 27,139 | 20.5 | 12.7 | 9.9 | 8.5 | 38% | 33% |
| `PD_POV_Dashboard_CRM` | 753625539050 | ENABLED | 394 | 20 | 0.05 | 21,400 | 88.9 | 29.6 | 18.8 | 14.6 | 67% | 51% |
| `AT_Realestate_Short_CRM` | 753625539080 | ENABLED | 340 | 0 | 0.00 | 17,332 | 17.8 | 10.8 | 8.4 | 7.1 | 39% | 34% |
| `DL_Nightmare_Short_CRM` | 765080146528 | ENABLED | 309 | 0 | 0.00 | 15,071 | 24.8 | 13.6 | 10.8 | 8.9 | 45% | 34% |
| `PD_WomanPink_Platform_CRM` | 753625539086 | PAUSED | 280 | 0 | 0.00 | 14,236 | 22.3 | 12.8 | 9.9 | 8.1 | 42% | 37% |
| `UT_FinanceJoke_CRM` | 753625539068 | ENABLED | 227 | 0 | 0.00 | 14,705 | 17.7 | 11.7 | 9.5 | 8.3 | 34% | 30% |

**Ads in `CompCRMPipedrive_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625538801 | PAUSED | 3,832 | 150 | 0.04 | 260,805 | 25.5 | 17.4 | 13.7 | 11.3 | 32% | 35% |
| `PD_AIPodcast_Short_CRM` | 753625538792 | PAUSED | 2,394 | 60 | 0.03 | 195,339 | 31.0 | 20.5 | 17.0 | 14.6 | 34% | 28% |
| `CR_President_ShortNo_CRM` | 753625538810 | ENABLED | 1,317 | 10 | 0.01 | 120,489 | 31.0 | 20.2 | 16.7 | 14.6 | 35% | 28% |
| `PD_POV_Dashboard_CRM` | 753625538768 | ENABLED | 1,260 | 50 | 0.04 | 190,494 | 86.8 | 35.1 | 24.8 | 20.4 | 60% | 42% |
| `PD_TheFastWay_Short_CRM` | 753625538816 | ENABLED | 1,011 | 20 | 0.02 | 63,366 | 32.8 | 23.9 | 20.4 | 18.2 | 27% | 24% |
| `CR_President_Long_CRM` | 753625538774 | PAUSED | 994 | 0 | 0.00 | 70,788 | 22.3 | 15.2 | 12.0 | 10.4 | 32% | 32% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625538771 | PAUSED | 772 | 10 | 0.01 | 58,358 | 34.3 | 24.0 | 20.3 | 18.2 | 30% | 24% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625538813 | ENABLED | 560 | 0 | 0.00 | 45,616 | 33.7 | 24.1 | 20.6 | 18.4 | 29% | 24% |
| `PD_WomanPink_Face_CRM` | 753625538780 | ENABLED | 546 | 10 | 0.02 | 55,077 | 30.7 | 21.9 | 18.4 | 16.2 | 29% | 26% |
| `DL_Nightmare_Long_CRM` | 765080211985 | ENABLED | 545 | 30 | 0.06 | 32,703 | 26.3 | 19.3 | 15.9 | 13.5 | 27% | 30% |
| `CR_President_Short_CRM` | 753625538783 | ENABLED | 503 | 0 | 0.00 | 39,670 | 30.3 | 20.4 | 17.0 | 14.9 | 33% | 27% |
| `PD_3Reasons_Team_CRM` | 753625538789 | ENABLED | 475 | 30 | 0.06 | 44,881 | 27.8 | 20.3 | 16.5 | 14.3 | 27% | 30% |
| `PD_Yuval_Formula_CRM` | 753625538795 | PAUSED | 431 | 10 | 0.02 | 41,210 | 17.5 | 13.8 | 12.3 | 11.3 | 21% | 18% |
| `PD_TheFastWay_Long_CRM` | 753625538819 | ENABLED | 376 | 10 | 0.03 | 57,586 | 27.5 | 20.3 | 16.5 | 14.2 | 26% | 30% |
| `AT_WomanUS_Team_CRM` | 753625538777 | ENABLED | 363 | 0 | 0.00 | 46,416 | 23.2 | 17.2 | 15.1 | 13.4 | 26% | 22% |
| `DL_Nightmare_Short_CRM` | 765080146519 | ENABLED | 282 | 5 | 0.02 | 18,439 | 32.0 | 22.1 | 18.7 | 16.4 | 31% | 26% |
| `CRMQuickWinDemoPerson` | 753625538807 | PAUSED | 274 | 10 | 0.04 | 23,606 | 32.9 | 25.0 | 21.6 | 19.6 | 24% | 22% |
| `PD_WomanPink_Platform_CRM` | 753625538804 | PAUSED | 266 | 0 | 0.00 | 26,581 | 27.9 | 20.3 | 17.3 | 15.3 | 27% | 25% |
| `AT_Realestate_Short_CRM` | 753625538798 | ENABLED | 172 | 5 | 0.03 | 15,365 | 27.3 | 19.7 | 15.9 | 14.0 | 28% | 29% |
| `UT_FinanceJoke_CRM` | 753625538786 | ENABLED | 135 | 0 | 0.00 | 13,535 | 32.0 | 24.1 | 20.4 | 17.7 | 25% | 27% |

**Ads in `CompCRMHubpsot_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625539029 | PAUSED | 2,028 | 35 | 0.02 | 67,838 | 25.5 | 17.2 | 13.5 | 11.0 | 33% | 36% |
| `PD_TheFastWay_Short_CRM` | 753625539044 | ENABLED | 1,312 | 30 | 0.02 | 33,853 | 33.8 | 24.3 | 20.4 | 17.9 | 28% | 26% |
| `PD_AIPodcast_Short_CRM` | 753625539020 | PAUSED | 969 | 0 | 0.00 | 46,842 | 31.9 | 22.0 | 18.5 | 16.0 | 31% | 27% |
| `CR_President_ShortNo_CRM` | 753625539038 | ENABLED | 965 | 20 | 0.02 | 42,166 | 31.8 | 20.7 | 17.3 | 15.1 | 35% | 27% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625538879 | PAUSED | 897 | 30 | 0.03 | 25,382 | 34.7 | 24.4 | 20.4 | 17.9 | 29% | 27% |
| `CR_President_Long_CRM` | 753625539002 | PAUSED | 782 | 10 | 0.01 | 25,080 | 20.5 | 13.6 | 10.7 | 9.1 | 34% | 33% |
| `PD_POV_Dashboard_CRM` | 753625538876 | ENABLED | 592 | 0 | 0.00 | 54,431 | 89.6 | 37.9 | 28.1 | 23.6 | 58% | 38% |
| `CR_President_Short_CRM` | 753625539011 | ENABLED | 527 | 10 | 0.02 | 17,670 | 30.8 | 20.2 | 16.8 | 14.7 | 34% | 27% |
| `PD_TheFastWay_Long_CRM` | 753625539047 | ENABLED | 456 | 0 | 0.00 | 28,706 | 31.0 | 22.6 | 18.3 | 15.9 | 27% | 29% |
| `PD_Yuval_Formula_CRM` | 753625539023 | PAUSED | 389 | 0 | 0.00 | 16,163 | 22.1 | 17.2 | 14.9 | 13.3 | 22% | 23% |
| `PD_WomanPink_Face_CRM` | 753625539008 | ENABLED | 339 | 0 | 0.00 | 15,261 | 33.6 | 24.6 | 20.8 | 18.3 | 27% | 26% |
| `DL_Nightmare_Long_CRM` | 765080211991 | ENABLED | 333 | 20 | 0.06 | 9,565 | 28.1 | 20.8 | 17.2 | 14.7 | 26% | 30% |
| `CRMQuickWinDemoPerson` | 753625539035 | PAUSED | 278 | 0 | 0.00 | 11,357 | 33.7 | 24.6 | 21.2 | 18.9 | 27% | 23% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625539041 | ENABLED | 264 | 0 | 0.00 | 11,430 | 35.3 | 25.3 | 21.9 | 19.5 | 28% | 23% |
| `PD_3Reasons_Team_CRM` | 753625539017 | ENABLED | 257 | 0 | 0.00 | 10,654 | 29.8 | 21.4 | 17.4 | 14.6 | 28% | 32% |
| `AT_WomanUS_Team_CRM` | 753625539005 | ENABLED | 254 | 10 | 0.04 | 13,255 | 31.2 | 23.1 | 20.1 | 18.1 | 26% | 22% |
| `PD_WomanPink_Platform_CRM` | 753625539032 | PAUSED | 187 | 0 | 0.00 | 8,896 | 30.2 | 21.7 | 18.2 | 16.5 | 28% | 24% |
| `DL_Nightmare_Short_CRM` | 765080146525 | ENABLED | 175 | 10 | 0.06 | 5,654 | 36.3 | 25.0 | 21.6 | 19.0 | 31% | 24% |
| `AT_Realestate_Short_CRM` | 753625539026 | ENABLED | 132 | 0 | 0.00 | 5,891 | 26.2 | 19.5 | 16.2 | 14.4 | 25% | 26% |
| `UT_FinanceJoke_CRM` | 753625539014 | ENABLED | 88 | 0 | 0.00 | 5,604 | 33.2 | 23.7 | 20.1 | 17.6 | 29% | 26% |

**Ads in `CompCRMSalesforce_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625538855 | PAUSED | 1,043 | 10 | 0.01 | 47,672 | 24.4 | 16.3 | 12.8 | 10.3 | 33% | 37% |
| `CR_President_ShortNo_CRM` | 753625538864 | ENABLED | 681 | 10 | 0.01 | 32,555 | 28.5 | 18.2 | 14.3 | 12.1 | 36% | 33% |
| `PD_TheFastWay_Short_CRM` | 753625538870 | ENABLED | 598 | 0 | 0.00 | 21,825 | 30.1 | 21.1 | 17.4 | 15.1 | 30% | 28% |
| `PD_AIPodcast_Short_CRM` | 753625538846 | PAUSED | 547 | 10 | 0.02 | 36,834 | 28.4 | 18.5 | 15.3 | 13.1 | 35% | 29% |
| `CR_President_Long_CRM` | 753625538828 | PAUSED | 459 | 0 | 0.00 | 21,378 | 18.7 | 12.4 | 9.4 | 8.1 | 34% | 35% |
| `PD_POV_Dashboard_CRM` | 753625538822 | ENABLED | 408 | 10 | 0.02 | 50,887 | 88.1 | 33.1 | 23.1 | 19.2 | 62% | 42% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625538825 | PAUSED | 334 | 0 | 0.00 | 13,694 | 32.8 | 22.6 | 18.6 | 16.2 | 31% | 28% |
| `PD_TheFastWay_Long_CRM` | 753625538873 | ENABLED | 266 | 10 | 0.04 | 26,646 | 27.5 | 20.3 | 16.1 | 13.5 | 26% | 33% |
| `CR_President_Short_CRM` | 753625538837 | ENABLED | 250 | 0 | 0.00 | 12,255 | 28.9 | 18.1 | 14.8 | 12.9 | 38% | 29% |
| `PD_Yuval_Formula_CRM` | 753625538849 | PAUSED | 186 | 0 | 0.00 | 10,526 | 17.2 | 13.3 | 11.6 | 10.5 | 23% | 20% |
| `DL_Nightmare_Long_CRM` | 765080211988 | ENABLED | 174 | 0 | 0.00 | 7,252 | 26.0 | 18.5 | 15.2 | 12.3 | 29% | 33% |
| `PD_WomanPink_Face_CRM` | 753625538834 | ENABLED | 163 | 0 | 0.00 | 9,997 | 29.3 | 20.4 | 17.2 | 15.1 | 31% | 26% |
| `PD_3Reasons_Team_CRM` | 753625538843 | ENABLED | 148 | 0 | 0.00 | 8,325 | 26.2 | 19.3 | 15.9 | 13.5 | 26% | 30% |
| `AT_WomanUS_Team_CRM` | 753625538831 | ENABLED | 135 | 0 | 0.00 | 10,187 | 27.4 | 19.6 | 16.8 | 15.1 | 28% | 23% |
| `CRMQuickWinDemoPerson` | 753625538861 | PAUSED | 135 | 0 | 0.00 | 7,371 | 29.8 | 21.6 | 18.1 | 16.0 | 27% | 26% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625538867 | ENABLED | 130 | 0 | 0.00 | 7,307 | 31.2 | 21.8 | 18.5 | 16.0 | 30% | 27% |
| `PD_WomanPink_Platform_CRM` | 753625538858 | PAUSED | 93 | 0 | 0.00 | 5,335 | 27.7 | 20.0 | 16.6 | 14.5 | 28% | 27% |
| `DL_Nightmare_Short_CRM` | 765080146522 | ENABLED | 76 | 0 | 0.00 | 3,887 | 34.4 | 23.7 | 19.7 | 17.1 | 31% | 28% |
| `AT_Realestate_Short_CRM` | 753625538852 | ENABLED | 64 | 0 | 0.00 | 3,817 | 24.4 | 17.4 | 14.2 | 12.2 | 29% | 30% |
| `UT_FinanceJoke_CRM` | 753625538840 | ENABLED | 52 | 0 | 0.00 | 6,580 | 33.2 | 23.8 | 19.2 | 16.7 | 28% | 30% |

**Ads in `CompCRMZoho_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625538627 | PAUSED | 947 | 30 | 0.03 | 27,019 | 26.8 | 18.3 | 14.3 | 11.8 | 32% | 36% |
| `PD_TheFastWay_Short_CRM` | 753625538762 | ENABLED | 445 | 10 | 0.02 | 11,330 | 34.5 | 25.3 | 21.4 | 19.1 | 27% | 25% |
| `PD_AIPodcast_Short_CRM` | 753625538618 | PAUSED | 429 | 10 | 0.02 | 14,871 | 34.5 | 23.5 | 20.0 | 17.3 | 32% | 27% |
| `CR_President_Long_CRM` | 753625538600 | PAUSED | 413 | 0 | 0.00 | 12,093 | 22.3 | 15.2 | 11.9 | 10.3 | 32% | 32% |
| `CR_President_ShortNo_CRM` | 753625538636 | ENABLED | 367 | 0 | 0.00 | 11,159 | 35.1 | 24.0 | 19.9 | 16.9 | 32% | 30% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625538597 | PAUSED | 286 | 0 | 0.00 | 7,269 | 36.4 | 25.8 | 21.4 | 19.3 | 29% | 25% |
| `DL_Nightmare_Long_CRM` | 765080211982 | ENABLED | 205 | 0 | 0.00 | 5,877 | 27.5 | 20.6 | 16.6 | 13.9 | 25% | 33% |
| `CR_President_Short_CRM` | 753625538609 | ENABLED | 202 | 10 | 0.05 | 5,747 | 34.6 | 23.7 | 19.6 | 17.5 | 32% | 26% |
| `PD_3Reasons_Team_CRM` | 753625538615 | ENABLED | 133 | 0 | 0.00 | 4,463 | 30.5 | 22.2 | 17.8 | 15.4 | 27% | 30% |
| `PD_Yuval_Formula_CRM` | 753625538621 | PAUSED | 124 | 0 | 0.00 | 2,944 | 39.2 | 31.2 | 28.0 | 25.2 | 20% | 19% |
| `PD_TheFastWay_Long_CRM` | 753625538765 | ENABLED | 124 | 0 | 0.00 | 4,365 | 31.7 | 22.9 | 19.4 | 16.8 | 28% | 27% |
| `PD_WomanPink_Face_CRM` | 753625538606 | ENABLED | 123 | 0 | 0.00 | 3,744 | 35.4 | 25.1 | 20.8 | 18.8 | 29% | 25% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625538639 | ENABLED | 114 | 0 | 0.00 | 3,646 | 37.5 | 27.2 | 23.5 | 21.2 | 27% | 22% |
| `PD_POV_Dashboard_CRM` | 753625538594 | ENABLED | 104 | 0 | 0.00 | 5,819 | 93.5 | 36.5 | 26.2 | 21.4 | 61% | 41% |
| `CRMQuickWinDemoPerson` | 753625538633 | PAUSED | 96 | 0 | 0.00 | 3,062 | 35.2 | 26.5 | 22.6 | 20.3 | 25% | 23% |
| `AT_WomanUS_Team_CRM` | 753625538603 | ENABLED | 89 | 0 | 0.00 | 2,846 | 41.7 | 30.1 | 26.4 | 24.7 | 28% | 18% |
| `DL_Nightmare_Short_CRM` | 765080146516 | ENABLED | 86 | 0 | 0.00 | 2,597 | 35.6 | 24.7 | 21.0 | 18.5 | 30% | 25% |
| `PD_WomanPink_Platform_CRM` | 753625538630 | PAUSED | 54 | 10 | 0.19 | 1,503 | 37.1 | 28.0 | 24.5 | 22.0 | 25% | 21% |
| `AT_Realestate_Short_CRM` | 753625538624 | ENABLED | 45 | 0 | 0.00 | 1,511 | 32.2 | 23.3 | 19.0 | 16.4 | 28% | 30% |
| `UT_FinanceJoke_CRM` | 753625538612 | ENABLED | 29 | 0 | 0.00 | 1,170 | 34.6 | 25.4 | 20.8 | 19.4 | 27% | 24% |

**Ads in `CompCRMHubspot_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625539485 | PAUSED | 1,234 | 0 | 0.00 | 35,525 | 19.1 | 10.9 | 8.1 | 6.4 | 43% | 41% |
| `PD_AIPodcast_Short_CRM` | 753625539356 | PAUSED | 204 | 0 | 0.00 | 5,501 | 25.8 | 14.1 | 10.8 | 8.5 | 45% | 39% |
| `CR_President_ShortNo_CRM` | 753625539494 | ENABLED | 137 | 0 | 0.00 | 3,382 | 27.2 | 15.0 | 11.5 | 8.9 | 45% | 40% |
| `PD_TheFastWay_Short_CRM` | 753625539500 | ENABLED | 112 | 0 | 0.00 | 2,820 | 27.0 | 16.3 | 12.2 | 9.7 | 39% | 41% |
| `CR_President_Long_CRM` | 753625539338 | PAUSED | 109 | 10 | 0.09 | 2,931 | 14.5 | 9.8 | 8.2 | 6.7 | 32% | 32% |
| `DL_Nightmare_Long_CRM` | 765080212003 | ENABLED | 96 | 0 | 0.00 | 2,839 | 18.1 | 12.5 | 10.2 | 8.4 | 31% | 33% |
| `CR_President_Short_CRM` | 753625539347 | ENABLED | 61 | 0 | 0.00 | 1,320 | 27.5 | 14.6 | 12.0 | 9.7 | 47% | 34% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625539497 | ENABLED | 61 | 0 | 0.00 | 1,692 | 28.1 | 15.6 | 12.2 | 9.6 | 45% | 38% |
| `PD_POV_Dashboard_CRM` | 753625539332 | ENABLED | 53 | 10 | 0.19 | 1,542 | 87.4 | 30.5 | 19.4 | 13.5 | 65% | 56% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625539335 | PAUSED | 51 | 10 | 0.19 | 1,152 | 24.9 | 13.3 | 10.5 | 9.0 | 47% | 32% |
| `PD_3Reasons_Team_CRM` | 753625539353 | ENABLED | 50 | 0 | 0.00 | 1,451 | 19.2 | 12.5 | 9.8 | 8.0 | 35% | 36% |
| `DL_Nightmare_Short_CRM` | 765080146537 | ENABLED | 42 | 0 | 0.00 | 1,516 | 25.6 | 16.5 | 13.7 | 10.8 | 35% | 35% |
| `AT_Realestate_Short_CRM` | 753625539482 | ENABLED | 42 | 0 | 0.00 | 652 | 18.4 | 11.8 | 8.8 | 7.1 | 36% | 40% |
| `AT_WomanUS_Team_CRM` | 753625539341 | ENABLED | 39 | 0 | 0.00 | 725 | 27.3 | 16.8 | 13.1 | 10.7 | 38% | 37% |
| `PD_Yuval_Formula_CRM` | 753625539359 | PAUSED | 38 | 0 | 0.00 | 1,041 | 22.0 | 13.2 | 11.1 | 9.4 | 40% | 29% |
| `PD_WomanPink_Face_CRM` | 753625539344 | ENABLED | 34 | 0 | 0.00 | 1,169 | 22.3 | 13.3 | 9.7 | 7.9 | 40% | 41% |
| `PD_TheFastWay_Long_CRM` | 753625539503 | ENABLED | 27 | 0 | 0.00 | 556 | 19.7 | 12.8 | 9.6 | 7.8 | 35% | 39% |
| `PD_WomanPink_Platform_CRM` | 753625539488 | PAUSED | 25 | 10 | 0.40 | 736 | 26.9 | 14.9 | 10.6 | 8.4 | 45% | 43% |
| `UT_FinanceJoke_CRM` | 753625539350 | ENABLED | 14 | 0 | 0.00 | 424 | 18.4 | 10.3 | 8.1 | 6.8 | 44% | 33% |
| `CRMQuickWinDemoPerson` | 753625539491 | PAUSED | 13 | 0 | 0.00 | 424 | 25.2 | 14.0 | 11.8 | 8.8 | 45% | 37% |

**Ads in `CompCRMPipedrive_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625539257 | PAUSED | 284 | 0 | 0.00 | 9,146 | 19.7 | 11.8 | 8.9 | 6.9 | 40% | 41% |
| `PD_TheFastWay_Short_CRM` | 753625539272 | ENABLED | 126 | 0 | 0.00 | 4,609 | 29.2 | 18.9 | 15.3 | 13.2 | 35% | 30% |
| `CR_President_Long_CRM` | 753625539110 | PAUSED | 119 | 0 | 0.00 | 3,620 | 13.8 | 8.7 | 6.8 | 5.4 | 37% | 37% |
| `CR_President_ShortNo_CRM` | 753625539266 | ENABLED | 103 | 0 | 0.00 | 2,983 | 28.8 | 17.1 | 13.6 | 10.7 | 41% | 37% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625539107 | PAUSED | 88 | 0 | 0.00 | 3,439 | 30.2 | 18.5 | 14.5 | 12.9 | 39% | 31% |
| `PD_AIPodcast_Short_CRM` | 753625539248 | PAUSED | 62 | 0 | 0.00 | 2,910 | 28.6 | 17.7 | 14.5 | 12.3 | 38% | 30% |
| `CR_President_Short_CRM` | 753625539119 | ENABLED | 59 | 0 | 0.00 | 1,646 | 27.2 | 15.9 | 12.6 | 10.6 | 42% | 33% |
| `PD_TheFastWay_Long_CRM` | 753625539275 | ENABLED | 56 | 10 | 0.18 | 1,447 | 21.9 | 13.3 | 10.0 | 8.3 | 39% | 38% |
| `PD_3Reasons_Team_CRM` | 753625539245 | ENABLED | 43 | 0 | 0.00 | 1,624 | 19.6 | 12.8 | 9.9 | 7.9 | 34% | 39% |
| `PD_Yuval_Formula_CRM` | 753625539251 | PAUSED | 40 | 0 | 0.00 | 1,364 | 25.6 | 18.7 | 15.7 | 14.7 | 27% | 22% |
| `CRMQuickWinDemoPerson` | 753625539263 | PAUSED | 28 | 0 | 0.00 | 1,187 | 30.6 | 20.1 | 17.1 | 15.0 | 34% | 25% |
| `AT_WomanUS_Team_CRM` | 753625539113 | ENABLED | 27 | 10 | 0.36 | 1,061 | 33.3 | 23.1 | 19.2 | 15.9 | 31% | 31% |
| `PD_WomanPink_Face_CRM` | 753625539116 | ENABLED | 26 | 0 | 0.00 | 672 | 25.3 | 13.9 | 13.0 | 10.8 | 45% | 22% |
| `PD_POV_Dashboard_CRM` | 753625539104 | ENABLED | 16 | 0 | 0.00 | 469 | 88.8 | 37.4 | 26.9 | 22.7 | 58% | 39% |
| `PD_WomanPink_Platform_CRM` | 753625539260 | PAUSED | 16 | 0 | 0.00 | 470 | 28.8 | 17.9 | 15.3 | 13.5 | 38% | 24% |
| `AT_Realestate_Short_CRM` | 753625539254 | ENABLED | 15 | 0 | 0.00 | 400 | 23.7 | 14.6 | 11.8 | 10.5 | 39% | 28% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625539269 | ENABLED | 14 | 0 | 0.00 | 825 | 28.2 | 19.9 | 18.0 | 14.9 | 30% | 25% |
| `UT_FinanceJoke_CRM` | 753625539242 | ENABLED | 11 | 0 | 0.00 | 475 | 23.5 | 16.0 | 13.3 | 11.9 | 32% | 26% |

**Ads in `CompCRMSalesforce_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 753625539311 | PAUSED | 283 | 0 | 0.00 | 11,080 | 16.8 | 9.4 | 6.8 | 5.1 | 44% | 46% |
| `CR_President_Long_CRM` | 753625539284 | PAUSED | 123 | 0 | 0.00 | 5,010 | 10.9 | 5.8 | 4.3 | 3.2 | 46% | 46% |
| `CR_President_ShortNo_CRM` | 753625539320 | ENABLED | 107 | 0 | 0.00 | 4,267 | 24.8 | 13.1 | 9.4 | 7.6 | 47% | 42% |
| `PD_TheFastWay_Short_CRM` | 753625539326 | ENABLED | 100 | 0 | 0.00 | 4,064 | 22.2 | 13.3 | 10.2 | 8.1 | 40% | 39% |
| `PD_AIPodcast_Short_CRM` | 753625539302 | PAUSED | 95 | 10 | 0.11 | 3,983 | 23.1 | 12.4 | 9.3 | 6.9 | 46% | 44% |
| `CR_President_Short_CRM` | 753625539293 | ENABLED | 68 | 0 | 0.00 | 2,369 | 24.3 | 11.9 | 9.1 | 7.3 | 51% | 38% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 753625539281 | PAUSED | 59 | 0 | 0.00 | 2,488 | 23.6 | 12.8 | 9.1 | 7.8 | 46% | 39% |
| `PD_3Reasons_Team_CRM` | 753625539299 | ENABLED | 33 | 0 | 0.00 | 1,332 | 15.3 | 9.4 | 7.7 | 6.6 | 38% | 30% |
| `AT_WomanUS_Team_CRM` | 753625539287 | ENABLED | 26 | 0 | 0.00 | 1,023 | 25.1 | 14.3 | 10.2 | 8.8 | 43% | 38% |
| `PD_TheFastWay_Long_CRM` | 753625539329 | ENABLED | 25 | 0 | 0.00 | 921 | 18.5 | 10.9 | 8.3 | 7.3 | 41% | 33% |
| `PD_Yuval_Formula_CRM` | 753625539305 | PAUSED | 22 | 10 | 0.45 | 862 | 19.6 | 12.8 | 10.7 | 9.4 | 35% | 27% |
| `AT_WomanUS_TimeIsMoney_CRM` | 753625539323 | ENABLED | 22 | 0 | 0.00 | 1,007 | 24.8 | 13.7 | 10.5 | 9.2 | 45% | 33% |
| `PD_WomanPink_Face_CRM` | 753625539290 | ENABLED | 16 | 0 | 0.00 | 618 | 22.1 | 12.5 | 10.7 | 8.2 | 43% | 34% |
| `PD_POV_Dashboard_CRM` | 753625539278 | ENABLED | 13 | 0 | 0.00 | 509 | 91.3 | 32.5 | 24.3 | 15.1 | 64% | 54% |
| `CRMQuickWinDemoPerson` | 753625539317 | PAUSED | 13 | 0 | 0.00 | 542 | 18.1 | 10.2 | 8.2 | 5.7 | 44% | 44% |
| `AT_Realestate_Short_CRM` | 753625539308 | ENABLED | 11 | 0 | 0.00 | 408 | 14.2 | 9.1 | 7.1 | 5.9 | 36% | 35% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 78,937 | 1,340 | 0.02 | 4,315,550 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 17,416 | 273 | 0.02 |
| geoTargetConstants/1007850 | 2,903 | 50 | 0.02 |
| geoTargetConstants/1006524 | 1,549 | 50 | 0.03 |
| geoTargetConstants/1006912 | 1,171 | 10 | 0.01 |
| geoTargetConstants/1007336 | 687 | 50 | 0.07 |
| geoTargetConstants/1006567 | 617 | 0 | 0.00 |
| geoTargetConstants/1006864 | 604 | 0 | 0.00 |
| geoTargetConstants/1006656 | 566 | 30 | 0.05 |
| geoTargetConstants/1007326 | 513 | 10 | 0.02 |
| geoTargetConstants/9197981 | 498 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006567 | 617 | 0 | 0.00 |
| geoTargetConstants/1006864 | 604 | 0 | 0.00 |
| geoTargetConstants/9197981 | 498 | 0 | 0.00 |
| geoTargetConstants/1006884 | 445 | 0 | 0.00 |
| geoTargetConstants/1006948 | 321 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-lookalike-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £72,441 | **DEP:** 401 | **DEP/Spend:** 0.01
- **Impressions:** 9,717,313 | **Clicks:** 15,580 | **Conversions:** 401
- **All Conversions Value:** 426,739 | **All Conversions:** 59,217
- **Active Months:** 5 (2026-01-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-01-01 | 4,409 | 26 | 0.01 | 448,581 | 573 | 26 |
| 2026-02-01 | 27,656 | 137 | 0.00 | 4,153,160 | 7,212 | 137 |
| 2026-03-01 | 17,493 | 114 | 0.01 | 1,935,559 | 3,119 | 114 |
| 2026-04-01 | 17,454 | 90 | 0.01 | 2,548,057 | 3,711 | 90 |
| 2026-05-01 | 5,428 | 34 | 0.01 | 631,956 | 965 | 34 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `QE_L` | PAUSED | 41,952 | 211 | 0.01 | 6,085,513 | 40.8 | 30.0 | 26.0 | 23.4 | 26% | 22% |
| `Payers_L` | ENABLED | 26,144 | 165 | 0.01 | 3,096,044 | 37.3 | 27.1 | 23.3 | 20.8 | 27% | 23% |
| `HardSU_L` | PAUSED | 4,345 | 25 | 0.01 | 535,756 | 36.0 | 25.6 | 21.9 | 19.5 | 29% | 24% |

**Ads in `QE_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_Hear` | 794475600236 | ENABLED | 6,907 | 36 | 0.01 | 765,820 | 37.2 | 28.1 | 24.6 | 22.2 | 25% | 21% |
| `AT_W_GameOver` | 794475600233 | ENABLED | 5,563 | 28 | 0.00 | 620,311 | 39.0 | 28.5 | 24.7 | 22.3 | 27% | 22% |
| `AT_Reni_AI_V1` | 798302346413 | ENABLED | 3,145 | 17 | 0.01 | 338,891 | 28.9 | 20.6 | 16.8 | 14.3 | 29% | 31% |
| `AT_Jay_Honest` | 794475600212 | ENABLED | 2,915 | 12 | 0.00 | 265,976 | 39.0 | 28.2 | 24.4 | 21.7 | 28% | 23% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 794475600416 | ENABLED | 2,239 | 16 | 0.01 | 408,886 | 48.9 | 34.9 | 30.0 | 27.5 | 29% | 21% |
| `AT_Jay_Say` | 794475600215 | ENABLED | 2,188 | 11 | 0.01 | 200,684 | 37.5 | 27.7 | 23.9 | 21.3 | 26% | 23% |
| `AT_Reni_AI_V2` | 798302346416 | ENABLED | 1,712 | 9 | 0.01 | 152,766 | 23.7 | 16.0 | 12.7 | 10.6 | 32% | 34% |
| `DL_sidekick_30s` | 794475600389 | ENABLED | 1,221 | 11 | 0.01 | 285,167 | 69.1 | 49.5 | 44.8 | 42.1 | 28% | 15% |
| `SH_PMO_Long` | 794475600443 | ENABLED | 1,167 | 3 | 0.00 | 258,520 | 95.3 | 64.0 | 50.7 | 45.5 | 33% | 29% |
| `PD_Llama_Angry_Short_NoIntro` | 794475600413 | ENABLED | 911 | 5 | 0.01 | 148,053 | 57.6 | 44.4 | 39.5 | 36.7 | 23% | 17% |
| `DL_Llama_Templates_30s` | 794475600386 | PAUSED | 853 | 4 | 0.00 | 197,764 | 70.5 | 53.5 | 48.8 | 45.7 | 24% | 15% |
| `PD_InShort_AI` | 794475600404 | PAUSED | 795 | 3 | 0.00 | 110,898 | 34.3 | 25.2 | 21.3 | 18.4 | 27% | 27% |
| `PD_AI_Eduardo` | 794475600398 | ENABLED | 746 | 6 | 0.01 | 149,425 | 49.1 | 38.4 | 34.3 | 31.5 | 22% | 18% |
| `DL_Llama_Long` | 794475600383 | PAUSED | 714 | 4 | 0.01 | 133,499 | 33.0 | 24.3 | 20.4 | 17.5 | 26% | 28% |
| `DL_sidekick_66s` | 794475600395 | ENABLED | 701 | 2 | 0.00 | 169,105 | 33.6 | 25.2 | 21.7 | 19.0 | 25% | 25% |
| `PD_Llama_Skeleton_UK` | 794475600422 | ENABLED | 674 | 5 | 0.01 | 126,515 | 26.3 | 19.3 | 15.8 | 13.5 | 26% | 30% |
| `PD_Llama_Angry_Short` | 794475600410 | PAUSED | 646 | 2 | 0.00 | 142,399 | 49.1 | 37.9 | 34.2 | 30.8 | 23% | 19% |
| `DL_sidekick_47s` | 794475600392 | ENABLED | 604 | 1 | 0.00 | 91,720 | 60.4 | 52.3 | 48.5 | 45.8 | 13% | 12% |
| `PD_Llama_Angry` | 794475600407 | PAUSED | 563 | 5 | 0.01 | 95,997 | 35.2 | 27.1 | 22.6 | 19.5 | 23% | 28% |
| `DL_Llama_AnyType_30s` | 794475600377 | PAUSED | 529 | 1 | 0.00 | 126,426 | 69.6 | 52.5 | 47.3 | 44.5 | 25% | 15% |
| `DL_Llama_Angry_Long` | 794475600374 | PAUSED | 524 | 1 | 0.00 | 97,706 | 39.2 | 30.3 | 25.5 | 22.2 | 23% | 27% |
| `SH_Marketing_Long` | 794475600437 | ENABLED | 524 | 1 | 0.00 | 94,326 | 94.3 | 64.2 | 51.8 | 47.4 | 32% | 26% |
| `PD_Llama_Skeleton` | 794475600419 | ENABLED | 516 | 2 | 0.00 | 105,645 | 29.8 | 21.5 | 17.5 | 14.8 | 28% | 31% |
| `DL_AI_Llama_Long` | 794475600365 | ENABLED | 500 | 3 | 0.01 | 58,744 | 42.1 | 33.8 | 30.4 | 27.6 | 20% | 18% |
| `DL_Llama_47s` | 794475600371 | PAUSED | 499 | 3 | 0.01 | 113,002 | 65.9 | 56.8 | 53.2 | 50.2 | 14% | 12% |
| `SH_Operations_Long` | 794475600440 | ENABLED | 473 | 3 | 0.01 | 107,099 | 95.2 | 66.2 | 57.5 | 53.1 | 31% | 20% |
| `SH_Finance_Long` | 794475600431 | ENABLED | 469 | 0 | 0.00 | 103,153 | 95.3 | 65.8 | 51.6 | 46.3 | 31% | 30% |
| `PD_AI_Llama` | 794475600401 | ENABLED | 435 | 1 | 0.00 | 100,467 | 54.7 | 42.8 | 38.5 | 35.6 | 22% | 17% |
| `SH_Leadership_Long` | 794475600434 | ENABLED | 429 | 1 | 0.00 | 93,419 | 94.7 | 62.8 | 53.2 | 48.5 | 34% | 23% |
| `CR_Confidence_Women_UK` | 794475600362 | PAUSED | 427 | 1 | 0.00 | 46,437 | 52.0 | 39.8 | 35.5 | 32.8 | 23% | 18% |
| `PD_Manager_WoF` | 794475600428 | PAUSED | 400 | 2 | 0.00 | 73,653 | 36.7 | 28.5 | 24.8 | 21.3 | 22% | 25% |
| `PD_Manager_Celebration` | 794475600425 | PAUSED | 394 | 2 | 0.01 | 57,046 | 37.9 | 29.3 | 25.0 | 22.0 | 23% | 25% |
| `DL_Llama_Dashboards_30s` | 794475600380 | PAUSED | 378 | 2 | 0.01 | 91,317 | 71.6 | 53.8 | 49.0 | 46.2 | 25% | 14% |
| `CR_Confidence_Men_UK` | 794475600239 | PAUSED | 323 | 5 | 0.02 | 43,253 | 53.4 | 41.2 | 37.1 | 35.0 | 23% | 15% |
| `DL_AI_Llama_Short` | 794475600368 | ENABLED | 247 | 0 | 0.00 | 32,464 | 53.2 | 41.3 | 36.5 | 33.3 | 22% | 19% |
| `AT_Llama_short` | 794475600230 | PAUSED | 196 | 2 | 0.01 | 21,850 | 43.6 | 34.2 | 30.3 | 27.7 | 22% | 19% |
| `AT_Llama_30s-alt` | 794475600221 | PAUSED | 134 | 0 | 0.00 | 17,192 | 67.0 | 48.4 | 43.2 | 40.5 | 28% | 16% |
| `AT_Llama_30s` | 794475600218 | PAUSED | 116 | 0 | 0.00 | 19,886 | 64.5 | 44.0 | 38.1 | 35.0 | 32% | 20% |
| `AT_Llama_long-alt` | 794475600227 | PAUSED | 95 | 0 | 0.00 | 8,817 | 38.0 | 28.1 | 22.9 | 20.7 | 26% | 26% |
| `AT_Llama_long` | 794475600224 | PAUSED | 82 | 0 | 0.00 | 11,215 | 39.1 | 30.2 | 25.2 | 22.6 | 23% | 25% |

**Ads in `Payers_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_Hear` | 794475600122 | ENABLED | 5,669 | 42 | 0.01 | 580,416 | 36.0 | 26.7 | 23.2 | 21.0 | 26% | 21% |
| `AT_W_GameOver` | 794475599999 | ENABLED | 4,342 | 28 | 0.01 | 572,466 | 40.5 | 29.9 | 26.3 | 23.9 | 26% | 20% |
| `AT_Reni_AI_V2` | 798302346410 | ENABLED | 3,779 | 21 | 0.01 | 306,779 | 23.6 | 16.1 | 13.0 | 10.8 | 32% | 33% |
| `AT_Jay_Honest` | 794475599978 | ENABLED | 3,694 | 16 | 0.00 | 369,968 | 39.7 | 28.7 | 24.6 | 21.8 | 28% | 24% |
| `AT_Reni_AI_V1` | 798302346407 | ENABLED | 2,081 | 15 | 0.01 | 388,439 | 25.6 | 17.8 | 14.4 | 12.2 | 31% | 32% |
| `AT_Jay_Say` | 794475599981 | ENABLED | 893 | 8 | 0.01 | 65,077 | 37.4 | 27.6 | 24.0 | 21.3 | 26% | 23% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 794475600182 | ENABLED | 888 | 6 | 0.01 | 140,975 | 46.2 | 32.2 | 27.4 | 24.8 | 30% | 23% |
| `DL_sidekick_30s` | 794475600155 | ENABLED | 564 | 5 | 0.01 | 89,540 | 63.6 | 42.3 | 37.4 | 34.6 | 33% | 18% |
| `SH_PMO_Long` | 794475600209 | ENABLED | 375 | 5 | 0.01 | 64,036 | 95.6 | 63.9 | 49.8 | 46.0 | 33% | 28% |
| `PD_Llama_Angry_Short_NoIntro` | 794475600179 | ENABLED | 369 | 1 | 0.00 | 55,447 | 59.4 | 47.0 | 42.4 | 39.7 | 21% | 15% |
| `DL_AI_Llama_Long` | 794475600131 | ENABLED | 286 | 0 | 0.00 | 23,291 | 39.7 | 31.7 | 27.9 | 25.2 | 20% | 21% |
| `DL_Llama_Long` | 794475600149 | PAUSED | 238 | 4 | 0.02 | 28,327 | 31.6 | 23.2 | 19.5 | 16.7 | 27% | 28% |
| `PD_Llama_Skeleton_UK` | 794475600188 | ENABLED | 220 | 0 | 0.00 | 40,170 | 27.3 | 20.5 | 16.7 | 14.5 | 25% | 29% |
| `PD_InShort_AI` | 794475600170 | PAUSED | 191 | 4 | 0.02 | 17,232 | 29.9 | 20.6 | 17.2 | 14.6 | 31% | 29% |
| `DL_sidekick_47s` | 794475600158 | ENABLED | 190 | 0 | 0.00 | 17,748 | 51.7 | 42.5 | 38.5 | 35.9 | 18% | 15% |
| `DL_Llama_Templates_30s` | 794475600152 | PAUSED | 185 | 0 | 0.00 | 31,669 | 66.3 | 48.5 | 43.4 | 40.4 | 27% | 17% |
| `SH_Operations_Long` | 794475600206 | ENABLED | 179 | 0 | 0.00 | 29,500 | 95.1 | 64.8 | 55.7 | 51.5 | 32% | 20% |
| `SH_Marketing_Long` | 794475600203 | ENABLED | 175 | 0 | 0.00 | 22,341 | 94.5 | 58.4 | 43.0 | 39.2 | 38% | 33% |
| `DL_sidekick_66s` | 794475600161 | ENABLED | 167 | 1 | 0.01 | 29,403 | 32.3 | 24.4 | 20.2 | 17.9 | 25% | 26% |
| `PD_Llama_Skeleton` | 794475600185 | ENABLED | 159 | 0 | 0.00 | 23,710 | 27.1 | 19.0 | 15.1 | 13.1 | 30% | 31% |
| `PD_AI_Eduardo` | 794475600164 | ENABLED | 154 | 1 | 0.01 | 28,367 | 40.3 | 30.4 | 25.8 | 24.5 | 24% | 19% |
| `PD_AI_Llama` | 794475600167 | ENABLED | 135 | 0 | 0.00 | 23,164 | 49.8 | 38.9 | 36.0 | 33.6 | 22% | 14% |
| `SH_Finance_Long` | 794475600197 | ENABLED | 115 | 0 | 0.00 | 12,545 | 96.0 | 66.6 | 51.1 | 45.1 | 31% | 32% |
| `SH_Leadership_Long` | 794475600200 | ENABLED | 114 | 0 | 0.00 | 12,007 | 95.3 | 60.0 | 50.3 | 45.0 | 37% | 25% |
| `PD_Llama_Angry_Short` | 794475600176 | PAUSED | 112 | 0 | 0.00 | 15,016 | 45.9 | 34.3 | 30.6 | 25.8 | 25% | 25% |
| `DL_Llama_AnyType_30s` | 794475600143 | PAUSED | 111 | 3 | 0.03 | 15,943 | 68.2 | 51.1 | 46.4 | 43.7 | 25% | 15% |
| `PD_Llama_Angry` | 794475600173 | PAUSED | 92 | 0 | 0.00 | 12,433 | 31.8 | 24.3 | 20.7 | 15.1 | 24% | 38% |
| `DL_Llama_Angry_Long` | 794475600140 | PAUSED | 90 | 0 | 0.00 | 9,239 | 33.2 | 25.9 | 21.7 | 17.8 | 22% | 31% |
| `DL_Llama_Dashboards_30s` | 794475600146 | PAUSED | 88 | 0 | 0.01 | 15,381 | 68.6 | 50.5 | 46.2 | 43.0 | 26% | 15% |
| `PD_Manager_Celebration` | 794475600191 | PAUSED | 86 | 1 | 0.01 | 7,542 | 34.0 | 26.1 | 22.5 | 19.9 | 23% | 24% |
| `PD_Manager_WoF` | 794475600194 | PAUSED | 79 | 0 | 0.00 | 12,590 | 33.0 | 22.8 | 18.7 | 16.1 | 31% | 30% |
| `CR_Confidence_Men_UK` | 794475600125 | PAUSED | 78 | 1 | 0.01 | 7,468 | 46.3 | 34.2 | 29.7 | 27.4 | 26% | 20% |
| `DL_Llama_47s` | 794475600137 | PAUSED | 78 | 2 | 0.03 | 12,406 | 55.7 | 45.7 | 41.2 | 38.3 | 18% | 16% |
| `CR_Confidence_Women_UK` | 794475600128 | PAUSED | 74 | 0 | 0.00 | 6,962 | 45.7 | 33.4 | 28.9 | 26.6 | 27% | 20% |
| `DL_AI_Llama_Short` | 794475600134 | ENABLED | 54 | 0 | 0.00 | 5,442 | 47.4 | 35.1 | 29.8 | 26.4 | 26% | 25% |
| `AT_Llama_short` | 794475599996 | PAUSED | 13 | 0 | 0.00 | 902 | 41.0 | 29.5 | 24.9 | 22.4 | 28% | 24% |

**Ads in `HardSU_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_GameOver` | 794475600467 | ENABLED | 1,035 | 6 | 0.01 | 71,728 | 35.4 | 25.2 | 21.7 | 19.4 | 29% | 23% |
| `AT_W_Hear` | 794475600470 | ENABLED | 928 | 4 | 0.00 | 69,542 | 32.6 | 23.5 | 20.0 | 17.7 | 28% | 25% |
| `AT_Jay_Say` | 794475600449 | ENABLED | 322 | 4 | 0.01 | 28,888 | 33.2 | 23.5 | 19.8 | 17.2 | 29% | 27% |
| `AT_Jay_Honest` | 794475600446 | ENABLED | 291 | 0 | 0.00 | 17,763 | 31.4 | 21.4 | 18.2 | 15.7 | 32% | 27% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 794475600650 | ENABLED | 255 | 2 | 0.01 | 49,516 | 41.5 | 27.8 | 23.0 | 20.9 | 33% | 25% |
| `SH_PMO_Long` | 794475600677 | ENABLED | 187 | 1 | 0.01 | 45,508 | 95.4 | 66.3 | 50.5 | 47.5 | 30% | 28% |
| `DL_sidekick_30s` | 794475600623 | ENABLED | 176 | 5 | 0.03 | 53,826 | 66.6 | 46.6 | 42.6 | 39.8 | 30% | 15% |
| `DL_sidekick_66s` | 794475600629 | ENABLED | 93 | 0 | 0.00 | 20,671 | 31.5 | 22.7 | 19.9 | 17.6 | 28% | 23% |
| `PD_InShort_AI` | 794475600638 | PAUSED | 92 | 0 | 0.00 | 8,827 | 33.0 | 25.0 | 20.4 | 17.3 | 24% | 31% |
| `PD_Llama_Skeleton_UK` | 794475600656 | ENABLED | 80 | 1 | 0.01 | 14,960 | 26.9 | 17.8 | 15.7 | 13.3 | 34% | 25% |
| `PD_AI_Eduardo` | 794475600632 | ENABLED | 73 | 0 | 0.00 | 15,639 | 47.9 | 35.5 | 33.2 | 31.0 | 26% | 13% |
| `PD_Llama_Angry_Short_NoIntro` | 794475600647 | ENABLED | 63 | 1 | 0.02 | 7,705 | 52.3 | 38.7 | 33.6 | 30.9 | 26% | 20% |
| `SH_Marketing_Long` | 794475600671 | ENABLED | 63 | 0 | 0.00 | 10,247 | 96.0 | 64.9 | 55.3 | 51.7 | 32% | 20% |
| `DL_Llama_Long` | 794475600617 | PAUSED | 61 | 0 | 0.00 | 10,806 | 36.5 | 28.1 | 22.1 | 19.7 | 23% | 30% |
| `SH_Finance_Long` | 794475600665 | ENABLED | 47 | 1 | 0.02 | 9,455 | 93.6 | 63.7 | 49.4 | 42.6 | 32% | 33% |
| `DL_sidekick_47s` | 794475600626 | ENABLED | 46 | 0 | 0.00 | 9,382 | 61.4 | 55.4 | 51.1 | 49.1 | 10% | 11% |
| `PD_AI_Llama` | 794475600635 | ENABLED | 45 | 0 | 0.00 | 9,606 | 58.6 | 48.6 | 43.7 | 40.9 | 17% | 16% |
| `DL_Llama_Angry_Long` | 794475600608 | PAUSED | 41 | 0 | 0.00 | 9,817 | 43.6 | 31.4 | 27.9 | 23.5 | 28% | 25% |
| `PD_Llama_Skeleton` | 794475600653 | ENABLED | 40 | 0 | 0.00 | 7,592 | 28.7 | 21.7 | 17.3 | 14.8 | 24% | 32% |
| `DL_Llama_47s` | 794475600605 | PAUSED | 37 | 0 | 0.00 | 8,322 | 63.5 | 54.3 | 51.0 | 48.9 | 14% | 10% |
| `PD_Manager_WoF` | 794475600662 | PAUSED | 35 | 0 | 0.00 | 4,673 | 38.0 | 29.5 | 25.4 | 21.8 | 22% | 26% |
| `DL_Llama_Templates_30s` | 794475600620 | PAUSED | 34 | 0 | 0.00 | 5,667 | 73.8 | 57.0 | 52.4 | 49.2 | 23% | 14% |
| `SH_Leadership_Long` | 794475600668 | ENABLED | 34 | 0 | 0.00 | 5,673 | 94.3 | 69.4 | 60.8 | 52.3 | 26% | 25% |
| `PD_Manager_Celebration` | 794475600659 | PAUSED | 31 | 0 | 0.00 | 2,643 | 35.8 | 28.0 | 24.9 | 22.0 | 22% | 21% |
| `DL_Llama_AnyType_30s` | 794475600611 | PAUSED | 30 | 0 | 0.00 | 6,505 | 71.1 | 54.4 | 50.2 | 47.5 | 24% | 13% |
| `SH_Operations_Long` | 794475600674 | ENABLED | 28 | 0 | 0.00 | 5,783 | 92.9 | 64.9 | 54.9 | 51.5 | 30% | 21% |
| `PD_Llama_Angry` | 794475600641 | PAUSED | 26 | 0 | 0.00 | 4,480 | 36.1 | 25.2 | 22.0 | 20.0 | 30% | 21% |
| `DL_Llama_Dashboards_30s` | 794475600614 | PAUSED | 26 | 0 | 0.00 | 5,312 | 75.4 | 60.8 | 55.1 | 53.6 | 19% | 12% |
| `PD_Llama_Angry_Short` | 794475600644 | PAUSED | 25 | 0 | 0.00 | 3,557 | 49.8 | 37.8 | 33.5 | 31.6 | 24% | 16% |
| `DL_AI_Llama_Long` | 794475600479 | ENABLED | 22 | 0 | 0.00 | 2,308 | 40.2 | 34.7 | 30.2 | 25.8 | 14% | 26% |
| `CR_Confidence_Women_UK` | 794475600476 | PAUSED | 14 | 0 | 0.00 | 2,007 | 48.4 | 34.1 | 29.6 | 26.9 | 30% | 21% |
| `CR_Confidence_Men_UK` | 794475600473 | PAUSED | 13 | 0 | 0.00 | 1,539 | 58.4 | 47.0 | 43.6 | 41.4 | 20% | 12% |
| `AT_Llama_short` | 794475600464 | PAUSED | 13 | 0 | 0.00 | 975 | 44.9 | 37.7 | 33.6 | 29.6 | 16% | 22% |
| `AT_Llama_long` | 794475600458 | PAUSED | 10 | 0 | 0.00 | 1,686 | 36.6 | 28.1 | 25.1 | 20.9 | 23% | 25% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 72,441 | 401 | 0.01 | 9,717,313 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 13,053 | 61 | 0.00 |
| geoTargetConstants/1007850 | 3,996 | 24 | 0.01 |
| geoTargetConstants/1006524 | 1,568 | 9 | 0.01 |
| geoTargetConstants/1006912 | 1,129 | 8 | 0.01 |
| geoTargetConstants/1007336 | 748 | 6 | 0.01 |
| geoTargetConstants/1006656 | 654 | 7 | 0.01 |
| geoTargetConstants/1006864 | 611 | 5 | 0.01 |
| geoTargetConstants/1006567 | 591 | 10 | 0.02 |
| geoTargetConstants/1007326 | 540 | 1 | 0.00 |
| geoTargetConstants/1006884 | 527 | 2 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007274 | 232 | 0 | 0.00 |
| geoTargetConstants/1007864 | 223 | 0 | 0.00 |
| geoTargetConstants/9225752 | 222 | 0 | 0.00 |
| geoTargetConstants/1006984 | 216 | 0 | 0.00 |
| geoTargetConstants/1006668 | 202 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-employment-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £56,281 | **DEP:** 10,100 | **DEP/Spend:** 0.18
- **Impressions:** 4,276,004 | **Clicks:** 3,347 | **Conversions:** 101
- **All Conversions Value:** 195,396 | **All Conversions:** 11,805
- **Active Months:** 3 (2024-05-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 15,368 | 2,400 | 0.16 | 1,085,909 | 967 | 24 |
| 2024-06-01 | 30,524 | 6,300 | 0.21 | 2,030,157 | 1,488 | 63 |
| 2024-07-01 | 10,389 | 1,400 | 0.13 | 1,159,938 | 892 | 14 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `IndustryTechnology_EM-MultiAds` | ENABLED | 28,813 | 6,100 | 0.21 | 2,115,393 | 24.7 | 17.1 | 13.7 | 11.5 | 31% | 33% |
| `EmployerVeryLarge_EM-MultiAds` | ENABLED | 16,230 | 2,000 | 0.12 | 1,281,932 | 25.4 | 17.3 | 13.9 | 11.5 | 32% | 33% |
| `EmployerLarge_EM-MultiAds` | ENABLED | 11,238 | 2,000 | 0.18 | 878,679 | 30.2 | 21.8 | 17.9 | 15.2 | 28% | 30% |

**Ads in `IndustryTechnology_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Dialogue_Long` | 683514805893 | PAUSED | 16,244 | 3,300 | 0.20 | 659,890 | 24.8 | 17.3 | 13.7 | 11.3 | 30% | 35% |
| `PD_WorkOS_Long` | 686100288456 | PAUSED | 9,066 | 2,300 | 0.25 | 1,231,727 | 19.7 | 13.3 | 10.8 | 9.2 | 32% | 31% |
| `PD_TikToker_GoodNewsW` | 701554801672 | PAUSED | 975 | 0 | 0.00 | 62,227 | 26.8 | 18.1 | 14.7 | 12.3 | 32% | 32% |
| `UT_SOH_Flexibility` | 688149281487 | PAUSED | 953 | 100 | 0.10 | 37,382 | 34.0 | 22.4 | 18.5 | 15.8 | 34% | 29% |
| `PD_Linear_Group` | 694233634718 | PAUSED | 248 | 100 | 0.40 | 11,100 | 45.5 | 35.7 | 30.0 | 26.5 | 21% | 26% |
| `PD_TikToker_HackW` | 701554801426 | PAUSED | 190 | 100 | 0.53 | 11,412 | 26.1 | 17.8 | 14.6 | 12.4 | 32% | 30% |
| `PD_Linear_Actress` | 694233635264 | PAUSED | 175 | 0 | 0.00 | 10,433 | 41.0 | 31.3 | 26.0 | 22.5 | 24% | 28% |
| `PD_WorkOS_21sec_UK` | 686100294144 | PAUSED | 167 | 0 | 0.00 | 28,170 | 52.6 | 23.2 | 18.7 | 15.9 | 56% | 31% |
| `EfficiencyProductDemoTeams` | 639820346555 | PAUSED | 166 | 0 | 0.00 | 10,131 | 49.2 | 39.0 | 34.1 | 30.7 | 21% | 21% |
| `PD_TikToker_HackM` | 701554802551 | PAUSED | 135 | 0 | 0.00 | 10,896 | 11.6 | 7.2 | 5.7 | 4.6 | 38% | 37% |
| `PD_TikToker_GoodNewsM` | 701554801654 | PAUSED | 115 | 0 | 0.00 | 6,453 | 23.0 | 15.8 | 12.9 | 10.6 | 31% | 33% |
| `CR_HiGoogie` | 677777097524 | PAUSED | 80 | 200 | 2.50 | 4,852 | 54.7 | 38.2 | 32.9 | 29.2 | 30% | 23% |
| `PD_WorkOS_21sec` | 686100294360 | PAUSED | 55 | 0 | 0.00 | 10,144 | 54.2 | 22.5 | 18.6 | 16.3 | 58% | 28% |
| `PD_WorkOS_Long_UK` | 686100293997 | PAUSED | 40 | 0 | 0.00 | 8,075 | 20.5 | 15.9 | 14.0 | 12.5 | 22% | 21% |
| `PD_YesBut_DeliverWW` | 680474229489 | ENABLED | 35 | 0 | 0.00 | 1,737 | 37.2 | 28.7 | 25.7 | 23.2 | 23% | 19% |
| `UT_SOH_Collaboration` | 688149281691 | PAUSED | 33 | 0 | 0.00 | 1,575 | 33.3 | 24.9 | 22.1 | 20.1 | 25% | 19% |
| `UT_Frank_Mix` | 675135937378 | PAUSED | 25 | 0 | 0.00 | 1,508 | 49.1 | 38.0 | 33.9 | 30.7 | 23% | 19% |
| `PD_YesBut_DeliverBritishRU` | 671499021987 | ENABLED | 25 | 0 | 0.00 | 1,563 | 28.6 | 21.1 | 16.8 | 14.6 | 26% | 31% |
| `PD_YesBut_GoodAtWW` | 680474229099 | ENABLED | 21 | 0 | 0.00 | 1,426 | 37.8 | 29.8 | 25.1 | 23.0 | 21% | 23% |
| `AllConnectedOnePlace` | 660333415563 | ENABLED | 16 | 0 | 0.00 | 1,425 | 27.1 | 19.6 | 17.1 | 15.6 | 28% | 21% |
| `PD_YesBut_GoodAtMW` | 680474229270 | ENABLED | 15 | 0 | 0.00 | 852 | 38.5 | 28.7 | 24.9 | 21.8 | 26% | 24% |
| `UT_Frank_Client` | 675135937327 | PAUSED | 14 | 0 | 0.00 | 984 | 32.7 | 22.7 | 18.7 | 16.4 | 31% | 28% |
| `PD_YesBut_DeliverMM` | 671185832761 | ENABLED | 11 | 0 | 0.00 | 604 | 28.1 | 20.8 | 16.9 | 15.9 | 26% | 24% |

**Ads in `EmployerVeryLarge_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Dialogue_Long` | 699921041895 | PAUSED | 12,944 | 1,300 | 0.10 | 951,556 | 22.6 | 15.5 | 12.3 | 10.0 | 31% | 35% |
| `PD_WorkOS_Long` | 699921041505 | PAUSED | 1,102 | 400 | 0.36 | 135,140 | 26.2 | 17.8 | 14.7 | 12.5 | 32% | 30% |
| `UT_SOH_Flexibility` | 699921041502 | PAUSED | 761 | 200 | 0.26 | 61,007 | 32.9 | 20.8 | 17.0 | 14.4 | 37% | 31% |
| `PD_TikToker_GoodNewsW` | 701554802344 | PAUSED | 452 | 100 | 0.22 | 43,697 | 32.6 | 22.4 | 18.6 | 16.0 | 31% | 29% |
| `PD_Linear_Actress` | 699921041649 | PAUSED | 198 | 0 | 0.00 | 17,507 | 39.8 | 30.6 | 25.5 | 22.1 | 23% | 28% |
| `EfficiencyProductDemoTeams` | 699921041736 | PAUSED | 160 | 0 | 0.00 | 15,299 | 47.8 | 36.2 | 30.7 | 27.6 | 24% | 24% |
| `PD_WorkOS_21sec_UK` | 699921041499 | PAUSED | 113 | 0 | 0.00 | 12,166 | 68.5 | 28.0 | 21.7 | 18.2 | 59% | 35% |
| `CR_HiGoogie` | 699921041487 | PAUSED | 107 | 0 | 0.00 | 10,198 | 50.1 | 31.0 | 26.2 | 23.1 | 38% | 26% |
| `PD_Linear_Group` | 699921041655 | PAUSED | 75 | 0 | 0.00 | 7,228 | 47.3 | 37.6 | 31.7 | 27.8 | 21% | 26% |
| `PD_TikToker_HackM` | 701554801597 | PAUSED | 47 | 0 | 0.00 | 4,596 | 23.5 | 14.0 | 10.8 | 8.5 | 40% | 39% |
| `PD_YesBut_DeliverWW` | 699921041493 | ENABLED | 44 | 0 | 0.00 | 3,179 | 29.1 | 21.7 | 17.6 | 15.1 | 25% | 30% |
| `PD_TikToker_HackW` | 701554801834 | PAUSED | 32 | 0 | 0.00 | 2,353 | 35.0 | 24.0 | 20.4 | 17.5 | 31% | 27% |
| `AllConnectedOnePlace` | 699921041697 | ENABLED | 28 | 0 | 0.00 | 2,219 | 40.6 | 29.3 | 24.5 | 21.5 | 28% | 27% |
| `AT_Shmuel_ShortRegular` | 699921041445 | PAUSED | 27 | 0 | 0.00 | 2,536 | 56.9 | 32.6 | 26.3 | 22.6 | 43% | 31% |
| `PD_WorkOS_Long_UK` | 699921041490 | PAUSED | 20 | 0 | 0.00 | 2,136 | 25.6 | 19.0 | 16.1 | 14.1 | 26% | 26% |
| `UT_SOH_Collaboration` | 699921041658 | PAUSED | 15 | 0 | 0.00 | 1,208 | 26.5 | 18.4 | 14.9 | 12.9 | 31% | 30% |
| `PD_YesBut_GoodAtMW` | 699921041706 | ENABLED | 14 | 0 | 0.00 | 983 | 31.9 | 24.9 | 20.8 | 18.4 | 22% | 26% |
| `UT_Frank_Client` | 699921041907 | PAUSED | 14 | 0 | 0.00 | 1,584 | 38.0 | 27.8 | 23.8 | 20.3 | 27% | 27% |
| `PD_YesBut_GoodAtWW` | 699921041496 | ENABLED | 13 | 0 | 0.00 | 1,265 | 35.4 | 26.6 | 22.3 | 19.4 | 25% | 27% |
| `PD_WorkOS_21sec` | 699921041910 | PAUSED | 12 | 0 | 0.00 | 1,547 | 85.1 | 33.1 | 25.9 | 21.4 | 61% | 35% |
| `PD_YesBut_DeliverBritishRU` | 699921041508 | ENABLED | 11 | 0 | 0.00 | 876 | 31.0 | 20.6 | 14.9 | 13.5 | 34% | 34% |
| `AT_Shmuel_ShortSplit` | 699921041274 | PAUSED | 11 | 0 | 0.00 | 831 | 63.0 | 36.1 | 29.8 | 24.9 | 43% | 31% |

**Ads in `EmployerLarge_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Dialogue_Long` | 683514805830 | PAUSED | 7,349 | 1,600 | 0.22 | 340,053 | 28.1 | 20.2 | 16.2 | 13.5 | 28% | 33% |
| `PD_WorkOS_Long` | 686100294234 | PAUSED | 2,701 | 200 | 0.07 | 451,906 | 27.2 | 19.4 | 16.3 | 14.1 | 29% | 28% |
| `UT_SOH_Flexibility` | 688149281757 | PAUSED | 412 | 200 | 0.49 | 22,891 | 41.9 | 29.7 | 25.2 | 22.3 | 29% | 25% |
| `EfficiencyProductDemoTeams` | 639820346546 | PAUSED | 196 | 0 | 0.00 | 12,084 | 57.7 | 46.2 | 40.4 | 36.5 | 20% | 21% |
| `PD_TikToker_GoodNewsW` | 701554802077 | PAUSED | 118 | 0 | 0.00 | 8,510 | 29.3 | 20.6 | 17.1 | 14.4 | 30% | 30% |
| `PD_Linear_Actress` | 694233634523 | PAUSED | 103 | 0 | 0.00 | 5,756 | 44.9 | 35.1 | 29.3 | 25.3 | 22% | 28% |
| `PD_Linear_Group` | 694233635225 | PAUSED | 51 | 0 | 0.00 | 2,807 | 52.9 | 43.2 | 36.8 | 32.3 | 18% | 25% |
| `CR_HiGoogie` | 677777097530 | PAUSED | 50 | 0 | 0.00 | 3,228 | 56.8 | 39.6 | 34.3 | 31.2 | 30% | 21% |
| `PD_TikToker_HackW` | 701554801429 | PAUSED | 39 | 0 | 0.00 | 3,028 | 32.8 | 25.6 | 22.3 | 19.3 | 22% | 25% |
| `PD_WorkOS_21sec_UK` | 686100294150 | PAUSED | 37 | 0 | 0.00 | 6,841 | 64.6 | 29.9 | 24.2 | 20.3 | 54% | 32% |
| `PD_WorkOS_21sec` | 686100293991 | PAUSED | 28 | 0 | 0.00 | 6,873 | 73.7 | 32.9 | 26.8 | 22.8 | 55% | 31% |
| `PD_TikToker_GoodNewsM` | 701554802041 | PAUSED | 23 | 0 | 0.00 | 1,823 | 25.3 | 19.0 | 17.2 | 15.4 | 25% | 19% |
| `PD_YesBut_DeliverWW` | 680474229276 | ENABLED | 22 | 0 | 0.00 | 1,297 | 39.7 | 31.8 | 25.7 | 22.8 | 20% | 28% |
| `PD_WorkOS_Long_UK` | 686100294147 | PAUSED | 21 | 0 | 0.00 | 4,085 | 24.7 | 20.7 | 18.2 | 16.2 | 16% | 22% |
| `UT_Frank_Mix` | 675135936952 | PAUSED | 18 | 0 | 0.00 | 1,368 | 55.9 | 41.7 | 36.7 | 32.3 | 25% | 23% |
| `PD_TikToker_HackM` | 701554802308 | PAUSED | 16 | 0 | 0.00 | 1,925 | 15.3 | 11.1 | 9.0 | 7.0 | 27% | 37% |
| `AllConnectedOnePlace` | 660333415176 | ENABLED | 13 | 0 | 0.00 | 870 | 46.8 | 38.1 | 34.2 | 30.6 | 19% | 20% |
| `UT_SOH_Collaboration` | 688149281517 | PAUSED | 10 | 0 | 0.00 | 525 | 47.3 | 39.7 | 35.4 | 31.6 | 16% | 20% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 56,281 | 10,100 | 0.18 | 4,276,004 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 16,013 | 3,100 | 0.19 |
| geoTargetConstants/1006524 | 1,054 | 0 | 0.00 |
| geoTargetConstants/1006912 | 985 | 600 | 0.61 |
| geoTargetConstants/1006567 | 542 | 100 | 0.18 |
| geoTargetConstants/1007336 | 477 | 0 | 0.00 |
| geoTargetConstants/1006864 | 469 | 0 | 0.00 |
| geoTargetConstants/1006656 | 434 | 100 | 0.23 |
| geoTargetConstants/1007326 | 432 | 100 | 0.23 |
| geoTargetConstants/1006884 | 350 | 0 | 0.00 |
| geoTargetConstants/1007064 | 349 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006524 | 1,054 | 0 | 0.00 |
| geoTargetConstants/1007336 | 477 | 0 | 0.00 |
| geoTargetConstants/1006864 | 469 | 0 | 0.00 |
| geoTargetConstants/1006884 | 350 | 0 | 0.00 |
| geoTargetConstants/1007064 | 349 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-crm-desktop-main3-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £54,393 | **DEP:** 1,031 | **DEP/Spend:** 0.02
- **Impressions:** 4,876,989 | **Clicks:** 13,383 | **Conversions:** 103
- **All Conversions Value:** 311,673 | **All Conversions:** 54,262
- **Active Months:** 2 (2026-04-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-04-01 | 34,407 | 678 | 0.02 | 2,894,141 | 6,311 | 68 |
| 2026-05-01 | 19,985 | 353 | 0.02 | 1,982,848 | 7,072 | 35 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | PAUSED | 22,053 | 428 | 0.02 | 1,995,240 | 38.5 | 23.8 | 19.3 | 16.7 | 38% | 30% |
| `LookalikeHigh_CRM_L` | ENABLED | 13,989 | 323 | 0.02 | 1,602,971 | 30.7 | 19.1 | 15.1 | 12.6 | 38% | 34% |
| `Lookalike_CRM_L` | ENABLED | 6,298 | 90 | 0.01 | 590,860 | 36.2 | 23.5 | 19.2 | 16.6 | 35% | 30% |
| `CompBig_CRM_CA` | ENABLED | 5,021 | 70 | 0.01 | 318,885 | 36.0 | 23.5 | 19.0 | 16.3 | 35% | 31% |
| `Employment_CRM_EM` | PAUSED | 4,010 | 70 | 0.02 | 270,369 | 36.8 | 24.3 | 20.0 | 17.2 | 34% | 29% |
| `SQA_CRM_S` | ENABLED | 1,110 | 20 | 0.02 | 43,859 | 37.4 | 23.0 | 18.5 | 15.6 | 38% | 32% |
| `Competitors_CRM_M` | ENABLED | 976 | 20 | 0.02 | 33,639 | 37.6 | 23.2 | 18.7 | 15.8 | 38% | 32% |
| `Keywords_CRM_KW` | ENABLED | 536 | 0 | 0.00 | 12,774 | 32.5 | 18.6 | 14.2 | 11.4 | 43% | 39% |
| `Topics_CRM_T` | ENABLED | 400 | 10 | 0.02 | 8,392 | 29.0 | 18.5 | 14.3 | 10.9 | 36% | 41% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806043831555 | ENABLED | 10,926 | 248 | 0.02 | 1,122,772 | 29.3 | 18.6 | 14.9 | 12.7 | 37% | 32% |
| `PD_5features_Automations_CRM` | 806043831579 | ENABLED | 1,927 | 20 | 0.01 | 209,615 | 95.6 | 45.6 | 35.4 | 31.3 | 52% | 31% |
| `AT_TheMillionaire_Wow_CRM` | 806043831558 | ENABLED | 1,796 | 50 | 0.03 | 120,352 | 32.6 | 22.6 | 18.7 | 16.2 | 31% | 29% |
| `AT_Podcast_HateCRM_CRM` | 806043831552 | ENABLED | 1,212 | 0 | 0.00 | 87,708 | 32.4 | 23.9 | 20.0 | 17.1 | 26% | 28% |
| `DL_Stayinglateagain_CRM` | 806043831573 | ENABLED | 971 | 40 | 0.04 | 73,112 | 25.3 | 18.3 | 14.8 | 12.2 | 28% | 33% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806043831561 | ENABLED | 842 | 10 | 0.01 | 76,613 | 38.8 | 29.6 | 25.8 | 22.9 | 24% | 23% |
| `AT_Car_Bestadvice_CRM` | 806043831537 | ENABLED | 836 | 20 | 0.02 | 69,724 | 45.1 | 30.9 | 26.6 | 23.9 | 31% | 23% |
| `CR_Intervention_WeNeed_CRM` | 806043831570 | ENABLED | 699 | 10 | 0.01 | 44,357 | 29.9 | 22.4 | 18.4 | 15.6 | 25% | 30% |
| `DL_Switchto_CRM` | 806043831576 | ENABLED | 658 | 0 | 0.00 | 44,999 | 26.1 | 18.9 | 15.5 | 12.8 | 28% | 32% |
| `AT_ManUS_Nothing_CRM` | 806043831546 | ENABLED | 472 | 0 | 0.00 | 32,154 | 33.3 | 23.7 | 19.9 | 17.2 | 29% | 28% |
| `AT_Car_Tip_CRM` | 806043831540 | ENABLED | 427 | 10 | 0.02 | 33,706 | 46.0 | 32.6 | 28.4 | 25.7 | 29% | 21% |
| `CR_Intervention_Launch_CRM` | 806043831567 | ENABLED | 327 | 0 | 0.00 | 16,600 | 30.9 | 23.6 | 19.6 | 16.7 | 24% | 29% |
| `AT_ManUS_Efficiency_CRM` | 806043831543 | ENABLED | 212 | 10 | 0.05 | 12,548 | 31.5 | 22.4 | 18.4 | 15.7 | 29% | 30% |
| `PD_5features_Sequences_CRM` | 806043831582 | ENABLED | 207 | 0 | 0.00 | 18,418 | 96.2 | 60.3 | 52.8 | 49.1 | 37% | 19% |
| `CR_Enthusiast_ComStopIt_CRM` | 806043831564 | ENABLED | 188 | 0 | 0.00 | 11,596 | 41.2 | 32.0 | 28.1 | 25.0 | 22% | 22% |
| `AT_Podcast_BeHonest_CRM` | 806043831549 | ENABLED | 171 | 0 | 0.00 | 10,163 | 37.3 | 28.4 | 23.8 | 20.7 | 24% | 27% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 806043831588 | ENABLED | 132 | 10 | 0.08 | 8,546 | 35.9 | 26.7 | 22.2 | 19.4 | 26% | 27% |
| `PD_Thebiggestdeal_Bam_CRM` | 806043831585 | ENABLED | 48 | 0 | 0.00 | 2,257 | 36.6 | 27.8 | 22.7 | 20.1 | 24% | 28% |

**Ads in `LookalikeHigh_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806027376852 | ENABLED | 6,775 | 145 | 0.02 | 537,314 | 28.9 | 18.1 | 14.3 | 11.9 | 37% | 34% |
| `AT_Podcast_HateCRM_CRM` | 806027377194 | ENABLED | 999 | 0 | 0.00 | 241,138 | 29.0 | 20.8 | 17.1 | 14.4 | 28% | 31% |
| `AT_TheMillionaire_Wow_CRM` | 806064596302 | ENABLED | 983 | 20 | 0.02 | 68,185 | 30.1 | 20.4 | 16.6 | 14.0 | 32% | 31% |
| `AT_Car_Bestadvice_CRM` | 806064632044 | ENABLED | 851 | 40 | 0.05 | 233,020 | 37.1 | 21.5 | 17.3 | 14.7 | 42% | 32% |
| `PD_5features_Automations_CRM` | 806064584050 | ENABLED | 691 | 20 | 0.03 | 69,536 | 93.7 | 38.8 | 26.5 | 22.0 | 59% | 43% |
| `DL_Stayinglateagain_CRM` | 806027417421 | ENABLED | 578 | 30 | 0.05 | 44,447 | 22.0 | 15.6 | 12.4 | 10.0 | 29% | 36% |
| `DL_Switchto_CRM` | 806027254926 | ENABLED | 546 | 10 | 0.02 | 75,108 | 22.2 | 15.6 | 12.4 | 10.2 | 30% | 34% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806064583645 | ENABLED | 429 | 20 | 0.05 | 35,365 | 29.8 | 20.5 | 17.3 | 14.9 | 31% | 27% |
| `CR_Intervention_WeNeed_CRM` | 806064631885 | ENABLED | 341 | 10 | 0.03 | 36,932 | 27.7 | 20.7 | 16.7 | 13.8 | 25% | 33% |
| `AT_Podcast_BeHonest_CRM` | 806137610375 | ENABLED | 269 | 10 | 0.04 | 48,454 | 34.1 | 25.9 | 22.8 | 19.4 | 24% | 25% |
| `CR_Intervention_Launch_CRM` | 806064584041 | ENABLED | 264 | 0 | 0.00 | 42,118 | 26.2 | 18.7 | 15.0 | 12.6 | 29% | 33% |
| `AT_ManUS_Nothing_CRM` | 806027417709 | ENABLED | 254 | 0 | 0.00 | 36,754 | 28.6 | 19.8 | 15.6 | 13.5 | 31% | 32% |
| `AT_Car_Tip_CRM` | 806137710905 | ENABLED | 251 | 0 | 0.00 | 29,173 | 38.8 | 24.3 | 20.4 | 17.7 | 38% | 27% |
| `PD_5features_Sequences_CRM` | 806027387889 | ENABLED | 248 | 10 | 0.04 | 32,299 | 94.3 | 50.9 | 41.0 | 36.6 | 46% | 28% |
| `CR_Enthusiast_ComStopIt_CRM` | 806027358708 | ENABLED | 238 | 0 | 0.00 | 24,301 | 31.1 | 21.3 | 17.7 | 15.0 | 31% | 29% |
| `AT_ManUS_Efficiency_CRM` | 806064583660 | ENABLED | 122 | 0 | 0.00 | 15,690 | 28.6 | 18.7 | 15.4 | 13.0 | 35% | 31% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 806137674152 | ENABLED | 102 | 0 | 0.00 | 25,562 | 31.1 | 21.2 | 17.0 | 15.4 | 32% | 27% |
| `PD_Thebiggestdeal_Bam_CRM` | 806027413107 | ENABLED | 48 | 7 | 0.15 | 7,575 | 23.8 | 15.7 | 11.6 | 9.7 | 34% | 38% |

**Ads in `Lookalike_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806064701935 | ENABLED | 2,440 | 50 | 0.02 | 184,925 | 31.2 | 20.5 | 16.6 | 14.2 | 34% | 31% |
| `AT_Podcast_HateCRM_CRM` | 806064724282 | ENABLED | 684 | 10 | 0.01 | 110,702 | 37.2 | 27.9 | 23.4 | 20.1 | 25% | 28% |
| `AT_Car_Bestadvice_CRM` | 806137755548 | ENABLED | 490 | 20 | 0.04 | 80,828 | 44.5 | 29.4 | 25.2 | 22.6 | 34% | 23% |
| `DL_Switchto_CRM` | 806064724297 | ENABLED | 455 | 10 | 0.02 | 30,942 | 28.3 | 20.4 | 16.5 | 13.7 | 28% | 33% |
| `PD_5features_Automations_CRM` | 806137679195 | ENABLED | 443 | 0 | 0.00 | 33,749 | 95.4 | 44.1 | 32.8 | 28.1 | 54% | 36% |
| `AT_TheMillionaire_Wow_CRM` | 806137756040 | ENABLED | 373 | 0 | 0.00 | 19,489 | 32.7 | 22.8 | 18.8 | 16.2 | 30% | 29% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806064727825 | ENABLED | 222 | 0 | 0.00 | 15,088 | 40.8 | 31.5 | 27.6 | 25.0 | 23% | 21% |
| `DL_Stayinglateagain_CRM` | 806064728596 | ENABLED | 209 | 0 | 0.00 | 12,708 | 28.6 | 21.2 | 17.0 | 14.2 | 26% | 33% |
| `CR_Intervention_WeNeed_CRM` | 806137755119 | ENABLED | 165 | 0 | 0.00 | 7,887 | 33.2 | 24.9 | 21.0 | 17.7 | 25% | 29% |
| `PD_5features_Sequences_CRM` | 806064724264 | ENABLED | 153 | 0 | 0.00 | 24,242 | 96.5 | 62.7 | 55.4 | 51.8 | 35% | 17% |
| `CR_Intervention_Launch_CRM` | 806137755566 | ENABLED | 152 | 0 | 0.00 | 19,859 | 34.2 | 25.7 | 21.4 | 18.9 | 25% | 27% |
| `AT_Car_Tip_CRM` | 806064702898 | ENABLED | 123 | 0 | 0.00 | 13,603 | 51.2 | 37.5 | 32.6 | 29.3 | 27% | 22% |
| `AT_Podcast_BeHonest_CRM` | 806064727846 | ENABLED | 101 | 0 | 0.00 | 12,945 | 45.3 | 33.3 | 29.3 | 25.3 | 27% | 24% |
| `CR_Enthusiast_ComStopIt_CRM` | 806064724030 | ENABLED | 94 | 0 | 0.00 | 6,197 | 44.8 | 34.5 | 30.8 | 27.9 | 23% | 19% |
| `AT_ManUS_Nothing_CRM` | 806064728545 | ENABLED | 93 | 0 | 0.00 | 6,932 | 36.8 | 27.6 | 22.9 | 19.9 | 25% | 28% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 806137755065 | ENABLED | 42 | 0 | 0.00 | 7,027 | 43.3 | 33.8 | 28.9 | 25.5 | 22% | 25% |
| `AT_ManUS_Efficiency_CRM` | 806064724210 | ENABLED | 42 | 0 | 0.00 | 2,629 | 32.2 | 24.0 | 20.3 | 17.3 | 26% | 28% |
| `PD_Thebiggestdeal_Bam_CRM` | 806064724240 | ENABLED | 19 | 0 | 0.00 | 1,108 | 44.0 | 30.1 | 26.5 | 23.3 | 32% | 23% |

**Ads in `CompBig_CRM_CA`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806137794125 | ENABLED | 1,957 | 30 | 0.02 | 87,618 | 31.8 | 20.5 | 16.4 | 13.8 | 35% | 33% |
| `AT_TheMillionaire_Wow_CRM` | 806137754345 | ENABLED | 435 | 20 | 0.05 | 19,003 | 33.1 | 22.4 | 18.2 | 15.4 | 32% | 31% |
| `AT_Car_Bestadvice_CRM` | 806137793711 | ENABLED | 375 | 0 | 0.00 | 40,543 | 40.1 | 25.0 | 20.6 | 18.1 | 38% | 28% |
| `AT_Podcast_HateCRM_CRM` | 806064728308 | ENABLED | 375 | 10 | 0.03 | 27,668 | 35.2 | 25.9 | 21.3 | 17.8 | 26% | 31% |
| `PD_5features_Automations_CRM` | 806064729064 | ENABLED | 306 | 0 | 0.00 | 18,021 | 94.6 | 43.7 | 32.3 | 28.0 | 54% | 36% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806137754375 | ENABLED | 221 | 0 | 0.00 | 16,928 | 38.4 | 29.5 | 25.4 | 22.7 | 23% | 23% |
| `DL_Switchto_CRM` | 806064725665 | ENABLED | 213 | 10 | 0.05 | 20,083 | 27.1 | 19.5 | 15.4 | 13.0 | 28% | 33% |
| `CR_Intervention_WeNeed_CRM` | 806027415108 | ENABLED | 172 | 0 | 0.00 | 10,209 | 33.2 | 24.6 | 20.5 | 17.6 | 26% | 28% |
| `AT_Podcast_BeHonest_CRM` | 806137755752 | ENABLED | 144 | 0 | 0.00 | 16,845 | 39.0 | 30.5 | 25.5 | 21.6 | 22% | 29% |
| `CR_Intervention_Launch_CRM` | 806137754327 | ENABLED | 144 | 0 | 0.00 | 13,487 | 33.4 | 25.5 | 22.1 | 19.5 | 24% | 23% |
| `DL_Stayinglateagain_CRM` | 806064683275 | ENABLED | 142 | 0 | 0.00 | 8,852 | 26.8 | 19.7 | 15.4 | 12.8 | 26% | 35% |
| `AT_ManUS_Nothing_CRM` | 806064702886 | ENABLED | 129 | 0 | 0.00 | 8,943 | 35.4 | 26.4 | 22.2 | 19.2 | 25% | 27% |
| `CR_Enthusiast_ComStopIt_CRM` | 806064724705 | ENABLED | 125 | 0 | 0.00 | 9,133 | 43.8 | 34.4 | 30.4 | 27.6 | 22% | 20% |
| `AT_Car_Tip_CRM` | 806064725509 | ENABLED | 109 | 0 | 0.00 | 8,411 | 46.5 | 33.3 | 29.8 | 27.6 | 28% | 17% |
| `PD_5features_Sequences_CRM` | 806137755779 | ENABLED | 62 | 0 | 0.00 | 3,561 | 95.7 | 59.2 | 51.4 | 48.3 | 38% | 18% |
| `AT_ManUS_Efficiency_CRM` | 806064701902 | ENABLED | 61 | 0 | 0.00 | 5,109 | 32.0 | 24.2 | 20.7 | 17.5 | 25% | 28% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 806064683212 | ENABLED | 37 | 0 | 0.00 | 3,030 | 38.3 | 28.4 | 23.8 | 20.8 | 26% | 27% |
| `PD_Thebiggestdeal_Bam_CRM` | 806064725962 | ENABLED | 14 | 0 | 0.00 | 1,441 | 45.2 | 36.2 | 33.1 | 27.5 | 20% | 24% |

**Ads in `Employment_CRM_EM`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806064620536 | ENABLED | 1,783 | 30 | 0.02 | 102,965 | 32.1 | 21.1 | 17.2 | 14.6 | 34% | 31% |
| `AT_Podcast_HateCRM_CRM` | 806137673720 | ENABLED | 319 | 10 | 0.03 | 27,669 | 38.5 | 29.1 | 24.2 | 20.9 | 24% | 28% |
| `AT_TheMillionaire_Wow_CRM` | 806064620587 | ENABLED | 292 | 0 | 0.00 | 13,651 | 33.7 | 23.7 | 19.5 | 16.6 | 30% | 30% |
| `PD_5features_Automations_CRM` | 806137711916 | ENABLED | 229 | 0 | 0.00 | 13,631 | 95.3 | 45.6 | 36.1 | 31.8 | 52% | 30% |
| `AT_Car_Bestadvice_CRM` | 806064592054 | ENABLED | 221 | 0 | 0.00 | 27,018 | 45.9 | 31.8 | 28.1 | 24.9 | 31% | 22% |
| `CR_Intervention_WeNeed_CRM` | 806064621118 | ENABLED | 185 | 10 | 0.05 | 10,641 | 33.7 | 25.2 | 20.4 | 17.3 | 25% | 31% |
| `AT_Podcast_BeHonest_CRM` | 806027375268 | ENABLED | 120 | 0 | 0.00 | 10,709 | 49.0 | 36.9 | 31.3 | 26.8 | 25% | 27% |
| `CR_Intervention_Launch_CRM` | 806027375406 | ENABLED | 119 | 0 | 0.00 | 9,647 | 31.7 | 24.9 | 21.0 | 18.8 | 21% | 25% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806137675157 | ENABLED | 114 | 10 | 0.09 | 8,095 | 45.5 | 35.3 | 30.7 | 28.0 | 22% | 21% |
| `DL_Stayinglateagain_CRM` | 806027388627 | ENABLED | 113 | 0 | 0.00 | 8,018 | 28.1 | 20.8 | 16.5 | 14.1 | 26% | 32% |
| `DL_Switchto_CRM` | 806137712045 | ENABLED | 104 | 0 | 0.00 | 8,081 | 29.4 | 21.7 | 18.1 | 14.3 | 26% | 34% |
| `AT_Car_Tip_CRM` | 806027388213 | ENABLED | 94 | 0 | 0.00 | 8,419 | 51.9 | 39.6 | 35.4 | 31.9 | 24% | 20% |
| `AT_ManUS_Nothing_CRM` | 806027387934 | ENABLED | 90 | 10 | 0.11 | 5,836 | 36.0 | 26.7 | 22.6 | 19.7 | 26% | 26% |
| `CR_Enthusiast_ComStopIt_CRM` | 806027375211 | ENABLED | 59 | 0 | 0.00 | 4,453 | 48.8 | 41.1 | 38.3 | 35.3 | 16% | 14% |
| `AT_ManUS_Efficiency_CRM` | 806064620563 | ENABLED | 56 | 0 | 0.00 | 3,818 | 38.1 | 27.4 | 22.1 | 18.7 | 28% | 32% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 806027389329 | ENABLED | 44 | 0 | 0.00 | 3,294 | 46.0 | 35.8 | 31.0 | 27.9 | 22% | 22% |
| `PD_5features_Sequences_CRM` | 806027388642 | ENABLED | 39 | 0 | 0.00 | 2,511 | 96.6 | 58.8 | 52.0 | 49.6 | 39% | 16% |
| `PD_Thebiggestdeal_Bam_CRM` | 806064591976 | ENABLED | 28 | 0 | 0.00 | 1,913 | 48.9 | 38.0 | 33.2 | 31.7 | 22% | 17% |

**Ads in `SQA_CRM_S`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806027385732 | ENABLED | 326 | 0 | 0.00 | 8,647 | 31.4 | 20.0 | 16.2 | 13.4 | 36% | 33% |
| `AT_Car_Bestadvice_CRM` | 806064590587 | ENABLED | 163 | 0 | 0.00 | 11,478 | 35.7 | 21.2 | 17.0 | 14.8 | 41% | 30% |
| `AT_Podcast_HateCRM_CRM` | 806064618610 | ENABLED | 130 | 0 | 0.00 | 6,492 | 33.8 | 24.5 | 19.8 | 16.3 | 27% | 34% |
| `PD_5features_Automations_CRM` | 806064595384 | ENABLED | 98 | 0 | 0.00 | 3,982 | 94.1 | 40.1 | 29.8 | 25.8 | 57% | 35% |
| `AT_TheMillionaire_Wow_CRM` | 806064582154 | ENABLED | 63 | 0 | 0.00 | 1,757 | 27.6 | 18.7 | 15.6 | 13.5 | 32% | 28% |
| `DL_Stayinglateagain_CRM` | 806064582715 | ENABLED | 52 | 0 | 0.00 | 1,515 | 25.6 | 18.7 | 14.5 | 11.6 | 27% | 38% |
| `DL_Switchto_CRM` | 806027375187 | ENABLED | 49 | 10 | 0.20 | 1,467 | 26.2 | 19.7 | 16.3 | 13.4 | 25% | 32% |
| `CR_Intervention_WeNeed_CRM` | 806027365587 | ENABLED | 45 | 0 | 0.00 | 1,225 | 34.5 | 23.7 | 19.1 | 16.1 | 31% | 32% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806064591763 | ENABLED | 42 | 0 | 0.00 | 1,650 | 35.3 | 24.8 | 21.5 | 18.8 | 30% | 24% |
| `AT_Car_Tip_CRM` | 806064596335 | ENABLED | 36 | 0 | 0.00 | 1,568 | 39.9 | 24.9 | 20.0 | 17.6 | 38% | 29% |
| `CR_Intervention_Launch_CRM` | 806064581515 | ENABLED | 30 | 0 | 0.00 | 1,108 | 30.7 | 22.7 | 17.8 | 14.9 | 26% | 34% |
| `PD_5features_Sequences_CRM` | 806027254791 | ENABLED | 15 | 0 | 0.00 | 489 | 94.1 | 52.2 | 41.4 | 36.8 | 45% | 30% |
| `CR_Enthusiast_ComStopIt_CRM` | 806137636058 | ENABLED | 14 | 0 | 0.00 | 517 | 35.5 | 25.5 | 22.9 | 19.0 | 28% | 25% |
| `AT_ManUS_Nothing_CRM` | 806027376396 | ENABLED | 14 | 10 | 0.71 | 577 | 38.7 | 27.7 | 20.7 | 17.8 | 28% | 36% |
| `AT_Podcast_BeHonest_CRM` | 806064595675 | ENABLED | 14 | 0 | 0.00 | 733 | 31.1 | 23.7 | 20.7 | 16.5 | 24% | 30% |

**Ads in `Competitors_CRM_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806064631858 | ENABLED | 352 | 20 | 0.06 | 7,655 | 30.1 | 18.8 | 15.0 | 12.3 | 37% | 34% |
| `AT_Car_Bestadvice_CRM` | 806027388891 | ENABLED | 110 | 0 | 0.00 | 7,939 | 33.9 | 21.5 | 17.6 | 15.1 | 37% | 30% |
| `AT_Podcast_HateCRM_CRM` | 806137674134 | ENABLED | 108 | 0 | 0.00 | 5,522 | 34.1 | 24.4 | 19.5 | 16.3 | 29% | 33% |
| `PD_5features_Automations_CRM` | 806137673990 | ENABLED | 83 | 0 | 0.00 | 2,522 | 92.9 | 41.5 | 31.6 | 27.6 | 55% | 34% |
| `AT_TheMillionaire_Wow_CRM` | 806137675802 | ENABLED | 64 | 0 | 0.00 | 1,607 | 29.8 | 18.7 | 13.4 | 12.2 | 37% | 35% |
| `DL_Stayinglateagain_CRM` | 806064679870 | ENABLED | 37 | 0 | 0.00 | 997 | 29.5 | 21.2 | 17.6 | 14.4 | 28% | 32% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806027412693 | ENABLED | 35 | 0 | 0.00 | 1,019 | 35.8 | 28.2 | 24.1 | 21.4 | 21% | 24% |
| `DL_Switchto_CRM` | 806027255400 | ENABLED | 35 | 0 | 0.00 | 1,086 | 27.7 | 21.1 | 18.0 | 14.8 | 24% | 30% |
| `AT_Car_Tip_CRM` | 806027375706 | ENABLED | 27 | 0 | 0.00 | 832 | 39.4 | 25.8 | 21.7 | 18.6 | 35% | 28% |
| `CR_Intervention_WeNeed_CRM` | 806064592072 | ENABLED | 26 | 0 | 0.00 | 690 | 31.2 | 25.5 | 23.4 | 18.6 | 18% | 27% |
| `CR_Intervention_Launch_CRM` | 806137675655 | ENABLED | 19 | 0 | 0.00 | 803 | 27.3 | 21.6 | 16.2 | 11.8 | 21% | 45% |
| `AT_Podcast_BeHonest_CRM` | 806137673939 | ENABLED | 19 | 0 | 0.00 | 1,140 | 36.2 | 28.9 | 25.0 | 23.0 | 20% | 21% |
| `CR_Enthusiast_ComStopIt_CRM` | 806064621301 | ENABLED | 16 | 0 | 0.00 | 436 | 42.0 | 30.0 | 26.3 | 22.6 | 28% | 25% |
| `AT_ManUS_Nothing_CRM` | 806064620308 | ENABLED | 13 | 0 | 0.00 | 430 | 33.1 | 23.9 | 21.8 | 19.1 | 28% | 20% |
| `PD_5features_Sequences_CRM` | 806064631819 | ENABLED | 13 | 0 | 0.00 | 341 | 94.5 | 56.9 | 49.2 | 45.6 | 40% | 20% |

**Ads in `Keywords_CRM_KW`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 806027358660 | ENABLED | 190 | 0 | 0.00 | 5,757 | 31.4 | 19.0 | 14.7 | 12.0 | 40% | 37% |
| `DL_Stayinglateagain_CRM` | 806027364846 | ENABLED | 51 | 0 | 0.00 | 1,490 | 20.7 | 13.5 | 10.0 | 7.5 | 35% | 44% |
| `PD_5features_Automations_CRM` | 806064591070 | ENABLED | 47 | 0 | 0.00 | 895 | 90.1 | 34.0 | 23.3 | 18.4 | 62% | 46% |
| `DL_Switchto_CRM` | 806027255421 | ENABLED | 42 | 0 | 0.00 | 1,196 | 19.7 | 14.2 | 11.6 | 9.3 | 28% | 35% |
| `AT_Podcast_HateCRM_CRM` | 806064595825 | ENABLED | 35 | 0 | 0.00 | 488 | 25.4 | 17.2 | 13.2 | 12.1 | 32% | 30% |
| `AT_TheMillionaire_Wow_CRM` | 806064631801 | ENABLED | 33 | 0 | 0.00 | 782 | 28.3 | 17.1 | 11.8 | 9.2 | 40% | 46% |
| `CR_Intervention_WeNeed_CRM` | 806027402865 | ENABLED | 30 | 0 | 0.00 | 493 | 24.3 | 16.5 | 12.6 | 10.2 | 32% | 38% |
| `AT_Car_Bestadvice_CRM` | 806064596044 | ENABLED | 19 | 0 | 0.00 | 293 | 33.1 | 18.8 | 15.4 | 12.4 | 43% | 34% |
| `AT_Podcast_BeHonest_CRM` | 806064582850 | ENABLED | 15 | 0 | 0.00 | 180 | 26.2 | 20.4 | 20.4 | 20.4 | 22% | 0% |
| `CR_Intervention_Launch_CRM` | 806064583879 | ENABLED | 14 | 0 | 0.00 | 284 | 20.9 | 13.9 | 11.5 | 9.1 | 34% | 34% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806137610087 | ENABLED | 14 | 0 | 0.00 | 298 | 25.9 | 15.8 | 13.5 | 9.9 | 39% | 37% |
| `CR_Enthusiast_ComStopIt_CRM` | 806064583123 | ENABLED | 12 | 0 | 0.00 | 156 | 27.9 | 12.6 | 8.5 | 5.6 | 55% | 55% |
| `PD_5features_Sequences_CRM` | 806064592942 | ENABLED | 11 | 0 | 0.00 | 108 | 91.0 | 33.3 | 28.8 | 23.7 | 63% | 29% |

**Ads in `Topics_CRM_T`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Podcast_BeHonest_CRM` | 806137672988 | ENABLED | 66 | 0 | 0.00 | 1,388 | 12.9 | 0.0 | 0.0 | 0.0 | 100% | 0% |
| `AT_Podcast_HateCRM_CRM` | 806137610369 | ENABLED | 58 | 0 | 0.00 | 1,092 | 24.2 | 16.7 | 14.1 | 14.1 | 31% | 16% |
| `AT_TheMillionaire_Excuseme_CRM` | 806137672946 | ENABLED | 46 | 0 | 0.00 | 1,340 | 27.8 | 16.5 | 11.9 | 8.5 | 41% | 48% |
| `AT_Car_Bestadvice_CRM` | 806064620386 | ENABLED | 31 | 0 | 0.00 | 570 | 34.5 | 26.9 | 20.6 | 19.3 | 22% | 28% |
| `CR_Intervention_WeNeed_CRM` | 806064680563 | ENABLED | 27 | 0 | 0.00 | 377 | 23.3 | 19.2 | 16.4 | 16.4 | 18% | 14% |
| `AT_ManUS_Nothing_CRM` | 806064680302 | ENABLED | 24 | 10 | 0.42 | 456 | 29.5 | 29.5 | 19.7 | 9.8 | 0% | 67% |
| `CR_Enthusiast_ComIntuitive_CRM` | 806137711607 | ENABLED | 24 | 0 | 0.00 | 323 | 34.0 | 25.9 | 24.4 | 24.4 | 24% | 6% |
| `PD_5features_Sequences_CRM` | 806064680533 | ENABLED | 20 | 0 | 0.00 | 299 | 76.1 | 52.1 | 52.1 | 12.0 | 31% | 77% |
| `AT_Car_Tip_CRM` | 806027413602 | ENABLED | 20 | 0 | 0.00 | 406 | 19.4 | 13.1 | 6.5 | 6.5 | 33% | 50% |
| `PD_5features_Automations_CRM` | 806137610393 | ENABLED | 19 | 0 | 0.00 | 406 | 99.1 | 59.9 | 46.6 | 40.8 | 40% | 32% |
| `DL_Stayinglateagain_CRM` | 806027412894 | ENABLED | 16 | 0 | 0.00 | 579 | 24.1 | 15.9 | 13.3 | 8.2 | 34% | 48% |
| `CR_Enthusiast_ComStopIt_CRM` | 806027375019 | ENABLED | 14 | 0 | 0.00 | 220 | 24.5 | 24.5 | 24.5 | 0.0 | 0% | 100% |
| `DL_Switchto_CRM` | 806064681568 | ENABLED | 13 | 0 | 0.00 | 345 | 20.4 | 17.0 | 14.2 | 10.2 | 17% | 40% |
| `AT_TheMillionaire_Wow_CRM` | 806137674167 | ENABLED | 11 | 0 | 0.00 | 325 | 25.1 | 16.6 | 11.9 | 10.0 | 34% | 40% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 54,393 | 1,031 | 0.02 | 4,876,989 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 11,453 | 250 | 0.02 |
| geoTargetConstants/1007850 | 2,691 | 80 | 0.03 |
| geoTargetConstants/1006524 | 1,292 | 70 | 0.05 |
| geoTargetConstants/1006912 | 854 | 10 | 0.01 |
| geoTargetConstants/1007336 | 502 | 0 | 0.00 |
| geoTargetConstants/1006656 | 476 | 0 | 0.00 |
| geoTargetConstants/1006864 | 438 | 0 | 0.00 |
| geoTargetConstants/1007326 | 374 | 10 | 0.03 |
| geoTargetConstants/1006884 | 371 | 0 | 0.00 |
| geoTargetConstants/1006567 | 352 | 20 | 0.06 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007336 | 502 | 0 | 0.00 |
| geoTargetConstants/1006656 | 476 | 0 | 0.00 |
| geoTargetConstants/1006864 | 438 | 0 | 0.00 |
| geoTargetConstants/1006884 | 371 | 0 | 0.00 |
| geoTargetConstants/9197981 | 315 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-crm-desktop-ron1-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £48,528 | **DEP:** 1,408 | **DEP/Spend:** 0.03
- **Impressions:** 3,667,308 | **Clicks:** 5,515 | **Conversions:** 141
- **All Conversions Value:** 147,878 | **All Conversions:** 21,232
- **Active Months:** 4 (2025-09-01 → 2025-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-09-01 | 14,916 | 405 | 0.03 | 1,317,220 | 1,803 | 40 |
| 2025-10-01 | 20,119 | 592 | 0.03 | 1,280,379 | 2,141 | 59 |
| 2025-11-01 | 2,923 | 60 | 0.02 | 187,138 | 333 | 6 |
| 2025-12-01 | 10,570 | 351 | 0.03 | 882,571 | 1,238 | 35 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | ENABLED | 48,528 | 1,408 | 0.03 | 3,667,308 | 30.3 | 20.1 | 16.4 | 14.0 | 34% | 30% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Wow_CRM` | 774558969023 | ENABLED | 7,765 | 230 | 0.03 | 547,275 | 31.3 | 19.1 | 15.0 | 12.5 | 39% | 35% |
| `AT_TheMillionaire_Excuseme_CRM` | 774558969026 | ENABLED | 7,419 | 344 | 0.05 | 638,876 | 29.8 | 17.5 | 13.7 | 11.3 | 41% | 36% |
| `AT_Podcast_HateCRM_CRM` | 774551147481 | ENABLED | 3,190 | 81 | 0.03 | 233,384 | 25.8 | 18.3 | 14.9 | 12.5 | 29% | 32% |
| `CR_Intervention_Launch_CRM` | 774558969044 | ENABLED | 2,826 | 50 | 0.02 | 182,770 | 22.9 | 16.2 | 13.2 | 10.9 | 29% | 33% |
| `CR_Intervention_WeNeed_CRM` | 774558969041 | ENABLED | 2,788 | 35 | 0.01 | 175,659 | 26.5 | 19.4 | 15.8 | 13.2 | 27% | 32% |
| `DL_Stayinglateagain_CRM` | 774558969035 | ENABLED | 2,783 | 40 | 0.01 | 184,796 | 25.7 | 18.6 | 15.1 | 12.5 | 28% | 33% |
| `AT_Car_Bestadvice_CRM` | 774558969029 | ENABLED | 2,642 | 30 | 0.01 | 224,855 | 37.8 | 23.2 | 19.2 | 16.6 | 39% | 28% |
| `DL_Switchto_CRM` | 774558969038 | ENABLED | 2,624 | 70 | 0.03 | 178,538 | 25.3 | 18.2 | 14.8 | 12.2 | 28% | 33% |
| `DL_Nightmare_Long_CRM` | 774558969020 | ENABLED | 2,606 | 67 | 0.03 | 190,898 | 24.8 | 17.9 | 14.6 | 12.4 | 28% | 31% |
| `PD_AIPodcast_Long_CRM` | 774558969014 | ENABLED | 2,294 | 112 | 0.05 | 190,147 | 28.2 | 19.5 | 15.6 | 13.1 | 31% | 33% |
| `PD_AIPodcast_Short_CRM` | 774558969011 | ENABLED | 2,136 | 35 | 0.02 | 192,400 | 35.6 | 24.3 | 20.8 | 18.4 | 32% | 24% |
| `CR_Enthusiast_StopIt_CRM` | 774558969047 | ENABLED | 2,032 | 100 | 0.05 | 165,130 | 33.8 | 22.3 | 18.7 | 16.8 | 34% | 25% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774558969050 | ENABLED | 1,996 | 56 | 0.03 | 162,833 | 35.2 | 24.1 | 20.6 | 18.6 | 32% | 23% |
| `AT_Car_Tip_CRM` | 774558969032 | ENABLED | 1,547 | 50 | 0.03 | 115,876 | 39.8 | 25.6 | 21.6 | 19.0 | 36% | 26% |
| `AT_Podcast_BeHonest_CRM` | 774679698857 | ENABLED | 1,524 | 30 | 0.02 | 124,616 | 23.9 | 16.7 | 13.6 | 11.4 | 30% | 32% |
| `DL_Nightmare_Short_CRM` | 774558969017 | ENABLED | 1,112 | 28 | 0.02 | 79,325 | 42.6 | 31.6 | 28.2 | 26.0 | 26% | 17% |
| `PD_TheFastWay_Short_CRM` | 774558969056 | ENABLED | 964 | 30 | 0.03 | 66,393 | 41.3 | 32.1 | 28.6 | 26.4 | 22% | 18% |
| `PD_TheFastWay_Long_CRM` | 774558969053 | ENABLED | 280 | 20 | 0.07 | 13,537 | 28.8 | 20.0 | 16.5 | 14.2 | 31% | 29% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 48,528 | 1,408 | 0.03 | 3,667,308 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 10,815 | 320 | 0.03 |
| geoTargetConstants/1007850 | 2,409 | 37 | 0.02 |
| geoTargetConstants/1006524 | 1,276 | 80 | 0.06 |
| geoTargetConstants/1006912 | 653 | 20 | 0.03 |
| geoTargetConstants/1006864 | 447 | 0 | 0.00 |
| geoTargetConstants/1007336 | 430 | 20 | 0.05 |
| geoTargetConstants/1006656 | 425 | 10 | 0.02 |
| geoTargetConstants/1006567 | 351 | 0 | 0.00 |
| geoTargetConstants/1006884 | 349 | 10 | 0.03 |
| geoTargetConstants/9197981 | 340 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006864 | 447 | 0 | 0.00 |
| geoTargetConstants/1006567 | 351 | 0 | 0.00 |
| geoTargetConstants/9197981 | 340 | 0 | 0.00 |
| geoTargetConstants/1007326 | 308 | 0 | 0.00 |
| geoTargetConstants/9198690 | 211 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-service-desktop-trgt1-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £44,854 | **DEP:** 247 | **DEP/Spend:** 0.01
- **Impressions:** 5,882,060 | **Clicks:** 5,157 | **Conversions:** 247
- **All Conversions Value:** 136,571 | **All Conversions:** 21,639
- **Active Months:** 2 (2025-09-01 → 2025-10-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-09-01 | 12,257 | 54 | 0.00 | 1,021,001 | 1,007 | 54 |
| 2025-10-01 | 32,598 | 194 | 0.01 | 4,861,059 | 4,150 | 194 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ServiceComp_KW-MultiAds` | ENABLED | 34,058 | 210 | 0.01 | 5,124,890 | 42.5 | 34.0 | 30.1 | 27.4 | 20% | 19% |
| `ServiceCompBig_CA-MultiAds` | ENABLED | 8,447 | 28 | 0.00 | 635,737 | 42.2 | 33.1 | 29.0 | 26.1 | 22% | 21% |
| `HelpDeskCS_IM-MultiAds` | ENABLED | 1,578 | 3 | 0.00 | 85,108 | 41.2 | 32.2 | 28.3 | 25.7 | 22% | 20% |
| `HelpDesk_KW-MultiAds` | ENABLED | 269 | 3 | 0.01 | 14,913 | 26.4 | 17.9 | 15.0 | 13.0 | 32% | 28% |
| `ServiceComp_SQA-MultiAds` | ENABLED | 215 | 1 | 0.00 | 6,014 | 44.7 | 35.5 | 31.2 | 27.5 | 21% | 22% |
| `MultiService_KW-MultiAds` | ENABLED | 138 | 2 | 0.01 | 7,956 | 21.7 | 14.3 | 11.6 | 9.8 | 34% | 31% |
| `IndustryManufacturing_EM-MultiAds` | ENABLED | 125 | 0 | 0.00 | 6,647 | 39.0 | 30.4 | 26.3 | 23.5 | 22% | 22% |
| `MultiService_SQA-MultiAds` | ENABLED | 22 | 0 | 0.00 | 742 | 39.8 | 30.3 | 25.7 | 22.5 | 24% | 26% |
| `ServiceOther_Tax-MultiAds` | ENABLED | 2 | 0 | 0.00 | 21 | 52.4 | 42.9 | 23.8 | 19.0 | 18% | 56% |
| `TechSupp_T-MultiAds` | ENABLED | 1 | 0 | 0.00 | 30 | 30.0 | 13.3 | 13.3 | 13.3 | 56% | 0% |
| `HelpDeskCS_T-MultiAds` | ENABLED | 0 | 0 | 0.00 | 2 | 0.0 | 0.0 | 0.0 | 0.0 | 0% | 0% |

**Ads in `ServiceComp_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804835 | ENABLED | 25,788 | 144 | 0.01 | 3,749,027 | 44.5 | 36.2 | 32.5 | 29.9 | 19% | 17% |
| `PD_Zen_Long_Service` | 773465804832 | ENABLED | 8,269 | 65 | 0.01 | 1,375,863 | 37.1 | 28.0 | 23.6 | 20.7 | 25% | 26% |

**Ads in `ServiceCompBig_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804853 | ENABLED | 5,774 | 20 | 0.00 | 437,303 | 44.9 | 35.9 | 31.9 | 29.1 | 20% | 19% |
| `PD_Zen_Long_Service` | 773465804850 | ENABLED | 2,673 | 8 | 0.00 | 198,434 | 36.3 | 27.0 | 22.6 | 19.6 | 26% | 28% |

**Ads in `HelpDeskCS_IM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804847 | ENABLED | 1,207 | 1 | 0.00 | 65,303 | 42.3 | 33.2 | 29.4 | 26.9 | 21% | 19% |
| `PD_Zen_Long_Service` | 773465804844 | ENABLED | 372 | 2 | 0.01 | 19,805 | 37.7 | 29.0 | 24.7 | 21.8 | 23% | 25% |

**Ads in `HelpDesk_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773511838066 | ENABLED | 189 | 2 | 0.01 | 9,787 | 28.0 | 19.2 | 16.2 | 14.2 | 31% | 26% |
| `PD_Zen_Long_Service` | 773511838069 | ENABLED | 81 | 1 | 0.01 | 5,126 | 23.3 | 15.6 | 12.8 | 10.7 | 33% | 32% |

**Ads in `ServiceComp_SQA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804799 | ENABLED | 169 | 1 | 0.01 | 4,687 | 45.2 | 36.0 | 32.2 | 28.6 | 20% | 20% |
| `PD_Zen_Long_Service` | 773465804796 | ENABLED | 46 | 0 | 0.00 | 1,327 | 43.3 | 33.7 | 27.7 | 23.8 | 22% | 29% |

**Ads in `MultiService_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804811 | ENABLED | 93 | 1 | 0.01 | 5,331 | 23.0 | 15.1 | 12.3 | 10.4 | 34% | 31% |
| `PD_Zen_Long_Service` | 773465804808 | ENABLED | 44 | 1 | 0.02 | 2,625 | 19.1 | 12.7 | 10.1 | 8.7 | 33% | 32% |

**Ads in `IndustryManufacturing_EM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Zen_Short_Service` | 773465804817 | ENABLED | 91 | 0 | 0.00 | 4,938 | 39.3 | 30.9 | 27.1 | 24.6 | 21% | 20% |
| `PD_Zen_Long_Service` | 773465804814 | ENABLED | 34 | 0 | 0.00 | 1,709 | 38.2 | 28.9 | 24.0 | 20.5 | 24% | 29% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 44,854 | 247 | 0.01 | 5,882,060 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 8,877 | 45 | 0.01 |
| geoTargetConstants/1007850 | 2,070 | 10 | 0.00 |
| geoTargetConstants/1006524 | 974 | 5 | 0.01 |
| geoTargetConstants/1006912 | 607 | 4 | 0.01 |
| geoTargetConstants/1007336 | 404 | 2 | 0.00 |
| geoTargetConstants/1006864 | 394 | 3 | 0.01 |
| geoTargetConstants/1006656 | 371 | 2 | 0.01 |
| geoTargetConstants/1006567 | 349 | 4 | 0.01 |
| geoTargetConstants/1006884 | 317 | 1 | 0.00 |
| geoTargetConstants/1007326 | 312 | 3 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9198013 | 151 | 0 | 0.00 |
| geoTargetConstants/1007293 | 144 | 0 | 0.00 |
| geoTargetConstants/1006668 | 136 | 0 | 0.00 |
| geoTargetConstants/1006984 | 132 | 0 | 0.00 |
| geoTargetConstants/1006897 | 129 | 0 | 0.00 |

---

#### Campaign: `gb-en-brand-multi-ctv-expanded-t-regional_awareness_uk_25q1` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £41,310 | **DEP:** 870 | **DEP/Spend:** 0.02
- **Impressions:** 2,250,575 | **Clicks:** 1,058 | **Conversions:** 87
- **All Conversions Value:** 5,899 | **All Conversions:** 938
- **Active Months:** 2 (2025-02-01 → 2025-03-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-02-01 | 3,389 | 70 | 0.02 | 290,681 | 132 | 7 |
| 2025-03-01 | 37,921 | 800 | 0.02 | 1,959,894 | 926 | 80 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 27,163 | 750 | 0.03 | 1,555,988 | 49.7 | 31.7 | 27.1 | 24.7 | 36% | 22% |
| `IndustryTechnology_EM-inStreamAds` | ENABLED | 8,265 | 70 | 0.01 | 401,084 | 50.0 | 33.7 | 29.4 | 27.2 | 33% | 19% |
| `BusinessProductivitySoftware_IM-InStreamAds` | ENABLED | 3,526 | 40 | 0.01 | 173,674 | 53.5 | 35.6 | 30.9 | 28.4 | 33% | 20% |
| `IndustryFinancial_EM-InStreamAds` | ENABLED | 2,290 | 10 | 0.00 | 117,859 | 52.8 | 36.1 | 31.7 | 29.3 | 32% | 19% |
| `BusinessProductivitySoftware_T-InStreamAds` | ENABLED | 61 | 0 | 0.00 | 1,892 | 45.1 | 26.8 | 21.8 | 19.3 | 41% | 28% |
| `Mgmt_ProjectManagement_T-InStreamAds` | ENABLED | 3 | 0 | 0.00 | 57 | 37.9 | 21.5 | 14.3 | 10.7 | 43% | 50% |
| `BussP_ProjectManagement_T-InStreamAds` | ENABLED | 1 | 0 | 0.00 | 21 | 50.1 | 25.1 | 10.0 | 10.0 | 50% | 60% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659894 | ENABLED | 9,937 | 410 | 0.04 | 574,307 | 59.3 | 36.8 | 32.1 | 29.4 | 38% | 20% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659828 | ENABLED | 9,273 | 200 | 0.02 | 540,610 | 58.3 | 37.7 | 31.8 | 29.3 | 35% | 22% |
| `CR_Llama_Hero60_GB_Brand` | 734276298939 | ENABLED | 7,953 | 140 | 0.02 | 441,071 | 26.6 | 17.5 | 14.6 | 12.8 | 34% | 27% |

**Ads in `IndustryTechnology_EM-inStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_1_Brand` | 733964659648 | ENABLED | 3,107 | 20 | 0.01 | 152,571 | 58.0 | 39.8 | 34.3 | 32.1 | 31% | 19% |
| `CR_Llama_Hero30_GB_2_Brand` | 733964659615 | ENABLED | 2,831 | 10 | 0.00 | 139,370 | 59.2 | 38.9 | 34.7 | 32.2 | 34% | 17% |
| `CR_Llama_Hero60_GB_Brand` | 734276298942 | ENABLED | 2,328 | 40 | 0.02 | 109,143 | 27.0 | 18.3 | 15.5 | 13.7 | 32% | 25% |

**Ads in `BusinessProductivitySoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659900 | ENABLED | 1,341 | 10 | 0.01 | 66,839 | 62.6 | 40.3 | 35.7 | 33.0 | 36% | 18% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659606 | ENABLED | 1,194 | 30 | 0.03 | 59,638 | 61.5 | 41.8 | 35.8 | 33.3 | 32% | 20% |
| `CR_Llama_Hero60_GB_Brand` | 734276298945 | ENABLED | 991 | 0 | 0.00 | 47,197 | 30.1 | 20.8 | 17.7 | 15.8 | 31% | 24% |

**Ads in `IndustryFinancial_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659873 | ENABLED | 888 | 0 | 0.00 | 46,320 | 61.9 | 41.5 | 37.2 | 34.5 | 33% | 17% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659858 | ENABLED | 777 | 10 | 0.01 | 40,708 | 61.0 | 42.8 | 37.2 | 34.8 | 30% | 19% |
| `CR_Llama_Hero60_GB_Brand` | 734276298948 | ENABLED | 626 | 0 | 0.00 | 30,831 | 28.3 | 19.0 | 15.9 | 14.0 | 33% | 26% |

**Ads in `BusinessProductivitySoftware_T-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_1_Brand` | 733964659807 | ENABLED | 22 | 0 | 0.00 | 706 | 54.0 | 33.6 | 27.6 | 24.3 | 38% | 28% |
| `CR_Llama_Hero30_GB_2_Brand` | 733964659636 | ENABLED | 21 | 0 | 0.00 | 646 | 53.0 | 28.7 | 23.8 | 21.1 | 46% | 26% |
| `CR_Llama_Hero60_GB_Brand` | 734276298954 | ENABLED | 19 | 0 | 0.00 | 540 | 23.8 | 15.6 | 11.9 | 10.5 | 34% | 33% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| CONNECTED_TV | 41,310 | 870 | 0.02 | 2,250,575 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 41,192 | 870 | 0.02 |
| geoTargetConstants/9196633 | 91 | 0 | 0.00 |
| geoTargetConstants/9189725 | 27 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 41,192 | 870 | 0.02 |

---

#### Campaign: `gb-en-brand-work_mgmt-multi-trgt-t-cpv-regional_awareness-uk-25q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPV | **Channel Sub-Type:** 
- **Total Spend:** £40,559 | **DEP:** 5,309 | **DEP/Spend:** 0.13
- **Impressions:** 4,645,866 | **Clicks:** 9,749 | **Conversions:** 5,309
- **All Conversions Value:** 90,192 | **All Conversions:** 21,253
- **Active Months:** 2 (2025-10-01 → 2025-11-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-10-01 | 27,543 | 4,178 | 0.15 | 3,198,932 | 6,893 | 4,178 |
| 2025-11-01 | 13,017 | 1,131 | 0.09 | 1,446,934 | 2,856 | 1,131 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 21,991 | 2,927 | 0.13 | 2,743,188 | 70.8 | 58.7 | 50.6 | 46.1 | 17% | 22% |
| `EnterpriseSoftware_IM-InStreamAds` | ENABLED | 12,107 | 1,687 | 0.14 | 1,235,984 | 82.8 | 66.5 | 55.5 | 49.8 | 20% | 25% |
| `BusinessProductivitySoftware_IM-InStreamAds` | ENABLED | 6,461 | 695 | 0.11 | 666,694 | 82.2 | 68.5 | 58.4 | 53.0 | 17% | 23% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_15_uk_25q4` | 778784654837 | ENABLED | 7,717 | 1,008 | 0.13 | 830,528 | 98.8 | 80.9 | 66.7 | 59.3 | 18% | 27% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654057 | ENABLED | 3,136 | 436 | 0.14 | 414,981 | 72.7 | 58.6 | 49.5 | 43.6 | 19% | 26% |
| `BR_sidekick_hero_30ops_uk_25q4` | 778784654597 | ENABLED | 3,108 | 445 | 0.14 | 315,539 | 91.2 | 81.3 | 74.7 | 71.2 | 11% | 12% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784654768 | ENABLED | 1,312 | 160 | 0.12 | 278,367 | 19.6 | 13.2 | 10.8 | 9.7 | 32% | 27% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654111 | ENABLED | 1,272 | 287 | 0.23 | 119,685 | 73.8 | 63.1 | 55.4 | 50.9 | 15% | 19% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654069 | ENABLED | 1,233 | 147 | 0.12 | 121,220 | 90.7 | 80.4 | 74.1 | 70.7 | 11% | 12% |
| `BR_sidekick_hero_30song_uk_25q4` | 778784654570 | ENABLED | 1,086 | 157 | 0.14 | 109,142 | 90.4 | 78.1 | 73.4 | 70.2 | 14% | 10% |
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784654555 | ENABLED | 1,024 | 77 | 0.08 | 220,670 | 18.9 | 12.9 | 10.6 | 9.1 | 31% | 29% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784654864 | ENABLED | 876 | 70 | 0.08 | 172,123 | 25.2 | 19.1 | 16.3 | 14.7 | 24% | 23% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784654540 | ENABLED | 653 | 81 | 0.12 | 64,504 | 90.6 | 80.0 | 73.9 | 70.5 | 12% | 12% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784654630 | ENABLED | 574 | 59 | 0.10 | 96,429 | 37.9 | 31.5 | 27.8 | 25.7 | 17% | 18% |

**Ads in `EnterpriseSoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_15_uk_25q4` | 778784654369 | ENABLED | 5,048 | 647 | 0.13 | 487,294 | 98.4 | 78.4 | 63.0 | 55.4 | 20% | 29% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654603 | ENABLED | 2,655 | 460 | 0.17 | 292,368 | 86.8 | 67.7 | 55.6 | 49.0 | 22% | 28% |
| `BR_sidekick_hero_30ops_uk_25q4` | 778784655080 | ENABLED | 800 | 90 | 0.11 | 67,555 | 88.3 | 76.4 | 69.4 | 65.7 | 13% | 14% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654324 | ENABLED | 789 | 88 | 0.11 | 68,462 | 87.9 | 75.5 | 68.7 | 65.0 | 14% | 14% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654357 | ENABLED | 669 | 145 | 0.22 | 53,971 | 68.4 | 57.2 | 49.2 | 44.8 | 16% | 22% |
| `BR_sidekick_hero_30song_uk_25q4` | 778784654285 | ENABLED | 603 | 73 | 0.12 | 50,861 | 87.6 | 73.1 | 67.7 | 64.2 | 17% | 12% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784654303 | ENABLED | 406 | 38 | 0.09 | 74,350 | 23.2 | 15.7 | 12.9 | 11.6 | 32% | 26% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784655002 | ENABLED | 378 | 41 | 0.11 | 31,557 | 87.1 | 73.7 | 66.8 | 63.4 | 15% | 14% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784654876 | ENABLED | 317 | 44 | 0.14 | 42,662 | 45.8 | 37.4 | 33.3 | 30.6 | 18% | 18% |
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784655089 | ENABLED | 262 | 28 | 0.11 | 42,500 | 31.3 | 24.1 | 20.9 | 19.0 | 23% | 21% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784654081 | ENABLED | 180 | 33 | 0.18 | 24,404 | 45.2 | 36.7 | 32.3 | 29.8 | 19% | 19% |

**Ads in `BusinessProductivitySoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_15_uk_25q4` | 778784654849 | ENABLED | 3,391 | 341 | 0.10 | 325,536 | 98.7 | 81.7 | 67.2 | 59.6 | 17% | 27% |
| `BR_sidekick_hero_30ops_uk_25q4` | 778784654795 | ENABLED | 601 | 61 | 0.10 | 52,295 | 91.2 | 80.9 | 74.5 | 71.0 | 11% | 12% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654330 | ENABLED | 488 | 73 | 0.15 | 61,931 | 76.6 | 61.4 | 51.5 | 45.6 | 20% | 26% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654549 | ENABLED | 429 | 41 | 0.10 | 37,792 | 90.2 | 79.3 | 72.9 | 69.4 | 12% | 12% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654789 | ENABLED | 375 | 57 | 0.15 | 29,805 | 73.0 | 62.0 | 54.5 | 50.2 | 15% | 19% |
| `BR_sidekick_hero_30song_uk_25q4` | 778784655023 | ENABLED | 373 | 47 | 0.13 | 32,392 | 89.9 | 76.5 | 71.7 | 68.5 | 15% | 11% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784654558 | ENABLED | 215 | 18 | 0.08 | 18,754 | 89.7 | 78.6 | 72.5 | 69.4 | 12% | 12% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784655029 | ENABLED | 210 | 19 | 0.09 | 42,800 | 19.8 | 13.2 | 10.8 | 9.7 | 33% | 27% |
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784654282 | ENABLED | 139 | 12 | 0.09 | 25,938 | 24.7 | 18.2 | 15.4 | 13.9 | 26% | 24% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784654327 | ENABLED | 128 | 15 | 0.12 | 22,427 | 33.0 | 25.9 | 22.8 | 20.6 | 22% | 20% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784654342 | ENABLED | 112 | 10 | 0.09 | 17,024 | 43.3 | 36.3 | 32.0 | 29.8 | 16% | 18% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 30,995 | 5,011 | 0.16 | 3,891,018 |
| DESKTOP | 9,565 | 298 | 0.03 | 754,848 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 10,600 | 1,563 | 0.15 |
| geoTargetConstants/1006524 | 1,301 | 211 | 0.16 |
| geoTargetConstants/1006864 | 615 | 95 | 0.15 |
| geoTargetConstants/1006912 | 494 | 78 | 0.16 |
| geoTargetConstants/1007326 | 448 | 55 | 0.12 |
| geoTargetConstants/1007336 | 441 | 55 | 0.13 |
| geoTargetConstants/1006656 | 343 | 45 | 0.13 |
| geoTargetConstants/1006567 | 312 | 36 | 0.12 |
| geoTargetConstants/1006884 | 297 | 36 | 0.12 |
| geoTargetConstants/1007064 | 268 | 52 | 0.19 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007274 | 145 | 12 | 0.08 |
| geoTargetConstants/1006816 | 121 | 13 | 0.11 |
| geoTargetConstants/9198013 | 110 | 12 | 0.11 |
| geoTargetConstants/1006964 | 125 | 14 | 0.11 |
| geoTargetConstants/1006668 | 114 | 13 | 0.11 |

---

#### Campaign: `gb-en-brand-work_mgmt-multi-trgt-t-cpm-regional_awareness-uk-25q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £37,777 | **DEP:** 2,195 | **DEP/Spend:** 0.06
- **Impressions:** 10,471,607 | **Clicks:** 12,419 | **Conversions:** 2,195
- **All Conversions Value:** 53,899 | **All Conversions:** 10,617
- **Active Months:** 2 (2025-10-01 → 2025-11-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-10-01 | 27,539 | 1,665 | 0.06 | 7,401,921 | 9,067 | 1,665 |
| 2025-11-01 | 10,238 | 531 | 0.05 | 3,069,686 | 3,352 | 531 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 21,654 | 1,257 | 0.06 | 6,815,698 | 13.3 | 6.6 | 4.8 | 4.0 | 50% | 39% |
| `BusinessProductivitySoftware_IM-InStreamAds` | ENABLED | 8,671 | 461 | 0.05 | 1,864,870 | 25.4 | 12.9 | 9.4 | 7.9 | 49% | 39% |
| `EnterpriseSoftware_IM-InStreamAds` | ENABLED | 7,452 | 478 | 0.06 | 1,791,039 | 23.8 | 12.1 | 8.9 | 7.5 | 49% | 38% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784654798 | ENABLED | 2,695 | 134 | 0.05 | 1,295,654 | 2.5 | 1.1 | 0.7 | 0.6 | 58% | 49% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654084 | ENABLED | 2,459 | 138 | 0.06 | 990,140 | 7.3 | 3.0 | 1.9 | 1.1 | 60% | 61% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784654384 | ENABLED | 2,299 | 132 | 0.06 | 1,077,164 | 2.9 | 1.3 | 1.0 | 0.8 | 54% | 42% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784654306 | ENABLED | 2,268 | 164 | 0.07 | 1,070,751 | 2.8 | 1.2 | 0.9 | 0.7 | 56% | 43% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784654138 | ENABLED | 2,242 | 131 | 0.06 | 1,053,921 | 2.8 | 1.3 | 0.9 | 0.8 | 53% | 41% |
| `BR_sidekick_hero_30ops_uk_25q4` | 778784655053 | ENABLED | 1,974 | 126 | 0.06 | 274,318 | 51.4 | 26.8 | 21.0 | 18.6 | 48% | 31% |
| `BR_sidekick_hero_15_uk_25q4` | 778784654387 | ENABLED | 1,711 | 85 | 0.05 | 231,690 | 94.9 | 49.0 | 30.0 | 23.4 | 48% | 52% |
| `BR_sidekick_hero_30song_uk_25q4` | 778784654108 | ENABLED | 1,693 | 91 | 0.05 | 237,019 | 50.5 | 25.8 | 21.4 | 19.3 | 49% | 25% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654378 | ENABLED | 1,543 | 87 | 0.06 | 214,104 | 50.9 | 26.0 | 20.4 | 18.1 | 49% | 30% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654585 | ENABLED | 1,392 | 88 | 0.06 | 181,771 | 15.6 | 8.3 | 5.7 | 4.5 | 47% | 45% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784654159 | ENABLED | 1,378 | 80 | 0.06 | 189,166 | 50.7 | 25.8 | 20.3 | 18.0 | 49% | 30% |

**Ads in `BusinessProductivitySoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_30song_uk_25q4` | 778784654633 | ENABLED | 1,126 | 63 | 0.06 | 148,530 | 51.9 | 25.7 | 20.9 | 18.7 | 50% | 27% |
| `BR_sidekick_hero_30ops_uk_25q4` | 778784655035 | ENABLED | 1,111 | 69 | 0.06 | 146,925 | 53.4 | 27.9 | 21.8 | 19.3 | 48% | 31% |
| `BR_sidekick_hero_15_uk_25q4` | 778784654072 | ENABLED | 1,006 | 51 | 0.05 | 130,934 | 94.2 | 51.3 | 31.4 | 24.1 | 45% | 53% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654621 | ENABLED | 952 | 57 | 0.06 | 125,113 | 51.9 | 25.7 | 19.8 | 17.4 | 50% | 32% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654123 | ENABLED | 888 | 36 | 0.04 | 111,923 | 16.7 | 9.1 | 6.4 | 5.2 | 46% | 43% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784655071 | ENABLED | 878 | 49 | 0.06 | 114,301 | 51.7 | 25.3 | 19.4 | 16.9 | 51% | 33% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654399 | ENABLED | 657 | 29 | 0.04 | 231,350 | 9.8 | 4.0 | 2.5 | 1.6 | 59% | 59% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784654807 | ENABLED | 637 | 32 | 0.05 | 282,305 | 3.2 | 1.4 | 1.0 | 0.8 | 56% | 42% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784654867 | ENABLED | 486 | 24 | 0.05 | 195,606 | 4.3 | 2.1 | 1.6 | 1.4 | 50% | 37% |
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784654345 | ENABLED | 473 | 22 | 0.05 | 193,961 | 3.8 | 1.7 | 1.3 | 1.0 | 54% | 40% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784654594 | ENABLED | 457 | 28 | 0.06 | 183,922 | 4.2 | 2.1 | 1.5 | 1.3 | 51% | 39% |

**Ads in `EnterpriseSoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_30ops_uk_25q4` | 778784654843 | ENABLED | 1,254 | 70 | 0.06 | 175,771 | 51.6 | 26.3 | 20.2 | 17.7 | 49% | 33% |
| `BR_sidekick_hero_30sales_uk_25q4` | 778784655065 | ENABLED | 1,014 | 64 | 0.06 | 139,430 | 49.1 | 23.1 | 17.4 | 15.0 | 53% | 35% |
| `BR_sidekick_hero_30song_uk_25q4` | 778784654561 | ENABLED | 743 | 50 | 0.07 | 107,556 | 51.1 | 26.4 | 21.5 | 19.2 | 48% | 27% |
| `BR_sidekick_hero_30marketing_uk_25q4` | 778784654870 | ENABLED | 689 | 53 | 0.08 | 98,949 | 50.8 | 26.1 | 20.5 | 18.1 | 49% | 31% |
| `BR_sidekick_hero_15_uk_25q4` | 778784655041 | ENABLED | 686 | 31 | 0.05 | 98,481 | 94.1 | 50.3 | 31.7 | 24.6 | 47% | 51% |
| `BR_sidekick_hero_15_uk_25q4_9x16` | 778784654831 | ENABLED | 629 | 34 | 0.05 | 253,328 | 9.5 | 4.1 | 2.7 | 1.8 | 57% | 56% |
| `BR_sidekick_hero_30song_uk_25q4_9x16` | 778784654576 | ENABLED | 609 | 59 | 0.10 | 297,361 | 3.4 | 1.5 | 1.1 | 0.9 | 54% | 40% |
| `BR_sidekick_hero_70_uk_25q4` | 778784654813 | ENABLED | 581 | 39 | 0.07 | 80,074 | 16.2 | 8.9 | 6.3 | 5.0 | 45% | 43% |
| `BR_sidekick_hero_30sales_uk_25q4_9x16` | 778784654291 | ENABLED | 455 | 34 | 0.07 | 201,488 | 3.9 | 2.0 | 1.5 | 1.3 | 49% | 35% |
| `BR_sidekick_hero_30marketing_uk_25q4_9x1` | 778784655044 | ENABLED | 401 | 22 | 0.06 | 172,253 | 4.6 | 2.6 | 2.0 | 1.8 | 44% | 31% |
| `BR_sidekick_hero_30ops_uk_25q4_9x16` | 778784655059 | ENABLED | 390 | 23 | 0.06 | 166,348 | 4.5 | 2.5 | 2.0 | 1.7 | 44% | 33% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 22,768 | 762 | 0.03 | 2,969,010 |
| MOBILE | 15,009 | 1,433 | 0.10 | 7,502,597 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 7,346 | 455 | 0.06 |
| geoTargetConstants/1006524 | 854 | 56 | 0.07 |
| geoTargetConstants/1007336 | 426 | 17 | 0.04 |
| geoTargetConstants/1006912 | 411 | 32 | 0.08 |
| geoTargetConstants/1007326 | 393 | 24 | 0.06 |
| geoTargetConstants/1006864 | 392 | 26 | 0.07 |
| geoTargetConstants/1006567 | 305 | 16 | 0.05 |
| geoTargetConstants/1006884 | 267 | 11 | 0.04 |
| geoTargetConstants/1006656 | 257 | 14 | 0.05 |
| geoTargetConstants/1007064 | 221 | 18 | 0.08 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007043 | 118 | 2 | 0.02 |
| geoTargetConstants/1007121 | 123 | 3 | 0.02 |
| geoTargetConstants/1006964 | 110 | 3 | 0.03 |
| geoTargetConstants/1007336 | 426 | 17 | 0.04 |
| geoTargetConstants/1006965 | 103 | 4 | 0.04 |

---

#### Campaign: `gb-en-prm-crm-desktop-lookalike-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £37,333 | **DEP:** 1,130 | **DEP/Spend:** 0.03
- **Impressions:** 2,894,214 | **Clicks:** 3,922 | **Conversions:** 113
- **All Conversions Value:** 124,302 | **All Conversions:** 18,002
- **Active Months:** 8 (2025-03-01 → 2025-10-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-03-01 | 4,618 | 280 | 0.06 | 263,537 | 245 | 28 |
| 2025-04-01 | 172 | 0 | 0.00 | 7,736 | 10 | 0 |
| 2025-05-01 | 353 | 0 | 0.00 | 20,220 | 17 | 0 |
| 2025-06-01 | 180 | 10 | 0.06 | 9,979 | 27 | 1 |
| 2025-07-01 | 8,104 | 200 | 0.02 | 358,936 | 396 | 20 |
| 2025-08-01 | 10,678 | 330 | 0.03 | 826,261 | 1,089 | 33 |
| 2025-09-01 | 4,569 | 110 | 0.02 | 375,650 | 552 | 11 |
| 2025-10-01 | 8,658 | 200 | 0.02 | 1,031,895 | 1,586 | 20 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CRMInstalls_DG-MultiAds` | ENABLED | 28,835 | 919 | 0.03 | 2,299,693 | 30.4 | 19.5 | 15.7 | 13.3 | 36% | 32% |
| `CRMPayers_DG-MultiAds` | ENABLED | 8,498 | 211 | 0.02 | 594,521 | 35.6 | 25.2 | 21.3 | 18.8 | 29% | 25% |

**Ads in `CRMInstalls_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 751026263943 | ENABLED | 5,925 | 175 | 0.03 | 412,039 | 25.1 | 16.5 | 12.9 | 10.6 | 34% | 36% |
| `DL_Nightmare_Long_CRM` | 765080211772 | ENABLED | 4,328 | 100 | 0.02 | 250,284 | 22.7 | 15.8 | 12.7 | 10.5 | 30% | 34% |
| `PD_AIPodcast_Short_CRM` | 751026263979 | ENABLED | 3,518 | 90 | 0.03 | 290,527 | 30.8 | 19.4 | 15.8 | 13.5 | 37% | 31% |
| `CR_President_ShortNo_CRM` | 751026263964 | PAUSED | 2,417 | 30 | 0.01 | 183,755 | 32.4 | 20.0 | 15.9 | 13.4 | 38% | 33% |
| `PD_POV_Dashboard_CRM` | 751026263967 | ENABLED | 1,563 | 35 | 0.02 | 299,742 | 94.0 | 35.5 | 24.2 | 19.6 | 62% | 45% |
| `DL_Nightmare_Short_CRM` | 765080146306 | ENABLED | 1,413 | 60 | 0.04 | 87,698 | 34.7 | 23.4 | 19.8 | 17.4 | 33% | 26% |
| `CR_President_All_CRM` | 736016048613 | REMOVED | 1,224 | 60 | 0.05 | 60,297 | 22.9 | 14.7 | 11.5 | 9.6 | 36% | 35% |
| `AT_WomanUS_TimeIsMoney_CRM` | 751026263952 | ENABLED | 1,121 | 80 | 0.07 | 84,681 | 32.5 | 21.6 | 17.9 | 15.5 | 33% | 28% |
| `PD_TheFastWay_Short_CRM` | 753056188689 | ENABLED | 988 | 20 | 0.02 | 60,964 | 35.8 | 25.9 | 21.9 | 19.3 | 28% | 25% |
| `PD_3Reasons_Team_CRM` | 751026263958 | ENABLED | 887 | 40 | 0.05 | 114,538 | 26.8 | 18.7 | 15.0 | 12.6 | 30% | 33% |
| `PD_WomanPink_Face_CRM` | 751026263937 | ENABLED | 866 | 20 | 0.02 | 76,626 | 32.0 | 21.8 | 17.9 | 15.5 | 32% | 29% |
| `PD_Yuval_All_CRM` | 736016048625 | REMOVED | 609 | 20 | 0.03 | 36,900 | 30.9 | 22.8 | 19.1 | 16.6 | 26% | 27% |
| `CR_President_Long_CRM` | 751026263946 | PAUSED | 512 | 30 | 0.06 | 23,783 | 24.9 | 17.4 | 13.8 | 11.8 | 30% | 32% |
| `PD_ActuallyLikeIt_All_CRM` | 736016048619 | REMOVED | 503 | 40 | 0.08 | 30,149 | 34.8 | 23.4 | 19.2 | 16.6 | 33% | 29% |
| `CR_President_Short_CRM` | 751026263961 | PAUSED | 480 | 20 | 0.04 | 37,913 | 34.9 | 23.1 | 19.3 | 17.1 | 34% | 26% |
| `PD_TheFastWay_Long_CRM` | 753056188692 | ENABLED | 343 | 20 | 0.06 | 60,621 | 27.4 | 19.2 | 15.3 | 12.8 | 30% | 33% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 751026263976 | PAUSED | 311 | 0 | 0.00 | 19,125 | 40.8 | 30.2 | 25.7 | 23.2 | 26% | 23% |
| `AT_WomanUS_Team_CRM` | 751026263955 | ENABLED | 297 | 0 | 0.00 | 34,303 | 38.9 | 28.0 | 23.7 | 21.4 | 28% | 24% |
| `AT_Realestate_Short_CRM` | 751026263970 | ENABLED | 285 | 9 | 0.03 | 37,486 | 28.8 | 20.3 | 16.0 | 13.7 | 29% | 33% |
| `UT_Finance_All_CRM` | 736016048616 | REMOVED | 255 | 30 | 0.12 | 15,801 | 30.3 | 21.5 | 17.7 | 15.0 | 29% | 31% |
| `PD_3Reasons_All_CRM` | 736016048610 | REMOVED | 218 | 10 | 0.05 | 15,636 | 32.2 | 24.2 | 19.9 | 17.1 | 25% | 29% |
| `PD_Yuval_Formula_CRM` | 751026263940 | PAUSED | 201 | 0 | 0.00 | 11,247 | 38.7 | 30.6 | 27.4 | 25.0 | 21% | 18% |
| `PD_WomanPink_Platform_CRM` | 751026263973 | PAUSED | 166 | 0 | 0.00 | 10,625 | 38.1 | 27.8 | 23.7 | 21.3 | 27% | 23% |
| `UT_FinanceJoke_CRM` | 751026263949 | ENABLED | 153 | 10 | 0.07 | 14,800 | 30.9 | 21.7 | 17.5 | 15.2 | 30% | 30% |
| `AT_Realestate_All_CRM` | 736016048607 | REMOVED | 102 | 10 | 0.10 | 6,961 | 37.4 | 28.9 | 24.6 | 21.4 | 23% | 26% |
| `PD_POV_All_CRM` | 736016048622 | REMOVED | 95 | 0 | 0.00 | 19,762 | 93.6 | 43.6 | 34.1 | 29.7 | 53% | 32% |
| `PD_WomanPink_All_CRM` | 736016048628 | REMOVED | 56 | 10 | 0.18 | 3,430 | 33.5 | 23.5 | 19.3 | 16.6 | 30% | 29% |

**Ads in `CRMPayers_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 751026263898 | ENABLED | 1,247 | 30 | 0.02 | 78,339 | 29.2 | 20.3 | 16.3 | 13.6 | 30% | 33% |
| `DL_Nightmare_Long_CRM` | 765080211769 | ENABLED | 991 | 0 | 0.00 | 68,987 | 24.2 | 17.5 | 14.4 | 12.3 | 27% | 30% |
| `PD_AIPodcast_Short_CRM` | 751026263934 | ENABLED | 842 | 30 | 0.04 | 70,776 | 36.8 | 25.5 | 21.8 | 19.3 | 31% | 24% |
| `CR_President_All_CRM` | 736016048589 | REMOVED | 669 | 20 | 0.03 | 26,052 | 25.6 | 17.2 | 13.8 | 11.7 | 33% | 32% |
| `DL_Nightmare_Short_CRM` | 765080146303 | ENABLED | 518 | 0 | 0.00 | 32,318 | 39.7 | 28.8 | 25.3 | 22.9 | 27% | 21% |
| `CR_President_ShortNo_CRM` | 751026263919 | PAUSED | 516 | 0 | 0.00 | 35,029 | 38.3 | 26.2 | 22.1 | 19.5 | 32% | 25% |
| `PD_TheFastWay_Short_CRM` | 753056188683 | ENABLED | 456 | 30 | 0.07 | 25,778 | 42.8 | 33.4 | 29.5 | 27.0 | 22% | 19% |
| `PD_POV_Dashboard_CRM` | 751026263922 | ENABLED | 373 | 10 | 0.03 | 54,146 | 94.7 | 45.1 | 34.1 | 30.0 | 52% | 33% |
| `PD_Yuval_All_CRM` | 736016048601 | REMOVED | 334 | 10 | 0.03 | 17,116 | 33.3 | 25.0 | 21.4 | 18.6 | 25% | 25% |
| `PD_ActuallyLikeIt_All_CRM` | 736016048595 | REMOVED | 298 | 30 | 0.10 | 13,548 | 37.5 | 26.2 | 22.1 | 19.5 | 30% | 26% |
| `AT_WomanUS_TimeIsMoney_CRM` | 751026263907 | ENABLED | 277 | 0 | 0.00 | 23,195 | 40.2 | 29.8 | 26.3 | 23.8 | 26% | 20% |
| `PD_WomanPink_Face_CRM` | 751026263892 | ENABLED | 262 | 0 | 0.00 | 20,828 | 37.9 | 28.1 | 24.0 | 21.7 | 26% | 23% |
| `PD_3Reasons_Team_CRM` | 751026263913 | ENABLED | 236 | 0 | 0.00 | 28,815 | 28.9 | 20.7 | 17.1 | 14.6 | 28% | 30% |
| `CR_President_Long_CRM` | 751026263901 | PAUSED | 232 | 0 | 0.00 | 10,093 | 31.0 | 21.9 | 17.6 | 15.3 | 29% | 30% |
| `CR_President_Short_CRM` | 751026263916 | PAUSED | 170 | 0 | 0.00 | 8,694 | 44.4 | 32.7 | 28.9 | 26.3 | 26% | 20% |
| `UT_Finance_All_CRM` | 736016048592 | REMOVED | 157 | 0 | 0.00 | 7,585 | 31.7 | 22.9 | 18.9 | 16.3 | 28% | 29% |
| `PD_3Reasons_All_CRM` | 736016048586 | REMOVED | 152 | 30 | 0.20 | 9,953 | 33.9 | 25.5 | 21.5 | 18.6 | 25% | 27% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 751026263931 | PAUSED | 144 | 0 | 0.00 | 7,948 | 51.0 | 41.3 | 37.1 | 34.3 | 19% | 17% |
| `PD_TheFastWay_Long_CRM` | 753056188686 | ENABLED | 115 | 0 | 0.00 | 14,974 | 33.7 | 25.8 | 22.0 | 19.6 | 24% | 24% |
| `AT_WomanUS_Team_CRM` | 751026263910 | ENABLED | 100 | 10 | 0.10 | 7,997 | 57.2 | 47.2 | 43.7 | 40.6 | 17% | 14% |
| `PD_Yuval_Formula_CRM` | 751026263895 | PAUSED | 81 | 0 | 0.00 | 4,677 | 54.5 | 46.8 | 43.3 | 40.4 | 14% | 14% |
| `UT_FinanceJoke_CRM` | 751026263904 | ENABLED | 73 | 0 | 0.00 | 9,824 | 34.5 | 25.8 | 22.0 | 19.7 | 25% | 24% |
| `AT_Realestate_Short_CRM` | 751026263925 | ENABLED | 68 | 0 | 0.00 | 5,538 | 34.0 | 24.5 | 20.3 | 17.7 | 28% | 28% |
| `PD_WomanPink_Platform_CRM` | 751026263928 | PAUSED | 67 | 0 | 0.00 | 4,228 | 50.6 | 40.8 | 36.8 | 33.7 | 19% | 17% |
| `AT_Realestate_All_CRM` | 736016048583 | REMOVED | 53 | 0 | 0.00 | 2,612 | 38.5 | 30.0 | 25.3 | 22.6 | 22% | 25% |
| `PD_POV_All_CRM` | 736016048598 | REMOVED | 34 | 0 | 0.00 | 4,009 | 93.6 | 42.4 | 34.0 | 30.0 | 55% | 29% |
| `PD_WomanPink_All_CRM` | 736016048604 | REMOVED | 33 | 10 | 0.31 | 1,462 | 40.5 | 31.9 | 27.9 | 24.7 | 21% | 23% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 37,333 | 1,130 | 0.03 | 2,894,214 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 9,125 | 300 | 0.03 |
| geoTargetConstants/1006524 | 972 | 40 | 0.04 |
| geoTargetConstants/1006912 | 604 | 20 | 0.03 |
| geoTargetConstants/1006656 | 443 | 10 | 0.02 |
| geoTargetConstants/1007336 | 417 | 20 | 0.05 |
| geoTargetConstants/1006864 | 360 | 30 | 0.08 |
| geoTargetConstants/1007850 | 357 | 10 | 0.03 |
| geoTargetConstants/1006567 | 331 | 0 | 0.00 |
| geoTargetConstants/9197981 | 307 | 10 | 0.03 |
| geoTargetConstants/1006884 | 306 | 10 | 0.03 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006567 | 331 | 0 | 0.00 |
| geoTargetConstants/1007064 | 238 | 0 | 0.00 |
| geoTargetConstants/9198690 | 210 | 0 | 0.00 |
| geoTargetConstants/1006948 | 202 | 0 | 0.00 |
| geoTargetConstants/1006867 | 199 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-trgt_monday-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £36,709 | **DEP:** 1,660 | **DEP/Spend:** 0.05
- **Impressions:** 675,079 | **Clicks:** 703 | **Conversions:** 166
- **All Conversions Value:** 78,393 | **All Conversions:** 5,690
- **Active Months:** 9 (2024-05-01 → 2025-01-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 8,843 | 350 | 0.04 | 197,632 | 109 | 35 |
| 2024-06-01 | 4,541 | 180 | 0.04 | 75,234 | 33 | 18 |
| 2024-07-01 | 4,952 | 150 | 0.03 | 66,678 | 64 | 15 |
| 2024-08-01 | 4,740 | 240 | 0.05 | 59,174 | 121 | 24 |
| 2024-09-01 | 3,547 | 170 | 0.05 | 63,908 | 88 | 17 |
| 2024-10-01 | 3,554 | 160 | 0.05 | 65,299 | 96 | 16 |
| 2024-11-01 | 3,133 | 220 | 0.07 | 62,853 | 87 | 22 |
| 2024-12-01 | 2,616 | 170 | 0.06 | 67,121 | 88 | 17 |
| 2025-01-01 | 782 | 20 | 0.03 | 17,180 | 17 | 2 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `mondayProjectManagement_S-MultiAds` | ENABLED | 31,063 | 1,320 | 0.04 | 589,737 | 24.5 | 12.6 | 9.4 | 7.0 | 49% | 44% |
| `mondayProjectManagement_KW-MultiAds` | ENABLED | 5,645 | 340 | 0.06 | 85,342 | 34.7 | 20.1 | 15.6 | 12.6 | 42% | 37% |

**Ads in `mondayProjectManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_ArtOfWork_Customize` | 704564166436 | PAUSED | 6,204 | 260 | 0.04 | 38,777 | 14.8 | 9.0 | 6.5 | 4.6 | 39% | 49% |
| `PD_WorkOS_Long` | 686100294210 | PAUSED | 5,240 | 180 | 0.03 | 166,615 | 20.8 | 12.4 | 10.0 | 8.4 | 41% | 32% |
| `PD_Dialogue_Long` | 683514805095 | PAUSED | 4,818 | 210 | 0.04 | 66,095 | 16.1 | 9.9 | 7.3 | 5.2 | 39% | 48% |
| `PD_WorkOS_21sec_UK` | 686100294201 | PAUSED | 4,405 | 190 | 0.04 | 125,634 | 71.9 | 25.3 | 17.9 | 14.4 | 65% | 43% |
| `PD_WorkOS_21sec` | 686100294219 | PAUSED | 2,210 | 110 | 0.05 | 93,304 | 78.4 | 26.1 | 18.9 | 14.2 | 67% | 45% |
| `AT_Shmuel_NewSplit` | 698250741514 | PAUSED | 1,696 | 30 | 0.02 | 11,990 | 32.7 | 16.8 | 12.7 | 9.5 | 48% | 43% |
| `PD_TikToker_HackW` | 701554802296 | PAUSED | 1,341 | 130 | 0.10 | 11,089 | 24.9 | 14.2 | 11.2 | 8.7 | 43% | 39% |
| `PD_TikToker_HackM` | 701554802800 | PAUSED | 966 | 20 | 0.02 | 9,415 | 20.5 | 11.5 | 9.2 | 6.1 | 44% | 47% |
| `CR_MakesSense_Short` | 723034279355 | ENABLED | 717 | 30 | 0.04 | 5,329 | 23.9 | 12.6 | 9.7 | 7.5 | 47% | 41% |
| `PD_ArtOfWork_Flexibility` | 704564166874 | PAUSED | 464 | 30 | 0.06 | 2,787 | 16.1 | 9.8 | 7.9 | 6.0 | 39% | 38% |
| `PD_YesBut_DeliverWW` | 680474229108 | PAUSED | 426 | 0 | 0.00 | 6,873 | 20.2 | 14.1 | 11.2 | 9.4 | 30% | 34% |
| `PD_WorkOS_Long_UK` | 686100294192 | PAUSED | 383 | 10 | 0.03 | 15,713 | 24.1 | 15.8 | 11.5 | 10.3 | 34% | 35% |
| `PD_Linear_Actress` | 694233634511 | PAUSED | 348 | 10 | 0.03 | 3,015 | 20.8 | 12.9 | 10.3 | 7.9 | 38% | 39% |
| `UT_SOH_Flexibility` | 689999114294 | PAUSED | 283 | 40 | 0.14 | 2,021 | 29.3 | 15.8 | 11.6 | 9.2 | 46% | 42% |
| `PD_TikToker_GoodNewsW` | 701554800430 | PAUSED | 206 | 30 | 0.15 | 1,050 | 24.0 | 13.7 | 10.9 | 8.5 | 43% | 38% |
| `PD_Linear_Group` | 694233634223 | PAUSED | 188 | 0 | 0.00 | 2,690 | 23.2 | 15.6 | 12.0 | 9.8 | 33% | 37% |
| `EfficiencyProductDemoTeams` | 639296169283 | PAUSED | 151 | 0 | 0.00 | 1,743 | 26.0 | 14.7 | 10.5 | 6.8 | 43% | 54% |
| `CR_MakesSense_Long` | 723034279598 | PAUSED | 148 | 0 | 0.00 | 2,758 | 16.1 | 10.7 | 8.1 | 6.9 | 33% | 36% |
| `PD_TikToker_GoodNewsM` | 701554800472 | PAUSED | 117 | 0 | 0.00 | 2,940 | 23.2 | 13.1 | 11.7 | 7.4 | 44% | 43% |
| `PD_Reports_woman` | 706690849632 | PAUSED | 71 | 0 | 0.00 | 1,335 | 12.4 | 6.2 | 4.6 | 2.7 | 50% | 56% |
| `PD_YesBut_GoodAtWW` | 680474229279 | PAUSED | 68 | 0 | 0.00 | 2,719 | 21.6 | 13.9 | 9.7 | 7.3 | 36% | 48% |
| `PD_Dots_UK` | 694328003418 | PAUSED | 63 | 0 | 0.00 | 1,985 | 89.9 | 22.7 | 16.4 | 11.3 | 75% | 50% |
| `PD_YesBut_DeliverBritishRU` | 671499021801 | PAUSED | 59 | 0 | 0.00 | 1,661 | 21.0 | 9.8 | 8.7 | 5.1 | 54% | 48% |
| `AllConnectedOnePlace` | 660333415566 | PAUSED | 58 | 0 | 0.00 | 1,535 | 18.9 | 11.9 | 10.3 | 8.2 | 37% | 31% |
| `PD_YesBut_GoodAtMW` | 680474229306 | PAUSED | 56 | 0 | 0.00 | 1,178 | 25.8 | 16.5 | 12.5 | 11.4 | 36% | 31% |
| `UT_Frank_Mix` | 675135937159 | PAUSED | 52 | 0 | 0.00 | 1,356 | 24.0 | 14.9 | 10.5 | 7.7 | 38% | 48% |
| `UT_Frank_Client` | 675135937594 | PAUSED | 48 | 0 | 0.00 | 1,350 | 15.2 | 9.5 | 6.4 | 4.4 | 38% | 54% |
| `CR_HiGoogie` | 677777097311 | PAUSED | 48 | 0 | 0.00 | 867 | 35.1 | 20.1 | 15.2 | 11.1 | 43% | 45% |
| `AT_Shmuel_ShortRegular` | 698964744933 | PAUSED | 47 | 0 | 0.00 | 931 | 55.8 | 19.9 | 15.1 | 10.5 | 64% | 47% |
| `AT_Shmuel_NewRegular` | 698250741565 | PAUSED | 47 | 20 | 0.43 | 1,205 | 34.5 | 15.9 | 9.8 | 8.0 | 54% | 50% |
| `AT_Shmuel_ShortSplit` | 698964745596 | PAUSED | 44 | 0 | 0.00 | 929 | 52.2 | 17.1 | 12.9 | 8.7 | 67% | 49% |
| `PD_YesBut_DeliverMM` | 671185832812 | PAUSED | 43 | 0 | 0.00 | 1,387 | 20.4 | 13.4 | 10.8 | 6.7 | 34% | 50% |
| `UT_SOH_Collaboration` | 689999115029 | PAUSED | 26 | 10 | 0.39 | 691 | 15.6 | 10.2 | 6.6 | 5.7 | 35% | 44% |
| `PD_Reports_VO` | 706690849656 | PAUSED | 17 | 10 | 0.60 | 533 | 19.3 | 12.4 | 10.6 | 4.2 | 36% | 66% |

**Ads in `mondayProjectManagement_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec_UK` | 686100294204 | PAUSED | 1,644 | 140 | 0.09 | 4,182 | 74.4 | 30.6 | 22.8 | 17.6 | 59% | 43% |
| `AT_Shmuel_NewSplit` | 698250741340 | PAUSED | 877 | 10 | 0.01 | 36,437 | 37.8 | 21.3 | 16.4 | 13.3 | 43% | 38% |
| `PD_ArtOfWork_Customize` | 704564166625 | PAUSED | 749 | 70 | 0.09 | 13,683 | 20.2 | 13.5 | 10.1 | 7.9 | 33% | 42% |
| `PD_TikToker_HackW` | 701554800886 | PAUSED | 483 | 60 | 0.12 | 4,292 | 31.7 | 19.3 | 15.4 | 10.8 | 39% | 44% |
| `PD_WorkOS_Long` | 686100293985 | PAUSED | 289 | 0 | 0.00 | 5,868 | 29.0 | 19.3 | 15.4 | 12.6 | 34% | 34% |
| `PD_TikToker_HackM` | 701554802152 | PAUSED | 200 | 10 | 0.05 | 703 | 28.0 | 19.4 | 16.2 | 10.8 | 31% | 44% |
| `PD_WorkOS_21sec` | 686100294159 | PAUSED | 167 | 0 | 0.00 | 1,057 | 92.7 | 42.2 | 34.2 | 29.6 | 54% | 30% |
| `CR_MakesSense_Short` | 723034279646 | ENABLED | 165 | 10 | 0.06 | 2,440 | 32.0 | 18.3 | 14.8 | 11.8 | 43% | 36% |
| `PD_Linear_Actress` | 694233634685 | PAUSED | 150 | 0 | 0.00 | 1,497 | 25.8 | 18.1 | 13.9 | 11.6 | 30% | 36% |
| `PD_ArtOfWork_Flexibility` | 704564166883 | PAUSED | 141 | 0 | 0.00 | 685 | 16.1 | 10.5 | 8.0 | 5.3 | 35% | 49% |
| `UT_Frank_Mix` | 675135937156 | PAUSED | 119 | 10 | 0.08 | 445 | 36.5 | 23.3 | 19.0 | 16.6 | 36% | 29% |
| `PD_Linear_Group` | 694233634292 | PAUSED | 87 | 0 | 0.00 | 1,560 | 29.1 | 20.1 | 16.7 | 14.5 | 31% | 28% |
| `UT_SOH_Flexibility` | 689999115038 | PAUSED | 81 | 10 | 0.12 | 3,419 | 40.8 | 27.0 | 22.9 | 20.4 | 34% | 24% |
| `PD_Dialogue_Long` | 683514804951 | PAUSED | 79 | 0 | 0.00 | 2,595 | 22.5 | 15.9 | 12.9 | 10.1 | 29% | 36% |
| `PD_TikToker_GoodNewsW` | 701554801372 | PAUSED | 69 | 10 | 0.14 | 458 | 29.9 | 14.8 | 11.8 | 7.9 | 51% | 46% |
| `PD_YesBut_DeliverWW` | 680474229267 | PAUSED | 62 | 0 | 0.00 | 2,646 | 26.8 | 18.5 | 14.5 | 11.6 | 31% | 37% |
| `PD_TikToker_GoodNewsM` | 701554801630 | PAUSED | 51 | 0 | 0.00 | 143 | 41.4 | 30.3 | 25.8 | 17.1 | 27% | 44% |
| `EfficiencyProductDemoTeams` | 639296169505 | PAUSED | 45 | 0 | 0.00 | 842 | 35.5 | 21.9 | 16.7 | 14.5 | 38% | 34% |
| `CR_MakesSense_Long` | 723034279640 | PAUSED | 34 | 0 | 0.00 | 434 | 32.4 | 22.4 | 17.7 | 15.3 | 31% | 32% |
| `CR_HiGoogie` | 677777097980 | PAUSED | 26 | 0 | 0.00 | 213 | 38.5 | 21.8 | 17.4 | 14.5 | 43% | 34% |
| `PD_WorkOS_Long_UK` | 686100294156 | PAUSED | 23 | 10 | 0.44 | 157 | 31.0 | 19.7 | 11.2 | 9.9 | 36% | 50% |
| `PD_YesBut_DeliverBritishRU` | 671499022014 | PAUSED | 17 | 0 | 0.00 | 150 | 23.0 | 17.7 | 17.0 | 13.7 | 23% | 23% |
| `PD_YesBut_GoodAtMW` | 680474229498 | PAUSED | 16 | 0 | 0.00 | 146 | 23.2 | 15.4 | 12.1 | 5.7 | 34% | 63% |
| `AT_Shmuel_ShortRegular` | 698964744840 | PAUSED | 12 | 0 | 0.00 | 258 | 56.2 | 26.7 | 20.7 | 18.0 | 52% | 33% |
| `PD_YesBut_GoodAtWW` | 680474229117 | PAUSED | 11 | 0 | 0.00 | 197 | 27.0 | 20.9 | 20.4 | 17.0 | 23% | 19% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 36,709 | 1,660 | 0.05 | 675,079 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 8,703 | 370 | 0.04 |
| geoTargetConstants/1006912 | 773 | 20 | 0.03 |
| geoTargetConstants/1006524 | 745 | 30 | 0.04 |
| geoTargetConstants/1006567 | 449 | 20 | 0.04 |
| geoTargetConstants/1007336 | 425 | 10 | 0.02 |
| geoTargetConstants/1006864 | 379 | 30 | 0.08 |
| geoTargetConstants/1006656 | 340 | 30 | 0.09 |
| geoTargetConstants/1007326 | 297 | 20 | 0.07 |
| geoTargetConstants/1006884 | 246 | 10 | 0.04 |
| geoTargetConstants/1007064 | 230 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007064 | 230 | 0 | 0.00 |
| geoTargetConstants/1007043 | 201 | 0 | 0.00 |
| geoTargetConstants/1007293 | 174 | 0 | 0.00 |
| geoTargetConstants/1006867 | 171 | 0 | 0.00 |
| geoTargetConstants/9197981 | 158 | 0 | 0.00 |

---

#### Campaign: `gb-en-brand-multi-desktop-expanded-t-regional_awareness_uk_25q1` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £33,086 | **DEP:** 14,020 | **DEP/Spend:** 0.42
- **Impressions:** 2,631,225 | **Clicks:** 1,811 | **Conversions:** 1,402
- **All Conversions Value:** 70,530 | **All Conversions:** 9,719
- **Active Months:** 2 (2025-02-01 → 2025-03-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-02-01 | 5,526 | 1,990 | 0.36 | 443,349 | 300 | 199 |
| 2025-03-01 | 27,560 | 12,030 | 0.44 | 2,187,876 | 1,511 | 1,203 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `IndustryTechnology_EM-InStreamAds` | ENABLED | 15,074 | 6,560 | 0.44 | 1,181,740 | 40.6 | 20.9 | 16.8 | 14.8 | 49% | 29% |
| `EmployerLarge_EM-InStreamAds` | ENABLED | 11,597 | 4,410 | 0.38 | 918,414 | 45.0 | 23.3 | 18.8 | 16.7 | 48% | 28% |
| `IndustryFinancial_EM-InStreamAds` | ENABLED | 3,186 | 1,270 | 0.40 | 259,294 | 43.3 | 22.8 | 18.4 | 16.4 | 47% | 28% |
| `BusinessProductivitySoftware_IM-InStreamAds` | ENABLED | 2,446 | 1,400 | 0.57 | 205,935 | 50.4 | 29.9 | 25.2 | 22.8 | 41% | 24% |
| `IndustryRealEstate_EM-InStreamAds` | ENABLED | 783 | 380 | 0.49 | 65,842 | 44.4 | 24.9 | 20.8 | 18.9 | 44% | 24% |

**Ads in `IndustryTechnology_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659861 | ENABLED | 5,247 | 2,480 | 0.47 | 417,554 | 50.4 | 24.6 | 20.2 | 17.9 | 51% | 27% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659675 | ENABLED | 5,086 | 2,180 | 0.43 | 403,961 | 48.4 | 24.8 | 19.5 | 17.4 | 49% | 30% |
| `CR_Llama_Hero60_GB_Brand` | 734276299095 | ENABLED | 4,741 | 1,900 | 0.40 | 360,225 | 20.6 | 12.1 | 9.9 | 8.4 | 41% | 30% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659627 | ENABLED | 4,041 | 1,750 | 0.43 | 326,471 | 55.6 | 27.6 | 22.8 | 20.4 | 50% | 26% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659852 | ENABLED | 3,969 | 1,390 | 0.35 | 319,871 | 53.4 | 27.7 | 21.8 | 19.4 | 48% | 30% |
| `CR_Llama_Hero60_GB_Brand` | 734276299086 | ENABLED | 3,587 | 1,270 | 0.35 | 272,072 | 22.3 | 13.0 | 10.6 | 9.0 | 41% | 31% |

**Ads in `IndustryFinancial_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659651 | ENABLED | 1,110 | 450 | 0.41 | 92,393 | 53.6 | 27.1 | 22.4 | 20.1 | 49% | 26% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659897 | ENABLED | 1,075 | 500 | 0.46 | 88,862 | 51.6 | 27.2 | 21.4 | 19.2 | 47% | 29% |
| `CR_Llama_Hero60_GB_Brand` | 734276299083 | ENABLED | 1,001 | 320 | 0.32 | 78,039 | 21.6 | 12.7 | 10.2 | 8.7 | 41% | 32% |

**Ads in `BusinessProductivitySoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659669 | ENABLED | 880 | 500 | 0.57 | 75,958 | 60.5 | 34.7 | 30.0 | 27.4 | 43% | 21% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659813 | ENABLED | 835 | 390 | 0.47 | 71,810 | 58.8 | 34.9 | 28.8 | 26.3 | 41% | 25% |
| `CR_Llama_Hero60_GB_Brand` | 734276299080 | ENABLED | 731 | 510 | 0.70 | 58,167 | 26.8 | 17.2 | 14.4 | 12.7 | 36% | 26% |

**Ads in `IndustryRealEstate_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659621 | ENABLED | 274 | 130 | 0.47 | 23,523 | 54.4 | 29.5 | 25.3 | 23.1 | 46% | 22% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659885 | ENABLED | 268 | 130 | 0.49 | 23,008 | 52.9 | 29.6 | 24.2 | 22.2 | 44% | 25% |
| `CR_Llama_Hero60_GB_Brand` | 734276299092 | ENABLED | 241 | 120 | 0.50 | 19,311 | 22.0 | 13.5 | 11.2 | 9.7 | 39% | 28% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 33,086 | 14,020 | 0.42 | 2,631,225 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 32,983 | 13,980 | 0.42 |
| geoTargetConstants/9196633 | 79 | 10 | 0.13 |
| geoTargetConstants/9189725 | 24 | 10 | 0.42 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 32,983 | 13,980 | 0.42 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-topics_productivity-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £28,562 | **DEP:** 870 | **DEP/Spend:** 0.03
- **Impressions:** 872,464 | **Clicks:** 1,075 | **Conversions:** 87
- **All Conversions Value:** 57,351 | **All Conversions:** 4,073
- **Active Months:** 3 (2024-05-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 11,131 | 380 | 0.03 | 406,989 | 483 | 38 |
| 2024-06-01 | 10,779 | 320 | 0.03 | 288,620 | 359 | 32 |
| 2024-07-01 | 6,653 | 170 | 0.03 | 176,855 | 233 | 17 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessProductivitySoftware_T-MultiAds` | ENABLED | 28,562 | 870 | 0.03 | 872,464 | 22.2 | 11.1 | 8.1 | 6.2 | 50% | 45% |

**Ads in `BusinessProductivitySoftware_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 686100294165 | PAUSED | 7,104 | 230 | 0.03 | 201,337 | 19.5 | 10.8 | 7.8 | 6.1 | 45% | 43% |
| `PD_ArtOfWork_Customize` | 704564165746 | PAUSED | 4,895 | 110 | 0.02 | 117,219 | 14.1 | 8.7 | 6.3 | 4.3 | 38% | 51% |
| `PD_Dialogue_Long` | 683514804957 | PAUSED | 3,716 | 110 | 0.03 | 101,623 | 13.8 | 8.0 | 5.8 | 4.2 | 42% | 47% |
| `PD_WorkOS_21sec_UK` | 686100293976 | PAUSED | 2,070 | 40 | 0.02 | 50,069 | 70.2 | 21.6 | 14.6 | 10.8 | 69% | 50% |
| `AT_Shmuel_NewSplit` | 700168358041 | PAUSED | 2,070 | 70 | 0.03 | 73,847 | 30.2 | 14.4 | 10.3 | 7.9 | 52% | 45% |
| `PD_Linear_Group` | 694233634769 | PAUSED | 2,007 | 50 | 0.02 | 58,086 | 15.8 | 9.4 | 7.1 | 5.7 | 40% | 40% |
| `PD_Linear_Actress` | 694233635234 | PAUSED | 1,800 | 70 | 0.04 | 48,902 | 15.8 | 9.2 | 6.9 | 5.6 | 42% | 40% |
| `UT_SOH_Flexibility` | 689999114312 | PAUSED | 1,598 | 70 | 0.04 | 54,292 | 24.8 | 12.5 | 9.3 | 7.3 | 50% | 42% |
| `PD_YesBut_DeliverWW` | 679718131591 | ENABLED | 875 | 60 | 0.07 | 38,767 | 15.4 | 9.3 | 7.2 | 5.9 | 39% | 37% |
| `PD_WorkOS_21sec` | 686100294198 | PAUSED | 358 | 10 | 0.03 | 30,253 | 90.4 | 26.2 | 18.5 | 14.7 | 71% | 44% |
| `EfficiencyProductDemoTeams` | 679718131663 | PAUSED | 316 | 0 | 0.00 | 9,313 | 23.8 | 13.0 | 9.7 | 7.3 | 46% | 44% |
| `PD_TikToker_HackW` | 701554802620 | PAUSED | 212 | 0 | 0.00 | 8,990 | 22.3 | 12.1 | 9.3 | 6.8 | 46% | 44% |
| `PD_TikToker_GoodNewsW` | 701554801327 | PAUSED | 202 | 10 | 0.05 | 6,311 | 20.8 | 11.9 | 9.2 | 7.4 | 43% | 38% |
| `AT_Shmuel_ShortRegular` | 698964745335 | PAUSED | 197 | 0 | 0.00 | 6,442 | 46.3 | 19.3 | 13.0 | 9.5 | 58% | 51% |
| `PD_YesBut_GoodAtWW` | 679718131903 | ENABLED | 142 | 0 | 0.00 | 4,876 | 18.6 | 12.4 | 9.9 | 7.9 | 33% | 37% |
| `PD_WorkOS_Long_UK` | 686100294120 | PAUSED | 129 | 10 | 0.08 | 8,316 | 21.1 | 12.7 | 10.1 | 7.9 | 40% | 37% |
| `PD_YesBut_DeliverBritishRU` | 679718132047 | ENABLED | 115 | 0 | 0.00 | 4,330 | 15.9 | 9.9 | 8.1 | 6.4 | 38% | 36% |
| `PD_TikToker_HackM` | 701554800652 | PAUSED | 108 | 10 | 0.09 | 5,913 | 21.7 | 12.4 | 9.6 | 6.8 | 43% | 45% |
| `PD_TikToker_GoodNewsM` | 701554801177 | PAUSED | 87 | 0 | 0.00 | 4,835 | 26.5 | 15.6 | 12.1 | 9.3 | 41% | 40% |
| `AT_Shmuel_ShortSplit` | 698964744681 | PAUSED | 83 | 0 | 0.00 | 2,560 | 50.2 | 21.3 | 15.5 | 11.9 | 58% | 44% |
| `PD_YesBut_GoodAtMW` | 679718131864 | ENABLED | 71 | 10 | 0.14 | 3,207 | 16.2 | 10.1 | 7.2 | 6.4 | 38% | 36% |
| `CR_HiGoogie` | 679718131420 | PAUSED | 71 | 0 | 0.00 | 1,994 | 36.7 | 16.2 | 11.6 | 9.1 | 56% | 44% |
| `UT_SOH_Collaboration` | 689999113901 | PAUSED | 57 | 0 | 0.00 | 8,626 | 19.9 | 10.6 | 8.1 | 6.3 | 47% | 41% |
| `PD_Dots_UK` | 694328003406 | ENABLED | 56 | 0 | 0.00 | 7,105 | 88.5 | 21.9 | 15.1 | 11.5 | 75% | 47% |
| `UT_Frank_Mix` | 679718131192 | PAUSED | 47 | 0 | 0.00 | 5,515 | 23.9 | 13.6 | 9.6 | 7.9 | 43% | 42% |
| `AllConnectedOnePlace` | 679718131408 | ENABLED | 46 | 0 | 0.00 | 1,910 | 20.1 | 11.6 | 8.1 | 6.1 | 42% | 47% |
| `PD_YesBut_DeliverMM` | 679718131660 | ENABLED | 38 | 0 | 0.00 | 3,707 | 13.2 | 6.5 | 4.5 | 3.7 | 51% | 43% |
| `UT_Frank_Client` | 679718131387 | PAUSED | 37 | 10 | 0.27 | 1,891 | 16.1 | 10.1 | 7.6 | 6.4 | 38% | 37% |
| `AT_Shmuel_NewRegular` | 700168357108 | PAUSED | 28 | 0 | 0.00 | 1,705 | 32.7 | 14.7 | 11.1 | 7.9 | 55% | 46% |
| `PD_ArtOfWork_Flexibility` | 704564166886 | PAUSED | 27 | 0 | 0.00 | 523 | 21.6 | 13.2 | 10.4 | 9.6 | 39% | 28% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 28,562 | 870 | 0.03 | 872,464 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 6,818 | 190 | 0.03 |
| geoTargetConstants/1006912 | 660 | 60 | 0.09 |
| geoTargetConstants/1006524 | 514 | 10 | 0.02 |
| geoTargetConstants/1006864 | 309 | 10 | 0.03 |
| geoTargetConstants/1006567 | 284 | 0 | 0.00 |
| geoTargetConstants/1007336 | 265 | 0 | 0.00 |
| geoTargetConstants/1006656 | 216 | 0 | 0.00 |
| geoTargetConstants/1007064 | 216 | 0 | 0.00 |
| geoTargetConstants/1007326 | 204 | 0 | 0.00 |
| geoTargetConstants/1006884 | 180 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006567 | 284 | 0 | 0.00 |
| geoTargetConstants/1007336 | 265 | 0 | 0.00 |
| geoTargetConstants/1006656 | 216 | 0 | 0.00 |
| geoTargetConstants/1007064 | 216 | 0 | 0.00 |
| geoTargetConstants/1007326 | 204 | 0 | 0.00 |

---

#### Campaign: `gb-en-brand-work_mgmt-desktop-expanded-t-regional_awareness_london_24q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £24,731 | **DEP:** 1,509 | **DEP/Spend:** 0.06
- **Impressions:** 1,924,443 | **Clicks:** 1,195 | **Conversions:** 151
- **All Conversions Value:** 34,054 | **All Conversions:** 2,876
- **Active Months:** 2 (2024-11-01 → 2024-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-11-01 | 7,052 | 431 | 0.06 | 690,003 | 387 | 43 |
| 2024-12-01 | 17,679 | 1,078 | 0.06 | 1,234,440 | 808 | 108 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 22,490 | 1,371 | 0.06 | 1,754,875 | 39.9 | 24.6 | 20.3 | 17.7 | 38% | 28% |
| `IndustryRealEstate_EM-InStreamAds` | ENABLED | 2,241 | 139 | 0.06 | 169,568 | 37.2 | 22.6 | 18.5 | 16.2 | 39% | 28% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Men_Brand` | 720835805653 | ENABLED | 11,352 | 594 | 0.05 | 886,386 | 40.6 | 24.7 | 20.4 | 17.7 | 39% | 28% |
| `PD_Confidence_Women_Brand` | 720835805656 | ENABLED | 11,138 | 777 | 0.07 | 868,489 | 39.2 | 24.5 | 20.3 | 17.6 | 38% | 28% |

**Ads in `IndustryRealEstate_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Men_Brand` | 720835805677 | ENABLED | 1,132 | 60 | 0.05 | 85,715 | 37.9 | 22.7 | 18.6 | 16.2 | 40% | 29% |
| `PD_Confidence_Women_Brand` | 720835805647 | ENABLED | 1,109 | 79 | 0.07 | 83,853 | 36.4 | 22.5 | 18.4 | 16.1 | 38% | 28% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 24,731 | 1,509 | 0.06 | 1,924,443 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 16,785 | 1,043 | 0.06 |
| geoTargetConstants/1006668 | 276 | 10 | 0.04 |
| geoTargetConstants/9198013 | 263 | 10 | 0.04 |
| geoTargetConstants/9197981 | 223 | 20 | 0.09 |
| geoTargetConstants/9198690 | 190 | 20 | 0.11 |
| geoTargetConstants/1007210 | 164 | 10 | 0.06 |
| geoTargetConstants/1007097 | 109 | 0 | 0.00 |
| geoTargetConstants/9198464 | 84 | 0 | 0.00 |
| geoTargetConstants/9194745 | 83 | 10 | 0.12 |
| geoTargetConstants/9239824 | 83 | 10 | 0.12 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007097 | 109 | 0 | 0.00 |
| geoTargetConstants/1006668 | 276 | 10 | 0.04 |
| geoTargetConstants/9198013 | 263 | 10 | 0.04 |
| geoTargetConstants/1007210 | 164 | 10 | 0.06 |
| geoTargetConstants/1006886 | 16,785 | 1,043 | 0.06 |

---

#### Campaign: `gb-en-brand-multi-mobile-expanded-t-regional_awareness_uk_25q1` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £22,615 | **DEP:** 34,550 | **DEP/Spend:** 1.53
- **Impressions:** 4,878,953 | **Clicks:** 11,906 | **Conversions:** 3,455
- **All Conversions Value:** 62,340 | **All Conversions:** 13,553
- **Active Months:** 2 (2025-02-01 → 2025-03-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-02-01 | 3,000 | 3,180 | 1.06 | 658,423 | 1,568 | 318 |
| 2025-03-01 | 19,615 | 31,370 | 1.60 | 4,220,530 | 10,338 | 3,137 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 19,790 | 29,450 | 1.49 | 4,272,006 | 40.7 | 22.9 | 18.7 | 16.7 | 44% | 27% |
| `BusinessProductivitySoftware_IM-InStreamAds` | ENABLED | 2,825 | 5,100 | 1.81 | 606,947 | 41.0 | 23.6 | 19.4 | 17.4 | 42% | 26% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659822 | ENABLED | 7,703 | 11,390 | 1.48 | 1,708,420 | 49.7 | 27.7 | 23.3 | 20.9 | 44% | 25% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659630 | ENABLED | 6,305 | 10,020 | 1.59 | 1,389,373 | 49.1 | 28.0 | 22.7 | 20.5 | 43% | 27% |
| `CR_Llama_Hero60_GB_Brand` | 734276299107 | ENABLED | 5,764 | 8,000 | 1.39 | 1,170,037 | 17.5 | 9.8 | 7.5 | 6.2 | 44% | 37% |

**Ads in `BusinessProductivitySoftware_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Brand` | 733964659639 | ENABLED | 1,085 | 1,930 | 1.78 | 238,788 | 49.9 | 28.3 | 24.0 | 21.5 | 43% | 24% |
| `CR_Llama_Hero30_GB_1_Brand` | 733964659633 | ENABLED | 923 | 1,690 | 1.83 | 202,118 | 49.0 | 28.6 | 23.4 | 21.2 | 42% | 26% |
| `CR_Llama_Hero60_GB_Brand` | 734276299110 | ENABLED | 815 | 1,480 | 1.82 | 165,452 | 18.4 | 10.6 | 8.1 | 6.8 | 42% | 36% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 22,615 | 34,550 | 1.53 | 4,878,953 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 22,590 | 34,430 | 1.52 |
| geoTargetConstants/9196633 | 18 | 40 | 2.23 |
| geoTargetConstants/9189725 | 7 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 22,590 | 34,430 | 1.52 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-topics_freqcap-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £20,967 | **DEP:** 1,260 | **DEP/Spend:** 0.06
- **Impressions:** 138,922 | **Clicks:** 153 | **Conversions:** 126
- **All Conversions Value:** 47,228 | **All Conversions:** 3,902
- **Active Months:** 3 (2024-10-01 → 2024-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-10-01 | 3,658 | 290 | 0.08 | 37,623 | 45 | 29 |
| 2024-11-01 | 11,895 | 560 | 0.05 | 64,347 | 71 | 56 |
| 2024-12-01 | 5,415 | 410 | 0.08 | 36,952 | 37 | 41 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Mgmt_ProjectManagement_T-MultiAds` | ENABLED | 17,813 | 1,090 | 0.06 | 112,002 | 29.3 | 15.8 | 12.3 | 9.4 | 46% | 40% |
| `BussP_ProjectManagement_T-MultiAds` | ENABLED | 3,154 | 170 | 0.05 | 26,920 | 33.3 | 17.5 | 13.3 | 10.0 | 47% | 43% |

**Ads in `Mgmt_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_TikToker_HackW` | 716705036558 | PAUSED | 7,363 | 420 | 0.06 | 41,677 | 27.3 | 15.0 | 11.6 | 8.6 | 45% | 43% |
| `PD_TikToker_GoodNewsW` | 716705036357 | PAUSED | 2,930 | 90 | 0.03 | 12,316 | 24.7 | 14.3 | 11.2 | 8.4 | 42% | 41% |
| `PD_TikToker_HackM` | 716705036132 | PAUSED | 1,558 | 60 | 0.04 | 7,876 | 27.5 | 15.7 | 12.0 | 8.8 | 43% | 44% |
| `CR_MakesSense_Short` | 723034279193 | ENABLED | 1,411 | 70 | 0.05 | 7,117 | 28.1 | 14.6 | 11.2 | 8.5 | 48% | 42% |
| `PD_WorkOS_21sec_UK` | 716705036522 | PAUSED | 912 | 40 | 0.04 | 2,963 | 82.2 | 26.3 | 18.3 | 14.1 | 68% | 47% |
| `PD_Linear_Actress` | 716705036321 | PAUSED | 838 | 180 | 0.21 | 6,482 | 23.2 | 15.5 | 12.5 | 10.8 | 33% | 30% |
| `PD_WorkOS_Long` | 716705036366 | PAUSED | 631 | 50 | 0.08 | 15,876 | 25.7 | 16.2 | 13.3 | 10.4 | 37% | 36% |
| `PD_TikToker_GoodNewsM` | 716705036624 | PAUSED | 452 | 0 | 0.00 | 3,576 | 33.3 | 22.6 | 19.8 | 13.2 | 32% | 41% |
| `PD_WorkOS_21sec` | 716705036582 | PAUSED | 443 | 10 | 0.02 | 5,958 | 91.4 | 32.0 | 23.7 | 17.4 | 65% | 45% |
| `CR_MakesSense_Long` | 723034279637 | PAUSED | 242 | 0 | 0.00 | 1,459 | 24.0 | 15.9 | 13.1 | 10.2 | 34% | 36% |
| `PD_Linear_Group` | 716705036594 | PAUSED | 223 | 10 | 0.04 | 1,404 | 21.7 | 15.4 | 12.2 | 10.8 | 29% | 29% |
| `PD_YesBut_DeliverBritishRU` | 716705036609 | ENABLED | 214 | 10 | 0.05 | 1,605 | 25.1 | 17.6 | 14.9 | 13.2 | 30% | 25% |
| `PD_WorkOS_Long_UK` | 716705036777 | PAUSED | 177 | 90 | 0.51 | 785 | 26.7 | 17.0 | 12.8 | 11.1 | 36% | 35% |
| `PD_YesBut_GoodAtWW` | 716705036399 | ENABLED | 62 | 0 | 0.00 | 425 | 23.2 | 14.2 | 13.7 | 13.0 | 39% | 9% |
| `PD_YesBut_GoodAtMW` | 716705036375 | ENABLED | 43 | 0 | 0.00 | 424 | 26.7 | 18.1 | 16.8 | 14.7 | 32% | 19% |
| `AT_Shmuel_NewSplit` | 716705036348 | PAUSED | 35 | 10 | 0.29 | 195 | 34.6 | 18.5 | 13.7 | 9.2 | 46% | 51% |
| `AllConnectedOnePlace` | 716705036573 | ENABLED | 33 | 0 | 0.00 | 189 | 23.9 | 14.9 | 11.7 | 9.4 | 37% | 37% |
| `PD_Reports_woman` | 716705036090 | PAUSED | 33 | 10 | 0.30 | 232 | 26.9 | 13.7 | 11.8 | 9.4 | 49% | 31% |
| `AT_Shmuel_NewRegular` | 716705036087 | PAUSED | 32 | 0 | 0.00 | 205 | 34.1 | 11.1 | 8.4 | 6.3 | 67% | 43% |
| `UT_Frank_Mix` | 716705036300 | PAUSED | 31 | 10 | 0.32 | 229 | 34.1 | 18.7 | 13.1 | 11.2 | 45% | 40% |
| `PD_Reports_VO` | 716705036312 | PAUSED | 28 | 0 | 0.00 | 163 | 24.7 | 14.9 | 12.4 | 9.1 | 39% | 39% |
| `UT_Frank_Client` | 716705036552 | PAUSED | 26 | 0 | 0.00 | 155 | 26.8 | 14.7 | 11.9 | 10.5 | 45% | 29% |
| `PD_YesBut_DeliverWW` | 716705036774 | ENABLED | 25 | 0 | 0.00 | 155 | 20.1 | 13.8 | 11.7 | 9.7 | 31% | 30% |
| `PD_Dots_UK` | 716705036282 | PAUSED | 20 | 0 | 0.00 | 120 | 94.2 | 39.0 | 24.9 | 22.4 | 59% | 42% |
| `PD_YesBut_DeliverMM` | 716705036117 | ENABLED | 18 | 0 | 0.00 | 176 | 15.9 | 11.6 | 10.4 | 9.8 | 27% | 16% |
| `AT_Shmuel_ShortSplit` | 716705036135 | PAUSED | 17 | 30 | 1.79 | 128 | 71.5 | 25.7 | 19.2 | 15.9 | 64% | 38% |
| `AT_Shmuel_ShortRegular` | 716705036603 | PAUSED | 15 | 0 | 0.00 | 112 | 73.9 | 34.5 | 24.3 | 23.4 | 53% | 32% |

**Ads in `BussP_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_TikToker_HackW` | 716705036768 | PAUSED | 884 | 30 | 0.03 | 4,885 | 25.7 | 15.2 | 11.6 | 8.5 | 41% | 44% |
| `PD_TikToker_HackM` | 716705036591 | PAUSED | 568 | 50 | 0.09 | 6,401 | 24.6 | 14.8 | 11.1 | 8.2 | 40% | 45% |
| `PD_WorkOS_21sec_UK` | 716705036297 | PAUSED | 463 | 30 | 0.06 | 1,899 | 74.5 | 25.4 | 17.9 | 13.0 | 66% | 49% |
| `PD_TikToker_GoodNewsW` | 716705036126 | PAUSED | 253 | 20 | 0.08 | 692 | 25.7 | 15.6 | 12.1 | 8.7 | 39% | 44% |
| `PD_WorkOS_Long` | 716705036306 | PAUSED | 245 | 0 | 0.00 | 6,958 | 26.6 | 17.6 | 11.4 | 7.0 | 34% | 60% |
| `PD_WorkOS_21sec` | 716705036363 | PAUSED | 211 | 10 | 0.05 | 2,081 | 92.2 | 41.1 | 29.2 | 23.1 | 55% | 44% |
| `PD_WorkOS_Long_UK` | 716705036099 | PAUSED | 102 | 20 | 0.20 | 484 | 24.2 | 13.3 | 10.2 | 9.3 | 45% | 30% |
| `PD_TikToker_GoodNewsM` | 716705036330 | PAUSED | 83 | 0 | 0.00 | 715 | 40.2 | 33.4 | 26.0 | 17.9 | 17% | 46% |
| `PD_Linear_Group` | 716705036597 | PAUSED | 76 | 10 | 0.13 | 764 | 20.3 | 13.7 | 10.1 | 8.9 | 32% | 36% |
| `CR_MakesSense_Short` | 723034279634 | ENABLED | 72 | 0 | 0.00 | 193 | 34.0 | 17.0 | 13.3 | 11.7 | 50% | 31% |
| `PD_Linear_Actress` | 716705036345 | PAUSED | 68 | 0 | 0.00 | 673 | 27.8 | 20.6 | 17.0 | 15.3 | 26% | 25% |
| `AllConnectedOnePlace` | 716705036588 | ENABLED | 25 | 0 | 0.00 | 172 | 24.0 | 15.5 | 12.0 | 12.0 | 35% | 23% |
| `PD_YesBut_DeliverBritishRU` | 716705036615 | ENABLED | 16 | 0 | 0.00 | 191 | 21.5 | 11.4 | 9.3 | 9.3 | 47% | 18% |
| `AT_Shmuel_NewSplit` | 716705036318 | PAUSED | 13 | 0 | 0.00 | 61 | 33.9 | 7.5 | 7.5 | 5.7 | 78% | 25% |
| `PD_YesBut_GoodAtWW` | 716705036096 | ENABLED | 11 | 0 | 0.00 | 134 | 25.2 | 21.0 | 19.3 | 16.7 | 17% | 20% |
| `UT_Frank_Mix` | 716705036303 | PAUSED | 11 | 0 | 0.00 | 119 | 28.4 | 16.2 | 16.2 | 16.2 | 43% | 0% |
| `CR_MakesSense_Long` | 723034279433 | PAUSED | 10 | 0 | 0.00 | 50 | 18.8 | 15.6 | 12.5 | 6.2 | 17% | 60% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 20,967 | 1,260 | 0.06 | 138,922 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 5,578 | 250 | 0.04 |
| geoTargetConstants/1006912 | 714 | 10 | 0.01 |
| geoTargetConstants/1006524 | 404 | 20 | 0.05 |
| geoTargetConstants/1006567 | 228 | 0 | 0.00 |
| geoTargetConstants/1007336 | 212 | 0 | 0.00 |
| geoTargetConstants/1006864 | 194 | 10 | 0.05 |
| geoTargetConstants/1007326 | 170 | 110 | 0.65 |
| geoTargetConstants/1006656 | 166 | 0 | 0.00 |
| geoTargetConstants/1007064 | 144 | 0 | 0.00 |
| geoTargetConstants/1006884 | 116 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006567 | 228 | 0 | 0.00 |
| geoTargetConstants/1007336 | 212 | 0 | 0.00 |
| geoTargetConstants/1006656 | 166 | 0 | 0.00 |
| geoTargetConstants/1007064 | 144 | 0 | 0.00 |
| geoTargetConstants/1006884 | 116 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-inmarket-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £20,641 | **DEP:** 100 | **DEP/Spend:** 0.00
- **Impressions:** 1,571,072 | **Clicks:** 2,185 | **Conversions:** 100
- **All Conversions Value:** 82,696 | **All Conversions:** 8,813
- **Active Months:** 2 (2026-01-01 → 2026-02-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-01-01 | 4,165 | 23 | 0.01 | 234,009 | 420 | 23 |
| 2026-02-01 | 16,477 | 77 | 0.00 | 1,337,063 | 1,765 | 77 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EnterpriseSoftware_IM-MultiAds` | ENABLED | 13,315 | 68 | 0.01 | 1,076,644 | 44.0 | 32.3 | 27.9 | 25.2 | 27% | 22% |
| `BusinessProductivitySoftware_IM-MultiAds` | ENABLED | 7,326 | 32 | 0.00 | 494,428 | 44.6 | 33.6 | 29.3 | 26.4 | 25% | 22% |

**Ads in `EnterpriseSoftware_IM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_Hear` | 794475600704 | ENABLED | 3,840 | 21 | 0.01 | 286,496 | 38.6 | 28.8 | 24.9 | 22.3 | 25% | 22% |
| `AT_W_GameOver` | 794475600701 | ENABLED | 2,453 | 16 | 0.01 | 180,612 | 41.6 | 30.5 | 26.5 | 23.8 | 27% | 22% |
| `AT_Jay_Say` | 794475600683 | ENABLED | 1,961 | 6 | 0.00 | 124,945 | 37.6 | 27.1 | 23.1 | 20.3 | 28% | 25% |
| `AT_Jay_Honest` | 794475600680 | ENABLED | 1,143 | 8 | 0.01 | 82,873 | 38.0 | 26.8 | 23.0 | 20.2 | 29% | 24% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 794475606884 | ENABLED | 601 | 3 | 0.01 | 54,175 | 53.0 | 38.9 | 33.8 | 31.2 | 27% | 20% |
| `DL_sidekick_30s` | 794475606857 | ENABLED | 388 | 0 | 0.00 | 55,032 | 65.2 | 44.2 | 39.3 | 36.4 | 32% | 18% |
| `DL_sidekick_66s` | 794475606863 | ENABLED | 291 | 2 | 0.01 | 30,101 | 36.1 | 27.6 | 23.3 | 20.5 | 24% | 26% |
| `PD_Llama_Angry_Short_NoIntro` | 794475606881 | ENABLED | 281 | 1 | 0.00 | 22,999 | 52.4 | 38.7 | 34.2 | 31.4 | 26% | 19% |
| `CR_Confidence_Women_UK` | 794475600710 | PAUSED | 254 | 0 | 0.00 | 21,665 | 51.7 | 39.2 | 34.7 | 31.7 | 24% | 19% |
| `SH_PMO_Long` | 794475606911 | ENABLED | 218 | 3 | 0.01 | 31,675 | 95.5 | 64.4 | 50.6 | 44.9 | 33% | 30% |
| `DL_AI_Llama_Long` | 794475606713 | ENABLED | 183 | 1 | 0.01 | 13,202 | 46.3 | 37.9 | 33.9 | 31.1 | 18% | 18% |
| `SH_Finance_Long` | 794475606899 | ENABLED | 177 | 0 | 0.00 | 19,539 | 94.8 | 62.8 | 48.3 | 42.7 | 34% | 32% |
| `PD_Manager_Celebration` | 794475606893 | PAUSED | 150 | 0 | 0.00 | 10,908 | 36.1 | 27.9 | 24.0 | 21.0 | 23% | 25% |
| `CR_Confidence_Men_UK` | 794475600707 | PAUSED | 148 | 1 | 0.00 | 12,852 | 53.8 | 41.7 | 37.4 | 34.9 | 22% | 16% |
| `PD_Manager_WoF` | 794475606896 | PAUSED | 140 | 0 | 0.00 | 12,583 | 37.5 | 28.4 | 24.6 | 21.1 | 24% | 26% |
| `AT_Llama_short` | 794475600698 | PAUSED | 125 | 1 | 0.01 | 8,254 | 46.5 | 37.1 | 33.0 | 30.0 | 20% | 19% |
| `SH_Marketing_Long` | 794475606905 | ENABLED | 124 | 0 | 0.00 | 21,689 | 95.1 | 66.5 | 54.7 | 50.3 | 30% | 24% |
| `DL_Llama_47s` | 794475606719 | PAUSED | 122 | 0 | 0.00 | 13,980 | 68.2 | 59.0 | 55.1 | 51.8 | 14% | 12% |
| `SH_Operations_Long` | 794475606908 | ENABLED | 96 | 3 | 0.03 | 15,995 | 95.3 | 68.3 | 58.9 | 54.2 | 28% | 21% |
| `SH_Leadership_Long` | 794475606902 | ENABLED | 89 | 0 | 0.00 | 15,035 | 94.4 | 59.4 | 48.3 | 44.2 | 37% | 26% |
| `DL_sidekick_47s` | 794475606860 | ENABLED | 88 | 0 | 0.00 | 10,489 | 63.4 | 55.5 | 51.4 | 48.5 | 13% | 13% |
| `DL_AI_Llama_Short` | 794475606716 | ENABLED | 79 | 0 | 0.00 | 7,569 | 58.4 | 46.4 | 42.0 | 39.4 | 21% | 15% |
| `DL_Llama_Angry_Long` | 794475606842 | PAUSED | 77 | 0 | 0.00 | 6,614 | 45.9 | 36.4 | 31.1 | 27.4 | 21% | 25% |
| `AT_Llama_long-alt` | 794475600695 | PAUSED | 64 | 1 | 0.02 | 3,877 | 40.5 | 31.0 | 26.0 | 23.0 | 24% | 26% |
| `AT_Llama_long` | 794475600692 | PAUSED | 55 | 0 | 0.00 | 3,029 | 42.7 | 33.1 | 28.2 | 24.8 | 22% | 25% |
| `AT_Llama_30s` | 794475600686 | PAUSED | 55 | 1 | 0.02 | 3,717 | 65.8 | 45.3 | 39.9 | 36.7 | 31% | 19% |
| `DL_Llama_Long` | 794475606851 | PAUSED | 26 | 0 | 0.00 | 1,423 | 29.8 | 21.4 | 18.3 | 16.2 | 28% | 24% |
| `PD_InShort_AI` | 794475606872 | PAUSED | 12 | 0 | 0.00 | 596 | 31.9 | 22.3 | 19.2 | 16.8 | 30% | 25% |
| `PD_Llama_Skeleton_UK` | 794475606890 | PAUSED | 12 | 0 | 0.00 | 740 | 25.4 | 17.6 | 15.0 | 12.7 | 31% | 28% |
| `PD_Llama_Angry_Short` | 794475606878 | PAUSED | 10 | 0 | 0.00 | 649 | 42.8 | 30.1 | 26.5 | 24.6 | 30% | 18% |

**Ads in `BusinessProductivitySoftware_IM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_W_Hear` | 794475606938 | ENABLED | 2,711 | 12 | 0.00 | 166,103 | 39.8 | 30.2 | 26.3 | 23.6 | 24% | 22% |
| `AT_W_GameOver` | 794475606935 | ENABLED | 1,057 | 6 | 0.01 | 62,436 | 44.1 | 33.2 | 29.2 | 26.5 | 25% | 20% |
| `AT_Jay_Say` | 794475606917 | ENABLED | 1,044 | 6 | 0.01 | 56,687 | 40.4 | 29.7 | 25.6 | 22.6 | 26% | 24% |
| `AT_Jay_Honest` | 794475606914 | ENABLED | 538 | 2 | 0.00 | 33,326 | 40.8 | 30.0 | 25.7 | 22.8 | 27% | 24% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 794397884773 | ENABLED | 207 | 2 | 0.01 | 15,532 | 53.9 | 39.8 | 35.3 | 32.6 | 26% | 18% |
| `DL_Llama_Long` | 794475607085 | PAUSED | 181 | 1 | 0.01 | 13,954 | 39.1 | 29.9 | 25.1 | 21.7 | 24% | 27% |
| `PD_Llama_Angry_Short_NoIntro` | 794397884770 | ENABLED | 147 | 0 | 0.00 | 11,730 | 59.2 | 46.6 | 42.1 | 39.1 | 21% | 16% |
| `DL_sidekick_30s` | 794475607091 | ENABLED | 134 | 1 | 0.01 | 17,671 | 67.1 | 46.5 | 41.4 | 38.5 | 31% | 17% |
| `PD_InShort_AI` | 794397884761 | PAUSED | 118 | 0 | 0.00 | 8,476 | 40.8 | 30.7 | 26.6 | 23.1 | 25% | 25% |
| `SH_PMO_Long` | 794397884800 | ENABLED | 115 | 0 | 0.00 | 17,511 | 95.3 | 65.2 | 51.6 | 45.7 | 32% | 30% |
| `DL_sidekick_66s` | 794475607097 | ENABLED | 107 | 0 | 0.00 | 9,887 | 41.0 | 31.7 | 27.5 | 24.2 | 23% | 24% |
| `PD_Manager_Celebration` | 794397884782 | PAUSED | 89 | 0 | 0.00 | 4,766 | 38.5 | 29.8 | 26.0 | 22.7 | 23% | 24% |
| `PD_Llama_Skeleton_UK` | 794397884779 | ENABLED | 87 | 0 | 0.00 | 7,951 | 40.7 | 31.9 | 27.2 | 23.7 | 22% | 26% |
| `CR_Confidence_Women_UK` | 794475606944 | PAUSED | 77 | 1 | 0.01 | 6,103 | 53.4 | 41.2 | 36.3 | 33.6 | 23% | 19% |
| `PD_Manager_WoF` | 794397884785 | PAUSED | 72 | 0 | 0.00 | 4,970 | 39.3 | 30.4 | 26.1 | 22.9 | 23% | 25% |
| `DL_AI_Llama_Long` | 794475606947 | ENABLED | 71 | 0 | 0.00 | 4,290 | 55.7 | 47.5 | 43.2 | 40.5 | 15% | 15% |
| `DL_sidekick_47s` | 794475607094 | ENABLED | 63 | 0 | 0.00 | 6,938 | 64.0 | 55.1 | 51.5 | 48.7 | 14% | 12% |
| `PD_Llama_Skeleton` | 794397884776 | ENABLED | 61 | 0 | 0.01 | 5,373 | 39.2 | 30.8 | 26.3 | 22.9 | 21% | 26% |
| `SH_Marketing_Long` | 794397884794 | ENABLED | 58 | 0 | 0.00 | 8,050 | 95.2 | 66.4 | 56.0 | 49.2 | 30% | 26% |
| `SH_Finance_Long` | 794397884788 | ENABLED | 54 | 0 | 0.00 | 5,548 | 95.1 | 68.1 | 54.1 | 49.3 | 28% | 28% |
| `PD_Llama_Angry` | 794397884764 | PAUSED | 50 | 0 | 0.00 | 4,627 | 45.3 | 37.4 | 31.6 | 27.8 | 17% | 26% |
| `CR_Confidence_Men_UK` | 794475606941 | PAUSED | 46 | 1 | 0.02 | 3,757 | 59.4 | 46.9 | 42.7 | 40.1 | 21% | 15% |
| `AT_Llama_short` | 794475606932 | PAUSED | 46 | 0 | 0.00 | 3,213 | 51.4 | 42.9 | 38.5 | 35.8 | 17% | 17% |
| `AT_Llama_long` | 794475606926 | PAUSED | 27 | 0 | 0.00 | 1,566 | 46.4 | 36.8 | 31.4 | 26.6 | 21% | 28% |
| `AT_Llama_30s` | 794475606920 | PAUSED | 24 | 0 | 0.00 | 1,686 | 67.9 | 49.2 | 44.3 | 41.0 | 28% | 17% |
| `SH_Leadership_Long` | 794397884791 | ENABLED | 24 | 0 | 0.00 | 3,059 | 94.2 | 66.5 | 56.7 | 52.1 | 29% | 22% |
| `SH_Operations_Long` | 794397884797 | ENABLED | 23 | 0 | 0.00 | 3,068 | 95.5 | 71.9 | 62.8 | 58.0 | 25% | 19% |
| `AT_Llama_long-alt` | 794475606929 | PAUSED | 12 | 0 | 0.00 | 509 | 40.4 | 31.3 | 25.3 | 22.2 | 23% | 29% |
| `DL_Llama_Angry_Long` | 794475606956 | PAUSED | 11 | 0 | 0.00 | 659 | 44.7 | 35.5 | 30.6 | 27.6 | 21% | 22% |
| `DL_Llama_47s` | 794475606953 | PAUSED | 11 | 0 | 0.00 | 957 | 57.4 | 45.9 | 41.5 | 37.7 | 20% | 18% |
| `DL_Llama_Templates_30s` | 794475607088 | PAUSED | 11 | 0 | 0.00 | 655 | 66.5 | 49.6 | 44.1 | 40.6 | 25% | 18% |
| `DL_Llama_AnyType_30s` | 794475606959 | PAUSED | 10 | 0 | 0.00 | 711 | 65.8 | 48.6 | 42.8 | 38.8 | 26% | 20% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 20,641 | 100 | 0.00 | 1,571,072 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 4,403 | 23 | 0.01 |
| geoTargetConstants/1007850 | 1,067 | 3 | 0.00 |
| geoTargetConstants/1006524 | 475 | 2 | 0.00 |
| geoTargetConstants/1006912 | 345 | 2 | 0.01 |
| geoTargetConstants/1006656 | 204 | 1 | 0.00 |
| geoTargetConstants/1007336 | 199 | 1 | 0.01 |
| geoTargetConstants/1006864 | 182 | 3 | 0.02 |
| geoTargetConstants/1006567 | 150 | 0 | 0.00 |
| geoTargetConstants/1007326 | 146 | 1 | 0.01 |
| geoTargetConstants/1006884 | 144 | 1 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006567 | 150 | 0 | 0.00 |
| geoTargetConstants/9197981 | 134 | 0 | 0.00 |
| geoTargetConstants/1006867 | 103 | 0 | 0.00 |
| geoTargetConstants/1007043 | 102 | 0 | 0.00 |
| geoTargetConstants/1006948 | 118 | 0 | 0.00 |

---

#### Campaign: `gb-en-brand-work_mgmt-mobile-expanded-t-regional_awareness_london_24q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £18,998 | **DEP:** 1,040 | **DEP/Spend:** 0.05
- **Impressions:** 3,707,944 | **Clicks:** 9,300 | **Conversions:** 104
- **All Conversions Value:** 6,712 | **All Conversions:** 924
- **Active Months:** 2 (2024-11-01 → 2024-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-11-01 | 9,500 | 370 | 0.04 | 1,810,182 | 4,348 | 37 |
| 2024-12-01 | 9,498 | 670 | 0.07 | 1,897,762 | 4,952 | 67 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 12,600 | 730 | 0.06 | 2,430,134 | 32.7 | 21.6 | 18.0 | 15.8 | 34% | 27% |
| `IndustryTechnology_EM-InStreamAds` | ENABLED | 5,527 | 270 | 0.05 | 1,106,547 | 31.3 | 20.6 | 17.1 | 15.0 | 34% | 27% |
| `IndustryRealEstate_EM-InStreamAds` | ENABLED | 871 | 40 | 0.05 | 171,263 | 35.9 | 25.1 | 21.3 | 19.0 | 30% | 24% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Men_Brand` | 720835805713 | ENABLED | 6,375 | 390 | 0.06 | 1,229,434 | 33.3 | 21.7 | 18.0 | 15.8 | 35% | 27% |
| `PD_Confidence_Women_Brand` | 720835805665 | ENABLED | 6,226 | 340 | 0.05 | 1,200,700 | 32.2 | 21.6 | 18.0 | 15.8 | 33% | 27% |

**Ads in `IndustryTechnology_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Men_Brand` | 720835805689 | ENABLED | 2,793 | 140 | 0.05 | 559,321 | 31.8 | 20.6 | 17.1 | 15.0 | 35% | 27% |
| `PD_Confidence_Women_Brand` | 720835805650 | ENABLED | 2,734 | 130 | 0.05 | 547,226 | 30.7 | 20.5 | 17.1 | 15.0 | 33% | 27% |

**Ads in `IndustryRealEstate_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Men_Brand` | 720835805512 | ENABLED | 438 | 40 | 0.09 | 86,077 | 36.5 | 25.2 | 21.4 | 19.0 | 31% | 24% |
| `PD_Confidence_Women_Brand` | 720835805644 | ENABLED | 433 | 0 | 0.00 | 85,186 | 35.3 | 25.0 | 21.3 | 19.0 | 29% | 24% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 18,998 | 1,040 | 0.05 | 3,707,944 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 14,333 | 700 | 0.05 |
| geoTargetConstants/9198727 | 219 | 70 | 0.32 |
| geoTargetConstants/9197981 | 140 | 40 | 0.29 |
| geoTargetConstants/9198013 | 121 | 0 | 0.00 |
| geoTargetConstants/9198690 | 103 | 0 | 0.00 |
| geoTargetConstants/1007210 | 92 | 10 | 0.11 |
| geoTargetConstants/1006668 | 84 | 0 | 0.00 |
| geoTargetConstants/9212996 | 63 | 0 | 0.00 |
| geoTargetConstants/9198464 | 53 | 0 | 0.00 |
| geoTargetConstants/9198116 | 51 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/9198013 | 121 | 0 | 0.00 |
| geoTargetConstants/9198690 | 103 | 0 | 0.00 |
| geoTargetConstants/1006886 | 14,333 | 700 | 0.05 |
| geoTargetConstants/9197981 | 140 | 40 | 0.29 |
| geoTargetConstants/9198727 | 219 | 70 | 0.32 |

---

#### Campaign: `gb-en-prm-crm-desktop-broad-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £18,787 | **DEP:** 250 | **DEP/Spend:** 0.01
- **Impressions:** 2,295,523 | **Clicks:** 4,134 | **Conversions:** 25
- **All Conversions Value:** 137,133 | **All Conversions:** 19,785
- **Active Months:** 1 (2026-05-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-05-01 | 18,787 | 250 | 0.01 | 2,295,523 | 4,134 | 25 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `ExcludingDefault_RON-MultiAds` | ENABLED | 10,514 | 150 | 0.01 | 1,058,615 | 37.7 | 23.1 | 18.8 | 16.2 | 39% | 30% |
| `InMarket_CRM_IM` | ENABLED | 4,649 | 70 | 0.02 | 735,641 | 48.6 | 27.3 | 21.9 | 18.8 | 44% | 31% |
| `Employment_CRM_EM` | ENABLED | 3,624 | 30 | 0.01 | 501,267 | 38.6 | 24.6 | 20.2 | 17.5 | 36% | 29% |

**Ads in `ExcludingDefault_RON-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Enthusiast_ComIntuitive_CRM` | 807760779506 | ENABLED | 2,164 | 10 | 0.00 | 282,752 | 31.4 | 22.5 | 19.0 | 16.5 | 28% | 27% |
| `AT_TheMillionaire_Excuseme_CRM` | 807760779500 | ENABLED | 2,053 | 60 | 0.03 | 178,571 | 27.8 | 17.4 | 13.8 | 11.6 | 37% | 33% |
| `CR_Intervention_WeNeed_CRM` | 807760779515 | ENABLED | 1,375 | 0 | 0.00 | 142,136 | 28.4 | 21.3 | 17.5 | 14.9 | 25% | 30% |
| `PD_5features_Automations_CRM` | 807760779524 | ENABLED | 841 | 30 | 0.04 | 97,116 | 93.8 | 37.3 | 27.1 | 23.0 | 60% | 38% |
| `AT_TheMillionaire_Wow_CRM` | 807760779503 | ENABLED | 597 | 0 | 0.00 | 40,058 | 29.0 | 18.9 | 15.3 | 13.0 | 35% | 31% |
| `AT_Car_Bestadvice_CRM` | 807760779482 | ENABLED | 561 | 30 | 0.05 | 56,150 | 39.0 | 25.2 | 21.4 | 18.9 | 35% | 25% |
| `DL_Switchto_CRM` | 807760779521 | ENABLED | 514 | 0 | 0.00 | 36,957 | 21.9 | 15.3 | 12.1 | 9.9 | 30% | 35% |
| `CR_Enthusiast_ComStopIt_CRM` | 807760779509 | ENABLED | 513 | 0 | 0.00 | 66,407 | 34.9 | 26.4 | 23.1 | 20.6 | 24% | 22% |
| `AT_Podcast_HateCRM_CRM` | 807760779497 | ENABLED | 366 | 0 | 0.00 | 31,095 | 29.6 | 21.4 | 17.8 | 15.1 | 28% | 30% |
| `AT_ManUS_Nothing_CRM` | 807760779491 | ENABLED | 270 | 10 | 0.04 | 22,843 | 30.1 | 21.6 | 18.0 | 15.7 | 28% | 27% |
| `PD_5features_Sequences_CRM` | 807760779527 | ENABLED | 240 | 0 | 0.00 | 28,066 | 93.7 | 40.3 | 32.6 | 29.5 | 57% | 27% |
| `DL_Stayinglateagain_CRM` | 807760779518 | ENABLED | 233 | 0 | 0.00 | 14,527 | 23.7 | 16.9 | 13.7 | 11.3 | 29% | 33% |
| `CR_Intervention_Launch_CRM` | 807760779512 | ENABLED | 166 | 0 | 0.00 | 11,089 | 26.3 | 19.7 | 16.2 | 13.6 | 25% | 31% |
| `AT_Car_Tip_CRM` | 807760779485 | ENABLED | 165 | 0 | 0.00 | 12,600 | 39.2 | 26.2 | 22.0 | 19.3 | 33% | 26% |
| `AT_Podcast_BeHonest_CRM` | 807760779494 | ENABLED | 154 | 0 | 0.00 | 12,509 | 26.7 | 18.8 | 15.4 | 13.1 | 30% | 30% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 807760779533 | ENABLED | 134 | 0 | 0.00 | 11,749 | 30.0 | 21.7 | 17.8 | 15.6 | 28% | 28% |
| `AT_ManUS_Efficiency_CRM` | 807760779488 | ENABLED | 121 | 10 | 0.08 | 9,943 | 27.0 | 18.7 | 15.3 | 13.2 | 31% | 29% |
| `PD_Thebiggestdeal_Bam_CRM` | 807760779530 | ENABLED | 47 | 0 | 0.00 | 4,047 | 22.6 | 14.6 | 12.2 | 10.3 | 35% | 30% |

**Ads in `InMarket_CRM_IM`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 807760779272 | ENABLED | 631 | 10 | 0.02 | 46,831 | 32.8 | 21.1 | 16.9 | 14.2 | 36% | 33% |
| `PD_5features_Automations_CRM` | 807760779263 | ENABLED | 551 | 10 | 0.02 | 66,973 | 93.3 | 36.8 | 26.7 | 22.5 | 61% | 39% |
| `AT_Podcast_HateCRM_CRM` | 807760779281 | ENABLED | 463 | 10 | 0.02 | 70,311 | 33.3 | 24.8 | 20.8 | 17.9 | 26% | 28% |
| `AT_Car_Bestadvice_CRM` | 807760779254 | ENABLED | 382 | 10 | 0.03 | 83,332 | 39.5 | 24.6 | 21.0 | 18.6 | 38% | 24% |
| `CR_Intervention_WeNeed_CRM` | 807760779275 | ENABLED | 292 | 0 | 0.00 | 46,716 | 38.5 | 30.5 | 26.1 | 22.5 | 21% | 26% |
| `AT_TheMillionaire_Wow_CRM` | 807760779284 | ENABLED | 255 | 10 | 0.04 | 33,748 | 34.6 | 24.8 | 20.3 | 17.7 | 28% | 29% |
| `CR_Enthusiast_ComIntuitive_CRM` | 807760779299 | ENABLED | 214 | 0 | 0.00 | 25,949 | 38.3 | 27.4 | 23.4 | 20.4 | 28% | 26% |
| `DL_Stayinglateagain_CRM` | 807760779290 | ENABLED | 198 | 0 | 0.00 | 34,035 | 27.4 | 19.7 | 16.3 | 13.9 | 28% | 30% |
| `PD_Thebiggestdeal_Bam_CRM` | 807760779260 | ENABLED | 194 | 10 | 0.05 | 40,163 | 26.9 | 20.5 | 20.5 | 16.7 | 24% | 19% |
| `AT_Podcast_BeHonest_CRM` | 807760779287 | ENABLED | 188 | 0 | 0.00 | 28,886 | 33.5 | 25.7 | 23.2 | 18.8 | 23% | 27% |
| `CR_Enthusiast_ComStopIt_CRM` | 807760779296 | ENABLED | 184 | 0 | 0.00 | 25,715 | 33.6 | 25.3 | 22.7 | 20.1 | 25% | 20% |
| `PD_5features_Sequences_CRM` | 807760779278 | ENABLED | 179 | 0 | 0.00 | 27,602 | 94.9 | 50.6 | 42.7 | 39.5 | 47% | 22% |
| `DL_Switchto_CRM` | 807760779293 | ENABLED | 177 | 0 | 0.00 | 28,175 | 25.1 | 18.9 | 14.9 | 12.5 | 25% | 34% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 807760779266 | ENABLED | 154 | 0 | 0.00 | 31,974 | 32.9 | 27.4 | 24.3 | 22.4 | 16% | 18% |
| `AT_Car_Tip_CRM` | 807760779257 | ENABLED | 152 | 0 | 0.00 | 31,631 | 41.9 | 29.9 | 26.5 | 24.5 | 29% | 18% |
| `AT_ManUS_Nothing_CRM` | 807760779302 | ENABLED | 151 | 10 | 0.07 | 34,795 | 33.4 | 24.6 | 21.4 | 18.8 | 27% | 24% |
| `AT_ManUS_Efficiency_CRM` | 807760779305 | ENABLED | 143 | 0 | 0.00 | 43,788 | 38.6 | 29.2 | 25.2 | 20.8 | 24% | 29% |
| `CR_Intervention_Launch_CRM` | 807760779269 | ENABLED | 140 | 0 | 0.00 | 35,017 | 27.6 | 19.6 | 16.8 | 13.8 | 29% | 30% |

**Ads in `Employment_CRM_EM`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 807760779341 | ENABLED | 623 | 10 | 0.02 | 35,562 | 32.5 | 21.7 | 17.6 | 15.0 | 33% | 31% |
| `PD_5features_Automations_CRM` | 807760779314 | ENABLED | 403 | 0 | 0.00 | 59,563 | 93.8 | 37.3 | 27.7 | 23.8 | 60% | 36% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 807760779332 | ENABLED | 306 | 0 | 0.00 | 53,924 | 40.6 | 28.9 | 24.6 | 21.5 | 29% | 26% |
| `AT_Podcast_HateCRM_CRM` | 807760779347 | ENABLED | 295 | 0 | 0.00 | 46,896 | 36.6 | 28.3 | 23.6 | 19.9 | 23% | 30% |
| `PD_5features_Sequences_CRM` | 807760779311 | ENABLED | 230 | 0 | 0.00 | 29,788 | 93.9 | 43.5 | 36.4 | 33.2 | 54% | 24% |
| `AT_TheMillionaire_Wow_CRM` | 807760779335 | ENABLED | 229 | 10 | 0.04 | 26,113 | 34.6 | 24.8 | 20.6 | 18.3 | 28% | 26% |
| `AT_Car_Bestadvice_CRM` | 807760779308 | ENABLED | 204 | 0 | 0.00 | 37,759 | 40.1 | 27.2 | 24.0 | 20.9 | 32% | 23% |
| `CR_Intervention_WeNeed_CRM` | 807760779344 | ENABLED | 183 | 0 | 0.00 | 25,802 | 35.9 | 28.5 | 25.2 | 20.6 | 21% | 28% |
| `PD_Thebiggestdeal_Bam_CRM` | 807760779329 | ENABLED | 158 | 0 | 0.00 | 25,918 | 14.5 | 10.5 | 10.5 | 9.2 | 27% | 12% |
| `CR_Enthusiast_ComStopIt_CRM` | 807760779350 | ENABLED | 148 | 10 | 0.07 | 19,491 | 38.1 | 27.9 | 23.2 | 21.7 | 27% | 22% |
| `AT_Podcast_BeHonest_CRM` | 807760779326 | ENABLED | 143 | 0 | 0.00 | 22,241 | 34.4 | 23.6 | 20.0 | 15.9 | 31% | 33% |
| `CR_Intervention_Launch_CRM` | 807760779317 | ENABLED | 138 | 0 | 0.00 | 30,787 | 28.7 | 20.7 | 18.0 | 15.3 | 28% | 26% |
| `CR_Enthusiast_ComIntuitive_CRM` | 807760779353 | ENABLED | 132 | 0 | 0.00 | 15,761 | 34.8 | 26.2 | 22.6 | 19.8 | 25% | 24% |
| `DL_Switchto_CRM` | 807760779338 | ENABLED | 105 | 0 | 0.00 | 13,247 | 28.4 | 20.2 | 16.5 | 13.9 | 29% | 31% |
| `DL_Stayinglateagain_CRM` | 807760779323 | ENABLED | 87 | 0 | 0.00 | 8,909 | 29.6 | 22.1 | 18.3 | 15.6 | 25% | 30% |
| `AT_ManUS_Efficiency_CRM` | 807760779359 | ENABLED | 87 | 0 | 0.00 | 17,580 | 27.9 | 18.0 | 14.4 | 12.3 | 36% | 31% |
| `AT_Car_Tip_CRM` | 807760779320 | ENABLED | 78 | 0 | 0.00 | 17,005 | 46.9 | 37.0 | 32.8 | 30.7 | 21% | 17% |
| `AT_ManUS_Nothing_CRM` | 807760779356 | ENABLED | 76 | 0 | 0.00 | 14,921 | 35.2 | 24.5 | 19.1 | 16.9 | 30% | 31% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 18,787 | 250 | 0.01 | 2,295,523 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 3,797 | 70 | 0.02 |
| geoTargetConstants/1007850 | 981 | 10 | 0.01 |
| geoTargetConstants/1006524 | 404 | 0 | 0.00 |
| geoTargetConstants/1006912 | 319 | 0 | 0.00 |
| geoTargetConstants/1007336 | 173 | 0 | 0.00 |
| geoTargetConstants/1006864 | 145 | 0 | 0.00 |
| geoTargetConstants/1006567 | 140 | 0 | 0.00 |
| geoTargetConstants/1006656 | 140 | 0 | 0.00 |
| geoTargetConstants/1007326 | 119 | 0 | 0.00 |
| geoTargetConstants/1006884 | 118 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006524 | 404 | 0 | 0.00 |
| geoTargetConstants/1006912 | 319 | 0 | 0.00 |
| geoTargetConstants/1007336 | 173 | 0 | 0.00 |
| geoTargetConstants/1006864 | 145 | 0 | 0.00 |
| geoTargetConstants/1006567 | 140 | 0 | 0.00 |

---

#### Campaign: `gb-en-brand-work_mgmt-multi-trgt-t-cpm-bumper-regional_awareness-uk-25q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £18,622 | **DEP:** 393 | **DEP/Spend:** 0.02
- **Impressions:** 3,460,954 | **Clicks:** 3,002 | **Conversions:** 393
- **All Conversions Value:** 10,495 | **All Conversions:** 2,000
- **Active Months:** 2 (2025-10-01 → 2025-11-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-10-01 | 13,291 | 271 | 0.02 | 2,365,183 | 2,149 | 271 |
| 2025-11-01 | 5,331 | 122 | 0.02 | 1,095,771 | 853 | 122 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-BumperAds` | ENABLED | 10,462 | 163 | 0.02 | 1,884,887 | 97.6 | 95.5 | 94.1 | 93.2 | 2% | 2% |
| `EnterpriseSoftware_IM-BumperAds` | ENABLED | 6,804 | 190 | 0.03 | 1,329,548 | 97.7 | 95.9 | 94.6 | 93.6 | 2% | 2% |
| `BusinessProductivitySoftware_IM-BumperAds` | ENABLED | 1,357 | 40 | 0.03 | 246,519 | 97.3 | 95.3 | 94.1 | 93.2 | 2% | 2% |

**Ads in `EmployerLarge_EM-BumperAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_6V2_uk_25q4` | 778784654792 | ENABLED | 9,545 | 137 | 0.01 | 1,644,653 | 97.7 | 95.6 | 94.3 | 93.4 | 2% | 2% |
| `BR_sidekick_hero_6V1_uk_25q4` | 778784654354 | ENABLED | 917 | 26 | 0.03 | 240,234 | 97.3 | 94.4 | 92.8 | 91.8 | 3% | 3% |

**Ads in `EnterpriseSoftware_IM-BumperAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_6V2_uk_25q4` | 778784654579 | ENABLED | 6,132 | 166 | 0.03 | 1,150,575 | 97.7 | 95.8 | 94.5 | 93.6 | 2% | 2% |
| `BR_sidekick_hero_6V1_uk_25q4` | 778784654765 | ENABLED | 671 | 24 | 0.04 | 178,973 | 98.1 | 96.1 | 94.8 | 93.8 | 2% | 2% |

**Ads in `BusinessProductivitySoftware_IM-BumperAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `BR_sidekick_hero_6V2_uk_25q4` | 778784654126 | ENABLED | 1,256 | 34 | 0.03 | 219,442 | 97.3 | 95.4 | 94.2 | 93.2 | 2% | 2% |
| `BR_sidekick_hero_6V1_uk_25q4` | 778784654120 | ENABLED | 100 | 6 | 0.06 | 27,077 | 97.5 | 95.0 | 93.5 | 92.5 | 3% | 3% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 11,706 | 160 | 0.01 | 1,619,752 |
| MOBILE | 6,916 | 233 | 0.03 | 1,841,202 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 3,684 | 77 | 0.02 |
| geoTargetConstants/1006524 | 465 | 10 | 0.02 |
| geoTargetConstants/1006912 | 209 | 8 | 0.04 |
| geoTargetConstants/1007336 | 207 | 8 | 0.04 |
| geoTargetConstants/1006864 | 203 | 6 | 0.03 |
| geoTargetConstants/1007326 | 197 | 5 | 0.03 |
| geoTargetConstants/1006567 | 151 | 2 | 0.01 |
| geoTargetConstants/1006884 | 136 | 4 | 0.03 |
| geoTargetConstants/1006656 | 134 | 1 | 0.01 |
| geoTargetConstants/1007064 | 113 | 1 | 0.01 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006948 | 108 | 0 | 0.00 |
| geoTargetConstants/1006656 | 134 | 1 | 0.01 |
| geoTargetConstants/1007064 | 113 | 1 | 0.01 |
| geoTargetConstants/1006567 | 151 | 2 | 0.01 |
| geoTargetConstants/1006886 | 3,684 | 77 | 0.02 |

---

#### Campaign: `gb-en-prm-workos-crm-desktop-topics_cpm-t`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £18,395 | **DEP:** 280 | **DEP/Spend:** 0.02
- **Impressions:** 250,899 | **Clicks:** 269 | **Conversions:** 28
- **All Conversions Value:** 12,561 | **All Conversions:** 877
- **Active Months:** 8 (2024-05-01 → 2024-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 4,127 | 20 | 0.00 | 45,302 | 39 | 2 |
| 2024-06-01 | 3,501 | 30 | 0.01 | 40,090 | 35 | 3 |
| 2024-07-01 | 3,088 | 20 | 0.01 | 40,259 | 49 | 2 |
| 2024-08-01 | 2,598 | 50 | 0.02 | 39,198 | 76 | 5 |
| 2024-09-01 | 2,452 | 90 | 0.04 | 38,338 | 28 | 9 |
| 2024-10-01 | 1,181 | 20 | 0.02 | 21,765 | 16 | 2 |
| 2024-11-01 | 812 | 40 | 0.05 | 14,333 | 15 | 4 |
| 2024-12-01 | 636 | 10 | 0.02 | 11,614 | 11 | 1 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CRM_T-multiAds` | ENABLED | 18,395 | 280 | 0.02 | 250,899 | 25.0 | 13.8 | 10.9 | 9.3 | 45% | 33% |

**Ads in `CRM_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CRMKnightUsingCRM` | 668564800440 | ENABLED | 6,491 | 110 | 0.02 | 83,161 | 40.8 | 20.3 | 15.7 | 13.1 | 50% | 35% |
| `AT_Realestate_Long_PP_CRM` | 694605585986 | ENABLED | 3,291 | 40 | 0.01 | 44,264 | 10.9 | 6.5 | 5.1 | 4.2 | 40% | 35% |
| `AT_Realestate_Long_Platform_CRM` | 694605585989 | ENABLED | 1,852 | 30 | 0.02 | 26,332 | 11.7 | 7.3 | 6.0 | 5.1 | 37% | 30% |
| `CRMQuickWinDemoPerson` | 668564800272 | ENABLED | 1,761 | 40 | 0.02 | 26,407 | 19.9 | 12.8 | 10.6 | 9.3 | 36% | 27% |
| `PD_ActuallyLikeIt_Logo_CRM` | 702508371577 | ENABLED | 1,706 | 10 | 0.01 | 23,791 | 23.4 | 14.9 | 12.2 | 10.7 | 36% | 28% |
| `AT_Realestate_Short_CRM` | 694605585992 | ENABLED | 1,244 | 30 | 0.02 | 18,595 | 14.4 | 8.6 | 6.7 | 5.8 | 40% | 33% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 702508371580 | ENABLED | 1,117 | 20 | 0.02 | 17,549 | 23.2 | 14.8 | 12.1 | 10.6 | 36% | 28% |
| `CRMDegreeAri` | 668564800284 | PAUSED | 447 | 0 | 0.00 | 5,145 | 42.1 | 21.5 | 16.8 | 14.1 | 49% | 34% |
| `PD_WomanPink_Platform_CRM` | 700199013045 | PAUSED | 195 | 0 | 0.00 | 2,550 | 24.0 | 15.1 | 12.9 | 11.4 | 37% | 25% |
| `PD_WomanPink_Face_CRM` | 700296196286 | PAUSED | 166 | 0 | 0.00 | 1,771 | 21.1 | 14.4 | 11.6 | 10.0 | 32% | 30% |
| `TA_Harry_NoBrainer_CRM` | 668564800452 | PAUSED | 125 | 0 | 0.00 | 1,334 | 14.7 | 9.7 | 7.7 | 6.0 | 34% | 38% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 18,395 | 280 | 0.02 | 250,899 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 5,107 | 70 | 0.01 |
| geoTargetConstants/1006912 | 507 | 0 | 0.00 |
| geoTargetConstants/1006524 | 252 | 0 | 0.00 |
| geoTargetConstants/1007009 | 176 | 0 | 0.00 |
| geoTargetConstants/1006567 | 173 | 0 | 0.00 |
| geoTargetConstants/1006864 | 167 | 0 | 0.00 |
| geoTargetConstants/1007336 | 137 | 0 | 0.00 |
| geoTargetConstants/1007326 | 120 | 0 | 0.00 |
| geoTargetConstants/1006656 | 111 | 0 | 0.00 |
| geoTargetConstants/1007080 | 94 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006912 | 507 | 0 | 0.00 |
| geoTargetConstants/1006524 | 252 | 0 | 0.00 |
| geoTargetConstants/1007009 | 176 | 0 | 0.00 |
| geoTargetConstants/1006567 | 173 | 0 | 0.00 |
| geoTargetConstants/1006864 | 167 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-competitors-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £15,135 | **DEP:** 33 | **DEP/Spend:** 0.00
- **Impressions:** 1,154,314 | **Clicks:** 1,244 | **Conversions:** 33
- **All Conversions Value:** 45,408 | **All Conversions:** 6,332
- **Active Months:** 2 (2025-08-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-08-01 | 4,567 | 9 | 0.00 | 282,677 | 359 | 9 |
| 2025-09-01 | 10,568 | 24 | 0.00 | 871,637 | 885 | 24 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CompBig_CA-MultiAds` | ENABLED | 9,836 | 24 | 0.00 | 750,167 | 42.0 | 30.0 | 25.8 | 23.3 | 29% | 22% |
| `CompSmall_CA-MultiAds` | PAUSED | 5,299 | 9 | 0.00 | 404,147 | 36.0 | 25.7 | 21.8 | 19.3 | 29% | 25% |

**Ads in `CompBig_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_NYwoman_NotKnowing` | 769745752475 | PAUSED | 1,053 | 4 | 0.00 | 89,941 | 39.8 | 28.5 | 24.5 | 22.2 | 28% | 22% |
| `PD_InShort_AI` | 769745752487 | PAUSED | 1,013 | 1 | 0.00 | 59,267 | 29.8 | 21.1 | 17.5 | 14.8 | 29% | 30% |
| `PD_Llama_Skeleton_UK` | 769745752445 | ENABLED | 953 | 1 | 0.00 | 78,374 | 24.8 | 17.6 | 14.3 | 12.2 | 29% | 31% |
| `DL_Llama_Dashboards_30s` | 769745752508 | PAUSED | 894 | 3 | 0.00 | 73,581 | 58.0 | 37.6 | 32.2 | 29.4 | 35% | 22% |
| `PD_Llama_Angry_Short_NoIntro` | 769745752451 | ENABLED | 820 | 4 | 0.00 | 60,376 | 43.0 | 28.4 | 23.8 | 21.1 | 34% | 26% |
| `PD_Llama_Skeleton` | 769745752310 | ENABLED | 550 | 0 | 0.00 | 41,611 | 28.0 | 20.3 | 16.5 | 14.1 | 27% | 30% |
| `DL_AI_Llama_Long` | 769745752307 | ENABLED | 401 | 0 | 0.00 | 27,837 | 35.8 | 27.6 | 24.3 | 21.7 | 23% | 21% |
| `AT_NYwoman_Manager` | 769745752295 | PAUSED | 319 | 0 | 0.00 | 26,469 | 42.9 | 32.0 | 28.1 | 25.8 | 25% | 19% |
| `DL_Llama_Long` | 769745752316 | PAUSED | 308 | 0 | 0.00 | 21,794 | 32.1 | 23.5 | 19.6 | 16.9 | 27% | 28% |
| `AT_NYwoman_Short` | 769745752463 | PAUSED | 286 | 0 | 0.00 | 24,163 | 56.1 | 41.0 | 36.4 | 33.7 | 27% | 18% |
| `DL_Llama_47s` | 769745752457 | PAUSED | 284 | 2 | 0.01 | 24,227 | 49.0 | 38.9 | 34.9 | 32.1 | 21% | 17% |
| `CR_Confidence_Women_UK` | 769745752484 | PAUSED | 250 | 1 | 0.00 | 20,244 | 44.6 | 31.8 | 27.5 | 24.9 | 29% | 22% |
| `DL_Llama_Angry_Long` | 769745752505 | PAUSED | 249 | 0 | 0.00 | 18,497 | 33.7 | 25.8 | 21.6 | 18.8 | 23% | 27% |
| `PD_Llama_Angry` | 769745752292 | PAUSED | 232 | 0 | 0.00 | 16,658 | 30.7 | 23.4 | 19.0 | 16.7 | 24% | 29% |
| `AT_Llama_short` | 769745752313 | PAUSED | 219 | 0 | 0.00 | 14,790 | 40.3 | 31.3 | 27.4 | 24.9 | 22% | 20% |
| `CR_Confidence_Men_UK` | 769745752298 | PAUSED | 204 | 2 | 0.01 | 14,216 | 44.4 | 31.4 | 27.6 | 25.1 | 29% | 20% |
| `DL_Llama_Templates_30s` | 769745752478 | PAUSED | 183 | 0 | 0.00 | 14,686 | 62.2 | 42.1 | 36.9 | 33.9 | 32% | 20% |
| `PD_Reports_woman` | 769745752490 | PAUSED | 175 | 0 | 0.00 | 12,871 | 50.2 | 40.0 | 35.9 | 33.0 | 20% | 18% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 769745752301 | ENABLED | 163 | 0 | 0.00 | 13,321 | 47.7 | 33.9 | 29.1 | 26.7 | 29% | 21% |
| `PD_AI_Llama` | 769745752289 | ENABLED | 138 | 0 | 0.00 | 10,138 | 54.5 | 42.7 | 38.7 | 36.1 | 22% | 15% |
| `PD_Linear_Group` | 769745752466 | PAUSED | 136 | 0 | 0.00 | 9,623 | 38.7 | 29.3 | 24.4 | 21.8 | 24% | 26% |
| `PD_Llama_Angry_Short` | 769745752481 | PAUSED | 128 | 0 | 0.00 | 10,945 | 48.9 | 37.5 | 33.9 | 31.4 | 23% | 16% |
| `PD_Linear_Actress` | 769745752502 | PAUSED | 120 | 0 | 0.00 | 8,306 | 37.8 | 28.7 | 24.1 | 20.9 | 24% | 27% |
| `DL_Llama_AnyType_30s` | 769745752499 | PAUSED | 119 | 1 | 0.01 | 10,525 | 60.2 | 40.1 | 34.9 | 32.4 | 33% | 19% |
| `PD_AI_Eduardo` | 769745752469 | ENABLED | 89 | 1 | 0.01 | 6,636 | 52.0 | 42.1 | 38.0 | 35.6 | 19% | 16% |
| `AT_Llama_30s` | 769745752460 | PAUSED | 86 | 0 | 0.00 | 6,695 | 60.4 | 39.4 | 34.1 | 31.2 | 35% | 21% |
| `AT_Llama_long-alt` | 769745752472 | PAUSED | 82 | 0 | 0.00 | 4,956 | 34.7 | 24.4 | 20.8 | 17.9 | 30% | 27% |
| `PD_WorkOS_21sec` | 769745752448 | PAUSED | 82 | 2 | 0.02 | 6,460 | 94.7 | 51.5 | 44.0 | 40.5 | 46% | 21% |
| `DL_AI_Llama_Short` | 769745752319 | ENABLED | 62 | 1 | 0.02 | 5,275 | 63.8 | 52.5 | 48.1 | 45.4 | 18% | 14% |
| `PD_TikToker_HackM` | 769745752511 | PAUSED | 56 | 0 | 0.00 | 4,456 | 57.6 | 46.7 | 42.8 | 39.9 | 19% | 14% |
| `PD_TikToker_HackW` | 769745752514 | PAUSED | 46 | 0 | 0.00 | 4,149 | 72.5 | 62.9 | 58.9 | 56.2 | 13% | 11% |
| `AT_Llama_long` | 769745752304 | PAUSED | 44 | 0 | 0.00 | 2,803 | 35.8 | 26.2 | 22.4 | 19.5 | 27% | 25% |
| `UT_Frank_Mix` | 769745752442 | PAUSED | 35 | 1 | 0.03 | 2,448 | 69.0 | 59.2 | 55.4 | 52.5 | 14% | 11% |
| `AT_Llama_30s-alt` | 769745752496 | PAUSED | 28 | 0 | 0.00 | 1,936 | 71.3 | 52.7 | 47.6 | 44.3 | 26% | 16% |
| `PD_TikToker_GoodNewsM` | 769745752493 | PAUSED | 26 | 0 | 0.00 | 1,893 | 61.4 | 51.5 | 47.9 | 45.6 | 16% | 11% |

**Ads in `CompSmall_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Llama_Skeleton_UK` | 769745752781 | ENABLED | 1,644 | 4 | 0.00 | 130,892 | 23.6 | 16.7 | 13.6 | 11.6 | 29% | 31% |
| `PD_InShort_AI` | 769745752943 | PAUSED | 509 | 2 | 0.00 | 28,652 | 29.8 | 21.1 | 17.4 | 14.5 | 29% | 31% |
| `PD_Llama_Angry_Short_NoIntro` | 769745752787 | ENABLED | 345 | 1 | 0.00 | 27,001 | 42.5 | 27.8 | 23.2 | 20.6 | 35% | 26% |
| `PD_Llama_Skeleton` | 769745752766 | ENABLED | 267 | 0 | 0.00 | 20,040 | 27.7 | 20.1 | 16.3 | 13.9 | 28% | 31% |
| `AT_NYwoman_NotKnowing` | 769745752931 | PAUSED | 194 | 0 | 0.00 | 16,967 | 42.5 | 31.6 | 27.5 | 25.1 | 26% | 21% |
| `AT_NYwoman_Manager` | 769745752751 | PAUSED | 184 | 0 | 0.00 | 13,892 | 41.1 | 30.0 | 26.1 | 23.6 | 27% | 21% |
| `DL_Llama_Dashboards_30s` | 769745752964 | PAUSED | 179 | 0 | 0.00 | 14,894 | 57.9 | 36.9 | 31.7 | 28.9 | 36% | 22% |
| `DL_Llama_Long` | 769745752772 | PAUSED | 179 | 0 | 0.00 | 12,735 | 31.4 | 23.3 | 19.6 | 17.1 | 26% | 27% |
| `DL_AI_Llama_Long` | 769745752763 | ENABLED | 176 | 0 | 0.00 | 12,407 | 34.2 | 26.1 | 22.7 | 20.1 | 24% | 23% |
| `DL_Llama_Angry_Long` | 769745752961 | PAUSED | 142 | 0 | 0.00 | 10,671 | 33.3 | 25.6 | 21.6 | 18.8 | 23% | 27% |
| `AT_NYwoman_Short` | 769745752799 | PAUSED | 140 | 0 | 0.00 | 11,882 | 55.2 | 39.8 | 35.1 | 32.4 | 28% | 18% |
| `CR_Confidence_Women_UK` | 769745752940 | PAUSED | 118 | 1 | 0.01 | 9,641 | 42.0 | 29.1 | 24.7 | 22.2 | 31% | 24% |
| `DL_Llama_47s` | 769745752793 | PAUSED | 104 | 0 | 0.00 | 9,127 | 48.5 | 38.8 | 35.2 | 32.0 | 20% | 18% |
| `CR_Confidence_Men_UK` | 769745752754 | PAUSED | 103 | 0 | 0.00 | 7,134 | 41.0 | 27.5 | 23.5 | 21.2 | 33% | 23% |
| `PD_Llama_Angry` | 769745752748 | PAUSED | 95 | 0 | 0.00 | 7,383 | 31.4 | 23.9 | 19.3 | 16.9 | 24% | 29% |
| `PD_Reports_woman` | 769745752946 | PAUSED | 88 | 0 | 0.00 | 6,457 | 44.6 | 35.0 | 30.9 | 28.5 | 22% | 18% |
| `PD_Llama_Angry_Short` | 769745752937 | PAUSED | 82 | 0 | 0.00 | 6,411 | 46.8 | 35.2 | 31.0 | 28.5 | 25% | 19% |
| `PD_AI_Llama` | 769745752745 | ENABLED | 81 | 1 | 0.01 | 6,230 | 52.8 | 41.3 | 36.7 | 33.5 | 22% | 19% |
| `AT_Llama_short` | 769745752769 | PAUSED | 80 | 0 | 0.00 | 6,126 | 39.1 | 30.0 | 26.3 | 23.6 | 23% | 22% |
| `DL_Llama_Templates_30s` | 769745752934 | PAUSED | 66 | 0 | 0.00 | 5,781 | 58.1 | 37.8 | 33.5 | 29.9 | 35% | 21% |
| `PD_Linear_Group` | 769745752922 | PAUSED | 61 | 0 | 0.00 | 4,399 | 38.5 | 28.8 | 23.8 | 20.5 | 25% | 29% |
| `PD_Llama_Angry_Short_NoIntro_UK` | 769745752757 | ENABLED | 61 | 0 | 0.00 | 5,714 | 46.2 | 31.6 | 26.3 | 23.6 | 32% | 25% |
| `PD_Linear_Actress` | 769745752958 | PAUSED | 56 | 0 | 0.00 | 4,000 | 34.0 | 25.2 | 20.7 | 17.7 | 26% | 29% |
| `DL_Llama_AnyType_30s` | 769745752955 | PAUSED | 52 | 0 | 0.00 | 4,209 | 57.2 | 37.4 | 31.5 | 28.9 | 35% | 23% |
| `PD_AI_Eduardo` | 769745752925 | ENABLED | 45 | 0 | 0.00 | 3,004 | 46.0 | 36.4 | 33.4 | 30.8 | 21% | 16% |
| `AT_Llama_long-alt` | 769745752928 | PAUSED | 35 | 0 | 0.00 | 2,162 | 34.3 | 23.9 | 19.8 | 17.6 | 30% | 26% |
| `AT_Llama_30s` | 769745752796 | PAUSED | 35 | 0 | 0.00 | 2,913 | 57.7 | 37.1 | 31.4 | 28.5 | 36% | 23% |
| `PD_WorkOS_21sec` | 769745752784 | PAUSED | 35 | 0 | 0.00 | 2,923 | 95.2 | 51.4 | 43.4 | 39.5 | 46% | 23% |
| `DL_AI_Llama_Short` | 769745752775 | ENABLED | 31 | 0 | 0.00 | 2,422 | 57.2 | 46.5 | 42.1 | 39.4 | 19% | 15% |
| `PD_TikToker_HackM` | 769745752967 | PAUSED | 28 | 0 | 0.00 | 2,070 | 49.6 | 38.8 | 35.7 | 32.8 | 22% | 15% |
| `AT_Llama_long` | 769745752760 | PAUSED | 22 | 0 | 0.00 | 1,378 | 37.4 | 29.0 | 23.8 | 20.7 | 22% | 29% |
| `UT_Frank_Mix` | 769745752778 | PAUSED | 18 | 0 | 0.00 | 1,293 | 64.6 | 53.8 | 48.8 | 44.8 | 17% | 17% |
| `PD_TikToker_HackW` | 769745752970 | PAUSED | 16 | 0 | 0.00 | 1,513 | 67.9 | 59.3 | 55.0 | 51.7 | 13% | 13% |
| `PD_TikToker_GoodNewsM` | 769745752949 | PAUSED | 14 | 0 | 0.00 | 921 | 54.7 | 45.8 | 41.8 | 38.9 | 16% | 15% |
| `AT_Llama_30s-alt` | 769745752952 | PAUSED | 13 | 0 | 0.00 | 903 | 66.3 | 47.6 | 42.1 | 39.1 | 28% | 18% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 15,135 | 33 | 0.00 | 1,154,314 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 3,300 | 8 | 0.00 |
| geoTargetConstants/1007850 | 959 | 0 | 0.00 |
| geoTargetConstants/1006524 | 276 | 2 | 0.01 |
| geoTargetConstants/1006912 | 183 | 0 | 0.00 |
| geoTargetConstants/1007336 | 124 | 0 | 0.00 |
| geoTargetConstants/1006864 | 112 | 0 | 0.00 |
| geoTargetConstants/1006656 | 110 | 0 | 0.00 |
| geoTargetConstants/1006567 | 102 | 0 | 0.00 |
| geoTargetConstants/1007326 | 96 | 0 | 0.00 |
| geoTargetConstants/1006884 | 92 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007850 | 959 | 0 | 0.00 |
| geoTargetConstants/1006912 | 183 | 0 | 0.00 |
| geoTargetConstants/1007336 | 124 | 0 | 0.00 |
| geoTargetConstants/1006864 | 112 | 0 | 0.00 |
| geoTargetConstants/1006656 | 110 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-new_topics-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £13,587 | **DEP:** 3,400 | **DEP/Spend:** 0.25
- **Impressions:** 1,005,286 | **Clicks:** 964 | **Conversions:** 34
- **All Conversions Value:** 44,641 | **All Conversions:** 3,026
- **Active Months:** 3 (2024-05-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 6,464 | 1,800 | 0.28 | 527,946 | 525 | 18 |
| 2024-06-01 | 4,237 | 700 | 0.17 | 339,278 | 306 | 7 |
| 2024-07-01 | 2,885 | 900 | 0.31 | 138,062 | 133 | 9 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessServices_T-MultiAds` | ENABLED | 6,211 | 1,900 | 0.31 | 398,079 | 23.8 | 14.3 | 11.1 | 9.0 | 40% | 37% |
| `BusinessOperations_T-MultiAds` | ENABLED | 2,774 | 600 | 0.22 | 164,747 | 23.8 | 12.9 | 9.8 | 7.7 | 46% | 40% |
| `ShippingLogistics_T-MultiAds` | ENABLED | 2,658 | 300 | 0.11 | 319,947 | 25.4 | 15.3 | 12.3 | 10.1 | 40% | 34% |
| `BusinessFinance_T-MultiAds` | ENABLED | 1,156 | 400 | 0.35 | 60,731 | 24.3 | 14.0 | 10.7 | 8.6 | 42% | 39% |
| `Manufacturing_T-MultiAds` | ENABLED | 611 | 200 | 0.33 | 49,108 | 21.2 | 12.4 | 9.6 | 7.7 | 42% | 38% |
| `RetailTrade_T-MultiAds` | ENABLED | 99 | 0 | 0.00 | 6,310 | 25.6 | 14.7 | 11.2 | 9.5 | 43% | 35% |
| `Software_ContentMgmt_T-MultiAds` | ENABLED | 78 | 0 | 0.00 | 6,364 | 23.5 | 12.5 | 8.8 | 6.7 | 47% | 46% |

**Ads in `BusinessServices_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446227501 | PAUSED | 1,751 | 600 | 0.34 | 131,093 | 21.9 | 13.5 | 10.5 | 8.6 | 38% | 36% |
| `PD_ArtOfWork_Customize` | 704564166640 | PAUSED | 954 | 400 | 0.42 | 33,538 | 16.3 | 10.7 | 8.2 | 5.9 | 34% | 44% |
| `PD_Linear_Actress` | 694446227954 | PAUSED | 607 | 400 | 0.66 | 31,456 | 21.0 | 14.2 | 11.3 | 9.4 | 32% | 34% |
| `UT_SOH_Flexibility` | 694446227432 | PAUSED | 591 | 300 | 0.51 | 37,720 | 26.7 | 15.4 | 12.2 | 10.0 | 42% | 35% |
| `PD_TikToker_GoodNewsW` | 701554802086 | PAUSED | 587 | 0 | 0.00 | 25,435 | 24.3 | 14.9 | 11.6 | 9.4 | 39% | 37% |
| `AT_Shmuel_NewSplit` | 700168357582 | PAUSED | 526 | 100 | 0.19 | 39,492 | 32.1 | 17.9 | 13.4 | 10.8 | 44% | 40% |
| `PD_Linear_Group` | 694446227441 | PAUSED | 324 | 100 | 0.31 | 20,277 | 24.6 | 17.6 | 14.4 | 12.1 | 29% | 31% |
| `PD_YesBut_DeliverWW` | 694446216890 | ENABLED | 294 | 0 | 0.00 | 27,123 | 17.3 | 11.0 | 8.6 | 7.2 | 36% | 35% |
| `PD_Dialogue_Long` | 694446217139 | PAUSED | 176 | 0 | 0.00 | 10,342 | 17.1 | 11.3 | 8.7 | 6.6 | 34% | 41% |
| `PD_WorkOS_21sec_UK` | 694421897225 | PAUSED | 87 | 0 | 0.00 | 5,683 | 66.7 | 21.4 | 14.9 | 12.0 | 68% | 44% |
| `PD_WorkOS_21sec` | 694446228221 | PAUSED | 59 | 0 | 0.00 | 12,288 | 89.4 | 28.6 | 19.9 | 16.4 | 68% | 43% |
| `EfficiencyProductDemoTeams` | 694446216236 | PAUSED | 40 | 0 | 0.00 | 3,281 | 27.6 | 17.8 | 14.6 | 12.4 | 36% | 30% |
| `PD_YesBut_GoodAtWW` | 694446216875 | ENABLED | 30 | 0 | 0.00 | 2,135 | 25.0 | 18.4 | 15.2 | 13.1 | 26% | 28% |
| `PD_TikToker_HackW` | 701554801876 | PAUSED | 25 | 0 | 0.00 | 1,384 | 27.7 | 18.3 | 14.2 | 11.2 | 34% | 39% |
| `PD_YesBut_GoodAtMW` | 694446217154 | ENABLED | 22 | 0 | 0.00 | 4,073 | 22.8 | 15.2 | 11.8 | 10.2 | 33% | 33% |
| `PD_TikToker_HackM` | 701554802764 | PAUSED | 20 | 0 | 0.00 | 1,029 | 28.3 | 17.2 | 13.0 | 10.3 | 39% | 40% |
| `PD_YesBut_DeliverBritishRU` | 694421897273 | ENABLED | 15 | 0 | 0.00 | 1,074 | 18.2 | 11.2 | 8.3 | 6.8 | 39% | 39% |
| `AT_Shmuel_ShortRegular` | 698964745338 | PAUSED | 15 | 0 | 0.00 | 991 | 43.2 | 18.1 | 13.3 | 10.4 | 58% | 42% |
| `CR_HiGoogie` | 694446227900 | PAUSED | 12 | 0 | 0.00 | 1,015 | 41.1 | 19.4 | 14.7 | 12.3 | 53% | 37% |
| `PD_WorkOS_Long_UK` | 694421897279 | PAUSED | 12 | 0 | 0.00 | 2,546 | 19.4 | 14.3 | 13.3 | 10.6 | 26% | 26% |

**Ads in `BusinessOperations_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Shmuel_NewSplit` | 700168357387 | PAUSED | 463 | 0 | 0.00 | 21,202 | 31.1 | 15.7 | 11.6 | 9.0 | 50% | 43% |
| `PD_Linear_Actress` | 694446217112 | PAUSED | 392 | 0 | 0.00 | 17,027 | 16.8 | 10.1 | 7.9 | 6.2 | 40% | 39% |
| `UT_SOH_Flexibility` | 694446227414 | PAUSED | 359 | 100 | 0.28 | 16,043 | 26.9 | 14.0 | 10.6 | 8.6 | 48% | 39% |
| `PD_WorkOS_Long` | 694446217589 | PAUSED | 354 | 0 | 0.00 | 24,204 | 21.9 | 13.0 | 9.9 | 8.0 | 40% | 39% |
| `PD_YesBut_DeliverWW` | 694446217178 | ENABLED | 308 | 0 | 0.00 | 17,260 | 15.9 | 9.4 | 7.1 | 5.6 | 41% | 40% |
| `PD_Linear_Group` | 694446216467 | PAUSED | 201 | 100 | 0.50 | 10,313 | 18.5 | 11.6 | 9.0 | 7.4 | 37% | 36% |
| `PD_WorkOS_21sec` | 694446227981 | PAUSED | 150 | 100 | 0.67 | 28,025 | 83.7 | 39.5 | 29.2 | 24.7 | 53% | 37% |
| `PD_ArtOfWork_Customize` | 704564165755 | PAUSED | 145 | 0 | 0.00 | 5,385 | 16.4 | 10.5 | 8.1 | 5.6 | 36% | 47% |
| `PD_Dialogue_Long` | 694446216449 | PAUSED | 110 | 200 | 1.82 | 4,918 | 15.2 | 9.2 | 6.7 | 4.9 | 40% | 47% |
| `PD_WorkOS_21sec_UK` | 694421897216 | PAUSED | 75 | 100 | 1.33 | 4,970 | 70.7 | 22.7 | 15.8 | 11.9 | 68% | 48% |
| `PD_TikToker_GoodNewsW` | 701554802818 | PAUSED | 43 | 0 | 0.00 | 1,933 | 25.4 | 14.9 | 12.1 | 9.6 | 41% | 36% |
| `EfficiencyProductDemoTeams` | 694446216665 | PAUSED | 29 | 0 | 0.00 | 1,486 | 25.4 | 15.3 | 12.2 | 9.9 | 40% | 35% |
| `AT_Shmuel_ShortRegular` | 698964745149 | PAUSED | 26 | 0 | 0.00 | 1,250 | 46.9 | 21.0 | 15.1 | 12.2 | 55% | 42% |
| `PD_YesBut_GoodAtWW` | 694446217436 | ENABLED | 17 | 0 | 0.00 | 883 | 20.7 | 15.2 | 12.8 | 10.7 | 26% | 29% |
| `PD_YesBut_DeliverBritishRU` | 694421897222 | ENABLED | 16 | 0 | 0.00 | 856 | 15.7 | 9.5 | 8.0 | 6.6 | 40% | 30% |
| `PD_WorkOS_Long_UK` | 694421897267 | PAUSED | 15 | 0 | 0.00 | 2,254 | 24.0 | 17.0 | 14.5 | 10.7 | 29% | 37% |
| `PD_TikToker_HackW` | 701554800895 | PAUSED | 11 | 0 | 0.00 | 645 | 24.3 | 14.3 | 10.0 | 8.2 | 41% | 43% |
| `CR_HiGoogie` | 694446217094 | PAUSED | 10 | 0 | 0.00 | 955 | 33.6 | 16.8 | 12.3 | 8.3 | 50% | 51% |

**Ads in `ShippingLogistics_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446216470 | PAUSED | 814 | 100 | 0.12 | 103,435 | 21.0 | 13.4 | 10.7 | 8.7 | 36% | 35% |
| `UT_SOH_Flexibility` | 694446228419 | PAUSED | 635 | 0 | 0.00 | 69,857 | 26.4 | 15.9 | 12.9 | 10.8 | 40% | 32% |
| `AT_Shmuel_NewSplit` | 700168358077 | PAUSED | 381 | 100 | 0.26 | 49,710 | 31.1 | 17.1 | 13.2 | 10.9 | 45% | 37% |
| `PD_ArtOfWork_Customize` | 704564166124 | PAUSED | 188 | 0 | 0.00 | 15,024 | 16.0 | 10.8 | 8.0 | 6.2 | 33% | 42% |
| `PD_Dialogue_Long` | 694446217382 | PAUSED | 126 | 0 | 0.00 | 13,383 | 15.5 | 10.4 | 8.4 | 6.2 | 33% | 41% |
| `EfficiencyProductDemoTeams` | 694446227738 | PAUSED | 100 | 0 | 0.00 | 13,944 | 31.7 | 21.7 | 18.2 | 15.5 | 32% | 28% |
| `PD_YesBut_DeliverWW` | 694446216896 | ENABLED | 91 | 100 | 1.10 | 12,758 | 16.7 | 11.2 | 9.1 | 7.2 | 33% | 35% |
| `PD_TikToker_GoodNewsW` | 701554800610 | PAUSED | 88 | 0 | 0.00 | 8,600 | 28.9 | 19.0 | 15.6 | 12.9 | 34% | 32% |
| `PD_Linear_Group` | 694446228212 | PAUSED | 70 | 0 | 0.00 | 10,544 | 23.4 | 17.2 | 14.4 | 12.1 | 27% | 29% |
| `PD_Linear_Actress` | 694446217388 | PAUSED | 51 | 0 | 0.00 | 6,641 | 25.6 | 18.6 | 15.7 | 13.5 | 27% | 28% |
| `PD_WorkOS_21sec_UK` | 694421897243 | PAUSED | 37 | 0 | 0.00 | 5,526 | 64.4 | 20.2 | 14.9 | 11.4 | 69% | 44% |

**Ads in `BusinessFinance_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446216710 | PAUSED | 395 | 100 | 0.25 | 22,284 | 22.1 | 13.5 | 10.3 | 8.4 | 39% | 38% |
| `PD_ArtOfWork_Customize` | 704564166628 | PAUSED | 151 | 200 | 1.33 | 5,043 | 16.2 | 10.0 | 7.4 | 5.4 | 38% | 46% |
| `AT_Shmuel_NewSplit` | 700168357390 | PAUSED | 124 | 100 | 0.81 | 7,224 | 32.9 | 16.9 | 12.5 | 9.8 | 49% | 42% |
| `UT_SOH_Flexibility` | 694446216941 | PAUSED | 114 | 0 | 0.00 | 6,010 | 28.0 | 16.1 | 12.7 | 10.3 | 43% | 36% |
| `PD_Linear_Actress` | 694446228395 | PAUSED | 86 | 0 | 0.00 | 3,990 | 20.3 | 13.2 | 9.9 | 8.1 | 35% | 39% |
| `PD_YesBut_DeliverWW` | 694446216602 | ENABLED | 69 | 0 | 0.00 | 4,686 | 16.4 | 9.9 | 7.4 | 6.0 | 40% | 39% |
| `PD_Linear_Group` | 694446216176 | PAUSED | 65 | 0 | 0.00 | 3,483 | 21.2 | 14.2 | 11.2 | 9.4 | 33% | 34% |
| `PD_TikToker_GoodNewsW` | 701554801606 | PAUSED | 43 | 0 | 0.00 | 2,056 | 23.8 | 14.8 | 11.8 | 10.0 | 38% | 32% |
| `PD_Dialogue_Long` | 694446217118 | PAUSED | 28 | 0 | 0.00 | 1,379 | 16.3 | 10.4 | 7.5 | 5.4 | 36% | 48% |
| `PD_WorkOS_21sec_UK` | 694421897240 | PAUSED | 24 | 0 | 0.00 | 1,240 | 67.4 | 22.9 | 16.6 | 12.0 | 66% | 48% |
| `EfficiencyProductDemoTeams` | 694446216137 | PAUSED | 12 | 0 | 0.00 | 612 | 31.7 | 20.1 | 16.7 | 13.9 | 37% | 31% |

**Ads in `Manufacturing_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446228140 | PAUSED | 255 | 100 | 0.39 | 21,235 | 18.9 | 11.3 | 8.7 | 7.1 | 40% | 38% |
| `UT_SOH_Flexibility` | 694446227438 | PAUSED | 105 | 0 | 0.00 | 8,735 | 23.4 | 13.3 | 10.4 | 8.3 | 43% | 38% |
| `PD_ArtOfWork_Customize` | 704564166403 | PAUSED | 86 | 100 | 1.16 | 4,818 | 14.2 | 8.8 | 6.9 | 5.1 | 38% | 42% |
| `AT_Shmuel_NewSplit` | 700168357168 | PAUSED | 35 | 0 | 0.00 | 3,697 | 29.4 | 15.7 | 12.3 | 9.2 | 47% | 41% |
| `PD_YesBut_DeliverWW` | 694446227645 | ENABLED | 20 | 0 | 0.00 | 1,710 | 15.4 | 10.2 | 8.4 | 7.2 | 34% | 30% |
| `PD_TikToker_GoodNewsW` | 701554800604 | PAUSED | 18 | 0 | 0.00 | 1,121 | 23.3 | 14.2 | 10.8 | 8.0 | 39% | 44% |
| `PD_Linear_Group` | 694446216440 | PAUSED | 18 | 0 | 0.00 | 1,613 | 21.2 | 15.0 | 12.2 | 10.3 | 29% | 31% |
| `EfficiencyProductDemoTeams` | 694446217103 | PAUSED | 14 | 0 | 0.00 | 1,258 | 24.3 | 16.5 | 13.2 | 10.6 | 32% | 36% |
| `PD_Linear_Actress` | 694446217115 | PAUSED | 11 | 0 | 0.00 | 789 | 24.9 | 18.3 | 14.8 | 13.1 | 26% | 28% |
| `PD_Dialogue_Long` | 694446216152 | PAUSED | 11 | 0 | 0.00 | 924 | 14.2 | 8.9 | 6.9 | 5.5 | 37% | 38% |

**Ads in `RetailTrade_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446217619 | PAUSED | 30 | 0 | 0.00 | 2,013 | 22.1 | 13.1 | 9.8 | 8.7 | 41% | 34% |
| `PD_ArtOfWork_Customize` | 704564166421 | PAUSED | 25 | 0 | 0.00 | 1,063 | 17.6 | 11.6 | 8.0 | 5.8 | 34% | 50% |

**Ads in `Software_ContentMgmt_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 694446216182 | PAUSED | 17 | 0 | 0.00 | 984 | 19.1 | 10.5 | 7.8 | 6.3 | 45% | 40% |
| `PD_ArtOfWork_Customize` | 704564166631 | PAUSED | 13 | 0 | 0.00 | 341 | 16.8 | 12.8 | 9.1 | 5.8 | 24% | 55% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 13,587 | 3,400 | 0.25 | 1,005,286 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 3,280 | 800 | 0.24 |
| geoTargetConstants/1006912 | 255 | 0 | 0.00 |
| geoTargetConstants/1006524 | 248 | 0 | 0.00 |
| geoTargetConstants/1006567 | 142 | 0 | 0.00 |
| geoTargetConstants/1006864 | 127 | 0 | 0.00 |
| geoTargetConstants/1007064 | 101 | 0 | 0.00 |
| geoTargetConstants/1006656 | 101 | 0 | 0.00 |
| geoTargetConstants/1007336 | 100 | 0 | 0.00 |
| geoTargetConstants/1007326 | 98 | 0 | 0.00 |
| geoTargetConstants/1006884 | 84 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006912 | 255 | 0 | 0.00 |
| geoTargetConstants/1006524 | 248 | 0 | 0.00 |
| geoTargetConstants/1006567 | 142 | 0 | 0.00 |
| geoTargetConstants/1006864 | 127 | 0 | 0.00 |
| geoTargetConstants/1007064 | 101 | 0 | 0.00 |

---

#### Campaign: `gb-en-prm-workos-crm-ctv-trgt-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £12,623 | **DEP:** 128 | **DEP/Spend:** 0.01
- **Impressions:** 963,122 | **Clicks:** 406 | **Conversions:** 29
- **All Conversions Value:** 24,124 | **All Conversions:** 3,514
- **Active Months:** 5 (2025-05-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 4,548 | 32 | 0.01 | 323,632 | 119 | 5 |
| 2025-06-01 | 3,014 | 53 | 0.02 | 227,989 | 91 | 8 |
| 2025-07-01 | 2,441 | 7 | 0.00 | 182,767 | 92 | 7 |
| 2025-08-01 | 2,468 | 25 | 0.01 | 214,417 | 95 | 7 |
| 2025-09-01 | 153 | 10 | 0.07 | 14,317 | 9 | 1 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CRM_S-MultiAds` | ENABLED | 5,824 | 80 | 0.01 | 377,725 | 48.4 | 39.2 | 35.1 | 32.3 | 19% | 18% |
| `CompCRMBig_S-MultiAds` | ENABLED | 3,238 | 24 | 0.01 | 238,080 | 48.2 | 39.5 | 35.5 | 32.5 | 18% | 18% |
| `CompCRMSmall_S-MultiAds` | ENABLED | 3,142 | 22 | 0.01 | 319,104 | 49.9 | 41.4 | 37.3 | 34.5 | 17% | 16% |
| `CRM_KW-MultiAds` | ENABLED | 224 | 2 | 0.01 | 9,698 | 36.5 | 27.8 | 24.2 | 21.5 | 24% | 23% |
| `BusinessOperations_T-multiAds` | ENABLED | 106 | 0 | 0.00 | 11,685 | 44.8 | 36.3 | 32.3 | 29.5 | 19% | 19% |
| `CompetitorsCRMV2_KW-MultiAds` | ENABLED | 50 | 0 | 0.00 | 2,436 | 45.3 | 36.2 | 32.1 | 29.1 | 20% | 20% |
| `Marketing_Sales_T-multiAds` | ENABLED | 23 | 0 | 0.00 | 2,088 | 41.0 | 32.1 | 28.4 | 25.5 | 22% | 20% |
| `CRM_T-multiAds` | ENABLED | 16 | 0 | 0.00 | 2,306 | 42.2 | 33.1 | 28.7 | 24.6 | 22% | 26% |

**Ads in `CRM_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 752078420282 | PAUSED | 905 | 12 | 0.01 | 56,981 | 34.3 | 25.3 | 20.6 | 17.5 | 26% | 31% |
| `CR_President_Long_CRM` | 751994711662 | PAUSED | 523 | 10 | 0.02 | 30,038 | 26.7 | 18.9 | 15.3 | 13.6 | 29% | 28% |
| `PD_AIPodcast_Short_CRM` | 751995060628 | PAUSED | 492 | 14 | 0.03 | 37,753 | 56.8 | 47.3 | 43.3 | 40.2 | 17% | 15% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 751974472719 | PAUSED | 486 | 1 | 0.00 | 27,957 | 54.4 | 45.8 | 41.5 | 39.0 | 16% | 15% |
| `CR_President_ShortNo_CRM` | 752078453708 | ENABLED | 439 | 14 | 0.03 | 28,088 | 52.6 | 43.3 | 39.5 | 37.1 | 18% | 14% |
| `PD_WomanPink_Face_CRM` | 752077403657 | ENABLED | 382 | 0 | 0.00 | 22,475 | 57.4 | 49.4 | 45.4 | 42.2 | 14% | 15% |
| `DL_Nightmare_Long_CRM` | 765080211973 | ENABLED | 341 | 12 | 0.03 | 25,318 | 34.7 | 26.5 | 22.3 | 19.2 | 24% | 28% |
| `CR_President_Short_CRM` | 752078330324 | ENABLED | 331 | 0 | 0.00 | 18,107 | 55.4 | 46.4 | 42.9 | 40.6 | 16% | 13% |
| `PD_WomanPink_Platform_CRM` | 751974565155 | PAUSED | 300 | 0 | 0.00 | 17,280 | 57.3 | 48.7 | 44.8 | 41.8 | 15% | 14% |
| `PD_3Reasons_Team_CRM` | 751974552396 | ENABLED | 276 | 1 | 0.00 | 17,404 | 35.4 | 26.8 | 22.1 | 19.0 | 24% | 29% |
| `CRMQuickWinDemoPerson` | 751973563851 | PAUSED | 251 | 0 | 0.00 | 15,142 | 58.4 | 50.0 | 45.6 | 42.9 | 14% | 14% |
| `AT_WomanUS_TimeIsMoney_CRM` | 751995023503 | ENABLED | 235 | 0 | 0.00 | 18,859 | 59.5 | 50.2 | 46.4 | 43.4 | 16% | 14% |
| `AT_WomanUS_Team_CRM` | 751974126429 | ENABLED | 224 | 10 | 0.04 | 17,040 | 59.1 | 51.1 | 47.3 | 44.5 | 14% | 13% |
| `DL_Nightmare_Short_CRM` | 765080146507 | ENABLED | 219 | 7 | 0.03 | 17,779 | 59.2 | 49.9 | 45.8 | 42.9 | 16% | 14% |
| `PD_POV_Dashboard_CRM` | 751994643118 | ENABLED | 149 | 0 | 0.00 | 10,170 | 94.9 | 65.9 | 58.6 | 55.2 | 31% | 16% |
| `AT_Realestate_Short_CRM` | 751974565389 | ENABLED | 139 | 0 | 0.00 | 8,345 | 34.7 | 26.7 | 22.4 | 20.1 | 23% | 25% |
| `UT_FinanceJoke_CRM` | 751994931736 | ENABLED | 132 | 0 | 0.00 | 8,989 | 38.3 | 29.3 | 24.9 | 21.9 | 23% | 25% |

**Ads in `CompCRMBig_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 752077403444 | PAUSED | 589 | 10 | 0.02 | 43,264 | 33.6 | 24.8 | 20.5 | 17.1 | 26% | 31% |
| `CR_President_Long_CRM` | 751974471999 | PAUSED | 309 | 0 | 0.00 | 20,920 | 26.7 | 19.1 | 15.6 | 13.6 | 29% | 28% |
| `PD_AIPodcast_Short_CRM` | 751974463896 | PAUSED | 275 | 1 | 0.00 | 23,741 | 56.3 | 47.9 | 44.0 | 40.8 | 15% | 15% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 751974103815 | PAUSED | 273 | 11 | 0.04 | 18,377 | 55.4 | 47.3 | 43.2 | 40.6 | 15% | 14% |
| `CR_President_ShortNo_CRM` | 751973564802 | ENABLED | 241 | 0 | 0.00 | 18,366 | 53.2 | 43.7 | 40.0 | 37.2 | 18% | 15% |
| `PD_WomanPink_Face_CRM` | 751994930149 | ENABLED | 201 | 0 | 0.00 | 13,694 | 60.3 | 52.1 | 48.0 | 44.8 | 14% | 14% |
| `DL_Nightmare_Long_CRM` | 765080211970 | ENABLED | 189 | 1 | 0.01 | 12,981 | 34.8 | 27.1 | 22.8 | 19.6 | 22% | 28% |
| `CR_President_Short_CRM` | 752078401667 | ENABLED | 182 | 0 | 0.00 | 10,413 | 56.5 | 47.7 | 44.2 | 41.8 | 16% | 12% |
| `PD_3Reasons_Team_CRM` | 751974624885 | ENABLED | 141 | 0 | 0.00 | 10,865 | 36.0 | 28.1 | 23.6 | 20.6 | 22% | 27% |
| `CRMQuickWinDemoPerson` | 752078201984 | PAUSED | 134 | 0 | 0.00 | 9,122 | 59.3 | 51.8 | 47.8 | 44.9 | 13% | 13% |
| `AT_WomanUS_Team_CRM` | 751995124537 | ENABLED | 134 | 0 | 0.00 | 11,451 | 62.8 | 54.7 | 51.0 | 48.1 | 13% | 12% |
| `AT_WomanUS_TimeIsMoney_CRM` | 751973564835 | ENABLED | 120 | 0 | 0.00 | 10,070 | 62.6 | 54.6 | 51.1 | 48.1 | 13% | 12% |
| `PD_WomanPink_Platform_CRM` | 752077403447 | PAUSED | 119 | 0 | 0.00 | 8,040 | 57.7 | 49.4 | 45.6 | 42.8 | 14% | 13% |
| `DL_Nightmare_Short_CRM` | 765080146504 | ENABLED | 105 | 0 | 0.00 | 7,899 | 60.7 | 52.4 | 48.3 | 45.2 | 14% | 14% |
| `PD_POV_Dashboard_CRM` | 752077402943 | ENABLED | 89 | 0 | 0.00 | 7,912 | 92.8 | 66.3 | 61.0 | 57.5 | 29% | 13% |
| `AT_Realestate_Short_CRM` | 751973563434 | ENABLED | 69 | 0 | 0.00 | 5,173 | 36.9 | 28.8 | 24.1 | 21.3 | 22% | 26% |
| `UT_FinanceJoke_CRM` | 752078451512 | ENABLED | 68 | 0 | 0.00 | 5,792 | 38.0 | 29.5 | 25.3 | 22.5 | 22% | 24% |

**Ads in `CompCRMSmall_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 752078201501 | PAUSED | 701 | 1 | 0.00 | 67,503 | 33.9 | 25.1 | 20.7 | 17.5 | 26% | 30% |
| `CR_President_Long_CRM` | 751974126126 | PAUSED | 376 | 0 | 0.00 | 34,155 | 27.3 | 19.8 | 16.3 | 14.3 | 27% | 28% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 752078342525 | PAUSED | 292 | 0 | 0.00 | 31,635 | 58.9 | 50.5 | 46.3 | 43.7 | 14% | 13% |
| `PD_AIPodcast_Short_CRM` | 752078441744 | PAUSED | 243 | 10 | 0.04 | 28,823 | 61.2 | 52.3 | 48.6 | 45.5 | 14% | 13% |
| `CR_President_ShortNo_CRM` | 751974126441 | ENABLED | 228 | 0 | 0.00 | 24,455 | 57.5 | 48.0 | 44.3 | 41.9 | 17% | 13% |
| `PD_3Reasons_Team_CRM` | 751995136021 | ENABLED | 157 | 10 | 0.06 | 14,727 | 35.2 | 27.1 | 22.4 | 19.4 | 23% | 28% |
| `CR_President_Short_CRM` | 751995182125 | ENABLED | 147 | 1 | 0.01 | 12,933 | 60.3 | 51.3 | 47.7 | 45.5 | 15% | 11% |
| `CRMQuickWinDemoPerson` | 752077402796 | PAUSED | 146 | 0 | 0.00 | 16,352 | 62.8 | 55.0 | 51.2 | 48.2 | 12% | 12% |
| `PD_WomanPink_Face_CRM` | 752077991420 | ENABLED | 142 | 0 | 0.00 | 13,303 | 64.0 | 56.0 | 52.2 | 49.3 | 12% | 12% |
| `AT_WomanUS_Team_CRM` | 751995083968 | ENABLED | 133 | 0 | 0.00 | 16,484 | 66.4 | 58.4 | 54.7 | 52.2 | 12% | 11% |
| `AT_WomanUS_TimeIsMoney_CRM` | 751974103803 | ENABLED | 124 | 0 | 0.00 | 15,190 | 67.4 | 59.4 | 55.5 | 52.8 | 12% | 11% |
| `DL_Nightmare_Long_CRM` | 765080211961 | ENABLED | 111 | 0 | 0.00 | 10,554 | 37.4 | 29.3 | 24.8 | 21.4 | 22% | 27% |
| `PD_WomanPink_Platform_CRM` | 751974126408 | PAUSED | 107 | 0 | 0.00 | 9,523 | 63.8 | 55.8 | 52.1 | 49.0 | 13% | 12% |
| `UT_FinanceJoke_CRM` | 751974103821 | ENABLED | 69 | 0 | 0.00 | 6,951 | 38.9 | 30.4 | 25.8 | 22.8 | 22% | 25% |
| `DL_Nightmare_Short_CRM` | 765080146495 | ENABLED | 57 | 0 | 0.00 | 6,273 | 66.3 | 58.5 | 55.0 | 52.1 | 12% | 11% |
| `PD_POV_Dashboard_CRM` | 751974463887 | ENABLED | 55 | 0 | 0.00 | 6,317 | 98.1 | 77.3 | 71.1 | 68.6 | 21% | 11% |
| `AT_Realestate_Short_CRM` | 751995124015 | ENABLED | 52 | 0 | 0.00 | 3,926 | 36.0 | 28.1 | 23.6 | 20.8 | 22% | 26% |

**Ads in `CRM_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 752078255219 | PAUSED | 56 | 0 | 0.00 | 2,288 | 29.4 | 20.5 | 16.6 | 13.4 | 30% | 35% |
| `CR_President_Long_CRM` | 751974554307 | PAUSED | 35 | 1 | 0.03 | 1,298 | 19.3 | 12.9 | 10.7 | 9.2 | 33% | 29% |
| `CR_President_ShortNo_CRM` | 752077403705 | ENABLED | 22 | 0 | 0.00 | 787 | 42.1 | 31.8 | 28.5 | 25.0 | 24% | 21% |
| `PD_ActuallyLikeIt_NoLogo_CRM` | 751970213496 | PAUSED | 15 | 0 | 0.00 | 664 | 41.9 | 33.0 | 29.8 | 27.6 | 21% | 17% |
| `PD_AIPodcast_Short_CRM` | 752078402147 | PAUSED | 13 | 0 | 0.00 | 703 | 47.8 | 39.2 | 35.5 | 33.2 | 18% | 15% |
| `PD_3Reasons_Team_CRM` | 751995093055 | ENABLED | 12 | 0 | 0.00 | 601 | 27.5 | 21.3 | 17.3 | 15.0 | 23% | 30% |
| `CR_President_Short_CRM` | 751974567801 | ENABLED | 12 | 0 | 0.00 | 450 | 42.8 | 32.8 | 30.3 | 27.8 | 23% | 15% |

**Ads in `BusinessOperations_T-multiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 752077920365 | PAUSED | 24 | 0 | 0.00 | 1,782 | 34.2 | 26.2 | 22.0 | 18.5 | 24% | 29% |
| `CR_President_Long_CRM` | 751973564868 | PAUSED | 17 | 0 | 0.00 | 1,368 | 26.6 | 18.9 | 15.4 | 14.0 | 29% | 26% |

**Ads in `CompetitorsCRMV2_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AIPodcast_Long_CRM` | 751973563848 | PAUSED | 13 | 0 | 0.00 | 526 | 37.9 | 26.5 | 21.7 | 19.0 | 30% | 28% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| CONNECTED_TV | 12,623 | 128 | 0.01 | 963,122 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 1,838 | 21 | 0.01 |
| geoTargetConstants/1007850 | 327 | 0 | 0.00 |
| geoTargetConstants/1006524 | 197 | 1 | 0.01 |
| geoTargetConstants/1006912 | 147 | 1 | 0.01 |
| geoTargetConstants/1007336 | 119 | 0 | 0.00 |
| geoTargetConstants/1006864 | 111 | 0 | 0.00 |
| geoTargetConstants/1006567 | 107 | 0 | 0.00 |
| geoTargetConstants/1007326 | 82 | 1 | 0.01 |
| geoTargetConstants/1006656 | 81 | 1 | 0.01 |
| geoTargetConstants/1006534 | 70 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007850 | 327 | 0 | 0.00 |
| geoTargetConstants/1007336 | 119 | 0 | 0.00 |
| geoTargetConstants/1006864 | 111 | 0 | 0.00 |
| geoTargetConstants/1006567 | 107 | 0 | 0.00 |
| geoTargetConstants/1006524 | 197 | 1 | 0.01 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-topics-t`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £12,406 | **DEP:** 25 | **DEP/Spend:** 0.00
- **Impressions:** 425,681 | **Clicks:** 284 | **Conversions:** 25
- **All Conversions Value:** 14,540 | **All Conversions:** 2,030
- **Active Months:** 2 (2025-05-01 → 2025-06-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-05-01 | 7,792 | 14 | 0.00 | 269,920 | 177 | 14 |
| 2025-06-01 | 4,615 | 11 | 0.00 | 155,761 | 107 | 11 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessProductivitySoftware_T-MultiAds` | ENABLED | 11,275 | 19 | 0.00 | 395,899 | 31.5 | 17.5 | 14.3 | 12.5 | 44% | 29% |
| `Mgmt_ProjectManagement_T-MultiAds` | ENABLED | 624 | 4 | 0.01 | 9,120 | 30.8 | 16.8 | 13.2 | 11.2 | 45% | 33% |
| `Management_T-MultiAds` | ENABLED | 508 | 2 | 0.00 | 20,662 | 33.9 | 17.7 | 14.4 | 12.4 | 48% | 30% |

**Ads in `BusinessProductivitySoftware_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Llama_short` | 753866445499 | PAUSED | 692 | 2 | 0.00 | 24,366 | 23.0 | 15.8 | 13.6 | 12.2 | 31% | 23% |
| `PD_AI_Llama` | 753866445283 | ENABLED | 669 | 2 | 0.00 | 23,577 | 30.9 | 20.5 | 17.1 | 15.1 | 34% | 26% |
| `AT_Llama_30s-alt` | 753866445484 | PAUSED | 652 | 0 | 0.00 | 22,923 | 46.0 | 22.7 | 18.0 | 16.0 | 51% | 30% |
| `DL_AI_Llama_Long` | 753866445259 | ENABLED | 616 | 2 | 0.00 | 21,650 | 21.3 | 15.2 | 13.0 | 11.5 | 29% | 24% |
| `DL_Llama_AnyType_30s` | 753866445358 | PAUSED | 573 | 0 | 0.00 | 20,250 | 45.1 | 23.4 | 19.0 | 16.6 | 48% | 29% |
| `DL_Llama_Dashboards_30s` | 753866445256 | PAUSED | 570 | 3 | 0.01 | 20,088 | 43.7 | 21.9 | 17.4 | 15.0 | 50% | 32% |
| `DL_AI_Llama_Short` | 753866445517 | ENABLED | 565 | 0 | 0.00 | 19,739 | 27.6 | 15.9 | 12.7 | 10.6 | 43% | 33% |
| `DL_Llama_Templates_30s` | 753866445502 | PAUSED | 550 | 1 | 0.00 | 19,399 | 45.0 | 23.1 | 18.7 | 16.5 | 49% | 29% |
| `DL_Llama_47s` | 753866445340 | PAUSED | 549 | 0 | 0.00 | 19,363 | 27.3 | 18.2 | 15.8 | 14.4 | 33% | 21% |
| `PD_Llama_Angry_Short_NoIntro` | 753866445115 | ENABLED | 543 | 1 | 0.00 | 19,090 | 33.8 | 19.9 | 15.9 | 14.0 | 41% | 29% |
| `PD_WorkOS_21sec` | 753866445268 | PAUSED | 542 | 0 | 0.00 | 19,098 | 92.0 | 31.7 | 23.9 | 20.1 | 66% | 37% |
| `PD_Llama_Angry_Short` | 753866445316 | PAUSED | 533 | 0 | 0.00 | 18,830 | 28.7 | 19.2 | 16.4 | 14.9 | 33% | 23% |
| `PD_Llama_Angry` | 753866445355 | PAUSED | 524 | 0 | 0.00 | 18,256 | 14.0 | 9.2 | 7.3 | 6.3 | 34% | 32% |
| `AT_Llama_long` | 753866445487 | PAUSED | 515 | 1 | 0.00 | 17,936 | 17.3 | 10.5 | 8.2 | 6.8 | 39% | 35% |
| `DL_Llama_Angry_Long` | 753866445496 | PAUSED | 498 | 2 | 0.00 | 17,339 | 14.2 | 9.4 | 7.5 | 6.3 | 34% | 33% |
| `PD_Llama_Skeleton` | 753866445280 | ENABLED | 496 | 0 | 0.00 | 17,284 | 13.8 | 9.0 | 7.0 | 6.0 | 35% | 33% |
| `DL_Llama_Long` | 753866445334 | PAUSED | 494 | 0 | 0.00 | 17,211 | 14.8 | 9.5 | 7.6 | 6.5 | 35% | 32% |
| `PD_AI_Eduardo` | 753866445511 | ENABLED | 487 | 0 | 0.00 | 17,196 | 27.7 | 18.7 | 15.9 | 14.3 | 33% | 24% |
| `AT_Llama_long-alt` | 753866445505 | PAUSED | 478 | 2 | 0.00 | 16,653 | 16.3 | 9.8 | 7.9 | 6.6 | 40% | 33% |
| `AT_Llama_Product` | 753866445106 | PAUSED | 411 | 0 | 0.00 | 14,489 | 27.5 | 18.1 | 15.3 | 13.5 | 34% | 26% |
| `AT_Llama_30s` | 753866445103 | PAUSED | 317 | 2 | 0.01 | 11,162 | 47.0 | 22.8 | 18.0 | 16.0 | 51% | 30% |

**Ads in `Mgmt_ProjectManagement_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_AI_Eduardo` | 753866445310 | ENABLED | 38 | 0 | 0.00 | 563 | 24.0 | 16.1 | 13.7 | 11.9 | 33% | 26% |
| `DL_AI_Llama_Short` | 753866445292 | ENABLED | 34 | 0 | 0.00 | 511 | 33.2 | 21.1 | 18.3 | 16.7 | 37% | 21% |
| `AT_Llama_Product` | 753866445253 | PAUSED | 33 | 0 | 0.00 | 491 | 28.1 | 18.4 | 15.3 | 13.2 | 34% | 28% |
| `PD_AI_Llama` | 753866445508 | ENABLED | 32 | 0 | 0.00 | 478 | 29.2 | 19.3 | 15.0 | 12.3 | 34% | 36% |
| `PD_Llama_Angry` | 753866445304 | PAUSED | 32 | 0 | 0.00 | 467 | 15.3 | 9.4 | 7.2 | 5.7 | 39% | 40% |
| `DL_Llama_Angry_Long` | 753866445262 | PAUSED | 32 | 0 | 0.00 | 457 | 16.9 | 12.2 | 10.4 | 9.2 | 28% | 24% |
| `DL_Llama_Templates_30s` | 753866445313 | PAUSED | 32 | 0 | 0.00 | 464 | 41.2 | 18.9 | 13.2 | 11.5 | 54% | 39% |
| `PD_Llama_Angry_Short` | 753866445349 | PAUSED | 31 | 0 | 0.00 | 463 | 30.8 | 20.7 | 17.4 | 15.9 | 33% | 23% |
| `PD_WorkOS_21sec` | 753866445481 | PAUSED | 31 | 0 | 0.00 | 437 | 92.8 | 27.7 | 20.5 | 16.5 | 70% | 40% |
| `PD_Llama_Skeleton` | 753866445328 | ENABLED | 31 | 0 | 0.00 | 436 | 15.3 | 9.4 | 7.3 | 5.4 | 38% | 42% |
| `DL_Llama_47s` | 753866445343 | PAUSED | 31 | 0 | 0.00 | 443 | 22.0 | 11.5 | 9.4 | 6.0 | 48% | 48% |
| `AT_Llama_30s-alt` | 753866445112 | PAUSED | 31 | 0 | 0.00 | 457 | 42.5 | 20.3 | 15.8 | 14.5 | 52% | 29% |
| `PD_Llama_Angry_Short_NoIntro` | 753866445331 | ENABLED | 31 | 1 | 0.03 | 449 | 34.6 | 20.0 | 14.8 | 13.3 | 42% | 34% |
| `DL_AI_Llama_Long` | 753866445325 | ENABLED | 30 | 1 | 0.03 | 459 | 23.7 | 16.3 | 13.2 | 12.5 | 31% | 23% |
| `DL_Llama_Long` | 753866445295 | PAUSED | 30 | 1 | 0.03 | 437 | 16.1 | 9.3 | 7.5 | 5.8 | 42% | 37% |
| `AT_Llama_long` | 753866445247 | PAUSED | 30 | 1 | 0.03 | 416 | 20.2 | 13.1 | 9.8 | 7.9 | 35% | 40% |
| `DL_Llama_Dashboards_30s` | 753866445307 | PAUSED | 30 | 0 | 0.00 | 449 | 42.1 | 17.4 | 12.4 | 9.8 | 59% | 43% |
| `AT_Llama_long-alt` | 753866445118 | PAUSED | 29 | 0 | 0.00 | 410 | 16.7 | 10.2 | 8.2 | 6.7 | 39% | 34% |
| `AT_Llama_short` | 753866445109 | PAUSED | 26 | 0 | 0.00 | 376 | 19.6 | 14.8 | 11.6 | 10.5 | 25% | 29% |
| `DL_Llama_AnyType_30s` | 753866445097 | PAUSED | 16 | 0 | 0.00 | 231 | 45.8 | 27.3 | 18.9 | 14.1 | 40% | 48% |
| `AT_Llama_30s` | 753866445514 | PAUSED | 16 | 0 | 0.00 | 226 | 53.4 | 27.4 | 21.5 | 18.7 | 49% | 32% |

**Ads in `Management_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec` | 753866445319 | PAUSED | 35 | 1 | 0.03 | 1,467 | 89.3 | 27.9 | 20.5 | 17.3 | 69% | 38% |
| `PD_AI_Eduardo` | 753866445265 | ENABLED | 29 | 0 | 0.00 | 1,193 | 26.0 | 17.3 | 15.0 | 12.7 | 33% | 26% |
| `AT_Llama_short` | 753866445346 | PAUSED | 27 | 0 | 0.00 | 1,089 | 24.5 | 15.6 | 13.8 | 12.7 | 36% | 18% |
| `DL_AI_Llama_Long` | 753866445337 | ENABLED | 26 | 0 | 0.00 | 1,079 | 24.2 | 15.2 | 13.0 | 11.2 | 37% | 26% |
| `AT_Llama_30s` | 753866445271 | PAUSED | 26 | 0 | 0.00 | 1,056 | 48.4 | 24.6 | 20.0 | 17.6 | 49% | 29% |
| `DL_Llama_Angry_Long` | 753866445241 | PAUSED | 26 | 0 | 0.00 | 1,035 | 15.0 | 9.5 | 7.7 | 6.7 | 36% | 30% |
| `DL_Llama_AnyType_30s` | 753866445322 | PAUSED | 26 | 0 | 0.00 | 1,017 | 44.1 | 21.7 | 17.4 | 15.7 | 51% | 28% |
| `DL_Llama_Templates_30s` | 753866445298 | PAUSED | 26 | 0 | 0.00 | 1,046 | 46.4 | 22.0 | 16.7 | 13.3 | 53% | 40% |
| `AT_Llama_30s-alt` | 753866445286 | PAUSED | 25 | 0 | 0.00 | 996 | 48.1 | 22.2 | 18.6 | 15.7 | 54% | 29% |
| `PD_Llama_Angry_Short_NoIntro` | 753866445274 | ENABLED | 24 | 0 | 0.00 | 983 | 34.2 | 21.3 | 16.1 | 14.3 | 38% | 33% |
| `DL_Llama_Dashboards_30s` | 753866445289 | PAUSED | 24 | 1 | 0.04 | 986 | 46.6 | 24.6 | 19.7 | 17.1 | 47% | 31% |
| `DL_AI_Llama_Short` | 753866445301 | ENABLED | 24 | 0 | 0.00 | 982 | 29.0 | 17.3 | 14.3 | 12.8 | 40% | 26% |
| `PD_Llama_Angry_Short` | 753866445277 | PAUSED | 24 | 0 | 0.00 | 958 | 27.8 | 17.2 | 14.6 | 12.1 | 38% | 29% |
| `PD_AI_Llama` | 753866445094 | ENABLED | 23 | 0 | 0.00 | 964 | 30.1 | 19.1 | 15.3 | 13.4 | 37% | 30% |
| `PD_Llama_Skeleton` | 753866445244 | ENABLED | 23 | 0 | 0.00 | 912 | 15.7 | 9.8 | 8.7 | 7.7 | 37% | 22% |
| `AT_Llama_long-alt` | 753866445250 | PAUSED | 22 | 0 | 0.00 | 906 | 16.6 | 10.0 | 8.8 | 7.4 | 40% | 26% |
| `PD_Llama_Angry` | 753866445352 | PAUSED | 22 | 0 | 0.00 | 905 | 15.5 | 10.9 | 8.8 | 7.2 | 30% | 34% |
| `AT_Llama_Product` | 753866445100 | PAUSED | 22 | 0 | 0.00 | 903 | 28.6 | 18.3 | 15.2 | 13.9 | 36% | 24% |
| `DL_Llama_47s` | 753866445490 | PAUSED | 19 | 0 | 0.00 | 776 | 28.4 | 17.4 | 15.1 | 13.3 | 39% | 24% |
| `DL_Llama_Long` | 753866445091 | PAUSED | 17 | 0 | 0.00 | 725 | 14.4 | 8.3 | 6.2 | 5.1 | 42% | 39% |
| `AT_Llama_long` | 753866445493 | PAUSED | 17 | 0 | 0.00 | 684 | 16.9 | 9.6 | 7.8 | 7.0 | 43% | 27% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 12,406 | 25 | 0.00 | 425,681 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 2,677 | 4 | 0.00 |
| geoTargetConstants/1007850 | 455 | 0 | 0.00 |
| geoTargetConstants/1006912 | 292 | 1 | 0.00 |
| geoTargetConstants/1006524 | 214 | 0 | 0.00 |
| geoTargetConstants/1007326 | 118 | 1 | 0.01 |
| geoTargetConstants/1007336 | 113 | 0 | 0.00 |
| geoTargetConstants/1006567 | 111 | 0 | 0.00 |
| geoTargetConstants/1006864 | 89 | 0 | 0.00 |
| geoTargetConstants/1007064 | 82 | 0 | 0.00 |
| geoTargetConstants/1006656 | 81 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007850 | 455 | 0 | 0.00 |
| geoTargetConstants/1006524 | 214 | 0 | 0.00 |
| geoTargetConstants/1007336 | 113 | 0 | 0.00 |
| geoTargetConstants/1006567 | 111 | 0 | 0.00 |
| geoTargetConstants/1006886 | 2,677 | 4 | 0.00 |

---

#### Campaign: `gb-en-brand-work_mgmt-desktop-expanded-t-360_uk_24q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £11,499 | **DEP:** 570 | **DEP/Spend:** 0.05
- **Impressions:** 1,399,263 | **Clicks:** 752 | **Conversions:** 57
- **All Conversions Value:** 13,010 | **All Conversions:** 997
- **Active Months:** 2 (2024-10-01 → 2024-11-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-10-01 | 2,531 | 150 | 0.06 | 311,361 | 190 | 15 |
| 2024-11-01 | 8,968 | 420 | 0.05 | 1,087,902 | 562 | 42 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `IndustryTechnology_EM-InStreamAds` | ENABLED | 4,385 | 270 | 0.06 | 534,183 | 92.5 | 54.5 | 35.2 | 29.1 | 41% | 47% |
| `InMarket_IM-InStreamAds` | ENABLED | 3,758 | 190 | 0.05 | 457,703 | 93.3 | 56.6 | 35.8 | 29.2 | 39% | 48% |
| `EmployerLarge_EM-InStreamAds` | ENABLED | 3,207 | 110 | 0.03 | 388,996 | 93.9 | 58.5 | 37.9 | 31.4 | 38% | 46% |
| `IndustryRealEstate_EM-InStreamAds` | ENABLED | 149 | 0 | 0.00 | 18,381 | 93.7 | 58.1 | 38.9 | 32.8 | 38% | 44% |

**Ads in `IndustryTechnology_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541566 | ENABLED | 1,492 | 70 | 0.05 | 182,039 | 92.6 | 55.0 | 35.5 | 29.4 | 41% | 47% |
| `360_uk_24q4_2_responsive` | 718091541557 | ENABLED | 1,484 | 130 | 0.09 | 180,922 | 92.6 | 54.6 | 35.4 | 29.2 | 41% | 46% |
| `360_uk_24q4_1_responsive` | 718091541359 | ENABLED | 1,410 | 70 | 0.05 | 171,222 | 92.4 | 53.9 | 34.8 | 28.5 | 42% | 47% |

**Ads in `InMarket_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_2_responsive` | 718091541545 | ENABLED | 1,279 | 50 | 0.04 | 155,980 | 93.4 | 56.9 | 36.2 | 29.6 | 39% | 48% |
| `360_uk_24q4_3_responsive` | 718091541563 | ENABLED | 1,269 | 110 | 0.09 | 154,830 | 93.4 | 57.0 | 35.9 | 29.3 | 39% | 49% |
| `360_uk_24q4_1_responsive` | 718091541512 | ENABLED | 1,210 | 30 | 0.02 | 146,893 | 93.1 | 56.0 | 35.4 | 28.7 | 40% | 49% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541494 | ENABLED | 1,103 | 20 | 0.02 | 134,081 | 93.9 | 58.9 | 38.1 | 31.7 | 37% | 46% |
| `360_uk_24q4_2_responsive` | 718091541521 | ENABLED | 1,083 | 50 | 0.05 | 131,716 | 94.0 | 58.8 | 38.3 | 31.8 | 37% | 46% |
| `360_uk_24q4_1_responsive` | 718091541485 | ENABLED | 1,020 | 40 | 0.04 | 123,199 | 93.8 | 57.6 | 37.4 | 30.8 | 39% | 47% |

**Ads in `IndustryRealEstate_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_2_responsive` | 718091541500 | ENABLED | 51 | 0 | 0.00 | 6,233 | 93.7 | 58.6 | 38.7 | 33.1 | 37% | 44% |
| `360_uk_24q4_3_responsive` | 718091541533 | ENABLED | 50 | 0 | 0.00 | 6,220 | 93.8 | 58.1 | 38.9 | 33.1 | 38% | 43% |
| `360_uk_24q4_1_responsive` | 718091541527 | ENABLED | 48 | 0 | 0.00 | 5,928 | 93.6 | 57.6 | 39.1 | 32.3 | 38% | 44% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 11,499 | 570 | 0.05 | 1,399,263 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 11,465 | 520 | 0.05 |
| geoTargetConstants/9196633 | 26 | 0 | 0.00 |
| geoTargetConstants/9189725 | 9 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 11,465 | 520 | 0.05 |

---

#### Campaign: `gb-en-prm-crm-desktop-main-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £8,972 | **DEP:** 231 | **DEP/Spend:** 0.03
- **Impressions:** 823,055 | **Clicks:** 1,497 | **Conversions:** 23
- **All Conversions Value:** 48,502 | **All Conversions:** 7,610
- **Active Months:** 1 (2026-01-01 → 2026-01-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-01-01 | 8,972 | 231 | 0.03 | 823,055 | 1,497 | 23 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Employment_CRM_EM` | ENABLED | 4,702 | 121 | 0.03 | 348,473 | 32.6 | 21.4 | 17.5 | 15.0 | 34% | 30% |
| `Lookalike_CRM_L` | ENABLED | 1,548 | 30 | 0.02 | 250,442 | 30.1 | 18.4 | 14.8 | 12.5 | 39% | 32% |
| `LookalikeHigh_CRM_L` | ENABLED | 1,184 | 30 | 0.03 | 179,883 | 29.4 | 18.5 | 15.0 | 12.6 | 37% | 32% |
| `Competitors_CRM_M` | ENABLED | 587 | 20 | 0.03 | 23,657 | 30.7 | 20.9 | 16.8 | 14.0 | 32% | 33% |
| `Keywords_CRM_KW` | ENABLED | 542 | 30 | 0.06 | 7,655 | 24.2 | 14.6 | 11.3 | 8.9 | 40% | 39% |
| `SQA_CRM_S` | ENABLED | 259 | 0 | 0.00 | 8,062 | 32.1 | 21.0 | 17.1 | 13.9 | 35% | 34% |
| `Topics_CRM_T` | ENABLED | 150 | 0 | 0.00 | 4,883 | 20.3 | 12.8 | 9.6 | 7.5 | 37% | 41% |

**Ads in `Employment_CRM_EM`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 791058405732 | ENABLED | 1,074 | 20 | 0.02 | 69,322 | 29.2 | 16.4 | 12.6 | 10.4 | 44% | 36% |
| `DL_Stayinglateagain_CRM` | 791177496419 | ENABLED | 504 | 30 | 0.06 | 37,402 | 24.2 | 17.5 | 14.1 | 11.4 | 28% | 35% |
| `DL_Switchto_CRM` | 791098871695 | ENABLED | 479 | 10 | 0.02 | 35,759 | 25.6 | 18.6 | 15.1 | 12.5 | 27% | 33% |
| `AT_TheMillionaire_Wow_CRM` | 791098872370 | ENABLED | 381 | 0 | 0.00 | 22,568 | 33.0 | 21.0 | 16.8 | 14.0 | 36% | 33% |
| `AT_Car_Bestadvice_CRM` | 791177508614 | ENABLED | 329 | 20 | 0.06 | 32,357 | 39.8 | 25.4 | 21.3 | 18.3 | 36% | 28% |
| `DL_Nightmare_Long_CRM` | 791098871245 | ENABLED | 308 | 16 | 0.05 | 18,741 | 28.5 | 21.4 | 17.9 | 15.0 | 25% | 30% |
| `CR_Intervention_Launch_CRM` | 791058389952 | ENABLED | 220 | 0 | 0.00 | 14,807 | 27.1 | 19.4 | 15.7 | 12.9 | 28% | 34% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 791098828243 | ENABLED | 214 | 0 | 0.00 | 16,845 | 29.5 | 21.1 | 17.4 | 14.9 | 28% | 30% |
| `CR_Intervention_WeNeed_CRM` | 791098798708 | ENABLED | 184 | 0 | 0.00 | 12,111 | 28.9 | 21.4 | 17.3 | 14.4 | 26% | 32% |
| `CR_Enthusiast_AnotherDeal_CRM` | 791098833577 | ENABLED | 179 | 10 | 0.06 | 15,359 | 46.1 | 35.8 | 32.3 | 30.3 | 22% | 15% |
| `AT_Podcast_HateCRM_CRM` | 791098833283 | ENABLED | 164 | 0 | 0.00 | 12,853 | 29.5 | 21.0 | 17.4 | 14.9 | 29% | 29% |
| `AT_Car_Tip_CRM` | 791058360189 | ENABLED | 161 | 0 | 0.00 | 16,273 | 47.3 | 34.4 | 30.4 | 27.7 | 27% | 20% |
| `PD_Thebiggestdeal_Bam_CRM` | 791098832344 | ENABLED | 150 | 0 | 0.00 | 12,156 | 28.9 | 21.5 | 17.5 | 15.3 | 26% | 29% |
| `CR_Enthusiast_StopIt_CRM` | 791058397371 | ENABLED | 100 | 10 | 0.10 | 9,069 | 47.7 | 36.9 | 33.4 | 31.0 | 23% | 16% |
| `DL_Nightmare_Short_CRM` | 791177494991 | ENABLED | 81 | 0 | 0.00 | 6,764 | 50.1 | 39.1 | 35.8 | 33.3 | 22% | 15% |
| `PD_5features_Sequences_CRM` | 791165232132 | ENABLED | 81 | 0 | 0.00 | 7,362 | 94.1 | 44.0 | 37.1 | 34.2 | 53% | 22% |
| `PD_5features_Automations_CRM` | 791165296542 | ENABLED | 51 | 0 | 0.00 | 5,343 | 94.9 | 48.1 | 40.1 | 36.6 | 49% | 24% |
| `AT_Podcast_BeHonest_CRM` | 791058414414 | ENABLED | 43 | 5 | 0.12 | 3,382 | 33.7 | 24.5 | 20.9 | 17.0 | 27% | 31% |

**Ads in `Lookalike_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 791058359964 | ENABLED | 326 | 20 | 0.06 | 37,072 | 25.5 | 13.3 | 9.8 | 7.6 | 48% | 43% |
| `DL_Stayinglateagain_CRM` | 791098844098 | ENABLED | 151 | 0 | 0.00 | 27,601 | 21.4 | 14.8 | 11.5 | 9.3 | 31% | 37% |
| `AT_Car_Bestadvice_CRM` | 791177497628 | ENABLED | 147 | 0 | 0.00 | 37,268 | 36.2 | 21.9 | 18.2 | 15.9 | 39% | 27% |
| `DL_Switchto_CRM` | 791098832140 | ENABLED | 140 | 0 | 0.00 | 23,429 | 21.8 | 14.7 | 11.5 | 9.2 | 33% | 37% |
| `AT_TheMillionaire_Wow_CRM` | 791058396438 | ENABLED | 108 | 0 | 0.00 | 11,802 | 29.8 | 17.7 | 13.7 | 11.1 | 41% | 37% |
| `DL_Nightmare_Long_CRM` | 791098835986 | ENABLED | 99 | 0 | 0.00 | 7,878 | 22.5 | 15.8 | 12.7 | 10.6 | 30% | 33% |
| `CR_Intervention_Launch_CRM` | 791098845019 | ENABLED | 83 | 0 | 0.00 | 9,843 | 22.5 | 16.2 | 12.8 | 10.5 | 28% | 35% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 791058404046 | ENABLED | 77 | 0 | 0.00 | 14,677 | 23.6 | 16.2 | 13.0 | 11.2 | 32% | 31% |
| `CR_Intervention_WeNeed_CRM` | 791098830676 | ENABLED | 69 | 0 | 0.00 | 8,840 | 24.2 | 17.4 | 14.3 | 11.8 | 28% | 33% |
| `PD_Thebiggestdeal_Bam_CRM` | 791098812901 | ENABLED | 64 | 0 | 0.00 | 13,658 | 24.7 | 17.6 | 14.3 | 11.9 | 29% | 32% |
| `AT_Podcast_HateCRM_CRM` | 791098829236 | ENABLED | 56 | 0 | 0.00 | 11,572 | 25.3 | 17.9 | 14.6 | 12.1 | 29% | 32% |
| `CR_Enthusiast_AnotherDeal_CRM` | 791058373161 | ENABLED | 52 | 0 | 0.00 | 8,013 | 41.8 | 32.1 | 28.8 | 27.2 | 23% | 15% |
| `AT_Car_Tip_CRM` | 791098854181 | ENABLED | 49 | 10 | 0.20 | 10,889 | 45.3 | 31.3 | 27.3 | 25.1 | 31% | 20% |
| `PD_5features_Sequences_CRM` | 791165232141 | ENABLED | 34 | 0 | 0.00 | 8,550 | 94.2 | 40.9 | 32.7 | 29.7 | 57% | 27% |
| `CR_Enthusiast_StopIt_CRM` | 791058390459 | ENABLED | 33 | 0 | 0.00 | 6,182 | 41.2 | 30.4 | 27.4 | 25.3 | 26% | 17% |
| `PD_5features_Automations_CRM` | 791165296551 | ENABLED | 23 | 0 | 0.00 | 6,707 | 95.3 | 44.3 | 36.4 | 32.6 | 53% | 26% |
| `DL_Nightmare_Short_CRM` | 791098798693 | ENABLED | 22 | 0 | 0.00 | 3,435 | 45.0 | 35.6 | 32.0 | 29.5 | 21% | 17% |
| `AT_Podcast_BeHonest_CRM` | 791098812883 | ENABLED | 14 | 0 | 0.00 | 3,026 | 27.3 | 19.9 | 17.2 | 15.2 | 27% | 24% |

**Ads in `LookalikeHigh_CRM_L`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 791098856044 | ENABLED | 343 | 0 | 0.00 | 38,832 | 26.6 | 14.3 | 10.7 | 8.5 | 46% | 40% |
| `DL_Switchto_CRM` | 791058359433 | ENABLED | 124 | 0 | 0.00 | 17,261 | 23.7 | 16.7 | 13.4 | 10.7 | 30% | 36% |
| `DL_Stayinglateagain_CRM` | 791098854640 | ENABLED | 118 | 10 | 0.08 | 15,649 | 21.4 | 14.7 | 11.9 | 9.7 | 31% | 34% |
| `AT_Car_Bestadvice_CRM` | 791098844326 | ENABLED | 85 | 0 | 0.00 | 22,476 | 36.0 | 22.6 | 18.9 | 16.5 | 37% | 27% |
| `AT_TheMillionaire_Wow_CRM` | 791098812913 | ENABLED | 84 | 0 | 0.00 | 7,821 | 29.6 | 18.2 | 14.4 | 11.9 | 38% | 34% |
| `DL_Nightmare_Long_CRM` | 791098833793 | ENABLED | 61 | 0 | 0.00 | 5,964 | 24.1 | 18.3 | 14.9 | 12.3 | 24% | 33% |
| `CR_Intervention_Launch_CRM` | 791058408132 | ENABLED | 59 | 0 | 0.00 | 8,201 | 21.4 | 15.2 | 12.0 | 9.8 | 29% | 35% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 791058398283 | ENABLED | 51 | 0 | 0.00 | 8,662 | 24.4 | 16.8 | 13.2 | 11.3 | 31% | 33% |
| `AT_Podcast_HateCRM_CRM` | 791098812877 | ENABLED | 44 | 0 | 0.00 | 8,093 | 29.4 | 21.3 | 18.3 | 15.1 | 27% | 29% |
| `CR_Intervention_WeNeed_CRM` | 791098854220 | ENABLED | 41 | 10 | 0.24 | 8,155 | 23.7 | 17.5 | 14.2 | 11.8 | 26% | 32% |
| `PD_Thebiggestdeal_Bam_CRM` | 791177509100 | ENABLED | 39 | 0 | 0.00 | 9,080 | 26.2 | 18.6 | 15.6 | 13.4 | 29% | 28% |
| `CR_Enthusiast_AnotherDeal_CRM` | 791058374130 | ENABLED | 32 | 10 | 0.31 | 5,878 | 42.7 | 31.8 | 28.0 | 26.8 | 26% | 16% |
| `AT_Car_Tip_CRM` | 791058396444 | ENABLED | 31 | 0 | 0.00 | 8,684 | 44.4 | 32.2 | 28.4 | 25.5 | 27% | 21% |
| `CR_Enthusiast_StopIt_CRM` | 791058372435 | ENABLED | 19 | 0 | 0.00 | 4,180 | 43.2 | 32.4 | 29.3 | 26.7 | 25% | 18% |
| `DL_Nightmare_Short_CRM` | 791058406047 | ENABLED | 16 | 0 | 0.00 | 2,198 | 45.4 | 35.4 | 32.4 | 30.8 | 22% | 13% |
| `PD_5features_Sequences_CRM` | 791165232138 | ENABLED | 16 | 0 | 0.00 | 4,609 | 94.8 | 45.6 | 39.2 | 35.3 | 52% | 23% |
| `PD_5features_Automations_CRM` | 791165296548 | ENABLED | 13 | 0 | 0.00 | 3,084 | 96.5 | 46.6 | 38.2 | 34.6 | 52% | 26% |

**Ads in `Competitors_CRM_M`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 791058371685 | ENABLED | 95 | 10 | 0.11 | 2,586 | 27.6 | 16.6 | 12.6 | 9.9 | 40% | 40% |
| `DL_Switchto_CRM` | 791058355563 | ENABLED | 71 | 0 | 0.00 | 2,106 | 23.9 | 17.3 | 14.0 | 11.7 | 27% | 33% |
| `DL_Stayinglateagain_CRM` | 791058390639 | ENABLED | 62 | 0 | 0.00 | 2,445 | 23.9 | 18.0 | 14.5 | 10.9 | 24% | 40% |
| `AT_Car_Bestadvice_CRM` | 791098829191 | ENABLED | 53 | 0 | 0.00 | 3,956 | 36.9 | 24.0 | 20.1 | 17.2 | 35% | 29% |
| `DL_Nightmare_Long_CRM` | 791058359424 | ENABLED | 51 | 0 | 0.00 | 1,443 | 24.2 | 18.0 | 14.5 | 12.2 | 25% | 32% |
| `AT_TheMillionaire_Wow_CRM` | 791177507210 | ENABLED | 45 | 0 | 0.00 | 1,358 | 30.5 | 17.4 | 13.5 | 9.9 | 43% | 43% |
| `CR_Intervention_WeNeed_CRM` | 791098857757 | ENABLED | 32 | 0 | 0.00 | 883 | 29.1 | 22.1 | 17.7 | 15.7 | 24% | 29% |
| `AT_Car_Tip_CRM` | 791058374379 | ENABLED | 31 | 0 | 0.00 | 1,804 | 42.3 | 28.5 | 23.1 | 19.7 | 33% | 31% |
| `AT_Podcast_HateCRM_CRM` | 791177513189 | ENABLED | 31 | 0 | 0.00 | 1,592 | 24.2 | 17.1 | 12.0 | 9.3 | 29% | 45% |
| `CR_Intervention_Launch_CRM` | 791058407481 | ENABLED | 23 | 0 | 0.00 | 762 | 24.8 | 16.7 | 14.0 | 11.9 | 33% | 29% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 791098844605 | ENABLED | 22 | 0 | 0.00 | 815 | 27.3 | 20.3 | 15.2 | 13.5 | 26% | 33% |
| `PD_Thebiggestdeal_Bam_CRM` | 791177508854 | ENABLED | 18 | 0 | 0.00 | 790 | 27.4 | 20.3 | 16.9 | 14.3 | 26% | 30% |
| `CR_Enthusiast_AnotherDeal_CRM` | 791058358731 | ENABLED | 17 | 10 | 0.59 | 881 | 45.1 | 35.4 | 31.2 | 29.2 | 22% | 18% |

**Ads in `Keywords_CRM_KW`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Excuseme_CRM` | 791098841254 | ENABLED | 95 | 0 | 0.00 | 1,361 | 28.3 | 13.9 | 9.0 | 5.5 | 51% | 61% |
| `DL_Switchto_CRM` | 791098857808 | ENABLED | 62 | 0 | 0.00 | 933 | 19.8 | 13.6 | 10.1 | 7.8 | 31% | 43% |
| `DL_Stayinglateagain_CRM` | 791098854703 | ENABLED | 59 | 10 | 0.17 | 938 | 19.1 | 11.7 | 10.5 | 8.5 | 39% | 27% |
| `DL_Nightmare_Long_CRM` | 791098834243 | ENABLED | 56 | 0 | 0.00 | 901 | 18.2 | 13.0 | 11.2 | 9.8 | 28% | 25% |
| `PD_Thebiggestdeal_Greatestever_CRM` | 791058416778 | ENABLED | 42 | 0 | 0.00 | 555 | 21.9 | 15.5 | 11.4 | 8.7 | 29% | 44% |
| `AT_Podcast_HateCRM_CRM` | 791058355860 | ENABLED | 35 | 0 | 0.00 | 434 | 22.5 | 18.3 | 15.5 | 12.7 | 19% | 31% |
| `CR_Intervention_WeNeed_CRM` | 791058409173 | ENABLED | 32 | 10 | 0.31 | 553 | 21.0 | 13.8 | 11.2 | 9.4 | 34% | 32% |
| `AT_TheMillionaire_Wow_CRM` | 791058392358 | ENABLED | 24 | 0 | 0.00 | 285 | 35.0 | 18.4 | 16.5 | 13.1 | 47% | 29% |
| `CR_Intervention_Launch_CRM` | 791058400074 | ENABLED | 24 | 0 | 0.00 | 299 | 14.2 | 10.0 | 6.2 | 5.0 | 29% | 50% |
| `AT_Car_Bestadvice_CRM` | 791098840525 | ENABLED | 20 | 0 | 0.00 | 266 | 34.6 | 21.6 | 20.5 | 16.2 | 38% | 25% |
| `PD_Thebiggestdeal_Bam_CRM` | 791058411294 | ENABLED | 18 | 0 | 0.00 | 294 | 17.4 | 12.0 | 7.6 | 6.5 | 31% | 45% |
| `AT_Car_Tip_CRM` | 791058355812 | ENABLED | 16 | 0 | 0.00 | 159 | 34.1 | 18.2 | 13.6 | 12.5 | 47% | 31% |
| `CR_Enthusiast_AnotherDeal_CRM` | 791058401208 | ENABLED | 15 | 0 | 0.00 | 206 | 41.8 | 32.7 | 18.2 | 16.4 | 22% | 50% |
| `PD_5features_Sequences_CRM` | 791165232135 | ENABLED | 11 | 0 | 0.00 | 131 | 89.7 | 41.4 | 27.6 | 24.1 | 54% | 42% |

**Ads in `SQA_CRM_S`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `DL_Stayinglateagain_CRM` | 791177496209 | ENABLED | 52 | 0 | 0.00 | 1,560 | 20.7 | 13.8 | 10.8 | 7.8 | 33% | 43% |
| `AT_TheMillionaire_Excuseme_CRM` | 791058374595 | ENABLED | 39 | 0 | 0.00 | 953 | 29.4 | 15.8 | 11.2 | 8.2 | 46% | 48% |
| `DL_Switchto_CRM` | 791098839091 | ENABLED | 26 | 0 | 0.00 | 908 | 25.7 | 19.0 | 16.1 | 13.4 | 26% | 30% |
| `DL_Nightmare_Long_CRM` | 791058359448 | ENABLED | 26 | 0 | 0.00 | 528 | 34.3 | 23.2 | 19.1 | 15.8 | 32% | 32% |
| `AT_Car_Bestadvice_CRM` | 791058412026 | ENABLED | 26 | 0 | 0.00 | 1,096 | 33.7 | 21.4 | 17.9 | 14.3 | 37% | 33% |
| `AT_TheMillionaire_Wow_CRM` | 791098824148 | ENABLED | 13 | 0 | 0.00 | 303 | 32.0 | 19.7 | 16.8 | 12.7 | 38% | 35% |
| `AT_Podcast_HateCRM_CRM` | 791177508152 | ENABLED | 12 | 0 | 0.00 | 314 | 33.5 | 22.8 | 19.6 | 17.1 | 32% | 25% |
| `AT_Car_Tip_CRM` | 791098856137 | ENABLED | 11 | 0 | 0.00 | 394 | 49.4 | 32.9 | 27.8 | 23.6 | 33% | 28% |

**Ads in `Topics_CRM_T`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `DL_Stayinglateagain_CRM` | 791058417090 | ENABLED | 24 | 0 | 0.00 | 885 | 14.8 | 9.1 | 7.2 | 5.3 | 38% | 42% |
| `AT_TheMillionaire_Excuseme_CRM` | 791098871698 | ENABLED | 22 | 0 | 0.00 | 594 | 25.1 | 13.8 | 9.2 | 6.9 | 45% | 50% |
| `AT_Podcast_HateCRM_CRM` | 791098841932 | ENABLED | 16 | 0 | 0.00 | 448 | 15.9 | 15.9 | 13.6 | 11.4 | 0% | 29% |
| `PD_5features_Sequences_CRM` | 791165232129 | ENABLED | 12 | 0 | 0.00 | 155 | 100.0 | 50.0 | 50.0 | 50.0 | 50% | 0% |
| `DL_Switchto_CRM` | 791058406479 | ENABLED | 12 | 0 | 0.00 | 526 | 15.0 | 11.1 | 9.0 | 6.8 | 26% | 38% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 8,972 | 231 | 0.03 | 823,055 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 1,886 | 46 | 0.02 |
| geoTargetConstants/1007850 | 294 | 0 | 0.00 |
| geoTargetConstants/1006524 | 197 | 10 | 0.05 |
| geoTargetConstants/1006912 | 131 | 10 | 0.08 |
| geoTargetConstants/1007336 | 79 | 0 | 0.00 |
| geoTargetConstants/1006656 | 70 | 0 | 0.00 |
| geoTargetConstants/1006567 | 66 | 10 | 0.15 |
| geoTargetConstants/1006864 | 65 | 10 | 0.15 |
| geoTargetConstants/1007326 | 59 | 0 | 0.00 |
| geoTargetConstants/1006884 | 58 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007850 | 294 | 0 | 0.00 |
| geoTargetConstants/1006886 | 1,886 | 46 | 0.02 |
| geoTargetConstants/1006524 | 197 | 10 | 0.05 |
| geoTargetConstants/1006912 | 131 | 10 | 0.08 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-inmarket-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £8,065 | **DEP:** 1,100 | **DEP/Spend:** 0.14
- **Impressions:** 391,589 | **Clicks:** 401 | **Conversions:** 11
- **All Conversions Value:** 14,362 | **All Conversions:** 858
- **Active Months:** 3 (2024-05-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 6,142 | 500 | 0.08 | 303,558 | 299 | 5 |
| 2024-06-01 | 1,834 | 600 | 0.33 | 82,849 | 100 | 6 |
| 2024-07-01 | 89 | 0 | 0.00 | 5,182 | 2 | 0 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessProductivitySoftware_IM-MultiAds` | ENABLED | 8,065 | 1,100 | 0.14 | 391,589 | 38.8 | 24.8 | 20.5 | 17.7 | 36% | 29% |

**Ads in `BusinessProductivitySoftware_IM-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 699947457970 | PAUSED | 1,757 | 600 | 0.34 | 93,445 | 34.2 | 24.3 | 20.5 | 17.8 | 29% | 27% |
| `CR_HiGoogie` | 699947457832 | PAUSED | 1,619 | 100 | 0.06 | 69,362 | 46.7 | 26.8 | 21.6 | 18.7 | 43% | 30% |
| `UT_SOH_Flexibility` | 699947457784 | PAUSED | 1,041 | 0 | 0.00 | 43,382 | 36.4 | 24.0 | 19.7 | 16.8 | 34% | 30% |
| `PD_Linear_Group` | 699947457592 | PAUSED | 1,034 | 100 | 0.10 | 45,871 | 30.3 | 22.5 | 18.7 | 16.2 | 26% | 28% |
| `PD_Linear_Actress` | 699947457823 | PAUSED | 758 | 0 | 0.00 | 41,231 | 24.1 | 16.5 | 13.1 | 11.0 | 32% | 33% |
| `PD_YesBut_DeliverWW` | 699947457967 | ENABLED | 705 | 100 | 0.14 | 34,651 | 39.5 | 30.7 | 26.5 | 23.5 | 22% | 23% |
| `PD_WorkOS_21sec_UK` | 699947457583 | PAUSED | 346 | 100 | 0.29 | 19,479 | 72.9 | 27.7 | 20.6 | 16.8 | 62% | 39% |
| `PD_TikToker_GoodNewsW` | 701554801174 | PAUSED | 107 | 0 | 0.00 | 6,374 | 35.9 | 25.5 | 21.1 | 17.8 | 29% | 30% |
| `AllConnectedOnePlace` | 699947457835 | ENABLED | 102 | 0 | 0.00 | 5,540 | 34.4 | 24.0 | 20.1 | 17.6 | 30% | 27% |
| `PD_YesBut_GoodAtWW` | 699947457778 | ENABLED | 92 | 0 | 0.00 | 4,041 | 41.8 | 32.5 | 27.6 | 24.4 | 22% | 25% |
| `EfficiencyProductDemoTeams` | 699947457736 | PAUSED | 82 | 0 | 0.00 | 4,370 | 44.1 | 32.7 | 27.7 | 24.6 | 26% | 25% |
| `PD_Dots_UK` | 699947457580 | ENABLED | 57 | 0 | 0.00 | 4,032 | 91.3 | 33.6 | 25.8 | 21.2 | 63% | 37% |
| `PD_WorkOS_21sec` | 699947457805 | PAUSED | 55 | 0 | 0.00 | 5,265 | 92.3 | 38.7 | 31.2 | 25.9 | 58% | 33% |
| `AT_Shmuel_ShortRegular` | 699947457739 | PAUSED | 52 | 0 | 0.00 | 2,336 | 56.9 | 29.6 | 24.5 | 20.1 | 48% | 32% |
| `UT_Frank_Mix` | 699947457964 | PAUSED | 46 | 0 | 0.00 | 2,119 | 42.4 | 29.6 | 24.7 | 20.9 | 30% | 29% |
| `PD_TikToker_HackW` | 701554802377 | PAUSED | 42 | 0 | 0.00 | 1,501 | 37.8 | 25.6 | 21.8 | 18.6 | 32% | 27% |
| `UT_Frank_Client` | 699947457598 | PAUSED | 30 | 0 | 0.00 | 1,864 | 31.6 | 21.4 | 17.7 | 14.4 | 32% | 32% |
| `PD_YesBut_DeliverBritishRU` | 699947457757 | ENABLED | 27 | 0 | 0.00 | 1,398 | 33.5 | 24.7 | 20.1 | 17.7 | 26% | 28% |
| `PD_TikToker_GoodNewsM` | 701554801615 | PAUSED | 25 | 100 | 3.96 | 888 | 40.3 | 29.6 | 25.4 | 21.7 | 27% | 27% |
| `PD_YesBut_GoodAtMW` | 699947457745 | ENABLED | 20 | 0 | 0.00 | 810 | 36.6 | 28.0 | 24.5 | 21.9 | 24% | 22% |
| `UT_SOH_Collaboration` | 699947457781 | PAUSED | 19 | 0 | 0.00 | 886 | 31.6 | 23.6 | 19.6 | 18.0 | 25% | 24% |
| `PD_WorkOS_Long_UK` | 699947457790 | PAUSED | 18 | 0 | 0.00 | 1,122 | 37.9 | 26.9 | 21.7 | 18.5 | 29% | 31% |
| `AT_Shmuel_ShortSplit` | 699947457577 | PAUSED | 14 | 0 | 0.00 | 757 | 60.2 | 35.0 | 29.4 | 27.2 | 42% | 22% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 8,065 | 1,100 | 0.14 | 391,589 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 1,989 | 400 | 0.20 |
| geoTargetConstants/1006524 | 172 | 0 | 0.00 |
| geoTargetConstants/1006912 | 149 | 0 | 0.00 |
| geoTargetConstants/1006864 | 82 | 0 | 0.00 |
| geoTargetConstants/1006567 | 78 | 0 | 0.00 |
| geoTargetConstants/1007336 | 72 | 0 | 0.00 |
| geoTargetConstants/1006656 | 63 | 0 | 0.00 |
| geoTargetConstants/1007326 | 61 | 0 | 0.00 |
| geoTargetConstants/1007064 | 61 | 0 | 0.00 |
| geoTargetConstants/1006884 | 55 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006524 | 172 | 0 | 0.00 |
| geoTargetConstants/1006912 | 149 | 0 | 0.00 |
| geoTargetConstants/1006886 | 1,989 | 400 | 0.20 |

---

#### Campaign: `gb-en-brand-work_mgmt-mobile-expanded-t-360_uk_24q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £6,822 | **DEP:** 470 | **DEP/Spend:** 0.07
- **Impressions:** 1,534,393 | **Clicks:** 3,332 | **Conversions:** 47
- **All Conversions Value:** 3,299 | **All Conversions:** 309
- **Active Months:** 2 (2024-10-01 → 2024-11-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-10-01 | 1,000 | 30 | 0.03 | 249,978 | 572 | 3 |
| 2024-11-01 | 5,822 | 440 | 0.08 | 1,284,415 | 2,760 | 44 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-InStreamAds` | ENABLED | 2,543 | 190 | 0.07 | 642,818 | 94.2 | 51.2 | 35.4 | 29.7 | 46% | 42% |
| `InMarket_IM-InStreamAds` | ENABLED | 1,689 | 110 | 0.07 | 432,037 | 93.6 | 50.9 | 34.9 | 29.4 | 46% | 42% |
| `BusinessProductivitySoftware_T-InStreamAds` | ENABLED | 1,238 | 40 | 0.03 | 111,891 | 90.2 | 38.9 | 21.8 | 15.9 | 57% | 59% |
| `IndustryTechnology_EM-InStreamAds` | ENABLED | 1,187 | 120 | 0.10 | 306,491 | 93.5 | 50.1 | 35.1 | 29.9 | 46% | 40% |
| `IndustryRealEstate_EM-InStreamAds` | ENABLED | 159 | 10 | 0.06 | 40,733 | 94.6 | 55.4 | 39.9 | 34.4 | 41% | 38% |
| `Mgmt_ProjectManagement_T-InStreamAds` | ENABLED | 3 | 0 | 0.00 | 222 | 91.8 | 40.0 | 24.1 | 16.4 | 56% | 59% |
| `BussP_ProjectManagement_T-InStreamAds` | ENABLED | 3 | 0 | 0.00 | 201 | 91.6 | 44.8 | 28.1 | 23.2 | 51% | 48% |

**Ads in `EmployerLarge_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541548 | ENABLED | 901 | 40 | 0.04 | 227,602 | 94.3 | 51.5 | 35.4 | 29.7 | 45% | 42% |
| `360_uk_24q4_2_responsive` | 718091541569 | ENABLED | 854 | 80 | 0.09 | 216,376 | 94.2 | 51.5 | 35.7 | 30.0 | 45% | 42% |
| `360_uk_24q4_1_responsive` | 718091541503 | ENABLED | 788 | 70 | 0.09 | 198,840 | 94.0 | 50.6 | 35.1 | 29.5 | 46% | 42% |

**Ads in `InMarket_IM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541497 | ENABLED | 591 | 30 | 0.05 | 151,219 | 93.7 | 51.4 | 35.0 | 29.5 | 45% | 43% |
| `360_uk_24q4_2_responsive` | 718091541482 | ENABLED | 570 | 30 | 0.05 | 145,895 | 93.6 | 51.3 | 35.2 | 29.6 | 45% | 42% |
| `360_uk_24q4_1_responsive` | 718091541518 | ENABLED | 529 | 50 | 0.09 | 134,923 | 93.5 | 50.0 | 34.6 | 29.0 | 47% | 42% |

**Ads in `BusinessProductivitySoftware_T-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541560 | ENABLED | 416 | 10 | 0.02 | 37,613 | 90.1 | 39.2 | 21.6 | 15.7 | 56% | 60% |
| `360_uk_24q4_2_responsive` | 718091541506 | ENABLED | 413 | 10 | 0.02 | 37,268 | 90.2 | 39.1 | 22.0 | 16.0 | 57% | 59% |
| `360_uk_24q4_1_responsive` | 718091541554 | ENABLED | 408 | 20 | 0.05 | 37,010 | 90.2 | 38.5 | 21.7 | 15.9 | 57% | 59% |

**Ads in `IndustryTechnology_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_3_responsive` | 718091541353 | ENABLED | 407 | 40 | 0.10 | 105,207 | 93.5 | 50.4 | 35.2 | 30.0 | 46% | 41% |
| `360_uk_24q4_2_responsive` | 718091541551 | ENABLED | 402 | 60 | 0.15 | 103,806 | 93.6 | 50.4 | 35.4 | 30.1 | 46% | 40% |
| `360_uk_24q4_1_responsive` | 718091541539 | ENABLED | 379 | 20 | 0.05 | 97,478 | 93.2 | 49.4 | 34.8 | 29.5 | 47% | 40% |

**Ads in `IndustryRealEstate_EM-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `360_uk_24q4_2_responsive` | 718091541542 | ENABLED | 55 | 0 | 0.00 | 13,938 | 94.3 | 55.1 | 39.7 | 34.2 | 42% | 38% |
| `360_uk_24q4_3_responsive` | 718091541509 | ENABLED | 55 | 0 | 0.00 | 13,986 | 95.0 | 55.3 | 39.8 | 34.1 | 42% | 38% |
| `360_uk_24q4_1_responsive` | 718091541524 | ENABLED | 50 | 10 | 0.20 | 12,809 | 94.4 | 55.8 | 40.4 | 34.8 | 41% | 38% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 6,822 | 470 | 0.07 | 1,534,393 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 6,813 | 420 | 0.06 |
| geoTargetConstants/9196633 | 6 | 0 | 0.00 |
| geoTargetConstants/9189725 | 3 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 6,813 | 420 | 0.06 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-sqa-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £5,934 | **DEP:** 260 | **DEP/Spend:** 0.04
- **Impressions:** 117,797 | **Clicks:** 67 | **Conversions:** 26
- **All Conversions Value:** 10,876 | **All Conversions:** 781
- **Active Months:** 3 (2024-05-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-05-01 | 433 | 10 | 0.02 | 8,240 | 7 | 1 |
| 2024-06-01 | 2,180 | 140 | 0.06 | 56,377 | 29 | 14 |
| 2024-07-01 | 3,320 | 110 | 0.03 | 53,180 | 31 | 11 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `WorkManagement_S-MultiAds` | ENABLED | 5,934 | 260 | 0.04 | 117,797 | 28.1 | 16.1 | 12.6 | 10.2 | 43% | 37% |

**Ads in `WorkManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 700170462601 | PAUSED | 2,085 | 110 | 0.05 | 61,047 | 22.9 | 14.5 | 11.5 | 9.5 | 37% | 34% |
| `PD_ArtOfWork_Customize` | 704564165737 | PAUSED | 1,170 | 70 | 0.06 | 9,143 | 17.1 | 10.5 | 7.7 | 5.4 | 39% | 49% |
| `PD_WorkOS_21sec_UK` | 700170462463 | PAUSED | 648 | 20 | 0.03 | 15,339 | 67.0 | 24.2 | 18.1 | 14.6 | 64% | 40% |
| `EfficiencyProductDemoTeams` | 665910567749 | PAUSED | 366 | 10 | 0.03 | 3,294 | 27.3 | 17.0 | 13.4 | 11.1 | 38% | 35% |
| `AT_Shmuel_NewSplit` | 700170462631 | PAUSED | 300 | 0 | 0.00 | 4,870 | 38.2 | 22.8 | 18.3 | 15.4 | 40% | 33% |
| `PD_TikToker_GoodNewsW` | 701554802593 | PAUSED | 230 | 20 | 0.09 | 1,908 | 20.0 | 12.1 | 9.1 | 7.4 | 40% | 39% |
| `UT_SOH_Flexibility` | 700170462616 | PAUSED | 185 | 10 | 0.05 | 1,951 | 27.9 | 16.3 | 12.9 | 10.7 | 42% | 35% |
| `PD_TikToker_HackW` | 701554800853 | PAUSED | 139 | 10 | 0.07 | 3,555 | 23.6 | 13.6 | 9.7 | 7.3 | 42% | 46% |
| `PD_TikToker_HackM` | 701554802299 | PAUSED | 130 | 0 | 0.00 | 2,635 | 17.2 | 10.1 | 8.0 | 5.3 | 41% | 47% |
| `PD_YesBut_DeliverWW` | 700170462475 | ENABLED | 110 | 0 | 0.00 | 1,428 | 28.6 | 21.2 | 17.8 | 15.5 | 26% | 27% |
| `PD_Linear_Actress` | 700170462622 | PAUSED | 102 | 0 | 0.00 | 1,116 | 24.1 | 16.8 | 13.4 | 11.9 | 30% | 29% |
| `PD_TikToker_GoodNewsM` | 701554801402 | PAUSED | 87 | 0 | 0.00 | 2,409 | 22.6 | 14.5 | 11.4 | 9.8 | 36% | 32% |
| `PD_Linear_Group` | 700170462457 | PAUSED | 86 | 0 | 0.00 | 1,117 | 37.2 | 28.9 | 24.1 | 20.2 | 22% | 30% |
| `PD_WorkOS_21sec` | 700170462628 | PAUSED | 45 | 0 | 0.00 | 2,027 | 79.0 | 24.1 | 17.6 | 13.9 | 70% | 42% |
| `PD_WorkOS_Long_UK` | 700170462478 | PAUSED | 45 | 0 | 0.00 | 2,182 | 20.7 | 13.7 | 9.5 | 9.1 | 34% | 34% |
| `AT_Shmuel_ShortSplit` | 700170462607 | PAUSED | 28 | 0 | 0.00 | 319 | 46.8 | 25.2 | 16.7 | 11.9 | 46% | 53% |
| `AT_Shmuel_ShortRegular` | 700170462613 | PAUSED | 20 | 0 | 0.00 | 334 | 49.3 | 23.2 | 16.3 | 11.6 | 53% | 50% |
| `CR_HiGoogie` | 700170462472 | PAUSED | 17 | 0 | 0.00 | 305 | 41.4 | 20.8 | 15.9 | 13.6 | 50% | 35% |
| `UT_Frank_Mix` | 700170462466 | PAUSED | 17 | 10 | 0.60 | 286 | 29.0 | 20.0 | 15.5 | 12.6 | 31% | 37% |
| `PD_YesBut_DeliverBritishRU` | 700170462451 | ENABLED | 15 | 0 | 0.00 | 241 | 26.2 | 16.2 | 13.1 | 9.1 | 38% | 44% |
| `PD_YesBut_GoodAtMW` | 700170462469 | ENABLED | 14 | 0 | 0.00 | 164 | 27.4 | 21.3 | 21.3 | 18.9 | 22% | 11% |
| `PD_YesBut_GoodAtWW` | 700170462625 | ENABLED | 13 | 0 | 0.00 | 271 | 25.6 | 20.3 | 16.6 | 15.6 | 21% | 23% |
| `PD_YesBut_DeliverBritishRU` | 700170462454 | ENABLED | 12 | 0 | 0.00 | 247 | 33.1 | 23.2 | 19.3 | 14.9 | 30% | 36% |
| `UT_SOH_Collaboration` | 700170462619 | PAUSED | 11 | 0 | 0.00 | 207 | 15.8 | 10.9 | 9.9 | 9.0 | 31% | 17% |
| `AllConnectedOnePlace` | 665910567581 | ENABLED | 11 | 0 | 0.00 | 292 | 30.9 | 19.9 | 15.6 | 13.0 | 36% | 35% |
| `PD_ArtOfWork_Flexibility` | 704564166679 | PAUSED | 11 | 0 | 0.00 | 112 | 23.6 | 20.0 | 16.4 | 10.9 | 15% | 45% |
| `AT_Shmuel_NewRegular` | 700170462610 | PAUSED | 11 | 0 | 0.00 | 202 | 33.3 | 21.0 | 16.3 | 13.3 | 37% | 37% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 5,934 | 260 | 0.04 | 117,797 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 1,354 | 70 | 0.05 |
| geoTargetConstants/1006912 | 109 | 10 | 0.09 |
| geoTargetConstants/1006524 | 103 | 10 | 0.10 |
| geoTargetConstants/1006567 | 78 | 0 | 0.00 |
| geoTargetConstants/1006864 | 70 | 10 | 0.14 |
| geoTargetConstants/1007336 | 66 | 0 | 0.00 |
| geoTargetConstants/1007326 | 54 | 0 | 0.00 |
| geoTargetConstants/1006884 | 44 | 0 | 0.00 |
| geoTargetConstants/1007064 | 42 | 0 | 0.00 |
| geoTargetConstants/1006656 | 41 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 1,354 | 70 | 0.05 |
| geoTargetConstants/1006912 | 109 | 10 | 0.09 |
| geoTargetConstants/1006524 | 103 | 10 | 0.10 |

---

#### Campaign: `gb-en-brand-work_mgmt-mobile-core-t-regional_awareness_london_24q4` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £4,078 | **DEP:** 120 | **DEP/Spend:** 0.03
- **Impressions:** 149,725 | **Clicks:** 456 | **Conversions:** 12
- **All Conversions Value:** 1,039 | **All Conversions:** 172
- **Active Months:** 2 (2024-11-01 → 2024-12-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-11-01 | 278 | 10 | 0.04 | 11,286 | 35 | 1 |
| 2024-12-01 | 3,799 | 110 | 0.03 | 138,439 | 421 | 11 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `BusinessProductivitySoftware_T-InStreamAds` | ENABLED | 3,881 | 100 | 0.03 | 144,472 | 23.2 | 11.5 | 8.2 | 6.4 | 50% | 45% |
| `BussP_ProjectManagement_T-InStreamAds` | ENABLED | 165 | 20 | 0.12 | 4,179 | 26.8 | 14.7 | 11.3 | 9.2 | 45% | 37% |
| `Mgmt_ProjectManagement_T-InStreamAds` | ENABLED | 32 | 0 | 0.00 | 1,074 | 26.2 | 14.2 | 11.4 | 9.5 | 46% | 34% |

**Ads in `BusinessProductivitySoftware_T-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Women_Brand` | 720835805515 | ENABLED | 1,943 | 30 | 0.02 | 72,053 | 22.3 | 11.2 | 8.0 | 6.2 | 50% | 45% |
| `PD_Confidence_Men_Brand` | 720835805701 | ENABLED | 1,938 | 70 | 0.04 | 72,419 | 24.1 | 11.9 | 8.4 | 6.5 | 51% | 45% |

**Ads in `BussP_ProjectManagement_T-InStreamAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Confidence_Women_Brand` | 720835805671 | ENABLED | 83 | 20 | 0.24 | 2,057 | 26.4 | 14.2 | 10.8 | 8.9 | 46% | 37% |
| `PD_Confidence_Men_Brand` | 720835805710 | ENABLED | 82 | 0 | 0.00 | 2,122 | 27.2 | 15.1 | 11.8 | 9.4 | 44% | 38% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 4,078 | 120 | 0.03 | 149,725 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 2,953 | 80 | 0.03 |
| geoTargetConstants/9197981 | 44 | 0 | 0.00 |
| geoTargetConstants/1006668 | 35 | 0 | 0.00 |
| geoTargetConstants/9198690 | 34 | 0 | 0.00 |
| geoTargetConstants/9198013 | 31 | 0 | 0.00 |
| geoTargetConstants/1007210 | 24 | 30 | 1.23 |
| geoTargetConstants/9198727 | 24 | 0 | 0.00 |
| geoTargetConstants/9198464 | 17 | 0 | 0.00 |
| geoTargetConstants/9198116 | 17 | 0 | 0.00 |
| geoTargetConstants/9212996 | 15 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 2,953 | 80 | 0.03 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-agents_contextual-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £3,997 | **DEP:** 15 | **DEP/Spend:** 0.00
- **Impressions:** 129,748 | **Clicks:** 436 | **Conversions:** 15
- **All Conversions Value:** 8,019 | **All Conversions:** 1,640
- **Active Months:** 1 (2026-05-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-05-01 | 3,997 | 15 | 0.00 | 129,748 | 436 | 15 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `Agents_KW-MultiAds` | ENABLED | 2,428 | 11 | 0.00 | 63,856 | 35.4 | 22.6 | 18.8 | 15.8 | 36% | 30% |
| `AI_T-MultiAds` | ENABLED | 1,116 | 3 | 0.00 | 43,760 | 31.5 | 19.7 | 15.9 | 12.3 | 38% | 38% |
| `DevTools_T-MultiAds` | ENABLED | 319 | 1 | 0.00 | 15,306 | 30.1 | 18.9 | 14.9 | 11.3 | 37% | 40% |
| `Marketing_SMMarketing_T-MultiAds` | ENABLED | 133 | 0 | 0.00 | 6,826 | 37.6 | 22.5 | 17.8 | 15.0 | 40% | 33% |

**Ads in `Agents_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658079049 | ENABLED | 620 | 2 | 0.00 | 14,920 | 29.3 | 19.9 | 16.4 | 12.8 | 32% | 35% |
| `AT_Agent_AiMarketing_V2` | 808658079037 | ENABLED | 319 | 2 | 0.01 | 10,423 | 30.0 | 21.3 | 18.2 | 15.8 | 29% | 26% |
| `PD_agent_ps_builder_1v1` | 808658079055 | ENABLED | 277 | 1 | 0.00 | 9,437 | 50.5 | 29.8 | 24.9 | 21.6 | 41% | 28% |
| `AT_Agent_WorkAgent_V2` | 808658079046 | ENABLED | 251 | 1 | 0.00 | 6,035 | 26.9 | 18.7 | 15.8 | 13.9 | 31% | 25% |
| `PD_Agent_Builder_Short` | 808658079052 | ENABLED | 228 | 1 | 0.00 | 5,488 | 32.7 | 20.5 | 16.9 | 13.0 | 37% | 37% |
| `AT_Agent_WorkAgent_V1` | 808658079043 | ENABLED | 184 | 1 | 0.01 | 4,194 | 29.9 | 19.9 | 16.0 | 14.3 | 33% | 28% |
| `PD_Agent_PS_Marketing_2v2` | 808658079064 | ENABLED | 135 | 2 | 0.01 | 3,372 | 55.9 | 29.8 | 24.8 | 21.9 | 47% | 27% |
| `PD_Agent_PS_Marketing_2v1` | 808658079061 | ENABLED | 102 | 0 | 0.00 | 2,835 | 49.0 | 29.4 | 24.2 | 21.4 | 40% | 27% |
| `PD_Agent_PS_Marketing_3v2` | 808658079070 | ENABLED | 91 | 0 | 0.00 | 2,213 | 42.1 | 24.3 | 20.8 | 18.4 | 42% | 24% |
| `AT_Agent_AiMarketing_V1` | 808658079040 | ENABLED | 87 | 0 | 0.00 | 2,013 | 23.3 | 14.0 | 10.8 | 9.6 | 40% | 32% |
| `PD_Agent_PS_Marketing_3v1` | 808658079067 | ENABLED | 74 | 0 | 0.00 | 1,679 | 37.0 | 21.4 | 16.3 | 13.9 | 42% | 35% |
| `PD_agent_ps_builder_1v2` | 808658079058 | ENABLED | 62 | 1 | 0.02 | 1,247 | 49.7 | 29.9 | 25.5 | 22.2 | 40% | 26% |

**Ads in `AI_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658079013 | ENABLED | 260 | 1 | 0.00 | 6,948 | 29.1 | 18.9 | 15.3 | 10.6 | 35% | 44% |
| `AT_Agent_WorkAgent_V2` | 808658079010 | ENABLED | 157 | 0 | 0.00 | 7,210 | 28.5 | 20.7 | 17.5 | 15.6 | 27% | 25% |
| `AT_Agent_AiMarketing_V2` | 808658079001 | ENABLED | 107 | 1 | 0.01 | 3,521 | 25.8 | 16.8 | 13.7 | 10.6 | 35% | 37% |
| `AT_Agent_WorkAgent_V1` | 808658079007 | ENABLED | 95 | 0 | 0.00 | 3,680 | 28.9 | 18.3 | 15.2 | 13.9 | 36% | 24% |
| `PD_Agent_PS_Marketing_2v2` | 808658079028 | ENABLED | 89 | 0 | 0.00 | 5,144 | 55.9 | 26.5 | 19.6 | 16.7 | 53% | 37% |
| `PD_agent_ps_builder_1v1` | 808658079019 | ENABLED | 84 | 0 | 0.00 | 2,796 | 46.6 | 26.0 | 21.1 | 17.2 | 44% | 34% |
| `PD_Agent_PS_Marketing_3v2` | 808658079034 | ENABLED | 72 | 0 | 0.00 | 3,073 | 43.7 | 23.6 | 19.0 | 16.1 | 46% | 32% |
| `AT_Agent_AiMarketing_V1` | 808658079004 | ENABLED | 68 | 0 | 0.00 | 3,698 | 22.6 | 13.6 | 10.9 | 9.1 | 40% | 33% |
| `PD_Agent_Builder_Short` | 808658079016 | ENABLED | 64 | 1 | 0.02 | 1,716 | 30.5 | 19.4 | 14.8 | 11.1 | 37% | 43% |
| `PD_Agent_PS_Marketing_2v1` | 808658079025 | ENABLED | 63 | 0 | 0.00 | 3,311 | 42.1 | 21.1 | 17.1 | 13.2 | 50% | 38% |
| `PD_Agent_PS_Marketing_3v1` | 808658079031 | ENABLED | 41 | 0 | 0.00 | 1,861 | 37.2 | 20.2 | 16.3 | 14.3 | 46% | 29% |
| `PD_agent_ps_builder_1v2` | 808658079022 | ENABLED | 16 | 0 | 0.00 | 802 | 50.0 | 21.2 | 17.3 | 15.4 | 58% | 27% |

**Ads in `DevTools_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658079091 | ENABLED | 178 | 1 | 0.01 | 7,270 | 25.9 | 17.1 | 13.5 | 9.8 | 34% | 42% |
| `PD_Agent_Builder_Short` | 808658079094 | ENABLED | 64 | 0 | 0.00 | 2,583 | 29.9 | 18.8 | 15.0 | 11.4 | 37% | 40% |
| `PD_agent_ps_builder_1v1` | 808658079097 | ENABLED | 57 | 0 | 0.00 | 3,767 | 44.3 | 25.1 | 19.6 | 16.1 | 43% | 36% |
| `PD_agent_ps_builder_1v2` | 808658079100 | ENABLED | 18 | 0 | 0.00 | 1,686 | 48.9 | 25.0 | 19.3 | 17.0 | 49% | 32% |

**Ads in `Marketing_SMMarketing_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Agent_AiMarketing_V2` | 808658079076 | ENABLED | 48 | 0 | 0.00 | 2,519 | 29.3 | 19.3 | 15.4 | 12.8 | 34% | 34% |
| `PD_Agent_PS_Marketing_2v2` | 808658079082 | ENABLED | 27 | 0 | 0.00 | 1,391 | 59.1 | 29.8 | 23.5 | 20.5 | 50% | 31% |
| `PD_Agent_PS_Marketing_3v1` | 808658079085 | ENABLED | 21 | 0 | 0.00 | 1,104 | 43.7 | 25.8 | 18.3 | 15.5 | 41% | 40% |
| `PD_Agent_PS_Marketing_3v2` | 808658079088 | ENABLED | 14 | 0 | 0.00 | 726 | 43.2 | 25.6 | 21.3 | 18.4 | 41% | 28% |
| `AT_Agent_AiMarketing_V1` | 808658079073 | ENABLED | 14 | 0 | 0.00 | 474 | 29.1 | 18.7 | 15.5 | 12.3 | 36% | 34% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 3,997 | 15 | 0.00 | 129,748 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 853 | 2 | 0.00 |
| geoTargetConstants/1007850 | 194 | 1 | 0.01 |
| geoTargetConstants/1006524 | 85 | 0 | 0.00 |
| geoTargetConstants/1006912 | 64 | 0 | 0.00 |
| geoTargetConstants/1007336 | 40 | 0 | 0.00 |
| geoTargetConstants/1006864 | 37 | 0 | 0.00 |
| geoTargetConstants/1006656 | 30 | 0 | 0.00 |
| geoTargetConstants/1007326 | 29 | 0 | 0.00 |
| geoTargetConstants/1006567 | 25 | 0 | 0.00 |
| geoTargetConstants/9197981 | 24 | 1 | 0.04 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 853 | 2 | 0.00 |
| geoTargetConstants/1007850 | 194 | 1 | 0.01 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-agents_audience-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £3,935 | **DEP:** 17 | **DEP/Spend:** 0.00
- **Impressions:** 237,056 | **Clicks:** 536 | **Conversions:** 17
- **All Conversions Value:** 14,372 | **All Conversions:** 2,442
- **Active Months:** 1 (2026-05-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-05-01 | 3,935 | 17 | 0.00 | 237,056 | 536 | 17 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CompAgents_CA-MultiAds` | ENABLED | 2,473 | 15 | 0.01 | 142,481 | 39.9 | 27.1 | 22.8 | 19.8 | 32% | 27% |
| `CompAi_CA-MultiAds` | ENABLED | 1,205 | 1 | 0.00 | 83,173 | 45.2 | 32.3 | 27.8 | 24.7 | 29% | 23% |
| `WorkAgents_S-MultiAds` | ENABLED | 148 | 0 | 0.00 | 6,099 | 39.3 | 27.3 | 23.3 | 20.4 | 31% | 25% |
| `AgentsBuilder_S-MultiAds` | ENABLED | 64 | 0 | 0.00 | 3,199 | 40.7 | 27.7 | 23.4 | 20.4 | 32% | 26% |
| `MarketingAgents_S-MultiAds` | ENABLED | 44 | 1 | 0.02 | 2,104 | 46.8 | 32.4 | 28.8 | 26.8 | 31% | 17% |

**Ads in `CompAgents_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658078821 | ENABLED | 1,166 | 6 | 0.01 | 58,483 | 32.7 | 22.4 | 18.6 | 15.4 | 32% | 31% |
| `PD_Agent_Builder_Short` | 808658078824 | ENABLED | 239 | 2 | 0.01 | 16,126 | 37.1 | 25.0 | 20.8 | 17.5 | 33% | 30% |
| `PD_agent_ps_builder_1v1` | 808658078827 | ENABLED | 223 | 3 | 0.01 | 15,836 | 53.7 | 32.7 | 26.8 | 23.4 | 39% | 28% |
| `AT_Agent_AiMarketing_V2` | 808658078809 | ENABLED | 187 | 2 | 0.01 | 12,123 | 37.6 | 28.1 | 24.9 | 22.3 | 25% | 21% |
| `PD_Agent_PS_Marketing_2v1` | 808658078833 | ENABLED | 134 | 2 | 0.01 | 10,176 | 59.0 | 39.7 | 34.3 | 31.2 | 33% | 21% |
| `AT_Agent_AiMarketing_V1` | 808658078812 | ENABLED | 115 | 0 | 0.00 | 6,056 | 39.1 | 28.7 | 24.5 | 22.0 | 27% | 23% |
| `AT_Agent_WorkAgent_V2` | 808658078818 | ENABLED | 101 | 0 | 0.00 | 5,996 | 37.3 | 28.0 | 24.3 | 21.8 | 25% | 22% |
| `PD_Agent_PS_Marketing_3v1` | 808658078839 | ENABLED | 85 | 0 | 0.00 | 5,097 | 45.9 | 31.4 | 26.7 | 23.3 | 31% | 26% |
| `AT_Agent_WorkAgent_V1` | 808658078815 | ENABLED | 84 | 0 | 0.00 | 4,380 | 37.5 | 28.2 | 24.3 | 21.6 | 25% | 24% |
| `PD_Agent_PS_Marketing_3v2` | 808658078842 | ENABLED | 56 | 0 | 0.00 | 2,748 | 48.9 | 30.8 | 26.2 | 23.3 | 37% | 24% |
| `PD_Agent_PS_Marketing_2v2` | 808658078836 | ENABLED | 56 | 0 | 0.00 | 3,369 | 62.9 | 37.5 | 31.8 | 29.1 | 40% | 22% |
| `PD_agent_ps_builder_1v2` | 808658078830 | ENABLED | 27 | 0 | 0.01 | 2,091 | 58.3 | 39.4 | 34.5 | 31.0 | 32% | 21% |

**Ads in `CompAi_CA-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658078857 | ENABLED | 337 | 0 | 0.00 | 21,846 | 35.3 | 24.7 | 20.8 | 17.6 | 30% | 29% |
| `AT_Agent_AiMarketing_V2` | 808658078845 | ENABLED | 188 | 1 | 0.01 | 12,663 | 42.4 | 32.5 | 28.5 | 25.7 | 23% | 21% |
| `PD_agent_ps_builder_1v1` | 808658078863 | ENABLED | 136 | 0 | 0.00 | 10,799 | 56.4 | 36.2 | 30.2 | 26.4 | 36% | 27% |
| `AT_Agent_WorkAgent_V1` | 808658078851 | ENABLED | 119 | 0 | 0.00 | 7,458 | 45.2 | 36.3 | 32.0 | 29.6 | 20% | 18% |
| `AT_Agent_WorkAgent_V2` | 808658078854 | ENABLED | 94 | 0 | 0.00 | 6,576 | 41.4 | 31.5 | 27.5 | 24.8 | 24% | 21% |
| `PD_Agent_PS_Marketing_2v2` | 808658078872 | ENABLED | 87 | 0 | 0.00 | 6,599 | 66.0 | 41.9 | 36.2 | 32.9 | 37% | 21% |
| `PD_Agent_Builder_Short` | 808658078860 | ENABLED | 68 | 0 | 0.00 | 4,396 | 40.3 | 27.7 | 23.4 | 20.5 | 31% | 26% |
| `PD_Agent_PS_Marketing_3v1` | 808658078875 | ENABLED | 52 | 0 | 0.00 | 3,567 | 54.2 | 39.7 | 35.1 | 31.6 | 27% | 20% |
| `PD_Agent_PS_Marketing_3v2` | 808658078878 | ENABLED | 46 | 0 | 0.00 | 3,389 | 54.6 | 37.6 | 32.7 | 29.6 | 31% | 21% |
| `PD_Agent_PS_Marketing_2v1` | 808658078869 | ENABLED | 36 | 0 | 0.00 | 2,987 | 57.3 | 39.0 | 33.2 | 30.0 | 32% | 23% |
| `PD_agent_ps_builder_1v2` | 808658078866 | ENABLED | 22 | 0 | 0.00 | 1,706 | 63.3 | 46.7 | 40.9 | 38.1 | 26% | 18% |
| `AT_Agent_AiMarketing_V1` | 808658078848 | ENABLED | 20 | 0 | 0.00 | 1,187 | 42.4 | 34.3 | 30.9 | 27.0 | 19% | 21% |

**Ads in `WorkAgents_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658078767 | ENABLED | 60 | 0 | 0.00 | 2,333 | 34.5 | 23.7 | 20.0 | 16.3 | 31% | 31% |
| `AT_Agent_WorkAgent_V2` | 808658078764 | ENABLED | 19 | 0 | 0.00 | 740 | 42.1 | 33.7 | 30.1 | 26.6 | 20% | 21% |
| `AT_Agent_AiMarketing_V2` | 808658078635 | ENABLED | 16 | 0 | 0.00 | 590 | 37.8 | 28.1 | 25.0 | 23.5 | 26% | 16% |
| `PD_agent_ps_builder_1v1` | 808658078773 | ENABLED | 14 | 0 | 0.00 | 605 | 50.0 | 30.5 | 25.9 | 23.9 | 39% | 22% |

**Ads in `AgentsBuilder_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_Agent_Builder_Long` | 808658078623 | ENABLED | 32 | 0 | 0.00 | 1,314 | 31.2 | 21.6 | 18.3 | 15.2 | 31% | 30% |
| `PD_agent_ps_builder_1v1` | 808658078629 | ENABLED | 20 | 0 | 0.00 | 1,138 | 55.1 | 35.6 | 30.4 | 27.7 | 35% | 22% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 3,935 | 17 | 0.00 | 237,056 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 760 | 2 | 0.00 |
| geoTargetConstants/1007850 | 290 | 0 | 0.00 |
| geoTargetConstants/1006524 | 83 | 0 | 0.00 |
| geoTargetConstants/1006912 | 56 | 0 | 0.00 |
| geoTargetConstants/1006656 | 35 | 0 | 0.00 |
| geoTargetConstants/1007336 | 33 | 0 | 0.00 |
| geoTargetConstants/1006864 | 33 | 0 | 0.00 |
| geoTargetConstants/1006567 | 26 | 0 | 0.00 |
| geoTargetConstants/1007326 | 26 | 0 | 0.00 |
| geoTargetConstants/1007835 | 25 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1007850 | 290 | 0 | 0.00 |
| geoTargetConstants/1006886 | 760 | 2 | 0.00 |

---

#### Campaign: `gb-en-prm-work_mgmt-desktop-topics_new-dg`

- **Status:** ENABLED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £3,053 | **DEP:** 12 | **DEP/Spend:** 0.00
- **Impressions:** 98,677 | **Clicks:** 361 | **Conversions:** 12
- **All Conversions Value:** 13,004 | **All Conversions:** 1,323
- **Active Months:** 1 (2026-05-01 → 2026-05-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2026-05-01 | 3,053 | 12 | 0.00 | 98,677 | 361 | 12 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EnterpriseTechnology_T-MultiAds` | ENABLED | 2,245 | 9 | 0.00 | 70,247 | 27.1 | 17.1 | 13.7 | 11.5 | 37% | 33% |
| `HumanResources_T-MultiAds` | ENABLED | 577 | 2 | 0.00 | 21,425 | 24.1 | 14.7 | 11.2 | 9.0 | 39% | 38% |
| `Consulting_T-MultiAds` | ENABLED | 120 | 1 | 0.01 | 4,218 | 22.7 | 14.2 | 10.9 | 9.1 | 37% | 36% |
| `BusinessPlans&Presentations_T-MultiAds` | ENABLED | 110 | 0 | 0.00 | 2,787 | 22.9 | 13.8 | 10.6 | 8.3 | 40% | 40% |

**Ads in `EnterpriseTechnology_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 807867243965 | ENABLED | 752 | 1 | 0.00 | 25,278 | 19.5 | 12.9 | 10.4 | 8.5 | 34% | 35% |
| `AT_Reni_AI_V1` | 807867243962 | ENABLED | 363 | 1 | 0.00 | 11,476 | 19.9 | 13.2 | 10.6 | 8.5 | 33% | 36% |
| `AT_Jay_Say` | 807867243839 | ENABLED | 230 | 1 | 0.00 | 5,031 | 30.2 | 20.6 | 17.1 | 14.3 | 32% | 30% |
| `AT_W_GameOver` | 807867243968 | ENABLED | 218 | 2 | 0.01 | 5,474 | 33.1 | 21.5 | 18.1 | 16.3 | 35% | 24% |
| `AT_W_Hear` | 807867243971 | ENABLED | 202 | 2 | 0.01 | 4,714 | 25.1 | 15.6 | 12.5 | 10.7 | 38% | 31% |
| `SH_PMO_Long` | 807867244010 | ENABLED | 105 | 0 | 0.00 | 5,229 | 93.5 | 51.8 | 32.7 | 26.9 | 45% | 48% |
| `PD_Llama_Angry_Short_NoIntro` | 807867243998 | ENABLED | 66 | 2 | 0.03 | 2,156 | 39.3 | 25.0 | 22.0 | 19.6 | 36% | 21% |
| `SH_Operations_Long` | 807867244007 | ENABLED | 62 | 0 | 0.00 | 2,160 | 94.3 | 42.3 | 28.4 | 23.2 | 55% | 45% |
| `DL_sidekick_47s` | 807867243989 | ENABLED | 59 | 0 | 0.00 | 1,819 | 28.5 | 20.8 | 18.1 | 16.3 | 27% | 22% |
| `PD_Llama_Skeleton` | 807867244001 | ENABLED | 35 | 0 | 0.00 | 1,621 | 21.1 | 13.8 | 11.8 | 9.8 | 35% | 29% |
| `DL_Llama_Templates_30s` | 807867243986 | PAUSED | 30 | 0 | 0.00 | 778 | 52.0 | 29.5 | 25.1 | 22.6 | 43% | 23% |
| `PD_Llama_Angry_Short` | 807867243995 | PAUSED | 30 | 0 | 0.00 | 1,537 | 28.0 | 16.5 | 13.4 | 11.5 | 41% | 30% |
| `DL_AI_Llama_Short` | 807867243974 | ENABLED | 19 | 0 | 0.00 | 382 | 28.4 | 18.3 | 15.1 | 11.9 | 36% | 35% |
| `PD_InShort_AI` | 807867243992 | PAUSED | 18 | 0 | 0.00 | 862 | 27.9 | 19.2 | 14.3 | 11.4 | 31% | 41% |
| `DL_Llama_47s` | 807867243977 | PAUSED | 16 | 0 | 0.00 | 580 | 35.1 | 21.0 | 17.7 | 15.7 | 40% | 25% |
| `DL_Llama_AnyType_30s` | 807867243980 | PAUSED | 15 | 0 | 0.00 | 373 | 55.2 | 34.1 | 29.0 | 24.4 | 38% | 29% |
| `DL_Llama_Dashboards_30s` | 807867243983 | PAUSED | 15 | 0 | 0.00 | 365 | 55.8 | 26.6 | 25.5 | 23.6 | 52% | 11% |

**Ads in `HumanResources_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 807867244247 | ENABLED | 161 | 1 | 0.01 | 5,683 | 18.4 | 12.0 | 9.2 | 7.2 | 35% | 40% |
| `AT_Reni_AI_V1` | 807867244244 | ENABLED | 139 | 0 | 0.00 | 5,519 | 18.5 | 11.2 | 8.6 | 6.6 | 40% | 41% |
| `AT_W_GameOver` | 807867244250 | ENABLED | 85 | 0 | 0.00 | 2,022 | 28.9 | 17.2 | 14.0 | 11.6 | 41% | 33% |
| `AT_W_Hear` | 807867244253 | ENABLED | 63 | 1 | 0.02 | 1,611 | 25.5 | 15.0 | 11.9 | 10.3 | 41% | 32% |
| `AT_Jay_Say` | 807867244241 | ENABLED | 44 | 0 | 0.00 | 1,359 | 26.9 | 17.0 | 12.8 | 10.5 | 37% | 38% |
| `SH_PMO_Long` | 807867244292 | ENABLED | 20 | 0 | 0.00 | 1,536 | 90.1 | 52.5 | 30.7 | 22.8 | 42% | 57% |
| `SH_Operations_Long` | 807867244289 | ENABLED | 10 | 0 | 0.00 | 322 | 93.4 | 46.2 | 26.4 | 23.6 | 51% | 49% |

**Ads in `Consulting_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 807867244019 | ENABLED | 62 | 1 | 0.02 | 1,934 | 17.8 | 12.0 | 9.2 | 7.5 | 32% | 38% |
| `AT_Reni_AI_V1` | 807867244016 | ENABLED | 21 | 0 | 0.00 | 706 | 17.0 | 11.3 | 9.2 | 7.6 | 33% | 33% |
| `AT_W_GameOver` | 807867244022 | ENABLED | 12 | 0 | 0.00 | 339 | 29.0 | 15.3 | 12.4 | 10.1 | 47% | 34% |

**Ads in `BusinessPlans&Presentations_T-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_Reni_AI_V2` | 807867244073 | ENABLED | 43 | 0 | 0.00 | 1,040 | 19.9 | 12.4 | 9.7 | 6.6 | 38% | 47% |
| `AT_Reni_AI_V1` | 807867244070 | ENABLED | 27 | 0 | 0.00 | 605 | 17.4 | 12.1 | 9.1 | 7.6 | 31% | 37% |
| `AT_W_GameOver` | 807867244076 | ENABLED | 14 | 0 | 0.00 | 301 | 27.6 | 16.7 | 14.4 | 12.5 | 39% | 26% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 3,053 | 12 | 0.00 | 98,677 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 619 | 2 | 0.00 |
| geoTargetConstants/1007850 | 150 | 2 | 0.01 |
| geoTargetConstants/1006912 | 64 | 0 | 0.00 |
| geoTargetConstants/1006524 | 64 | 0 | 0.00 |
| geoTargetConstants/1006656 | 29 | 1 | 0.03 |
| geoTargetConstants/1007336 | 27 | 0 | 0.00 |
| geoTargetConstants/1006864 | 27 | 0 | 0.00 |
| geoTargetConstants/1006567 | 22 | 0 | 0.00 |
| geoTargetConstants/9197981 | 20 | 0 | 0.00 |
| geoTargetConstants/1006948 | 19 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 619 | 2 | 0.00 |
| geoTargetConstants/1007850 | 150 | 2 | 0.01 |

---

#### Campaign: `gb-en-prm-crm-desktop-lookalike1-dg`

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** 
- **Total Spend:** £2,998 | **DEP:** 19 | **DEP/Spend:** 0.01
- **Impressions:** 212,561 | **Clicks:** 253 | **Conversions:** 19
- **All Conversions Value:** 9,190 | **All Conversions:** 1,147
- **Active Months:** 1 (2025-09-01 → 2025-09-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-09-01 | 2,998 | 19 | 0.01 | 212,561 | 253 | 19 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `CRMInstalls_DG-MultiAds` | ENABLED | 2,709 | 17 | 0.01 | 194,576 | 27.8 | 17.2 | 13.5 | 11.1 | 38% | 36% |
| `CRMPayers_DG-MultiAds` | ENABLED | 289 | 2 | 0.01 | 17,985 | 28.5 | 18.2 | 14.6 | 12.3 | 36% | 33% |

**Ads in `CRMInstalls_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Wow_CRM` | 774397338711 | ENABLED | 286 | 2 | 0.01 | 16,693 | 30.6 | 15.7 | 11.2 | 8.5 | 49% | 46% |
| `AT_TheMillionaire_Excuseme_CRM` | 774397338714 | ENABLED | 241 | 3 | 0.01 | 13,731 | 29.4 | 14.4 | 10.4 | 7.9 | 51% | 45% |
| `PD_AIPodcast_Long_CRM` | 773606545679 | PAUSED | 226 | 3 | 0.01 | 18,454 | 25.6 | 17.0 | 13.4 | 10.9 | 34% | 36% |
| `DL_Nightmare_Long_CRM` | 773606545838 | ENABLED | 197 | 0 | 0.00 | 10,318 | 22.3 | 15.8 | 12.6 | 10.6 | 29% | 33% |
| `CR_Intervention_WeNeed_CRM` | 774422561214 | ENABLED | 165 | 3 | 0.02 | 9,941 | 23.4 | 17.0 | 13.3 | 10.6 | 27% | 37% |
| `PD_AIPodcast_Short_CRM` | 773606545826 | PAUSED | 164 | 0 | 0.00 | 15,575 | 32.8 | 21.0 | 17.1 | 14.8 | 36% | 30% |
| `AT_Podcast_HateCRM_CRM` | 774551147460 | ENABLED | 156 | 0 | 0.00 | 14,245 | 22.4 | 15.3 | 11.9 | 9.6 | 32% | 37% |
| `AT_Podcast_BeHonest_CRM` | 774679698716 | ENABLED | 154 | 0 | 0.00 | 13,948 | 21.9 | 14.8 | 11.6 | 9.3 | 32% | 38% |
| `DL_Stayinglateagain_CRM` | 774462737035 | ENABLED | 149 | 0 | 0.00 | 7,982 | 24.3 | 16.5 | 13.0 | 10.3 | 32% | 37% |
| `DL_Switchto_CRM` | 774462737038 | ENABLED | 148 | 0 | 0.00 | 7,829 | 23.5 | 16.7 | 13.1 | 10.2 | 29% | 39% |
| `CR_Intervention_Launch_CRM` | 774422978607 | ENABLED | 131 | 1 | 0.01 | 8,068 | 22.6 | 15.0 | 11.8 | 9.3 | 33% | 38% |
| `CR_Enthusiast_StopIt_CRM` | 774423802302 | ENABLED | 113 | 1 | 0.01 | 7,728 | 30.0 | 18.3 | 14.8 | 12.6 | 39% | 31% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131628 | ENABLED | 110 | 2 | 0.02 | 12,188 | 30.0 | 19.2 | 15.4 | 13.7 | 36% | 28% |
| `AT_Car_Tip_CRM` | 774399590523 | ENABLED | 109 | 1 | 0.01 | 9,106 | 33.6 | 18.4 | 14.5 | 12.0 | 45% | 35% |
| `AT_Car_Bestadvice_CRM` | 774399590520 | ENABLED | 76 | 0 | 0.00 | 7,472 | 34.5 | 19.8 | 15.6 | 12.7 | 43% | 36% |
| `DL_Nightmare_Short_CRM` | 773606545835 | ENABLED | 71 | 0 | 0.00 | 3,626 | 36.5 | 25.0 | 21.3 | 19.1 | 31% | 24% |
| `PD_TheFastWay_Short_CRM` | 773606545829 | ENABLED | 53 | 0 | 0.00 | 2,838 | 33.7 | 24.2 | 20.5 | 18.1 | 28% | 25% |
| `PD_POV_Dashboard_CRM` | 773606545820 | PAUSED | 41 | 0 | 0.00 | 6,379 | 93.4 | 33.8 | 24.2 | 19.8 | 64% | 41% |
| `CR_President_ShortNo_CRM` | 773606545817 | PAUSED | 28 | 0 | 0.00 | 1,996 | 34.6 | 21.7 | 18.1 | 15.3 | 37% | 29% |
| `PD_TheFastWay_Long_CRM` | 773606545832 | ENABLED | 22 | 1 | 0.05 | 2,958 | 27.6 | 17.9 | 14.2 | 13.2 | 35% | 26% |
| `AT_WomanUS_TimeIsMoney_CRM` | 773606545805 | PAUSED | 17 | 0 | 0.00 | 916 | 30.6 | 20.9 | 16.9 | 13.5 | 32% | 35% |
| `PD_WomanPink_Face_CRM` | 773606545676 | PAUSED | 16 | 0 | 0.00 | 847 | 32.3 | 22.2 | 18.3 | 16.2 | 31% | 27% |
| `PD_3Reasons_Team_CRM` | 773606545811 | PAUSED | 13 | 0 | 0.00 | 663 | 25.9 | 18.1 | 15.7 | 14.1 | 30% | 22% |

**Ads in `CRMPayers_DG-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `AT_TheMillionaire_Wow_CRM` | 774397338705 | ENABLED | 38 | 0 | 0.00 | 2,264 | 29.0 | 14.5 | 11.0 | 8.4 | 50% | 42% |
| `AT_TheMillionaire_Excuseme_CRM` | 774397338708 | ENABLED | 31 | 0 | 0.00 | 1,700 | 27.6 | 14.7 | 10.2 | 7.8 | 47% | 47% |
| `DL_Nightmare_Long_CRM` | 773606545673 | ENABLED | 25 | 0 | 0.00 | 1,658 | 23.8 | 16.5 | 13.0 | 10.8 | 31% | 34% |
| `PD_AIPodcast_Long_CRM` | 773606545634 | PAUSED | 20 | 0 | 0.00 | 1,330 | 25.9 | 17.3 | 13.6 | 11.5 | 33% | 33% |
| `PD_AIPodcast_Short_CRM` | 773606545661 | PAUSED | 17 | 0 | 0.00 | 1,148 | 35.6 | 25.2 | 21.0 | 19.0 | 29% | 25% |
| `CR_Intervention_WeNeed_CRM` | 774422561211 | ENABLED | 16 | 0 | 0.00 | 1,008 | 24.4 | 17.7 | 14.0 | 11.0 | 27% | 38% |
| `AT_Podcast_BeHonest_CRM` | 774679698713 | ENABLED | 16 | 0 | 0.00 | 1,174 | 23.4 | 15.7 | 12.1 | 10.0 | 33% | 36% |
| `DL_Stayinglateagain_CRM` | 774462737029 | ENABLED | 14 | 0 | 0.00 | 851 | 22.1 | 15.7 | 13.2 | 10.3 | 29% | 34% |
| `CR_Intervention_Launch_CRM` | 774422978604 | ENABLED | 14 | 1 | 0.07 | 785 | 23.4 | 15.9 | 13.1 | 11.0 | 32% | 31% |
| `AT_Car_Tip_CRM` | 774399590397 | ENABLED | 14 | 0 | 0.00 | 1,032 | 35.4 | 20.7 | 17.6 | 14.9 | 42% | 28% |
| `CR_Enthusiast_AnotherDeal_CRM` | 774554131625 | ENABLED | 14 | 1 | 0.07 | 850 | 33.4 | 21.6 | 17.9 | 16.9 | 35% | 22% |
| `AT_Podcast_HateCRM_CRM` | 774551147457 | ENABLED | 13 | 0 | 0.00 | 1,021 | 24.9 | 17.5 | 14.2 | 11.6 | 30% | 34% |
| `DL_Switchto_CRM` | 774462737032 | ENABLED | 11 | 0 | 0.00 | 748 | 22.3 | 16.4 | 13.6 | 11.1 | 26% | 32% |
| `CR_Enthusiast_StopIt_CRM` | 774423802299 | ENABLED | 11 | 0 | 0.00 | 636 | 34.1 | 24.1 | 20.4 | 18.0 | 29% | 25% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 2,998 | 19 | 0.01 | 212,561 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 701 | 4 | 0.01 |
| geoTargetConstants/1006524 | 58 | 0 | 0.00 |
| geoTargetConstants/1006912 | 38 | 2 | 0.05 |
| geoTargetConstants/1007850 | 37 | 0 | 0.00 |
| geoTargetConstants/1007326 | 25 | 0 | 0.00 |
| geoTargetConstants/1006864 | 25 | 0 | 0.00 |
| geoTargetConstants/1007336 | 25 | 0 | 0.00 |
| geoTargetConstants/1006656 | 25 | 0 | 0.00 |
| geoTargetConstants/9197981 | 24 | 0 | 0.00 |
| geoTargetConstants/1006567 | 23 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 701 | 4 | 0.01 |

---

#### Campaign: `gb-en-brand-multi-mobile-expanded_shorts-t-regional_awareness_uk_25q1` [BRAND]

- **Status:** PAUSED | **Bid Strategy:** TARGET_CPM | **Channel Sub-Type:** 
- **Total Spend:** £2,799 | **DEP:** 1,610 | **DEP/Spend:** 0.58
- **Impressions:** 1,316,916 | **Clicks:** 2,173 | **Conversions:** 161
- **All Conversions Value:** 2,491 | **All Conversions:** 625
- **Active Months:** 1 (2025-03-01 → 2025-03-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2025-03-01 | 2,799 | 1,610 | 0.58 | 1,316,916 | 2,173 | 161 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `EmployerLarge_EM-ShortsAds` | ENABLED | 2,572 | 1,440 | 0.56 | 1,211,132 | 2.0 | 0.6 | 0.4 | 0.2 | 67% | 68% |
| `BusinessProductivitySoftware_IM-ShortsAds` | ENABLED | 227 | 170 | 0.75 | 105,784 | 1.7 | 0.5 | 0.3 | 0.2 | 69% | 66% |

**Ads in `EmployerLarge_EM-ShortsAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_2_Shorts_Brand` | 738180349192 | ENABLED | 939 | 580 | 0.62 | 439,583 | 2.1 | 0.7 | 0.4 | 0.2 | 65% | 67% |
| `CR_Llama_Hero60_GB_Shorts_Brand` | 738180349195 | ENABLED | 861 | 490 | 0.57 | 409,871 | 1.1 | 0.3 | 0.2 | 0.1 | 68% | 68% |
| `CR_Llama_Hero30_GB_1_Shorts_Brand` | 738180349189 | ENABLED | 771 | 370 | 0.48 | 361,678 | 2.8 | 0.9 | 0.5 | 0.3 | 69% | 68% |

**Ads in `BusinessProductivitySoftware_IM-ShortsAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `CR_Llama_Hero30_GB_1_Shorts_Brand` | 738180349321 | ENABLED | 89 | 110 | 1.24 | 41,270 | 2.5 | 0.7 | 0.4 | 0.3 | 72% | 61% |
| `CR_Llama_Hero60_GB_Shorts_Brand` | 738180349324 | ENABLED | 72 | 50 | 0.70 | 33,608 | 0.9 | 0.3 | 0.1 | 0.1 | 69% | 74% |
| `CR_Llama_Hero30_GB_2_Shorts_Brand` | 738180349198 | ENABLED | 67 | 10 | 0.15 | 30,906 | 1.5 | 0.6 | 0.3 | 0.2 | 61% | 69% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| MOBILE | 2,799 | 1,610 | 0.58 | 1,316,916 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 2,795 | 1,610 | 0.58 |
| geoTargetConstants/9196633 | 3 | 0 | 0.00 |
| geoTargetConstants/9189725 | 1 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 2,795 | 1,610 | 0.58 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-pm_dlu-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £2,613 | **DEP:** 70 | **DEP/Spend:** 0.03
- **Impressions:** 90,165 | **Clicks:** 111 | **Conversions:** 7
- **All Conversions Value:** 4,627 | **All Conversions:** 359
- **Active Months:** 2 (2024-06-01 → 2024-07-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-06-01 | 2,473 | 70 | 0.03 | 83,286 | 104 | 7 |
| 2024-07-01 | 141 | 0 | 0.00 | 6,879 | 7 | 0 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `PMDynamicLineup_LU-MultiAds` | ENABLED | 2,613 | 70 | 0.03 | 90,165 | 27.1 | 15.3 | 11.8 | 9.5 | 43% | 38% |

**Ads in `PMDynamicLineup_LU-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_Long` | 700144973448 | PAUSED | 1,625 | 60 | 0.04 | 44,261 | 23.5 | 13.6 | 10.3 | 8.3 | 42% | 39% |
| `PD_Linear_Actress` | 700144973262 | PAUSED | 284 | 10 | 0.04 | 6,517 | 23.8 | 16.0 | 12.7 | 10.5 | 33% | 34% |
| `PD_Linear_Group` | 700144973508 | PAUSED | 167 | 0 | 0.00 | 4,510 | 25.5 | 16.2 | 13.4 | 11.8 | 36% | 27% |
| `PD_WorkOS_21sec_UK` | 700144973646 | PAUSED | 116 | 0 | 0.00 | 4,912 | 72.6 | 24.6 | 16.7 | 12.0 | 66% | 51% |
| `AT_Shmuel_NewSplit` | 700144973472 | PAUSED | 113 | 0 | 0.00 | 3,004 | 40.2 | 23.3 | 18.5 | 15.8 | 42% | 32% |
| `UT_SOH_Flexibility` | 700144973427 | PAUSED | 107 | 0 | 0.00 | 1,999 | 29.1 | 17.1 | 13.3 | 10.6 | 41% | 38% |
| `PD_WorkOS_21sec` | 700144973451 | PAUSED | 54 | 0 | 0.00 | 9,054 | 89.3 | 39.8 | 26.3 | 20.8 | 55% | 48% |
| `PD_YesBut_DeliverWW` | 700144973433 | ENABLED | 20 | 0 | 0.00 | 747 | 25.5 | 19.4 | 16.7 | 14.9 | 24% | 23% |
| `EfficiencyProductDemoTeams` | 639296169031 | PAUSED | 17 | 0 | 0.00 | 1,118 | 30.7 | 17.5 | 14.9 | 11.9 | 43% | 32% |
| `PD_YesBut_DeliverBritishRU` | 700144973655 | ENABLED | 16 | 0 | 0.00 | 970 | 24.0 | 16.3 | 13.9 | 12.6 | 32% | 23% |
| `CR_HiGoogie` | 700144973478 | PAUSED | 12 | 0 | 0.00 | 667 | 48.9 | 28.5 | 19.1 | 19.1 | 42% | 33% |
| `PD_YesBut_DeliverMM` | 700144973661 | ENABLED | 11 | 0 | 0.00 | 2,760 | 29.8 | 23.2 | 21.6 | 17.0 | 22% | 27% |
| `PD_WorkOS_Long_UK` | 700144973460 | PAUSED | 11 | 0 | 0.00 | 2,904 | 26.5 | 16.9 | 12.6 | 8.3 | 36% | 51% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 2,613 | 70 | 0.03 | 90,165 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 696 | 10 | 0.01 |
| geoTargetConstants/1006912 | 53 | 0 | 0.00 |
| geoTargetConstants/1006524 | 48 | 0 | 0.00 |
| geoTargetConstants/1006864 | 26 | 0 | 0.00 |
| geoTargetConstants/1006567 | 25 | 0 | 0.00 |
| geoTargetConstants/1006656 | 24 | 0 | 0.00 |
| geoTargetConstants/1007336 | 23 | 0 | 0.00 |
| geoTargetConstants/1007326 | 16 | 0 | 0.00 |
| geoTargetConstants/1007064 | 16 | 0 | 0.00 |
| geoTargetConstants/1006867 | 14 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 696 | 10 | 0.01 |

---

#### Campaign: `gb-en-prm-workos-work_mgmt-desktop-trgt_monday_freqcap-v`

- **Status:** REMOVED | **Bid Strategy:** TARGET_CPA | **Channel Sub-Type:** VIDEO_ACTION
- **Total Spend:** £2,288 | **DEP:** 40 | **DEP/Spend:** 0.02
- **Impressions:** 28,856 | **Clicks:** 24 | **Conversions:** 4
- **All Conversions Value:** 4,000 | **All Conversions:** 243
- **Active Months:** 1 (2024-06-01 → 2024-06-01)

**Monthly Trend:**

| Month | Spend £ | DEP | DEP/Spend | Imp | Clicks | Conv |
|-------|---------|-----|-----------|-----|--------|------|
| 2024-06-01 | 2,288 | 40 | 0.02 | 28,856 | 24 | 4 |

**Ad Groups:**

| Ad Group | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook→Mid Drop | Mid→End Drop |
|----------|--------|---------|-----|-----------|-----|------|------|------|-------|--------------|-------------|
| `mondayProjectManagement_S-MultiAds` | ENABLED | 1,562 | 30 | 0.02 | 16,916 | 35.6 | 15.7 | 11.4 | 9.0 | 56% | 43% |
| `mondayProjectManagement_KW-MultiAds` | ENABLED | 726 | 10 | 0.01 | 11,940 | 37.9 | 21.7 | 16.8 | 14.1 | 43% | 35% |

**Ads in `mondayProjectManagement_S-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec_UK` | 701425138952 | PAUSED | 524 | 10 | 0.02 | 3,735 | 71.0 | 23.6 | 16.6 | 13.4 | 67% | 43% |
| `PD_Dialogue_Long` | 701425138937 | PAUSED | 501 | 20 | 0.04 | 4,321 | 16.7 | 10.3 | 7.5 | 5.7 | 38% | 44% |
| `PD_WorkOS_Long` | 701304706553 | PAUSED | 300 | 0 | 0.00 | 4,463 | 21.5 | 13.1 | 10.5 | 8.2 | 39% | 37% |
| `PD_WorkOS_21sec` | 701304706532 | PAUSED | 53 | 0 | 0.00 | 519 | 85.8 | 20.8 | 12.5 | 9.0 | 76% | 57% |
| `PD_Linear_Actress` | 701304707183 | PAUSED | 21 | 0 | 0.00 | 409 | 24.7 | 17.6 | 13.3 | 12.2 | 29% | 31% |
| `PD_Linear_Group` | 701304706517 | PAUSED | 18 | 0 | 0.00 | 293 | 31.0 | 22.2 | 17.6 | 16.2 | 28% | 27% |
| `PD_TikToker_HackW` | 701554802761 | PAUSED | 17 | 0 | 0.00 | 300 | 25.2 | 15.5 | 13.6 | 5.8 | 38% | 62% |
| `UT_SOH_Flexibility` | 701304707201 | PAUSED | 17 | 0 | 0.00 | 184 | 23.5 | 13.7 | 9.2 | 6.5 | 42% | 52% |
| `AT_Shmuel_NewSplit` | 701304706790 | PAUSED | 13 | 0 | 0.00 | 182 | 31.2 | 20.0 | 17.6 | 12.0 | 36% | 40% |
| `EfficiencyProductDemoTeams` | 701304706556 | PAUSED | 11 | 0 | 0.00 | 145 | 23.7 | 16.7 | 7.9 | 6.1 | 30% | 63% |
| `PD_YesBut_DeliverWW` | 701304707015 | ENABLED | 10 | 0 | 0.00 | 235 | 28.0 | 16.0 | 13.3 | 12.0 | 43% | 25% |

**Ads in `mondayProjectManagement_KW-MultiAds`:**

| Ad Name | ID | Status | Spend £ | DEP | DEP/Spend | Imp | P25% | P50% | P75% | P100% | Hook Drop | Content Drop |
|---------|-----|--------|---------|-----|-----------|-----|------|------|------|-------|-----------|-------------|
| `PD_WorkOS_21sec_UK` | 701425138949 | PAUSED | 342 | 10 | 0.03 | 2,191 | 70.1 | 28.4 | 21.7 | 18.1 | 59% | 36% |
| `PD_Linear_Actress` | 701304706745 | PAUSED | 134 | 0 | 0.00 | 4,115 | 27.3 | 18.9 | 14.7 | 12.6 | 31% | 34% |
| `PD_WorkOS_Long` | 701304706523 | PAUSED | 109 | 0 | 0.00 | 2,637 | 30.6 | 19.9 | 15.5 | 12.6 | 35% | 37% |
| `PD_Linear_Group` | 701304706994 | PAUSED | 37 | 0 | 0.00 | 1,313 | 29.5 | 20.6 | 15.2 | 13.0 | 30% | 37% |
| `PD_WorkOS_21sec` | 701304706961 | PAUSED | 24 | 0 | 0.00 | 95 | 95.7 | 34.8 | 25.0 | 21.7 | 64% | 37% |
| `PD_TikToker_HackW` | 701554800907 | PAUSED | 11 | 0 | 0.00 | 172 | 40.4 | 26.3 | 20.5 | 15.2 | 35% | 42% |

**Device Split:**

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| DESKTOP | 2,288 | 40 | 0.02 | 28,856 |

**Top 10 Cities by Spend:**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 479 | 30 | 0.06 |
| geoTargetConstants/1006524 | 42 | 0 | 0.00 |
| geoTargetConstants/1006912 | 38 | 0 | 0.00 |
| geoTargetConstants/1006567 | 34 | 0 | 0.00 |
| geoTargetConstants/1006864 | 27 | 0 | 0.00 |
| geoTargetConstants/1006884 | 19 | 0 | 0.00 |
| geoTargetConstants/1006656 | 17 | 0 | 0.00 |
| geoTargetConstants/1007326 | 17 | 0 | 0.00 |
| geoTargetConstants/1007336 | 14 | 0 | 0.00 |
| geoTargetConstants/1007064 | 14 | 0 | 0.00 |

**Bottom 5 Cities (high spend, lowest DEP/Spend):**

| City ID | Spend £ | DEP | DEP/Spend |
|---------|---------|-----|-----------|
| geoTargetConstants/1006886 | 479 | 30 | 0.06 |

---

## 3. YouTube — Cross-Cutting Analysis

### 3.1 Bid Strategy Performance (Non-Brand Only)

| Bid Strategy | Spend £ | DEP | DEP/Spend | Conversions | # Campaigns |
|-------------|---------|-----|-----------|-------------|-------------|
| TARGET_CPA | 4,023,251 | 412,359 | 0.10 | 15,206 | 39 |
| TARGET_CPM | 30,801 | 305 | 0.01 | 53 | 2 |

### 3.2 Device Performance (All Campaigns)

| Device | Spend £ | DEP | DEP/Spend | Impressions | Clicks | CTR |
|--------|---------|-----|-----------|-------------|--------|-----|
| DESKTOP | 4,154,784 | 429,857 | 0.10 | 428,762,623 | 528,144 | 0.123% |
| MOBILE | 108,232 | 44,467 | 0.41 | 24,822,748 | 50,370 | 0.203% |
| CONNECTED_TV | 53,933 | 998 | 0.02 | 3,213,697 | 1,464 | 0.046% |

### 3.3 Hour of Day Performance

| Hour | Spend £ | DEP | DEP/Spend | Imp |
|------|---------|-----|-----------|-----|
| 00:00 | 74,003 | 11,048 | 0.15 | 9,455,664 |
| 01:00 | 49,110 | 7,367 | 0.15 | 6,403,512 |
| 02:00 | 35,404 | 7,026 | 0.20 | 4,512,393 |
| 03:00 | 29,481 | 5,244 | 0.18 | 3,590,530 |
| 04:00 | 32,665 | 6,184 | 0.19 | 3,640,844 |
| 05:00 | 44,598 | 7,115 | 0.16 | 4,403,050 |
| 06:00 | 72,111 | 11,211 | 0.16 | 6,820,627 |
| 07:00 | 117,598 | 17,777 | 0.15 | 10,610,649 |
| 08:00 | 189,640 | 28,805 | 0.15 | 16,060,986 |
| 09:00 | 243,800 | 37,605 | 0.15 | 20,581,904 |
| 10:00 | 263,130 | 31,851 | 0.12 | 22,567,905 |
| 11:00 | 264,580 | 29,464 | 0.11 | 23,437,319 |
| 12:00 | 263,344 | 29,212 | 0.11 | 23,986,431 |
| 13:00 | 270,014 | 26,622 | 0.10 | 24,390,883 |
| 14:00 | 269,371 | 28,680 | 0.11 | 24,392,805 |
| 15:00 | 264,747 | 25,835 | 0.10 | 25,163,527 |
| 16:00 | 246,626 | 24,247 | 0.10 | 25,478,076 |
| 17:00 | 230,283 | 21,713 | 0.09 | 26,204,381 |
| 18:00 | 231,279 | 18,421 | 0.08 | 27,599,164 |
| 19:00 | 243,764 | 22,592 | 0.09 | 30,016,379 |
| 20:00 | 251,039 | 22,344 | 0.09 | 31,583,364 |
| 21:00 | 246,068 | 22,013 | 0.09 | 32,200,498 |
| 22:00 | 215,223 | 17,864 | 0.08 | 29,542,177 |
| 23:00 | 169,071 | 15,079 | 0.09 | 24,156,000 |

**Best DEP/Spend hours (min £1K spend):** 02:00 (0.20), 04:00 (0.19), 03:00 (0.18), 05:00 (0.16), 06:00 (0.16)
**Worst DEP/Spend hours:** 21:00 (0.09), 23:00 (0.09), 20:00 (0.09), 22:00 (0.08), 18:00 (0.08)

### 3.4 Day of Week Performance

| Day | Spend £ | DEP | DEP/Spend | Imp |
|-----|---------|-----|-----------|-----|
| MONDAY | 659,500 | 77,688 | 0.12 | 68,139,617 |
| TUESDAY | 667,574 | 75,549 | 0.11 | 65,736,773 |
| WEDNESDAY | 682,743 | 68,460 | 0.10 | 65,797,338 |
| THURSDAY | 667,404 | 72,667 | 0.11 | 64,828,589 |
| FRIDAY | 620,582 | 63,939 | 0.10 | 64,469,745 |
| SATURDAY | 496,848 | 60,309 | 0.12 | 62,907,968 |
| SUNDAY | 522,298 | 56,710 | 0.11 | 64,919,038 |

### 3.5 Geographic Performance — Top 20 Cities by Spend

| City ID | Total Spend £ | DEP | DEP/Spend | Impressions |
|---------|--------------|-----|-----------|-------------|
| geoTargetConstants/1006886 | 1,149,017 | 173,628 | 0.15 | 119,547,729 |
| geoTargetConstants/1007850 | 157,168 | 14,482 | 0.09 | 24,621,547 |
| geoTargetConstants/1006524 | 82,861 | 6,246 | 0.08 | 8,529,786 |
| geoTargetConstants/1006912 | 67,942 | 6,917 | 0.10 | 6,322,892 |
| geoTargetConstants/1007336 | 36,834 | 2,632 | 0.07 | 3,759,153 |
| geoTargetConstants/1006567 | 35,233 | 3,638 | 0.10 | 3,558,991 |
| geoTargetConstants/1006864 | 34,065 | 3,085 | 0.09 | 3,461,667 |
| geoTargetConstants/1006656 | 32,131 | 3,313 | 0.10 | 3,165,126 |
| geoTargetConstants/1007326 | 29,503 | 2,418 | 0.08 | 3,236,394 |
| geoTargetConstants/1006884 | 26,306 | 1,966 | 0.07 | 2,800,619 |
| geoTargetConstants/1007064 | 23,098 | 1,872 | 0.08 | 2,390,380 |
| geoTargetConstants/9197981 | 21,711 | 1,681 | 0.08 | 2,142,303 |
| geoTargetConstants/1006948 | 18,731 | 1,185 | 0.06 | 2,021,301 |
| geoTargetConstants/1007043 | 18,228 | 1,399 | 0.08 | 1,567,720 |
| geoTargetConstants/1006867 | 16,708 | 801 | 0.05 | 1,741,860 |
| geoTargetConstants/1007009 | 16,050 | 1,164 | 0.07 | 1,613,398 |
| geoTargetConstants/9198690 | 15,804 | 2,020 | 0.13 | 1,590,641 |
| geoTargetConstants/9198013 | 15,125 | 1,764 | 0.12 | 1,607,425 |
| geoTargetConstants/1006668 | 14,178 | 1,244 | 0.09 | 1,461,686 |
| geoTargetConstants/1007210 | 14,000 | 888 | 0.06 | 1,439,100 |

### 3.5b Geographic — Worst Performing Cities (spend > £1K, lowest DEP/Spend)

| City ID | Total Spend £ | DEP | DEP/Spend |
|---------|--------------|-----|-----------|
| geoTargetConstants/1006474 | 1,251 | 1 | 0.00 |
| geoTargetConstants/9189744 | 1,185 | 1 | 0.00 |
| geoTargetConstants/1007012 | 1,767 | 2 | 0.00 |
| geoTargetConstants/9237442 | 1,521 | 2 | 0.00 |
| geoTargetConstants/1006697 | 1,740 | 2 | 0.00 |
| geoTargetConstants/1007222 | 1,346 | 2 | 0.00 |
| geoTargetConstants/1006569 | 1,270 | 2 | 0.00 |
| geoTargetConstants/9192800 | 1,528 | 3 | 0.00 |
| geoTargetConstants/1007902 | 1,927 | 5 | 0.00 |
| geoTargetConstants/9040161 | 1,517 | 4 | 0.00 |
| geoTargetConstants/1007872 | 1,460 | 4 | 0.00 |
| geoTargetConstants/9194307 | 1,006 | 3 | 0.00 |
| geoTargetConstants/1007023 | 1,386 | 4 | 0.00 |
| geoTargetConstants/1007189 | 1,302 | 4 | 0.00 |
| geoTargetConstants/1006609 | 1,229 | 4 | 0.00 |
| geoTargetConstants/1006543 | 1,661 | 7 | 0.00 |
| geoTargetConstants/1007055 | 1,548 | 7 | 0.00 |
| geoTargetConstants/1007258 | 1,249 | 7 | 0.01 |
| geoTargetConstants/9189414 | 1,048 | 6 | 0.01 |
| geoTargetConstants/9191171 | 1,328 | 9 | 0.01 |

### 3.6 Audience Segment Performance (by Ad Group)

| Campaign | Ad Group | Spend £ | DEP | DEP/Spend | Imp |
|----------|----------|---------|-----|-----------|-----|
| `gb-en-prm-service-desktop-competitors-dg` | `ServiceCompBig_CA-MultiAds` | 142,016 | 597 | 0.00 | 15,630,200 |
| `gb-en-prm-work_mgmt-desktop-employment-v` | `IndustryTechnology_EM-MultiAds` | 138,498 | 55,300 | 0.40 | 14,602,334 |
| `gb-en-prm-workos-crm-desktop-verticals-v` | `CompCRMBig_S-MultiAds` | 126,734 | 5,390 | 0.04 | 3,669,079 |
| `gb-en-prm-work_mgmt-desktop-demandgen-v` | `HardSU_DG-MultiAds` | 117,207 | 5,036 | 0.04 | 7,148,069 |
| `gb-en-prm-work_mgmt-desktop-demandgen-v` | `EntQE_DG-MultiAds` | 95,552 | 4,745 | 0.05 | 6,200,328 |
| `gb-en-prm-work_mgmt-desktop-employment-d` | `EmployerLarge_EM-MultiAds` | 90,750 | 417 | 0.00 | 11,038,569 |
| `gb-en-prm-work_mgmt-desktop-employment-d` | `IndustryTechnology_EM-MultiAds` | 86,365 | 365 | 0.00 | 8,632,526 |
| `gb-en-prm-work_mgmt-desktop-employment-v` | `EmployerLarge_EM-MultiAds` | 73,539 | 25,800 | 0.35 | 8,719,037 |
| `gb-en-prm-work_mgmt-desktop-demandgen-v` | `Payers_DG-MultiAds` | 65,420 | 1,967 | 0.03 | 4,109,993 |
| `gb-en-prm-service-desktop-trgt-dg` | `HelpDeskCS_IM-MultiAds` | 64,819 | 149 | 0.00 | 4,414,976 |
| `gb-en-prm-crm-desktop-main2-dg` | `Employment_CRM_EM` | 63,155 | 1,597 | 0.03 | 5,118,778 |
| `gb-en-prm-work_mgmt-desktop-personas-dg` | `Audience_ProjectManagement_M` | 60,073 | 352 | 0.01 | 4,251,277 |
| `gb-en-prm-work_mgmt-desktop-demandgen-v` | `QE_DG-MultiAds` | 51,110 | 1,710 | 0.03 | 3,010,488 |
| `gb-en-prm-work_mgmt-desktop-lookalike-dg` | `QE_L` | 41,952 | 211 | 0.01 | 6,085,513 |
| `gb-en-prm-crm-desktop-main2-dg` | `LookalikeHigh_CRM_L` | 33,623 | 721 | 0.02 | 4,042,717 |
| `gb-en-prm-workos-crm-desktop-trgt-dg` | `CRM_S-MultiAds` | 32,248 | 938 | 0.03 | 1,283,105 |
| `gb-en-prm-workos-work_mgmt-desktop-trgt_` | `mondayProjectManagement_S-MultiAds` | 31,063 | 1,320 | 0.04 | 589,737 |
| `gb-en-prm-workos-work_mgmt-desktop-emplo` | `IndustryTechnology_EM-MultiAds` | 28,813 | 6,100 | 0.21 | 2,115,393 |
| `gb-en-prm-crm-desktop-lookalike-dg` | `CRMInstalls_DG-MultiAds` | 28,737 | 919 | 0.03 | 2,262,284 |
| `gb-en-prm-workos-crm-desktop-trgt-dg` | `CompCRMBig4_S-MultiAds` | 28,490 | 544 | 0.02 | 1,182,328 |
| `gb-en-prm-workos-crm-desktop-verticals-v` | `CRMsolutions-IMcrm-MultiAds` | 27,737 | 2,930 | 0.11 | 1,170,360 |
| `gb-en-prm-crm-desktop-main2-dg` | `Lookalike_CRM_L` | 27,670 | 647 | 0.02 | 2,952,389 |
| `gb-en-prm-crm-desktop-main2-dg` | `CompBig_CRM_CA` | 27,669 | 620 | 0.02 | 2,333,660 |
| `gb-en-brand-multi-ctv-expanded-t-regiona` | `EmployerLarge_EM-InStreamAds` | 27,163 | 750 | 0.03 | 1,555,988 |
| `gb-en-prm-work_mgmt-desktop-lookalike-dg` | `Payers_L` | 26,144 | 165 | 0.01 | 3,096,044 |
| `gb-en-prm-workos-work_mgmt-desktop-topic` | `mondayProjectManagement_S-MultiAds` | 22,595 | 1,440 | 0.06 | 269,847 |
| `gb-en-brand-work_mgmt-desktop-expanded-t` | `EmployerLarge_EM-InStreamAds` | 22,490 | 1,371 | 0.06 | 1,754,875 |
| `gb-en-brand-work_mgmt-multi-trgt-t-cpv-r` | `EmployerLarge_EM-InStreamAds` | 21,991 | 2,927 | 0.13 | 2,743,188 |
| `gb-en-prm-workos-crm-desktop-trgt-dg` | `CRMsolutions-IMcrm-MultiAds` | 21,948 | 841 | 0.04 | 1,462,859 |
| `gb-en-prm-work_mgmt-desktop-personas-dg` | `Audience_Marketing_M` | 21,841 | 124 | 0.01 | 1,508,261 |

### 3.7 Creative Fatigue — Ads with Declining Completion Rates

Methodology: comparing avg P100 rate in first half vs second half of ad lifetime. Only ads with £1K+ spend and 4+ months.

| Ad Name | Campaign | Status | Spend £ | DEP | P100% 1st Half | P100% 2nd Half | Decline% |
|---------|----------|--------|---------|-----|---------------|----------------|----------|
| `CR_MakesSense_Short` | `gb-en-prm-work_mgmt-desktop-ron-v` | ENABLED | 247,748 | 109,200 | 15.8% | 13.4% | 15% |
| `PD_Zen_Short_Service` | `gb-en-prm-service-desktop-competito` | ENABLED | 77,277 | 362 | 30.7% | 26.5% | 14% |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 55,067 | 18,600 | 18.3% | 14.0% | 24% |
| `PD_WorkOS_Long` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 52,200 | 16,100 | 9.9% | 7.0% | 29% |
| `CR_MakesSense_Long` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 28,616 | 14,200 | 17.6% | 13.4% | 24% |
| `PD_TikToker_HackW` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 26,664 | 7,300 | 17.6% | 9.7% | 45% |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-employm` | REMOVED | 19,333 | 6,500 | 6.6% | 4.8% | 27% |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-employm` | PAUSED | 14,833 | 5,400 | 8.3% | 4.6% | 45% |
| `CR_MakesSense_Short` | `gb-en-prm-workos-work_mgmt-desktop-` | PAUSED | 11,145 | 530 | 9.2% | 8.0% | 13% |
| `PD_TikToker_HackW` | `gb-en-prm-workos-work_mgmt-desktop-` | PAUSED | 10,129 | 490 | 12.7% | 10.3% | 19% |
| `CR_MakesSense_Long` | `gb-en-prm-workos-work_mgmt-desktop-` | PAUSED | 9,643 | 460 | 10.6% | 7.1% | 33% |
| `PD_Linear_Group` | `gb-en-prm-work_mgmt-desktop-ron_ins` | PAUSED | 7,895 | 16 | 21.1% | 18.4% | 13% |
| `CRMKnightUsingCRM` | `gb-en-prm-workos-crm-desktop-vertic` | PAUSED | 7,736 | 280 | 15.7% | 14.0% | 11% |
| `PD_Linear_Actress` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 6,876 | 3,000 | 21.8% | 18.3% | 16% |
| `CRMKnightUsingCRM` | `gb-en-prm-workos-crm-desktop-topics` | ENABLED | 6,491 | 110 | 13.0% | 11.5% | 12% |
| `PD_AIPodcast_Long_CRM` | `gb-en-prm-crm-desktop-lookalike-dg` | ENABLED | 5,925 | 175 | 13.1% | 10.8% | 18% |
| `PD_TikToker_HackW` | `gb-en-prm-workos-work_mgmt-desktop-` | PAUSED | 5,868 | 340 | 10.6% | 9.4% | 12% |
| `PD_3Reasons_Team_CRM` | `gb-en-prm-crm-desktop-ron-dg` | PAUSED | 5,817 | 110 | 13.9% | 12.0% | 14% |
| `CRMQuickWinDemoPerson` | `gb-en-prm-workos-crm-desktop-vertic` | ENABLED | 5,516 | 160 | 10.8% | 7.9% | 27% |
| `AT_WomanUS_TimeIsMoney_CRM` | `gb-en-prm-crm-desktop-ron-dg` | PAUSED | 4,942 | 178 | 22.4% | 16.6% | 26% |
| `CRMKnightUsingCRM` | `gb-en-prm-workos-crm-desktop-vertic` | PAUSED | 4,350 | 180 | 8.9% | 7.7% | 13% |
| `DL_Nightmare_Long_CRM` | `gb-en-prm-crm-desktop-lookalike-dg` | ENABLED | 4,328 | 100 | 12.1% | 10.1% | 16% |
| `PD_WorkOS_Long` | `gb-en-prm-workos-work_mgmt-desktop-` | PAUSED | 4,319 | 120 | 11.4% | 9.6% | 15% |
| `PD_ArtOfWork_Flexibility` | `gb-en-prm-work_mgmt-desktop-ron-v` | PAUSED | 4,297 | 2,300 | 19.2% | 16.3% | 15% |
| `CR_President_Long_CRM` | `gb-en-prm-workos-crm-desktop-vertic` | ENABLED | 3,891 | 450 | 13.4% | 8.5% | 37% |
| `PD_POV_Dashboard_CRM` | `gb-en-prm-crm-desktop-ron-dg` | PAUSED | 3,719 | 61 | 24.8% | 18.2% | 26% |
| `PD_TikToker_GoodNewsM` | `gb-en-prm-work_mgmt-desktop-ron_ins` | PAUSED | 3,654 | 11 | 32.6% | 25.0% | 23% |
| `PD_AIPodcast_Short_CRM` | `gb-en-prm-crm-desktop-lookalike-dg` | ENABLED | 3,518 | 90 | 24.0% | 13.3% | 45% |
| `PD_WomanPink_Face_CRM` | `gb-en-prm-crm-desktop-ron-dg` | PAUSED | 3,279 | 100 | 19.7% | 15.7% | 21% |
| `PD_Yuval_Headache_CRM` | `gb-en-prm-workos-crm-desktop-vertic` | PAUSED | 3,043 | 90 | 15.0% | 6.3% | 58% |

### 3.8 Top 30 Ads by DEP (Non-Brand)

| Ad Name | Campaign | Ad Group | Spend £ | DEP | DEP/Spend | P25% | P50% | P75% | P100% | Status |
|---------|----------|----------|---------|-----|-----------|------|------|------|-------|--------|
| `CR_MakesSense_Short` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 247,748 | 109,200 | 0.44 | 31.3 | 19.0 | 15.3 | 13.2 | ENABLED |
| `PD_ArtOfWork_Customize` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 157,212 | 67,700 | 0.43 | 18.7 | 12.7 | 10.1 | 8.2 | PAUSED |
| `CR_MakesSense_Short` | `gb-en-prm-work_mgmt-desktop-em` | `IndustryTechnology_EM-Mul` | 94,724 | 41,300 | 0.44 | 32.5 | 20.1 | 16.3 | 14.0 | REMOVED |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 55,067 | 18,600 | 0.34 | 30.7 | 16.1 | 13.1 | 11.4 | PAUSED |
| `CR_MakesSense_Short` | `gb-en-prm-work_mgmt-desktop-em` | `EmployerLarge_EM-MultiAds` | 50,644 | 17,100 | 0.34 | 36.4 | 22.8 | 18.8 | 16.2 | PAUSED |
| `PD_WorkOS_Long` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 52,200 | 16,100 | 0.31 | 13.9 | 9.7 | 8.2 | 7.2 | PAUSED |
| `CR_MakesSense_Long` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 28,616 | 14,200 | 0.50 | 28.3 | 20.1 | 16.9 | 14.6 | PAUSED |
| `PD_TikToker_HackW` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 26,664 | 7,300 | 0.27 | 29.4 | 19.0 | 15.7 | 13.5 | PAUSED |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-em` | `IndustryTechnology_EM-Mul` | 19,333 | 6,500 | 0.34 | 21.9 | 10.4 | 8.0 | 6.6 | REMOVED |
| `CR_MakesSense_Long` | `gb-en-prm-work_mgmt-desktop-em` | `IndustryTechnology_EM-Mul` | 15,649 | 5,500 | 0.35 | 25.3 | 17.3 | 14.2 | 12.1 | REMOVED |
| `PD_WorkOS_21sec` | `gb-en-prm-work_mgmt-desktop-em` | `EmployerLarge_EM-MultiAds` | 14,833 | 5,400 | 0.36 | 17.7 | 9.1 | 6.9 | 5.5 | PAUSED |
| `PD_Dialogue_Long` | `gb-en-prm-workos-work_mgmt-des` | `IndustryTechnology_EM-Mul` | 16,244 | 3,300 | 0.20 | 24.8 | 17.3 | 13.7 | 11.3 | PAUSED |
| `PD_Linear_Actress` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 6,876 | 3,000 | 0.44 | 33.2 | 24.5 | 20.5 | 18.0 | PAUSED |
| `PD_TikToker_HackM` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 4,372 | 2,800 | 0.64 | 22.1 | 14.0 | 11.5 | 9.7 | PAUSED |
| `PD_TikToker_GoodNewsW` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 7,397 | 2,600 | 0.35 | 31.9 | 21.9 | 18.3 | 15.9 | PAUSED |
| `PD_WorkOS_Long` | `gb-en-prm-workos-work_mgmt-des` | `IndustryTechnology_EM-Mul` | 9,066 | 2,300 | 0.25 | 19.7 | 13.3 | 10.8 | 9.2 | PAUSED |
| `PD_ArtOfWork_Flexibility` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 4,297 | 2,300 | 0.54 | 31.5 | 23.3 | 19.5 | 16.7 | PAUSED |
| `CR_MakesSense_Short` | `gb-en-prm-workos-work_mgmt-des` | `Mgmt_ProjectManagement_T-` | 35,771 | 1,970 | 0.06 | 27.3 | 13.9 | 10.4 | 8.0 | PAUSED |
| `PD_Reports_woman` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 4,247 | 1,900 | 0.45 | 19.0 | 12.4 | 10.2 | 8.6 | PAUSED |
| `CR_MakesSense_Long` | `gb-en-prm-work_mgmt-desktop-em` | `EmployerLarge_EM-MultiAds` | 3,424 | 1,900 | 0.55 | 26.7 | 18.2 | 15.0 | 12.7 | PAUSED |
| `PD_AIPodcast_Long_CRM` | `gb-en-prm-crm-desktop-ron-dg` | `ExcludingDefault_RON-Mult` | 60,971 | 1,660 | 0.03 | 24.3 | 16.1 | 12.6 | 10.4 | PAUSED |
| `PD_Dialogue_Long` | `gb-en-prm-workos-work_mgmt-des` | `EmployerLarge_EM-MultiAds` | 7,349 | 1,600 | 0.22 | 28.1 | 20.2 | 16.2 | 13.5 | PAUSED |
| `PD_Dialogue_Long` | `gb-en-prm-workos-work_mgmt-des` | `EmployerVeryLarge_EM-Mult` | 12,944 | 1,300 | 0.10 | 22.6 | 15.5 | 12.3 | 10.0 | PAUSED |
| `CR_MakesSense_All` | `gb-en-prm-work_mgmt-desktop-de` | `EntQE_DG-MultiAds` | 11,286 | 1,200 | 0.11 | 31.2 | 20.7 | 17.2 | 14.8 | PAUSED |
| `PD_3Reasons_Team_CRM` | `gb-en-prm-workos-crm-desktop-v` | `CompCRMBig_S-MultiAds` | 26,928 | 1,160 | 0.04 | 19.9 | 13.4 | 10.7 | 8.8 | ENABLED |
| `CR_MakesSense_All` | `gb-en-prm-work_mgmt-desktop-de` | `HardSU_DG-MultiAds` | 9,841 | 1,160 | 0.12 | 31.6 | 21.2 | 17.7 | 15.2 | PAUSED |
| `AT_NYwoman_Short` | `gb-en-prm-work_mgmt-desktop-ro` | `ExcludingDefault_RON-Mult` | 1,746 | 1,100 | 0.63 | 41.8 | 25.5 | 21.1 | 18.7 | PAUSED |
| `PD_Yuval_Formula_CRM` | `gb-en-prm-workos-crm-desktop-v` | `CompCRMBig_S-MultiAds` | 21,970 | 1,030 | 0.05 | 16.8 | 10.9 | 8.7 | 7.2 | ENABLED |
| `PD_WorkOS_All` | `gb-en-prm-work_mgmt-desktop-de` | `EntQE_DG-MultiAds` | 16,992 | 970 | 0.06 | 50.7 | 27.0 | 22.0 | 19.1 | PAUSED |
| `PD_ActuallyLikeIt_NoLogo_CRM` | `gb-en-prm-workos-crm-desktop-v` | `CompCRMBig_S-MultiAds` | 19,366 | 950 | 0.05 | 28.5 | 17.9 | 14.1 | 12.0 | ENABLED |

### 3.9 Worst 20 Ads by DEP/Spend (Non-Brand, min £5K spend)

| Ad Name | Campaign | Spend £ | DEP | DEP/Spend | P100% | Status |
|---------|----------|---------|-----|-----------|-------|--------|
| `AT_Reni_AI_V2` | `gb-en-prm-work_mgmt-desktop-demandg` | 5,177 | 7 | 0.00 | 12.4 | ENABLED |
| `PD_TikToker_GoodNewsM` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 5,642 | 8 | 0.00 | 24.5 | PAUSED |
| `PD_Zen_Long_Service` | `gb-en-prm-service-desktop-trgt-dg` | 14,697 | 24 | 0.00 | 10.4 | ENABLED |
| `PD_TikToker_HackW` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 5,366 | 9 | 0.00 | 41.0 | PAUSED |
| `PD_InShort_AI` | `gb-en-prm-work_mgmt-desktop-ron_ins` | 10,750 | 20 | 0.00 | 15.6 | PAUSED |
| `PD_Llama_Angry_Short` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 7,001 | 13 | 0.00 | 32.3 | PAUSED |
| `PD_Llama_Skeleton` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 16,109 | 30 | 0.00 | 13.8 | PAUSED |
| `CR_Confidence_Women_UK` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 22,279 | 42 | 0.00 | 22.2 | PAUSED |
| `CR_Confidence_Men_UK` | `gb-en-prm-work_mgmt-desktop-ron_ins` | 5,946 | 12 | 0.00 | 19.6 | PAUSED |
| `PD_AI_Eduardo` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 5,939 | 12 | 0.00 | 36.0 | PAUSED |
| `AT_Llama_short` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 10,078 | 20 | 0.00 | 29.7 | PAUSED |
| `CR_Confidence_Women_UK` | `gb-en-prm-work_mgmt-desktop-ron_ins` | 8,686 | 17 | 0.00 | 24.1 | PAUSED |
| `PD_Linear_Group` | `gb-en-prm-work_mgmt-desktop-ron_ins` | 7,895 | 16 | 0.00 | 20.3 | PAUSED |
| `PD_Linear_Group` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 12,750 | 26 | 0.00 | 16.7 | PAUSED |
| `DL_Llama_Long` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 16,602 | 34 | 0.00 | 16.5 | PAUSED |
| `PD_InShort_AI` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 35,119 | 71 | 0.00 | 14.3 | PAUSED |
| `AT_Reni_AI_V2` | `gb-en-prm-work_mgmt-desktop-demandg` | 7,966 | 17 | 0.00 | 12.1 | ENABLED |
| `PD_Llama_Skeleton_UK` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 19,591 | 43 | 0.00 | 13.6 | ENABLED |
| `DL_Llama_47s` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 10,179 | 23 | 0.00 | 39.4 | PAUSED |
| `DL_Llama_Angry_Long` | `gb-en-prm-work_mgmt-desktop-ron_reg` | 8,966 | 20 | 0.00 | 19.7 | PAUSED |

---

## 4. Meta — Full Campaign Audit

### 4.1 All Campaigns Overview (sorted by spend)

| # | Campaign | Objective | Spend £ | DEP | DEP/Spend | Purchases | Regs | Months | Brand? |
|---|----------|-----------|---------|-----|-----------|-----------|------|--------|--------|
| 1 | `gb-en-prm-workos-multi-cvr_asc-18-24` | OUTCOME_SALES | 2,792,822 | 9,002.99 | 0.0032 | 59,038 | 73,496 | 25 |  |
| 2 | `gb-en-prm-workos-multi-cvr_msc` | OUTCOME_SALES | 1,992,102 | 7,529.13 | 0.0038 | 33,987 | 43,577 | 25 |  |
| 3 | `gb-en-prm-workos-crm-cvr_crm_msc` | OUTCOME_SALES | 1,395,268 | 2,206.40 | 0.0016 | 12,588 | 17,333 | 24 |  |
| 4 | `gb-en-prm-workos-service-cvr_service_msc` | OUTCOME_SALES | 333,353 | 0.00 | 0.0000 | 3,064 | 3,826 | 6 |  |
| 5 | `gb-en-prm-workos-multi-cvr_lal_msc` | OUTCOME_SALES | 117,208 | 0.00 | 0.0000 | 1,802 | 2,090 | 4 |  |
| 6 | `gb-en-prm-work_mgmt-multi-abm_slg_mktg` | OUTCOME_SALES | 47,008 | 0.00 | 0.0000 | 2,847 | 2,957 | 5 |  |
| 7 | `gb-en-prm-workos-multi-cvr_msc_enterprise` | OUTCOME_SALES | 44,714 | 0.00 | 0.0000 | 912 | 1,080 | 4 |  |
| 8 | `gb-en-prm-workos-multi-cvr_msc-work` | OUTCOME_SALES | 42,716 | 0.56 | 0.0000 | 559 | 622 | 1 |  |
| 9 | `gb-en-service-service-cvr_service_asc` | OUTCOME_SALES | 20,211 | 59.33 | 0.0029 | 79 | 150 | 2 |  |
| 10 | `gb-en-service-workos-service-cvr_service_msc` | OUTCOME_SALES | 13,660 | 36.94 | 0.0027 | 39 | 60 | 1 |  |
| 11 | `gb2-en-prm-workos-multi-cvr_msc_enterprise` | OUTCOME_SALES | 5,638 | 0.00 | 0.0000 | 148 | 171 | 2 |  |
| 12 | `gb-en-prm-workos-multi-cvr_abm_retail_land_msc` | OUTCOME_SALES | 3,913 | 0.00 | 0.0000 | 632 | 768 | 4 |  |

> **⚠️ NOTE:** Meta DEP values (from `action_values` → `purchase`) are extremely small (likely normalized/fractional attribution values, not £ amounts). For Meta, we focus on **purchase count** and **cost per purchase** as more reliable efficiency metrics alongside DEP/Spend ratios for relative comparisons.

### 4.2 Non-Brand Campaign Efficiency Ranking

| Rank | Campaign | Spend £ | Purchases | Cost/Purchase | Regs | Cost/Reg | DEP | Imp | Freq |
|------|----------|---------|-----------|---------------|------|----------|-----|-----|------|
| 1 | `gb-en-prm-workos-multi-cvr_asc-18-24` | 2,792,822 | 59,038 | £47 | 73,496 | £38 | 9002.99 | 682,496,002 | 5.1 |
| 2 | `gb-en-prm-workos-multi-cvr_msc` | 1,992,102 | 33,987 | £59 | 43,577 | £46 | 7529.13 | 440,129,917 | 5.4 |
| 3 | `gb-en-prm-workos-crm-cvr_crm_msc` | 1,395,268 | 12,588 | £111 | 17,333 | £80 | 2206.40 | 166,757,328 | 3.7 |
| 4 | `gb-en-prm-workos-service-cvr_service_msc` | 333,353 | 3,064 | £109 | 3,826 | £87 | 0.00 | 33,785,144 | 5.2 |
| 5 | `gb-en-prm-workos-multi-cvr_lal_msc` | 117,208 | 1,802 | £65 | 2,090 | £56 | 0.00 | 19,728,981 | 4.3 |
| 6 | `gb-en-prm-work_mgmt-multi-abm_slg_mktg` | 47,008 | 2,847 | £17 | 2,957 | £16 | 0.00 | 6,335,061 | 4.3 |
| 7 | `gb-en-prm-workos-multi-cvr_msc_enterprise` | 44,714 | 912 | £49 | 1,080 | £41 | 0.00 | 5,046,973 | 3.3 |
| 8 | `gb-en-prm-workos-multi-cvr_msc-work` | 42,716 | 559 | £76 | 622 | £69 | 0.56 | 5,790,321 | 3.8 |
| 9 | `gb-en-service-service-cvr_service_asc` | 20,211 | 79 | £256 | 150 | £135 | 59.33 | 1,572,153 | 2.8 |
| 10 | `gb-en-service-workos-service-cvr_service_msc` | 13,660 | 39 | £350 | 60 | £228 | 36.94 | 1,427,159 | 2.4 |
| 11 | `gb2-en-prm-workos-multi-cvr_msc_enterprise` | 5,638 | 148 | £38 | 171 | £33 | 0.00 | 2,090,982 | 2.3 |
| 12 | `gb-en-prm-workos-multi-cvr_abm_retail_land_msc` | 3,913 | 632 | £6 | 768 | £5 | 0.00 | 580,882 | 2.8 |

### 4.3 Individual Campaign Audits (Meta)

#### Campaign: `gb-en-prm-workos-multi-cvr_asc-18-24` [ASC/Advantage+]

- **Objective:** OUTCOME_SALES | **Spend:** £2,792,822 | **DEP:** 9002.99
- **Impressions:** 682,496,002 | **Reach:** 133,423,922 | **Frequency:** 5.1
- **Purchases:** 59,038 | **Cost/Purchase:** £47
- **Registrations:** 73,496 | **Cost/Reg:** £38
- **Active Months:** 25

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2024-05 | 204,567 | 4.69 | 3,953 | £52 | 45,698,269 |
| 2024-06 | 96,790 | 3.66 | 2,193 | £44 | 22,115,323 |
| 2024-07 | 153,781 | 3.40 | 4,127 | £37 | 43,290,002 |
| 2024-08 | 164,204 | 0.00 | 3,588 | £46 | 49,197,262 |
| 2024-09 | 172,022 | 0.00 | 4,348 | £40 | 69,326,799 |
| 2024-10 | 155,374 | 0.00 | 3,720 | £42 | 34,185,837 |
| 2024-11 | 127,548 | 0.00 | 2,515 | £51 | 20,317,648 |
| 2024-12 | 140,662 | 0.00 | 1,391 | £101 | 22,132,156 |
| 2025-01 | 208,789 | 0.00 | 4,376 | £48 | 45,802,056 |
| 2025-02 | 115,938 | 0.00 | 2,558 | £45 | 23,994,213 |
| 2025-03 | 142,316 | 0.00 | 2,993 | £48 | 30,397,960 |
| 2025-04 | 77,225 | 0.00 | 1,830 | £42 | 18,585,695 |
| 2025-05 | 84,486 | 0.00 | 2,105 | £40 | 23,207,849 |
| 2025-06 | 77,945 | 0.00 | 1,598 | £49 | 21,100,865 |
| 2025-07 | 76,606 | 0.00 | 1,427 | £54 | 23,212,058 |
| 2025-08 | 53,958 | 0.00 | 1,269 | £43 | 18,543,105 |
| 2025-09 | 62,267 | 0.00 | 1,756 | £35 | 14,983,448 |
| 2025-10 | 42,324 | 0.00 | 1,249 | £34 | 12,593,330 |
| 2025-11 | 35,754 | 0.00 | 916 | £39 | 8,665,170 |
| 2025-12 | 38,247 | 0.00 | 1,343 | £28 | 10,287,371 |
| 2026-01 | 108,753 | 2031.80 | 2,316 | £47 | 25,326,189 |
| 2026-02 | 98,180 | 1909.25 | 2,044 | £48 | 19,970,122 |
| 2026-03 | 94,745 | 1881.16 | 1,984 | £48 | 19,412,600 |
| 2026-04 | 140,962 | 1788.38 | 1,943 | £73 | 31,153,633 |
| 2026-05 | 119,378 | 1380.65 | 1,496 | £80 | 28,997,042 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gbasc2_workos_work-mgmt_static_dese` | `gb-en-prm-workos-multi-cv` | 616,623 | 0.92 | 13,130 | 15,910 | 156,798,454 | 691 | 306 | 191 | 131 | 19% | 3.3 | - | - | - |
| `gbasc2_workos_work-mgmt_static_spre` | `gb-en-prm-workos-multi-cv` | 211,766 | 23.20 | 4,071 | 4,876 | 46,191,145 | 268 | 97 | 52 | 36 | 13% | 1.9 | - | - | - |
| `gbasc2_workos_work-mgmt_video_artof` | `gb-en-prm-workos-multi-cv` | 171,568 | 99.07 | 3,834 | 4,656 | 40,779,300 | 260,279 | 113,813 | 66,073 | 38,528 | 15% | 1.9 | - | - | - |
| `gbasc2_workos_work-mgmt_static_dese` | `gb-en-prm-workos-multi-cv` | 148,948 | 0.16 | 2,966 | 3,577 | 36,996,089 | 105 | 47 | 24 | 16 | 15% | 2.1 | - | - | - |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | 77,681 | 44.10 | 1,974 | 2,330 | 21,062,991 | 369,200 | 188,911 | 122,000 | 71,436 | 19% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_static_stre` | `gb-en-prm-workos-multi-cv` | 70,534 | 234.13 | 1,827 | 2,246 | 20,349,876 | 434 | 190 | 129 | 96 | 22% | 2.1 | - | - | - |
| `gbasc2_workos_work-mgmt_static_simp` | `gb-en-prm-workos-multi-cv` | 59,180 | 117.00 | 1,371 | 1,713 | 14,758,202 | 150 | 63 | 37 | 29 | 19% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_static_work` | `gb-en-prm-workos-multi-cv` | 49,044 | 308.00 | 1,359 | 1,707 | 13,434,656 | 199 | 81 | 51 | 30 | 15% | 1.8 | - | - | - |
| `gbasc2_workos_work-mgmt_video_hi-go` | `gb-en-prm-workos-multi-cv` | 46,283 | 0.12 | 1,245 | 1,467 | 12,829,823 | 254,953 | 153,016 | 103,102 | 52,193 | 20% | 1.8 | - | - | - |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 35,522 | 47.00 | 884 | 1,151 | 10,616,764 | 380 | 167 | 99 | 79 | 21% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 29,310 | 267.73 | 684 | 950 | 7,689,330 | 3 | 3 | 3 | 1 | 33% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 27,495 | 116.00 | 651 | 778 | 6,580,744 | 2 | 1 | 1 | 1 | 50% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_llama_j` | `gb-en-prm-workos-multi-cv` | 26,832 | 17.00 | 487 | 575 | 5,638,921 | 112,056 | 45,680 | 28,786 | 14,683 | 13% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 26,707 | 17.00 | 719 | 840 | 8,218,269 | 152 | 54 | 33 | 19 | 12% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 24,110 | 14.00 | 555 | 635 | 7,088,242 | 4 | 3 | 2 | 0 | 0% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_ut_mcdonald` | `gb-en-prm-workos-multi-cv` | 23,648 | 0.00 | 429 | 489 | 5,236,742 | 65,324 | 21,522 | 13,840 | 9,138 | 14% | 2.4 | - | - | - |
| `gbasc2_workos_work-mgmt_static_chao` | `gb-en-prm-workos-multi-cv` | 22,313 | 70.00 | 647 | 756 | 6,961,460 | 178 | 84 | 54 | 38 | 21% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 22,304 | 26.00 | 524 | 598 | 6,244,271 | 114 | 52 | 33 | 25 | 22% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | 21,800 | 26.00 | 431 | 548 | 3,694,679 | 76,494 | 34,274 | 22,846 | 10,781 | 14% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_pd_llama_sk` | `gb-en-prm-workos-multi-cv` | 21,611 | 36.00 | 411 | 540 | 4,510,229 | 17,840 | 7,704 | 4,754 | 3,092 | 17% | 1.5 | - | - | - |
| `gbasc2_workos_crm_static_cube-befor` | `gb-en-prm-workos-multi-cv` | 19,988 | 0.83 | 462 | 478 | 4,424,321 | 1 | 0 | 0 | 0 | 0% | 1.8 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 19,651 | 273.00 | 290 | 474 | 3,100,569 | 217,180 | 119,421 | 53,331 | 30,491 | 14% | 2.0 | - | - | - |
| `gbasc2_workos_work-mgmt_video_logo-` | `gb-en-prm-workos-multi-cv` | 18,598 | 0.56 | 545 | 559 | 5,929,055 | 117,613 | 55,569 | 39,552 | 24,926 | 21% | 1.9 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 18,048 | 37.00 | 390 | 495 | 5,124,496 | 7 | 3 | 2 | 2 | 29% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_llama_m` | `gb-en-prm-workos-multi-cv` | 17,924 | 48.00 | 351 | 409 | 3,505,892 | 43,844 | 21,606 | 14,261 | 6,472 | 15% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 16,207 | 40.00 | 466 | 560 | 5,826,114 | 53 | 26 | 17 | 9 | 17% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ut_speaker2` | `gb-en-prm-workos-multi-cv` | 15,795 | 8.00 | 270 | 325 | 2,560,731 | 49,863 | 23,420 | 15,790 | 6,500 | 13% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_llama_g` | `gb-en-prm-workos-multi-cv` | 14,700 | 15.00 | 308 | 360 | 3,366,131 | 35,596 | 19,627 | 12,830 | 5,166 | 15% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_gif_llama_a` | `gb-en-prm-workos-multi-cv` | 14,391 | 114.13 | 283 | 416 | 2,333,873 | 148,416 | 68,585 | 42,362 | 31,468 | 21% | 1.4 | - | - | - |
| `gbasc2_workos_crm_video_loop-view-t` | `gb-en-prm-workos-multi-cv` | 14,229 | 0.58 | 395 | 406 | 3,271,245 | 56,866 | 25,683 | 15,133 | 11,564 | 20% | 2.1 | - | - | - |
| `gbasc2_workos_work-mgmt_pd_linear_e` | `gb-en-prm-workos-multi-cv` | 13,144 | 0.02 | 306 | 390 | 4,617,670 | 25,644 | 11,033 | 5,963 | 4,157 | 16% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 12,031 | 91.00 | 235 | 317 | 2,296,195 | 34,200 | 11,894 | 7,018 | 4,686 | 14% | 1.6 | - | - | - |
| `gbasc2_workos_crm_video_iris_en` | `gb-en-prm-workos-multi-cv` | 11,654 | 0.39 | 294 | 320 | 2,834,914 | 49,993 | 39,954 | 13,691 | 8,967 | 18% | 1.9 | - | - | - |
| `gbasc2_workos_work-mgmt_video_leeta` | `gb-en-prm-workos-multi-cv` | 11,572 | 0.27 | 265 | 292 | 3,369,924 | 37,662 | 17,303 | 11,356 | 5,743 | 15% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 11,478 | 32.00 | 282 | 327 | 2,142,167 | 49,866 | 19,177 | 12,394 | 4,594 | 9% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_ugc_bam` | `gb-en-prm-workos-multi-cv` | 9,651 | 74.00 | 232 | 258 | 2,067,008 | 50,743 | 25,130 | 15,414 | 7,694 | 15% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 9,209 | 24.00 | 249 | 304 | 2,308,325 | 26,130 | 9,581 | 5,918 | 3,059 | 12% | 1.5 | - | - | - |
| `gbasc2_workos_crm_static_500-prospe` | `gb-en-prm-workos-multi-cv` | 7,934 | 0.47 | 225 | 245 | 2,016,861 | 2 | 1 | 0 | 0 | 0% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 7,877 | 54.00 | 174 | 180 | 1,274,369 | 63,808 | 38,579 | 22,857 | 13,298 | 21% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_gif_llama_a` | `gb-en-prm-workos-multi-cv` | 6,878 | 16.00 | 137 | 173 | 1,784,047 | 51,687 | 25,066 | 17,654 | 14,522 | 28% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 6,731 | 45.00 | 184 | 257 | 2,271,789 | 0 | 0 | 0 | 0 | 0% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 6,701 | 56.00 | 201 | 295 | 2,404,944 | 4 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 6,410 | 105.00 | 111 | 187 | 1,616,695 | 40,560 | 20,171 | 12,672 | 7,830 | 19% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_llama_v` | `gb-en-prm-workos-multi-cv` | 6,338 | 62.00 | 157 | 165 | 1,372,752 | 23,492 | 10,420 | 8,018 | 3,734 | 16% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_ugc_bam` | `gb-en-prm-workos-multi-cv` | 6,144 | 30.00 | 174 | 201 | 1,411,214 | 15,339 | 7,645 | 4,845 | 2,143 | 14% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 6,106 | 77.00 | 85 | 132 | 689,547 | 23,295 | 15,647 | 4,783 | 3,290 | 14% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 5,897 | 12.00 | 114 | 147 | 1,566,258 | 22,425 | 20,924 | 5,311 | 3,334 | 15% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_llama_v` | `gb-en-prm-workos-multi-cv` | 5,627 | 20.00 | 120 | 177 | 1,463,941 | 18,724 | 9,256 | 6,508 | 3,089 | 16% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 5,625 | 68.00 | 74 | 157 | 929,142 | 18,240 | 7,372 | 4,310 | 3,054 | 17% | 1.7 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 5,285 | 11.00 | 161 | 191 | 1,763,696 | 3 | 2 | 1 | 0 | 0% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 5,015 | 22.00 | 147 | 182 | 1,932,925 | 2 | 0 | 0 | 0 | 0% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 4,683 | 68.00 | 87 | 149 | 998,433 | 47,350 | 59,116 | 17,804 | 10,640 | 22% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_pd_llama_sh` | `gb-en-prm-workos-multi-cv` | 4,673 | 11.00 | 103 | 135 | 1,321,689 | 18,641 | 10,672 | 7,926 | 3,074 | 16% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 4,515 | 66.00 | 72 | 113 | 770,977 | 48,241 | 20,680 | 9,661 | 5,975 | 12% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 4,302 | 32.00 | 103 | 124 | 814,788 | 30,314 | 18,164 | 10,676 | 6,304 | 21% | 1.4 | - | - | - |
| `gbasc2_workos_crm_static_sell-more_` | `gb-en-prm-workos-multi-cv` | 4,201 | 0.17 | 97 | 120 | 1,083,041 | 1 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 4,128 | 18.00 | 106 | 118 | 1,148,603 | 11,591 | 5,734 | 2,858 | 1,967 | 17% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 3,960 | 71.00 | 74 | 101 | 947,864 | 56,093 | 69,549 | 21,368 | 15,574 | 28% | 1.6 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 3,794 | 51.00 | 57 | 103 | 538,820 | 9,516 | 4,206 | 2,492 | 1,444 | 15% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 3,641 | 0.00 | 96 | 122 | 1,152,536 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gbasc2_workos_work-mgmt_static_aipr` | `gb-en-prm-workos-multi-cv` | 3,602 | 16.00 | 120 | 150 | 897,107 | 98 | 41 | 23 | 15 | 15% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 3,445 | 22.00 | 49 | 67 | 693,098 | 20,918 | 10,496 | 7,947 | 3,642 | 17% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 3,159 | 58.00 | 70 | 101 | 702,366 | 26,579 | 18,289 | 7,976 | 4,900 | 18% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_static_aius` | `gb-en-prm-workos-multi-cv` | 3,080 | 18.00 | 163 | 185 | 997,490 | 69 | 30 | 17 | 14 | 20% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_static_aiea` | `gb-en-prm-workos-multi-cv` | 3,006 | 11.00 | 70 | 115 | 831,011 | 115 | 42 | 21 | 15 | 13% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 2,686 | 48.00 | 50 | 70 | 441,752 | 6,675 | 2,509 | 1,587 | 1,146 | 17% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 2,677 | 55.00 | 58 | 89 | 732,195 | 12,098 | 4,707 | 3,357 | 1,390 | 11% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 2,601 | 55.00 | 62 | 92 | 620,987 | 12,617 | 25,068 | 3,094 | 2,252 | 18% | 1.2 | - | - | - |
| `gbasc2_workos_work-mgmt_static_aibf` | `gb-en-prm-workos-multi-cv` | 2,528 | 27.00 | 87 | 105 | 662,022 | 21 | 12 | 6 | 4 | 19% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_static_aius` | `gb-en-prm-workos-multi-cv` | 2,410 | 19.00 | 76 | 98 | 671,540 | 54 | 16 | 9 | 7 | 13% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 2,267 | 39.00 | 49 | 81 | 417,634 | 10,413 | 18,066 | 2,671 | 1,724 | 17% | 1.4 | - | - | - |
| `gbasc2_workos_work-mgmt_static_ailo` | `gb-en-prm-workos-multi-cv` | 2,001 | 10.00 | 57 | 73 | 748,634 | 27 | 9 | 6 | 5 | 19% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_benchik` | `gb-en-prm-workos-multi-cv` | 1,631 | 10.00 | 53 | 53 | 432,120 | 16,077 | 10,410 | 5,361 | 2,767 | 17% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 1,592 | 33.00 | 35 | 59 | 430,508 | 63,347 | 36,964 | 29,590 | 25,952 | 41% | 1.5 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 1,356 | 23.00 | 25 | 31 | 229,438 | 3,990 | 2,050 | 1,374 | 875 | 22% | 1.5 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_ugc_ben` | `gb-en-prm-workos-multi-cv` | 1,182 | 19.00 | 19 | 30 | 235,912 | 6,856 | 4,058 | 2,858 | 1,522 | 22% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 1,031 | 19.00 | 20 | 37 | 286,477 | 10,761 | 6,859 | 5,393 | 3,322 | 31% | 1.3 | - | - | - |
| `gbasc2_workos_work-mgmt_ugc_benchik` | `gb-en-prm-workos-multi-cv` | 1,018 | 9.00 | 19 | 24 | 276,205 | 12,144 | 15,395 | 5,301 | 2,540 | 21% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 842 | 26.00 | 28 | 31 | 267,624 | 29,747 | 17,069 | 13,478 | 11,791 | 40% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 824 | 14.00 | 17 | 23 | 136,244 | 3,400 | 4,393 | 737 | 536 | 16% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 758 | 8.00 | 9 | 10 | 167,832 | 8,350 | 7,324 | 3,733 | 2,836 | 34% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 647 | 8.00 | 8 | 20 | 142,186 | 20,429 | 16,973 | 15,715 | 15,205 | 74% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 610 | 6.00 | 16 | 15 | 123,835 | 3,357 | 2,447 | 764 | 510 | 15% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 563 | 6.00 | 7 | 17 | 140,417 | 10,757 | 8,233 | 5,040 | 4,094 | 38% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 434 | 1.00 | 1 | 13 | 70,228 | 13,668 | 8,585 | 5,844 | 2,017 | 15% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 428 | 6.00 | 10 | 18 | 116,379 | 2,219 | 2,068 | 518 | 340 | 15% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 374 | 8.00 | 8 | 13 | 55,254 | 405 | 162 | 114 | 82 | 20% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 261 | 1.00 | 1 | 5 | 43,729 | 6,182 | 3,792 | 2,452 | 810 | 13% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 175 | 2.00 | 2 | 3 | 46,813 | 2,132 | 1,838 | 706 | 463 | 22% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 161 | 4.00 | 4 | 8 | 36,238 | 2,736 | 2,074 | 1,904 | 1,799 | 66% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 116 | 5.00 | 5 | 6 | 34,856 | 228 | 98 | 72 | 33 | 14% | 1.1 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 18 | 0.00 | 0 | 0 | 3,332 | 35 | 13 | 9 | 6 | 17% | 1.1 | - | - | - |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 10 | 1.00 | 1 | 1 | 1,996 | 17 | 4 | 4 | 4 | 24% | 1.0 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 475,638 | 2.49 | 7,092 | 70,143,464 | 280,333 | 0.40% |
| instagram/instagram_stories | 388,258 | 4.11 | 10,245 | 111,614,690 | 177,718 | 0.16% |
| instagram/feed | 177,906 | 1.88 | 4,426 | 40,836,113 | 45,770 | 0.11% |
| instagram/instagram_reels | 115,119 | 0.88 | 3,081 | 35,794,635 | 56,664 | 0.16% |
| messenger/messenger_inbox | 59,773 | 0.19 | 2,190 | 51,618,629 | 4,912 | 0.01% |
| facebook/facebook_reels | 56,810 | 0.42 | 1,080 | 14,364,987 | 50,466 | 0.35% |
| instagram/instagram_explore | 30,150 | 0.53 | 919 | 11,593,360 | 8,290 | 0.07% |
| instagram/instagram_explore_grid_home | 25,577 | 0.48 | 857 | 13,435,796 | 355 | 0.00% |
| facebook/marketplace | 23,202 | 0.23 | 596 | 8,738,100 | 9,432 | 0.11% |
| facebook/instream_video | 20,371 | 0.16 | 515 | 5,375,426 | 27,832 | 0.52% |
| facebook/facebook_reels_overlay | 16,528 | 0.14 | 605 | 8,187,901 | 52,292 | 0.64% |
| facebook/right_hand_column | 12,270 | 0.03 | 434 | 6,469,314 | 3,807 | 0.06% |
| facebook/facebook_stories | 11,058 | 0.04 | 205 | 1,960,278 | 7,924 | 0.40% |
| facebook/video_feeds | 8,774 | 0.12 | 192 | 2,447,611 | 9,436 | 0.39% |
| audience_network/an_classic | 4,008 | 0.00 | 30 | 1,078,982 | 6,793 | 0.63% |
| instagram/instagram_profile_feed | 2,913 | 0.05 | 96 | 1,236,217 | 679 | 0.05% |
| audience_network/rewarded_video | 702 | 0.00 | 10 | 106,358 | 3,944 | 3.71% |
| facebook/search | 385 | 0.00 | 5 | 125,787 | 297 | 0.24% |
| instagram/instagram_search | 98 | 0.00 | 3 | 47,124 | 43 | 0.09% |
| instagram/instagram_profile_reels | 9 | 0.00 | 1 | 3,526 | 5 | 0.14% |
| messenger/messenger_stories | 1 | 0.00 | 0 | 154 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 17 | 13 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 2,423,500 | 7950.39 | 634,740,054 |
| desktop | 350,280 | 926.33 | 44,479,025 |
| mobile_web | 19,042 | 125.36 | 3,276,873 |
| unknown | 0 | 0.93 | 50 |

---

#### Campaign: `gb-en-prm-workos-multi-cvr_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £1,992,102 | **DEP:** 7529.13
- **Impressions:** 440,129,917 | **Reach:** 80,861,707 | **Frequency:** 5.4
- **Purchases:** 33,987 | **Cost/Purchase:** £59
- **Registrations:** 43,577 | **Cost/Reg:** £46
- **Active Months:** 25

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2024-05 | 63,607 | 1.11 | 910 | £70 | 10,243,512 |
| 2024-06 | 43,339 | 1.23 | 737 | £59 | 6,437,304 |
| 2024-07 | 66,199 | 1.06 | 1,387 | £48 | 12,449,887 |
| 2024-08 | 69,777 | 0.00 | 1,305 | £53 | 15,311,579 |
| 2024-09 | 72,487 | 0.00 | 1,224 | £59 | 14,232,985 |
| 2024-10 | 65,656 | 0.00 | 1,154 | £57 | 12,347,053 |
| 2024-11 | 53,105 | 0.00 | 981 | £54 | 9,154,837 |
| 2024-12 | 55,065 | 0.00 | 556 | £99 | 10,009,494 |
| 2025-01 | 99,729 | 0.00 | 1,888 | £53 | 22,529,102 |
| 2025-02 | 139,372 | 0.00 | 2,376 | £59 | 31,085,732 |
| 2025-03 | 134,817 | 0.00 | 1,990 | £68 | 23,142,670 |
| 2025-04 | 43,235 | 0.00 | 715 | £60 | 8,652,495 |
| 2025-05 | 42,189 | 0.00 | 725 | £58 | 9,177,118 |
| 2025-06 | 71,403 | 0.00 | 1,209 | £59 | 14,418,211 |
| 2025-07 | 86,510 | 0.00 | 1,335 | £65 | 19,456,826 |
| 2025-08 | 67,082 | 0.00 | 1,316 | £51 | 17,622,081 |
| 2025-09 | 76,662 | 0.00 | 2,549 | £30 | 16,195,937 |
| 2025-10 | 51,817 | 0.00 | 1,139 | £45 | 11,813,975 |
| 2025-11 | 39,545 | 0.00 | 807 | £49 | 8,374,311 |
| 2025-12 | 42,620 | 0.00 | 1,461 | £29 | 11,852,292 |
| 2026-01 | 122,499 | 1749.82 | 1,996 | £61 | 32,577,080 |
| 2026-02 | 118,581 | 1856.88 | 1,978 | £60 | 35,949,366 |
| 2026-03 | 92,658 | 1251.29 | 1,329 | £70 | 24,192,630 |
| 2026-04 | 129,666 | 1335.49 | 1,458 | £89 | 33,712,031 |
| 2026-05 | 144,479 | 1332.25 | 1,462 | £99 | 29,191,409 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc_workos_work-mgmt_ugc_ugc_bam` | `gb-en-prm-workos-multi-cv` | 37,078 | 335.73 | 709 | 886 | 8,577,514 | 173,781 | 76,495 | 46,141 | 21,431 | 12% | 1.8 | - | - | - |
| `gb-msc_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 29,245 | 232.00 | 665 | 878 | 9,451,298 | 15 | 4 | 2 | 1 | 7% | 1.8 | - | - | - |
| `gb-msc_workos_work-mgmt_gif_llama_a` | `gb-en-prm-workos-multi-cv` | 26,741 | 115.00 | 375 | 664 | 3,532,671 | 295,237 | 142,610 | 86,745 | 64,900 | 22% | 1.5 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 19,789 | 200.00 | 221 | 386 | 3,798,893 | 246,710 | 100,414 | 47,103 | 28,425 | 12% | 1.9 | - | - | - |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 16,794 | 119.00 | 289 | 392 | 3,368,177 | 59,414 | 19,288 | 11,202 | 5,675 | 10% | 1.6 | - | - | - |
| `gb-msc_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 16,103 | 71.00 | 321 | 402 | 4,462,231 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 14,442 | 96.00 | 284 | 312 | 2,534,143 | 70,359 | 33,587 | 20,104 | 11,962 | 17% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 11,841 | 65.00 | 221 | 252 | 1,915,097 | 128,536 | 82,706 | 50,011 | 26,033 | 20% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 11,777 | 45.00 | 327 | 379 | 2,580,412 | 35,268 | 12,831 | 7,861 | 4,133 | 12% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_static_ailo` | `gb-en-prm-workos-multi-cv` | 10,406 | 167.00 | 264 | 325 | 3,849,176 | 59 | 26 | 17 | 13 | 22% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | 9,775 | 103.00 | 238 | 304 | 3,356,302 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc_workos_work-mgmt_static_aibf` | `gb-en-prm-workos-multi-cv` | 7,109 | 92.00 | 243 | 304 | 2,699,281 | 56 | 17 | 12 | 8 | 14% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_static_aius` | `gb-en-prm-workos-multi-cv` | 6,633 | 31.00 | 228 | 231 | 1,436,244 | 8 | 5 | 1 | 1 | 12% | 1.6 | - | - | - |
| `gb-msc_workos_work-mgmt_static_aipr` | `gb-en-prm-workos-multi-cv` | 6,021 | 81.00 | 137 | 200 | 2,018,393 | 10 | 2 | 2 | 2 | 20% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 5,976 | 37.00 | 164 | 188 | 1,696,926 | 20,046 | 7,346 | 5,081 | 2,948 | 15% | 1.4 | - | - | - |
| `gb-msc_workos_work-mgmt_static_aiea` | `gb-en-prm-workos-multi-cv` | 5,507 | 58.00 | 124 | 140 | 1,941,462 | 35 | 14 | 8 | 4 | 11% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 5,241 | 40.00 | 40 | 88 | 812,469 | 16,935 | 5,797 | 3,215 | 1,902 | 11% | 1.5 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_sh_w` | `gb-en-prm-workos-multi-cv` | 4,087 | 84.00 | 87 | 132 | 1,951,558 | 143,401 | 87,437 | 71,396 | 62,936 | 44% | 1.5 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 3,842 | 51.00 | 53 | 101 | 1,222,174 | 17,796 | 5,700 | 3,433 | 2,206 | 12% | 1.6 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 2,820 | 41.00 | 44 | 73 | 459,155 | 12,024 | 8,464 | 2,721 | 1,793 | 15% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 2,709 | 47.00 | 52 | 71 | 897,188 | 9,226 | 3,352 | 2,327 | 1,103 | 12% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_sh_w` | `gb-en-prm-workos-multi-cv` | 2,113 | 35.00 | 37 | 56 | 583,703 | 31,219 | 22,767 | 20,050 | 18,682 | 60% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_sh_w` | `gb-en-prm-workos-multi-cv` | 2,062 | 41.00 | 42 | 57 | 748,270 | 16,448 | 10,518 | 8,109 | 2,538 | 15% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 1,861 | 25.00 | 26 | 43 | 360,860 | 6,967 | 2,704 | 1,645 | 942 | 14% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_sh_w` | `gb-en-prm-workos-multi-cv` | 1,766 | 42.00 | 44 | 68 | 654,662 | 73,210 | 43,721 | 34,795 | 30,486 | 42% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 1,658 | 31.00 | 34 | 45 | 448,099 | 3,569 | 1,125 | 713 | 519 | 15% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 1,396 | 18.00 | 19 | 28 | 290,148 | 5,753 | 7,682 | 1,247 | 899 | 16% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_sh_w` | `gb-en-prm-workos-multi-cv` | 977 | 20.00 | 21 | 38 | 455,297 | 7,633 | 5,091 | 4,345 | 3,722 | 49% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 648 | 5.00 | 6 | 14 | 207,933 | 2,744 | 817 | 522 | 292 | 11% | 1.1 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 632 | 12.00 | 12 | 21 | 222,243 | 4,309 | 2,277 | 1,524 | 606 | 14% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 556 | 11.00 | 11 | 13 | 193,652 | 4,613 | 3,890 | 1,332 | 885 | 19% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_pd_b` | `gb-en-prm-workos-multi-cv` | 471 | 10.00 | 10 | 11 | 115,070 | 445 | 188 | 115 | 89 | 20% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_pd_b` | `gb-en-prm-workos-multi-cv` | 291 | 3.00 | 3 | 3 | 125,089 | 522 | 125 | 78 | 61 | 12% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 198 | 0.00 | 0 | 1 | 42,301 | 630 | 217 | 124 | 92 | 15% | 1.1 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 197 | 0.00 | 0 | 1 | 48,654 | 1,921 | 1,092 | 707 | 259 | 13% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 21 | 0.00 | 0 | 2 | 6,570 | 94 | 18 | 11 | 9 | 10% | 1.2 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 351,203 | 1.16 | 4,798 | 50,490,019 | 211,872 | 0.42% |
| instagram/instagram_stories | 129,843 | 0.53 | 2,608 | 24,024,100 | 43,744 | 0.18% |
| instagram/feed | 102,092 | 0.52 | 2,313 | 16,599,081 | 17,743 | 0.11% |
| facebook/facebook_reels | 60,815 | 0.25 | 915 | 14,251,537 | 34,097 | 0.24% |
| instagram/instagram_reels | 50,771 | 0.16 | 1,076 | 11,529,948 | 16,936 | 0.15% |
| facebook/marketplace | 27,661 | 0.15 | 572 | 8,968,901 | 9,333 | 0.10% |
| facebook/instream_video | 22,344 | 0.16 | 497 | 5,245,986 | 24,870 | 0.47% |
| facebook/facebook_reels_overlay | 19,272 | 0.06 | 881 | 11,085,581 | 28,197 | 0.25% |
| instagram/instagram_explore_grid_home | 10,179 | 0.15 | 341 | 3,905,073 | 81 | 0.00% |
| instagram/instagram_explore | 9,449 | 0.09 | 247 | 2,656,707 | 1,782 | 0.07% |
| messenger/messenger_inbox | 8,792 | 0.02 | 417 | 8,969,354 | 926 | 0.01% |
| facebook/facebook_stories | 7,456 | 0.07 | 103 | 832,233 | 4,486 | 0.54% |
| facebook/video_feeds | 4,811 | 0.06 | 89 | 1,115,812 | 3,152 | 0.28% |
| facebook/right_hand_column | 1,511 | 0.00 | 130 | 1,309,523 | 527 | 0.04% |
| instagram/instagram_profile_feed | 1,442 | 0.01 | 41 | 354,524 | 181 | 0.05% |
| audience_network/an_classic | 1,137 | 0.01 | 25 | 327,330 | 5,314 | 1.62% |
| audience_network/rewarded_video | 707 | 0.00 | 16 | 55,053 | 6,895 | 12.52% |
| facebook/search | 89 | 0.00 | 1 | 27,849 | 43 | 0.15% |
| instagram/instagram_search | 15 | 0.00 | 0 | 5,655 | 9 | 0.16% |
| instagram/instagram_profile_reels | 4 | 0.00 | 0 | 1,477 | 1 | 0.07% |
| messenger/messenger_stories | 1 | 0.00 | 0 | 88 | 1 | 1.14% |
| unknown/unknown | 0 | 0.00 | 4 | 3 | 1 | 33.33% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 1,774,005 | 6430.02 | 399,667,737 |
| desktop | 190,515 | 968.11 | 35,288,950 |
| mobile_web | 27,582 | 131.00 | 5,173,194 |
| unknown | 0 | 0.00 | 36 |

---

#### Campaign: `gb-en-prm-workos-crm-cvr_crm_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £1,395,268 | **DEP:** 2206.40
- **Impressions:** 166,757,328 | **Reach:** 44,847,952 | **Frequency:** 3.7
- **Purchases:** 12,588 | **Cost/Purchase:** £111
- **Registrations:** 17,333 | **Cost/Reg:** £80
- **Active Months:** 24

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2024-06 | 5,519 | 0.07 | 57 | £97 | 613,616 |
| 2024-07 | 39,919 | 0.31 | 422 | £95 | 4,122,478 |
| 2024-08 | 41,795 | 0.00 | 331 | £126 | 4,566,792 |
| 2024-09 | 43,087 | 0.00 | 403 | £107 | 4,896,319 |
| 2024-10 | 39,668 | 0.00 | 548 | £72 | 6,494,991 |
| 2024-11 | 32,309 | 0.00 | 413 | £78 | 5,561,565 |
| 2024-12 | 35,033 | 0.00 | 204 | £172 | 5,230,914 |
| 2025-01 | 56,558 | 0.00 | 872 | £65 | 9,931,136 |
| 2025-02 | 57,553 | 0.00 | 762 | £76 | 8,548,732 |
| 2025-03 | 90,590 | 0.00 | 618 | £147 | 7,802,186 |
| 2025-04 | 78,326 | 0.00 | 474 | £165 | 6,217,372 |
| 2025-05 | 80,644 | 0.00 | 509 | £158 | 6,975,137 |
| 2025-06 | 40,703 | 0.00 | 340 | £120 | 4,460,065 |
| 2025-07 | 90,273 | 0.00 | 730 | £124 | 16,922,931 |
| 2025-08 | 81,592 | 0.00 | 937 | £87 | 13,150,762 |
| 2025-09 | 83,228 | 0.00 | 1,138 | £73 | 10,374,663 |
| 2025-10 | 88,955 | 0.00 | 751 | £118 | 9,639,005 |
| 2025-11 | 28,460 | 0.00 | 291 | £98 | 3,064,352 |
| 2025-12 | 15,709 | 0.00 | 258 | £61 | 1,938,486 |
| 2026-01 | 95,875 | 562.68 | 699 | £137 | 9,037,375 |
| 2026-02 | 85,391 | 581.98 | 640 | £133 | 7,752,659 |
| 2026-03 | 79,418 | 453.51 | 510 | £156 | 6,874,962 |
| 2026-04 | 67,896 | 397.89 | 458 | £148 | 9,069,386 |
| 2026-05 | 36,764 | 209.96 | 223 | £165 | 3,511,444 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-crm_workos_crm_motion_sfblac` | `gb-en-prm-workos-crm-cvr_` | 93,594 | 244.47 | 1,186 | 1,378 | 10,376,947 | 1 | 1 | 1 | 0 | 0% | 2.6 | - | - | - |
| `gb-msc-crm_workos_crm_ugc_wow_360_e` | `gb-en-prm-workos-crm-cvr_` | 74,336 | 132.70 | 438 | 844 | 3,999,908 | 439,612 | 137,907 | 65,888 | 23,823 | 5% | 1.5 | - | - | - |
| `gb-msc-crm_workos_crm_static_dashbo` | `gb-en-prm-workos-crm-cvr_` | 59,719 | 290.03 | 604 | 711 | 6,222,150 | 199 | 69 | 42 | 24 | 12% | 2.4 | - | - | - |
| `gb-msc-crm_workos_crm_static_sequen` | `gb-en-prm-workos-crm-cvr_` | 23,548 | 22.00 | 287 | 349 | 4,617,160 | 47 | 10 | 6 | 5 | 11% | 1.7 | - | - | - |
| `gb-msc-crm_workos_crm_static_list_3` | `gb-en-prm-workos-crm-cvr_` | 11,648 | 34.46 | 100 | 149 | 1,336,655 | 109 | 38 | 14 | 10 | 9% | 3.1 | - | - | - |
| `gb-msc-crm_workos_crm_static_produc` | `gb-en-prm-workos-crm-cvr_` | 11,150 | 7.00 | 133 | 174 | 2,887,326 | 27 | 10 | 6 | 3 | 11% | 1.4 | - | - | - |
| `gb-msc-crm_workos_crm_video_eating-` | `gb-en-prm-workos-crm-cvr_` | 10,112 | 32.00 | 67 | 101 | 891,067 | 10,151 | 4,692 | 3,220 | 1,956 | 19% | 1.5 | - | - | - |
| `gb-msc-crm_workos_crm_gif_movefaste` | `gb-en-prm-workos-crm-cvr_` | 8,340 | 15.00 | 70 | 102 | 998,850 | 105,790 | 71,466 | 53,531 | 46,765 | 44% | 1.5 | - | - | - |
| `gb-msc-crm_workos_crm_static_dashbo` | `gb-en-prm-workos-crm-cvr_` | 7,622 | 11.00 | 126 | 124 | 1,204,550 | 16 | 7 | 4 | 0 | 0% | 1.5 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 4,679 | 32.00 | 33 | 65 | 401,124 | 0 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-crm_workos_crm_ugc_bestadvic` | `gb-en-prm-workos-crm-cvr_` | 4,445 | 21.00 | 26 | 50 | 378,663 | 21,786 | 12,819 | 10,998 | 4,794 | 22% | 1.3 | - | - | - |
| `gb-msc-crm_workos_crm_motion_insigh` | `gb-en-prm-workos-crm-cvr_` | 4,285 | 17.00 | 36 | 47 | 481,826 | 176,499 | 174,123 | 123,188 | 108,293 | 61% | 1.6 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 4,230 | 29.00 | 34 | 57 | 379,339 | 1 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-crm_workos_crm_video_honest_` | `gb-en-prm-workos-crm-cvr_` | 3,883 | 15.00 | 32 | 42 | 384,697 | 5,076 | 2,690 | 1,861 | 1,132 | 22% | 1.4 | - | - | - |
| `gb-msc-crm_workos_crm_ugc_car-tip_3` | `gb-en-prm-workos-crm-cvr_` | 3,651 | 3.00 | 21 | 45 | 241,472 | 22,709 | 15,700 | 14,195 | 5,912 | 26% | 1.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 3,624 | 14.00 | 16 | 63 | 192,325 | 0 | 0 | 0 | 0 | 0% | 3.9 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 2,885 | 11.00 | 12 | 30 | 181,522 | 0 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-crm_workos_crm_gif_dashboard` | `gb-en-prm-workos-crm-cvr_` | 2,882 | 15.00 | 24 | 30 | 227,300 | 46,290 | 32,886 | 20,496 | 17,211 | 37% | 1.5 | - | - | - |
| `gb-msc-crm_workos_crm_dialogue_swit` | `gb-en-prm-workos-crm-cvr_` | 2,844 | 8.00 | 16 | 24 | 180,764 | 2,036 | 1,223 | 899 | 550 | 27% | 1.2 | - | - | - |
| `gb-msc-crm_workos_crm_video_need-to` | `gb-en-prm-workos-crm-cvr_` | 2,684 | 3.00 | 18 | 18 | 476,979 | 2,591 | 1,331 | 967 | 618 | 24% | 1.5 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 2,491 | 12.00 | 12 | 22 | 164,187 | 0 | 0 | 0 | 0 | 0% | 2.5 | - | - | - |
| `gb-msc-crm_workos_crm_gif_dashboard` | `gb-en-prm-workos-crm-cvr_` | 2,472 | 9.00 | 38 | 59 | 246,950 | 37,882 | 26,455 | 17,943 | 15,336 | 40% | 1.4 | - | - | - |
| `gb-msc-crm_workos_crm_dialogue_late` | `gb-en-prm-workos-crm-cvr_` | 2,058 | 12.00 | 23 | 27 | 237,347 | 2,783 | 1,545 | 1,143 | 816 | 29% | 1.3 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 2,045 | 11.00 | 12 | 15 | 121,599 | 1 | 1 | 1 | 1 | 100% | 1.8 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_video_` | `gb-en-prm-workos-crm-cvr_` | 1,989 | 23.00 | 24 | 42 | 317,099 | 23,945 | 14,049 | 11,919 | 2,704 | 11% | 1.7 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 1,888 | 9.00 | 9 | 24 | 164,162 | 0 | 0 | 0 | 0 | 0% | 2.1 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_video_` | `gb-en-prm-workos-crm-cvr_` | 1,860 | 11.00 | 11 | 21 | 418,105 | 26,726 | 17,588 | 8,378 | 2,801 | 10% | 1.8 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 1,678 | 11.00 | 14 | 15 | 148,677 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_video_` | `gb-en-prm-workos-crm-cvr_` | 1,583 | 13.00 | 14 | 17 | 206,453 | 15,174 | 11,387 | 9,897 | 2,015 | 13% | 1.7 | - | - | - |
| `gb-msc-crm_workos_crm_pd_dealwon_36` | `gb-en-prm-workos-crm-cvr_` | 1,564 | 13.00 | 21 | 31 | 214,786 | 24,403 | 17,480 | 14,209 | 3,806 | 16% | 1.3 | - | - | - |
| `gb-msc-crm_workos_crm_pd_stopit_360` | `gb-en-prm-workos-crm-cvr_` | 1,482 | 3.00 | 10 | 11 | 136,091 | 24,872 | 18,669 | 16,499 | 5,915 | 24% | 1.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 1,446 | 7.00 | 7 | 21 | 152,612 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 1,390 | 11.00 | 13 | 11 | 148,751 | 0 | 0 | 0 | 0 | 0% | 1.5 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 1,383 | 3.00 | 11 | 21 | 176,124 | 0 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 856 | 4.00 | 4 | 9 | 115,415 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 829 | 4.00 | 10 | 13 | 133,612 | 0 | 0 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 715 | 1.00 | 1 | 6 | 122,186 | 1 | 1 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 708 | 6.00 | 7 | 12 | 41,933 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 694 | 4.00 | 5 | 6 | 177,382 | 0 | 0 | 0 | 0 | 0% | 4.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 693 | 8.00 | 9 | 18 | 112,216 | 0 | 0 | 0 | 0 | 0% | 1.5 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 592 | 4.00 | 8 | 16 | 71,664 | 0 | 0 | 0 | 0 | 0% | 1.3 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 536 | 2.00 | 2 | 4 | 33,922 | 0 | 0 | 0 | 0 | 0% | 1.5 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 480 | 1.00 | 1 | 1 | 69,109 | 0 | 0 | 0 | 0 | 0% | 2.1 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 309 | 1.00 | 1 | 3 | 25,783 | 0 | 0 | 0 | 0 | 0% | 1.7 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 308 | 0.00 | 0 | 0 | 56,230 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 168 | 0.00 | 0 | 0 | 52,965 | 0 | 0 | 0 | 0 | 0% | 5.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 154 | 0.00 | 0 | 1 | 9,396 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 130 | 0.00 | 0 | 1 | 20,702 | 0 | 0 | 0 | 0 | 0% | 2.9 | - | - | - |
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_` | 106 | 0.00 | 0 | 0 | 11,075 | 0 | 0 | 0 | 0 | 0% | 2.2 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 305,630 | 0.17 | 1,825 | 20,485,828 | 203,094 | 0.99% |
| facebook/facebook_reels | 74,362 | 0.00 | 358 | 5,578,442 | 44,864 | 0.80% |
| instagram/feed | 61,274 | 0.03 | 795 | 4,341,440 | 13,446 | 0.31% |
| instagram/instagram_stories | 28,897 | 0.06 | 316 | 3,479,622 | 11,559 | 0.33% |
| instagram/instagram_reels | 23,923 | 0.02 | 272 | 2,362,924 | 6,575 | 0.28% |
| messenger/messenger_inbox | 15,365 | 0.06 | 921 | 19,376,403 | 2,933 | 0.02% |
| facebook/facebook_stories | 10,967 | 0.01 | 33 | 368,931 | 6,220 | 1.69% |
| facebook/facebook_reels_overlay | 9,753 | 0.00 | 265 | 4,893,971 | 19,519 | 0.40% |
| audience_network/an_classic | 9,387 | 0.00 | 38 | 2,945,110 | 21,489 | 0.73% |
| facebook/instream_video | 9,202 | 0.00 | 99 | 1,263,412 | 17,080 | 1.35% |
| facebook/right_hand_column | 8,397 | 0.01 | 532 | 8,080,493 | 5,687 | 0.07% |
| facebook/marketplace | 5,150 | 0.01 | 92 | 1,438,446 | 1,449 | 0.10% |
| audience_network/rewarded_video | 3,399 | 0.00 | 7 | 264,517 | 8,426 | 3.19% |
| facebook/facebook_notification | 1,608 | 0.00 | 15 | 114,589 | 1,248 | 1.09% |
| facebook/video_feeds | 1,578 | 0.01 | 18 | 204,305 | 1,054 | 0.52% |
| instagram/instagram_explore | 1,059 | 0.00 | 22 | 210,154 | 380 | 0.18% |
| instagram/instagram_explore_grid_home | 584 | 0.00 | 30 | 267,878 | 27 | 0.01% |
| facebook/search | 535 | 0.00 | 8 | 111,913 | 448 | 0.40% |
| instagram/instagram_profile_feed | 234 | 0.00 | 8 | 21,369 | 22 | 0.10% |
| instagram/instagram_search | 44 | 0.00 | 0 | 14,717 | 20 | 0.14% |
| facebook/facebook_profile_feed | 19 | 0.00 | 0 | 2,289 | 4 | 0.17% |
| messenger/messenger_stories | 13 | 0.00 | 0 | 1,704 | 11 | 0.65% |
| instagram/instagram_profile_reels | 4 | 0.00 | 0 | 980 | 0 | 0.00% |
| unknown/unknown | 1 | 0.00 | 5 | 99 | 0 | 0.00% |
| threads/threads_feed | 0 | 0.00 | 0 | 29 | 0 | 0.00% |
| facebook/biz_disco_feed | 0 | 0.00 | 0 | 4 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 1,093,403 | 1747.57 | 131,004,984 |
| desktop | 288,250 | 420.33 | 34,509,855 |
| mobile_web | 13,614 | 38.00 | 1,242,373 |
| unknown | 1 | 0.50 | 116 |

---

#### Campaign: `gb-en-prm-workos-service-cvr_service_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £333,353 | **DEP:** 0.00
- **Impressions:** 33,785,144 | **Reach:** 6,540,939 | **Frequency:** 5.2
- **Purchases:** 3,064 | **Cost/Purchase:** £109
- **Registrations:** 3,826 | **Cost/Reg:** £87
- **Active Months:** 6

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2025-05 | 35,430 | 0.00 | 319 | £111 | 3,148,036 |
| 2025-06 | 82,957 | 0.00 | 652 | £127 | 8,194,298 |
| 2025-07 | 69,068 | 0.00 | 535 | £129 | 9,837,903 |
| 2025-08 | 49,039 | 0.00 | 449 | £109 | 4,485,214 |
| 2025-09 | 54,510 | 0.00 | 764 | £71 | 4,826,585 |
| 2025-10 | 42,351 | 0.00 | 345 | £123 | 3,293,108 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 68,158 | 0.00 | 572 | 747 | 7,793,035 | 2 | 2 | 2 | 2 | 100% | 3.7 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 24,005 | 0.00 | 229 | 298 | 2,545,457 | 1 | 1 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 21,568 | 0.00 | 167 | 227 | 1,470,842 | 1 | 1 | 1 | 1 | 100% | 2.7 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 20,498 | 0.00 | 151 | 192 | 2,427,232 | 1 | 0 | 0 | 0 | 0% | 2.5 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 19,492 | 0.00 | 203 | 215 | 2,276,240 | 2 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 17,495 | 0.00 | 150 | 201 | 1,846,186 | 0 | 0 | 0 | 0 | 0% | 3.4 | - | - | - |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 16,431 | 0.00 | 199 | 253 | 1,070,926 | 19,324 | 9,298 | 6,101 | 4,643 | 24% | 1.8 | - | - | - |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 16,238 | 0.00 | 160 | 194 | 979,482 | 151,517 | 125,527 | 108,069 | 14,098 | 9% | 2.1 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 15,936 | 0.00 | 168 | 216 | 2,644,828 | 0 | 0 | 0 | 0 | 0% | 2.7 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 14,753 | 0.00 | 104 | 133 | 1,437,413 | 0 | 0 | 0 | 0 | 0% | 2.7 | - | - | - |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 13,584 | 0.00 | 138 | 142 | 629,851 | 104,685 | 69,951 | 57,512 | 24,648 | 24% | 2.2 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 13,345 | 0.00 | 131 | 140 | 1,385,643 | 1 | 0 | 0 | 0 | 0% | 2.2 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 13,133 | 0.00 | 79 | 115 | 1,211,479 | 0 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 12,584 | 0.00 | 201 | 226 | 1,295,782 | 0 | 0 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 12,342 | 0.00 | 109 | 133 | 1,186,630 | 1 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 10,852 | 0.00 | 87 | 158 | 1,202,193 | 0 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 8,336 | 0.00 | 110 | 97 | 970,756 | 0 | 0 | 0 | 0 | 0% | 2.4 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 7,624 | 0.00 | 63 | 74 | 794,157 | 2 | 1 | 0 | 1 | 50% | 2.1 | - | - | - |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | 6,981 | 0.00 | 42 | 62 | 617,012 | 0 | 0 | 0 | 0 | 0% | 2.2 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 132,920 | 0.00 | 598 | 4,983,867 | 34,498 | 0.69% |
| facebook/right_hand_column | 38,140 | 0.00 | 783 | 14,386,581 | 16,467 | 0.11% |
| instagram/feed | 14,733 | 0.00 | 148 | 829,961 | 2,215 | 0.27% |
| audience_network/an_classic | 12,705 | 0.00 | 30 | 1,492,233 | 10,064 | 0.67% |
| facebook/facebook_reels | 9,065 | 0.00 | 46 | 616,077 | 19,185 | 3.11% |
| instagram/instagram_stories | 5,888 | 0.00 | 75 | 507,336 | 1,901 | 0.37% |
| instagram/instagram_reels | 5,019 | 0.00 | 44 | 440,603 | 1,274 | 0.29% |
| facebook/facebook_reels_overlay | 3,548 | 0.00 | 54 | 594,895 | 4,392 | 0.74% |
| facebook/instream_video | 3,227 | 0.00 | 28 | 245,801 | 3,912 | 1.59% |
| messenger/messenger_inbox | 3,081 | 0.00 | 64 | 929,696 | 391 | 0.04% |
| facebook/marketplace | 2,797 | 0.00 | 46 | 430,124 | 402 | 0.09% |
| facebook/facebook_stories | 2,551 | 0.00 | 11 | 31,362 | 584 | 1.86% |
| audience_network/rewarded_video | 1,957 | 0.00 | 9 | 109,248 | 3,739 | 3.42% |
| facebook/search | 298 | 0.00 | 3 | 12,036 | 68 | 0.56% |
| facebook/video_feeds | 265 | 0.00 | 2 | 17,879 | 194 | 1.09% |
| instagram/instagram_explore | 207 | 0.00 | 6 | 26,455 | 90 | 0.34% |
| facebook/facebook_profile_feed | 57 | 0.00 | 1 | 4,864 | 59 | 1.21% |
| instagram/instagram_explore_grid_home | 22 | 0.00 | 1 | 4,611 | 2 | 0.04% |
| messenger/messenger_stories | 9 | 0.00 | 0 | 1,104 | 16 | 1.45% |
| instagram/instagram_search | 4 | 0.00 | 0 | 718 | 2 | 0.28% |
| unknown/unknown | 0 | 0.00 | 6 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| desktop | 202,861 | 0.00 | 23,544,882 |
| mobile_app | 127,359 | 0.00 | 10,094,210 |
| mobile_web | 3,133 | 0.00 | 146,050 |
| unknown | 0 | 0.00 | 2 |

---

#### Campaign: `gb-en-prm-workos-multi-cvr_lal_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £117,208 | **DEP:** 0.00
- **Impressions:** 19,728,981 | **Reach:** 4,588,392 | **Frequency:** 4.3
- **Purchases:** 1,802 | **Cost/Purchase:** £65
- **Registrations:** 2,090 | **Cost/Reg:** £56
- **Active Months:** 4

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2025-03 | 21,321 | 0.00 | 244 | £87 | 2,694,265 |
| 2025-04 | 45,249 | 0.00 | 766 | £59 | 7,793,334 |
| 2025-05 | 50,638 | 0.00 | 790 | £64 | 9,241,382 |
| 2025-06 | 0 | 0.00 | 2 | N/A | 0 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc_workos_work-mgmt_pd_linear_l` | `gb-en-prm-workos-multi-cv` | 39,989 | 0.00 | 588 | 644 | 5,742,108 | 40,310 | 17,778 | 10,615 | 8,080 | 20% | 2.7 | - | - | - |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 12,809 | 0.00 | 146 | 155 | 1,754,808 | 57,451 | 21,253 | 12,689 | 6,804 | 12% | 1.7 | - | - | - |
| `gb-msc_workos_work-mgmt_static_stre` | `gb-en-prm-workos-multi-cv` | 9,836 | 0.00 | 193 | 215 | 1,779,583 | 9 | 2 | 1 | 1 | 11% | 2.0 | - | - | - |
| `gb-en-prm-workos-multi-cvr_pd_llama` | `gb-en-prm-workos-multi-cv` | 6,066 | 0.00 | 75 | 91 | 829,698 | 4,001 | 1,764 | 1,172 | 740 | 18% | 2.0 | - | - | - |
| `gb-msc_workos_work-mgmt_static_simp` | `gb-en-prm-workos-multi-cv` | 5,179 | 0.00 | 114 | 140 | 1,294,484 | 7 | 5 | 2 | 0 | 0% | 1.6 | - | - | - |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 4,957 | 0.00 | 52 | 69 | 680,889 | 9,023 | 4,725 | 3,214 | 1,626 | 18% | 1.6 | - | - | - |
| `gb-msc_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 3,484 | 0.00 | 63 | 87 | 754,029 | 5 | 4 | 3 | 3 | 60% | 1.8 | - | - | - |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 3,379 | 0.00 | 40 | 48 | 513,807 | 8,467 | 2,527 | 1,891 | 1,096 | 13% | 2.1 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 3,177 | 0.00 | 34 | 48 | 492,322 | 0 | 0 | 0 | 0 | 0% | 1.8 | - | - | - |
| `gb-msc_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 3,168 | 0.00 | 82 | 89 | 672,806 | 4 | 1 | 0 | 0 | 0% | 1.5 | - | - | - |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 2,954 | 0.00 | 28 | 39 | 454,226 | 5,519 | 2,387 | 1,577 | 863 | 16% | 1.6 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 2,751 | 0.00 | 68 | 69 | 887,369 | 0 | 0 | 0 | 0 | 0% | 1.8 | - | - | - |
| `gb-msc_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | 2,535 | 0.00 | 34 | 40 | 344,218 | 6,515 | 3,424 | 2,688 | 1,170 | 18% | 1.6 | - | - | - |
| `gb-msc_workos_work-mgmt_static_chao` | `gb-en-prm-workos-multi-cv` | 2,437 | 0.00 | 61 | 78 | 579,450 | 3 | 2 | 1 | 0 | 0% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_ut_speaker2` | `gb-en-prm-workos-multi-cv` | 2,219 | 0.00 | 24 | 23 | 278,830 | 4,993 | 2,288 | 1,563 | 712 | 14% | 1.5 | - | - | - |
| `gb-msc_workos_work-mgmt_static_work` | `gb-en-prm-workos-multi-cv` | 1,711 | 0.00 | 31 | 38 | 385,462 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 1,396 | 0.00 | 25 | 43 | 429,355 | 1 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 1,373 | 0.00 | 20 | 28 | 244,107 | 1 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 1,313 | 0.00 | 9 | 14 | 252,108 | 0 | 0 | 0 | 0 | 0% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 1,288 | 0.00 | 21 | 21 | 199,436 | 2,693 | 1,314 | 976 | 518 | 19% | 1.8 | - | - | - |
| `gb-msc_workos_work-mgmt_static_chao` | `gb-en-prm-workos-multi-cv` | 1,160 | 0.00 | 19 | 30 | 315,208 | 2 | 1 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 984 | 0.00 | 17 | 22 | 180,641 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | 971 | 0.00 | 23 | 15 | 289,865 | 1 | 0 | 0 | 0 | 0% | 1.3 | - | - | - |
| `gb-en-prm-workos-multi-cvr_pd_llama` | `gb-en-prm-workos-multi-cv` | 791 | 0.00 | 14 | 15 | 132,224 | 2,227 | 1,195 | 927 | 334 | 15% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_gif_llam` | `gb-en-prm-workos-multi-cv` | 362 | 0.00 | 5 | 4 | 51,295 | 4,737 | 2,386 | 1,643 | 1,362 | 29% | 1.4 | - | - | - |
| `gb-msc-prm-workos-multi-cvr_gif_lla` | `gb-en-prm-workos-multi-cv` | 334 | 0.00 | 4 | 6 | 62,836 | 2,156 | 900 | 574 | 460 | 21% | 1.2 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 332 | 0.00 | 8 | 11 | 67,379 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-en-prm-workos-multi-cvr_static_l` | `gb-en-prm-workos-multi-cv` | 251 | 0.00 | 4 | 8 | 60,438 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 24,286 | 0.00 | 266 | 3,293,122 | 16,483 | 0.50% |
| instagram/instagram_stories | 8,144 | 0.00 | 133 | 1,395,399 | 3,727 | 0.27% |
| instagram/feed | 6,898 | 0.00 | 133 | 933,773 | 1,415 | 0.15% |
| facebook/facebook_reels | 3,729 | 0.00 | 45 | 654,085 | 1,931 | 0.30% |
| instagram/instagram_reels | 1,839 | 0.00 | 41 | 415,568 | 621 | 0.15% |
| messenger/messenger_inbox | 1,386 | 0.00 | 57 | 1,213,878 | 115 | 0.01% |
| facebook/marketplace | 1,314 | 0.00 | 34 | 435,839 | 409 | 0.09% |
| facebook/instream_video | 821 | 0.00 | 12 | 138,777 | 1,296 | 0.93% |
| facebook/facebook_reels_overlay | 700 | 0.00 | 43 | 324,041 | 1,285 | 0.40% |
| facebook/facebook_stories | 531 | 0.00 | 4 | 43,090 | 469 | 1.09% |
| instagram/instagram_explore | 316 | 0.00 | 8 | 81,057 | 72 | 0.09% |
| audience_network/an_classic | 199 | 0.00 | 1 | 99,837 | 184 | 0.18% |
| facebook/facebook_profile_feed | 151 | 0.00 | 2 | 46,159 | 87 | 0.19% |
| facebook/right_hand_column | 139 | 0.00 | 11 | 117,833 | 69 | 0.06% |
| instagram/instagram_explore_grid_home | 105 | 0.00 | 2 | 37,035 | 4 | 0.01% |
| audience_network/rewarded_video | 42 | 0.00 | 0 | 4,982 | 41 | 0.82% |
| facebook/video_feeds | 31 | 0.00 | 0 | 5,556 | 35 | 0.63% |
| facebook/search | 4 | 0.00 | 0 | 990 | 2 | 0.20% |
| instagram/instagram_search | 1 | 0.00 | 0 | 258 | 0 | 0.00% |
| messenger/messenger_stories | 0 | 0.00 | 0 | 42 | 0 | 0.00% |
| instagram/instagram_profile_reels | 0 | 0.00 | 0 | 61 | 2 | 3.28% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 100,540 | 0.00 | 18,101,155 |
| desktop | 14,710 | 0.00 | 1,285,748 |
| mobile_web | 1,958 | 0.00 | 342,078 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb-en-prm-work_mgmt-multi-abm_slg_mktg`

- **Objective:** OUTCOME_SALES | **Spend:** £47,008 | **DEP:** 0.00
- **Impressions:** 6,335,061 | **Reach:** 1,469,324 | **Frequency:** 4.3
- **Purchases:** 2,847 | **Cost/Purchase:** £17
- **Registrations:** 2,957 | **Cost/Reg:** £16
- **Active Months:** 5

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2025-07 | 10,462 | 0.00 | 487 | £21 | 1,258,564 |
| 2025-08 | 9,447 | 0.00 | 489 | £19 | 1,315,393 |
| 2025-09 | 11,002 | 0.00 | 1,065 | £10 | 1,513,660 |
| 2025-10 | 10,030 | 0.00 | 547 | £18 | 1,564,515 |
| 2025-11 | 6,067 | 0.00 | 259 | £23 | 682,929 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 8,866 | 0.00 | 396 | 456 | 1,094,841 | 4 | 1 | 1 | 0 | 0% | 2.7 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 8,200 | 0.00 | 582 | 562 | 1,113,832 | 1 | 1 | 1 | 0 | 0% | 2.5 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 5,439 | 0.00 | 278 | 319 | 724,705 | 0 | 0 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 4,972 | 0.00 | 277 | 283 | 713,485 | 0 | 0 | 0 | 0 | 0% | 2.1 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 4,757 | 0.00 | 332 | 315 | 625,721 | 0 | 0 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 2,957 | 0.00 | 132 | 160 | 458,527 | 0 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 2,938 | 0.00 | 176 | 172 | 455,544 | 2 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 2,541 | 0.00 | 178 | 221 | 391,463 | 0 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 2,125 | 0.00 | 132 | 146 | 283,940 | 0 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 1,383 | 0.00 | 107 | 92 | 140,538 | 0 | 0 | 0 | 0 | 0% | 2.1 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 1,326 | 0.00 | 166 | 146 | 140,454 | 0 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 1,073 | 0.00 | 66 | 59 | 134,971 | 0 | 0 | 0 | 0 | 0% | 1.8 | - | - | - |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | 430 | 0.00 | 25 | 26 | 57,040 | 0 | 0 | 0 | 0 | 0% | 1.7 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 9,916 | 0.00 | 350 | 844,007 | 2,829 | 0.34% |
| instagram/instagram_stories | 3,327 | 0.00 | 145 | 399,597 | 750 | 0.19% |
| instagram/feed | 2,614 | 0.00 | 172 | 213,006 | 283 | 0.13% |
| instagram/instagram_reels | 1,126 | 0.00 | 53 | 153,643 | 293 | 0.19% |
| facebook/right_hand_column | 973 | 0.00 | 122 | 521,253 | 118 | 0.02% |
| facebook/facebook_reels | 646 | 0.00 | 22 | 94,167 | 211 | 0.22% |
| facebook/facebook_reels_overlay | 334 | 0.00 | 35 | 117,821 | 154 | 0.13% |
| facebook/marketplace | 275 | 0.00 | 12 | 62,146 | 60 | 0.10% |
| facebook/instream_video | 182 | 0.00 | 10 | 33,773 | 86 | 0.25% |
| messenger/messenger_inbox | 179 | 0.00 | 31 | 93,437 | 8 | 0.01% |
| facebook/facebook_stories | 172 | 0.00 | 9 | 11,542 | 42 | 0.36% |
| facebook/facebook_notification | 56 | 0.00 | 2 | 7,089 | 34 | 0.48% |
| instagram/instagram_explore | 52 | 0.00 | 8 | 8,353 | 8 | 0.10% |
| instagram/instagram_explore_grid_home | 32 | 0.00 | 5 | 6,499 | 0 | 0.00% |
| audience_network/an_classic | 20 | 0.00 | 0 | 6,859 | 84 | 1.22% |
| facebook/video_feeds | 2 | 0.00 | 0 | 336 | 1 | 0.30% |
| facebook/search | 2 | 0.00 | 0 | 367 | 3 | 0.82% |
| instagram/instagram_search | 0 | 0.00 | 0 | 36 | 0 | 0.00% |
| threads/threads_feed | 0 | 0.00 | 0 | 22 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |
| facebook/facebook_profile_feed | 0 | 0.00 | 0 | 3 | 0 | 0.00% |
| messenger/messenger_stories | 0 | 0.00 | 0 | 1 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 35,187 | 0.00 | 3,831,615 |
| desktop | 10,922 | 0.00 | 2,421,635 |
| mobile_web | 899 | 0.00 | 81,811 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb-en-prm-workos-multi-cvr_msc_enterprise`

- **Objective:** OUTCOME_SALES | **Spend:** £44,714 | **DEP:** 0.00
- **Impressions:** 5,046,973 | **Reach:** 1,545,008 | **Frequency:** 3.3
- **Purchases:** 912 | **Cost/Purchase:** £49
- **Registrations:** 1,080 | **Cost/Reg:** £41
- **Active Months:** 4

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2025-02 | 9,374 | 0.00 | 175 | £54 | 1,050,928 |
| 2025-03 | 21,649 | 0.00 | 384 | £56 | 1,989,853 |
| 2025-04 | 13,483 | 0.00 | 343 | £39 | 1,987,361 |
| 2025-05 | 207 | 0.00 | 10 | £21 | 18,831 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-directors_workos_work-mgmt_s` | `gb-en-prm-workos-multi-cv` | 16,796 | 0.00 | 371 | 442 | 1,788,980 | 2 | 1 | 1 | 0 | 0% | 2.5 | - | - | - |
| `gb-msc-directors_workos_work-mgmt_s` | `gb-en-prm-workos-multi-cv` | 10,418 | 0.00 | 201 | 227 | 1,094,697 | 2 | 1 | 0 | 0 | 0% | 2.3 | - | - | - |
| `gb-msc-directors_workos_work-mgmt_s` | `gb-en-prm-workos-multi-cv` | 8,301 | 0.00 | 132 | 165 | 972,316 | 3 | 1 | 1 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-directors_workos_work-mgmt_s` | `gb-en-prm-workos-multi-cv` | 4,801 | 0.00 | 109 | 143 | 498,658 | 1 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-directors_workos_work-mgmt_s` | `gb-en-prm-workos-multi-cv` | 4,398 | 0.00 | 99 | 103 | 692,322 | 0 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 113 | 0.00 | 6 | 6,767 | 29 | 0.43% |
| instagram/instagram_stories | 31 | 0.00 | 1 | 2,779 | 2 | 0.07% |
| instagram/feed | 28 | 0.00 | 0 | 2,061 | 0 | 0.00% |
| audience_network/an_classic | 14 | 0.00 | 0 | 1,073 | 3 | 0.28% |
| instagram/instagram_reels | 5 | 0.00 | 1 | 662 | 0 | 0.00% |
| facebook/facebook_reels | 4 | 0.00 | 0 | 574 | 0 | 0.00% |
| facebook/instream_video | 3 | 0.00 | 2 | 1,788 | 8 | 0.45% |
| facebook/marketplace | 3 | 0.00 | 0 | 632 | 0 | 0.00% |
| facebook/facebook_stories | 3 | 0.00 | 0 | 164 | 0 | 0.00% |
| messenger/messenger_inbox | 2 | 0.00 | 0 | 586 | 0 | 0.00% |
| instagram/instagram_explore | 1 | 0.00 | 0 | 112 | 0 | 0.00% |
| facebook/facebook_reels_overlay | 1 | 0.00 | 0 | 678 | 1 | 0.15% |
| facebook/facebook_profile_feed | 0 | 0.00 | 0 | 114 | 0 | 0.00% |
| facebook/video_feeds | 0 | 0.00 | 0 | 7 | 0 | 0.00% |
| instagram/instagram_explore_grid_home | 0 | 0.00 | 0 | 69 | 0 | 0.00% |
| facebook/right_hand_column | 0 | 0.00 | 0 | 763 | 1 | 0.13% |
| facebook/search | 0 | 0.00 | 0 | 1 | 0 | 0.00% |
| instagram/instagram_profile_reels | 0 | 0.00 | 0 | 1 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 42,118 | 0.00 | 4,510,700 |
| desktop | 1,973 | 0.00 | 469,745 |
| mobile_web | 622 | 0.00 | 66,528 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb-en-prm-workos-multi-cvr_msc-work`

- **Objective:** OUTCOME_SALES | **Spend:** £42,716 | **DEP:** 0.56
- **Impressions:** 5,790,321 | **Reach:** 1,517,002 | **Frequency:** 3.8
- **Purchases:** 559 | **Cost/Purchase:** £76
- **Registrations:** 622 | **Cost/Reg:** £69
- **Active Months:** 1

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2024-05 | 42,716 | 0.56 | 559 | £76 | 5,790,321 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-work_workos_work-mgmt_static` | `gb-en-prm-workos-multi-cv` | 30,429 | 0.43 | 404 | 452 | 4,154,599 | 1 | 0 | 0 | 0 | 0% | 3.2 | - | - | - |
| `gb-msc-work_workos_work-mgmt_video_` | `gb-en-prm-workos-multi-cv` | 4,408 | 0.05 | 61 | 56 | 596,310 | 6,117 | 2,245 | 1,339 | 950 | 16% | 2.2 | - | - | - |
| `gb-msc-work_workos_crm_static_reale` | `gb-en-prm-workos-multi-cv` | 3,451 | 0.06 | 51 | 59 | 450,320 | 0 | 0 | 0 | 0 | 0% | 2.0 | - | - | - |
| `gb-msc-work_workos_crm_video_loop-v` | `gb-en-prm-workos-multi-cv` | 3,218 | 0.01 | 34 | 42 | 462,594 | 9,623 | 4,096 | 2,338 | 1,713 | 18% | 2.4 | - | - | - |
| `gb-msc-work_workos_crm_video_iris_e` | `gb-en-prm-workos-multi-cv` | 1,211 | 0.01 | 9 | 13 | 126,498 | 3,749 | 2,125 | 993 | 768 | 20% | 1.7 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 27,888 | 0.33 | 315 | 3,239,053 | 8,803 | 0.27% |
| instagram/feed | 6,578 | 0.07 | 89 | 833,324 | 601 | 0.07% |
| instagram/instagram_stories | 2,124 | 0.01 | 27 | 276,518 | 400 | 0.14% |
| facebook/marketplace | 1,409 | 0.03 | 22 | 393,358 | 429 | 0.11% |
| facebook/facebook_reels | 846 | 0.05 | 23 | 174,397 | 274 | 0.16% |
| facebook/instream_video | 793 | 0.05 | 26 | 175,041 | 484 | 0.28% |
| facebook/video_feeds | 604 | 0.00 | 7 | 120,520 | 316 | 0.26% |
| facebook/facebook_stories | 595 | 0.00 | 9 | 64,984 | 186 | 0.29% |
| instagram/instagram_reels | 528 | 0.02 | 10 | 102,890 | 88 | 0.09% |
| instagram/instagram_explore | 509 | 0.00 | 12 | 131,851 | 99 | 0.08% |
| instagram/instagram_explore_grid_home | 475 | 0.00 | 11 | 155,501 | 3 | 0.00% |
| messenger/messenger_inbox | 153 | 0.00 | 5 | 73,721 | 15 | 0.02% |
| instagram/instagram_profile_feed | 78 | 0.00 | 1 | 15,243 | 4 | 0.03% |
| facebook/facebook_reels_overlay | 67 | 0.00 | 2 | 24,949 | 93 | 0.37% |
| audience_network/rewarded_video | 25 | 0.00 | 0 | 454 | 25 | 5.51% |
| audience_network/an_classic | 24 | 0.00 | 0 | 3,024 | 13 | 0.43% |
| facebook/search | 18 | 0.00 | 0 | 4,555 | 12 | 0.26% |
| instagram/instagram_search | 2 | 0.00 | 0 | 604 | 1 | 0.17% |
| facebook/right_hand_column | 1 | 0.00 | 0 | 334 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 34,317 | 0.43 | 5,326,730 |
| desktop | 8,395 | 0.13 | 463,303 |
| mobile_web | 4 | 0.00 | 288 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb-en-service-service-cvr_service_asc` [ASC/Advantage+]

- **Objective:** OUTCOME_SALES | **Spend:** £20,211 | **DEP:** 59.33
- **Impressions:** 1,572,153 | **Reach:** 555,921 | **Frequency:** 2.8
- **Purchases:** 79 | **Cost/Purchase:** £256
- **Registrations:** 150 | **Cost/Reg:** £135
- **Active Months:** 2

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2026-04 | 2,466 | 2.77 | 4 | £616 | 340,808 |
| 2026-05 | 17,745 | 56.56 | 75 | £237 | 1,231,345 |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| desktop | 14,633 | 25.38 | 1,335,437 |
| mobile_app | 5,346 | 33.61 | 228,457 |
| mobile_web | 232 | 0.33 | 8,258 |
| unknown | 0 | 0.00 | 1 |

---

#### Campaign: `gb-en-service-workos-service-cvr_service_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £13,660 | **DEP:** 36.94
- **Impressions:** 1,427,159 | **Reach:** 595,008 | **Frequency:** 2.4
- **Purchases:** 39 | **Cost/Purchase:** £350
- **Registrations:** 60 | **Cost/Reg:** £228
- **Active Months:** 1

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2026-04 | 13,660 | 36.94 | 39 | £350 | 1,427,159 |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 9,086 | 30.97 | 1,198,377 |
| desktop | 4,488 | 5.75 | 219,623 |
| mobile_web | 86 | 0.22 | 9,159 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb2-en-prm-workos-multi-cvr_msc_enterprise`

- **Objective:** OUTCOME_SALES | **Spend:** £5,638 | **DEP:** 0.00
- **Impressions:** 2,090,982 | **Reach:** 909,781 | **Frequency:** 2.3
- **Purchases:** 148 | **Cost/Purchase:** £38
- **Registrations:** 171 | **Cost/Reg:** £33
- **Active Months:** 2

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2025-04 | 5,219 | 0.00 | 126 | £41 | 1,991,816 |
| 2025-05 | 419 | 0.00 | 22 | £19 | 99,166 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb2-msc-directors_workos_work-mgmt_` | `gb2-en-prm-workos-multi-c` | 2,255 | 0.00 | 62 | 76 | 898,239 | 5 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb2-msc-directors_workos_work-mgmt_` | `gb2-en-prm-workos-multi-c` | 1,365 | 0.00 | 30 | 30 | 306,597 | 1 | 1 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb2-msc-directors_workos_work-mgmt_` | `gb2-en-prm-workos-multi-c` | 960 | 0.00 | 29 | 35 | 421,361 | 1 | 0 | 0 | 0 | 0% | 1.7 | - | - | - |
| `gb2-msc-directors_workos_work-mgmt_` | `gb2-en-prm-workos-multi-c` | 679 | 0.00 | 19 | 18 | 332,952 | 3 | 1 | 0 | 0 | 0% | 1.5 | - | - | - |
| `gb2-msc-directors_workos_work-mgmt_` | `gb2-en-prm-workos-multi-c` | 380 | 0.00 | 8 | 12 | 131,833 | 0 | 0 | 0 | 0 | 0% | 1.5 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 250 | 0.00 | 9 | 20,474 | 133 | 0.65% |
| instagram/feed | 37 | 0.00 | 0 | 2,644 | 5 | 0.19% |
| instagram/instagram_stories | 37 | 0.00 | 3 | 4,264 | 6 | 0.14% |
| facebook/facebook_reels_overlay | 23 | 0.00 | 3 | 33,315 | 76 | 0.23% |
| facebook/right_hand_column | 14 | 0.00 | 5 | 24,924 | 17 | 0.07% |
| instagram/instagram_reels | 14 | 0.00 | 0 | 3,140 | 4 | 0.13% |
| facebook/facebook_reels | 14 | 0.00 | 2 | 2,378 | 12 | 0.50% |
| facebook/marketplace | 8 | 0.00 | 0 | 2,229 | 2 | 0.09% |
| facebook/facebook_stories | 6 | 0.00 | 0 | 583 | 3 | 0.51% |
| facebook/instream_video | 5 | 0.00 | 0 | 1,916 | 22 | 1.15% |
| messenger/messenger_inbox | 3 | 0.00 | 0 | 1,367 | 1 | 0.07% |
| facebook/facebook_profile_feed | 2 | 0.00 | 0 | 534 | 3 | 0.56% |
| instagram/instagram_explore | 2 | 0.00 | 0 | 339 | 0 | 0.00% |
| audience_network/an_classic | 2 | 0.00 | 0 | 811 | 1 | 0.12% |
| facebook/video_feeds | 1 | 0.00 | 0 | 61 | 3 | 4.92% |
| instagram/instagram_explore_grid_home | 0 | 0.00 | 0 | 136 | 0 | 0.00% |
| facebook/search | 0 | 0.00 | 0 | 42 | 0 | 0.00% |
| instagram/instagram_profile_reels | 0 | 0.00 | 0 | 7 | 0 | 0.00% |
| instagram/instagram_search | 0 | 0.00 | 0 | 2 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 4,749 | 0.00 | 1,680,835 |
| desktop | 810 | 0.00 | 399,252 |
| mobile_web | 79 | 0.00 | 10,895 |
| unknown | 0 | 0.00 | 0 |

---

#### Campaign: `gb-en-prm-workos-multi-cvr_abm_retail_land_msc`

- **Objective:** OUTCOME_SALES | **Spend:** £3,913 | **DEP:** 0.00
- **Impressions:** 580,882 | **Reach:** 206,975 | **Frequency:** 2.8
- **Purchases:** 632 | **Cost/Purchase:** £6
- **Registrations:** 768 | **Cost/Reg:** £5
- **Active Months:** 4

**Monthly Trend:**

| Month | Spend £ | DEP | Purchases | Cost/Purchase | Imp |
|-------|---------|-----|-----------|---------------|-----|
| 2024-07 | 237 | 0.00 | 34 | £7 | 32,302 |
| 2024-08 | 1,966 | 0.00 | 321 | £6 | 303,577 |
| 2024-09 | 1,709 | 0.00 | 277 | £6 | 245,003 |
| 2024-10 | 0 | 0.00 | 0 | N/A | 0 |

**Ads:**

| Ad Name | Adset | Spend £ | DEP | Purchases | Regs | Imp | P25 | P50 | P75 | P100 | Hold% | Freq | Quality | Engagement | Conversion |
|---------|-------|---------|-----|-----------|------|-----|-----|-----|-----|------|-------|------|---------|------------|------------|
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 1,237 | 0.00 | 210 | 268 | 172,718 | 0 | 0 | 0 | 0 | 0% | 1.8 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 797 | 0.00 | 98 | 124 | 112,934 | 0 | 0 | 0 | 0 | 0% | 1.9 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 543 | 0.00 | 80 | 97 | 77,514 | 0 | 0 | 0 | 0 | 0% | 1.7 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 392 | 0.00 | 72 | 85 | 59,817 | 0 | 0 | 0 | 0 | 0% | 1.6 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 334 | 0.00 | 66 | 65 | 55,113 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 313 | 0.00 | 62 | 69 | 53,776 | 0 | 0 | 0 | 0 | 0% | 1.4 | - | - | - |
| `gb-msc-abmretailland_workos_work-mg` | `gb-en-prm-workos-multi-cv` | 296 | 0.00 | 44 | 60 | 49,010 | 0 | 0 | 0 | 0 | 0% | 1.5 | - | - | - |

**Placement Breakdown:**

| Placement | Spend £ | DEP | Purchases | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 1,891 | 0.00 | 217 | 154,039 | 537 | 0.35% |
| instagram/instagram_stories | 799 | 0.00 | 161 | 150,289 | 200 | 0.13% |
| instagram/feed | 585 | 0.00 | 121 | 84,862 | 58 | 0.07% |
| facebook/facebook_reels | 205 | 0.00 | 35 | 46,885 | 63 | 0.13% |
| instagram/instagram_reels | 126 | 0.00 | 32 | 41,686 | 35 | 0.08% |
| facebook/marketplace | 85 | 0.00 | 15 | 23,838 | 18 | 0.08% |
| facebook/facebook_stories | 80 | 0.00 | 13 | 10,051 | 40 | 0.40% |
| facebook/instream_video | 37 | 0.00 | 7 | 8,660 | 27 | 0.31% |
| instagram/instagram_explore | 33 | 0.00 | 5 | 9,103 | 2 | 0.02% |
| facebook/video_feeds | 24 | 0.00 | 7 | 4,400 | 21 | 0.48% |
| messenger/messenger_inbox | 21 | 0.00 | 7 | 32,652 | 3 | 0.01% |
| instagram/instagram_explore_grid_home | 14 | 0.00 | 2 | 6,396 | 0 | 0.00% |
| facebook/facebook_reels_overlay | 5 | 0.00 | 3 | 3,485 | 3 | 0.09% |
| instagram/instagram_profile_feed | 4 | 0.00 | 1 | 1,000 | 0 | 0.00% |
| facebook/right_hand_column | 3 | 0.00 | 6 | 3,441 | 5 | 0.15% |
| facebook/search | 0 | 0.00 | 0 | 63 | 1 | 1.59% |
| audience_network/an_classic | 0 | 0.00 | 0 | 23 | 0 | 0.00% |
| instagram/instagram_search | 0 | 0.00 | 0 | 9 | 0 | 0.00% |
| unknown/unknown | 0 | 0.00 | 0 | 0 | 0 | 0.00% |

**Device Split:**

| Device | Spend £ | DEP | Imp |
|--------|---------|-----|-----|
| mobile_app | 3,581 | 0.00 | 555,535 |
| desktop | 332 | 0.00 | 25,347 |
| unknown | 0 | 0.00 | 0 |

---

## 5. Meta — Cross-Cutting Analysis

### 5.1 Overall Placement Efficiency

| Placement | Spend £ | DEP | DEP/Spend | Imp | Clicks | CTR |
|-----------|---------|-----|-----------|-----|--------|-----|
| facebook/feed | 1,329,733 | 4.1500 | 0.000003 | 153,660,640 | 758,611 | 0.49% |
| instagram/instagram_stories | 567,348 | 4.7100 | 0.000008 | 141,854,594 | 240,007 | 0.17% |
| instagram/feed | 372,744 | 2.5000 | 0.000007 | 64,676,265 | 81,536 | 0.13% |
| facebook/facebook_reels | 206,497 | 0.7200 | 0.000003 | 35,783,529 | 151,103 | 0.42% |
| instagram/instagram_reels | 198,470 | 1.0800 | 0.000005 | 50,845,699 | 82,490 | 0.16% |
| messenger/messenger_inbox | 88,756 | 0.2700 | 0.000003 | 82,309,723 | 9,304 | 0.01% |
| facebook/marketplace | 61,904 | 0.4200 | 0.000007 | 20,493,613 | 21,534 | 0.11% |
| facebook/right_hand_column | 61,449 | 0.0400 | 0.000001 | 30,914,459 | 26,698 | 0.09% |
| facebook/instream_video | 56,986 | 0.3700 | 0.000006 | 12,490,580 | 75,617 | 0.61% |
| facebook/facebook_reels_overlay | 50,230 | 0.2000 | 0.000004 | 25,266,637 | 106,012 | 0.42% |
| instagram/instagram_explore | 41,778 | 0.6200 | 0.000015 | 14,717,491 | 10,723 | 0.07% |
| instagram/instagram_explore_grid_home | 36,989 | 0.6300 | 0.000017 | 17,818,994 | 472 | 0.00% |
| facebook/facebook_stories | 33,419 | 0.1200 | 0.000004 | 3,323,218 | 19,954 | 0.60% |
| audience_network/an_classic | 27,495 | 0.0100 | 0.000000 | 5,955,282 | 43,945 | 0.74% |
| facebook/video_feeds | 16,091 | 0.1900 | 0.000012 | 3,916,487 | 14,212 | 0.36% |
| audience_network/rewarded_video | 6,831 | 0.0000 | 0.000000 | 540,612 | 23,070 | 4.27% |
| instagram/instagram_profile_feed | 4,673 | 0.0600 | 0.000013 | 1,628,353 | 886 | 0.05% |
| facebook/facebook_notification | 1,664 | 0.0000 | 0.000000 | 121,678 | 1,282 | 1.05% |
| facebook/search | 1,331 | 0.0000 | 0.000000 | 283,603 | 874 | 0.31% |
| facebook/facebook_profile_feed | 230 | 0.0000 | 0.000000 | 53,963 | 153 | 0.28% |
| instagram/instagram_search | 164 | 0.0000 | 0.000000 | 69,123 | 75 | 0.11% |
| messenger/messenger_stories | 24 | 0.0000 | 0.000000 | 3,093 | 28 | 0.91% |
| instagram/instagram_profile_reels | 18 | 0.0000 | 0.000000 | 6,052 | 8 | 0.13% |
| unknown/unknown | 1 | 0.0000 | 0.000000 | 115 | 1 | 0.87% |
| threads/threads_feed | 0 | 0.0000 | 0.000000 | 51 | 0 | 0.00% |
| facebook/biz_disco_feed | 0 | 0.0000 | 0.000000 | 4 | 0 | 0.00% |

### 5.2 Overall Device Performance

| Device | Spend £ | DEP | DEP/Spend | Imp |
|--------|---------|-----|-----------|-----|
| mobile_app | 5,653,191 | 16192.9900 | 0.002864 | 1,210,940,389 |
| desktop | 1,088,167 | 2346.0300 | 0.002156 | 144,442,802 |
| mobile_web | 67,253 | 294.9100 | 0.004385 | 10,357,507 |
| unknown | 2 | 1.4300 | 0.893997 | 205 |

### 5.3 Creative Fatigue — High Frequency Ads

Ads with avg frequency > 3 and £1K+ spend:

| Ad Name | Campaign | Spend £ | Avg Freq | Purchases | Imp | DEP |
|---------|----------|---------|----------|-----------|-----|-----|
| `gb-msc-crm-uitest_workos_crm_static` | `gb-en-prm-workos-crm-cvr_crm_m` | 3,624 | 3.9 | 16 | 192,325 | 14.00 |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-cvr_s` | 68,158 | 3.7 | 572 | 7,793,035 | 0.00 |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-cvr_s` | 17,495 | 3.4 | 150 | 1,846,186 | 0.00 |
| `gbasc2_workos_work-mgmt_static_dese` | `gb-en-prm-workos-multi-cvr_asc` | 616,623 | 3.3 | 13,130 | 156,798,454 | 0.92 |
| `gb-msc-work_workos_work-mgmt_static` | `gb-en-prm-workos-multi-cvr_msc` | 30,429 | 3.2 | 404 | 4,154,599 | 0.43 |
| `gb-msc-crm_workos_crm_static_list_3` | `gb-en-prm-workos-crm-cvr_crm_m` | 11,648 | 3.1 | 100 | 1,336,655 | 34.46 |

### 5.4 Top 30 Meta Ads by Purchase Count (Non-Brand)

| Ad Name | Campaign | Adset | Spend £ | Purchases | Cost/Purchase | Regs | P25 | P100 | Hold% |
|---------|----------|-------|---------|-----------|---------------|------|-----|------|-------|
| `gbasc2_workos_work-mgmt_static_dese` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 616,623 | 13,130 | £47 | 15,910 | 691 | 131 | 19% |
| `gbasc2_workos_work-mgmt_static_spre` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 211,766 | 4,071 | £52 | 4,876 | 268 | 36 | 13% |
| `gbasc2_workos_work-mgmt_video_artof` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 171,568 | 3,834 | £45 | 4,656 | 260,279 | 38,528 | 15% |
| `gbasc2_workos_work-mgmt_static_dese` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 148,948 | 2,966 | £50 | 3,577 | 105 | 16 | 15% |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 77,681 | 1,974 | £39 | 2,330 | 369,200 | 71,436 | 19% |
| `gbasc2_workos_work-mgmt_static_stre` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 70,534 | 1,827 | £39 | 2,246 | 434 | 96 | 22% |
| `gbasc2_workos_work-mgmt_static_simp` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 59,180 | 1,371 | £43 | 1,713 | 150 | 29 | 19% |
| `gbasc2_workos_work-mgmt_static_work` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 49,044 | 1,359 | £36 | 1,707 | 199 | 30 | 15% |
| `gbasc2_workos_work-mgmt_video_hi-go` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 46,283 | 1,245 | £37 | 1,467 | 254,953 | 52,193 | 20% |
| `gb-msc-crm_workos_crm_motion_sfblac` | `gb-en-prm-workos-crm-cvr_` | `gb-en-prm-workos-crm` | 93,594 | 1,186 | £79 | 1,378 | 1 | 0 | 0% |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 35,522 | 884 | £40 | 1,151 | 380 | 79 | 21% |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 26,707 | 719 | £37 | 840 | 152 | 19 | 12% |
| `gb-msc_workos_work-mgmt_ugc_ugc_bam` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 37,078 | 709 | £52 | 886 | 173,781 | 21,431 | 12% |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 29,310 | 684 | £43 | 950 | 3 | 1 | 33% |
| `gb-msc_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 29,245 | 665 | £44 | 878 | 15 | 1 | 7% |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 27,495 | 651 | £42 | 778 | 2 | 1 | 50% |
| `gbasc2_workos_work-mgmt_static_chao` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 22,313 | 647 | £34 | 756 | 178 | 38 | 21% |
| `gb-msc-crm_workos_crm_static_dashbo` | `gb-en-prm-workos-crm-cvr_` | `gb-en-prm-workos-crm` | 59,719 | 604 | £99 | 711 | 199 | 24 | 12% |
| `gb-msc_workos_work-mgmt_pd_linear_l` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 39,989 | 588 | £68 | 644 | 40,310 | 8,080 | 20% |
| `gb-msc-abm-workos_work-mgmt_static_` | `gb-en-prm-work_mgmt-multi` | `gb-en-prm-work_mgmt-` | 8,200 | 582 | £14 | 562 | 1 | 0 | 0% |
| `gb-msc-service-workos_service_stati` | `gb-en-prm-workos-service-` | `gb-en-prm-workos-ser` | 68,158 | 572 | £119 | 747 | 2 | 2 | 100% |
| `gbasc2_workos_work-mgmt_static_llam` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 24,110 | 555 | £43 | 635 | 4 | 0 | 0% |
| `gbasc2_workos_work-mgmt_video_logo-` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 18,598 | 545 | £34 | 559 | 117,613 | 24,926 | 21% |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 22,304 | 524 | £43 | 598 | 114 | 25 | 22% |
| `gbasc2_workos_work-mgmt_ugc_llama_j` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 26,832 | 487 | £55 | 575 | 112,056 | 14,683 | 13% |
| `gbasc2_workos_work-mgmt_static_boar` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 16,207 | 466 | £35 | 560 | 53 | 9 | 17% |
| `gbasc2_workos_crm_static_cube-befor` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 19,988 | 462 | £43 | 478 | 1 | 0 | 0% |
| `gb-msc-crm_workos_crm_ugc_wow_360_e` | `gb-en-prm-workos-crm-cvr_` | `gb-en-prm-workos-crm` | 74,336 | 438 | £170 | 844 | 439,612 | 23,823 | 5% |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 21,800 | 431 | £51 | 548 | 76,494 | 10,781 | 14% |
| `gbasc2_workos_work-mgmt_ut_mcdonald` | `gb-en-prm-workos-multi-cv` | `gb-en-prm-workos-mul` | 23,648 | 429 | £55 | 489 | 65,324 | 9,138 | 14% |

### 5.5 Worst Meta Ads — Spend > £1K, Zero Purchases

| Ad Name | Campaign | Spend £ | Regs | Imp | CTR | DEP |
|---------|----------|---------|------|-----|-----|-----|

### 5.6 Video Creative Health — Hold Rates (Non-Brand, min 10K views)

| Ad Name | Campaign | P25 Views | P50 | P75 | P100 | P25→P50 Drop | P50→P100 Drop | Spend £ | Purchases |
|---------|----------|-----------|-----|-----|------|-------------|--------------|---------|-----------|
| `gbasc2_workos_work-mgmt_video_artof` | `gb-en-prm-workos-multi-cv` | 260,279 | 113,813 | 66,073 | 38,528 | 56% | 66% | 171,568 | 3,834 |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | 369,200 | 188,911 | 122,000 | 71,436 | 49% | 62% | 77,681 | 1,974 |
| `gb-msc-crm_workos_crm_ugc_wow_360_e` | `gb-en-prm-workos-crm-cvr_` | 439,612 | 137,907 | 65,888 | 23,823 | 69% | 83% | 74,336 | 438 |
| `gbasc2_workos_work-mgmt_video_hi-go` | `gb-en-prm-workos-multi-cv` | 254,953 | 153,016 | 103,102 | 52,193 | 40% | 66% | 46,283 | 1,245 |
| `gb-msc_workos_work-mgmt_pd_linear_l` | `gb-en-prm-workos-multi-cv` | 40,310 | 17,778 | 10,615 | 8,080 | 56% | 55% | 39,989 | 588 |
| `gb-msc_workos_work-mgmt_ugc_ugc_bam` | `gb-en-prm-workos-multi-cv` | 173,781 | 76,495 | 46,141 | 21,431 | 56% | 72% | 37,078 | 709 |
| `gbasc2_workos_work-mgmt_ugc_llama_j` | `gb-en-prm-workos-multi-cv` | 112,056 | 45,680 | 28,786 | 14,683 | 59% | 68% | 26,832 | 487 |
| `gb-msc_workos_work-mgmt_gif_llama_a` | `gb-en-prm-workos-multi-cv` | 295,237 | 142,610 | 86,745 | 64,900 | 52% | 54% | 26,741 | 375 |
| `gbasc2_workos_work-mgmt_ut_mcdonald` | `gb-en-prm-workos-multi-cv` | 65,324 | 21,522 | 13,840 | 9,138 | 67% | 58% | 23,648 | 429 |
| `gbasc2_workos_work-mgmt_video_dialo` | `gb-en-prm-workos-multi-cv` | 76,494 | 34,274 | 22,846 | 10,781 | 55% | 69% | 21,800 | 431 |
| `gbasc2_workos_work-mgmt_pd_llama_sk` | `gb-en-prm-workos-multi-cv` | 17,840 | 7,704 | 4,754 | 3,092 | 57% | 60% | 21,611 | 411 |
| `gb-en-prm-workos-multi-cvr_msc_ugc_` | `gb-en-prm-workos-multi-cv` | 246,710 | 100,414 | 47,103 | 28,425 | 59% | 72% | 19,789 | 221 |
| `gb-en-prm-workos-multi-cvr_asc-18-2` | `gb-en-prm-workos-multi-cv` | 217,180 | 119,421 | 53,331 | 30,491 | 45% | 74% | 19,651 | 290 |
| `gbasc2_workos_work-mgmt_video_logo-` | `gb-en-prm-workos-multi-cv` | 117,613 | 55,569 | 39,552 | 24,926 | 53% | 55% | 18,598 | 545 |
| `gbasc2_workos_work-mgmt_ugc_llama_m` | `gb-en-prm-workos-multi-cv` | 43,844 | 21,606 | 14,261 | 6,472 | 51% | 70% | 17,924 | 351 |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 59,414 | 19,288 | 11,202 | 5,675 | 68% | 71% | 16,794 | 289 |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 19,324 | 9,298 | 6,101 | 4,643 | 52% | 50% | 16,431 | 199 |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 151,517 | 125,527 | 108,069 | 14,098 | 17% | 89% | 16,238 | 160 |
| `gbasc2_workos_work-mgmt_ut_speaker2` | `gb-en-prm-workos-multi-cv` | 49,863 | 23,420 | 15,790 | 6,500 | 53% | 72% | 15,795 | 270 |
| `gbasc2_workos_work-mgmt_ugc_llama_g` | `gb-en-prm-workos-multi-cv` | 35,596 | 19,627 | 12,830 | 5,166 | 45% | 74% | 14,700 | 308 |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 70,359 | 33,587 | 20,104 | 11,962 | 52% | 64% | 14,442 | 284 |
| `gbasc2_workos_work-mgmt_gif_llama_a` | `gb-en-prm-workos-multi-cv` | 148,416 | 68,585 | 42,362 | 31,468 | 54% | 54% | 14,391 | 283 |
| `gbasc2_workos_crm_video_loop-view-t` | `gb-en-prm-workos-multi-cv` | 56,866 | 25,683 | 15,133 | 11,564 | 55% | 55% | 14,229 | 395 |
| `gb-msc-service-workos_service_video` | `gb-en-prm-workos-service-` | 104,685 | 69,951 | 57,512 | 24,648 | 33% | 65% | 13,584 | 138 |
| `gbasc2_workos_work-mgmt_pd_linear_e` | `gb-en-prm-workos-multi-cv` | 25,644 | 11,033 | 5,963 | 4,157 | 57% | 62% | 13,144 | 306 |
| `gb-en-prm-workos-multi-cvr_ugc_llam` | `gb-en-prm-workos-multi-cv` | 57,451 | 21,253 | 12,689 | 6,804 | 63% | 68% | 12,809 | 146 |
| `gbasc2_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 34,200 | 11,894 | 7,018 | 4,686 | 65% | 61% | 12,031 | 235 |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 128,536 | 82,706 | 50,011 | 26,033 | 36% | 69% | 11,841 | 221 |
| `gb-msc_workos_work-mgmt_ugc_bambass` | `gb-en-prm-workos-multi-cv` | 35,268 | 12,831 | 7,861 | 4,133 | 64% | 68% | 11,777 | 327 |
| `gbasc2_workos_crm_video_iris_en` | `gb-en-prm-workos-multi-cv` | 49,993 | 39,954 | 13,691 | 8,967 | 20% | 78% | 11,654 | 294 |

---

## 6. Cross-Channel Insights

### 6.1 Budget Distribution
- YouTube: £4,316,948 (39%)
- Meta: £6,808,612 (61%)

### 6.2 Product/Theme Coverage

**YouTube Themes:**

- work_mgmt: £2,328,420 spend, 354,212 DEP, 0.15 DEP/Spend
- workos: £924,700 spend, 44,343 DEP, 0.05 DEP/Spend
- crm: £518,010 spend, 13,035 DEP, 0.03 DEP/Spend
- service: £282,921 spend, 1,074 DEP, 0.00 DEP/Spend

**Meta Themes:**

- workos: £6,727,734 spend, 112,730 purchases, 18739.08 DEP
- multi: £47,008 spend, 2,847 purchases, 0.00 DEP
- service: £33,870 spend, 118 purchases, 96.27 DEP

---

## 7. YouTube Restructure Recommendations

### Campaign-Level Actions

| # | Priority | Campaign | Observation | Recommended Action | Est. Impact | Confidence | Effort |
|---|----------|----------|-------------|-------------------|-------------|------------|--------|
| 1 | 🟡 MED | `gb-en-prm-work_mgmt-desktop-agents_` | Below-average efficiency: 0.00 DEP/Spend on £3,997 | Audit ad groups, pause lowest DEP/Spend segments | Moderate improvement | Medium | Medium |
| 2 | 🟡 MED | `gb-en-prm-work_mgmt-desktop-topics_` | Below-average efficiency: 0.00 DEP/Spend on £3,053 | Audit ad groups, pause lowest DEP/Spend segments | Moderate improvement | Medium | Medium |
| 3 | 🟡 MED | `gb-en-prm-work_mgmt-desktop-agents_` | Below-average efficiency: 0.00 DEP/Spend on £3,935 | Audit ad groups, pause lowest DEP/Spend segments | Moderate improvement | Medium | Medium |
| 4 | 🔴 HIGH | `gb-en-prm-work_mgmt-desktop-lookali` | Active campaign, £72,441 spent, DEP/Spend only 0.01 | Pause or restructure. Review ad groups and creatives for poor performers | Significant savings | High | Medium |
| 5 | 🔴 HIGH | `gb-en-prm-work_mgmt-desktop-topics-` | Active campaign, £125,751 spent, DEP/Spend only 0.01 | Pause or restructure. Review ad groups and creatives for poor performers | Significant savings | High | Medium |
| 6 | 🔴 HIGH | `gb-en-prm-work_mgmt-desktop-persona` | Active campaign, £98,556 spent, DEP/Spend only 0.01 | Pause or restructure. Review ad groups and creatives for poor performers | Significant savings | High | Medium |
| 7 | 🔴 HIGH | `gb-en-prm-crm-desktop-main3-dg` | Active campaign, £54,393 spent, DEP/Spend only 0.02 | Pause or restructure. Review ad groups and creatives for poor performers | Significant savings | High | Medium |
| 8 | 🔴 HIGH | `gb-en-prm-work_mgmt-desktop-demandg` | Active campaign, £329,289 spent, DEP/Spend only 0.04 | Pause or restructure. Review ad groups and creatives for poor performers | Significant savings | High | Medium |
| 9 | 🟡 MED | `Ad: PD_WorkOS_21sec` | Hook failure: 64% drop P25→P50, only 16.9% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 10 | 🟡 MED | `Ad: PD_WorkOS_21sec_UK` | Hook failure: 66% drop P25→P50, only 14.3% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 11 | 🟡 MED | `Ad: PD_WorkOS_21sec` | Hook failure: 60% drop P25→P50, only 21.2% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 12 | 🟡 MED | `Ad: PD_WorkOS_21sec_UK` | Hook failure: 67% drop P25→P50, only 12.6% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 13 | 🟡 MED | `Ad: AT_NYwoman_Short` | Hook failure: 54% drop P25→P50, only 8.7% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 14 | 🟡 MED | `Ad: PD_WorkOS_21sec_UK` | Hook failure: 65% drop P25→P50, only 14.4% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 15 | 🟡 MED | `Ad: PD_WorkOS_21sec` | Hook failure: 67% drop P25→P50, only 14.2% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 16 | 🟡 MED | `Ad: CRMKnightUsingCRM` | Hook failure: 51% drop P25→P50, only 12.4% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 17 | 🟡 MED | `Ad: CRMDegreeAri` | Hook failure: 54% drop P25→P50, only 10.7% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 18 | 🟡 MED | `Ad: PD_POV_Dashboard_CRM` | Hook failure: 54% drop P25→P50, only 25.5% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 19 | 🟡 MED | `Ad: CRMKnightUsingCRM` | Hook failure: 54% drop P25→P50, only 9.4% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 20 | 🟡 MED | `Ad: PD_POV_Dashboard_CRM` | Hook failure: 57% drop P25→P50, only 22.0% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 21 | 🟡 MED | `Ad: CRMKnightUsingCRM` | Hook failure: 50% drop P25→P50, only 13.1% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 22 | 🟡 MED | `Ad: CRMKnightUsingCRM` | Hook failure: 57% drop P25→P50, only 8.6% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 23 | 🟡 MED | `Ad: PD_WorkOS_21sec_UK` | Hook failure: 69% drop P25→P50, only 10.8% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 24 | 🟡 MED | `Ad: AT_Shmuel_NewSplit` | Hook failure: 52% drop P25→P50, only 7.9% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 25 | 🟡 MED | `Ad: PD_WorkOS_21sec` | Hook failure: 53% drop P25→P50, only 6.6% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 26 | 🟡 MED | `Ad: PD_WorkOS_21sec` | Hook failure: 50% drop P25→P50, only 35.2% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 27 | 🟡 MED | `Ad: PD_POV_Dashboard_CRM` | Hook failure: 56% drop P25→P50, only 25.7% complete | Re-edit hook in first 5 seconds | Better engagement | Medium | Medium |
| 28 | 🟡 MED | `Ad: CR_MakesSense_Short` | Creative fatigue: completion dropped 15% (from 15.8% to 13.4%) | Refresh creative or rotate new variant | Restore engagement | Medium | Medium |
| 29 | 🟡 MED | `Ad: PD_Zen_Short_Service` | Creative fatigue: completion dropped 14% (from 30.7% to 26.5%) | Refresh creative or rotate new variant | Restore engagement | Medium | Medium |
| 30 | 🟡 MED | `All Campaigns` | Connected TV: £53,933 spent, DEP/Spend: 0.02 | If CTV DEP/Spend is below desktop, consider reducing CTV bid adjustments | Reallocate budget | Medium | Low |
| 31 | 🟡 MED | `All Campaigns` | Hour 18:00 has worst DEP/Spend (0.08) vs best 2:00 (0.20) | Implement ad schedule bid adjustments: reduce bids 18:00-20:00 | Better hour allocation | Medium | Low |
| 32 | 🟢 LOW | `All Campaigns` | WEDNESDAY worst day (0.10) vs SATURDAY best (0.12) | Day-of-week bid modifiers: +15% SATURDAY, -10% WEDNESDAY | Incremental gain | Medium | Low |

## 8. Meta Restructure Recommendations

| # | Priority | Campaign/Ad | Observation | Recommended Action | Est. Impact | Confidence | Effort |
|---|----------|-------------|-------------|-------------------|-------------|------------|--------|
| 1 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_s` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 2 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_v` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 3 | 🟡 MED | `Ad: gb-msc-crm_workos_crm_sta` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 4 | 🟡 MED | `Ad: gb-msc-crm_workos_crm_sta` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 5 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_s` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 6 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 7 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_v` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 8 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_u` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 9 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_s` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 10 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 11 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 12 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 13 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 14 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_s` | Very low video hold rate (7% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 15 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 16 | 🟡 MED | `Ad: gb-msc-service-workos_ser` | Very low video hold rate (9% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 17 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 18 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 19 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_u` | Very low video hold rate (10% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 20 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (9% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 21 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 22 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_u` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 23 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 24 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_s` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 25 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_s` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 26 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_s` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 27 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_u` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 28 | 🟡 MED | `Ad: gb-msc_workos_work-mgmt_u` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 29 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_s` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 30 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_u` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 31 | 🟡 MED | `Ad: gbasc2_workos_work-mgmt_s` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 32 | 🟡 MED | `Ad: gb-msc-crm_workos_crm_ugc` | Very low video hold rate (5% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 33 | 🟡 MED | `Ad: gb-msc-crm_workos_crm_sta` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 34 | 🟡 MED | `Ad: gb-msc-crm_workos_crm_sta` | Very low video hold rate (9% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 35 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 36 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 37 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 38 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 39 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 40 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (14% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 41 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 42 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 43 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 44 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (12% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 45 | 🟡 MED | `Ad: gb-msc-crm-uitest_workos_` | Very low video hold rate (13% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 46 | 🟡 MED | `Ad: gb-msc-crm-uitest_workos_` | Very low video hold rate (10% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 47 | 🟡 MED | `Ad: gb-msc-crm-uitest_workos_` | Very low video hold rate (11% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 48 | 🟡 MED | `Ad: gb-en-prm-workos-multi-cv` | Very low video hold rate (15% P25→P100) | Creative needs re-edit: stronger hook and tighter narrative | Better engagement | Medium | Medium |
| 49 | 🟡 MED | `Placement: audience_network/rewarde` | £6,831 spent with 0 DEP | Consider excluding this placement or reducing budget | Reduce waste | Medium | Low |

---

## 9. Flagged Items & Caveats

### Data Quality Issues

1. **Meta DEP values are fractional/normalized** — `action_values` for `purchase` returns values like 0.01, 0.11, not £ amounts. This means Meta DEP/Spend ratios cannot be directly compared to YouTube. Likely these are attribution-weighted fractional values, or the offline conversion value upload is using a different scale.
2. **YouTube `conversionsValue` scale** — appears to be raw counts (10, 140, 2400) rather than £ revenue. This may be DEP event counts rather than attributed revenue. Verify with the data team what `conversions_value` actually represents.
3. **Geographic data uses Geo Target Constant IDs, not city names** — the `segments.geoTargetCity` column contains IDs like `geoTargetConstants/1007835`, not human-readable names. A lookup table is needed to map to actual cities.
4. **Audience data is at ad-group level, not segment level** — the audience CSV maps to ad group names (e.g., `IndustryTechnology_EM-MultiAds`) which embed the audience strategy in the naming convention, but we don't have per-audience-segment breakdowns.
5. **Meta placement data doesn't have action_values for all rows** — 212 out of 500 placement rows have no DEP data, making per-placement DEP analysis incomplete.
6. **No ad creative assets** — we have ad names but not the actual video files, thumbnails, or copy. Creative analysis is based on performance signals (completion rates, CTR) only.
7. **No conversion lag data** — DEP_7 implies a 7-day attribution window. We don't have conversion-lag reports to know if recent months' data is still incomplete.

### What We Couldn't Analyze

1. **Cross-channel attribution overlap** — no data on user overlap between YouTube and Meta
2. **Landing page performance** — no post-click data beyond platform conversions
3. **Audience composition details** — audience segment definitions not in the data
4. **A/B test history** — no experiment metadata
5. **Budget/bid caps** — actual target CPA/ROAS settings not in the data
6. **Frequency capping** — YouTube frequency data not available in these exports
7. **Meta ASC/Advantage+ identification** — campaign names don't clearly indicate ASC; need account-level settings

---

## ADDENDUM A: Critical Data Finding — DEP Value Multipliers

> **⚠️ CRITICAL:** The `conversionsValue` field uses different multipliers per campaign. Offline conversion value uploads assigned different DEP values:
> - **1x campaigns** (value = count): Most DG work_mgmt campaigns — DEP appears artificially low
> - **10x campaigns** (value = 10 × count): CRM DG campaigns, most Video Action campaigns, brand campaigns
> - **100x campaigns** (value = 100 × count): employment-v, ron-v, inmarket-v, new_topics-v
>
> **This means raw DEP/Spend ratios are NOT comparable across campaigns.** Below we normalize to conversion COUNT for fair comparison.

### Campaign Multiplier Map

| Campaign | Multiplier | Type |
|----------|-----------|------|
| `gb-en-brand-multi-ctv-expanded-t-regional_awareness_uk_25q1` | 10x | Other |
| `gb-en-brand-multi-desktop-expanded-t-regional_awareness_uk_25q1` | 10x | Other |
| `gb-en-brand-multi-mobile-expanded-t-regional_awareness_uk_25q1` | 10x | Other |
| `gb-en-brand-multi-mobile-expanded_shorts-t-regional_awareness_uk_25q1` | 10x | Other |
| `gb-en-brand-work_mgmt-desktop-expanded-t-360_uk_24q4` | 10x | Other |
| `gb-en-brand-work_mgmt-desktop-expanded-t-regional_awareness_london_24q4` | 10x | Other |
| `gb-en-brand-work_mgmt-mobile-core-t-regional_awareness_london_24q4` | 10x | Other |
| `gb-en-brand-work_mgmt-mobile-expanded-t-360_uk_24q4` | 10x | Other |
| `gb-en-brand-work_mgmt-mobile-expanded-t-regional_awareness_london_24q4` | 10x | Other |
| `gb-en-brand-work_mgmt-multi-trgt-t-cpm-bumper-regional_awareness-uk-25q4` | 1x | Other |
| `gb-en-brand-work_mgmt-multi-trgt-t-cpm-regional_awareness-uk-25q4` | 1x | Other |
| `gb-en-brand-work_mgmt-multi-trgt-t-cpv-regional_awareness-uk-25q4` | 1x | Other |
| `gb-en-prm-crm-desktop-broad-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-lookalike-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-lookalike1-dg` | 1x | DG |
| `gb-en-prm-crm-desktop-main-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-main2-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-main3-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-ron-dg` | 10x | DG |
| `gb-en-prm-crm-desktop-ron1-dg` | 10x | DG |
| `gb-en-prm-service-desktop-competitors-dg` | 1x | DG |
| `gb-en-prm-service-desktop-trgt-dg` | 1x | DG |
| `gb-en-prm-service-desktop-trgt1-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-agents_audience-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-agents_contextual-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-competitors-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-demandgen-v` | 10x | V |
| `gb-en-prm-work_mgmt-desktop-employment-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-employment-v` | 100x | V |
| `gb-en-prm-work_mgmt-desktop-inmarket-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-inmarket-v` | 100x | V |
| `gb-en-prm-work_mgmt-desktop-lookalike-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-new_topics-v` | 100x | V |
| `gb-en-prm-work_mgmt-desktop-personas-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-ron-v` | 100x | V |
| `gb-en-prm-work_mgmt-desktop-ron_instream-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-ron_regular-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-topics-dg` | 1x | DG |
| `gb-en-prm-work_mgmt-desktop-topics-t` | 1x | Other |
| `gb-en-prm-work_mgmt-desktop-topics_new-dg` | 1x | DG |
| `gb-en-prm-workos-crm-ctv-trgt-dg` | 6x | DG |
| `gb-en-prm-workos-crm-desktop-competitors-dg` | 10x | DG |
| `gb-en-prm-workos-crm-desktop-topics_cpm-t` | 10x | Other |
| `gb-en-prm-workos-crm-desktop-trgt-dg` | 10x | DG |
| `gb-en-prm-workos-crm-desktop-verticals-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-employment-v` | 100x | V |
| `gb-en-prm-workos-work_mgmt-desktop-pm_dlu-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-sqa-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-topics-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-topics_freqcap-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-topics_productivity-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-trgt_monday-v` | 10x | V |
| `gb-en-prm-workos-work_mgmt-desktop-trgt_monday_freqcap-v` | 10x | V |

### Normalized Campaign Efficiency (by Conversion Count — Non-Brand)

| Rank | Campaign | Type | Spend £ | Conversions | Cost/Conv | Months | Status |
|------|----------|------|---------|-------------|-----------|--------|--------|
| 1 | `gb-en-prm-crm-desktop-lookalike1-dg` | DG | 2,998 | 19 | £155 | 1 | PAUSED |
| 2 | `gb-en-prm-workos-work_mgmt-desktop-topics_freqcap-v` | V | 20,967 | 126 | £166 | 3 | REMOVED |
| 3 | `gb-en-prm-work_mgmt-desktop-personas-dg` | DG | 98,556 | 592 | £167 | 5 | ENABLED |
| 4 | `gb-en-prm-work_mgmt-desktop-topics-dg` | DG | 125,751 | 728 | £173 | 12 | ENABLED |
| 5 | `gb-en-prm-work_mgmt-desktop-lookalike-dg` | DG | 72,441 | 401 | £181 | 5 | ENABLED |
| 6 | `gb-en-prm-service-desktop-trgt1-dg` | DG | 44,854 | 247 | £181 | 2 | PAUSED |
| 7 | `gb-en-prm-workos-work_mgmt-desktop-topics-v` | V | 236,110 | 1,169 | £202 | 14 | REMOVED |
| 8 | `gb-en-prm-work_mgmt-desktop-inmarket-dg` | DG | 20,641 | 100 | £206 | 2 | PAUSED |
| 9 | `gb-en-prm-workos-crm-desktop-verticals-v` | V | 256,181 | 1,236 | £207 | 13 | REMOVED |
| 10 | `gb-en-prm-work_mgmt-desktop-employment-dg` | DG | 195,860 | 905 | £216 | 9 | PAUSED |
| 11 | `gb-en-prm-work_mgmt-desktop-demandgen-v` | V | 329,289 | 1,506 | £219 | 11 | ENABLED |
| 12 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday-v` | V | 36,709 | 166 | £221 | 9 | REMOVED |
| 13 | `gb-en-prm-workos-work_mgmt-desktop-sqa-v` | V | 5,934 | 26 | £228 | 3 | REMOVED |
| 14 | `gb-en-prm-work_mgmt-desktop-agents_audience-dg` | DG | 3,935 | 17 | £233 | 1 | ENABLED |
| 15 | `gb-en-prm-service-desktop-competitors-dg` | DG | 144,875 | 607 | £239 | 5 | PAUSED |
| 16 | `gb-en-prm-work_mgmt-desktop-ron-v` | V | 607,468 | 2,505 | £243 | 12 | REMOVED |
| 17 | `gb-en-prm-work_mgmt-desktop-topics_new-dg` | DG | 3,053 | 12 | £254 | 1 | ENABLED |
| 18 | `gb-en-prm-work_mgmt-desktop-agents_contextual-dg` | DG | 3,997 | 15 | £260 | 1 | ENABLED |
| 19 | `gb-en-prm-work_mgmt-desktop-employment-v` | V | 212,289 | 813 | £261 | 6 | REMOVED |
| 20 | `gb-en-prm-workos-work_mgmt-desktop-topics_productivity-v` | V | 28,562 | 87 | £328 | 3 | REMOVED |
| 21 | `gb-en-prm-crm-desktop-lookalike-dg` | DG | 37,333 | 113 | £330 | 8 | PAUSED |
| 22 | `gb-en-prm-crm-desktop-ron1-dg` | DG | 48,528 | 141 | £345 | 4 | PAUSED |
| 23 | `gb-en-prm-crm-desktop-ron-dg` | DG | 167,583 | 453 | £370 | 5 | PAUSED |
| 24 | `gb-en-prm-work_mgmt-desktop-ron_regular-dg` | DG | 483,070 | 1,298 | £372 | 11 | PAUSED |
| 25 | `gb-en-prm-workos-work_mgmt-desktop-pm_dlu-v` | V | 2,613 | 7 | £373 | 2 | REMOVED |
| 26 | `gb-en-prm-work_mgmt-desktop-ron_instream-dg` | DG | 122,877 | 329 | £374 | 4 | PAUSED |
| 27 | `gb-en-prm-crm-desktop-main-dg` | DG | 8,972 | 23 | £388 | 1 | PAUSED |
| 28 | `gb-en-prm-workos-crm-desktop-trgt-dg` | DG | 169,099 | 429 | £395 | 8 | PAUSED |
| 29 | `gb-en-prm-work_mgmt-desktop-new_topics-v` | V | 13,587 | 34 | £400 | 3 | REMOVED |
| 30 | `gb-en-prm-crm-desktop-main2-dg` | DG | 179,418 | 444 | £404 | 4 | PAUSED |
| 31 | `gb-en-prm-service-desktop-trgt-dg` | DG | 93,193 | 220 | £423 | 5 | PAUSED |
| 32 | `gb-en-prm-workos-crm-ctv-trgt-dg` | DG | 12,623 | 29 | £442 | 5 | PAUSED |
| 33 | `gb-en-prm-work_mgmt-desktop-competitors-dg` | DG | 15,135 | 33 | £457 | 2 | PAUSED |
| 34 | `gb-en-prm-work_mgmt-desktop-topics-t` | Other | 12,406 | 25 | £494 | 2 | PAUSED |
| 35 | `gb-en-prm-crm-desktop-main3-dg` | DG | 54,393 | 103 | £528 | 2 | ENABLED |
| 36 | `gb-en-prm-workos-work_mgmt-desktop-employment-v` | V | 56,281 | 101 | £557 | 3 | REMOVED |
| 37 | `gb-en-prm-workos-work_mgmt-desktop-trgt_monday_freqcap-v` | V | 2,288 | 4 | £572 | 1 | REMOVED |
| 38 | `gb-en-prm-workos-crm-desktop-competitors-dg` | DG | 78,937 | 134 | £589 | 5 | PAUSED |
| 39 | `gb-en-prm-workos-crm-desktop-topics_cpm-t` | Other | 18,395 | 28 | £657 | 8 | PAUSED |
| 40 | `gb-en-prm-work_mgmt-desktop-inmarket-v` | V | 8,065 | 11 | £733 | 3 | REMOVED |
| 41 | `gb-en-prm-crm-desktop-broad-dg` | DG | 18,787 | 25 | £751 | 1 | PAUSED |

### Campaign Type Comparison (Normalized)

| Campaign Type | # Campaigns | Total Spend £ | Total Conversions | Cost/Conversion | Conv/£1K Spend |
|--------------|-------------|--------------|-------------------|----------------|---------------|
| Video Action | 14 | 1,816,344 | 7,791 | £233 | 4.3 |
| DemandGen | 25 | 2,206,907 | 7,416 | £298 | 3.4 |
| TrueView/CPM | 2 | 30,801 | 53 | £580 | 1.7 |

### Product Theme Efficiency (Normalized)

| Product Theme | Spend £ | Conversions | Cost/Conv | Conv/£1K |
|--------------|---------|-------------|-----------|----------|
| Work Management | 2,717,885 | 11,009 | £247 | 4.1 |
| CRM | 1,053,245 | 3,176 | £332 | 3.0 |
| Service | 282,921 | 1,074 | £263 | 3.8 |

### Enabled Campaign Specific Actions

These are the campaigns currently ENABLED that need immediate attention:

#### `gb-en-prm-crm-desktop-main3-dg` [DG] — £54,393 spend, 103 conv, £528/conv

**🔴 HIGH PRIORITY:** Cost/conversion is £528 — well above target. Recommend pausing or restructuring.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `ExcludingDefault_RON-MultiAds` | 22,053 | 43 | £515 | 1,995,240 |
| `LookalikeHigh_CRM_L` | 13,989 | 32 | £434 | 1,602,971 |
| `Lookalike_CRM_L` | 6,298 | 9 | £699 | 590,860 |
| `CompBig_CRM_CA` | 5,021 | 7 | £717 | 318,885 |
| `Employment_CRM_EM` | 4,010 | 7 | £572 | 270,369 |
| `SQA_CRM_S` | 1,110 | 2 | £555 | 43,859 |
| `Competitors_CRM_M` | 976 | 2 | £488 | 33,639 |
| `Keywords_CRM_KW` | 536 | 0 | ∞ | 12,774 |
| `Topics_CRM_T` | 400 | 1 | £400 | 8,392 |

#### `gb-en-prm-work_mgmt-desktop-agents_contextual-dg` [DG] — £3,997 spend, 15 conv, £260/conv

**🔴 HIGH PRIORITY:** Cost/conversion is £260 — well above target. Recommend pausing or restructuring.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `Agents_KW-MultiAds` | 2,428 | 11 | £214 | 63,856 |
| `AI_T-MultiAds` | 1,116 | 3 | £372 | 43,760 |
| `DevTools_T-MultiAds` | 319 | 1 | £319 | 15,306 |
| `Marketing_SMMarketing_T-MultiAds` | 133 | 0 | ∞ | 6,826 |

#### `gb-en-prm-work_mgmt-desktop-topics_new-dg` [DG] — £3,053 spend, 12 conv, £254/conv

**🔴 HIGH PRIORITY:** Cost/conversion is £254 — well above target. Recommend pausing or restructuring.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `EnterpriseTechnology_T-MultiAds` | 2,245 | 9 | £249 | 70,247 |
| `HumanResources_T-MultiAds` | 577 | 2 | £289 | 21,425 |
| `Consulting_T-MultiAds` | 120 | 1 | £120 | 4,218 |
| `BusinessPlans&Presentations_T-MultiAds` | 110 | 0 | ∞ | 2,787 |

#### `gb-en-prm-work_mgmt-desktop-agents_audience-dg` [DG] — £3,935 spend, 17 conv, £233/conv

**🔴 HIGH PRIORITY:** Cost/conversion is £233 — well above target. Recommend pausing or restructuring.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `CompAgents_CA-MultiAds` | 2,473 | 15 | £163 | 142,481 |
| `CompAi_CA-MultiAds` | 1,205 | 1 | £1,181 | 83,173 |
| `WorkAgents_S-MultiAds` | 148 | 0 | £15,376 | 6,099 |
| `AgentsBuilder_S-MultiAds` | 64 | 0 | ∞ | 3,199 |
| `MarketingAgents_S-MultiAds` | 44 | 1 | £62 | 2,104 |

#### `gb-en-prm-work_mgmt-desktop-demandgen-v` [V] — £329,289 spend, 1,506 conv, £219/conv

**🔴 HIGH PRIORITY:** Cost/conversion is £219 — well above target. Recommend pausing or restructuring.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `HardSU_DG-MultiAds` | 117,207 | 554 | £212 | 7,148,069 |
| `EntQE_DG-MultiAds` | 95,552 | 515 | £186 | 6,200,328 |
| `Payers_DG-MultiAds` | 65,420 | 266 | £246 | 4,109,993 |
| `QE_DG-MultiAds` | 51,110 | 171 | £299 | 3,010,488 |

#### `gb-en-prm-work_mgmt-desktop-lookalike-dg` [DG] — £72,441 spend, 401 conv, £181/conv

**🟡 MEDIUM PRIORITY:** Cost/conversion is £181 — above target range.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `QE_L` | 41,952 | 211 | £199 | 6,085,513 |
| `Payers_L` | 26,144 | 165 | £159 | 3,096,044 |
| `HardSU_L` | 4,345 | 25 | £172 | 535,756 |

#### `gb-en-prm-work_mgmt-desktop-topics-dg` [DG] — £125,751 spend, 728 conv, £173/conv

**🟡 MEDIUM PRIORITY:** Cost/conversion is £173 — above target range.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `BusinessProductivitySoftware_T-MultiAds` | 31,769 | 151 | £210 | 1,033,926 |
| `Mgmt_ProjectManagement_T-MultiAds` | 26,777 | 150 | £178 | 349,876 |
| `BussP_ProjectManagement_T-MultiAds` | 22,755 | 131 | £174 | 260,601 |
| `TopWorkManagementSEM_S-MultiAds` | 16,660 | 76 | £220 | 708,824 |
| `mondayProjectManagement_S-MultiAds` | 15,679 | 132 | £118 | 475,782 |
| `BussP_Spreadsheet_T-MultiAds` | 5,001 | 31 | £160 | 140,460 |
| `Management_T-MultiAds` | 4,033 | 29 | £140 | 125,145 |
| `mondayProjectManagement_KW-MultiAds` | 3,077 | 27 | £112 | 13,830 |

#### `gb-en-prm-work_mgmt-desktop-personas-dg` [DG] — £98,556 spend, 592 conv, £167/conv

**🟡 MEDIUM PRIORITY:** Cost/conversion is £167 — above target range.

| Ad Group | Spend £ | Conv | Cost/Conv | Imp |
|----------|---------|------|-----------|-----|
| `Audience_ProjectManagement_M` | 60,073 | 352 | £171 | 4,251,277 |
| `Audience_Marketing_M` | 21,841 | 124 | £175 | 1,508,261 |
| `Contextual_ProjectManagement_M` | 14,007 | 93 | £151 | 977,073 |
| `Contextual_Marketing_M` | 2,635 | 22 | £119 | 200,456 |

### Additional YouTube Recommendations (Normalized)

| # | Priority | Area | Observation | Action |
|---|----------|------|-------------|--------|
| 1 | 🔴 CRITICAL | Campaign Type | DemandGen campaigns have significantly higher cost/conv than Video Action. DG: £298/conv vs V: £233/conv on normalized basis. However DG campaigns run different audience strategies — this gap may be targeting-dependent, not format-dependent. | Compare same-audience DG vs V head-to-head before scaling back DG. Test converting best DG audiences to Video Action format. |
| 2 | 🔴 CRITICAL | Data Integrity | 16 DG campaigns have 1x DEP multiplier (DEP = conversion count). All other campaigns have 10x or 100x. This may indicate these campaigns don't have proper offline conversion value uploads. | Verify offline conversion upload configuration for all DG work_mgmt campaigns. Missing value uploads means the platform can't optimize for revenue. |
| 3 | 🟡 MED | `gb-en-prm-service-desktop-trgt1-dg` | Paused with 247 conversions at £181/conv — was this intentionally paused? | Review if this campaign was paused for budget reasons vs performance. If budget-constrained, consider reactivation. |
| 4 | 🟡 MED | `gb-en-prm-work_mgmt-desktop-inmarke` | Paused with 100 conversions at £206/conv — was this intentionally paused? | Review if this campaign was paused for budget reasons vs performance. If budget-constrained, consider reactivation. |
| 5 | 🟡 MED | `gb-en-prm-work_mgmt-desktop-employm` | Paused with 905 conversions at £216/conv — was this intentionally paused? | Review if this campaign was paused for budget reasons vs performance. If budget-constrained, consider reactivation. |
| 6 | 🟡 MED | `gb-en-prm-service-desktop-competito` | Paused with 607 conversions at £239/conv — was this intentionally paused? | Review if this campaign was paused for budget reasons vs performance. If budget-constrained, consider reactivation. |
| 7 | 🟡 MED | `gb-en-prm-crm-desktop-lookalike-dg` | Paused with 113 conversions at £330/conv — was this intentionally paused? | Review if this campaign was paused for budget reasons vs performance. If budget-constrained, consider reactivation. |
| 8 | 🔴 HIGH | `gb-en-prm-crm-desktop-main3-dg` | Enabled, £54,393 spend at £528/conv | Immediate audit needed. Pause lowest-performing ad groups within this campaign. |
