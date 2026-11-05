import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold text-emerald-700">
            Lumen <span className="text-blue-700">Óptica</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Una nueva forma de ver el mundo.
            Encontrá los anteojos ideales para vos.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            Navegación
          </h3>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/">Inicio</Link>
            <Link href="/productos">Productos</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            Sobre nosotros
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            En Lumen Óptica combinamos estilo,
            comodidad y calidad para acompañarte
            en cada mirada.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Lumen Óptica.
        Todos los derechos reservados.
      </div>
    </footer>
  );
}