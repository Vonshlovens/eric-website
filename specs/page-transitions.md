# Page Transitions

Smooth cross-fade transitions between routes matching the V2 Stitch system-monitor aesthetic.

## Overview

When navigating between routes (e.g. homepage → 404, or any future pages), apply a brief cross-fade transition to the page content. Reinforces the polished SPA feel and maintains visual continuity during client-side navigation.

## Transition Effect

- **Type:** Cross-fade (`opacity 0→1` on incoming page, `opacity 1→0` on outgoing page)
- **Duration:** 200ms ease-out — fast enough to feel snappy, slow enough to be perceptible
- **Trigger:** SvelteKit client-side navigation (not full page loads)

## Implementation

- **File:** `src/routes/+layout.svelte`
- Use SvelteKit's `{#key}` block keyed on `$page.url.pathname` to trigger transitions on route changes
- Wrap the `<slot />` in a Svelte `transition:fade` or CSS transition:
  ```svelte
  {#key $page.url.pathname}
    <div class="page-transition" in:fade={{ duration: 200 }} out:fade={{ duration: 150 }}>
      <slot />
    </div>
  {/key}
  ```
- Alternatively, use CSS-only approach with `onNavigate` lifecycle hook and the View Transitions API (progressive enhancement)

### View Transitions API (Progressive Enhancement)

- Use SvelteKit's `onNavigate` hook in `+layout.svelte`:
  ```js
  import { onNavigate } from '$app/navigation';
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
  ```
- Define CSS `::view-transition-old` and `::view-transition-new` pseudo-elements for cross-fade
- Falls back gracefully — browsers without View Transitions API get instant navigation (no breakage)

## Accessibility

- Respects `prefers-reduced-motion` / `data-reduce-motion`: disable transitions entirely, use instant navigation
- Transitions must not delay content availability — page is interactive immediately
- Focus management unaffected — SvelteKit handles focus reset on navigation

## Responsive

- Same transition at all breakpoints
- No layout shift during transition — outgoing and incoming pages occupy the same space

## Performance

- Transitions use compositor-friendly `opacity` only (no layout or paint triggers)
- Duration kept short (200ms) to avoid feeling sluggish on mobile
- No additional assets or JS libraries required

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-primary` | Page background (visible during transition) |
