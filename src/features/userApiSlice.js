import { apiSlice } from "../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyDetails: builder.query({
      query: () => "/users/getmydetails",
      providesTags: ["Users"],
    }),
    setMyDetails: builder.mutation({
        query: () => ({
            url: "/users/setmydetails",
            method: "PATCH",
            body: {}
        })
    })
  }),
});

export const {useGetMyDetailsQuery, useSetMyDetailsMutation} = userApiSlice;