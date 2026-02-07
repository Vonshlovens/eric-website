# Design System — V2 Theme Configuration

## Summary

Global theme, color palette, typography, and shared visual patterns for the V2 portfolio. This spec reconciles the stitch.html prototype with the existing Threadwork design system from `specs/style-guide.md` and establishes the canonical tokens that all section components consume.

This is a **foundational spec** — every other specs-v2/ feature depends on these tokens being configured in Tailwind CSS v4.

---

## What Changes from specs/

The original `specs/style-guide.md` defines the **Threadwork** design system with:
- Textile/weaving-inspired naming (Loom Black, Shuttle Gray, Indigo Thread)
- CommitMono as the sole font
- Natural-dye palette (indigo `#7B9BC7`, madder, weld, lichen)
- Light mode variant

The stitch.html prototype diverges significantly:
- **Red accent** (`#B80C09`) instead of indigo
- **Two font families**: Inter (sans) + Fira Code (mono) instead of CommitMono-only
- **Simpler palette**: fewer semantic colors, more surface-level grays
- **No light mode** — dark-only
- **Material Symbols** icon set (filled variant, weight 400)
- **Custom scrollbar** styling
- **Selection color** using accent

The V2 design system adopts the **stitch.html palette and fonts** as the source of truth while preserving useful structural patterns from Threadwork (spacing scale, radius scale, animation tokens).

---

## Color Palette

### Core Tokens

```css
:root {
  /* Backgrounds */
  --color-primary: #121212;        /* page background */
  --color-surface: #1E1E1E;        /* card / panel background */
  --color-surface-highlight: #252525; /* hovered card background */

  /* Accent */
  --color-accent: #B80C09;         /* brand red — CTAs, highlights, branding */

  /* Text */
  --color-text-main: #BFB1C1;      /* primary body text */
  --color-text-muted: #888888;     /* secondary / label text */
  --color-text-white: #FFFFFF;     /* headings, emphasis */

  /* Borders */
  --color-border-dim: #333333;     /* default border */

  /* Status */
  --color-status-ok: #22C55E;      /* green-500 — live indicators, "Production" */
}
```

### Tailwind v4 Configuration

```css
/* app.css — CSS-first config */
@theme {
  --color-primary: #121212;
  --color-accent: #B80C09;
  --color-text-main: #BFB1C1;
  --color-text-muted: #888888;
  --color-surface: #1E1E1E;
  --color-surface-highlight: #252525;
  --color-border-dim: #333333;
}
```

Usage: `bg-primary`, `text-accent`, `border-border-dim`, `bg-surface`, `hover:bg-surface-highlight`, etc.

---

## Typography

### Font Families

```css
@theme {
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

- **Inter** (weights 300–600): used for body prose within project descriptions and longer paragraphs
- **Fira Code** (weights 300–700): used for headings, labels, nav links, stats, tags, and all system-aesthetic text

Most UI text is `font-mono`. `font-sans` is used selectively for readability in multi-sentence paragraphs (e.g., engineering log problem/learnings descriptions).

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
```

### Type Patterns

| Element | Font | Size | Weight | Color | Transform |
|---------|------|------|--------|-------|-----------|
| Page heading (name) | mono | 4xl–6xl | bold | white | `tracking-tighter` |
| Section heading | mono | xl | bold | white | `uppercase tracking-[0.2em]` |
| Nav links | mono | xs | normal | text-main/muted | `uppercase tracking-widest` |
| Micro labels | mono | 10px | normal | text-muted | `uppercase tracking-widest` |
| Stat values | mono | lg | bold | white | — |
| Body prose | sans | sm | normal | text-main | `leading-relaxed` |
| Tags | mono | 10px | normal | text-muted | `uppercase` |

---

## Icons

**Material Symbols Outlined** (filled variant):

```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
```

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
```

Icons used across sections:
- `verified_user` — avatar badge
- `description` — documentation CTA
- `folder_open` — repos CTA
- `hub` — core competencies heading
- `cloud_queue` — cloud card
- `psychology` — AI card
- `database` — database card
- `terminal` — engineering log heading
- `mail`, `hub` — contact social links

---

## Global Styles

### Custom Scrollbar

```css
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #121212; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #B80C09; }
```

### Selection

```css
::selection {
  background-color: #B80C09;
  color: #FFFFFF;
}
```

Applied via Tailwind: `selection:bg-accent selection:text-white` on `<body>`.

### Antialiasing

`antialiased` class on `<body>` for smooth font rendering.

---

## Spacing & Layout

### Container

```
max-w-7xl mx-auto px-6 (md:px-12 for main content area)
```

### Section Spacing

- Section vertical margin: `mb-16` to `mb-20`
- Section internal padding: `py-12`

### Spacing Scale

Inherits Tailwind defaults (4px base grid). No custom overrides needed.

---

## Border Radius

```css
@theme {
  --radius-DEFAULT: 0.25rem;  /* 4px — cards, buttons, tags */
  --radius-lg: 0.5rem;        /* 8px — avatar, terminal panel */
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;      /* status dots */
}
```

---

## Shared Interaction Patterns

### Hover Border Glow
Cards and interactive surfaces transition border color on hover:
```
border-border-dim hover:border-accent/30  (subtle)
border-border-dim hover:border-accent     (strong, e.g. competency cards)
border-border-dim hover:border-accent/50  (medium, e.g. project cards)
```

### Grayscale-to-Color
Images start grayscale and transition to full color on hover:
```
grayscale hover:grayscale-0 transition-all duration-500
```

### Avatar Glow
Subtle blur glow behind avatar on hover:
```html
<div class="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
```

### Ping Animation
Live-status indicator uses Tailwind's `animate-ping`:
```html
<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
```

---

## Responsive Breakpoints

Standard Tailwind breakpoints. Key layout shifts:
- **`md` (768px)**: 2-column stat grids, side-by-side hero text, desktop nav visible
- **`lg` (1024px)**: hero two-column layout (content 2/3 + terminal 1/3), engineering log side-by-side

Mobile-first: everything stacks vertically by default.

---

## Implementation Notes

- Configure in `src/app.css` using Tailwind v4 `@theme` directive
- Font links in `src/app.html` `<head>`
- Material Symbols link in `src/app.html` `<head>`
- Global scrollbar and selection styles in `src/app.css`
- No light mode — dark only for V2
- Accent color (`#B80C09`) is the single brand color; avoid introducing additional accent hues
