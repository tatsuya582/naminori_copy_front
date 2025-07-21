import z from "zod";

export const signInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6, "指定されている形式で入力してください。"),
  rememberMe: z.boolean().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
