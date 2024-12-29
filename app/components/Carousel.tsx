"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarouselProps {
  images: { src: string; alt?: string }[];
}

const Carousel = ({ images }: CarouselProps) => {
  const router = useRouter();

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">Aucune image disponible.</div>;
  }

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative w-full overflow-hidden">

      {/* Navigation to other pages */}
      <div className="absolute bottom-4 right-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md focus:outline-none hover:bg-blue-600"
          onClick={() => handleNavigation("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Carousel;