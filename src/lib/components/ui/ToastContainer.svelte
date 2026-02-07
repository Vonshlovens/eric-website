<!--
	Toast Container
	Renders ephemeral notification toasts with system-monitor styling.
	Spec: specs/toast-notifications.md
-->
<script lang="ts">
	import { toastStore, dismissToast, type Toast, type ToastVariant } from '$lib/stores/toast.svelte';

	const VARIANT_CONFIG: Record<ToastVariant, { label: string; colorClass: string }> = {
		success: { label: 'STATUS:', colorClass: 'toast-success' },
		error: { label: 'ERROR:', colorClass: 'toast-error' },
		info: { label: 'INFO:', colorClass: 'toast-info' }
	};

	let timers = new Map<string, ReturnType<typeof setTimeout>>();
	let pausedToasts = new Set<string>();
	let exitingToasts = $state(new Set<string>());

	function startTimer(toast: Toast) {
		clearTimer(toast.id);
		timers.set(
			toast.id,
			setTimeout(() => {
				animateOut(toast.id);
			}, toast.duration)
		);
	}

	function clearTimer(id: string) {
		const timer = timers.get(id);
		if (timer) {
			clearTimeout(timer);
			timers.delete(id);
		}
	}

	function pauseTimer(id: string) {
		pausedToasts.add(id);
		clearTimer(id);
	}

	function resumeTimer(toast: Toast) {
		pausedToasts.delete(toast.id);
		startTimer(toast);
	}

	function animateOut(id: string) {
		clearTimer(id);
		exitingToasts.add(id);
		exitingToasts = new Set(exitingToasts);
		setTimeout(() => {
			exitingToasts.delete(id);
			exitingToasts = new Set(exitingToasts);
			dismissToast(id);
		}, 150);
	}

	function handleDismiss(id: string) {
		animateOut(id);
	}

	function handleKeydown(e: KeyboardEvent, id: string) {
		if (e.key === 'Escape') {
			e.preventDefault();
			animateOut(id);
		}
	}

	// Start auto-dismiss timers for new toasts
	$effect(() => {
		for (const toast of toastStore.toasts) {
			if (!timers.has(toast.id) && !pausedToasts.has(toast.id) && !exitingToasts.has(toast.id)) {
				startTimer(toast);
			}
		}
	});
</script>

<div
	class="toast-container fixed bottom-4 inset-x-4 md:bottom-6 md:right-6 md:left-auto z-50 flex flex-col gap-3 md:w-96 pointer-events-none"
	role="status"
	aria-live="polite"
>
	{#each toastStore.toasts as toast (toast.id)}
		{@const config = VARIANT_CONFIG[toast.variant]}
		<div
			class="toast pointer-events-auto bg-surface border border-border-dim rounded-lg px-4 py-3 font-mono text-sm flex items-start gap-3 shadow-md {config.colorClass}"
			class:toast-enter={!exitingToasts.has(toast.id)}
			class:toast-exit={exitingToasts.has(toast.id)}
			role={toast.variant === 'error' ? 'alert' : 'status'}
			aria-live={toast.variant === 'error' ? 'assertive' : 'polite'}
			onmouseenter={() => pauseTimer(toast.id)}
			onmouseleave={() => resumeTimer(toast)}
		>
			<div class="flex items-center gap-2 min-w-0 flex-1">
				<span class="toast-dot w-2 h-2 rounded-full shrink-0" aria-hidden="true"></span>
				<span class="toast-label font-mono text-xs uppercase tracking-wider shrink-0">{config.label}</span>
				<span class="text-text-main truncate">{toast.message}</span>
			</div>
			<button
				class="toast-dismiss shrink-0 text-text-muted hover:text-text-main transition-colors duration-150 leading-none text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
				onclick={() => handleDismiss(toast.id)}
				onkeydown={(e) => handleKeydown(e, toast.id)}
				aria-label="Dismiss notification"
			>
				&#x2715;
			</button>
		</div>
	{/each}
</div>

<style>
	/* Variant colors */
	.toast-success {
		border-left: 4px solid var(--color-status-ok);
	}
	.toast-success .toast-dot {
		background-color: var(--color-status-ok);
	}
	.toast-success .toast-label {
		color: var(--color-status-ok);
	}

	.toast-error {
		border-left: 4px solid var(--color-accent);
	}
	.toast-error .toast-dot {
		background-color: var(--color-accent);
	}
	.toast-error .toast-label {
		color: var(--color-accent);
	}

	.toast-info {
		border-left: 4px solid var(--color-text-muted);
	}
	.toast-info .toast-dot {
		background-color: var(--color-text-muted);
	}
	.toast-info .toast-label {
		color: var(--color-text-muted);
	}

	/* Entry animation: slide in from right + fade */
	.toast-enter {
		animation: toast-slide-in 200ms ease-out both;
	}

	/* Exit animation: fade out + slide right */
	.toast-exit {
		animation: toast-slide-out 150ms ease-in both;
	}

	@keyframes toast-slide-in {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@keyframes toast-slide-out {
		from {
			opacity: 1;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			transform: translateX(100%);
		}
	}

	/* Reduced motion: instant show/hide */
	:global([data-reduce-motion]) .toast-enter {
		animation: none;
		opacity: 1;
		transform: none;
	}

	:global([data-reduce-motion]) .toast-exit {
		animation: none;
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.toast-enter {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.toast-exit {
			animation: none;
			opacity: 0;
		}
	}
</style>
