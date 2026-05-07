# Agentic Performance Marketing — Agent System Proposal

**Author:** Nymeria | **Date:** 2026-05-07 | **Status:** PROPOSAL
**For:** Ido (Head of Marketing), Guy Regev, Marketing X1000 team
**Agent hierarchy:** Confirmed by Ido

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
4. [Cross-Agent Communication](#cross-agent-communication)
5. [Data Architecture](#data-architecture)
6. [Implementation Priority](#implementation-priority)

---

## System Overview

This system replaces manual, channel-siloed marketing optimization with an autonomous agent network that sees the full funnel — from ad impression through onboarding to paying customer. Every decision traces back to the 4 Ducks alignment framework: **Audience + Ad + Landing Page + Product** must swim together.

**Channels covered:** Search (Google), Meta, YouTube, LinkedIn, Reddit, Marketing Partnerships/Affiliates

**Architecture principle:** One Brain orchestrates. Six function agents span all channels. Each function agent decomposes into per-channel sub-tasks or per-format sub-agents as needed. A shared **Channel Executor Layer** provides write access to platform APIs — any function agent can request execution through these shared tools.

### Channel Executor Layer (Shared Infrastructure)

Channel executors are **shared API write tools**, not standalone agents. They have no decision-making ability — they only execute approved changes from function agents.

| Executor | Platform API | Used By |
|----------|-------------|--------|
| Google Ads Writer | Google Ads API (campaigns, ad groups, ads, bids, keywords) | Performance, Audience, Creative |
| Meta Writer | Meta Marketing API (campaigns, ad sets, ads, audiences) | Performance, Audience, Creative |
| YouTube Writer | Google Ads API (video campaigns, targeting) | Performance, Audience, Creative |
| LinkedIn Writer | LinkedIn Campaign Manager API | Performance, Audience, Creative |
| Reddit Writer | Reddit Ads API | Performance, Audience, Creative |
| Webflow Writer | Webflow CMS API (page creation, A/B variants) | Landing Pages |
| Braze/HubSpot Writer | Lifecycle messaging APIs | Onboarding & Lifecycle |

**Key distinction:** Function agents have **channel-specific analytical sub-tasks** (e.g., "analyze Google Search account structure"). When action is needed, they request execution through the shared executor for that channel. The Brain controls which agents get executor access and when.

---

## Agent Hierarchy

```
                        ┌──────────────────────────────┐
                        │     THE BRAIN (Orchestrator)  │
                        │  Budget & Incrementality Agent │
                        │  Cross-channel allocations     │
                        │  Geo prioritization            │
                        └──────────────┬───────────────┘
                                       │
              ┌────────────┬───────────┼───────────┬────────────┬────────────┐
              │            │           │           │            │            │
         ┌────▼────┐ ┌────▼────┐ ┌────▼────┐ ┌───▼─────┐ ┌───▼─────┐ ┌───▼─────┐
         │Perf     │ │Audience │ │Creative │ │Landing  │ │Onboard  │ │Product  │
         │Analysis │ │Discovery│ │Insights │ │Pages    │ │& Life-  │ │Behaviour│
         │& Acct   │ │& Expan- │ │& Crea-  │ │Agent    │ │cycle    │ │Insights │
         │Structure│ │sion     │ │tion     │ │         │ │Agent    │ │Agent    │
         └─────────┘ └─────────┘ └────┬────┘ └─────────┘ └─────────┘ └─────────┘
                                      │
                              ┌───────┼───────┐
                              │       │       │
                           ┌──▼──┐ ┌──▼──┐ ┌──▼───┐
                           │Text │ │Video│ │Visual│
                           │Agent│ │Agent│ │Agent │
                           └─────┘ └─────┘ └──────┘

Channels (sub-tasks per function agent):
  Search | Meta | YouTube | LinkedIn | Reddit | Partnerships/Affiliates
```

---

## Agent Specifications

---

### 1. The Brain — Orchestrator

**Budget & Incrementality Agent — cross-channel allocations, geo prioritization**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Cross-channel budget allocation (total and per-geo) | Individual campaign structure within channels |
| Incrementality testing design and read-out | Creative production or LP content |
| Geo prioritization and market-level strategy | Direct API writes to ad platforms |
| 4-duck alignment scoring across all funnel paths | Channel-specific bid management |
| Priority queue: what to fix next, ranked by impact | Day-to-day keyword or audience optimization |
| Triggering function agents with scoped tasks | Onboarding flow design |
| Escalation decisions (what needs human review) | — |
| Weekly/monthly budget reforecasting | — |

**Key decision:** The Brain decides *where money goes* and *what problems to solve first*. It does not decide *how* to solve them — that's delegated to function agents.

#### Integrations Required

| Integration | Purpose | Access Type |
|-------------|---------|-------------|
| DWT Mart (Snowflake/BigBrain endpoint) | Funnel metrics: impression → click → signup → hard signup → engaged → paying | Read (SQL queries) |
| Google Ads API | Account-level spend, campaign budget caps | Read + Write (budget changes) |
| Meta Marketing API | Account-level spend, campaign budget caps | Read + Write (budget changes) |
| YouTube Ads API (via Google Ads) | Account-level spend | Read + Write |
| LinkedIn Campaign Manager API | Account-level spend | Read + Write |
| Reddit Ads API | Account-level spend | Read + Write |
| Partner/Affiliate platforms (Impact, PartnerStack) | Partner spend, attribution | Read |
| GA4 (BigQuery export) | Cross-channel attribution, geo-level conversion data | Read |
| Anthropic SDK (Claude) | LLM reasoning for scoring, prioritization, rationale generation | API calls |
| Agent Local Store (Postgres) | Computed scores, decision log, priority queue, audit trail | Read + Write |
| Slack API | Approval requests, daily digests, anomaly alerts | Write |
| monday.com API | Task creation for human-required actions | Write |

#### Workflow

**Trigger:** Daily scheduled run (06:00 UTC) + event-triggered (anomaly alert from any function agent, budget threshold breach)

| Step | Action | Output |
|------|--------|--------|
| 1 | Query DWT mart for last 24h and 7d rolling metrics across all channels, geos, and funnel stages | Raw performance dataset |
| 2 | Compute 4-duck alignment scores for every active funnel path (channel × campaign × ad group level) | Alignment score matrix (0-100 per path) |
| 3 | Compare scores to 7d/30d baselines. Flag anomalies (>15% deviation) | Anomaly list with severity |
| 4 | Run incrementality model: estimate true incremental value per channel/geo using holdout data and time-series analysis | Incremental ROAS per channel/geo |
| 5 | Generate priority queue: rank all opportunities by (estimated incremental revenue uplift × confidence) | Ordered priority list |
| 6 | For top N priorities, generate scoped task briefs and dispatch to appropriate function agents | Task assignments with context |
| 7 | Compute budget reallocation recommendations based on incremental ROAS, geo potential, and current allocation | Budget shift recommendations |
| 8 | Package daily digest: health scores, anomalies, actions taken, pending approvals | Slack message + monday.com updates |
| 9 | For budget changes within guardrails, execute. For others, submit for human approval | Executed changes or approval requests |

**Recipients:** All function agents (task assignments), Ido + team (daily digest), Slack #perf-marketing channel

#### Sub-agents/Sub-tasks Structure

The Brain does not have per-channel sub-agents. Instead, it operates cross-channel by design:

- **Budget Allocation Sub-task:** Runs optimization model across all 6 channels simultaneously. Considers geo-level performance, incrementality scores, and spend pacing.
- **Incrementality Sub-task:** Per-channel + per-geo incrementality estimation. Uses geo holdout tests and time-series causal inference.
- **Priority Scoring Sub-task:** Scores every funnel path, clusters problems by type (audience, creative, LP, onboarding), and routes to the right function agent.
- **Geo Prioritization Sub-task:** Ranks markets (US, UK, DACH, ANZ, etc.) by growth potential × current efficiency gap.

#### Data Inputs

| Data | Source |
|------|--------|
| Campaign spend (daily, by channel/geo) | Channel APIs |
| Funnel metrics (impressions → paying, by funnel path) | DWT mart |
| Attribution data (multi-touch) | GA4 / DWT mart |
| Geo holdout test results | Agent local store |
| Past decision outcomes (feedback loop) | Agent local store |
| Function agent reports and findings | Agent local store |
| Budget targets and caps (set by Ido) | Configuration store |

#### Data Outputs

| Output | Destination | Format |
|--------|-------------|--------|
| 4-duck alignment scores (per funnel path) | Agent local store, UI dashboard | JSON scores array |
| Priority queue (ranked opportunities) | Agent local store, function agents | Ordered task list |
| Budget allocation recommendations | Slack (human review) or direct execution | Change records |
| Daily health digest | Slack, monday.com | Formatted report |
| Incrementality scores (per channel/geo) | Agent local store, UI | Numeric scores |
| Task assignments to function agents | Agent local store | Structured task briefs |
| Anomaly alerts | Slack (immediate) | Alert messages |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Read all data, compute scores, generate reports | Level 3 (act + notify) | — (always autonomous) |
| Budget shifts ≤5% between channels | Level 1 (recommend) | 10 consecutive approved recommendations with positive outcome |
| Budget shifts 5-15% | Level 1 (recommend) | After Level 2 proven for ≤5% shifts for 30 days |
| Budget shifts >15% or new geo entry | Level 1 (recommend) | Stays Level 1 permanently |
| Pause/enable entire channel spend | Level 1 (recommend) | Stays Level 1 permanently |
| Task delegation to function agents | Level 3 (act + notify) | — (always autonomous) |
| Incrementality test launch | Level 1 (recommend) | Stays Level 1 — requires Ido sign-off |

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

#### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Budget allocation efficiency (incremental ROAS) | Improve blended iROAS by 15% in 90 days | DWT mart revenue / spend by channel |
| Priority queue accuracy | >70% of top-5 daily priorities validated as real opportunities by team | Human review weekly |
| Anomaly detection speed | <2h from anomaly onset to alert | Timestamp comparison |
| Budget recommendation acceptance rate | >80% approved without modification | Approval log |
| Cross-channel alignment score improvement | 4-duck scores trending up across all channels | Weekly trend |
| Geo allocation ROI | Top-3 geos by incremental ROAS match Brain's ranking | Monthly comparison |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| DWT mart data availability and freshness | All 6 function agents (task assignments) |
| GA4 attribution accuracy | UI dashboard (scores, priority queue) |
| Function agent reports (for informed decisions) | Slack/monday.com (approvals, digests) |
| Channel API uptime | Budget execution layer |

---

### 2. Performance Analysis & Account Structure Agent

**Cross-channel account health, campaign structure optimization, bid management**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Campaign structure analysis (too many/few ad groups, keyword conflicts) | Budget allocation between channels (Brain owns) |
| Bid optimization recommendations and execution | Creative content (Creative Agent owns) |
| Quality Score / relevance score monitoring | LP content or conversion optimization (LP Agent owns) |
| Negative keyword management | Audience strategy (Audience Agent owns) |
| Search term analysis and keyword harvesting | — |
| Campaign naming/taxonomy enforcement | — |
| Wasted spend identification | — |
| Competitive auction insights | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Ads API | Campaign structure, keywords, bids, search terms, Quality Score, auction insights |
| Meta Marketing API | Campaign/ad set structure, placements, delivery metrics |
| YouTube Ads API | Campaign structure, placement, view-rate metrics |
| LinkedIn Campaign Manager API | Campaign structure, bid data |
| Reddit Ads API | Campaign structure, targeting |
| DWT Mart | Funnel conversion data mapped to campaign structure |
| Google Ads Scripts (optional) | Automated rules for high-frequency bid adjustments |
| Anthropic SDK | LLM analysis for search term categorization, structure recommendations |
| Agent Local Store | Historical bid changes, structure change log |

#### Workflow

**Trigger:** Daily (after Brain's morning run provides task assignments) + triggered by Brain on anomaly detection

| Step | Action | Output |
|------|--------|--------|
| 1 | Receive task brief from Brain (e.g., "Investigate declining ROAS on Google Search Brand") | Scoped investigation context |
| 2 | Pull campaign structure and performance data for the specified scope | Raw campaign/ad group/keyword data |
| 3 | **Per-channel sub-tasks execute in parallel** (see sub-task structure below) | Channel-specific findings |
| 4 | Identify structural issues: overlapping keywords, thin ad groups, budget-limited campaigns, poor Quality Scores | Issue list with severity scores |
| 5 | Analyze search terms (Search): find high-spend irrelevant terms, harvest converting terms | Negative keyword lists, keyword additions |
| 6 | Compute bid adjustment recommendations based on conversion data + position targets | Bid change proposals |
| 7 | Generate wasted spend report: what's spending without converting | Waste report with $ amounts |
| 8 | Submit findings + recommendations to Brain for prioritization | Structured report |
| 9 | Execute approved changes via channel APIs | Change execution + audit log |

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
| Campaign structure (campaigns, ad groups, keywords, ads) | Channel APIs (live query) |
| Performance metrics (impressions, clicks, cost, conversions) | DWT mart + Channel APIs |
| Search terms report (Search) | Google Ads API |
| Quality Scores, expected CTR, ad relevance, LP experience | Google Ads API |
| Auction insights (Search) | Google Ads API |
| Delivery insights (Meta) | Meta Marketing API |
| Task briefs from Brain | Agent local store |
| Historical bid changes and their outcomes | Agent local store |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Account structure audit report | Brain (for prioritization), UI dashboard |
| Bid adjustment recommendations/executions | Channel APIs (execution), audit log |
| Negative keyword additions | Google Ads API, audit log |
| Wasted spend report (with $ amounts) | Brain, Slack weekly digest |
| Quality Score trend analysis | UI dashboard |
| Keyword harvesting recommendations | Brain (for approval) |
| Campaign restructure proposals | Brain (always human-approved) |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Read all campaign data, generate reports | Level 3 (act + notify) | — |
| Bid adjustments ±10% on keywords with >100 conversions/30d | Level 1 (recommend) | 20 approved adjustments with positive ROAS impact |
| Bid adjustments ±20% | Level 1 (recommend) | After ±10% reaches Level 3 |
| Add negative keywords (exact match) | Level 1 (recommend) | 15 approved additions with zero false positives |
| Add negative keywords (broad match) | Level 1 (recommend) | Stays Level 1 — too risky for automation |
| Pause individual keywords with >$500 spend and 0 conversions | Level 1 (recommend) | 10 approved pauses confirmed as correct |
| Campaign restructuring (merge/split ad groups) | Level 1 (recommend) | Stays Level 1 permanently |
| Enable/pause entire campaigns | Level 1 (recommend) | Stays Level 1 permanently |

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

#### Success Metrics

| Metric | Target |
|--------|--------|
| Wasted spend reduction | -20% waste in first 60 days |
| Quality Score improvement (Search) | Average QS improvement of +0.5 across managed keywords |
| Bid recommendation accuracy | >75% of bid changes produce desired metric movement |
| Account structure compliance | 100% of campaigns follow naming taxonomy within 30 days |
| Search term coverage | <5% of spend on irrelevant search terms |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, budget context) | Brain (findings inform priority queue) |
| DWT mart (conversion data beyond click) | Creative Agent (performance data per ad) |
| Channel API availability | Audience Agent (keyword-level audience overlap data) |

---

### 3. Audience Discovery & Expansion Agent

**Cross-channel audience intelligence, overlap detection, expansion**

#### Role & Responsibilities

| Owns | Does NOT Own |
|------|-------------|
| Audience overlap detection across campaigns and channels | Bid management (Performance Agent owns) |
| New audience segment identification | Creative messaging for audiences (Creative Agent owns) |
| Lookalike/similar audience creation recommendations | LP personalization (LP Agent owns) |
| Audience exclusion management (suppression lists) | Onboarding flow personalization |
| Cross-channel audience deduplication strategy | Budget allocation (Brain owns) |
| Intent signal analysis (search terms → audience signals) | — |
| Audience fatigue monitoring | — |
| First-party data activation strategy | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Ads API | Audience lists, in-market/affinity segments, remarketing lists, Customer Match |
| Meta Marketing API | Custom Audiences, Lookalike Audiences, interest targeting, audience overlap tool |
| YouTube Ads API | Audience segments, viewer lists |
| LinkedIn Campaign Manager API | Matched Audiences, company/job targeting, audience expansion |
| Reddit Ads API | Community targeting, interest targeting |
| BigBrain/Snowflake | monday.com user data for first-party audience building, product usage cohorts |
| GA4 | Audience definitions, user segments, acquisition paths |
| DWT Mart | Audience-level funnel performance (which segments convert to paying) |
| Anthropic SDK | LLM analysis for audience clustering, intent categorization |
| Agent Local Store | Audience performance history, overlap records |

#### Workflow

**Trigger:** Weekly deep analysis (Mondays) + Brain-triggered investigations + new campaign launch

| Step | Action | Output |
|------|--------|--------|
| 1 | Pull all active audience definitions across all channels | Unified audience inventory |
| 2 | **Per-channel sub-tasks** analyze audience performance (see below) | Per-channel audience reports |
| 3 | Run cross-channel overlap analysis: identify audiences targeted on multiple channels | Overlap matrix with estimated waste |
| 4 | For each audience segment, compute full-funnel performance (ad → LP → signup → paying) | Audience-level 4-duck scores |
| 5 | Identify high-performing micro-segments worth expanding | Expansion candidates list |
| 6 | Analyze first-party data (BigBrain) for new audience seed lists | New audience proposals |
| 7 | Check audience fatigue signals: frequency caps hit, CTR declining, CPM rising | Fatigue alerts |
| 8 | Generate suppression list updates (existing customers, non-ICP) | Suppression list updates |
| 9 | Submit findings to Brain. Execute approved changes. | Reports + executed changes |

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
| Audience definitions and sizes | Channel APIs |
| Audience-level performance metrics | Channel APIs + DWT mart |
| Cross-channel overlap data | Channel APIs (where available) + modeled |
| First-party user data (product usage, plan type, company size) | BigBrain/Snowflake |
| CRM data (existing customers for suppression) | BigBrain |
| Search term reports (intent signals) | Google Ads API |
| GA4 audience reports | GA4 API |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Audience overlap report (with waste estimate in $) | Brain, UI dashboard, Slack |
| New audience segment proposals | Brain (for approval), then Channel APIs |
| Lookalike seed list recommendations | Brain (for approval) |
| Suppression list updates | Channel APIs (execution) |
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
| Ad↔LP message match scoring | Audience targeting (Audience Agent owns) |
| New creative generation (copy, visual concepts, video scripts) | Campaign structure (Performance Agent owns) |
| A/B test design for creatives | Onboarding messaging |
| Creative taxonomy enforcement (selling points, format tags) | — |
| Cross-channel creative insights (what works where) | — |
| monday.com brand compliance checking | — |

#### Integrations Required

| Integration | Purpose |
|-------------|---------|
| Google Ads API | RSA asset performance, ad-level metrics, image/video ad data |
| Meta Marketing API | Ad creative data, dynamic creative reports, ad-level metrics, Creative Hub |
| YouTube Ads API | Video ad performance, view-rate, completion rate, skip rate |
| LinkedIn Campaign Manager API | Ad creative performance, sponsored content metrics |
| Reddit Ads API | Ad creative performance |
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
| 1 | Pull performance data for all active creatives across channels | Creative performance dataset |
| 2 | **Per-format sub-agents** analyze in parallel (Text, Video, Visual — see below) | Format-specific insights |
| 3 | Detect creative fatigue: CTR declining >15% over 7 days with stable audience | Fatigue alert list |
| 4 | Score ad↔LP message match: compare ad selling points to LP selling points (from LP Agent data) | Message match scores (0-100) |
| 5 | Identify top-performing creative patterns (hooks, CTAs, formats, themes) | Pattern report |
| 6 | For fatigued or underperforming creatives, generate replacement concepts | New creative briefs |
| 7 | For new campaigns, generate creative variations aligned to audience + selling point | Creative drafts |
| 8 | Design A/B test plans for new creatives | Test plans |
| 9 | Submit to Brain for prioritization. Execute approved rotations. | Approved changes executed |

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
| Ad creative content (copy, images, videos) | Channel APIs |
| Ad performance metrics (CTR, impressions, conversions, cost) | Channel APIs + DWT mart |
| Video-specific metrics (hook rate, view rate, completion rate) | YouTube/Meta APIs |
| LP content (for message match scoring) | LP Agent data / Webflow API |
| Selling point taxonomy | Configuration store |
| Brand guidelines | monday.com DAM / static config |
| Historical creative performance and A/B test results | Agent local store |
| Audience segment definitions (for tailored creative) | Audience Agent data |

#### Data Outputs

| Output | Destination |
|--------|-------------|
| Creative fatigue alerts | Brain (priority queue), Slack |
| Ad↔LP message match scores | Agent local store, UI dashboard, LP Agent |
| New creative copy (headlines, descriptions, body text) | Human review queue, then Channel APIs |
| Video scripts and storyboard concepts | Creative team (monday.com task), human review |
| Visual concept briefs | Creative team (monday.com task), human review |
| A/B test designs | Brain (for approval and budget allocation) |
| Creative performance patterns report (weekly) | Ido + creative team, Slack |
| Creative taxonomy updates | Agent local store |

#### Approval Requirements

| Action | Starting Level | Earns Upgrade When |
|--------|---------------|-------------------|
| Creative performance analysis and reporting | Level 3 (act + notify) | — |
| Creative fatigue detection + alerts | Level 3 (act + notify) | — |
| Rotate to pre-approved creative variant | Level 1 (recommend) | 10 successful rotations (CTR stabilized/improved) |
| Generate new ad copy (text) | Level 1 (recommend) | After creative team confirms quality bar met on 20 pieces |
| Push new copy to ad platforms | Level 1 (recommend) | Stays Level 1 — brand risk |
| Generate visual concepts | Level 0 (observe) → Level 1 | After proving ad↔LP message match scoring accuracy |
| Generate video scripts | Level 0 (observe) → Level 1 | Same as above |
| A/B test launch | Level 1 (recommend) | Stays Level 1 — requires budget |

#### Guardrails

| Guardrail | Rule |
|-----------|------|
| **Brand compliance** | All generated copy checked against brand voice guidelines before submission |
| **Fatigue threshold** | Minimum 7 days of data before flagging fatigue (avoid false positives from normal variance) |
| **Test budget cap** | Creative A/B tests capped at 15% of ad group budget |
| **Rotation cool-down** | Minimum 48h between creative rotations in the same ad group |
| **Message match floor** | Alert if any active ad↔LP pair scores <40 on message match |
| **Generated content review** | All AI-generated creative must pass human review before going live (no exceptions at launch) |
| **Volume gate** | Max 10 new creative pieces generated per day (prevent review queue overload) |

#### Success Metrics

| Metric | Target |
|--------|--------|
| Average creative lifespan before fatigue | Increase by 20% (better rotation timing) |
| Ad↔LP message match score (portfolio average) | >70 across all active paths |
| Creative generation acceptance rate | >60% of AI-generated copy approved with minor edits |
| A/B test win rate | >40% of new variants beat control |
| Time from fatigue detection to replacement live | <72h |
| Cross-channel creative insight adoption | Creative team acts on >80% of weekly insights |

#### Dependencies

| Depends On | Feeds Into |
|------------|-----------|
| Brain (task assignments, budget for tests) | Brain (creative health informs 4-duck scores) |
| Audience Agent (audience profiles for tailored messaging) | LP Agent (message match scores trigger LP updates) |
| LP Agent (LP content for message match) | Performance Agent (creative changes affect performance) |
| Channel API availability | Onboarding Agent (creative selling points should carry through) |

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
| LP↔Ad message consistency enforcement | Campaign structure |
| Page speed / Core Web Vitals monitoring | — |
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
| Channel APIs (UTM parsing) | Map LP sessions to ad source (audience × channel × selling point) |
| Anthropic SDK | LP content analysis, variant generation, selling point extraction, copy generation |
| Agent Local Store | LP performance history, A/B test results, selling point maps |
| Slack API | Test result notifications, CVR alerts |

#### Workflow

**Trigger:** Daily CVR monitoring + Brain-triggered LP investigations + A/B test completion events

| Step | Action | Output |
|------|--------|--------|
| 1 | Query GA4 + DWT mart for LP session data segmented by UTM (audience × channel × selling point) | LP performance dataset by segment |
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
| Message match score (LP↔Ad) | >75 average across active paths |
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
| Onboarding variant testing | — |
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
| 2 | Segment onboarding performance by: channel × audience × selling point × LP variant | Per-path onboarding rates |
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
| Product↔marketing alignment scoring | Budget allocation |
| Use case discovery from behavioral data | — |
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
| 1 | Query BigBrain for product usage metrics segmented by acquisition source (channel × audience × selling point) | Usage dataset by source |
| 2 | Analyze feature adoption patterns: which features do high-value users adopt? When? | Feature adoption map |
| 3 | Specifically track AI/agents usage: AI assistant queries, automation creation, workflow agents | AI adoption report |
| 4 | Track events/integrations usage: which integrations are set up, how quickly, by which cohorts | Integration adoption map |
| 5 | Compute product↔marketing alignment: do users acquired via "CRM" ads actually use CRM features? | Alignment scores per funnel path |
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
| Product↔marketing alignment scores | Brain, Creative Agent (for messaging alignment) |
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
| Product↔marketing alignment score improvement | +10 points average in 90 days |
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

## Cross-Agent Communication

### Communication Model

Agents communicate through a shared message bus backed by the Agent Local Store (Postgres). No direct agent-to-agent calls. All communication is asynchronous and auditable.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     AGENT MESSAGE BUS                                │
│                   (Agent Local Store — Postgres)                     │
│                                                                     │
│  ┌──────────────┐                                                   │
│  │ Task Queue   │  Brain posts tasks → Function agents consume      │
│  ├──────────────┤                                                   │
│  │ Findings     │  Function agents post → Brain consumes            │
│  ├──────────────┤                                                   │
│  │ Data Shares  │  Any agent posts data → Any agent reads           │
│  ├──────────────┤                                                   │
│  │ Approvals    │  Agents post proposals → Humans respond           │
│  ├──────────────┤                                                   │
│  │ Audit Log    │  All agents append → Dashboard reads              │
│  └──────────────┘                                                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Communication Flows

| From | To | Data Shared | Trigger |
|------|----|-------------|---------|
| Brain | All function agents | Scoped task briefs with context | Daily cycle + anomaly |
| All function agents | Brain | Findings, recommendations, scores | Task completion |
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
  "to_agent": "landing_pages",
  "type": "data_share",
  "priority": "normal",
  "payload": {
    "topic": "selling_point_update",
    "data": { ... }
  },
  "timestamp": "2026-05-07T10:30:00Z",
  "expires": "2026-05-14T10:30:00Z"
}
```

### Conflict Resolution

When agents produce conflicting recommendations (e.g., Creative Agent wants to test a new ad but Performance Agent recommends pausing the campaign), the Brain resolves the conflict by:
1. Weighing estimated impact of each recommendation
2. Checking 4-duck alignment implications of each option
3. If comparable, deferring to the agent with higher confidence score
4. If still ambiguous, escalating to human review with both rationales

---

## Data Architecture

### What Each Agent Reads and Writes

| Agent | Reads From | Writes To |
|-------|-----------|----------|
| **Brain** | DWT mart (funnel metrics), Channel APIs (spend), Agent local store (all agent findings), GA4 (attribution) | Agent local store (scores, priorities, tasks, audit log), Channel APIs (budget changes), Slack (digests, alerts) |
| **Performance Analysis** | Channel APIs (campaign structure, keywords, bids, Quality Score), DWT mart (conversion data), Agent local store (task briefs, history) | Agent local store (structure audits, bid changes), Channel APIs (bids, negatives, pauses), Slack (waste reports) |
| **Audience Discovery** | Channel APIs (audience definitions, performance), BigBrain (first-party data, CRM), DWT mart (audience funnel data), GA4 (segments) | Agent local store (overlap reports, audience scores), Channel APIs (audience changes, suppression lists), Slack (insights) |
| **Creative Insights** | Channel APIs (creative content, performance), Webflow (LP content for message match), Agent local store (history, taxonomy) | Agent local store (fatigue alerts, match scores, test results), Channel APIs (creative rotations), monday.com (creative briefs) |
| **Landing Pages** | GA4 (LP sessions, behavior), DWT mart (LP→paying), Webflow (LP content), Hotjar/Clarity (heatmaps), PageSpeed API | Agent local store (CVR reports, test results, selling point maps), Webflow (LP variants), Testing platform (A/B tests) |
| **Onboarding & Lifecycle** | BigBrain (onboarding events, activation), Email platform (engagement), GA4 (return rates), Agent local store (LP selling points) | Agent local store (onboarding reports, continuity scores), Email platform (sequence changes), Slack (churn alerts) |
| **Product Behaviour** | BigBrain (usage data, AI features, integrations), Billing system (revenue), DWT mart (source mapping) | Agent local store (behavior scores, ICP criteria, use cases, alignment scores), Slack (insight reports) |

### Storage Model

```
┌────────────────────────────────────────────────────────────────┐
│                    AGENT LOCAL STORE (Postgres)                  │
│                                                                │
│  agent_tasks          — Task queue (Brain → function agents)   │
│  agent_findings       — Analysis results from all agents       │
│  agent_messages       — Inter-agent data shares                │
│  duck_scores          — 4-duck alignment scores per path       │
│  recommendations      — Proposed actions pending approval      │
│  audit_log            — Append-only record of all actions      │
│  experiment_results   — A/B test outcomes (creative, LP, etc)  │
│  audience_scores      — Audience-level performance metrics     │
│  selling_point_maps   — Content tagged with selling points     │
│  icp_criteria         — Current ICP definition and history     │
│  agent_confidence     — Per-action-type confidence scores      │
│  autonomy_levels      — Current autonomy level per action type │
└────────────────────────────────────────────────────────────────┘
```

### External Data Sources Summary

| Source | Used By | Access Pattern |
|--------|---------|---------------|
| **DWT Mart (Snowflake)** | All agents | SQL queries via endpoint, on-demand |
| **Google Ads API** | Brain, Performance, Audience, Creative | Read: on-demand. Write: approved changes |
| **Meta Marketing API** | Brain, Performance, Audience, Creative | Read: on-demand. Write: approved changes |
| **YouTube Ads API** | Brain, Performance, Audience, Creative | Read: on-demand. Write: approved changes |
| **LinkedIn Campaign Manager API** | Brain, Performance, Audience, Creative | Read: on-demand. Write: approved changes |
| **Reddit Ads API** | Brain, Performance, Audience, Creative | Read: on-demand. Write: approved changes |
| **BigBrain/Snowflake** | Audience, Onboarding, Product Behaviour | Read: on-demand queries |
| **GA4 (BigQuery)** | Brain, LP, Onboarding | Read: on-demand queries |
| **Webflow API** | Creative (read), LP (read + write) | Read: on-demand. Write: approved LP changes |
| **Hotjar/Clarity** | LP | Read: on-demand |
| **Email platform** | Onboarding | Read + Write |
| **Billing system** | Product Behaviour | Read: on-demand |
| **Slack API** | All agents | Write: notifications, alerts, digests |
| **monday.com API** | Brain, Creative | Write: tasks, creative briefs |

---

## Implementation Priority

### Recommended Build Order

| Priority | Agent | Rationale |
|----------|-------|-----------|
| **P0 (Week 1-3)** | **Brain (Orchestrator)** | Everything depends on the Brain. Without cross-channel visibility and 4-duck scoring, other agents have no direction. Build scoring + priority queue first. Start as read-only dashboard. |
| **P0 (Week 1-3)** | **Performance Analysis & Account Structure** | Immediate ROI. Wasted spend identification and bid optimization are the fastest path to measurable savings. Also provides the campaign structure data other agents need. |
| **P1 (Week 3-5)** | **Creative Insights & Creation** | Creative is the highest-leverage variable in paid marketing. Message match scoring and fatigue detection address the most common performance decay pattern. Unlocks the qualitative consistency view from SPEC-V2. |
| **P1 (Week 3-5)** | **Landing Pages** | LP is the most common bottleneck in monday.com funnels (per ARCHITECTURE.md examples). CVR improvements have direct, measurable revenue impact. Also completes the SPEC-V2 quantitative funnel view. |
| **P2 (Week 5-7)** | **Audience Discovery & Expansion** | Depends on Performance Agent (for keyword data) and Creative Agent (for messaging alignment). Cross-channel overlap is likely a significant waste source. |
| **P2 (Week 5-7)** | **Product Behaviour Insights** | Primarily observational — can run in parallel without affecting other agents. Provides ICP signals that improve all upstream agents over time. |
| **P3 (Week 7-9)** | **Personalized Onboarding & Lifecycle** | Depends on LP Agent (selling point data) and Product Behaviour Agent (activation data). Most complex integration surface (product team dependency). Save for last. |

### P0 Milestone (Week 3)

The Brain + Performance Agent running daily produces:
- Full-funnel 4-duck scores for all active campaigns
- Daily priority queue of top opportunities
- Wasted spend report with actionable cuts
- Bid optimization recommendations

This alone replaces ~40% of weekly manual analysis and gives the team a single source of truth.

### P1 Milestone (Week 5)

Adding Creative + LP agents completes the full SPEC-V2 vision:
- Qualitative messaging consistency view (Ad → LP → Onboarding)
- Quantitative funnel performance (CTR → behavior → CVR → Day-2)
- Automated creative fatigue detection and rotation
- LP A/B test pipeline

### Full System (Week 9)

All 7 agents operational. Autonomy levels start at Level 0-1 across the board. Earn upgrades based on approval rates and outcome tracking over the following 8 weeks.

---

*"One brain, many hands. Every decision traces back to the full funnel."*

— Nymeria
