import { apiSlice } from "../app/api/apiSlice";

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "/articles",
        method: "GET",
      }),
    }),
    getMyArticles: builder.query({
      query: () => "/articles/myarticles",
      method: "GET",
    }),
    getLimitedMyArticles: builder.query({
      query: (limit) => ({
        url: `/articles/myarticles?limit=${limit}`,
        method: "GET",
      }),
    }),
    getArticleById: builder.query({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetMyArticlesQuery,
  useGetLimitedMyArticlesQuery,
  useGetArticleByIdQuery,
} = articlesApiSlice;
