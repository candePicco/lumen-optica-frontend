import Link from "next/link";
import BotonEliminarProducto from "@/components/BotonEliminarProducto";

const celdaClass = "px-4 py-3";

function Insignia({ valor }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
        valor ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
      }`}
    >
      {valor ? "Sí" : "No"}
    </span>
  );
}

export default function TablaProductos({ productos }) {
  if (productos.length === 0) {
    return (
      <p className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#073b63] text-white">
          <tr>
            <th className={celdaClass}>Nombre</th>
            <th className={celdaClass}>Categoría</th>
            <th className={celdaClass}>Marca</th>
            <th className={celdaClass}>Precio</th>
            <th className={celdaClass}>Stock</th>
            <th className={celdaClass}>Activo</th>
            <th className={celdaClass}>Destacado</th>
            <th className={celdaClass}>Acciones</th>
          </tr>
        </thead>

        <tbody className="text-slate-700">
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t border-slate-200">
              <td className={`${celdaClass} font-medium text-[#073b63]`}>
                {producto.nombre}
              </td>
              <td className={celdaClass}>{producto.categoria.nombre}</td>
              <td className={celdaClass}>{producto.marca.nombre}</td>
              <td className={celdaClass}>
                {/* La API manda el precio como texto: "62000.00" */}
                $
                {Number(producto.precio).toLocaleString("es-AR", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className={celdaClass}>{producto.stock}</td>
              <td className={celdaClass}>
                <Insignia valor={producto.activo} />
              </td>
              <td className={celdaClass}>
                <Insignia valor={producto.destacado} />
              </td>
              <td className={celdaClass}>
                <div className="flex items-start gap-4">
                  <Link
                    href={`/dashboard/productos/${producto.id}/editar`}
                    className="font-medium text-emerald-700 hover:underline"
                  >
                    Editar
                  </Link>
                  <BotonEliminarProducto
                    id={producto.id}
                    nombre={producto.nombre}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
