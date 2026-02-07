# Robots.txt

Static robots.txt file for search-engine crawler directives.

## Overview

Serve a `/robots.txt` file that tells web crawlers which parts of the site they may access. Works alongside the XML Sitemap to guide search-engine indexing.

## Output

Standard robots.txt format served at `/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://ericevans.dev/sitemap.xml
```

## Behavior

- **Endpoint:** static file at `static/robots.txt` (served automatically by SvelteKit)
- **Content-Type:** `text/plain`
- **Allow all agents:** single `User-agent: *` rule with `Allow: /`
- **Sitemap reference:** absolute URL pointing to the XML sitemap
- **Disallow patterns:** none — all public routes are indexable
- **No crawl-delay:** omit `Crawl-delay` to let engines use their own defaults

## Implementation

- **File:** `static/robots.txt`
- Plain text, no build step required
- SvelteKit serves everything in `static/` at the site root automatically
- Update the `Sitemap:` line if the domain changes

## Integration

- Complements [Sitemap](./sitemap.md) — crawlers discover the sitemap URL here
- Complements [SEO & Meta](./seo-meta.md) — together they form the full SEO baseline

## Accessibility

- Not user-facing; consumed only by crawlers
- No visual component

## Design Tokens

None — no visual output.
