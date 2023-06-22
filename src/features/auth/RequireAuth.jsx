import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentRoles } from "./authSlice";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "../../components/Loader";

const RequireAuth = ({ authorizedRoles }) => {
  const roles = useSelector(selectCurrentRoles);

  console.log(roles)

  const location = useLocation();

  return authorizedRoles.some((item) => roles?.includes(item)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} element={<Loader />} replace />
  );
};

export default RequireAuth;
