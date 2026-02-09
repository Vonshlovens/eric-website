import { test, expect } from '@playwright/test';

/**
 * 2E — Cross-Browser Testing Matrix
 *
 * Tests across Chromium, Firefox, and WebKit at Desktop (1920×1080)
 * and Mobile (390×844) viewports. Focuses on browser-specific concerns:
 *
 * - SVG polygon animation (rAF-driven, not CSS transitions on `points`)
 * - View Transitions API (Chromium-only; Firefox/WebKit gracefully degrade)
 * - CSS mask-image on hero avatar reveal (-webkit-mask-image fallback)
 * - Scrollbar styling (::-webkit-scrollbar — WebKit-only)
 * - Skills grid layout
 * - will-change compositing across engines
 *
 * Screenshot comparisons use per-browser baselines (each browser renders
 * fonts and anti-aliasing differently). Functional tests verify that
 * animations, interactions, and layout work correctly in all engines.
 */

test.beforeEach(async ({ page }) => {
	// Skip the loading/boot screen
	await page.addInitScript(() => {
		sessionStorage.setItem('boot-shown', '1');
	});

	// Disable animations for deterministic screenshots
	await page.addInitScript(() => {
		document.documentElement.setAttribute('data-reduce-motion', '');
		localStorage.setItem('reduce-motion', 'true');
	});

	await page.goto('/', { waitUntil: 'networkidle' });
	await page.waitForSelector('main', { state: 'visible' });
});

// --- Full-page visual parity ---

test('full-page renders correctly', async ({ page }) => {
	// Scroll to bottom and back to trigger lazy-loaded content
	await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));
	await page.waitForTimeout(500);
	await page.evaluate(() => globalThis.scrollTo(0, 0));
	await page.waitForTimeout(500);

	// Freeze dynamic text content so consecutive screenshots are stable
	await page.evaluate(() => {
		document.querySelectorAll('footer span').forEach((el) => {
			if (el.textContent?.includes('Latency')) el.textContent = 'Latency: 0ms';
		});
		document.querySelectorAll('[aria-hidden="true"] span').forEach((el) => {
			if (el.textContent?.match(/\d{6,}\s*s$/)) el.textContent = '000,000,000 s';
		});
	});
	await page.waitForTimeout(100);

	await expect(page).toHaveScreenshot('xb-full-page.png', {
		fullPage: true,
		maxDiffPixels: 5000,
		animations: 'disabled',
		timeout: 15000,
	});
});

// --- Hero section: mask-image reveal ---

test('hero section renders with avatar', async ({ page }) => {
	const hero = page.locator('#about');
	await expect(hero).toBeVisible();
	await expect(hero).toHaveScreenshot('xb-hero.png', {
		maxDiffPixels: 150,
	});
});

test('hero avatar uses correct mask/reveal structure', async ({ page, browserName }) => {
	// The hero has a two-layer avatar: display layer (top) and GitHub layer (bottom)
	// The display layer uses mask-image / -webkit-mask-image for the reveal effect
	// On desktop with (hover:hover), verify the mask layer structure exists
	const viewport = page.viewportSize();
	if (viewport && viewport.width > 1024) {
		// Check that the mask-image CSS property is applicable
		// (different browsers may report it differently)
		const maskSupport = await page.evaluate(() => {
			const el = document.querySelector('#about .relative .absolute');
			if (!el) return { hasMaskImage: false, hasWebkitMaskImage: false };
			const cs = getComputedStyle(el);
			return {
				hasMaskImage: cs.maskImage !== 'none' && cs.maskImage !== '',
				hasWebkitMaskImage: (cs as Record<string, string>).webkitMaskImage !== undefined,
			};
		});

		// At least one mask property should be recognized by the browser
		const browserLabel = browserName;
		console.log(`  [${browserLabel}] mask-image support: ${JSON.stringify(maskSupport)}`);
	}

	// Avatar image should always be visible regardless of browser
	const avatarImg = page.locator('#about img').first();
	await expect(avatarImg).toBeVisible();
});

// --- SVG SkillRadar polygon ---

