<script lang="ts">
  import { enhance } from '$app/forms';
  import { tick } from 'svelte';

  let {
    open = $bindable(false),
    triggerEl = undefined as HTMLElement | undefined
  }: {
    open: boolean;
    triggerEl?: HTMLElement;
  } = $props();

  let modalEl = $state<HTMLElement>();
  let closeBtnEl = $state<HTMLButtonElement>();
  let submitting = $state(false);
  let success = $state(false);
  let serverError = $state('');
  let attempted = $state(false);

  // Client-side validation errors
  let errors = $state<{ name?: string; email?: string; message?: string }>({});

  // Form field values for client validation
  let nameVal = $state('');
  let emailVal = $state('');
  let messageVal = $state('');

  function closeModal() {
    open = false;
    // Reset state after close
    setTimeout(() => {
      success = false;
      serverError = '';
      attempted = false;
      errors = {};
      nameVal = '';
      emailVal = '';
      messageVal = '';
    }, 200);
    triggerEl?.focus();
  }

  function validate(): boolean {
    const e: typeof errors = {};
    if (!nameVal.trim()) e.name = 'Name is required.';
    else if (nameVal.trim().length > 100) e.name = 'Name must be under 100 characters.';

    if (!emailVal.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal.trim())) e.email = 'Invalid email address.';

    if (!messageVal.trim()) e.message = 'Message is required.';
    else if (messageVal.trim().length > 2000) e.message = 'Message must be under 2000 characters.';

    errors = e;
    return Object.keys(e).length === 0;
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    // Focus trap
    if (e.key === 'Tab' && modalEl) {
      const focusable = modalEl.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
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

  // Focus close button when modal opens
  $effect(() => {
    if (open) {
      tick().then(() => closeBtnEl?.focus());
    }
  });

  // Auto-close after success
  $effect(() => {
    if (success) {
      const timer = setTimeout(() => closeModal(), 3000);
      return () => clearTimeout(timer);
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 z-[80] flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4"
    onclick={handleBackdropClick}
  >
    <div
      bind:this={modalEl}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-form-title"
      class="bg-surface border border-border-dim rounded-lg max-w-lg w-full mx-4 p-8 relative modal-enter"
    >
      <!-- Close button -->
      <button
        bind:this={closeBtnEl}
        onclick={closeModal}
        class="absolute top-4 right-4 text-text-muted hover:text-text-main transition-colors duration-150"
        aria-label="Close contact form"
      >
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </button>

      {#if success}
        <!-- Success state -->
        <div class="text-center py-8" aria-live="polite">
          <span class="material-symbols-outlined text-status-ok text-5xl mb-4 block">check_circle</span>
          <h3 class="text-text-white font-mono font-bold text-xl mb-2">Transmission Received</h3>
          <p class="text-text-muted font-mono text-sm">Response time: &lt; 24h</p>
        </div>
      {:else}
        <!-- Terminal prompt -->
        <div id="contact-form-title" class="font-mono text-accent text-sm mb-6">&gt; init_contact.sh</div>

        {#if serverError}
          <div class="text-center py-4 mb-4" aria-live="polite">
            <p class="text-accent font-mono text-sm mb-4">{serverError}</p>
            <button onclick={() => { serverError = ''; }} class="text-accent font-mono text-sm underline">Retry</button>
          </div>
        {/if}

        <form
          method="POST"
          action="?/contact"
          use:enhance={({ cancel }) => {
            attempted = true;
            if (!validate()) {
              cancel();
              return;
            }
            submitting = true;
            return async ({ result }) => {
              submitting = false;
              if (result.type === 'success') {
                success = true;
              } else if (result.type === 'failure') {
                serverError = (result.data as { error?: string })?.error ?? 'Transmission failed. Please try again.';
              } else {
                serverError = 'Transmission failed. Please try again.';
              }
            };
          }}
        >
          <!-- Name -->
          <label class="block mb-4">
            <span class="text-text-muted text-xs font-mono uppercase tracking-widest mb-1 block">Name</span>
            <input
              type="text"
              name="name"
              required
              maxlength="100"
              bind:value={nameVal}
              onblur={() => { if (attempted) validate(); }}
              class="w-full bg-primary border border-border-dim rounded px-4 py-3 font-mono text-sm text-text-main placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              placeholder="Jane Doe"
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {#if errors.name}
              <p id="name-error" class="text-accent text-xs font-mono mt-1">{errors.name}</p>
            {/if}
          </label>

          <!-- Email -->
          <label class="block mb-4">
            <span class="text-text-muted text-xs font-mono uppercase tracking-widest mb-1 block">Email</span>
            <input
              type="email"
              name="email"
              required
              bind:value={emailVal}
              onblur={() => { if (attempted) validate(); }}
              class="w-full bg-primary border border-border-dim rounded px-4 py-3 font-mono text-sm text-text-main placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors"
              placeholder="jane@example.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {#if errors.email}
              <p id="email-error" class="text-accent text-xs font-mono mt-1">{errors.email}</p>
            {/if}
          </label>

          <!-- Message -->
          <label class="block mb-6">
            <span class="text-text-muted text-xs font-mono uppercase tracking-widest mb-1 block">Message</span>
            <textarea
              name="message"
              required
              maxlength="2000"
              rows="5"
              bind:value={messageVal}
              onblur={() => { if (attempted) validate(); }}
              class="w-full bg-primary border border-border-dim rounded px-4 py-3 font-mono text-sm text-text-main placeholder:text-text-muted/50 focus:border-accent focus:outline-none transition-colors resize-none"
              placeholder="Your message..."
              aria-describedby={errors.message ? 'message-error' : undefined}
            ></textarea>
            {#if errors.message}
              <p id="message-error" class="text-accent text-xs font-mono mt-1">{errors.message}</p>
            {/if}
          </label>

          <!-- Submit -->
          <button
            type="submit"
            disabled={submitting}
            aria-disabled={submitting}
            class="w-full flex items-center justify-center rounded bg-accent text-text-white h-12 text-xs font-mono font-bold tracking-[0.2em] transition-all hover:bg-text-white hover:text-primary uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Transmitting...' : 'Send Transmission'}
          </button>
        </form>
      {/if}
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
