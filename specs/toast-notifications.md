# Toast Notifications

Ephemeral notification toasts matching the V2 Stitch system-monitor aesthetic.

## Overview

Provide a reusable toast/notification system for transient user feedback — form submissions, errors, clipboard copy confirmations, etc. Toasts appear briefly, then auto-dismiss. Styled as terminal-output cards to match the site's system-monitor design language.

## Layout

- **Position:** fixed bottom-right (`bottom-6 right-6`), stacked vertically with `gap-3`
- **Z-index:** above all content (`z-50`)
- **Max visible:** 3 toasts at once; oldest dismissed when limit exceeded

## Toast Anatomy

```
┌──────────────────────────────────────┐
│ ● STATUS: Message text here      ✕  │
└──────────────────────────────────────┘
```

- Left accent border (4px) colored by variant
- Small status dot (colored by variant) before the label
- Uppercase mono label (`STATUS:`, `ERROR:`, `INFO:`)
- Message text in `text-text-main`, `font-mono text-sm`
- Dismiss button (`✕`) on the right, keyboard-focusable

## Variants

| Variant   | Accent Color       | Label      | Dot Color          |
|-----------|--------------------|------------|--------------------|
| `success` | `status-ok` green  | `STATUS:`  | `status-ok` green  |
| `error`   | `text-accent` red  | `ERROR:`   | `text-accent` red  |
| `info`    | `text-text-muted`  | `INFO:`    | `text-text-muted`  |

## Behavior

- **Auto-dismiss:** 4 seconds by default (configurable per toast)
- **Hover pause:** timer pauses while the user hovers the toast
- **Manual dismiss:** click the `✕` button or press `Escape` while focused
- **Entry animation:** slide in from right + fade in (`translateX(100%) → 0`, `opacity 0 → 1`, 200ms ease-out)
- **Exit animation:** fade out + slide right (`opacity 1 → 0`, `translateX(100%)`, 150ms ease-in)
- **Reduced motion:** instant show/hide (no slide, opacity-only if any)

## Implementation

- **Component:** `src/lib/components/ui/ToastContainer.svelte`
- **Store:** `src/lib/stores/toast.svelte.ts`
  - Svelte 5 runes (`$state` array of toast objects)
  - `addToast({ variant, message, duration? })` — push a new toast
  - `dismissToast(id)` — remove by ID
  - Each toast gets a unique ID (`crypto.randomUUID()`)
- **Mount point:** render `<ToastContainer />` once in `+layout.svelte`
- **Usage:** import `{ addToast }` from the store anywhere in the app

## Accessibility

- Toast container has `role="status"` and `aria-live="polite"` for screen-reader announcements
- Error toasts use `aria-live="assertive"`
- Dismiss button has `aria-label="Dismiss notification"`
- Focus does not auto-move to toasts (non-intrusive)
- Respects `prefers-reduced-motion` and `data-reduce-motion`

## Responsive

- On mobile (`< md`): full-width toasts, positioned `bottom-4 inset-x-4`
- On desktop: max-width `24rem`, bottom-right corner

## Design Tokens

| Token | Usage |
|-------|-------|
| `bg-surface` | Toast background |
| `border-border-dim` | Toast border |
| `text-text-main` | Message text |
| `text-text-muted` | Info variant accent |
| `text-accent` | Error variant accent |
| `status-ok` | Success variant accent |
| `font-mono` | All toast text |
