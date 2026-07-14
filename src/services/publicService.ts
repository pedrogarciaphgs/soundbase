import { prisma } from "@/lib/prisma";

export async function getPublicHomeData() {
  const songs = await prisma.song.findMany({
    take: 6,
    include: {
      album: {
        include: {
          artist: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    songs,
  };
}
export async function getPublicSongById(id: string) {
  const song = await prisma.song.findUnique({
    where: {
      id,
    },
    include: {
      album: {
        include: {
          artist: true,
        },
      },
    },
  });

  return song;
}
