import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  outputDir: './tests/visual/results',
  snapshotDir: './tests/visual/snapshots',
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
  },
  expect: {
    toHaveScreenshot: { maxDiffPixels: 100 },
  },
  webServer: {
    command: 'deno run -A npm:vite',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
  projects: [
    // Chromium (baseline reference) — runs baseline.spec.ts and performance.spec.ts
    { name: 'desktop-1080p', use: { viewport: { width: 1920, height: 1080 } }, testMatch: /baseline|performance/ },
    { name: 'desktop-720p', use: { viewport: { width: 1280, height: 720 } }, testMatch: /baseline|performance/ },
    { name: 'tablet', use: { ...devices['iPad Pro 11'], browserName: 'chromium' }, testMatch: /baseline|performance/ },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' }, testMatch: /baseline|performance/ },

    // Firefox — cross-browser tests only
    { name: 'firefox-desktop', use: { browserName: 'firefox', viewport: { width: 1920, height: 1080 } }, testMatch: /cross-browser/ },
    { name: 'firefox-mobile', use: { browserName: 'firefox', viewport: { width: 390, height: 844 } }, testMatch: /cross-browser/ },

    // WebKit/Safari — cross-browser tests only
    // NOTE: Requires Ubuntu-specific system libs (libflite1, libavif16, libmanette, libwoff1).
    // On Arch Linux, these are not available — run with --project=webkit-* only on Ubuntu/CI.
    { name: 'webkit-desktop', use: { browserName: 'webkit', viewport: { width: 1920, height: 1080 } }, testMatch: /cross-browser/ },
    { name: 'webkit-mobile', use: { browserName: 'webkit', viewport: { width: 390, height: 844 } }, testMatch: /cross-browser/ },
  ],
});
