import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import { site } from '$lib/config/site';

import type { GitHubStats } from '$lib/types/github';
export type { GitHubStats };

// --- Rate limiter (in-memory, per-IP) ---
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 3; // max submissions per window

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
	const now = Date.now();
	const entry = rateLimitMap.get(ip);

	if (!entry || now >= entry.resetAt) {
		rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
		return false;
	}

	entry.count++;
	return entry.count > RATE_LIMIT_MAX;
}

// Periodically prune expired entries to prevent memory growth
setInterval(() => {
	const now = Date.now();
	for (const [ip, entry] of rateLimitMap) {
		if (now >= entry.resetAt) rateLimitMap.delete(ip);
	}
}, RATE_LIMIT_WINDOW_MS);

const FALLBACK: GitHubStats = {
	repos: 43,
	commits: 4281,
	accountAgeSec: 852_037_704
};

const GITHUB_USERNAME = site.github.username;

let cached: { stats: GitHubStats; timestamp: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
	// Return cached data if fresh
	if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
		setHeaders({ 'Cache-Control': 'public, max-age=600' });
		return { githubStats: cached.stats };
	}

	try {
		const headers: Record<string, string> = {};
		const token = env.GITHUB_TOKEN;
		if (token) {
			headers['Authorization'] = `Bearer ${token}`;
		}

		const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers });
		if (!userRes.ok) return { githubStats: FALLBACK };

		const userData = await userRes.json();
		const repos = userData.public_repos ?? FALLBACK.repos;
		const createdAt = new Date(userData.created_at);
		const accountAgeSec = Math.floor((Date.now() - createdAt.getTime()) / 1000);

		let commits = FALLBACK.commits;
		try {
			const commitRes = await fetch(
				`https://api.github.com/search/commits?q=author:${GITHUB_USERNAME}`,
				{
					headers: {
						...headers,
						Accept: 'application/vnd.github.cloak-preview+json'
					}
				}
			);
			if (commitRes.ok) {
				const commitData = await commitRes.json();
				commits = commitData.total_count ?? FALLBACK.commits;
			}
		} catch {
			// commit search failed, use fallback
		}

		const stats: GitHubStats = { repos, commits, accountAgeSec };
		cached = { stats, timestamp: Date.now() };

		setHeaders({ 'Cache-Control': 'public, max-age=600' });
		return { githubStats: stats };
	} catch {
		return { githubStats: FALLBACK };
	}
};

export const actions: Actions = {
	contact: async ({ request, getClientAddress }) => {
		const data = await request.formData();

		// Honeypot: reject if the hidden field has a value (bots auto-fill it)
		const honeypot = data.get('website')?.toString() ?? '';
		if (honeypot) {
			// Silently accept to avoid tipping off bots
			return { success: true };
		}

		// Rate limiting by client IP
		const ip = getClientAddress();
		if (isRateLimited(ip)) {
			return fail(429, { error: 'Too many submissions. Please try again later.' });
		}

		const name = data.get('name')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const message = data.get('message')?.toString().trim();

		if (!name || !email || !message) {
			return fail(400, { error: 'All fields are required.' });
		}

		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Invalid email address.' });
		}

		if (name.length > 100) {
			return fail(400, { error: 'Name must be under 100 characters.' });
		}

		if (message.length > 2000) {
			return fail(400, { error: 'Message must be under 2000 characters.' });
		}

		try {
			const apiKey = env.RESEND_API_KEY;
			const contactTo = env.CONTACT_EMAIL_TO;

			if (!apiKey || !contactTo) {
				console.log('[Contact Form] No RESEND_API_KEY/CONTACT_EMAIL_TO configured, submission discarded.');
				return fail(503, { error: 'Contact service is not configured. Please try reaching out via email or GitHub instead.' });
			}

			const resend = new Resend(apiKey);
			await resend.emails.send({
				from: `Portfolio Contact <${env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}>`,
				to: contactTo,
				replyTo: email,
				subject: `[${site.domain}] Message from ${name}`,
				text: `Name: ${name}\nEmail: ${email}\n\n${message}`
			});

			return { success: true };
		} catch (err) {
			console.error('[Contact Form] Send failed:', err instanceof Error ? err.message : 'unknown error');
			return fail(500, { error: 'Failed to send message.' });
		}
	}
};
