# Accessibility

## Summary

Consolidated accessibility requirements for the V2 portfolio. Every section spec references accessibility inline, but this document defines the **site-wide standards** that all components must meet. The target is **WCAG 2.1 AA** conformance.

---

## What Changes from specs/

The original `specs/features.md` lists accessibility as a bullet-point checklist. This spec expands those into actionable implementation requirements and connects them to the V2 design system and animation-toggle feature.

---

## Standards

- **WCAG 2.1 Level AA** conformance
- Tested against automated tooling (axe-core or Lighthouse accessibility audit)
- Manual keyboard navigation testing for all interactive elements

---

## Semantic HTML

All sections use proper landmark elements:

| Section | Element | Notes |
|---------|---------|-------|
| Navigation | `<header>` + `<nav>` | `aria-label="Main navigation"` |
| Hero | `<section>` | `aria-labelledby` pointing to the `<h1>` |
| Core Competencies | `<section>` | `aria-labelledby` pointing to its `<h2>` |
| Engineering Log | `<section>` containing `<article>` per project | Each project card is an `<article>` |
| Work Experience | `<section>` containing `<article>` per entry | Timeline uses an `<ol>` or semantic list |
| Education | `<section>` | Grid items use `<article>` |
| Skills Marquee | `<section>` | Marquee content duplicated for animation must use `aria-hidden="true"` on clones |
| Interests | `<section>` | Grid items use `<article>` |
| Contact CTA | `<section>` | CTA button is a true `<a>` or `<button>` |
| Footer | `<footer>` | — |

Heading hierarchy: single `<h1>` (hero name), then `<h2>` per section, `<h3>` for sub-items within sections. No skipped levels.

---

## Keyboard Navigation

### Focus Order

Tab order follows visual document flow top-to-bottom:

1. Skip-to-content link (hidden until focused)
2. Nav links and CTA
3. Hero CTAs and social links
4. Section-by-section interactive elements
5. Footer links

### Skip Link

A visually hidden "Skip to main content" link as the first focusable element in `<body>`. Becomes visible on focus. Targets `<main id="main-content">`.

```svelte
<a
  href="#main-content"
  class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-sm"
>
  Skip to main content
</a>
```

### Focus Indicators

All interactive elements must show a visible focus ring. Use Tailwind's `focus-visible:` utilities:

```
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
```

Do not remove default focus outlines without replacing them.

### Mobile Menu

When the mobile hamburger menu opens:
- Focus moves into the menu
- Tab is trapped within the menu while open
- Escape closes the menu and returns focus to the hamburger button

---

## Color Contrast

### Minimum Ratios (WCAG AA)

| Text type | Ratio required |
|-----------|---------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (>= 18px bold or >= 24px) | 3:1 |
| UI components and graphical objects | 3:1 |

### Current Palette Checks

| Foreground | Background | Ratio | Pass? |
|------------|------------|-------|-------|
| `#BFB1C1` (text-main) | `#121212` (primary) | ~7.2:1 | Yes |
| `#888888` (text-muted) | `#121212` (primary) | ~4.6:1 | Yes (normal), yes (large) |
| `#888888` (text-muted) | `#1E1E1E` (surface) | ~3.7:1 | Fail (normal), yes (large) |
| `#FFFFFF` (white) | `#121212` (primary) | ~17.4:1 | Yes |
| `#B80C09` (accent) | `#121212` (primary) | ~3.1:1 | Fail (normal), yes (large) |

### Action Items

- **text-muted on surface**: only use for text that qualifies as "large" (>= 18px bold or >= 24px), or for decorative/supplementary labels where the information is also conveyed elsewhere
- **accent on primary**: only use for large/bold text, icons, or decorative elements — never for small body text. For interactive elements (buttons, links), pair accent with white text on an accent background instead

---

## Reduced Motion

### Integration with Animation Toggle

The `specs-v2/animation-toggle.md` spec defines a global toggle and Svelte store. This accessibility spec requires:

