import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, userLogout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // console.log('logging out')
        try {
          const { data } = await queryFulfilled;
          dispatch(userLogout());
          // console.log(data)
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState()); // very important to reset the data previously cached before logout
            
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // const { accessToken, fullname, email, roles } = data;
          // console.log(data)
          dispatch(setCredentials({ token: data.accessToken }));
        } catch (err) {
          console.error(err); // handle this error via UI message
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
