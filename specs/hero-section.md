# Hero Section

## Overview

The hero section is the first thing visitors see. It combines a professional introduction with a terminal/system-monitor aesthetic drawn from stitch.html, adapted to use the Threadwork design system (dark-first, CommitMono, natural dye palette).

---

## Layout

Two-column on desktop (`lg`), stacked on mobile.

```
┌─────────────────────────────────────────────────┐
│  Left (2/3)                 │  Right (1/3)      │
│                             │                   │
│  > init_portfolio.sh        │  ┌─────────────┐  │
│                             │  │ ● ● ●       │  │
│  [Avatar]  Eric Evans       │  │             │  │
│            Software Dev     │  │  Terminal    │  │
│            [tag] [tag]      │  │  Stats       │  │
│                             │  │             │  │
│  Bio quote (border-left)    │  └─────────────┘  │
│                             │                   │
│  ┌──────┐ ┌──────┐ ...     │                   │
│  │ Stat │ │ Stat │         │                   │
│  └──────┘ └──────┘         │                   │
│                             │                   │
│  [CTA Button] [CTA Button] │                   │
└─────────────────────────────────────────────────┘
```

---

## Elements

### 1. Terminal Prompt Line

A small monospace line above the main content that reads like a shell command.

```svelte
<div class="font-mono text-accent text-sm"> &gt; init_portfolio.sh</div>
```

- Uses `text-accent` (Indigo Thread `#7B9BC7` in Threadwork, not the red from stitch.html).

### 2. Avatar

- Rounded, ~160-192px (`size-40 md:size-48`).
- Grayscale by default, color on hover (`grayscale hover:grayscale-0 transition-all duration-500`).
- Subtle glow border on hover using accent color at low opacity.
- Small verified/identity badge anchored at bottom-right corner.

### 3. Name + Title + Tags

- **Name**: `text-fg text-4xl md:text-6xl font-mono font-bold tracking-tighter`.
- **Title**: `text-accent text-lg font-mono tracking-wide`.
- **Tags**: Small uppercase pills (`text-[10px] font-mono uppercase`) showing specialization areas. Use `bg-bg-muted border border-border text-fg-muted`.

### 4. Bio Quote

A short professional summary styled as a blockquote:

```svelte
<p class="text-fg-muted font-mono text-sm md:text-base leading-relaxed max-w-2xl border-l-2 border-accent pl-6 py-2 bg-accent-soft">
  ...
</p>
```

### 5. Stat Cards

A 2x2 grid on mobile, 4-column on desktop. Each card shows:

- **Label**: `text-[10px] text-fg-subtle font-mono uppercase tracking-widest`
- **Value**: `text-fg font-mono font-bold text-lg`

Cards use `bg-bg-muted p-4 rounded-md border border-border-muted hover:border-accent/30 transition-colors`.

Stats to display (customize with real data):
- Uptime / availability
- Commits or contributions count
- Status (e.g., "Available")
- Experience tier or years

### 6. CTA Buttons

Two buttons side by side:

1. **Primary**: Solid accent background, links to resume/docs.
2. **Outline**: Border only, links to repos/projects section.

Both use `font-mono font-bold text-xs uppercase tracking-widest`.

### 7. Terminal Stats Panel (Right Column)

A decorative terminal window showing personal/fun stats.

- **Title bar**: Three colored dots (accent, weld, lichen) + session label.
- **Body**: Dark background with monospace key-value pairs.
- Styled as `bg-bg-muted border border-border-muted rounded-lg overflow-hidden`.
- Content is static text, not functional.

---

## Responsive Behavior

| Breakpoint | Layout |
|------------|--------|
| Mobile (`<lg`) | Single column, stacked. Avatar + name centered. Terminal panel below. Stat grid 2x2. |
| Desktop (`lg+`) | Two columns (2/3 + 1/3). Avatar + name left-aligned. Terminal panel right. Stat grid 4-col. |

---

## Design System Mapping

All colors, fonts, and spacing follow the Threadwork design system from `specs/style-guide.md`:

| stitch.html token | Threadwork equivalent |
|---|---|
| `#121212` (primary bg) | `--color-bg-value: #0D0C0B` |
| `#B80C09` (accent red) | `--color-accent-value: #7B9BC7` (Indigo Thread) |
| `#BFB1C1` (text-main) | `--color-fg-value: #F7F4F0` |
| `#888888` (text-muted) | `--color-fg-muted-value: #9C9590` |
| `#1E1E1E` (surface) | `--color-bg-muted-value: #1A1816` |
| `#333333` (border-dim) | `--color-border-value: #3D3632` |
| Inter / Fira Code | CommitMono throughout |

---

## Tech Stack

- **SvelteKit 2** page component (rendered in `+page.svelte`)
- **Tailwind v4** utility classes
- **Svelte 5** runes for any reactive state (e.g., hover effects)
- Static data — no API calls needed
- Images served from `static/`

---

## Accessibility

- Avatar has descriptive `alt` text.
- CTA buttons are semantic `<a>` or `<button>` elements.
- Stat cards use `aria-label` or heading structure for screen readers.
- All text meets WCAG AA contrast on dark backgrounds.
- `prefers-reduced-motion` disables hover transitions.

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+page.svelte` | Hero section markup (or extracted component) |
| `src/lib/components/sections/Hero.svelte` | Optional extracted component |
| `static/avatar.jpg` | Profile photo |
