# Multi-Agent Orchestration for Marketing
## Presentation Deck — Slide-by-Slide

**For:** Guy Regev | **Date:** 2026-05-09 | **Duration:** ~20 min

---

## Slide 1: The Problem

### 11 Agents, No Conductor

**Key Point:** We have 11 specialized AI agents across content, ads, and data — but they operate in silos. No shared context, no coordinated execution, no unified monitoring.

**Evidence:**
- Each agent works independently → duplicated effort, conflicting outputs
- No cross-domain awareness → content team writes without analytics input
- Manual coordination by humans → bottleneck, defeats the purpose of AI agents
- No cost visibility → token spend is a black box

**The Question:** How do we make 11 agents work as a team, not 11 individuals?

---

## Slide 2: Framework Landscape

### We Evaluated 6 Frameworks — Here's the Truth

| Framework | Verdict | Why |
|-----------|---------|-----|
| **LangGraph** | ✅ **Production pick** | Deterministic, stateful, auditable |
| **CrewAI** | ⚠️ Prototype only | Fast to build, hard to debug at scale |
| **AutoGen** | ⚠️ Microsoft ecosystem | Good if you're Azure-native |
| **MetaGPT** | ❌ Wrong domain | Built for software dev, not marketing |
| **OpenAI Swarm** | ❌ Not production | Experimental/educational only |
| **CAMEL** | ❌ Research-grade | Academic, not enterprise |

**Recommendation:** LangGraph for orchestration backbone. 62% of enterprise agentic deployments use it in 2026.

**Action:** Don't rewrite agents in a framework — build an orchestration layer on top.

---

## Slide 3: Architecture — The Sweet Spot

### 2-Layer Hub-and-Spoke (NOT 3-Layer Hierarchy)

```
                    ┌───────────────────┐
                    │   Marketing       │
                    │   Orchestrator    │  ← LangGraph state machine
                    └───────┬───────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
        ┌─────┴─────┐ ┌────┴────┐ ┌──────┴──────┐
        │ Content   │ │ Ads     │ │ Data &      │
        │ Lead      │ │ Lead    │ │ Intelligence│
        └─────┬─────┘ └────┬────┘ └──────┬──────┘
              │            │             │
        ┌─────┼─────┐  ┌──┼──┐     ┌────┼────┐
        │  │  │     │  │  │  │     │         │
       Blog Social SEO GA Meta Paid Analytics Research
       Writer Writer     Ads  Ads  Analytics
```

**Key Point:** 3-layer hierarchy is overkill for 11 agents. Adds latency, token cost, and debugging complexity.

**Evidence:**
- 3 layers = minimum 3 LLM hops per request
- Each hop = more tokens, more latency, more failure points
- 2 layers: orchestrator talks to 3 leads, leads manage 2-3 workers each

**Action:** Implement 2-layer hub-and-spoke with 3 domain clusters.

---

## Slide 4: Why NOT 3 Layers?

### The Math Doesn't Work

| Metric | 2-Layer | 3-Layer | Delta |
|--------|---------|---------|-------|
| **LLM hops per task** | 2 | 3+ | +50% latency |
| **Token cost per task** | ~2x summarization | ~3x summarization | +50% cost |
| **Debug trace depth** | 2 nodes | 3+ nodes | Much harder |
| **Single points of failure** | 1 (orchestrator) | 2 (orchestrator + supervisors) | 2x risk |
| **Agents per supervisor** | 3-4 | 3-4 (same!) | No benefit |

**Key Point:** You'd need 20+ agents before 3 layers becomes justified. At 11, the indirection cost outweighs the organizational benefit.

---

## Slide 5: Communication — The Hybrid Pattern

### Three Patterns, One System

| Pattern | Used For | Example |
|---------|----------|---------|
| 🏛️ **Hierarchical** | Task delegation & status rollup | Orchestrator → "Content Lead, write a CRM blog post" |
| 📋 **Blackboard** | Shared state & work artifacts | monday.com board shows all task statuses |
| 📡 **Pub/Sub** | Real-time notifications | Webhook fires when blog draft is complete |

**Key Point:** No single communication pattern works alone. The hybrid approach lets agents delegate (hierarchical), share state (blackboard), and react to events (pub/sub).

