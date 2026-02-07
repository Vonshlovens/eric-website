# Keyboard Shortcuts

Global keyboard shortcuts with a discoverable help modal matching the V2 Stitch system-monitor aesthetic.

## Overview

Provide power-user keyboard navigation for the portfolio site. A `?` keypress opens a help modal listing all available shortcuts. Shortcuts cover section navigation, theme toggle, animation toggle, and modal dismiss. Styled as a terminal reference card.

## Shortcuts

| Key | Action |
|-----|--------|
| `?` | Open/close shortcuts help modal |
| `Escape` | Close any open modal |
| `t` | Toggle dark/light theme |
| `m` | Toggle motion/animations |
| `1`–`7` | Jump to section (1 = Hero, 2 = Core Competencies, 3 = Engineering Log, 4 = Work Experience, 5 = Education, 6 = Interests, 7 = Contact) |
| `h` | Scroll to top (Home) |

## Help Modal

### Layout

```
┌──────────────────────────────────────────┐
│  KEYBOARD_SHORTCUTS          [ESC] ✕     │
│ ─────────────────────────────────────    │
│  ?         Open this help modal          │
│  t         Toggle theme                  │
│  m         Toggle motion                 │
│  1-7       Jump to section               │
│  h         Scroll to top                 │
│  Esc       Close modal                   │
└──────────────────────────────────────────┘
```

- Centered overlay with `bg-primary/80` backdrop blur (`backdrop-blur-sm`)
- Modal card: `bg-surface`, `border border-border-dim`, `rounded-lg`, `max-w-md`, `p-6`
- Title: `font-mono text-sm uppercase tracking-widest text-text-muted`
- Divider: `border-border-dim`
- Key column: `font-mono text-accent` inline `kbd` elements with `bg-primary border border-border-dim rounded px-2 py-0.5`
- Description column: `font-mono text-sm text-text-main`
- Close button: top-right `✕`, `text-text-muted hover:text-text-main`

### Behavior

- **Open:** press `?` anywhere (suppressed when focus is inside an `<input>`, `<textarea>`, or `[contenteditable]`)
- **Close:** press `Escape` or click backdrop or click `✕`
- **Focus trap:** Tab cycles within the modal while open; focus moves to close button on open
- **Entry animation:** fade in + scale from 95% → 100% (150ms ease-out)
- **Exit animation:** fade out + scale to 95% (100ms ease-in)
- **Reduced motion:** opacity-only transitions, no scale

## Implementation

- **Component:** `src/lib/components/ui/KeyboardShortcuts.svelte`
- **Action:** `src/lib/actions/keyboardShortcuts.ts` — `svelte:window` `on:keydown` handler
  - Check `event.target` to skip when inside form fields
  - Import theme and motion stores to call their toggle functions
  - Use `document.querySelector` with section IDs for number-key navigation
  - `scrollIntoView({ behavior: 'smooth' })` for section jumps
- **Mount point:** render `<KeyboardShortcuts />` once in `+layout.svelte`
- **State:** local `$state` boolean for modal open/closed (no store needed)

## Accessibility

- Modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title
- Close button has `aria-label="Close keyboard shortcuts"`
- Focus trapped within modal while open
- `Escape` always closes
- Shortcuts are suppressed when typing in form fields
- Respects `prefers-reduced-motion` and `data-reduce-motion`

## Responsive

- On mobile (`< md`): modal goes full-width with `inset-x-4`, no keyboard shortcuts active (touch devices)
- On desktop: centered `max-w-md` card
- Hide the `?` hint indicator on mobile (shortcuts are desktop-only)

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-primary` | Backdrop overlay (with /80 opacity) |
| `bg-surface` | Modal card background |
| `border-border-dim` | Modal border, divider, kbd borders |
| `text-text-main` | Description text |
| `text-text-muted` | Title, close button default |
| `text-accent` | Key labels |
| `font-mono` | All modal text |
