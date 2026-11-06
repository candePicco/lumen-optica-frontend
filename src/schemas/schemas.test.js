import { describe, expect, it } from "vitest";
import { loginSchema } from "./loginSchema";
import { productoSchema } from "./productoSchema";

describe("loginSchema", () => {
  it("rechaza usuario y contraseña vacíos", () => {
    const resultado = loginSchema.safeParse({ username: "", password: "" });

    expect(resultado.success).toBe(false);
  });

  it("recorta espacios del usuario", () => {
    const resultado = loginSchema.safeParse({
      username: "  juan  ",
      password: "secreto",
    });

    expect(resultado.success).toBe(true);
    if (resultado.success) expect(resultado.data.username).toBe("juan");
  });
});

describe("productoSchema", () => {
  const productoValido = {
    nombre: "Anteojos Lumen",
    descripcion: "Armazón liviano",
    precio: "12500.50",
    stock: "4",
    destacado: false,
    activo: true,
    categoria: "1",
    marca: "2",
    proveedor: "3",
  };

  it("convierte los campos numéricos del formulario", () => {
    const resultado = productoSchema.safeParse(productoValido);

    expect(resultado.success).toBe(true);
    if (resultado.success) {
      expect(resultado.data.precio).toBe(12500.5);
      expect(resultado.data.stock).toBe(4);
      expect(resultado.data.categoria).toBe(1);
    }
  });

  it("rechaza un precio igual a cero", () => {
    const resultado = productoSchema.safeParse({ ...productoValido, precio: "0" });

    expect(resultado.success).toBe(false);
  });
});
