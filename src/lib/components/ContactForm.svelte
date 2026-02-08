<script lang="ts">
  import { enhance } from '$app/forms';
  import { Dialog } from 'bits-ui';
  import { addToast } from '$lib/stores/toast.svelte';

  let {
    open = $bindable(false),
    triggerEl = undefined as HTMLElement | undefined
  }: {
    open: boolean;
    triggerEl?: HTMLElement;
  } = $props();

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

  function resetState() {
    setTimeout(() => {
      success = false;
      serverError = '';
      attempted = false;
      errors = {};
      nameVal = '';
      emailVal = '';
      messageVal = '';
    }, 200);
  }

  function handleOpenChange(nextOpen: boolean) {
    open = nextOpen;
    if (!nextOpen) {
      resetState();
      triggerEl?.focus();
    }
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

  // Auto-close after success
  $effect(() => {
    if (success) {
      const timer = setTimeout(() => { open = false; resetState(); triggerEl?.focus(); }, 3000);
      return () => clearTimeout(timer);
    }
  });
</script>

<Dialog.Root {open} onOpenChange={handleOpenChange}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-[80] bg-primary/80 backdrop-blur-sm"
    />

    <Dialog.Content
      class="fixed left-1/2 top-1/2 z-[80] -translate-x-1/2 -translate-y-1/2 bg-surface border border-border-dim rounded-lg max-w-lg w-[calc(100%-2rem)] p-4 sm:p-6 md:p-8 modal-enter"
      onInteractOutside={(e) => {
        // Prevent closing while submitting
        if (submitting) e.preventDefault();
      }}
    >
      <!-- Close button -->
      <Dialog.Close
        class="absolute top-3 right-3 w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-main transition-colors duration-150 rounded"
        aria-label="Close contact form"
      >
        <span class="material-symbols-outlined" aria-hidden="true">close</span>
      </Dialog.Close>

      {#if success}
        <!-- Success state -->
        <div class="text-center py-8" aria-live="polite">
          <span class="material-symbols-outlined text-status-ok text-5xl mb-4 block">check_circle</span>
          <Dialog.Title class="text-text-white font-mono font-bold text-xl mb-2">Transmission Received</Dialog.Title>
          <p class="text-text-muted font-mono text-sm">Response time: &lt; 24h</p>
        </div>
      {:else}
        <!-- Terminal prompt -->
        <Dialog.Title class="font-mono text-accent text-sm mb-6">&gt; init_contact.sh</Dialog.Title>

        {#if serverError}
          <div class="text-center py-4 mb-4" aria-live="polite">
            <p class="text-accent font-mono text-sm mb-4">{serverError}</p>
            <button onclick={() => { serverError = ''; }} class="text-accent font-mono text-sm underline">Retry</button>
          </div>
        {/if}

        <form
          method="POST"
          action="?/contact"
          autocomplete="off"
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
                addToast({ variant: 'success', message: 'Message sent successfully.' });
              } else if (result.type === 'failure') {
                serverError = (result.data as { error?: string })?.error ?? 'Transmission failed. Please try again.';
                addToast({ variant: 'error', message: serverError });
              } else {
                serverError = 'Transmission failed. Please try again.';
                addToast({ variant: 'error', message: serverError });
              }
            };
          }}
        >
          <!-- Honeypot field — hidden from humans, catches bots -->
          <div class="absolute -left-[9999px]" aria-hidden="true">
            <label>
              <span>Website</span>
              <input type="text" name="website" tabindex="-1" autocomplete="off" />
            </label>
          </div>

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
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
