import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyDetails: builder.query({
      query: () => ({
        url: "/users/getmydetails",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Users"],
    }),
    setMyDetails: builder.mutation({
      query: (args) => ({
        url: "/users/editmydetails",
        method: "PATCH",
        body: { ...args },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Users"],
    }),
    setProfilePic: builder.mutation({
      query: (file) => ({
        url: 'users/upload',
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ["Users"]
    }),
    getProfilePic: builder.query({
      query: () => ({
        url: "/users/upload",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetMyDetailsQuery, useSetMyDetailsMutation, useSetProfilePicMutation, useGetProfilePicQuery } = userApiSlice;