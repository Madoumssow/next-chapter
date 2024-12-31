/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/assets/bookImages/**', // Permet de charger les images locales dans le dossier public
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**', // Autorise les images provenant de GitHub
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // Autorise les images provenant de Google
      },
    ],
  },
  env: {
    GITHUB_ID: process.env.GITHUB_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
