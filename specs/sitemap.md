# Sitemap

Auto-generated XML sitemap for search-engine crawlers.

## Overview

Provide a `/sitemap.xml` endpoint that lists all public routes on the site so search engines can discover and index pages efficiently. Complements the existing SEO & Meta configuration.

## Output

Standard XML Sitemap 0.9 format served at `/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ericevans.dev/</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- additional routes -->
</urlset>
```

## Behavior

- **Endpoint:** SvelteKit server route at `src/routes/sitemap.xml/+server.ts`
- **Content-Type:** `application/xml`
- **Routes included:** all prerendered public pages (homepage, any future sub-pages)
- **`lastmod`:** derived from build date or hardcoded release date
- **`changefreq`:** `monthly` for homepage
- **`priority`:** `1.0` for homepage, `0.8` for secondary pages
- **Prerendered:** yes — static XML generated at build time via `export const prerender = true`

## Integration

- Reference sitemap in `robots.txt`:
  ```
  Sitemap: https://ericevans.dev/sitemap.xml
  ```
- Reference sitemap in `<head>` if desired (optional, not required by most engines)

## Implementation

- **Route file:** `src/routes/sitemap.xml/+server.ts`
- Export a `GET` request handler that returns an XML `Response`
- Maintain a `routes` array of `{ path, priority, changefreq }` objects
- Build XML string from the array
- No external dependencies

## Accessibility

- Not user-facing; consumed only by crawlers
- No visual component

## Design Tokens

None — no visual output.
