import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => {
    if (!res.ok) throw new Error("未認証");
    return res.json();
  });

export const useUser = () => {
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, fetcher, {
    dedupingInterval: 86400000, // 1日キャッシュ
    revalidateOnFocus: false, // タブ切り替え時に再取得しない
  });

  return {
    user: data ?? null,
    loading: isLoading,
    error,
  };
};
