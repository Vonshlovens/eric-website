# SvelteKit 2 Specification

## Overview
SvelteKit 2 is a full-stack framework for building web applications with Svelte. It provides file-based routing, server-side rendering, API routes, and adapters for various deployment platforms including Deno Deploy.

## Project Structure

```
src/
├── routes/              # File-based routing
│   ├── +page.svelte    # Page component
│   ├── +page.ts        # Page load function (client + server)
│   ├── +page.server.ts # Server-only load function
│   ├── +layout.svelte  # Layout component
│   ├── +layout.ts      # Layout load function
│   └── +server.ts      # API endpoint
├── lib/                # Reusable components and utilities
│   ├── components/     # Shared components
│   └── utils/          # Helper functions
├── app.html            # HTML template
└── app.css             # Global styles
```

## Routing

### File-Based Routing
- `+page.svelte` - Page component
- `+layout.svelte` - Shared layout
- `+error.svelte` - Error boundary
- `+server.ts` - API endpoint

### Dynamic Routes
```
routes/
├── blog/
│   ├── [slug]/
│   │   └── +page.svelte      # /blog/my-post
│   └── [...catchall]/
│       └── +page.svelte      # /blog/any/path/here
```

### Route Parameters
```svelte
<!-- routes/blog/[slug]/+page.svelte -->
<script lang="ts">
  let { data } = $props();
</script>

<h1>{data.post.title}</h1>
```

```typescript
// routes/blog/[slug]/+page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const post = await fetchPost(params.slug);

  return {
    post
  };
};
```

## Data Loading

### Universal Load Functions (+page.ts)
Runs on both server and client:

```typescript
// +page.ts
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/data/${params.id}`);
  const data = await response.json();

  return {
    data
  };
};
```

### Server-Only Load Functions (+page.server.ts)
Runs only on the server (can access database, env vars, etc.):

```typescript
// +page.server.ts
import type { PageServerLoad } from './$types';
import { db } from '$lib/database';

export const load: PageServerLoad = async ({ params }) => {
  const user = await db.users.findOne(params.id);

  return {
    user
  };
};
```

### Layout Data
```typescript
// +layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.user
  };
};
```

## API Routes

### GET Endpoint
```typescript
// routes/api/posts/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const posts = await fetchPosts();

  return json(posts);
};
```

### POST Endpoint
```typescript
// routes/api/posts/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const post = await createPost(data);

  return json(post, { status: 201 });
};
```

### Dynamic API Routes
```typescript
// routes/api/posts/[id]/+server.ts
export const GET: RequestHandler = async ({ params }) => {
  const post = await fetchPost(params.id);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  return json(post);
};
```

## Form Actions

### Basic Form Action
```typescript
// routes/contact/+page.server.ts
import type { Actions } from './$types';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const email = data.get('email');

    // Process form submission
    await sendEmail(email);

    return { success: true };
  }
} satisfies Actions;
```

```svelte
<!-- routes/contact/+page.svelte -->
<script lang="ts">
  let { form } = $props();
</script>

<form method="POST">
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>

{#if form?.success}
  <p>Email sent!</p>
{/if}
```

### Named Actions
```typescript
export const actions = {
  login: async ({ request }) => {
    // Handle login
  },
  register: async ({ request }) => {
    // Handle registration
  }
} satisfies Actions;
```

```svelte
<form method="POST" action="?/login">
  <!-- Login form -->
</form>

<form method="POST" action="?/register">
  <!-- Register form -->
</form>
```

## Hooks

### Server Hooks (hooks.server.ts)
```typescript
// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Add custom data to event.locals
  event.locals.user = await getUserFromSession(event);

  const response = await resolve(event);

  // Modify response headers
  response.headers.set('x-custom-header', 'value');

  return response;
};
```

## Page Options

Configure rendering behavior per route:

```typescript
// +page.ts or +page.server.ts
export const prerender = true;  // Prerender at build time
export const ssr = false;       // Disable server-side rendering
export const csr = true;        // Enable client-side rendering
```

## Adapters

### Deno Deploy Adapter
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-deno';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### Auto Adapter (recommended for Deno Deploy)
```javascript
import adapter from '@sveltejs/adapter-auto';

export default {
  kit: {
    adapter: adapter()
  }
};
```

## Environment Variables

```typescript
// Access in load functions or server files
import { env } from '$env/dynamic/private';

const apiKey = env.API_KEY;
```

```svelte
<!-- Access public env vars in components -->
<script>
  import { env } from '$env/dynamic/public';
  const publicKey = env.PUBLIC_API_KEY;
</script>
```

## Navigation

### Programmatic Navigation
```svelte
<script>
  import { goto } from '$app/navigation';

  function navigate() {
    goto('/about');
  }
</script>
```

### Link Component
```svelte
<a href="/about">About</a>
```

### Prefetching
```svelte
<a href="/blog" data-sveltekit-preload-data>Blog</a>
```

## Best Practices

### 1. Data Loading
- Use `+page.server.ts` for sensitive data or database access
- Use `+page.ts` for client-side navigable data
- Share data via layout load functions when needed by multiple routes

### 2. API Routes
- Use API routes for external integrations
- Keep business logic in separate modules, not in route handlers
- Return proper HTTP status codes

### 3. Forms
- Use progressive enhancement with form actions
- Validate data on the server
- Return meaningful error messages

### 4. Performance
- Enable prerendering for static pages
- Use streaming with `{#await}` for better perceived performance
- Leverage SvelteKit's automatic code splitting

### 5. Type Safety
- Use generated `$types` for type-safe routing
- Define interfaces for data shapes
- Enable strict TypeScript mode

## Deployment to Deno Deploy

### 1. Configuration
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-deno';

export default {
  kit: {
    adapter: adapter()
  }
};
```

### 2. Build
```bash
deno task build
```

### 3. Deploy
- Push to GitHub
- Connect repository to Deno Deploy
- Auto-deploys on push to main branch

## Resources

- Official Docs: https://kit.svelte.dev/docs
- GitHub: https://github.com/sveltejs/kit
- Discord: https://svelte.dev/chat
