import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <DashboardNav />

        {children}
      </div>
    </main>
  );
}
