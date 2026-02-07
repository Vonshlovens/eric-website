# Portfolio Website Specifications

Comprehensive specifications for the portfolio website built with SvelteKit 2, Svelte 5, Deno, and deployed on Deno Deploy. Design language follows the stitch.html aesthetic — system-monitor theme, red accent (#B80C09), Inter + Fira Code typography, dark-first.

## Technology Stack

#### [Svelte 5](./svelte5.md)
- Runes system (`$state`, `$derived`, `$effect`, `$props`)
- Component patterns and best practices
- Migration from Svelte 4
- TypeScript integration

#### [SvelteKit 2](./sveltekit2.md)
- File-based routing system
- Data loading patterns (`+page.ts`, `+page.server.ts`)
- API routes and form actions
- Adapters and deployment

#### [Deno](./deno.md)
- Runtime features and security model
- NPM compatibility
- Standard library usage
- Testing and tooling

#### [Deno Deploy](./deno-deploy.md)
- Deployment strategies (GitHub integration, deployctl, Actions)
- Environment configuration
- Performance optimization and edge caching
- Database integration (KV, external)

#### [Tailwind CSS v4](./tailwind-v4.md)
- CSS-first configuration with `@theme`
- Vite plugin setup with SvelteKit
- Dark mode, container queries, custom animations
- Migration from v3

#### [Bits UI](./bits-ui.md)
- Headless, accessible component primitives
- Dialog, Dropdown, Popover, Tabs, Select, etc.
- Data-attribute styling with Tailwind
- Keyboard navigation and ARIA

## Design System

#### [Design System](./design-system.md)
- Stitch.html color palette (red accent #B80C09, dark-first)
- Typography: Inter (body) + Fira Code (mono)
- Material Symbols icons, custom scrollbar, selection styles
- Tailwind v4 `@theme` token definitions

## Page Sections

#### [Navigation](./navigation.md)
- Sticky header with brand, status indicator, nav links, CTA
- Mobile hamburger menu with focus trapping

#### [Hero Section](./hero-section.md)
- Two-column layout: avatar + name / terminal stats panel
- Stat cards, CTAs, GitHub identity reveal

#### [Core Competencies](./core-competencies.md)
- 3-column card grid (Cloud, AI, Databases)
- Icon boxes with hover effects

#### [Engineering Log](./engineering-log.md)
- Horizontal project cards with problem/learnings/tech narrative
- Category badges, grayscale-to-color image hover

#### [Work Experience](./work-experience.md)
- Vertical timeline with accent dots
- Job cards with title, company, duration, duties, tech tags

#### [Education](./education.md)
- 2-column grid of degree and certification cards
- Category badges and credential links

#### [Skills Marquee](./skills-marquee.md)
- Dual-row animated marquee scrolling in opposite directions
- Skill chips with accent dots, edge fades, reduced-motion fallback

#### [Interests](./interests.md)
- "Beyond Code" section with 3-column hobby card grid
- Material Symbols icons, optional links

#### [Contact CTA](./contact-cta.md)
- Full-width "Initialize Protocol?" banner
- Primary CTA button, social icon links, dot-grid texture

#### [Footer](./footer.md)
- Minimal dark footer with branding, copyright, version
- Decorative latency/status indicator

## Interactive Features

#### [Avatar Hover Reveal](./avatar-hover-reveal.md)
- Cursor-proximity circular mask revealing GitHub identity
- Feathered edge, mobile-disabled, reduced-motion fallback

#### [Card-Stack Scroll](./card-stack-scroll.md)
- Full-viewport pinned section with cards stacking on scroll
- Mobile-disabled, reduced-motion fallback

#### [Contact Form](./contact-form.md)
- Modal form: name/email/message with client-side validation
- SvelteKit form action backend, focus trapping

#### [Skill Radar Chart](./skill-radar.md)
- Interactive SVG radar chart (5-7 skill categories)
- Hover tooltips, draw-in animation, screen-reader fallback table

## Accessibility & UX

#### [Accessibility](./accessibility.md)
- WCAG 2.1 AA standards
- Skip-to-content, focus-visible, ARIA, keyboard navigation

#### [Animation Toggle](./animation-toggle.md)
- Nav-bar toggle to disable all animations
- Respects `prefers-reduced-motion`, persists to localStorage

#### [Theme Toggle](./theme-toggle.md)
- Dark/light mode with warm parchment light palette
- Svelte store, localStorage, FOUC prevention

#### [Scroll Animations](./scroll-animations.md)
- Intersection Observer `use:scrollReveal` action
- Fade-up entrance, staggered grid children, CSS-only transitions

## Technical & SEO

#### [Performance](./performance.md)
- Static prerendering, image lazy loading, WebP
- Font preconnect/preload, caching headers, Lighthouse 90+ target

#### [GitHub Stats](./github-stats.md)
- Live GitHub API via `+page.server.ts`
- Repo count, commit count, account age with static fallbacks

#### [Resume Download](./resume-download.md)
- Static PDF from `/static/resume.pdf`
- Hero CTA link, optional work-experience section link

#### [SEO & Meta](./seo-meta.md)
- Open Graph, Twitter Cards, favicon
- JSON-LD structured data

#### [Robots.txt](./robots-txt.md)
- Static `robots.txt` with `User-agent: *` Allow all
- Sitemap directive pointing to `/sitemap.xml`

## Error Pages

#### [404 Page](./404-page.md)
- Custom system-monitor themed 404 page
- Terminal-style error message with dynamic path
- "Return to Index" CTA, dot-grid texture

## Quick Reference

### Key Technologies
| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 2 + Svelte 5 (runes) |
| Runtime | Deno |
| Deployment | Deno Deploy (edge) |
| Styling | Tailwind CSS v4 (CSS-first) |
| Components | Bits UI (headless) |
| Icons | Material Symbols (outlined, 400) |
| Language | TypeScript |

### Development Commands
```bash
deno install        # Install dependencies
deno task dev       # Development server
deno task build     # Build for production
deno task preview   # Preview production build
deno lint           # Lint code
deno fmt            # Format code
```

### Project Structure
```
eric-website/
├── src/
│   ├── routes/          # SvelteKit file-based routes
│   ├── lib/
│   │   ├── components/  # Reusable Svelte components
│   │   └── data/        # Static data
│   ├── app.html         # HTML template
│   └── app.css          # Global styles + Tailwind @theme
├── static/              # Static assets (resume, favicon, images)
├── specs/               # This directory
├── deno.json            # Deno configuration + import map
├── svelte.config.js     # SvelteKit configuration
└── vite.config.ts       # Vite configuration
```
