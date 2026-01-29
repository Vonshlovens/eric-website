/**
 * Theme Store - Manages dark/light mode with Svelte 5 runes
 *
 * Features:
 * - localStorage persistence
 * - System preference detection
 * - Reactive theme state
 */

type Theme = 'dark' | 'light';

class ThemeStore {
  theme = $state<Theme>('dark');

  constructor() {
    // Initialize theme from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      this.theme = stored || (prefersDark ? 'dark' : 'light');
      this.applyTheme(this.theme);

      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    this.applyTheme(newTheme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  }

  toggle() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: Theme) {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;

      if (theme === 'light') {
        root.classList.add('light');
      } else {
        root.classList.remove('light');
      }
    }
  }
}

export const themeStore = new ThemeStore();
