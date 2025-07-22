import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { prefectures, SignUpFormData, signUpSchema } from "@/schema/signUp";
import { mutate } from "swr";

export const useSignUpForm = (setSubmitting: Dispatch<SetStateAction<boolean>>) => {
  const router = useRouter();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      last_name: "",
      first_name: "",
      last_name_kana: "",
      first_name_kana: "",
      phone_number: "",
      birth_year: "1999",
      birth_month: "1",
      birth_day: "1",
      birth_date: "",
      gender: undefined,
      prefecture: undefined,
      agreement: undefined,
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitting(true);
    try {
      // agreement,birth_year,month,dayは送信しない
      const user: Omit<SignUpFormData, "agreement"> & {
        agreement?: boolean;
      } = {
        ...data,
        birth_date: data.birth_date,
      };
      delete user.birth_year;
      delete user.birth_month;
      delete user.birth_day;
      delete user.agreement;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        const errData = await res.json();

        // エラーが「Email has already been taken」のときだけ詳細表示
        if (Array.isArray(errData.errors) && errData.errors.includes("Email has already been taken")) {
          toast.error("登録に失敗しました", {
            description: "このメールアドレスはすでに登録されています",
          });
        } else {
          toast.error("登録に失敗しました");
        }
        return;
      }
      await mutate(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`);
      toast.success("登録に成功しました");
      router.push("/jobs");
    } catch {
      toast.error("通信エラーが発生しました", {
        description: "時間をおいて再度お試しください。",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return { prefectures, form, onSubmit };
};
