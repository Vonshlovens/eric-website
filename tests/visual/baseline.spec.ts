import { test, expect } from '@playwright/test';

/**
 * 2A — Baseline Screenshot Capture
 *
 * Captures full-page screenshots at all 4 viewport sizes (configured in
 * playwright.config.ts: desktop-1080p, desktop-720p, tablet, mobile)
 * with animations disabled. This gives us the "before" baseline for the
 * visual audit.
 *
 * The loading screen is bypassed via sessionStorage and animations are
 * disabled via the data-reduce-motion attribute so we get clean, static
 * captures of every section.
 */

test.beforeEach(async ({ page }) => {
  // Skip the loading/boot screen by pre-setting sessionStorage flag
  await page.addInitScript(() => {
    sessionStorage.setItem('boot-shown', '1');
  });

  // Disable animations via the motion store's data-reduce-motion attribute
  await page.addInitScript(() => {
    document.documentElement.setAttribute('data-reduce-motion', '');
    localStorage.setItem('reduce-motion', 'true');
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  // Wait for content to be visible (loading screen skipped)
  await page.waitForSelector('main', { state: 'visible' });
});

test('full-page baseline screenshot', async ({ page }) => {
  // Scroll to bottom and back to trigger any lazy-loaded content
  await page.evaluate(() => globalThis.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.evaluate(() => globalThis.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Freeze dynamic text content so consecutive screenshots are stable
  await page.evaluate(() => {
    // Freeze the footer latency counter
    document.querySelectorAll('footer span').forEach((el) => {
      if (el.textContent?.includes('Latency')) el.textContent = 'Latency: 0ms';
    });
    // Freeze the hero terminal panel age counter (changes every second)
    document.querySelectorAll('[aria-hidden="true"] span').forEach((el) => {
      if (el.textContent?.match(/\d{6,}\s*s$/)) el.textContent = '000,000,000 s';
    });
  });
  await page.waitForTimeout(100);

  await expect(page).toHaveScreenshot('full-page.png', {
    fullPage: true,
    maxDiffPixels: 20000,
    animations: 'disabled',
    timeout: 15000,
  });
});

test('hero section', async ({ page }) => {
  const hero = page.locator('#about');
  await expect(hero).toBeVisible();
  await expect(hero).toHaveScreenshot('hero.png');
});

test('core competencies section', async ({ page }) => {
  const section = page.locator('#competencies');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('core-competencies.png');
});

test('skills marquee section', async ({ page }) => {
  const section = page.locator('section[aria-label="Technical Skills"]');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('skills-marquee.png');
});

test('skill radar section', async ({ page }) => {
  const section = page.locator('#skill-radar');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('skill-radar.png', {
    maxDiffPixels: 500,
  });
});

test('engineering log section', async ({ page }) => {
  const section = page.locator('#engineering-log');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500); // wait for lazy images to settle
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('engineering-log.png', {
    maxDiffPixels: 1000,
  });
});

test('work experience section', async ({ page }) => {
  const section = page.locator('#experience');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('work-experience.png');
});

test('education section', async ({ page }) => {
  const section = page.locator('#education');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('education.png');
});

test('interests section', async ({ page }) => {
  const section = page.locator('#interests');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('interests.png');
});

test('contact CTA section', async ({ page }) => {
  const section = page.locator('#contact');
  await section.scrollIntoViewIfNeeded();
  await expect(section).toBeVisible();
  await expect(section).toHaveScreenshot('contact-cta.png');
});

test('navigation', async ({ page }) => {
  // On mobile/tablet the <nav> is hidden (hamburger replaces it),
  // so screenshot the entire <header> element instead
  const header = page.locator('header').first();
  await expect(header).toBeVisible();
  await expect(header).toHaveScreenshot('navigation.png');
});

test('footer', async ({ page }) => {
  const footer = page.locator('footer');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toBeVisible();
  await expect(footer).toHaveScreenshot('footer.png');
});