**How it flows:**
1. Orchestrator creates task on monday.com board → hierarchical delegation
2. Agents read/write board state → blackboard pattern
3. Status changes trigger webhooks → pub/sub events
4. Orchestrator reacts to events → orchestrates next steps

---

## Slide 6: monday.com as the Blackboard

### Your Coordination Hub Already Exists

**Key Point:** monday.com boards are a natural blackboard for multi-agent coordination — and the marketing team can see what's happening.

**Why it works:**
- ✅ GraphQL API for programmatic read/write
- ✅ Webhooks for event-driven triggers
- ✅ Column types = structured data (status, people, numbers, dates)
- ✅ Cross-board automations connect domains
- ✅ Built-in audit trail
- ✅ **The marketing team already lives here** — zero adoption friction

**Board Structure:**
```
📋 Master Campaign Board        → Orchestrator's view
📋 Content Pipeline Board       → Content domain
📋 Ads Dashboard Board          → Ads domain
📋 Analytics Hub Board          → Data domain
📋 Agent Operations Board       → Health & monitoring
```

**Caveats:** Use Redis/SQS alongside for high-frequency coordination. monday.com API isn't built for >1 update/second per item.

---

## Slide 7: Shared Memory — 3 Tiers

### Hot → Warm → Cold Memory Architecture

| Tier | What | Where | Latency | Example |
|------|------|-------|---------|---------|
| 🔴 **Hot** | Current task context | Redis / in-memory | <10ms | "I'm writing a CRM blog post" |
| 🟡 **Warm** | Task status, assignments, artifacts | monday.com boards | 100-500ms | Campaign board shows all statuses |
| 🔵 **Cold** | Historical data, brand guidelines, past learnings | Vector DB + RAG | 500ms-2s | "Last Q3, CRM posts averaged 2.3K visits" |

**Key Point:** Don't try to put everything in one place. Hot memory for speed, warm memory for coordination, cold memory for wisdom.

**Action:** monday.com is your Tier 2. Add Redis (Tier 1) and a Vector DB (Tier 3) to complete the stack.

---

## Slide 8: Interoperability — A2A + MCP

### The Emerging Standards You Should Design For

```
Agent ←→ Agent  =  A2A Protocol (Google, Linux Foundation)
Agent ←→ Tool   =  MCP Protocol (Anthropic, Linux Foundation)
```

**A2A (Agent-to-Agent):**
- HTTP + SSE + JSON-RPC 2.0
- Agent Cards for capability discovery
- Task delegation, status tracking
- OAuth 2.0 security

**MCP (Model Context Protocol):**
- Standardized tool access
- Discovery + invocation
- Context sharing across tools

**Key Point:** These are becoming the USB-C of AI agents. Design agent interfaces with A2A Agent Cards now — you'll need them as the ecosystem matures.

**Action:** Create Agent Cards for all 11 agents defining capabilities, inputs, outputs.

---

## Slide 9: Observability — Seeing Everything

### You Can't Manage What You Can't Measure

**Recommended Stack:**

| Layer | Tool | What It Tracks |
|-------|------|----------------|
| **Agent Traces** | Langfuse (self-hosted, OSS) | Every LLM call, tool use, reasoning step |
| **Task Flow** | monday.com boards | Task lifecycle across domains |
| **System Metrics** | Prometheus + Grafana | CPU, memory, queue depth, uptime |
| **Cost** | Langfuse + custom rollup | $/agent, $/task, $/campaign |
| **Quality** | Langfuse evaluations | Output quality, hallucination detection |

