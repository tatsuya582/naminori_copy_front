import { test, expect } from "@playwright/test";

// 共通フォーム入力関数
const fillValidForm = async (page: any) => {
  await page.getByPlaceholder("姓", { exact: true }).fill("山田");
  await page.getByPlaceholder("名", { exact: true }).fill("太郎");
  await page.getByPlaceholder("姓かな", { exact: true }).fill("やまだ");
  await page.getByPlaceholder("名かな", { exact: true }).fill("たろう");
  await page.getByPlaceholder("メールアドレス（ログインID）", { exact: true }).fill("test@example.com");
  await page.getByPlaceholder("電話番号（ハイフンなしの半角数字）", { exact: true }).fill("08012345678");

  const comboBoxes = await page.getByRole("combobox").all();
  await comboBoxes[0].click(); // 年
  await page.getByRole("option", { name: "1990" }).click();

  await comboBoxes[1].click(); // 月
  await page.getByRole("option", { name: "1", exact: true }).click();

  await comboBoxes[2].click(); // 日
  await page.getByRole("option", { name: "1", exact: true }).click();

  await comboBoxes[3].click(); // 性別
  await page.getByRole("option", { name: "男性", exact: true }).click();

  await comboBoxes[4].click(); // 居住地
  await page.getByRole("option", { name: "東京都", exact: true }).click();

  await page.getByPlaceholder("パスワード", { exact: true }).fill("abc12345");
  await page.getByPlaceholder("パスワード（確認用）", { exact: true }).fill("abc12345");

  await page.getByRole("checkbox").check();
};

test.describe("/user/sign_up E2E テスト", () => {
  test("ページが表示される", async ({ page }) => {
    await page.goto("/user/sign_up");

    await expect(page.getByRole("heading", { name: "新規会員登録" })).toBeVisible();
  });

  test("パスワード不一致でエラーメッセージが出る", async ({ page }) => {
    await page.goto("/user/sign_up");

    await page.getByPlaceholder("パスワード", { exact: true }).fill("abc12345");
    await page.getByPlaceholder("パスワード（確認用）", { exact: true }).fill("xyz99999");

    await expect(page.getByText("パスワードが一致しません。")).toBeVisible();
  });

  test("利用規約チェックなしでは送信できない", async ({ page }) => {
    await page.goto("/user/sign_up");

    await page.getByRole("button", { name: /会員登録する/ }).click();

    await expect(page.getByText("次に進むにはこのチェックボックスをオンにしてください。")).toBeVisible();
  });

  test("✅ 会員登録が成功し、/jobs にリダイレクトされる", async ({ page }) => {
    // ✅ POST /signup を成功モック
    await page.route("**/signup", async (route) => {
      const request = await route.request();
      const data = await request.postDataJSON();
      // console.log("成功時送信内容:", data);

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.goto("/user/sign_up");
    await fillValidForm(page);
    await page.getByRole("button", { name: /会員登録する/ }).click();

    await expect(page).toHaveURL("/jobs");
  });

  test("❌ メールアドレス重複エラーでエラーメッセージが表示される", async ({ page }) => {
    // ❌ POST /signup を失敗モック（メールアドレス重複）
    await page.route("**/signup", async (route) => {
      const request = await route.request();
      const data = await request.postDataJSON();
      // console.log("失敗時送信内容:", data);

      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({ errors: ["Email has already been taken"] }),
      });
    });

    await page.goto("/user/sign_up");
    await fillValidForm(page);
    await page.getByRole("button", { name: /会員登録する/ }).click();

    await expect(page.getByText("このメールアドレスはすでに登録されています")).toBeVisible();
  });
});
