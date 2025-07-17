import Link from "next/link";

const NAV_LINKS = [
  { href: "/client_contact/new", label: "採用をご検討の企業様" },
  { href: "/infomation", label: "運営会社" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contacts/new", label: "お問い合わせ" },
  { href: "/help", label: "ヘルプ" },
  { href: "/jobs", label: "求人一覧" },
];

const Footer = () => {
  return (
    <footer
      className="mt-auto w-full p-2 bg-gray-800 flex flex-col items-center justify-center"
      style={{ marginBottom: "-8px" }}
    >
      <div className="container mx-auto px-2 text-center">
        <nav className="footer_nav">
          <ul className="flex flex-wrap justify-center gap-4">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link className="font-normal text-xs text-white" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full border-t border-gray-600 my-2"></div>
        <address className="text-white text-xs text-center">© 2024 Xincere, Inc. All Rights Reserved.</address>
      </div>
    </footer>
  );
};

export default Footer;
