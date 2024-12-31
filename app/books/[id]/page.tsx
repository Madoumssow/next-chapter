"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

// Définir un type pour les livres
type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  imageSrc: string;
  price?: string;
};

const BookDetail = () => {
  const { id } = useParams(); // Obtient l'ID du livre depuis l'URL
  const [book, setBook] = useState<Book | null>(null); // État pour stocker le livre trouvé
  const [loading, setLoading] = useState<boolean>(true); // État de chargement
  const [error, setError] = useState<string | null>(null); // État pour les erreurs

  useEffect(() => {
    const booksData: Book[] = [
      {
        id: "1",
        title: "Le cas David Zimmerman",
        author: "Lucas Harari",
        description: "Un thriller captivant.",
        imageSrc: "/assets/bookImages/b1.jpeg",
      },
      {
        id: "2",
        title: "La Librairie des Chats noirs",
        author: "Piergiorgio Pulixi",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/b2.jpeg",
      },
      {
      
        id: "3",
        title: "Les Météores",
        author: "Inconnu",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/b3.jpeg",
      },
      {
        id: "4",
        title: "Nous",
        author: "Christelle Dabos",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/b4.jpeg",
      },
      {
        id: "5",
        title: "Deux filles nues",
        author: "Luz",
        description: "Une librairie mystérieuse.",      
        imageSrc: "/assets/bookImages/b5.jpeg",
      },
      {
        id: "6",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",     
        imageSrc: "/assets/bookImages/b6.jpeg",
      },
      {
        id: "7",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",     
        imageSrc: "/assets/bookImages/b7.jpeg",
      },
      {
        id: "8",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/b8.jpeg",
      },
      {
        id: "9",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/b9.jpeg",
      },
      {
        id: "10",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n1.jpeg",
      },
      {
        id: "11",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n2.jpeg",
      },
      {
        id: "12",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n3.jpeg",
      },
      {
        id: "13",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n4.jpeg",
      },
      {
        id: "14",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n5.jpeg",
  
      },
      {
        id: "15",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n6.jpeg",
  
      },
      {
        id: "16",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n7.jpeg",
  
      },
      {
        id: "17",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n8.jpeg",
      },
      {
        id: "18",
        title: "Roman de Ronce et d'Épine",
        author: "Lucie Baratte",
        description: "Une librairie mystérieuse.",
        imageSrc: "/assets/bookImages/n9.jpeg",
      },
    ];

    if (id) {
      // Recherche du livre en fonction de l'ID
      const foundBook = booksData.find((b) => b.id === id);

      if (foundBook) {
        setBook(foundBook);
        setError(null);
      } else {
        setError("Livre introuvable");
      }
    }else {
      setError("ID invalide");
    }
    setLoading(false);

  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600 mb-4">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-red-600 mb-4">{error}</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{book?.title || "Titre indisponible"}</h1>
      <p className="text-gray-600">{book?.author || "Auteur inconnu"}</p>
      <Image src={book?.imageSrc || "/assets/default-image.jpg"}
            alt={book?.title || "Image indisponible"}
            width={300} 
            height={400} />
      <p className="mt-4">{book?.description || "Description non disponible"}</p>
      {book?.price && <p className="mt-2 text-xl font-semibold">{book?.price}</p>}
    </div>
  );
};

export default BookDetail;
