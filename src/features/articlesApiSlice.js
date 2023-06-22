import { apiSlice } from "../app/api/apiSlice";

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/articles",
      providesTags: ["Articles"],
    }),
    getMyArticles: builder.query({
      query: () => "/articles/myarticles",
      providesTags: ["Articles"],
    }),
    getLimitedMyArticles: builder.query({
      query: (limit) => ({
        url: `/articles/myarticles?limit=${limit}&timestamp=${Date.now()}`,
        method: 'GET',
      }),
      providesTags: ["Articles"],
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
      providesTags: ["Articles"],
    }),
    postComment: builder.mutation({
      query: (commentDetails) => ({
        url: `/articles/${commentDetails.id}/comment`,
        method: "POST",
        body: JSON.stringify({ comment: commentDetails.comment }),
      }),
      invalidatesTags: ['Articles']
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetMyArticlesQuery,
  useGetLimitedMyArticlesQuery,
  useGetArticleByIdQuery,
  usePostCommentMutation,
} = articlesApiSlice;
