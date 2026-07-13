import { CreateArtistButton } from "@/components/artists/CreateArtistButton";
import { getArtists } from "@/services/artistService";
import { DeleteArtistButton } from "@/components/artists/DeleteArtistButton";
import { EditArtistButton } from "@/components/artists/EditArtistButtton";
import Image from "next/image";
import { formatGenre } from "@/constants/musicGenres";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <>
      <DashboardPageHeader
        title="Artistas"
        description="Gerencie os artistas cadastrados."
        action={<CreateArtistButton />}
      />

      <DashboardCard>
        {artists.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Nenhum artista cadastrado ainda.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-4">
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
                    <p className="text-xs text-slate-400">
                      {formatGenre(artist.genre)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <EditArtistButton artist={artist} />

                  <DeleteArtistButton
                    artistId={artist.id}
                    artistName={artist.name}
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
