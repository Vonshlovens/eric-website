<script lang="ts">
  import type { GitHubStats } from '$lib/types/github';
  import { motionStore } from '$lib/stores/motion.svelte';
  import { site, avatarUrl } from '$lib/config/site';

  interface Props {
    githubStats: GitHubStats;
  }

  let { githubStats }: Props = $props();

  let formattedCommits = $derived(githubStats.commits.toLocaleString());
  let formattedRepos = $derived(githubStats.repos.toLocaleString());
  let formattedAge = $derived(githubStats.accountAgeSec.toLocaleString() + ' s');

  let stats = $derived([
    { label: 'Repos', value: formattedRepos, icon: 'folder_open', ariaLabel: `${githubStats.repos} public repositories` },
    { label: 'Commits', value: formattedCommits, icon: 'commit', ariaLabel: `${githubStats.commits} commits` },
    { label: 'Status', value: 'Production', icon: 'radio_button_checked', ariaLabel: 'Status: Production' },
    { label: 'Tier', value: 'Intermediate', icon: 'timeline', ariaLabel: 'Tier: Intermediate' }
  ]);

  const tags = ['Full-Stack', 'Cloud', 'DevOps', 'Open Source'];

  let terminalLines = $derived([
    { key: 'user', value: 'eric.evans' },
    { key: 'role', value: 'software_engineer' },
    { key: 'notes', value: '1337' },
    { key: 'repos', value: formattedRepos },
    { key: 'age', value: formattedAge },
    { key: 'sprint.100m', value: '10.56s' },
    { key: 'sprint.200m', value: '21.64s' }
  ]);

  // --- Avatar Hover Reveal ---
  let revealX = $state(0);
  let revealY = $state(0);
  let revealActive = $state(false);
  let canHover = $state(false);
  const revealRadius = 100;

  $effect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(hover: hover)');
      canHover = mq.matches;
      const handler = (e: MediaQueryListEvent) => { canHover = e.matches; };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  });

  let revealRafId = $state(0);

  function handleRevealMove(e: MouseEvent) {
    if (!canHover || motionStore.disabled) return;
    if (revealRafId) return; // skip if a frame is already pending
    const target = e.currentTarget as HTMLElement;
    const clientX = e.clientX;
    const clientY = e.clientY;
    revealRafId = requestAnimationFrame(() => {
      revealRafId = 0;
      const rect = target.getBoundingClientRect();
      revealX = clientX - rect.left;
      revealY = clientY - rect.top;
      revealActive = true;
    });
  }

  function handleRevealLeave() {
    if (revealRafId) {
      cancelAnimationFrame(revealRafId);
      revealRafId = 0;
    }
    revealActive = false;
  }

  let revealMaskStyle = $derived(
    revealActive && canHover && !motionStore.disabled
      ? `mask-image: radial-gradient(circle ${revealRadius}px at ${revealX}px ${revealY}px, transparent 60%, black 100%); -webkit-mask-image: radial-gradient(circle ${revealRadius}px at ${revealX}px ${revealY}px, transparent 60%, black 100%); will-change: mask-image;`
      : ''
  );
</script>

<section
  id="about"
  class="relative min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-24 overflow-hidden"
  aria-labelledby="hero-heading"
