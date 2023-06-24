import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, userLogout } from "../../features/auth/authSlice";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {

    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    const fullname = api.getState().auth.fullname;
    const email = api.getState().auth.email;
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data, fullname, email }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(userLogout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Articles"],
  endpoints: (builder) => ({}),
});
