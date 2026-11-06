"use client";

import { useRouter } from "next/navigation";
import ProductoForm from "@/components/ProductoForm";
import { useAuth } from "@/context/AuthContext";
import { actualizarProducto, crearProducto } from "@/lib/api";

// Une ProductoForm con la API. Hace falta este componente porque una página
// del servidor no puede pasarle funciones al formulario, y authFetch solo
// existe en el navegador.
export default function EditorProducto({
  producto,
  categorias,
  marcas,
  proveedores,
}) {
  const { authFetch } = useAuth();
  const router = useRouter();

  // Sin try/catch: si falla, el error llega a ProductoForm y lo muestra.
  const guardar = async (datos) => {
    if (producto) {
      await actualizarProducto(authFetch, producto.id, datos);
    } else {
      await crearProducto(authFetch, datos);
    }

    router.push("/dashboard/productos");
    router.refresh();
  };

  return (
    // Los inputs del formulario heredan este color y en modo oscuro tienen
    // fondo oscuro, por eso la tarjeta también cambia con el modo.
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
      <ProductoForm
        producto={producto}
        categorias={categorias}
        marcas={marcas}
        proveedores={proveedores}
        onSubmit={guardar}
        onCancel={() => router.push("/dashboard/productos")}
        submitLabel={producto ? "Guardar cambios" : "Crear producto"}
      />
    </div>
  );
}
