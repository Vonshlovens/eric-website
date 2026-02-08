<script lang="ts">
  import { education } from '$lib/data/education';
  import { scrollReveal } from '$lib/actions/scrollReveal';
</script>

<section class="py-16 md:py-20" id="education" aria-labelledby="education-heading">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-8" use:scrollReveal>
      <span class="material-symbols-outlined text-accent" aria-hidden="true">school</span>
      <h2 id="education-heading" class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">
        Education & Certifications
      </h2>
    </div>

    <!-- 2-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" use:scrollReveal={{ stagger: true }}>
      {#each education as item (item.id)}
        <div class="scroll-reveal relative bg-surface p-6 md:p-8 rounded border border-border-dim hover:border-accent/30 transition-colors duration-300">
          <!-- Category Badge -->
          <span class="absolute top-4 right-4 text-[10px] font-mono bg-accent/20 text-accent px-2 py-1 rounded uppercase">
            {item.type}
          </span>

          <!-- Card Content -->
          <h3 class="text-text-white font-mono font-bold text-lg mb-2 pr-24">
            {item.name}
          </h3>
          <p class="text-text-main text-sm font-mono mb-1">
            {item.institution}
          </p>
          <p class="text-text-muted text-xs font-mono uppercase tracking-widest mb-3">
            {item.year}
          </p>

          {#if item.honors}
            <p class="text-accent text-xs font-mono mb-3">
              {item.honors}
            </p>
          {/if}

          {#if item.credentialUrl}
            <a
              href={item.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="text-text-muted text-xs font-mono uppercase hover:text-accent transition-colors duration-200 inline-flex items-center gap-1"
            >
              View Credential
              <span class="sr-only">(opens in new tab)</span>
              <span class="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
            </a>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
