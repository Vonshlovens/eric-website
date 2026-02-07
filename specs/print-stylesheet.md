# Print Stylesheet

Clean, ink-friendly print layout for the portfolio so it reads well on paper or as a saved PDF.

## Overview

Provide a `@media print` stylesheet that strips decorative chrome (backgrounds, animations, textures) and reformats the page into a single-column, black-on-white document suitable for printing or "Save as PDF."

## Behavior

- **Trigger:** browser print dialog (`Ctrl+P` / `Cmd+P`) or "Save as PDF"
- **Hidden elements:**
  - Navigation bar
  - Footer status indicator & decorative latency readout
  - Back-to-top button
  - Theme toggle / animation toggle controls
  - Dot-grid and scan-line texture overlays
  - Contact CTA button (keep email/link text)
  - Skills marquee animation (show static grid instead)
  - Toast container
  - Loading screen
- **Visible elements:** all content sections in source order
- **Colors:** force black text on white background; accent color converted to dark grey for contrast
- **Links:** append URL after link text via `a[href]::after { content: " (" attr(href) ")"; }` for external links only
- **Page breaks:** avoid breaks inside cards, experience entries, and education items (`break-inside: avoid`)
- **Images:** hero avatar and engineering log images remain visible, converted to greyscale to save ink

## Implementation

- **File:** add `@media print` block at the end of `src/app.css`
- **No JS required:** pure CSS media query
- **Font:** keep Fira Code for headings, fall back to system serif for body text to improve print readability
- **Margins:** use `@page { margin: 1.5cm; }` for comfortable print margins
- **Max width:** remove `max-width` constraints so content fills the printable area

## Integration

- Complements [Accessibility](./accessibility.md) — print is an accessibility concern for users who prefer hard copies
- Complements [Performance](./performance.md) — no additional runtime cost, CSS only

## Accessibility

- Print output maintains logical heading hierarchy (h1 → h2 → h3)
- Sufficient contrast (black on white) meets WCAG AAA for print

## Design Tokens

None — print styles override all design tokens with monochrome values.
