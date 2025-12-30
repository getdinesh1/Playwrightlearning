// @ts-check
/**
 * Playwright Configuration
 *
 * This configuration supports running tests across multiple browsers, devices, and viewports.
 * It includes SSL certificate handling, video recording, traces, and screenshots on failure.
 *
 * Projects:
 * - chromium: Desktop Chrome
 * - firefox: Desktop Firefox
 * - webkit: Desktop Safari
 * - iPhone 12: Mobile iOS simulation
 * - Pixel 5: Mobile Android simulation
 * - Mobile Chrome: Custom mobile viewport on Chromium
 * - Tablet: Custom tablet viewport on WebKit
 *
 * Commands:
 * - Run all tests: npx playwright test
 * - Run specific project: npx playwright test --project=<project-name>
 * - Run with UI: npx playwright test --ui
 * - Run headed: npx playwright test --headed
 * - Debug: npx playwright test --debug
 * - Show report: npx playwright show-report
 *
 * Documentation: https://playwright.dev/docs/intro
 *
 * Allure Reporting:
 * - Install Allure CLI: npm install -g allure-commandline (or use npm scripts)
 * - Generate report: npm run allure:generate
 * - Serve report: npm run allure:serve
 * - Allure results are stored in allure-results/ directory
 * - For detailed Allure setup: https://docs.qameta.io/allure/
 */
import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests',
  timeout: 10 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  // Retries: Number of times to retry failed tests. Useful for flaky tests.
  // When: Tests fail due to intermittent issues like network timeouts.
  // Why: Improves test reliability by re-running failed tests automatically.
  retries: 2,
  // Workers: Number of parallel worker processes to use for running tests.
  // For parallel execution: Set to a number > 1 (e.g., 4) to run tests in parallel.
  // Why: Speeds up test execution by utilizing multiple CPU cores.
  // For sequential execution: Set to 1 to run tests one at a time.
  // Why: Useful for debugging, or when tests interfere with each other.
  workers: 4, // Change to 1 for sequential execution
  // Fully parallel: Allows tests within a project to run in parallel.
  // When: Set to true, tests in the same project can run simultaneously.
  // Why: Further speeds up execution within projects.
  fullyParallel: true,
  // Reporters: HTML for local viewing, Allure for detailed reporting
  reporter: [['html'], ['allure-playwright']],
  use: {
    headless: false,
    trace: 'on',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
    {
      name: 'iPhone 12',
      use: { ...devices['iPhone 12'] },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Chrome',
      use: { browserName: 'chromium', viewport: { width: 360, height: 640 } },
    },
    {
      name: 'Tablet',
      use: { browserName: 'webkit', viewport: { width: 768, height: 1024 } },
    },
  ],
});

module.exports = config;
