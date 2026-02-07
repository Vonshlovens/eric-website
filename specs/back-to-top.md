# Back to Top Button

Floating scroll-to-top button matching the V2 Stitch system-monitor aesthetic.

## Overview

Provide a fixed-position button that smoothly scrolls the user back to the top of the page after they've scrolled past the hero section. Styled as a minimal system-UI control consistent with the terminal/system-monitor design language.

## Layout

- **Position:** fixed bottom-right (`bottom-6 right-6`), above toast container if present
- **Z-index:** `z-40` (below toasts at `z-50`, above page content)
- **Size:** `2.5rem × 2.5rem` (40px)
- **Shape:** rounded square (`rounded-lg`) matching card border-radius

## Appearance

```
┌─────┐
│  ↑  │
└─────┘
```

- `bg-surface` background with `border border-border-dim`
- Material Symbols `keyboard_arrow_up` icon (20px, `text-text-muted`)
- Hover: `border-accent/50`, icon shifts to `text-text-main`, `bg-surface-highlight`
- Active/pressed: slight `scale(0.95)` transform
- Subtle `box-shadow` matching card elevation

## Behavior

- **Show threshold:** appears after scrolling down `400px` from top (past hero fold)
- **Scroll action:** smooth scroll to `top: 0` via `window.scrollTo({ top: 0, behavior: 'smooth' })`
- **Entry animation:** fade in + translate up (`opacity 0 → 1`, `translateY(8px) → 0`, 200ms ease-out)
- **Exit animation:** fade out + translate down (`opacity 1 → 0`, `translateY(8px)`, 150ms ease-in)
- **Scroll listener:** throttled with `requestAnimationFrame` to avoid layout thrash
- **Reduced motion:** `behavior: 'auto'` instead of `'smooth'`; show/hide is instant (opacity only, no translate)

## Implementation

- **Component:** `src/lib/components/ui/BackToTop.svelte`
- Uses `$state` rune for visibility toggle
- `$effect` with scroll event listener (RAF-throttled)
- Mount in `+layout.svelte` alongside `ToastContainer`
- No external dependencies

## Accessibility

- `<button>` element with `aria-label="Scroll to top"`
- `focus-visible` ring using accent color (global style)
- Hidden from tab order while invisible (`tabindex="-1"` when hidden, `tabindex="0"` when visible)
- Respects `prefers-reduced-motion` and `data-reduce-motion`

## Responsive

- Visible on all breakpoints
- On mobile (`< md`): position shifts to `bottom-4 right-4` to avoid thumb-zone conflicts
- Minimum touch target met (40px ≥ 44px with padding/margin accounted for)

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-surface` | Button background |
| `bg-surface-highlight` | Hover background |
| `border-border-dim` | Default border |
| `border-accent/50` | Hover border |
| `text-text-muted` | Default icon color |
| `text-text-main` | Hover icon color |
| `font-mono` | Not used (icon only) |
