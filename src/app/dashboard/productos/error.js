"use client";

// retry() vuelve a pedir los datos al servidor. reset() no los pide de nuevo.
export default function ErrorProductos({ retry }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#073b63]">
          No pudimos cargar los productos
        </h1>

        <p className="mt-3 text-slate-600">
          Revisá la conexión con el servidor e intentá nuevamente.
        </p>

        <button
          type="button"
          onClick={() => retry()}
          className="mt-6 rounded-xl bg-emerald-700 px-5 py-2 font-semibold text-white transition hover:bg-emerald-800"
        >
          Reintentar
        </button>
      </div>
    </main>
  );
}
