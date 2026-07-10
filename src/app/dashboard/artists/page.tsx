import { CreateArtistButton } from "@/components/artists/CreateArtistButton";
import { authOptions } from "@/lib/auth";
import { getArtists } from "@/services/artistService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
                <li key={artist.id} className="p-4 text-sm text-slate-900">
                  {artist.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
