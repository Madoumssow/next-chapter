"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";

interface CarouselProps {
  images: { src: string; alt?: string }[];
}

const Carousel = ({ images }: CarouselProps) => {
  // const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">Aucune image disponible.</div>;
  }

  // const showSlide = (index: number) => {
  //   setCurrentIndex((index + images.length) % images.length);
  // };

  // const nextSlide = () => showSlide(currentIndex + 1);
  // const prevSlide = () => showSlide(currentIndex - 1);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides container */}
      {/* <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-96 bg-cover bg-center flex-shrink-0"
            style={{ backgroundImage: `url(${image.src})` }}
            aria-label={image.alt || `Slide ${index + 1}`}
          ></div>
        ))}
      </div> */}

      {/* Navigation buttons */}
      {/* <button
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={prevSlide}
      >
        &#8592;
      </button>
      <button
        aria-label="Next slide"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={nextSlide}
      >
        &#8594;
      </button> */}

      {/* Pagination indicators */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            } focus:outline-none`}
            onClick={() => showSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div> */}

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