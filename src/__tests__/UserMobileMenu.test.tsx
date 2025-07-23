import UserMobileMenu from "@/components/header/UserMobileMenu";
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

describe("UserMobileMenu", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders register and login icons when user is NOT logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<UserMobileMenu />);

    expect(screen.getByText("会員登録")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("メニュー")).toBeInTheDocument();

    // UserMenuは非表示
    expect(screen.queryByRole("button", { name: "" })).not.toBeInTheDocument();
  });

  it("opens toggle menu when メニュー is clicked (NOT logged in)", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<UserMobileMenu />);
    fireEvent.click(screen.getByText("メニュー"));

    const links = screen.getAllByTestId("mobile-nav-link");
    expect(links).toHaveLength(5); // 求人・コース・履歴・気になる
  });

  it("shows extra links and logout when user IS logged in", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: 1, email: "user@example.com" },
      loading: false,
    });

    render(<UserMobileMenu />);

    // ログインユーザーにはUserMenuも表示される
    expect(screen.getByTestId("mobile-menu-button")).toBeInTheDocument(); // UserIconのトリガー

    fireEvent.click(screen.getByText("メニュー"));

    const links = screen.getAllByTestId("mobile-nav-link");
    expect(links).toHaveLength(7); // 通常4 + 応募管理・学習管理

    const logout = screen.getByTestId("logout-button");
    expect(logout).toBeInTheDocument();
    expect(logout.textContent).toBe("ログアウト");
  });
});
