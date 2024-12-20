// components/BookSection.tsx
import React, { useState } from "react";
import BookCard from "./BookCard";

const booksData = [
  {
    id: "1",
    title: "Le cas David Zimmerman",
    author: "Lucas Harari",
    price: "35,00 €",
    imageSrc: "/bookImages/b1.jpeg",
    alt: "Le cas David Zimmerman",
    condition: "Neuf 22,90 €",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "2",
    title: "La Librairie des Chats noirs",
    author: "Piergiorgio Pulixi",
    price: "18,32 €",
    imageSrc: "/bookImages/b2.jpeg",
    alt: "La Librairie des Chats noirs",
    condition: "Occasion 18,32 €",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    
    id: "3",
    title: "Les Météores",
    author: "Inconnu",
    price: "34,95 €",
    imageSrc: "/bookImages/b3.jpeg",
    alt: "Les Météores",
    condition: "Récit complet",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "4",
    title: "Nous",
    author: "Christelle Dabos",
    price: "19,90 €",
    imageSrc: "/bookImages/b4.jpeg",
    alt: "Nous",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "5",
    title: "Deux filles nues",
    author: "Luz",
    price: "24,90 €",
    imageSrc: "/bookImages/b5.jpeg",
    alt: "Deux filles nues",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "6",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/b6.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "7",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/b7.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "8",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/b8.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "9",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/b9.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "10",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n1.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "11",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n2.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "12",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n3.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "13",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n4.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "14",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n5.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "15",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n6.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "16",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n7.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "17",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n8.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "18",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/bookImages/n9.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },

];

const BookSection = () => {
  const [books, setBooks] = useState(booksData); // État local pour les livres
  const [likedBooks, setLikedBooks] = useState<string[]>([]); // Stocke les livres aimés

  // Fonction pour gérer l'action "like"
  const handleLike = (id: string) => {
    setLikedBooks((prevLikedBooks) =>
      prevLikedBooks.includes(id)
        ? prevLikedBooks.filter((bookId) => bookId !== id) // Retire si déjà aimé
        : [...prevLikedBooks, id] // Ajoute sinon
    );
  };

  // Fonction pour gérer l'action "supprimer"
  const handleDelete = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id)); // Supprime le livre de l'état
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            price={book.price}
            imageSrc={book.imageSrc}
            alt={book.alt}
            condition={book.condition}
            description={book.description}
            isLiked={likedBooks.includes(book.id)} // Vérifie si le livre est aimé
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSection;

