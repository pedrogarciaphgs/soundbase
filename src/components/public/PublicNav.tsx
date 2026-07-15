"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export function PublicNav() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  function handleSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  }
  const navItems = [
    {
      href: "/",
      label: "Início",
    },
    {
      href: "/artists",
      label: "Artistas",
    },
    {
      href: "/albums",
      label: "Álbuns",
    },
    {
      href: "/songs",
      label: "Músicas",
    },
  ];
  return (
    <header className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/soundbase-icon.png"
          alt="SoundBase"
          width={36}
          height={36}
          className="rounded-md"
        />

        <span className="text-xl font-bold tracking-tight text-slate-900">
          SoundBase
        </span>
      </Link>

      <form onSubmit={handleSearch} className="w-full lg:max-w-sm">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar músicas, álbuns ou artistas..."
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5"
          />

          <button
            type="submit"
            aria-label="Buscar"
            className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </form>

      <nav className="flex items-center gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition ${
                isActive
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

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
