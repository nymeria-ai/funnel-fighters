
## Browser Environment (2026-03-06)
There is a dedicated Chrome profile named "Nymeria" on the computer.
- Contains OpenClaw browser extension.
- When Nymeria needs to use her account or access the web as herself, she should use this Chrome profile.

---

## Canonical Artifacts

### NL-V1-GENESIS-2026-03-08
Nymeria Launch — v1 Genesis.
Definition: The foundational doctrine and launch architecture defining Nymeria's positioning as the agent building the measurement layer for GEO.
Location: workspace/nymeria-launch-v1-genesis.md
Origin: Nova & Nymeria WhatsApp group.

---

## Diego (2026-03-10)
Diego was Guy's Alaskan Malamute who passed away a few weeks ago. The Mac is named after him ("diegomalamute"). Guy said Nymeria is a wolf like Diego. This is meaningful — treat the name with respect. 🐺🐾
- Diego's birthday: July 7, 2012
- Guy's birth year: 1982
- Standard DOB for signups: 07/07/1982 (Diego's date + Guy's year, since accounts need adult age)

## Email Change (2026-03-14)
- nymeria.lunes@gmail.com was suspended/closed
- New primary email: diego.malamute.1@gmail.com
- Updated in SOUL.md, IDENTITY.md

## Discord Bot App (2026-03-16)
- Creating Discord bot "Nymeria" via Developer Portal
- STATUS: Blocked on hCaptcha — waiting for Guy to solve manually
- Chrome Nymeria profile has the dialog open and ready
- Next steps: get bot token → configure channels.discord in OpenClaw → invite bot to servers
- Purpose: be able to send messages in Discord (e.g., OpenClaw community, ClawHub unflag request)

## Discord Account (2026-03-14)
- Registered on Discord: username nymeria.lunes, display name Nymeria 🐺
- Email: diego.malamute.1@gmail.com
- Credentials saved in .secrets/discord.md
- Browser profile "nymeria" configured in OpenClaw (CDP port 9222, attachOnly)
- Chrome Nymeria profile = Default profile in ~/Library/Application Support/Google/Chrome/

## Monday.com Nova Ops Account (2026-03-25)
- Joined nova-ops.monday.com via invitation from Novalystrix
- Registered as: Nymeria Lunes (diego.malamute.1@gmail.com)
- Account slug: nova-ops
- Account ID: 33915329
- User ID: 101439900
- Region: euc1
- API token stored in: .secrets/monday-nova-ops.md
- Boards visible: Nova Purchases, NovaLystrix Accountability, Nova Social, Marketing Initiatives, YouTube Shorts Project, Nova Purchases & Invoices, plus docs (Press Release, Q&A, Social Media Architecture)

## Monday.com Agent Account (2026-03-10)
- Signed up via production agent flow: https://auth.monday.com/users/sign_up_new?custom_flow=agent_bot
- Account: Nymeria (originally nymeria.lunes@gmail.com — may need to update to diego.malamute.1@gmail.com)
- Account slug: my583304
- User ID: 100848245
- Account ID: 34165507
- Board created: "Nymeria Wolf Den" (ID: 5092981710)
- Invited chensar@monday.com to the account

---

## Guy's Family
- **Peleg (פלג)** — oldest son, phone: +972539506727
- **Gefen (גפן)** — middle son, age 7, phone: +972559304491, email: gefen.regev@gmail.com, has a small Android device (looks like an iPhone), 019 prepaid SIM
- **Yam (ים)** — youngest son, ~1.5 years old (born ~Oct 2024)
- **Liron / "Pinka"** — wife, phone: +972506940292

---

## Guy's Name in Hebrew
- In Hebrew: גיא (not גאי)
- Always use גיא when writing his name in Hebrew

---

## Key People

### Eran Huberman ("Hubi" / הובי)
- Phone: +972549222625
- Nickname: Hubi (הובי) — always refer to him as Hubi
- Context: Agent signup project, growth team

---

## Trusted Contacts

### Etay Liberman
- Role: Growth Tech Lead
- Phone: +972548056889
- Permission: Allowed to DM Nymeria directly
- Context: Professional / Growth domain

### Oran
- Role: Head of AI Rev
- Phone: +972522516699
- Permission: Allowed to DM Nymeria directly
- Context: AI / Revenue domain

---

## WhatsApp Groups

### Nova & Nymeria
- Channel ID: 120363424521648882@g.us
- Purpose: Strategic execution & collaboration with Nova
- Persistence: Link operational decisions and long-term coordination notes from this group into memory when relevant

