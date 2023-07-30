import React from "react";
import useAuth from "../../hooks/useAuth";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

const RequireAuth = ({ authorizedRoles }) => {
  const { roles } = useAuth();

  const location = useLocation();

  return roles?.some((item) => authorizedRoles?.includes(item)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} element={<Loader />} replace />
  );
};

export default RequireAuth;
