<script lang="ts">
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { skillIcons } from '$lib/data/skill-icons';

  const skills = [
    'Python', 'JavaScript', 'TypeScript', 'Svelte', 'Deno',
    'Node', 'Go', 'Azure', 'GCP', 'Terraform',
    'Docker', 'Kubernetes', 'Tailwind', 'RabbitMQ', 'FastAPI',
    'Bun', 'LLMs', 'PostgreSQL', 'Redis', 'Git'
  ];
</script>

<section aria-label="Technical Skills" class="bg-primary py-8" use:scrollReveal>
  <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap justify-center gap-2 md:gap-3">
      {#each skills as skill}
        {@const icon = skillIcons[skill]}
        <div class="skill-chip flex items-center gap-2 rounded border border-border-dim bg-surface px-4 py-2 md:px-5 md:py-2.5 hover:border-accent/30 hover:bg-surface-highlight hover:-translate-y-0.5 transition-all duration-200" style="--brand-color: {icon?.color ?? '#BFB1C1'}">
          {#if icon}
            <svg class="skill-icon w-3.5 h-3.5 md:w-4 md:h-4 shrink-0 transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d={icon.path} />
            </svg>
          {:else}
            <span class="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true"></span>
          {/if}
          <span class="font-mono text-xs md:text-sm uppercase tracking-wider text-text-main">{skill}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* Skill icon: monochrome muted by default, brand color on chip hover */
  .skill-icon {
    color: var(--color-text-muted, #888888);
  }

  .skill-chip:hover .skill-icon {
    color: var(--brand-color);
  }
</style>
