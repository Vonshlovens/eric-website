# Skills Grid — V2

## Summary

A static wrapped grid of skill-tag chips showcasing technologies and tools. Positioned between the Hero section and Skill Radar, it provides a compact visual scan of the full tech stack. Uses the V2 dark design system, accent red, Fira Code typography, and SVG brand-color icons.

**Simplified from V1**: Originally an infinite-scroll dual-row marquee with 4x DOM cloning and continuous CSS animation. Replaced with a static flex-wrap grid per component audit recommendation (Phase 4C) — eliminates 60+ cloned DOM nodes and continuous animation overhead.

---

## Reference

- **Design system**: `specs-v2/design-system.md`

---

## Layout

### Placement

Immediately after the Hero section, before Skill Radar. Full-width dark band that visually separates the hero from the content sections below.

### Structure

```
┌──────────────────────────────────────────────────┐
│  [Python] [JavaScript] [TypeScript] [Svelte] ... │
│  [Docker] [Kubernetes] [Tailwind] [RabbitMQ] ... │
└──────────────────────────────────────────────────┘
```

- Single `flex-wrap` container with centered chips
- Constrained to `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8` matching other sections
- Wraps naturally across breakpoints

---

## Visual Design

### Section Background

- Background: `bg-primary` (`#121212`) — continuous with the page
- Vertical padding: `py-8`

### Skill Chips

| Property | Value |
|----------|-------|
| Font | `font-mono` (Fira Code) |
| Font size | `text-xs` mobile, `text-sm` desktop |
| Text transform | `uppercase` |
| Letter spacing | `tracking-wider` |
| Text color | `text-text-main` (`#BFB1C1`) |
| Background | `bg-surface` (`#1E1E1E`) |
| Border | `1px solid` `border-dim` (`#333333`) |
| Border radius | `rounded` (4px) |
| Padding | `py-2 px-4` mobile, `py-2.5 px-5` desktop |

#### SVG Icons

Each chip has a technology-specific SVG icon (14px mobile / 16px desktop) before the text. Icons are monochrome `text-muted` (#888888) by default and transition to the technology's brand color on chip hover (200ms ease). Icon data in `src/lib/data/skill-icons.ts`.

Fallback for skills without an icon entry: small accent-colored dot (`w-1.5 h-1.5 rounded-full bg-accent`).

#### Hover State

```
hover:border-accent/30
hover:bg-surface-highlight
transform: translateY(-2px)
transition: all 200ms ease
```

---

## Skills Data

```typescript
const skills: string[] = [
  'Python', 'JavaScript', 'TypeScript', 'Svelte', 'Deno',
  'Node', 'Go', 'Azure', 'GCP', 'Terraform',
  'Docker', 'Kubernetes', 'Tailwind', 'RabbitMQ', 'FastAPI',
  'Bun', 'LLMs', 'PostgreSQL', 'Redis', 'Git'
];
```

20 skills displayed in a single wrapped grid (no row splitting).

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (`< md`) | Chips use `text-xs`, `py-2 px-4`. Gap `gap-2`. |
| Desktop (`>= md`) | Chips use `text-sm`, `py-2.5 px-5`. Gap `gap-3`. |

No layout shift — chips wrap naturally at all widths.

---

## Accessibility

- `aria-label="Technical Skills"` on the section
- `aria-hidden="true"` on decorative SVG icons
- `use:scrollReveal` for entrance animation (respects reduced-motion)
- No continuous animation — inherently accessible

---

## Component Structure

```
src/lib/components/
└── SkillsMarquee.svelte     # Static skills grid component
```

Single component, 42 lines.

---

## Future Phases

- **Phase 2**: Click-to-expand modal with technology description, experience level, and linked projects (use `bits-ui` Dialog)
