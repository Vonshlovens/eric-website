# Responsive Breakpoints & Mobile Layout

Unified responsive strategy and breakpoint definitions for the V2 Stitch design system.

## Overview

Define the canonical breakpoint tiers, container widths, and mobile-first layout rules used across every section and component. This spec is the single source of truth so individual section specs can reference it rather than re-documenting responsive behavior.

## Breakpoints

Tailwind v4 default set, used site-wide:

| Token | Min-width | Typical target |
|-------|-----------|----------------|
| `sm`  | 640px     | Large phones / landscape |
| `md`  | 768px     | Tablets |
| `lg`  | 1024px    | Small laptops |
| `xl`  | 1280px    | Desktops |

- **Mobile-first:** base styles target `< 640px`, then layer up with `sm:`, `md:`, `lg:`, `xl:` prefixes.
- No `2xl` breakpoint is used in this project.

## Container

- Max content width: `max-w-6xl` (`1152px`) centered with `mx-auto`
- Horizontal padding: `px-4` (mobile) → `px-6` (sm) → `px-8` (lg)
- Sections use full-bleed background with constrained inner container

## Grid Behavior

| Section | Mobile (< md) | Tablet (md) | Desktop (lg+) |
|---------|---------------|-------------|----------------|
| Core Competencies | 1 col | 3 col | 3 col |
| Engineering Log | stacked card (image top) | stacked card | horizontal card (image 1/3) |
| Work Experience | stacked, no timeline rail | stacked, timeline rail | timeline rail + cards |
| Education | 1 col | 2 col | 2 col |
| Interests | 1 col | 2 col | 3 col |
| Hero | stacked, centered | stacked, centered | 2-col (2/3 + 1/3) |
| Skills Marquee | full width, smaller text | full width | full width |
| Contact CTA | stacked, centered | side-by-side | side-by-side |
| Footer | stacked, centered | 3-col | 3-col |

## Typography Scaling

- Heading sizes step down one tier on mobile (e.g. `text-4xl` → `text-2xl`)
- Body text remains `text-sm` / `text-base` across all breakpoints
- Monospace terminal blocks use `text-xs` on mobile, `text-sm` on desktop

## Touch Targets

- All interactive elements (buttons, links, toggles) meet **44×44 px** minimum touch target
- Mobile nav hamburger button: `w-10 h-10` minimum
- CTA buttons have sufficient padding (`py-3 px-6` minimum on mobile)

## Navigation

- **Desktop (lg+):** horizontal nav links visible in header bar
- **Mobile (< lg):** hamburger icon toggles slide-down menu overlay
- Mobile menu is full-width, stacked links, larger touch targets

## Implementation

- All responsive behavior uses Tailwind utility classes — no custom media queries
- Components use Tailwind's responsive prefix convention (`md:grid-cols-2`, `lg:flex-row`, etc.)
- No JavaScript-based responsive logic; CSS-only via Tailwind breakpoints
  - **Exception:** EngineeringLog card-stack uses `window.matchMedia('(min-width: 1024px)')` for JS-driven scroll animation mode switching (falls back to static cards below lg)
- Container pattern applied to all sections: `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`
- Navigation uses `lg:` breakpoint for desktop/mobile switch (hidden lg:flex / lg:hidden)
- Touch targets enforced: nav buttons w-10 h-10, CTA buttons py-3 px-6, mobile menu links py-3 min-h-[44px], social icons w-11 h-11
- Hero heading scales text-2xl → sm:text-4xl → md:text-6xl; terminal panel text-xs → sm:text-sm
- ContactForm modal padding scales p-4 → sm:p-6 → md:p-8

## Accessibility

- Content remains readable and navigable at 320px minimum viewport width
- No horizontal scroll at any supported breakpoint
- Focus order follows visual order at every breakpoint
- Zoom to 200% does not break layout or hide content

## Design Tokens

| Token | Usage |
|-------|-------|
| `max-w-6xl` | Content container max width |
| `px-4` / `px-6` / `px-8` | Responsive horizontal padding |
| `gap-6` / `gap-8` | Grid/flex gap scaling |
