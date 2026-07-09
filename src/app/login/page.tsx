"use client";

import type React from "react";
import { signIn } from "next-auth/react";

async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  const email = formData.get("email");
  const password = formData.get("password");

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.ok) {
    window.location.href = "/";
    return;
  }

  console.log("Invalid credentials");
}

export default function LoginPage() {
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" />
        <input name="password" type="password" />
        <button type="submit">Entrar </button>
      </form>
    </main>
  );
}
