import Header from "@/components/header/Header";
import { render, screen, fireEvent } from "@testing-library/react";
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

describe("Header Integration Test (Mobile)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders mobile auth links and toggled nav links when user is NOT logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<Header />);

    // 会員登録・ログインリンクが表示されているか
    const mobileAuthLinks = screen.getAllByTestId("mobile-auth-link");
    expect(mobileAuthLinks).toHaveLength(2);
    expect(screen.getByText("会員登録")).toBeInTheDocument();
    expect(screen.getAllByText("ログイン")).toHaveLength(2);

    // 「メニュー」クリックで展開
    fireEvent.click(screen.getByText("メニュー"));

    const toggledLinks = screen.getAllByTestId("mobile-nav-link");
    expect(toggledLinks).toHaveLength(5); // 求人・コース・お役立ち記事・履歴・気になる
    expect(screen.queryByTestId("logout-button")).not.toBeInTheDocument();
  });

  it("renders additional mobile menu links and logout when user IS logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: 1, email: "user@example.com" },
      loading: false,
    });

    render(<Header />);

    // 「メニュー」クリックで展開
    fireEvent.click(screen.getByText("メニュー"));

    const toggledLinks = screen.getAllByTestId("mobile-nav-link");

    // 求人・コース・お役立ち記事・履歴・気になる + 応募管理・学習管理
    expect(toggledLinks).toHaveLength(7);

    expect(toggledLinks.find((el) => el.textContent === "応募管理")).toHaveAttribute("href", "/user/applys");
    expect(toggledLinks.find((el) => el.textContent === "学習管理")).toHaveAttribute("href", "/user/dashboard");

    // ログアウトボタン
    const logoutButtons = screen.getAllByTestId("logout-button");
    expect(logoutButtons).toHaveLength(2);
    expect(logoutButtons[0].textContent).toBe("ログアウト");
  });
});