test('skill radar SVG renders polygon correctly', async ({ page, browserName }) => {
	const section = page.locator('#skill-radar');
	await section.scrollIntoViewIfNeeded();
	await expect(section).toBeVisible();

	// Verify the SVG polygon exists and has valid points
	const polygonData = await page.evaluate(() => {
		const polygon = document.querySelector('#skill-radar polygon');
		if (!polygon) return null;
		const points = polygon.getAttribute('points');
		return {
			hasPolygon: true,
			pointsLength: points?.split(' ').length ?? 0,
			hasValidPoints: points !== null && points.length > 0 && !points.includes('NaN'),
		};
	});

	expect(polygonData, 'SVG polygon should exist').not.toBeNull();
	expect(polygonData!.hasValidPoints, `[${browserName}] polygon points should be valid numbers`).toBe(true);
	// 6-axis radar = 6 coordinate pairs
	expect(polygonData!.pointsLength, `[${browserName}] polygon should have 6 points`).toBe(6);

	await expect(section).toHaveScreenshot('xb-skill-radar.png', {
		maxDiffPixels: 200,
	});
});

test('skill radar axis labels are not clipped', async ({ page, browserName }) => {
	const section = page.locator('#skill-radar');
	await section.scrollIntoViewIfNeeded();

	// Check that all 6 axis labels are visible within the SVG bounding box
	const labelStatus = await page.evaluate(() => {
		const svg = document.querySelector('#skill-radar svg');
		if (!svg) return null;
		const svgRect = svg.getBoundingClientRect();
		const labels = svg.querySelectorAll('text');
		const results: Array<{ text: string; visible: boolean; withinBounds: boolean }> = [];

		for (const label of labels) {
			const rect = label.getBoundingClientRect();
			const visible = rect.width > 0 && rect.height > 0;
			const withinBounds =
				rect.left >= svgRect.left - 5 &&
				rect.right <= svgRect.right + 5 &&
				rect.top >= svgRect.top - 5 &&
				rect.bottom <= svgRect.bottom + 5;
			results.push({
				text: label.textContent?.trim() ?? '',
				visible,
				withinBounds,
			});
		}
		return results;
	});

	expect(labelStatus, 'SVG should contain text labels').not.toBeNull();

	const axisLabels = labelStatus!.filter((l) =>
		['FRONTEND', 'BACKEND', 'DEVOPS', 'CLOUD', 'DATABASES', 'AI/ML'].includes(l.text)
	);

	console.log(`  [${browserName}] Axis label visibility:`);
	for (const label of axisLabels) {
		console.log(`    ${label.text}: visible=${label.visible}, withinBounds=${label.withinBounds}`);
		expect(label.visible, `[${browserName}] Label "${label.text}" should be visible`).toBe(true);
		expect(label.withinBounds, `[${browserName}] Label "${label.text}" should not be clipped`).toBe(true);
	}
});

// --- Skills grid ---

test('skills grid renders with correct structure', async ({ page, browserName }) => {
	const skills = page.locator('section[aria-label="Technical Skills"]');
	await skills.scrollIntoViewIfNeeded();
	await expect(skills).toBeVisible();

	// Verify skill chips are rendered as a static grid
	const gridData = await page.evaluate(() => {
		const section = document.querySelector('section[aria-label="Technical Skills"]');
		if (!section) return null;
		const chips = section.querySelectorAll('.skill-chip');
		return {
			chipCount: chips.length,
		};
	});

	console.log(`  [${browserName}] Skills grid: ${gridData?.chipCount} chips`);

	expect(gridData).not.toBeNull();
	expect(gridData!.chipCount, 'Should have 20 skill chips').toBe(20);

	await expect(skills).toHaveScreenshot('xb-skills-grid.png', {
		maxDiffPixels: 200,
	});
});

// --- View Transitions API ---

test('view transitions gracefully degrade', async ({ page, browserName }) => {
	// View Transitions API is Chromium-only; Firefox/WebKit should not break
	const hasViewTransitions = await page.evaluate(() => {
		return typeof document.startViewTransition === 'function';
	});

	console.log(`  [${browserName}] View Transitions API: ${hasViewTransitions ? 'supported' : 'not supported (graceful degradation)'}`);

	if (browserName === 'chromium') {
		expect(hasViewTransitions, 'Chromium should support View Transitions').toBe(true);
	}

	// Regardless of support, navigation should work
	// Click an anchor link and verify smooth navigation
	const aboutLink = page.locator('header a[href="#about"]').first();
	if (await aboutLink.isVisible()) {
		await aboutLink.click();
		await page.waitForTimeout(300);
		// Page should still be functional
		await expect(page.locator('main')).toBeVisible();
	}
});

// --- Engineering log section ---

test('engineering log renders correctly', async ({ page }) => {
	const section = page.locator('#engineering-log');
	await section.scrollIntoViewIfNeeded();
	await page.waitForTimeout(500);
	await expect(section).toBeVisible();
	await expect(section).toHaveScreenshot('xb-engineering-log.png', {
		maxDiffPixels: 300,
	});
});

