import { expect, test, type Page } from "@playwright/test";

async function waitForBoot(page: Page) {
  await expect(page.locator("[data-boot-screen]")).toHaveCount(0, { timeout: 10_000 });
}

test.describe("boot screen", () => {
  test("shows once per session and is skipped on reload", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("$ initializing system")).toBeVisible();
    await waitForBoot(page);

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-booted", "true");
    await expect(page.locator("[data-boot-screen]")).toBeHidden();
  });
});

test.describe("page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForBoot(page);
  });

  test("renders the hero with a single h1", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("FULL-STACK");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("has no horizontal overflow", async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("CV link points to a real PDF", async ({ page, request }) => {
    const cv = page.getByRole("link", { name: "DOWNLOAD CV", exact: true });
    await expect(cv).toHaveAttribute("href", "/resume/abhishek-resume.pdf");
    const response = await request.get("/resume/abhishek-resume.pdf");
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("pdf");
  });

  test("VIEW PROJECTS scrolls to the projects section", async ({ page }) => {
    await page.getByRole("link", { name: "VIEW PROJECTS" }).click();
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("external links are hardened", async ({ page }) => {
    const external = page.locator("a[target='_blank']");
    expect(await external.count()).toBeGreaterThan(0);
    for (const link of await external.all()) {
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }
  });

  test("contact form validates before opening mail", async ({ page }) => {
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "SEND MESSAGE" }).click();
    await expect(page.getByText("Enter your name.")).toBeVisible();
    await expect(page.getByText("Enter your email.")).toBeVisible();
  });
});

