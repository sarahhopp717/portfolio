import { test, expect } from "@playwright/test";

test("social links point to the right profiles", async ({ page }) => {
  await page.goto("/connect");

  await expect(page.getByRole("link", { name: "Instagram" })).toHaveAttribute(
    "href",
    "https://www.instagram.com/s_hopp"
  );
  await expect(page.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/sarahhopp717/"
  );
  await expect(page.getByRole("link", { name: "GitHub" })).toHaveAttribute(
    "href",
    "https://github.com/sarahhopp717"
  );
});

test("email link resolves to the real address", async ({ page }) => {
  await page.goto("/connect");

  const emailLink = page.getByRole("link", { name: "sarahhopp717@gmail.com" });
  await expect(emailLink).toBeVisible();
  await expect(emailLink).toHaveAttribute("href", "mailto:sarahhopp717@gmail.com");
});
