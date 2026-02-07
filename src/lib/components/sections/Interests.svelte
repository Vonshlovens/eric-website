<script lang="ts">
  import { interests } from '$lib/data/interests';
  import { scrollReveal } from '$lib/actions/scrollReveal';
</script>

<section class="py-16 md:py-20" aria-label="Beyond Code">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-8" use:scrollReveal>
      <span class="material-symbols-outlined text-accent" aria-hidden="true">interests</span>
      <h2 class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">
        Beyond Code
      </h2>
    </div>

    <!-- 3-Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" use:scrollReveal={{ stagger: true }}>
      {#each interests as interest (interest.id)}
        <div
          class="scroll-reveal group bg-surface hover:bg-surface-highlight p-8 rounded border border-border-dim transition-all duration-300 hover:border-accent"
        >
          <!-- Icon Box -->
          <div
            class="bg-primary/50 w-14 h-14 rounded flex items-center justify-center mb-6 border border-border-dim group-hover:border-accent/50 transition-colors duration-300"
          >
            <span
              class="material-symbols-outlined text-text-muted group-hover:text-accent text-3xl transition-colors duration-300"
              aria-hidden="true"
            >
              {interest.icon}
            </span>
          </div>

          <h3 class="text-white font-mono font-bold text-lg mb-3">{interest.title}</h3>
          <p class="text-sm text-text-muted font-mono leading-relaxed mb-4">
            {interest.description}
          </p>

          <!-- Links -->
          {#if interest.links}
            <div class="flex flex-wrap gap-3">
              {#each interest.links as link}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent text-xs font-mono hover:underline transition-colors duration-200"
                >
                  {link.label} →
                </a>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
