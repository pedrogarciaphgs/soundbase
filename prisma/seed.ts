import { MusicGenre, Role } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { createUser } from "@/services/userService";

async function seedAdmin() {
  try {
    // Demo admin user for local development only
    const admin = await createUser({
      name: "Garcia",
      email: "garcia.admin@soundbase.com",
      password: "admin123",
      role: Role.ADMIN,
    });

    console.log("Admin user created:", admin.email);
  } catch {
    console.log("Admin user already exists");
  }
}

async function seedArtistsAndAlbums() {
  const linkinPark = await prisma.artist.upsert({
    where: {
      normalizedName: "linkin park",
    },
    update: {},
    create: {
      name: "Linkin Park",
      normalizedName: "linkin park",
      genre: MusicGenre.ROCK,
    },
  });

  const drake = await prisma.artist.upsert({
    where: {
      normalizedName: "drake",
    },
    update: {},
    create: {
      name: "Drake",
      normalizedName: "drake",
      genre: MusicGenre.HIP_HOP,
    },
  });

  const daftPunk = await prisma.artist.upsert({
    where: {
      normalizedName: "daft punk",
    },
    update: {},
    create: {
      name: "Daft Punk",
      normalizedName: "daft punk",
      genre: MusicGenre.ELECTRONIC,
    },
  });

  const albums = [
    {
      title: "Meteora",
      releaseYear: 2003,
      artistId: linkinPark.id,
    },
    {
      title: "Hybrid Theory",
      releaseYear: 2000,
      artistId: linkinPark.id,
    },
    {
      title: "Take Care",
      releaseYear: 2011,
      artistId: drake.id,
    },
    {
      title: "Random Access Memories",
      releaseYear: 2013,
      artistId: daftPunk.id,
    },
  ];

  for (const album of albums) {
    const alreadyExists = await prisma.album.findFirst({
      where: {
        title: album.title,
        artistId: album.artistId,
      },
    });

    if (alreadyExists) {
      console.log("Album already exists:", album.title);
      continue;
    }

    const createdAlbum = await prisma.album.create({
      data: album,
    });

    console.log("Album created:", createdAlbum.title);
  }

  console.log("Demo artists and albums seeded");
}

async function main() {
  await seedAdmin();
  await seedArtistsAndAlbums();
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
