import { useState } from "react";
import Link from "next/link";
import SignUpIcon from "../icons/SignUpIcon";
import SignInIcon from "../icons/SignInIcon";
import HamburgerIcon from "../icons/HamburgerIcon";

const NAV_LINKS = [
  { href: "/user/sign_up", label: "会員登録", icon: <SignUpIcon /> },
  { href: "/user/sign_in", label: "ログイン", icon: <SignInIcon /> },
];

const TOGGLED_LINKS = [
  { href: "/jobs", label: "求人をさがす" },
  { href: "/courses", label: "学習コースをさがす" },
  { href: "/histories", label: "閲覧履歴" },
  { href: "/favorites", label: "気になる" },
];

const UserMobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex md:hidden items-center gap-x-4">
      <ul className="flex justify-center gap-4">
        {NAV_LINKS.map(({ href, label, icon }) => (
          <li key={href} className="w-10 h-10 flex items-center justify-center">
            <Link href={href} data-testid="mobile-auth-link">
              <div className="flex flex-col items-center justify-center leading-[12px]">
                {icon}
                <span className="text-[10px] text-gray-600 mt-1">{label}</span>
              </div>
            </Link>
          </li>
        ))}
        <li className="w-10 h-10 flex items-center justify-center">
          <button onClick={() => setOpen(!open)}>
            <div className="flex flex-col items-center justify-center leading-[12px]">
              <HamburgerIcon />
              <span className="text-[10px] text-gray-600 mt-1">メニュー</span>
            </div>
          </button>
        </li>
      </ul>
      {open && (
        <div className="fixed z-20 top-[70px] right-5">
          <ul className="flex flex-col gap-y-1 bg-white border border-gray-300 rounded-lg shadow-md p-4">
            {TOGGLED_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-nato text-gray-900 text-base font-normal py-1 px-5 hover:bg-gray-300 rounded-lg"
                  data-testid="mobile-nav-link"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default UserMobileMenu;
