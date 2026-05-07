# Agentic Performance Marketing — System Architecture

**Author:** Nymeria 🐺 | **Date:** 2026-05-07 | **Status:** DRAFT v1
**For:** Guy Regev, Ido, Marketing X1000 team
**Review:** Open for feedback

---

## Table of Contents

1. [Vision & Principles](#1-vision--principles)
2. [The 4 Ducks as System DNA](#2-the-4-ducks-as-system-dna)
3. [Data Architecture](#3-data-architecture)
4. [Agent Architecture](#4-agent-architecture)
5. [Autonomy Levels & Guardrails](#5-autonomy-levels--guardrails)
6. [Audit & Monitoring](#6-audit--monitoring)
7. [UI / Dashboard](#7-ui--dashboard)
8. [Implementation Roadmap](#8-implementation-roadmap)

---

## 1. Vision & Principles

### What We're Building

An autonomous system that **sees the full funnel** (from ad impression to paying customer), **identifies opportunities and problems**, **decides what to fix**, **acts on it**, and **learns from results** — across Google, Meta, LinkedIn, YouTube, and any future channel.

### Design Principles

| # | Principle | What It Means |
|---|-----------|---------------|
| 🎯 | **Funnel-first, not channel-first** | Every decision traces back to the full funnel (Audience → Ad → LP → Product). No isolated channel optimization. |
| 🦆 | **4 Ducks alignment** | Roy's framework is the scoring backbone. All 4 ducks must swim together — optimizing one at the expense of another is a bug, not a feature. |
| 📊 | **Query, don't hoard** | The BI team is building a DWT mart. We query it on-demand with focused questions rather than syncing bulk datasets to a local DB. Local storage only for computed results (scores, recommendations, audit logs). |
| 🤖 | **Autonomy is earned** | Agents start in advisory mode (recommend → human approves). As confidence grows per action type, autonomy expands. Never all-or-nothing. |
| 🔍 | **Every change is auditable** | If an agent changes a bid, pauses a campaign, or swaps a creative — there's a timestamped, explainable record. |
| 🧠 | **One brain, many hands** | One strategic orchestrator that understands the full picture. Specialized workers that execute. Not 18 independent agents with 18 opinions. |

---

## 2. The 4 Ducks as System DNA

The 4 Ducks framework from Roy Mann is the scoring and alignment engine for the entire system.

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE FULL FUNNEL (per channel)                 │
│                                                                 │
│  🦆 AUDIENCE     🦆 AD           🦆 LANDING PAGE   🦆 PRODUCT   │
│  ┌───────────┐   ┌───────────┐   ┌──────────────┐  ┌─────────┐ │
│  │ Who sees  │──▶│ What they │──▶│ Where they   │─▶│ What    │ │
│  │ the ad?   │   │ see       │   │ land         │  │ they get│ │
│  ├───────────┤   ├───────────┤   ├──────────────┤  ├─────────┤ │
│  │ Targeting │   │ CTR       │   │ CVR to signup│  │ 2nd-day │ │
│  │ Overlap   │   │ Relevance │   │ Bounce rate  │  │ Paying  │ │
│  │ Reach     │   │ Thumb-stop│   │ Speed        │  │ ACV     │ │
│  │ Intent    │   │ Hook rate │   │ Message match│  │ Churn   │ │
│  └───────────┘   └───────────┘   └──────────────┘  └─────────┘ │
│                                                                 │
│  ────────── ALIGNMENT SCORE (0-100) per funnel path ──────────  │
│  Misalignment = agents investigate. Aligned + low = scale.      │
└─────────────────────────────────────────────────────────────────┘
```

**Key insight:** The system doesn't optimize individual metrics. It optimizes **alignment across all 4 ducks**. A funnel where the ad promises CRM but the LP shows project management is broken — even if CTR is high.

---

## 3. Data Architecture

### 3.1 Data Strategy: Query-First

```
┌──────────────────────────────────────────────────────────────────┐
│                        DATA LANDSCAPE                            │
│                                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────────┐│
│  │ CHANNEL APIs │  │  DWT MART    │  │  AGENT LOCAL STORE       ││
│  │ (live ops)   │  │  (BI team)   │  │  (computed state)        ││
│  ├─────────────┤  ├──────────────┤  ├──────────────────────────┤│
│  │ Google Ads  │  │ Campaign     │  │ Duck scores (computed)   ││
│  │ Meta Ads    │  │ metrics      │  │ Recommendations          ││
│  │ LinkedIn    │  │ Funnel data  │  │ Audit log                ││
│  │ YouTube     │  │ (signup →    │  │ Agent decisions           ││
│  │             │  │  hard_signup →│  │ Experiment results       ││
│  │             │  │  engaged →   │  │ Alignment scores         ││
│  │             │  │  paying)     │  │ Change history           ││
│  │             │  │ Attribution  │  │ Cached analysis          ││
│  ├─────────────┤  ├──────────────┤  ├──────────────────────────┤│
│  │ USE: Write  │  │ USE: Read    │  │ USE: Read/Write          ││
│  │ changes to  │  │ funnel &     │  │ agent state,             ││
│  │ campaigns,  │  │ product data │  │ decisions,               ││
│  │ bids, ads   │  │ via endpoint │  │ cached computations      ││
│  └─────────────┘  └──────────────┘  └──────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 What Goes Where

| Data Type | Source | Access Pattern | Store Locally? |
|-----------|--------|----------------|----------------|
| Campaign structure (campaigns, ad groups, ads, creatives) | Channel APIs (Google, Meta, etc.) | On-demand queries | ❌ No — query live |
| Campaign metrics (impressions, clicks, cost, CTR) | DWT mart endpoint | On-demand, with date ranges | ❌ No — query from mart |
| Funnel metrics (signup → hard signup → engaged → paying) | DWT mart endpoint | On-demand, with date ranges | ❌ No — query from mart |
| Attribution data (which campaign → which revenue) | DWT mart endpoint | On-demand | ❌ No — query from mart |
| Duck alignment scores | Computed by agents | After each analysis cycle | ✅ Yes — agent output |
| Recommendations & decisions | Generated by agents | Per analysis cycle | ✅ Yes — audit trail |
| Change audit log | Generated on every write | Append-only | ✅ Yes — compliance |
| Experiment results (A/B tests, before/after) | Computed by agents from mart data | After experiment period | ✅ Yes — learning history |
| LP content analysis (scraped, scored) | Agent scraping + LLM | Periodic refresh | ✅ Yes — cached 7 days |

### 3.3 Why Query-First Beats Local DB

| Concern | Bulk sync to local DB | Query DWT mart on-demand |
|---------|----------------------|--------------------------|
| **Freshness** | Stale by design (last sync) | Always current |
| **Maintenance** | Schema drift, sync failures, row counts | BI team owns the mart |
| **Storage** | Growing DB, backups, migrations | Minimal (only agent outputs) |
| **Complexity** | ETL pipelines, dedup, joins | Clean SQL endpoint |
| **Scale** | Every channel × every metric × daily = explosion | Ask only what you need |
| **Analysis depth** | Limited by what you synced | Full mart available |

**Exception:** When the BI mart isn't ready yet for a specific data point, the agent can query the channel API directly as a fallback — but this should be the exception, not the architecture.

### 3.4 Data Access Flow

```
                Agent needs data
                      │
                      ▼
              ┌───────────────┐
              │ What kind of  │
              │ question?     │
              └───────┬───────┘
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ Funnel / │ │ Campaign │ │ Agent's  │
    │ Product  │ │ Ops      │ │ Own      │
    │ metrics  │ │ (bids,   │ │ history  │
    │          │ │ status,  │ │          │
    │          │ │ creative)│ │          │
    └────┬─────┘ └────┬─────┘ └────┬─────┘
         │            │            │
         ▼            ▼            ▼
    ┌──────────┐ ┌──────────┐ ┌──────────┐
    │ DWT Mart │ │ Channel  │ │ Local    │
    │ Endpoint │ │ APIs     │ │ Store    │
    └──────────┘ └──────────┘ └──────────┘
```

---

## 4. Agent Architecture

### 4.1 The Hierarchy: Strategist → Specialists → Executors

Not 18 agents with overlapping concerns. **Three clean layers:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    LAYER 1: THE STRATEGIST                       │
│                    ═══════════════════════                       │
│                                                                 │
│              ┌─────────────────────────────┐                    │
│              │     🧠 FUNNEL STRATEGIST     │                    │
│              │                             │                    │
│              │  • Sees ALL channels        │                    │
│              │  • Owns the priority queue   │                    │
│              │  • Allocates budget          │                    │
│              │  • Decides what to fix next  │                    │
│              │  • Scores 4-duck alignment   │                    │
│              │  • Escalates to humans       │                    │
│              └──────────┬──────────────────┘                    │
│                         │                                       │
│              Delegates targeted tasks                           │
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │                                       │
│              LAYER 2: SPECIALISTS (by duck)                     │
│              ═════════════════════════════                       │
│                         │                                       │
│    ┌────────────────────┼────────────────────┐                  │
│    │          ┌─────────┼─────────┐          │                  │
│    ▼          ▼         ▼         ▼          ▼                  │
│ ┌────────┐┌────────┐┌────────┐┌────────┐┌────────┐             │
│ │🦆      ││🦆      ││🦆      ││🦆      ││📊      │             │
│ │AUDIENCE││AD      ││LP      ││PRODUCT ││CROSS-  │             │
│ │ANALYST ││ANALYST ││ANALYST ││ANALYST ││FUNNEL  │             │
│ │        ││        ││        ││        ││ANALYST │             │
│ ├────────┤├────────┤├────────┤├────────┤├────────┤             │
│ │Overlap ││Creative││Page    ││Onboard ││Cohort  │             │
│ │Reach   ││Copy    ││Speed   ││Engage  ││Attrib  │             │
│ │Intent  ││Format  ││Message ││Convert ││Trends  │             │
│ │Segment ││Fatigue ││UX      ││Retain  ││Anomaly │             │
│ └───┬────┘└───┬────┘└───┬────┘└───┬────┘└───┬────┘             │
│     │         │         │         │         │                   │
├─────┼─────────┼─────────┼─────────┼─────────┼───────────────────┤
│     │         │         │         │         │                   │
│     │   LAYER 3: EXECUTORS (channel-specific)                   │
│     │   ═════════════════════════════════════                   │
│     │                                                           │
│     ▼         ▼         ▼         ▼         ▼                   │
│ ┌──────────────────────────────────────────────┐                │
│ │  Channel Writers (one per platform API)      │                │
│ │  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│                │
│ │  │ Google │ │ Meta   │ │LinkedIn│ │ Reddit ││                │
│ │  │ Writer │ │ Writer │ │ Writer │ │ Writer ││                │
│ │  └────────┘ └────────┘ └────────┘ └────────┘│                │
│ │  • Execute approved changes                  │                │
│ │  • Report results back                       │                │
│ │  • Respect rate limits                       │                │
│ │  • Log every mutation                        │                │
│ └──────────────────────────────────────────────┘                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Agent Responsibilities

#### 🧠 Funnel Strategist (Layer 1 — ONE agent)

The brain. Runs periodically (daily analysis + triggered on anomalies).

| Responsibility | Details |
|----------------|---------|
| **Full-funnel scoring** | Queries DWT mart for all channels. Computes 4-duck alignment scores per funnel path (channel → campaign → ad group). |
| **Priority queue** | Ranks opportunities by impact: "This Meta campaign has 10K clicks but 0.3% LP CVR — fixing the LP could yield 200+ more signups/week." |
| **Budget allocation** | Recommends shifting budget between channels/campaigns based on TROI (True ROI, not just ROAS). |
| **Delegation** | Assigns specific investigation tasks to Layer 2 specialists: "Audience Analyst — check overlap between campaigns X and Y." |
| **Escalation** | Flags high-impact decisions for human review (budget > threshold, pausing campaigns, structural changes). |
| **Learning** | Reviews past recommendations → actual outcomes. Updates its mental model of what works. |

#### 🦆 Duck Specialists (Layer 2 — 4+1 agents)

Each specialist owns deep expertise in one duck dimension + one cross-cutting analyst:

**Audience Analyst 🦆**
- Audience overlap detection (inter-campaign cannibalization)
- Targeting effectiveness (are we reaching the right intent?)
- Segment performance comparison
- New audience opportunity identification

**Ad Analyst 🦆**
- Creative performance (CTR, thumb-stop, hook rate, hold rate)
- Creative fatigue detection (when to rotate)
- Ad↔LP message match scoring
- Copy/visual effectiveness patterns
- Format effectiveness (video vs static vs carousel)

**LP Analyst 🦆**
- Landing page conversion analysis (visit → signup CVR)
- Page speed / Core Web Vitals
- Content analysis (does the LP deliver on the ad's promise?)
- Product↔LP match (is the LP promoting what people actually sign up for?)
- A/B test analysis on LP variants

**Product Analyst 🦆**
- Signup → hard signup → 2nd day engagement → paying conversion
- Product onboarding friction points
- Product↔campaign alignment (do users get what the ad promised?)
- Cohort analysis (week-over-week retention by source)

**Cross-Funnel Analyst 📊**
- End-to-end cohort tracking
- Attribution analysis
- Anomaly detection (sudden drops, spikes)
- Trend identification across channels
- Incrementality analysis

#### ⚡ Channel Executors (Layer 3 — one per platform)

Dumb muscles. They know how to talk to one API and do one thing: **execute approved changes**.

- Adjust bids
- Pause/enable campaigns or ads
- Update targeting criteria
- Upload new creatives
- Modify budgets

They never decide. They only execute what Layer 1 or Layer 2 approved.

### 4.3 Communication Flow

```
                    ┌──────────────┐
                    │    HUMAN     │
                    │  (approval   │
                    │   when req)  │
                    └──────┬───────┘
                           │ approve/reject/modify
                           ▼
Daily cycle:        ┌──────────────┐
                    │   STRATEGIST │──── queries DWT mart
                    │   🧠         │──── queries Channel APIs
                    └──────┬───────┘
                           │
            ┌──────────────┼──────────────┐
            ▼              ▼              ▼
     ┌─────────────┐┌─────────────┐┌─────────────┐
     │ Investigate  ││ Investigate  ││ Investigate  │
     │ Campaign A   ││ Campaign B   ││ Channel C    │
     │ LP problem   ││ audience     ││ ad fatigue   │
     │ (LP Analyst) ││ overlap      ││ (Ad Analyst) │
     │              ││(Audience     ││              │
     │              ││ Analyst)     ││              │
     └──────┬───────┘└──────┬──────┘└──────┬───────┘
            │               │              │
            ▼               ▼              ▼
     ┌─────────────────────────────────────────┐
     │         FINDINGS + RECOMMENDATIONS      │
     │  → Back to Strategist for prioritization│
     │  → High-confidence → auto-execute       │
     │  → Low-confidence → human approval      │
     └─────────────────────────────────────────┘
            │
            ▼
     ┌──────────────┐
     │  EXECUTORS   │ ── Apply changes via APIs
     │  ⚡          │ ── Log everything
     └──────────────┘
```

### 4.4 Implementation: One Process, Not 7

Despite the logical separation into roles, this doesn't need 7 separate running processes. The architecture maps to:

| Logical Agent | Implementation |
|---------------|---------------|
| Funnel Strategist | Scheduled cron job (daily + triggered) using a dedicated prompt + context |
| Duck Specialists | Sub-agent calls spawned by the Strategist when investigation is needed |
| Channel Executors | Tool calls (Google Ads API, Meta API, etc.) within the specialist or strategist context |

**Why:** Agent coordination overhead is real. Having one orchestrator that spawns focused sub-tasks is more reliable than 7 independent agents trying to talk to each other. The logical separation gives you clear responsibilities; the implementation keeps it simple.

---

## 5. Autonomy Levels & Guardrails

### 5.1 The Autonomy Ladder

Not all actions are equal. The system earns trust per action type:

```
LEVEL 4 ─── FULLY AUTONOMOUS ──────────────────────────────────
│   Agent decides + executes + reports after the fact
│   Examples (after proven track record):
│   • Bid adjustments within ±20%
│   • Pausing ads with > 3 days zero conversions
│   • Rotating creatives hitting fatigue threshold
│
LEVEL 3 ─── AUTO-EXECUTE WITH ALERT ────────────────────────────
│   Agent executes immediately but sends real-time notification
│   Examples:
│   • Budget reallocation within ±15%
│   • Enabling tested ad variants
│   • Audience expansion within proven segments
│
LEVEL 2 ─── RECOMMEND + WAIT FOR APPROVAL ──────────────────────
│   Agent proposes, human approves/rejects/modifies
│   Examples:
│   • New campaign structures
│   • Budget changes > 15%
│   • Pausing campaigns (not just ads)
│   • New audience targeting strategies
│
LEVEL 1 ─── ADVISORY ONLY ─────────────────────────────────────
│   Agent analyzes and reports findings. No action capability.
│   Examples:
│   • Full-funnel health reports
│   • Anomaly alerts
│   • Competitive insights
│   • "Here's what I'd do if I could"
│
LEVEL 0 ─── OBSERVE ───────────────────────────────────────────
    Agent collects data and learns patterns. Silent.
```

### 5.2 Guardrails (Hard Rules)

These are **never** overridden by autonomy level:

| Guardrail | Rule |
|-----------|------|
| 💰 **Budget ceiling** | No single change can increase daily spend by > $X (configurable per channel) |
| 🚫 **Campaign kill switch** | Pausing an entire campaign always requires human approval |
| 🆕 **New structures** | Creating new campaigns, ad sets, or audiences = always Level 2+ |
| ⏰ **Cool-down period** | After making a change, wait minimum 24h before changing the same thing again |
| 📊 **Minimum data** | Don't optimize based on < N conversions (statistical significance) |
| 🔄 **Rollback ready** | Every change must be reversible. Agent stores the "before" state. |
| 🗣️ **Daily digest** | Regardless of autonomy level, a daily summary of all actions goes to the team |

### 5.3 Approval Flow

```
Agent generates recommendation
        │
        ▼
┌───────────────────┐
│ Check autonomy    │
│ level for this    │
│ action type       │
└───────┬───────────┘
        │
   Level 3-4?────── YES ──▶ Execute + Log + Notify
        │
        NO (Level 1-2)
        │
        ▼
┌───────────────────┐
│ Post to approval  │──▶ WhatsApp / Slack / monday.com
│ queue             │    with context + rationale
└───────┬───────────┘
        │
   Human responds
        │
   ┌────┼────┐
   ▼    ▼    ▼
 APPROVE MODIFY REJECT
   │    │      │
   ▼    ▼      ▼
Execute Execute  Log reason
as-is  modified  for learning
```

---

## 6. Audit & Monitoring

### 6.1 Audit Log (Append-Only)

Every agent action produces an audit record:

```json
{
  "id": "act_20260507_001",
  "timestamp": "2026-05-07T08:30:00Z",
  "agent": "ad_analyst",
  "triggered_by": "strategist:daily_scan",
  "action_type": "bid_adjustment",
  "channel": "google_ads",
  "target": {
    "account": "Growth - US",
    "campaign": "Search - CRM Keywords",
    "ad_group": "project-management-tool"
  },
  "change": {
    "field": "cpc_bid",
    "before": 4.20,
    "after": 3.78,
    "delta_pct": -10
  },
  "rationale": "CTR dropped 15% WoW while CPC rose 8%. Reducing bid to target position 2-3 instead of 1. Expected savings: $340/week with minimal volume impact based on last 30d position data.",
  "confidence": 0.82,
  "autonomy_level": 4,
  "approval": "auto",
  "status": "executed",
  "outcome": null  // filled in after 24-48h
}
```

### 6.2 Feedback Loop

```
┌──────────────────────────────────────────────────────────────┐
│                    FEEDBACK LOOP                             │
│                                                              │
│  Day 0: Agent makes change                                   │
│    │                                                         │
│    ▼                                                         │
│  Day 1-3: Observe impact                                     │
│    │  • Did the metric move in expected direction?            │
│    │  • Any unexpected side effects?                         │
│    │  • Compare to prediction                                │
│    │                                                         │
│    ▼                                                         │
│  Day 7: Score the decision                                   │
│    │  • GOOD: Prediction was right → increase confidence     │
│    │  • NEUTRAL: No significant change → log, move on        │
│    │  • BAD: Went wrong → decrease confidence, learn why      │
│    │                                                         │
│    ▼                                                         │
│  Update agent knowledge:                                     │
│    • Adjust confidence thresholds                            │
│    • Update "what works" patterns                            │
│    • May trigger autonomy level change                       │
│                                                              │
│  Monthly: Human reviews the feedback loop itself             │
│    • Are we learning? Are scores improving?                  │
│    • Are autonomy levels appropriate?                        │
│    • What patterns did the agent miss?                       │
└──────────────────────────────────────────────────────────────┘
```

### 6.3 Monitoring Dashboard Metrics

| Metric | What It Tells You |
|--------|-------------------|
| **Decisions/day** | Agent activity level |
| **Approval rate** | How often humans agree with recommendations |
| **Prediction accuracy** | % of changes that moved metrics in expected direction |
| **Mean time to act** | From anomaly detection → action taken |
| **Rollback rate** | How often changes had to be reversed |
| **Confidence trend** | Is the agent getting better over time? |
| **Human override rate** | How often humans modify before approving |

---

## 7. UI / Dashboard

Inspired by the Funnel Fighters cockpit and 4 Ducks visual framework.

### 7.1 Main Views

```
┌─────────────────────────────────────────────────────────────────┐
│ AGENTIC PERFORMANCE MARKETING — COCKPIT                        │
├─────────┬──────────┬────────────┬──────────┬───────────────────┤
│ 🏠 Home │ 🦆 Funnel │ 🤖 Agents │ 📋 Audit │ 💡 Recommendations│
└─────────┴──────────┴────────────┴──────────┴───────────────────┘
```

#### 🏠 Home — Executive Summary
```
┌──────────────────────────────────────────────────────────────┐
│                    OVERALL HEALTH                            │
│                                                              │
│  🦆 Audience: 72 ██████████████░░░░░░                        │
│  🦆 Ad:       68 █████████████░░░░░░░                        │
│  🦆 LP:       45 █████████░░░░░░░░░░░  ⚠️ Needs attention    │
│  🦆 Product:  81 ████████████████░░░░                        │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ TOP 3 OPPORTUNITIES (by estimated impact)           │     │
│  ├─────────────────────────────────────────────────────┤     │
│  │ 1. 🔴 Meta "CRM Brand" — LP CVR 0.8% (avg: 3.2%)  │     │
│  │    Est. impact: +180 signups/week if fixed           │     │
│  │    Agent recommendation: LP message mismatch         │     │
│  │    [View Details] [Approve Fix]                       │     │
│  │                                                     │     │
│  │ 2. 🟡 Google "PM Generic" — audience overlap 34%    │     │
│  │    Est. impact: -$2.1K/week waste                    │     │
│  │    Agent recommendation: merge ad groups              │     │
│  │    [View Details] [Approve Fix]                       │     │
│  │                                                     │     │
│  │ 3. 🟢 YouTube "Integrations" — ready to scale       │     │
│  │    All 4 ducks aligned, TROI > 3x                    │     │
│  │    Agent recommendation: increase budget 25%          │     │
│  │    [View Details] [Approve Scale]                     │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                              │
│  AGENT ACTIVITY (last 24h)                                   │
│  • 12 analyses completed                                     │
│  • 3 changes auto-executed (Level 4)                         │
│  • 2 recommendations awaiting approval                       │
│  • 1 anomaly detected (Meta CPM spike +40%)                  │
└──────────────────────────────────────────────────────────────┘
```

#### 🦆 Funnel View — Drill-Down
```
┌──────────────────────────────────────────────────────────────┐
│ FUNNEL: Google Search Brand                                  │
│ Period: Last 7 days  [1d] [7d] [14d] [30d] [90d] [custom]   │
│                                                              │
│  AUDIENCE        AD             LP              PRODUCT      │
│  Score: 78       Score: 72      Score: 45 ⚠️    Score: 81    │
│                                                              │
│  ┌──────┐  ──▶  ┌──────┐  ──▶  ┌──────┐  ──▶  ┌──────┐    │
│  │34,200│       │ 2,394│       │  186  │       │  42   │    │
│  │impr. │       │clicks│       │signup │       │paying │    │
│  │      │       │      │       │      │       │      │    │
│  │CTR:  │       │CPC:  │       │CVR:  │       │CVR:  │    │
│  │ 7.0% │       │$3.20 │       │ 7.8% │       │22.6% │    │
│  └──────┘       └──────┘       └──────┘       └──────┘    │
│                                                              │
│  ALIGNMENT: ████████████████░░░░ 78/100                      │
│  ⚠️ LP is the bottleneck — message mismatch detected         │
│                                                              │
│  [Drill down: Country → Campaign → Ad Group → Keyword]       │
└──────────────────────────────────────────────────────────────┘
```

#### 🤖 Agent Activity View
```
┌──────────────────────────────────────────────────────────────┐
│ AGENT ACTIVITY LOG                                           │
│                                                              │
│ Filter: [All Agents ▼] [All Channels ▼] [Last 7 days ▼]     │
│                                                              │
│ 10:30  🧠 Strategist  Daily scan complete                    │
│        → 3 opportunities identified, 1 anomaly               │
│                                                              │
│ 10:32  🦆 LP Analyst  Investigating Meta "CRM Brand" LP      │
│        → Page speed: 2.1s (acceptable)                       │
│        → Message match: 34% (LOW — ad says "CRM",            │
│          LP headline says "Work Management")                  │
│        → Recommendation: update LP headline                   │
│                                                              │
│ 10:35  🦆 Ad Analyst  Creative fatigue detected               │
│        → Google "PM Generic" top ad: CTR -22% over 14d       │
│        → Auto-action (Level 4): rotated to variant B          │
│        → Audit ID: act_20260507_003                           │
│                                                              │
│ 10:38  📊 Cross-Funnel  Anomaly: Meta CPM spike              │
│        → CPM +40% vs 7d avg, no targeting changes             │
│        → Likely cause: auction competition (seasonal?)        │
│        → Recommendation: monitor 48h before adjusting         │
│                                                              │
│ [Load more...]                                                │
└──────────────────────────────────────────────────────────────┘
```

#### 📋 Audit Trail
```
┌──────────────────────────────────────────────────────────────┐
│ AUDIT TRAIL                                                  │
│                                                              │
│ ID          │ Agent   │ Action         │ Status    │ Result  │
│─────────────┼─────────┼────────────────┼───────────┼─────────│
│ act_007_003 │ Ad      │ Rotate creative│ Executed  │ ✅ +12% │
│ act_007_002 │ Budget  │ Shift $500 G→M │ Approved  │ Pending │
│ act_007_001 │ Audience│ Exclude overlap│ Awaiting  │ —       │
│ act_006_008 │ Ad      │ Pause ad #4421 │ Executed  │ ✅ Saved│
│ act_006_007 │ LP      │ Flag mismatch  │ Advisory  │ Read    │
│                                                              │
│ [Each row expandable with full context, rationale, before/   │
│  after state, and post-change metrics]                       │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Tech Stack for UI

| Component | Recommendation | Why |
|-----------|----------------|-----|
| Framework | Next.js (existing Funnel Fighters stack) | Already built, team knows it |
| Hosting | Vercel | Already deployed |
| Data | DWT mart queries + local Postgres for agent state | Clean separation |
| Real-time | WebSocket for live agent activity feed | See agents work in real-time |
| Charts | Recharts or similar (already in Funnel Fighters) | Consistent |

---

## 8. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
**Goal:** See the full funnel clearly. No automation yet.

- [ ] Define DWT mart schema with BI team (what queries we need)
- [ ] Build query layer (wrapper functions for mart endpoint)
- [ ] Implement 4-duck scoring algorithm
- [ ] Build the Home dashboard (executive summary)
- [ ] Build the Funnel drill-down view (all channels)
- [ ] Ship as read-only dashboard — the team uses it daily

**Milestone:** "Walk the funnel daily" is automated. Everyone sees the same picture.

### Phase 2: Intelligence (Weeks 3-4)
**Goal:** The system tells you what's wrong and what to do.

- [ ] Build Strategist agent (daily analysis cycle)
- [ ] Build 4 Duck Specialists (investigation capabilities)
- [ ] Implement recommendation engine
- [ ] Add anomaly detection
- [ ] Build recommendation queue in UI
- [ ] Set up audit log

**Milestone:** Daily automated insights that are actually useful. Team validates quality.

### Phase 3: Action (Weeks 5-8)
**Goal:** The system can act, with human approval.

- [ ] Build Channel Executors (Google Ads writer, Meta writer)
- [ ] Implement approval workflow (WhatsApp + UI)
- [ ] Start with Level 1-2 autonomy only
- [ ] Build feedback loop (track outcome of every recommendation)
- [ ] Cross-funnel analyst for cohort tracking

**Milestone:** Recommendations get acted on same-day. Feedback loop running.

### Phase 4: Autonomy (Weeks 9-12)
**Goal:** Proven action types run autonomously.

- [ ] Review feedback data — which recommendations consistently worked?
- [ ] Upgrade proven action types to Level 3-4
- [ ] Implement guardrails and rollback mechanisms
- [ ] Build monitoring dashboard (prediction accuracy, rollback rate)
- [ ] Scale to all channels

**Milestone:** Agent handles routine optimizations autonomously. Humans focus on strategy.

---

## Architecture Decision Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Data storage** | Query DWT mart, don't replicate | BI team owns the source of truth. Less maintenance, always fresh. |
| **Agent count** | 1 Strategist + 5 Specialists + N Executors | Clear hierarchy. One brain, focused hands. |
| **Agent runtime** | Sub-agent spawning (not separate processes) | Less coordination overhead. More reliable. |
| **Autonomy model** | Graduated ladder (0→4) per action type | Trust is earned, not granted wholesale. |
| **UI** | Extend Funnel Fighters (Next.js) | Don't rebuild what works. Add agent views. |
| **Scoring** | 4 Ducks alignment (not isolated metrics) | The framework works. Use it as the system's compass. |
| **Channel coverage** | Start with Google + Meta, expand | 80% of spend. Prove it works, then scale. |

---

*"Get over the hill, then see what's next."* — Roy Mann

---

**Next steps:**
1. Guy + Ido review this doc
2. Align with BI team on DWT mart requirements
3. Pick ONE funnel path for Phase 1 proof
4. Start building

🐺
