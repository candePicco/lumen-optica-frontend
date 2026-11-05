import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 rounded-full bg-emerald-100 px-5 py-2 text-sm font-semibold text-emerald-800">
          Bienvenidos a Lumen Óptica
        </span>

        <h1 className="mb-6 text-5xl font-bold text-slate-800">
          Una nueva forma de ver el mundo
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-slate-600">
          Descubrí nuestra selección de anteojos, armazones y
          accesorios. Encontrá el estilo ideal para vos.
        </p>

        <Link
          href="/productos"
          className="rounded-xl bg-emerald-700 px-8 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Explorar productos
        </Link>
      </section>
    </main>
  );
}