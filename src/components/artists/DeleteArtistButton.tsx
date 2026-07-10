"use client";

import { deleteArtistAction } from "@/app/dashboard/artists/actions";
import { useState } from "react";
import toast from "react-hot-toast";

type DeleteArtistButtonProps = {
  artistId: string;
  artistName: string;
};

export function DeleteArtistButton({
  artistId,
  artistName,
}: DeleteArtistButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const result = await deleteArtistAction(artistId);

    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setIsOpen(false);
      return;
    }

    toast.error("Erro ao excluir artista");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
      >
        Excluir
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          {" "}
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">
              Excluir artista
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium text-slate-900">{artistName}</span>?
              Essa ação não pode ser desfeita.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
