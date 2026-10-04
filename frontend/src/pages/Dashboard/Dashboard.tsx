import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authHook } from "../../hooks/auth.hook";
import { paymentHook } from "../../hooks/payment.hook";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";



export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = authHook();
    const { balance, isLoading, initializeBalance } = paymentHook();
    const betsData = [
      {
        name: "Ganadas",
        value: 65,
      },
      {
        name: "Perdidas",
        value: 35,
      },
    ];

    const BET_COLORS = ["#22c55e", "#ef4444"];

    useEffect(() => { initializeBalance();}, [initializeBalance]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
      <main className="min-h-screen bg-slate-100">

  {/* Header */}
  <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

      {/* Aplicación */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Mi aplicación
        </h1>
      </div>

      {/* Usuario + Logout */}
      <div className="flex items-center gap-5">

        <div className="text-right">
          <p className="text-sm text-slate-500">
            Bienvenido
          </p>

          <p className="font-semibold text-slate-900">
            {user?.name}
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            rounded-lg
            border
            border-slate-300
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-700
            transition
            hover:bg-slate-100
            hover:text-red-600
            focus:outline-none
            focus:ring-2
            focus:ring-red-500/20
          "
        >
          Cerrar sesión
        </button>

      </div>
    </div>
  </header>

  {/* Contenido */}
  <section className="mx-auto max-w-7xl px-6 py-10">

    {/* Bienvenida */}
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900">
        Hola, {user?.name}
      </h2>

      <p className="mt-2 text-slate-600">
        Aquí tienes un resumen de tu actividad.
      </p>
    </div>

    {/* Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {/* Saldo */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <p className="text-sm font-medium text-slate-500">
          Saldo disponible
        </p>

        {isLoading ? (
          <p className="mt-2 text-3xl font-bold text-slate-400">
            Cargando...
          </p>
        ) : (
          <p className="mt-2 text-3xl font-bold text-slate-900">
            ${balance.toFixed(2)}
          </p>
        )}

      </div>

      {/* Apuestas */}
      <div className="rounded-2xl bg-white p-6 shadow-sm md:col-span-1 lg:col-span-2">

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Resultado de apuestas
          </h3>

          <p className="text-sm text-slate-500">
            Resumen de apuestas ganadas y perdidas
          </p>
        </div>

        <div className="h-64 w-full">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={betsData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >

                {betsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={BET_COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip
                formatter={(value) => [`${value}%`, "Apuestas"]}
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  </section>
</main>

    );
};
