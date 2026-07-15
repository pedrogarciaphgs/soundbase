import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { LogoutButton } from "@/components/dashboard/LogoutButton";
import { requireAdmin } from "@/utils/requireAdmin";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              SoundBase
            </p>
            <h1 className="text-lg font-semibold text-slate-900">Backoffice</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Ver site
            </Link>

            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">
                {session.user.name}
              </p>
              <p className="text-xs text-slate-400">{session.user.role}</p>
            </div>

            <LogoutButton />
          </div>
        </div>

        <DashboardNav />

        {children}
      </div>
    </main>
  );
}
