import Link from "next/link";

const NAV_LINKS = [
  { href: "/jobs", label: "求人をさがす" },
  { href: "/courses", label: "学習コースをさがす" },
  { href: "/articles", label: "お役立ち記事" },
];

const NavLinks = () => {
  return (
    <ul className="flex justify-end items-center w-full">
      {NAV_LINKS.map(({ href, label }) => (
        <li key={href} className="mx-4">
          <Link
            href={href}
            className="text-center font-nato text-gray-900 text-base font-normal"
            data-testid="nav-link"
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
