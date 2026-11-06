
export default function Loading() {
  return (
    <main
      className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="relative mx-auto mb-8 h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-700 border-r-[#073b63]" />
        </div>

        <h1 className="text-2xl font-bold text-[#073b63]">
          Lumen Óptica
        </h1>

        <p className="mt-3 text-slate-600">
          Estamos preparando todo para vos...
        </p>

        <p className="mt-2 text-sm text-slate-400">
          Un momento, por favor.
        </p>
      </div>
    </main>
  );
}
