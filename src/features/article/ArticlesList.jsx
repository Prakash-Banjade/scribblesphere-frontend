import React from "react";
import { useGetArticlesQuery } from "../articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

const ArticlesList = () => {
  const { data, isLoading } = useGetArticlesQuery();

  const articles = data?.map((data) => {
    return <SingleArticle article={data} isAuthor key={data._id} showContent />;
  });
  return (
    <main className="articlesList-main flex flex-column">
      <header>
        <h2>Fresh Perspectives</h2>
        <p>Discover the Cutting Edge in Latest Articles From Other Users</p>
      </header>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="articlesList flex flex-column">{articles}</div>
      )}
    </main>
  );
};

export default ArticlesList;
