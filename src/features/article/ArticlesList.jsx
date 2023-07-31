import React, { useState, useRef, useEffect } from "react";
import { useGetArticlesQuery } from "./articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

const ArticlesList = () => {
  const { data, isLoading } = useGetArticlesQuery();

  const articles = Array.isArray(data) ? (
    data?.reverse()?.map((data) => {
      return (
        <SingleArticle article={data} isAuthor key={data._id} showContent />
      );
    })
  ) : (
    <p
      className="fw-500 color-ccc font-blog"
      style={{ marginLeft: "20px", fontSize: "1.4rem" }}
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
