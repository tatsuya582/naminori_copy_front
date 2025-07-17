import UserMobileMenu from "@/components/header/UserMobileMenu";
import { render, screen, fireEvent } from "@testing-library/react";

describe("UserMobileMenu", () => {
  it("renders register and login icons", () => {
    render(<UserMobileMenu />);
    expect(screen.getByText("会員登録")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("メニュー")).toBeInTheDocument();
  });

  it("opens menu when メニュー is clicked", () => {
    render(<UserMobileMenu />);
    fireEvent.click(screen.getByText("メニュー"));
    expect(screen.getByText("求人をさがす")).toBeInTheDocument();
    expect(screen.getByText("学習コースをさがす")).toBeInTheDocument();
  });
});
