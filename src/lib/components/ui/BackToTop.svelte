<!--
	Back to Top Button
	Fixed-position scroll-to-top button with system-monitor styling.
	Spec: specs/back-to-top.md
-->
<script lang="ts">
	let visible = $state(false);
	let ticking = false;

	const THRESHOLD = 400;

	function onScroll() {
		if (ticking) return;
		ticking = true;
		requestAnimationFrame(() => {
			visible = window.scrollY > THRESHOLD;
			ticking = false;
		});
	}

	function scrollToTop() {
		const reduceMotion = document.documentElement.hasAttribute('data-reduce-motion');
		window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	$effect(() => {
		// Check immediately on mount
		visible = window.scrollY > THRESHOLD;

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<button
	onclick={scrollToTop}
	class="back-to-top fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40
		w-10 h-10 rounded-lg
		bg-surface border border-border-dim
		flex items-center justify-center
		text-text-muted
		shadow-sm
		transition-colors duration-150
		hover:border-accent/50 hover:bg-surface-highlight hover:text-text-main
		active:scale-95
		focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
	class:visible
	class:reduced-motion={false}
	aria-label="Scroll to top"
	tabindex={visible ? 0 : -1}
>
	<span class="material-symbols-outlined text-[20px] leading-none" aria-hidden="true">
		keyboard_arrow_up
	</span>
</button>

<style>
	.back-to-top {
		opacity: 0;
		transform: translateY(8px);
		pointer-events: none;
		transition:
			opacity 150ms ease-in,
			transform 150ms ease-in,
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
	}

	.back-to-top.visible {
		opacity: 1;
		transform: translateY(0);
		pointer-events: auto;
		transition:
			opacity 200ms ease-out,
			transform 200ms ease-out,
			background-color 150ms ease,
			border-color 150ms ease,
			color 150ms ease;
	}

	/* Reduced motion: instant show/hide, no translate */
	:global([data-reduce-motion]) .back-to-top {
		transform: none;
		transition: opacity 0ms;
	}

	:global([data-reduce-motion]) .back-to-top.visible {
		transform: none;
		transition: opacity 0ms;
	}
</style>
