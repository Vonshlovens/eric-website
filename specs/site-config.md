# Site Configuration — Centralized Identity & URLs

## Summary

Single source of truth for site identity (name, title, domain, email) and social links (GitHub, LinkedIn) used across layouts, components, server routes, and meta tags. Eliminates hardcoded strings scattered across 7+ files and ensures consistency when any value changes.

---

## File

`src/lib/config/site.ts`

---

## Exported Values

### `site` (const object)

| Key | Value | Used By |
|-----|-------|---------|
| `name` | `'Eric Evans'` | Layout meta title, JSON-LD, Hero h1, resume download filename |
| `title` | `'Software Developer'` | Layout meta title, JSON-LD jobTitle, Hero subtitle |
| `domain` | `'ericevans.dev'` | Plausible analytics data-domain, contact form email subject |
| `url` | `'https://ericevans.dev'` | OG/Twitter meta, canonical link, JSON-LD, sitemap baseUrl |
| `email` | `'eric@ericevans.dev'` | ContactCTA mailto link |
| `github.username` | `'Vonshlovens'` | GitHub API calls, Hero avatar URL, Hero display name |
| `github.url` | `'https://github.com/Vonshlovens'` | Navigation View Source CTA, ContactCTA, Interests, JSON-LD sameAs |
| `linkedin.url` | `'https://linkedin.com/in/ericevans'` | ContactCTA, JSON-LD sameAs |

### `avatarUrl` (derived string)

`https://github.com/{username}.png` — used by Hero.svelte for both avatar layers.

---

## Files Updated

| File | What was replaced |
|------|-------------------|
| `src/routes/+layout.svelte` | `analyticsDomain`, `title`, `description`, `url`, `jsonLd` (name, jobTitle, sameAs) |
| `src/routes/+page.server.ts` | `GITHUB_USERNAME`, email subject domain |
| `src/routes/sitemap.xml/+server.ts` | `baseUrl` |
| `src/lib/components/sections/Hero.svelte` | Avatar URLs, display name, GitHub username, title, resume filename |
| `src/lib/components/layout/Navigation.svelte` | View Source href (desktop + mobile) |
| `src/lib/components/sections/ContactCTA.svelte` | mailto, GitHub href, LinkedIn href |
| `src/lib/data/interests.ts` | GitHub profile URL |

---

## Design Decisions

- **`as const`** assertion on the `site` object for literal type inference.
- **Not environment variables** — these are compile-time identity values, not secrets or deploy-time config. Environment variables are reserved for actual secrets (API keys) and feature flags (`PUBLIC_ANALYTICS_ENABLED`).
- **`robots.txt`** is a static file and cannot import TypeScript, so it remains hardcoded. The sitemap URL in robots.txt should be updated manually if the domain changes.
