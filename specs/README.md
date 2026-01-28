# Portfolio Website Specifications

This directory contains comprehensive specifications for the portfolio website built with SvelteKit 2, Svelte 5, Deno, and deployed on Deno Deploy.

## Documents

### Technology Specifications

#### [Svelte 5](./svelte5.md)
- Runes system (`$state`, `$derived`, `$effect`, `$props`)
- Component patterns and best practices
- Migration from Svelte 4
- TypeScript integration
- Performance optimization

#### [SvelteKit 2](./sveltekit2.md)
- File-based routing system
- Data loading patterns (`+page.ts`, `+page.server.ts`)
- API routes and form actions
- Adapters and deployment
- Hooks and page options

#### [Deno](./deno.md)
- Runtime features and security model
- NPM compatibility
- Standard library usage
- Testing and tooling
- SvelteKit integration

#### [Deno Deploy](./deno-deploy.md)
- Deployment strategies
- Environment configuration
- Performance optimization
- Database integration (KV, external)
- Custom domains and monitoring

#### [Tailwind CSS v4](./tailwind-v4.md)
- Installation and setup with SvelteKit
- CSS-first configuration with `@theme`
- Component patterns and utilities
- Dark mode implementation
- Migration from v3

#### [Bits UI](./bits-ui.md)
- Headless component library overview
- Component usage (Dialog, Dropdown, Popover, etc.)
- Accessibility features
- Tailwind integration patterns
- Best practices

### Design Specifications

#### [Style Guide](./style-guide.md)
- Gruvbox color palette (dark and light themes)
- Typography system and font choices
- Spacing and layout principles
- Animation and transition patterns
- Component styling guidelines
- Accessibility standards

#### [Features](./features.md)
- Complete feature breakdown
- Section-by-section specifications
- Component implementations
- Data structures
- Technical architecture
- Performance and accessibility

#### [Skills Marquee](./skills-marquee.md)
- Animated technology showcase component
- Current implementation details
- Planned: Technology logos integration
- Planned: Interactive click-through to project details

## Quick Reference

### Color Palette

**Dark Theme Primary Colors:**
- Background: `#282828`
- Foreground: `#ebdbb2`
- Accent: `#fe8019` (orange)
- Links: `#83a598` (blue)

**Light Theme Primary Colors:**
- Background: `#fbf1c7`
- Foreground: `#3c3836`
- Accent: `#d65d0e` (orange)
- Links: `#458588` (blue)

### Typography

- **Display**: JetBrains Mono (headings, special elements)
- **Body**: iA Writer Quattro, IBM Plex Sans
- **Code**: Cascadia Code, Fira Code

### Project Structure

```
eric-website/
├── src/
│   ├── routes/          # SvelteKit routes
│   ├── lib/             # Components and utilities
│   │   ├── components/  # Reusable components
│   │   └── data/        # Static data
│   ├── app.html         # HTML template
│   └── app.css          # Global styles + Tailwind
├── static/              # Static assets
├── specs/               # This directory
├── deno.json            # Deno configuration
├── svelte.config.js     # SvelteKit configuration
└── vite.config.ts       # Vite configuration
```

### Key Technologies

- **Framework**: SvelteKit 2 with Svelte 5
- **Runtime**: Deno
- **Deployment**: Deno Deploy
- **Styling**: Tailwind CSS v4
- **Components**: Bits UI (headless)
- **Language**: TypeScript

### Development Commands

```bash
# Install dependencies
deno install

# Development server
deno task dev

# Build for production
deno task build

# Preview production build
deno task preview

# Lint code
deno lint

# Format code
deno fmt
```

### Design Principles

1. **Warm Retro-Computing Aesthetic** - Gruvbox colors, terminal inspiration
2. **Purposeful Minimalism** - Clean, focused interfaces
3. **Content-First** - Typography and readability prioritized
4. **Accessibility** - WCAG AA compliance, keyboard navigation
5. **Performance** - Fast, optimized, edge-deployed

### Features Overview

1. **About Me** - Hero section with professional intro
2. **Project Portfolio** - Showcase of technical work
3. **Work Experience** - Career timeline and achievements
4. **Education** - Degrees and certifications
5. **Interests** - Personal hobbies and side projects
6. **Contact** - Multiple ways to connect

## Implementation Checklist

### Phase 1: Foundation
- [x] Set up Deno project with SvelteKit
- [x] Configure Tailwind v4
- [x] Implement Gruvbox theme system
- [x] Create base layout and navigation
- [x] Set up typography styles

### Phase 2: Core Sections
- [x] Build Hero/About section
- [ ] Implement Projects portfolio
- [ ] Create Work Experience timeline
- [ ] Add Education section
- [ ] Build Interests section
- [ ] Implement Contact section

### Phase 3: Polish
- [ ] Add animations and transitions
- [ ] Implement dark/light mode toggle
- [ ] Optimize images and assets
- [ ] Add SEO metadata
- [ ] Test accessibility
- [ ] Performance optimization

### Phase 4: Deployment
- [ ] Configure Deno Deploy adapter
- [ ] Set up environment variables
- [ ] Deploy to Deno Deploy
- [ ] Configure custom domain
- [ ] Set up monitoring

## Resources

### Documentation
- [Svelte 5 Docs](https://svelte.dev/docs/svelte/overview)
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Deno Manual](https://deno.com/manual)
- [Deno Deploy Docs](https://deno.com/deploy/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Bits UI](https://bits-ui.com)

### Design
- [Gruvbox Theme](https://github.com/morhetz/gruvbox)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools
- [Deno Deploy Dashboard](https://dash.deno.com)
- [Svelte Playground](https://svelte.dev/playground)
- [Tailwind Playground](https://play.tailwindcss.com)

## Notes

- All specifications are based on the latest versions as of January 2025
- Gruvbox color scheme provides both dark and light themes
- Headless components (Bits UI) give full styling control
- Architecture supports SPA-style or multi-page approach
- Focus on performance, accessibility, and developer experience

## Questions?

Refer to the individual specification documents for detailed information on each topic. Each spec includes code examples, best practices, and migration notes where applicable.
