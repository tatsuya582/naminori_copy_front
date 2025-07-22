import { mutate } from "swr";

export const logout = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
      method: "DELETE",
      credentials: "include",
    });

    // SWRキャッシュ削除（ログアウト時）
    mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, null, { revalidate: false });
  } catch (error) {
    console.error("ログアウトに失敗しました", error);
  }
};
