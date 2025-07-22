import Header from "@/components/header/Header";
import { render, screen } from "@testing-library/react";
import { useUser } from "@/hooks/useUser";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("@/hooks/useUser", () => ({
  useUser: jest.fn(),
}));

describe("Header Integration Test (PC)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly when user is NOT logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<Header />);

    // ロゴ
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();

    // メインナビゲーション
    const navLinks = screen.getAllByTestId("nav-link");
    expect(navLinks).toHaveLength(3);

    // ユーザーナビゲーション（未ログイン）
    const authLinks = screen.getAllByTestId("auth-pc-link");
    expect(authLinks).toHaveLength(4); // histories, favorites, login, signup

    expect(authLinks.find((el) => el.textContent === "ログイン")).toHaveAttribute("href", "/user/sign_in");
    expect(authLinks.find((el) => el.textContent === "新規会員登録")).toHaveAttribute("href", "/user/sign_up");
  });

  it("renders correctly when user IS logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: 1, email: "test@example.com" },
      loading: false,
    });

    render(<Header />);

    // ユーザーナビゲーション（ログイン状態）
    const authLinks = screen.getAllByTestId("auth-pc-link");
    expect(authLinks.length).toBeGreaterThanOrEqual(4); // histories, favorites, applys, dashboard

    // ログアウトボタン
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
    // ユーザードロップダウンメニューのトリガーアイコン
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument();
  });
});
