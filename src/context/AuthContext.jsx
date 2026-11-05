"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";

// URL del backend Django. Se puede cambiar con NEXT_PUBLIC_API_URL en .env.local
export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

const STORAGE_KEY = "lumen_auth";

const AuthContext = createContext(null);

// ---------- Utilidades de JWT ----------

// Lee el payload de un JWT (sin verificar la firma, solo para ver "exp").
function decodeJwt(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

// true si el token ya venció o vence en los próximos "margen" segundos.
function isExpired(token, margen = 30) {
  const payload = token ? decodeJwt(token) : null;
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now() + margen * 1000;
}

// ---------- Sesión guardada en localStorage ----------
// Se guarda como { access, refresh, username }.

const listeners = new Set();
let enMemoria = null; // respaldo si localStorage no está disponible

function leerRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return enMemoria;
  }
}

function parsearSesion(raw) {
  if (!raw) return null;
  try {
    const sesion = JSON.parse(raw);
    // Si el refresh ya venció, la sesión no sirve más.
    if (!sesion?.refresh || isExpired(sesion.refresh, 0)) return null;
    return sesion;
  } catch {
    return null;
  }
}

function leerSesion() {
  return parsearSesion(leerRaw());
}

function guardarSesion(sesion) {
  const raw = sesion ? JSON.stringify(sesion) : null;
  enMemoria = raw;
  try {
    if (raw) localStorage.setItem(STORAGE_KEY, raw);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage no disponible: queda solo en memoria.
  }
  listeners.forEach((cb) => cb());
}

function suscribir(cb) {
  listeners.add(cb);
  // Si se inicia o cierra sesión en otra pestaña, se refleja acá también.
  const onStorage = (e) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const suscribirNada = () => () => {};

// ---------- Provider ----------

export function AuthProvider({ children }) {
  const router = useRouter();

  // En el servidor no hay localStorage: ahí la sesión es null.
  const raw = useSyncExternalStore(suscribir, leerRaw, () => null);
  const sesion = useMemo(() => parsearSesion(raw), [raw]);

  // false en el servidor y en el primer render; true una vez en el navegador.
  const hidratado = useSyncExternalStore(suscribirNada, () => true, () => false);

  const refreshEnCurso = useRef(null);

  const login = useCallback(async (username, password) => {
    let res;
    try {
      res = await fetch(`${API_URL}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
    } catch {
      throw new Error("No se pudo conectar con el servidor.");
    }

    if (res.status === 401) {
      throw new Error("Usuario o contraseña incorrectos.");
    }
    if (!res.ok) {
      throw new Error("Ocurrió un error al iniciar sesión.");
    }

    const { access, refresh } = await res.json();
    guardarSesion({ access, refresh, username });
  }, []);

  const logout = useCallback(() => {
    guardarSesion(null);
    router.push("/login");
  }, [router]);

  // Pide un access nuevo con el refresh. Si ya hay un pedido en curso, lo reutiliza.
  const refrescarAccess = useCallback(async () => {
    if (refreshEnCurso.current) return refreshEnCurso.current;

    refreshEnCurso.current = (async () => {
      const actual = leerSesion();
      if (!actual) return null;

      try {
        const res = await fetch(`${API_URL}/api/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: actual.refresh }),
        });
        if (!res.ok) {
          guardarSesion(null);
          return null;
        }
        const data = await res.json();
        guardarSesion({
          ...actual,
          access: data.access,
          // Si el back rota el refresh, viene uno nuevo.
          refresh: data.refresh || actual.refresh,
        });
        return data.access;
      } catch {
        return null;
      }
    })();

    try {
      return await refreshEnCurso.current;
    } finally {
      refreshEnCurso.current = null;
    }
  }, []);

  // Devuelve un access válido (lo renueva si está por vencer).
  const getAccessToken = useCallback(async () => {
    const actual = leerSesion();
    if (!actual) return null;
    if (!isExpired(actual.access)) return actual.access;
    return refrescarAccess();
  }, [refrescarAccess]);

  // fetch que agrega el token y lo renueva solo si vence.
  // Uso: authFetch("/api/productos/", { method: "POST", body: JSON.stringify(datos) })
  const authFetch = useCallback(
    async (path, options = {}) => {
      const url = path.startsWith("http") ? path : `${API_URL}${path}`;

      const hacerPedido = (token) => {
        const headers = new Headers(options.headers);
        if (token) headers.set("Authorization", `Bearer ${token}`);
        if (typeof options.body === "string" && !headers.has("Content-Type")) {
          headers.set("Content-Type", "application/json");
        }
        return fetch(url, { ...options, headers });
      };

      let res = await hacerPedido(await getAccessToken());

      // Si el back igual responde 401, renueva una vez y reintenta.
      if (res.status === 401 && leerSesion()) {
        const nuevo = await refrescarAccess();
        if (nuevo) res = await hacerPedido(nuevo);
        if (!nuevo || res.status === 401) logout();
      }

      return res;
    },
    [getAccessToken, refrescarAccess, logout]
  );

  const value = useMemo(
    () => ({
      user: sesion ? { username: sesion.username } : null,
      isAuthenticated: Boolean(sesion),
      loading: !hidratado,
      login,
      logout,
      authFetch,
      getAccessToken,
    }),
    [sesion, hidratado, login, logout, authFetch, getAccessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth tiene que usarse dentro de <AuthProvider>.");
  }
  return ctx;
}
