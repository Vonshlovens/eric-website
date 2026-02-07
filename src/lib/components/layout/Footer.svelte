<script lang="ts">
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-border-dim bg-[#0A0A0A]">
  <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">

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
    <div class="flex items-center gap-2">
      <span class="text-[10px] font-mono text-text-muted uppercase tracking-widest">
        Latency: 14ms
      </span>
      <span class="size-2 rounded-full bg-status-ok"></span>
    </div>

  </div>
</footer>
