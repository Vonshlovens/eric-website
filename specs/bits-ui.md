# Bits UI Specification

## Overview
Bits UI is a headless component library for Svelte 5 that provides unstyled, accessible UI primitives. It gives you full control over styling while handling complex accessibility, keyboard navigation, and focus management.

## Philosophy

### Headless Components
- **Unstyled** - No default styles, full creative control
- **Accessible** - ARIA compliant, keyboard navigation
- **Composable** - Build complex UIs from simple primitives
- **Flexible** - Works with any styling solution (Tailwind, CSS, etc.)

### Why Headless?
- Complete design freedom
- No CSS specificity battles
- Framework-agnostic patterns
- Production-ready accessibility

## Installation

```bash
deno add npm:bits-ui@next
```

## Core Components

### Dialog (Modal)

#### Basic Dialog
```svelte
<script lang="ts">
  import { Dialog } from "bits-ui";

  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  >
    Open Dialog
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 bg-black/50 backdrop-blur-sm"
    />

    <Dialog.Content
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
             bg-white rounded-lg p-6 shadow-xl max-w-md w-full"
    >
      <Dialog.Title class="text-xl font-bold mb-2">
        Dialog Title
      </Dialog.Title>

      <Dialog.Description class="text-gray-600 mb-4">
        Dialog description goes here.
      </Dialog.Description>

      <div class="flex gap-2 justify-end">
        <Dialog.Close
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </Dialog.Close>

        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onclick={() => {
            // Handle action
            open = false;
          }}
        >
          Confirm
        </button>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

#### Nested Dialogs
```svelte
<script lang="ts">
  import { Dialog } from "bits-ui";

  let rootOpen = $state(false);
  let nestedOpen = $state(false);
</script>

<Dialog.Root bind:open={rootOpen}>
  <Dialog.Trigger>Open First Dialog</Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="overlay" />
    <Dialog.Content
      class="content"
      style="
        transform: translateY(calc(-50% + var(--bits-dialog-nested-count) * -1rem));
        scale: calc(1 - var(--bits-dialog-nested-count) * 0.05);
        filter: blur(calc(var(--bits-dialog-nested-count) * 1px));
      "
    >
      <Dialog.Title>First Dialog</Dialog.Title>

      <Dialog.Root bind:open={nestedOpen}>
        <Dialog.Trigger>Open Second Dialog</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay class="overlay" />
          <Dialog.Content class="content">
            <Dialog.Title>Second Dialog</Dialog.Title>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Dialog.Close>Close First</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### Dropdown Menu

```svelte
<script lang="ts">
  import { DropdownMenu } from "bits-ui";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class="px-4 py-2 bg-white border rounded hover:bg-gray-50"
  >
    Options
  </DropdownMenu.Trigger>

  <DropdownMenu.Content
    class="bg-white border rounded-lg shadow-lg p-1 min-w-[200px]"
  >
    <DropdownMenu.Item
      class="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
    >
      Profile
    </DropdownMenu.Item>

    <DropdownMenu.Item
      class="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
    >
      Settings
    </DropdownMenu.Item>

    <DropdownMenu.Separator class="h-px bg-gray-200 my-1" />

    <DropdownMenu.Item
      class="px-3 py-2 rounded cursor-pointer hover:bg-red-100 text-red-600"
    >
      Logout
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Popover

```svelte
<script lang="ts">
  import { Popover } from "bits-ui";
</script>

<Popover.Root>
  <Popover.Trigger
    class="px-4 py-2 bg-blue-500 text-white rounded"
  >
    Show Info
  </Popover.Trigger>

  <Popover.Content
    class="bg-white border rounded-lg shadow-lg p-4 max-w-xs"
  >
    <Popover.Arrow class="fill-white" />

    <h3 class="font-bold mb-2">Information</h3>
    <p class="text-sm text-gray-600">
      Additional context and information goes here.
    </p>

    <Popover.Close
      class="mt-3 px-3 py-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
    >
      Close
    </Popover.Close>
  </Popover.Content>
</Popover.Root>
```

### Tooltip

```svelte
<script lang="ts">
  import { Tooltip } from "bits-ui";
</script>

<Tooltip.Root>
  <Tooltip.Trigger
    class="px-4 py-2 bg-gray-200 rounded"
  >
    Hover me
  </Tooltip.Trigger>

  <Tooltip.Content
    class="bg-gray-900 text-white text-sm px-3 py-2 rounded shadow-lg"
  >
    <Tooltip.Arrow class="fill-gray-900" />
    Tooltip content
  </Tooltip.Content>
