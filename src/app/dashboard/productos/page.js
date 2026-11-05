import Link from "next/link";
import { redirect } from "next/navigation";
import BuscadorProductos from "@/components/BuscadorProductos";
import Paginacion from "@/components/Paginacion";
import TablaProductos from "@/components/TablaProductos";
import { obtenerProductos } from "@/lib/api";

// Listado de productos del panel. No filtra por `activo`:
// el administrador también tiene que ver los productos inactivos.
export default async function ProductosPage({ searchParams }) {
  const params = await searchParams;

  const search = typeof params.search === "string" ? params.search : "";
  const page = /^[1-9]\d*$/.test(params.page) ? Number(params.page) : 1;

  let datos = null;

  try {
    datos = await obtenerProductos({ search, page });
  } catch (error) {
    // Un 404 es una página fuera de rango. Cualquier otro error va a error.js.
    if (error.status !== 404) throw error;
  }

  // Página fuera de rango (por ejemplo, después de borrar la última fila):
  // vuelve a la primera. redirect() tira una excepción, por eso va fuera del try.
  if (!datos) {
    redirect(
      search
        ? `/dashboard/productos?search=${encodeURIComponent(search)}`
        : "/dashboard/productos"
    );
  }

  return (
    <main className="min-h-[70vh] bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[#073b63]">Productos</h1>

          <Link
            href="/dashboard/productos/nuevo"
            className="rounded-xl bg-emerald-700 px-5 py-2 font-semibold text-white transition hover:bg-emerald-800"
          >
            Nuevo producto
          </Link>
        </div>

        <div className="mt-6">
          <BuscadorProductos search={search} />
        </div>

        <p className="mt-6 text-sm text-slate-600">
          {datos.count} {datos.count === 1 ? "producto" : "productos"}
        </p>

        <div className="mt-3">
          <TablaProductos productos={datos.results} />
        </div>

        <div className="mt-6">
          <Paginacion
            page={page}
            search={search}
            hayAnterior={Boolean(datos.previous)}
            haySiguiente={Boolean(datos.next)}
          />
        </div>
      </div>
    </main>
  );
}
