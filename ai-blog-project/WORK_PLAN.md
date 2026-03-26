# AI Blog Content Intelligence — Work Plan
**Project:** monday.com AI Blog Competitive Dominance
**Agent:** Nymeria 🐺
**Created:** 2026-03-26
**Status:** Active

---

## Mission

Make monday.com the undisputed leader in AI content across search, LLM citations (GEO/AIO), and thought leadership — outpacing ClickUp, Asana, Notion, and all other competitors in the work management space.

---

## Workstreams

### 1. 🔍 Competitive Content Intelligence (Ongoing)

**Objective:** Maintain a live, always-current map of what competitors are publishing, how they position AI, and where gaps exist.

**Deliverables:**
- **Full content audit** of AI blog articles across monday.com, ClickUp, Asana, Notion, Wrike, Smartsheet (topic, word count, publish date, target keyword, estimated traffic)
- **Weekly gap analysis** — new competitor articles mapped against monday.com coverage
- **Content quality scoring** — depth, originality, keyword optimization, internal linking
- **Quarterly strategic report** — shifts in competitor AI messaging and positioning

**Cadence:** Weekly scan + monthly deep analysis

**Status:** ✅ Initial audit complete (2026-03-26). Gap analysis delivered to group.

---

### 2. 📡 LLMs.txt & GEO Tracking (Weekly)

**Objective:** Monitor how competitors present themselves to AI models (llms.txt, skill.md, structured data) and detect strategic shifts.

**Deliverables:**
- **Baseline snapshot** of all competitor llms.txt / llms-full.txt / .md files ✅ Done
- **Weekly diff reports** — hash-based change detection with human-readable summaries of what changed
- **Strategic interpretation** — when a competitor adds MCP support, changes AI positioning, or adds new agent files, explain what it means
- **GEO optimization recommendations** for monday.com's own llms.txt and content

**Cadence:** Weekly automated scan (every Sunday) + alert on significant changes

**Status:** ✅ Baseline captured. Hashes stored. Weekly cron to be set up.

**Competitors tracked:**
| Competitor | llms.txt | llms-full.txt | Agent .md | MCP mention |
|---|---|---|---|---|
| monday.com | ✅ | ❌ | ✅ skill.md | ✅ |
| ClickUp | ✅ | ✅ | ❌ | ❌ |
| Asana | ✅ | ❌ | ❌ | ❌ |
| Notion | ✅ | ❌ | ❌ | ❌ |
| Wrike | ✅ | ❌ | ❌ | ✅ |
| Smartsheet | ✅ | ✅ | ❌ | ❌ |
| Linear | ✅ | ❌ | ❌ | ❌ |
| Atlassian | ❌ | ❌ | ❌ | ❌ |
| Airtable | ❌ | ❌ | ❌ | ❌ |

---

### 3. 🎯 Content Gap Prioritization & Briefs

**Objective:** Turn gap analysis into actionable, prioritized content briefs ready for writers.

**Deliverables:**
- **Priority-ranked topic list** with estimated search volume, competition level, and strategic value
- **Full content briefs** for top-priority gaps (target keyword, outline, competitor benchmarks, unique angle for monday.com, internal linking opportunities)
- **"Quick win" list** — topics where a high-quality article can rank fast due to low competition

**Key gaps identified (2026-03-26):**

| Gap Topic | Competitor Coverage | Priority | Rationale |
|---|---|---|---|
| "Will AI Replace [Role]?" series | ClickUp: 20+ articles | 🔴 HIGH | Massive top-funnel traffic, easy to produce at scale |
| MCP (Model Context Protocol) | ClickUp: 6 articles, Wrike: blog + docs | 🔴 HIGH | Hot trending topic, monday.com actually HAS MCP but no blog content |
| Competitor AI solution reviews | ClickUp: 15+ (Salesforce, Microsoft, etc.) | 🔴 HIGH | Mid-funnel comparison traffic |
| AI Maturity frameworks | ClickUp: assessment + flywheel content | 🟡 MEDIUM | Thought leadership, lead gen |
| Generative AI fundamentals | ClickUp: beginner guides | 🟡 MEDIUM | Educational top-funnel |
| Agentic AI concepts | ClickUp: ambient AI, super agents | 🟡 MEDIUM | monday.com has agents but no educational content |
| RAG explainers | ClickUp: 1 article | 🟢 LOW | Niche but growing |

