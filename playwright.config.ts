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
    { name: 'desktop-1080p', use: { viewport: { width: 1920, height: 1080 } } },
    { name: 'desktop-720p', use: { viewport: { width: 1280, height: 720 } } },
    { name: 'tablet', use: { ...devices['iPad Pro 11'], browserName: 'chromium' } },
    { name: 'mobile', use: { ...devices['iPhone 13'], browserName: 'chromium' } },
  ],
});
