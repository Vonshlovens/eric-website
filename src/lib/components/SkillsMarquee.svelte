<script lang="ts">
  import { scrollReveal } from '$lib/actions/scrollReveal';

  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'Svelte', 'Deno',
    'Node', 'Go', 'Azure', 'GCP', 'Terraform',
    'Docker', 'Kubernetes', 'Tailwind', 'RabbitMQ', 'FastAPI',
    'Bun', 'LLMs', 'PostgreSQL', 'Redis', 'Git'
  ];

  const row1 = skills.slice(0, 10);
  const row2 = skills.slice(10);
</script>

<section aria-label="Technical Skills" class="relative overflow-hidden bg-primary py-8 group" use:scrollReveal>
  <!-- Fade edges -->
  <div class="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-r from-primary to-transparent" aria-hidden="true"></div>
  <div class="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24 bg-gradient-to-l from-primary to-transparent" aria-hidden="true"></div>

  <div class="flex flex-col gap-3 md:gap-4">
    <!-- Row 1: scrolls left -->
    <div class="flex animate-marquee will-change-transform group-hover:[animation-play-state:paused]">
      {#each Array(4) as _, i}
        <div class="contents" aria-hidden={i > 0 ? 'true' : undefined}>
          {#each row1 as skill}
            <div class="flex items-center gap-2 rounded border border-border-dim bg-surface px-4 py-2 md:px-5 md:py-2.5 mx-1.5 shrink-0 hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5 transition-all duration-200">
              <span class="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true"></span>
              <span class="font-mono text-xs md:text-sm uppercase tracking-wider text-text-main">{skill}</span>
            </div>
          {/each}
        </div>
      {/each}
    </div>

    <!-- Row 2: scrolls right -->
    <div class="flex animate-marquee-reverse will-change-transform group-hover:[animation-play-state:paused]">
      {#each Array(4) as _, i}
        <div class="contents" aria-hidden={i > 0 ? 'true' : undefined}>
          {#each row2 as skill}
            <div class="flex items-center gap-2 rounded border border-border-dim bg-surface px-4 py-2 md:px-5 md:py-2.5 mx-1.5 shrink-0 hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5 transition-all duration-200">
              <span class="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true"></span>
              <span class="font-mono text-xs md:text-sm uppercase tracking-wider text-text-main">{skill}</span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  @keyframes marquee {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-25%, 0, 0); }
  }

  @keyframes marquee-reverse {
    0% { transform: translate3d(-25%, 0, 0); }
    100% { transform: translate3d(0, 0, 0); }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  .animate-marquee-reverse {
    animation: marquee-reverse 30s linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-marquee,
    .animate-marquee-reverse {
      animation: none;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>
