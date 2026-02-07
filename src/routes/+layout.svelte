<script>
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import BackToTop from '$lib/components/ui/BackToTop.svelte';

	let { children } = $props();

	// View Transitions API — progressive enhancement cross-fade
	// Spec: specs/page-transitions.md
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (document.documentElement.hasAttribute('data-reduce-motion')) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const title = 'Eric Evans — Software Developer';
	const description =
		'Portfolio of Eric Evans. Software developer specializing in cloud infrastructure, AI/ML, and database systems.';
	const url = 'https://ericevans.dev';
	const image = `${url}/og-image.png`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Eric Evans',
		jobTitle: 'Software Developer',
		url,
		sameAs: ['https://github.com/Vonshlovens', 'https://linkedin.com/in/ericevans']
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Canonical -->
	<link rel="canonical" href={url} />

	<!-- Favicon -->
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<!-- Skip to content (first focusable element) -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-sm"
>
	Skip to main content
</a>

<Navigation />
{@render children()}
<Footer />
<BackToTop />
