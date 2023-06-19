import React from "react";
import { useGetArticlesQuery } from "../articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import '../../scss/ArticlesList.scss'

const ArticlesList = () => {
  const { data, isLoading } = useGetArticlesQuery();

  const articles = data?.map((data) => {
    return <SingleArticle article={data} author />;
  });
  return (
    <main className="articlesList-main flex flex-column g-20">
      {isLoading ? <Loader /> : articles}
    </main>
  );
};

export default ArticlesList;
