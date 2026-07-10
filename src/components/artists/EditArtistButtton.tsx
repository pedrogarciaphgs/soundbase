"use client";

import { updateArtistAction } from "@/app/dashboard/artists/actions";
import { useState } from "react";
import toast from "react-hot-toast";
import type React from "react";
import { MUSIC_GENRES } from "@/constants/musicGenres";

type EditArtistButtonProps = {
  artist: {
    id: string;
    name: string;
    genre: string | null;
    imageUrl: string | null;
  };
};

export function EditArtistButton({ artist }: EditArtistButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await updateArtistAction(formData);

    if (result.success) {
      toast.success(result.message);
      setIsOpen(false);
      return;
    }

    toast.error(result.message);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Editar
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Editar artista
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Atualize os dados do artista.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="id" value={artist.id} />

              <div>
                <label
                  htmlFor={`name-${artist.id}`}
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Nome
                </label>
                <input
                  id={`name-${artist.id}`}
                  name="name"
                  type="text"
                  defaultValue={artist.name}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>
              <div>
                <label
                  htmlFor={`genre-${artist.id}`}
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Gênero musical
                </label>

                <select
                  id={`genre-${artist.id}`}
                  name="genre"
                  defaultValue={artist.genre ?? ""}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                >
                  <option value="">Selecione um gênero</option>
                  <option value="">Selecione um gênero</option>

                  {MUSIC_GENRES.map((genre) => (
                    <option key={genre.value} value={genre.value}>
                      {genre.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
