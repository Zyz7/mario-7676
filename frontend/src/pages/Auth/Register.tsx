import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { storage } from "../../utils/storage";

export const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.register({
        name,
        email,
        password,
        confirm,
      });

      // Guardamos solamente los datos públicos del usuario.
      // Nunca guardamos la contraseña.
      storage.addUser(response);

      navigate("/login");
    } catch {
      setError("No fue posible registrar el usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md">
        <div className="w-full rounded-2xl bg-white p-8 shadow-xl">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              Z
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              Crear cuenta
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Regístrate para comenzar
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-5"
          >

            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Nombre
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                placeholder="Tu nombre"
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
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
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
                "
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
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
                "
              />
            </div>

            {/* Confirmar password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Confirmar contraseña
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirm}
                onChange={(event) =>
                  setConfirm(event.target.value)
                }
                autoComplete="new-password"
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
                "
              />
            </div>

            {error && (
              <div
                role="alert"
                className="
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

            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full
                rounded-lg
                bg-blue-600
                px-4
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {isLoading
                ? "Registrando..."
                : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Iniciar sesión
            </button>
          </p>

        </div>
      </div>
    </main>
  );
};
