import UserNavLinks from "@/components/header/UserNavLinks";
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

describe("UserNavLinks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders links for unauthenticated users", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(<UserNavLinks />);

    const authLinks = screen.getAllByTestId("auth-pc-link");
    expect(authLinks).toHaveLength(4);

    expect(screen.getByText("閲覧履歴")).toHaveAttribute("href", "/histories");
    expect(screen.getByText("気になる")).toHaveAttribute("href", "/favorites");
    expect(screen.getByText("ログイン")).toHaveAttribute("href", "/user/sign_in");
    expect(screen.getByText("新規会員登録")).toHaveAttribute("href", "/user/sign_up");

    // ログアウトボタンが表示されない
    expect(screen.queryByTestId("logout-button")).not.toBeInTheDocument();
  });

  it("renders additional links and logout for authenticated users", () => {
    (useUser as jest.Mock).mockReturnValue({
      user: { id: 1, email: "user@example.com" },
      loading: false,
    });

    render(<UserNavLinks />);

    const authLinks = screen.getAllByTestId("auth-pc-link");

    expect(authLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textContent: "閲覧履歴" }),
        expect.objectContaining({ textContent: "気になる" }),
        expect.objectContaining({ textContent: "応募管理" }),
        expect.objectContaining({ textContent: "学習管理" }),
      ])
    );

    // ログアウトボタンと UserMenu が表示される
    expect(screen.getByTestId("logout-button")).toBeInTheDocument();
  });
});
