"use client";

import { useAuth } from "@/context/AuthContext";

// Página provisoria para probar el login. El dashboard real lo arma Juan.
export default function AdminPage() {
  const { user, logout } = useAuth();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-semibold">Panel de administración</h1>
      <p className="text-zinc-500">Sesión iniciada como {user?.username}</p>
      <button
        type="button"
        onClick={logout}
        className="rounded-md border border-zinc-300 px-4 py-2 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        Cerrar sesión
      </button>
    </main>
  );
}
