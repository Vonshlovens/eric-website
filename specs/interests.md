# Interests / "Beyond Code" Section

## Summary

A personal interests section that adds human dimension to the portfolio. Showcases hobbies, side passions, and non-work activities in a card-based grid. This section is carried forward from the original `specs/features.md` prototype and adapted to the Threadwork (V2) design system.

---

## What Changes from specs/

The original `specs/features.md` defines this section as:
- Card-based grid with emoji icons, titles, and descriptions
- Optional links to related content
- Optional "Currently Reading" book shelf sub-section

The v2 version adapts this to the Threadwork design language:
- Cards use `bg-surface` / `border-border-dim` styling consistent with other sections
- Icons use Material Symbols instead of emoji
- Mono uppercase section header with icon, matching Core Competencies and Engineering Log
- Hover effects transition card border to `accent` color
- No "Currently Reading" sub-section in initial implementation (can be added later)

---

## Visual Structure

```
┌──────────────────────────────────────────────────────┐
│  [interests icon] BEYOND CODE                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  [icon]       │  │  [icon]       │  │  [icon]    │ │
│  │  Title        │  │  Title        │  │  Title     │ │
│  │  Description  │  │  Description  │  │  Desc...   │ │
│  │  Link →       │  │  Link →       │  │  Link →    │ │
│  └──────────────┘  └──────────────┘  └────────────┘ │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                  │
│  │  [icon]       │  │  [icon]       │                 │
│  │  Title        │  │  Title        │                 │
│  │  Description  │  │  Description  │                 │
│  │  Link →       │  │  Link →       │                 │
│  └──────────────┘  └──────────────┘                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Data Structure

```typescript
interface Interest {
  id: string;
  title: string;
  description: string;
  icon: string;        // Material Symbols icon name (e.g. "sports_esports", "music_note")
  links?: Array<{
    label: string;
    url: string;
  }>;
}
```

Data file: `src/lib/data/interests.ts`

---

## Styling Details

### Section Header
- Material Symbols icon + title in mono, uppercase, wide letter-spacing (`tracking-[0.2em]`)
- Accent-colored icon, white title text
- Matches the header pattern used by Core Competencies and Engineering Log

### Interest Cards
- `bg-surface` background with `border-border-dim` border
- `rounded` corners
- Padding: `p-8`
- On hover: border transitions to `border-accent`, background to `bg-surface-highlight`
- `transition-all duration-300`
- Uses `group` utility for coordinated hover effects

### Icon Box
- `bg-primary/50` background, `w-14 h-14`, centered flex, rounded, border
- Icon uses `text-text-main`, transitions to `text-accent` on card hover (`group-hover:text-accent`)
- Matches the icon box pattern from Core Competencies

### Title
- `text-text-white font-mono font-bold text-lg`

### Description
- `text-sm text-text-muted font-mono leading-relaxed`

### Links
- `text-accent text-xs font-mono` with `→` suffix
- Hover: underline or brightness change

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| < `md`     | Single column stack |
| >= `md`    | 2-column grid |
| >= `lg`    | 3-column grid |

Uses `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.

---

## Page Placement

This section sits between **Education & Certifications** and the **Contact CTA** banner:

```
...
├─ Education & Certifications
├─ Interests / Beyond Code      ← this section
├─ Contact CTA
├─ Footer
```

---

## Accessibility

- Section uses a proper `<h2>` heading
- Each card can be a `<div>` (no interactive role unless the entire card is clickable)
- Links within cards are standard `<a>` elements with descriptive text
- Icon box is decorative; icon meaning is conveyed by the card title
- Color transitions are decorative only

---

## Implementation Notes

- Component: inline in `+page.svelte` or extracted to `src/lib/components/sections/Interests.svelte`
- Card layout mirrors Core Competencies grid pattern — can share structural styling
- Icon names are stored as strings in the data file and rendered via `<span class="material-symbols-outlined">`
