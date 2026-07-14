import { PublicNav } from "@/components/public/PublicNav";
import { SongPlayer } from "@/components/songs/SongPlayer";
import { formatGenre } from "@/constants/musicGenres";
import { getPublicArtistById } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type ArtistDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ArtistDetailsPage({
  params,
}: ArtistDetailsPageProps) {
  const { id } = await params;

  const artist = await getPublicArtistById(id);

  if (!artist) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <PublicNav />
        <Link
          href="/artists"
          className="mb-6 inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Voltar para artistas
        </Link>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="h-24 w-24 overflow-hidden rounded-2xl bg-slate-100">
              {artist.imageUrl ? (
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-400">
                  {artist.name.charAt(0)}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Artista
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {artist.name}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {formatGenre(artist.genre)}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Álbuns e músicas
          </h2>

          {artist.albums.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">
                Nenhum álbum cadastrado para este artista.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {artist.albums.map((album) => (
                <article
                  key={album.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {album.title}
                    </h3>

                    {album.releaseYear && (
                      <p className="mt-1 text-xs text-slate-400">
                        {album.releaseYear}
                      </p>
                    )}
                  </div>

                  {album.songs.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      Nenhuma música cadastrada neste álbum.
                    </p>
                  ) : (
                    <ul className="space-y-3">
                      {album.songs.map((song) => (
                        <li
                          key={song.id}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <Link
                                href={`/songs/${song.id}`}
                                className="text-sm font-medium text-slate-900 transition hover:text-slate-600"
                              >
                                {song.title}
                              </Link>

                              <p className="mt-1 text-xs text-slate-400">
                                {Math.floor(song.duration / 60)}:
                                {(song.duration % 60)
                                  .toString()
                                  .padStart(2, "0")}
                              </p>
                            </div>
                          </div>

                          <SongPlayer
                            audioUrl={song.audioUrl}
                            duration={song.duration}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
