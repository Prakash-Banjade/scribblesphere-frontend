import React from "react";
import { useGetMyArticlesQuery } from "../articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";

const MyArticles = () => {
  const { data, isLoading } = useGetMyArticlesQuery(0);

  const articles = data?.map((data) => {
    return <SingleArticle article={data} key={data._id} showContent />;
  });

  const user = useSelector(selectCurrentUser);

  return (
    <main className="articlesList-main flex flex-column g-20">
      <header>
        <h2>My Articles</h2>
        <p className="flex g-10" title="Author">
            <CreateIcon /> {user}
        </p>
      </header>
      <div className="articlesList flex flex-column">
        {isLoading ? <Loader /> : articles}
      </div>
    </main>
  );
};

export default MyArticles;
