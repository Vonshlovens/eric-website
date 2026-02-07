# Scroll-Triggered Entrance Animations

## Summary

Sections and key elements fade/slide into view as the user scrolls down the page. Uses the Intersection Observer API to detect when elements enter the viewport and applies CSS transitions for smooth reveal. Respects the animation toggle and `prefers-reduced-motion`.

---

## Behavior

1. On initial page load, only elements **above the fold** are visible immediately.
2. As the user scrolls, each section (or significant child element) transitions from invisible to visible when it crosses a configurable viewport threshold.
3. Each element animates **once** — after it has entered and revealed, it stays visible permanently (no re-hiding on scroll-up).
4. If the user has disabled animations (via the animation toggle or `prefers-reduced-motion`), all elements render visible immediately with no transition.

---

## Default Animation

### Fade-Up

The standard entrance: element starts slightly below its final position and fades in as it rises.

```css
/* Initial state (before intersection) */
.scroll-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Revealed state (after intersection) */
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}
```

- **Distance**: 24px vertical offset (subtle, not jarring)
- **Duration**: 600ms
- **Easing**: `ease-out`

### Stagger (optional)

For grid items (e.g., competency cards, interest cards, stat cards), add a stagger delay so children animate in sequence rather than all at once.

```css
.scroll-reveal-stagger > .scroll-reveal:nth-child(1) { transition-delay: 0ms; }
.scroll-reveal-stagger > .scroll-reveal:nth-child(2) { transition-delay: 100ms; }
.scroll-reveal-stagger > .scroll-reveal:nth-child(3) { transition-delay: 200ms; }
/* ... up to ~6 children; cap delay at 500ms */
```

---

## Intersection Observer Configuration

```typescript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.15,    // trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px', // slight bottom offset to trigger a bit before full entry
  }
);
```

---

## Svelte Integration

Implement as a Svelte action for easy reuse across components:

```svelte
<!-- src/lib/actions/scrollReveal.ts -->
<script lang="ts">
  import type { Action } from 'svelte/action';

  export const scrollReveal: Action<HTMLElement, { stagger?: boolean }> = (node, params) => {
    // Check reduced-motion / animation toggle
    // If disabled, add 'revealed' immediately and return
    // Otherwise, set up IntersectionObserver
  };
</script>
```

Usage in any component:

```svelte
<section use:scrollReveal>
  <h2>Core Competencies</h2>
  ...
</section>
```

For staggered grids:

```svelte
<div use:scrollReveal={{ stagger: true }}>
  {#each items as item}
    <div class="scroll-reveal">...</div>
  {/each}
</div>
```

---

## Which Elements Animate

| Section | What animates | Stagger? |
|---------|---------------|----------|
| Hero | Entire section — **no scroll animation** (visible immediately) | N/A |
| Core Competencies | Section heading, then the 3 cards | Yes (cards) |
| Engineering Log | Section heading, then each project card | No (sequential, one at a time) |
| Skills Marquee | Entire marquee block | No |
| Work Experience | Section heading, then each timeline entry | No (sequential) |
| Education | Section heading, then the card grid | Yes (cards) |
| Interests | Section heading, then the card grid | Yes (cards) |
| Contact CTA | Entire banner | No |
| Footer | No animation (always visible when scrolled to) | N/A |

---

## Reduced Motion / Animation Toggle

When animations are disabled (either via the `data-reduce-motion` attribute from the animation toggle or the `prefers-reduced-motion` media query):

```css
[data-reduce-motion="true"] .scroll-reveal,
@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

The Svelte action should also check the animation store and skip observer setup entirely if animations are off.

---

## Performance Notes

- Use a **single shared IntersectionObserver** instance for all elements (or one per threshold group) rather than creating one per element.
- `unobserve` each element after it reveals to avoid unnecessary callback invocations.
- Prefer CSS `opacity` and `transform` — both are compositor-friendly and won't trigger layout/paint.
- Avoid animating `height`, `width`, `margin`, or `top`/`left`.

---

## Accessibility

- Elements must be in the DOM and accessible to screen readers regardless of visual state. Use `opacity: 0` rather than `display: none` or `visibility: hidden` so content remains in the accessibility tree.
- The `aria-hidden` attribute must **not** be applied to unrevealed elements.
- Scroll animations are purely decorative — no content is gated behind them.

---

## Tech Stack

- **Intersection Observer API** (no polyfill needed — baseline support)
- **Svelte 5 action** (`use:scrollReveal`)
- **CSS transitions** (no JS animation libraries)
- Reads the animation store from `specs-v2/animation-toggle.md`

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/actions/scrollReveal.ts` | Svelte action wrapping IntersectionObserver |
| `src/app.css` | `.scroll-reveal` and `.revealed` base styles, reduced-motion overrides |
