import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect jika role tidak diizinkan
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
