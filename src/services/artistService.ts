import { prisma } from "@/lib/prisma";

type CreatArtistInput = {
  name: string;
  imageUrl?: string;
};

type UpdateArtistInput = {
  id: string;
  name: string;
  imageUrl?: string;
};
export async function createArtist(data: CreatArtistInput) {
  const normalizedName = data.name.trim().toLowerCase();

  const artist = await prisma.artist.create({
    data: {
      name: data.name.trim(),
      normalizedName,
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
      normalizedName,
    },
  });

  return artist;
}
