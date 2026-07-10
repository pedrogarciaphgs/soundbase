import { prisma } from "@/lib/prisma";

type CreateAlbumInput = {
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
