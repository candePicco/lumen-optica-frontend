import Link from "next/link";

// Formulario GET: al buscar, la URL queda con ?search= y vuelve a la página 1.
export default function BuscadorProductos({ search }) {
  return (
    <form
      method="get"
      action="/dashboard/productos"
      className="flex flex-wrap items-center gap-3"
    >
      {/* key: al limpiar la búsqueda, el input se vuelve a crear vacío */}
      <input
        key={search}
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        className="w-full max-w-sm rounded-md border border-slate-300 bg-white px-3 py-2 outline-none focus:border-[#073b63]"
      />

      <button
        type="submit"
        className="rounded-md bg-[#073b63] px-4 py-2 font-medium text-white transition hover:bg-emerald-700"
      >
        Buscar
      </button>

      {search && (
        <Link
          href="/dashboard/productos"
          className="font-medium text-emerald-700 hover:underline"
        >
          Limpiar
        </Link>
      )}
    </form>
  );
}
