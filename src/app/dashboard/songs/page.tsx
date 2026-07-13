import { getSongs } from "@/services/songService";
import Image from "next/image";
import { getAlbums } from "@/services/albumService";
import { CreateSongButton } from "@/components/songs/CreateSongButton";
import { SongPlayer } from "@/components/songs/SongPlayer";
import { EditSongButton } from "@/components/songs/EditSongButton";
import { DeleteSongButton } from "@/components/songs/DeleteSongButton";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export default async function SongsPage() {
  const [songs, albums] = await Promise.all([getSongs(), getAlbums()]);

  return (
    <>
      <DashboardPageHeader
        title="Músicas"
        description="Gerencie as músicas cadastradas."
        action={<CreateSongButton albums={albums} />}
      />

      <DashboardCard>
        {songs.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            Nenhuma música cadastrada ainda.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {songs.map((song) => {
              const coverUrl = song.coverUrl ?? song.album.coverUrl;

              return (
                <li
                  key={song.id}
                  className="flex items-center justify-between gap-4 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-xl bg-slate-100">
                      {coverUrl ? (
                        <Image
                          src={coverUrl}
                          alt={song.title}
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
                        {song.title}
                      </p>

                      <p className="text-xs text-slate-400">
                        {song.album.title} • {song.album.artist.name}
                      </p>

                      <SongPlayer
                        audioUrl={song.audioUrl}
                        duration={song.duration}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <EditSongButton
                      song={{
                        id: song.id,
                        title: song.title,
                        albumId: song.albumId,
                        duration: song.duration,
                      }}
                      albums={albums}
                    />

                    <DeleteSongButton songId={song.id} songTitle={song.title} />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </DashboardCard>
    </>
  );
}
