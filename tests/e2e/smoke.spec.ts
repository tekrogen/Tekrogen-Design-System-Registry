import { expect, test } from "@playwright/test";

// Phase-0 smoke: the registry index serves and renders. Brand/UX assertions
// (computed tokens, 390px overflow, axe) are added per workflow Phase 1+.
test("registry index loads", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page).toHaveTitle(/.+/);
});
