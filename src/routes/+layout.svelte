<script>
	import '../app.css';
	import Navigation from '$lib/components/layout/Navigation.svelte';

	let { children } = $props();
</script>

<Navigation />
<div id="main-content">
	{@render children()}
</div>
