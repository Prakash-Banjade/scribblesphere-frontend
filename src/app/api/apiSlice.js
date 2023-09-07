import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, userLogout } from "../../features/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  // baseUrl: "http://192.168.1.3:3500",

  // baseUrl: "https://scribblesphere-backend.vercel.app",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {        
    // (headers, api)
    const token = getState().auth.token;

    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("Access-Control-Allow-Origin", true);

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState() // this api is separate than the baseQuery api
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // other status codes can be handled too
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ token: refreshResult?.data?.accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = "Your login has expired";
      }
      api.dispatch(userLogout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Articles", "Users"],
  endpoints: (builder) => ({}),
});
