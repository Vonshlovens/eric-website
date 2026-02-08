# Portfolio Website Audit & Improvement Plan

## Overview

A three-phase plan to install Playwright tooling, audit the portfolio website for visual/animation/layout issues, and evaluate whether each component earns its place on the page.

---

## Phase 1: Install Playwright Tooling ✅

### 1A — Install `@playwright/cli` (AI-Agent CLI)

The new `@playwright/cli` package (v0.1.0+) is purpose-built for AI coding agents like Claude Code. It is **not** the deprecated legacy `playwright-cli` — it's a new, token-efficient CLI that returns compact element references instead of full DOM trees.

```bash
# Install globally
npm install -g @playwright/cli@latest

# Install its browser (Chromium)
playwright-cli install-browser
```

Key commands we'll use:
| Command | Purpose |
|---------|---------|
| `playwright-cli open <url>` | Launch the dev server in a browser |
| `playwright-cli screenshot` | Capture full-page or element screenshots |
| `playwright-cli snapshot` | Get compact element references for inspection |
| `playwright-cli click` / `type` | Interact with elements for testing |

### 1B — Install `@playwright/mcp` (MCP Server)

For deeper, persistent-state browser automation within Claude Code sessions:

```bash
claude mcp add playwright -- npx @playwright/mcp@latest
```

This gives Claude Code direct access to Playwright tools via MCP — navigation, screenshots, accessibility tree snapshots, JS execution — without leaving the conversation.

### 1C — Install `@playwright/test` (Visual Regression & Accessibility)

For repeatable screenshot comparisons and axe-core accessibility scans:

```bash
# Add as dev dependency (using deno-compatible npm specifier)
deno install --dev npm:@playwright/test
deno install --dev npm:@axe-core/playwright

# Install browsers + OS deps
deno run -A npm:playwright install --with-deps
```

