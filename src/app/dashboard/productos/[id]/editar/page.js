import Link from "next/link";
import { notFound } from "next/navigation";
import EditorProducto from "@/components/EditorProducto";
import { obtenerOpcionesProducto, obtenerProducto } from "@/lib/api";

// Edición de producto. El detalle trae categoria, marca y proveedor como ids,
// que es lo que espera ProductoForm.
export default async function EditarProductoPage({ params }) {
  const { id } = await params;

  if (!/^[1-9]\d*$/.test(id)) notFound();

  const [producto, opciones] = await Promise.all([
    // Solo el 404 del producto es "no encontrado". Los demás errores van a error.js.
    obtenerProducto(id).catch((error) => {
      if (error.status === 404) return null;
      throw error;
    }),
    obtenerOpcionesProducto(),
  ]);

  if (!producto) notFound();

  return (
    <main className="min-h-[70vh] bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-[#073b63]">Editar producto</h1>

          <Link
            href="/dashboard/productos"
            className="font-medium text-emerald-700 hover:underline"
          >
            Volver al listado
          </Link>
        </div>

        <div className="mt-6">
          <EditorProducto producto={producto} {...opciones} />
        </div>
      </div>
    </main>
  );
}
