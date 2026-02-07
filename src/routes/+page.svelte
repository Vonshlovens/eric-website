<script lang="ts">
  import { projects } from '$lib/data/projects';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SkillsMarquee from '$lib/components/SkillsMarquee.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import CoreCompetencies from '$lib/components/sections/CoreCompetencies.svelte';
  import WorkExperience from '$lib/components/sections/WorkExperience.svelte';
  import Education from '$lib/components/sections/Education.svelte';
  import Interests from '$lib/components/sections/Interests.svelte';
  import ContactCTA from '$lib/components/sections/ContactCTA.svelte';

  // Lucide Icons
  import {
    ArrowRight
  } from 'svelte-lucide';

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);
</script>

<SEO
  title="Eric Evans - Full-Stack Developer"
  description="Building elegant solutions with modern web technologies. Portfolio showcasing projects in TypeScript, Svelte, SvelteKit, and more."
  url="https://example.com"
  image="/og-image.png"
  imageAlt="Eric Evans - Full-Stack Developer Portfolio"
  type="profile"
  author="Eric Evans"
  siteName="Eric Evans Portfolio"
  twitterHandle="@ericevans"
  keywords={[
    'full-stack developer',
    'web development',
    'TypeScript',
    'Svelte',
    'SvelteKit',
    'Deno',
    'React',
    'software engineer',
    'portfolio',
    'open source'
  ]}
/>

<!-- Main Content -->
<main class="pt-16" id="main-content">
  <!-- Hero Section -->
  <Hero />

  <!-- Core Competencies -->
  <CoreCompetencies />

  <!-- Skills Marquee -->
  <SkillsMarquee />

  <!-- Projects Section -->
  <section id="projects" class="py-12 md:py-16 bg-bg-muted">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
          Portfolio
        </span>
        <h2 class="font-mono text-xl font-bold text-fg mt-2">
          Featured Projects
        </h2>
        <div class="thread-divider max-w-xs mx-auto"></div>
        <p class="font-mono text-base text-fg-muted leading-relaxed max-w-xl mx-auto">
          A selection of projects I've built. Each one taught me something new about building software that matters.
        </p>
      </div>

      <!-- Featured Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {#each featuredProjects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>

      <!-- Other Projects -->
      {#if otherProjects.length > 0}
        <div class="thread-divider-knot"></div>
        <h3 class="font-mono text-lg font-bold text-fg mb-8 text-center mt-8">
          More Projects
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each otherProjects as project (project.id)}
            <ProjectCard {project} />
          {/each}
        </div>
      {/if}

      <!-- View All Link -->
      <div class="text-center mt-12">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          class="font-mono font-bold text-accent underline underline-offset-4 decoration-1 transition-colors duration-200 hover:text-accent-hover inline-flex items-center gap-2"
        >
          <span>View all on GitHub</span>
          <ArrowRight size="16" />
        </a>
      </div>
    </div>
  </section>

  <!-- Work Experience Section -->
  <WorkExperience />

  <!-- Education & Certifications -->
  <Education />

  <!-- Interests / Beyond Code -->
  <Interests />

  <!-- Contact CTA -->
  <ContactCTA />
</main>

<!-- Footer -->
<footer class="bg-bg border-t border-border-muted py-8">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center font-mono text-sm text-fg-subtle">
      &copy; {new Date().getFullYear()} Eric Evans. Built with SvelteKit.
    </div>
  </div>
</footer>
