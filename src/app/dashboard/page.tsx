import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { name, email, role } = session.user;
  const initials = name
    ?.split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Dashboard
            </h1>

            <LogoutButton />
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Visão geral da sua conta
          </p>
        </div>

        {/* Card de boas-vindas */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-950 text-lg font-semibold text-white">
            {initials || "?"}
          </div>
          <div>
            <p className="text-lg font-medium text-slate-900">
              Bem-vindo, {name}
            </p>
            <p className="text-sm text-slate-500">
              Que bom te ver por aqui novamente
            </p>
          </div>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email
            </p>
            <p className="mt-2 truncate text-sm font-medium text-slate-900">
              {email}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Perfil
            </p>
            <span className="mt-2 inline-flex items-center rounded-full bg-slate-900/5 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {role}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
