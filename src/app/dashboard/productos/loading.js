export default function Loading() {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6"
      role="status"
      aria-live="polite"
    >
      <p className="text-slate-600">Cargando productos...</p>
    </main>
  );
}
