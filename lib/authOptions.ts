import NextAuth, { NextAuthOptions, Product } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "@/app/db/firebaseConfig";
import { DefaultUser } from "next-auth";

// Déclaration pour étendre les types NextAuth avec des propriétés personnalisées
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string; // Ajout de la propriété 'role'
  }

  interface Session {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      role?: string; // Ajout d'un rôle utilisateur (facultatif)
    };
  }

  interface JWT {
    id?: string;
    email?: string;
    role?: string; // Ajout de la propriété 'role'
  }

  interface Product {
    id: string;
    title: string;
    author: string;
    price: number;
  }
}

// Configuration NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Thierno Mamoudou Sow",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "exemple@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Votre mot de passe" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.error("Email ou mot de passe manquant.");
          return null;
        }

        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;

          const userRef = doc(db, "users", user.uid);
          let userData: { role: string } = { role: "user" };

          const userSnapshot = await getDoc(userRef);
          if (!userSnapshot.exists()) {
            await setDoc(userRef, { email: user.email, ...userData });
          } else {
            userData = (userSnapshot.data() as { role: string }) || { role: "user" };
          }

          return {
            id: user.uid,
            email: user.email,
            role: userData.role,
          };
        } catch (error) {
          console.error("Erreur d'authentification :", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: session.user?.name || "Utilisateur",
          image: session.user?.image ?? undefined,
          role: typeof token.role === "string" ? token.role : "user",
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

// Fonction améliorée pour gérer les commandes
export const handleOrder = async (product: Product | null) => {
  if (!product) {
    alert("Aucun produit sélectionné.");
    return;
  }

  const address = "Adresse de test"; // Vous pouvez obtenir l'adresse d'une manière plus dynamique

  const order = {
    bookId: product.id,
    title: product.title,
    author: product.author,
    price: product.price,
    date: new Date().toISOString(),
    quantity: 1, // À remplacer par la quantité réelle
    address: address, // L'adresse dynamique
  };

  try {
    // Ajouter la commande dans Firebase
    await addDoc(collection(db, "orders"), order);

    alert(`Commande enregistrée avec succès pour : ${product.title}`);
  } catch (error) {
    console.error("Erreur lors de la commande :", error);
    alert("Une erreur est survenue lors de l'enregistrement de la commande.");
  }
};

// Gestion des interactions (like, dislike, supprime)
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
          { likes: (1) }, // Incrémente le nombre de likes
          { merge: true } // Fusionne avec les données existantes
        );
        alert("Vous avez aimé ce produit.");
        break;

      case "dislike":
        await setDoc(
          productRef,
          { dislikes: (1) }, // Incrémente le nombre de dislikes
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


// Exporter le gestionnaire NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
