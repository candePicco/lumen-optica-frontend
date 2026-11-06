// Funciones para hablar con la API de Django.
// Se usan desde el servidor y desde el navegador, por eso no lleva "use client".

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Mensaje para cuando la respuesta no trae uno propio.
function mensajePorEstado(status) {
  if (status === 401) return "Tenés que iniciar sesión para hacer esto.";
  if (status === 403) return "No tenés permiso para hacer esto.";
  if (status === 404) return "No se encontró lo que buscabas.";
  if (status >= 500) return "Ocurrió un error en el servidor. Intentá más tarde.";
  return "No se pudo completar la operación.";
}

// Devuelve el cuerpo de la respuesta, o tira un error con `status`.
async function leerRespuesta(res) {
  if (res.ok) {
    // DELETE responde 204 sin cuerpo.
    if (res.status === 204) return null;
    return res.json();
  }

  const error = new Error(mensajePorEstado(res.status));
  error.status = res.status;

  // Un 500 puede venir como página HTML: solo se lee el cuerpo si es JSON.
  const tipo = res.headers.get("content-type") || "";
  if (tipo.includes("application/json")) {
    const cuerpo = await res.json();
    if (res.status === 400) {
      // Errores por campo { campo: [mensajes] }, los que espera ProductoForm.
      error.message = "Revisá los datos del formulario.";
      error.fields = cuerpo;
    } else if (cuerpo.detail) {
      error.message = cuerpo.detail;
    }
  }

  throw error;
}

// ---------- Lecturas públicas ----------
// Van sin token: un token inválido haría fallar la lectura con 401.

export async function obtenerProductos({ search, page } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (page) params.set("page", page);

  const consulta = params.toString();
  const url = `${API_URL}/api/productos/${consulta ? `?${consulta}` : ""}`;

  const res = await fetch(url, { cache: "no-store" });
  return leerRespuesta(res);
}

export async function obtenerProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}/`, {
    cache: "no-store",
  });
  return leerRespuesta(res);
}

// Recorre todas las páginas de un listado y devuelve los resultados juntos.
// La URL se arma acá: el `next` de la API es absoluto y en producción
// podría venir como http y quedar bloqueado por contenido mixto.
export async function obtenerTodos(ruta) {
  let resultados = [];
  let pagina = 1;
  let hayMas = true;

  while (hayMas) {
    const res = await fetch(`${API_URL}${ruta}?page=${pagina}`, {
      cache: "no-store",
    });
    const datos = await leerRespuesta(res);

    resultados = resultados.concat(datos.results);
    hayMas = Boolean(datos.next);
    pagina += 1;
  }

  return resultados;
}

// Listas para los selects del formulario de producto.
export async function obtenerOpcionesProducto() {
  const [categorias, marcas, proveedores] = await Promise.all([
    obtenerTodos("/api/categorias/"),
    obtenerTodos("/api/marcas/"),
    obtenerTodos("/api/proveedores/"),
  ]);

  return { categorias, marcas, proveedores };
}

// ---------- Escrituras protegidas ----------
// Reciben el authFetch de useAuth(), que agrega API_URL y el token.
// Por eso las rutas son relativas.

export async function crearProducto(authFetch, datos) {
  const res = await authFetch("/api/productos/", {
    method: "POST",
    body: JSON.stringify(datos),
  });
  return leerRespuesta(res);
}

export async function actualizarProducto(authFetch, id, datos) {
  const res = await authFetch(`/api/productos/${id}/`, {
    method: "PUT",
    body: JSON.stringify(datos),
  });
  return leerRespuesta(res);
}

export async function eliminarProducto(authFetch, id) {
  const res = await authFetch(`/api/productos/${id}/`, { method: "DELETE" });
  return leerRespuesta(res);
}
