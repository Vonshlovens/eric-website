<script lang="ts">
  import { projects } from '$lib/data/projects';
  import { experiences } from '$lib/data/experience';
  import { education } from '$lib/data/education';
  import { interests } from '$lib/data/interests';
  import ProjectCard from '$lib/components/ProjectCard.svelte';
  import SkillsMarquee from '$lib/components/SkillsMarquee.svelte';
  import SEO from '$lib/components/SEO.svelte';

  // Lucide Icons
  import {
    Github,
    Linkedin,
    Twitter,
    User,
    Mail,
    FileDown,
    ArrowRight,
    ChevronRight,
    ExternalLink,
    Building2,
    Rocket,
    Palette,
    Briefcase,
    GraduationCap,
    Award,
    LockOpen,
    Footprints,
    Camera,
    Coffee,
    Check
  } from 'svelte-lucide';

  // Cursor proximity reveal state
  let mouseX = $state(0);
  let mouseY = $state(0);
  let heroElement: HTMLElement | null = null;

  function handleMouseMove(e: MouseEvent) {
    if (!heroElement) return;
    const rect = heroElement.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }

  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  // Icon mapping for experience
  const expIcons: Record<string, typeof Building2> = {
    building: Building2,
    rocket: Rocket,
    palette: Palette,
    briefcase: Briefcase
  };

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
<main class="pt-16">
  <!-- Hero Section -->
  <section id="about" class="min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-24 bg-bg">
    <div class="max-w-4xl mx-auto px-6 w-full">
      <div
        class="loom-frame max-w-2xl mx-auto text-center"
        bind:this={heroElement}
        onmousemove={handleMouseMove}
      >
        <!-- Avatar with cursor-proximity reveal -->
        <div class="mb-8 relative inline-block">
          <div class="w-28 h-28 mx-auto rounded-lg bg-bg-muted border-2 border-thread-muted flex items-center justify-center overflow-hidden relative group cursor-crosshair">
            <!-- Default avatar -->
            <div class="absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300">
              <User size="56" class="text-accent" strokeWidth="1.5" />
            </div>

            <!-- GitHub avatar (revealed on hover) -->
            <div class="absolute inset-0 z-20 pointer-events-none">
              <div
                class="absolute inset-0 bg-bg-muted flex items-center justify-center overflow-hidden"
                style="
                  clip-path: circle(80px at {mouseX}px {mouseY}px);
                "
              >
                <img
                  src="https://github.com/Vonshlovens.png"
                  alt="Vonshlovens GitHub avatar"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Name with cursor-proximity reveal -->
        <div class="relative inline-block mb-3 cursor-crosshair">
          <h1 class="font-mono text-2xl md:text-3xl font-bold text-fg tracking-tight">
            <span class="relative inline-block">
              <!-- Default name -->
              <span class="relative z-10">
                Eric Evans<span class="animate-pulse text-accent">_</span>
              </span>

              <!-- GitHub username (revealed on hover) -->
              <span
                class="absolute inset-0 z-20 pointer-events-none overflow-hidden"
                style="
                  clip-path: circle(120px at {mouseX}px {mouseY - 120}px);
                "
              >
                <span class="text-accent font-bold">
                  Vonshlovens<span class="animate-pulse">_</span>
                </span>
              </span>
            </span>
          </h1>
        </div>

        <!-- Tagline -->
        <p class="font-mono text-accent font-bold uppercase tracking-wide text-sm mb-6">
          Full-Stack Developer & Open Source Enthusiast
        </p>

        <!-- Bio -->
        <p class="font-mono text-base text-fg-muted leading-relaxed max-w-xl mx-auto mb-10">
          Building elegant solutions with modern web technologies.
          Passionate about developer experience and clean code.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onclick={() => scrollTo('projects')}
            class="
              px-4 py-2
              font-mono font-bold
              bg-accent text-bg
              rounded-md
              transition-colors duration-200
              hover:bg-accent-hover
            "
          >
            View Projects
          </button>

          <button
            onclick={() => scrollTo('contact')}
            class="
              px-4 py-2
              font-mono font-bold
              bg-transparent text-fg
              border border-border
              rounded-md
              transition-colors duration-200
              hover:bg-bg-muted
            "
          >
            Get in Touch
          </button>
        </div>

        <!-- Social Links -->
        <div class="flex items-center justify-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono font-bold text-accent underline underline-offset-4 decoration-1 transition-colors duration-200 hover:text-accent-hover flex items-center gap-2"
          >
            <Github size="18" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono font-bold text-accent underline underline-offset-4 decoration-1 transition-colors duration-200 hover:text-accent-hover flex items-center gap-2"
          >
            <Linkedin size="18" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono font-bold text-accent underline underline-offset-4 decoration-1 transition-colors duration-200 hover:text-accent-hover flex items-center gap-2"
          >
            <Twitter size="18" />
            <span>Twitter</span>
          </a>
        </div>
      </div>
    </div>
  </section>

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
  <section id="experience" class="py-12 md:py-16 bg-bg">
    <div class="max-w-4xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <span class="font-mono text-accent font-bold uppercase tracking-wide text-sm">
          Career
        </span>
        <h2 class="font-mono text-xl font-bold text-fg mt-2">
          Work Experience
        </h2>
        <div class="thread-divider max-w-xs mx-auto"></div>
        <p class="font-mono text-base text-fg-muted leading-relaxed max-w-xl mx-auto">
          My professional journey building software and leading teams.
        </p>
      </div>

      <!-- Timeline -->
      <div class="max-w-2xl mx-auto">
        {#each experiences as exp, i (exp.id)}
          {@const IconComponent = expIcons[exp.icon]}
          <div class="relative pl-8 md:pl-12 pb-10 last:pb-0 group">
            <!-- Timeline Line -->
            {#if i < experiences.length - 1}
              <div class="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-px bg-thread-muted group-hover:bg-thread transition-colors duration-300"></div>
            {/if}

            <!-- Timeline Dot -->
            <div class="absolute left-0 top-1 w-6 h-6 md:w-8 md:h-8 rounded-md bg-bg-muted border border-border-muted group-hover:border-thread flex items-center justify-center transition-colors duration-300">
              <IconComponent size="14" class="text-fg-muted" />
            </div>

            <!-- Experience Card -->
            <article class="bg-bg-muted rounded-lg p-6 border border-border-muted transition-all duration-200 hover:border-thread-muted">
              <!-- Header -->
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 class="font-mono text-lg font-bold text-fg">
                    {exp.title}
                  </h3>
                  <h4 class="font-mono text-base text-accent">
                    {exp.company}
                  </h4>
                </div>
                <div class="font-mono text-sm text-fg-subtle">
                  <div>{exp.duration}</div>
                  <div>{exp.location}</div>
                </div>
              </div>

              <!-- Duties -->
              <ul class="space-y-2 mb-4">
                {#each exp.duties as duty}
                  <li class="font-mono text-fg-muted text-sm flex items-start gap-2">
                    <ChevronRight size="14" class="text-thread mt-0.5 shrink-0" />
                    <span>{duty}</span>
                  </li>
                {/each}
              </ul>

              <!-- Achievements -->
              {#if exp.achievements && exp.achievements.length > 0}
                <div class="mb-4 p-4 bg-accent-soft rounded-md border border-thread-muted">
                  <p class="font-mono text-xs uppercase tracking-wide text-accent font-bold mb-2">Key Achievements</p>
                  <ul class="space-y-1">
                    {#each exp.achievements as achievement}
                      <li class="font-mono text-sm text-fg-muted flex items-start gap-2">
                        <Check size="14" class="text-success mt-0.5 shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    {/each}
                  </ul>
                </div>
              {/if}

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2">
                {#each exp.technologies as tech}
                  <span class="
                    px-2 py-1
                    font-mono text-xs
                    bg-bg-subtle
                    text-fg-muted
                    rounded-sm
                    border border-border-muted
                  ">
                    {tech}
                  </span>
                {/each}
              </div>
            </article>
          </div>
        {/each}
      </div>

      <!-- Resume Download -->
      <div class="text-center mt-12">
        <a
          href="/resume.pdf"
          download
          class="
            inline-flex items-center gap-2
            px-4 py-2
            font-mono font-bold
            bg-transparent text-fg
            border border-border
            rounded-md
            transition-colors duration-200
            hover:bg-bg-muted hover:border-thread-muted
          "
        >
          <FileDown size="18" />
          Download Resume
        </a>
      </div>
    </div>
  </section>

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
