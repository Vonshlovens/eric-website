# GitHub Stats Integration

## Summary

Fetch live data from the GitHub API to populate the hero section's terminal stats panel and stat cards with real numbers instead of hardcoded values. The terminal panel (right column of the hero) and the four stat cards (left column) both display metrics that can be sourced from Eric's public GitHub profile.

This feature is derived from `specs/features.md` (Phase 2: "Live GitHub activity feed") and the terminal stats panel visible in `stitch.html` (lines 138-161).

---

## What It Replaces

The `specs-v2/hero-section.md` spec describes the stat cards and terminal panel as **static text**. This spec upgrades them to pull real data at build time via SvelteKit's server-side data loading, with a static fallback so the site works even if the API is unreachable.

---

## Data Sources

All data comes from the public GitHub REST API (no auth token required for public profile data, though a token raises rate limits).

### Endpoints Used

| Endpoint | Data |
|----------|------|
| `GET /users/{username}` | `public_repos`, `followers`, `created_at` |
| `GET /users/{username}/repos?per_page=100&sort=updated` | Sum of `stargazers_count`, count of repos, language breakdown |
| `GET /search/commits?q=author:{username}` | `total_count` (approximate public commit count) |

Username: `Vonshlovens` (Eric's GitHub handle, referenced in `specs-v2/avatar-hover-reveal.md`).

---

## Stats Displayed

### Hero Stat Cards (left column, 4-card grid)

| Card Label | Source | Fallback |
|------------|--------|----------|
| Repos | `public_repos` from user endpoint | `43` |
| Commits | `total_count` from search/commits | `4,281` |
| Status | Hardcoded | `Production` |
| Tier | Hardcoded | `Intermediate` |

### Terminal Panel (right column)

| Row | Source | Fallback |
|-----|--------|----------|
| Notes | Hardcoded (fun stat) | `1337` |
| Repos | `public_repos` | `43` |
| Age | Calculated from `created_at` to now, in seconds | `852,037,704 s` |
| 100m | Hardcoded (fun stat) | `10.56s` |
| 200m | Hardcoded (fun stat) | `21.64s` |

Only `Repos` and `Age` are dynamic in the terminal panel. The others are personality stats that stay hardcoded.

---

## Data Loading

### Server-Side (Build Time)

Use SvelteKit's `+page.server.ts` load function to fetch GitHub data at build/request time. This avoids exposing API calls to the client and handles rate limiting server-side.

```typescript
// src/routes/+page.server.ts
import type { PageServerLoad } from './$types';

interface GitHubStats {
  repos: number;
  commits: number;
  accountAgeSec: number;
}

const FALLBACK: GitHubStats = {
  repos: 43,
  commits: 4281,
  accountAgeSec: 852_037_704,
};

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    const user = await fetch('https://api.github.com/users/Vonshlovens');
    if (!user.ok) return { githubStats: FALLBACK };

    const userData = await user.json();
    const repos = userData.public_repos ?? FALLBACK.repos;
    const createdAt = new Date(userData.created_at);
    const accountAgeSec = Math.floor((Date.now() - createdAt.getTime()) / 1000);

    // Commit count (optional, rate-limit sensitive)
    let commits = FALLBACK.commits;
    try {
      const commitSearch = await fetch(
        'https://api.github.com/search/commits?q=author:Vonshlovens',
        { headers: { Accept: 'application/vnd.github.cloak-preview+json' } }
      );
      if (commitSearch.ok) {
        const commitData = await commitSearch.json();
        commits = commitData.total_count ?? FALLBACK.commits;
      }
    } catch {
      // commit search failed, use fallback
    }

    return {
      githubStats: { repos, commits, accountAgeSec },
    };
  } catch {
    return { githubStats: FALLBACK };
  }
};
```

### Consuming in the Component

```svelte
<!-- +page.svelte or Hero.svelte -->
<script lang="ts">
  let { data } = $props();
  const stats = data.githubStats;

  const formattedCommits = stats.commits.toLocaleString();
  const formattedAge = stats.accountAgeSec.toLocaleString() + ' s';
</script>
```

---

## Caching

- On Deno Deploy, the page is server-rendered per request. GitHub API responses should be cached for at least **10 minutes** to avoid rate limiting.
- Use a simple in-memory cache or SvelteKit's `setHeaders` with `Cache-Control: public, max-age=600`.
- If prerendering is enabled for the index page, stats update only at build/deploy time — this is acceptable.

---

## Rate Limits

- **Unauthenticated**: 60 requests/hour per IP.
- **Authenticated** (with `GITHUB_TOKEN` env var): 5,000 requests/hour.
- The load function should accept an optional `GITHUB_TOKEN` environment variable and attach it as a Bearer token if present.
- Fallback values ensure the page always renders even at 0 remaining rate limit.

---

## Responsive Behavior

No change from `specs-v2/hero-section.md`. The stat cards and terminal panel layout remain the same; only the values inside them change.

---

## Accessibility

- Stat values use `aria-label` attributes for screen reader context (e.g., `aria-label="43 public repositories"`).
- The terminal panel is decorative (`role="presentation"` or `aria-hidden="true"`) — its content duplicates what the stat cards show.

---

## Files

| File | Purpose |
|------|---------|
| `src/routes/+page.server.ts` | GitHub API fetch + fallback logic |
| `src/routes/+page.svelte` | Passes stats to Hero component |
| `src/lib/components/sections/Hero.svelte` | Renders stat cards and terminal panel with dynamic values |

---

## Dependencies

- No external packages required. Uses native `fetch`.
- Optional: `GITHUB_TOKEN` environment variable for higher rate limits.
