# Work Experience (Timeline Section)

## Overview

A vertical timeline section showcasing professional work history. Each entry features a company header, job title, duration, location, key responsibilities, and technology tags. Ordered newest-first. Sits after the Engineering Log section on the main page.

Derived from the "Work Experience" feature in `specs/features.md`, adapted to the V2 design system established in `specs-v2/design-system.md`.

---

## What Changes from specs/

The original `specs/features.md` defines work experience as:
- Vertical timeline with dots and connecting lines
- Company logos
- Expandable cards for full description
- Scroll-triggered animations

The V2 version keeps the vertical timeline structure but applies the dark terminal aesthetic:
- No company logos (replaced by a Material Symbols icon or monogram)
- Cards use `bg-surface` / `border-border-dim` styling consistent with other V2 sections
- Section header follows the icon + mono uppercase pattern (same as Engineering Log, Core Competencies)
- Duration and location rendered as small mono metadata labels
- Technology tags use the same pill style as Engineering Log tech tags
- Timeline line and dots use accent color
- No expand/collapse — all content is visible inline

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  [work icon]  WORK EXPERIENCE                            │
├──────────────────────────────────────────────────────────┤
│                                                          │
│    ●─── ┌──────────────────────────────────────────┐     │
│    │    │  JOB TITLE                               │     │
│    │    │  Company Name                             │     │
│    │    │  Jan 2023 – Present  ·  Remote            │     │
│    │    │                                           │     │
│    │    │  • Responsibility one                     │     │
│    │    │  • Responsibility two                     │     │
│    │    │  • Responsibility three                   │     │
│    │    │                                           │     │
│    │    │  [Tag] [Tag] [Tag] [Tag]                  │     │
│    │    └──────────────────────────────────────────┘     │
│    │                                                     │
│    ●─── ┌──────────────────────────────────────────┐     │
│    │    │  (next position...)                       │     │
│    │    └──────────────────────────────────────────┘     │
│    │                                                     │
│    ●─── ┌──────────────────────────────────────────┐     │
│         │  (earliest position...)                   │     │
│         └──────────────────────────────────────────┘     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Elements

### 1. Section Header

Same pattern as other V2 sections: icon + uppercase mono title.

```svelte
<div class="flex items-center gap-2 mb-8">
  <span class="material-symbols-outlined text-accent">work</span>
  <h2 class="text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">Work Experience</h2>
</div>
```

### 2. Timeline Rail

A vertical line connecting all entries, with accent-colored dots at each node.

- **Line**: 2px wide, `bg-border-dim`, positioned to the left of the cards
- **Dots**: 12px circles, `bg-accent`, positioned at the top of each card
- The line terminates at the last dot (no trailing segment)

### 3. Experience Card

Each card is a bordered surface container.

```svelte
<article class="bg-surface border border-border-dim rounded p-8 hover:border-accent/50 transition-all">
  <h3 class="text-white font-mono font-bold text-lg uppercase tracking-tight mb-1">{title}</h3>
  <h4 class="text-accent font-mono text-sm mb-3">{company}</h4>

  <div class="flex flex-wrap items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">
    <span>{duration}</span>
    <span>·</span>
    <span>{location}</span>
  </div>

  <ul class="space-y-2 mb-6">
    {#each duties as duty}
      <li class="text-text-main text-sm font-sans leading-relaxed pl-4 border-l-2 border-border-dim">
        {duty}
      </li>
    {/each}
  </ul>

  <div class="flex flex-wrap gap-2">
    {#each technologies as tech}
      <span class="bg-primary border border-border-dim px-2 py-1 text-[10px] font-mono text-text-muted uppercase">{tech}</span>
    {/each}
  </div>
</article>
```

- **Job title**: mono, bold, white, uppercase
- **Company**: mono, accent-colored
- **Meta line**: tiny mono, muted, uppercase — duration and location separated by a dot
- **Duties**: sans-serif body text, left-bordered list items (not bullet points — uses a subtle border-left accent instead)
- **Tech tags**: same pill style as Engineering Log

---

## Data Structure

```typescript
interface WorkExperience {
  id: string;
  title: string;         // e.g. "Senior Software Engineer"
  company: string;       // e.g. "Acme Corp"
  duration: string;      // e.g. "Jan 2023 – Present"
  location: string;      // e.g. "Remote" or "Austin, TX"
  duties: string[];      // key responsibilities / achievements
  technologies: string[];
}
```

Data file: `src/lib/data/experience.ts`

Content should be populated with real work history. Expect 3–5 entries.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< md`) | Timeline rail hidden; cards stacked vertically with top accent border instead of side dots |
| Desktop (`md+`) | Full timeline rail on the left, cards offset to the right |

On mobile, each card gets a `border-t-2 border-accent` top border to maintain the visual rhythm without the timeline rail.

---

## Styling Details

### Timeline Rail (Desktop)

```css
/* Pseudo-implementation — actual approach uses Tailwind utilities */
.timeline-rail {
  position: relative;
  padding-left: 2rem;      /* space for rail + dot */
}

.timeline-rail::before {
  content: '';
  position: absolute;
  left: 5px;               /* center of dot */
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border-dim);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  position: absolute;
  left: 0;
  top: 2rem;               /* align with card top */
}
```

### Card Hover

- Border transitions from `border-dim` to `accent/50`
- Subtle only — no scale or shadow changes

---

## Interaction

- **Hover**: card border subtly highlights
- **No expand/collapse** — all content is visible
- **Optional future enhancement**: link company name to company website; add a "Download Resume" button at the bottom of the section

---

## Accessibility

- Section uses a proper `<h2>` heading
- Each position is an `<article>` with an `<h3>` for the title
- Timeline dots are decorative (`aria-hidden="true"`)
- Duties list uses semantic `<ul>` / `<li>` elements
- Meets WCAG AA contrast on dark backgrounds
- Respects `prefers-reduced-motion` — disables hover transitions

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Work experience markup (or extracted component) |
| `src/lib/components/sections/WorkExperience.svelte` | Optional extracted component |
| `src/lib/data/experience.ts` | Work history data |
