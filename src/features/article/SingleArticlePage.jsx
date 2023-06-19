import React from "react";
import { useGetArticleByIdQuery } from "../articlesApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import "../../scss/SingleArticlePage.scss";

const SingleArticlePage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetArticleByIdQuery(id);

  const tagsComponent = data?.tags?.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  const articleDate = new Date(data?.updatedAt);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = articleDate.toLocaleDateString("en-US", options);

  const article = isLoading ? (
    <Loader />
  ) : (
    <article className="flex flex-column">
      <header>
        <h3>{data.title}</h3>
        <time
          dateTime={data.updatedAt}
          title={`Published on ${formattedDate}`}
          pubdate="true"
        >
          {formattedDate}
        </time>
        <h4 className="tags flex g-10">{tagsComponent}</h4>
      </header>

      <div className="article-body">
        <p className="content">{data.content}</p>
      </div>

      {/* <ArticleDate updatedAt={updatedAt} /> */}
    </article>
  );

  return <main className="singleArtilePage-main">{article}</main>;
};

export default SingleArticlePage;
