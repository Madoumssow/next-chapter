
export const dynamic = "force-dynamic"; // Ajoutez cette ligne en haut du fichier


// Interface pour le type de réponse API
interface ApiResponse {
  message: string;
}

// Logger pour uniformiser les messages
const logger = {
  log: (message: string, ...optionalParams: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, ...optionalParams);
    }
  },
  warn: (message: string, ...optionalParams: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(message, ...optionalParams);
    }
  },
  error: (message: string, ...optionalParams: unknown[]) => {
    console.error(message, ...optionalParams);
  },
};

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
    const errorMessage =
      error instanceof Error ? error.message : 'Erreur inconnue';
    logger.error(`Erreur lors de l'appel à ${endpoint} : ${errorMessage}`);
    throw new Error(errorMessage);
  }
}

// Interface pour les configurations des pages
interface PageConfig {
  [key: string]: (() => Promise<void>) | undefined;
}

// Exemple de fonction vérifiant les champs
function checkFields<T extends Record<string, unknown>>(obj: T): void {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (typeof value !== 'function') {
      logger.warn(`Le champ "${key}" n'est pas une fonction valide.`);
    }
  });
}


// Exemple d'utilisation de checkFields
checkFields<PageConfig>({
  createSessionCookie: async () => {
    logger.log('Création du cookie de session');
  },
});

// Fonction pour créer un cookie de session
export async function createSessionCookie(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/session', 'POST', {
      cookieName: 'cookieSession',
      cookieValue: 'value123',
    });
    logger.log('Succès :', data.message);
  } catch (error) {
    logger.error('Échec de la création du cookie de session.', error);
  }
}

// Fonction pour créer un cookie persistant
export async function createPersistentCookie(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/persistent', 'POST', {
      cookieName: 'CookiePersistant',
      cookieValue: 'value456',
    });
    logger.log('Succès :', data.message);
  } catch (error) {
    logger.error('Échec de la création du cookie persistant.', error);
  }
}

// Fonction pour supprimer les cookies
export async function deleteCookies(): Promise<void> {
  try {
    const data = await fetchApi('/api/cookies/delete', 'DELETE');
    logger.log('Succès :', data.message);
  } catch (error) {
    logger.error('Échec de la suppression des cookies.', error);
  }
}
