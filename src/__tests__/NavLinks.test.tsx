import NavLinks from "@/components/header/NavLinks";
import { render, screen } from "@testing-library/react";

describe("NavLinks", () => {
  it("renders navigation links", () => {
    render(<NavLinks />);
    expect(screen.getByText("求人をさがす")).toBeInTheDocument();
    expect(screen.getByText("学習コースをさがす")).toBeInTheDocument();
    expect(screen.getByText("お役立ち記事")).toBeInTheDocument();
  });
});
