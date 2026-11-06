"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { eliminarProducto } from "@/lib/api";

export default function BotonEliminarProducto({ id, nombre }) {
  const { authFetch } = useAuth();
  const router = useRouter();

  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  const eliminar = async () => {
    if (!window.confirm(`¿Eliminar "${nombre}"?`)) return;

    setEliminando(true);
    setError("");

    try {
      await eliminarProducto(authFetch, id);
      // Si salió bien, la fila desaparece al refrescar la lista.
      router.refresh();
    } catch (err) {
      // La API responde 500 si el producto tiene pedidos asociados.
      setError(
        err.status === 500
          ? "No se pudo eliminar. Si tiene pedidos asociados, desactivalo desde Editar."
          : err.message
      );
      setEliminando(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={eliminar}
        disabled={eliminando}
        className="font-medium text-red-700 hover:underline disabled:cursor-not-allowed disabled:opacity-60"
      >
        {eliminando ? "Eliminando..." : "Eliminar"}
      </button>

      {error && (
        <p role="alert" className="mt-1 max-w-52 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
