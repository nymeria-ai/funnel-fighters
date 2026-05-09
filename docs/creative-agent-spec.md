# Creative Agent Spec — Ad & Landing Page Generator

## Role in the 11-Agent Architecture
**Domain cluster:** Content & Creative
**Reports to:** Content Supervisor
**Triggers:** When an ad campaign needs a new or modified landing page, or when ad creative needs to be generated/updated.

---

## Core Capability
Generate on-brand ads and landing pages that follow monday.com's design system, using Google's `DESIGN.md` spec as the bridge between design tokens and code generation.

## How DESIGN.md Fits

[DESIGN.md](https://github.com/google-labs-code/design.md) is an open-source format from Google Labs that gives AI coding agents a persistent, structured understanding of a design system:

- **YAML front matter** — Machine-readable design tokens (colors, typography, spacing, border-radius, components)
- **Markdown body** — Human-readable rationale (why values exist, how to apply them)
- **CLI tooling** — Lint for WCAG accessibility compliance, diff for regression detection, export to Tailwind/CSS

### Why This Is the Right Choice
1. **Standardized** — W3C Design Token Format (DTCG) compatible
2. **Agent-native** — Built specifically for coding agents to consume
3. **Lintable** — `npx @google/design.md lint` catches broken tokens + WCAG contrast issues before code ships
4. **Exportable** — `npx @google/design.md export --format css-tailwind` → ready for Tailwind v4
5. **Diffable** — Version control your design system, detect regressions between updates

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Creative Agent                      │
│                                                      │
│  Inputs:                                             │
│  ├── DESIGN.md (monday.com design system)            │
│  ├── Campaign brief (from Ads Supervisor)            │
│  ├── Audience segment data (from Data Agent)         │
│  ├── Keyword/messaging context (from Content Agent)  │
│  └── Performance data (from Analytics Agent)         │
│                                                      │
│  Outputs:                                            │
│  ├── Landing page HTML/React (Tailwind-styled)       │
│  ├── Ad copy variants (headlines, descriptions)      │
│  ├── Visual asset specs (hero images, CTAs)          │
│  └── A/B test variants with rationale                │
└─────────────────────────────────────────────────────┘
```

## Workflow

### 1. Design System Initialization
```bash
# One-time: Create monday.com DESIGN.md from existing design system
# Export from Figma/design tokens → DESIGN.md format
# Validate:
npx @google/design.md lint DESIGN.md
# Export Tailwind theme:
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css
```

### 2. Landing Page Generation Flow
```
Campaign Brief arrives
    ↓
Creative Agent reads DESIGN.md tokens
    ↓
Pulls audience segment + keyword context
    ↓
Generates landing page (React + Tailwind)
    ↓
Lint check (WCAG contrast, token compliance)
    ↓
Deploy to preview URL
    ↓
Notify Ads Agent → wire to campaign
    ↓
Monitor performance → iterate
```

### 3. Ad Creative Generation Flow
```
Performance data signals underperforming ad
    ↓
Creative Agent pulls winning patterns
    ↓
Generates variants (headlines, descriptions, CTAs)
    ↓
Validates against DESIGN.md brand voice
    ↓
Pushes to Ads Agent for deployment
    ↓
Tracks performance delta
```

---

## DESIGN.md for monday.com (Template)

This needs to be built from monday.com's actual design system. Starting structure:

```yaml
---
name: monday.com Marketing
description: Design system for monday.com marketing landing pages and ad creatives
colors:
  primary: "#6161FF"          # monday.com purple
  primary-dark: "#4B4BF5"
  secondary: "#00CA72"        # monday.com green
  accent: "#FDAB3D"           # monday.com orange
  error: "#E2445C"            # monday.com red
  neutral-100: "#FFFFFF"
  neutral-200: "#F5F6F8"
  neutral-300: "#E6E9EF"
  neutral-700: "#676879"
  neutral-900: "#323338"
  on-primary: "#FFFFFF"
  on-secondary: "#FFFFFF"
typography:
  h1:
    fontFamily: Poppins
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.2
  h2:
    fontFamily: Poppins
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Figtree
    fontSize: 1.125rem
    lineHeight: 1.6
  body-md:
    fontFamily: Figtree
    fontSize: 1rem
    lineHeight: 1.5
  cta:
    fontFamily: Poppins
    fontSize: 1rem
    fontWeight: 600
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  pill: 40px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section: 80px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
    typography: "{typography.cta}"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  hero-section:
    backgroundColor: "{colors.neutral-100}"
    padding: "{spacing.section}"
  cta-banner:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
---

## Overview

monday.com marketing pages are bold, clean, and action-oriented. 
The design language emphasizes clarity, with generous whitespace, 
strong CTAs, and a vibrant color palette that conveys energy and productivity.

## Colors

- **Primary (#6161FF):** The signature monday.com purple. Used for CTAs, 
  key interactive elements, and brand moments.
- **Secondary (#00CA72):** Success green. Used for positive signals, 
  checkmarks, and secondary actions.
- **Accent (#FDAB3D):** Attention orange. Used sparingly for highlights 
  and urgency signals.
- **Neutrals:** Clean grayscale from white to charcoal. Body text in 
  neutral-900, metadata in neutral-700.

## Typography

Headlines in Poppins (bold, modern). Body in Figtree (clean, readable).
CTAs are Poppins semi-bold for visual weight.

## Components

### Buttons
Primary buttons are pill-shaped with the signature purple. 
They must be visually dominant — the single most noticeable element 
in any CTA section. Never more than 2 CTAs visible simultaneously.

### Hero Sections
Full-width, generous padding. One clear headline, one supporting line, 
one CTA. No clutter.

## Do's and Don'ts

### Do
- Use generous whitespace between sections
- Keep CTAs above the fold
- Use social proof near conversion points
- Maintain brand purple as the dominant action color

### Don't
- Crowd the hero with multiple messages
- Use more than 3 colors in a single section
- Place CTAs below the fold without a scroll indicator
- Use stock photography that doesn't match the product context
```

---

## Integration Points

| Agent | Interaction |
|-------|------------|
| **Ads Agent** | Requests LP for new campaign → Creative generates + deploys |
| **Data Agent** | Provides audience segments, performance metrics for personalization |
| **Content Agent** | Supplies messaging, keywords, value props for LP copy |
| **Analytics Agent** | Feeds conversion data → Creative iterates on underperformers |
| **Orchestrator** | Routes campaign creation flow through Creative when LP needed |

## Tech Stack

- **Design tokens:** DESIGN.md (Google Labs spec)
- **UI framework:** React + Tailwind CSS (exported from DESIGN.md)
- **Deployment:** Vercel (instant preview URLs for review)
- **Accessibility:** DESIGN.md CLI linter (WCAG AA contrast checks)
- **Version control:** Git (design system changes tracked via `design.md diff`)

## MVP Scope

1. **DESIGN.md creation** — Extract monday.com's actual design tokens from Figma/brand guidelines
2. **Template library** — 3-5 LP templates (product feature, comparison, use case, free trial, webinar)
3. **Generation flow** — Brief → Generate → Lint → Deploy → Wire to campaign
4. **Performance loop** — Track conversions → flag underperformers → auto-generate variants

## Open Questions

- [ ] Where does monday.com's actual Figma design system live? Need token extraction.
- [ ] Hosting for generated LPs — Vercel? monday.com subdomain? Custom domain?
- [ ] Approval workflow — human review before deploy, or auto-deploy with monitoring?
- [ ] A/B testing infrastructure — built-in or external (Optimizely, VWO)?
