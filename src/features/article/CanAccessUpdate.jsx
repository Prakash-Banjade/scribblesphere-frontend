import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";

const CanAccessUpdate = () => {
  const { canAccessUpdate } = useAuth();

  const location = useLocation();

  return canAccessUpdate ? (
    <Outlet />
  ) : (
    <Navigate
      to="/articles/myarticles"
      state={{ from: location }}
      element={<Loader />}
      replace
    />
  );
};

export default CanAccessUpdate;
