# Loading / Splash Screen

Simple fade-in overlay matching the V2 Stitch aesthetic.

## Overview

On initial page load, display a brief opaque overlay that fades out to reveal site content. Provides a clean visual transition without delaying meaningful interaction — the site loads in ~400ms so there is no real loading to mask.

## Layout

- **Full viewport** overlay (`fixed inset-0 z-50`) covering entire page
- Dark background (`bg-primary`) matching site
- Fades out and removes itself after a brief pause

## Behavior

- 100ms initial pause (allows content to settle)
- 250ms fade-out (`opacity 1→0`, ease-out)
- Overlay removed from DOM after transition (Svelte `{#if}` unmount)
- Total duration: ~350ms

## Implementation

- **File:** `src/lib/components/ui/LoadingScreen.svelte`
- **Status:** Implemented (simplified from original boot sequence)
- Rendered in `+layout.svelte` (before `<Navigation />`), conditionally shown via `visible` $state rune
- Uses `onMount` with nested `setTimeout` calls: 100ms pause → set `fadeOut` → 250ms transition → set `visible = false`
- `fadeOut` $state triggers CSS `opacity: 0` transition (250ms ease-out) on the overlay
- **Session-only:** `sessionStorage.getItem('boot-shown')` checked on mount — skips entirely if flag is set; flag set to `'1'` after fade completes
- **Reduced motion:** checks both `data-reduce-motion` attribute and `prefers-reduced-motion: reduce` media query (via `globalThis.matchMedia`) — sets `visible = false` immediately and sets sessionStorage flag

## Accessibility

- `aria-hidden="true"` on the overlay once fade-out begins
- Respects `prefers-reduced-motion` / `data-reduce-motion`: skip animation entirely, reveal content immediately
- Does not block keyboard navigation — skip-to-content link remains functional underneath

## Performance

- Total duration ~350ms — does not delay meaningful interaction
- No external assets loaded; pure CSS opacity transition
- Content behind overlay continues loading normally (non-blocking)

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-primary` | Overlay background |
