# Style Guide - Threadwork Design System

## Design Philosophy

**Textile-Inspired, Dark-First, Monospaced**

A design system inspired by traditional weaving and textile craft. The palette draws from natural dyes (indigo, madder, weld, lichen) and raw materials (linen, walnut, iron). Every visual element echoes the language of the loom.

### Core Principles
- **Craft-Focused** - Inspired by traditional weaving and textile arts
- **Dark-First** - Deep, rich backgrounds with light text
- **Monospaced** - CommitMono throughout for technical precision
- **Natural Colors** - Derived from plant-based dyes and raw materials

---

## Color Palette

### Dark Mode (Default)

```css
:root {
  /* Background - Loom Black to Shuttle Gray */
  --color-bg-value: #0D0C0B;
  --color-bg-muted-value: #1A1816;
  --color-bg-subtle-value: #2D2926;

  /* Foreground - Thread Silver to Raw Linen */
  --color-fg-value: #F7F4F0;
  --color-fg-muted-value: #9C9590;
  --color-fg-subtle-value: #6B6560;

  /* Accent - Indigo Thread */
  --color-accent-value: #7B9BC7;
  --color-accent-soft-value: #1E2A3D;
  --color-accent-hover-value: #4A6FA5;

  /* Border */
  --color-border-value: #3D3632;
  --color-border-muted-value: #2D2926;

  /* Thread */
  --color-thread-value: #4A6FA5;
  --color-thread-muted-value: rgba(74, 111, 165, 0.3);
}
```

### Light Mode

```css
.light {
  /* Background - Raw Linen to Woven Cream */
  --color-bg-value: #F7F4F0;
  --color-bg-muted-value: #EDE8E3;
  --color-bg-subtle-value: #E3DDD6;

  /* Foreground - Spindle Brown */
  --color-fg-value: #3D3632;
  --color-fg-muted-value: #6B6560;
  --color-fg-subtle-value: #9C9590;

  /* Accent - Deep Indigo */
  --color-accent-value: #2C3E6B;
  --color-accent-soft-value: #E8ECF4;
  --color-accent-hover-value: #4A6FA5;
}
```

### Status Colors

| Status  | Color Name   | Dark Mode | Light Mode | Use Case |
|---------|--------------|-----------|------------|----------|
| Error   | Madder Red   | #A63D2F   | #A63D2F    | Errors, destructive actions |
| Warning | Weld Gold    | #C9A227   | #9A7B1E    | Warnings, caution states |
| Success | Lichen Green | #4A7C59   | #3D6B4A    | Success, completion |
| Info    | Woad Blue    | #4A6FA5   | #2C3E6B    | Information, links |

### Weaver Identity Colors

Palette for unique identity markers:

```css
--weaver-indigo: #4A6FA5;
--weaver-madder: #A63D2F;
--weaver-weld: #C9A227;
--weaver-lichen: #4A7C59;
--weaver-cochineal: #8B3A62;
--weaver-walnut: #6B5344;
--weaver-copper: #7B6B4E;
--weaver-iron: #4A4A4A;
```

---

## Typography

### Font Family

```css
@theme {
  --font-mono: 'CommitMono', 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
  --font-sans: 'CommitMono', system-ui, sans-serif;
}
```

**CommitMono** - A monospaced font with excellent readability. Available weights: 400 (Regular), 700 (Bold).

