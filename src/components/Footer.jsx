
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        {/* IDENTIDAD */}
        <div>
          <Link
            href="/"
            className="text-xl font-bold text-[#073b63]"
          >
            Lumen <span className="text-emerald-700">Óptica</span>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-600">
            Una nueva forma de ver el mundo.
            Encontrá los anteojos ideales para vos,
            combinando estilo, comodidad y calidad.
          </p>
        </div>

        {/* NAVEGACIÓN */}
        <div>
          <h2 className="mb-5 text-base font-bold text-[#073b63]">
            Navegación
          </h2>

          <nav
            aria-label="Navegación del pie de página"
            className="flex flex-col items-start gap-3 text-sm"
          >
            <Link
              href="/"
              className="text-slate-600 transition hover:text-emerald-700"
            >
              Inicio
            </Link>

            <Link
              href="/productos"
              className="text-slate-600 transition hover:text-emerald-700"
            >
              Productos
            </Link>

            <Link
              href="/contacto"
              className="text-slate-600 transition hover:text-emerald-700"
            >
              Contacto
            </Link>

            <Link
              href="/preguntas-frecuentes"
              className="text-slate-600 transition hover:text-emerald-700"
            >
              Preguntas frecuentes
            </Link>
          </nav>
        </div>

        {/* SOBRE NOSOTROS */}
        <div>
          <h2 className="mb-5 text-base font-bold text-[#073b63]">
            Sobre nosotros
          </h2>

          <p className="text-sm leading-7 text-slate-600">
            En Lumen Óptica combinamos estilo,
            comodidad y calidad para acompañarte
            en cada mirada.
          </p>

          <Link
            href="/contacto"
            className="mt-5 inline-block text-sm font-semibold text-emerald-700 transition hover:underline"
          >
            ¿Tenés alguna consulta? Contactanos
          </Link>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-200 px-6 py-5">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Lumen Óptica.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
