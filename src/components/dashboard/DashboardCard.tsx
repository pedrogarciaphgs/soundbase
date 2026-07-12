type DashboardCardProps = {
  children: React.ReactNode;
};

export function DashboardCard({ children }: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {children}
    </div>
  );
}
