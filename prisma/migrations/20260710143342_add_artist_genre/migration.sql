-- CreateEnum
CREATE TYPE "MusicGenre" AS ENUM ('POP', 'ROCK', 'HIP_HOP', 'RAP', 'TRAP', 'ELECTRONIC', 'FUNK', 'SERTANEJO', 'MPB', 'REGGAETON', 'OTHER');

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "genre" "MusicGenre";
