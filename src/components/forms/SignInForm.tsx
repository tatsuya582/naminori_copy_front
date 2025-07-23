import { useState } from "react";
import Link from "next/link";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "./InputField ";
import { Checkbox } from "../ui/checkbox";
import { useSignInForm } from "./useSignInForm";

const SignInForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const { form, onSubmit } = useSignInForm(setSubmitting);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-solid border-transparent box-border">
        <div>
          <InputField form={form} name="email" placeholder="メールアドレス（ログインID）" type="email" />
        </div>

        <div className="mt-6">
          <InputField form={form} name="password" placeholder="パスワード" type="password" />
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm mt-3">
            <Link href="/user/password/new" className="text-sky-600">
              パスワードを忘れた方はこちら
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            disabled={submitting}
            className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm cursor-pointer hover:bg-primary-600"
          >
            {submitting ? "ログイン中..." : "ログイン"}
          </Button>
        </div>

        <div className="py-6 flex items-center justify-center border-b border-gray-300">
          <div className="flex flex-start gap-x-3 items-center">
            <FormField
              control={form.control}
              name="rememberMe"
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
                      <p className="block text-center">次回から自動ログイン</p>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-6 gap-y-4">
          <p>まだ登録がお済みでない方</p>
          <Link
            href="/user/sign_up"
            className="flex w-full justify-center text-primary-600 font-bold rounded-md border-2 border-primary-600 px-3 py-2 text-l font-semibold leading-6 shadow-sm"
          >
            会員登録する（無料）
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
