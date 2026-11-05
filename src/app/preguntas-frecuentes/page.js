
"use client";

import { useState } from "react";
import Link from "next/link";

const preguntas = [
  {
    pregunta: "¿Cómo puedo consultar por un producto?",
    respuesta:
      "Podés explorar nuestro catálogo y seleccionar el producto que te interesa. Desde su página de detalle, ingresá a Contacto para enviarnos tu consulta.",
  },
  {
    pregunta: "¿Los productos tienen disponibilidad inmediata?",
    respuesta:
      "La disponibilidad depende del stock de cada producto. Podés consultar las unidades disponibles desde su página de detalle.",
  },
  {
    pregunta: "¿Puedo buscar anteojos por marca o categoría?",
    respuesta:
      "Sí. En nuestro catálogo encontrarás un buscador y filtros para explorar productos por marca y categoría.",
  },
  {
    pregunta: "¿Cómo puedo conocer el precio de un producto?",
    respuesta:
      "Cada producto del catálogo muestra su precio actualizado según la información registrada en nuestro sistema.",
  },
  {
    pregunta: "¿Qué hago si un producto está agotado?",
    respuesta:
      "Podés comunicarte con nosotros desde la sección Contacto para consultar por su disponibilidad futura o conocer otras opciones.",
  },
  {
    pregunta: "¿Necesito iniciar sesión para ver los productos?",
    respuesta:
      "No. Podés explorar nuestro catálogo y consultar los detalles de los productos sin iniciar sesión.",
  },
];

export default function PreguntasFrecuentesPage() {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  function alternarPregunta(index) {
    setPreguntaAbierta((actual) =>
      actual === index ? null : index
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ENCABEZADO */}
      <section className="bg-gradient-to-r from-[#073b63] to-emerald-700 px-6 py-16 text-center text-white">
        <span className="text-sm font-semibold uppercase tracking-widest text-emerald-100">
          Estamos para ayudarte
        </span>

        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Preguntas frecuentes
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-white/85">
          Encontrá respuestas a las consultas más habituales
          sobre nuestros productos y servicios.
        </p>
      </section>

      {/* PREGUNTAS */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-4">
          {preguntas.map((item, index) => {
            const abierta = preguntaAbierta === index;

            return (
              <article
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => alternarPregunta(index)}
                  aria-expanded={abierta}
                  aria-controls={`respuesta-${index}`}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-base font-semibold text-[#073b63] sm:text-lg">
                    {item.pregunta}
                  </span>

                  <span className="shrink-0 text-2xl font-light text-emerald-700">
                    {abierta ? "−" : "+"}
                  </span>
                </button>

                {abierta && (
                  <div
                    id={`respuesta-${index}`}
                    className="border-t border-slate-100 px-6 py-5"
                  >
                    <p className="leading-7 text-slate-600">
                      {item.respuesta}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* CONTACTO */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#073b63] to-emerald-700 px-8 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">
            ¿No encontraste tu respuesta?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/85">
            Estamos para ayudarte. Contactanos y contanos
            en qué podemos asesorarte.
          </p>

          <Link
            href="/contacto"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-[#073b63] transition hover:bg-emerald-50"
          >
            Ir a contacto
          </Link>
        </div>
      </section>
    </main>
  );
}
