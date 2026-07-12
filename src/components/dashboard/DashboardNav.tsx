import Link from "next/link";

const navItems = [
  {
    href: "/dashboard/artists",
    label: "Artistas",
  },
  {
    href: "/dashboard/albums",
    label: "Álbuns",
  },
  {
    href: "/dashboard/songs",
    label: "Músicas",
  },
];

export function DashboardNav() {
  return (
    <nav className="mb-8 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
