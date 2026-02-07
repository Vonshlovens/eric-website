# Skill Radar Chart

## Overview

An interactive radar (spider) chart that visualizes technical skill proficiency across key categories. Complements the skills marquee by giving visitors a quick, at-a-glance understanding of strengths and depth rather than just a flat list of technologies.

Referenced from: `specs/features.md` — Phase 2 → "Interactive skill visualization".

## Location

Appears as a subsection below the Skills Marquee, or as a tab/toggle alongside it. Wrapped in its own `<section id="skill-radar">` with a Threadwork-style section header.

## Visual Design

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

Data lives in `src/lib/data/skills.ts` alongside or extending the existing skills data used by the marquee.

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

- [ ] Radar chart renders with 5–7 axes matching defined skill categories.
- [ ] Data polygon accurately reflects proficiency values.
- [ ] Hover on vertex/label shows tooltip with skill list for that category.
- [ ] Draw-in animation plays on scroll, respects reduced-motion.
- [ ] Screen-reader-accessible fallback table present.
- [ ] Matches Threadwork design system colors, fonts, and spacing.
- [ ] No external charting library — pure Svelte + SVG.
- [ ] Responsive across all breakpoints.