### 1D — Create `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './tests/visual/results',
  snapshotDir: './tests/visual/snapshots',
  use: {
    baseURL: 'http://localhost:5173',
  },
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  projects: [
    { name: 'desktop-1080p', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'desktop-720p', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'tablet', use: { ...devices['iPad Pro 11'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

---

## Phase 2: Visual Audit & Fixes with Playwright + `/frontend-design`

Use Playwright to **capture the current state**, identify problems, then use the `/frontend-design` skill to redesign broken or subpar components.

### 2A — Baseline Screenshot Capture ✅

Capture full-page screenshots at all 4 viewport sizes (desktop 1080p, 720p, tablet, mobile) with animations both enabled and disabled. This gives us a "before" baseline.

**Completed**: Created `tests/visual/baseline.spec.ts` with 12 test cases × 4 viewports = 48 baseline screenshots. All pass. Snapshots saved to `tests/visual/snapshots/`.

### 2B — Known Issues to Investigate & Fix

These are the categories of problems to audit, roughly ordered by user impact:

#### Scroll Choppiness / Jank

| Suspect | Why | Investigation |
|---------|-----|---------------|
| **EngineeringLog card-stack** | Scroll-linked `translateY` on every scroll event; `scrollY` binding fires continuously | Profile with Playwright + DevTools. Check if `will-change: transform` is actually promoting to compositor layer. Verify no forced reflows in the scroll handler. |
| **Hero mask animation** | `mask-image` updated on every `mousemove` without throttle/debounce | `will-change: mask-image` is set, but mask repaints are expensive. May need `requestAnimationFrame` gating. |
| **SkillsMarquee** | 4x DOM duplication per row (8 total clones) running continuous `translateX` animation | Check if marquee causes layout recalculation. Verify `will-change: transform` is composited. |
| **Multiple IntersectionObservers** | Navigation + scrollReveal + SkillRadar MutationObserver all running concurrently | Verify observer callbacks aren't triggering layout reads. Profile observer overhead. |
| **Smooth scroll CSS** | `scroll-behavior: smooth` on `<html>` can conflict with JS scroll handlers | Test scrolling feel with and without. May need to scope smooth-scroll more narrowly. |

**Fix approach**: Use Playwright to scroll programmatically while recording Chrome DevTools Performance traces. Identify long tasks, forced reflows, and non-composited animations. Apply fixes, then re-screenshot to verify visual parity.

#### Broken / Janky Animations

| Animation | Potential Issue | Fix Strategy |
|-----------|----------------|--------------|
| **Scroll-reveal fade-up** | May fire too late or too early depending on scroll speed | Tune IntersectionObserver threshold (currently 0.15) and rootMargin (`0px 0px -50px 0px`). Test at multiple scroll speeds. |
| **Card-stack progress** | Cards may "jump" if `sectionTop` calculation is stale after layout shift | Verify `sectionTop` recalculates on content load, not just resize. Add ResizeObserver if needed. |
| **SkillRadar polygon draw-in** | SVG `points` transition may not animate in all browsers (Safari) | Test cross-browser. May need SMIL fallback or JS-driven point interpolation. |
| **View Transitions cross-fade** | Page transitions may flash or show unstyled content | Verify `startViewTransition` promise handling. Test with slow network throttling. |
| **Loading screen → content** | Transition from boot screen to main content may cause visible layout shift | Measure CLS during transition. May need to reserve space or use `content-visibility`. |

#### Non-Centered / Misaligned Elements

| Area | What to Check |
|------|---------------|
| **Hero section** | 3-col grid alignment on lg vs xl breakpoints. Avatar + text centering on mobile. |
| **SkillRadar SVG** | Radar chart centering within its container. Tooltip drift on resize. |
| **Card-stack progress dots** | Absolute positioning may drift on non-standard viewports. |
| **Footer** | Flex alignment on narrow tablet widths (768-1024px). |
| **Navigation** | Brand + status alignment. Mobile menu slide-down origin. |

**Fix approach**: Screenshot each section at all 4 breakpoints. Overlay grid lines to check alignment. Use `/frontend-design` to redesign any structurally broken layouts.

### 2C — Performance Audit

Run Playwright-based Lighthouse or Web Vitals capture:

| Metric | Target | How to Measure |
|--------|--------|----------------|
| LCP | < 2.5s | Playwright `page.evaluate()` with PerformanceObserver |
| CLS | < 0.1 | Playwright CLS measurement during scroll |
| FCP | < 1.5s | Playwright performance timing API |
| TBT | < 200ms | DevTools trace via Playwright |

### 2D — `/frontend-design` Redesign Workflow

For each component that Playwright audit reveals as broken or subpar:

1. **Screenshot** the current state at all breakpoints
2. **Document** the specific issues (misalignment, jank, visual bugs)
3. **Invoke `/frontend-design`** with:
   - The current component code
   - Screenshots showing the problems
   - The design system tokens (colors, fonts, spacing from `app.css` and specs)
   - Specific constraints (must use Svelte 5, Tailwind v4, existing data structures)
4. **Get redesigned component** code
5. **Re-screenshot** to verify the fix
6. **Visual regression test** to ensure no other sections broke

### 2E — Cross-Browser Testing Matrix

| Browser | Viewport | Key Concerns |
|---------|----------|--------------|
| Chromium | All 4 sizes | Baseline reference |
| Firefox | Desktop + Mobile | SVG animation, View Transitions (not supported) |
| WebKit/Safari | Desktop + Mobile | `mask-image` animation, SVG `points` transition |

---

## Phase 3: Component Audit Agent

### Purpose

Create a specialized agent that evaluates each portfolio section **as a web component** — not the text content, but whether the component itself is professional, meaningful, necessary, or clutter. The agent answers: "Does this component earn its place on the page?"

### Agent Definition

Create a reusable agent prompt (can be saved as a Claude Code slash command or invoked via Task tool) with these evaluation criteria:

### 3A — Evaluation Framework

Each component is scored on 5 axes (1-5 scale):

| Axis | Question |
|------|----------|
| **Purpose** | Does this component serve a clear, distinct function that no other section already covers? |
| **Signal-to-Noise** | Does it communicate something meaningful to a hiring manager / collaborator in under 5 seconds? |
| **Professionalism** | Does the interaction pattern (animation, hover, layout) feel polished and intentional, or gimmicky? |
| **Density** | Is the information density appropriate — not too sparse (wasteful), not too dense (overwhelming)? |
| **Earned Complexity** | If the component is complex (animations, interactivity), does the complexity serve the user or just show off? |

### 3B — Components to Audit

| # | Component | File | What it Does |
|---|-----------|------|--------------|
| 1 | **LoadingScreen** | `ui/LoadingScreen.svelte` | Terminal boot sequence on first visit |
| 2 | **Hero** | `sections/Hero.svelte` | Avatar with mask reveal, name/title, GitHub stats terminal, CTA buttons |
| 3 | **CoreCompetencies** | `sections/CoreCompetencies.svelte` | 3-card grid: Cloud, AI, Database with icons |
| 4 | **SkillsMarquee** | `SkillsMarquee.svelte` | Dual-row infinite scroll of skill chips |
| 5 | **SkillRadar** | `sections/SkillRadar.svelte` | SVG radar chart + category breakdown bars |
| 6 | **EngineeringLog** | `sections/EngineeringLog.svelte` | Card-stack scroll animation showing 6 projects |
| 7 | **WorkExperience** | `sections/WorkExperience.svelte` | Timeline of 4 jobs with duties and tech stacks |
| 8 | **Education** | `sections/Education.svelte` | 2-col grid: 1 degree + 2 certifications |
| 9 | **Interests** | `sections/Interests.svelte` | 3-col "Beyond Code" cards: OSS, Running, Photography, Coffee |
| 10 | **ContactCTA** | `sections/ContactCTA.svelte` | CTA with "Initialize Protocol?" and Connect.exe button |
| 11 | **ContactForm** | `ContactForm.svelte` | Modal dialog with name/email/message form |
| 12 | **Navigation** | `layout/Navigation.svelte` | Sticky header with nav links, theme/motion toggles |
| 13 | **Footer** | `layout/Footer.svelte` | Branding, copyright, latency indicator |
| 14 | **BackToTop** | `ui/BackToTop.svelte` | Floating scroll-to-top button |
| 15 | **KeyboardShortcuts** | `ui/KeyboardShortcuts.svelte` | `?` key modal with shortcut list |

### 3C — Agent Prompt Template

```
You are a senior UX auditor reviewing a portfolio website's components.
For each component, you have access to:
- The source code
- Screenshots at 4 viewport sizes (desktop 1080p, 720p, tablet, mobile)
- The design system spec

Evaluate each component on these 5 axes (score 1-5):
1. PURPOSE: Does it serve a clear, unique function?
2. SIGNAL: Can a visitor extract its value in <5 seconds?
3. POLISH: Do its interactions feel intentional and professional?
4. DENSITY: Is information density appropriate?
5. EARNED COMPLEXITY: Does its complexity serve the user?

For each component, provide:
- Scores (5 axes)
- Overall verdict: KEEP / SIMPLIFY / MERGE / REMOVE
- If SIMPLIFY: what to strip away
- If MERGE: which component to merge into
- If REMOVE: what (if anything) replaces it
- Red flags: anything that feels "junior dev portfolio" or gimmicky
- Specific suggestions for improvement

Pay special attention to:
- Components that exist mainly to show off technical skill rather than communicate value
- Redundancy between sections (e.g., skills shown in 3 different ways)
- Animation/interaction that adds cognitive load without adding information
- Components that would make a hiring manager's eyes glaze over
- Mobile experience — does the component degrade gracefully or become pointless?
```

### 3D — Suspected Redundancies to Investigate

These overlap patterns should be examined closely:

| Overlap | Components | Question |
|---------|------------|----------|
| **Skills shown 3 ways** | CoreCompetencies + SkillsMarquee + SkillRadar | Do we need all three? Each shows skills differently but a visitor may not care about the distinction. |
| **Terminal aesthetic overuse** | LoadingScreen + Hero stats panel + ContactCTA + Footer latency | The "hacker terminal" theme is the brand identity, but is it applied too heavily? |
| **Project display** | EngineeringLog (card-stack) | 6 projects with card-stack animation — is the animation adding value or just adding scroll distance? |
| **Meta-components** | KeyboardShortcuts + BackToTop + LoadingScreen | Utility/polish components — are they expected of a portfolio or are they resume padding? |

### 3E — Output Format

The agent produces a structured report:

```
## Component Audit Report

### [Component Name]
| Axis | Score | Notes |
|------|-------|-------|
| Purpose | 4/5 | ... |
| Signal | 3/5 | ... |
| Polish | 5/5 | ... |
| Density | 2/5 | ... |
| Earned Complexity | 3/5 | ... |

**Verdict**: SIMPLIFY
**Reasoning**: ...
**Suggestions**: ...

---
(repeat for all 15 components)

## Summary
- Components to KEEP as-is: ...
- Components to SIMPLIFY: ...
- Components to MERGE: ...
- Components to REMOVE: ...
- Overall page assessment: ...
```

---

## Execution Order

```
Phase 1 (Setup)          → ~30 min
  1A: Install @playwright/cli
  1B: Add @playwright/mcp to Claude Code
  1C: Install @playwright/test + axe-core
  1D: Create playwright.config.ts

Phase 2 (Audit & Fix)    → iterative
  2A: Baseline screenshots at all viewports
  2B: Investigate scroll jank, broken animations, alignment
  2C: Performance metrics capture
  2D: /frontend-design redesign loop per broken component
  2E: Cross-browser verification

Phase 3 (Component Audit) → single agent run
  3A-3E: Run component audit agent with screenshots + code
  Produce structured report with KEEP/SIMPLIFY/MERGE/REMOVE verdicts
```

---

## Files This Plan Will Create or Modify

| File | Action | Purpose |
|------|--------|---------|
| `playwright.config.ts` | Create | Playwright configuration |
| `tests/visual/` | Create dir | Visual regression test files |
| `tests/visual/snapshots/` | Create dir | Baseline screenshots |
| `.claude/mcp.json` | Modify | Add Playwright MCP server |
| Various `src/lib/components/` | Modify | Fix animations, alignment, jank |
| `AUDIT-REPORT.md` | Create | Component audit results |
