"use client";

import { useState } from "react";
import { createAlbumAction } from "@/app/dashboard/albums/actions";
import toast from "react-hot-toast";

type CreateAlbumButtonProps = {
  artists: {
    id: string;
    name: string;
  }[];
};

export function CreateAlbumButton({ artists }: CreateAlbumButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createAlbumAction(formData);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setIsOpen(false);
  }
  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Novo álbum
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Novo álbum
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Cadastre um álbum para um artista.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Título
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Ex: Meteora"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>

              <div>
                <label
                  htmlFor="artistId"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Artista
                </label>
                <select
                  id="artistId"
                  name="artistId"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                >
                  <option value="">Selecione um artista</option>

                  {artists.map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="releaseYear"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Ano de lançamento
                </label>
                <input
                  id="releaseYear"
                  name="releaseYear"
                  type="number"
                  placeholder="Ex: 2003"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>
              <div>
                <label
                  htmlFor="coverFile"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Capa do álbum
                </label>

                <input
                  id="coverFile"
                  name="coverFile"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
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
                  disabled={loading}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
