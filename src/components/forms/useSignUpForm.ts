import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useSignUpForm = (setSubmitting: Dispatch<SetStateAction<boolean>>) => {
  const prefectures = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ] as const;

  const signUpSchema = z
    .object({
      email: z.string().min(1).email(),
      password: z.string().min(6, "指定されている形式で入力してください。"),
      password_confirmation: z.string().min(6, "指定されている形式で入力してください。"),
      last_name: z.string().min(1),
      first_name: z.string().min(1),
      last_name_kana: z.string().min(1),
      first_name_kana: z.string().min(1),
      phone_number: z
        .string()
        .min(10, "指定されている形式で入力してください。")
        .regex(/^\d+$/, { message: "指定されている形式で入力してください。" }),
      birth_year: z.string().optional(),
      birth_month: z.string().optional(),
      birth_day: z.string().optional(),
      birth_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "指定されている形式で入力してください。"),
      gender: z.enum(["male", "female", "other"], { message: "リスト内の項目を選択してください。" }),
      prefecture: z.enum(prefectures, { message: "リスト内の項目を選択してください。" }),
      agreement: z.literal(true, {
        message: "次に進むにはこのチェックボックスをオンにしてください。",
      }),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "パスワードが一致しません",
      path: ["password_confirmation"],
    });

  type SignUpFormData = z.infer<typeof signUpSchema>;

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
      console.log("Submitting user data:", user);
      const res = await fetch("http://localhost:3003/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert("登録に失敗しました：" + JSON.stringify(err));
        return;
      }

      alert("登録に成功しました！");
    } catch (e) {
      alert("通信エラーが発生しました");
    } finally {
      setSubmitting(false);
    }
  };

  return { prefectures, form, onSubmit };
};
