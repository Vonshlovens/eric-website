<script lang="ts">
  const skills = [
    'Python',
    'JavaScript',
    'TypeScript',
    'Svelte',
    'Deno',
    'Node',
    'Go',
    'Azure',
    'GCP',
    'Terraform',
    'Docker',
    'Kubernetes',
    'Tailwind',
    'RabbitMQ',
    'FastAPI',
    'Bun',
    'LLMs',
    'PostgreSQL',
    'Redis',
    'Git'
  ];
</script>

<section class="relative py-12 md:py-16 overflow-hidden bg-bg-subtle w-full">
  <!-- Subtle woven pattern background -->
  <div class="absolute inset-0 opacity-5 pointer-events-none"
    style="background-image: linear-gradient(90deg, var(--color-thread-muted) 1px, transparent 1px), linear-gradient(var(--color-thread-muted) 1px, transparent 1px); background-size: 24px 24px;">
  </div>

  <!-- Heading -->
  <div class="text-center mb-10 relative z-10">
    <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
      What I work with
    </span>
    <h2 class="font-mono text-xl font-bold text-fg mt-2">
      Skills & Technologies
    </h2>
    <div class="thread-divider max-w-xs mx-auto"></div>
  </div>

  <div class="relative">
    <!-- Fade edges -->
    <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg-subtle to-transparent z-20 pointer-events-none"></div>
    <div class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg-subtle to-transparent z-20 pointer-events-none"></div>

    <!-- First row - scrolls left -->
    <div class="flex animate-marquee mb-3 w-fit">
      {#each [0, 1, 2, 3] as _}
        <div class="flex shrink-0 gap-3 md:gap-4 px-1.5 md:px-2">
          {#each skills.slice(0, 10) as skill}
            <div class="skill-chip group">
              <span class="skill-dot"></span>
              <span class="font-mono font-bold text-sm text-fg group-hover:text-accent transition-colors duration-200">
                {skill}
              </span>
            </div>
          {/each}
        </div>
      {/each}
    </div>

    <!-- Second row - scrolls right -->
    <div class="flex animate-marquee-reverse w-fit">
      {#each [0, 1, 2, 3] as _}
        <div class="flex shrink-0 gap-3 md:gap-4 px-1.5 md:px-2">
          {#each skills.slice(10) as skill}
            <div class="skill-chip group">
              <span class="skill-dot"></span>
              <span class="font-mono font-bold text-sm text-fg group-hover:text-accent transition-colors duration-200">
                {skill}
              </span>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .skill-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: var(--color-bg-muted);
    border: 1px solid var(--color-border-muted);
    border-radius: var(--radius-md);
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .skill-chip:hover {
    border-color: var(--color-thread);
    background: var(--color-accent-soft);
  }

  .skill-dot {
    width: 5px;
    height: 5px;
    background: var(--color-thread);
    border-radius: var(--radius-full);
  }

  .skill-chip:hover .skill-dot {
    background: var(--color-accent);
    box-shadow: 0 0 6px var(--color-accent);
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-25%);
    }
  }

  @keyframes marquee-reverse {
    0% {
      transform: translateX(-25%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  .animate-marquee-reverse {
    animation: marquee-reverse 30s linear infinite;
  }

  .animate-marquee:hover,
  .animate-marquee-reverse:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-marquee,
    .animate-marquee-reverse {
      animation: none;
    }
  }
</style>
