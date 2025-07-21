import z from "zod";

export const prefectures = [
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

export const signUpSchema = z
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

export type SignUpFormData = z.infer<typeof signUpSchema>;
