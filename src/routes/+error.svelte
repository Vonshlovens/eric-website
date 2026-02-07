<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status === 404 ? '404 — Page Not Found' : 'Error'} | EE_SYS</title>
</svelte:head>

<main id="main-content" class="relative min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center px-4">
	<!-- Dot grid texture -->
	<div class="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true" style="
		background-image: radial-gradient(circle, var(--color-text-main) 1px, transparent 1px);
		background-size: 24px 24px;
	"></div>

	<!-- Scan-line overlay -->
	<div class="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true" style="
		background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px);
	"></div>

	{#if $page.status === 404}
		<h1 class="font-mono text-accent text-5xl sm:text-6xl md:text-8xl font-bold mb-8 relative">404</h1>

		<!-- Terminal block -->
		<div class="relative bg-surface border border-border-dim rounded-lg p-6 max-w-lg w-full font-mono text-sm mb-8">
			<p class="text-text-main mb-1">
				<span class="text-accent">{'>'}</span> route_lookup --path "{$page.url.pathname}"
			</p>
			<p class="text-text-muted mb-1">ERROR: endpoint not found</p>
			<p class="text-text-muted mb-1">STATUS: 404_NOT_FOUND</p>
			<p class="text-text-muted">SUGGESTION: return to index</p>
		</div>

		<a
			href="/"
			aria-label="Return to homepage"
			class="inline-flex items-center justify-center rounded bg-accent text-text-white h-12 px-8 text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-200 hover:bg-text-white hover:text-primary relative"
		>
			Return to Index
		</a>
	{:else}
		<h1 class="font-mono text-accent text-5xl sm:text-6xl md:text-8xl font-bold mb-8 relative">{$page.status}</h1>

		<div class="relative bg-surface border border-border-dim rounded-lg p-6 max-w-lg w-full font-mono text-sm mb-8">
			<p class="text-text-main mb-1">
				<span class="text-accent">{'>'}</span> request --path "{$page.url.pathname}"
			</p>
			<p class="text-text-muted mb-1">ERROR: {$page.error?.message ?? 'An unexpected error occurred'}</p>
			<p class="text-text-muted">STATUS: {$page.status}</p>
		</div>

		<a
			href="/"
			aria-label="Return to homepage"
			class="inline-flex items-center justify-center rounded bg-accent text-text-white h-12 px-8 text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-200 hover:bg-text-white hover:text-primary relative"
		>
			Return to Index
		</a>
	{/if}
</main>
