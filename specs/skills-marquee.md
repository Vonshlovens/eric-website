# Skills Marquee — V2

## Summary

An animated dual-row marquee showcasing technologies and tools. Positioned between the Hero section and Core Competencies, it provides a dynamic visual scan of the full tech stack. Adapts the original `specs/skills-marquee.md` to the V2 dark design system, accent red, and Fira Code typography.

---

## Reference

- **Original spec**: `specs/skills-marquee.md`
- **Design system**: `specs-v2/design-system.md`
- **stitch.html**: Hero section skill badges (Cloud Infra, AI Engineer, DB Admin) inform the category groupings but the marquee is a separate, full-width component below the hero

---

## Layout

### Placement

Immediately after the Hero section, before Core Competencies. Full-width dark band that visually separates the hero from the content sections below.

### Structure

```
┌──────────────────────────────────────────────────┐
│  ← ← ← Row 1 (first 10 skills, scrolls left)   │
│  → → → Row 2 (remaining skills, scrolls right)  │
└──────────────────────────────────────────────────┘
```

- Two horizontal rows scrolling in opposite directions
- Each row contains skill chips duplicated 4× for seamless infinite loop
- Fade-out gradient overlays on left and right edges

---

## Visual Design

### Section Background

- Background: `bg-primary` (`#121212`) — continuous with the page
- Optional subtle dot-grid or grid-line texture at low opacity for visual texture (reuse pattern from Contact CTA if implemented)

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

#### Accent Dot

Each chip has a small colored dot before the text:

```html
<span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
```

The dot is always `bg-accent` (`#B80C09`).

#### Hover State

```
hover:border-accent/30
hover:bg-surface-highlight
transform: translateY(-2px)
transition: all 200ms ease
```

Subtle glow on hover is optional — a `box-shadow: 0 0 8px rgba(184, 12, 9, 0.15)` adds depth without being distracting.

### Edge Fade

Gradient overlays on both ends of each row to create seamless scroll illusion:

```css
/* Left fade */
background: linear-gradient(to right, #121212, transparent);

/* Right fade */
background: linear-gradient(to left, #121212, transparent);
```

Width: `w-16` (64px) on mobile, `w-24` (96px) on desktop.

---

## Animation

### Keyframes

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-25%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-25%); }
  100% { transform: translateX(0); }
}
```

- Duration: `30s`
- Timing: `linear`
- Iteration: `infinite`
- Row 1 uses `marquee` (scrolls left)
- Row 2 uses `marquee-reverse` (scrolls right)

### Pause on Hover

Animation pauses when the user hovers over the marquee section. Apply via `group-hover:[animation-play-state:paused]` or equivalent CSS.

### Performance

- Use `will-change: transform` on the scrolling containers
- Use `transform: translate3d()` for GPU acceleration
- Each skill set is duplicated 4× to fill the visible area

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

- Row 1: first 10 skills
- Row 2: remaining 10 skills

Skills list may be updated — keep it as a simple array for now. The Phase 1 logo enhancement from the original spec can be added later without changing the marquee layout.

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (`< md`) | Chips use `text-xs`, `py-2 px-4`. Row gap `gap-3`. Fade width `w-16`. |
| Desktop (`≥ md`) | Chips use `text-sm`, `py-2.5 px-5`. Row gap `gap-4`. Fade width `w-24`. |

No layout shift — both breakpoints render two scrolling rows. Vertical padding between rows: `gap-3` mobile, `gap-4` desktop.

---

## Accessibility

- `aria-hidden="true"` on the marquee section (decorative, not informational)
- `prefers-reduced-motion: reduce` — disable animation and show a static wrapped grid of chips instead
- Touch targets are not interactive (no click handler in Phase 1), so no minimum size requirement

---

## Component Structure

```
src/lib/components/
└── SkillsMarquee.svelte     # Self-contained marquee component
```

Single component. No sub-components needed until Phase 2 interactive features are implemented.

---

## Svelte Component Skeleton

```svelte
<script lang="ts">
  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'Svelte', 'Deno',
    'Node', 'Go', 'Azure', 'GCP', 'Terraform',
    'Docker', 'Kubernetes', 'Tailwind', 'RabbitMQ', 'FastAPI',
    'Bun', 'LLMs', 'PostgreSQL', 'Redis', 'Git'
  ];

  const row1 = skills.slice(0, 10);
  const row2 = skills.slice(10);
</script>

<section aria-hidden="true" class="relative overflow-hidden bg-primary py-8 group">
  <!-- Fade edges -->
  <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-r from-primary to-transparent"></div>
  <div class="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-l from-primary to-transparent"></div>

  <div class="flex flex-col gap-3 md:gap-4">
    <!-- Row 1: scrolls left -->
    <div class="flex animate-marquee group-hover:[animation-play-state:paused]">
      {#each Array(4) as _}
        {#each row1 as skill}
          <div class="flex items-center gap-2 rounded border border-border-dim bg-surface px-4 py-2 md:px-5 md:py-2.5 mx-1.5 shrink-0 hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5 transition-all duration-200">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span class="font-mono text-xs md:text-sm uppercase tracking-wider text-text-main">{skill}</span>
          </div>
        {/each}
      {/each}
    </div>

    <!-- Row 2: scrolls right -->
    <div class="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
      {#each Array(4) as _}
        {#each row2 as skill}
          <div class="flex items-center gap-2 rounded border border-border-dim bg-surface px-4 py-2 md:px-5 md:py-2.5 mx-1.5 shrink-0 hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5 transition-all duration-200">
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
            <span class="font-mono text-xs md:text-sm uppercase tracking-wider text-text-main">{skill}</span>
          </div>
        {/each}
      {/each}
    </div>
  </div>
</section>
```

---

## Future Phases

These are documented in `specs/skills-marquee.md` and remain applicable:

- **Phase 1**: Add SVG logos to each chip (monochrome white, color on hover)
- **Phase 2**: Click-to-expand modal with technology description, experience level, and linked projects (use `bits-ui` Dialog)

No work on future phases is needed for the initial implementation.
