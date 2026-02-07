# Resume Download

## Overview

A downloadable PDF resume accessible from the hero section's "Documentation" CTA and optionally from the work experience section. The resume file is served as a static asset — no generation or API calls required.

---

## Behavior

1. User clicks the "Documentation" CTA button in the hero section (or a dedicated "Download Resume" link in work experience).
2. The browser either:
   - Opens the PDF in a new tab (default `<a>` behavior with `target="_blank"`), or
   - Triggers a direct download (using the `download` attribute).
3. No authentication, gating, or form submission required.

**Chosen approach**: Open in new tab (`target="_blank"`) so the user can preview before saving. The `download` attribute is added as a fallback hint.

---

## Implementation

### Static Asset

Place the resume PDF in the `static/` directory:

```
static/
└── resume.pdf
```

SvelteKit serves files from `static/` at the root path, so the file is accessible at `/resume.pdf`.

### Hero CTA Update

In the hero section, the primary "Documentation" button becomes a link to the resume:

```svelte
<a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  download="Eric_Evans_Resume.pdf"
  class="flex items-center gap-2 rounded bg-fg text-bg px-8 py-3 text-xs font-mono font-bold hover:bg-accent hover:text-fg transition-all uppercase tracking-widest"
>
  <span class="material-symbols-outlined text-[18px]">description</span>
  Resume
</a>
```

- Styled identically to the existing primary CTA from `specs-v2/hero-section.md`.
- `download` attribute suggests a filename for saving.
- `rel="noopener noreferrer"` for security on `target="_blank"`.

### Work Experience Link (Optional)

A small inline link at the top or bottom of the work experience section:

```svelte
<a
  href="/resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  class="text-xs font-mono text-accent hover:text-fg transition-colors uppercase tracking-widest"
>
  Download Full Resume →
</a>
```

---

## File Requirements

| Item | Detail |
|------|--------|
| Format | PDF |
| Filename on server | `resume.pdf` |
| Suggested download name | `Eric_Evans_Resume.pdf` |
| Max file size | Keep under 500 KB for fast loads |
| Location | `static/resume.pdf` |

---

## Accessibility

- The link is a semantic `<a>` element with visible text — screen readers announce it naturally.
- `aria-label` is not required since the visible text ("Resume") is descriptive.
- The `download` attribute provides a clean filename if the user saves directly.

---

## Design System Mapping

No new tokens or visual patterns needed — uses existing CTA button styles from `specs-v2/hero-section.md` and text link styles from `specs-v2/work-experience.md`.

---

## Tech Stack

- Static file served by SvelteKit from `static/`
- No JavaScript logic, API routes, or build-time processing
- No external dependencies

---

## Files

| File | Purpose |
|------|---------|
| `static/resume.pdf` | The resume PDF asset |
| `src/lib/components/sections/Hero.svelte` | Update primary CTA to link to resume |
| `src/lib/components/sections/WorkExperience.svelte` | Optional "Download Resume" link |
