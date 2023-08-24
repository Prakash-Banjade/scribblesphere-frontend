import { apiSlice } from "../../app/api/apiSlice";

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/articles",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Articles"],
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ["Articles"],
    }),
    postArticle: builder.mutation({
      query: (articlesDetails) => ({
        url: `/articles`,
        method: "POST",
        body: JSON.stringify({ ...articlesDetails }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    postComment: builder.mutation({
      query: (commentDetails) => ({
        url: `/articles/${commentDetails.id}/comment`,
        method: "POST",
        body: JSON.stringify({ comment: commentDetails.comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    searchArticle: builder.query({
      query: ({ q }) => ({
        url: `/articles/search?q=${encodeURIComponent(q)}`,
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: ({ id }) => ({
        url: '/articles',
        method: "DELETE",
        body: { id },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: (article) => ({
        url: '/articles/',
        method: "PATCH",
        body: { ...article },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleByIdQuery,
  usePostCommentMutation,
  usePostArticleMutation,
  useSearchArticleQuery,
  useLazySearchArticleQuery,
  useDeleteArticleMutation,
  useUpdateArticleMutation
} = articlesApiSlice;