>
  <!-- Subtle dot grid background texture -->
  <div class="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true" style="
    background-image: radial-gradient(circle, var(--color-text-main) 1px, transparent 1px);
    background-size: 24px 24px;
  "></div>

  <!-- Scan line effect -->
  <div class="absolute inset-0 pointer-events-none opacity-[0.02]" aria-hidden="true" style="
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(191, 177, 193, 0.05) 2px,
      rgba(191, 177, 193, 0.05) 4px
    );
  "></div>

  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <!-- Terminal prompt line -->
    <div class="font-mono text-accent text-sm mb-10 flex items-center gap-2" aria-hidden="true">
      <span class="text-text-muted">~</span>
      <span class="text-accent">&gt;</span>
      <span class="text-text-main">init_portfolio.sh</span>
      <span class="animate-pulse text-accent">█</span>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 items-start">

      <!-- Left Column (2/3) -->
      <div class="lg:col-span-2 space-y-8">

        <!-- Avatar + Name + Title + Tags (with hover reveal) -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          class="reveal-container relative"
          onmousemove={handleRevealMove}
          onmouseleave={handleRevealLeave}
        >
          <!-- Bottom layer: GitHub identity (revealed through mask hole) -->
          <div class="flex flex-col items-center lg:items-start gap-6 sm:flex-row sm:items-start" aria-hidden="true">
            <!-- GitHub Avatar -->
            <div class="relative group shrink-0">
              <div
                class="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-700"
              ></div>
              <div
                class="relative w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-accent/40 transition-colors duration-500 cursor-crosshair"
              >
                <img
                  src={avatarUrl}
                  alt=""
                  width="192"
                  height="192"
                  decoding="async"
                  class="w-full h-full object-cover"
                />
                <div class="absolute bottom-2 right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-primary">
                  <span class="material-symbols-outlined text-text-white text-base">verified</span>
                </div>
              </div>
            </div>
            <!-- GitHub name -->
            <div class="text-center sm:text-left">
              <p class="font-mono text-2xl sm:text-4xl md:text-6xl font-bold text-text-white tracking-tighter leading-none mb-2">
                {site.github.username}<span class="animate-pulse text-accent">_</span>
              </p>
              <p class="font-mono text-lg text-accent tracking-wide mb-4">
                @{site.github.username}
              </p>
              <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
                {#each tags as tag}
                  <span class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-surface border border-border-dim text-text-muted">
                    {tag}
                  </span>
                {/each}
              </div>
            </div>
          </div>

          <!-- Top layer: Display identity (masked around cursor) -->
          <div
            class="reveal-layer-display absolute inset-0"
            style={revealMaskStyle}
          >
            <div class="flex flex-col items-center lg:items-start gap-6 sm:flex-row sm:items-start">
              <!-- Display Avatar -->
              <div class="relative group shrink-0">
                <div
                  class="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                ></div>
                <div
                  class="relative w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-border-dim group-hover:border-accent/40 transition-colors duration-500 cursor-crosshair"
                >
                  <img
                    src={avatarUrl}
                    alt="{site.name} — {site.title}"
                    width="192"
                    height="192"
                    fetchpriority="high"
                    decoding="async"
                    class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div class="absolute bottom-2 right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center shadow-md border-2 border-primary">
                    <span class="material-symbols-outlined text-text-white text-base">verified</span>
                  </div>
                </div>
              </div>
              <!-- Display name -->
              <div class="text-center sm:text-left">
                <h1 id="hero-heading" class="font-mono text-2xl sm:text-4xl md:text-6xl font-bold text-text-white tracking-tighter leading-none mb-2">
                  {site.name}<span class="animate-pulse text-accent">_</span>
                </h1>
                <p class="font-mono text-lg text-accent tracking-wide mb-4">
                  {site.title}
                </p>
                <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {#each tags as tag}
                    <span class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-surface border border-border-dim text-text-muted">
                      {tag}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bio Quote -->
        <p class="font-mono text-sm md:text-base text-text-muted leading-relaxed max-w-2xl border-l-2 border-accent pl-6 py-2 bg-accent/5 rounded-r">
          Building reliable, well-crafted software with modern web technologies.
          Focused on developer experience, clean architecture, and shipping code
          that solves real problems.
        </p>

        <!-- Stat Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {#each stats as stat}
            <div class="group/card bg-surface p-4 rounded border border-border-dim hover:border-accent/30 transition-colors duration-300" aria-label={stat.ariaLabel}>
              <div class="flex items-center gap-1.5 mb-2">
                <span class="material-symbols-outlined text-text-muted text-sm">{stat.icon}</span>
                <span class="text-[10px] text-text-muted font-mono uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
              <span class="text-text-white font-mono font-bold text-lg">
                {stat.value}
              </span>
            </div>
          {/each}
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="{site.name.replace(' ', '_')}_Resume.pdf"
            class="
              inline-flex items-center gap-2
              px-6 py-3
              font-mono font-bold text-xs uppercase tracking-widest
              bg-accent text-text-white
              rounded
              transition-all duration-200
              hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20
            "
          >
            <span class="material-symbols-outlined text-base" aria-hidden="true">description</span>
            View Resume
            <span class="sr-only">(opens in new tab)</span>
          </a>
          <a
            href="#engineering-log"
            class="
              inline-flex items-center gap-2
              px-6 py-3
              font-mono font-bold text-xs uppercase tracking-widest
              bg-transparent text-text-main
              border border-border-dim
              rounded
              transition-all duration-200
              hover:border-accent/40 hover:text-text-white
            "
          >
            <span class="material-symbols-outlined text-base" aria-hidden="true">folder_open</span>
            View Projects
          </a>
        </div>
      </div>

      <!-- Right Column (1/3) — Terminal Stats Panel -->
      <div class="lg:col-span-1" aria-hidden="true">
        <div class="bg-surface border border-border-dim rounded-lg overflow-hidden">
          <!-- Title bar -->
          <div class="flex items-center gap-2 px-4 py-2.5 bg-surface-highlight border-b border-border-dim">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-full bg-accent"></span>
              <span class="w-3 h-3 rounded-full bg-[#D4A017]"></span>
              <span class="w-3 h-3 rounded-full bg-status-ok"></span>
            </div>
            <span class="text-[10px] text-text-muted font-mono uppercase tracking-widest ml-2">
              sys_info — session:0
            </span>
          </div>

          <!-- Terminal body -->
          <div class="p-4 font-mono text-xs sm:text-sm space-y-2">
            <!-- System header -->
            <div class="text-text-muted text-xs mb-3 pb-2 border-b border-border-dim/50">
              <span class="text-accent">ee_sys</span>
              <span class="text-text-muted">@</span>
              <span class="text-text-main">portfolio</span>
              <span class="text-text-muted"> ~ </span>
              <span class="text-status-ok">v2.0</span>
            </div>

            {#each terminalLines as line}
              <div class="flex items-baseline gap-1 group/line">
                <span class="text-accent text-xs shrink-0">▸</span>
                <span class="text-text-muted text-xs min-w-[70px]">{line.key}:</span>
                <span class="text-text-main text-xs group-hover/line:text-text-white transition-colors duration-200">{line.value}</span>
              </div>
            {/each}

            <!-- Footer line -->
            <div class="pt-3 mt-3 border-t border-border-dim/50">
              <div class="flex items-center gap-2 text-xs">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-ok opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-status-ok"></span>
                </span>
                <span class="text-status-ok">all systems nominal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
