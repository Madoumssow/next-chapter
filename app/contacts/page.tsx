import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Page de contact pour nous envoyer un message ou obtenir des informations.",
  keywords: "contact, email, informations, formulaire"
}

export default function Contact() {
  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 py-6">
          Nous Contacter
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations</h2>
            <p className="text-gray-600 mb-4">
              Vous pouvez nous contacter via ce formulaire ou utiliser les informations ci-dessous :
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Adresse :</strong> 666 Rue du Lucifert, Piont E, Senegal
              </p>
              <p className="text-gray-600">
                <strong>Téléphone :</strong> +221 78 966 58 49
              </p>
              <p className="text-gray-600">
                <strong>Email :</strong> smadoumssow33@gmail.com
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Envoyez-nous un message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre adresse email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Votre message"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>

        {/* Carte de localisation */}
        <div className="p-6 bg-gray-100 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Localisation</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.337241847579!2d2.292292015674174!3d48.85884497928748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdd1147b327%3A0x40b82c3688b6740!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1680582623968!5m2!1sfr!2sfr"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
