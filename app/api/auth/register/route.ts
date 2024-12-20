import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "@/app/db/firebaseConfig";
import bcrypt from "bcryptjs"; // Remplacez "bcrypt" par "bcryptjs" pour plus de compatibilité

export async function POST(request: Request) {
  try {
    // Parse le corps de la requête
    const { email, password }: { email: string; password: string } = await request.json();

    // Validation des données
    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe sont requis." }, { status: 400 });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Ajout de l'utilisateur dans Firestore
    const userCollection = collection(db, "users");
    const userRef = await addDoc(userCollection, {
      email: email,
      password: hashedPassword,
      createdAt: new Date().toISOString(), // Ajout d'un champ `createdAt` pour le suivi
    });

    // Réponse de succès
    return NextResponse.json({ success: "Compte ajouté avec succès", userId: userRef.id });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);

    // Vérification de la structure de l'erreur
    const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
