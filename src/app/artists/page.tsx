import { getPublicArtists } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublicArtistsPage() {
  const artists = await getPublicArtists();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              SoundBase
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Artistas
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Explore os artistas cadastrados na plataforma.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </Link>
        </header>

        {artists.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Nenhum artista cadastrado ainda.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => {
              const songsCount = artist.albums.reduce(
                (total, album) => total + album.songs.length,
                0
              );

              return (
                <article
                  key={artist.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                      {artist.imageUrl ? (
                        <Image
                          src={artist.imageUrl}
                          alt={artist.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-slate-400">
                          {artist.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        {artist.name}
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        {artist.albums.length} álbum(ns) • {songsCount}{" "}
                        música(s)
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
