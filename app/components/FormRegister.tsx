import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/app/db/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";

// Schéma de validation Zod
const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Ce champ est requis" })
      .email("Format d'email invalide")
      .max(300, { message: "Votre email doit faire au maximum 300 caractères" }),
    password: z
      .string()
      .min(6, { message: "Le mot de passe doit contenir au minimum 6 caractères" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Le mot de passe doit contenir au minimum 6 caractères" }),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

// Fonction pour ajouter l'utilisateur dans Firestore
async function addUserToFirestore(userId: string, email: string) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { email });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur à Firestore :", error);
    throw new Error("Erreur lors de l'ajout de l'utilisateur à la base de données.");
  }
}

// Fonction pour gérer les erreurs Firebase
function handleFirebaseError(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes("auth/email-already-in-use")) {
      return "Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.";
    }
    return "Une erreur est survenue : " + error.message;
  }
  return "Erreur inconnue. Veuillez réessayer.";
}

export default function FormRegister() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirection si l'utilisateur est déjà connecté
  React.useEffect(() => {
    if (session) {
      toast.info("Vous êtes déjà connecté.");
      router.push("/books");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Gestion de la soumission du formulaire
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await addUserToFirestore(user.uid, values.email);
      toast.success("Compte créé avec succès !");
      router.push("/books");
    } catch (error) {
      const errorMessage = handleFirebaseError(error);
      toast.error(errorMessage);
      console.error("Erreur lors de la création de l'utilisateur :", error);
    }
  }

  return session ? null : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto flex flex-col gap-3 bg-white p-8 rounded-lg shadow-lg"
      aria-label="Formulaire d'inscription"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Inscription
      </h2>

      {/* Champ Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none hover:border-gray-400"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Champ Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none hover:border-gray-400"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        {errors.password && (
          <p id="password-error" className="text-red-600 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Champ Confirmation du mot de passe */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmez le mot de passe
        </label>
        <input
          {...register("confirmPassword")}
          id="confirmPassword"
          type="password"
          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none hover:border-gray-400"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirmPassword-error"
        />
        {errors.confirmPassword && (
          <p id="confirmPassword-error" className="text-red-600 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Bouton d'inscription */}
      <button
        type="submit"
        className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
      >
        Inscription
      </button>

      {/* Lien pour se connecter */}
      <p className="text-center text-gray-600 text-sm mt-2">
        Déjà un compte ?{" "}
        <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Connectez-vous
        </Link>
      </p>
    </form>
  );
}
