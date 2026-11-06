
import Link from "next/link";

const beneficios = [
  {
    icono: "👓",
    titulo: "Variedad de estilos",
    descripcion:
      "Descubrí armazones y anteojos para cada personalidad y ocasión.",
  },
  {
    icono: "✨",
    titulo: "Calidad y diseño",
    descripcion:
      "Encontrá productos que combinan comodidad, calidad y estilo.",
  },
  {
    icono: "💚",
    titulo: "Atención personalizada",
    descripcion:
      "Estamos para ayudarte a encontrar la opción ideal para vos.",
  },
];

const categorias = [
  {
    icono: "🕶️",
    titulo: "Anteojos de sol",
    descripcion: "Protección y estilo para todos los días.",
  },
  {
    icono: "👓",
    titulo: "Armazones",
    descripcion: "Diseños modernos, clásicos y versátiles.",
  },
  {
    icono: "✨",
    titulo: "Accesorios",
    descripcion: "Complementos para cuidar tus anteojos.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-white text-slate-800">
      {/* PRESENTACIÓN PRINCIPAL */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />

        <div className="relative mx-auto flex min-h-[580px] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center">
          <span className="mb-6 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-sm font-semibold text-emerald-800">
            Bienvenidos a Lumen Óptica
          </span>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-[#073b63] sm:text-5xl lg:text-6xl">
            Una nueva forma de{" "}
            <span className="text-emerald-600">ver el mundo</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Descubrí nuestra colección de anteojos, armazones y accesorios.
            Encontrá el estilo que mejor se adapta a vos, con calidad,
            comodidad y diseño.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link
              href="/productos"
              className="rounded-xl bg-emerald-700 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:-translate-y-1 hover:bg-emerald-800"
            >
              Explorar productos
            </Link>

            <Link
              href="/contacto"
              className="rounded-xl border border-[#073b63] px-8 py-4 font-semibold text-[#073b63] transition hover:bg-[#073b63] hover:text-white"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Nuestra propuesta
          </span>

          <h2 className="mt-3 text-3xl font-bold text-[#073b63] sm:text-4xl">
            Mirá el mundo con otros ojos
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            En Lumen Óptica creemos que cada mirada es única.
            Por eso queremos acompañarte a encontrar tu estilo.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {beneficios.map((beneficio) => (
            <article
              key={beneficio.titulo}
              className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                {beneficio.icono}
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#073b63]">
                {beneficio.titulo}
              </h3>

              <p className="leading-7 text-slate-600">
                {beneficio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-700">
              Descubrí nuestra colección
            </span>

            <h2 className="mt-3 text-3xl font-bold text-[#073b63] sm:text-4xl">
              Encontrá lo que estás buscando
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {categorias.map((categoria) => (
              <Link
                key={categoria.titulo}
                href="/productos"
                className="group rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="mb-5 text-5xl">
                  {categoria.icono}
                </div>

                <h3 className="text-xl font-bold text-[#073b63] group-hover:text-emerald-700">
                  {categoria.titulo}
                </h3>

                <p className="mt-3 text-slate-600">
                  {categoria.descripcion}
                </p>

                <span className="mt-6 inline-block font-semibold text-emerald-700">
                  Ver productos →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#073b63] to-[#087b65] px-8 py-16 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Tu próxima mirada comienza acá
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/85">
            ¿Tenés dudas sobre nuestros productos?
            Estamos para ayudarte a encontrar lo que necesitás.
          </p>

          <Link
            href="/contacto"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-[#073b63] transition hover:bg-emerald-50"
          >
            Hacé tu consulta
          </Link>
        </div>
      </section>
    </main>
  );
}
