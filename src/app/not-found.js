
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-xl text-center">
        <div className="mb-6 text-7xl">👓</div>

        <p className="text-7xl font-extrabold text-emerald-700 sm:text-8xl">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-[#073b63] sm:text-4xl">
          ¡Ups! Perdimos de vista esta página
        </h1>

        <p className="mt-5 text-lg leading-8 text-slate-600">
          Parece que la página que estás buscando no existe
          o cambió de dirección.
          No te preocupes, podemos ayudarte a encontrar
          el camino de vuelta.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-[#073b63] px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Volver al inicio
          </Link>

          <Link
            href="/productos"
            className="rounded-xl border border-emerald-700 px-7 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </main>
  );
}
