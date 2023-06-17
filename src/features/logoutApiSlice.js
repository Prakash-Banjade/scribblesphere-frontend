import { apiSlice } from "../app/api/apiSlice";

export const logoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApiSlice;
