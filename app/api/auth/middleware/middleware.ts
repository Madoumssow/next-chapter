import { NextRequest } from "next/server"; // Importation de NextRequest
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {  // Utilisation de NextRequest ici
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const url = req.nextUrl.clone();
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/admin") && token.role !== "admin") {
    url.pathname = "/403";
    return NextResponse.rewrite(url); // Redirige vers une page 403
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // Protéger toutes les routes sous /admin
};
