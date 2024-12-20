import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";

// Schéma de validation avec Zod
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Ce champ est requis" })
    .email("Format non valide")
    .max(300, { message: "Votre email doit faire au maximum 300 caractères" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au minimum 6 caractères" }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormLogin() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirige l'utilisateur connecté
  React.useEffect(() => {
    if (session) {
      toast.info("Vous êtes déjà connecté.");
      router.push("/books"); // Redirige vers la page principale si déjà connecté
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.ok) {
        toast.success("Vous êtes connecté");
        router.push("/books");
      } else {
        toast.error(response?.error || "Connexion échouée, vérifiez vos informations.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      toast.error("Une erreur inattendue est survenue. Veuillez réessayer.");
    }
  };

  return session ? null : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto flex flex-col gap-3 bg-white p-8 rounded-lg shadow-lg"
      aria-label="Formulaire de connexion"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
        Connexion
      </h2>

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

      <button
        type="submit"
        className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
      >
        Connexion
      </button>

      <p className="text-center text-gray-600 text-sm mt-2">
        Pas de compte ?{" "}
        <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Inscrivez-vous maintenant
        </Link>
      </p>
    </form>
  );
}
