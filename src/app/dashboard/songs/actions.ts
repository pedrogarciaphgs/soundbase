"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createSong, deleteSong, updateSong } from "@/services/songService";
import { requireAdmin } from "@/utils/requireAdmin";
import { saveUploadedAudio } from "@/utils/saveUploadedAudio";
import { saveUploadedImage } from "@/utils/saveUploadedImage";

const durationSchema = {
  minutes: z.preprocess(
    (value) => Number(value),
    z.number().int("Minutos inválidos").min(0, "Minutos inválidos")
  ),
  seconds: z.preprocess(
    (value) => Number(value),
    z
      .number()
      .int("Segundos inválidos")
      .min(0, "Segundos inválidos")
      .max(59, "Segundos deve ser entre 0 e 59")
  ),
};

const createSongSchema = z.object({
  title: z.string().trim().min(1, "Título da música é obrigatório"),
  albumId: z.string().min(1, "Álbum é obrigatório"),
  ...durationSchema,
});

const updateSongSchema = z.object({
  id: z.string().min(1, "Música inválida"),
  title: z.string().trim().min(1, "Título da música é obrigatório"),
  albumId: z.string().min(1, "Álbum é obrigatório"),
  ...durationSchema,
});

function calculateDuration(minutes: number, seconds: number) {
  return minutes * 60 + seconds;
}

export async function createSongAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    title: formData.get("title"),
    albumId: formData.get("albumId"),
    minutes: formData.get("minutes"),
    seconds: formData.get("seconds"),
  };

  const result = createSongSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const duration = calculateDuration(result.data.minutes, result.data.seconds);

  if (duration < 1) {
    return {
      success: false,
      message: "Duração é obrigatória",
    };
  }

  const audioFile = formData.get("audioFile");

  if (!(audioFile instanceof File) || audioFile.size === 0) {
    return {
      success: false,
      message: "Arquivo de áudio é obrigatório",
    };
  }

  const savedAudio = await saveUploadedAudio(audioFile);

  if (!savedAudio.success) {
    return {
      success: false,
      message: savedAudio.message,
    };
  }

  const coverFile = formData.get("coverFile");

  let finalCoverUrl: string | undefined;

  if (coverFile instanceof File && coverFile.size > 0) {
    const savedCover = await saveUploadedImage(coverFile, "songs/covers");

    if (!savedCover.success) {
      return {
        success: false,
        message: savedCover.message,
      };
    }

    finalCoverUrl = savedCover.imageUrl;
  }

  try {
    await createSong({
      title: result.data.title,
      albumId: result.data.albumId,
      duration,
      audioUrl: savedAudio.audioUrl!,
      coverUrl: finalCoverUrl,
    });

    revalidatePath("/dashboard/songs");

    return {
      success: true,
      message: "Música criada com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Álbum inválido",
      };
    }

    return {
      success: false,
      message: "Erro ao criar música",
    };
  }
}

export async function updateSongAction(formData: FormData) {
  await requireAdmin();

  const rawData = {
    id: formData.get("id"),
    title: formData.get("title"),
    albumId: formData.get("albumId"),
    minutes: formData.get("minutes"),
    seconds: formData.get("seconds"),
  };

  const result = updateSongSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  const duration = calculateDuration(result.data.minutes, result.data.seconds);

  if (duration < 1) {
    return {
      success: false,
      message: "Duração é obrigatória",
    };
  }

  const audioFile = formData.get("audioFile");

  let finalAudioUrl: string | undefined;

  if (audioFile instanceof File && audioFile.size > 0) {
    const savedAudio = await saveUploadedAudio(audioFile);

    if (!savedAudio.success) {
      return {
        success: false,
        message: savedAudio.message,
      };
    }

    finalAudioUrl = savedAudio.audioUrl;
  }

  const coverFile = formData.get("coverFile");

  let finalCoverUrl: string | undefined;

  if (coverFile instanceof File && coverFile.size > 0) {
    const savedCover = await saveUploadedImage(coverFile, "songs/covers");

    if (!savedCover.success) {
      return {
        success: false,
        message: savedCover.message,
      };
    }

    finalCoverUrl = savedCover.imageUrl;
  }

  try {
    await updateSong({
      id: result.data.id,
      title: result.data.title,
      albumId: result.data.albumId,
      duration,
      audioUrl: finalAudioUrl,
      coverUrl: finalCoverUrl,
    });

    revalidatePath("/dashboard/songs");

    return {
      success: true,
      message: "Música atualizada com sucesso",
    };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return {
        success: false,
        message: "Álbum inválido",
      };
    }

    return {
      success: false,
      message: "Erro ao atualizar música",
    };
  }
}

export async function deleteSongAction(id: string) {
  await requireAdmin();

  try {
    await deleteSong(id);

    revalidatePath("/dashboard/songs");

    return {
      success: true,
      message: "Música excluída com sucesso",
    };
  } catch {
    return {
      success: false,
      message: "Erro ao excluir música",
    };
  }
}
