# Dark / Light Theme Toggle

## Summary

Add a dark/light theme toggle to the navigation bar, allowing visitors to switch between the default dark theme and a warm light theme. The toggle persists preference to `localStorage` and respects the user's `prefers-color-scheme` system setting as the initial default.

This feature is derived from `specs/style-guide.md` (which defines a full light-mode palette) and `specs/frontend-todos.md` (where a theme toggle was previously implemented in the v1 prototype). The current `specs-v2/design-system.md` declares the site as "dark-only" per `stitch.html` — this spec extends the design system with a light-mode variant.

---

## What Changes from specs-v2/design-system.md

The design system spec currently adopts stitch.html's dark-only palette. This spec adds:

- A **light mode color set** alongside the existing dark tokens
- A **toggle mechanism** using a `class="dark"` strategy on `<html>`
- A **Svelte store** to track and persist the current theme
- A **toggle button** in the navigation bar

No existing dark-mode tokens change. Light mode is additive.

---

## Light Mode Palette

Adapted from `specs/style-guide.md` light mode, adjusted for the V2 design system token names:

```css
html:not(.dark) {
  --color-bg: #F9F1CB;           /* warm parchment — from specs/frontend-todos.md */
  --color-bg-muted: #EDE5B4;     /* slightly deeper parchment */
  --color-bg-subtle: #E0D89E;    /* muted gold */

  --color-fg: #1A1816;           /* near-black text */
  --color-fg-muted: #5C5650;     /* medium brown-gray */
  --color-fg-subtle: #8A837D;    /* light brown-gray */

  --color-accent: #7B9BC7;       /* Indigo Thread — unchanged */
  --color-accent-soft: #D6E2F0;  /* light indigo tint */
  --color-accent-hover: #4A6FA5; /* deeper indigo — unchanged */

  --color-border: #C9C0A0;       /* warm tan border */
  --color-border-muted: #D9D1B8; /* softer tan */

  --color-success: #4A7C59;      /* lichen green — unchanged */
}
```

Key decisions:
- **Background**: `#F9F1CB` (warm parchment) as established in the v1 prototype
- **Foreground**: Inverted — dark text on light backgrounds
- **Accent**: Indigo Thread remains the same across both modes for brand consistency
- **Borders**: Warm tan tones that complement the parchment background

---

## Toggle Button

Placed in the navigation bar, next to the animation toggle (if present).

```svelte
<button
  onclick={toggleTheme}
  class="p-2 rounded text-fg-muted hover:text-accent transition-colors"
  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <span class="material-symbols-outlined text-lg">
    {isDark ? 'light_mode' : 'dark_mode'}
  </span>
</button>
```

- Uses Material Symbols `light_mode` (sun) and `dark_mode` (moon) icons
- Muted by default, accent on hover
- `aria-label` updates to describe the action (not the current state)
- Positioned after nav links, before or after the animation toggle

---

## State Management

A Svelte store manages the theme and persists it to `localStorage`.

```typescript
// src/lib/stores/theme.ts
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (browser) {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
  }
  return 'dark';
}

export const theme = writable<Theme>(getInitialTheme());

export function toggleTheme() {
  theme.update(current => {
    const next = current === 'dark' ? 'light' : 'dark';
    if (browser) localStorage.setItem('theme', next);
    return next;
  });
}
```

### Applying the Theme

In the root layout (`+layout.svelte`), subscribe to the store and toggle the `dark` class on `<html>`:

```svelte
<script>
  import { theme } from '$lib/stores/theme';
  import { browser } from '$app/environment';

  $effect(() => {
    if (browser) {
      document.documentElement.classList.toggle('dark', $theme === 'dark');
    }
  });
</script>
```

### Flash Prevention

To avoid a flash of wrong theme on page load, add a blocking script in `app.html`:

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    if (t === 'dark') document.documentElement.classList.add('dark');
  })();
</script>
```

---

## Tailwind v4 Configuration

Tailwind v4 uses `darkMode: 'class'` (or the `@dark` variant mapped to `.dark`). All existing dark-mode utilities remain unchanged. Light-mode values are defined as the default, and dark-mode values override them via the `.dark` class.

The existing design system tokens in `@theme` should be restructured so:
- Default values = light mode
- `.dark` class overrides = current dark mode values

This is a refactor of the token definitions in the Tailwind theme config, not a change to any component markup.

---

## Responsive Behavior

The toggle button is visible at all breakpoints:
- **Desktop**: Inline in the nav bar alongside other controls
- **Mobile**: Inside the mobile hamburger menu, or as a persistent icon in the header bar

---

## Interaction with Animation Toggle

If the animation toggle from `specs-v2/animation-toggle.md` is also present in the nav:
- Place the theme toggle adjacent to (before or after) the animation toggle
- Both are small icon buttons with the same sizing and hover behavior
- They operate independently — no interaction between the two

---

## Accessibility

- Toggle is a `<button>` element with `aria-label` describing the resulting action
- `aria-label` updates dynamically: "Switch to light mode" / "Switch to dark mode"
- Focus ring visible on keyboard navigation
- Both themes must independently meet WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Respects `prefers-color-scheme` as the initial default for first-time visitors
- Theme change is instantaneous (CSS custom properties update), no transition animation needed

---

## Tech Stack

- **Svelte 5** runes / stores for reactive state
- **Tailwind v4** dark mode via `class` strategy
- **localStorage** for persistence
- **Material Symbols** for toggle icons
- Blocking inline script in `app.html` for flash prevention

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/stores/theme.ts` | Theme store and toggle function |
| `src/routes/+layout.svelte` | Subscribe to store, apply `dark` class |
| `src/app.html` | Blocking script to prevent FOUC |
| `src/lib/components/layout/Navigation.svelte` | Toggle button placement |
| `src/app.css` (or Tailwind theme config) | Light mode CSS custom property values |
