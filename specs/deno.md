# Deno Specification

## Overview
Deno is a modern JavaScript/TypeScript runtime built on V8, Rust, and Tokio. It provides a secure-by-default execution environment with built-in TypeScript support, web-standard APIs, and a comprehensive standard library.

## Key Features

### Security First
- **Permissions-based** - No file, network, or environment access without explicit permission
- **Secure by default** - All access must be explicitly granted

### Built-in TypeScript
- Native TypeScript support without configuration
- No need for separate compilation step
- Type checking built into the runtime

### Web Standards
- Uses web platform APIs (fetch, URL, WebSocket, etc.)
- Compatible with browser JavaScript
- Modern ECMAScript support

### Tooling Included
- Test runner (`deno test`)
- Linter (`deno lint`)
- Formatter (`deno fmt`)
- Bundler (`deno bundle`)
- Documentation generator (`deno doc`)

## Project Configuration

### deno.json
```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --allow-env --watch main.ts",
    "build": "deno task build:sveltekit",
    "build:sveltekit": "vite build",
    "preview": "deno run --allow-net --allow-read build/index.js"
  },
  "imports": {
    "@sveltejs/kit": "npm:@sveltejs/kit@^2.0.0",
    "svelte": "npm:svelte@^5.0.0",
    "$lib": "./src/lib",
    "$lib/*": "./src/lib/*"
  },
  "compilerOptions": {
    "lib": ["deno.window", "dom", "dom.iterable"],
    "jsx": "react-jsx",
    "jsxImportSource": "svelte"
  },
  "nodeModulesDir": "auto",
  "lock": false
}
```

## Permission Flags

### File System
```bash
--allow-read[=<PATH>]   # Read file system
--allow-write[=<PATH>]  # Write to file system
```

### Network
```bash
--allow-net[=<DOMAIN>]  # Network access
--allow-env[=<VAR>]     # Environment variables
```

### Other Permissions
```bash
--allow-run[=<CMD>]     # Run subprocesses
--allow-ffi             # Foreign function interface
--allow-hrtime          # High resolution time
--allow-all             # All permissions (use carefully)
```

## NPM Compatibility

### Using NPM Packages
Deno has built-in npm compatibility:

```typescript
// Direct npm: specifier
import express from "npm:express@^4.18";
import { marked } from "npm:marked@^4.0";
```

### In deno.json imports
```json
{
  "imports": {
    "@sveltejs/kit": "npm:@sveltejs/kit@^2.0.0",
    "svelte": "npm:svelte@^5.0.0"
  }
}
```

## Standard Library

Deno provides a comprehensive standard library:

```typescript
// File system
import { exists } from "https://deno.land/std@0.220.0/fs/mod.ts";

// HTTP server
import { serve } from "https://deno.land/std@0.220.0/http/server.ts";

// Path utilities
import { join } from "https://deno.land/std@0.220.0/path/mod.ts";

// Testing
import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts";
```

## Web APIs

### Fetch API
```typescript
const response = await fetch("https://api.example.com/data");
const data = await response.json();
```

### File System API
```typescript
// Read file
const text = await Deno.readTextFile("./file.txt");

// Write file
await Deno.writeTextFile("./output.txt", "content");

// Read directory
for await (const entry of Deno.readDir("./src")) {
  console.log(entry.name);
}
```

### Environment Variables
```typescript
const apiKey = Deno.env.get("API_KEY");
const port = Deno.env.get("PORT") || "8000";
```

## Testing

### Basic Test
```typescript
// math_test.ts
import { assertEquals } from "https://deno.land/std@0.220.0/assert/mod.ts";

Deno.test("addition works", () => {
  assertEquals(1 + 1, 2);
});

Deno.test("async test", async () => {
  const result = await Promise.resolve(42);
  assertEquals(result, 42);
});
```

### Run Tests
```bash
deno test
deno test --watch  # Watch mode
deno test --coverage  # Coverage report
```

## Tasks (Task Runner)

### Define Tasks in deno.json
```json
{
  "tasks": {
    "dev": "deno run --allow-net --allow-read --watch server.ts",
    "test": "deno test --allow-read",
    "lint": "deno lint",
    "fmt": "deno fmt",
    "build": "deno task build:vite"
  }
}
```

### Run Tasks
```bash
deno task dev
deno task test
```

## Formatting & Linting

### Format Code
```bash
deno fmt                    # Format all files
deno fmt src/              # Format directory
deno fmt --check          # Check formatting
```

### Lint Code
```bash
deno lint                   # Lint all files
deno lint src/             # Lint directory
deno lint --fix            # Auto-fix issues
```

## Import Maps

### Define Import Aliases
```json
{
  "imports": {
    "$lib/": "./src/lib/",
    "$components/": "./src/components/",
    "std/": "https://deno.land/std@0.220.0/",
    "@/": "./src/"
  }
}
```

### Use Aliases
```typescript
import { Button } from "$components/Button.svelte";
import { formatDate } from "$lib/utils.ts";
import { assertEquals } from "std/assert/mod.ts";
```

## TypeScript Configuration

### Compiler Options
```json
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": true,
    "jsx": "react-jsx",
    "jsxImportSource": "svelte"
  }
}
```

## Best Practices

### 1. Use Permissions Wisely
- Grant minimal permissions needed
- Scope permissions to specific paths/domains
- Avoid `--allow-all` in production

### 2. Leverage Web Standards
- Use `fetch` instead of third-party HTTP clients
- Prefer web platform APIs over Node.js equivalents
- Write code that works in browsers and Deno

### 3. Type Safety
- Use TypeScript for better development experience
- Enable strict mode
- Define types for external data

### 4. Module Management
- Use versioned URLs for dependencies
- Pin versions in production
- Consider using a lockfile (`deno.lock`)

### 5. Testing
- Write tests alongside code
- Use descriptive test names
- Test edge cases and error conditions

### 6. Code Quality
- Run `deno fmt` regularly
- Fix `deno lint` warnings
- Use `deno doc` to verify documentation

## SvelteKit Integration

### Install Dependencies
```bash
deno install
```

### Development
```bash
deno task dev
```

### Build
```bash
deno task build
```

### Type Checking
```typescript
// Use .ts extensions for type checking
// Deno will handle TypeScript natively
```

## Common Patterns

### HTTP Server
```typescript
Deno.serve({ port: 8000 }, (req) => {
  return new Response("Hello World!");
});
```

### Reading Files
```typescript
const data = await Deno.readTextFile("./data.json");
const json = JSON.parse(data);
```

### Environment Configuration
```typescript
const config = {
  port: Deno.env.get("PORT") || "8000",
  apiUrl: Deno.env.get("API_URL") || "http://localhost:3000",
  isProduction: Deno.env.get("DENO_ENV") === "production"
};
```

## Resources

- Official Docs: https://deno.com/manual
- Standard Library: https://deno.land/std
- Third-party Modules: https://deno.land/x
- Discord: https://discord.gg/deno
- GitHub: https://github.com/denoland/deno
