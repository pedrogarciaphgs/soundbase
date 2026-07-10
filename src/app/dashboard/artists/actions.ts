"use server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { createArtist } from "@/services/artistService";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createArtistSchema = z.object({
  name: z.string().trim().min(1, "Nome do artista é obrigatório"),

  imageUrl: z.preprocess((value) => {
    if (typeof value !== "string") return undefined;

    const trimmedValue = value.trim();

    return trimmedValue === "" ? undefined : trimmedValue;
  }, z.url("URL da imagem inválida").optional()),
});

export async function createArtistAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    imageUrl: formData.get("imageUrl"),
  };

  const result = createArtistSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const imageFile = formData.get("imageFile");
  let finalImageUrl = result.data.imageUrl;

  if (imageFile instanceof File && imageFile.size > 0) {
    const allowedTypes = ["image/png", "image/jpeg"];

    if (!allowedTypes.includes(imageFile.type)) {
      return {
        success: false,
        message: "A imagem deve ser PNG ou JPEG",
      };
    }

    const extension = imageFile.type === "image/png" ? "png" : "jpg";
    const fileName = `${crypto.randomUUID()}.${extension}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "artists");
    await mkdir(uploadDir, { recursive: true });

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    finalImageUrl = `/uploads/artists/${fileName}`;
  }

  await createArtist({
    name: result.data.name,
    imageUrl: finalImageUrl,
  });

  revalidatePath("/dashboard/artists");

  return {
    success: true,
    message: "Artista criado com sucesso",
  };
}
