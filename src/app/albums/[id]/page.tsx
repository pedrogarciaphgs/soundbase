import { PublicNav } from "@/components/public/PublicNav";
import { SongPlayer } from "@/components/songs/SongPlayer";
import { getPublicAlbumById } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type AlbumDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AlbumDetailsPage({
  params,
}: AlbumDetailsPageProps) {
  const { id } = await params;

  const album = await getPublicAlbumById(id);

  if (!album) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PublicNav />
        <Link
          href="/albums"
          className="mb-6 inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Voltar para álbuns
        </Link>

        <section className="mb-8 grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[280px_1fr]">
          <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {album.coverUrl ? (
              <Image
                src={album.coverUrl}
                alt={album.title}
                width={560}
                height={560}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                Sem capa
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Álbum
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {album.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {album.artist.name}
              {album.releaseYear ? ` • ${album.releaseYear}` : ""}
            </p>

            <p className="mt-4 text-sm text-slate-400">
              {album.songs.length} música(s)
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Músicas</h2>

          {album.songs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Nenhuma música cadastrada neste álbum.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {album.songs.map((song) => (
                <article
                  key={song.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-3">
                    <Link
                      href={`/songs/${song.id}`}
                      className="text-sm font-semibold text-slate-900 transition hover:text-slate-600"
                    >
                      {song.title}
                    </Link>

                    <p className="mt-1 font-mono text-xs text-slate-400">
                      {Math.floor(song.duration / 60)}:
                      {(song.duration % 60).toString().padStart(2, "0")}
                    </p>
                  </div>

                  <SongPlayer
                    audioUrl={song.audioUrl}
                    duration={song.duration}
                  />
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