Font files located in `static/fonts/` (TTF format from https://github.com/eigilnikolajsen/commit-mono)

### Type Scale

```css
@theme {
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
}
```

### Typography Patterns

```svelte
<!-- Hero Heading -->
<h1 class="font-mono text-2xl font-bold text-fg tracking-tight">
  Eric Johnson
</h1>

<!-- Section Heading -->
<h2 class="font-mono text-xl font-bold text-fg">
  About Me
</h2>

<!-- Body Text -->
<p class="font-mono text-base text-fg-muted leading-relaxed">
  Body content with clean readability.
</p>

<!-- Accent Text -->
<span class="font-mono text-accent font-bold uppercase tracking-wide">
  Featured
</span>
```

---

## Spacing

Based on a 4px grid.

```css
@theme {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

---

## Border Radius

```css
@theme {
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-md: 4px;
  --radius-lg: 6px;
  --radius-xl: 8px;
  --radius-full: 9999px;
}
```

---

## Shadows

```css
@theme {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

---

## Visual Motifs

### Thread Divider

A subtle gradient line that fades at the edges.

```svelte
<div class="thread-divider"></div>
```

```css
.thread-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-thread-muted) 10%,
    var(--color-thread-muted) 90%,
    transparent 100%
  );
  margin: var(--space-6) 0;
}
```

### Thread Divider with Knot

A line with a centered dot (knot).

```svelte
<div class="thread-divider-knot"></div>
```

```css
.thread-divider-knot {
  position: relative;
  height: 1px;
  background: var(--color-thread-muted);
  margin: var(--space-6) 0;
}

.thread-divider-knot::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: var(--color-thread);
  border-radius: var(--radius-full);
}
```

### Loom Frame

Corner brackets that evoke a loom's frame.

```svelte
<div class="loom-frame">
  <!-- Content -->
</div>
```

```css
.loom-frame {
  position: relative;
  padding: var(--space-6);
}

.loom-frame::before,
.loom-frame::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-thread-muted);
}

.loom-frame::before {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}

.loom-frame::after {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}
```

---

## Animations

### Thread Animations

```css
@theme {
  --animate-thread-idle: thread-idle 3s ease-in-out infinite;
  --animate-thread-weaving: thread-weaving 1.5s ease-in-out infinite;
  --animate-thread-waiting: thread-waiting 2s ease-in-out infinite;
  --animate-thread-snap: thread-snap 0.5s ease-out forwards;
  --animate-thread-complete: thread-complete 0.6s ease-out forwards;
}
```

| Animation | Duration | Use Case |
|-----------|----------|----------|
| thread-idle | 3s | Subtle pulse for idle states |
| thread-weaving | 1.5s | Horizontal shimmer for loading |
| thread-waiting | 2s | Gentle sway for pending states |
| thread-snap | 0.5s | Error/break effect |
| thread-complete | 0.6s | Completion, knot tie-off |

Always respect `prefers-reduced-motion`.

---

## Components

### Button

```svelte
<!-- Primary -->
<button class="
  px-4 py-2
  font-mono font-bold
  bg-accent text-bg
  rounded-md
  transition-colors duration-200
  hover:bg-accent-hover
">
  Get in Touch
</button>

<!-- Outline -->
<button class="
  px-4 py-2
  font-mono font-bold
  bg-transparent text-fg
  border border-border
  rounded-md
  transition-colors duration-200
  hover:bg-bg-muted
">
  Learn More
</button>
```

### Card

```svelte
<div class="
  bg-bg-muted
  rounded-lg
  p-6
  border border-border-muted
">
  <h3 class="font-mono text-lg font-bold text-fg">Title</h3>
  <p class="font-mono text-fg-muted mt-2">Description</p>
</div>
```

### Link

```svelte
<a class="
  font-mono font-bold
  text-accent
  underline underline-offset-4 decoration-1
  transition-colors duration-200
  hover:text-accent-hover
">
  View Project
</a>
```

---

## Layout

### Container

```svelte
<div class="max-w-4xl mx-auto px-6">
  <!-- Content -->
</div>
```

### Section

```svelte
<section class="py-12 md:py-16">
  <!-- Section content -->
</section>
```

---

## Best Practices

1. **Dark by default** - Design for dark mode first, light mode second
2. **Monospace everywhere** - CommitMono creates consistency
3. **Natural palette** - Use dye-inspired colors purposefully
4. **Thread motifs** - Dividers, frames, and knots add textile character
5. **Minimal shadows** - Flat design with subtle depth
6. **Respect motion** - All animations should honor reduced-motion preferences
