<script lang="ts">
  import { engineeringLog } from '$lib/data/engineering-log';
  import { scrollReveal } from '$lib/actions/scrollReveal';
</script>

<section class="py-16 md:py-20" id="engineering-log" aria-labelledby="engineering-log-heading">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8 border-b border-border-dim pb-4" use:scrollReveal>
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-accent" aria-hidden="true">terminal</span>
        <h2
          id="engineering-log-heading"
          class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]"
        >
          Engineering Log
        </h2>
      </div>
      <div class="hidden sm:flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-text-muted">
        <span>Active Projects: <span class="text-text-white">{engineeringLog.length}</span></span>
        <span class="flex items-center gap-1.5">
          Systems Status:
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-ok opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-status-ok"></span>
          </span>
          <span class="text-status-ok">Optimal</span>
        </span>
      </div>
    </div>

    <!-- Project Cards -->
    <div class="space-y-6">
      {#each engineeringLog as entry (entry.id)}
        <article
          use:scrollReveal
          class="group bg-surface border border-border-dim rounded hover:border-accent/50 transition-all duration-300 overflow-hidden flex flex-col lg:flex-row"
        >
          <!-- Image -->
          <div class="lg:w-1/3 flex-shrink-0">
            <div class="relative w-full h-full min-h-[200px] lg:min-h-0 bg-primary/50">
              <img
                src={entry.image}
                alt="{entry.name} project screenshot"
                class="w-full h-full object-cover aspect-video lg:aspect-auto lg:absolute lg:inset-0 grayscale group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                decoding="async"
                onerror={(e: Event) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              <!-- Placeholder when no image -->
              <div class="absolute inset-0 flex items-center justify-center bg-primary/80 text-text-muted font-mono text-sm uppercase tracking-widest pointer-events-none">
                <span class="material-symbols-outlined text-4xl text-border-dim" aria-hidden="true">terminal</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="lg:w-2/3 p-6 md:p-8 flex flex-col justify-center relative">
            <!-- Header Row -->
            <div class="flex items-start justify-between gap-4 mb-5">
              <h3 class="text-text-white font-mono font-bold text-lg uppercase tracking-tight">
                {entry.name}
              </h3>
              <span class="flex-shrink-0 bg-accent/20 text-accent text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                {entry.category}
              </span>
            </div>

            <!-- The Problem -->
            <div class="mb-4">
              <span class="text-accent text-[10px] font-mono font-bold uppercase tracking-widest block mb-1.5">
                [The Problem]
              </span>
              <p class="text-text-main text-sm font-sans leading-relaxed">
                {entry.problem}
              </p>
            </div>

            <!-- Key Learnings -->
            <div class="mb-5">
              <span class="text-accent text-[10px] font-mono font-bold uppercase tracking-widest block mb-1.5">
                [Key Learnings]
              </span>
              <p class="text-text-main text-sm font-sans leading-relaxed">
                {entry.learnings}
              </p>
            </div>

            <!-- Tech Stack -->
            <div>
              <span class="text-accent text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">
                [Tech Stack]
              </span>
              <div class="flex flex-wrap gap-2">
                {#each entry.techStack as tech}
                  <span class="bg-primary border border-border-dim px-2 py-1 text-[10px] font-mono text-text-muted uppercase">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
