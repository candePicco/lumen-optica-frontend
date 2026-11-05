import { z } from "zod";

// Convierte "" en undefined para que un campo vacío dé "obligatorio"
// en vez de convertirse en 0.
const numero = (mensaje) =>
  z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : Number(v)),
    z.number({ error: mensaje })
  );

const idRelacion = (mensaje) => numero(mensaje).pipe(z.number().int().positive(mensaje));

// Basado en el modelo Producto del backend (optica/models.py).
export const productoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio.")
    .max(150, "El nombre no puede tener más de 150 caracteres."),

  descripcion: z.string().trim(),

  precio: numero("Ingresá un precio válido.")
    .pipe(
      z
        .number()
        .positive("El precio tiene que ser mayor a 0.")
        .max(99999999.99, "El precio es demasiado alto.")
        .refine(
          (v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-6,
          "El precio puede tener como máximo 2 decimales."
        )
    ),

  stock: numero("Ingresá el stock.").pipe(
    z
      .number()
      .int("El stock tiene que ser un número entero.")
      .min(0, "El stock no puede ser negativo.")
  ),

  destacado: z.boolean(),
  activo: z.boolean(),

  categoria: idRelacion("Elegí una categoría."),
  marca: idRelacion("Elegí una marca."),
  proveedor: idRelacion("Elegí un proveedor."),
});

// Valores iniciales para un producto nuevo.
export const productoVacio = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: 0,
  destacado: false,
  activo: true,
  categoria: "",
  marca: "",
  proveedor: "",
};
