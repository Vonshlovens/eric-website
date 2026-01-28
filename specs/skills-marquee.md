# Skills Marquee Specification

## Overview

An animated marquee component showcasing technologies and tools used. Located in the hero area, it provides a dynamic visual representation of technical skills while supporting interactive exploration of each technology.

---

## Current Implementation

### Status: Implemented (Basic)

**Component**: `src/lib/components/SkillsMarquee.svelte`

**Usage**: Rendered on `src/routes/+page.svelte` immediately after the Hero section (line 243)

### Features

- **Dual-row scrolling**: Two horizontal rows that scroll in opposite directions
  - Row 1: First 10 skills, scrolls left
  - Row 2: Remaining skills, scrolls right
- **Dark theme section**: Contrasts with surrounding light sections
- **Infinite loop animation**: Uses CSS keyframes with 30s duration
- **Pause on hover**: Animation pauses when user hovers over the marquee
- **Skill chips**: Pill-shaped elements with:
  - Glassmorphism background (gradient + blur)
  - Accent-colored dot indicator
  - Hover effect (border highlight, slight elevation, glow)
- **Responsive design**: Different padding/sizing for mobile and desktop
- **Fade edges**: Gradient overlays on left/right edges for seamless visual

### Current Skills List

```typescript
const skills = [
  'Python', 'JavaScript', 'TypeScript', 'Svelte', 'Deno',
  'Node', 'Go', 'Azure', 'GCP', 'Terraform',
  'Docker', 'Kubernetes', 'Tailwind', 'RabbitMQ', 'FastAPI',
  'Bun', 'LLMs', 'PostgreSQL', 'Redis', 'Git'
];
```

### Styling Details

- **Background**: Dark (`bg-dark`) with subtle grid pattern overlay
- **Chip appearance**:
  - Background: Semi-transparent white gradient
  - Border: 1px solid white at 10% opacity
  - Border radius: Full (pill shape)
  - Padding: `0.75rem 1.25rem` (mobile), `0.875rem 1.5rem` (desktop)
- **Hover state**:
  - Border changes to accent color
  - Background shifts to accent-tinted gradient
  - Transform: `translateY(-2px)`
  - Box shadow: Accent glow effect
- **Animation**:
  - `marquee` and `marquee-reverse` keyframes
  - Translates by 25% (each row has 4 duplicated skill sets)

---

## Planned Features

### Phase 1: Technology Logos

**Status**: Not Started

Add visual logos/icons for each technology to improve recognition and visual appeal.

#### Implementation Plan

1. **Data structure update**: Convert skills from strings to objects

```typescript
interface Skill {
  id: string;
  name: string;
  logo: string;           // Path to logo SVG/image
  category: 'language' | 'framework' | 'cloud' | 'devops' | 'database' | 'tool';
}
```

2. **Logo sources**:
   - Use SVG icons from [Simple Icons](https://simpleicons.org/) or [Devicons](https://devicon.dev/)
   - Store in `static/logos/` or import as Svelte components
   - Ensure consistent sizing (recommend 20x20 or 24x24)

3. **Chip layout update**:
```svelte
<div class="skill-chip">
  <img src={skill.logo} alt="" class="skill-logo" />
  <span class="skill-name">{skill.name}</span>
</div>
```

4. **Styling considerations**:
   - Logos should be monochrome (white) by default to match dark theme
   - Optional: Color on hover
   - Consider using CSS filters for consistent appearance

---

### Phase 2: Interactive Technology Details

**Status**: Not Started

Enable click/tap on any technology to reveal detailed information about how it's used and related projects.

#### Implementation Plan

1. **Extended data structure**:

```typescript
interface Skill {
  id: string;
  name: string;
  logo: string;
  category: 'language' | 'framework' | 'cloud' | 'devops' | 'database' | 'tool';

  // New fields for Phase 2
  description: string;          // How I use this technology
  experience: string;           // e.g., "3+ years", "Professional"
  projects: ProjectReference[]; // Links to related projects
}

interface ProjectReference {
  name: string;
  description: string;
  url: string;                  // GitHub or live demo link
  role: string;                 // e.g., "Primary technology", "Used for API"
}
```

2. **Interaction pattern options**:

   **Option A: Modal/Popover**
   - Click on skill chip opens a modal or floating popover
   - Shows description, experience level, and project links
   - Close via click outside, X button, or Escape key

   **Option B: Scroll-to-section**
   - Click scrolls to a dedicated "Technology Deep Dive" section below
   - Section filters to show selected technology
   - Allows browsing all technologies in one place

   **Option C: Side panel**
   - Click opens a slide-in panel from the right
   - Maintains context while showing details

   **Recommended**: Option A (Modal) for simplicity and focused attention

3. **Modal content structure**:
```svelte
<div class="skill-modal">
  <header>
    <img src={skill.logo} alt={skill.name} class="modal-logo" />
    <h3>{skill.name}</h3>
    <span class="experience-badge">{skill.experience}</span>
  </header>

  <p class="description">{skill.description}</p>

  <div class="projects">
    <h4>Projects using {skill.name}</h4>
    {#each skill.projects as project}
      <a href={project.url} class="project-link">
        <span class="project-name">{project.name}</span>
        <span class="project-role">{project.role}</span>
      </a>
    {/each}
  </div>
</div>
```

4. **Data file**:
   - Create `src/lib/data/skills.ts` for centralized skill data
   - Link to existing `projects.ts` data where applicable

5. **Accessibility requirements**:
   - Add `role="button"` and `tabindex="0"` to clickable chips
   - Support keyboard navigation (Enter/Space to open)
   - Trap focus within modal when open
   - Announce modal content to screen readers

6. **Animation considerations**:
   - Pause marquee animation when modal is open
   - Subtle entrance animation for modal (fade + scale)
   - Highlight the clicked chip visually while modal is open

---

## Data File Structure

Create `src/lib/data/skills.ts`:

```typescript
export interface ProjectReference {
  name: string;
  description: string;
  url: string;
  role: string;
}

export interface Skill {
  id: string;
  name: string;
  logo: string;
  category: 'language' | 'framework' | 'cloud' | 'devops' | 'database' | 'tool';
  description: string;
  experience: string;
  projects: ProjectReference[];
}

export const skills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    logo: '/logos/python.svg',
    category: 'language',
    description: 'My go-to language for backend services, automation, and data processing. I use it extensively with FastAPI for building high-performance APIs.',
    experience: '5+ years',
    projects: [
      {
        name: 'API Gateway',
        description: 'High-throughput API gateway handling 10k+ requests/sec',
        url: 'https://github.com/...',
        role: 'Primary backend language'
      }
    ]
  },
  // ... more skills
];
```

---

## Component Structure (Future)

```
src/lib/components/
├── SkillsMarquee.svelte        # Main marquee component
├── SkillChip.svelte            # Individual skill chip (extracted)
└── SkillModal.svelte           # Modal for skill details (Phase 2)
```

---

## Technical Notes

### Animation Performance
- Use `will-change: transform` for smoother animations
- Consider `transform: translate3d()` for GPU acceleration
- Current implementation duplicates skills 4x for seamless loop

### Mobile Considerations
- Modal should be fullscreen on mobile devices
- Touch targets should be at least 44x44px
- Consider swipe gestures to navigate between skills in modal

### Integration with Projects
- Cross-reference skills with `projects.ts` technology tags
- Auto-populate projects list from existing project data where skill names match

---

## Dependencies

- No additional dependencies required for Phase 1
- Phase 2 may benefit from:
  - `bits-ui` Dialog component (already in specs)
  - Focus trap utility for modal accessibility
