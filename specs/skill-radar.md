# Skill Radar Chart

## Overview

The single unified skills section for the portfolio. Combines three previously separate components into one cohesive section:

1. **Focus Areas** (merged from CoreCompetencies) — 3-card row highlighting Cloud Infrastructure, AI, and Database Admin as primary specializations
2. **Technology Chips** (merged from SkillsMarquee) — static flex-wrap grid of 20 skill chips with SVG brand-color icons
3. **Radar Chart** — interactive SVG radar/spider chart with 6 category axes and proficiency visualization
4. **Category Breakdown** — sidebar list with proficiency bars and skill tags, cross-highlighted with the chart on hover

This consolidation addresses the "skills shown 3 ways" redundancy identified in the component audit (AUDIT-REPORT.md).

## Location

Standalone `<section id="skill-radar">` positioned after the Hero section. Contains all skill-related content in one place.

## Visual Design

### Focus Areas (merged from CoreCompetencies)

- 3-card horizontal row (`grid-cols-1 md:grid-cols-3`) positioned between the section header and technology chips
- Each card: compact horizontal layout (`flex items-start gap-3`) with icon box (40x40px) + title + description
- Cards use `bg-surface p-4 rounded border border-border-dim` with hover effects (`hover:border-accent/50 hover:bg-surface-highlight`)
- Icons: Material Symbols (`cloud_queue`, `psychology`, `database`) in `text-text-muted`, accent on hover
- Data: inline `focusAreas` array in the component

### Technology Chips (merged from SkillsMarquee)

- Static `flex-wrap justify-center` grid of 20 skill chips, positioned between focus areas and radar chart
- Each chip: `bg-surface border border-border-dim rounded` with `font-mono text-xs md:text-sm uppercase tracking-wider`
- SVG brand-color icons (14px mobile / 16px desktop) from `src/lib/data/skill-icons.ts` — monochrome `text-muted` by default, transitions to brand color on hover via `--brand-color` CSS custom property
- Fallback for skills without icon: small accent dot
- Hover: `hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5`
- No animation — static grid, inherently accessible

### Chart

- **Type**: Radar / spider chart rendered on an HTML `<canvas>` or inline SVG.
- **Axes**: 5–7 category axes radiating from center (e.g., Frontend, Backend, DevOps, Databases, AI/ML, Cloud, Tools).
- **Fill**: Semi-transparent accent fill (`accent / 20%`) with a solid accent stroke for the data polygon.
- **Grid rings**: 3–4 concentric rings in `border-dim` color to indicate proficiency scale (e.g., Familiar → Proficient → Expert).
- **Axis labels**: `font-mono text-[11px] text-text-muted uppercase tracking-widest`, positioned just outside the outermost ring.
- **Dots**: Small accent-colored dots at each data vertex.

### Container

- `bg-surface border border-border-dim rounded-lg p-8`
- Max width ~500px, centered or placed in a two-column layout beside a skills breakdown list.
- Responsive: on mobile (< 640px), chart scales down and sits full-width above the breakdown list.

### Hover / Interaction

- Hovering a vertex dot or axis label highlights that category — the polygon segment brightens and a tooltip shows the skill list for that category.
- Tooltip styled as a small surface card: `bg-surface-highlight border border-border-dim rounded p-3 shadow-lg`.
- Animation: polygon draws in from center on scroll-reveal (respects animation toggle / `prefers-reduced-motion`).

## Data Structure

```typescript
interface SkillCategory {
  label: string;           // e.g., "Frontend"
  proficiency: number;     // 0–100 scale
  skills: string[];        // e.g., ["Svelte", "React", "HTML/CSS"]
}
```

Data lives in `src/lib/data/skills.ts`. Technology chip icons live in `src/lib/data/skill-icons.ts`. Focus area data is inline in the component.

## Implementation Notes

### Rendering approach

Prefer a lightweight SVG-based implementation built directly in Svelte (no charting library dependency). The radar shape is a simple polygon calculated from polar coordinates — this keeps the bundle small and avoids pulling in Chart.js or D3 for a single chart.

### Svelte component

- `src/lib/components/sections/SkillRadar.svelte`
- Accepts `categories: SkillCategory[]` as a prop.
- Uses `use:scrollReveal` for entrance animation (from scroll-animations spec).
- Reads the animation-toggle store to skip draw-in animation when disabled.

### Accessibility

- Provide a visually hidden `<table>` or `<dl>` with the same data so screen readers get a text-based skill breakdown.
- Chart itself is decorative — mark with `aria-hidden="true"` on the SVG/canvas, with a sibling sr-only summary.
- Tooltip content is also available in the hidden table.

### Responsiveness

| Breakpoint | Behavior |
|---|---|
| `>= 1024px` | Two-column: chart left, category breakdown list right |
| `640px – 1023px` | Chart centered above breakdown list, single column |
| `< 640px` | Chart scales to container width, breakdown list stacked below |

## Acceptance Criteria

- [x] Radar chart renders with 5–7 axes matching defined skill categories.
- [x] Data polygon accurately reflects proficiency values.
- [x] Hover on vertex/label shows tooltip with skill list for that category.
- [x] Draw-in animation plays on scroll, respects reduced-motion.
- [x] Screen-reader-accessible fallback table present.
- [x] Matches Threadwork design system colors, fonts, and spacing.
- [x] No external charting library — pure Svelte + SVG.
- [x] Responsive across all breakpoints.
- [x] Focus areas (from CoreCompetencies) merged as compact 3-card row.
- [x] Technology chips (from SkillsMarquee) merged as static flex-wrap grid with SVG brand-color icons.
- [x] Single unified skills section — no redundant skill displays elsewhere on the page.
