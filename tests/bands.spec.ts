import { test, expect } from "@playwright/test";

test("default flyer shows the first genre", async ({ page }) => {
  await page.goto("/bands");
  await expect(page.getByRole("heading", { name: "Rock / Alternative" })).toBeVisible();
});

test("next/previous arrows cycle between flyers", async ({ page }) => {
  await page.goto("/bands");
  await page.getByRole("button", { name: "Next flyer" }).click();
  await expect(page.getByRole("heading", { name: "Metal / Hardcore / Punk" })).toBeVisible();

  await page.getByRole("button", { name: "Previous flyer" }).click();
  await expect(page.getByRole("heading", { name: "Rock / Alternative" })).toBeVisible();
});

test("searching a known act jumps to its flyer", async ({ page }) => {
  await page.goto("/bands");
  await page.getByPlaceholder("Have I worked for this artist?").fill("Weezer");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Found in Legends / Icons")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Legends / Icons" })).toBeVisible();
});

test("searching an unknown act shows the not-yet message", async ({ page }) => {
  await page.goto("/bands");
  await page.getByPlaceholder("Have I worked for this artist?").fill("Definitely Not A Real Band");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Not yet!")).toBeVisible();
});
