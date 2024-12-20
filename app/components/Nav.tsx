"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MdMenuBook,
  MdRememberMe,
  MdSupervisedUserCircle,
  MdContactPhone,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

export default function Nav() {
  const [isHovered, setIsHovered] = useState(false);

  const menuNav = [
    { name: "Home", icon: FaHome, path: "/" },
    { name: "Books", icon: MdMenuBook, path: "/books" },
    { name: "Categories", icon: TbCategoryFilled, path: "/categories" },
    { name: "Membres", icon: MdRememberMe, path: "/membres" },
    { name: "Contact", icon: MdContactPhone, path: "/contacts" },
  ];

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Titre stylisé "NextChapter" */}
        <div className="text-4xl font-bold text-yellow-400 flex items-center">
        <Link href="/">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">NextChapter</span>
        </Link>

        </div>

        {/* Menu principal */}
        <ul className="flex space-x-6">
          {menuNav.map((item) => (
            <li
              key={item.name}
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors"
            >
              <Link href={item.path} className="flex items-center space-x-2">
                <item.icon className="text-2xl" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Lien pour s'inscrire/se connecter avec menu déroulant */}
        <div
          className="relative flex items-center space-x-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Icône uniquement */}
          <MdSupervisedUserCircle className="text-4xl" />
          
          {/* Texte affiché uniquement lors du survol */}
          <span
            className={`absolute left-0 opacity-0 transition-opacity duration-300 ease-in-out ${
              isHovered ? "opacity-100" : ""
            }`}
          >
            {/* Sign In/Up */}
          </span>

          {/* Menu déroulant */}
          {isHovered && (
            <div className="relative flex items-center justify-center text-white rounded-md space-x-2 shadow-lg">
              <Link
                href="/login"
                className="block hover:bg-blue-400 rounded-md"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block hover:bg-blue-400 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
