<script lang="ts">
  import { scrollReveal } from '$lib/actions/scrollReveal';

  let { onconnect }: { onconnect?: () => void } = $props();

  let ctaBtnEl = $state<HTMLButtonElement>();

  export function getTriggerEl() {
    return ctaBtnEl;
  }
</script>

<section
  id="contact"
  class="py-16 md:py-20"
  aria-labelledby="contact-heading"
  use:scrollReveal
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-surface rounded border border-border-dim relative overflow-hidden">
      <!-- Dot-grid overlay -->
      <div
        class="absolute inset-0 opacity-[0.06] pointer-events-none"
        style="background-image: radial-gradient(circle, var(--color-border-dim) 1px, transparent 1px); background-size: 20px 20px;"
        aria-hidden="true"
      ></div>

      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">
        <!-- Left: Text + Status -->
        <div class="text-center md:text-left space-y-4">
          <h2
            id="contact-heading"
            class="text-text-white text-2xl sm:text-3xl font-mono font-bold tracking-tight"
          >
            Initialize Protocol?
          </h2>

          <p class="text-text-muted font-mono text-sm max-w-md">
            Open for architectural consultations and complex systems integration. Response time: &lt; 24h.
          </p>

          <span class="inline-block px-3 py-1 bg-primary/50 rounded text-[10px] font-mono text-status-ok border border-border-dim tracking-widest font-bold uppercase">
            STATUS: READY_TO_COLLABORATE
          </span>
        </div>

        <!-- Right: CTA + Social Icons -->
        <div class="flex flex-col items-center gap-6 shrink-0">
          <button
            bind:this={ctaBtnEl}
            onclick={onconnect}
            aria-label="Open contact form"
            class="flex items-center justify-center rounded bg-accent text-text-white h-14 px-10 text-xs font-mono font-bold tracking-[0.2em] transition-all duration-200 hover:bg-text-white hover:text-primary shadow-xl shadow-accent/20 uppercase cursor-pointer"
          >
            Connect.exe
          </button>

          <div class="flex gap-2 text-text-muted">
            <a
              class="w-11 h-11 flex items-center justify-center rounded hover:text-accent transition-colors duration-200"
              href="mailto:eric@ericevans.dev"
              aria-label="Email"
            >
              <span class="material-symbols-outlined text-2xl" aria-hidden="true">mail</span>
            </a>
            <a
              class="w-11 h-11 flex items-center justify-center rounded hover:text-accent transition-colors duration-200"
              href="https://github.com/Vonshlovens"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in new tab)"
            >
              <span class="material-symbols-outlined text-2xl" aria-hidden="true">terminal</span>
            </a>
            <a
              class="w-11 h-11 flex items-center justify-center rounded hover:text-accent transition-colors duration-200"
              href="https://linkedin.com/in/ericevans"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
            >
              <span class="material-symbols-outlined text-2xl" aria-hidden="true">hub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
