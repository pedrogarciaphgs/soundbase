import { put } from "@vercel/blob";
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

  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  const originalExtension = path.extname(file.name).toLowerCase();

  if (!allowedExtensions.includes(originalExtension)) {
    return {
      success: false,
      message: "A imagem deve ter extensão PNG, JPG ou JPEG",
      imageUrl: undefined,
    };
  }

  const extension = file.type === "image/png" ? "png" : "jpg";
  const fileName = `${folder}/${crypto.randomUUID()}.${extension}`;

  try {
    const blob = await put(fileName, file, {
      access: "public",
    });

    return {
      success: true,
      message: "Imagem salva com sucesso",
      imageUrl: blob.url,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao salvar imagem",
      imageUrl: undefined,
    };
  }
}
