# Contact CTA Section

## Overview

A full-width call-to-action banner that sits below the Engineering Log and above the footer. Styled as a "protocol initialization" prompt — a dramatic, system-themed block encouraging visitors to get in touch. Combines a headline, subtext, availability status badge, a primary action button, and social/contact icon links.

Derived from the "Initialize Protocol?" section in `stitch.html` (lines 297-322), adapted to the Threadwork design system.

---

## Layout

```
┌────────────────────────────────────────────────────────────────┐
│  ░░░ subtle dot-grid background texture ░░░                    │
│                                                                │
│  Left                                    Right                 │
│  ┌──────────────────────────┐   ┌───────────────────────────┐  │
│  │  Initialize Protocol?    │   │   [ Connect.exe ]  (btn)  │  │
│  │                          │   │                           │  │
│  │  Subtext / description   │   │   [mail] [terminal] [hub] │  │
│  │                          │   └───────────────────────────┘  │
│  │  ┌─────────────────────┐ │                                  │
│  │  │ STATUS: READY       │ │                                  │
│  │  └─────────────────────┘ │                                  │
│  └──────────────────────────┘                                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

On mobile (`< md`), the layout stacks vertically and centers all content.

---

## Elements

### 1. Container

A rounded card with a surface background, border, and a subtle decorative dot-grid overlay for texture.

```svelte
<div class="rounded bg-bg-muted border border-border-muted relative overflow-hidden">
  <!-- dot-grid overlay -->
  <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle, var(--color-border-value) 1px, transparent 1px); background-size: 20px 20px;"></div>

  <div class="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 gap-8">
    <!-- content -->
  </div>
</div>
```

- `bg-bg-muted` background with `border-border-muted` border.
- Rounded corners.
- The dot-grid is purely decorative, rendered via a CSS background pattern at low opacity.
- Content sits above the overlay via `z-10`.

### 2. Headline

A bold, monospace heading styled as a system prompt.

```svelte
<h2 class="text-fg text-3xl font-mono font-bold tracking-tight">
  Initialize Protocol?
</h2>
```

- Full foreground color, large, tight tracking.
- The text can be customized (e.g., "Start a Conversation?", "Open Channel?").

### 3. Description

A short, muted explanation of availability and what the visitor can expect.

```svelte
<p class="text-fg-muted font-mono text-sm max-w-md">
  Open for high-level architectural consultations and complex systems integration. Response time: &lt; 24h.
</p>
```

- Muted foreground, monospace, small size.
- Constrained to `max-w-md` to keep line lengths readable.

### 4. Status Badge

A small inline badge conveying current availability, styled like a terminal status line.

```svelte
<span class="px-3 py-1 bg-bg/50 rounded text-[10px] font-mono text-success border border-border-muted tracking-widest font-bold uppercase">
  STATUS: READY_TO_COLLABORATE
</span>
```

- Lichen Green (`text-success` / `#4A7C59`) for the text to convey "online/available."
- Very small, uppercase, wide tracking — matches the system-monitor aesthetic.
- Dark, semi-transparent background.

### 5. Primary CTA Button

A large, prominent accent button.

```svelte
<button class="flex items-center justify-center rounded bg-accent text-bg h-14 px-10 text-xs font-mono font-bold tracking-[0.2em] transition-all hover:bg-fg hover:text-bg shadow-xl shadow-accent/20 uppercase">
  Connect.exe
</button>
```

- Solid accent background with light text.
- On hover, shifts to foreground color background (light) — high contrast swap.
- Shadow with accent tint for depth.
- Uppercase mono, wide tracking.
- The label is playful ("Connect.exe") — customize as desired.
- Links to a contact method (mailto, calendar link, or scrolls to a contact form if one exists).

### 6. Social / Contact Icons

A row of icon links for alternative contact methods.

```svelte
<div class="flex gap-6 text-fg-muted">
  <a class="hover:text-accent transition-colors" href="mailto:..." aria-label="Email">
    <span class="material-symbols-outlined">mail</span>
  </a>
  <a class="hover:text-accent transition-colors" href="https://github.com/..." aria-label="GitHub">
    <span class="material-symbols-outlined">terminal</span>
  </a>
  <a class="hover:text-accent transition-colors" href="https://linkedin.com/..." aria-label="LinkedIn">
    <span class="material-symbols-outlined">hub</span>
  </a>
</div>
```

- Muted by default, accent on hover.
- Uses Material Symbols icons.
- Each link opens in a new tab (external) or triggers mailto (email).
- `aria-label` on each for accessibility.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`< md`) | Single column, all content centered and stacked vertically. Button full-width or auto. |
| Desktop (`md+`) | Two columns — text/status on the left, button/icons on the right. |

---

## Design System Mapping

| stitch.html | Threadwork |
|---|---|
| `bg-surface` (`#1E1E1E`) | `bg-bg-muted` (`#1A1816`) |
| `border-border-dim` (`#333`) | `border-border-muted` (`#2D2926`) |
| `text-white` | `text-fg` (`#F7F4F0`) |
| `text-text-muted` (`#888`) | `text-fg-muted` (`#9C9590`) |
| `text-green-500` | `text-success` / Lichen Green (`#4A7C59`) |
| `bg-accent` (`#B80C09`) | `bg-accent` (`#7B9BC7` / Indigo Thread) |
| `bg-black/50` | `bg-bg/50` |
| Inter / Fira Code | CommitMono throughout |

---

## Interaction

- **Hover on CTA**: Background color swap (accent to foreground), shadow remains.
- **Hover on icons**: Color transitions from muted to accent.
- **No scroll-triggered animation** — the section is always fully visible when in viewport.

---

## Accessibility

- Section wrapped in a `<section>` element with `aria-labelledby` pointing to the heading.
- Heading uses a proper `<h2>`.
- CTA is a semantic `<a>` or `<button>` element with clear focus ring.
- Social icons have `aria-label` attributes describing their destination.
- Status badge text is readable by screen readers (no information conveyed by color alone — the word "READY" provides meaning).
- All text meets WCAG AA contrast on the dark background.
- Respects `prefers-reduced-motion` (no animations to disable, but hover transitions should be suppressed).

---

## Tech Stack

- **SvelteKit 2** component (inline in `+page.svelte` or extracted)
- **Tailwind v4** utility classes
- **Material Symbols** for icons
- Static content — no API calls needed

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Contact CTA markup (or extracted component) |
| `src/lib/components/sections/ContactCTA.svelte` | Optional extracted component |
