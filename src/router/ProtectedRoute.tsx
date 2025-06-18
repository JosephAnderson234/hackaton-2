import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth  from "@hooks/useAuthContext";

export function ProtectedRoute() {
	const authContext = useAuth();
	const location = useLocation();

	if (!authContext.session)
		return <Navigate to={`/auth/login?from=${location.pathname}`} replace />;

	return <Outlet />;
}
