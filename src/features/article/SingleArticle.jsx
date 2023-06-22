import React from "react";
import "../../scss/SingleArticle.scss";
import ArticleDate from "./ArticleDateAgo";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";

const SingleArticle = ({ article, isAuthor, showContent }) => {
  const { title, content, tags, updatedAt, author } = article;

  const tagsComponent = tags.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  return (
    <article className="singleArticle">
      <header>
        <h3>
          <Link to={`/articles/${article._id}`}>
            {title}
          </Link>
        </h3>
        <div className="article-info flex g-20 align-center">
          <ArticleDate updatedAt={updatedAt} />
          {isAuthor && <span className="flex">
          <CreateIcon />
          {author?.fullname || Unknown}</span>}
        </div>
        <h4 className="tags">{tagsComponent}</h4>
      </header>

      {showContent && <p className="content">{content}</p>}

      <Link to={`/articles/${article._id}`} className="readmore">Read more</Link>
    </article>
  );
};

export default SingleArticle;
