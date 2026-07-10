import { prisma } from "@/lib/prisma";

type creatArtistInput = {
  name: string;
  imageUrl?: string;
};

export async function createArtist(data: creatArtistInput) {
  const artist = await prisma.artist.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
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
