export const metadata = {
  title: "Contacto | Lumen Óptica",
};

export default function ContactoPage() {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-800">
            Contactanos
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            ¿Tenés alguna consulta? Estamos para ayudarte
            a encontrar lo que necesitás.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-emerald-700">
              Información de contacto
            </h2>

            <p className="mb-4 text-slate-600">
              Podés comunicarte con nosotros para consultar
              por nuestros productos y servicios.
            </p>

            <p className="text-slate-600">
              También podés dejarnos tu consulta
              completando el formulario.
            </p>
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-slate-800">
              Enviá tu consulta
            </h2>

            <form className="space-y-4">
              <div>
                <label htmlFor="nombre" className="mb-2 block text-sm font-medium">
                  Nombre
                </label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="mb-2 block text-sm font-medium">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  rows="4"
                  placeholder="Escribí tu consulta..."
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </div>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white opacity-60"
              >
                Enviar mensaje (próximamente)
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}