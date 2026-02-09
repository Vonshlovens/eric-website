<script lang="ts">
  import { onMount } from 'svelte';

  const year = new Date().getFullYear();
  let latency = $state('--');

  onMount(() => {
    // Use Navigation Timing API for actual page load time, fallback to performance.now()
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const ms = nav
      ? Math.round(nav.domContentLoadedEventEnd - nav.startTime)
      : Math.round(performance.now());
    latency = `${ms}ms`;
  });
</script>

<footer class="border-t border-border-dim bg-[#0A0A0A]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">

    <!-- Branding Block -->
    <div class="text-center md:text-left">
      <p class="text-text-white font-mono font-bold text-sm tracking-widest">
        ERIC EVANS
      </p>
      <p class="text-text-muted font-mono text-[10px] uppercase tracking-widest">
        Software Developer // Cloud &amp; AI Systems
      </p>
    </div>

    <!-- Copyright -->
    <p class="text-border-dim font-mono text-[10px] uppercase tracking-[0.3em]">
      &copy; {year} EE_SYSTEM_PORTFOLIO // v2.0_STABLE
    </p>

    <!-- Status Indicator -->
    <div class="flex items-center gap-4">
      <span class="hidden sm:inline text-[10px] font-mono text-border-dim uppercase tracking-widest" aria-hidden="true">
        Press <kbd class="text-text-muted">?</kbd> for shortcuts
      </span>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-mono text-text-muted uppercase tracking-widest">
          Latency: {latency}
        </span>
        <span class="size-2 rounded-full bg-status-ok"></span>
      </div>
    </div>

  </div>
</footer>
