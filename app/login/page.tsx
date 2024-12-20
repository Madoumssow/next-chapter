"use client";

import React from "react";
import ButtonsProviders from "../components/ButtonsProviders";
import FormLogin from "../components/FormLogin";

export default function Login() {


  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-black uppercase text-center">Connexion</h1>
      <FormLogin />
      <ButtonsProviders />
      <p className="text-gray-500 text-center">
        Veuillez vous connecter pour accéder à votre bibliothèque de livres.
      </p>
    </div>
  );
}
