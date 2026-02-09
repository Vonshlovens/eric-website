<!--
	Loading / Splash Screen
	Simple fade-in overlay shown once per session.
	Spec: specs/loading-screen.md
-->
<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let fadeOut = $state(false);

	onMount(() => {
		// Skip if already shown this session
		if (sessionStorage.getItem('boot-shown')) {
			visible = false;
			return;
		}

		// Skip if reduced motion
		if (
			document.documentElement.hasAttribute('data-reduce-motion') ||
			globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			sessionStorage.setItem('boot-shown', '1');
			visible = false;
			return;
		}

		// Brief pause then fade out — content is already loaded (~400ms FCP)
		setTimeout(() => {
			fadeOut = true;
			setTimeout(() => {
				visible = false;
				sessionStorage.setItem('boot-shown', '1');
			}, 250);
		}, 100);
	});
</script>

{#if visible}
	<div
		class="fixed inset-0 z-50 bg-primary"
		class:fade-out={fadeOut}
		aria-hidden={fadeOut}
	></div>
{/if}

<style>
	.fixed {
		opacity: 1;
		transition: opacity 250ms ease-out;
	}

	.fade-out {
		opacity: 0;
	}
</style>