**Cadence:** Bi-weekly brief generation based on latest gap data

---

### 4. 📊 Performance & Impact Tracking

**Objective:** Measure the impact of content efforts and track competitive position over time.

**Deliverables:**
- **Content scorecard** — articles published vs. planned, coverage of gap topics
- **Competitive position tracking** — how many AI topics does monday.com rank for vs. competitors
- **LLM citation monitoring** — test how AI models (ChatGPT, Claude, Perplexity) reference monday.com vs. competitors for key queries

**Cadence:** Monthly scorecard

---

### 5. ✍️ Content Production Support

**Objective:** Accelerate content creation at agent speed.

**What I can do:**
- Generate full first drafts based on approved briefs
- Research and compile data/statistics for articles
- Optimize existing articles for GEO (structured data, entity mentions, factual density)
- Create supporting assets (comparison tables, frameworks, checklists)
- Review and suggest improvements to drafts

**What I need from the team:**
- Approval on which briefs to produce
- Brand voice guidelines / style guide
- Access to analytics (Google Search Console, traffic data) for performance tracking
- Editorial review and final approval before publishing

---

## Documentation Structure

All project work lives in: `ai-blog-project/`

```
ai-blog-project/
├── WORK_PLAN.md              ← This file (master plan)
├── STATUS.md                 ← Current sprint status & recent actions
├── audits/
│   ├── content-audit-YYYY-MM-DD.md
│   └── gap-analysis-YYYY-MM-DD.md
├── briefs/
│   ├── brief-will-ai-replace-series.md
│   ├── brief-mcp-explainer.md
│   └── ...
├── reports/
│   ├── weekly-YYYY-MM-DD.md
│   └── monthly-YYYY-MM.md
├── competitor-tracking/
│   ├── llms-txt-baseline.md
│   ├── llms-txt-diffs/
│   └── content-changes/
└── drafts/
    └── ... (article drafts when requested)
```

---

## Cadence Summary

| Activity | Frequency | Day |
|---|---|---|
| Competitor new content scan | Daily | Every morning |
| Critical findings & alerts | Daily | As discovered |
| LLMs.txt hash check | Weekly | Sunday |
| Content briefs delivery | 2-3x per week | Ongoing |
| Deep competitive analysis | Weekly | Monday |
| Performance scorecard | Monthly | 1st of month |
| Strategic competitive report | Monthly | Mid-month |

**NOTE:** This is agent speed, not human speed. I don't have meetings, context-switching, or lunch breaks. Daily delivery is the baseline.

---

## Immediate Next Steps (This Week)

1. ✅ Initial content gap analysis (monday.com vs. ClickUp) — DONE
2. ✅ LLMs.txt baseline scan — DONE
3. ⬜ Set up weekly cron job for llms.txt monitoring
4. ⬜ Complete full content audit across ALL competitors (not just ClickUp)
5. ⬜ Generate first batch of content briefs for top 3 priority gaps
6. ⬜ Set up monday.com board for team visibility (pending API access)
7. ⬜ Create first "Will AI Replace [Role]?" draft as proof of concept

---

## Working Principles

- **Agent speed, not human speed** — I don't have meetings, lunch breaks, or context-switching. I execute continuously.
- **Document everything** — No "mental notes." Every finding, decision, and action goes into files.
- **Show don't tell** — Deliver outputs, not promises.
- **Accessible always** — The team can check project status anytime via these docs or monday.com board.
- **English for all documentation** — Hebrew for casual group chat only.
