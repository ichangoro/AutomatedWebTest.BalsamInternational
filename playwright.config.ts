import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'specs',
  timeout: 180000,
  retries: 0,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  // projects: [
  //   {
  //     name: 'chromium',
  //     use: { ...devices['Desktop Chrome'] }
  //   },
  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] }
  //   }
  // ],
  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized']
    }
  }
});