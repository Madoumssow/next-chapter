'use client'; // Indique que ce fichier est destiné au client-side

// Interface pour le type de réponse API
interface ApiResponse {
  message: string;
}

// Fonction générique pour effectuer des requêtes API
async function fetchApi<T>(
  endpoint: string,
  method: string,
  body?: Record<string, T>
): Promise<ApiResponse> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`Erreur : ${response.statusText}`);
    }

    return (await response.json()) as ApiResponse;
  } catch (error) {
    console.error(
      `Erreur lors de l'appel à ${endpoint} :`,
      error instanceof Error ? error.message : error
    );
    throw error; // Relance l'erreur pour permettre un traitement personnalisé
  }
}

// Interface pour les pages
interface PageConfig { createSessionCookie?: () => Promise<void>; }

// Exemple de fonction vérifiant les champs 
function checkFields<T>(obj: T): void { 
  // Vérifiez les champs ici 
  }

  checkFields<PageConfig>({ createSessionCookie: async () => { 
    // Votre implémentation ici 
  }, });


// Fonction pour créer un cookie de session
export async function createSessionCookie(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/session', 'POST', {
      cookieName: 'cookieSession',
      cookieValue: 'value123',
    });
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Échec de la création du cookie de session.', error);
  }
}

// Fonction pour créer un cookie persistant
export async function createPersistentCookie(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/persistent', 'POST', {
      cookieName: 'CookiePersistant',
      cookieValue: 'value456',
    });
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Échec de la création du cookie persistant.', error);
  }
}

// Fonction pour supprimer les cookies
export async function deleteCookies(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/delete', 'DELETE');
    console.log('Succès :', data.message);
  } catch (error) {
    console.error('Échec de la suppression des cookies.', error);
  }
}
