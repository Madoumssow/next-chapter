"use client"

// components/BookSection.tsx
import { useState } from "react";
import CategoriesCard from "./CategoriesCard";

interface CategoriesCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  imageSrc: string;
  alt: string;
  condition: string;
  description: string;
}

interface CategoriesData {
  [category: string]: CategoriesCardProps[];
}

const categoriesData: CategoriesData = {
  Roman: [
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

    }

  ],

  Fiction: [
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

    }
  ],

  DevPersonnelle: [
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

    }
  ],

  Informatique:[
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
  ]
}

const BookSection = () => {
  const [categories] = useState(categoriesData); // Les données sont statiques, donc l'état pourrait ne pas être nécessaire



  return (
    <div className="w-full p-4">
    {Object.entries(categories).map(([categoryName, books]) => (
      <div key={categoryName} className=" mb-8">
        {/* Titre de la catégorie */}
        <h2 className="text-2xl font-semibold mb-4">{categoryName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {(books).map((book) => (
            <CategoriesCard
              key={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              imageSrc={book.imageSrc}
              alt={book.alt}
              condition={book.condition}
              description={book.description}

            />
          ))}
        </div>
      </div>
    ))}
  </div>
  );
};

export default BookSection;

