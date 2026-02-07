# Analytics

Lightweight, privacy-respecting analytics for tracking page views and visitor engagement.

## Overview

Integrate a minimal analytics solution to measure site traffic without compromising visitor privacy. No cookies, no personal data collection — just aggregate page-view counts and referrer sources.

## Behavior

- **Provider:** self-hosted or privacy-first service (Plausible, Umami, or similar)
- **Script loading:** async `<script>` tag in `app.html` or `+layout.svelte` `<svelte:head>`
- **No cookies:** must not set any cookies or require a consent banner
- **GDPR-compliant:** no personal data stored, no cross-site tracking
- **Tracked events:**
  - Page views (all routes)
  - Referrer source
  - UTM parameters (optional)
- **Excluded:**
  - localhost / development traffic
  - Bot traffic (handled by analytics provider)

## Implementation

- **Script tag:** single `<script>` in `<svelte:head>` of `+layout.svelte`, loaded with `defer` or `async`
- **Environment gating:** only load the script when `PUBLIC_ANALYTICS_ENABLED=true` or equivalent env var
- **Domain lock:** configure the analytics provider to only accept events from `ericevans.dev`
- **SPA navigation:** use provider's built-in SPA mode or hook into SvelteKit `afterNavigate` for client-side route changes
- **No impact on Lighthouse:** script must be < 5 KB gzipped and loaded asynchronously

## Integration

- Complements [Performance](./performance.md) — analytics script must not degrade Core Web Vitals
- Complements [SEO & Meta](./seo-meta.md) — analytics validates SEO efforts with traffic data

## Accessibility

- Not user-facing; no visual component
- No impact on screen readers or keyboard navigation

## Design Tokens

None — no visual output.
