/*
  Warnings:

  - A unique constraint covering the columns `[normalizedName]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedName` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "normalizedName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_normalizedName_key" ON "Artist"("normalizedName");
