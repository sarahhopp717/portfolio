import { test, expect } from "@playwright/test";

test("home page loads with hero heading", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "SARAH HOPP" })).toBeVisible();
});

test("Pivot nav link loads the pivot story", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Pivot", exact: true }).click();
  await expect(page).toHaveURL(/\/pivot$/);
  await expect(
    page.getByRole("heading", { name: "From FOH to Full Stack: Why I Became a Software Engineer" })
  ).toBeVisible();
});

test("Photos nav link loads the gallery", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Photos" }).click();
  await expect(page).toHaveURL(/\/photos$/);
  await expect(page.getByRole("heading", { name: "LIVE AT WORK" })).toBeVisible();
});

test("Experience nav link loads tools of the trade", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/\/experience$/);
  await expect(page.getByRole("heading", { name: "TOOLS OF THE TRADE" })).toBeVisible();
});

test("Hobbies nav link loads off the clock", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Hobbies" }).click();
  await expect(page).toHaveURL(/\/hobbies$/);
  await expect(page.getByRole("heading", { name: "OFF THE CLOCK" })).toBeVisible();
});

test("Connect nav link loads let's talk", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Connect" }).click();
  await expect(page).toHaveURL(/\/connect$/);
  await expect(page.getByRole("heading", { name: "LET'S TALK" })).toBeVisible();
});
