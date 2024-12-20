"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Upper Section: Links */}
        <div className="hidden md:flex space-x-6">
          <ul className="flex flex-wrap space-x-4">
            <li>
              <Link
                href="/books"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/books" ? "text-gray-300" : "hover:text-gray-300"
                }`}
              >
                Books
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/categories"
                    ? "text-gray-300"
                    : "hover:text-gray-300"
                }`}
              >
                Catégories
              </Link>
            </li>
            <li>
              <Link
                href="/membres"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/members"
                    ? "text-gray-300"
                    : "hover:text-gray-300"
                }`}
              >
                Membres
              </Link>
            </li>
            <li>
              <Link
                href="/contacts"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/contacts"
                    ? "text-gray-300"
                    : "hover:text-gray-300"
                }`}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/login"
                    ? "text-gray-300"
                    : "hover:text-gray-300"
                }`}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className={`text-1xl font-bold no-underline transition-colors duration-300 ${
                  pathname === "/register"
                    ? "text-gray-300"
                    : "hover:text-gray-300"
                }`}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-400"></div>

        {/* Lower Section: Branding and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center text-sm">
          <div className="text-gray-300">
            &copy; Tous droits réservés - Thierno Mamoudou Sow - 2024.
          </div>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="hover:text-gray-300 no-underline transition-colors duration-300"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="#"
              className="hover:text-gray-300 no-underline transition-colors duration-300"
            >
              Conditions d utilisation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
