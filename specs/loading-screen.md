# Loading / Splash Screen

System-boot themed loading animation matching the V2 Stitch aesthetic.

## Overview

On initial page load, display a brief system-boot splash screen before revealing site content. Reinforces the system-monitor identity and masks any layout shift or font/image loading.

## Layout

- **Full viewport** overlay (`fixed inset-0 z-50`) covering entire page
- Dark background (`bg-primary`) matching site
- Centered terminal-style boot sequence
- Fades out and removes itself once content is ready

## Content

### Boot Sequence

- Monospace terminal block, line-by-line reveal (typewriter or sequential fade-in):
  ```
  > EE_SYS v2.0_STABLE
  > loading modules............. OK
  > initializing interface...... OK
  > establishing connection..... OK
  > SYSTEM READY
  ```
- Each line appears with a short stagger (~200ms)
- Dots animate or fill in sequentially before "OK" appears
- `font-mono` (`Fira Code`), `text-text-muted` for lines, `text-accent` for "OK" and final "SYSTEM READY"

### Progress Bar (optional)

- Thin accent-colored bar at bottom of terminal block
- Fills left-to-right in sync with the boot lines

### Exit Animation

- After final line, brief pause (~300ms)
- Entire overlay fades out (`opacity 1→0`, 400ms ease-out)
- Overlay removed from DOM after transition (`display: none` or unmount)

## Implementation

- **File:** `src/lib/components/ui/LoadingScreen.svelte`
- **Status:** Implemented
- Rendered in `+layout.svelte` (before `<Navigation />`), conditionally shown via `visible` $state rune
- Uses `onMount` to start the async boot sequence on client-side hydration
- `runBootSequence()` reveals lines sequentially with ~200ms stagger, marks dots complete (showing "OK"), then triggers fade-out
- Sets `visible = false` after 400ms CSS fade-out transition completes; Svelte `{#if}` unmounts the overlay from DOM
- `fadeOut` $state triggers CSS `opacity: 0` transition (400ms ease-out) on the overlay
- Each boot line uses a CSS `line-appear` keyframe animation (150ms ease-out, opacity + translateY)
- Progress bar width driven reactively by `currentLine / lines.length * 100` percentage with 300ms CSS transition
- **Session-only:** `sessionStorage.getItem('boot-shown')` checked on mount — skips entirely if flag is set; flag set to `'1'` after sequence completes
- **Reduced motion:** checks both `data-reduce-motion` attribute and `prefers-reduced-motion: reduce` media query — sets `visible = false` immediately and sets sessionStorage flag

## Accessibility

- `aria-live="polite"` on the terminal block so screen readers announce lines
- `aria-hidden="true"` on the overlay once dismissed
- Respects `prefers-reduced-motion` / `data-reduce-motion`: skip animation entirely, reveal content immediately
- Does not block keyboard navigation — skip-to-content link remains functional underneath

## Responsive

- Terminal block sized with `max-w-md` and horizontal padding
- Text scales down on mobile (`text-sm` vs `text-base`)
- Centered at all breakpoints

## Performance

- Total duration capped at ~1.5 seconds — must not delay meaningful interaction
- No external assets loaded for the splash; pure CSS + inline text
- Content behind overlay continues loading normally (non-blocking)

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-primary` | Overlay background |
| `text-accent` | "OK" text, progress bar, "SYSTEM READY" |
| `text-text-muted` | Boot sequence lines |
| `font-mono` | All splash text (Fira Code) |
| `border-border-dim` | Terminal block border |
| `bg-surface` | Terminal block background |
