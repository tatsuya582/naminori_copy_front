import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "@/schema/signIn";
import { mutate } from "swr";

export const useSignInForm = (setSubmitting: Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setSubmitting(true);
    try {
      // rememberMeは送信しない
      const user: Omit<SignInFormData, "rememberMe"> & {
        rememberMe?: boolean;
      } = {
        ...data,
      };
      delete user.rememberMe;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        toast.error("ログインに失敗しました。ユーザー名とパスワードを確認してください。");
        return;
      }
      await mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`);
      toast.success("ログインしました。");
      router.push("/user/dashboard");
    } catch {
      toast.error("通信エラーが発生しました", {
        description: "時間をおいて再度お試しください。",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { form, onSubmit };
};
