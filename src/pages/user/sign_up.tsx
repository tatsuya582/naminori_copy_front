import { SignUpForm } from "@/components/forms/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mb-[120px] md:mb-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">新規会員登録</h1>
        <div className="rounded-md bg-white">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
