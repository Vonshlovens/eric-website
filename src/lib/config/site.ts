/**
 * Centralized site configuration.
 * Single source of truth for identity, domain, and social links
 * used across layouts, components, server routes, and meta tags.
 */

export const site = {
	name: 'Eric Evans',
	title: 'Software Developer',
	domain: 'ericevans.dev',
	url: 'https://ericevans.dev',
	email: 'eric@ericevans.dev',

	github: {
		username: 'Vonshlovens',
		url: 'https://github.com/Vonshlovens'
	},

	linkedin: {
		url: 'https://linkedin.com/in/ericevans'
	}
} as const;

/** GitHub avatar URL derived from username */
export const avatarUrl = `https://github.com/${site.github.username}.png`;