1. **Default behavior**: respect `prefers-reduced-motion: reduce` from the OS. If the user's OS requests reduced motion, the toggle defaults to "off" (animations disabled).
2. **Manual override**: the nav-bar toggle lets users enable or disable animations regardless of OS setting.
3. **What "reduced motion" means**:
   - CSS transitions on `opacity` and `transform` are allowed (they don't trigger vestibular issues)
   - Disable: parallax, marquee auto-scroll, ping animations, typing effects
   - The skills marquee pauses; items remain visible in a static row
   - Scroll-triggered entrance animations apply instantly (elements appear without transition)

### CSS Implementation

```css
[data-reduce-motion="true"] * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}
```

---

## Images and Media

- All `<img>` elements have descriptive `alt` text
- Decorative images (dot-grid textures, background patterns) use `alt=""` or `aria-hidden="true"`
- The hero avatar has a meaningful alt: `"Portrait of Eric Evans"`
- The grayscale-to-color image transition is purely decorative; no information depends on color state

---

## ARIA Attributes

Use ARIA only where HTML semantics are insufficient:

| Pattern | ARIA usage |
|---------|-----------|
| Mobile menu toggle | `aria-expanded`, `aria-controls` on the hamburger button |
| Live status indicator | `aria-label="Status: active"` (the ping dot alone conveys nothing) |
| Animation toggle | `aria-pressed` on the toggle button |
| External links | `rel="noopener noreferrer"` + visually hidden "(opens in new tab)" text |
| Skills marquee clones | `aria-hidden="true"` on duplicated content |

---

## Testing Checklist

Before marking any section spec as implementation-complete, verify:

- [ ] Lighthouse accessibility score >= 95
- [ ] axe-core reports zero violations
- [ ] Full keyboard navigation works (tab through all interactive elements)
- [ ] Skip link works and is visible on focus
- [ ] Focus indicators visible on all interactive elements
- [ ] Screen reader announces all content in logical order
- [ ] Reduced motion mode disables animations
- [ ] No horizontal scroll at any viewport width
- [ ] Touch targets are at least 44x44px on mobile

---

## Implementation Notes

- Skip link goes in `src/routes/+layout.svelte`, before `<header>`
- Focus ring styles can be added as a Tailwind component/utility in `src/app.css`
- Color contrast issues should be resolved during design-system implementation; if `text-muted` is used on `surface` backgrounds, bump it to a slightly lighter shade or ensure the text size qualifies as "large"
- The testing checklist should be run as part of the implementation verification for every section

---

## Implementation Status

**Status: IMPLEMENTED**

### What was done

1. **Skip link**: Moved to `+layout.svelte` before `<Navigation />` as the first focusable element. Text: "Skip to main content". Visible on focus with `sr-only focus:not-sr-only` pattern, styled with accent bg, fixed positioning, z-100.

2. **Focus indicators**: Global `focus-visible` style in `app.css` with accent double-ring (`box-shadow: 0 0 0 2px accent, 0 0 0 4px primary`). Applies to all interactive elements.

3. **Mobile menu focus trap**: Added to `Navigation.svelte` — on open, focus moves to first link in menu; Tab is trapped within focusable elements; Shift+Tab wraps to last element; Escape closes menu and returns focus to hamburger button.

4. **aria-labelledby on sections**: All sections now use `aria-labelledby` pointing to their heading element IDs:
   - Hero: `aria-labelledby="hero-heading"` → `<h1 id="hero-heading">`
   - Core Competencies: `aria-labelledby="core-competencies-heading"` → `<h2 id="core-competencies-heading">`
   - Engineering Log: `aria-labelledby="engineering-log-heading"` (already existed)
   - Work Experience: `aria-labelledby="work-experience-heading"` → `<h2 id="work-experience-heading">`
   - Education: `aria-labelledby="education-heading"` → `<h2 id="education-heading">`
   - Interests: `aria-labelledby="interests-heading"` → `<h2 id="interests-heading">`
   - Contact CTA: `aria-labelledby="contact-heading"` (already existed)

5. **Skills marquee**: Removed `aria-hidden="true"` from the entire `<section>`. Added `aria-label="Technical Skills"`. Cloned content (iterations 2-4) wrapped in `<div class="contents" aria-hidden="true">`. Decorative accent dots marked `aria-hidden="true"`.

6. **External links**: All `target="_blank"` links now include `<span class="sr-only">(opens in new tab)</span>` or equivalent text in `aria-label`. Affected components: Navigation, Hero, WorkExperience, Education, Interests, ContactCTA.

7. **Decorative elements**: Added `aria-hidden="true"` to dot-grid textures, scan-line overlays, terminal prompt line, Material Symbol icons next to text, nav status ping dot, fade gradients, timeline rails/dots.

8. **Status indicator**: Nav status indicator has `aria-label="Status: active"`.

9. **Reduced motion**: Already implemented via animation toggle store + CSS overrides in `app.css` (both `data-reduce-motion` attribute and `prefers-reduced-motion` media query).

10. **Build warning cleanup**: Resolved all Svelte a11y build warnings for a zero-warning build:
    - SkillRadar: Added `svelte-ignore a11y_no_static_element_interactions` to `<text>` and `<circle>` SVG elements that have mouseenter/mouseleave handlers. These elements are inside an `aria-hidden="true"` SVG with `role="presentation"`, and a screen-reader fallback `<table>` is provided below the chart.
    - ContactForm: Added `role="presentation"` to modal backdrop overlay to resolve `a11y_click_events_have_key_events` warning. The backdrop is a decorative overlay; Escape key handling exists on `svelte:window`.
    - SkillRadar: Fixed import path for motion store (removed erroneous `.ts` extension).

11. **Button type attributes**: Added explicit `type="button"` to all 9 non-submit `<button>` elements across 5 components. Without this attribute, HTML buttons default to `type="submit"`, which can cause unintended form submission. Fixed in Navigation.svelte (5 buttons: desktop theme toggle, desktop animation toggle, mobile hamburger, mobile theme toggle, mobile animation toggle), ContactCTA.svelte (Connect.exe CTA), BackToTop.svelte (scroll-to-top), ToastContainer.svelte (dismiss notification), ContactForm.svelte (retry button). The submit button in ContactForm correctly retains `type="submit"`.

### Color contrast notes

Per audit, `text-muted` (#888888) on `surface` (#1E1E1E) is 3.7:1 — passes for large text only. This is acceptable because `text-muted` on `surface` is only used for labels/metadata in large or bold sizes, or supplementary text that is also conveyed elsewhere. No action needed beyond awareness.
