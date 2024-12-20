"use client";

import React, { useEffect, useState } from "react";
import CategoriesSection from "../components/CategoriesSection";
import { IoIosLogOut } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

interface UserInfo {
  name: string;
  email: string;
  image?: string;
}

export default function Categories() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      const userCookie = Cookies.get("userInfo");
      if (userCookie) {
        setUserInfo(JSON.parse(userCookie));
      }
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return session ? (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Section de bienvenue */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Bienvenue,{" "}
            <span className="text-indigo-600">{userInfo?.name || session.user?.name}</span>!
          </h1>
          <div className="flex items-center gap-8">
            {userInfo?.image || session.user?.image ? (
              <Image
                src={userInfo?.image || (session.user?.image as string)}
                width={80}
                height={80}
                alt={userInfo?.name || session.user?.name || "Utilisateur"}
                className="rounded-full border-2 border-gray-300 shadow-sm"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Aucun Image</p>
              </div>
            )}
            <div>
              <p className="text-lg text-gray-600">
                <b>Email:</b> {userInfo?.email || session.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              Cookies.remove("userInfo");
              signOut();
            }}
            className="mt-8 flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            <IoIosLogOut className="text-lg" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Section des catégories */}
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Vos Catégories
          </h2>
          <CategoriesSection />
        </div>
      </div>
    </div>
  ) : null;
}
