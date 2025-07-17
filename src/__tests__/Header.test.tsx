import Header from "@/components/header/Header";
import { render, screen } from "@testing-library/react";

describe("Header", () => {
  it("renders the logo and both nav sections", () => {
    render(<Header />);
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
    expect(screen.getByText("求人をさがす")).toBeInTheDocument();
    expect(screen.getByText("新規会員登録")).toBeInTheDocument();
  });
});
