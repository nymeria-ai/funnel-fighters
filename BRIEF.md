# Funnel Fighters HQ — Project Brief

## What We're Building
A dark-themed, sophisticated marketing funnel dashboard based on Roy Mann's "Funnel Fighters" framework (4 Ducks model). This is the command center for monday.com's agentic performance marketing.

## The 4 Ducks Framework
Every marketing funnel has 4 "ducks" that must align:
1. **Audience** (🦆 Source) — Who are we bringing?
2. **Ads** (🦆 Filter) — Are we filtering for the right people?
3. **Landing Pages** (🦆 Enhancer) — Are we reinforcing intent?
4. **Product** (🦆 Promise) — Are we delivering on the promise?

The funnel is MULTIPLICATIVE — one weak duck kills the whole thing.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **UI:** Custom dark theme inspired by monday.com's Vibe design system (`@vibe/core`, `@vibe/icons`). DO NOT use purple vibe-coding aesthetics. This should look premium, minimal, and sharp.
- **Styling:** Tailwind CSS + CSS variables for theming
- **Database:** Vercel Postgres (or SQLite for dev)
- **Auth:** NextAuth.js with email invite-only (no public signup)
- **Deploy:** Vercel
- **Language:** TypeScript throughout

## Design Requirements

### Theme
- **Dark mode ONLY** — sophisticated, not gimmicky
- Color scale for scores:
  - Gray (#6B7280) — Not Available / No Data
  - Red (#EF4444) — Poor (0-30)
  - Orange (#F97316) — Needs Work (31-60)
  - Green (#22C55E) — Good (61-80)
  - Golden Yellow (#EAB308) — Excellent (81-100)
- Background: deep dark (#0F0F0F or similar)
- Cards: slightly lighter dark (#1A1A1A)
- Text: white/light gray
- Accents: use the score colors + subtle blue for interactive elements
- Typography: Inter or similar clean font
- NO generic vibe-coding purple gradients

### Visual Language
- Duck emojis/icons for each stage
- Water quality metaphors for traffic sources (pure blue, murky, dirty)
- Funnel illustrations where appropriate
- Minimal, information-dense, scannable

## Page Structure

### 1. Home — Funnel Overview (`/`)
- **Overall Funnel Score** — geometric mean of 4 ducks: `(A × B × C × D) ^ (1/4)`
- **4 Duck Cards** in a row — each showing:
  - Duck icon + name
  - Score (0-100) with colored badge
  - Duck color (based on score range)
  - Sparkline trend (last 8 weeks)
  - Click to drill down
- **Weekly Cohort Table** — Roy's funnel table:
  - Rows = weeks
  - Columns = Spend | Visits | Cost/Visit | Signups | %Signup | Active | %Active | Paying | %Paying
  - Color-coded cells (green = improving, red = declining)
- **Alerts** — What needs immediate attention

### 2. Ads Deep Dive (`/ads`)
- Overall Ads duck score + color
- **Channel cards:** Google, Meta, YouTube, LinkedIn, Affiliates
  - Each channel card shows: channel icon, score, color, status (connected/not)
  - Click channel → see campaigns
  - Click campaign → see ad groups/sets
  - Click ad group → see individual ads
  - At each level: metrics table + score + color
- **Drill-down hierarchy:** Channel → Campaign → AdSet/Group → Ad

### 3. Audience Deep Dive (`/audience`)
- Overall Audience score + color
- Source quality visualization (water metaphor)
- Per-source cohort analysis
- Audience overlap warnings

### 4. Landing Pages Deep Dive (`/landing-pages`)
- Overall LP score + color
- List of all LPs (extracted from ad destinations)
- Per-LP: Google PageRank, load time, conversion rate
- Ad-to-LP alignment checker
- Rank tracking with timestamps + refresh button

### 5. Product Deep Dive (`/product`)
- Overall Product score + color
- Activation funnel
- Signup → Active → Paying conversion
- Retention curves

### 6. Gaps & Next Actions (`/gaps`)
- Per-duck: what data/access is missing
- Priority-ordered action items
- Integration status (connected ✓ / needed ✗)

## Right Panel (Critical Feature!)
When clicking ANY element (duck, channel, campaign, ad, LP), a **right side panel** slides open with:
1. **Detailed info** about the selected element (expanded metrics, scores, breakdown)
2. **AI Chat interface** — a chat window where users can ask questions or request actions about the selected context. This is an AI agent that understands what you're looking at.

The panel should be ~400px wide, with a clean split: top = info, bottom = chat.

## Scoring System
Each duck gets a score 0-100. The overall score is the geometric mean.

### Default Scoring (v1 — will be tuned later):

**Audience Score:**
- Source conversion quality: 40%
- Cost efficiency trend: 30%
- Audience-to-paying alignment: 30%

**Ads Score (per channel, then weighted average):**
- CTR quality (CTR that leads to conversions): 30%
- Creative freshness (no fatigue): 20%
- Message-to-LP alignment: 25%
- Cost trend: 25%

**Landing Page Score:**
- Visit-to-signup rate: 35%
- Google PageRank: 20%
- Page speed / Core Web Vitals: 20%
- Ad-to-LP message match: 25%

**Product Score:**
- Signup-to-activation: 30%
- Activation-to-paying: 35%
- Day-7 retention: 20%
- Time to value: 15%

## Data Sources (v1)
1. **Google Ads API** — Campaign, AdGroup, Ad level metrics. We have access.
2. **Ahrefs API** — Domain rating, keyword rankings, backlinks for LP scoring
3. **Google Ads destination URLs** — Extract LP URLs from ads to build LP inventory
4. **Mock data** — For anything not yet connected, show realistic mock data with a "mock" badge

## Database Schema (Initial)

```sql
-- Funnels we're tracking
CREATE TABLE funnels (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Duck scores over time
CREATE TABLE duck_scores (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  duck TEXT NOT NULL, -- 'audience', 'ads', 'landing_pages', 'product'
  score DECIMAL(5,2),
  color TEXT, -- 'gray', 'red', 'orange', 'green', 'gold'
  metadata JSONB, -- sub-scores, breakdown
  measured_at TIMESTAMP DEFAULT NOW()
);

-- Channel-level scores (for ads duck)
CREATE TABLE channel_scores (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  channel TEXT NOT NULL, -- 'google', 'meta', 'youtube', 'linkedin', 'affiliates'
  score DECIMAL(5,2),
  color TEXT,
  metrics JSONB,
  measured_at TIMESTAMP DEFAULT NOW()
);

-- Campaign-level data
CREATE TABLE campaigns (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  channel TEXT NOT NULL,
  external_id TEXT, -- ID from ad platform
  name TEXT,
  score DECIMAL(5,2),
  metrics JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Landing pages inventory
CREATE TABLE landing_pages (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  url TEXT NOT NULL,
  google_rank DECIMAL(5,2),
  rank_updated_at TIMESTAMP,
  page_speed_score DECIMAL(5,2),
  conversion_rate DECIMAL(5,4),
  metrics JSONB,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Weekly cohort data (Roy's funnel table)
CREATE TABLE cohorts (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  week_start DATE NOT NULL,
  spend DECIMAL(10,2),
  visits INTEGER,
  signups INTEGER,
  active INTEGER,
  paying INTEGER,
  metrics JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Gaps and next actions
CREATE TABLE gaps (
  id UUID PRIMARY KEY,
  funnel_id UUID REFERENCES funnels(id),
  duck TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'critical', 'high', 'medium', 'low'
  status TEXT DEFAULT 'open', -- 'open', 'in_progress', 'done'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Integration connections
CREATE TABLE integrations (
  id UUID PRIMARY KEY,
  platform TEXT NOT NULL, -- 'google_ads', 'meta', 'ahrefs', etc.
  status TEXT DEFAULT 'disconnected', -- 'connected', 'disconnected', 'error'
  credentials JSONB, -- encrypted
  last_sync TIMESTAMP,
  config JSONB
);
```

## Auth Requirements
- Invite-only: only specific email addresses can access
- Initial allowed users:
  - guyre@monday.com (admin)
  - diego.malamute.1@gmail.com (admin)
- Simple email-based auth (magic link or Google OAuth restricted to allowlist)

## Phase 1 Deliverable
A working dashboard with:
1. Home page with 4 duck cards (mock scores + real Google Ads data where available)
2. Ads drill-down page with Google Ads integration (campaign → adgroup → ad)
3. Landing Pages page showing LP inventory extracted from Google Ads destinations + Google PageRank
4. Right panel with detail view + AI chat placeholder
5. Gaps page showing what's connected vs what's missing
6. Weekly cohort table (mock data)
7. Deployed to Vercel with invite-only auth
8. GitHub repo

## Files to Reference
- `~/.openclaw/workspace/funnel-fighters/TORAH.md` — The 20 principles (the "religion")
- `~/.openclaw/workspace/funnel-fighters/FULL-SUMMARY.md` — Complete framework summary
- `~/.openclaw/workspace/funnel-fighters/RESEARCH.md` — Technical research and architecture
- `~/.openclaw/workspace/funnel-fighters/MARKETING-X1000-CONTEXT.md` — Team context

## Important
- Ship fast. Roy says: "Run water through the pipes." Get the skeleton working, then iterate.
- The dashboard itself should follow the Funnel Fighters philosophy: release fast, improve the whole thing, don't get attached.
- Use realistic mock data where real data isn't available yet. Mark mocked data clearly.
