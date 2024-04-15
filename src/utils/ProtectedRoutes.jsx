import { Outlet, Navigate } from "react-router-dom";

const useAuth = () => {
  const token = localStorage.getItem("token");
  return token != null;
};

export const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedLoginRoute = () => {
  const isAuth = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to="/home" />;
};
