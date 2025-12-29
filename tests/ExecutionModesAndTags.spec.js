const { test, expect } = require('@playwright/test');

/**
 * Execution Modes and Tags in Playwright
 *
 * This file demonstrates parallel and sequential execution using describe blocks,
 * and how to use tags for test filtering.
 *
 * Parallel Execution:
 * - When: Use describe.parallel() to run tests within a describe block in parallel.
 * - Why: Speeds up execution by running multiple tests simultaneously within the suite.
 * - Note: Requires workers > 1 in config (default 4) and fullyParallel: true.
 *
 * Sequential Execution:
 * - When: Use describe.serial() to run tests within a describe block one after another.
 * - Why: Useful when tests depend on each other or modify shared state, preventing race conditions.
 *
 * Tags:
 * - When: Use tags to categorize tests (e.g., @smoke, @regression, @slow).
 * - Why: Allows selective test execution, like running only smoke tests in CI/CD.
 * - How: Define with test.describe('description', { tag: '@tagname' }, () => { ... })
 * - Run: npx playwright test --grep "@tagname"
 */

// Parallel execution example
test.describe.parallel('Parallel Test Suite', () => {
  test('Parallel Test 1', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
  });

  test('Parallel Test 2', async ({ page }) => {
    await page.goto('https://example.com');
    await expect(page.locator('h1')).toBeVisible();
  });

  // These tests run in parallel within this suite
});

// Sequential execution example
test.describe.serial('Sequential Test Suite', () => {
  test('Sequential Test 1 - Setup', async ({ page }) => {
    await page.goto('https://example.com');
    // Simulate setup that affects state
    await page.evaluate(() => localStorage.setItem('test', 'value'));
  });

  test('Sequential Test 2 - Depends on Setup', async ({ page }) => {
    await page.goto('https://example.com');
    // This test depends on the previous test's setup
    const value = await page.evaluate(() => localStorage.getItem('test'));
    expect(value).toBe('value');
  });

  // These tests run sequentially, one after another
});

// Tagged test examples
test.describe('Smoke Tests', { tag: '@smoke' }, () => {
  test('Critical Login Flow', async ({ page }) => {
    // Smoke test logic
    await page.goto('https://example.com/login');
    // ... test steps
  });

  test('Basic Navigation', async ({ page }) => {
    // Another smoke test
    await page.goto('https://example.com');
    // ... test steps
  });
});

test.describe('Regression Tests', { tag: '@regression' }, () => {
  test('Complex User Journey', async ({ page }) => {
    // Regression test logic
    // ... comprehensive test
  });
});

test.describe('Slow Tests', { tag: '@slow' }, () => {
  test('Performance Test', async ({ page }) => {
    // Slow test that takes time
    await page.waitForTimeout(5000); // Simulate slow operation
  });
});

// Multiple tags example
test.describe('Integration Tests', { tag: ['@integration', '@api'] }, () => {
  test('API Integration', async ({ page }) => {
    // Test with multiple tags
  });
});

/**
 * Running Tests with Tags:
 * - All tests: npx playwright test
 * - Only smoke tests: npx playwright test --grep "@smoke"
 * - Regression tests: npx playwright test --grep "@regression"
 * - Multiple tags: npx playwright test --grep "@smoke|@regression"
 * - Exclude tags: npx playwright test --grep-invert "@slow"
 *
 * Combining with Execution Modes:
 * - Parallel smoke tests: npx playwright test --grep "@smoke" --workers=4
 * - Sequential regression: npx playwright test --grep "@regression" --workers=1
 */