import { NextResponse } from "next/server";

export async function DELETE() {
  // Message de réponse pour indiquer que les cookies ont été supprimés
  const response = NextResponse.json({ message: 'Cookies supprimés' });

  // Liste des cookies à supprimer
  const cookieNames = ["cookieSession", "CookiePersistant"];

  // Parcours de la liste des cookies pour les supprimer
  cookieNames.forEach(cookieName => {
    response.cookies.set(cookieName, '', {
      maxAge: -1, // Indique au navigateur de supprimer le cookie immédiatement
      path: '/',  // Rend la suppression valable pour tout le site
    });
  });

  return response; // Retourne la réponse modifiée
}
