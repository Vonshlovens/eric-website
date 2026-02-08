# Engineering Log (Project Portfolio Redesign)

## Summary

Replace the current grid-based project portfolio with an **Engineering Log** — a vertically stacked list of horizontal project cards. Each card tells a story through structured sections: **The Problem**, **Key Learnings**, and **Tech Stack**. This mirrors a professional engineering journal rather than a gallery thumbnail view.

This feature is derived from the `stitch.html` target design (the "Engineering Log" section).

---

## What Changes from specs/

The original `specs/features.md` defines the project portfolio as:
- A responsive grid (1/2/3 columns)
- Cards with image, description, tags, GitHub stars/forks
- Hover overlays with demo/GitHub links
- Optional filtering and sorting

The v2 **Engineering Log** replaces this with:
- A single-column vertical stack of wide horizontal cards
- Each card has an image on the left (~1/3 width) and structured text on the right (~2/3 width)
- No hover overlay; content is always visible
- Structured narrative format per project (Problem → Learnings → Stack)
- Category badge per project (e.g. `INFRASTRUCTURE`, `AI/ML`, `DATABASE`)

---

## Visual Structure

```
┌──────────────────────────────────────────────────────┐
│  [hub icon] CORE COMPETENCIES  (section above)       │
└──────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│  [terminal icon] ENGINEERING LOG                     │
│  Active Projects: N    Systems Status: Optimal       │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌─────────┬────────────────────────────────────┐    │
│  │         │  PROJECT_NAME             [BADGE]  │    │
│  │  IMAGE  │                                    │    │
│  │  (1/3)  │  [The Problem]                     │    │
│  │         │  Description text...               │    │
│  │  grayscale                                   │    │
│  │  → color │  [Key Learnings]                  │    │
│  │  on hover│  Description text...              │    │
│  │         │                                    │    │
│  │         │  [Tech Stack]                      │    │
│  │         │  [Tag] [Tag] [Tag] [Tag]           │    │
│  └─────────┴────────────────────────────────────┘    │
│                                                      │
│  (repeat for each project)                           │
│                                                      │
└──────────────────────────────────────────────────────┘
```

On mobile (< `lg` breakpoint), the layout stacks vertically: image on top, content below.

---

## Data Structure

```typescript
interface EngineeringLogEntry {
  id: string;
  name: string;            // e.g. "cloud_orchestrator"
  category: string;        // e.g. "INFRASTRUCTURE", "AI/ML", "DATABASE"
  image: string;           // project screenshot or illustration
  problem: string;         // 1-2 sentence problem statement
  learnings: string;       // 1-2 sentence key takeaway
  techStack: string[];     // list of technologies used
}
```

This replaces the `Project` interface from `specs/features.md`. The `stars`, `forks`, and `featured` fields are dropped. The `description` field is replaced by the more structured `problem` + `learnings` pair.

---

## Styling Details

### Section Header
- Icon + title in mono, uppercase, wide letter-spacing
- Right side shows metadata: active project count, status indicator
- Bottom border separating header from cards

### Project Card
- `bg-surface` background with `border-border-dim` border
- Border transitions to `accent/50` on hover
- Rounded corners
- Image side: `aspect-video` on mobile, fills height on desktop
- Image starts **grayscale**, transitions to full color on card hover (`grayscale group-hover:grayscale-0`)
- Content side: padded, vertically centered

### Section Labels
- `[The Problem]`, `[Key Learnings]`, `[Tech Stack]` are rendered as:
  - Accent-colored, uppercase, extra-small mono, bold, wide tracking
  - Acts as a label above each paragraph

### Tech Tags
- Small pills: `bg-primary border border-border-dim`
- Mono font, muted text color, 10px size, uppercase

### Category Badge
- Positioned top-right of the content area
- `bg-accent/20 text-accent` with small padding and rounded corners

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| < `lg`     | Image stacks above content (full width, `aspect-video`) |
| >= `lg`    | Side-by-side: image 1/3, content 2/3 |

---

## Interaction

- **Hover**: card border subtly highlights, image desaturates to full color
- **No click-through required** for basic info — everything is visible inline
- **Optional**: cards could link to a detailed case study page in a future phase

---

## Accessibility

- Each card is an `<article>` element
- Section uses a proper `<h2>` heading
- Project names are `<h3>` headings
- Tech tags are plain `<span>` elements (no interactive role needed)
- Image uses appropriate `alt` text or `aria-label`
- Grayscale-to-color transition is decorative only; no information is lost

---

## Implementation Notes

- Data file: `src/lib/data/engineering-log.ts`
- Component: could be inline in `+page.svelte` or extracted to `src/lib/components/sections/EngineeringLog.svelte`
- Uses Tailwind `group` and `group-hover:` utilities for the hover effects
- Uses Tailwind `grayscale` and `grayscale-0` for image treatment
- Responsive layout via `flex-col lg:flex-row`
