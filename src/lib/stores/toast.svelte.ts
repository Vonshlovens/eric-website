/**
 * Toast Store — Manages ephemeral notification toasts with Svelte 5 runes
 *
 * Features:
 * - $state array of toast objects
 * - addToast({ variant, message, duration? }) — push a new toast
 * - dismissToast(id) — remove by ID
 * - Max 3 visible toasts; oldest dismissed when limit exceeded
 *
 * Spec: specs/toast-notifications.md
 */

export type ToastVariant = 'success' | 'error' | 'info';

export interface Toast {
	id: string;
	variant: ToastVariant;
	message: string;
	duration: number;
}

const MAX_TOASTS = 3;
const DEFAULT_DURATION = 4000;

class ToastStore {
	toasts = $state<Toast[]>([]);

	addToast({ variant, message, duration = DEFAULT_DURATION }: { variant: ToastVariant; message: string; duration?: number }) {
		const id = crypto.randomUUID();
		const toast: Toast = { id, variant, message, duration };

		this.toasts.push(toast);

		// Evict oldest if over limit
		while (this.toasts.length > MAX_TOASTS) {
			this.toasts.shift();
		}

		return id;
	}

	dismissToast(id: string) {
		const idx = this.toasts.findIndex((t) => t.id === id);
		if (idx !== -1) {
			this.toasts.splice(idx, 1);
		}
	}
}

export const toastStore = new ToastStore();

export function addToast(opts: { variant: ToastVariant; message: string; duration?: number }) {
	return toastStore.addToast(opts);
}

export function dismissToast(id: string) {
	toastStore.dismissToast(id);
}
