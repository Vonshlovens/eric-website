<script lang="ts">
  import { motionStore } from '$lib/stores/motion.svelte';
  import { tick } from 'svelte';

  let mobileMenuOpen = $state(false);
  let menuToggleBtn = $state<HTMLButtonElement>();
  let mobileMenuEl = $state<HTMLElement>();

  const navLinks = [
    { label: 'Dashboard', href: '#about' },
    { label: 'Projects', href: '#engineering-log' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' }
  ];

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
  <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
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
    <div class="hidden md:flex items-center gap-8">
      <nav aria-label="Main navigation">
        <ul class="flex items-center gap-8">
          {#each navLinks as link}
            <li>
              <a
                href={link.href}
                class="text-xs font-mono text-text-muted hover:text-text-white transition-colors duration-200 tracking-widest uppercase"
              >
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <!-- Animation Toggle -->
      <button
        onclick={() => motionStore.toggle()}
        class="p-2 text-text-muted hover:text-accent border border-border-dim hover:border-accent/50 rounded transition-colors duration-200"
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
        href="https://github.com/Vonshlovens"
        target="_blank"
        rel="noopener noreferrer"
        class="border border-accent text-accent px-4 py-1.5 rounded text-xs font-mono font-bold hover:bg-accent hover:text-primary transition-all duration-200 uppercase bg-accent/10"
      >
        View Source
        <span class="sr-only">(opens in new tab)</span>
      </a>
    </div>

    <!-- Mobile Menu Toggle -->
    <button
      bind:this={menuToggleBtn}
      onclick={toggleMenu}
      class="md:hidden text-text-muted hover:text-text-white transition-colors p-2"
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
      class="md:hidden bg-surface border-b border-border-dim animate-slide-down"
      aria-label="Mobile navigation"
    >
      <ul class="px-6 py-4 space-y-1">
        {#each navLinks as link}
          <li>
            <a
              href={link.href}
              onclick={() => scrollTo(link.href.slice(1))}
              class="block py-2 text-xs font-mono text-text-muted hover:text-text-white transition-colors tracking-widest uppercase"
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li class="pt-3 mt-3 border-t border-border-dim">
          <button
            onclick={() => motionStore.toggle()}
            class="flex items-center gap-3 py-2 w-full text-left"
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
            href="https://github.com/Vonshlovens"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block border border-accent text-accent px-4 py-1.5 rounded text-xs font-mono font-bold hover:bg-accent hover:text-primary transition-all duration-200 uppercase bg-accent/10"
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
