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
