# Footer

## Overview

A minimal, dark footer that closes the page with branding, a tagline, copyright, and a live-status indicator. Derived from the footer in `stitch.html`, adapted to the Threadwork design system.

---

## Layout

Three-column on desktop, stacked and centered on mobile.

```
┌──────────────────────────────────────────────────────────┐
│  ERIC EVANS                  © 2025 ...          Latency │
│  Software Developer //       v1.0_STABLE         ● 14ms │
│  Cloud & AI Systems                                      │
└──────────────────────────────────────────────────────────┘
```

---

## Elements

### 1. Branding Block (Left)

- **Name**: `text-fg font-mono font-bold text-sm tracking-widest`
- **Tagline**: `text-fg-subtle font-mono text-[10px] uppercase` — e.g. "Software Developer // Cloud & AI Systems"

### 2. Copyright (Center)

- `text-border font-mono text-[10px] uppercase tracking-[0.3em]`
- Format: `© {year} EE_SYSTEM_PORTFOLIO // v{version}_STABLE`
- Year should be dynamic (derived from `new Date().getFullYear()`)

### 3. Status Indicator (Right)

- A latency readout: `text-[10px] font-mono text-fg-muted uppercase` showing a static or decorative latency value (e.g. "Latency: 14ms")
- A small green dot (`size-2 rounded-full bg-lichen`) to indicate "online" status
- Purely decorative — no real ping logic

---

## Styling

- **Background**: Slightly darker than page bg — `bg-bg-value` or a dedicated footer shade (stitch uses `#0A0A0A`; Threadwork equivalent is near `--color-bg-value: #0D0C0B` or slightly darker)
- **Top border**: `border-t border-border-muted`
- **Padding**: `py-12`
- **Container**: `max-w-7xl mx-auto px-6`
- **Layout**: `flex flex-col md:flex-row justify-between items-center gap-6`

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`<md`) | Stacked vertically, center-aligned. Branding → Copyright → Status. |
| Desktop (`md+`) | Three columns in a row: branding left, copyright center, status right. |

---

## Design System Mapping

| stitch.html token | Threadwork equivalent |
|---|---|
| `#0A0A0A` (footer bg) | Near `--color-bg-value` or slightly darker variant |
| `border-border-dim` | `border-border-muted` |
| `text-white` (name) | `text-fg` |
| `text-text-muted` (tagline, latency) | `text-fg-subtle` / `text-fg-muted` |
| `text-border-dim` (copyright) | `text-border` |
| `bg-green-500` (status dot) | `bg-status-ok` (`--color-status-ok: #22C55E`) |

---

## Tech Stack

- **SvelteKit 2** layout component (rendered in `+layout.svelte`)
- **Tailwind v4** utility classes
- Static content — no API calls
- Year derived from Svelte reactive expression or inline JS

---

## Accessibility

- Footer uses semantic `<footer>` element
- Text meets WCAG AA contrast on the dark background
- Status dot is decorative; no information is conveyed solely by color
- No interactive elements require focus management (unless links are added later)

---

## Implementation Status

**Completed.** Extracted as `src/lib/components/layout/Footer.svelte`, rendered via `src/routes/+layout.svelte`.

## Files

| File | Purpose |
|------|---------|
| `src/lib/components/layout/Footer.svelte` | Footer component |
| `src/routes/+layout.svelte` | Renders Footer below main content |
