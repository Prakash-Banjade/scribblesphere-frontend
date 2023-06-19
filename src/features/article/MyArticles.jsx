import React from "react";
import { useGetMyArticlesQuery } from "../articlesApiSlice";

const MyArticles = () => {
  const { data, isLoading } = useGetMyArticlesQuery();
  return (
    <main>
      <h1>My Articles</h1>
      {isLoading ? <h2>Loading...</h2> : JSON.stringify(data)}
    </main>
  );
};

export default MyArticles;
