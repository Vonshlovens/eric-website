<script lang="ts">
  import { themeStore } from '$lib/stores/theme.svelte';
  import { Sun, Moon } from 'svelte-lucide';

  function handleToggle() {
    themeStore.toggle();
  }
</script>

<button
  onclick={handleToggle}
  class="
    p-2
    rounded-md
    transition-colors duration-200
    text-fg-muted hover:text-accent
    hover:bg-bg-muted
    border border-transparent
    hover:border-border-muted
  "
  aria-label={themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  title={themeStore.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if themeStore.theme === 'dark'}
    <Sun size="20" />
  {:else}
    <Moon size="20" />
  {/if}
</button>
