<!--
	Loading / Splash Screen
	System-boot themed splash overlay shown once per session.
	Spec: specs/loading-screen.md
-->
<script lang="ts">
	import { onMount } from 'svelte';

	let visible = $state(true);
	let fadeOut = $state(false);
	let currentLine = $state(0);
	let dotsComplete = $state<boolean[]>([false, false, false]);

	const lines = [
		{ text: '> EE_SYS v2.0_STABLE', hasStatus: false },
		{ text: '> loading modules', dots: '.............', status: 'OK', hasStatus: true },
		{ text: '> initializing interface', dots: '......', status: 'OK', hasStatus: true },
		{ text: '> establishing connection', dots: '.....', status: 'OK', hasStatus: true },
		{ text: '> SYSTEM READY', hasStatus: false, isReady: true }
	];

	onMount(() => {
		// Skip if already shown this session
		if (sessionStorage.getItem('boot-shown')) {
			visible = false;
			return;
		}

		// Skip if reduced motion
		if (
			document.documentElement.hasAttribute('data-reduce-motion') ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			sessionStorage.setItem('boot-shown', '1');
			visible = false;
			return;
		}

		runBootSequence();
	});

	async function runBootSequence() {
		// Line 0: header
		currentLine = 1;
		await delay(200);

		// Lines 1-3: with dots + OK
		for (let i = 1; i <= 3; i++) {
			currentLine = i + 1;
			await delay(150);
			dotsComplete[i - 1] = true;
			await delay(100);
		}

		// Line 4: SYSTEM READY
		currentLine = 5;
		await delay(300);

		// Fade out
		fadeOut = true;
		await delay(400);

		visible = false;
		sessionStorage.setItem('boot-shown', '1');
	}

	function delay(ms: number) {
		return new Promise((r) => setTimeout(r, ms));
	}
</script>

{#if visible}
	<div
		class="loading-overlay fixed inset-0 z-50 flex items-center justify-center bg-primary"
		class:fade-out={fadeOut}
		aria-hidden={fadeOut}
	>
		<div
			class="terminal-block w-full max-w-md mx-4 rounded-lg border border-border-dim bg-surface p-6 md:p-8 font-mono"
			aria-live="polite"
		>
			{#each lines as line, i}
				{#if i < currentLine}
					<div
						class="boot-line text-sm md:text-base mb-1 whitespace-nowrap overflow-hidden"
						class:text-accent={line.isReady}
						class:text-text-muted={!line.isReady}
					>
						{#if line.hasStatus}
							<span>{line.text}</span><span class="dots">{line.dots}</span>
							{#if dotsComplete[i - 1]}
								<span class="text-accent font-bold"> {line.status}</span>
							{/if}
						{:else}
							<span>{line.text}</span>
						{/if}
					</div>
				{/if}
			{/each}

			<!-- Progress bar -->
			<div class="mt-4 h-0.5 w-full rounded-full bg-border-dim overflow-hidden">
				<div
					class="progress-fill h-full bg-accent rounded-full transition-all duration-300 ease-out"
					style="width: {Math.min((currentLine / lines.length) * 100, 100)}%"
				></div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loading-overlay {
		transition: opacity 400ms ease-out;
	}

	.loading-overlay.fade-out {
		opacity: 0;
	}

	.boot-line {
		animation: line-appear 150ms ease-out both;
	}

	@keyframes line-appear {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
