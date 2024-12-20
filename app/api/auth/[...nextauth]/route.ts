import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Déclaration des types pour étendre les interfaces de NextAuth (facultatif si vos extensions sont simples)
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
      // Ajoutez d'autres propriétés si nécessaire, comme `role` ou `id`
      role?: string;
      id?: string;
    };
  }
}

// Gestionnaire NextAuth pour gérer les requêtes GET et POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
