import Link from "next/link";
import EditorProducto from "@/components/EditorProducto";
import { obtenerOpcionesProducto } from "@/lib/api";

// Alta de producto. Las opciones de los selects son lecturas públicas.
export default async function NuevoProductoPage() {
  const opciones = await obtenerOpcionesProducto();

  return (
    <main className="min-h-[70vh] bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[#073b63]">Nuevo producto</h1>

          <Link
            href="/dashboard/productos"
            className="font-medium text-emerald-700 hover:underline"
          >
            Volver al listado
          </Link>
        </div>

        <div className="mt-6">
          <EditorProducto {...opciones} />
        </div>
      </div>
    </main>
  );
}
