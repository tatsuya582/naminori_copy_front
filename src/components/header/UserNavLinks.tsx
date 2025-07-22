import { useUser } from "@/hooks/useUser";
import { useLogout } from "@/lib/auth/logout";
import Link from "next/link";
import { UserMenu } from "./UserMenu";

const NAV_LINKS = [
  { href: "/histories", label: "閲覧履歴" },
  { href: "/favorites", label: "気になる" },
];

const LOGIN_NAV_LINKS = [
  { href: "/user/applys", label: "応募管理" },
  { href: "/user/dashboard", label: "学習管理" },
];

const UserNavLinks = () => {
  const { user, loading } = useUser();
  const { logout } = useLogout();
  const handleLogout = async () => {
    await logout();
  };

  if (loading) return null;
  return (
    <ul className="flex flex-row gap-x-8 items-center">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className="font-nato text-gray-900 text-base font-normal" data-testid="auth-pc-link">
            {label}
          </Link>
        </li>
      ))}

      {user &&
        LOGIN_NAV_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="font-nato text-gray-900 text-base font-normal" data-testid="auth-pc-link">
              {label}
            </Link>
          </li>
        ))}

      {user ? (
        <>
          <li>
            <button
              onClick={logout}
              className="font-nato text-gray-900 text-base font-normal cursor-pointer"
              data-testid="logout-button"
            >
              ログアウト
            </button>
          </li>
          <li>
            <UserMenu />
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              href="/user/sign_in"
              className="font-nato text-gray-900 text-base font-normal"
              data-testid="auth-pc-link"
            >
              ログイン
            </Link>
          </li>
          <li>
            <Link
              href="/user/sign_up"
              className="font-nato text-white text-base font-bold rounded-lg py-2 px-4 bg-green-700 hover:bg-lime-600 inline-block"
              data-testid="auth-pc-link"
            >
              新規会員登録
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default UserNavLinks;
