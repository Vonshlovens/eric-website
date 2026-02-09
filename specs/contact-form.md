# Contact Form

## Overview

A lightweight contact form triggered by the Contact CTA button ("./connect"). Opens as a modal overlay on top of the page. Visitors fill out name, email, and message fields, which are submitted via a SvelteKit form action. On success the modal shows a confirmation state; on error it shows a retry prompt.

This feature extends the Contact CTA section (specs-v2/contact-cta.md) by giving the primary CTA button something to open, rather than just linking to a mailto.

Derived from the contact form described in `specs/features.md` (Section 6: Contact Info), adapted to the Threadwork design system and the system-monitor aesthetic.

---

## Layout

```
┌──────────────────────────────────────────┐
│  ░░░░░ page content (dimmed) ░░░░░░░░░░  │
│                                          │
│     ┌──────────────────────────────┐     │
│     │  [X]                close    │     │
│     │                              │     │
│     │  > init_contact.sh           │     │
│     │                              │     │
│     │  Name ___________________    │     │
│     │  Email __________________    │     │
│     │  Message                     │     │
│     │  ┌──────────────────────┐    │     │
│     │  │                      │    │     │
│     │  │                      │    │     │
│     │  └──────────────────────┘    │     │
│     │                              │     │
│     │  [ Send Transmission ]       │     │
│     │                              │     │
│     └──────────────────────────────┘     │
│                                          │
└──────────────────────────────────────────┘
```

---

## Elements

### 1. Modal Backdrop

A semi-transparent overlay that dims the page content.

- `fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm`
- Clicking the backdrop closes the modal.

### 2. Modal Panel

A centered card containing the form.

- `bg-bg-muted border border-border-muted rounded-lg max-w-lg w-full mx-4 p-8`
- Vertically and horizontally centered using flex.
- Entrance animation: fade + scale up from 95% (respects `prefers-reduced-motion`).

### 3. Terminal Prompt Line

A small decorative shell-command line above the form fields.

```svelte
<div class="font-mono text-accent text-sm mb-6"> &gt; init_contact.sh</div>
```

### 4. Close Button

Top-right corner of the modal panel. Uses a Material Symbols `close` icon.

```svelte
<button
  onclick={closeModal}
  class="absolute top-4 right-4 text-fg-muted hover:text-fg transition-colors"
  aria-label="Close contact form"
>
  <span class="material-symbols-outlined">close</span>
</button>
```

### 5. Form Fields

Three fields, each styled to match the system-monitor aesthetic:

| Field   | Type       | Required | Validation                    |
|---------|------------|----------|-------------------------------|
| Name    | `text`     | Yes      | Non-empty, max 100 chars      |
| Email   | `email`    | Yes      | Valid email format             |
| Message | `textarea` | Yes      | Non-empty, max 2000 chars     |

Field styling:

```svelte
<label class="block mb-4">
  <span class="text-fg-muted text-xs font-mono uppercase tracking-widest mb-1 block">Name</span>
  <input
    type="text"
    name="name"
    required
    maxlength="100"
    class="w-full bg-bg border border-border-muted rounded px-4 py-3 font-mono text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none transition-colors"
    placeholder="Jane Doe"
  />
</label>
```

- Labels are small, uppercase, mono, muted — matching the section-label style from the Engineering Log.
- Inputs use `bg-bg` (darkest background), `border-border-muted`, with accent border on focus.
- Textarea uses `rows="5"` and `resize-none`.

### 6. Submit Button

Full-width accent button at the bottom of the form.

```svelte
<button
  type="submit"
  disabled={submitting}
  class="w-full flex items-center justify-center rounded bg-accent text-bg h-12 text-xs font-mono font-bold tracking-[0.2em] transition-all hover:bg-fg hover:text-bg uppercase disabled:opacity-50 disabled:cursor-not-allowed"
>
  {submitting ? 'Transmitting...' : 'Send Transmission'}
</button>
```

- Matches the CTA button style from contact-cta.md.
- Shows a loading state while submitting.

