import { renderHook, act } from "@testing-library/react";
import { useLogout } from "@/lib/auth/logout";
import { mutate } from "swr";
import { toast } from "sonner";

// 必須モック
jest.mock("swr", () => ({
  mutate: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("useLogout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs out successfully", async () => {
    // fetch 成功のモック
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    expect(mutate).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, null, { revalidate: false });

    expect(toast.success).toHaveBeenCalledWith("ログアウトしました");
    expect(pushMock).toHaveBeenCalledWith("/");
  });

  it("handles logout failure gracefully", async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error("API Error"));
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useLogout());

    await act(async () => {
      await result.current.logout();
    });

    expect(consoleSpy).toHaveBeenCalledWith("ログアウトに失敗しました", expect.any(Error));

    consoleSpy.mockRestore();
  });
});
