'use client'; // Indique que ce fichier est destiné au client-side

// Fonction pour créer un cookie de session
export async function createSessionCookie(): Promise<void> {
  try {
    const response = await fetch('/api/cookies/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookieName: 'cookieSession', cookieValue: 'value123' }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la création du cookie de session : ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Erreur lors de la création du cookie de session :', error instanceof Error ? error.message : error);
  }
}

// Fonction pour créer un cookie persistant
export async function createPersistentCookie() {
  try {
    const response = await fetch('/api/cookies/persistent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cookieName: 'CookiePersistant', cookieValue: 'value456' }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la création du cookie persistant : ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Erreur lors de la création du cookie persistant :', error instanceof Error ? error.message : error);
  }
}

// Fonction pour supprimer les cookies
export async function deleteCookies() {
  try {
    const response = await fetch('/api/cookies/delete', {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la suppression des cookies : ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Erreur lors de la suppression des cookies :', error instanceof Error ? error.message : error);
  }
}
