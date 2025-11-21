import { test, expect } from '@playwright/test';

/**
 * Example E2E tests using Playwright
 * These tests run against the actual website in a real browser
 */

test.describe('Portfolio Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('should display the page', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Designer Portfolio/);
  });

  test('should have navigation', async ({ page }) => {
    // Look for navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should navigate to work section', async ({ page }) => {
    // Click work section link
    const workLink = page.locator('a[href="#work"]');
    if (await workLink.isVisible()) {
      await workLink.click();
      // Verify navigation
      const workSection = page.locator('#work');
      await expect(workSection).toBeInViewport();
    }
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load homepage quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Page should load in less than 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });

    await page.goto('/');

    expect(consoleErrors).toHaveLength(0);
  });
});

test.describe('Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have alt text on images', async ({ page }) => {
    await page.goto('/');

    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      // Images should have alt text (if not decorative)
      if (alt === null) {
        const role = await images.nth(i).getAttribute('role');
        expect(['presentation', 'none']).toContain(role);
      }
    }
  });
});
