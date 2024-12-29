import { db } from "@/app/db/firebaseConfig"; // Assurez-vous que ce chemin est correct
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export const handleInteraction = async (bookId: string, action: "like" | "dislike" | "delete") => {
  if (!bookId) {
    alert("Aucun produit sélectionné.");
    return;
  }

  try {
    const productRef = doc(db, "products", bookId);

    switch (action) {
      case "like":
        await setDoc(
          productRef,
          { likes: 1 }, // Incrémente le nombre de likes
          { merge: true } // Fusionne avec les données existantes
        );
        alert("Vous avez aimé ce produit.");
        break;

      case "dislike":
        await setDoc(
          productRef,
          { dislikes: 1 }, // Incrémente le nombre de dislikes
          { merge: true } // Fusionne avec les données existantes
        );
        alert("Vous n'aimez pas ce produit.");
        break;

      case "delete":
        await deleteDoc(productRef); // Supprime complètement le document
        alert("Le produit a été supprimé.");
        break;

      default:
        throw new Error("Action non valide.");
    }
  } catch (error) {
    console.error("Erreur lors de la gestion de l'interaction :", error);
    alert("Une erreur est survenue lors de la gestion de l'interaction.");
  }
};
