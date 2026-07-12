import { getDashboardStats } from "@/services/dashboardService";
import { requireAdmin } from "@/utils/requireAdmin";

const STAT_CARDS_CONFIG = [
  { key: "artistsCount", label: "Artistas" },
  { key: "albumsCount", label: "Álbuns" },
  { key: "songsCount", label: "Músicas" },
] as const;

function barHeight(i: number) {
  const wave = Math.sin(i * 0.7) * 0.5 + Math.sin(i * 1.9) * 0.3;
  return 8 + Math.round((wave + 1) * 14);
}

function meterLevel(value: number) {
  return Math.min(12, Math.max(2, (value % 10) + 2));
}

export default async function DashboardPage() {
  const session = await requireAdmin();

  const stats = await getDashboardStats();

  const statValues = {
    artistsCount: stats.artistsCount,
    albumsCount: stats.albumsCount,
    songsCount: stats.songsCount,
  };

  return (
    <>
      <div className="relative mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="pointer-events-none absolute inset-x-0 top-0 flex h-16 items-end gap-[3px] opacity-[0.08]">
          {Array.from({ length: 48 }).map((_, i) => (
            <span
              key={i}
              className="w-full rounded-t-sm bg-slate-900"
              style={{ height: `${barHeight(i)}px` }}
            />
          ))}
        </div>

        <span className="relative font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
          Painel
        </span>

        <h1 className="relative mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="relative mt-1 text-sm text-slate-500">
          Bem-vindo, {session.user.name}. Veja um resumo da SoundBase.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-3">
        {STAT_CARDS_CONFIG.map(({ key, label }) => {
          const value = statValues[key];
          const level = meterLevel(value);

          return (
            <div
              key={key}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span
                className="absolute inset-y-0 left-0 w-1 bg-slate-900"
                aria-hidden
              />

              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {label}
              </p>

              <p className="mt-3 font-mono text-4xl font-semibold tabular-nums text-slate-900">
                {String(value).padStart(2, "0")}
              </p>

              <div className="mt-4 flex gap-[3px]" aria-hidden>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-3 w-full rounded-sm ${
                      i < level ? "bg-slate-900" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Últimos artistas
            </h2>

            <span className="font-mono text-xs text-slate-400">
              {String(stats.latestArtists.length).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-3">
            {stats.latestArtists.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhum artista cadastrado ainda.
              </p>
            ) : (
              stats.latestArtists.map((artist, i) => (
                <div key={artist.id} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <p className="text-sm text-slate-700">{artist.name}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Últimos álbuns
            </h2>

            <span className="font-mono text-xs text-slate-400">
              {String(stats.latestAlbums.length).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-3">
            {stats.latestAlbums.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhum álbum cadastrado ainda.
              </p>
            ) : (
              stats.latestAlbums.map((album, i) => (
                <div key={album.id} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm text-slate-700">{album.title}</p>
                    <p className="text-xs text-slate-400">
                      {album.artist.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Últimas músicas
            </h2>

            <span className="font-mono text-xs text-slate-400">
              {String(stats.latestSongs.length).padStart(2, "0")}
            </span>
          </div>

          <div className="space-y-3">
            {stats.latestSongs.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nenhuma música cadastrada ainda.
              </p>
            ) : (
              stats.latestSongs.map((song, i) => (
                <div key={song.id} className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p className="text-sm text-slate-700">{song.title}</p>
                    <p className="text-xs text-slate-400">
                      {song.album.title} • {song.album.artist.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
