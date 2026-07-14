import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <Image
          src="/soundbase-icon.png"
          alt="Logo Soundbase"
          width={56}
          height={56}
          className="mx-auto mb-4 rounded-2xl"
        />
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          SoundBase
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Gerencie artistas, álbuns e músicas em um só lugar.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Entrar
        </Link>
      </div>
    </main>
  );
}
