import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { cookieName, cookieValue } = await req.json();

    if (!cookieName || !cookieValue) {
      return NextResponse.json(
        { message: 'Nom ou valeur du cookie manquant.' },
        { status: 400 }
      );
    }

    const response = NextResponse.json({ message: 'Cookie de session créé avec succès.' });
    response.cookies.set(cookieName, cookieValue, { httpOnly: true, path: '/' });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Erreur lors de la création du cookie de session.', error },
      { status: 500 }
    );
  }
}
