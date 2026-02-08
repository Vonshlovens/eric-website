<script lang="ts">
  import { engineeringLog } from '$lib/data/engineering-log';
  import { scrollReveal } from '$lib/actions/scrollReveal';

  let scrollY = $state(0);
  let sectionRef = $state<HTMLElement | null>(null);
  let sectionTop = $state(0);
  let useCardStack = $state(false);

  const cardCount = engineeringLog.length;

  // Check if card-stack should be active (md+ screens, motion enabled)
  function shouldUseCardStack(): boolean {
    if (typeof window === 'undefined') return false;
    if (document.documentElement.hasAttribute('data-reduce-motion')) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    if (!window.matchMedia('(min-width: 1024px)').matches) return false;
    return true;
  }

  // Reactively update card-stack state on mount and on media/motion changes
  $effect(() => {
    useCardStack = shouldUseCardStack();

    const mqSize = window.matchMedia('(min-width: 1024px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => { useCardStack = shouldUseCardStack(); };
    mqSize.addEventListener('change', update);
    mqMotion.addEventListener('change', update);

    // Also watch the data-reduce-motion attribute
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduce-motion']
    });

    return () => {
      mqSize.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
      observer.disconnect();
    };
  });

  // Track section offset for scroll progress calculation
  $effect(() => {
    if (!sectionRef || !useCardStack) return;

    const updateTop = () => {
      const rect = sectionRef!.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
    };

    updateTop();
    window.addEventListener('resize', updateTop);
    return () => window.removeEventListener('resize', updateTop);
  });

  function getCardProgress(index: number): number {
    if (!useCardStack) return 1;
    const offset = scrollY - sectionTop;
    const start = index * window.innerHeight;
    const end = (index + 1) * window.innerHeight;
    return Math.min(1, Math.max(0, (offset - start) / (end - start)));
  }

  // Derived: which card is currently "active" (most recently fully revealed)
  let activeCard = $derived.by(() => {
    if (!useCardStack || typeof window === 'undefined') return 0;
    const offset = scrollY - sectionTop;
    return Math.min(cardCount - 1, Math.max(0, Math.floor(offset / window.innerHeight)));
  });
</script>

<svelte:window bind:scrollY={scrollY} />

<section
  class="py-16 md:py-20"
  id="engineering-log"
  aria-labelledby="engineering-log-heading"
>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
  </div>

  {#if useCardStack}
    <!-- Card-Stack Scroll: tall container creates scroll space -->
    <div
      bind:this={sectionRef}
      class="relative"
      style:height="{cardCount * 100}vh"
    >
      <!-- Sticky viewport -->
      <div class="sticky top-0 h-screen overflow-hidden">
        <!-- Progress indicator -->
        <div class="absolute top-6 right-6 z-50 flex flex-col gap-1.5" aria-hidden="true">
          {#each engineeringLog as _, i}
            <div
              class="w-2 h-2 rounded-full transition-colors duration-300"
              class:bg-accent={i <= activeCard}
              class:bg-border-dim={i > activeCard}
            ></div>
          {/each}
        </div>

        <!-- Card counter -->
        <div class="absolute bottom-6 right-6 z-50 text-[10px] font-mono text-text-muted uppercase tracking-widest" aria-hidden="true">
          {String(activeCard + 1).padStart(2, '0')} / {String(cardCount).padStart(2, '0')}
        </div>

        {#each engineeringLog as entry, i (entry.id)}
          {@const progress = getCardProgress(i)}
          <article
            class="card-stack-card absolute inset-0 bg-surface border-b border-border-dim overflow-hidden flex flex-col lg:flex-row"
            style:transform="translateY({(1 - progress) * 100}%)"
            style:z-index={i}
            aria-hidden={progress < 0.5 ? 'true' : undefined}
          >
            <!-- Image -->
            <div class="lg:w-1/3 flex-shrink-0 h-full">
              <div class="relative w-full h-full bg-primary/50">
                <img
                  src={entry.image}
                  alt="{entry.name} project screenshot"
                  width="800"
                  height="600"
                  class="w-full h-full object-cover grayscale transition-all duration-500"
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
            <div class="lg:w-2/3 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
              <!-- Header Row -->
              <div class="flex items-start justify-between gap-4 mb-5">
                <h3 class="text-text-white font-mono font-bold text-xl lg:text-2xl uppercase tracking-tight">
                  {entry.name}
                </h3>
                <span class="flex-shrink-0 bg-accent/20 text-accent text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                  {entry.category}
                </span>
              </div>

              <!-- The Problem -->
              <div class="mb-5">
                <span class="text-accent text-[10px] font-mono font-bold uppercase tracking-widest block mb-1.5">
                  [The Problem]
                </span>
                <p class="text-text-main text-sm lg:text-base font-sans leading-relaxed max-w-2xl">
                  {entry.problem}
                </p>
              </div>

              <!-- Key Learnings -->
              <div class="mb-6">
                <span class="text-accent text-[10px] font-mono font-bold uppercase tracking-widest block mb-1.5">
                  [Key Learnings]
                </span>
                <p class="text-text-main text-sm lg:text-base font-sans leading-relaxed max-w-2xl">
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
                    <span class="bg-primary border border-border-dim px-2.5 py-1 text-[10px] font-mono text-text-muted uppercase">
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
  {:else}
    <!-- Fallback: standard vertical card list (mobile / reduced-motion) -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
                width="800"
                height="600"
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
  {/if}
</section>
