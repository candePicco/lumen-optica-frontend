
"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error en Lumen Óptica:", error);
  }, [error]);

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-xl text-center">
        <div className="mb-6 text-7xl">⚠️</div>

        <h1 className="text-3xl font-bold text-[#073b63] sm:text-4xl">
          Algo no salió como esperábamos
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          Tuvimos un inconveniente al cargar esta sección.
          Podés intentar nuevamente o regresar al inicio.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-xl bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Intentar nuevamente
          </button>

          <Link
            href="/"
            className="rounded-xl border border-[#073b63] px-7 py-3 font-semibold text-[#073b63] transition hover:bg-slate-100"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-8 text-sm text-slate-400">
          Si el problema continúa, intentá nuevamente más tarde.
        </p>
      </div>
    </main>
  );
}
