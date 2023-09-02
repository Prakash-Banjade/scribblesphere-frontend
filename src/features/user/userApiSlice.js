import { apiSlice } from "../../app/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Users"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Users"],
    }),
    getUserArticles: builder.query({
      query: (params) => ({
        url: `/users/${params.userId}/articles?limit=${Number(params.limit)}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Articles"],
    }),
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
      invalidatesTags: ["Users"],
    }),
    removeProfilePic: builder.mutation({
      query: () => ({
        url: '/users/upload',
        method: 'DELETE',
      }),
      invalidatesTags: ['Users']
    }),
    getProfilePic: builder.query({
      query: (id) => ({
        url: `/users/upload/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Users"],
    }),
    toggleFollow: builder.mutation({
      query: (id) => ({
        url: '/users/follower',
        method: 'PATCH',
        body: { id }
      }),
      invalidatesTags: ['Users']
    }),
    addToConversation: builder.mutation({
      query: (id) => ({
        url: '/users/conversation/add',
        method: 'POST',
        body: { id }
      }),
      invalidatesTags: ['Users']
    }),
    getConversation: builder.query({
      query: (id) => ({
        url: `/users/conversation/${id}`,
        method: 'GET',
      }),
      providesTags: ["Users"],
    })
  }),
});

export const { useGetAllUsersQuery, useGetUserArticlesQuery, useGetMyDetailsQuery, useSetMyDetailsMutation, useSetProfilePicMutation, useGetProfilePicQuery, useRemoveProfilePicMutation, useGetUserByIdQuery, useToggleFollowMutation, useAddToConversationMutation, useGetConversationQuery } = userApiSlice;