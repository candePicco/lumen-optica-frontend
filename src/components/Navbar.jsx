
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8 lg:px-12">

        {/* LOGO */}
        <Link
          href="/"
          className="flex shrink-0 items-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="Lumen Óptica"
            width={260}
            height={260}
            className="h-20 w-40 object-contain sm:h-24 sm:w-52 lg:h-28 lg:w-60"
            priority
          />
        </Link>

        {/* NAVEGACIÓN */}
        <div className="flex flex-wrap items-center justify-end gap-3 text-sm font-medium sm:gap-7">

          <Link
            href="/"
            className="text-slate-700 transition-colors hover:text-emerald-700"
          >
            Inicio
          </Link>

          <Link
            href="/productos"
            className="text-slate-700 transition-colors hover:text-emerald-700"
          >
            Productos
          </Link>

          <Link
            href="/contacto"
            className="text-slate-700 transition-colors hover:text-emerald-700"
          >
            Contacto
          </Link>

          <Link
            href="/login"
            className="rounded-xl bg-gradient-to-r from-emerald-700 to-teal-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-emerald-800 hover:to-teal-700 hover:shadow-lg"
          >
            Iniciar sesión
          </Link>

        </div>
      </nav>
    </header>
  );
}
