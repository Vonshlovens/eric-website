<script lang="ts">
  import { themeStore } from '$lib/stores/theme.svelte';
  import { motionStore } from '$lib/stores/motion.svelte';
  import { tick } from 'svelte';

  let open = $state(false);
  let closeBtn = $state<HTMLButtonElement>();
  let modalEl = $state<HTMLElement>();

  const shortcuts: { key: string; description: string }[] = [
    { key: '?', description: 'Open this help modal' },
    { key: 't', description: 'Toggle theme' },
    { key: 'm', description: 'Toggle motion' },
    { key: '1-7', description: 'Jump to section' },
    { key: 'h', description: 'Scroll to top' },
    { key: 'Esc', description: 'Close modal' }
  ];

  const sectionMap: Record<string, string> = {
    '1': 'about',
    '2': 'competencies',
    '3': 'engineering-log',
    '4': 'experience',
    '5': 'education',
    '6': 'interests',
    '7': 'contact'
  };

  function isFormField(target: EventTarget | null): boolean {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tag = target.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
  }

  async function openModal() {
    open = true;
    await tick();
    closeBtn?.focus();
  }

  function closeModal() {
    open = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (isFormField(e.target)) return;

    // Modal-specific keys
    if (open) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalEl) {
        const focusable = modalEl.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
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
      return;
    }

    // Global shortcuts (only when modal is closed)
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      openModal();
      return;
    }

    if (e.key === 't') {
      themeStore.toggle();
      return;
    }

    if (e.key === 'm') {
      motionStore.toggle();
      return;
    }

    if (e.key === 'h') {
      window.scrollTo({ top: 0, behavior: motionStore.disabled ? 'auto' : 'smooth' });
      return;
    }

    const sectionId = sectionMap[e.key];
    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: motionStore.disabled ? 'auto' : 'smooth' });
      }
    }
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[90] flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4"
    onclick={handleBackdropClick}
    onkeydown={(e) => { if (e.key === 'Escape') closeModal(); }}
  >
    <!-- Modal -->
    <div
      bind:this={modalEl}
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-shortcuts-title"
      class="bg-surface border border-border-dim rounded-lg max-w-md w-full p-6 modal-enter"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2
          id="keyboard-shortcuts-title"
          class="font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          Keyboard_Shortcuts
        </h2>
        <button
          bind:this={closeBtn}
          onclick={closeModal}
          class="text-text-muted hover:text-text-main transition-colors duration-150 text-lg leading-none p-1"
          aria-label="Close keyboard shortcuts"
        >
          ✕
        </button>
      </div>

      <!-- Divider -->
      <div class="border-t border-border-dim mb-4"></div>

      <!-- Shortcut List -->
      <div class="space-y-3">
        {#each shortcuts as shortcut}
          <div class="flex items-center gap-4">
            <kbd
              class="font-mono text-accent bg-primary border border-border-dim rounded px-2 py-0.5 text-sm min-w-[3rem] text-center"
            >
              {shortcut.key}
            </kbd>
            <span class="font-mono text-sm text-text-main">
              {shortcut.description}
            </span>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-enter {
    animation: modal-in 150ms ease-out;
  }

  @keyframes modal-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .modal-enter {
      animation: none;
    }
  }

  :global(html[data-reduce-motion]) .modal-enter {
    animation: none;
  }
</style>
