# Name & Avatar Hover Reveal

## Summary

Add a cursor-proximity reveal effect to the hero section's name and profile picture. A circular radius around the cursor acts as a "window" that exposes the GitHub identity (username **Vonshlovens** and GitHub avatar) underneath. Outside the radius, the display name ("Eric Evans") and styled avatar show normally; inside the radius, the GitHub version bleeds through.

This feature is derived from `specs/frontend-todos.md` item #1.

---

## What Changes from specs/

The original hero section (`specs/features.md` and `specs-v2/hero-section.md`) defines a static avatar and name. This feature layers an interactive reveal on top without changing the base layout or structure.

---

## Visual Behavior

```
Normal state (cursor far away):
┌──────────────────────────┐
│  ┌──────┐                │
│  │ Styled│  Eric Evans   │
│  │Avatar │               │
│  └──────┘                │
└──────────────────────────┘

Cursor nearby (reveal active):
┌──────────────────────────┐
│  ┌──────┐                │
│  │GitHub │  Vonshlovens   │
│  │ PFP  ○← cursor radius │
│  └──────┘                │
└──────────────────────────┘
```

- The reveal follows the cursor position in real-time
- The circle radius is approximately 80–120px (tunable)
- The transition between "normal" and "GitHub" layers is a soft mask — no hard edge
- Works across both the avatar image and the name text simultaneously

---

## Technical Approach

### CSS Mask / Clip-Path Strategy

Two layers are stacked on top of each other:

1. **Bottom layer** (always visible): GitHub avatar + "Vonshlovens" name
2. **Top layer** (masked): Styled avatar + "Eric Evans" name

The top layer uses a CSS `mask-image: radial-gradient(...)` or SVG `<clipPath>` that is **inverted** — it hides a circular area around the cursor, revealing the bottom layer beneath.

```svelte
<div class="reveal-container" onmousemove={handleMouseMove} onmouseleave={handleMouseLeave}>
  <!-- Bottom: GitHub identity (always rendered, revealed through mask) -->
  <div class="reveal-layer-github">
    <img src="/github-avatar.png" alt="GitHub avatar" />
    <span class="font-mono">Vonshlovens</span>
  </div>

  <!-- Top: Display identity (masked around cursor) -->
  <div
    class="reveal-layer-display"
    style="mask-image: radial-gradient(circle {radius}px at {x}px {y}px, transparent 0%, black 100%)"
  >
    <img src="/avatar.jpg" alt="Eric Evans" />
    <span class="font-mono">Eric Evans</span>
  </div>
</div>
```

### Mouse Tracking

```typescript
let x = $state(0);
let y = $state(0);
let active = $state(false);
const radius = 100; // px, tunable

function handleMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  active = true;
}

function handleMouseLeave() {
  active = false;
}
```

### Mask Details

- The `radial-gradient` mask creates a soft-edged circular window
- `transparent` at center (reveals GitHub layer), `black` at edge (keeps display layer)
- The gradient should have a short feather zone (~20px) for a smooth transition:
  ```
  radial-gradient(circle 100px at {x}px {y}px, transparent 60%, black 100%)
  ```
- When `active` is `false`, the mask is removed (full display layer visible)

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop    | Full reveal effect, follows cursor |
| Touch / Mobile | Disabled — static display identity only. Touch devices lack persistent hover. |

Detection: use `@media (hover: hover)` or check `window.matchMedia('(hover: hover)')` to gate the effect.

---

## Performance Considerations

- Use `will-change: mask-image` on the masked layer to hint GPU compositing
- Throttle or use `requestAnimationFrame` for mousemove updates if needed
- Both image layers should be preloaded to avoid flash on first reveal
- The effect is purely decorative — no layout shifts

---

## Assets Required

- **GitHub avatar image**: actual GitHub profile picture for Vonshlovens (can be fetched from `https://github.com/Vonshlovens.png` or stored locally)
- **Display avatar**: the styled/professional avatar already used in the hero section

---

## Accessibility

- The reveal is purely decorative and cosmetic
- Both layers contain the same semantic content (name + avatar), just different visual treatments
- `aria-hidden="true"` on the GitHub layer since it's a decorative duplicate
- The display layer is the accessible version (screen readers see "Eric Evans" and alt text)
- Effect is disabled when `prefers-reduced-motion: reduce` is active
- No information is hidden behind the reveal — it's an easter-egg style interaction

---

## Implementation Notes

- Integrate directly into the hero section component (`Hero.svelte` or equivalent)
- No new routes or data files needed
- The reveal container wraps only the avatar + name area, not the entire hero
- Keep the existing hero layout and structure from `specs-v2/hero-section.md` intact
- This is an enhancement layer, not a replacement

---

## Status: DONE

Implemented in `src/lib/components/sections/Hero.svelte`.

- Two-layer stack inside `.reveal-container`: bottom layer (GitHub identity, `aria-hidden="true"`) and top layer (display identity with `h1#hero-heading`)
- Top layer uses CSS `mask-image: radial-gradient(circle 100px at Xpx Ypx, transparent 60%, black 100%)` with `-webkit-mask-image` vendor prefix
- Mouse position tracked via `onmousemove`/`onmouseleave` on the container, stored in Svelte 5 `$state` runes
- `$derived` computes the mask style string only when `revealActive && canHover && !motionStore.disabled`
- Touch/mobile disabled via `(hover: hover)` media query check
- Reduced-motion disabled via `motionStore.disabled` (from `$lib/stores/motion.svelte`)
- `will-change: mask-image` GPU hint applied when mask is active
- No new files, routes, or dependencies added
