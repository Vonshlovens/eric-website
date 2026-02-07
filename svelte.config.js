import adapter from "@deno/svelte-adapter";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path }) => {
				// Ignore missing project images during prerender
				if (path.startsWith('/images/projects/')) return;
				throw new Error(`404 ${path}`);
			}
		}
	}
};

export default config;
