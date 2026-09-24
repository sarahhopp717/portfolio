import { test, expect } from "@playwright/test";

// Note: the lightbox overlay itself is a `role="button"` div (for click-outside-to-close),
// so its computed accessible name absorbs the labels of the real buttons inside it
// (e.g. "Close Previous photo Next photo"). `exact: true` is required to target the
// actual Close/Next/Previous buttons instead of matching that wrapper too.

test.describe("Photos lightbox", () => {
  test("clicking a thumbnail opens the lightbox and Escape closes it", async ({ page }) => {
    await page.goto("/photos");

    const closeButton = page.getByRole("button", { name: "Close", exact: true });
    await expect(closeButton).not.toBeVisible();

    await page.locator(".grid > button").first().click();
    await expect(closeButton).toBeVisible();
    await expect(page.getByRole("button", { name: "Next photo", exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: "Previous photo", exact: true })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(closeButton).not.toBeVisible();
  });
});

test.describe("Hobbies lightbox", () => {
  test("clicking a category tile opens straight into its lightbox", async ({ page }) => {
    await page.goto("/hobbies");

    await page.getByRole("button", { name: "Camping & Travel" }).click();
    await expect(page.getByRole("button", { name: "Close", exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: "Enlarged" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Close", exact: true })).not.toBeVisible();
  });

  test("Drums category cycles through both YouTube embeds and the channel link", async ({ page }) => {
    await page.goto("/hobbies");
    await page.getByRole("button", { name: "Drums" }).click();
    await expect(page.getByRole("button", { name: "Close", exact: true })).toBeVisible();

    // Walking backward from the opening slide wraps to the end of the media
    // array, which stays correct no matter how many drum photos exist.
    await page.keyboard.press("ArrowLeft");
    await expect(page.getByText("Go to my channel to see more videos")).toBeVisible();
    await expect(page.getByRole("link", { name: /youtube\.com\/@sarahhopp225/ })).toBeVisible();

    await page.keyboard.press("ArrowLeft");
    await expect(page.locator('iframe[title="Drums video"]')).toHaveAttribute("src", /5tZ-4Gf3o74/);

    await page.keyboard.press("ArrowLeft");
    await expect(page.locator('iframe[title="Drums video"]')).toHaveAttribute("src", /qsBidBCITbE/);
  });
});
