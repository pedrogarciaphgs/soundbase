import { PublicNav } from "@/components/public/PublicNav";
import { SongPlayer } from "@/components/songs/SongPlayer";
import { getPublicSongById } from "@/services/publicService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type SongDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SongDetailsPage({
  params,
}: SongDetailsPageProps) {
  const { id } = await params;

  const song = await getPublicSongById(id);

  if (!song) {
    notFound();
  }

  const coverUrl = song.coverUrl ?? song.album.coverUrl;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <PublicNav />
        <Link
          href="/"
          className="mb-6 inline-flex text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Voltar para início
        </Link>

        <section className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[280px_1fr]">
          <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={song.title}
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
              Música
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {song.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {song.album.title} • {song.album.artist.name}
            </p>

            <div className="mt-6">
              <SongPlayer audioUrl={song.audioUrl} duration={song.duration} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
