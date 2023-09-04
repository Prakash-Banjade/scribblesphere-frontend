import { apiSlice } from "../../app/api/apiSlice";
import { setCredentials, userLogout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true

        },
      }),
    }),
    generateOtp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/generateOtp",
        method: "POST",
        body: { ...credentials },
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ token: data.accessToken }));
        } catch (err) {
          console.error(err); // handle this error via UI message
        }
      },
    }),
    oAuth: builder.mutation({
      query: (args) => ({
        url: 'auth/Oauth/v2',
        body: { ...args },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
  useOAuthMutation,
  useGenerateOtpMutation,
} = authApiSlice;
