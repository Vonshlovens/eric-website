# Dark / Light Theme Toggle

## Summary

Dark/light theme toggle in the navigation bar. Visitors switch between the default dark theme and a warm parchment light theme. Preference persists to `localStorage` and respects `prefers-color-scheme` as the initial default for first-time visitors.

---

## Implementation

### Strategy

- Dark mode is the default; `<html>` gets `class="dark"` when active
- Light mode activates when `.dark` is absent
- Existing `@theme` tokens remain as dark-mode defaults
- Light-mode overrides applied via `html:not(.dark)` in `app.css`
- No component markup changes needed — everything is driven by CSS custom property overrides

### Light Mode Palette

Overrides the existing V2 design system token names in `html:not(.dark)`:

```css
html:not(.dark) {
  --color-primary: #F9F1CB;           /* warm parchment background */
  --color-surface: #EDE5B4;           /* slightly deeper parchment */
  --color-surface-highlight: #E0D89E; /* muted gold */
  --color-accent: #B80C09;            /* unchanged — brand red */
  --color-text-main: #1A1816;         /* near-black text */
  --color-text-muted: #5C5650;        /* medium brown-gray */
  --color-text-white: #1A1816;        /* maps to dark text in light mode */
  --color-border-dim: #C9C0A0;        /* warm tan border */
  --color-status-ok: #4A7C59;         /* lichen green */
}
```

Also overrides scrollbar track/thumb and selection colors for light mode.

### State Management

Svelte 5 rune-based `ThemeStore` class (mirrors `MotionStore` pattern):

```typescript
// src/lib/stores/theme.svelte.ts
class ThemeStore {
  current: Theme = $state('dark');

  get isDark(): boolean { return this.current === 'dark'; }

  toggle() {
    this.current = this.current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.current);
    document.documentElement.classList.toggle('dark', this.current === 'dark');
  }
}
export const themeStore = new ThemeStore();
```

- Reads `localStorage('theme')` on init; falls back to `prefers-color-scheme`
- Listens for OS preference changes (only when no explicit override stored)
- Applies `.dark` class on `<html>` via `classList.toggle`

### Flash Prevention

Blocking inline script in `app.html` `<head>`, before `</head>`:

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    if (t === 'dark') document.documentElement.classList.add('dark');
  })();
</script>
```

### Toggle Button

**Desktop**: Icon button in nav bar, positioned before the animation toggle. Styled identically to the animation toggle (border, hover:border-accent/50, p-2 rounded).

**Mobile**: Labeled menu item in the mobile hamburger menu with Theme label and Dark/Light indicator text, positioned before the animation toggle item.

```svelte
<button
  onclick={() => themeStore.toggle()}
  aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
  <span class="material-symbols-outlined">
    {themeStore.isDark ? 'light_mode' : 'dark_mode'}
  </span>
</button>
```

- Material Symbols `light_mode` (sun) / `dark_mode` (moon) icons
- `aria-label` describes the resulting action, updates dynamically
- Focus ring via global `:focus-visible` styles

---

## Accessibility

- `<button>` with dynamic `aria-label` describing the action
- Focus-visible accent ring (global styles)
- Both themes meet WCAG AA contrast ratios
- Respects `prefers-color-scheme` for first-time visitors
- Theme change is instantaneous (CSS custom property swap), no animation

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/stores/theme.svelte.ts` | ThemeStore class with $state, toggle, localStorage, prefers-color-scheme |
| `src/app.html` | Blocking FOUC-prevention script |
| `src/app.css` | `html:not(.dark)` light-mode token overrides, scrollbar, selection |
| `src/lib/components/layout/Navigation.svelte` | Toggle button (desktop icon + mobile labeled item) |
