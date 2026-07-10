import { CreateArtistButton } from "@/components/artists/CreateArtistButton";
import { authOptions } from "@/lib/auth";
import { getArtists } from "@/services/artistService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ArtistsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const artists = await getArtists();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Artistas
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Gerencie os artistas cadastrados.
            </p>
          </div>

          <CreateArtistButton />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {artists.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              Nenhum artista cadastrado ainda.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {artists.map((artist) => (
                <li key={artist.id} className="flex items-center gap-4 p-5">
                  <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                    {artist.imageUrl ? (
                      <Image
                        src={artist.imageUrl}
                        alt={artist.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-500">
                        {artist.name[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {artist.name}
                    </p>
                    <p className="text-xs text-slate-400">Artista</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
