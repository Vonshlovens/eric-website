# Style Guide - Gruvbox Portfolio

## Design Philosophy

**Warm Retro-Computing Meets Modern Minimalism**

This portfolio embraces the cozy, terminal-inspired aesthetic of Gruvbox while maintaining a contemporary, sophisticated feel. The design balances nostalgic warmth with clean, purposeful interfaces that put content first.

### Core Aesthetic Principles
- **Warm & Inviting** - Earthy, muted tones create comfort
- **Purposeful Minimalism** - Every element serves a function
- **Terminal Heritage** - Monospace accents, code-inspired patterns
- **Smooth Transitions** - Subtle animations enhance, not distract
- **Content-First** - Typography and readability are paramount

---

## Color Palette

### Gruvbox Dark Theme

```css
@theme {
  /* Backgrounds */
  --color-bg-dark: #282828;           /* Main background */
  --color-bg-dark-soft: #32302f;      /* Elevated surfaces */
  --color-bg-dark-hard: #1d2021;      /* Deep background */

  /* Foregrounds */
  --color-fg-dark: #ebdbb2;           /* Primary text */
  --color-fg-dark-soft: #d5c4a1;      /* Secondary text */
  --color-fg-dark-muted: #bdae93;     /* Muted text */

  /* Grays */
  --color-gray-dark-0: #928374;       /* Comments/disabled */
  --color-gray-dark-1: #a89984;       /* Borders */

  /* Colors */
  --color-red-dark: #fb4934;          /* Error, danger */
  --color-green-dark: #b8bb26;        /* Success, active */
  --color-yellow-dark: #fabd2f;       /* Warning, highlight */
  --color-blue-dark: #83a598;         /* Links, info */
  --color-purple-dark: #d3869b;       /* Accent */
  --color-aqua-dark: #8ec07c;         /* Secondary accent */
  --color-orange-dark: #fe8019;       /* Primary accent */

  /* Muted variants */
  --color-red-dark-muted: #cc241d;
  --color-green-dark-muted: #98971a;
  --color-yellow-dark-muted: #d79921;
  --color-blue-dark-muted: #458588;
  --color-purple-dark-muted: #b16286;
  --color-aqua-dark-muted: #689d6a;
  --color-orange-dark-muted: #d65d0e;
}
```

### Gruvbox Light Theme

```css
@theme {
  /* Backgrounds */
  --color-bg-light: #fbf1c7;          /* Main background */
  --color-bg-light-soft: #f2e5bc;     /* Elevated surfaces */
  --color-bg-light-hard: #f9f5d7;     /* Deep background */

  /* Foregrounds */
  --color-fg-light: #3c3836;          /* Primary text */
  --color-fg-light-soft: #504945;     /* Secondary text */
  --color-fg-light-muted: #665c54;    /* Muted text */

  /* Grays */
  --color-gray-light-0: #928374;      /* Comments/disabled */
  --color-gray-light-1: #a89984;      /* Borders */

  /* Colors */
  --color-red-light: #cc241d;         /* Error, danger */
  --color-green-light: #98971a;       /* Success, active */
  --color-yellow-light: #d79921;      /* Warning, highlight */
  --color-blue-light: #458588;        /* Links, info */
  --color-purple-light: #b16286;      /* Accent */
  --color-aqua-light: #689d6a;        /* Secondary accent */
  --color-orange-light: #d65d0e;      /* Primary accent */

  /* Bright variants */
  --color-red-light-bright: #9d0006;
  --color-green-light-bright: #79740e;
  --color-yellow-light-bright: #b57614;
  --color-blue-light-bright: #076678;
  --color-purple-light-bright: #8f3f71;
  --color-aqua-light-bright: #427b58;
  --color-orange-light-bright: #af3a03;
}
```

### Semantic Color Mapping

```css
@theme {
  /* Dark theme semantic colors */
  --color-background: var(--color-bg-dark);
  --color-surface: var(--color-bg-dark-soft);
  --color-text-primary: var(--color-fg-dark);
  --color-text-secondary: var(--color-fg-dark-soft);
  --color-text-muted: var(--color-fg-dark-muted);
  --color-border: var(--color-gray-dark-1);
  --color-accent: var(--color-orange-dark);
  --color-link: var(--color-blue-dark);
  --color-highlight: var(--color-yellow-dark);

  /* Light theme - override in media query */
  @media (prefers-color-scheme: light) {
    --color-background: var(--color-bg-light);
    --color-surface: var(--color-bg-light-soft);
    --color-text-primary: var(--color-fg-light);
    --color-text-secondary: var(--color-fg-light-soft);
    --color-text-muted: var(--color-fg-light-muted);
    --color-border: var(--color-gray-light-1);
    --color-accent: var(--color-orange-light);
    --color-link: var(--color-blue-light);
    --color-highlight: var(--color-yellow-light);
  }
}
```

