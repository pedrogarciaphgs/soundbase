import { authOptions } from "@/lib/auth";
import { getAlbums } from "@/services/albumService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getArtists } from "@/services/artistService";
import { CreateAlbumButton } from "@/components/albums/CreateAlbumButton";

export default async function AlbumsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const [albums, artists] = await Promise.all([getAlbums(), getArtists()]);
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Álbuns
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Gerencie os álbuns cadastrados.
            </p>
          </div>
          <CreateAlbumButton artists={artists} />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          {albums.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              Nenhum álbum cadastrado ainda.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {albums.map((album) => (
                <li key={album.id} className="p-5">
                  <p className="text-sm font-medium text-slate-900">
                    {album.title}
                  </p>
                  <p className="text-xs text-slate-400">{album.artist.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
