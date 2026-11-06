
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function CatalogoProductos({ productos = [] }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [marca, setMarca] = useState("todas");

  const disponibles = useMemo(
    () => productos.filter((p) => p.activo !== false),
    [productos]
  );

  const categorias = useMemo(
    () => [
      ...new Set(
        disponibles
          .map((p) => p.categoria?.nombre)
          .filter(Boolean)
      ),
    ],
    [disponibles]
  );

  const marcas = useMemo(
    () => [
      ...new Set(
        disponibles
          .map((p) => p.marca?.nombre)
          .filter(Boolean)
      ),
    ],
    [disponibles]
  );

  const filtrados = useMemo(() => {
    return disponibles.filter((p) => {
      const texto = [
        p.nombre,
        p.descripcion,
        p.categoria?.nombre,
        p.marca?.nombre,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const coincideBusqueda = texto.includes(
        busqueda.trim().toLowerCase()
      );

      const coincideCategoria =
        categoria === "todas" ||
        p.categoria?.nombre === categoria;

      const coincideMarca =
        marca === "todas" ||
        p.marca?.nombre === marca;

      return (
        coincideBusqueda &&
        coincideCategoria &&
        coincideMarca
      );
    });
  }, [disponibles, busqueda, categoria, marca]);

  function limpiarFiltros() {
    setBusqueda("");
    setCategoria("todas");
    setMarca("todas");
  }

  return (
    <div>
      {/* BUSCADOR Y FILTROS */}
      <section className="mb-10 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold text-[#073b63]">
          Encontrá tus anteojos ideales
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="search"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-600"
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            aria-label="Filtrar por categoría"
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-emerald-600"
          >
            <option value="todas">
              Todas las categorías
            </option>

            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            aria-label="Filtrar por marca"
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-emerald-600"
          >
            <option value="todas">
              Todas las marcas
            </option>

            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={limpiarFiltros}
          className="mt-5 text-sm font-semibold text-emerald-700 hover:underline"
        >
          Limpiar filtros
        </button>
      </section>

      {/* CANTIDAD DE PRODUCTOS */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {filtrados.length}{" "}
          {filtrados.length === 1
            ? "producto encontrado"
            : "productos encontrados"}
        </p>
      </div>

      {/* PRODUCTOS */}
      {filtrados.length === 0 ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
          <span className="text-5xl">🔎</span>

          <h3 className="mt-4 text-xl font-bold text-[#073b63]">
            No encontramos productos
          </h3>

          <p className="mt-3 text-slate-600">
            Probá con otra búsqueda o cambiá los filtros.
          </p>

          <button
            type="button"
            onClick={limpiarFiltros}
            className="mt-6 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGEN REAL DEL PRODUCTO */}
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
                {p.imagenUrl ? (
                  <img
                    src={p.imagenUrl}
                    alt={p.nombre}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <span className="text-6xl">👓</span>
                )}

                {p.destacado && (
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
                    Destacado
                  </span>
                )}
              </div>

              {/* INFORMACIÓN */}
              <div className="p-6">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {p.marca?.nombre || "Lumen Óptica"}
                </p>

                <h3 className="text-xl font-bold text-[#073b63]">
                  {p.nombre}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
                  {p.descripcion ||
                    "Descubrí este producto de Lumen Óptica."}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  {p.categoria?.nombre || "Anteojos y accesorios"}
                </p>

                <p className="mt-5 text-2xl font-bold text-emerald-700">
                  $
                  {Number(p.precio).toLocaleString("es-AR", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })}
                </p>

                <p
                  className={`mt-2 text-sm font-medium ${
                    Number(p.stock) > 0
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                >
                  {Number(p.stock) > 0
                    ? "Disponible"
                    : "Sin stock"}
                </p>

                <Link
                  href={`/productos/${p.id}`}
                  className="mt-6 block rounded-xl bg-[#073b63] px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
                >
                  Ver detalle
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
