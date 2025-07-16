import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserNavLinks from "./UserNavLinks";
import UserMobileMenu from "./UserMobileMenu";

const Header = () => {
  return (
    <header className="header shadow-custom">
      <div className="inner_header flex justify-between items-center h-16 md:h-16 px-5">
        <div className="flex justify-between items-center">
          <div className="md:mr-4">
            <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={192} height={64} className="w-32 h-16 md:w-48" />
            </Link>
          </div>
          <nav className="hidden md:flex flex-grow">
            <NavLinks />
          </nav>
        </div>

        <div className="hidden md:flex justify-end items-center">
          <UserNavLinks />
        </div>

        <div className="md:hidden">
          <UserMobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
