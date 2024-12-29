"use client";

import { useRouter } from "next/navigation";
import Carousel from "./components/Carousel";
import BookSection from "./components/BookSection";
import { useEffect, useState } from "react";

// Composant principal de la page Home
export default function Home() {
  const router = useRouter();
  
  // Fonction de navigation pour rediriger vers différentes pages
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Images pour le carrousel
  const images = [
    { src: "https://images.pexels.com/photos/207662/pexels-photo-207662.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Image Pexels" },
    { src: "/assets/livre1.jpeg", alt: "Livre 1" },
    { src: "/assets/livre2.jpeg", alt: "Livre 2" },
    { src: "/assets/livre3.jpeg", alt: "Livre 3" },
    { src: "/assets/livre6.jpeg", alt: "Livre 6" },
  ];

  // État pour gérer l'index de l'image affichée dans le carrousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fonction pour faire défiler automatiquement les images du carrousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change l'image toutes les 3 secondes

    return () => clearInterval(interval); // Nettoyage lors du démontage du composant
  }, [images.length]);

  return (
    <div className="w-full min-h-screen flex flex-col p-2 bg-gray-100">

      {/* Affichage du carrousel avec un fond dynamique */}
      {images.length > 0 ? (
        <div className="w-full">
          <div
            className="w-full h-96"
            style={{ backgroundImage: `url(${images[currentIndex].src})` }}
          >
            <Carousel images={images} />
          </div>
                {/* Texte stylisé après le carrousel */}
      <div className="text-center mb-12 px-4">
        <h1 className="text-4xl font-bold mt-2 text-gray-800">
          Bienvenue dans notre bibliothèque numérique
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Explorez une vaste collection de livres et découvrez des univers
          fascinants. Trouvez votre prochaine lecture dès aujourd hui !
        </p>
      </div>
        </div>
      ) : (
        <p className="text-center">Aucune image à afficher dans le carrousel.</p>
      )}

      {/* Section des livres */}
      <div className="md-2 gap-2">
        <BookSection />
      </div>

      {/* Conteneur des boutons de navigation */}
      <div className="flex flex-wrap justify-center gap-6">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={() => handleNavigation("/books")}
          aria-label="Go to Books page"
        >
          Books
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          onClick={() => handleNavigation("/categories")}
          aria-label="Go to Categories page"
        >
          Catégories
        </button>
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300"
          onClick={() => handleNavigation("/members")}
          aria-label="Go to Members page"
        >
          Members
        </button>
        <button
          className="p-2 bg-red-500 rounded-md text-white focus:outline-none hover:bg-red-600"
          onClick={() => handleNavigation("/contacts")}
          aria-label="Go to Contacts page"
        >
          Nous-Contacter
        </button>
      </div>
    </div>
  );
}
