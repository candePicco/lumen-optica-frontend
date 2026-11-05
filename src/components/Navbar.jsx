
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        {/* Logo de Lumen Óptica */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo.png"
            alt="Lumen Óptica"
            width={180}
            height={180}
            className="h-16 w-28 object-contain sm:w-36"
            priority
          />
        </Link>

        {/* Enlaces de navegación */}
        <div className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium sm:gap-6">
          <Link href="/" className="text-slate-700 hover:text-emerald-700">
            Inicio
          </Link>

          <Link href="/productos" className="text-slate-700 hover:text-emerald-700">
            Productos
          </Link>

          <Link href="/contacto" className="text-slate-700 hover:text-emerald-700">
            Contacto
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}
