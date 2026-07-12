import { getAlbums } from "@/services/albumService";
import { getArtists } from "@/services/artistService";
import { CreateAlbumButton } from "@/components/albums/CreateAlbumButton";
import Image from "next/image";
import { EditAlbumButton } from "@/components/albums/EditAlbumButton";
import { DeleteAlbumButton } from "@/components/albums/DeleteAlbumButton";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { requireAdmin } from "@/utils/requireAdmin";
export default async function AlbumsPage() {
  const session = await requireAdmin();

  const [albums, artists] = await Promise.all([getAlbums(), getArtists()]);
  return (
    <>
      <DashboardPageHeader
        title="Álbuns"
        description="Gerencie os álbuns cadastrados."
        action={<CreateAlbumButton artists={artists} />}
      />

      <DashboardCard>
        {albums.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Nenhum álbum cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {albums.map((album) => (
              <li
                key={album.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                    {album.coverUrl ? (
                      <Image
                        src={album.coverUrl}
                        alt={album.title}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-400">
                        sem capa
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {album.title}
                    </p>
                    <p className="text-xs text-slate-400">
                      {album.artist.name}
                    </p>

                    {album.releaseYear && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {album.releaseYear}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <EditAlbumButton
                    album={{
                      id: album.id,
                      title: album.title,
                      artistId: album.artistId,
                      releaseYear: album.releaseYear,
                    }}
                    artists={artists}
                  />

                  <DeleteAlbumButton
                    albumId={album.id}
                    albumTitle={album.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </DashboardCard>
    </>
  );
}
