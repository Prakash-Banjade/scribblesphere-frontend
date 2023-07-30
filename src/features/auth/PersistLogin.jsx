import React, { useEffect, useState, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import usePersist from "../../hooks/usePersist";

import Loader from "../../components/Loader";

const PersistLogin = () => {
  const [persist] = usePersist();

  const effectRan = useRef(false);

  const token = useSelector(selectCurrentToken);
  const [success, setSuccess] = useState(false);

  const [refresh, { isUninitialized, isSuccess, isError, isLoading, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const { accessToken } = response.data
          setSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken(); // when the page reloads there isn't token and if persist, verifyRefreshToken()
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log("loading");
    content = <Loader />;
  } else if (isError) {
    //persist: yes, token: no
    // console.log("error");
    content = (
      <p className="errmsg">
        {error.data?.message}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && success) {
    //persist: yes, token: yes
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log("token and uninit");
    // console.log(isUninitialized);
    content = <Outlet />;
  }


  return content;
};

export default PersistLogin;
