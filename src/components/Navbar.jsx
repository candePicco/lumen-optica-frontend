import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-bold text-emerald-700">
          Lumen <span className="text-blue-700">Óptica</span>
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-emerald-700">
            Inicio
          </Link>

          <Link href="/productos" className="hover:text-emerald-700">
            Productos
          </Link>

          <Link href="/contacto" className="hover:text-emerald-700">
            Contacto
          </Link>

          <Link
            href="/login"
            className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
          >
            Iniciar sesión
          </Link>
        </div>
      </nav>
    </header>
  );
}