</Tooltip.Root>
```

### Accordion

```svelte
<script lang="ts">
  import { Accordion } from "bits-ui";
</script>

<Accordion.Root class="space-y-2">
  <Accordion.Item value="item-1">
    <Accordion.Trigger
      class="flex justify-between items-center w-full px-4 py-3
             bg-white border rounded hover:bg-gray-50"
    >
      <span>Section 1</span>
      <Accordion.Header class="transform transition-transform">
        ▼
      </Accordion.Header>
    </Accordion.Trigger>

    <Accordion.Content
      class="px-4 py-3 bg-gray-50 border border-t-0 rounded-b"
    >
      Content for section 1
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item value="item-2">
    <Accordion.Trigger
      class="flex justify-between items-center w-full px-4 py-3
             bg-white border rounded hover:bg-gray-50"
    >
      <span>Section 2</span>
      <Accordion.Header>▼</Accordion.Header>
    </Accordion.Trigger>

    <Accordion.Content
      class="px-4 py-3 bg-gray-50 border border-t-0 rounded-b"
    >
      Content for section 2
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Tabs

```svelte
<script lang="ts">
  import { Tabs } from "bits-ui";

  let value = $state("tab1");
</script>

<Tabs.Root bind:value>
  <Tabs.List class="flex gap-2 border-b mb-4">
    <Tabs.Trigger
      value="tab1"
      class="px-4 py-2 border-b-2 transition-colors
             data-[state=active]:border-blue-500 data-[state=active]:text-blue-500
             data-[state=inactive]:border-transparent hover:text-gray-700"
    >
      Tab 1
    </Tabs.Trigger>

    <Tabs.Trigger
      value="tab2"
      class="px-4 py-2 border-b-2 transition-colors
             data-[state=active]:border-blue-500 data-[state=active]:text-blue-500
             data-[state=inactive]:border-transparent hover:text-gray-700"
    >
      Tab 2
    </Tabs.Trigger>
  </Tabs.List>

  <Tabs.Content value="tab1">
    <p>Content for tab 1</p>
  </Tabs.Content>

  <Tabs.Content value="tab2">
    <p>Content for tab 2</p>
  </Tabs.Content>
</Tabs.Root>
```

### Select

```svelte
<script lang="ts">
  import { Select } from "bits-ui";

  let value = $state("");
</script>

<Select.Root bind:value>
  <Select.Trigger
    class="flex justify-between items-center w-full px-4 py-2
           bg-white border rounded hover:bg-gray-50"
  >
    <Select.Value placeholder="Select an option" />
    <span>▼</span>
  </Select.Trigger>

  <Select.Content
    class="bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-auto"
  >
    <Select.Item
      value="option1"
      class="px-4 py-2 cursor-pointer hover:bg-gray-100
             data-[highlighted]:bg-blue-50"
    >
      Option 1
    </Select.Item>

    <Select.Item
      value="option2"
      class="px-4 py-2 cursor-pointer hover:bg-gray-100
             data-[highlighted]:bg-blue-50"
    >
      Option 2
    </Select.Item>

    <Select.Item
      value="option3"
      class="px-4 py-2 cursor-pointer hover:bg-gray-100
             data-[highlighted]:bg-blue-50"
    >
      Option 3
    </Select.Item>
  </Select.Content>
</Select.Root>
```

### Checkbox

```svelte
<script lang="ts">
  import { Checkbox } from "bits-ui";

  let checked = $state(false);
</script>

<div class="flex items-center gap-2">
  <Checkbox.Root
    bind:checked
    class="w-5 h-5 border-2 rounded flex items-center justify-center
           data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
           hover:border-blue-400"
  >
    <Checkbox.Indicator>
      <svg class="w-3 h-3 text-white" viewBox="0 0 12 12">
        <path
          d="M10 3L4.5 8.5L2 6"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
        />
      </svg>
    </Checkbox.Indicator>
  </Checkbox.Root>

  <label class="cursor-pointer">Accept terms</label>
</div>
```

### Switch (Toggle)

```svelte
<script lang="ts">
  import { Switch } from "bits-ui";

  let checked = $state(false);
</script>

<Switch.Root
  bind:checked
  class="w-11 h-6 rounded-full relative transition-colors
         data-[state=checked]:bg-blue-500
         data-[state=unchecked]:bg-gray-300"
>
  <Switch.Thumb
    class="block w-5 h-5 bg-white rounded-full shadow-sm
           transform transition-transform
           data-[state=checked]:translate-x-5
           data-[state=unchecked]:translate-x-0"
  />
</Switch.Root>
```

