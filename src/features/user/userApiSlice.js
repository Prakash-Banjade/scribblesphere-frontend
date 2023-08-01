import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyDetails: builder.query({
      query: () => "/users/getmydetails",
      providesTags: ["Users"],
    }),
    setMyDetails: builder.mutation({
        query: (args) => ({
            url: "/users/editmydetails",
            method: "PATCH",
            body: {...args}
        })
    })
  }),
});

export const {useGetMyDetailsQuery, useSetMyDetailsMutation} = userApiSlice;