### 7. Validation Errors

Inline error messages below each field.

```svelte
{#if errors.email}
  <p class="text-error text-xs font-mono mt-1">{errors.email}</p>
{/if}
```

- Uses `text-error` (Madder Red / `#A0522D` or similar warm error color from Threadwork palette).
- Only shown after first submission attempt or on blur.

### 8. Success State

After successful submission, the form is replaced by a confirmation message:

```svelte
<div class="text-center py-8">
  <span class="material-symbols-outlined text-success text-5xl mb-4">check_circle</span>
  <h3 class="text-fg font-mono font-bold text-xl mb-2">Transmission Received</h3>
  <p class="text-fg-muted font-mono text-sm">Response time: &lt; 24h</p>
</div>
```

### 9. Error State

If the server returns an error, show a message with a retry option:

```svelte
<div class="text-center py-4">
  <p class="text-error font-mono text-sm mb-4">Transmission failed. Please try again.</p>
  <button onclick={retry} class="text-accent font-mono text-sm underline">Retry</button>
</div>
```

---

## Server-Side Handling

### Form Action

A SvelteKit form action at `src/routes/+page.server.ts` (or a dedicated API route) handles form submissions.

```typescript
// src/routes/+page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
  contact: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();

    // Server-side validation
    if (!name || !email || !message) {
      return fail(400, { error: 'All fields are required.' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fail(400, { error: 'Invalid email address.' });
    }

    // Send email via service (Resend, SendGrid, etc.)
    // For MVP: log to console or store in a simple backend
    try {
      // await sendEmail({ name, email, message });
      return { success: true };
    } catch {
      return fail(500, { error: 'Failed to send message.' });
    }
  }
};
```

### Spam Protection

Two layers of protection prevent abuse:

**1. Honeypot field** — A hidden `website` input field is rendered off-screen (`absolute -left-[9999px]`, `aria-hidden="true"`, `tabindex="-1"`). Humans never see or fill it; bots auto-fill all visible fields. If the field has a value on submission, the server silently returns `{ success: true }` to avoid revealing the detection mechanism.

**2. In-memory rate limiter** — Tracks submissions per client IP using `getClientAddress()`. Max 3 submissions per 15-minute sliding window. Returns `fail(429)` with `'Too many submissions. Please try again later.'` when exceeded. Uses a `Map<string, { count, resetAt }>` with a periodic cleanup interval (`setInterval` at the window duration) to prune expired entries and prevent unbounded memory growth.

### Email Service

