import { put } from "@vercel/blob";
import crypto from "crypto";
import path from "path";

export async function saveUploadedAudio(file: File) {
  const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];

  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      message: "O áudio deve ser MP3, WAV ou OGG",
      audioUrl: undefined,
    };
  }

  const maxSizeInBytes = 20 * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    return {
      success: false,
      message: "O áudio deve ter no máximo 20MB",
      audioUrl: undefined,
    };
  }

  const allowedExtensions = [".mp3", ".wav", ".ogg"];
  const originalExtension = path.extname(file.name).toLowerCase();

  if (!allowedExtensions.includes(originalExtension)) {
    return {
      success: false,
      message: "O áudio deve ter extensão MP3, WAV ou OGG",
      audioUrl: undefined,
    };
  }

  const extensionByType: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
  };

  const extension = extensionByType[file.type];
  const fileName = `songs/audio/${crypto.randomUUID()}.${extension}`;

  try {
    const blob = await put(fileName, file, {
      access: "public",
    });

    return {
      success: true,
      message: "Áudio salvo com sucesso",
      audioUrl: blob.url,
    };
  } catch {
    return {
      success: false,
      message: "Erro ao salvar áudio",
      audioUrl: undefined,
    };
  }
}
