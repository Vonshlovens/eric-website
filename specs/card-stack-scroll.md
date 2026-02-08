# Card-Stack Scroll Animation

**Status: Implemented**

## Summary

A full-viewport scroll interaction where entries in a chosen section (e.g. Engineering Log or Work Experience) are presented as stacked cards. As the user scrolls, each card slides up to cover the previous one — like a deck of playing cards being dealt onto a pile. Once every card has been viewed, normal scrolling resumes.

This feature is derived from `specs/frontend-todos.md` item #2.

---

## Behavior

1. When the section enters the viewport, the first card fills the visible area.
2. On scroll-down, the next card slides up from the bottom and layers on top of the previous card.
3. Previous cards remain fixed in the background, partially visible beneath the new card.
4. After the final card is fully in view, the entire section un-pins and scrolls away normally with the rest of the page.
5. On scroll-up the process reverses — cards peel away to reveal the one beneath.

---

## Visual Structure

```
Viewport (100vh pinned section)
┌──────────────────────────────┐
│                              │
│   ┌────────────────────┐     │
│   │    Card N (top)     │     │  ← current card, fully visible
│   ├────────────────────┤     │
│   │    Card N-1         │     │  ← previous card, peeking at top edge
│   │    (partially       │     │
│   │     obscured)       │     │
│   └────────────────────┘     │
│                              │
└──────────────────────────────┘
```

---

## Target Section

Apply to **one** section — recommended candidates in order of preference:

1. **Engineering Log** — horizontal project cards already have distinct visual weight; stacking them creates a dramatic portfolio walkthrough.
2. **Work Experience** — timeline entries map naturally to a chronological card deck.

Only one section should use this effect to avoid scroll fatigue.

---

## Implementation Approach

### Scroll Pinning

- Use CSS `position: sticky` on the section container, or use the Intersection Observer API combined with `position: fixed` to pin the section while cards cycle.
- Track scroll progress within the pinned region to determine which card is active.

### Card Layering

- Each card gets `position: absolute` (or `sticky`) within the pinned container.
- Cards use `z-index` based on their order — later cards stack higher.
- Apply `translateY(100%)` initially; animate to `translateY(0)` as the user scrolls through the card's scroll range.

### Scroll Progress Mapping

```
total scroll distance = (number of cards) × (one viewport height)

for card i:
  start = i × viewportHeight
  end   = (i + 1) × viewportHeight
  progress = clamp((scrollOffset - start) / viewportHeight, 0, 1)
  translateY = (1 - progress) × 100%
```

### Suggested Svelte Pattern

```svelte
<script>
  let scrollY = $state(0);
  let sectionTop = $state(0);
  let sectionRef: HTMLElement;

  // Observe section position
  $effect(() => {
    const observer = new IntersectionObserver(/* ... */);
    observer.observe(sectionRef);
    return () => observer.disconnect();
  });
</script>

<svelte:window bind:scrollY={scrollY} />

<section
  bind:this={sectionRef}
  class="relative"
  style:height="{cards.length * 100}vh"
>
  <div class="sticky top-0 h-screen overflow-hidden">
    {#each cards as card, i}
      {@const progress = getCardProgress(scrollY, sectionTop, i)}
      <div
        class="absolute inset-0 transition-none"
        style:transform="translateY({(1 - progress) * 100}%)"
        style:z-index={i}
      >
        <!-- card content -->
      </div>
    {/each}
  </div>
</section>
```

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| >= `md`    | Full card-stack scroll effect |
| < `md`     | **Disabled** — cards render in a normal vertical flow. Mobile users should not be locked into a scroll-hijacking interaction. |

---

## Reduced Motion

- When `prefers-reduced-motion: reduce` is active **or** the user has toggled off animations (see future disable-animations toggle), skip the pinned scroll entirely and fall back to the standard stacked layout.

---

## Performance Considerations

- Avoid JS-driven animation on every scroll event — prefer CSS `transform` with `will-change: transform` on each card for GPU compositing.
- Use `requestAnimationFrame` or a passive scroll listener to update card positions.
- Keep card count reasonable (3–6 entries recommended); more cards mean more scroll distance to traverse.

---

## Accessibility

- The section must remain navigable via keyboard (Tab / Shift+Tab should move through card content normally).
- Screen readers should encounter cards in a standard document flow — the visual stacking is decorative.
- Ensure the pinned scroll region doesn't trap focus or break sequential navigation.
- The `aria-label` on the section should describe the content, not the animation.

---

## Implementation Notes

- No external library required — achievable with Svelte 5 reactivity + CSS transforms.
- If the effect feels too complex to get right initially, a simpler "fade-and-slide" transition between cards on scroll is an acceptable MVP.
- Test on Safari, Chrome, and Firefox — `position: sticky` inside overflow containers can behave differently across engines.

---

## Implementation Details

**Applied to:** Engineering Log section (recommended candidate #1).

**Component:** `src/lib/components/sections/EngineeringLog.svelte`

**Architecture:**
- Section container height: `cardCount × 100vh` (creates scroll space)
- Sticky inner div: `position: sticky; top: 0; height: 100vh; overflow: hidden`
- Cards: `position: absolute; inset: 0` with `translateY((1 - progress) × 100%)` and ascending `z-index`
- Scroll progress computed per spec formula: `progress = clamp((scrollOffset - start) / viewportHeight, 0, 1)`
- `sectionTop` tracked via `getBoundingClientRect()` + `window.scrollY`, updated on resize

**Reactive toggle via `$effect`:**
- Watches `min-width: 768px` media query (md breakpoint)
- Watches `prefers-reduced-motion: reduce` media query
- Watches `data-reduce-motion` attribute via MutationObserver
- Toggles between card-stack mode and standard vertical fallback

**UI overlays (decorative, aria-hidden):**
- Progress dots (top-right): accent-colored for viewed cards, border-dim for upcoming
- Card counter (bottom-right): `01 / 06` format in mono text

**CSS:** `.card-stack-card` class in `app.css` with `will-change: transform` and `backface-visibility: hidden` for GPU compositing. Print stylesheet resets to `position: static`.

**Fallback (mobile / reduced-motion):** Original vertical card list with `use:scrollReveal` fade-up animations, identical to pre-implementation layout.
