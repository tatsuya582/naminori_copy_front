import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SignUpForm } from "@/components/forms/SignUpForm";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("SignUpForm", () => {
  it("renders all input fields", () => {
    render(<SignUpForm />);

    // 基本的な項目が表示されているか確認
    expect(screen.getByPlaceholderText("姓")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("名")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("姓かな")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("名かな")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("メールアドレス（ログインID）")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("電話番号（ハイフンなしの半角数字）")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード（確認用）")).toBeInTheDocument();
  });

  it("shows password mismatch error", async () => {
    render(<SignUpForm />);

    const passwordInput = screen.getByPlaceholderText("パスワード");
    const confirmationInput = screen.getByPlaceholderText("パスワード（確認用）");

    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmationInput, { target: { value: "different" } });

    await waitFor(() => {
      expect(screen.getByText("パスワードが一致しません。")).toBeInTheDocument();
    });
  });

  it("disables submit button while submitting", async () => {
    render(<SignUpForm />);

    const button = screen.getByRole("button", { name: /会員登録する/ });
    expect(button).toBeEnabled();
  });

  it("shows error when password and confirmation do not match", async () => {
    render(<SignUpForm />);

    const password = screen.getByPlaceholderText("パスワード");
    const confirmation = screen.getByPlaceholderText("パスワード（確認用）");

    fireEvent.change(password, { target: { value: "abc123" } });
    fireEvent.change(confirmation, { target: { value: "zzz999" } });

    expect(await screen.findByText("パスワードが一致しません。")).toBeInTheDocument();
  });
});
