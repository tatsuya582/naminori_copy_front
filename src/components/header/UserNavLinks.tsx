import Link from "next/link";

const NAV_LINKS = [
  { href: "/histories", label: "閲覧履歴" },
  { href: "/favorites", label: "気になる" },
  { href: "/user/sign_in", label: "ログイン" },
];

const UserNavLinks = () => {
  return (
    <ul className="flex flex-row gap-x-8 items-center">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href}>
          <Link href={href} className="font-nato text-gray-900 text-base font-normal" data-testid="auth-pc-link">
            {label}
          </Link>
        </li>
      ))}
      <li>
        <Link
          href="/user/sign_up"
          className="font-nato text-white text-base font-bold rounded-lg py-2 px-4 bg-green-700 hover:bg-lime-600 inline-block"
          data-testid="auth-pc-link"
        >
          新規会員登録
        </Link>
      </li>
    </ul>
  );
};

export default UserNavLinks;
