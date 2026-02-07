<script lang="ts">
  import { projects } from '$lib/data/projects';
  import { education } from '$lib/data/education';
  import { interests } from '$lib/data/interests';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SkillsMarquee from '$lib/components/SkillsMarquee.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Hero from '$lib/components/sections/Hero.svelte';
  import CoreCompetencies from '$lib/components/sections/CoreCompetencies.svelte';
  import WorkExperience from '$lib/components/sections/WorkExperience.svelte';

  // Lucide Icons
  import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    FileDown,
    ArrowRight,
    ExternalLink,
    GraduationCap,
    Award,
    LockOpen,
    Footprints,
    Camera,
    Coffee
  } from 'svelte-lucide';

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Icon mapping for interests
  const interestIcons: Record<string, typeof LockOpen> = {
    'lock-open': LockOpen,
    'footprints': Footprints,
    'camera': Camera,
    'coffee': Coffee
  };
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

  <!-- Education Section -->
  <section id="education" class="py-12 md:py-16 bg-bg-muted">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
          Learning
        </span>
        <h2 class="font-mono text-xl font-bold text-fg mt-2">
          Education & Certifications
        </h2>
        <div class="thread-divider max-w-xs mx-auto"></div>
        <p class="font-mono text-base text-fg-muted leading-relaxed max-w-xl mx-auto">
          Academic foundation and continuous learning.
        </p>
      </div>

      <!-- Education Grid -->
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each education as item (item.id)}
          <article class="bg-bg rounded-lg p-6 border border-border-muted transition-all duration-200 hover:border-thread-muted text-center">
            <!-- Icon -->
            <div class="w-14 h-14 mx-auto mb-4 rounded-md bg-accent-soft border border-thread-muted flex items-center justify-center">
              {#if item.type === 'degree'}
                <GraduationCap size="28" class="text-accent" />
              {:else}
                <Award size="28" class="text-accent" />
              {/if}
            </div>

            <!-- Content -->
            <h3 class="font-mono text-base font-bold text-fg mb-1">
              {item.name}
            </h3>
            <p class="font-mono text-sm text-fg-muted mb-2">
              {item.institution}
            </p>
            <p class="font-mono text-xs text-fg-subtle mb-2">
              {item.year}
            </p>

            {#if item.honors}
              <span class="inline-block font-mono text-xs font-bold text-accent bg-accent-soft px-2 py-1 rounded-sm border border-thread-muted">
                {item.honors}
              </span>
            {/if}

            {#if item.credentialUrl}
              <a
                href={item.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 mt-4 font-mono font-bold text-sm text-accent underline underline-offset-4 decoration-1 hover:text-accent-hover transition-colors duration-200"
              >
                <span>View Credential</span>
                <ExternalLink size="12" />
              </a>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Interests Section -->
  <section id="interests" class="py-12 md:py-16 bg-bg">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
          Personal
        </span>
        <h2 class="font-mono text-xl font-bold text-fg mt-2">
          Beyond Code
        </h2>
        <div class="thread-divider max-w-xs mx-auto"></div>
        <p class="font-mono text-base text-fg-muted leading-relaxed max-w-xl mx-auto">
          What keeps me curious and inspired outside of work.
        </p>
      </div>

      <!-- Interests Grid -->
      <div class="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each interests as interest (interest.id)}
          {@const IconComponent = interestIcons[interest.icon]}
          <article class="bg-bg-muted rounded-lg p-6 border border-border-muted transition-all duration-200 hover:border-thread-muted">
            <!-- Icon and Title -->
            <div class="flex items-center gap-4 mb-4">
              <div class="w-10 h-10 rounded-md bg-accent-soft border border-thread-muted flex items-center justify-center">
                <IconComponent size="20" class="text-accent" />
              </div>
              <h3 class="font-mono text-lg font-bold text-fg">
                {interest.title}
              </h3>
            </div>

            <!-- Description -->
            <p class="font-mono text-sm text-fg-muted leading-relaxed mb-4">
              {interest.description}
            </p>

            <!-- Links -->
            {#if interest.links}
              <div class="flex flex-wrap gap-4">
                {#each interest.links as link}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 font-mono font-bold text-sm text-accent underline underline-offset-4 decoration-1 hover:text-accent-hover transition-colors duration-200"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size="12" />
                  </a>
                {/each}
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section id="contact" class="py-12 md:py-16 bg-bg-subtle">
    <div class="max-w-4xl mx-auto px-6">
      <div class="loom-frame max-w-xl mx-auto text-center">
        <!-- Section Header -->
        <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
          Connect
        </span>
        <h2 class="font-mono text-xl font-bold text-fg mt-2 mb-2">
          Let's Connect
        </h2>
        <div class="thread-divider-knot max-w-xs mx-auto"></div>
        <p class="font-mono text-base text-fg-muted leading-relaxed mt-6 mb-10">
          Have a project in mind or just want to chat? I'd love to hear from you.
        </p>

        <!-- Contact Methods -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-10">
          <a
            href="mailto:eric@example.com"
            class="
              flex items-center gap-2
              px-4 py-2
              font-mono font-bold
              bg-accent text-bg
              rounded-md
              transition-colors duration-200
              hover:bg-accent-hover
            "
          >
            <Mail size="18" />
            Send Email
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            class="
              flex items-center gap-2
              px-4 py-2
              font-mono font-bold
              bg-transparent text-fg
              border border-border
              rounded-md
              transition-colors duration-200
              hover:bg-bg-muted
            "
          >
            <Linkedin size="18" />
            LinkedIn
          </a>
        </div>

        <!-- Availability Status -->
        <div class="flex items-center justify-center gap-3">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <p class="font-mono text-sm text-fg-muted">
            Currently available for freelance work
          </p>
        </div>

        <!-- Social Links -->
        <div class="thread-divider mt-10"></div>
        <div class="flex items-center justify-center gap-6 mt-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 font-mono text-sm text-fg-subtle hover:text-accent transition-colors duration-200"
          >
            <Github size="16" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 font-mono text-sm text-fg-subtle hover:text-accent transition-colors duration-200"
          >
            <Linkedin size="16" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 font-mono text-sm text-fg-subtle hover:text-accent transition-colors duration-200"
          >
            <Twitter size="16" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="bg-bg border-t border-border-muted py-8">
  <div class="max-w-4xl mx-auto px-6">
    <div class="text-center font-mono text-sm text-fg-subtle">
      &copy; {new Date().getFullYear()} Eric Evans. Built with SvelteKit.
    </div>
  </div>
</footer>
