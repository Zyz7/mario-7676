import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { paymentHook } from "../../hooks/payment.hook";
import type { PaymentStatus } from "../../types/payment.type";
import type { PaymentStatusDto } from "../../dtos/payment.dto";

export function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { status } = paymentHook();

  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentStatusDto | null>(null);

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus | null>(null);

  useEffect(() => {
    const paymentId = searchParams.get("id");

    if (!paymentId) {
      setIsLoading(false);
      return;
    }

    const checkPayment = async () => {
      try {
        const payment = await status(Number(paymentId));

        console.log("Estado del pago:", payment.status);

        setPayment(payment);
        setPaymentStatus(payment.status as PaymentStatus);
      } catch (error) {
        console.error("Error consultando el pago:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPayment();
  }, [searchParams, status]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">
            Verificando tu recarga...
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Estamos confirmando el estado de tu pago.
          </p>
        </div>
      </main>
    );
  }

  const isPaid = paymentStatus === "paid";

  const isFailed =
    paymentStatus === "failed" ||
    paymentStatus === "cancelled";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">

        {isPaid && payment && (
  <>
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
      <span className="text-3xl text-green-600">
        ✓
      </span>
    </div>

    <h1 className="mt-5 text-2xl font-bold text-slate-900">
      ¡Recarga exitosa!
    </h1>

    <p className="mt-2 text-slate-500">
      Tu recarga fue procesada correctamente y el saldo
      ha sido actualizado.
    </p>

    <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left">

      <div className="flex justify-between border-b border-slate-200 py-3">
        <span className="text-sm text-slate-500">
          Monto
        </span>

        <span className="font-semibold text-slate-900">
          ${payment.transaction_amount}
        </span>
      </div>

      <div className="flex justify-between border-b border-slate-200 py-3">
        <span className="text-sm text-slate-500">
          Estado
        </span>

        <span className="font-semibold text-green-600">
          {payment.status}
        </span>
      </div>

      <div className="flex justify-between border-b border-slate-200 py-3">
        <span className="text-sm text-slate-500">
          Referencia
        </span>

        <span className="font-semibold text-slate-900">
          {payment.reference.slice(0, 17)}...
        </span>
      </div>

      <div className="flex justify-between py-3">
        <span className="text-sm text-slate-500">
          Fecha
        </span>

        <span className="font-semibold text-slate-900">
          {new Date(payment.date_created).toLocaleString("es-MX")}
        </span>
      </div>

    </div>
  </>
)}


        {isFailed && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <span className="text-3xl text-red-600">
                ✕
              </span>
            </div>

            <h1 className="mt-5 text-2xl font-bold text-slate-900">
              Recarga no completada
            </h1>

            <p className="mt-2 text-slate-500">
              La recarga no pudo ser procesada.
            </p>
          </>
        )}

        {!isPaid && !isFailed && (
          <>
            <h1 className="text-2xl font-bold text-slate-900">
              Pago en proceso
            </h1>

            <p className="mt-2 text-slate-500">
              Tu pago todavía está siendo procesado.
            </p>
          </>
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
          "
        >
          Volver al dashboard
        </button>

      </div>
    </main>
  );
}
