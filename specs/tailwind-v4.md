# Tailwind CSS v4 Specification

## Overview
Tailwind CSS v4 is a major rewrite that introduces a new engine, faster builds, and improved developer experience. It features a unified configuration approach, better CSS variable support, and enhanced performance.

## Installation

### With SvelteKit
```bash
deno add npm:tailwindcss@next npm:@tailwindcss/vite@next
```

### Configuration

#### vite.config.ts
```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),  // Must come before sveltekit()
    sveltekit()
  ]
});
```

#### app.css
```css
@import "tailwindcss";

/* Custom styles below */
```

#### +layout.svelte
```svelte
<script>
  import "../app.css";

  let { children } = $props();
</script>

{@render children()}
```

## Key Changes from v3

### 1. No Configuration File
- No `tailwind.config.js` required
- Configuration via CSS using `@theme`
- Simpler setup, less boilerplate

### 2. CSS-First Configuration
```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;

  --font-display: "Inter", sans-serif;
  --font-body: "Georgia", serif;

  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
}
```

### 3. Native CSS Variables
All theme values are CSS variables:

```css
/* Accessing theme values */
.element {
  color: theme(--color-primary);
  font-family: theme(--font-display);
  padding: theme(--spacing-md);
}
```

### 4. Vite Plugin
Dedicated Vite plugin for better performance:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()]
});
```

## Theme Configuration

### Colors
```css
@theme {
  /* Custom colors */
  --color-brand-50: #faf5ff;
  --color-brand-100: #f3e8ff;
  --color-brand-500: #8b5cf6;
  --color-brand-900: #4c1d95;

  /* Override defaults */
  --color-blue-500: #3b82f6;
}
```

### Typography
```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Merriweather", ui-serif, Georgia, serif;
  --font-mono: "Fira Code", ui-monospace, monospace;

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
}
```

### Spacing
```css
@theme {
  --spacing-0: 0;
  --spacing-px: 1px;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-8: 2rem;
}
```

### Breakpoints
```css
@theme {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Using in Svelte Components

### Basic Usage
```svelte
<script>
  let count = $state(0);
</script>

<div class="bg-blue-500 text-white p-4 rounded-lg">
  <h1 class="text-2xl font-bold mb-2">Counter</h1>
  <p class="text-lg">{count}</p>
  <button
    class="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
    onclick={() => count++}
  >
    Increment
  </button>
</div>
```

### With Style Block
```svelte
<h1 class="text-3xl font-bold">
  Hello world!
</h1>

<style lang="postcss">
  @reference "tailwindcss";

  :global(html) {
    background-color: theme(--color-gray-100);
  }

  :global(body) {
    font-family: theme(--font-sans);
  }
</style>
```

### Dynamic Classes
```svelte
<script>
  let isActive = $state(false);
  let variant = $state('primary');
</script>

<button
  class="px-4 py-2 rounded {isActive ? 'bg-blue-500' : 'bg-gray-500'}"
>
  Toggle
</button>

<div class:bg-blue-500={variant === 'primary'}>
  Content
</div>
```

## Variants & Modifiers

### Hover, Focus, Active
```svelte
<button class="
  bg-blue-500
  hover:bg-blue-600
  focus:ring-2
  focus:ring-blue-300
  active:bg-blue-700
  transition-colors
">
  Button
</button>
```

### Responsive Design
```svelte
<div class="
  w-full
  sm:w-1/2
  md:w-1/3
  lg:w-1/4
  p-4
  sm:p-6
  md:p-8
">
  Responsive Box
</div>
```

### Dark Mode
```css
@import "tailwindcss";

@theme {
  --color-background-light: #ffffff;
  --color-background-dark: #1a1a1a;
}
```

```svelte
<div class="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
">
  Content
</div>
```

### Group Hover
```svelte
<div class="group hover:bg-gray-100">
  <h3 class="group-hover:text-blue-500">Title</h3>
  <p class="group-hover:text-gray-600">Description</p>
</div>
```

## Custom Utilities

### Using @layer
```css
@import "tailwindcss";

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .bg-grid {
    background-image:
      linear-gradient(to right, #8080801a 1px, transparent 1px),
      linear-gradient(to bottom, #8080801a 1px, transparent 1px);
    background-size: 20px 20px;
  }
}
```

### Using in Components
```svelte
<h1 class="text-balance">
  This heading will balance nicely
</h1>

<div class="bg-grid p-8">
  Grid background
</div>
```

## Animations

### Built-in Animations
```svelte
<div class="
  animate-fade-in
  animate-slide-up
  animate-bounce
">
  Animated content
</div>
```

### Custom Animations
```css
@import "tailwindcss";

@theme {
  --animate-fade-in: fade-in 0.5s ease-in;
  --animate-slide-up: slide-up 0.3s ease-out;
}

@layer utilities {
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-up {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-in;
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }
}
```

## Container Queries

```svelte
<div class="@container">
  <div class="@lg:text-xl @md:p-4">
    Responsive to container size
  </div>
</div>
```

## Performance Optimization

### Purging Unused Styles
v4 automatically purges unused styles by scanning:
- `.svelte` files
- `.html` files
- `.ts` / `.js` files

### JIT Mode
Always enabled in v4 - generates styles on demand

### Production Build
```bash
deno task build
```

Automatically:
- Removes unused CSS
- Minifies output
- Optimizes for production

## Migration from v3

### 1. Update Dependencies
```bash
deno add npm:tailwindcss@next npm:@tailwindcss/vite@next
```

### 2. Update Vite Config
```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()]
});
```

### 3. Update CSS
```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import "tailwindcss";
```

### 4. Move Config to CSS
```javascript
// tailwind.config.js (v3) - DELETE THIS FILE

// app.css (v4)
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  /* ... rest of theme */
}
```

## Best Practices

### 1. Use Semantic Color Names
```css
@theme {
  --color-brand: #3b82f6;
  --color-accent: #8b5cf6;
  --color-success: #10b981;
  --color-danger: #ef4444;
}
```

### 2. Create Consistent Spacing
```css
@theme {
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
}
```

### 3. Component-Scoped Styles
```svelte
<style lang="postcss">
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }

  .card-title {
    @apply text-xl font-bold mb-2;
  }
</style>
```

### 4. Responsive First
```svelte
<!-- Mobile first approach -->
<div class="
  flex flex-col
  md:flex-row
  gap-4
  md:gap-6
">
  Content
</div>
```

### 5. Use CSS Variables for Dynamic Values
```svelte
<script>
  let primaryColor = $state('#3b82f6');
</script>

<div style="--primary: {primaryColor}">
  <button class="bg-[--primary] text-white px-4 py-2">
    Dynamic Color
  </button>
</div>
```

## Resources

- Official Docs: https://tailwindcss.com/docs
- GitHub: https://github.com/tailwindlabs/tailwindcss
- Playground: https://play.tailwindcss.com
- Discord: https://tailwindcss.com/discord
