
import Link from "next/link";
import { notFound } from "next/navigation";

const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

// Consultar datos del backend
async function obtenerJSON(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    const error = new Error(
      `Error HTTP ${respuesta.status}`
    );

    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}

// Convertir respuesta paginada en lista
function obtenerLista(datos) {
  if (Array.isArray(datos)) {
    return datos;
  }

  return Array.isArray(datos?.results)
    ? datos.results
    : [];
}

export default async function DetalleProducto({ params }) {
  const { id } = await params;

  // Validar el ID del producto
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let producto;

  // Obtener producto individual
  try {
    producto = await obtenerJSON(
      `/api/productos/${id}/`
    );
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }

    return (
      <main className="min-h-[70vh] bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-[#073b63]">
            No pudimos cargar el producto
          </h1>

          <p className="mt-3 text-slate-600">
            Revisá la conexión con el servidor e intentá
            nuevamente.
          </p>

          <Link
            href="/productos"
            className="mt-6 inline-block font-semibold text-emerald-700 hover:underline"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  let categoriaNombre = "Sin categoría";
  let marcaNombre = "Sin marca";
  let imagenUrl = null;

  // Obtener marca y categoría desde el listado
  try {
    const datos = await obtenerJSON("/api/productos/");
    const productos = obtenerLista(datos);

    const productoListado = productos.find(
      (p) => Number(p.id) === Number(id)
    );

    categoriaNombre =
      productoListado?.categoria?.nombre ||
      (typeof producto.categoria === "object"
        ? producto.categoria?.nombre
        : null) ||
      categoriaNombre;

    marcaNombre =
      productoListado?.marca?.nombre ||
      (typeof producto.marca === "object"
        ? producto.marca?.nombre
        : null) ||
      marcaNombre;
  } catch (error) {
    console.error(
      "Error al obtener categoría y marca:",
      error
    );
  }

  // Obtener imágenes reales del producto
  try {
    const datos = await obtenerJSON(
      "/api/imagenes-producto/"
    );

    const imagenes = obtenerLista(datos);

    const imagenesProducto = imagenes.filter(
      (imagen) =>
        Number(imagen.producto) === Number(id)
    );

    // Priorizar imagen principal.
    // Si no existe, utilizar la primera disponible.
    const imagenPrincipal =
      imagenesProducto.find(
        (imagen) => imagen.principal
      ) || imagenesProducto[0];

    imagenUrl = imagenPrincipal?.imagen || null;
  } catch (error) {
    console.error(
      "Error al obtener imagen del producto:",
      error
    );
  }

  const precio = Number(producto.precio);

  const precioFormateado = Number.isFinite(precio)
    ? precio.toLocaleString("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : "Consultar";

  const tieneStock = Number(producto.stock) > 0;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        {/* VOLVER */}
        <Link
          href="/productos"
          className="inline-flex items-center font-medium text-emerald-700 transition hover:underline"
        >
          ← Volver a productos
        </Link>

        {/* DETALLE DEL PRODUCTO */}
        <div className="mt-8 grid overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm md:grid-cols-2">
          {/* IMAGEN REAL */}
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 to-emerald-50">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt={producto.nombre}
                className="h-full max-h-[500px] w-full object-contain p-8"
              />
            ) : (
              <span className="text-8xl">👓</span>
            )}

            {producto.destacado && (
              <span className="absolute left-5 top-5 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white">
                Producto destacado
              </span>
            )}
          </div>

          {/* INFORMACIÓN */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {marcaNombre}
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#073b63] sm:text-4xl">
              {producto.nombre}
            </h1>

            <p className="mt-5 leading-7 text-slate-600">
              {producto.descripcion ||
                "Descubrí este producto de Lumen Óptica."}
            </p>

            {/* PRECIO */}
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">
                Precio
              </p>

              <p className="mt-1 text-3xl font-bold text-emerald-700">
                {Number.isFinite(precio)
                  ? `$${precioFormateado}`
                  : precioFormateado}
              </p>
            </div>

            {/* CARACTERÍSTICAS */}
            <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
              <div className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-slate-700">
                  Categoría
                </span>

                <span className="text-right text-slate-600">
                  {categoriaNombre}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-slate-700">
                  Marca
                </span>

                <span className="text-right text-slate-600">
                  {marcaNombre}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-slate-700">
                  Disponibilidad
                </span>

                <span
                  className={`text-right font-medium ${
                    tieneStock
                      ? "text-emerald-700"
                      : "text-red-600"
                  }`}
                >
                  {tieneStock
                    ? `${producto.stock} unidades disponibles`
                    : "Sin stock"}
                </span>
              </div>
            </div>

            {/* BOTÓN DE CONSULTA */}
            <Link
              href="/contacto"
              className="mt-10 block rounded-xl bg-[#073b63] px-6 py-4 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Consultar por este producto
            </Link>

            <p className="mt-4 text-center text-xs text-slate-500">
              ¿Tenés alguna duda? Estamos para ayudarte.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
