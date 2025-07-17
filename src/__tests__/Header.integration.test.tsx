import Header from "@/components/header/Header";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Header Integration Test", () => {
  it("renders logo, main nav, and user nav (PC)", () => {
    render(<Header />);

    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();

    // メインナビゲーション（PC）
    const navLinks = screen.getAllByTestId("nav-link");
    expect(navLinks).toHaveLength(3); // /jobs, /courses, /articles

    // ユーザーナビゲーション（PC）
    const pcAuthLinks = screen.getAllByTestId("auth-pc-link");
    expect(pcAuthLinks).toHaveLength(4); // histories, favorites, login, signup

    // リンク先チェック（例）
    expect(pcAuthLinks.find((el) => el.textContent === "ログイン")).toHaveAttribute("href", "/user/sign_in");
    expect(navLinks.find((el) => el.textContent === "求人をさがす")).toHaveAttribute("href", "/jobs");
  });

  it("renders auth links and toggled menu links in mobile menu", () => {
    render(<Header />);

    // モバイル用：ログイン・会員登録アイコン（SignIn/SignUp）
    const mobileAuthLinks = screen.getAllByTestId("mobile-auth-link");
    expect(mobileAuthLinks).toHaveLength(2);

    // 「メニュー」ボタンをクリックしてトグルメニューを開く
    const menuToggle = screen.getByText("メニュー");
    fireEvent.click(menuToggle);

    // トグルされたリンク（求人・コース・履歴・気になる）
    const mobileNavLinks = screen.getAllByTestId("mobile-nav-link");
    expect(mobileNavLinks).toHaveLength(4);

    // それぞれのリンクが正しいか確認（例）
    expect(mobileNavLinks.find((el) => el.textContent === "求人をさがす")).toHaveAttribute("href", "/jobs");
    expect(mobileNavLinks.find((el) => el.textContent === "閲覧履歴")).toHaveAttribute("href", "/histories");
  });
});
