"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const accesos = [
  {
    href: "/dashboard/productos",
    numero: "01",
    titulo: "Productos",
    detalle: "Consultá y gestioná el catálogo de la óptica.",
    accion: "Ir a productos",
  },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <main className="flex-1 bg-slate-50 px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10">
        <header className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Lumen Óptica · Administración
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Hola{user?.username ? `, ${user.username}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Desde acá podés acceder a las herramientas de gestión de la óptica.
            </p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-fit rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            Cerrar sesión
          </button>
        </header>

        <section aria-labelledby="accesos-titulo">
          <div className="mb-5">
            <h2 id="accesos-titulo" className="text-xl font-semibold text-slate-900">
              Accesos
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Elegí una sección para continuar.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {accesos.map((acceso) => (
              <article
                key={acceso.href}
                className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="text-sm font-semibold tracking-widest text-emerald-700">
                  {acceso.numero}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">
                  {acceso.titulo}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {acceso.detalle}
                </p>
                <Link
                  href={acceso.href}
                  className="mt-5 inline-flex w-fit items-center gap-2 font-semibold text-emerald-800 transition hover:text-emerald-600"
                >
                  {acceso.accion} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
