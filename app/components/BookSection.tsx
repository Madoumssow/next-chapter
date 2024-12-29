"use client";

// components/BookSection.tsx
import React, { useState } from "react";
import BookCard from "./BookCard";
import { useSession } from "next-auth/react";
import { handleInteraction } from "@/app/db/handleInteraction";

const booksData = [
  {
    id: "1",
    title: "Le cas David Zimmerman",
    author: "Lucas Harari",
    price: "35,00 €",
    imageSrc: "/assets/bookImages/b1.jpeg",
    alt: "Le cas David Zimmerman",
    condition: "Neuf 22,90 €",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "2",
    title: "La Librairie des Chats noirs",
    author: "Piergiorgio Pulixi",
    price: "18,32 €",
    imageSrc: "/assets/bookImages/b2.jpeg",
    alt: "La Librairie des Chats noirs",
    condition: "Occasion 18,32 €",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {

    id: "3",
    title: "Les Météores",
    author: "Inconnu",
    price: "34,95 €",
    imageSrc: "/assets/bookImages/b3.jpeg",
    alt: "Les Météores",
    condition: "Récit complet",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "4",
    title: "Nous",
    author: "Christelle Dabos",
    price: "19,90 €",
    imageSrc: "/assets/bookImages/b4.jpeg",
    alt: "Nous",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "5",
    title: "Deux filles nues",
    author: "Luz",
    price: "24,90 €",
    imageSrc: "/assets/bookImages/b5.jpeg",
    alt: "Deux filles nues",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "6",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/b6.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "7",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/b7.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "8",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/b8.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "9",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/b9.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "10",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n1.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "11",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n2.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "12",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n3.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "13",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n4.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "14",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n5.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "15",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n6.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "16",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n7.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "17",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n8.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },
  {
    id: "18",
    title: "Roman de Ronce et d'Épine",
    author: "Lucie Baratte",
    price: "18,50 €",
    imageSrc: "/assets/bookImages/n9.jpeg",
    alt: "Roman de Ronce et d'Épine",
    condition: "Neuf",
    description: "Un thriller captivant avec des twists imprévus.",
  },

];

const BookSection: React.FC = () => {

  const [books, setBooks] = useState<typeof booksData>(booksData);
  const [likedBooks, setLikedBooks] = useState<string[]>([]);
  
  const { data: session } = useSession();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <p className="text-center text-red-500">
        Veuillez vous connecter pour accéder à cette section.
      </p>
    );
  }

  const handleLike = async (bookId: string): Promise<void> => { 
    try { 
        await handleInteraction(bookId, "like"); 
        setLikedBooks((prevLikedBooks) => [...prevLikedBooks, bookId]); 
      } catch (error) {
        console.error("Erreur lors de l'ajout du like :", error); 
      } 
    };

    const handleDislike = async (bookId: string): Promise<void> => {
      try { 
        await handleInteraction(bookId, "dislike"); 
        setLikedBooks((prevLikedBooks) => prevLikedBooks.filter((id) => id !== bookId) ); 
      } catch (error) { 
        console.error("Erreur lors de l'ajout du dislike :", error); 
      } 
    };

    const handleDelete = async (bookId: string): Promise<void> => { 
      try { 
        await handleInteraction(bookId, "delete"); 
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId)); 
      } catch (error) { 
        console.error("Erreur lors de la suppression du livre :", error); 
      } 
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
            isLiked={likedBooks.includes(book.id)}
            onLike={() => handleLike(book.id)}
            onDislike={() => handleDislike(book.id)}
            onDelete={() => handleDelete(book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookSection;