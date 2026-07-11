import { mkdir, writeFile } from "fs/promises";
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

  const extensionByType: Record<string, string> = {
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
  };

  const extension = extensionByType[file.type];
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "songs",
    "audio"
  );
  await mkdir(uploadDir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  return {
    success: true,
    message: "Áudio salvo com sucesso",
    audioUrl: `/uploads/songs/audio/${fileName}`,
  };
}
