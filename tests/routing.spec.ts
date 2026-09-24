import { test, expect } from "@playwright/test";

// Directly loading a nested route (not clicking into it from "/") is the
// exact scenario that 404s on a static host without the vercel.json rewrite.
// This is a local proxy for that risk — the live site is the real proof.

test("direct load of /photos renders the page, not a 404", async ({ page }) => {
  const response = await page.goto("/photos");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByRole("heading", { name: "LIVE AT WORK" })).toBeVisible();
});

test("direct load of /bands renders the page, not a 404", async ({ page }) => {
  const response = await page.goto("/bands");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByRole("heading", { name: "Rock / Alternative" })).toBeVisible();
});

test("direct load of /hobbies renders the page, not a 404", async ({ page }) => {
  const response = await page.goto("/hobbies");
  expect(response?.status()).toBeLessThan(400);
  await expect(page.getByRole("heading", { name: "OFF THE CLOCK" })).toBeVisible();
});
