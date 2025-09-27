"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Brands", href: "/brands" },
    { name: "Cart", href: "/cart" },
    { name: "Wishlist", href: "/wishlist" },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          E-Shop
        </Link>

        {/* Links */}
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-green-600 font-semibold"
                    : "text-gray-700 hover:text-green-600"
                } transition`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="flex space-x-4">
          <Link
            href="/register"
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
