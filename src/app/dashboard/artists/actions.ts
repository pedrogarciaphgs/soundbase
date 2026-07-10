"use server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { createArtist } from "@/services/artistService";
import { deleteArtist } from "@/services/artistService";
import { updateArtist } from "@/services/artistService";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const createArtistSchema = z.object({
  name: z.string().trim().min(1, "Nome do artista é obrigatório"),
});

const updateArtistSchema = z.object({
  id: z.string().min(1, "Artista inválido"),
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

  try {
    await createArtist({
      name: result.data.name,
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
    imageUrl: formData.get("imageUrl"),
  };

  const result = updateArtistSchema.safeParse(rawData);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados inválidos",
    };
  }

  await updateArtist({
    id: result.data.id,
    name: result.data.name,
    imageUrl: result.data.imageUrl,
  });

  revalidatePath("/dashboard/artist");

  return {
    success: true,
    message: "Artista atualizado com sucesso",
  };
}