## Data Attributes

Bits UI uses data attributes for state management:

- `data-state` - Component state (open/closed, checked/unchecked, etc.)
- `data-highlighted` - Item is highlighted
- `data-disabled` - Component is disabled
- `data-orientation` - Horizontal/vertical orientation

### Styling with Data Attributes
```svelte
<Dialog.Overlay
  class="
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
  "
/>
```

## Accessibility Features

### Keyboard Navigation
- Arrow keys for navigation
- Enter/Space for selection
- Escape to close
- Tab for focus management

### ARIA Attributes
Automatically managed:
- `aria-expanded`
- `aria-selected`
- `aria-disabled`
- `aria-labelledby`
- `aria-describedby`

### Focus Management
- Automatic focus trapping in modals
- Focus restoration on close
- Focus indicators

## Integration with Tailwind

### Using Arbitrary Variants
```svelte
<Button
  class="
    px-4 py-2 rounded
    data-[state=open]:bg-blue-500
    data-[state=closed]:bg-gray-500
    data-[disabled]:opacity-50
    data-[disabled]:cursor-not-allowed
  "
/>
```

### Custom Utilities
```css
@layer utilities {
  .dialog-overlay-enter {
    @apply data-[state=open]:animate-in;
    @apply data-[state=open]:fade-in-0;
  }

  .dialog-content-enter {
    @apply data-[state=open]:animate-in;
    @apply data-[state=open]:fade-in-0;
    @apply data-[state=open]:zoom-in-95;
  }
}
```

## Component Patterns

### Reusable Dialog Component
```svelte
<!-- Dialog.svelte -->
<script lang="ts">
  import { Dialog as BitsDialog } from "bits-ui";

  let { open = $bindable(), title, children } = $props();
</script>

<BitsDialog.Root bind:open>
  <BitsDialog.Portal>
    <BitsDialog.Overlay class="dialog-overlay" />
    <BitsDialog.Content class="dialog-content">
      {#if title}
        <BitsDialog.Title class="dialog-title">
          {title}
        </BitsDialog.Title>
      {/if}

      {@render children()}
    </BitsDialog.Content>
  </BitsDialog.Portal>
</BitsDialog.Root>
```

### Reusable Button Component
```svelte
<!-- Button.svelte -->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    variant = 'primary',
    size = 'md',
    children,
    ...props
  }: {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: Snippet;
    [key: string]: any;
  } = $props();

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
</script>

<button
  class="rounded transition-colors {variants[variant]} {sizes[size]}"
  {...props}
>
  {@render children()}
</button>
```

## Best Practices

### 1. Composition Over Configuration
Build complex UIs from simple primitives:

```svelte
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title />
      <Dialog.Description />
      <Dialog.Close />
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### 2. Consistent Styling
Create a design system with shared styles:

```css
/* styles/components.css */
.dialog-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm;
  @apply data-[state=open]:animate-in data-[state=closed]:animate-out;
}

.dialog-content {
  @apply fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
  @apply bg-white rounded-lg shadow-xl p-6 max-w-md w-full;
}
```

### 3. Accessible Labels
Always provide proper labels:

```svelte
<Dialog.Root>
  <Dialog.Content>
    <Dialog.Title>Delete Account</Dialog.Title>
    <Dialog.Description>
      This action cannot be undone.
    </Dialog.Description>
  </Dialog.Content>
</Dialog.Root>
```

### 4. Portal for Overlays
Use Portal for modals and overlays:

```svelte
<Dialog.Portal>
  <Dialog.Overlay />
  <Dialog.Content>
    <!-- Content -->
  </Dialog.Content>
</Dialog.Portal>
```

### 5. State Management
Bind state for controlled components:

```svelte
<script>
  let dialogOpen = $state(false);
  let selectedTab = $state("tab1");
</script>

<Dialog.Root bind:open={dialogOpen}>
  <!-- Dialog content -->
</Dialog.Root>

<Tabs.Root bind:value={selectedTab}>
  <!-- Tabs content -->
</Tabs.Root>
```

## Resources

- Official Docs: https://bits-ui.com
- GitHub: https://github.com/huntabyte/bits-ui
- Examples: https://bits-ui.com/docs/components
