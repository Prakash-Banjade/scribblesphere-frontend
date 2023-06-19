import React from "react";
import { useGetMyArticlesQuery } from "../articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

import CreateIcon from "@mui/icons-material/Create";

const MyArticles = () => {
  const { data, isLoading } = useGetMyArticlesQuery(0);

  const articles = data?.map((data) => {
    return <SingleArticle article={data} key={data._id} />;
  });

  return (
    <main className="articlesList-main flex flex-column g-20">
      <header>
        <h2>My Articles</h2>
        <p className="flex g-10" title="Author">
            <CreateIcon /> {author.fullname}
        </p>
      </header>
      <div className="articlesList flex flex-column">
        {isLoading ? <Loader /> : articles}
      </div>
    </main>
  );
};

export default MyArticles;
