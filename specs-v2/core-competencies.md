# Core Competencies

## Overview

A 3-column grid section that highlights primary areas of expertise. Each card features a Material Symbols icon, a bold title, and a short description. Sits between the Hero section and the Engineering Log, acting as a quick visual summary of what the developer specializes in.

Derived from the "Core Competencies" section in `stitch.html`, adapted to the Threadwork design system.

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  [hub icon]  CORE COMPETENCIES                           │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│  │  ┌────┐        │ │  ┌────┐        │ │  ┌────┐        ││
│  │  │icon│        │ │  │icon│        │ │  │icon│        ││
│  │  └────┘        │ │  └────┘        │ │  └────┘        ││
│  │                │ │                │ │                ││
│  │  Title         │ │  Title         │ │  Title         ││
│  │                │ │                │ │                ││
│  │  Description   │ │  Description   │ │  Description   ││
│  │  text...       │ │  text...       │ │  text...       ││
│  └────────────────┘ └────────────────┘ └────────────────┘│
│                                                          │
└──────────────────────────────────────────────────────────┘
```

On mobile (`< md`), the cards stack into a single column.

---

## Elements

### 1. Section Header

An icon + title line consistent with other section headers (same pattern as Engineering Log).

```svelte
<div class="flex items-center gap-2 mb-8">
  <span class="material-symbols-outlined text-accent">hub</span>
  <h2 class="text-fg text-xl font-mono font-bold uppercase tracking-[0.2em]">Core Competencies</h2>
</div>
```

- Uses a Material Symbols icon (`hub`) in accent color.
- Title is monospaced, uppercase, wide tracking — matches the terminal aesthetic.
- The icon and text can be customized (e.g., different icon, different label).

### 2. Competency Cards

Each card is a padded, bordered container with an icon box, a title, and a description.

```svelte
<div class="group bg-bg-muted hover:bg-bg-subtle p-8 rounded border border-border-muted transition-all duration-300 hover:border-accent">
  <div class="bg-bg/50 w-14 h-14 rounded flex items-center justify-center mb-6 border border-border-muted group-hover:border-accent/50">
    <span class="material-symbols-outlined text-fg group-hover:text-accent text-3xl">{icon}</span>
  </div>
  <h3 class="text-fg font-mono font-bold mb-3 text-lg">{title}</h3>
  <p class="text-sm text-fg-muted font-mono leading-relaxed">{description}</p>
</div>
```

- **Icon box**: 56x56px square, darker background, bordered. Icon transitions to accent color on card hover.
- **Title**: Monospaced, bold, foreground color.
- **Description**: Small mono text, muted color, relaxed line-height.
- **Hover**: entire card border transitions to accent, background slightly elevates, icon turns accent-colored.

---

## Data Structure

```typescript
interface Competency {
  id: string;
  icon: string;       // Material Symbols icon name
  title: string;
  description: string;
}
```

Content is static — defined inline or in a small data array. Three items are expected:

```typescript
const competencies: Competency[] = [
  {
    id: 'cloud',
    icon: 'cloud_queue',
    title: 'Cloud Infrastructure',
    description: 'Designing resilient architectures on AWS/GCP using Kubernetes, Terraform, and high-performance container orchestration.'
  },
  {
    id: 'ai',
    icon: 'psychology',
    title: 'Artificial Intelligence',
    description: 'MLOps integration and RAG architecture implementation. Deploying production-ready LLM pipelines and inference engines.'
  },
  {
    id: 'db',
    icon: 'database',
    title: 'Database Admin',
    description: 'Advanced optimization for PostgreSQL and NoSQL environments. Expertise in data sharding, replication, and high-concurrency tuning.'
  }
];
```

The titles, icons, and descriptions should be customized with real data.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< md`) | Single column, cards stacked vertically |
| Desktop (`md+`) | Three-column grid (`grid-cols-3`) |

---

## Design System Mapping

| stitch.html | Threadwork |
|---|---|
| `bg-surface` (`#1E1E1E`) | `bg-bg-muted` (`#1A1816`) |
| `bg-surface-highlight` (`#252525`) | `bg-bg-subtle` (`#2D2926`) |
| `border-border-dim` (`#333`) | `border-border-muted` (`#2D2926`) |
| `text-white` | `text-fg` (`#F7F4F0`) |
| `text-text-muted` | `text-fg-muted` (`#9C9590`) |
| `text-accent` (`#B80C09`) | `text-accent` (`#7B9BC7`) |
| `bg-primary/50` | `bg-bg/50` |
| Inter / Fira Code | CommitMono throughout |

---

## Interaction

- **Hover**: Card border transitions to accent, background shifts slightly lighter, icon color changes to accent.
- **No click-through** — the cards are informational only.
- **Optional future enhancement**: cards could link to filtered views of the Engineering Log by category.

---

## Accessibility

- Section uses a proper `<h2>` heading.
- Each card title is an `<h3>`.
- Icons are decorative (the text labels provide the meaning), so they can use `aria-hidden="true"`.
- All text meets WCAG AA contrast on dark backgrounds.
- Hover effects are decorative — no information is hidden behind hover state.
- Respects `prefers-reduced-motion` — disables hover transitions.

---

## Tech Stack

- **SvelteKit 2** component (inline in `+page.svelte` or extracted)
- **Tailwind v4** utility classes
- **Material Symbols** for icons (loaded via Google Fonts or self-hosted)
- Static data — no API calls needed

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Core competencies markup (or extracted component) |
| `src/lib/components/sections/CoreCompetencies.svelte` | Optional extracted component |
