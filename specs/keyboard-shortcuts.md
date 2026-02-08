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

- **Component:** `src/lib/components/ui/KeyboardShortcuts.svelte` — all-in-one component with `svelte:window onkeydown` handler for global shortcuts and Bits UI Dialog for the help modal
  - **Bits UI Dialog:** Uses `Dialog.Root` (bind:open), `Dialog.Portal`, `Dialog.Overlay`, `Dialog.Content`, `Dialog.Title`, `Dialog.Close` for accessible modal with built-in focus trapping, Escape key handling, outside-click dismissal, scroll lock, and ARIA attributes
  - Global shortcuts (`?`, `t`, `m`, `h`, `1-7`) handled by `svelte:window onkeydown` — only fires when modal is closed (when open, Bits UI handles Escape/Tab)
  - Check `event.target` tagName/contentEditable to skip when inside form fields
  - Import `themeStore` and `motionStore` to call their `.toggle()` methods
  - Use `document.getElementById` with section IDs for number-key navigation (`about`, `competencies`, `engineering-log`, `experience`, `education`, `interests`, `contact`)
  - `scrollIntoView({ behavior: 'smooth' })` for section jumps, `'auto'` when motion disabled
  - `globalThis.window.scrollTo({ top: 0 })` for `h` key home
- **Mount point:** render `<KeyboardShortcuts />` once in `+layout.svelte`
- **State:** local `$state` boolean for modal open/closed, bound to `Dialog.Root` via `bind:open`
- **Section IDs added:** `id="competencies"` on CoreCompetencies, `id="interests"` on Interests (previously missing)
- **Animation:** `modal-enter` CSS class lives in `app.css` (global) because `Dialog.Portal` renders content outside the component's scoped CSS boundary

## Accessibility

- Bits UI Dialog automatically provides `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linking Content to Title
- Close button has `aria-label="Close keyboard shortcuts"`
- Focus trapped within modal while open (Bits UI built-in)
- `Escape` always closes (Bits UI built-in)
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
