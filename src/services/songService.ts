import { prisma } from "@/lib/prisma";

type CreateSongInput = {
  title: string;
  duration: number;
  audioUrl: string;
  coverUrl?: string;
  albumId: string;
};

export async function createSong(data: CreateSongInput) {
  const song = await prisma.song.create({
    data: {
      title: data.title.trim(),
      duration: data.duration,
      audioUrl: data.audioUrl,
      coverUrl: data.coverUrl,
      albumId: data.albumId,
    },
  });

  return song;
}

export async function getSongs() {
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
