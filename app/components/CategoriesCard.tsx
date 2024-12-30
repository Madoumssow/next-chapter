import Image from "next/image";

interface CategoriesCardProps {
  title: string;
  author: string;
  price: string;
  imageSrc: string;
  alt: string;
  condition: string;
  description: string;
}

const CategoriesCard = ({
  title,
  author,
  price,
  imageSrc,
  alt,
  condition,
  description,
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
      </div>
    </div>
  );
};

export default CategoriesCard;
