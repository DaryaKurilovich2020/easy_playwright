import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  expect: {
    timeout: 20000,
  },

  timeout: 240000,
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  reporter: 'html',

  use: {
    baseURL: 'https://cs2.easyrpa.eu/',
    trace: 'on',
    navigationTimeout: 300000,
    actionTimeout: 300000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});