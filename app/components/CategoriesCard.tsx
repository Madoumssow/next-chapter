import Image from "next/image";
import { FaHeart, FaTrashAlt } from "react-icons/fa";

interface CategoriesCardProps {
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

const CategoriesCard = ({
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
}: CategoriesCardProps) => {
  return (
    <div className="px-4 py-4">
      <div className="bg-white border rounded-lg shadow-lg overflow-hidden group relative">
        <Image
          src={imageSrc}
          alt={alt}
          width={250}
          height={350}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{author}</p>
          <p className="text-sm text-gray-500 mt-2">{description}</p>
          <p className="mt-4 font-bold">{price}</p>
          <p className="text-sm text-gray-500">{condition}</p>
        </div>
        <div className="absolute bottom-2 right-2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onLike(id)}
            className={`p-2 rounded-full ${
              isLiked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
            } hover:bg-red-200 hover:text-red-600 transition`}
            aria-label="Like"
          >
            <FaHeart />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
            aria-label="Delete"
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
