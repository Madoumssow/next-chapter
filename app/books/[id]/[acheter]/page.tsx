"use client"

// ./app/books/[id]/[acheter]/page.tsx
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/app/db/firebaseConfig'; // As
// Définir le type pour les livres
type Book = {
  id: string;
  title: string;
  author: string;
  price: string;
  imageSrc: string;
  alt: string;
  condition: string;
  description: string;
};

const booksData: Book[] = [
  // Ajoutez ici les données de vos livres (comme dans l'exemple précédent)
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

const ProductPage = () => {
  const { id } = useParams(); // Utilise useParams pour récupérer l'ID
  const [product, setProduct] = useState<Book | null>(null); // Typage correct
  const [loading, setLoading] = useState<boolean>(true); // Indicateur de chargement
  const [error, setError] = useState<string | null>(null); // Message d'erreur si produit introuvable
  const [address, setAddress] = useState<string>(''); // État pour l'adresse
  const [quantity, setQuantity] = useState<number>(1); // Gestion de la quantité

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleOrder = async (product: Book) => {
    if (!product) {
      alert("Aucun produit sélectionné.");
      return;
    }

    if (!address.trim()) {
      alert("Veuillez entrer une adresse de livraison.");
      return;
    }

    // Création de la commande avec l'adresse dynamique
    const order = {
      bookId: product?.id,
      title: product?.title,
      author: product?.author,
      price: product?.price,
      date: new Date().toISOString(),
      quantity: quantity, // Quantité dynamique
      address: address, // Utilisation de l'adresse saisie par le client
    };
  try {
    await addDoc(collection(db, "orders"), order);
    alert(`Commande enregistrée avec succès pour : ${product.title}`);
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    alert("Une erreur est survenue lors de l'enregistrement de la commande.");
  }
  };

  useEffect(() => {
    if (id) {
      const selectedBook = booksData.find((book) => book.id === id);
      if (!selectedBook) {
        setError("Livre introuvable pour l'ID: " + id); // Gestion d'erreur
      } else {
        setProduct(selectedBook); // Si le produit existe, met à jour l'état
      }
      setLoading(false); // Fin du chargement
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Chargement du produit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Produit introuvable</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>{product.title} - Boutique</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-row max-w-4xl w-full">
        <div className="flex-shrink-0">
          <Image
            src={product.imageSrc}
            alt={product.alt}
            width={300}
            height={400}
            className="w-full h-auto object-cover rounded-md"
            onError={(e) => (e.currentTarget.src = "/default-placeholder.jpeg")}
          />
        </div>

        <div className="flex-grow pl-6">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.author}</p>
          <p className="text-gray-500 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">{product.price}</p>
          <p className="text-sm text-gray-500 italic mb-6">{product.condition}</p>

          <form className="flex flex-col gap-4">
            <div>
              <label htmlFor="quantity" className="block text-1xl font-medium text-gray-700">
                Quantité :
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-1xl font-medium text-gray-700">
                Adresse de livraison :
              </label>
              <textarea
                id="address"
                rows={3}
                onChange={handleAddressChange}
                value={address}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Entrez votre adresse ici"
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={() => handleOrder(product)}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          aria-label={`Commander le livre ${product.title}`}
        >
          Commander
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
