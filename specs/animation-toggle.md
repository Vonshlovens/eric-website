# Animation Toggle

## Summary

A small toggle button in the navigation that lets users disable all page animations and transitions. This provides an accessibility escape hatch beyond `prefers-reduced-motion` by giving users explicit, persistent control.

Derived from `specs/frontend-todos.md` item #3 ("Disable-Animations Toggle").

---

## What Changes from specs/

The original spec mentions:
- A button in the top nav/header
- Disabling all page animations
- Referencing Affinity product pages for prior art
- Persisting preference via `localStorage` and respecting `prefers-reduced-motion`

The v2 spec refines this to integrate with the Threadwork/stitch navigation bar and the existing design system tokens.

---

## Visual Structure

The toggle sits in the navigation bar, near the right side, alongside any other utility controls (e.g. "View Source" CTA).

```
┌─────────────────────────────────────────────────────┐
│  EE_SYSTEM  |  ● Live Node    ...nav links...       │
│                              [motion toggle] [CTA]  │
└─────────────────────────────────────────────────────┘
```

### Toggle States

| State | Icon | Label (sr-only) | Tooltip |
|-------|------|-----------------|---------|
| Animations ON | `animation` (Material Symbols) | "Disable animations" | "Animations on" |
| Animations OFF | `motion_photos_paused` (Material Symbols) | "Enable animations" | "Animations off" |

The toggle is a small icon button styled consistently with the nav — mono font, dim border, accent on hover. No text label visible; screen reader label only.

---

## Behavior

1. **Default state**: Animations are **enabled**, unless `prefers-reduced-motion: reduce` is detected, in which case animations start **disabled**.
2. **On click**: Toggle a `data-reduce-motion` attribute on `<html>` and persist the choice to `localStorage`.
3. **On page load**: Check `localStorage` first; if no stored preference, fall back to the `prefers-reduced-motion` media query.
4. **Media query listener**: If the user changes their OS-level motion preference while the page is open, update accordingly — but only if no explicit `localStorage` override exists.

### CSS Integration

All animated properties across the site should be gated behind the absence of the attribute:

```css
html[data-reduce-motion] * {
  animation-duration: 0s !important;
  animation-delay: 0s !important;
  transition-duration: 0s !important;
  transition-delay: 0s !important;
  scroll-behavior: auto !important;
}
```

This is a global override. Individual components do not need to check the toggle themselves — the CSS rule handles suppression universally.

---

## Data / State

No data file needed. State is managed via:

- `localStorage` key: `"reduce-motion"` → `"true"` | `"false"` | absent
- DOM attribute: `<html data-reduce-motion>` when animations are off

A Svelte store (`$animationsDisabled`) can wrap this for reactive access if components need to conditionally skip JS-driven animations (e.g. the card-stack scroll, skills marquee).

```typescript
// src/lib/stores/motion.ts
import { writable } from 'svelte/store';

function createMotionStore() {
  const stored = localStorage.getItem('reduce-motion');
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const initial = stored !== null ? stored === 'true' : preferReducedMotion;

  const { subscribe, set, update } = writable(initial);

  return {
    subscribe,
    toggle() {
      update(current => {
        const next = !current;
        localStorage.setItem('reduce-motion', String(next));
        document.documentElement.toggleAttribute('data-reduce-motion', next);
        return next;
      });
    },
    init() {
      // Call on mount to sync DOM attribute with store
      const stored = localStorage.getItem('reduce-motion');
      const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const value = stored !== null ? stored === 'true' : preferReducedMotion;
      set(value);
      document.documentElement.toggleAttribute('data-reduce-motion', value);
    }
  };
}
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile | Toggle moves into the mobile hamburger menu as a menu item with label text: "Animations" + on/off indicator |
| Desktop | Icon-only button in the nav bar |

---

## Accessibility

- Button has `aria-label` describing current action ("Disable animations" / "Enable animations")
- Button has `aria-pressed` reflecting current state
- Respects `prefers-reduced-motion` as the default when no explicit user choice exists
- The CSS override ensures even third-party or complex animations are suppressed
- Focus styles follow the design system (accent ring)

---

## Implementation Notes

- Component: icon button inside `Navigation.svelte`, or extracted to `src/lib/components/ui/MotionToggle.svelte`
- Store: `src/lib/stores/motion.ts`
- Global CSS rule: added to `app.css` or the root layout
- The `init()` call should happen in the root `+layout.svelte` `onMount` to avoid SSR mismatch
- For the card-stack scroll and skills marquee, check `$animationsDisabled` in JS to skip `requestAnimationFrame` loops or `IntersectionObserver` pin logic entirely
