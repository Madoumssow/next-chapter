// 'use client';

// import { createSessionCookie, 
//     createPersistentCookie, 
//     deleteCookies } from '@/app/cookies/page';

// export default function CookieManager() {
//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <h1 className="text-2xl font-bold">Gestion des Cookies</h1>
//       <button
//         onClick={createSessionCookie}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Créer un Cookie de Session
//       </button>
//       <button
//         onClick={createPersistentCookie}
//         className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         Créer un Cookie Persistant
//       </button>
//       <button
//         onClick={deleteCookies}
//         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Supprimer les Cookies
//       </button>
//     </div>
//   );
// }
