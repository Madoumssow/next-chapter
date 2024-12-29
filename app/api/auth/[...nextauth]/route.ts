import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Étendre les types NextAuth pour ajouter des propriétés personnalisées
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
      role?: string; // Rôle de l'utilisateur, ajouté pour une gestion des permissions
      id?: string;   // ID unique pour l'utilisateur
    };
  }
}

// Gestionnaire NextAuth qui sera appelé pour traiter les requêtes GET et POST
const handler = NextAuth(authOptions);

// Exportation des méthodes GET et POST
export { handler as GET, handler as POST };
