"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

const BookDetail = () => {
  const { id } = useParams();

  const booksData = [
    {
      id: "1",
      title: "Le cas David Zimmerman",
      author: "Lucas Harari",
      description: "Un thriller captivant.",
      imageSrc: "/bookImages/b1.jpeg",
    },
    {
      id: "2",
      title: "La Librairie des Chats noirs",
      author: "Piergiorgio Pulixi",
      description: "Une librairie mystérieuse.",
      imageSrc: "/bookImages/b2.jpeg",
    },
  ];

  const book = booksData.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600 mb-4">Livre non trouvé</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">{book.author}</p>
      <Image src={book.imageSrc} alt={book.title} width={300} height={400} />
      <p className="mt-4">{book.description}</p>
    </div>
  );
};

export default BookDetail;
