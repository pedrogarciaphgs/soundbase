import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [
    artistsCount,
    albumsCount,
    songsCount,
    latestArtists,
    latestAlbums,
    latestSongs,
  ] = await Promise.all([
    prisma.artist.count(),
    prisma.album.count(),
    prisma.song.count(),

    prisma.artist.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.album.findMany({
      take: 3,
      include: {
        artist: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.song.findMany({
      take: 3,
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
    }),
  ]);

  return {
    artistsCount,
    albumsCount,
    songsCount,
    latestArtists,
    latestAlbums,
    latestSongs,
  };
}
