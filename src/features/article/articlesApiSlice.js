import { apiSlice } from "../../app/api/apiSlice";

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "/articles",
      providesTags: ["Articles"],
    }),
    getMyArticles: builder.query({
      query: (limit) => ({
        url: `articles/myarticles?limit=${Number(limit)}`,
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
    postArticle: builder.mutation({
      query: (articlesDetails) => ({
        url: `/articles`,
        method: "POST",
        body: JSON.stringify({ ...articlesDetails }),
      }),
      invalidatesTags: ["Articles"],
    }),
    postComment: builder.mutation({
      query: (commentDetails) => ({
        url: `/articles/${commentDetails.id}/comment`,
        method: "POST",
        body: JSON.stringify({ comment: commentDetails.comment }),
      }),
      invalidatesTags: ["Articles"],
    }),
    searchArticle: builder.query({
      query: ({ q }) => ({
        url: `/articles/search?q=${encodeURIComponent(q)}`,
        method: "GET",
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation({
      query: ({ id }) => ({
        url: '/articles',
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation({
      query: (article) => ({
        url: '/articles/',
        method: "PATCH",
        body: {...article}
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetMyArticlesQuery,
  useGetArticleByIdQuery,
  usePostCommentMutation,
  usePostArticleMutation,
  useSearchArticleQuery,
  useLazySearchArticleQuery,
  useDeleteArticleMutation,
  useUpdateArticleMutation
} = articlesApiSlice;