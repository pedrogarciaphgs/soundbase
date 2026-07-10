import { mkdir, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";

export async function saveArtistImage(file: File) {
  const allowedTypes = ["image/png", "image/jpeg"];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      message: "A imagem deve ser PNG ou JPEG",
      imageUrl: undefined,
    };
  }

  const extension = file.type === "image/png" ? "png" : "jpg";
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", "artists");
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return {
    success: true,
    message: "Imagem salva com sucesso",
    imageUrl: `/uploads/artists/${fileName}`,
  };
}
