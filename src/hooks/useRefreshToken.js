import axios from "../app/api/axios";
import { setCredentials } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh", {
        withCredentials: true,
      });
      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          roles: response.data.roles,
          fullname: response.data.fullname,
          email: response.data.email,
        })
      );
      return response.data.accessToken;
    } catch (e) {
      console.log(e);
    }
  };

  return refresh;
};

export default useRefreshToken;
