# SEO & Meta Tags

## Summary

Configure the site's `<head>` metadata for search engine optimization, social sharing previews (Open Graph + Twitter Cards), and foundational web standards. This is a non-visual but essential feature that lives in the SvelteKit layout.

Derived from the "Analytics & SEO" section in `specs/features.md`.

---

## What This Covers

- HTML `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- Canonical URL
- Viewport and charset (already standard in SvelteKit's `app.html`)
- Favicon / site icons
- Optional: structured data (JSON-LD for `Person` schema)

---

## Implementation

### Primary Location

`src/routes/+layout.svelte` — wraps all pages with shared `<svelte:head>` metadata.

```svelte
<svelte:head>
  <title>Eric Evans — Software Developer</title>
  <meta name="description" content="Portfolio of Eric Evans. Software developer specializing in cloud infrastructure, AI/ML, and database systems." />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Eric Evans — Software Developer" />
  <meta property="og:description" content="Portfolio of Eric Evans. Software developer specializing in cloud infrastructure, AI/ML, and database systems." />
  <meta property="og:image" content="/og-image.png" />
  <meta property="og:url" content="https://ericevans.dev" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Eric Evans — Software Developer" />
  <meta name="twitter:description" content="Portfolio of Eric Evans. Software developer specializing in cloud infrastructure, AI/ML, and database systems." />
  <meta name="twitter:image" content="/og-image.png" />

  <!-- Canonical -->
  <link rel="canonical" href="https://ericevans.dev" />

  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/icon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
```

### Per-Page Overrides

If the site adds secondary pages later (blog posts, case studies), each `+page.svelte` can override the layout's `<svelte:head>` with page-specific titles and descriptions.

---

## OG Image

- **Dimensions**: 1200 x 630 px (standard OG size)
- **File**: `static/og-image.png`
- **Content**: Name, title, and site branding on a dark background matching the Threadwork design system palette
- Should look intentional when shared on LinkedIn, Twitter, Discord, Slack, etc.

---

## Favicon

Provide at minimum:

| File | Purpose |
|------|---------|
| `static/favicon.ico` | Legacy browser fallback |
| `static/icon.svg` | Modern browsers (scalable, supports dark mode via CSS `prefers-color-scheme`) |
| `static/apple-touch-icon.png` | iOS home screen icon (180x180) |

---

## Optional: JSON-LD Structured Data

Add a `Person` schema to help search engines understand the site's subject:

```svelte
<svelte:head>
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Eric Evans",
    "jobTitle": "Software Developer",
    "url": "https://ericevans.dev",
    "sameAs": [
      "https://github.com/ericevans",
      "https://linkedin.com/in/ericevans"
    ]
  })}</script>`}
</svelte:head>
```

---

## Prerendering Consideration

Since this is a mostly-static portfolio, SvelteKit's `prerender` option should be enabled so that crawlers receive fully rendered HTML with all meta tags present:

```typescript
// src/routes/+layout.ts
export const prerender = true;
```

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+layout.svelte` | Shared `<svelte:head>` with meta tags |
| `static/og-image.png` | Open Graph share image |
| `static/favicon.ico` | Favicon (legacy) |
| `static/icon.svg` | Favicon (modern) |
| `static/apple-touch-icon.png` | iOS icon |

---

## Implementation Status: DONE

All items implemented:

- **`src/routes/+layout.svelte`**: `<svelte:head>` with title, meta description, Open Graph (og:type/title/description/image/url), Twitter Card (summary_large_image), canonical URL, favicon trio, and JSON-LD Person schema. Values stored in script variables for DRY reuse. OG image URL uses absolute path (`https://ericevans.dev/og-image.png`).
- **`static/og-image.svg`** + **`static/og-image.png`** (1200x630): Updated to V2 Stitch palette (#B80C09 accent, #121212 bg, Fira Code font). PNG generated via `rsvg-convert`.
- **`static/favicon.svg`**: Updated to V2 Stitch palette (#121212 bg, #BFB1C1 text, #B80C09 accent bar).
- **`static/favicon.ico`**: Generated multi-size ICO (16+32) from SVG via ImageMagick.
- **`static/favicon-32.png`**, **`static/favicon-16.png`**: PNG favicon variants referenced by `app.html` manifest.
- **`static/apple-touch-icon.png`** (180x180): Generated from favicon.svg.
- **`static/site.webmanifest`**: Updated theme_color to #B80C09, background_color to #121212.
- **`static/robots.txt`**: Updated sitemap URL to `https://ericevans.dev/sitemap.xml`.
- **`src/app.html`**: Removed duplicate favicon `<link>` tags (now in `<svelte:head>` via layout). Kept manifest link.
- JSON-LD `Person` schema with sameAs links to GitHub (Vonshlovens) and LinkedIn.
- **`<meta name="theme-color">`**: Dynamic theme-color meta tag in `<svelte:head>` that reactively syncs with the dark/light theme toggle via `themeStore.isDark`. Dark mode: `#121212` (page background). Light mode: `#F9F1CB` (warm parchment). Colors the browser address bar / status bar on mobile (Android Chrome, Safari) and PWA window chrome to match the active theme. `themeStore` imported into `+layout.svelte`.
- **Cleanup**: Removed duplicate `SEO.svelte` component and its usage from `+page.svelte`. The layout is the single source of truth for all meta tags — no per-page SEO component needed for a single-page portfolio. Also removed duplicate inline footer from `+page.svelte` (layout already mounts `Footer.svelte`). Deleted orphaned `src/lib/components/SEO.svelte`.

---

## Not Included

- Analytics scripts (Google Analytics, Plausible, etc.) — defer to a separate decision
- `sitemap.xml` — can be added later via SvelteKit adapter or static files
- Performance meta tags (`dns-prefetch`, `preconnect` for fonts) — covered in design-system.md font loading
