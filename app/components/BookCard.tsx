import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTrashAlt, FaDownload } from "react-icons/fa";
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
  isLiked: boolean;
  onLike: (id: string) => void;
  onDelete: (id: string) => void;
}

const BookCard = ({
  id,
  title,
  author,
  price,
  imageSrc,
  alt,
  condition,
  description,
  isLiked,
  onLike,
  onDelete,
}: BookCardProps) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white border transition-transform transform hover:scale-105 duration-300">
      <Image
        src={imageSrc}
        alt={alt}
        width={250}
        height={350}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{author}</p>
        <p className="text-gray-500 text-sm mt-2">{description}</p>
        <p className="mt-4 font-bold text-lg">{price}</p>
        <p className="text-sm text-gray-500 italic">{condition}</p>
      </div>

      {/* Boutons d'actions */}
      <div className="p-4 flex justify-between items-center border-t">
        <div className="flex space-x-4">
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              isLiked ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
            } hover:bg-red-200 hover:text-red-700 transition-colors`}
            onClick={() => onLike(id)}
            aria-label="Like"
          >
            <FaHeart />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 hover:text-gray-700 transition-colors"
            onClick={() => onDelete(id)}
            aria-label="Delete"
          >
            <FaTrashAlt />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 hover:text-blue-700 transition-colors"
            onClick={() => window.open(`/api/download/${id}`, "_blank")}
            aria-label="Download"
          >
            <FaDownload />
          </button>
          <BsCashCoin />
        </div>
        <Link
          href={`/books/${id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
