<script>
	import '../app.css';
	import Navigation from '$lib/components/layout/Navigation.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<Navigation />
<div id="main-content">
	{@render children()}
</div>
<Footer />
