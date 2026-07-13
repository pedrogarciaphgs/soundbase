"use client";

import { createSongAction } from "@/app/dashboard/songs/actions";
import toast from "react-hot-toast";
import { useState } from "react";

type CreateSongButtonProps = {
  albums: {
    id: string;
    title: string;
    artist: {
      name: string;
    };
  }[];
};

export function CreateSongButton({ albums }: CreateSongButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await createSongAction(formData);

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
        Nova música
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Nova música
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Cadastre uma música vinculada a um álbum.
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
                  placeholder="Ex: Numb"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>

              <div>
                <label
                  htmlFor="albumId"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Álbum
                </label>
                <select
                  id="albumId"
                  name="albumId"
                  defaultValue=""
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                >
                  <option value="">Selecione um álbum</option>

                  {albums.map((album) => (
                    <option key={album.id} value={album.id}>
                      {album.title} — {album.artist.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="duration"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Duração em segundos
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="minutes"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                    >
                      Minutos
                    </label>
                    <input
                      id="minutes"
                      name="minutes"
                      type="number"
                      min={0}
                      placeholder="Ex: 3"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="seconds"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                    >
                      Segundos
                    </label>
                    <input
                      id="seconds"
                      name="seconds"
                      type="number"
                      min={0}
                      max={59}
                      placeholder="Ex: 07"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="audioFile"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Arquivo de áudio
                </label>
                <input
                  id="audioFile"
                  name="audioFile"
                  type="file"
                  accept="audio/mpeg,audio/wav,audio/ogg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>

              <div>
                <label
                  htmlFor="coverFile"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Capa opcional
                </label>
                <input
                  id="coverFile"
                  name="coverFile"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-slate-800 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
                <p className="mt-1 text-xs text-slate-400">
                  Se não enviar, a música usa a capa do álbum.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
