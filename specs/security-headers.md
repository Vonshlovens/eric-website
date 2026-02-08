# Security Headers

> **Status: Implemented**

## Overview

HTTP security headers configured in `src/hooks.server.ts` to harden the site against common web attacks (XSS, clickjacking, MIME sniffing, protocol downgrade). All headers are set on every response via the SvelteKit `handle` hook.

## Implementation Summary

Six security headers added to the existing `hooks.server.ts` cache-control logic:

- **Content-Security-Policy (CSP)**: Restricts resource origins — scripts from `'self'` + Plausible, styles from `'self'` + Google Fonts, fonts from `fonts.gstatic.com`, images from `'self'` + GitHub avatar domains. `'unsafe-inline'` required for Svelte component styles and the FOUC-prevention script in `app.html`. `frame-src` and `object-src` set to `'none'`.
- **X-Frame-Options**: `DENY` — prevents the site from being embedded in iframes (clickjacking protection).
- **X-Content-Type-Options**: `nosniff` — prevents browsers from MIME-type sniffing responses.
- **Referrer-Policy**: `strict-origin-when-cross-origin` — sends origin-only referrer for cross-origin requests, full referrer for same-origin.
- **Permissions-Policy**: Disables camera, microphone, geolocation, and payment APIs.
- **Strict-Transport-Security (HSTS)**: `max-age=31536000; includeSubDomains` — forces HTTPS for 1 year including subdomains.

## CSP Directives

| Directive | Value | Reason |
|-----------|-------|--------|
| `default-src` | `'self'` | Fallback — only allow same-origin by default |
| `script-src` | `'self' 'unsafe-inline' https://plausible.io` | App scripts + FOUC script + JSON-LD `{@html}` + Plausible analytics |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | Tailwind + Svelte scoped styles + Google Fonts CSS |
| `font-src` | `'self' https://fonts.gstatic.com` | Self-hosted fonts (if any) + Google Fonts files |
| `img-src` | `'self' https://github.com https://avatars.githubusercontent.com data:` | Local images + GitHub avatar + data URIs |
| `connect-src` | `'self' https://plausible.io` | API calls + Plausible analytics beacon |
| `frame-src` | `'none'` | No iframes needed |
| `object-src` | `'none'` | No plugins/embeds needed |
| `base-uri` | `'self'` | Prevent `<base>` tag injection |
| `form-action` | `'self'` | Contact form submits to same origin only |

### Notes on `'unsafe-inline'`

- **script-src**: Required for the FOUC-prevention inline `<script>` in `app.html` and the `{@html}` JSON-LD injection in `+layout.svelte`. A nonce-based approach would be more restrictive but requires SvelteKit CSP integration (server-generated nonces per request).
- **style-src**: Required because Svelte compiles component styles as inline `<style>` tags and several components use inline `style=` attributes for dynamic values (cursor tracking, scroll progress, animation states).

## Files

| File | Purpose |
|------|---------|
| `src/hooks.server.ts` | All security headers set in the `handle` hook |
