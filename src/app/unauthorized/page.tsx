import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-mono text-sm font-semibold text-slate-400">403</p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
          Acesso negado
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Você não tem permissão para acessar esta área.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Voltar para o início
        </Link>
      </div>
    </main>
  );
}
