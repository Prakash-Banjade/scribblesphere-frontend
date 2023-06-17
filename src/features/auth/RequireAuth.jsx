import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentRoles } from "./authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ authorizedRoles }) => {
  const roles = useSelector(selectCurrentRoles);

  const location = useLocation();

  return authorizedRoles.some((item) => roles?.includes(item)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
