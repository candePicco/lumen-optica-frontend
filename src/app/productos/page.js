
import CatalogoProductos from "@/components/CatalogoProductos";

export const metadata = {
  title: "Productos | Lumen Óptica",
};

const API_URL = (
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

async function obtenerDatos(ruta) {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    cache: "no-store",
  });

  if (!respuesta.ok) {
    throw new Error(`Error al consultar ${ruta}`);
  }

  const datos = await respuesta.json();

  return Array.isArray(datos) ? datos : datos.results || [];
}

export default async function ProductosPage() {
  let productos = null;
  let imagenes = [];

  try {
    productos = await obtenerDatos("/api/productos/");
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }

  try {
    imagenes = await obtenerDatos("/api/imagenes-producto/");
  } catch (error) {
    console.error("Error al cargar imágenes:", error);
  }

  const productosConImagen = (productos || []).map((producto) => {
    const imagenesProducto = imagenes.filter(
      (imagen) => Number(imagen.producto) === Number(producto.id)
    );

    const imagenPrincipal =
      imagenesProducto.find((imagen) => imagen.principal) ||
      imagenesProducto[0];

    return {
      ...producto,
      imagenUrl: imagenPrincipal?.imagen || null,
    };
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-[#073b63] to-emerald-700 px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-bold">
          Nuestros productos
        </h1>

        <p className="mt-4 text-lg text-white/85">
          Descubrí nuestra colección de anteojos y accesorios.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {productos === null ? (
          <div className="rounded-xl bg-white p-8 text-center text-slate-700">
            No pudimos conectar con el catálogo.
          </div>
        ) : (
          <CatalogoProductos productos={productosConImagen} />
        )}
      </section>
    </main>
  );
}
