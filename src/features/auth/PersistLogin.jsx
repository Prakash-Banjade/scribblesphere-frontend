import useRefreshToken from "../../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import Loader from "../../components/Loader";


const PersistLogin = () => {
  const { persist } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken(); 
  const token = useSelector(selectCurrentToken);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (e) {
        console.log(e);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);


  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Loader />
      ) : (
        <Outlet />
      )}

    </>
  );
};

export default PersistLogin;
