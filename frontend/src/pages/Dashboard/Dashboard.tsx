import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authHook } from "../../hooks/auth.hook";
import { paymentHook } from "../../hooks/payment.hook";
import { snailRacesData } from "../../types/dashboard.type";
import {
  BarChart, // gráfica barras
  Bar,
  PieChart, // gráfica donut
  Pie,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";


export const Dashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = authHook();
    const {
      balance,
      isLoading,
      initializeBalance,
      recharge,
    } = paymentHook();

    const [rechargeAmount, setRechargeAmount] = useState("");
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

    const handleRecharge = async () => {
  const amount = Number(rechargeAmount);

  if (!amount || amount <= 0) {
    alert("Ingresa un monto válido");
    return;
  }

  const amountInCents = Math.round(amount * 100);

  try {
    await recharge({
      amount: amountInCents,
      currency: "MXN",
    });
  } catch (error) {
    console.error("Error al realizar la recarga:", error);
    alert("No se pudo iniciar la recarga");
  }
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

        <p className="mt-1 text-sm text-slate-500">
          
        </p>

        <div className="mt-5 flex flex-col gap-3">

    <div className="relative flex-1">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
        $
      </span>

      <input
        type="number"
        min="1"
        step="0.01"
        value={rechargeAmount}
        onChange={(e) => setRechargeAmount(e.target.value)}
        placeholder="100.00"
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          py-2
          pl-8
          pr-4
          text-slate-900
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-500/20
        "
      />
    </div>

    <button
      type="button"
      onClick={handleRecharge}
      className="
        rounded-lg
        bg-blue-600
        px-6
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
      Recargar saldo
    </button>

  </div>

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

    {/* Carreras */}
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

  <div className="mb-6">
    <h3 className="text-lg font-semibold text-slate-900">
      Victorias de los caracoles
    </h3>

    <p className="text-sm text-slate-500">
      Resultados de las 6 carreras realizadas durante el día
    </p>
  </div>

  <div className="h-80 w-full">

    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={snailRacesData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 10,
        }}
      >

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e2e8f0"
        />

        <XAxis
          dataKey="caracol"
          tick={{
            fill: "#475569",
            fontSize: 12,
          }}
        />

        <YAxis
          allowDecimals={false}
          domain={[0, 6]}
          tick={{
            fill: "#475569",
            fontSize: 12,
          }}
        />

        <Tooltip
          formatter={(value) => [`${value}`, "Victorias"]}
        />

        <Bar
          dataKey="victorias"
          name="Victorias"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

</div>

  </section>
</main>

    );
};
