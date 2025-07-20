import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectItem } from "@/components/ui/select";
import { useSignUpForm } from "./useSignUpForm";
import InputField from "./InputField ";
import SelectField from "./SelectField";

export const SignUpForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const { prefectures, form, onSubmit } = useSignUpForm(setSubmitting);

  // 年と月と日を分けて入力させて合わせたものを送る
  const year = form.watch("birth_year");
  const month = form.watch("birth_month");
  const day = form.watch("birth_day");
  const years = Array.from({ length: 2004 - 1950 + 1 }, (_, i) => `${1950 + i}`);
  const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  useEffect(() => {
    if (year && month && day) {
      const paddedMonth = month.padStart(2, "0");
      const paddedDay = day.padStart(2, "0");
      form.setValue("birth_date", `${year}-${paddedMonth}-${paddedDay}`);
    }
  }, [year, month, day, form]);

  // パスワードを入力したときにパスワード確認と違う時は常に「パスワードが一致しません。」が表示されるように
  const password = form.watch("password");
  const passwordConfirmation = form.watch("password_confirmation");

  useEffect(() => {
    if ((password || passwordConfirmation) && password !== passwordConfirmation) {
      setPasswordError("パスワードが一致しません。");
    } else {
      setPasswordError("");
    }
  }, [password, passwordConfirmation, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-solid border-transparent box-border">
        <div className="flex gap-2">
          <div className="flex-grow">
            <InputField form={form} name="last_name" placeholder="姓" />
          </div>
          <div className="flex-grow">
            <div>
              <InputField form={form} name="first_name" placeholder="名" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <div className="flex-grow">
            <InputField form={form} name="last_name_kana" placeholder="姓かな" />
          </div>
          <div className="flex-grow">
            <div>
              <InputField form={form} name="first_name_kana" placeholder="名かな" />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <InputField form={form} name="email" placeholder="メールアドレス（ログインID）" type="email" />
        </div>

        <div className="mt-4">
          <InputField form={form} name="phone_number" placeholder="電話番号（ハイフンなしの半角数字）" />
        </div>

        <div className="my-4">
          <h5 className="text-gray-500 text-lg font-bold items-center flex gap-x-0.5">
            生年月日<span className="text-gray-400 text-xs font-normal">※ 年齢のみ企業に公開されます</span>
          </h5>
          <div className="gap-x-2 flex items-center">
            <SelectField form={form} name="birth_year" placeholder="年" options={years} />

            <SelectField form={form} name="birth_month" placeholder="月" options={months} />

            <SelectField form={form} name="birth_day" placeholder="日" options={days} />
          </div>
        </div>

        <div className="mt-4">
          <SelectField form={form} name="gender" placeholder="性別を選択">
            <SelectItem value="init">性別を選択</SelectItem>
            <SelectItem value="male">男性</SelectItem>
            <SelectItem value="female">女性</SelectItem>
            <SelectItem value="other">その他</SelectItem>
          </SelectField>
        </div>

        <div className="mt-4">
          <SelectField
            form={form}
            name="prefecture"
            placeholder="居住地を選択"
            options={prefectures as unknown as string[]}
          >
            <SelectItem value="init">居住地を選択</SelectItem>
          </SelectField>
        </div>

        <div className="mt-2">
          <h5 className="text-gray-500 text-lg font-bold items-center flex gap-x-0.5">
            パスワード
            <span className="text-gray-400 text-xs font-normal">※ 6文字以上・半角英数・記号</span>
          </h5>
          <InputField form={form} name="password" placeholder="パスワード" type="password">
            <FormMessage />
          </InputField>
        </div>

        <div className="mt-2">
          <h5 className="text-gray-500 text-lg font-bold items-center flex mb-1">パスワード（確認用）</h5>
          <InputField form={form} name="password_confirmation" placeholder="パスワード（確認用）" type="password">
            <FormMessage />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </InputField>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center text-sm mt-6">
          <FormField
            control={form.control}
            name="agreement"
            render={({ field }) => (
              <FormItem>
                <div className="flex gap-2 justify-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded focus:outline-none checked:bg-primary-600 focus:ring-primary-600 original-checkbox checked:focus:bg-primary-600 cursor-pointer"
                    />
                  </FormControl>
                  <FormLabel>
                    <p>
                      <Link href="/terms" className="underline text-sm text-blue-600">
                        利用規約
                      </Link>
                      ・
                      <Link href="/privacy" className="underline text-sm text-blue-600">
                        プライバシーポリシー
                      </Link>
                    </p>
                  </FormLabel>
                </div>
                <p className="block text-center">に同意する</p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-6 border-b border-gray-300 pb-6">
          <Button
            type="submit"
            disabled={submitting}
            className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm cursor-pointer hover:bg-primary-600"
          >
            {submitting ? "登録中..." : "会員登録する（無料）"}
          </Button>
        </div>

        <div className="mt-6 flex w-full justify-center rounded-md border-2 border-primary-600 bg-white px-3 py-2 text-sm font-semibold leading-6 shadow-sm cursor-pointer">
          <Link href="/user/sign_in" className="text-primary-600 hover:text-primary-500">
            会員の方はこちら
          </Link>
        </div>
      </form>
    </Form>
  );
};
