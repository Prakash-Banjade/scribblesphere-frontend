import React, { useState, useRef, useEffect } from "react";
import { useGetArticlesQuery } from "./articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

const ArticlesList = () => {
  const { data, isLoading } = useGetArticlesQuery();

  const articles = Array.isArray(data) ? (
    data?.map((data) => {
      return (
        <SingleArticle article={data} isAuthor key={data._id} showContent />
      );
    })
  ) : (
    <p
      className="font-blog text-lg font-medium"
      style={{ color: 'var(--text-500)'}}
    >
      No articles has been published yet. Be the fist to post.
    </p>
  );

  return (
    <div className="articlesList-main flex flex-column g-20">
      <header className="heading">
        <h2>Fresh Perspectives</h2>
        <p>Discover the Cutting Edge in Latest Articles From Other Users</p>
      </header>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="articlesList flex flex-column">{articles}</div>
      )}
    </div>
  );
};

export default ArticlesList;
