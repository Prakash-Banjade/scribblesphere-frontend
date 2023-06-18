import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

const SetHomePage = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  console.log('setting homepage');

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="/dash" state={{ from: location }} replace />
  );
};

export default SetHomePage;