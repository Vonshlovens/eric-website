# Education & Certifications

## Summary

A section showcasing academic credentials and professional certifications. Uses the V2 Threadwork design language — dark surface cards with mono typography, accent highlights, and subtle hover effects. Positioned after the Engineering Log and before the Contact CTA.

This feature is adapted from `specs/features.md` (Section 4: Education) and restyled to match the stitch.html visual language.

---

## What Changes from specs/

The original `specs/features.md` defines Education as:
- A mixed grid of degree cards and certification cards
- Emoji icons for degrees, badge images for certifications
- Credential verification links
- Institution logos

The v2 **Education & Certifications** section adapts this to:
- Consistent card styling using `bg-surface` / `border-border-dim` (matching Engineering Log cards)
- Material Symbols icons instead of emoji
- Mono uppercase section header with icon (matching other v2 sections)
- Accent-colored category badges (`DEGREE`, `CERTIFICATION`)
- No institution logos — text-only, keeping the terminal/system aesthetic
- Credential links styled as mono uppercase text links with accent hover

---

## Visual Structure

```
┌──────────────────────────────────────────────────────┐
│  [school icon] EDUCATION & CERTIFICATIONS            │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────┐ ┌────────────────────────┐
│  │  [DEGREE]              │ │  [DEGREE]              │
│  │                        │ │                        │
│  │  B.S. Computer Science │ │  M.S. Data Science     │
│  │  University Name       │ │  University Name       │
│  │  2018 - 2022           │ │  2022 - 2024           │
│  │                        │ │                        │
│  │  Honors / GPA (opt)    │ │  Honors / GPA (opt)    │
│  └────────────────────────┘ └────────────────────────┘
│                                                      │
│  ┌────────────────────────┐ ┌────────────────────────┐
│  │  [CERTIFICATION]       │ │  [CERTIFICATION]       │
│  │                        │ │                        │
│  │  AWS Solutions Arch.   │ │  Terraform Associate   │
│  │  Amazon Web Services   │ │  HashiCorp             │
│  │  Issued: Jan 2024      │ │  Issued: Mar 2023      │
│  │                        │ │                        │
│  │  View Credential →     │ │  View Credential →     │
│  └────────────────────────┘ └────────────────────────┘
│                                                      │
└──────────────────────────────────────────────────────┘
```

Responsive grid: 1 column on mobile, 2 columns on `md+`.

---

## Data Structure

```typescript
interface EducationEntry {
  id: string;
  type: 'degree' | 'certification';
  name: string;            // e.g. "B.S. Computer Science"
  institution: string;     // e.g. "Georgia Institute of Technology"
  year: string;            // e.g. "2018 - 2022" or "Issued: Jan 2024"
  honors?: string;         // e.g. "Cum Laude", "GPA: 3.8"
  credentialUrl?: string;  // verification link (certifications only)
}
```

Data file: `src/lib/data/education.ts`

---

## Styling Details

### Section Header
- Material Symbols `school` icon in accent color
- Title: `text-white text-xl font-mono font-bold uppercase tracking-[0.2em]`
- Matches the pattern used by Core Competencies and Engineering Log headers

### Cards
- `bg-surface` background, `border border-border-dim` border
- `rounded` corners
- `p-6 md:p-8` padding
- Hover: `hover:border-accent/30 transition-colors`

### Category Badge
- Top-right of card
- `text-[10px] font-mono bg-accent/20 text-accent px-2 py-1 rounded`
- Text: `DEGREE` or `CERTIFICATION`

### Card Content
- **Name**: `text-white font-mono font-bold text-lg`
- **Institution**: `text-text-main text-sm font-mono`
- **Year**: `text-text-muted text-xs font-mono uppercase tracking-widest`
- **Honors** (optional): `text-accent text-xs font-mono`
- **Credential link** (optional): `text-text-muted text-xs font-mono uppercase hover:text-accent transition-colors`

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| < `md`     | Single column stack |
| >= `md`    | 2-column grid (`grid-cols-2`) |

---

## Interaction

- **Hover**: card border subtly highlights (`border-accent/30`)
- **Credential links**: open in new tab (`target="_blank" rel="noopener"`)
- No modals or expandable content — everything is visible inline

---

## Accessibility

- Section uses a proper `<h2>` heading
- Each card is a `<div>` (not interactive as a whole)
- Credential names are `<h3>` headings
- Credential links have descriptive text and `rel="noopener"` for external links
- Category badges are decorative — credential type is also conveyed by content structure

---

## Implementation Notes

- Data file: `src/lib/data/education.ts`
- Component: inline in `+page.svelte` or extracted to `src/lib/components/sections/Education.svelte`
- Grid uses Tailwind `grid grid-cols-1 md:grid-cols-2 gap-6`
- Card styling reuses the same token patterns as Engineering Log and Core Competencies
