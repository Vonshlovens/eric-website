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

## Not Included

- Analytics scripts (Google Analytics, Plausible, etc.) — defer to a separate decision
- `robots.txt` and `sitemap.xml` — can be added later via SvelteKit adapter or static files
- Performance meta tags (`dns-prefetch`, `preconnect` for fonts) — covered in design-system.md font loading
