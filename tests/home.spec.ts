import { test, expect } from "@playwright/test";

test.describe("トップページ", () => {
  test("ナビゲーションリンクから求人ページに遷移できる", async ({ page }) => {
    await page.goto("/");

    const link = page.getByRole("link", { name: "求人をさがす" });
    await expect(link).toBeVisible();

    await link.click();
    await expect(page).toHaveURL("/jobs");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/求人/);
  });

  test("モバイルメニューから閲覧履歴に遷移できる", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto("/");

    await page.getByText("メニュー").click();
    const historyLink = page.getByRole("link", { name: "閲覧履歴" });
    await expect(historyLink).toBeVisible();

    await historyLink.click();
    await expect(page).toHaveURL("/histories");
  });

  test("フッターリンクからプライバシーポリシーに遷移できる", async ({ page }) => {
    await page.goto("/");

    const privacyLink = page.getByRole("link", { name: "プライバシーポリシー" });
    await expect(privacyLink).toBeVisible();

    await privacyLink.click();
    await expect(page).toHaveURL("/privacy");
  });

  test("フッターに著作権表記が表示されている", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("© 2024 Xincere, Inc. All Rights Reserved.")).toBeVisible();
  });
});