---

## Typography

### Font Families

```css
@theme {
  /* Display/Headings - Distinctive, characterful */
  --font-display: "JetBrains Mono", "Fira Code", monospace;

  /* Body - Readable, warm */
  --font-body: "iA Writer Quattro", "IBM Plex Sans", -apple-system, sans-serif;

  /* Code - Terminal authentic */
  --font-mono: "Cascadia Code", "Fira Code", "JetBrains Mono", monospace;
}
```

### Type Scale

```css
@theme {
  /* Font sizes */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */

  /* Line heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
}
```

### Typography Patterns

```svelte
<!-- Hero Heading -->
<h1 class="
  font-display text-5xl md:text-6xl
  tracking-tight leading-tight
  text-[var(--color-text-primary)]
">
  Your Name
</h1>

<!-- Section Heading -->
<h2 class="
  font-display text-3xl md:text-4xl
  tracking-wide
  text-[var(--color-accent)]
">
  Section Title
</h2>

<!-- Body Text -->
<p class="
  font-body text-lg
  leading-relaxed
  text-[var(--color-text-secondary)]
">
  Body content with great readability.
</p>

<!-- Code/Terminal Text -->
<code class="
  font-mono text-sm
  bg-[var(--color-surface)]
  px-2 py-1 rounded
  text-[var(--color-green-dark)]
">
  terminal.text
</code>
```

---

## Spacing System

```css
@theme {
  /* Spacing scale (based on 4px grid) */
  --space-0: 0;
  --space-px: 1px;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */

  /* Section spacing */
  --section-gap-sm: var(--space-16);
  --section-gap-md: var(--space-24);
  --section-gap-lg: var(--space-32);

  /* Component spacing */
  --card-padding: var(--space-6);
  --button-padding-x: var(--space-6);
  --button-padding-y: var(--space-3);
}
```

---

## Border & Radius

```css
@theme {
  /* Border radius */
  --radius-sm: 0.25rem;   /* 4px - subtle */
  --radius-md: 0.5rem;    /* 8px - standard */
  --radius-lg: 0.75rem;   /* 12px - prominent */
  --radius-xl: 1rem;      /* 16px - cards */
  --radius-full: 9999px;  /* Pills/circles */

  /* Border widths */
  --border-width: 1px;
  --border-width-thick: 2px;
}
```

---

## Shadows & Depth

```css
@theme {
  /* Subtle shadows for dark theme */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4),
               0 2px 4px -2px rgb(0 0 0 / 0.3);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5),
               0 4px 6px -4px rgb(0 0 0 / 0.4);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.5),
               0 8px 10px -6px rgb(0 0 0 / 0.4);

  /* Glow effects */
  --glow-accent: 0 0 20px var(--color-accent);
  --glow-blue: 0 0 20px var(--color-blue-dark);
}
```

---

## Animations

```css
@theme {
  /* Timing functions */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 350ms;
}
```

### Animation Utilities

```css
@layer utilities {
  /* Fade in on load */
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Slide up on load */
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Terminal cursor blink */
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  /* Utility classes */
  .animate-fade-in {
    animation: fade-in var(--duration-normal) var(--ease-out);
  }

  .animate-slide-up {
    animation: slide-up var(--duration-slow) var(--ease-out);
  }

  .animate-blink {
    animation: blink 1s step-end infinite;
  }

  /* Stagger children */
  .stagger-children > * {
    animation: slide-up var(--duration-slow) var(--ease-out);
  }

  .stagger-children > *:nth-child(1) { animation-delay: 0ms; }
  .stagger-children > *:nth-child(2) { animation-delay: 100ms; }
  .stagger-children > *:nth-child(3) { animation-delay: 200ms; }
  .stagger-children > *:nth-child(4) { animation-delay: 300ms; }
}
```

---

## Component Patterns

### Card

```svelte
<div class="
  bg-[var(--color-surface)]
  border border-[var(--color-border)]
  rounded-lg
  p-6
  shadow-md
  transition-all duration-normal
  hover:shadow-lg
  hover:translate-y-[-2px]
">
  <h3 class="font-display text-xl mb-2">Card Title</h3>
  <p class="text-[var(--color-text-secondary)]">Card content</p>
</div>
```

### Button

