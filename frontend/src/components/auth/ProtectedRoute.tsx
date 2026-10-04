import { Navigate, Outlet } from "react-router-dom";
import { authHook } from "../../hooks/auth.hook";

export const ProtectedRoute = () => {
    const {isAuthenticated, isLoading,} = authHook();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
