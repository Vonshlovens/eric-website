# Navigation

## Overview

A sticky top navigation bar that establishes the site's terminal/system-monitor identity. Draws from the stitch.html header — branding as a "system" identifier, a live-status indicator, monospaced nav links, and a prominent CTA button — all adapted to the Threadwork design system.

---

## Layout

```
┌───────────────────────────────────────────────────────────┐
│  EE_SYSTEM  │  ● Live Node    DASHBOARD  ARCHITECTURE  STACK  [ View Source ]  │
└───────────────────────────────────────────────────────────┘
```

Full-width, sticky at the top (`sticky top-0 z-50`), with a bottom border.

---

## Elements

### 1. Brand / Logo

A monospaced, bold, accent-colored text mark — not an image logo.

```svelte
<span class="font-mono font-bold text-xl text-accent">EE_SYSTEM</span>
```

- Uses `text-accent` (Indigo Thread `#7B9BC7`).
- All-caps, underscore-separated — mimics a system/process name.
- Customize the text to whatever identifier fits (e.g., `EE_SYS`, `ERIC.DEV`, etc.).

### 2. Divider + Status Indicator

A thin vertical line separates the brand from a small live-status badge.

```svelte
<div class="h-4 w-px bg-border"></div>
<div class="flex items-center gap-2">
  <span class="relative flex h-2 w-2">
    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
  </span>
  <span class="text-[10px] text-fg-muted font-mono uppercase tracking-widest">Live Node</span>
</div>
```

- Ping animation on the dot conveys "online / active" feel.
- Accent-colored dot.
- Label is tiny uppercase monospace.

### 3. Nav Links (Desktop)

Horizontal list of anchor links. Active link uses `text-fg`, inactive links use `text-fg-muted`.

```svelte
<nav class="hidden md:flex items-center gap-8">
  <a class="text-xs font-mono text-fg hover:text-fg transition-colors tracking-widest uppercase" href="#hero">Dashboard</a>
  <a class="text-xs font-mono text-fg-muted hover:text-fg transition-colors tracking-widest uppercase" href="#projects">Architecture</a>
  <a class="text-xs font-mono text-fg-muted hover:text-fg transition-colors tracking-widest uppercase" href="#stack">Stack</a>
</nav>
```

- Extremely small (`text-xs`), uppercase, wide tracking — reinforces the terminal aesthetic.
- The link labels can be customized to match actual site sections. stitch.html uses "Dashboard / Architecture / Stack" but the final site might use "About / Projects / Contact" or similar.
- Hover transitions to full foreground color.

### 4. CTA Button

A small outlined accent button for a primary action (e.g., viewing source code, resume, etc.).

```svelte
<button class="bg-accent-soft border border-accent text-accent px-4 py-1.5 rounded text-xs font-mono font-bold hover:bg-accent hover:text-bg transition-all uppercase">
  View Source
</button>
```

- Outline style by default (accent border, transparent-ish bg).
- Fills solid accent on hover.
- Uppercase monospace, bold.

### 5. Mobile Menu

On screens below `md`, the nav links and CTA collapse behind a hamburger toggle.

```svelte
<button class="md:hidden text-fg-muted hover:text-fg transition-colors" aria-label="Toggle menu">
  <!-- hamburger icon or material symbol -->
</button>
```

When toggled, a dropdown or slide-in panel shows the same links vertically. The mobile menu should:
- Appear below the header, full-width.
- Have a dark background matching the header (`bg-bg-muted` or slightly darker).
- Close on link click or outside tap.
- Animate open/close with a short slide or fade.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`<md`) | Brand + status indicator + hamburger button. Nav links hidden behind mobile menu. |
| Desktop (`md+`) | Brand + status indicator + inline nav links + CTA button. |

---

## Styling Details

- **Background**: Slightly elevated from page bg — use `bg-bg-muted` or a custom value like `#161616` equivalent in Threadwork.
- **Border**: `border-b border-border` on the bottom edge.
- **Height**: Fixed `h-16` (64px).
- **Position**: `sticky top-0 z-50` so it stays visible on scroll.
- **Backdrop blur** (optional): `backdrop-blur-sm` for a subtle glass effect when content scrolls behind it.

---

## Design System Mapping

| stitch.html | Threadwork |
|---|---|
| `bg-[#161616]` | `bg-bg-muted` (`#1A1816`) |
| `border-border-dim` | `border-border` (`#3D3632`) |
| `text-accent` (`#B80C09`) | `text-accent` (`#7B9BC7`) |
| `text-text-main` | `text-fg` (`#F7F4F0`) |
| `text-text-muted` | `text-fg-muted` (`#9C9590`) |
| Inter / Fira Code | CommitMono throughout |

---

## Interaction

- **Scroll**: Header remains fixed at the top as the user scrolls.
- **Active section**: As the user scrolls through page sections, the corresponding nav link highlights. Uses a shared `IntersectionObserver` with `rootMargin: '-50% 0px -50% 0px'` to detect which section occupies the viewport midpoint. Active link receives `text-text-white` (vs `text-text-muted`) and `aria-current="true"`. Applies to both desktop and mobile nav links. Observer created on mount, disconnected on destroy.
- **Mobile menu**: Toggles open/close. Closes automatically on navigation.

---

## Accessibility

- `<header>` element wraps the entire bar.
- `<nav>` element wraps the link list with `aria-label="Main navigation"`.
- Mobile toggle button has `aria-expanded` and `aria-controls` attributes.
- All links are semantic `<a>` elements with visible focus rings.
- Skip-to-content link is the first focusable element inside `<header>` (visually hidden until focused).
- Respects `prefers-reduced-motion` — disables ping animation.

---

## Tech Stack

- **SvelteKit 2** layout component (rendered in `+layout.svelte` or `+page.svelte`)
- **Tailwind v4** utility classes
- **Svelte 5** runes for menu open/close state
- No external dependencies required

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/components/layout/Navigation.svelte` | Navigation component |
| `src/routes/+layout.svelte` | Mounts the navigation above page content |
