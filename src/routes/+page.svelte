<script lang="ts">
  function scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const socialLinks = [
    { label: 'GitHub', url: 'https://github.com', icon: '💻' },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' }
  ];
</script>

<svelte:head>
  <title>Eric Shlovens - Full-Stack Developer</title>
  <meta name="description" content="Portfolio of Eric Shlovens, full-stack developer specializing in modern web technologies." />
</svelte:head>

<!-- Navigation -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-[var(--color-background)]/95 backdrop-blur-sm border-b border-[var(--color-border)]">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-accent)]">
        ES
      </a>

      <ul class="hidden md:flex items-center gap-8">
        <li><a href="#about" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150">About</a></li>
        <li><a href="#projects" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150">Projects</a></li>
        <li><a href="#experience" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150">Experience</a></li>
        <li><a href="#contact" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<!-- Hero Section -->
<main class="min-h-screen pt-16">
  <section id="about" class="min-h-[calc(100vh-4rem)] flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="max-w-4xl mx-auto text-center stagger-children">

        <!-- Avatar -->
        <div class="mb-8">
          <div class="w-32 h-32 mx-auto rounded-full bg-[var(--color-surface)] border-4 border-[var(--color-accent)] flex items-center justify-center text-6xl">
            👨‍💻
          </div>
        </div>

        <!-- Name and Title -->
        <h1 class="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
          Eric Shlovens<span class="animate-blink text-[var(--color-accent)]">_</span>
        </h1>

        <p class="font-[family-name:var(--font-display)] text-xl md:text-2xl text-[var(--color-accent)] mb-6">
          Full-Stack Developer & Open Source Enthusiast
        </p>

        <!-- Bio -->
        <p class="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
          Building elegant solutions with modern web technologies.
          Passionate about developer experience and clean code.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onclick={() => scrollTo('projects')}
            class="
              px-6 py-3 min-w-[200px]
              font-[family-name:var(--font-display)] text-base
              bg-[var(--color-accent)]
              text-[var(--color-bg-dark)]
              rounded-md
              border-2 border-transparent
              transition-all duration-150
              hover:brightness-110
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
            "
          >
            View Projects
          </button>

          <button
            onclick={() => scrollTo('contact')}
            class="
              px-6 py-3 min-w-[200px]
              font-[family-name:var(--font-display)] text-base
              bg-transparent
              text-[var(--color-text-primary)]
              rounded-md
              border-2 border-[var(--color-border)]
              transition-all duration-150
              hover:border-[var(--color-accent)]
              hover:text-[var(--color-accent)]
              active:scale-95
            "
          >
            Get in Touch
          </button>
        </div>

        <!-- Social Links -->
        <div class="flex items-center justify-center gap-6">
          {#each socialLinks as link}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              class="
                flex items-center gap-2
                text-[var(--color-link)]
                hover:text-[var(--color-accent)]
                transition-colors duration-150
              "
            >
              <span class="text-2xl">{link.icon}</span>
              <span class="hidden sm:inline font-[family-name:var(--font-display)]">{link.label}</span>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- Placeholder sections for scrolling -->
  <section id="projects" class="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
    <div class="text-center">
      <h2 class="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-accent)] mb-4">
        Featured Projects
      </h2>
      <p class="text-[var(--color-text-muted)]">Coming soon...</p>
    </div>
  </section>

  <section id="experience" class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h2 class="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-accent)] mb-4">
        Work Experience
      </h2>
      <p class="text-[var(--color-text-muted)]">Coming soon...</p>
    </div>
  </section>

  <section id="contact" class="min-h-screen flex items-center justify-center bg-[var(--color-surface)]">
    <div class="text-center">
      <h2 class="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-[var(--color-accent)] mb-4">
        Let's Connect
      </h2>
      <p class="text-[var(--color-text-muted)]">Coming soon...</p>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="bg-[var(--color-background)] border-t border-[var(--color-border)] py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center text-[var(--color-text-muted)] font-[family-name:var(--font-display)] text-sm">
      &copy; {new Date().getFullYear()} Eric Shlovens
    </div>
  </div>
</footer>
