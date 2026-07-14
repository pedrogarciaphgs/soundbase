import Link from "next/link";

const bars = [18, 32, 24, 44, 28, 38, 20, 48, 30, 40, 22, 34];

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-slate-900/5 blur-2xl" />

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
          <div className="relative flex h-14 items-end gap-1">
            {bars.map((height, index) => (
              <span
                key={index}
                className="w-1.5 rounded-full bg-slate-900"
                style={{
                  height: `${height}px`,
                  animation: `sound-wave 900ms ease-in-out infinite`,
                  animationDelay: `${index * 80}ms`,
                }}
              />
            ))}
          </div>
        </div>

        <p className="font-mono text-sm font-semibold text-slate-400">404</p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Ops!!!
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          A página que você tentou acessar não existe ou saiu da playlist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Voltar para o início
        </Link>

        <style>{`
          @keyframes sound-wave {
            0%, 100% {
              transform: scaleY(0.45);
              opacity: 0.45;
            }

            50% {
              transform: scaleY(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </main>
  );
}
