import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mutate } from "swr";

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      // SWRキャッシュクリア
      mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, null, { revalidate: false });

      toast.success("ログアウトしました");

      // 現在のページを再取得（擬似refresh）
      router.push("/");
    } catch (error) {
      console.error("ログアウトに失敗しました", error);
    }
  };

  return { logout };
};
