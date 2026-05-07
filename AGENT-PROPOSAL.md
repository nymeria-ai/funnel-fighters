# Agentic Performance Marketing — Agent System Proposal

**Author:** Nymeria | **Date:** 2026-05-07 | **Status:** FINAL
**For:** Ido (Head of Marketing), Guy Regev, Marketing X1000 team
**Architecture:** 11-agent system — confirmed by Ido

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Agent Hierarchy](#agent-hierarchy)
3. [Agent Specifications](#agent-specifications)
   - [The Brain (Orchestrator)](#1-the-brain--orchestrator)
   - [Performance Analysis & Account Structure Agent](#2-performance-analysis--account-structure-agent)
   - [Audience Discovery & Expansion Agent](#3-audience-discovery--expansion-agent)
   - [Creative Insights & Creation Agent](#4-creative-insights--creation-agent)
   - [Landing Pages Agent](#5-landing-pages-agent)
   - [Personalized Onboarding & Lifecycle Agent](#6-personalized-onboarding--lifecycle-agent)
   - [Product Behaviour Insights Agent](#7-product-behaviour-insights-agent)
   - [Google Search Channel Manager](#8-google-search-channel-manager)
   - [Meta Channel Manager](#9-meta-channel-manager)
   - [YouTube Channel Manager](#10-youtube-channel-manager)
4. [Cross-Agent Communication](#cross-agent-communication)
5. [Data Architecture](#data-architecture)
6. [Technical Implementation Options](#technical-implementation-options)
7. [Implementation Priority](#implementation-priority)

---

## System Overview

This system replaces manual, channel-siloed marketing optimization with an autonomous agent network that sees the full funnel — from ad impression through onboarding to paying customer. Every decision traces back to the 4 Ducks alignment framework: **Audience + Ad + Landing Page + Product** must swim together.

**Channels covered:** Search (Google), Meta, YouTube, LinkedIn, Reddit, Marketing Partnerships/Affiliates

**Architecture:** 11 agents organized in three layers:

1. **The Brain** — one orchestrator that owns budget, incrementality, cross-channel allocation, geo prioritization, and conflict resolution
2. **6 Function Agents** — cross-channel specialists that analyze, recommend, and create (Performance, Audience, Creative, Landing Pages, Onboarding, Product Behaviour)
3. **3 Channel Managers** — intelligent platform agents that own the write path to Google Search, Meta, and YouTube. They validate, conflict-resolve, maintain channel context, and audit every change

Function agents think cross-channel. Channel Managers own the execution on a single platform. The Brain coordinates both.

### Why Channel Managers Are Real Agents

In the previous proposal, channel executors were dumb API wrappers. That was wrong. Here's why:

- **Conflict resolution requires context.** When Performance wants to increase bids and Creative wants to pause the ad for refresh, a dumb executor can't resolve that. A Channel Manager can — it knows the account state, pending experiments, and pacing status.
- **Human channel teams need an interface.** Campaign managers ask "what's the status of campaign Y?" or "shift $2K from brand to non-brand." A dumb executor can't handle ad-hoc requests. A Channel Manager can.
- **Validation prevents disasters.** A function agent might recommend a change that violates a budget ceiling, conflicts with an active experiment, or breaks an account structure constraint. The Channel Manager catches this before it hits the API.
- **Audit trail requires intelligence.** Knowing *who* requested a change (which agent or human), *why* (the rationale), and *what context* existed at the time — this is agent work, not wrapper work.

### Simple Executors (Not Agents — Upgrade Later)

| Executor | Platform | Why Not an Agent Yet |
|----------|----------|---------------------|
| LinkedIn Writer | LinkedIn Campaign Manager API | Low spend volume, simple campaigns |
| Reddit Writer | Reddit Ads API | Experimental channel, limited optimization surface |
| Partnerships Writer | Impact / PartnerStack APIs | Different model (not bid-based), simpler operations |

These are dumb API wrappers. They execute approved changes with basic validation. When volume justifies the investment, they upgrade to full Channel Managers.

---

## Agent Hierarchy

```
                         ┌──────────────────────────────────┐
                         │      THE BRAIN (Orchestrator)     │
                         │   Budget & Incrementality         │
                         │   Cross-channel allocation        │
                         │   Geo prioritization              │
                         │   Conflict resolution             │
                         └───────────────┬──────────────────┘
                                         │
          ┌──────────┬──────────┬────────┼────────┬──────────┬──────────┐
          │          │          │        │        │          │          │
     ┌────▼───┐ ┌───▼────┐ ┌──▼───┐ ┌──▼───┐ ┌──▼────┐ ┌──▼─────┐   │
     │Perf    │ │Audience│ │Crea- │ │Land- │ │Onboard│ │Product │   │
     │Analysis│ │Discov- │ │tive  │ │ing   │ │& Life-│ │Behav-  │   │
     │& Acct  │ │ery &   │ │Insig-│ │Pages │ │cycle  │ │iour    │   │
     │Struct  │ │Expan.  │ │hts   │ │Agent │ │Agent  │ │Insights│   │
     └───┬────┘ └───┬────┘ └──┬───┘ └──┬───┘ └───────┘ └────────┘   │
         │          │         │        │                              │
         │          │    ┌────┼────┐   │                              │
         │          │    │    │    │   │                              │
         │          │  ┌─▼─┐┌─▼─┐┌▼──┐│                              │
         │          │  │Txt││Vid││Vis││                              │
         │          │  └───┘└───┘└───┘│                              │
         │          │                  │                              │
         ▼          ▼                  ▼                              │
    ┌─────────────────────────────────────────────────────────────────┘
    │
    │  CHANNEL MANAGER LAYER (real agents — validate, resolve, audit)
    │
    ├──────────────────┬──────────────────┬──────────────────┐
    │                  │                  │                  │
    ▼                  ▼                  ▼                  │
┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  Google    │  │   Meta     │  │  YouTube   │   Simple     │
│  Search    │  │  Channel   │  │  Channel   │   Executors: │
│  Channel   │  │  Manager   │  │  Manager   │   LinkedIn,  │
│  Manager   │  │            │  │            │   Reddit,    │
│  (#8)      │  │  (#9)      │  │  (#10)     │   Partners   │
└────────────┘  └────────────┘  └────────────┘             │
      │                │               │                    │
      ▼                ▼               ▼                    ▼
  Google Ads       Meta Marketing   Google Ads API     Platform APIs
  API (Search)     API              (Video)            (basic writes)


  Request flow: Function Agent ──► Channel Manager ──► Platform API
  Ad-hoc flow:  Human Team ──────► Channel Manager ──► Platform API
  Both flows:   Brain mediates conflicts between competing requests
```

**Agent count:** 1 Brain + 6 Function Agents + 3 Channel Managers = **11 agents**
**Sub-agents:** 3 (Text, Video, Visual — nested under Creative)
**Simple executors:** 3 (LinkedIn, Reddit, Partnerships — not agents)

---

## Agent Specifications

Every agent is specified across 10 dimensions: Role, Integrations, Workflow, Sub-agents/Sub-tasks, Data Inputs, Data Outputs, Approval Requirements, Guardrails, Success Metrics, Dependencies.

---

### 1. The Brain — Orchestrator

**Budget & Incrementality Agent — cross-channel allocations, geo prioritization, conflict resolution**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Cross-channel budget allocation (total and per-geo) | Individual campaign structure within channels |
| Incrementality testing design and read-out | Creative production or LP content |
| Geo prioritization and market-level strategy | Direct API writes to ad platforms (Channel Managers own this) |
| 4-duck alignment scoring across all funnel paths | Channel-specific bid management |
| Priority queue: what to fix next, ranked by impact | Day-to-day keyword or audience optimization |
| Triggering function agents with scoped tasks | Onboarding flow design |
| Escalation decisions (what needs human review) | Channel-level conflict resolution (Channel Managers handle first) |
| Weekly/monthly budget reforecasting | — |
| **Conflict resolution between agents** (when Channel Managers escalate) | — |
| **Channel Manager oversight** (budget ceilings, cross-channel consistency) | — |

**Key decisions:** The Brain decides *where money goes* and *what problems to solve first*. It does not decide *how* to solve them — that's delegated to function agents. It does not decide *how to execute platform changes* — that's delegated to Channel Managers. When Channel Managers escalate conflicts they can't resolve (e.g., two function agents competing for the same budget), the Brain arbitrates.

#### Integrations Required

| Integration | Purpose | Access Type |
|-------------|---------|-------------|
| DWT Mart (Snowflake/BigBrain endpoint) | Funnel metrics: impression → click → signup → hard signup → engaged → paying | Read (SQL queries) |
| Google Search Channel Manager | Account-level spend, budget status, pending changes | Read (via agent message bus) |
| Meta Channel Manager | Account-level spend, budget status, pending changes | Read (via agent message bus) |
| YouTube Channel Manager | Account-level spend, budget status, pending changes | Read (via agent message bus) |
| LinkedIn / Reddit / Partners (simple executors) | Account-level spend | Read (API) |
| GA4 (BigQuery export) | Cross-channel attribution, geo-level conversion data | Read |
| Anthropic SDK (Claude) | LLM reasoning for scoring, prioritization, rationale generation | API calls |
| Agent Local Store (Postgres) | Computed scores, decision log, priority queue, audit trail | Read + Write |
| Slack API | Approval requests, daily digests, anomaly alerts | Write |
| monday.com API | Task creation for human-required actions | Write |

#### Workflow

**Trigger:** Daily scheduled run (06:00 UTC) + event-triggered (anomaly alert from any agent, budget threshold breach, Channel Manager escalation)

| Step | Action | Output |
|------|--------|--------|
| 1 | Query DWT mart for last 24h and 7d rolling metrics across all channels, geos, and funnel stages | Raw performance dataset |
| 2 | Query Channel Managers for account status: pending changes, active experiments, pacing, recent escalations | Channel context snapshot |
| 3 | Compute 4-duck alignment scores for every active funnel path (channel x campaign x ad group level) | Alignment score matrix (0-100 per path) |
| 4 | Compare scores to 7d/30d baselines. Flag anomalies (>15% deviation) | Anomaly list with severity |
| 5 | Run incrementality model: estimate true incremental value per channel/geo using holdout data and time-series analysis | Incremental ROAS per channel/geo |
| 6 | Generate priority queue: rank all opportunities by (estimated incremental revenue uplift x confidence) | Ordered priority list |
| 7 | For top N priorities, generate scoped task briefs and dispatch to appropriate function agents | Task assignments with context |
| 8 | Resolve any pending Channel Manager escalations (competing requests, budget conflicts) | Resolution decisions |
| 9 | Compute budget reallocation recommendations based on incremental ROAS, geo potential, and current allocation | Budget shift recommendations |
| 10 | Package daily digest: health scores, anomalies, actions taken, pending approvals, Channel Manager activity summary | Slack message + monday.com updates |
| 11 | For budget changes within guardrails, send to Channel Managers for execution. For others, submit for human approval | Executed changes or approval requests |

**Recipients:** All function agents (task assignments), Channel Managers (budget directives, escalation resolutions), Ido + team (daily digest), Slack #perf-marketing channel

#### Sub-agents/Sub-tasks Structure

The Brain does not have per-channel sub-agents. Instead, it operates cross-channel by design:

- **Budget Allocation Sub-task:** Runs optimization model across all 6 channels simultaneously. Considers geo-level performance, incrementality scores, and spend pacing.
- **Incrementality Sub-task:** Per-channel + per-geo incrementality estimation. Uses geo holdout tests and time-series causal inference.
- **Priority Scoring Sub-task:** Scores every funnel path, clusters problems by type (audience, creative, LP, onboarding), and routes to the right function agent.
- **Geo Prioritization Sub-task:** Ranks markets (US, UK, DACH, ANZ, etc.) by growth potential x current efficiency gap.
- **Conflict Resolution Sub-task:** When Channel Managers escalate competing requests, evaluates impact, 4-duck alignment, and confidence to decide which request takes priority.

#### Data Inputs

| Data | Source |
|------|--------|
| Campaign spend (daily, by channel/geo) | Channel Managers (Google Search, Meta, YouTube) + simple executor APIs (LinkedIn, Reddit, Partners) |
| Funnel metrics (impressions → paying, by funnel path) | DWT mart |
| Attribution data (multi-touch) | GA4 / DWT mart |
| Channel state (pending changes, active experiments, pacing) | Channel Managers |
| Geo holdout test results | Agent local store |
| Past decision outcomes (feedback loop) | Agent local store |
| Function agent reports and findings | Agent local store |
| Channel Manager escalations | Agent local store (escalation queue) |
| Budget targets and caps (set by Ido) | Configuration store |

#### Data Outputs

| Output | Destination | Format |
|--------|-------------|--------|
| 4-duck alignment scores (per funnel path) | Agent local store, UI dashboard | JSON scores array |
| Priority queue (ranked opportunities) | Agent local store, function agents | Ordered task list |
| Budget allocation directives | Channel Managers (for execution) | Budget change records |
| Budget recommendations (above guardrail) | Slack (human review) | Change proposals |
| Daily health digest | Slack, monday.com | Formatted report |
| Incrementality scores (per channel/geo) | Agent local store, UI | Numeric scores |
| Task assignments to function agents | Agent local store | Structured task briefs |
| Escalation resolutions | Channel Managers | Decision records |
| Anomaly alerts | Slack (immediate) | Alert messages |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Read all data, compute scores, generate reports | Level 3 (act + notify) | — (always autonomous) |
| Budget shifts <=5% between channels | Level 1 (recommend) | 10 consecutive approved recommendations with positive outcome |
| Budget shifts 5-15% | Level 1 (recommend) | After Level 2 proven for <=5% shifts for 30 days |
| Budget shifts >15% or new geo entry | Level 1 (recommend) | Stays Level 1 permanently |
| Pause/enable entire channel spend | Level 1 (recommend) | Stays Level 1 permanently |
| Task delegation to function agents | Level 3 (act + notify) | — (always autonomous) |
| Incrementality test launch | Level 1 (recommend) | Stays Level 1 — requires Ido sign-off |
| Resolve Channel Manager escalations | Level 2 (act + notify) | — (time-sensitive, audited) |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Total daily budget ceiling** | Cannot increase total daily spend beyond configured max ($X/day set by Ido) |
| **Per-channel floor** | Cannot reduce any channel below its configured minimum spend floor |
| **Reallocation rate limit** | Max one budget reallocation per channel per 24h |
| **Geo expansion gate** | New geo market entry requires human approval regardless of incrementality score |
| **Minimum data for decisions** | No budget shifts based on <7 days of data or <50 conversions |
| **Kill switch** | Ido can freeze all Brain actions via Slack command `/brain freeze` |
| **Rollback** | Every budget change stores before-state. Auto-rollback if 48h post-change ROAS drops >30% |
| **Spending velocity** | Alert if any channel's hourly spend exceeds 2x its daily average pace |
| **Channel Manager override** | Brain cannot bypass Channel Manager validation — all platform changes flow through Channel Managers |

#### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Budget allocation efficiency (incremental ROAS) | Improve blended iROAS by 15% in 90 days | DWT mart revenue / spend by channel |
| Priority queue accuracy | >70% of top-5 daily priorities validated as real opportunities by team | Human review weekly |
| Anomaly detection speed | <2h from anomaly onset to alert | Timestamp comparison |
| Budget recommendation acceptance rate | >80% approved without modification | Approval log |
| Cross-channel alignment score improvement | 4-duck scores trending up across all channels | Weekly trend |
| Geo allocation ROI | Top-3 geos by incremental ROAS match Brain's ranking | Monthly comparison |
| Escalation resolution quality | >90% of Channel Manager escalation resolutions accepted by both parties | Resolution log |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| DWT mart data availability and freshness | All 6 function agents (task assignments) |
| GA4 attribution accuracy | All 3 Channel Managers (budget directives, escalation resolutions) |
| Channel Manager status reports (for informed decisions) | UI dashboard (scores, priority queue) |
| Function agent reports (for informed decisions) | Slack/monday.com (approvals, digests) |

---

### 2. Performance Analysis & Account Structure Agent

**Cross-channel account health, campaign structure optimization, bid management**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Campaign structure analysis (too many/few ad groups, keyword conflicts) | Budget allocation between channels (Brain owns) |
| Bid optimization recommendations | Creative content (Creative Agent owns) |
| Quality Score / relevance score monitoring | LP content or conversion optimization (LP Agent owns) |
| Negative keyword management | Audience strategy (Audience Agent owns) |
| Search term analysis and keyword harvesting | Platform API writes (Channel Managers own) |
| Campaign naming/taxonomy enforcement | — |
| Wasted spend identification | — |
| Competitive auction insights | — |

**Key distinction from old proposal:** This agent no longer writes to platform APIs directly. It submits change requests to the appropriate Channel Manager, which validates and executes them.

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Search Channel Manager | Submit structure/bid/keyword change requests; read account structure data |
| Meta Channel Manager | Submit structure change requests; read campaign/ad set data |
| YouTube Channel Manager | Submit campaign change requests; read structure data |
| LinkedIn / Reddit / Partners (simple executors) | Read campaign structure; submit simple changes |
| DWT Mart | Funnel conversion data mapped to campaign structure |
| Anthropic SDK | LLM analysis for search term categorization, structure recommendations |
| Agent Local Store | Historical bid changes, structure change log, task briefs from Brain |

#### Workflow

**Trigger:** Daily (after Brain's morning run provides task assignments) + triggered by Brain on anomaly detection

| Step | Action | Output |
|------|--------|--------|
| 1 | Receive task brief from Brain (e.g., "Investigate declining ROAS on Google Search Brand") | Scoped investigation context |
| 2 | Request campaign structure and performance data from relevant Channel Manager(s) | Raw campaign/ad group/keyword data |
| 3 | **Per-channel sub-tasks execute in parallel** (see sub-task structure below) | Channel-specific findings |
| 4 | Identify structural issues: overlapping keywords, thin ad groups, budget-limited campaigns, poor Quality Scores | Issue list with severity scores |
| 5 | Analyze search terms (Search): find high-spend irrelevant terms, harvest converting terms | Negative keyword lists, keyword additions |
| 6 | Compute bid adjustment recommendations based on conversion data + position targets | Bid change proposals |
| 7 | Generate wasted spend report: what's spending without converting | Waste report with $ amounts |
| 8 | Submit findings + recommendations to Brain for prioritization | Structured report |
| 9 | For approved changes, submit change requests to the appropriate Channel Manager(s) | Change requests + tracking IDs |

#### Sub-agents/Sub-tasks Structure

Per-channel sub-tasks, each specialized in that platform's structure:

| Sub-task | Focus Areas |
|----------|-------------|
| **Search (Google) Sub-task** | Keyword-level bids, match type strategy, search term mining, negative keywords, Quality Score optimization, ad group granularity, RSA asset performance |
| **Meta Sub-task** | Ad set structure, placement optimization (Feed vs Stories vs Reels), delivery optimization settings, bid caps vs cost caps, CBO vs ABO analysis |
| **YouTube Sub-task** | Campaign type analysis (TrueView vs Bumper vs Shorts), placement targeting, frequency capping, view-rate optimization |
| **LinkedIn Sub-task** | Campaign objective alignment, bid strategy (manual vs max delivery), audience size vs cost analysis |
| **Reddit Sub-task** | Community targeting effectiveness, bid optimization, placement analysis |
| **Partnerships Sub-task** | Partner tier performance, commission structure analysis, attribution validation |

#### Data Inputs

| Data | Source |
|------|--------|
| Campaign structure (campaigns, ad groups, keywords, ads) | Channel Managers (Google Search, Meta, YouTube) + simple executor APIs |
| Performance metrics (impressions, clicks, cost, conversions) | DWT mart + Channel Managers |
| Search terms report (Search) | Google Search Channel Manager |
| Quality Scores, expected CTR, ad relevance, LP experience | Google Search Channel Manager |
| Auction insights (Search) | Google Search Channel Manager |
| Delivery insights (Meta) | Meta Channel Manager |
| Task briefs from Brain | Agent local store |
| Historical bid changes and their outcomes | Agent local store |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Account structure audit report | Brain (for prioritization), UI dashboard |
| Bid adjustment change requests | Channel Managers (for validation + execution) |
| Negative keyword change requests | Google Search Channel Manager |
| Wasted spend report (with $ amounts) | Brain, Slack weekly digest |
| Quality Score trend analysis | UI dashboard |
| Keyword harvesting recommendations | Brain (for approval), then Google Search Channel Manager |
| Campaign restructure proposals | Brain (always human-approved), then Channel Managers |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Read all campaign data, generate reports | Level 3 (act + notify) | — |
| Bid adjustments +/-10% on keywords with >100 conversions/30d | Level 1 (recommend) | 20 approved adjustments with positive ROAS impact |
| Bid adjustments +/-20% | Level 1 (recommend) | After +/-10% reaches Level 3 |
| Add negative keywords (exact match) | Level 1 (recommend) | 15 approved additions with zero false positives |
| Add negative keywords (broad match) | Level 1 (recommend) | Stays Level 1 — too risky for automation |
| Pause individual keywords with >$500 spend and 0 conversions | Level 1 (recommend) | 10 approved pauses confirmed as correct |
| Campaign restructuring (merge/split ad groups) | Level 1 (recommend) | Stays Level 1 permanently |
| Enable/pause entire campaigns | Level 1 (recommend) | Stays Level 1 permanently |

**Note:** Even when Performance Agent reaches Level 2+ for an action, the Channel Manager still validates the change before executing. The approval level determines whether the *human* approves — the Channel Manager always validates.

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Bid ceiling** | No bid can exceed 2x the account's average CPC for that campaign type |
| **Bid floor** | No bid reduction below the minimum needed for page-1 impression (estimated from auction data) |
| **Change frequency** | Max one bid change per keyword per 48h |
| **Negative keyword safety** | Before adding a negative, verify it hasn't generated conversions in the last 90 days |
| **Structure changes** | All campaign restructuring proposals include a rollback plan |
| **Minimum data** | No optimization actions on campaigns with <14 days of data |
| **Spend protection** | Cannot pause anything representing >5% of channel's daily spend without human approval |
| **Channel Manager gate** | All platform changes must go through the relevant Channel Manager — no direct API access |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Wasted spend reduction | -20% waste in first 60 days |
| Quality Score improvement (Search) | Average QS improvement of +0.5 across managed keywords |
| Bid recommendation accuracy | >75% of bid changes produce desired metric movement |
| Account structure compliance | 100% of campaigns follow naming taxonomy within 30 days |
| Search term coverage | <5% of spend on irrelevant search terms |
| Change request acceptance rate (by Channel Managers) | >90% of submitted changes pass Channel Manager validation |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, budget context) | Brain (findings inform priority queue) |
| Channel Managers (account data, change execution) | Channel Managers (change requests) |
| DWT mart (conversion data beyond click) | Creative Agent (performance data per ad) |
| — | Audience Agent (keyword-level audience overlap data) |

---

### 3. Audience Discovery & Expansion Agent

**Cross-channel audience intelligence, overlap detection, expansion**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Audience overlap detection across campaigns and channels | Bid management (Performance Agent owns) |
| New audience segment identification | Creative messaging for audiences (Creative Agent owns) |
| Lookalike/similar audience creation recommendations | LP personalization (LP Agent owns) |
| Audience exclusion management (suppression lists) | Platform API writes (Channel Managers own) |
| Cross-channel audience deduplication strategy | Onboarding flow personalization |
| Intent signal analysis (search terms → audience signals) | Budget allocation (Brain owns) |
| Audience fatigue monitoring | — |
| First-party data activation strategy | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Search Channel Manager | Audience lists, in-market/affinity segments, remarketing lists, Customer Match |
| Meta Channel Manager | Custom Audiences, Lookalike Audiences, interest targeting, audience overlap tool |
| YouTube Channel Manager | Audience segments, viewer lists |
| LinkedIn / Reddit (simple executors) | Matched Audiences, community targeting |
| BigBrain/Snowflake | monday.com user data for first-party audience building, product usage cohorts |
| GA4 | Audience definitions, user segments, acquisition paths |
| DWT Mart | Audience-level funnel performance (which segments convert to paying) |
| Anthropic SDK | LLM analysis for audience clustering, intent categorization |
| Agent Local Store | Audience performance history, overlap records |

#### Workflow

**Trigger:** Weekly deep analysis (Mondays) + Brain-triggered investigations + new campaign launch

| Step | Action | Output |
|------|--------|--------|
| 1 | Request all active audience definitions from Channel Managers + simple executors | Unified audience inventory |
| 2 | **Per-channel sub-tasks** analyze audience performance (see below) | Per-channel audience reports |
| 3 | Run cross-channel overlap analysis: identify audiences targeted on multiple channels | Overlap matrix with estimated waste |
| 4 | For each audience segment, compute full-funnel performance (ad → LP → signup → paying) | Audience-level 4-duck scores |
| 5 | Identify high-performing micro-segments worth expanding | Expansion candidates list |
| 6 | Analyze first-party data (BigBrain) for new audience seed lists | New audience proposals |
| 7 | Check audience fatigue signals: frequency caps hit, CTR declining, CPM rising | Fatigue alerts |
| 8 | Generate suppression list updates (existing customers, non-ICP) | Suppression list updates |
| 9 | Submit findings to Brain. For approved changes, submit to Channel Managers. | Reports + change requests |

#### Sub-agents/Sub-tasks Structure

| Sub-task | Focus Areas |
|----------|-------------|
| **Search Sub-task** | Keyword-intent clustering, search term → audience signal mapping, RLSA list optimization, demographic bid adjustments |
| **Meta Sub-task** | Lookalike audience testing (1% vs 3% vs 5%), interest stacking analysis, Advantage+ audience performance, Custom Audience freshness |
| **YouTube Sub-task** | Viewer list performance, affinity vs in-market targeting, YouTube-specific audience signals |
| **LinkedIn Sub-task** | Company list targeting effectiveness, job title/function targeting precision, Matched Audience overlap with other channels |
| **Reddit Sub-task** | Subreddit/community targeting effectiveness, interest targeting vs community targeting comparison |
| **Partnerships Sub-task** | Partner audience quality scoring, affiliate traffic audience profile analysis |

#### Data Inputs

| Data | Source |
|------|--------|
| Audience definitions and sizes | Channel Managers + simple executor APIs |
| Audience-level performance metrics | Channel Managers + DWT mart |
| Cross-channel overlap data | Channel Managers (where available) + modeled |
| First-party user data (product usage, plan type, company size) | BigBrain/Snowflake |
| CRM data (existing customers for suppression) | BigBrain |
| Search term reports (intent signals) | Google Search Channel Manager |
| GA4 audience reports | GA4 API |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Audience overlap report (with waste estimate in $) | Brain, UI dashboard, Slack |
| New audience segment proposals | Brain (for approval), then Channel Managers |
| Lookalike seed list recommendations | Brain (for approval), then Channel Managers |
| Suppression list updates | Channel Managers (for execution) |
| Audience fatigue alerts | Brain (for priority adjustment) |
| Audience-level 4-duck alignment scores | Agent local store, UI |
| Cross-channel audience strategy recommendations | Ido (monthly strategy report) |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Audience data analysis and reporting | Level 3 (act + notify) | — |
| Suppression list updates (existing customers) | Level 2 (act + notify) | — (low risk, high value) |
| Audience exclusions within existing campaigns | Level 1 (recommend) | 10 approved exclusions confirmed as waste reduction |
| New Lookalike audience creation | Level 1 (recommend) | Stays Level 1 — new audience = new spend |
| Audience expansion (broaden targeting) | Level 1 (recommend) | Stays Level 1 — directly impacts spend |
| First-party audience activation | Level 1 (recommend) | Stays Level 1 — data privacy implications |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Audience size floor** | No audience smaller than 1,000 users (too narrow = volatile performance) |
| **Overlap threshold** | Flag audiences with >25% overlap; block launch of >50% overlap |
| **Frequency cap** | Alert if any audience is seeing >5 impressions/week across channels |
| **Data freshness** | Suppression lists must be refreshed at least weekly |
| **Privacy compliance** | All first-party audience usage must comply with monday.com privacy policy; no PII in audience names |
| **Expansion rate** | New audience tests capped at 10% of channel budget |
| **Channel Manager gate** | All audience changes on platforms go through Channel Managers |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Cross-channel audience overlap waste | Reduce by 30% in 60 days |
| New audience segment discovery rate | 2+ viable new segments per month |
| Audience-level funnel CVR | Improve worst-performing audience segments by 20% |
| Suppression list coverage | >95% of existing customers suppressed from acquisition campaigns |
| Lookalike audience quality | New LALs perform within 20% of top existing audience within 14 days |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, budget context) | Brain (audience quality informs budget allocation) |
| Channel Managers (audience data, change execution) | Channel Managers (audience change requests) |
| Performance Agent (keyword-level data for intent signals) | Creative Agent (audience insights inform messaging) |
| BigBrain data freshness | LP Agent (audience segments inform personalization) |
| DWT mart (funnel data per audience) | Onboarding Agent (audience traits inform onboarding) |

---

### 4. Creative Insights & Creation Agent

**Cross-channel creative performance analysis, generation, and testing**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Creative performance analysis (CTR, hook rate, hold rate, thumb-stop) | Budget for creative testing (Brain owns) |
| Creative fatigue detection and rotation scheduling | LP content (LP Agent owns) |
| Ad-LP message match scoring | Audience targeting (Audience Agent owns) |
| New creative generation (copy, visual concepts, video scripts) | Campaign structure (Performance Agent owns) |
| A/B test design for creatives | Platform API writes (Channel Managers own) |
| Creative taxonomy enforcement (selling points, format tags) | Onboarding messaging |
| Cross-channel creative insights (what works where) | — |
| monday.com brand compliance checking | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Search Channel Manager | RSA asset performance, ad-level metrics |
| Meta Channel Manager | Ad creative data, dynamic creative reports, ad-level metrics |
| YouTube Channel Manager | Video ad performance, view-rate, completion rate, skip rate |
| LinkedIn / Reddit (simple executors) | Ad creative performance |
| Webflow API / CMS | LP content for message match scoring |
| monday.com DAM (Digital Asset Management) | Brand assets, approved visual library |
| Anthropic SDK | Creative generation (copy, concepts), message match analysis, performance pattern recognition |
| DALL-E / Midjourney API (future) | Visual concept generation |
| Runway / Synthesia API (future) | Video creative generation |
| Agent Local Store | Creative performance history, fatigue tracking, A/B test results |

#### Workflow

**Trigger:** Daily creative performance scan + Brain-triggered investigations + weekly creative insights report

| Step | Action | Output |
|------|--------|--------|
| 1 | Request performance data for all active creatives from Channel Managers | Creative performance dataset |
| 2 | **Per-format sub-agents** analyze in parallel (Text, Video, Visual — see below) | Format-specific insights |
| 3 | Detect creative fatigue: CTR declining >15% over 7 days with stable audience | Fatigue alert list |
| 4 | Score ad-LP message match: compare ad selling points to LP selling points (from LP Agent data) | Message match scores (0-100) |
| 5 | Identify top-performing creative patterns (hooks, CTAs, formats, themes) | Pattern report |
| 6 | For fatigued or underperforming creatives, generate replacement concepts | New creative briefs |
| 7 | For new campaigns, generate creative variations aligned to audience + selling point | Creative drafts |
| 8 | Design A/B test plans for new creatives | Test plans |
| 9 | Submit to Brain for prioritization. For approved rotations/launches, submit to Channel Managers. | Change requests to Channel Managers |

#### Sub-agents/Sub-tasks Structure

**Three format-specific sub-agents** (each spans all channels):

| Sub-agent | Scope | Key Capabilities |
|-----------|-------|-----------------|
| **Text Sub-agent** | RSA headlines/descriptions (Search), Meta primary text/headlines, LinkedIn ad copy, Reddit post copy | Copy performance analysis, headline generation, CTA optimization, keyword insertion patterns, character-limit-aware generation |
| **Video Sub-agent** | YouTube TrueView/Bumper/Shorts, Meta Reels/Stories video, LinkedIn video ads | Hook rate analysis (first 3s), hold rate curves, completion rate, skip patterns, video script generation, thumbnail analysis |
| **Visual Sub-agent** | Meta image ads, LinkedIn image ads, Reddit image ads, display banners | Image performance patterns (color, layout, faces, text overlay), visual concept generation, format adaptation (1:1, 4:5, 9:16, 16:9) |

**Per-channel sub-tasks within each sub-agent:**

Each sub-agent further decomposes analysis per channel since creative best practices differ:
- Search: RSA asset combination analysis, pin strategy
- Meta: Format (Feed vs Stories vs Reels), Advantage+ creative optimization signals
- YouTube: Pre-roll vs Shorts, skip rate patterns
- LinkedIn: Professional tone analysis, B2B-specific messaging
- Reddit: Community-native tone, anti-promotional detection

#### Data Inputs

| Data | Source |
|------|--------|
| Ad creative content (copy, images, videos) | Channel Managers |
| Ad performance metrics (CTR, impressions, conversions, cost) | Channel Managers + DWT mart |
| Video-specific metrics (hook rate, view rate, completion rate) | YouTube + Meta Channel Managers |
| LP content (for message match scoring) | LP Agent data / Webflow API |
| Selling point taxonomy | Configuration store |
| Brand guidelines | monday.com DAM / static config |
| Historical creative performance and A/B test results | Agent local store |
| Audience segment definitions (for tailored creative) | Audience Agent data |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Creative fatigue alerts | Brain (priority queue), Slack |
| Ad-LP message match scores | Agent local store, UI dashboard, LP Agent |
| New creative copy (headlines, descriptions, body text) | Human review queue, then Channel Managers |
| Video scripts and storyboard concepts | Creative team (monday.com task), human review |
| Visual concept briefs | Creative team (monday.com task), human review |
| A/B test designs | Brain (for approval and budget allocation) |
| Creative performance patterns report (weekly) | Ido + creative team, Slack |
| Creative rotation/launch requests | Channel Managers (post-approval) |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Creative performance analysis and reporting | Level 3 (act + notify) | — |
| Creative fatigue detection + alerts | Level 3 (act + notify) | — |
| Rotate to pre-approved creative variant | Level 1 (recommend) | 10 successful rotations (CTR stabilized/improved) |
| Generate new ad copy (text) | Level 1 (recommend) | After creative team confirms quality bar met on 20 pieces |
| Submit new copy to Channel Manager | Level 1 (recommend) | Stays Level 1 — brand risk |
| Generate visual concepts | Level 0 (observe) → Level 1 | After proving ad-LP message match scoring accuracy |
| Generate video scripts | Level 0 (observe) → Level 1 | Same as above |
| A/B test launch | Level 1 (recommend) | Stays Level 1 — requires budget |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Brand compliance** | All generated copy checked against brand voice guidelines before submission |
| **Fatigue threshold** | Minimum 7 days of data before flagging fatigue (avoid false positives from normal variance) |
| **Test budget cap** | Creative A/B tests capped at 15% of ad group budget |
| **Rotation cool-down** | Minimum 48h between creative rotations in the same ad group |
| **Message match floor** | Alert if any active ad-LP pair scores <40 on message match |
| **Generated content review** | All AI-generated creative must pass human review before going live (no exceptions at launch) |
| **Volume gate** | Max 10 new creative pieces generated per day (prevent review queue overload) |
| **Channel Manager gate** | All creative changes on platforms go through Channel Managers |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Average creative lifespan before fatigue | Increase by 20% (better rotation timing) |
| Ad-LP message match score (portfolio average) | >70 across all active paths |
| Creative generation acceptance rate | >60% of AI-generated copy approved with minor edits |
| A/B test win rate | >40% of new variants beat control |
| Time from fatigue detection to replacement live | <72h |
| Cross-channel creative insight adoption | Creative team acts on >80% of weekly insights |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, budget for tests) | Brain (creative health informs 4-duck scores) |
| Channel Managers (creative data, change execution) | Channel Managers (creative change requests) |
| Audience Agent (audience profiles for tailored messaging) | LP Agent (message match scores trigger LP updates) |
| LP Agent (LP content for message match) | Performance Agent (creative changes affect performance) |
| — | Onboarding Agent (creative selling points should carry through) |

---

### 5. Landing Pages Agent

**CVR/behavior insights, page creation, A/B test launch**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| LP conversion rate analysis (visit → signup CVR per segment) | Ad creative content (Creative Agent owns) |
| LP user behavior analysis (scroll depth, time on page, bounce, rage clicks) | Audience targeting (Audience Agent owns) |
| LP content creation and variant generation | Budget for LP traffic (Brain owns) |
| LP A/B test design, launch, and analysis | Post-signup onboarding (Onboarding Agent owns) |
| LP-Ad message consistency enforcement | Campaign structure |
| Page speed / Core Web Vitals monitoring | Platform changes (Channel Managers own) |
| LP selling point presence and prominence tagging | — |
| LP personalization by audience segment | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Webflow API | LP content read/write, variant management, publishing |
| GA4 | LP session data, behavior flow, scroll depth, bounce rate, event tracking |
| Google Optimize / VWO / custom A/B platform | A/B test management, variant serving, statistical significance |
| DWT Mart | LP → signup → paying funnel conversion data |
| Hotjar / Microsoft Clarity API | Heatmaps, session recordings, rage click detection |
| Google PageSpeed Insights API | Core Web Vitals, performance scores |
| Channel Managers (UTM context) | Map LP sessions to ad source (audience x channel x selling point) |
| Anthropic SDK | LP content analysis, variant generation, selling point extraction, copy generation |
| Agent Local Store | LP performance history, A/B test results, selling point maps |
| Slack API | Test result notifications, CVR alerts |

#### Workflow

**Trigger:** Daily CVR monitoring + Brain-triggered LP investigations + A/B test completion events

| Step | Action | Output |
|------|--------|--------|
| 1 | Query GA4 + DWT mart for LP session data segmented by UTM (audience x channel x selling point) | LP performance dataset by segment |
| 2 | Compute per-segment CVR and behavior metrics (scroll depth, bounce, time, rage clicks) | Behavior analysis per LP variant |
| 3 | Score LP selling point presence: scrape LP content, tag selling points, compare to ad selling points | Selling point presence map (above fold / below fold / absent) |
| 4 | Identify LP bottlenecks: high-traffic + low-CVR segments | Bottleneck list ranked by opportunity size |
| 5 | For bottleneck LPs, diagnose: is it message mismatch? Speed? UX? Content? | Root cause analysis |
| 6 | Generate LP variant proposals: updated headlines, restructured value props, CTA changes | LP variant drafts |
| 7 | Design A/B test: control vs variant, traffic split, minimum sample size, expected duration | Test plan |
| 8 | Launch approved tests via Webflow + testing platform | Live A/B test |
| 9 | Monitor running tests daily. Call winner when statistical significance reached. | Test results + recommendation |
| 10 | Report findings to Brain and Creative Agent (for message match alignment) | Cross-agent reports |

#### Sub-agents/Sub-tasks Structure

No per-channel sub-agents — LP analysis is organized by funnel stage:

| Sub-task | Focus |
|----------|-------|
| **CVR Analysis Sub-task** | Per-segment conversion rates, funnel drop-off analysis (visit → scroll → CTA click → signup), trend detection |
| **Behavior Analysis Sub-task** | Scroll depth heatmaps, time-on-page patterns, rage click detection, form abandonment, mobile vs desktop behavior |
| **Content Analysis Sub-task** | Selling point extraction from LP content, message match scoring vs ads, headline effectiveness, value prop clarity |
| **Page Performance Sub-task** | Core Web Vitals monitoring (LCP, CLS, FID), page speed by device/geo, third-party script impact |
| **A/B Test Management Sub-task** | Test design, sample size calculation, significance monitoring, winner declaration, result documentation |
| **LP Generation Sub-task** | New LP variant creation in Webflow, personalized LP sections by audience segment, dynamic content insertion |

#### Data Inputs

| Data | Source |
|------|--------|
| LP session data (page views, scroll, time, events) | GA4 |
| LP → signup → paying conversion data | DWT mart |
| LP content (HTML, structured content) | Webflow API / scraping |
| UTM parameters (mapping sessions to ad source) | GA4 / URL parameters |
| Page speed data | PageSpeed Insights API |
| Heatmap/session recording data | Hotjar/Clarity |
| Ad selling points (for message match) | Creative Agent data |
| Active A/B test configurations | Testing platform |
| Historical LP test results | Agent local store |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| LP CVR reports by segment (daily) | Brain, UI dashboard |
| Selling point presence/prominence scores | Agent local store, Creative Agent, UI |
| LP bottleneck alerts (high traffic + low CVR) | Brain (priority queue), Slack |
| LP variant drafts (headlines, copy, structure) | Human review queue |
| A/B test plans | Brain (for budget approval) |
| A/B test results | Agent local store, Brain, Slack, UI |
| Page speed alerts | Slack (immediate if LCP > 3s) |
| LP content taxonomy (structured selling point map) | Creative Agent (for message match), Onboarding Agent |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| LP data analysis and reporting | Level 3 (act + notify) | — |
| Page speed monitoring and alerts | Level 3 (act + notify) | — |
| Selling point presence scoring | Level 3 (act + notify) | — |
| Generate LP variant copy | Level 1 (recommend) | 10 approved variants with positive test results |
| Publish LP variant to Webflow (staging) | Level 1 (recommend) | After 5 staging publishes reviewed and approved |
| Launch A/B test (with test plan) | Level 1 (recommend) | Stays Level 1 — requires traffic allocation |
| Publish A/B test winner to production | Level 1 (recommend) | Stays Level 1 — customer-facing change |
| Emergency: revert LP change causing >50% CVR drop | Level 2 (act + notify) | — (safety mechanism) |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Test traffic minimum** | No A/B test launched without minimum 500 sessions/variant projected within 14 days |
| **Statistical significance** | No winner declared below 95% confidence and 100 conversions per variant |
| **CVR drop protection** | Auto-alert if any LP variant's CVR drops >30% vs 7d baseline; auto-pause test variant if >50% drop |
| **Content review** | All new LP content reviewed by marketing team before going live |
| **Speed threshold** | Block LP publish if PageSpeed score drops below 60 (mobile) |
| **One test at a time** | Only one active A/B test per LP to avoid interaction effects |
| **Test duration** | Minimum 7 days, maximum 30 days. Auto-end inconclusive tests. |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Blended LP CVR improvement | +15% in 90 days |
| A/B test velocity | 4+ tests completed per month |
| A/B test win rate | >35% of variants beat control |
| Message match score (LP-Ad) | >75 average across active paths |
| Page speed compliance | 100% of LPs above 60 mobile PageSpeed |
| Time from bottleneck detection to test launch | <5 business days |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, traffic budget for tests) | Brain (LP health is duck 3 in 4-duck scoring) |
| Creative Agent (ad selling points for message match) | Creative Agent (LP changes may require ad updates) |
| Audience Agent (segment definitions for per-audience analysis) | Onboarding Agent (LP selling point should carry to onboarding) |
| GA4 data freshness | Performance Agent (LP CVR affects campaign-level metrics) |
| Webflow API availability | UI dashboard (LP scores) |

---

### 6. Personalized Onboarding & Lifecycle Agent

**Post-signup experience optimization, onboarding personalization, retention**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Onboarding flow analysis (signup → activation → engagement) | Pre-signup funnel (Brain + other agents) |
| Onboarding personalization by acquisition source | Product feature development |
| Selling point continuity from LP → onboarding | Ad or LP content |
| Lifecycle email/notification optimization | Budget allocation |
| Churn risk detection for recently acquired users | CRM/sales pipeline management |
| Onboarding variant testing | Platform changes (Channel Managers own) |
| Welcome experience optimization | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| BigBrain/Snowflake | User onboarding events, activation milestones, engagement metrics, cohort data |
| monday.com Product Analytics | In-product behavior, feature adoption, board creation, template usage |
| Customer.io / Iterable (email platform) | Onboarding email sequences, triggered messages, engagement data |
| DWT Mart | Acquisition source → onboarding → paying conversion paths |
| Intercom / in-app messaging platform | Onboarding tooltips, product tours, in-app messages |
| GA4 | Post-signup web behavior, day-2/day-7 return rates |
| Anthropic SDK | Onboarding copy generation, personalization logic, churn prediction reasoning |
| Agent Local Store | Onboarding variant performance, A/B test results, cohort comparisons |
| Slack API | Churn risk alerts, onboarding insights reports |

#### Workflow

**Trigger:** Daily onboarding metrics check + weekly deep cohort analysis + Brain-triggered investigations

| Step | Action | Output |
|------|--------|--------|
| 1 | Query BigBrain for onboarding funnel metrics: signup → account setup → first action → day-2 return → day-7 active → paying | Onboarding funnel by acquisition source |
| 2 | Segment onboarding performance by: channel x audience x selling point x LP variant | Per-path onboarding rates |
| 3 | Identify drop-off points: where in onboarding do users from specific acquisition paths churn? | Drop-off analysis |
| 4 | Score selling point continuity: does the onboarding experience reinforce what the ad/LP promised? | Continuity scores |
| 5 | Detect high-risk cohorts: recently acquired users showing churn signals (no day-2 return, no key actions) | Churn risk list |
| 6 | Generate onboarding variant proposals: personalized welcome messages, feature highlights aligned to selling point | Variant proposals |
| 7 | Analyze lifecycle email performance: open rates, click rates, conversion to activation milestone | Email performance report |
| 8 | Recommend email sequence adjustments based on acquisition source | Email optimization proposals |
| 9 | Report to Brain for 4-duck scoring (duck 4: product) | Cross-agent report |

#### Sub-agents/Sub-tasks Structure

Organized by onboarding stage, not by channel (since onboarding is channel-agnostic post-signup):

| Sub-task | Focus |
|----------|-------|
| **Welcome Experience Sub-task** | First login experience, welcome screen personalization by selling point, account setup wizard optimization |
| **Activation Sub-task** | Key activation milestones (create first board, invite team member, set up first workflow), time-to-activation analysis |
| **Lifecycle Email Sub-task** | Email sequence analysis, send-time optimization, content personalization, unsubscribe rate monitoring |
| **Retention Sub-task** | Day-2/day-7/day-30 return rate analysis, churn prediction, re-engagement trigger design |
| **Continuity Scoring Sub-task** | Ad → LP → Onboarding selling point thread analysis, content gap detection |

#### Data Inputs

| Data | Source |
|------|--------|
| User signup events with acquisition source (UTM) | BigBrain / GA4 |
| Onboarding milestone events | BigBrain / product analytics |
| Day-2, day-7, day-30 return data | BigBrain / GA4 |
| Email engagement metrics | Customer.io / Iterable |
| In-app message interaction data | Intercom |
| Onboarding flow content | Product team config / CMS |
| LP selling points (for continuity scoring) | LP Agent data |
| Ad selling points | Creative Agent data |
| Paying conversion data by cohort | DWT mart |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Onboarding funnel reports by acquisition source | Brain, UI dashboard |
| Selling point continuity scores | Agent local store, UI, Creative Agent, LP Agent |
| Churn risk alerts (cohort-level) | Slack, Brain |
| Onboarding variant proposals | Product team (monday.com task) |
| Email sequence optimization recommendations | Marketing ops team |
| Activation rate trends | Brain (for 4-duck scoring) |
| Cohort comparison reports (weekly) | Ido + team |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Onboarding data analysis and reporting | Level 3 (act + notify) | — |
| Selling point continuity scoring | Level 3 (act + notify) | — |
| Churn risk alerting | Level 3 (act + notify) | — |
| Onboarding copy generation | Level 1 (recommend) | Product team confirms quality on 15 pieces |
| Email sequence changes | Level 1 (recommend) | 5 approved changes with positive engagement impact |
| In-app message changes | Level 1 (recommend) | Stays Level 1 — in-product changes |
| Onboarding flow structural changes | Level 1 (recommend) | Stays Level 1 — product team owns |
| A/B test on onboarding variant | Level 1 (recommend) | Stays Level 1 — affects user experience |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Email frequency** | No user receives more than 3 onboarding emails in first 7 days |
| **Test isolation** | Only one onboarding experiment per user cohort at a time |
| **Minimum sample** | No onboarding test launched with <200 expected signups/variant in 14 days |
| **Churn threshold** | Alert if any acquisition-source cohort's day-2 return drops below 30% |
| **Content review** | All onboarding content changes require product team approval |
| **Personalization privacy** | No individual-level targeting; all personalization based on cohort/segment attributes |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Signup → activation rate improvement | +10% in 60 days |
| Day-2 return rate | Improve from baseline by +8% |
| Selling point continuity score (Ad→LP→Onboarding) | >65 average |
| Onboarding email engagement (click rate) | +15% improvement |
| Time to first key action | Reduce by 20% |
| Churn prediction accuracy | >70% of flagged cohorts confirmed as high-churn |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments) | Brain (duck 4 scores) |
| LP Agent (LP selling points for continuity) | Audience Agent (onboarding performance informs audience quality) |
| Creative Agent (ad selling points) | Brain (acquisition source quality signals) |
| BigBrain data availability | Lifecycle email platform |
| Product team cooperation (onboarding changes) | — |

---

### 7. Product Behaviour Insights Agent

**AI/agents/events usage analysis — feeding upstream marketing intelligence**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Product usage pattern analysis relevant to marketing | Product development decisions |
| Feature adoption tracking by acquisition source | Marketing campaign execution |
| AI feature usage analysis (monday AI, automations, agents) | Onboarding flow (Onboarding Agent owns) |
| Events/integrations usage insights | Creative content |
| Product-marketing alignment scoring | Budget allocation |
| Use case discovery from behavioral data | Platform changes (Channel Managers own) |
| Paying conversion and expansion revenue analysis by source | — |
| ICP (Ideal Customer Profile) refinement from product data | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| BigBrain/Snowflake | Product usage data: board creation, automations, AI assistant usage, integrations, team size, plan upgrades |
| monday.com Product Analytics | Feature adoption funnels, AI feature engagement, event tracking |
| DWT Mart | Acquisition source → product behavior → revenue mapping |
| Stripe / billing system | Revenue data, plan changes, expansion revenue, churn events |
| Anthropic SDK | Pattern recognition in usage data, use case clustering, ICP analysis |
| Agent Local Store | Product behavior scores, ICP definitions, usage trend history |
| Slack API | Product insight reports, ICP update notifications |

#### Workflow

**Trigger:** Weekly deep analysis + Brain-triggered investigations + monthly ICP review

| Step | Action | Output |
|------|--------|--------|
| 1 | Query BigBrain for product usage metrics segmented by acquisition source (channel x audience x selling point) | Usage dataset by source |
| 2 | Analyze feature adoption patterns: which features do high-value users adopt? When? | Feature adoption map |
| 3 | Specifically track AI/agents usage: AI assistant queries, automation creation, workflow agents | AI adoption report |
| 4 | Track events/integrations usage: which integrations are set up, how quickly, by which cohorts | Integration adoption map |
| 5 | Compute product-marketing alignment: do users acquired via "CRM" ads actually use CRM features? | Alignment scores per funnel path |
| 6 | Identify ICP signals: what product behaviors predict high LTV? | ICP behavioral criteria |
| 7 | Segment paying conversion analysis: which acquisition paths produce the highest ACV and lowest churn? | Revenue quality by source |
| 8 | Discover use cases from behavioral clusters: "This cohort uses monday.com primarily for X" | Use case taxonomy |
| 9 | Report insights to Brain and relevant function agents | Cross-agent reports |

#### Sub-agents/Sub-tasks Structure

Organized by product domain:

| Sub-task | Focus |
|----------|-------|
| **AI/Agents Usage Sub-task** | AI assistant adoption rate, automation creation patterns, workflow agent usage, AI feature engagement depth by acquisition source |
| **Core Product Usage Sub-task** | Board creation, item management, view usage (Timeline, Kanban, etc.), team collaboration patterns |
| **Events/Integrations Sub-task** | Integration setup rate, most-used integrations by segment, event-driven workflow adoption |
| **Revenue & Expansion Sub-task** | Trial → paid conversion, plan upgrade patterns, seat expansion, ACV by source, churn correlation |
| **ICP Analysis Sub-task** | Behavioral ICP definition, company size/industry patterns, product-qualified lead (PQL) scoring |

#### Data Inputs

| Data | Source |
|------|--------|
| Product usage events (board CRUD, view usage, automation, AI) | BigBrain / product analytics |
| AI feature usage (assistant queries, automation triggers, agent runs) | BigBrain |
| Integration/event setup and usage | BigBrain |
| Revenue data (plan, ACV, upgrades, churn) | Billing system / DWT mart |
| Acquisition source (UTM → user mapping) | BigBrain / GA4 |
| Company firmographic data | BigBrain / Clearbit enrichment |
| User onboarding completion status | Onboarding Agent data |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Product behavior scores by acquisition source | Brain (4-duck scoring — duck 4), UI dashboard |
| AI feature adoption report | Ido + product marketing team, Slack |
| ICP behavioral criteria updates | Audience Agent (for targeting refinement) |
| Product-marketing alignment scores | Brain, Creative Agent (for messaging alignment) |
| Revenue quality analysis by source | Brain (for budget allocation intelligence) |
| Use case taxonomy | Creative Agent (for use-case-specific messaging), LP Agent (for LP personalization) |
| High-LTV behavioral signals | Audience Agent (for lookalike seed lists) |
| Monthly product insights report | Ido, marketing leadership |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| All product data analysis and reporting | Level 3 (act + notify) | — |
| ICP criteria update recommendations | Level 1 (recommend) | — (audience targeting impact) |
| Use case taxonomy updates | Level 2 (act + notify) | — (informational, low risk) |
| PQL scoring model adjustments | Level 1 (recommend) | Stays Level 1 — affects sales pipeline |

This agent is primarily observational — it reads product data and produces insights. It has no direct execution capability on marketing platforms or the product itself. Its value is intelligence that makes other agents smarter.

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Data privacy** | No individual user data in reports — all analysis at cohort/segment level |
| **Minimum cohort size** | No insights derived from cohorts smaller than 50 users |
| **Data lag** | Flag when product data is >24h stale |
| **ICP change rate** | ICP criteria can only be updated monthly (prevent whiplash) |
| **Cross-team communication** | Product insights that suggest product changes must go through product team, not directly to engineering |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Product-marketing alignment score improvement | +10 points average in 90 days |
| ICP accuracy (predicted high-LTV users actually become high-LTV) | >65% precision |
| Use case discovery | 3+ actionable new use cases identified per quarter |
| AI feature adoption insights adopted by creative team | >70% of insights acted on |
| Revenue quality by source visibility | 100% of channels have LTV data within 60 days |
| Insight-to-action latency | <5 business days from insight to upstream agent adjustment |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| BigBrain data completeness and latency | Brain (product behavior is duck 4 in scoring) |
| DWT mart (acquisition source mapping) | Audience Agent (ICP signals → targeting) |
| Onboarding Agent (onboarding status context) | Creative Agent (use cases → messaging angles) |
| Billing system data access | LP Agent (use cases → LP personalization) |
| — | Onboarding Agent (product behavior → onboarding optimization) |

---

### 8. Google Search Channel Manager

**Intelligent execution layer for Google Search — validates, resolves conflicts, audits, and executes all Search campaign changes**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| All write operations to Google Ads API (Search campaigns) | Cross-channel budget allocation (Brain owns) |
| Request validation against account context and guardrails | Creative strategy or audience strategy (function agents own) |
| Conflict resolution between competing requests for the same campaign/ad group | What to optimize — only how to safely execute it |
| Account structure awareness (campaign hierarchy, naming, experiments) | Incrementality testing design (Brain owns) |
| Change audit trail (who requested, why, what changed, rollback data) | — |
| Pacing monitoring (hourly/daily spend vs. targets) | — |
| Ad-hoc request handling from human channel teams | — |
| Active experiment tracking (what's running, what's pending) | — |

**Dual-input model:** This agent accepts requests from two sources:
1. **Function agents** (via the message bus) — structured change requests with rationale
2. **Human channel teams** (via Slack or dashboard) — ad-hoc queries and change requests

Both go through the same validation pipeline. Both are audited identically.

#### Integrations Required

| Integration | Purpose | Access Type |
|-------------|---------|-------------|
| Google Ads API | Campaign management, keywords, bids, ads, ad groups, negative keywords, audiences, extensions | Read + Write |
| Google Ads Scripts (optional) | High-frequency automated rules (hourly bid adjustments at scale) | Read + Write |
| Agent Local Store (Postgres) | Change queue, audit log, experiment tracker, account state cache | Read + Write |
| Agent Message Bus | Receive requests from function agents, send status updates | Read + Write |
| Slack API | Receive ad-hoc requests from human teams, send change notifications | Read + Write |
| DWT Mart | Conversion data for validation (e.g., "is this keyword actually converting?") | Read |
| Brain (via message bus) | Escalate unresolvable conflicts, receive budget directives | Read + Write |

#### Workflow

**Trigger:** Continuous — processes request queue in near-real-time during business hours; batch processing overnight

| Step | Action | Output |
|------|--------|--------|
| 1 | Receive change request (from function agent or human team) | Request in queue |
| 2 | Parse request: what entity (campaign/ad group/keyword/ad), what change, what rationale | Structured change record |
| 3 | Load account context: current state of the entity, recent changes, active experiments, pacing status | Context snapshot |
| 4 | **Validate against guardrails:** budget ceilings, bid limits, experiment conflicts, change frequency limits, naming conventions | Validation result (pass/fail with reasons) |
| 5 | **Check for conflicts:** is there a pending or recent change to the same entity from another source? | Conflict detection result |
| 6 | If conflict detected: attempt resolution (latest-wins for low-risk, priority-based for high-risk). If unresolvable, escalate to Brain | Resolution or escalation |
| 7 | If validation passes: check approval level. Level 2+ → execute immediately. Level 0-1 → queue for human approval | Execution decision |
| 8 | Execute change via Google Ads API. Store before-state for rollback | Execution result + audit record |
| 9 | Post-execution: verify change applied correctly (read-back from API) | Verification result |
| 10 | Notify requester (agent or human) of outcome. Update audit log | Notification + audit entry |
| 11 | Monitor post-change performance (next 24-48h). Auto-alert if significant degradation | Post-change monitoring |

**For ad-hoc human requests:**

| Step | Action | Output |
|------|--------|--------|
| 1 | Human posts in Slack: "What's Campaign X spending today?" or "Pause ad group Y" | Natural language request |
| 2 | Parse intent: is this a query (read-only) or a change request? | Classified request |
| 3 | For queries: pull data from Google Ads API, format response, reply in Slack | Slack response |
| 4 | For changes: enter the standard validation pipeline (Step 2-11 above) | Standard execution flow |

#### Sub-agents/Sub-tasks Structure

| Sub-task | Focus |
|----------|-------|
| **Request Validation Sub-task** | Guardrail checking, budget ceiling enforcement, experiment conflict detection, naming convention validation |
| **Conflict Resolution Sub-task** | Detect competing changes to same entity, apply resolution rules, escalate when needed |
| **Execution Sub-task** | Google Ads API calls, retry logic, error handling, read-back verification |
| **Pacing Monitor Sub-task** | Hourly spend tracking vs. daily targets, overspend/underspend alerts, automated pacing adjustments within guardrails |
| **Experiment Tracker Sub-task** | Track active A/B tests and experiments, prevent conflicting changes to test entities, flag when tests reach significance |
| **Audit & Rollback Sub-task** | Maintain before/after state for every change, auto-rollback triggers, change history queries |

#### Data Inputs

| Data | Source |
|------|--------|
| Change requests (structured) | Function agents via message bus |
| Ad-hoc requests (natural language) | Human teams via Slack |
| Budget directives | Brain via message bus |
| Account structure (campaigns, ad groups, keywords, ads) | Google Ads API (cached + live) |
| Performance data (spend, clicks, conversions, CPC, ROAS) | Google Ads API + DWT mart |
| Active experiment registry | Agent local store |
| Recent change history | Agent local store (audit log) |
| Guardrail configuration (bid ceilings, budget floors, etc.) | Configuration store |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Execution confirmations | Requesting agent or human (via message bus or Slack) |
| Account status reports | Brain (daily summary), function agents (on request) |
| Audit log entries | Agent local store (append-only) |
| Pacing alerts | Brain + Slack (if spend deviates >20% from target) |
| Conflict escalations | Brain (for resolution) |
| Experiment status updates | Agent local store, requesting agents |
| Change rollback records | Agent local store |
| Channel health snapshot (daily) | Brain, UI dashboard |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Status queries (read-only) | Level 4 (full auto) | — |
| Bid adjustments <=10% | Level 2 (act + notify) | — |
| Bid adjustments >10% | Level 1 (recommend) | 20 approved adjustments with positive outcome |
| Pause/enable campaigns | Level 1 (recommend) | Stays Level 1 — high impact |
| Budget shifts <=15% between ad groups | Level 2 (act + notify) | — |
| Budget shifts >15% | Level 1 (recommend) | 10 approved shifts with positive outcome |
| Create new campaigns/ad groups | Level 1 (recommend) | Stays Level 1 — structural change |
| Create/upload new ads (RSAs) | Level 1 (recommend) | Stays Level 1 — brand-facing |
| Add negative keywords (exact match) | Level 2 (act + notify) | — |
| Add negative keywords (broad match) | Level 1 (recommend) | Stays Level 1 — high risk |
| Account structure changes (merge/split) | Level 0 (observe) → Level 1 | After 3 months of stable operations |
| Automated pacing adjustments | Level 2 (act + notify) | — (within guardrails only) |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Budget ceiling** | Cannot exceed Brain-set daily budget cap for Search. Hard stop, no override |
| **Bid ceiling** | No bid exceeds 2x account average CPC for that campaign type |
| **Bid floor** | No bid below estimated page-1 minimum (from auction data) |
| **Change frequency** | Max one bid change per keyword per 48h; max one structure change per ad group per 7d |
| **Experiment protection** | Cannot modify entities in active A/B tests unless the requesting agent owns the test |
| **Rollback trigger** | Auto-rollback if post-change ROAS drops >40% within 48h (compared to 7d baseline) |
| **Naming enforcement** | All new campaigns/ad groups must follow naming taxonomy. Reject non-compliant requests |
| **Negative keyword safety** | Verify no conversions in 90 days before adding negatives |
| **Concurrent change limit** | Max 50 changes per execution batch (prevent API flooding and review overload) |
| **Human override** | Human channel team can override any Channel Manager decision via Slack with reason logged |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Change request validation accuracy | >98% — valid changes pass, invalid changes caught |
| Conflict resolution rate (without Brain escalation) | >85% of conflicts resolved locally |
| Execution success rate | >99% of approved changes execute without API errors |
| Post-change performance (no degradation) | >90% of changes show neutral or positive performance at 48h |
| Ad-hoc response time (human queries) | <5 min for status queries, <15 min for change requests |
| Audit completeness | 100% of changes have full before/after state logged |
| Rollback accuracy | 100% of auto-rollbacks restore exact previous state |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (budget directives, escalation resolution) | Brain (channel status, pacing, escalations) |
| Function agents (change requests with rationale) | Function agents (execution confirmations, account data) |
| Google Ads API availability | UI dashboard (Search channel health) |
| DWT mart (conversion data for validation) | Audit log (system-wide) |
| Human channel team (ad-hoc requests) | Slack (notifications, query responses) |

---

### 9. Meta Channel Manager

**Intelligent execution layer for Meta (Facebook/Instagram) — validates, resolves conflicts, audits, and executes all Meta campaign changes**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| All write operations to Meta Marketing API | Cross-channel budget allocation (Brain owns) |
| Request validation against account context and Meta-specific guardrails | Creative strategy or audience strategy (function agents own) |
| Conflict resolution between competing requests for the same campaign/ad set | What to optimize — only how to safely execute it |
| Account structure awareness (campaign hierarchy, CBO/ABO settings, Advantage+ configs) | Incrementality testing design (Brain owns) |
| Learning phase management (protect ad sets in learning phase from premature changes) | — |
| Change audit trail (who requested, why, what changed, rollback data) | — |
| Pacing monitoring and delivery insights | — |
| Ad-hoc request handling from human channel teams | — |
| Creative asset management (upload, format validation, policy pre-check) | — |

**Meta-specific complexity:** Meta's learning phase, Advantage+ automation, and CBO (Campaign Budget Optimization) create unique constraints. This Channel Manager must understand these mechanics to prevent changes that reset learning or conflict with Meta's own optimization. This is exactly why a dumb executor doesn't work here.

#### Integrations Required

| Integration | Purpose | Access Type |
|-------------|---------|-------------|
| Meta Marketing API | Campaigns, ad sets, ads, audiences, creatives, insights, custom conversions | Read + Write |
| Meta Business Manager | Account-level settings, pixel configuration, partner access | Read |
| Agent Local Store (Postgres) | Change queue, audit log, experiment tracker, learning phase tracker, account state cache | Read + Write |
| Agent Message Bus | Receive requests from function agents, send status updates | Read + Write |
| Slack API | Receive ad-hoc requests from human teams, send change notifications | Read + Write |
| DWT Mart | Conversion data for validation | Read |
| Brain (via message bus) | Escalate unresolvable conflicts, receive budget directives | Read + Write |

#### Workflow

**Trigger:** Continuous — processes request queue in near-real-time during business hours; batch processing overnight

| Step | Action | Output |
|------|--------|--------|
| 1 | Receive change request (from function agent or human team) | Request in queue |
| 2 | Parse request: what entity (campaign/ad set/ad/audience), what change, what rationale | Structured change record |
| 3 | Load account context: current state, learning phase status, CBO settings, Advantage+ config, recent changes | Context snapshot |
| 4 | **Meta-specific validation:** Is the ad set in learning phase? Will this change reset learning? Does this conflict with CBO? Is the audience overlapping with another active ad set? | Meta-specific validation result |
| 5 | **Standard validation:** budget ceilings, bid limits, experiment conflicts, change frequency limits | Standard validation result |
| 6 | **Check for conflicts:** competing changes to same entity from different sources | Conflict detection result |
| 7 | If conflict detected: attempt resolution. If unresolvable, escalate to Brain | Resolution or escalation |
| 8 | If validation passes: check approval level. Execute or queue for human approval | Execution decision |
| 9 | Execute change via Meta Marketing API. Store before-state for rollback | Execution result + audit record |
| 10 | Post-execution: verify change applied. Check if learning phase was reset (if so, log and alert) | Verification result |
| 11 | Notify requester of outcome. Update audit log | Notification + audit entry |
| 12 | Monitor post-change delivery (next 24-48h). Alert if delivery issues or learning phase stalls | Post-change monitoring |

#### Sub-agents/Sub-tasks Structure

| Sub-task | Focus |
|----------|-------|
| **Request Validation Sub-task** | Guardrail checking, Meta-specific constraint enforcement (learning phase, CBO, Advantage+), audience overlap detection |
| **Learning Phase Monitor Sub-task** | Track learning phase status for all active ad sets, prevent premature changes, alert when learning completes or stalls |
| **Conflict Resolution Sub-task** | Detect competing changes, apply resolution rules, escalate when needed |
| **Execution Sub-task** | Meta Marketing API calls, creative asset upload, retry logic, error handling, policy violation detection |
| **Pacing & Delivery Sub-task** | Spend pacing, delivery insights, CPM trends, frequency monitoring, audience saturation detection |
| **Creative Asset Management Sub-task** | Format validation (image sizes, video specs), Meta ad policy pre-screening, creative asset versioning |
| **Audit & Rollback Sub-task** | Before/after state for every change, auto-rollback triggers, change history |

#### Data Inputs

| Data | Source |
|------|--------|
| Change requests (structured) | Function agents via message bus |
| Ad-hoc requests (natural language) | Human teams via Slack |
| Budget directives | Brain via message bus |
| Account structure (campaigns, ad sets, ads, audiences) | Meta Marketing API (cached + live) |
| Learning phase status | Meta Marketing API |
| Performance data (spend, impressions, CPM, CPC, conversions) | Meta Marketing API + DWT mart |
| Creative assets (images, videos) | Function agents (Creative Agent) |
| Active experiment registry | Agent local store |
| Recent change history | Agent local store (audit log) |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Execution confirmations | Requesting agent or human |
| Account status reports (including learning phase states) | Brain, function agents |
| Learning phase alerts | Brain + Slack (when learning resets or stalls) |
| Audit log entries | Agent local store |
| Pacing alerts | Brain + Slack |
| Conflict escalations | Brain |
| Audience overlap warnings | Audience Agent, Brain |
| Channel health snapshot (daily) | Brain, UI dashboard |
| Creative policy rejection alerts | Creative Agent, Slack |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Status queries (read-only) | Level 4 (full auto) | — |
| Bid/cost cap adjustments <=10% | Level 2 (act + notify) | — |
| Bid/cost cap adjustments >10% | Level 1 (recommend) | 20 approved adjustments with positive outcome |
| Pause/enable campaigns | Level 1 (recommend) | Stays Level 1 — high impact |
| Budget shifts <=15% between ad sets | Level 2 (act + notify) | — |
| Budget shifts >15% | Level 1 (recommend) | 10 approved shifts with positive outcome |
| Create new campaigns/ad sets | Level 1 (recommend) | Stays Level 1 — structural change |
| Upload/enable new ads | Level 1 (recommend) | Stays Level 1 — brand-facing |
| Audience changes (new custom/LAL audiences) | Level 1 (recommend) | Stays Level 1 — spend impact |
| CBO/ABO toggle | Level 1 (recommend) | Stays Level 1 — learning phase reset risk |
| Advantage+ configuration changes | Level 1 (recommend) | Stays Level 1 — Meta black-box risk |
| Automated pacing adjustments | Level 2 (act + notify) | — (within guardrails only) |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Budget ceiling** | Cannot exceed Brain-set daily budget cap for Meta. Hard stop |
| **Learning phase protection** | Do not modify ad sets in active learning phase unless the change is critical (>30% ROAS decline). Alert and require human approval for any learning-phase interruption |
| **CBO respect** | When campaign uses CBO, do not make ad-set-level budget changes (they conflict with Meta's optimization) |
| **Audience overlap** | Warn if new ad set's audience overlaps >30% with active ad sets. Block at >60% overlap |
| **Creative policy pre-check** | Screen creative content against Meta's ad policies before upload (text-on-image ratio, prohibited content) |
| **Frequency cap** | Alert if any audience reaches >3 impressions/day on Meta (fatigue risk) |
| **Change frequency** | Max one significant change per ad set per 72h (to allow Meta's algorithm to stabilize) |
| **Rollback trigger** | Auto-rollback if post-change CPA increases >50% within 48h |
| **Concurrent change limit** | Max 30 changes per execution batch |
| **Human override** | Human channel team can override with reason logged |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Change request validation accuracy | >98% |
| Learning phase preservation rate | >95% of ad sets not disrupted by premature changes |
| Conflict resolution rate (without Brain escalation) | >80% resolved locally |
| Execution success rate | >99% |
| Post-change performance (no degradation) | >85% neutral or positive at 48h (lower than Search due to Meta's algorithm volatility) |
| Ad-hoc response time | <5 min for queries, <15 min for changes |
| Creative policy pre-check accuracy | >90% of flagged creatives confirmed as policy violations by Meta |
| Audit completeness | 100% |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (budget directives, escalation resolution) | Brain (channel status, pacing, escalations) |
| Function agents (change requests) | Function agents (execution confirmations, account data, learning phase status) |
| Meta Marketing API availability | UI dashboard (Meta channel health) |
| DWT mart (conversion data for validation) | Audit log (system-wide) |
| Human channel team (ad-hoc requests) | Slack (notifications, query responses) |
| Creative Agent (creative assets for upload) | Creative Agent (policy rejection feedback) |

---

### 10. YouTube Channel Manager

**Intelligent execution layer for YouTube Ads — validates, resolves conflicts, audits, and executes all YouTube campaign changes**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| All write operations to Google Ads API (Video campaigns) | Cross-channel budget allocation (Brain owns) |
| Request validation against YouTube-specific context and guardrails | Creative strategy (Creative Agent owns) |
| Conflict resolution between competing requests | What to optimize — only how to safely execute it |
| Account structure awareness (campaign types, targeting, formats) | Incrementality testing design (Brain owns) |
| Video format management (TrueView, Bumper, Shorts, in-stream, discovery) | — |
| Change audit trail | — |
| Pacing monitoring and view-rate tracking | — |
| Ad-hoc request handling from human channel teams | — |
| YouTube-specific creative spec validation (video length, format, thumbnail) | — |

**YouTube-specific complexity:** YouTube campaigns live in Google Ads but have completely different optimization dynamics — view rate vs. click rate, video completion funnels, format-specific targeting, and the interplay between organic and paid YouTube presence. The Channel Manager must understand these nuances to prevent function agents from applying Search-logic to Video campaigns.

#### Integrations Required

| Integration | Purpose | Access Type |
|-------------|---------|-------------|
| Google Ads API (Video campaigns) | Campaign management, targeting, bids, video ads, placements | Read + Write |
| YouTube Data API | Video performance, channel analytics, audience retention curves | Read |
| Agent Local Store (Postgres) | Change queue, audit log, experiment tracker, account state cache | Read + Write |
| Agent Message Bus | Receive requests from function agents, send status updates | Read + Write |
| Slack API | Receive ad-hoc requests from human teams, send change notifications | Read + Write |
| DWT Mart | Conversion data for validation | Read |
| Brain (via message bus) | Escalate unresolvable conflicts, receive budget directives | Read + Write |

#### Workflow

**Trigger:** Continuous — processes request queue in near-real-time during business hours; batch processing overnight

| Step | Action | Output |
|------|--------|--------|
| 1 | Receive change request (from function agent or human team) | Request in queue |
| 2 | Parse request: what entity (campaign/ad group/video ad/targeting), what change, what rationale | Structured change record |
| 3 | Load account context: current state, campaign type (TrueView/Bumper/Shorts/Discovery), targeting config, frequency settings | Context snapshot |
| 4 | **YouTube-specific validation:** Does the video creative meet format requirements? Is the targeting appropriate for the campaign type? Will this change conflict with frequency capping across campaign types? | YouTube-specific validation result |
| 5 | **Standard validation:** budget ceilings, bid limits, experiment conflicts, change frequency | Standard validation result |
| 6 | **Check for conflicts:** competing changes, cross-format targeting overlap | Conflict detection result |
| 7 | If conflict detected: attempt resolution. If unresolvable, escalate to Brain | Resolution or escalation |
| 8 | If validation passes: check approval level. Execute or queue for human approval | Execution decision |
| 9 | Execute change via Google Ads API. Store before-state for rollback | Execution result + audit record |
| 10 | Post-execution: verify change applied correctly | Verification result |
| 11 | Notify requester of outcome. Update audit log | Notification + audit entry |
| 12 | Monitor post-change performance (view rate, completion rate, CPV trends over 48h) | Post-change monitoring |

#### Sub-agents/Sub-tasks Structure

| Sub-task | Focus |
|----------|-------|
| **Request Validation Sub-task** | Guardrail checking, YouTube-specific constraint enforcement (format/targeting compatibility, frequency cross-campaign) |
| **Format Management Sub-task** | Track which video formats are active (TrueView, Bumper, Shorts, in-stream, discovery), ensure format-appropriate targeting and bidding |
| **Conflict Resolution Sub-task** | Detect competing changes, cross-format targeting overlap, apply resolution rules |
| **Execution Sub-task** | Google Ads API calls for video campaigns, retry logic, error handling, read-back verification |
| **Pacing & View-Rate Sub-task** | Spend pacing, view-rate trends, completion rate monitoring, CPV tracking, audience reach/frequency |
| **Creative Spec Validation Sub-task** | Video length requirements per format, thumbnail specs, companion banner requirements, YouTube ad policy pre-check |
| **Audit & Rollback Sub-task** | Before/after state for every change, auto-rollback triggers, change history |

#### Data Inputs

| Data | Source |
|------|--------|
| Change requests (structured) | Function agents via message bus |
| Ad-hoc requests (natural language) | Human teams via Slack |
| Budget directives | Brain via message bus |
| Account structure (video campaigns, ad groups, targeting) | Google Ads API (cached + live) |
| Video performance (view rate, completion rate, CPV, reach) | Google Ads API + YouTube Data API |
| Conversion data | DWT mart |
| Video creative assets and specs | Creative Agent |
| Active experiment registry | Agent local store |
| Recent change history | Agent local store (audit log) |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Execution confirmations | Requesting agent or human |
| Account status reports (including format breakdown) | Brain, function agents |
| Audit log entries | Agent local store |
| Pacing and view-rate alerts | Brain + Slack |
| Conflict escalations | Brain |
| Cross-format frequency warnings | Brain, Audience Agent |
| Channel health snapshot (daily) | Brain, UI dashboard |
| Creative spec rejection alerts | Creative Agent, Slack |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Status queries (read-only) | Level 4 (full auto) | — |
| Bid/CPV adjustments <=10% | Level 2 (act + notify) | — |
| Bid/CPV adjustments >10% | Level 1 (recommend) | 15 approved adjustments with positive outcome |
| Pause/enable campaigns | Level 1 (recommend) | Stays Level 1 — high impact |
| Budget shifts <=15% between ad groups | Level 2 (act + notify) | — |
| Budget shifts >15% | Level 1 (recommend) | 10 approved shifts with positive outcome |
| Create new campaigns | Level 1 (recommend) | Stays Level 1 — structural change |
| Upload/enable new video ads | Level 1 (recommend) | Stays Level 1 — brand-facing |
| Targeting changes (audiences, placements, topics) | Level 1 (recommend) | 10 approved changes with positive outcome → Level 2 |
| Format-level changes (switch campaign type) | Level 0 (observe) → Level 1 | After 3 months of stable operations |
| Automated pacing adjustments | Level 2 (act + notify) | — (within guardrails only) |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Budget ceiling** | Cannot exceed Brain-set daily budget cap for YouTube. Hard stop |
| **Format/targeting compatibility** | Reject targeting configurations incompatible with campaign type (e.g., keyword targeting on Bumper campaigns) |
| **Frequency cap (cross-campaign)** | Alert if combined frequency across all YouTube campaign types exceeds 5 impressions/user/week |
| **Video spec enforcement** | Reject video ads that don't meet format requirements (e.g., >6s video on Bumper campaign) |
| **View-rate floor** | Alert if any ad group's view rate drops below 15% (indicates targeting or creative issue) |
| **Change frequency** | Max one significant change per campaign per 72h |
| **Rollback trigger** | Auto-rollback if post-change CPV increases >40% within 48h |
| **Concurrent change limit** | Max 30 changes per execution batch |
| **Placement safety** | Maintain brand safety placement exclusion lists. Block changes that remove safety exclusions |
| **Human override** | Human channel team can override with reason logged |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Change request validation accuracy | >97% |
| Format/spec validation accuracy | >99% — no invalid creatives reach the API |
| Conflict resolution rate (without Brain escalation) | >80% resolved locally |
| Execution success rate | >99% |
| Post-change performance (no degradation) | >85% neutral or positive at 48h |
| Ad-hoc response time | <5 min for queries, <15 min for changes |
| Cross-campaign frequency compliance | <5% of users exceed frequency cap |
| Audit completeness | 100% |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (budget directives, escalation resolution) | Brain (channel status, pacing, escalations) |
| Function agents (change requests) | Function agents (execution confirmations, account data) |
| Google Ads API availability (Video) | UI dashboard (YouTube channel health) |
| YouTube Data API (video metrics) | Audit log (system-wide) |
| DWT mart (conversion data for validation) | Slack (notifications, query responses) |
| Human channel team (ad-hoc requests) | Creative Agent (spec rejection feedback) |
| Creative Agent (video assets for upload) | — |

---

## Cross-Agent Communication

### Communication Model

Agents communicate through a shared message bus backed by the Agent Local Store (Postgres). No direct agent-to-agent calls. All communication is asynchronous and auditable.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                         AGENT MESSAGE BUS                                 │
│                    (Agent Local Store — Postgres)                          │
│                                                                           │
│  ┌──────────────────┐                                                     │
│  │ Task Queue       │  Brain posts tasks → Function agents consume        │
│  ├──────────────────┤                                                     │
│  │ Findings         │  Function agents post → Brain consumes              │
│  ├──────────────────┤                                                     │
│  │ Change Requests  │  Function agents post → Channel Managers consume    │
│  ├──────────────────┤                                                     │
│  │ Execution Log    │  Channel Managers post → Function agents read       │
│  ├──────────────────┤                                                     │
│  │ Escalations      │  Channel Managers post → Brain resolves             │
│  ├──────────────────┤                                                     │
│  │ Data Shares      │  Any agent posts data → Any agent reads             │
│  ├──────────────────┤                                                     │
│  │ Approvals        │  Agents post proposals → Humans respond             │
│  ├──────────────────┤                                                     │
│  │ Ad-hoc Requests  │  Human teams post → Channel Managers consume        │
│  ├──────────────────┤                                                     │
│  │ Audit Log        │  All agents append → Dashboard reads                │
│  └──────────────────┘                                                     │
└───────────────────────────────────────────────────────────────────────────┘
```

### Key Communication Flows

**Function Agent → Channel Manager → Platform API:**

```
1. Performance Agent: "Increase bid on keyword X by 8%"
         │
         ▼
2. Google Search Channel Manager validates:
   - Is keyword X in an active experiment? No ✓
   - Does new bid exceed 2x account avg CPC? No ✓
   - Was keyword X changed in the last 48h? No ✓
   - Is approval level sufficient? Level 2 ✓
         │
         ▼
3. Execute via Google Ads API → Log audit record → Notify Performance Agent
```

**Human Team → Channel Manager:**

```
1. Campaign manager in Slack: "What's the CPA on Campaign X this week?"
         │
         ▼
2. Meta Channel Manager:
   - Classify as read-only query
   - Pull data from Meta API + DWT mart
   - Format response
         │
         ▼
3. Reply in Slack with CPA breakdown by ad set
```

**Conflict Escalation → Brain:**

```
1. Creative Agent: "Launch new RSA in ad group Z"
2. Performance Agent: "Pause ad group Z — it's underperforming"
         │
         ▼
3. Google Search Channel Manager detects conflict on ad group Z
   - Cannot resolve locally (competing actions on same entity)
         │
         ▼
4. Escalate to Brain with both requests + context
         │
         ▼
5. Brain evaluates:
   - Ad group Z's 4-duck score, priority ranking
   - Impact estimates for each option
   - Decision: "Keep ad group Z active, launch new RSA, re-evaluate in 7 days"
         │
         ▼
6. Brain sends resolution → Channel Manager executes creative launch
```

### Full Communication Matrix

| From | To | Data Shared | Trigger |
|------|----|-------------|---------|
| Brain | All function agents | Scoped task briefs with context | Daily cycle + anomaly |
| Brain | Channel Managers | Budget directives, escalation resolutions | Daily cycle + on escalation |
| All function agents | Brain | Findings, recommendations, scores | Task completion |
| Function agents | Channel Managers | Change requests with rationale | When action needed |
| Channel Managers | Function agents | Execution results, account data, validation failures | On execution + on request |
| Channel Managers | Brain | Status reports, pacing alerts, conflict escalations | Daily + real-time alerts |
| Channel Managers | Human teams (Slack) | Query responses, change notifications, alerts | On request + on execution |
| Human teams | Channel Managers (Slack) | Ad-hoc queries and change requests | Ad-hoc |
| Creative Agent | LP Agent | Ad selling points, message match scores | On creative change |
| LP Agent | Creative Agent | LP selling points, CVR data | On LP change |
| LP Agent | Onboarding Agent | LP selling point map | On LP update |
| Audience Agent | Creative Agent | Audience profiles, segment definitions | On audience change |
| Product Behaviour Agent | Audience Agent | ICP criteria, high-LTV signals | Monthly update |
| Product Behaviour Agent | Creative Agent | Use case taxonomy | Monthly update |
| Product Behaviour Agent | LP Agent | Use case taxonomy | Monthly update |
| Performance Agent | Brain | Wasted spend data, QS trends | Daily |
| Onboarding Agent | Brain | Duck 4 scores, churn alerts | Daily |

### Message Format

Every inter-agent message follows this structure:

```json
{
  "id": "msg_20260507_001",
  "from_agent": "creative_insights",
  "to_agent": "google_search_cm",
  "type": "change_request",
  "priority": "normal",
  "payload": {
    "entity_type": "ad",
    "entity_id": "rsa_12345",
    "action": "create",
    "data": { ... },
    "rationale": "Replacing fatigued RSA. CTR declined 22% over 7 days."
  },
  "approval_level": 1,
  "timestamp": "2026-05-07T10:30:00Z",
  "expires": "2026-05-14T10:30:00Z"
}
```

### Conflict Resolution

**Layer 1 — Channel Manager resolves locally:**
- Same-entity conflicts with clear priority rules (e.g., safety > optimization)
- Temporal conflicts (queue the later request after the first completes)
- Validation failures (reject with reason, no escalation needed)

**Layer 2 — Brain resolves escalations:**
- Competing strategic requests on the same entity (e.g., pause vs. launch)
- Cross-channel conflicts (budget competition between channels)
- Guardrail exceptions (when an agent argues a guardrail should be overridden)

**Layer 3 — Human resolves ambiguity:**
- When Brain's confidence is below threshold
- When the conflict involves brand-level decisions
- When both options have comparable estimated impact

---

## Data Architecture

### What Each Agent Reads and Writes

| Agent | Reads From | Writes To |
|-------|-----------|----------|
| **Brain** | DWT mart, Channel Managers (status), Agent local store, GA4, simple executor APIs | Agent local store (scores, priorities, tasks, audit log), Channel Managers (budget directives), Slack |
| **Performance Analysis** | Channel Managers (account data), DWT mart, Agent local store | Agent local store (audits, findings), Channel Managers (change requests), Slack |
| **Audience Discovery** | Channel Managers (audience data), BigBrain, DWT mart, GA4 | Agent local store (overlap reports, scores), Channel Managers (audience changes), Slack |
| **Creative Insights** | Channel Managers (creative data), Webflow, Agent local store | Agent local store (fatigue alerts, match scores), Channel Managers (creative changes), monday.com |
| **Landing Pages** | GA4, DWT mart, Webflow, Hotjar/Clarity, PageSpeed API | Agent local store (CVR reports, test results), Webflow (LP variants), Testing platform |
| **Onboarding & Lifecycle** | BigBrain, Email platform, GA4, Agent local store | Agent local store (onboarding reports, continuity scores), Email platform, Slack |
| **Product Behaviour** | BigBrain, Billing system, DWT mart | Agent local store (behavior scores, ICP criteria, use cases), Slack |
| **Google Search CM** | Google Ads API, Agent local store, DWT mart, Slack (human requests) | Google Ads API (changes), Agent local store (audit log, account state), Slack (notifications) |
| **Meta CM** | Meta Marketing API, Agent local store, DWT mart, Slack (human requests) | Meta Marketing API (changes), Agent local store (audit log, learning phase tracker), Slack |
| **YouTube CM** | Google Ads API (Video), YouTube Data API, Agent local store, DWT mart, Slack | Google Ads API (changes), Agent local store (audit log, account state), Slack |

### Storage Model

```
┌──────────────────────────────────────────────────────────────────────┐
│                    AGENT LOCAL STORE (Postgres)                        │
│                                                                       │
│  -- Core agent tables --                                              │
│  agent_tasks           — Task queue (Brain → function agents)         │
│  agent_findings        — Analysis results from all agents             │
│  agent_messages        — Inter-agent data shares                      │
│  duck_scores           — 4-duck alignment scores per path             │
│  recommendations       — Proposed actions pending approval            │
│  audit_log             — Append-only record of ALL actions            │
│  experiment_results    — A/B test outcomes (creative, LP, etc)        │
│  audience_scores       — Audience-level performance metrics           │
│  selling_point_maps    — Content tagged with selling points           │
│  icp_criteria          — Current ICP definition and history           │
│  agent_confidence      — Per-action-type confidence scores            │
│  autonomy_levels       — Current autonomy level per action type       │
│                                                                       │
│  -- Channel Manager tables --                                         │
│  cm_change_requests    — Inbound requests from agents + humans        │
│  cm_execution_log      — Every platform API call with result          │
│  cm_account_state      — Cached account structure per channel         │
│  cm_experiment_registry — Active experiments per channel              │
│  cm_learning_phase     — Meta-specific: ad set learning phase status  │
│  cm_escalations        — Conflicts escalated to Brain                 │
│  cm_rollback_snapshots — Before-state for every change (for rollback) │
│  cm_pacing_snapshots   — Hourly spend/delivery snapshots per channel  │
│  cm_human_requests     — Ad-hoc requests from Slack with responses    │
└──────────────────────────────────────────────────────────────────────┘
```

### External Data Sources Summary

| Source | Used By | Access Pattern |
|--------|---------|---------------|
| **DWT Mart (Snowflake)** | All agents | SQL queries via endpoint, on-demand |
| **Google Ads API** | Google Search CM, YouTube CM | Read + Write (managed by CMs) |
| **Meta Marketing API** | Meta CM | Read + Write (managed by CM) |
| **YouTube Data API** | YouTube CM | Read: on-demand |
| **LinkedIn Campaign Manager API** | Simple executor, Performance, Audience | Read: on-demand. Write: basic approved changes |
| **Reddit Ads API** | Simple executor, Performance, Audience | Read: on-demand. Write: basic approved changes |
| **Partner platforms (Impact, PartnerStack)** | Simple executor, Performance | Read: on-demand. Write: basic approved changes |
| **BigBrain/Snowflake** | Audience, Onboarding, Product Behaviour | Read: on-demand queries |
| **GA4 (BigQuery)** | Brain, LP, Onboarding | Read: on-demand queries |
| **Webflow API** | Creative (read), LP (read + write) | Read: on-demand. Write: approved LP changes |
| **Hotjar/Clarity** | LP | Read: on-demand |
| **Email platform** | Onboarding | Read + Write |
| **Billing system** | Product Behaviour | Read: on-demand |
| **Slack API** | All agents + Channel Managers | Read + Write: notifications, alerts, digests, human requests |
| **monday.com API** | Brain, Creative | Write: tasks, creative briefs |

---

## Technical Implementation Options

Two concrete approaches for building this 11-agent system. Both implement the same architecture — the difference is **how** the agents are orchestrated, deployed, and maintained.

---

### Option A: OpenClaw Native

**Build on OpenClaw's existing agent infrastructure — sub-agent spawning, cron scheduling, tool ecosystem, session management. This is what we already use daily with Nymeria and Ygritte.**

#### 1. Framework & Runtime

- **Orchestration:** OpenClaw's native agent runtime (Claude-based agents with system prompts, tools, and session memory)
- **Runtime:** Runs inside the existing OpenClaw environment — same infrastructure Nymeria and Ygritte already use
- **Agent definition:** Each agent is an OpenClaw agent config: system prompt (markdown), tool allowlist, memory files, and CLAUDE.md project instructions
- **LLM backbone:** Claude Opus 4.6 for The Brain + complex analysis; Claude Sonnet 4.6 for function agents and Channel Managers; Claude Haiku 4.5 for simple data extraction, formatting, and Channel Manager status queries

#### 2. Agent Definition

Each of the 11 agents is a **project directory** with:

```
agents/
├── brain/
│   ├── CLAUDE.md              # System prompt + personality + constraints
│   ├── tools/                 # Custom MCP tools (API readers, scorers)
│   └── memory/                # Persistent state (priorities, scores)
├── performance/
│   ├── CLAUDE.md
│   ├── tools/
│   └── memory/
├── audience/
├── creative/
├── landing-pages/
├── onboarding/
├── product-behaviour/
├── channel-managers/
│   ├── google-search/
│   │   ├── CLAUDE.md          # Search-specific validation rules, guardrails
│   │   ├── tools/             # Google Ads API MCP tools (read + write)
│   │   └── memory/            # Account state cache, experiment registry
│   ├── meta/
│   │   ├── CLAUDE.md          # Meta-specific rules (learning phase, CBO)
│   │   ├── tools/             # Meta Marketing API MCP tools
│   │   └── memory/            # Learning phase tracker, account state
│   └── youtube/
│       ├── CLAUDE.md          # YouTube-specific rules (format validation)
│       ├── tools/             # Google Ads Video API MCP tools
│       └── memory/            # Format registry, account state
└── simple-executors/
    ├── linkedin-writer/       # MCP tool (not an agent)
    ├── reddit-writer/
    └── partnerships-writer/
```

- The Brain runs as a persistent OpenClaw agent with cron-triggered analysis cycles
- Function agents are spawned by The Brain as sub-agents with scoped tool access
- **Channel Managers run as semi-persistent agents** — they process their request queue continuously during business hours (spawned by cron every 15 min) and in batch mode overnight
- Creative sub-agents (Text, Video, Visual) are nested sub-agents spawned by the Creative agent
- Each agent's CLAUDE.md contains its full role definition, data sources, autonomy constraints, and output formats from the spec above
- Simple executors are MCP tools (not agents) — they receive a structured payload and execute it

#### 3. Communication

- **Brain → Function agents:** Direct sub-agent spawning with structured task prompts. The Brain passes context (priority queue, 4-duck scores, budget constraints) as part of the spawn prompt
- **Function agents → Channel Managers:** Function agents write change requests to `cm_change_requests` table. Channel Managers consume from this queue on their next cycle
- **Channel Managers → Function agents:** Execution results written to `cm_execution_log`. Function agents read results on their next cycle or via polling
- **Channel Managers → Brain (escalations):** Written to `cm_escalations` table. Brain resolves on next cycle (or immediate spawn for critical escalations)
- **Human teams → Channel Managers:** Slack messages parsed by a lightweight webhook handler that writes to `cm_human_requests`. Channel Manager processes on next cycle
- **Cross-agent data sharing:** Shared Postgres tables (`agent_findings`, `agent_messages`) — agents read/write via SQL MCP tools
- **Async notifications:** Agents write to a `notifications` table; a lightweight cron job pushes to Slack

#### 4. Data Layer

- **Primary store:** Neon Postgres (already provisioned for Funnel Fighters)
- **Agent state tables:** All tables from the Storage Model above — including the `cm_*` Channel Manager tables
- **Memory files:** Each agent has persistent memory via OpenClaw's auto-memory (fast access to recent context, preferences, learned patterns)
- **External reads:** DWT Mart (Snowflake), GA4 (BigQuery), BigBrain — accessed via MCP tools wrapping API endpoints
- **Caching:** Frequently queried metrics cached in Neon with TTLs to avoid redundant API calls. Channel Managers maintain their own account state cache in `cm_account_state`

#### 5. Channel Manager Integration

Channel Managers are the only agents with **write access** to platform APIs:

```
Function Agent → cm_change_requests table → Channel Manager validates →
  Validation fails:  Rejection logged → Requesting agent notified
  Validation passes:
    Level 0-1: Slack notification → Human approves → CM executes → audit_log
    Level 2+:  CM executes immediately → audit_log → Slack notification (FYI)

Human Team → Slack → cm_human_requests → Channel Manager processes →
  Read query:  CM queries API → responds in Slack
  Change:      Enters same validation pipeline as agent requests
```

Simple executors (LinkedIn, Reddit, Partnerships) are MCP tools that accept JSON payloads directly from function agents, with basic validation hardcoded in the tool logic.

#### 6. Scheduling & Triggers

- **Daily analysis cycle:** OpenClaw cron triggers The Brain at 06:00 UTC. The Brain runs scoring, spawns function agents, collects findings, produces daily digest
- **Channel Manager cycles:** Cron-triggered every 15 min during business hours (07:00-22:00 UTC). Each cycle: process request queue, check pacing, update account state cache. Overnight: batch processing every 2 hours
- **Event-driven triggers:** Lightweight webhook listener (Next.js API route on Vercel) catches events (budget alerts, spend anomalies) and writes to the appropriate queue. Next cycle picks them up — or for critical alerts, triggers an immediate agent spawn
- **Ad-hoc runs:** Ido or Guy can trigger any agent via Slack command or dashboard button → hits API route → spawns agent
- **Recurring sub-tasks:** Some function agents have their own cron schedules (e.g., Performance runs bid check every 6 hours, Creative runs fatigue scan daily)

#### 7. UI Integration

- **Dashboard:** Funnel Fighters v2 (Next.js on Vercel) reads directly from Neon Postgres
- **Real-time updates:** Dashboard polls agent and Channel Manager status from Postgres
- **Recommendation queue:** Dashboard shows pending recommendations. Ido approves/rejects inline → next cycle executes
- **Channel Manager activity feed:** `cm_execution_log` and `cm_human_requests` power per-channel activity views
- **Agent activity feed:** `audit_log` powers a timeline view showing what each agent did and why
- **No separate API layer needed** — Next.js API routes query Neon directly

#### 8. Monitoring & Observability

- **Cost tracking:** Each agent call logs model, token count, and estimated cost to `audit_log`. Daily cost summary in Brain's digest
- **Channel Manager metrics:** Request queue depth, validation failure rate, execution success rate, escalation rate — all from `cm_*` tables
- **Error handling:** OpenClaw's built-in error recovery (retry with backoff). Failed tool calls logged with full context
- **Alerting:** Brain posts to Slack on: cycle failure, cost spike (>2x daily average), executor error, autonomy violation, Channel Manager escalation
- **Debugging:** Full conversation logs in OpenClaw's session history. Memory files show agent state evolution

#### 9. Deployment

- **Infrastructure:** Zero new infrastructure. OpenClaw runs on existing setup. Neon Postgres already provisioned. Vercel already hosting dashboard
- **New components:** MCP tools for platform APIs, agent CLAUDE.md files (11 agents), Postgres migration for agent + Channel Manager tables, Slack webhook handler
- **Rollout:** Deploy agents one at a time per the Implementation Priority below
- **Scaling:** OpenClaw handles concurrent agent spawning. Neon auto-scales. No container orchestration needed
- **Updates:** Changing agent behavior = editing a CLAUDE.md file. No redeployment needed

#### 10. Estimated Build Effort

| Phase | Scope | Timeline |
|-------|-------|----------|
| **Phase 0: Foundation** | Agent + CM Postgres tables migration, MCP tools for Google Ads + Meta read APIs, simple executor MCP tools, Brain CLAUDE.md + cron setup | 1-2 weeks |
| **Phase 1: Brain + Performance + Google Search CM** | Brain orchestration, Performance Agent, Google Search Channel Manager (validation, execution, audit), daily digest, Slack integration | 3-4 weeks |
| **Phase 2: Creative + LP + Meta CM** | Creative Agent + sub-agents, LP Agent, Meta Channel Manager (learning phase, CBO logic), Webflow MCP tools | 3-4 weeks |
| **Phase 3: Audience + YouTube CM** | Audience Agent, YouTube Channel Manager (format validation, cross-campaign frequency), YouTube API tools | 2-3 weeks |
| **Phase 4: Remaining agents** | Product Behaviour, Onboarding agents | 1-2 weeks |
| **Phase 5: Autonomy ramp** | Approval rate tracking, autonomy level upgrades, confidence scoring | 1-2 weeks |
| **Total** | | **11-17 weeks** |

#### 11. Cost Model

| Item | Estimated Monthly Cost |
|------|----------------------|
| **LLM API (Claude)** | $350-900/mo — Brain (Opus) ~$3-5/cycle x 30 = $90-150. Function agents (Sonnet) ~$0.50-1/run x 6 agents x 30 days = $90-180. Channel Managers (Sonnet) ~$0.30-0.80/cycle x 3 CMs x ~60 cycles/day x 30 days = $160-430. Sub-tasks (Haiku) ~$50-100. Burst capacity ~$50-150 |
| **Neon Postgres** | $19/mo — Pro plan recommended for CM query volume + connection limits |
| **Vercel** | $0-20/mo — existing plan |
| **OpenClaw** | Existing subscription — no incremental cost |
| **Total** | **$370-940/mo** |

**Note on Channel Manager costs:** Channel Managers run more frequently than function agents (every 15 min vs. daily), which increases LLM costs. However, most CM cycles are short (process queue, check pacing) and can use Sonnet or even Haiku for routine validation. Only complex conflict resolution requires Opus-level reasoning.

#### Pros

- **Zero new infrastructure** — runs on what we already have and use daily
- **Fastest time to value** — no framework to learn, no new deployment pipeline
- **Agent behavior is just markdown** — CLAUDE.md files are easy to iterate on, review, and version control
- **Battle-tested patterns** — Nymeria and Ygritte already prove this works for complex multi-step workflows
- **Natural language debugging** — can ask an agent "why did you do that?" and get an answer from session history
- **Incremental adoption** — deploy one agent at a time, Channel Managers can start simple and get smarter
- **Team familiarity** — Guy and Ido already interact with OpenClaw agents daily
- **Channel Manager CLAUDE.md files are reviewable by channel teams** — non-technical stakeholders can read and comment on the rules

#### Cons

- **No visual workflow editor** — agent logic lives in markdown, not a DAG visualization tool
- **Sequential sub-agent model** — true parallelism requires multiple cron-triggered top-level agents
- **Token cost at scale** — Channel Managers running every 15 min adds up. Need careful model tiering
- **Vendor coupling** — deeply tied to OpenClaw + Anthropic. If we need to swap LLM providers, significant rewrite
- **Observability is DIY** — no built-in agent tracing dashboard; we build from audit_log + cm_* tables
- **Stateless between sessions** — agents restart reasoning each cycle
- **Channel Manager latency** — 15-min polling means up to 15-min delay for change execution (acceptable for most cases, not for emergencies)

---

### Option B: Custom Orchestration (LangGraph / CrewAI)

**Build a standalone agent orchestration service using a dedicated multi-agent framework, deployed as a separate backend service.**

#### 1. Framework & Runtime

- **Orchestration:** LangGraph (LangChain's stateful agent graph framework) — chosen over CrewAI/AutoGen for its explicit state machine model, better production readiness, and LangSmith observability
- **Runtime:** Python service deployed on Railway / Fly.io / a small EC2 instance
- **Agent definition:** Each of the 11 agents is a LangGraph node/subgraph with a state schema, tool bindings, and prompt template
- **LLM backbone:** Same model tier strategy (Opus/Sonnet/Haiku). Could also swap in GPT-4o or Gemini for cost optimization on specific nodes

#### 2. Agent Definition

```python
# agents/channel_managers/google_search.py
from langgraph.graph import StateGraph, END
from langchain_anthropic import ChatAnthropic

class GoogleSearchCMState(TypedDict):
    request_queue: list[dict]
    account_state: dict
    active_experiments: list[dict]
    validation_results: list[dict]
    execution_results: list[dict]
    escalations: list[dict]
    pacing_status: dict

cm_llm = ChatAnthropic(model="claude-sonnet-4-6", max_tokens=4096)

def load_request_queue(state: GoogleSearchCMState) -> GoogleSearchCMState:
    """Node: pull pending requests from queue"""
    ...

def validate_requests(state: GoogleSearchCMState) -> GoogleSearchCMState:
    """Node: check guardrails, detect conflicts"""
    ...

def resolve_conflicts(state: GoogleSearchCMState) -> GoogleSearchCMState:
    """Node: resolve or escalate competing requests"""
    ...

def execute_changes(state: GoogleSearchCMState) -> GoogleSearchCMState:
    """Node: call Google Ads API, log results"""
    ...

def monitor_pacing(state: GoogleSearchCMState) -> GoogleSearchCMState:
    """Node: check spend pacing, alert on anomalies"""
    ...

google_search_cm = StateGraph(GoogleSearchCMState)
google_search_cm.add_node("load_queue", load_request_queue)
google_search_cm.add_node("validate", validate_requests)
google_search_cm.add_node("resolve", resolve_conflicts)
google_search_cm.add_node("execute", execute_changes)
google_search_cm.add_node("monitor", monitor_pacing)
# ... edges
```

The full system graph connects Brain → Function Agents → Channel Managers with explicit state-passing edges.

#### 3. Communication

- **Graph edges:** Brain dispatches function agents as parallel branches. Function agents produce change requests that feed into Channel Manager subgraphs
- **Shared state:** LangGraph's `State` object passes between nodes. Cross-agent data via state keys
- **Persistent state:** LangGraph checkpointing to Postgres
- **Channel Manager queues:** Separate always-on graph cycles for each Channel Manager (consuming from their request queue)
- **Async events:** Postgres-based task queue for event-driven triggers
- **Message format:** Pydantic models for all inter-agent messages (typed, validated)

#### 4. Data Layer

- **Primary store:** Neon Postgres (separate schema `agents.*`)
- **Checkpointing:** LangGraph's built-in Postgres checkpointer
- **Agent + CM state tables:** Same schema as Option A
- **Vector store (optional):** pgvector for semantic search over past findings
- **External reads:** Python clients for Snowflake, BigQuery, platform APIs
- **Caching:** Redis or in-memory LRU

#### 5. Channel Manager Integration

- Each Channel Manager is a **separate LangGraph subgraph** that runs on its own schedule
- Channel Manager subgraphs are more complex than function agent subgraphs — they have their own validation, conflict resolution, and execution nodes
- The Meta Channel Manager subgraph includes additional nodes for learning phase tracking and CBO awareness
- Pydantic models enforce that change requests include required fields (entity, change type, rationale, approval level)

#### 6. Scheduling & Triggers

- **Daily cycle:** Cron triggers the Brain graph at 06:00 UTC
- **Channel Manager cycles:** Separate APScheduler jobs for each CM (every 15 min during business hours)
- **Event-driven:** FastAPI webhook endpoints → enqueue task → trigger graph
- **Persistent process required** for scheduler reliability
- **Human ad-hoc:** Slack bot (separate component) parses messages, writes to CM request queues

#### 7. UI Integration

- **Dashboard:** Same Funnel Fighters v2 frontend
- **API layer:** Python orchestration service exposes REST API for agent + CM status. Two backend services to maintain
- **Channel Manager views:** CM-specific endpoints for request queue, execution history, pacing data

#### 8. Monitoring & Observability

- **LangSmith integration:** Every LLM call, tool invocation, and state transition captured. Full DAG visualization per cycle
- **Channel Manager tracing:** Each CM cycle is a separate trace — can see validation, conflict resolution, and execution steps
- **Cost tracking:** LangSmith per-run cost breakdowns
- **Error handling:** LangGraph retry policies, fallback nodes, human-in-the-loop interrupts

#### 9. Deployment

- **New infrastructure:**
  - Python service (Railway/Fly.io/EC2) — $10-75/mo (larger for 3 always-on CM subgraphs)
  - Redis (task queue/caching) — $0-15/mo
  - LangSmith account — $0-400/mo
  - Slack bot hosting (if separate from Python service) — $0-10/mo
- **CI/CD:** Docker build + deploy pipeline for Python service. Separate from Vercel frontend
- **Rollout:** Deploy orchestration service with Brain graph, add agents and CMs incrementally

#### 10. Estimated Build Effort

| Phase | Scope | Timeline |
|-------|-------|----------|
| **Phase 0: Foundation** | Python project, LangGraph scaffolding, Postgres schema (incl. CM tables), API clients, Docker, LangSmith, Slack bot | 3-4 weeks |
| **Phase 1: Brain + Performance + Google Search CM** | Brain graph, Performance subgraph, Google Search CM subgraph (validation, execution, pacing), Slack integration | 4-5 weeks |
| **Phase 2: Creative + LP + Meta CM** | Creative graph + sub-agents, LP graph, Meta CM subgraph (learning phase nodes, CBO logic) | 3-4 weeks |
| **Phase 3: Audience + YouTube CM** | Audience graph, YouTube CM subgraph (format validation, frequency) | 2-3 weeks |
| **Phase 4: Remaining agents** | Product Behaviour, Onboarding graphs | 2-3 weeks |
| **Phase 5: Autonomy ramp** | Approval tracking, confidence scoring, autonomy state machine | 1-2 weeks |
| **Total** | | **15-21 weeks** |

#### 11. Cost Model

| Item | Estimated Monthly Cost |
|------|----------------------|
| **LLM API (Claude)** | $350-900/mo — same token usage as Option A |
| **Neon Postgres** | $19/mo |
| **Vercel** | $0-20/mo |
| **Python hosting** | $20-75/mo — larger instance for 3 concurrent CM subgraphs |
| **Redis** | $0-15/mo |
| **LangSmith** | $0-400/mo |
| **Total** | **$390-1,430/mo** |

#### Pros

- **Superior observability** — LangSmith gives production-grade tracing for all 11 agents including Channel Manager cycles
- **Explicit state machines** — Channel Manager validation pipelines are typed graphs with clear state transitions. Easier to test
- **True parallelism** — function agents run in parallel; Channel Managers run as independent always-on subgraphs
- **LLM flexibility** — mix providers per node for cost optimization
- **Strong typing** — Pydantic schemas for change requests catch integration bugs at development time
- **Channel Manager testability** — can unit test validation nodes, conflict resolution, execution nodes with mock state

#### Cons

- **New infrastructure** — Python service, Redis, deployment pipeline. More failure modes
- **Slower time to value** — 3-4 weeks of foundation before any agent runs. 7-9 weeks before first Channel Manager is live
- **Two backend services** — dashboard talks to both Vercel and Python service
- **Framework churn risk** — LangGraph is actively evolving with breaking changes
- **Overkill for our scale** — 11 agents and 6 channels doesn't need distributed execution infrastructure
- **Prompt iteration friction** — changing CM validation rules requires code change + redeploy, vs. editing a CLAUDE.md
- **Python expertise** — team's daily tooling is OpenClaw (TypeScript/Claude). Context-switching cost
- **Slack bot complexity** — separate component for human-to-CM communication adds another moving part

---

### Recommendation

**Option A (OpenClaw Native) remains the clear choice. The addition of 3 Channel Managers doesn't change the calculus — it strengthens it.**

Here's my honest assessment:

**1. Channel Managers are a great fit for the OpenClaw model.**

Each Channel Manager is fundamentally an agent that reads a queue, applies rules, and executes validated changes. That's exactly what OpenClaw agents do. The CLAUDE.md file for each Channel Manager contains its validation rules, guardrails, and conflict resolution logic in plain English — which means Ido or the channel team can read and comment on the rules without touching code.

Compare this to Option B, where Channel Manager validation logic is spread across LangGraph nodes, Pydantic models, and Python functions. Changing a guardrail means a code change, PR review, Docker build, and deploy.

**2. The cost increase is manageable.**

Channel Managers add ~$160-430/mo in LLM costs (Sonnet for most cycles, Haiku for simple queue checks). Total system cost goes from $200-650/mo (old 7-agent estimate) to $370-940/mo. Still under $1K/mo for a system that manages six-figure monthly ad spend. The ROI math is obvious.

Option B's overhead ($390-1,430/mo) doesn't buy proportionally more value — it buys infrastructure we have to maintain.

**3. The 15-minute polling latency is acceptable.**

Channel Managers processing their queue every 15 minutes means a change request might wait up to 15 minutes for execution. For 95% of cases (bid changes, keyword additions, creative rotations), this is fine. For the 5% that's urgent (spend anomaly, emergency pause), the webhook handler triggers an immediate CM spawn.

Option B's always-on CM subgraphs would reduce this latency, but at the cost of a persistent Python process that needs monitoring, restarts, and health checks. Not worth it.

**4. What we give up (honestly).**

- LangSmith's observability for Channel Manager cycles would be genuinely useful for debugging validation failures and conflict resolution. We'll build a simpler version from `cm_*` tables. It won't be as good. This is the real tradeoff.
- Typed validation pipelines (Pydantic) would catch more bugs at development time than CLAUDE.md-based rules. We mitigate this by writing comprehensive validation test prompts and running them against each CM's CLAUDE.md.
- Always-on Channel Managers would provide lower latency. We mitigate with the emergency webhook path.

**5. The escape hatch.**

If Channel Managers need more sophisticated orchestration later (e.g., real-time bidding, sub-second latency requirements), we can extract them into a lightweight Python service without rewriting the rest of the system. The `cm_*` tables are the integration boundary — the function agents and Brain don't care whether the CM is an OpenClaw agent or a Python service, as long as it reads from `cm_change_requests` and writes to `cm_execution_log`.

**Bottom line:** Build the 11 agents as 11 CLAUDE.md files. The Channel Managers are agents with clear rules — exactly what LLMs are good at. Ship value now, add infrastructure only when the rules prove too complex for markdown.

---

## Implementation Priority

### Recommended Build Order

| Priority | Agent(s) | Rationale |
|----------|----------|-----------|
| **P0 (Week 1-3)** | **Brain + Performance Analysis** | Everything depends on the Brain. Wasted spend identification is the fastest path to measurable ROI. Performance Agent also provides campaign structure data other agents need. |
| **P0 (Week 2-4)** | **Google Search Channel Manager** | Stands up the Channel Manager pattern for the highest-spend search channel. Once this works, Meta and YouTube CMs follow the same pattern. Performance Agent's change requests need a CM to execute. |
| **P1 (Week 4-7)** | **Creative Insights + Landing Pages + Meta Channel Manager** | Creative + LP are the highest-leverage variables. Meta CM is needed for creative rotations and audience changes on the largest social channel. Meta CM also introduces learning-phase complexity — get this right early. |
| **P2 (Week 7-9)** | **Audience Discovery + YouTube Channel Manager** | Audience depends on Performance (keyword data) and Creative (messaging alignment). YouTube CM handles a growing channel with distinct creative format requirements. |
| **P2 (Week 7-9)** | **Product Behaviour Insights** | Primarily observational — runs in parallel without affecting other agents. Provides ICP signals that improve upstream agents over time. |
| **P3 (Week 9-11)** | **Personalized Onboarding & Lifecycle** | Depends on LP Agent (selling point data) and Product Behaviour (activation data). Most complex integration surface (product team dependency). |

### P0 Milestone (Week 4)

Brain + Performance Agent + Google Search Channel Manager running daily produces:
- Full-funnel 4-duck scores for all active campaigns
- Daily priority queue of top opportunities
- Wasted spend report with actionable cuts
- Bid optimization recommendations **that actually execute** (through the Channel Manager)
- Change audit trail showing what changed, why, and what happened after
- Human channel team can query Search account status via Slack

This alone replaces ~40% of weekly manual analysis and gives the team a single source of truth with an execution path.

### P1 Milestone (Week 7)

Adding Creative + LP + Meta Channel Manager completes the core optimization loop:
- Qualitative messaging consistency view (Ad → LP → Onboarding)
- Quantitative funnel performance (CTR → behavior → CVR → Day-2)
- Automated creative fatigue detection and rotation **with Meta-aware execution**
- LP A/B test pipeline
- Meta learning phase protection (no more accidentally resetting ad set learning)
- Two Channel Managers operational — the pattern is proven and replicable

### P2 Milestone (Week 9)

Audience Agent + YouTube CM + Product Behaviour adds:
- Cross-channel audience overlap detection and deduplication
- YouTube-specific format validation and frequency management
- ICP signals from product data flowing upstream to targeting
- All three Channel Managers operational — full execution coverage for primary channels

### Full System (Week 11)

All 11 agents operational. Autonomy levels start at Level 0-1 across the board. Channel Managers start at the levels specified in their approval tables. Earn upgrades based on approval rates and outcome tracking over the following 8 weeks.

### Simple Executors (Parallel Track)

LinkedIn, Reddit, and Partnerships simple executors (MCP tools, not agents) can be built in parallel at any point — they're just API wrapper tools. Estimated 1-2 days each. They upgrade to full Channel Managers when:
- Channel spend exceeds $10K/month
- The channel has >20 active campaigns
- The team requests ad-hoc query capability for that channel

---

*"Eleven agents, three layers, one brain. Every change validated, every conflict resolved, every action audited. The system sees the full funnel because no single agent has to."*

— Nymeria