**Why Langfuse over LangSmith:**
- Open source + self-hosted = free, vendor-independent
- OpenTelemetry native = works with any framework
- (LangSmith is better if you go 100% LangChain — but we're not)

**The Marketing Team's View:** An "Agent Operations Board" on monday.com showing agent health, active tasks, failures, and daily summaries. No Grafana training required.

---

## Slide 10: Real-World Evidence

### This Architecture Pattern Works

**Crocs India** — Multi-agent marketing system
- Audience agents + Journey agents + Insight agent
- **$5M incremental revenue** from a single BOGO campaign
- Non-obvious customer segments discovered by agent collaboration

**Warmly.ai** — Agentic campaign management
- Autonomous campaign optimization in real-time
- Subject lines, cadence, channel strategy adjusted **without human prompting**

**Agency Industry Benchmarks:**
- **40-60% time savings** on operational marketing tasks
- Content production: **days → hours**
- Campaign optimization: **weekly manual → continuous autonomous**

**Key Point:** Multi-agent marketing orchestration isn't theoretical. It's delivering measurable ROI in production today.

---

## Slide 11: Risks — Eyes Wide Open

| Risk | What Happens | How We Mitigate |
|------|-------------|-----------------|
| 💰 **Token cost spiral** | 11 agents × multiple LLM calls = $$$$ | Per-agent budgets, Langfuse cost tracking, model tier selection |
| 🐛 **Cross-agent debug hell** | "Why did agent X produce that output?" | Full Langfuse tracing, event sourcing on state changes |
| 🚧 **API rate limits** | monday.com API throttles under load | Batch updates, cache reads, use webhooks not polling |
| 🔄 **State conflicts** | Two agents update same resource | Domain ownership rules, optimistic concurrency |
| 🏗️ **Over-engineering** | Build a spaceship when we need a car | Start simple, add complexity only when proven needed |

---

## Slide 11.5: Creative Agent — The 12th Agent

### DESIGN.md-Powered LP & Ad Generation

**Key Point:** When a campaign needs a landing page, today it's days/weeks of design → dev → deploy. The Creative Agent makes this instant.

**How:** [Google's DESIGN.md spec](https://github.com/google-labs-code/design.md) gives AI agents structured design tokens (colors, typography, spacing, components) + rationale. The Creative Agent reads these tokens and generates on-brand landing pages.

**Flow:**
- Ads Agent detects LP needed → sends brief to Creative Agent
- Creative reads DESIGN.md + pulls audience context
- Generates React + Tailwind LP (exported from design tokens)
- Lints for WCAG accessibility → deploys to preview → wires to campaign
- Monitors conversions → iterates

**What DESIGN.md gives us:**
- Machine-readable YAML tokens = exact hex codes, font sizes, spacing
- Built-in CLI linter = catches accessibility issues before deploy
- Tailwind CSS export = `npx @google/design.md export --format css-tailwind`
- Diffable = track design system changes in Git

**To build this we need:** monday.com's actual design tokens extracted into a DESIGN.md file from Figma/brand guidelines.

**Full spec:** `creative-agent-spec.md`

---

## Slide 12: Implementation Roadmap

### 12 Weeks to Production

| Phase | Weeks | Deliverables |
|-------|-------|-------------|
| **🏗️ Foundation** | 1-4 | Agent Cards for all 12 agents, monday.com board structure, Langfuse deployed, agents instrumented, DESIGN.md created |
| **🔧 Orchestration** | 5-8 | LangGraph orchestrator, domain lead agents, state machine, Redis setup, Grafana dashboards |
| **🧪 Integration** | 9-12 | All 12 agents connected (incl. Creative Agent LP flow), E2E testing, load testing, HITL approval flows, cost monitoring |
| **🚀 Production** | 13+ | Gradual rollout, A/B testing vs manual, iteration, A2A protocol support |

**Key Milestones:**
- Week 4: All agents have Agent Cards + traces in Langfuse
- Week 8: Orchestrator can execute a campaign end-to-end in staging
- Week 12: Production-ready with monitoring and approval gates
- Week 16: First fully autonomous campaign execution

---

## Slide 13: Action Items

### What We Need to Decide Now

1. **✅ Confirm architecture:** 2-layer hub-and-spoke with LangGraph orchestrator
2. **✅ Confirm observability:** Langfuse (self-hosted) + monday.com operational board
3. **📋 Define domain clusters:** Content / Ads / Data — agree on agent assignments
4. **📋 Assign owners:** Who builds the orchestrator? Who instruments agents?
5. **📋 Budget:** Langfuse hosting, Redis/queue infra, LLM token budget per campaign
6. **📋 First campaign:** Pick a real campaign for the Week 12 E2E test

### The Bottom Line

We don't need a PhD in multi-agent systems. We need:
- A thin orchestration layer (LangGraph)
- monday.com boards as the shared brain
- Full tracing so we can debug when things go sideways
- Start simple, iterate fast

**11 agents working as a coordinated team > 11 agents working alone.**

---

*Appendix: Full technical deep-dive available in `orchestration-research.md`*
