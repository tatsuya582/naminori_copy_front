import { render, screen, fireEvent } from "@testing-library/react";
import { UserMenu } from "@/components/header/UserMenu";
import "@testing-library/jest-dom";

describe("UserMenu", () => {
  it("renders trigger button but hides dropdown by default", () => {
    render(<UserMenu />);

    // トリガーボタンは存在するが
    expect(screen.getByRole("button")).toBeInTheDocument();

    // 初期状態ではリンクは表示されない
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
  });

  it("shows dropdown when trigger is clicked", () => {
    render(<UserMenu />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("プロフィール")).toBeInTheDocument();
    expect(screen.getByText("メールアドレス・パスワード変更")).toBeInTheDocument();
    expect(screen.getByText("通知設定")).toBeInTheDocument();
    expect(screen.getByText("公開設定")).toBeInTheDocument();
  });

  it("hides dropdown after clicking a link", () => {
    render(<UserMenu />);

    // メニューを開く
    fireEvent.click(screen.getByRole("button"));

    const profileLink = screen.getByText("プロフィール");
    expect(profileLink).toBeInTheDocument();

    // メニューを閉じる動作（Linkクリックで setOpen(false)）
    fireEvent.click(profileLink);

    // 次のレンダリング後に非表示になることを確認
    expect(screen.queryByText("プロフィール")).not.toBeInTheDocument();
  });
});
