import { prisma } from "@/lib/prisma";

type creatArtistInput = {
  name: string;
  imageUrl?: string;
};

export async function CreatArtist(data: creatArtistInput) {
  const artist = await prisma.artist.create({
    data: {
      name: data.name,
      imageUrl: data.imageUrl,
    },
  });
  return artist;
}