Email delivery uses **Resend** (`resend` npm package). Configuration via environment variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key (from https://resend.com) |
| `CONTACT_EMAIL_TO` | Yes | Recipient email for form submissions |
| `RESEND_FROM_EMAIL` | No | Verified sender address (defaults to `onboarding@resend.dev`) |

When `RESEND_API_KEY` or `CONTACT_EMAIL_TO` are not set, the form action returns a `503` failure with an informative error message directing the user to alternative contact methods (email or GitHub). PII (name, email, message) is never written to server logs. See `.env.example` for all environment variables.

---

## Interaction Flow

1. User clicks "./connect" button in the Contact CTA section.
2. Modal fades in with backdrop.
3. Focus is trapped inside the modal (keyboard accessibility).
4. User fills out form and clicks "Send Transmission."
5. Client-side validation runs first; errors shown inline.
6. On valid submission, form is submitted via SvelteKit `use:enhance`.
7. Loading state shown on button.
8. On success: form replaced with confirmation message; modal auto-closes after 3 seconds (or user clicks close).
9. On error: error message shown with retry option.
10. User can close modal at any time via X button, Escape key, or backdrop click.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (`< sm`) | Modal takes near-full width (`mx-4`), slightly reduced padding |
| Tablet+ (`sm+`) | Modal centered at `max-w-lg` |

The modal is always vertically centered in the viewport.

---

## Accessibility

- Modal uses `role="dialog"` and `aria-modal="true"`.
- `aria-labelledby` points to the terminal prompt line or a visually hidden heading.
- Focus is trapped within the modal while open (tab cycling).
- Escape key closes the modal.
- Focus returns to the CTA button when modal closes.
- All form fields have associated `<label>` elements.
- Error messages are linked via `aria-describedby`.
- Submit button has `aria-disabled` when in loading state.
- Success/error announcements use `aria-live="polite"`.

---

## Tech Stack

- **SvelteKit 2** form actions (`use:enhance` for progressive enhancement)
- **Svelte 5** runes for modal open state, form state, errors
- **Bits UI** `Dialog` primitives (Root, Portal, Overlay, Content, Title, Close) for accessible modal with built-in focus trapping, Escape key handling, outside-click dismissal, scroll lock, and ARIA attributes
- **Tailwind v4** utility classes
- **Material Symbols** for icons (close, check_circle)

---

## Files

| File | Purpose |
|------|---------|
| `src/lib/components/ContactForm.svelte` | Modal + form component |
| `src/lib/components/sections/ContactCTA.svelte` | Updated CTA button to open modal (was mailto link) |
| `src/routes/+page.server.ts` | SvelteKit form action (`?/contact`) for handling submission |
| `src/routes/+page.svelte` | Imports ContactForm, passes open state from CTA click |
| `src/routes/+page.ts` | Disables prerender for page (required for form actions) |

---

## Implementation Notes

- **CTA Trigger**: The `./connect` button in ContactCTA was converted from `<a href="mailto:...">` to a `<button>` with an `onconnect` callback prop. The component exposes `getTriggerEl()` for focus return.
- **Prerender**: `src/routes/+page.ts` exports `prerender = false` to override the layout-level `prerender = true`, since form actions require server-side handling.
- **Email Delivery**: The `contact` form action uses Resend (`resend` npm package) to send emails when `RESEND_API_KEY` and `CONTACT_EMAIL_TO` environment variables are set. When unconfigured, the action returns `fail(503)` with an error message directing the user to alternative contact methods — PII is never logged. Optional `RESEND_FROM_EMAIL` overrides the sender address (defaults to `onboarding@resend.dev`). Emails include the visitor's email as `replyTo`. All server env vars accessed via `$env/dynamic/private`.
- **Validation**: Client-side validation runs on submit (and on blur after first attempt). Server-side validation mirrors the same rules as a fallback.
- **Focus Management**: Bits UI Dialog handles focus trapping automatically (Tab cycling, initial focus, Escape to close). Focus returns to CTA button on close via `onOpenChange` callback with `triggerEl?.focus()`.
- **Bits UI Dialog**: Modal uses `Dialog.Root` with `open`/`onOpenChange` for controlled state, `Dialog.Portal` for rendering outside component DOM, `Dialog.Overlay` for backdrop, `Dialog.Content` for the modal panel (with built-in focus trap, Escape dismiss, outside-click dismiss), `Dialog.Title` for accessible labeling, and `Dialog.Close` for the close button. `onInteractOutside` prevents closing during form submission.
- **z-index**: Modal uses `z-[80]` to sit below keyboard shortcuts modal (`z-[90]`) but above all page content.
- **Animation**: `modal-enter` CSS class with `@keyframes modal-in` lives in `app.css` (global) because `Dialog.Portal` renders content outside the component's scoped CSS boundary.
- **Toast Integration**: On successful submission, a success toast ("Message sent successfully.") is fired via `addToast` from `$lib/stores/toast.svelte`. On failure, an error toast with the server error message is fired. Toasts provide persistent feedback that survives the modal auto-close, supplementing the in-modal success/error states.
- **Spam Protection**: Two server-side defenses: (1) Honeypot hidden `website` field that bots auto-fill — server silently accepts to avoid revealing detection. (2) Per-IP rate limiter (3 submissions / 15 min window) using in-memory Map with periodic cleanup. Rate limit errors surface as a 429 failure with user-friendly message.
