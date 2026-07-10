"use server";

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

  await createArtist({
    name: result.data.name,
    imageUrl: result.data.imageUrl,
  });

  revalidatePath("/dashboard/artists");

  return {
    success: true,
    message: "Artista criado com sucesso",
  };
}
