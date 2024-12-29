"use client";

import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  imageSrc: string;
  alt: string;
  condition: string;
  description: string;
  acheter?: string; // Propriété optionnelle avec une valeur par défaut
  isLiked: boolean;
  onLike: (id: string) => void;
  onDislike: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  price,
  imageSrc,
  alt,
  condition,
  description,
  acheter = "acheter", // Valeur par défaut
  isLiked,
  onLike,
  onDislike,
  onDelete,
}) => {
    // Construisez l'URL dynamique ici
    const acheterUrl = `/books/${id}/${acheter}`;
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white border transition-transform transform hover:scale-105 duration-300">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={250}
        height={350}
        className="w-full h-64 object-cover"
        priority
      />

      {/* Détails du livre */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{author}</p>
        <p className="text-gray-500 text-sm mt-2">{description}</p>
        <p className="mt-4 font-bold text-lg">{price}</p>
        <p className="text-sm text-gray-500 italic">{condition}</p>
      </div>

      {/* Actions */}
      <div className="p-4 flex justify-between items-center border-t">
        {/* Boutons d'actions */}
        <div className="flex space-x-4">
          {/* Bouton Like */}
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isLiked ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
            } hover:bg-red-200 hover:text-red-700 transition-colors`}
            onClick={() => (isLiked ? onDislike(id) : onLike(id))}
            aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <FaHeart />
          </button>

          {/* Bouton Delete */}
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-700 transition-colors"
            onClick={() => onDelete(id)}
            aria-label="Supprimer le livre"
          >
            <FaTrashAlt />
          </button>

          {/* Lien Acheter */}
          <Link
            href={acheterUrl}
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-700 transition-colors"
            aria-label="Acheter ce livre"
          >
            <BsCashCoin />
          </Link>
        </div>

        {/* Lien Voir les détails */}
        <Link
          href={`/books/${id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          aria-label="Voir les détails du livre"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
