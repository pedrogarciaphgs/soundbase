import { PublicNav } from "@/components/public/PublicNav";
import { SongPlayer } from "@/components/songs/SongPlayer";
import { getPublicSongs } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PublicSongsPage() {
  const songs = await getPublicSongs();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PublicNav />

        <section className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Músicas
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Explore todas as músicas cadastradas na SoundBase.
          </p>
        </section>

        {songs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Nenhuma música cadastrada ainda.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {songs.map((song) => {
              const coverUrl = song.coverUrl ?? song.album.coverUrl;

              return (
                <article
                  key={song.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <Link
                      href={`/songs/${song.id}`}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100"
                    >
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={song.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          Sem capa
                        </div>
                      )}
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/songs/${song.id}`}
                        className="text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                      >
                        {song.title}
                      </Link>

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
