<script lang="ts">
  import { themeStore } from '$lib/stores/theme.svelte';
  import { motionStore } from '$lib/stores/motion.svelte';
  import { Dialog } from 'bits-ui';

  let open = $state(false);

  const shortcuts: { key: string; description: string }[] = [
    { key: '?', description: 'Open this help modal' },
    { key: 't', description: 'Toggle theme' },
    { key: 'm', description: 'Toggle motion' },
    { key: 'h', description: 'Scroll to top' },
    { key: 'Esc', description: 'Close modal' }
  ];

  const sectionShortcuts: { key: string; description: string }[] = [
    { key: '1', description: 'Dashboard' },
    { key: '2', description: 'Skills' },
    { key: '3', description: 'Projects' },
    { key: '4', description: 'Experience' },
    { key: '5', description: 'Education' },
    { key: '6', description: 'Interests' },
    { key: '7', description: 'Contact' },
  ];

  const sectionMap: Record<string, string> = {
    '1': 'about',
    '2': 'skill-radar',
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

  function handleKeydown(e: KeyboardEvent) {
    if (isFormField(e.target)) return;

    // When modal is open, let Bits UI handle Escape and Tab (focus trap)
    if (open) return;

    // Global shortcuts (only when modal is closed)
    if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
      e.preventDefault();
      open = true;
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
      globalThis.window.scrollTo({ top: 0, behavior: motionStore.disabled ? 'auto' : 'smooth' });
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
</script>

<svelte:window onkeydown={handleKeydown} />

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-[90] bg-primary/80 backdrop-blur-sm"
    />

    <Dialog.Content
      class="fixed left-1/2 top-1/2 z-[90] -translate-x-1/2 -translate-y-1/2 bg-surface border border-border-dim rounded-lg max-w-md w-[calc(100%-2rem)] p-6 modal-enter"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <Dialog.Title
          class="font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          Keyboard_Shortcuts
        </Dialog.Title>
        <Dialog.Close
          class="text-text-muted hover:text-text-main transition-colors duration-150 text-lg leading-none p-1"
          aria-label="Close keyboard shortcuts"
        >
          ✕
        </Dialog.Close>
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

      <!-- Section Navigation -->
      <div class="border-t border-border-dim mt-4 pt-4">
        <span class="font-mono text-[10px] uppercase tracking-widest text-text-muted mb-3 block">
          Section_Navigation
        </span>
        <div class="space-y-2">
          {#each sectionShortcuts as shortcut}
            <div class="flex items-center gap-4">
              <kbd
                class="font-mono text-accent bg-primary border border-border-dim rounded px-2 py-0.5 text-sm min-w-[3rem] text-center"
              >
                {shortcut.key}
              </kbd>
              <span class="font-mono text-sm text-text-muted">
                {shortcut.description}
              </span>
            </div>
          {/each}
        </div>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
