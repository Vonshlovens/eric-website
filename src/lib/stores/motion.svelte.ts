/**
 * Motion Store — Manages animation toggle with Svelte 5 runes
 *
 * Features:
 * - localStorage persistence (key: "reduce-motion")
 * - prefers-reduced-motion detection as default
 * - Syncs data-reduce-motion attribute on <html>
 * - Reactive state via $state
 *
 * Spec: specs/animation-toggle.md
 */

class MotionStore {
	disabled = $state(false);

	constructor() {
		if (typeof globalThis.window !== 'undefined') {
			const stored = localStorage.getItem('reduce-motion');
			const prefersReduced = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

			this.disabled = stored !== null ? stored === 'true' : prefersReduced;
			this.applyAttribute(this.disabled);

			// Listen for OS-level preference changes (only applies when no explicit override)
			globalThis.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
				if (localStorage.getItem('reduce-motion') === null) {
					this.disabled = e.matches;
					this.applyAttribute(this.disabled);
				}
			});
		}
	}

	toggle() {
		this.disabled = !this.disabled;
		localStorage.setItem('reduce-motion', String(this.disabled));
		this.applyAttribute(this.disabled);
	}

	private applyAttribute(value: boolean) {
		if (typeof document !== 'undefined') {
			if (value) {
				document.documentElement.setAttribute('data-reduce-motion', '');
			} else {
				document.documentElement.removeAttribute('data-reduce-motion');
			}
		}
	}
}

export const motionStore = new MotionStore();
