"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createAlbum, updateAlbum } from "@/services/albumService";
import { saveUploadedImage } from "@/utils/saveUploadedImage";

const createAlbumSchema = z.object({
  title: z.string().trim().min(1, "Título do álbum é obrigatório"),
  artistId: z.string().min(1, "Artista é obrigatório"),
  releaseYear: z.preprocess((value) => {
    if (value === "" || value === null) return undefined;
    return Number(value);
  }, z.number().int("Ano inválido").min(1900, "Ano inválido").max(new Date().getFullYear(), "Ano não pode ser no futuro").optional()),
});

const updateAlbumSchema = z.object({
  id: z.string().min(1, "Álbum inválido"),
  title: z.string().trim().min(1, "Título do álbum é obrigatório"),
  artistId: z.string().min(1, "Artista é obrigatório"),
  releaseYear: z.preprocess((value) => {
    if (value === "" || value === null) return undefined;
    return Number(value);
  }, z.number().int("Ano inválido").min(1900, "Ano inválido").max(new Date().getFullYear(), "Ano não pode ser no futuro").optional()),
});

export async function createAlbumAction(formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    artistId: formData.get("artistId"),
    releaseYear: formData.get("releaseYear"),
  };

  const result = createAlbumSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const coverFile = formData.get("coverFile");

  if (!(coverFile instanceof File) || coverFile.size === 0) {
    return {
      success: false,
      message: "Capa do álbum é obrigatória",
    };
  }

  const savedCover = await saveUploadedImage(coverFile, "albums");

  if (!savedCover.success) {
    return {
      success: false,
      message: savedCover.message,
    };
  }

  try {
    await createAlbum({
      title: result.data.title,
      artistId: result.data.artistId,
      releaseYear: result.data.releaseYear,
      coverUrl: savedCover.imageUrl,
    });

    revalidatePath("/dashboard/albums");

    return {
      success: true,
      message: "Álbum criado com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Artista inválido",
      };
    }

    return {
      success: false,
      message: "Erro ao criar álbum",
    };
  }
}
export async function updateAlbumAction(formData: FormData) {
  const rawData = {
    id: formData.get("id"),
    title: formData.get("title"),
    artistId: formData.get("artistId"),
    releaseYear: formData.get("releaseYear"),
  };

  const result = updateAlbumSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const coverFile = formData.get("coverFile");

  let finalCoverUrl: string | undefined;

  if (coverFile instanceof File && coverFile.size > 0) {
    const savedCover = await saveUploadedImage(coverFile, "albums");

    if (!savedCover.success) {
      return {
        success: false,
        message: savedCover.message,
      };
    }

    finalCoverUrl = savedCover.imageUrl;
  }

  try {
    await updateAlbum({
      id: result.data.id,
      title: result.data.title,
      artistId: result.data.artistId,
      releaseYear: result.data.releaseYear,
      coverUrl: finalCoverUrl,
    });

    revalidatePath("/dashboard/albums");

    return {
      success: true,
      message: "Álbum atualizado com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Artista inválido",
      };
    }

    return {
      success: false,
      message: "Erro ao atualizar álbum",
    };
  }
}
