"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productoSchema, productoVacio } from "@/schemas/productoSchema";

const inputClass =
  "rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100";

// Pasa un producto que viene de la API al formato del formulario.
function aValoresDeFormulario(producto) {
  if (!producto) return undefined;
  return {
    ...productoVacio,
    ...producto,
    descripcion: producto.descripcion ?? "",
    precio: producto.precio ?? "",
    categoria: producto.categoria ?? "",
    marca: producto.marca ?? "",
    proveedor: producto.proveedor ?? "",
  };
}

function Campo({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
}

function Selector({ id, label, opciones, error, register }) {
  return (
    <Campo id={id} label={label} error={error}>
      <select
        id={id}
        aria-invalid={error ? "true" : "false"}
        className={inputClass}
        {...register(id)}
      >
        <option value="">Seleccionar...</option>
        {opciones.map((op) => (
          <option key={op.id} value={op.id}>
            {op.nombre}
          </option>
        ))}
      </select>
    </Campo>
  );
}

/**
 * Formulario de producto (crear y editar) con validación Zod.
 *
 * Props:
 * - producto: producto a editar (como viene de GET /api/productos/:id/). Si no se pasa, es alta.
 * - categorias, marcas, proveedores: listas [{ id, nombre }] para los selects.
 * - onSubmit(datos): recibe los datos ya validados (precio, stock e ids como números).
 *   Si el back devuelve errores por campo, tirá un error con `fields`, por ejemplo:
 *     const err = new Error("Error al guardar"); err.fields = await res.json(); throw err;
 *   y se muestran debajo de cada input.
 * - onCancel: opcional, muestra un botón "Cancelar".
 * - submitLabel: texto del botón (por defecto "Guardar").
 */
export default function ProductoForm({
  producto,
  categorias = [],
  marcas = [],
  proveedores = [],
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(productoSchema),
    defaultValues: productoVacio,
    // Si "producto" llega después (carga async), el form se actualiza solo.
    values: aValoresDeFormulario(producto),
  });

  const enviar = async (datos) => {
    try {
      await onSubmit?.(datos);
      if (!producto) reset(productoVacio);
    } catch (error) {
      const campos = error?.fields;
      if (campos && typeof campos === "object") {
        Object.entries(campos).forEach(([campo, mensajes]) => {
          const message = Array.isArray(mensajes) ? mensajes.join(" ") : String(mensajes);
          const nombre = campo in productoVacio ? campo : "root";
          setError(nombre, { message });
        });
      } else {
        setError("root", {
          message: error?.message || "No se pudo guardar el producto.",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(enviar)}
      noValidate
      className="flex w-full max-w-xl flex-col gap-4"
    >
      <Campo id="nombre" label="Nombre" error={errors.nombre}>
        <input
          id="nombre"
          type="text"
          aria-invalid={errors.nombre ? "true" : "false"}
          className={inputClass}
          {...register("nombre")}
        />
      </Campo>

      <Campo id="descripcion" label="Descripción" error={errors.descripcion}>
        <textarea
          id="descripcion"
          rows={3}
          aria-invalid={errors.descripcion ? "true" : "false"}
          className={inputClass}
          {...register("descripcion")}
        />
      </Campo>

      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="precio" label="Precio" error={errors.precio}>
          <input
            id="precio"
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
            aria-invalid={errors.precio ? "true" : "false"}
            className={inputClass}
            {...register("precio")}
          />
        </Campo>

        <Campo id="stock" label="Stock" error={errors.stock}>
          <input
            id="stock"
            type="number"
            step="1"
            min="0"
            inputMode="numeric"
            aria-invalid={errors.stock ? "true" : "false"}
            className={inputClass}
            {...register("stock")}
          />
        </Campo>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Selector
          id="categoria"
          label="Categoría"
          opciones={categorias}
          error={errors.categoria}
          register={register}
        />
        <Selector
          id="marca"
          label="Marca"
          opciones={marcas}
          error={errors.marca}
          register={register}
        />
        <Selector
          id="proveedor"
          label="Proveedor"
          opciones={proveedores}
          error={errors.proveedor}
          register={register}
        />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("destacado")} />
          Destacado
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("activo")} />
          Activo
        </label>
      </div>

      {errors.root && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {errors.root.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-zinc-300 px-4 py-2 font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
