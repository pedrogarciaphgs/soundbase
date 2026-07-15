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
export async function getPublicArtists() {
  const artists = await prisma.artist.findMany({
    include: {
      albums: {
        include: {
          songs: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return artists;
}
export async function getPublicArtistById(id: string) {
  const artist = await prisma.artist.findUnique({
    where: {
      id,
    },
    include: {
      albums: {
        include: {
          songs: true,
        },
        orderBy: {
          releaseYear: "desc",
        },
      },
    },
  });

  return artist;
}
export async function getPublicAlbums() {
  const albums = await prisma.album.findMany({
    include: {
      artist: true,
      songs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return albums;
}
export async function getPublicAlbumById(id: string) {
  const album = await prisma.album.findUnique({
    where: {
      id,
    },
    include: {
      artist: true,
      songs: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return album;
}

export async function searchPublicSongs(query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const songs = await prisma.song.findMany({
    where: {
      OR: [
        {
          title: {
            contains: normalizedQuery,
            mode: "insensitive",
          },
        },
        {
          album: {
            title: {
              contains: normalizedQuery,
              mode: "insensitive",
            },
          },
        },
        {
          album: {
            artist: {
              name: {
                contains: normalizedQuery,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
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

  return songs;
}

export async function getPublicSongs() {
  const songs = await prisma.song.findMany({
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

  return songs;
}
