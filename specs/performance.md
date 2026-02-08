# Performance Optimization

> **Status: Implemented**

## Overview

Performance guidelines and implementation patterns for the portfolio site. Covers image handling, font loading strategy, code splitting, static prerendering, and caching headers. The goal is a sub-2-second First Contentful Paint on a 3G connection and a Lighthouse Performance score of 90+.

Derived from the "Performance Optimizations" section in `specs/features.md` (lines 670–686), adapted for the V2 SvelteKit + Deno Deploy stack.

## Implementation Summary

- **Static prerendering** enabled via `src/routes/+layout.ts` (`export const prerender = true`). GitHub stats are fetched at build time and baked into static HTML.
- **Image lazy loading**: Engineering log project images use `loading="lazy"` and `decoding="async"`. Hero avatar uses default eager loading with `decoding="async"`.
- **Preconnect hints** added in `src/app.html` for `github.com` and `avatars.githubusercontent.com` (hero avatar origin). Google Fonts preconnect was already present.
- **Caching headers** set via `src/hooks.server.ts`: immutable for hashed JS/CSS bundles, 7-day cache for images, must-revalidate for HTML pages, immutable for self-hosted fonts.
- **Prerender config** in `svelte.config.js`: `handleHttpError` ignores missing placeholder project images.
- **Broken anchor fix**: `#projects` links in nav and hero CTA corrected to `#engineering-log`.
- **Static asset cleanup**: Removed ~89MB of unused files from `static/` — `IMG_6230.png` (87MB unrelated photo), `how-strong-is-saitama-v0-ls463j4fizle1.webp` (44KB unrelated image), and 4 CommitMono font files (1.5MB total, unused — site uses Google Fonts). Empty `static/fonts/` directory removed.
- **Dead code removal**: Deleted 3 orphaned V1 files — `ProjectCard.svelte` (unused component, never imported), `ThemeToggle.svelte` (superseded by inline toggle in Navigation.svelte), and `projects.ts` (superseded by `engineering-log.ts`). Removed unused `svelte-lucide` dependency (only consumer was the deleted ThemeToggle).

---

## Image Optimization

### Format & Sizing

- Serve images in **WebP** (primary) with **JPEG fallback**.
- Generate responsive variants at 2–3 breakpoints (e.g., 400w, 800w, 1200w) for project thumbnails and hero assets.
- Avatar image: a single optimized file at 384px (2x of `size-48`) is sufficient.
- Store all images in `static/images/`.

### Lazy Loading

All images below the fold use native lazy loading:

```html
<img src="/images/project.webp" alt="..." loading="lazy" decoding="async" />
```

- Hero avatar and any above-the-fold content use `loading="eager"` (the default).
- Engineering log project images, education logos, and any other below-fold images use `loading="lazy"`.

### Placeholder Strategy

Use a lightweight CSS placeholder (background color matching `--color-surface`) on image containers so layout doesn't shift as images load. No blur-up or LQIP needed — the grayscale filter already masks load jank.

```svelte
<div class="bg-surface aspect-video">
  <img
    src="/images/project.webp"
    alt="..."
    loading="lazy"
    decoding="async"
    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
  />
</div>
```

---

## Font Loading

### Strategy

Use `font-display: swap` (already set via `&display=swap` in the Google Fonts URL) so text renders immediately with a fallback and swaps in once loaded.

### Preconnect

The design system spec already includes these in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### Subset (Optional)

If bundle size becomes a concern, self-host Inter and Fira Code subsets (latin only) instead of loading from Google Fonts. This eliminates the third-party connection overhead.

---

## Code Splitting

SvelteKit handles route-based code splitting automatically. Additional recommendations:

- **No dynamic imports needed** for a single-page portfolio — all sections load on the index route.
- If a modal or overlay component is added later (e.g., project detail modal), use a dynamic `import()` to defer loading its code.
- Keep component sizes small by co-locating data in `src/lib/data/` files and letting the bundler tree-shake unused exports.

---

## Static Prerendering

The portfolio is entirely static content (no user-specific data, no auth). Prerender everything:

```typescript
// src/routes/+layout.ts
export const prerender = true;
```

This tells SvelteKit to generate static HTML at build time for every route, which Deno Deploy serves directly from the edge with no server-side rendering overhead.

### Exception: GitHub Stats

If the GitHub stats integration (`specs-v2/github-stats.md`) uses `+page.server.ts` to fetch live data, those stats will be fetched at **build time** during prerendering and baked into the HTML. This is acceptable — stats don't need to be real-time. To refresh them, trigger a rebuild (e.g., via a daily cron or on push).

Alternatively, fetch GitHub stats client-side with a `{#await}` block and static fallbacks, preserving full prerendering.

---

## Caching Headers

### Deno Deploy

Configure cache headers for static assets in the SvelteKit adapter or via `hooks.server.ts`:

| Asset Type | Cache-Control |
|------------|---------------|
| HTML pages | `public, max-age=0, must-revalidate` |
| JS/CSS bundles (hashed filenames) | `public, max-age=31536000, immutable` |
| Images (`static/images/`) | `public, max-age=604800` (7 days) |
| Fonts (if self-hosted) | `public, max-age=31536000, immutable` |

SvelteKit's build output already uses content-hashed filenames for JS/CSS, so immutable caching is safe for those.

---

## Critical Rendering Path

- **Inline critical CSS**: SvelteKit injects component styles into the `<head>` during SSR/prerendering, so critical CSS is handled automatically.
- **Defer non-critical JS**: SvelteKit uses `type="module"` and deferred loading by default.
- **Preload hero image**: Add a `<link rel="preload">` for the avatar image since it's above the fold.

```html
<!-- src/app.html -->
<link rel="preload" href="/images/avatar.webp" as="image" type="image/webp" />
```

---

## Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |

Run `npx lighthouse http://localhost:4321 --only-categories=performance` during development to validate.

---

## Tech Stack

- **SvelteKit 2** prerendering (`export const prerender = true`)
- **Deno Deploy** edge serving with static asset caching
- **Native HTML** `loading="lazy"` and `decoding="async"`
- **Google Fonts** with `display=swap` and preconnect
- No additional dependencies (no image processing library needed at build time for V1)

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+layout.ts` | `export const prerender = true` |
| `src/app.html` | Preconnect links (Google Fonts, GitHub avatar) |
| `src/hooks.server.ts` | Cache-Control headers for asset types |
| `svelte.config.js` | Prerender error handling for missing images |
| `src/app.css` | Font-display rules (via Google Fonts URL) |
| `static/images/` | Optimized WebP images |
