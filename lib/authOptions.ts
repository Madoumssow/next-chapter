import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { auth } from "../app/db/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// Déclaration pour étendre les types NextAuth avec des propriétés personnalisées
declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
      role?: string; // Ajout d'un rôle utilisateur (facultatif)
    };
  }
}

// Configuration NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    // Fournisseur GitHub
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Fournisseur Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // Fournisseur d'authentification personnalisée (Firebase)
    CredentialsProvider({
      name: "Thierno Mamoudou",
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
          // Authentification avec Firebase
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;

          return user ? { id: user.uid, email: user.email } : null;
        } catch (error) {
          console.error("Erreur d'authentification :", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Gestion des jetons JWT
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.user) {
        return { ...token, ...session.user };
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    // Gestion des sessions
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: session.user?.name || "Utilisateur",
          image: session.user?.image || null,
          role: token.role || "user", // Assignez un rôle par défaut
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Page de connexion personnalisée
    error: "/auth/error",   // Page d'erreur personnalisée
  },
  debug: process.env.NODE_ENV === "development", // Activer le débogage en développement
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
