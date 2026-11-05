"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { loginSchema } from "@/schemas/loginSchema";

// Solo permite volver a rutas internas (evita redirigir a otro sitio).
function destinoSeguro(next) {
  if (next && next.startsWith("/") && !next.startsWith("//")) return next;
  return "/dashboard";
}

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async ({ username, password }) => {
    try {
      await login(username, password);
      router.replace(destinoSeguro(searchParams.get("next")));
    } catch (error) {
      setError("root", { message: error.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex w-full max-w-sm flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium">
          Usuario
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          aria-invalid={errors.username ? "true" : "false"}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={errors.password ? "true" : "false"}
          className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-900 aria-[invalid=true]:border-red-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-100"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {errors.root && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
        >
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
