"use client";

import { useState } from "react";
import type React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});
export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const result = loginSchema.safeParse(rawData);

    if (!result.success) {
      setLoading(false);
      toast.error(result.error.issues[0]?.message ?? "Dados inválidos");
      return;
    }

    const response = await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      redirect: false,
    });

    setLoading(false);

    if (!response?.ok) {
      toast.error("E-mail ou senha inválidos");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Entrar
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Acesse sua conta para continuar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {error && (
            <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="exemplo@soundbase.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-900/5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
