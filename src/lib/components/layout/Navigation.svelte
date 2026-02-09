<script lang="ts">
  import { motionStore } from '$lib/stores/motion.svelte';
  import { themeStore } from '$lib/stores/theme.svelte';
  import { site } from '$lib/config/site';
  import { tick, onMount, onDestroy } from 'svelte';

  let mobileMenuOpen = $state(false);
  let menuToggleBtn = $state<HTMLButtonElement>();
  let mobileMenuEl = $state<HTMLElement>();
  let activeSection = $state('about');

  const navLinks = [
    { label: 'Dashboard', href: '#about' },
    { label: 'Skills', href: '#skill-radar' },
    { label: 'Projects', href: '#engineering-log' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Interests', href: '#interests' },
    { label: 'Contact', href: '#contact' }
  ];

  let observer: IntersectionObserver | undefined;

  onMount(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
  });

  onDestroy(() => {
    observer?.disconnect();
  });

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    mobileMenuOpen = false;
  }

  async function toggleMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      await tick();
      const firstLink = mobileMenuEl?.querySelector('a, button') as HTMLElement | null;
      firstLink?.focus();
    }
  }

  function closeMenu() {
    mobileMenuOpen = false;
    menuToggleBtn?.focus();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && mobileMenuOpen) {
      closeMenu();
      return;
    }

    // Focus trap for mobile menu
    if (e.key === 'Tab' && mobileMenuOpen && mobileMenuEl) {
      const focusable = mobileMenuEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 h-16 bg-surface/95 backdrop-blur-sm border-b border-border-dim">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
    <!-- Left: Brand + Divider + Status -->
    <div class="flex items-center gap-4">
      <!-- Brand -->
      <a href="/" class="font-mono font-bold text-xl text-accent uppercase tracking-tight">
        EE_SYS
      </a>

      <!-- Divider -->
      <div class="h-4 w-px bg-border-dim hidden sm:block"></div>

      <!-- Live Status Indicator -->
      <div class="hidden sm:flex items-center gap-2" aria-label="Status: active">
        <span class="relative flex h-2 w-2" aria-hidden="true">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-ok opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-status-ok"></span>
        </span>
        <span class="text-[10px] text-text-muted font-mono uppercase tracking-widest">Live Node</span>
      </div>
    </div>

    <!-- Center/Right: Desktop Nav + CTA -->
    <div class="hidden lg:flex items-center gap-8">
      <nav aria-label="Main navigation">
        <ul class="flex items-center gap-8">
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="text-xs font-mono hover:text-text-white transition-colors duration-200 tracking-widest uppercase py-3 inline-flex items-center {activeSection === link.href.slice(1) ? 'text-text-white' : 'text-text-muted'}"
                aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Theme Toggle -->
      <button
        type="button"
        onclick={() => themeStore.toggle()}
        class="w-10 h-10 flex items-center justify-center text-text-muted hover:text-accent border border-border-dim hover:border-accent/50 rounded transition-colors duration-200"
        aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <span class="material-symbols-outlined text-lg leading-none">
          {themeStore.isDark ? 'light_mode' : 'dark_mode'}
        </span>
      </button>

      <!-- Animation Toggle -->
      <button
        type="button"
        onclick={() => motionStore.toggle()}
        class="w-10 h-10 flex items-center justify-center text-text-muted hover:text-accent border border-border-dim hover:border-accent/50 rounded transition-colors duration-200"
        aria-label={motionStore.disabled ? 'Enable animations' : 'Disable animations'}
        aria-pressed={motionStore.disabled}
        title={motionStore.disabled ? 'Animations off' : 'Animations on'}
      >
        <span class="material-symbols-outlined text-lg leading-none">
          {motionStore.disabled ? 'motion_photos_paused' : 'animation'}
        </span>
      </button>

      <!-- CTA Button -->
      <a
        href={site.github.url}
        target="_blank"
        rel="noopener noreferrer"
        class="border border-accent text-accent px-6 py-3 rounded text-xs font-mono font-bold hover:bg-accent hover:text-primary transition-all duration-200 uppercase bg-accent/10 inline-flex items-center"
      >
        View Source
        <span class="sr-only">(opens in new tab)</span>
      </a>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
      type="button"
      bind:this={menuToggleBtn}
      onclick={toggleMenu}
      class="lg:hidden text-text-muted hover:text-text-white transition-colors w-10 h-10 flex items-center justify-center"
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-menu"
    >
      {#if mobileMenuOpen}
        <span class="material-symbols-outlined text-2xl">close</span>
      {:else}
        <span class="material-symbols-outlined text-2xl">menu</span>
      {/if}
    </button>
  </div>

  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <nav
      bind:this={mobileMenuEl}
      id="mobile-menu"
      class="lg:hidden bg-surface border-b border-border-dim animate-slide-down"
      aria-label="Mobile navigation"
    >
      <ul class="px-4 sm:px-6 py-4 space-y-1">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              onclick={() => scrollTo(link.href.slice(1))}
              class="block py-3 text-xs font-mono hover:text-text-white transition-colors tracking-widest uppercase {activeSection === link.href.slice(1) ? 'text-text-white' : 'text-text-muted'}"
              aria-current={activeSection === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li class="pt-3 mt-3 border-t border-border-dim">
          <button
            type="button"
            onclick={() => themeStore.toggle()}
            class="flex items-center gap-3 py-3 w-full text-left min-h-[44px]"
            aria-label={themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span class="material-symbols-outlined text-lg text-text-muted">
              {themeStore.isDark ? 'light_mode' : 'dark_mode'}
            </span>
            <span class="text-xs font-mono text-text-muted tracking-widest uppercase">Theme</span>
            <span class="ml-auto text-[10px] font-mono uppercase tracking-widest {themeStore.isDark ? 'text-text-muted' : 'text-status-ok'}">
              {themeStore.isDark ? 'Dark' : 'Light'}
            </span>
          </button>
        </li>
        <li>
          <button
            type="button"
            onclick={() => motionStore.toggle()}
            class="flex items-center gap-3 py-3 w-full text-left min-h-[44px]"
            aria-label={motionStore.disabled ? 'Enable animations' : 'Disable animations'}
            aria-pressed={motionStore.disabled}
          >
            <span class="material-symbols-outlined text-lg text-text-muted">
              {motionStore.disabled ? 'motion_photos_paused' : 'animation'}
            </span>
            <span class="text-xs font-mono text-text-muted tracking-widest uppercase">Animations</span>
            <span class="ml-auto text-[10px] font-mono uppercase tracking-widest {motionStore.disabled ? 'text-accent' : 'text-status-ok'}">
              {motionStore.disabled ? 'Off' : 'On'}
            </span>
          </button>
        </li>
        <li class="pt-3 mt-3 border-t border-border-dim">
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center border border-accent text-accent px-6 py-3 rounded text-xs font-mono font-bold hover:bg-accent hover:text-primary transition-all duration-200 uppercase bg-accent/10"
          >
            View Source
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </li>
      </ul>
    </nav>
  {/if}
</header>

<style>
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-down {
    animation: slide-down 0.15s ease-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-slide-down {
      animation: none;
    }
  }

  :global(html[data-reduce-motion]) .animate-slide-down {
    animation: none;
  }
</style>
