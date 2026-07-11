import { prisma } from "@/lib/prisma";

type CreateAlbumInput = {
  title: string;
  coverUrl?: string;
  releaseYear?: number;
  artistId: string;
};

type UpdateAlbumInput = {
  id: string;
  title: string;
  coverUrl?: string;
  releaseYear?: number;
  artistId: string;
};

export async function createAlbum(data: CreateAlbumInput) {
  const album = await prisma.album.create({
    data: {
      title: data.title.trim(),
      coverUrl: data.coverUrl,
      releaseYear: data.releaseYear,
      artistId: data.artistId,
    },
  });

  return album;
}

export async function getAlbums() {
  const albums = await prisma.album.findMany({
    include: {
      artist: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return albums;
}

export async function updateAlbum(data: UpdateAlbumInput) {
  const album = await prisma.album.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title.trim(),
      artistId: data.artistId,
      releaseYear: data.releaseYear,
      ...(data.coverUrl && { coverUrl: data.coverUrl }),
    },
  });

  return album;
}

export async function deleteAlbum(id: string) {
  const album = await prisma.album.delete({
    where: {
      id,
    },
  });

  return album;
}
