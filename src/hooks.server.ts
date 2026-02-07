import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const path = event.url.pathname;

	if (path.startsWith('/_app/immutable/')) {
		// Hashed JS/CSS bundles — immutable forever
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else if (path.match(/\.(png|jpg|jpeg|webp|avif|gif|svg|ico)$/)) {
		// Images — 7 days
		response.headers.set('Cache-Control', 'public, max-age=604800');
	} else if (path.match(/\.(woff2?|ttf|otf|eot)$/)) {
		// Self-hosted fonts — immutable
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	} else if (path.endsWith('.html') || !path.includes('.')) {
		// HTML pages — always revalidate
		response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
	}

	return response;
};
