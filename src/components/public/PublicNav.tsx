import Link from "next/link";

export function PublicNav() {
  return (
    <header className="mb-10 flex items-center justify-between gap-4">
      <Link
        href="/"
        className="text-lg font-bold tracking-tight text-slate-900"
      >
        SoundBase
      </Link>

      <nav className="flex items-center gap-3">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Início
        </Link>

        <Link
          href="/artists"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Artistas
        </Link>

        <Link
          href="/albums"
          className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          Álbuns
        </Link>

        <Link
          href="/dashboard"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Backoffice
        </Link>
      </nav>
    </header>
  );
}
