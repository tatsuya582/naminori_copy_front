import UserNavLinks from "@/components/header/UserNavLinks";
import { render, screen } from "@testing-library/react";

describe("UserNavLinks", () => {
  it("renders user-related links", () => {
    render(<UserNavLinks />);
    expect(screen.getByText("閲覧履歴")).toBeInTheDocument();
    expect(screen.getByText("気になる")).toBeInTheDocument();
    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("新規会員登録")).toBeInTheDocument();
  });
});
