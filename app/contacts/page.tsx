'use client';

import React, { useState } from 'react';
import { db } from '@/app/db/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null); // Réinitialiser les erreurs
    setSuccess(false); // Réinitialiser le succès
    try {
      await addDoc(collection(db, 'contacts'), formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      // Vérification et gestion du type de l'erreur
      if (error instanceof Error) {
        setError(`Une erreur s'est produite : ${error.message}`);
      } else {
        setError("Une erreur inconnue s'est produite.");
      }
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 py-6">Nous Contacter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations</h2>
            <p className="text-gray-600 mb-4">
              Vous pouvez nous contacter via ce formulaire ou utiliser les informations ci-dessous :
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                <strong>Adresse :</strong> 666 Rue du Lucifert, Piont E, Sénégal
              </p>
              <p className="text-gray-600">
                <strong>Téléphone :</strong> +221 78 966 58 49
              </p>
              <p className="text-gray-600">
                <strong>Email :</strong> smadoumssow33@gmail.com
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Envoyez-nous un message</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
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
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:ring focus:ring-blue-300 focus:outline-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Envoyer
              </button>
            </form>
            {success && <p className="text-green-500 mt-4">Message envoyé avec succès !</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
