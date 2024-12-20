"use client";

import React from "react";
import ButtonsProviders from "../components/ButtonsProviders";
import FormRegister from "../components/FormRegister";

export default function Register() {


  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      <h1 className="text-2xl font-black uppercase text-center">Inscription</h1>
      <FormRegister />
      <ButtonsProviders />
      <p className="text-gray-500 text-center">
        Veuillez vous connecter pour accéder à votre bibliothèque de livres.
      </p>
    </div>
  );
}
