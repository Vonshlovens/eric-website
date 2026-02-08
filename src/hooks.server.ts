import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const path = event.url.pathname;

	// --- Cache-Control ---
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

	// --- Security Headers ---

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline' https://plausible.io",
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
		"font-src 'self' https://fonts.gstatic.com",
		"img-src 'self' https://github.com https://avatars.githubusercontent.com data:",
		"connect-src 'self' https://plausible.io",
		"frame-src 'none'",
		"object-src 'none'",
		"base-uri 'self'",
		"form-action 'self'"
	].join('; ');
	response.headers.set('Content-Security-Policy', csp);

	// Prevent clickjacking
	response.headers.set('X-Frame-Options', 'DENY');

	// Prevent MIME-type sniffing
	response.headers.set('X-Content-Type-Options', 'nosniff');

	// Control referrer information
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	// Restrict browser features
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);

	// Force HTTPS (1 year, include subdomains)
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

	return response;
};
