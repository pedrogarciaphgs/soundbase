"use server";

import { saveUploadedImage } from "@/utils/saveUploadedImage";
import { MusicGenre, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  createArtist,
  deleteArtist,
  updateArtist,
} from "@/services/artistService";

const genreSchema = z.preprocess(
  (value) => (value === "" ? undefined : value),
  z.nativeEnum(MusicGenre).optional()
);

const createArtistSchema = z.object({
  name: z.string().trim().min(1, "Nome do artista é obrigatório"),
  genre: genreSchema,
});

const updateArtistSchema = z.object({
  id: z.string().min(1, "Artista inválido"),
  name: z.string().trim().min(1, "Nome do artista é obrigatório"),
  genre: genreSchema,
});

export async function createArtistAction(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    genre: formData.get("genre"),
  };

  const result = createArtistSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const imageFile = formData.get("imageFile");

  let finalImageUrl: string | undefined;

  if (imageFile instanceof File && imageFile.size > 0) {
    const savedImage = await saveUploadedImage(imageFile, "artists");

    if (!savedImage.success) {
      return {
        success: false,
        message: savedImage.message,
      };
    }

    finalImageUrl = savedImage.imageUrl;
  }

  try {
    await createArtist({
      name: result.data.name,
      genre: result.data.genre,
      imageUrl: finalImageUrl,
    });

    revalidatePath("/dashboard/artists");

    return {
      success: true,
      message: "Artista criado com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Já existe um artista com esse nome",
      };
    }

    return {
      success: false,
      message: "Erro ao criar artista",
    };
  }
}

export async function deleteArtistAction(id: string) {
  await deleteArtist(id);

  revalidatePath("/dashboard/artists");

  return {
    success: true,
    message: "Artista excluído com sucesso",
  };
}

export async function updateArtistAction(formData: FormData) {
  const rawData = {
    id: formData.get("id"),
    name: formData.get("name"),
    genre: formData.get("genre"),
  };

  const result = updateArtistSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const imageFile = formData.get("imageFile");

  let finalImageUrl: string | undefined;
  if (imageFile instanceof File && imageFile.size > 0) {
    const savedImage = await saveUploadedImage(imageFile, "artists");

    if (!savedImage.success) {
      return {
        success: false,
        message: savedImage.message,
      };
    }

    finalImageUrl = savedImage.imageUrl;
  }

  try {
    await updateArtist({
      id: result.data.id,
      name: result.data.name,
      genre: result.data.genre,
      imageUrl: finalImageUrl,
    });

    revalidatePath("/dashboard/artists");

    return {
      success: true,
      message: "Artista atualizado com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "Já existe um artista com esse nome",
      };
    }

    return {
      success: false,
      message: "Erro ao atualizar artista",
    };
  }
}
