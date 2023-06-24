import React from "react";
import { formatDistanceToNow } from "date-fns";

const ArticleDate = ({ createdAt }) => {
  const formattedTime = formatDistanceToNow(new Date(createdAt));
  const articleTime = formattedTime.startsWith("about ")
    ? formattedTime.slice(5, formattedTime.length)
    : formattedTime;

  return (
    <div className="article-timeline">
      <time dateTime={createdAt} title={`Published ${articleTime} ago`} pubdate="true">
        {articleTime} ago
      </time>
    </div>
  );
};

export default ArticleDate;
