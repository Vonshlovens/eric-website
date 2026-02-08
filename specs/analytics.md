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

- **Provider:** [Plausible Analytics](https://plausible.io) — cookie-free, < 1 KB gzipped
- **Script tag:** single `<script defer>` in `<svelte:head>` of `src/routes/+layout.svelte` with `data-domain="ericevans.dev"`
- **Environment gating:** script conditionally rendered via `{#if analyticsEnabled}` where `analyticsEnabled` reads `PUBLIC_ANALYTICS_ENABLED` from `$env/dynamic/public`
- **Domain lock:** Plausible's `data-domain` attribute restricts tracking to `ericevans.dev`; localhost/dev traffic is automatically ignored (hostname mismatch)
- **SPA navigation:** Plausible's default script tracks History API pushState navigations natively — no `afterNavigate` hook needed
- **No impact on Lighthouse:** script is < 1 KB gzipped, loaded with `defer`, and fetched from Plausible's CDN

## Integration

- Complements [Performance](./performance.md) — analytics script must not degrade Core Web Vitals
- Complements [SEO & Meta](./seo-meta.md) — analytics validates SEO efforts with traffic data

## Accessibility

- Not user-facing; no visual component
- No impact on screen readers or keyboard navigation

## Design Tokens

None — no visual output.
