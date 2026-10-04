import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authHook } from "../../hooks/auth.hook";


export const Login = () => {
    const navigate = useNavigate();
    const { login } = authHook();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);
        setIsLoading(true);

        try {
            await login({email, password});
            navigate("/dashboard");
        } catch (error) {
            setError("Credenciales incorrectas");
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl">
              Z
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Bienvenido de nuevo
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Inicia sesión para continuar
            </p>
          </div>

          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-6"
          >
            {/* Email */}
            <div className="w-full">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                required
                disabled={isLoading}
                className="
        block
        w-full
        box-border
        rounded-lg
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-sm
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        disabled:cursor-not-allowed
        disabled:bg-slate-100
      "
              />
            </div>

            {/* Password */}
            <div className="w-full">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="
        block
        w-full
        box-border
        rounded-lg
        border
        border-slate-300
        bg-white
        px-4
        py-3
        text-sm
        text-slate-900
        placeholder:text-slate-400
        outline-none
        transition
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-500/20
        disabled:cursor-not-allowed
        disabled:bg-slate-100
      "
              />
            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="
        w-full
        box-border
        rounded-lg
        border
        border-red-200
        bg-red-50
        px-4
        py-3
        text-sm
        text-red-600
      "
              >
                {error}
              </div>
            )}

            {/* Botón */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="
        block
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-blue-700
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
              >
                {isLoading
                  ? "Iniciando sesión..."
                  : "Iniciar sesión"}
              </button>

              <p className="mt-6 text-center text-sm text-slate-600">
  ¿No tienes una cuenta?{" "}
  <button
    type="button"
    onClick={() => navigate("/register")}
    className="font-semibold text-blue-600 hover:text-blue-700"
  >
    Crear cuenta
  </button>
</p>

            </div>
          </form>

        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © 2026 zyz7
        </p>
      </div>
    </main>  
  );
};
