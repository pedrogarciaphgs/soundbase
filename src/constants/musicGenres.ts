import { MusicGenre } from "@prisma/client";

export const MUSIC_GENRES = [
  { value: MusicGenre.POP, label: "Pop" },
  { value: MusicGenre.ROCK, label: "Rock" },
  { value: MusicGenre.HIP_HOP, label: "Hip Hop" },
  { value: MusicGenre.RAP, label: "Rap" },
  { value: MusicGenre.TRAP, label: "Trap" },
  { value: MusicGenre.ELECTRONIC, label: "Eletrônica" },
  { value: MusicGenre.FUNK, label: "Funk" },
  { value: MusicGenre.SERTANEJO, label: "Sertanejo" },
  { value: MusicGenre.MPB, label: "MPB" },
  { value: MusicGenre.REGGAETON, label: "Reggaeton" },
  { value: MusicGenre.OTHER, label: "Outro" },
] as const;

export function formatGenre(genre: MusicGenre | string | null | undefined) {
  if (!genre) {
    return "Sem gênero";
  }

  return MUSIC_GENRES.find((item) => item.value === genre)?.label ?? genre;
}
