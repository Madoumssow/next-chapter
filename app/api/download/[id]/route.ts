// pages/api/download.ts
import path from "path";
import { promises as fs } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Un ID valide est requis." });
  }

  // Exemple : Chemin vers un fichier PDF basé sur l'ID
  const filePath = path.join(process.cwd(), "public", "pdfs", `${id}.pdf`);

  try {
    const fileData = await fs.readFile(filePath);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${id}.pdf`);
    res.status(200).send(fileData);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier :", error);
    res.status(404).json({ error: "Fichier introuvable." });
  }
}
