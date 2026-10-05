import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect } from "react";

import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { authStore } from "./stores/auth.store";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { PaymentSuccess } from "./pages/Payment/PaymentSuccess";
import { PaymentFailed } from "./pages/Payment/PaymentFailed";


function App() {
  const initialize = authStore((state) => state.initialize);
  const isLoading = authStore((state) => state.isLoading);

  useEffect(() => {initialize();}, [initialize]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Stripe - recarga exitosa */}
          <Route
            path="/payment/success"
            element={<PaymentSuccess />}
          />

          {/* Stripe - recarga fallida */}
          <Route
            path="/payment/failed"
            element={<PaymentFailed />}
          />
        </Route>

        {/* Ruta desconocida */}
        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