```svelte
<!-- Primary Button -->
<button class="
  px-6 py-3
  font-display text-base
  bg-[var(--color-accent)]
  text-[var(--color-bg-dark)]
  rounded-md
  border-2 border-transparent
  transition-all duration-fast
  hover:brightness-110
  active:scale-95
  focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
">
  Click Me
</button>

<!-- Ghost Button -->
<button class="
  px-6 py-3
  font-display text-base
  bg-transparent
  text-[var(--color-text-primary)]
  rounded-md
  border-2 border-[var(--color-border)]
  transition-all duration-fast
  hover:border-[var(--color-accent)]
  hover:text-[var(--color-accent)]
  active:scale-95
">
  Secondary Action
</button>
```

### Link

```svelte
<a class="
  text-[var(--color-link)]
  font-body
  underline decoration-[var(--color-link)]/30
  underline-offset-4
  decoration-2
  transition-all duration-fast
  hover:decoration-[var(--color-link)]
  hover:text-[var(--color-link)]
  hover:brightness-110
">
  Link Text
</a>
```

### Input

```svelte
<input class="
  w-full
  px-4 py-3
  font-body text-base
  bg-[var(--color-background)]
  text-[var(--color-text-primary)]
  border-2 border-[var(--color-border)]
  rounded-md
  transition-all duration-fast
  focus:outline-none
  focus:border-[var(--color-accent)]
  focus:ring-2 focus:ring-[var(--color-accent)]/20
  placeholder:text-[var(--color-text-muted)]
" />
```

### Terminal/Code Block

```svelte
<div class="
  bg-[var(--color-bg-dark-hard)]
  border border-[var(--color-gray-dark-1)]
  rounded-lg
  p-6
  font-mono text-sm
  overflow-x-auto
">
  <div class="flex items-center gap-2 mb-4">
    <div class="w-3 h-3 rounded-full bg-[var(--color-red-dark)]"></div>
    <div class="w-3 h-3 rounded-full bg-[var(--color-yellow-dark)]"></div>
    <div class="w-3 h-3 rounded-full bg-[var(--color-green-dark)]"></div>
  </div>
  <pre class="text-[var(--color-fg-dark)]"><code>$ echo "Hello, World!"</code></pre>
</div>
```

---

## Layout Patterns

### Container

```svelte
<div class="
  max-w-7xl
  mx-auto
  px-4 sm:px-6 lg:px-8
">
  <!-- Content -->
</div>
```

### Section Spacing

```svelte
<section class="
  py-16 md:py-24
  space-y-12
">
  <!-- Section content -->
</section>
```

### Grid

```svelte
<div class="
  grid
  grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-6 md:gap-8
">
  <!-- Grid items -->
</div>
```

---

## Best Practices

### 1. Consistent Color Usage
- Use semantic color variables, not direct color values
- Dark theme by default, light theme as preference
- Accent color for CTAs and highlights only
- Maintain sufficient contrast (WCAG AA minimum)

### 2. Typography Hierarchy
- Display font for headings and special elements
- Body font for all reading content
- Mono font for code, data, and terminal aesthetics
- Scale between 1.2-1.25 for harmonious sizing

### 3. Spacing Rhythm
- Use 4px grid system consistently
- Generous whitespace for breathing room
- Section spacing larger than component spacing
- Responsive spacing (smaller on mobile)

### 4. Animation Restraint
- Subtle, purposeful animations only
- Respect `prefers-reduced-motion`
- Focus on state transitions and feedback
- Avoid gratuitous effects

### 5. Accessibility
- Keyboard navigation for all interactive elements
- Focus indicators visible and clear
- Color contrast meets WCAG standards
- Semantic HTML with proper ARIA labels

---

## Dark/Light Mode Implementation

```svelte
<script>
  import { browser } from '$app/environment';

  let isDark = $state(true);

  $effect(() => {
    if (browser) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark = prefersDark;

      // Watch for changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => isDark = e.matches;
      mediaQuery.addEventListener('change', handler);

      return () => mediaQuery.removeEventListener('change', handler);
    }
  });
</script>

<div class="theme-{isDark ? 'dark' : 'light'}">
  <!-- App content -->
</div>
```

---

## Resources

### Fonts
- **JetBrains Mono**: https://fonts.google.com/specimen/JetBrains+Mono
- **iA Writer Quattro**: https://ia.net/topics/a-typographic-christmas
- **IBM Plex Sans**: https://fonts.google.com/specimen/IBM+Plex+Sans
- **Cascadia Code**: https://github.com/microsoft/cascadia-code

### Color Reference
- **Gruvbox**: https://github.com/morhetz/gruvbox
- **Palette Generator**: https://github.com/morhetz/gruvbox-contrib
