<script lang="ts">
  import type { Project } from '$lib/data/projects';

  interface Props {
    project: Project;
  }

  let { project }: Props = $props();
</script>

<article class="
  group
  bg-bg
  rounded-lg
  p-6
  border border-border-muted
  transition-all duration-200
  hover:border-thread-muted
">
  <!-- Header -->
  <div class="flex items-start justify-between gap-4 mb-4">
    <h3 class="font-mono text-lg font-bold text-fg group-hover:text-accent transition-colors duration-200">
      {project.title}
    </h3>
    {#if project.featured}
      <span class="font-mono text-xs font-bold uppercase tracking-wide text-accent bg-accent-soft px-2 py-1 rounded-sm border border-thread-muted">
        Featured
      </span>
    {/if}
  </div>

  <!-- Description -->
  <p class="font-mono text-sm text-fg-muted leading-relaxed mb-4">
    {project.description}
  </p>

  <!-- Tags -->
  <div class="flex flex-wrap gap-2 mb-6">
    {#each project.tags as tag}
      <span class="font-mono text-xs text-fg-subtle bg-bg-subtle px-2 py-1 rounded-sm border border-border-muted">
        {tag}
      </span>
    {/each}
  </div>

  <!-- Links -->
  <div class="flex items-center gap-4">
    {#if project.github}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        class="
          font-mono font-bold text-sm
          text-accent
          underline underline-offset-4 decoration-1
          transition-colors duration-200
          hover:text-accent-hover
        "
      >
        GitHub
      </a>
    {/if}
    {#if project.demo}
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        class="
          font-mono font-bold text-sm
          text-accent
          underline underline-offset-4 decoration-1
          transition-colors duration-200
          hover:text-accent-hover
        "
      >
        Live Demo
      </a>
    {/if}
  </div>
</article>
