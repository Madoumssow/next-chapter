import { NextResponse } from 'next/server';

export async function DELETE() {
  try {
    const response = NextResponse.json({ message: 'Tous les cookies ont été supprimés.' });

    // Exemple de suppression de plusieurs cookies connus
    const cookiesToDelete = ['cookieSession', 'CookiePersistant'];
    cookiesToDelete.forEach((cookie) => {
      response.cookies.set(cookie, '', { httpOnly: true, path: '/', maxAge: 0 });
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la suppression des cookies.', error },
      { status: 500 }
    );
  }
}