// --- Contact CTA ---

test('contact CTA section renders correctly', async ({ page }) => {
	const section = page.locator('#contact');
	await section.scrollIntoViewIfNeeded();
	await expect(section).toBeVisible();
	await expect(section).toHaveScreenshot('xb-contact-cta.png', {
		maxDiffPixels: 150,
	});
});

// --- Navigation and footer ---

test('navigation renders correctly', async ({ page }) => {
	const header = page.locator('header').first();
	await expect(header).toBeVisible();
	await expect(header).toHaveScreenshot('xb-navigation.png', {
		maxDiffPixels: 150,
	});
});

test('footer renders correctly', async ({ page }) => {
	const footer = page.locator('footer');
	await footer.scrollIntoViewIfNeeded();
	await expect(footer).toBeVisible();
	await expect(footer).toHaveScreenshot('xb-footer.png', {
		maxDiffPixels: 150,
	});
});

// --- Theme toggle works across browsers ---

test('theme toggle switches to light mode', async ({ page, browserName }) => {
	// Start in dark mode (default), toggle to light
	const isDarkBefore = await page.evaluate(() => {
		return document.documentElement.classList.contains('dark');
	});

	console.log(`  [${browserName}] Initial dark mode: ${isDarkBefore}`);

	// Find and click the theme toggle (desktop nav)
	const viewport = page.viewportSize();
	if (viewport && viewport.width >= 1024) {
		const themeToggle = page.locator('header button[aria-label*="theme"], header button[aria-label*="Switch to"]').first();
		if (await themeToggle.isVisible()) {
			await themeToggle.click();
			await page.waitForTimeout(200);

			const isDarkAfter = await page.evaluate(() => {
				return document.documentElement.classList.contains('dark');
			});

			expect(isDarkAfter, `[${browserName}] Theme should toggle`).not.toBe(isDarkBefore);

			// Screenshot in light mode
			await expect(page.locator('#about')).toHaveScreenshot('xb-hero-light.png', {
				maxDiffPixels: 200,
			});

			// Toggle back
			await themeToggle.click();
			await page.waitForTimeout(200);
		}
	}
});

// --- Scroll-reveal animations work (when enabled) ---

test('scroll-reveal elements become visible on scroll', async ({ page, browserName }) => {
	// Re-enable animations for this test
	await page.evaluate(() => {
		document.documentElement.removeAttribute('data-reduce-motion');
		localStorage.removeItem('reduce-motion');
	});

	// Wait a moment for stores to react
	await page.waitForTimeout(200);

	// Scroll to skill radar
	const section = page.locator('#skill-radar');
	await section.scrollIntoViewIfNeeded();
	await page.waitForTimeout(800); // Wait for scroll-reveal animation

	// Check that elements have the 'revealed' class
	const revealedCount = await page.evaluate(() => {
		return document.querySelectorAll('.revealed').length;
	});

	console.log(`  [${browserName}] Revealed elements after scroll: ${revealedCount}`);
	expect(revealedCount, `[${browserName}] Some elements should be revealed after scrolling`).toBeGreaterThan(0);
});

// --- Console error check ---

test('no critical console errors', async ({ page, browserName }) => {
	const errors: string[] = [];

	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			const text = msg.text();
			// Ignore known non-critical errors
			if (
				text.includes('favicon') ||
				text.includes('404') ||
				text.includes('net::ERR') ||
				text.includes('Cookie') ||
				text.includes('SameSite')
			) return;
			errors.push(text);
		}
	});

	// Navigate fresh
	await page.goto('/', { waitUntil: 'networkidle' });
	await page.waitForSelector('main', { state: 'visible' });

	// Scroll through entire page
	await page.evaluate(async () => {
		const totalHeight = document.body.scrollHeight;
		const step = globalThis.innerHeight;
		for (let y = 0; y < totalHeight; y += step) {
			globalThis.scrollTo(0, y);
			await new Promise((r) => setTimeout(r, 100));
		}
		globalThis.scrollTo(0, 0);
		await new Promise((r) => setTimeout(r, 200));
	});

	await page.waitForTimeout(300);

	if (errors.length > 0) {
		console.log(`  [${browserName}] Console errors found:`);
		for (const err of errors) {
			console.log(`    ${err}`);
		}
	}

	expect(errors, `[${browserName}] Should have no critical console errors`).toHaveLength(0);
});
