import { PublicNav } from "@/components/public/PublicNav";
import { getPublicAlbums } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublicAlbumsPage() {
  const albums = await getPublicAlbums();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PublicNav />
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              SoundBase
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Álbuns
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Explore os álbuns cadastrados na plataforma.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </Link>
        </header>

        {albums.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Nenhum álbum cadastrado ainda.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/albums/${album.id}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                  {album.coverUrl ? (
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                      Sem capa
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h2 className="text-sm font-semibold text-slate-900">
                    {album.title}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {album.artist.name}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {album.songs.length} música(s)
                    {album.releaseYear ? ` • ${album.releaseYear}` : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
