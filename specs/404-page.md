# 404 — Not Found Page

Custom error page matching the V2 Stitch system-monitor aesthetic.

## Overview

When a user navigates to a non-existent route, display a themed 404 page instead of a generic browser error. The page keeps the site's dark system-monitor feel and guides the user back to the homepage.

## Layout

- **Full viewport** centered content (min-h-screen, flex column, items-center, justify-center)
- Dark background (`bg-primary`) — consistent with the rest of the site
- Navigation header and footer still visible (uses `+layout.svelte`)

## Content

### Error Code
- Large `404` displayed in Fira Code mono, `text-8xl` or larger
- Accent color (`text-accent` / `#B80C09`)

### Terminal-Style Message
- Monospace block styled like a terminal output:
  ```
  > route_lookup --path "/requested-path"
  ERROR: endpoint not found
  STATUS: 404_NOT_FOUND
  SUGGESTION: return to index
  ```
- Uses `font-mono`, `text-text-muted` for secondary lines
- Actual requested path dynamically inserted via `$page.url.pathname`

### Call to Action
- "Return to Index" button — same style as hero CTAs (`bg-accent text-white`, hover: `bg-white text-accent`)
- Links to `/`

### Decorative
- Optional subtle dot-grid texture in background (reuse existing pattern)
- Optional scan-line overlay at reduced opacity

## Implementation

- **File:** `src/routes/+error.svelte`
- SvelteKit automatically renders `+error.svelte` for unmatched routes
- Access error status via `$page.status` and `$page.error`
- Only show 404-specific content when `$page.status === 404`; fall back to generic error message for other status codes

## Accessibility

- Page `<title>` set to "404 — Page Not Found | EE_SYS"
- Heading hierarchy: `<h1>` for error code
- CTA button is keyboard-focusable with `focus-visible` ring
- `aria-label` on the CTA: "Return to homepage"

## Responsive

- Text scales down on mobile (`text-6xl` → `text-4xl` for the 404)
- Terminal block wraps gracefully on narrow screens
- Centered layout works at all breakpoints

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-primary` | Page background |
| `text-accent` | 404 number |
| `text-text-main` | Primary text |
| `text-text-muted` | Terminal secondary lines |
| `font-mono` | Terminal block, error code |
| `border-border-dim` | Terminal block border |
| `bg-surface` | Terminal block background |
