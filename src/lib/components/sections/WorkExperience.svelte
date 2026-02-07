<script lang="ts">
  import { experiences } from '$lib/data/experience';
  import { scrollReveal } from '$lib/actions/scrollReveal';
</script>

<section class="py-16 md:py-20" id="experience" aria-label="Work Experience">
  <div class="max-w-7xl mx-auto px-6 md:px-12">
    <!-- Section Header -->
    <div class="flex items-center gap-2 mb-8" use:scrollReveal>
      <span class="material-symbols-outlined text-accent" aria-hidden="true">work</span>
      <h2 class="text-text-white text-xl font-mono font-bold uppercase tracking-[0.2em]">
        Work Experience
      </h2>
    </div>

    <!-- Resume download link -->
    <div class="mb-8" use:scrollReveal>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Eric_Evans_Resume.pdf"
        class="text-xs font-mono text-accent hover:text-text-white transition-colors uppercase tracking-widest"
      >
        Download Full Resume →
      </a>
    </div>

    <!-- Timeline -->
    <div class="max-w-3xl">
      {#each experiences as exp, i (exp.id)}
        <div use:scrollReveal class="relative pb-10 last:pb-0 pl-0 md:pl-8">
          <!-- Timeline Rail (desktop only) -->
          {#if i < experiences.length - 1}
            <div
              class="hidden md:block absolute left-[5px] top-8 bottom-0 w-[2px] bg-border-dim"
              aria-hidden="true"
            ></div>
          {/if}

          <!-- Timeline Dot (desktop only) -->
          <div
            class="hidden md:block absolute left-0 top-[2rem] w-3 h-3 rounded-full bg-accent"
            aria-hidden="true"
          ></div>

          <!-- Experience Card -->
          <article
            class="bg-surface border border-border-dim rounded p-8 hover:border-accent/50 transition-all duration-300 md:border-l-border-dim border-t-2 border-t-accent md:border-t-0 md:border-t-transparent"
          >
            <h3 class="text-text-white font-mono font-bold text-lg uppercase tracking-tight mb-1">
              {exp.title}
            </h3>
            <h4 class="text-accent font-mono text-sm mb-3">
              {exp.company}
            </h4>

            <div class="flex flex-wrap items-center gap-4 text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">
              <span>{exp.duration}</span>
              <span>·</span>
              <span>{exp.location}</span>
            </div>

            <ul class="space-y-2 mb-6">
              {#each exp.duties as duty}
                <li class="text-text-main text-sm font-sans leading-relaxed pl-4 border-l-2 border-border-dim">
                  {duty}
                </li>
              {/each}
            </ul>

            <div class="flex flex-wrap gap-2">
              {#each exp.technologies as tech}
                <span class="bg-primary border border-border-dim px-2 py-1 text-[10px] font-mono text-text-muted uppercase">
                  {tech}
                </span>
              {/each}
            </div>
          </article>
        </div>
      {/each}
    </div>
  </div>
</section>
