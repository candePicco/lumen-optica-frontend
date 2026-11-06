import Link from "next/link";

// URLSearchParams codifica espacios y acentos de la búsqueda.
function hrefPagina(numero, search) {
  const params = new URLSearchParams();
  params.set("page", numero);
  if (search) params.set("search", search);
  return `/dashboard/productos?${params.toString()}`;
}

const enlaceClass = "font-medium text-emerald-700 hover:underline";

export default function Paginacion({ page, search, hayAnterior, haySiguiente }) {
  // Con una sola página no hay nada que mostrar.
  if (!hayAnterior && !haySiguiente) return null;

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-6">
      {hayAnterior && (
        <Link href={hrefPagina(page - 1, search)} className={enlaceClass}>
          ← Anterior
        </Link>
      )}

      <span className="text-sm text-slate-600">Página {page}</span>

      {haySiguiente && (
        <Link href={hrefPagina(page + 1, search)} className={enlaceClass}>
          Siguiente →
        </Link>
      )}
    </nav>
  );
}
