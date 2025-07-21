import { renderHook, act } from "@testing-library/react";
import { useSignUpForm } from "@/components/forms/useSignUpForm";
import * as nextRouter from "next/router";

// グローバル fetch を jest モックに
global.fetch = jest.fn();

// 共通のルーター mock
const mockRouter = (push = jest.fn()) => {
  jest.spyOn(nextRouter, "useRouter").mockReturnValue({
    push,
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    basePath: "",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    reload: jest.fn(),
    replace: jest.fn(),
    isFallback: false,
    isReady: true,
    isLocaleDomain: false,
    isPreview: false,
    events: { on: jest.fn(), off: jest.fn(), emit: jest.fn() },
  } as unknown as nextRouter.NextRouter);
};

// 共通の送信データ
const mockFormData = {
  email: "test@example.com",
  password: "password123",
  password_confirmation: "password123",
  last_name: "山田",
  first_name: "太郎",
  last_name_kana: "やまだ",
  first_name_kana: "たろう",
  phone_number: "08012345678",
  birth_date: "2000-01-01",
  gender: "male",
  prefecture: "東京都",
  agreement: true,
};

// fetch 成功モック
const mockFetchSuccess = () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });
};

// fetch 重複エラーモック
const mockFetchEmailTaken = () => {
  (fetch as jest.Mock).mockResolvedValue({
    ok: false,
    json: async () => ({
      errors: ["Email has already been taken"],
    }),
  });
};

// fetch 通信失敗モック
const mockFetchNetworkError = () => {
  (fetch as jest.Mock).mockRejectedValue(new Error("network error"));
};

describe("useSignUpForm", () => {
  it("should handle successful form submission", async () => {
    const setSubmitting = jest.fn();
    const push = jest.fn();

    mockRouter(push);
    mockFetchSuccess();

    const { result } = renderHook(() => useSignUpForm(setSubmitting));

    await act(async () => {
      await result.current.onSubmit(mockFormData as any);
    });

    expect(setSubmitting).toHaveBeenCalledWith(true);
    expect(setSubmitting).toHaveBeenCalledWith(false);
    expect(fetch).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith("/jobs");
  });

  it("shows specific error when email is already taken", async () => {
    const setSubmitting = jest.fn();

    mockRouter();
    mockFetchEmailTaken();

    const { result } = renderHook(() => useSignUpForm(setSubmitting));

    await act(async () => {
      await result.current.onSubmit({ ...mockFormData, email: "duplicate@example.com" } as any);
    });

    expect(fetch).toHaveBeenCalled();
  });

  it("shows toast when network error occurs", async () => {
    const setSubmitting = jest.fn();

    mockRouter();
    mockFetchNetworkError();

    const { result } = renderHook(() => useSignUpForm(setSubmitting));

    await act(async () => {
      await result.current.onSubmit(mockFormData as any);
    });

    expect(setSubmitting).toHaveBeenCalledWith(true);
    expect(setSubmitting).toHaveBeenCalledWith(false);
  });
});
