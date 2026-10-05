import { useNavigate, useSearchParams } from "react-router-dom";

export function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get("id");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <span className="text-3xl text-red-600">
            ✕
          </span>
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Recarga no completada
        </h1>

        <p className="mt-2 text-slate-500">
          No se pudo completar la recarga.
          No se realizó ningún cargo exitoso a tu cuenta.
        </p>

        {paymentId && (
          <p className="mt-3 text-xs text-slate-400">
            Referencia de pago: {paymentId}
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="
            mt-6
            w-full
            rounded-lg
            bg-blue-600
            px-4
            py-2
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/30
          "
        >
          Volver al dashboard
        </button>

      </div>
    </main>
  );
}
