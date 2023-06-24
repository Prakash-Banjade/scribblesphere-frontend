import React from "react";
import "../../scss/SingleArticle.scss";
import ArticleDate from "./ArticleDateAgo";
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import useCalculateReadingTime from "../../hooks/useCalculateReadingTime";

const SingleArticle = ({ article, isAuthor, showContent, smallHeading, background }) => {
  const { title, content, tags, createdAt, author } = article;

  const readingTime = useCalculateReadingTime(content);

  const tagsComponent = tags.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  return (
    <article className={`singleArticle ${background? 'background': ''}`}>
      <header>
        <h3>
          <Link to={`/articles/${article._id}`} className={`${smallHeading? 'small': ''}`}>{title}</Link>
        </h3>
        <div className="article-info flex g-20 align-center">
          <ArticleDate createdAt={createdAt} />
          {isAuthor && (
            <span className="flex color-ccc">
              <CreateIcon />
              {author?.fullname || 'Unknown'}
            </span>
          )}
          <p className="min-read color-ccc fw-400 font-blog">
            {readingTime} read
          </p>
        </div>
        <h4 className="tags flex flex-wrap" style={{gap: '8px'}}>{tagsComponent}</h4>
      </header>

      {showContent && <p className="content">{content}</p>}

      <Link to={`/articles/${article._id}`} className="readmore">
        Read more
      </Link>
    </article>
  );
};

export default SingleArticle;
