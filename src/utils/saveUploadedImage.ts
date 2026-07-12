import { mkdir, writeFile } from "fs/promises";
import crypto from "crypto";
import path from "path";

type UploadFolder = "artists" | "albums" | "songs/covers";

export async function saveUploadedImage(file: File, folder: UploadFolder) {
  const allowedTypes = ["image/png", "image/jpeg"];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      message: "A imagem deve ser PNG ou JPEG",
      imageUrl: undefined,
    };
  }

  const maxSizeInBytes = 5 * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return {
      success: false,
      message: "A imagem deve ter no máximo 5MB",
      imageUrl: undefined,
    };
  }

  const extension = file.type === "image/png" ? "png" : "jpg";

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return {
    success: true,
    message: "Imagem salva com sucesso",
    imageUrl: `/uploads/${folder}/${fileName}`,
  };
}
