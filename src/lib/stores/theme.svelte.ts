/**
 * Theme Store — Manages dark/light theme toggle with Svelte 5 runes
 *
 * Features:
 * - localStorage persistence (key: "theme")
 * - prefers-color-scheme detection as default
 * - Syncs `dark` class on <html>
 * - Reactive state via $state
 *
 * Spec: specs/theme-toggle.md
 */

type Theme = 'dark' | 'light';

class ThemeStore {
	current: Theme = $state('dark');

	constructor() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('theme');
			const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

			if (stored === 'dark' || stored === 'light') {
				this.current = stored;
			} else {
				this.current = prefersLight ? 'light' : 'dark';
			}
			this.applyClass(this.current);

			// Listen for OS-level preference changes (only when no explicit override stored)
			window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
				if (localStorage.getItem('theme') === null) {
					this.current = e.matches ? 'light' : 'dark';
					this.applyClass(this.current);
				}
			});
		}
	}

	get isDark(): boolean {
		return this.current === 'dark';
	}

	toggle() {
		this.current = this.current === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', this.current);
		this.applyClass(this.current);
	}

	private applyClass(theme: Theme) {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', theme === 'dark');
		}
	}
}

export const themeStore = new ThemeStore();
