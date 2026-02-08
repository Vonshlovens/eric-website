/**
 * Scroll-Triggered Entrance Animation — Svelte Action
 *
 * Usage:
 *   <section use:scrollReveal>           — fade-up on scroll
 *   <div use:scrollReveal={{ stagger: true }}>  — stagger children
 *
 * Spec: specs/scroll-animations.md
 */

import type { Action } from 'svelte/action';

interface ScrollRevealParams {
	/** When true, staggers child .scroll-reveal elements instead of animating the node itself */
	stagger?: boolean;
}

/** Shared observer — one instance for all elements on the page */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
	if (!sharedObserver) {
		sharedObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add('revealed');
						sharedObserver!.unobserve(entry.target);
					}
				}
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -50px 0px',
			},
		);
	}
	return sharedObserver;
}

function prefersReducedMotion(): boolean {
	if (typeof globalThis.window === 'undefined') return true;
	// Check animation toggle data attribute
	if (document.documentElement.dataset.reduceMotion === 'true') return true;
	return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const scrollReveal: Action<HTMLElement, ScrollRevealParams | undefined> = (
	node,
	params,
) => {
	const { stagger = false } = params ?? {};

	if (prefersReducedMotion()) {
		// Show everything immediately — no animation
		if (stagger) {
			node.classList.add('scroll-reveal-stagger');
			for (const child of node.querySelectorAll('.scroll-reveal')) {
				child.classList.add('revealed');
			}
		} else {
			node.classList.add('scroll-reveal', 'revealed');
		}
		return;
	}

	const observer = getObserver();

	if (stagger) {
		// Parent gets the stagger class; observe each child individually
		node.classList.add('scroll-reveal-stagger');
		const children = node.querySelectorAll('.scroll-reveal');
		for (const child of children) {
			observer.observe(child);
		}

		return {
			destroy() {
				for (const child of children) {
					observer.unobserve(child);
				}
			},
		};
	}

	// Standard single-element reveal
	node.classList.add('scroll-reveal');
	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		},
	};
};
