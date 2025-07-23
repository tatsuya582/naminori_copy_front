import { useState } from "react";
import Link from "next/link";
import { UserIcon } from "lucide-react";

const DROPDOWN_LINKS = [
  { href: "/user/profile", label: "プロフィール" },
  { href: "/user/setting", label: "メールアドレス・パスワード変更" },
  { href: "/user/notifications", label: "通知設定" },
  { href: "/user/setting/privacy", label: "公開設定" },
];

export const UserMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="-m-1.5 flex items-center p-1.5 cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="flex lg:hidden lg:items-center">
          <span className="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
            <UserIcon />
          </span>
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-10 p-2 mt-2.5 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          <div className="mt-2 mb-2">
            <hr />
            <div className="mt-2 mb-1">
              {DROPDOWN_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm leading-6 text-gray-900"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
