
"use client";

import { useState } from "react";

const EMAIL_CONTACTO =
  process.env.NEXT_PUBLIC_EMAIL_CONTACTO || "";

export default function ContactoPage() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState("");

  function cambiarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setErrores((anterior) => ({
      ...anterior,
      [name]: "",
    }));

    setAviso("");
  }

  function enviarConsulta(evento) {
    evento.preventDefault();

    const nuevosErrores = {};

    if (formulario.nombre.trim().length < 2) {
      nuevosErrores.nombre =
        "Ingresá un nombre de al menos 2 caracteres.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formulario.email.trim()
      )
    ) {
      nuevosErrores.email =
        "Ingresá un correo electrónico válido.";
    }

    if (formulario.mensaje.trim().length < 10) {
      nuevosErrores.mensaje =
        "El mensaje debe tener al menos 10 caracteres.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setAviso("");
      return;
    }

    if (!EMAIL_CONTACTO) {
      setAviso(
        "El formulario está validado, pero todavía falta configurar el correo de contacto de Lumen Óptica."
      );
      return;
    }

    const asunto = encodeURIComponent(
      `Consulta de ${formulario.nombre.trim()} - Lumen Óptica`
    );

    const cuerpo = encodeURIComponent(
      `Nombre: ${formulario.nombre.trim()}\n` +
      `Correo: ${formulario.email.trim()}\n\n` +
      `Consulta:\n${formulario.mensaje.trim()}`
    );

    window.location.href =
      `mailto:${EMAIL_CONTACTO}?subject=${asunto}&body=${cuerpo}`;

    setAviso(
      "Se abrió tu aplicación de correo. Revisá el mensaje y presioná Enviar para completar la consulta."
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-[#073b63] to-emerald-700 px-6 py-16 text-center text-white">
        <span className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
          Estamos para ayudarte
        </span>

        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Contactanos
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
          ¿Tenés alguna consulta? Estamos para ayudarte a
          encontrar los anteojos ideales para vos.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2">
        {/* INFORMACIÓN */}
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-[#073b63]">
            Estamos cerca tuyo
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            En Lumen Óptica queremos acompañarte para que
            encuentres el producto que mejor se adapte a
            tus necesidades y a tu estilo.
          </p>

          <div className="mt-9 space-y-7">
            <div className="flex gap-4">
              <span className="text-3xl">👓</span>

              <div>
                <h3 className="font-semibold text-[#073b63]">
                  Asesoramiento
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Consultanos por modelos, marcas,
                  características y disponibilidad.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">💚</span>

              <div>
                <h3 className="font-semibold text-[#073b63]">
                  Atención personalizada
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Contanos qué estás buscando y te
                  ayudaremos con tu consulta.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-3xl">✉️</span>

              <div>
                <h3 className="font-semibold text-[#073b63]">
                  Consultas por correo
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Completá el formulario para preparar
                  tu mensaje.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-emerald-50 p-6">
            <h3 className="font-bold text-emerald-800">
              Tu mirada, nuestra prioridad
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              Descubrí nuestra colección de anteojos
              y encontrá tu próximo estilo.
            </p>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold text-[#073b63]">
            Enviá tu consulta
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Completá tus datos y contanos en qué
            podemos ayudarte.
          </p>

          <form
            onSubmit={enviarConsulta}
            noValidate
            className="mt-8 space-y-6"
          >
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Nombre completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                value={formulario.nombre}
                onChange={cambiarCampo}
                placeholder="Ingresá tu nombre"
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={
                  errores.nombre ? "error-nombre" : undefined
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-600"
              />

              {errores.nombre && (
                <p
                  id="error-nombre"
                  className="mt-2 text-sm text-red-600"
                >
                  {errores.nombre}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formulario.email}
                onChange={cambiarCampo}
                placeholder="tu@email.com"
                aria-invalid={Boolean(errores.email)}
                aria-describedby={
                  errores.email ? "error-email" : undefined
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-600"
              />

              {errores.email && (
                <p
                  id="error-email"
                  className="mt-2 text-sm text-red-600"
                >
                  {errores.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Mensaje
              </label>

              <textarea
                id="mensaje"
                name="mensaje"
                rows={5}
                value={formulario.mensaje}
                onChange={cambiarCampo}
                placeholder="Escribí tu consulta..."
                aria-invalid={Boolean(errores.mensaje)}
                aria-describedby={
                  errores.mensaje ? "error-mensaje" : undefined
                }
                className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-emerald-600"
              />

              {errores.mensaje && (
                <p
                  id="error-mensaje"
                  className="mt-2 text-sm text-red-600"
                >
                  {errores.mensaje}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#073b63] px-6 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Preparar consulta
            </button>

            {aviso && (
              <p
                role="status"
                className="rounded-xl bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"
              >
                {aviso}
              </p>
            )}

            <p className="text-center text-xs leading-5 text-slate-500">
              La consulta se prepara en tu aplicación de
              correo. No se envía automáticamente.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
