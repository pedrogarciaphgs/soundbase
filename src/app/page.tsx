import { getPublicHomeData } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";
import { SongPlayer } from "@/components/songs/SongPlayer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { songs } = await getPublicHomeData();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              SoundBase
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Descubra músicas cadastradas na SoundBase
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Uma plataforma musical com artistas, álbuns e músicas gerenciados
              por um backoffice administrativo.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Acessar backoffice
          </Link>
        </header>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Últimas músicas
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Músicas adicionadas recentemente.
              </p>
            </div>
          </div>

          {songs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Nenhuma música cadastrada ainda.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {songs.map((song) => {
                const coverUrl = song.coverUrl ?? song.album.coverUrl;

                return (
                  <article
                    key={song.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={song.title}
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
                      <h3 className="text-sm font-semibold text-slate-900">
                        {song.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {song.album.title} • {song.album.artist.name}
                      </p>
                      <div className="mt-3">
                        <SongPlayer
                          audioUrl={song.audioUrl}
                          duration={song.duration}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
