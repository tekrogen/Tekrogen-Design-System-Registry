import { expect, test } from "@playwright/test";

// Phase-1 brand validation: rendered truth on the Ink (default) theme, plus a
// Paper pass (remove `.dark`). Screenshots at 1440 + 390 for the 3-expert review.
const ROUTES = ["/", "/tokens"];
const SHOTS = "test-results/phase1";

for (const route of ROUTES) {
  test(`Ink theme renders brand tokens: ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(route);

    // Self-hosted Poppins is the body font.
    const font = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily,
    );
    expect(font).toContain("Poppins");

    // Ink background (#0e1116) is the default (dark on <html>).
    const bg = await page.evaluate(
      () => getComputedStyle(document.documentElement).backgroundColor,
    );
    expect(bg).toBe("rgb(14, 17, 22)");

    await page.screenshot({
      path: `${SHOTS}/ink-${route === "/" ? "home" : "tokens"}-1440.png`,
      fullPage: true,
    });
  });
}

test("no horizontal overflow at 390px (Ink)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ROUTES) {
    await page.goto(route);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(0);
    await page.screenshot({
      path: `${SHOTS}/ink-${route === "/" ? "home" : "tokens"}-390.png`,
      fullPage: true,
    });
  }
});

test("Paper theme renders the AA light palette", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/tokens");
  await page.evaluate(() => document.documentElement.classList.remove("dark"));
  const bg = await page.evaluate(
    () => getComputedStyle(document.documentElement).backgroundColor,
  );
  expect(bg).toBe("rgb(243, 245, 247)"); // #f3f5f7 paper
  await page.screenshot({
    path: `${SHOTS}/paper-tokens-1440.png`,
    fullPage: true,
  });
});
