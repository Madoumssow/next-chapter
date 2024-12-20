import React from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'  // Importer le composant Image de Next.js

export const metadata: Metadata = {
  title: 'Members',
  description: "livres de recommandation",
  keywords: "book, books, livre, livres"
}

// Exemple de données pour les membres
const members = [
  {
    name: 'Thierno Mamoudou Sow',
    image: '/member/z1.jpg',  // L'image doit être dans le dossier public/membres
    description: 'Développeuse web front-end spécialisée en React et UI/UX design.',
  },
  {
    name: 'Talsadoum Wos',
    image: '/member/z2.jpg',
    description: 'Développeur full-stack avec une expertise en Node.js et MongoDB.',
  },
  {
    name: 'Zeus Zenon Dekition',
    image: '/member/z3.jpg',
    description: 'Spécialiste en IA et apprentissage automatique, passionnée par la data science.',
  },
  // Ajoutez d'autres membres ici...
]

export default function Membres() {
  return (
    <div className='w-full min-h-screen bg-gray-100 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-4xl font-extrabold text-center text-gray-800 mb-10'>
          Nos Membres
        </h1>
        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {members.map((member, index) => (
            <div key={index} className='bg-white rounded-lg shadow-lg overflow-hidden'>
              <Image
                src={member.image}  // Utilisation du composant Image de Next.js
                alt={member.name}
                width={500}  // Largeur de l'image (ajustez selon vos besoins)
                height={300}  // Hauteur de l'image (ajustez selon vos besoins)
                className='w-full h-96 object-cover' 
              />
              <div className='p-6'>
                <h2 className='text-xl font-semibold text-gray-900'>{member.name}</h2>
                <p className='text-gray-600 mt-2'>{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
