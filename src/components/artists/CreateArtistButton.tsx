"use client";
import toast from "react-hot-toast";
import { createArtistAction } from "@/app/dashboard/artists/actions";
import { useState } from "react";

export function CreateArtistButton() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const result = await createArtistAction(formData);

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
        className="rounded-xl bg-slate-900  px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Novo artista
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Novo artista
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Cadastre um artista na sua biblioteca.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  // required
                  placeholder="Ex: ALOK"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>

              <div>
                <label
                  htmlFor="imageUrl"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  URL da imagem externa
                </label>
                <input
                  id="imageUrl"
                  name="imageUrl"
                  type="text"
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
                />
              </div>
              <div>
                <label
                  htmlFor="imageFile"
                  className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                >
                  Imagem local
                </label>

                <input
                  id="imageFile"
                  name="imageFile"
                  type="file"
                  accept="image/png,image/jpeg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Formato: PNG ou JPEG.
                </p>
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
