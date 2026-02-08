import { test, expect } from '@playwright/test';

/**
 * 2C — Performance Audit
 *
 * Measures Core Web Vitals and performance metrics using the Performance API
 * via Playwright page.evaluate(). Runs at 3 viewports (desktop-1080p, tablet, mobile).
 *
 * Metrics captured:
 * - FCP  (First Contentful Paint)    — target < 1.5s
 * - LCP  (Largest Contentful Paint)  — target < 2.5s
 * - CLS  (Cumulative Layout Shift)   — target < 0.1
 * - TBT  (Total Blocking Time)       — target < 200ms
 *
 * The loading screen is bypassed and animations are disabled to get clean
 * measurements of real rendering performance, not decorative delays.
 */

interface PerfResults {
	fcp: number | null;
	lcp: number | null;
	cls: number;
	tbt: number;
	domContentLoaded: number;
	loadComplete: number;
	resourceCount: number;
	totalTransferSize: number;
	domNodes: number;
}

// deno-lint-ignore no-explicit-any
type AnyGlobal = any;

test.describe('Performance Audit', () => {
	test.beforeEach(async ({ page }) => {
		// Skip the loading/boot screen
		await page.addInitScript(() => {
			sessionStorage.setItem('boot-shown', '1');
		});

		// Disable animations so we measure real rendering, not decorative delays
		await page.addInitScript(() => {
			document.documentElement.setAttribute('data-reduce-motion', '');
			localStorage.setItem('reduce-motion', 'true');
		});
	});

	test('Core Web Vitals meet targets', async ({ page }) => {
		// Set up performance observers BEFORE navigation.
		// These run in the browser context where __perf is attached to globalThis
		// for cross-scope retrieval; TS doesn't know about these custom properties.
		await page.addInitScript(() => {
			const g = globalThis as AnyGlobal;
			g.__perf = { fcp: null, lcp: null, cls: 0, tbt: 0 };

			// FCP observer
			new PerformanceObserver((entryList) => {
				for (const entry of entryList.getEntries()) {
					if (entry.name === 'first-contentful-paint') {
						g.__perf.fcp = entry.startTime;
					}
				}
			}).observe({ type: 'paint', buffered: true });

			// LCP observer
			new PerformanceObserver((entryList) => {
				for (const entry of entryList.getEntries()) {
					g.__perf.lcp = entry.startTime;
				}
			}).observe({ type: 'largest-contentful-paint', buffered: true });

			// CLS observer
			new PerformanceObserver((entryList) => {
				for (const entry of entryList.getEntries()) {
					const shift = entry as AnyGlobal;
					if (!shift.hadRecentInput) {
						g.__perf.cls += shift.value;
					}
				}
			}).observe({ type: 'layout-shift', buffered: true });

			// Long Task observer (for TBT calculation)
			new PerformanceObserver((entryList) => {
				for (const entry of entryList.getEntries()) {
					// TBT = sum of (duration - 50ms) for all long tasks > 50ms
					if (entry.duration > 50) {
						g.__perf.tbt += entry.duration - 50;
					}
				}
			}).observe({ type: 'longtask', buffered: true });
		});

		// Navigate and wait for full page load
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.waitForSelector('main', { state: 'visible' });

		// Scroll through the entire page to trigger lazy-loaded content and
		// capture all layout shifts and long tasks
		await page.evaluate(async () => {
			const totalHeight = document.body.scrollHeight;
			const viewportHeight = globalThis.innerHeight;
			const step = viewportHeight;

			for (let y = 0; y < totalHeight; y += step) {
				globalThis.scrollTo(0, y);
				await new Promise((r) => setTimeout(r, 100));
			}
			// Scroll to very bottom
			globalThis.scrollTo(0, totalHeight);
			await new Promise((r) => setTimeout(r, 200));
			// Scroll back to top
			globalThis.scrollTo(0, 0);
			await new Promise((r) => setTimeout(r, 200));
		});

		// Give time for final observers to fire
		await page.waitForTimeout(500);

		// Collect all metrics
		const results: PerfResults = await page.evaluate(() => {
			const g = globalThis as AnyGlobal;
			const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
			const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

			const totalTransferSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

			return {
				fcp: g.__perf.fcp,
				lcp: g.__perf.lcp,
				cls: g.__perf.cls,
				tbt: g.__perf.tbt,
				domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,
				loadComplete: nav.loadEventEnd - nav.startTime,
				resourceCount: resources.length,
				totalTransferSize,
				domNodes: document.querySelectorAll('*').length,
			};
		});

		// Log results for the audit report
		const viewport = page.viewportSize();
		console.log(`\n=== Performance Audit Results (${viewport?.width}x${viewport?.height}) ===`);
		console.log(`  FCP:  ${results.fcp?.toFixed(0) ?? 'N/A'} ms  (target: < 1500ms)`);
		console.log(`  LCP:  ${results.lcp?.toFixed(0) ?? 'N/A'} ms  (target: < 2500ms)`);
		console.log(`  CLS:  ${results.cls.toFixed(4)}     (target: < 0.1)`);
		console.log(`  TBT:  ${results.tbt.toFixed(0)} ms   (target: < 200ms)`);
		console.log(`  ---`);
		console.log(`  DOM Content Loaded: ${results.domContentLoaded.toFixed(0)} ms`);
		console.log(`  Load Complete:      ${results.loadComplete.toFixed(0)} ms`);
		console.log(`  Resources:          ${results.resourceCount}`);
		console.log(`  Transfer Size:      ${(results.totalTransferSize / 1024).toFixed(1)} KB`);
		console.log(`  DOM Nodes:          ${results.domNodes}`);
		console.log(`===\n`);

		// Assertions against targets
		if (results.fcp !== null) {
			expect(results.fcp, 'FCP should be under 1500ms').toBeLessThan(1500);
		}
		if (results.lcp !== null) {
			expect(results.lcp, 'LCP should be under 2500ms').toBeLessThan(2500);
		}
		expect(results.cls, 'CLS should be under 0.1').toBeLessThan(0.1);
		expect(results.tbt, 'TBT should be under 200ms').toBeLessThan(200);
	});

	test('no layout shifts during scroll', async ({ page }) => {
		// Set up CLS observer before navigation.
		// Uses globalThis to store layout shift data for cross-scope retrieval.
		await page.addInitScript(() => {
			const g = globalThis as AnyGlobal;
			g.__layoutShifts = [];

			new PerformanceObserver((entryList) => {
				for (const entry of entryList.getEntries()) {
					const shift = entry as AnyGlobal;
					if (!shift.hadRecentInput) {
						g.__layoutShifts.push({
							value: shift.value,
							time: entry.startTime,
							sources: (shift.sources || []).map((s: { node: Element | null }) =>
								s.node ? `${s.node.tagName}${s.node.id ? '#' + s.node.id : ''}${s.node.className ? '.' + String(s.node.className).split(' ')[0] : ''}` : 'unknown'
							),
						});
					}
				}
			}).observe({ type: 'layout-shift', buffered: true });
		});

		await page.goto('/', { waitUntil: 'networkidle' });
		await page.waitForSelector('main', { state: 'visible' });

		// Smooth scroll through entire page
		await page.evaluate(async () => {
			const totalHeight = document.body.scrollHeight;
			const step = 300;
			for (let y = 0; y < totalHeight; y += step) {
				globalThis.scrollTo(0, y);
				await new Promise((r) => setTimeout(r, 50));
			}
			globalThis.scrollTo(0, totalHeight);
			await new Promise((r) => setTimeout(r, 300));
		});

		await page.waitForTimeout(300);

		const shifts = await page.evaluate(() => {
			const g = globalThis as AnyGlobal;
			return g.__layoutShifts as Array<{ value: number; time: number; sources: string[] }>;
		});

		const totalCLS = shifts.reduce((sum, s) => sum + s.value, 0);
		const viewport = page.viewportSize();

		console.log(`\n=== Layout Shift Audit (${viewport?.width}x${viewport?.height}) ===`);
		console.log(`  Total CLS: ${totalCLS.toFixed(4)}`);
		console.log(`  Shift events: ${shifts.length}`);
		if (shifts.length > 0) {
			console.log(`  Largest shifts:`);
			const sorted = [...shifts].sort((a, b) => b.value - a.value).slice(0, 5);
			for (const s of sorted) {
				console.log(`    ${s.value.toFixed(4)} @ ${s.time.toFixed(0)}ms — ${s.sources.join(', ') || 'no source info'}`);
			}
		}
		console.log(`===\n`);

		expect(totalCLS, 'Total CLS during scroll should be under 0.1').toBeLessThan(0.1);
	});

	test('resource loading audit', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.waitForSelector('main', { state: 'visible' });

		// Scroll to load all lazy resources
		await page.evaluate(async () => {
			globalThis.scrollTo(0, document.body.scrollHeight);
			await new Promise((r) => setTimeout(r, 500));
		});

		await page.waitForTimeout(500);

		const resources = await page.evaluate(() => {
			const entries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
			return entries.map((r) => ({
				name: r.name.replace(/^https?:\/\/[^/]+/, ''),
				type: r.initiatorType,
				transferSize: r.transferSize,
				duration: r.duration,
			}));
		});

		const viewport = page.viewportSize();
		console.log(`\n=== Resource Loading Audit (${viewport?.width}x${viewport?.height}) ===`);

		// Group by type
		const byType: Record<string, { count: number; totalSize: number; totalDuration: number }> = {};
		for (const r of resources) {
			if (!byType[r.type]) byType[r.type] = { count: 0, totalSize: 0, totalDuration: 0 };
			byType[r.type].count++;
			byType[r.type].totalSize += r.transferSize;
			byType[r.type].totalDuration += r.duration;
		}

		console.log(`  Resource summary by type:`);
		for (const [type, stats] of Object.entries(byType).sort((a, b) => b[1].totalSize - a[1].totalSize)) {
			console.log(`    ${type}: ${stats.count} files, ${(stats.totalSize / 1024).toFixed(1)} KB, ${stats.totalDuration.toFixed(0)}ms total`);
		}

		// Flag slow resources (> 500ms)
		const slowResources = resources.filter((r) => r.duration > 500);
		if (slowResources.length > 0) {
			console.log(`  Slow resources (> 500ms):`);
			for (const r of slowResources) {
				console.log(`    ${r.name} — ${r.duration.toFixed(0)}ms (${(r.transferSize / 1024).toFixed(1)} KB)`);
			}
		}

		// Flag large resources (> 100KB)
		const largeResources = resources.filter((r) => r.transferSize > 100 * 1024);
		if (largeResources.length > 0) {
			console.log(`  Large resources (> 100KB):`);
			for (const r of largeResources) {
				console.log(`    ${r.name} — ${(r.transferSize / 1024).toFixed(1)} KB`);
			}
		} else {
			console.log(`  No resources over 100KB — good!`);
		}

		const totalSize = resources.reduce((sum, r) => sum + r.transferSize, 0);
		console.log(`  Total transfer size: ${(totalSize / 1024).toFixed(1)} KB`);
		console.log(`  Total resources: ${resources.length}`);
		console.log(`===\n`);

		// Total page weight under 2MB is a good target for a portfolio
		expect(totalSize, 'Total page transfer size should be under 2MB').toBeLessThan(2 * 1024 * 1024);

		// No individual resource should exceed 500KB
		for (const r of resources) {
			expect(
				r.transferSize,
				`Resource ${r.name} should be under 500KB`
			).toBeLessThan(500 * 1024);
		}
	});

	test('DOM complexity audit', async ({ page }) => {
		await page.goto('/', { waitUntil: 'networkidle' });
		await page.waitForSelector('main', { state: 'visible' });

		const domStats = await page.evaluate(() => {
			const allNodes = document.querySelectorAll('*');
			const body = document.body;

			// Calculate max DOM depth
			let maxDepth = 0;
			let deepestNode = '';
			for (const node of allNodes) {
				let depth = 0;
				let el: Element | null = node;
				while (el && el !== body) {
					depth++;
					el = el.parentElement;
				}
				if (depth > maxDepth) {
					maxDepth = depth;
					deepestNode = `${node.tagName}${node.id ? '#' + node.id : ''}`;
				}
			}

			// Count elements with will-change via computed style
			let willChangeCount = 0;
			for (const el of allNodes) {
				const cs = getComputedStyle(el);
				if (cs.willChange && cs.willChange !== 'auto') {
					willChangeCount++;
				}
			}

			return {
				totalNodes: allNodes.length,
				maxDepth,
				deepestNode,
				willChangeCount,
				imgCount: document.querySelectorAll('img').length,
				svgCount: document.querySelectorAll('svg').length,
				scriptCount: document.querySelectorAll('script').length,
			};
		});

		const viewport = page.viewportSize();
		console.log(`\n=== DOM Complexity Audit (${viewport?.width}x${viewport?.height}) ===`);
		console.log(`  Total DOM nodes:   ${domStats.totalNodes}`);
		console.log(`  Max nesting depth: ${domStats.maxDepth} (${domStats.deepestNode})`);
		console.log(`  will-change elements: ${domStats.willChangeCount}`);
		console.log(`  Images: ${domStats.imgCount}`);
		console.log(`  SVGs:   ${domStats.svgCount}`);
		console.log(`  Scripts: ${domStats.scriptCount}`);
		console.log(`===\n`);

		// Google recommends < 1500 DOM nodes for optimal performance
		// A portfolio site shouldn't need more than ~1500
		expect(domStats.totalNodes, 'DOM should have fewer than 1500 nodes').toBeLessThan(1500);

		// Nesting depth over 32 causes perf issues
		expect(domStats.maxDepth, 'Max DOM depth should be under 32').toBeLessThan(32);
	});
});