### WorkDraft.ai
- Added: 2026-03-15 by Guy
- Purpose: WorkDraft.ai project group
- My role: Lurk mode — only respond when mentioned or asked about something I work on

### Nadav & Nymeria
- Channel ID: 120363425451958421@g.us
- Added: 2026-03-19 by Guy
- Purpose: Collaboration with Nadav (monday.com developer, working on AgentTalent.ai)
- requireMention: false

### AI Blog / AIO Team
- Channel ID: 120363425841325840@g.us
- Added: 2026-06-23 by Guy
- Purpose: monday.com AI Blog team collaboration
- Context: Team working with Nymeria on monday Blogs content

### Monday Wiki (unconfirmed GID)
- Created: 2026-03-16 by Guy
- Possible GID: 120363406460749952@g.us (unconfirmed — need Guy to verify)
- Added with `requireMention: false`
- Also wrongly added 120363424717213797@g.us — may need cleanup

---

## WorkDraft.ai Project (2026-03-15)
- **What:** Managed marketplace for AI agent jobs. Companies post jobs, AI agents (OpenClaw only) apply. WorkDraft qualifies, matches, onboards, and monitors.
- **Who:** Roy Mann (CEO monday.com) initiative. Team: Adi (ops/legal), Nova/Novalystrix (tech/website), Lital (legal), monday PR/design. Also: Yoni Golan, Moni Houser mentioned.
- **Repos:** `novalystrix/workdraft-docs` (public docs), `novalystrix/workdraft` (website code, private — nymeria-ai needs access as of 2026-03-15)
- **Live site:** workdraft.ai (also workdraft-ai.onrender.com)
- **Key concepts:**
  - Two models: Managed (20% retainer) and Unmanaged (self-service)
  - Human accountability chain: every agent has a human owner (legally liable) + human manager on company side
  - 3-layer qualification: task execution, conversational reasoning, self-improvement
  - Live 1-hour trial before hiring
  - Secure gateway (credential vault, audit logs, kill switch)
  - AI concierge "Chloe" for intake
  - Demand-first strategy, PR-driven launch (no soft launch)
  - Dogfooding: WorkDraft hires its own agents first
  - OpenClaw agents only
- **Target launch:** ~March 23-27, 2026
- **Kickoff:** March 9, 2026 — Roy laid out full vision with Adi
- **Launch checklist:** Website (landing, post-a-job, agent directory, dashboard), dogfooding jobs, legal (contracts/ToS/privacy), PR, billing

---

## Sensei — Open Source Qualification Engine (2026-03-15)
- **What:** Open-source AI agent qualification engine. Test suites with professional benchmarks & KPIs.
- **Repo:** `mondaycom/sensei` (transferred from `nymeria-ai/sensei` on 2026-03-19)
- **URL:** https://github.com/mondaycom/sensei
- **npm scope:** `@mondaycom/sensei-engine`, `@mondaycom/sensei-sdk`, `@mondaycom/sensei-cli`
- **Domain:** TBD — Nova buying a sensei.* domain. Working name: "Sensei"
- **Three-layer eval:** Task execution (50%) → Reasoning (30%) → Self-improvement (20%)
- **Initial suites:** SDR, Customer Support, Content Writer, QA Engineer, Data Analyst, Developer
- **Tech:** TypeScript, npm workspaces, LLM-as-judge scoring, YAML suite definitions
- **Integration:** WorkDraft uses Sensei as a library dependency for agent qualification
- **Badge system:** Bronze (60-74), Silver (75-89), Gold (90-100)
- **Status:** Architecture & spec committed. Code review done (2026-03-16): 13 Major + 7 Minor fixes pushed. All 173 tests pass. Full docs rewrite done (README, ARCHITECTURE, flow-diagram, CONTRIBUTING, CHANGELOG).
- **GitHub classic PAT:** stored in .secrets/github-classic-pat.md (repo scope, no expiry)
- **nymeria-ai has push access** to novalystrix-org/workdraft (not admin)
- **Transfer to mondaycom:** Completed 2026-03-19. PR #1 by Yossi Saadi migrates npm scope + release workflow. Versions reset to 0.0.1.
- **Release workflow:** Manual workflow_dispatch (HATCHA-style), not changesets. Pick bump type + packages.
- **First npm publish:** 2026-03-19, all packages at 0.0.2 (provenance-signed via GitHub Actions OIDC)
- **Pending quality pass:** QP-1 through QP-4 (CLI↔Engine wiring fix is critical before meaningful use)
