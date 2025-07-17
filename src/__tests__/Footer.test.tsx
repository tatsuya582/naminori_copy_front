import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("全てのリンクが表示されていること", () => {
    const links = [
      "採用をご検討の企業様",
      "運営会社",
      "利用規約",
      "プライバシーポリシー",
      "お問い合わせ",
      "ヘルプ",
      "求人一覧",
    ];

    render(<Footer />);

    links.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("著作権表記が表示されていること", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Xincere, Inc./)).toBeInTheDocument();
  });
});
