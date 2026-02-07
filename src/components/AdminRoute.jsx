import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>; // Or a nice spinner
  }

  if (user && user.role === 'admin') {
    return <Outlet />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
