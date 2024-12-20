import type { Metadata } from 'next'

export const metadata: Metadata  = {
  title: "Catégories | Librairie en Ligne",
  description: "Explorez nos différentes catégories de livres.",
    keywords: "book, books, livre, livres"
};

  
  export default function CategoriesLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        {children}
      </div>
    );
  }
  