# Svelte 5 Specification

## Overview
Svelte 5 introduces a new reactive paradigm using **runes**, which provide explicit and powerful reactivity primitives. This project uses Svelte 5's latest features for building reactive, performant UI components.

## Key Features

### Runes System
Svelte 5 replaces implicit reactivity with explicit runes:

- **`$state`** - Declare reactive state
- **`$derived`** - Compute derived values
- **`$effect`** - Run side effects
- **`$props`** - Declare component props
- **`$bindable`** - Two-way binding for props

### State Management

#### Basic State
```svelte
<script>
  let count = $state(0);

  function increment() {
    count++;
  }
</script>

<button onclick={increment}>
  Clicks: {count}
</button>
```

#### Reactive Objects
```svelte
<script>
  let user = $state({
    name: 'Eric',
    age: 25
  });

  // Deep reactivity - mutations are tracked
  function updateName(newName) {
    user.name = newName;
  }
</script>
```

#### Derived State
```svelte
<script>
  let firstName = $state('Eric');
  let lastName = $state('Smith');

  // Automatically recomputes when dependencies change
  let fullName = $derived(`${firstName} ${lastName}`);
</script>

<p>{fullName}</p>
```

### Props Pattern
```svelte
<script>
  // Destructure props with $props rune
  let { title, description, items = [] } = $props();

  // For two-way binding
  let { value = $bindable() } = $props();
</script>
```

### Effects
```svelte
<script>
  let count = $state(0);

  // Runs when dependencies change
  $effect(() => {
    console.log(`Count is now: ${count}`);

    // Cleanup function
    return () => {
      console.log('Cleaning up');
    };
  });
</script>
```

### Snippets (Render Props)
```svelte
<script>
  let { children, header } = $props();
</script>

<div class="card">
  {#if header}
    {@render header()}
  {/if}

  <div class="card-content">
    {@render children()}
  </div>
</div>
```

## Component Patterns

### Event Handlers
```svelte
<script>
  let count = $state(0);
</script>

<!-- Inline handlers -->
<button onclick={() => count++}>Increment</button>

<!-- Function reference -->
<button onclick={handleClick}>Click me</button>
```

### Conditional Rendering
```svelte
{#if condition}
  <p>Condition is true</p>
{:else if otherCondition}
  <p>Other condition</p>
{:else}
  <p>Nothing matched</p>
{/if}
```

### Lists
```svelte
<script>
  let items = $state([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);
</script>

{#each items as item (item.id)}
  <div>{item.name}</div>
{/each}
```

### Await Blocks
```svelte
<script>
  let promise = $state(fetchData());
</script>

{#await promise}
  <p>Loading...</p>
{:then data}
  <p>Data: {data}</p>
{:catch error}
  <p>Error: {error.message}</p>
{/await}
```

## Best Practices

### 1. Use Runes Over Legacy Patterns
❌ **Avoid (Svelte 4 style):**
```svelte
<script>
  let count = 0;
  $: doubled = count * 2;
</script>
```

✅ **Prefer (Svelte 5 style):**
```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>
```

### 2. Explicit Reactivity
- Make reactivity explicit with `$state` and `$derived`
- Use `$effect` for side effects, not computations
- Avoid mixing runes with legacy reactive declarations

### 3. Component Composition
- Use snippets for flexible component APIs
- Prefer composition over prop drilling
- Keep components focused and single-purpose

### 4. Performance
- Svelte 5 has better performance with fine-grained reactivity
- Avoid unnecessary derived calculations
- Use `{#key}` blocks to force re-rendering when needed

### 5. TypeScript Integration
```svelte
<script lang="ts">
  interface Props {
    title: string;
    count?: number;
  }

  let { title, count = 0 }: Props = $props();

  let doubled = $derived(count * 2);
</script>
```

## Migration Notes

### From Svelte 4 to Svelte 5
- `let` → `$state()`
- `$:` → `$derived()` or `$effect()`
- `export let prop` → `let { prop } = $props()`
- `$$props` → `let props = $props()`
- `$$restProps` → `let { ...rest } = $props()`

## Resources

- Official Docs: https://svelte.dev/docs/svelte/overview
- GitHub: https://github.com/sveltejs/svelte
- Playground: https://svelte.dev/playground
