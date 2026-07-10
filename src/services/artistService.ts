import { prisma } from "@/lib/prisma";
import { MusicGenre } from "@prisma/client";

type CreatArtistInput = {
  name: string;
  genre?: MusicGenre;
  imageUrl?: string;
};

type UpdateArtistInput = {
  id: string;
  name: string;
  imageUrl?: string;
  genre?: MusicGenre;
};
export async function createArtist(data: CreatArtistInput) {
  const normalizedName = data.name.trim().toLowerCase();

  const artist = await prisma.artist.create({
    data: {
      name: data.name.trim(),
      normalizedName,
      genre: data.genre,
      imageUrl: data.imageUrl,
    },
  });

  return artist;
}

export async function deleteArtist(id: string) {
  const artist = await prisma.artist.delete({
    where: {
      id,
    },
  });

  return artist;
}

export async function getArtists() {
  const artists = await prisma.artist.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return artists;
}

export async function updateArtist(data: UpdateArtistInput) {
  const normalizedName = data.name.trim().toLowerCase();

  const artist = await prisma.artist.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name.trim(),
      genre: data.genre,
      normalizedName,
    },
  });

  return artist;
}
