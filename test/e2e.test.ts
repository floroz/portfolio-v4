import { test, expect } from "@playwright/test";

test.describe("Portfolio E2E Tests", () => {
  test("should load the homepage", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to be fully loaded
    await expect(page).toHaveTitle(/portfolio/i);
  });

  test("should display the game canvas", async ({ page }) => {
    await page.goto("/");

    // Check that the main game canvas is visible
    const gameCanvas = page.locator('[class*="game-canvas"]');
    await expect(gameCanvas).toBeVisible();
  });
});
