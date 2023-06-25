import React, { useState, useEffect } from "react";
import {
  useGetArticleByIdQuery,
  usePostCommentMutation,
} from "../articlesApiSlice";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import "../../scss/SingleArticlePage.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useCalculateReadingTime from "../../hooks/useCalculateReadingTime";
import NotFound from "../../components/404";

const SingleArticlePage = () => {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const { data, isLoading } = useGetArticleByIdQuery(id);
  const [postComment] = usePostCommentMutation();

  useEffect(() => {
    document.title = data?.title
      ? `${data?.title} | ScribbleSphere`
      : "Article | ScribbleSphere";
  }, []);

  const tagsComponent = data?.tags?.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  const articleDate = data ? new Date(data?.createdAt) : new Date();

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = articleDate.toLocaleDateString("en-US", options);

  const readingTime = useCalculateReadingTime(data?.content);

  const article = isLoading ? (
    <Loader />
  ) : data ? (
    <article className="flex flex-column">
      <div className="article-author">
        <span className="flex">
          <AccountCircleIcon sx={{ fontSize: "4rem" }} />
          <p>
            {data?.author?.fullname || "Unknown"} <br />
            Author
          </p>
        </span>
      </div>
      <header>
        <h3>{data?.title}</h3>
        <div className="article-info-summary flex g-20 align-center">
          <time
            dateTime={data.createdAt}
            title={`Published on ${formattedDate}`}
            pubdate="true"
          >
            {formatDistanceToNow(articleDate)} ago
          </time>

          <p className="min-read color-ccc fw-500 font-blog-text">
            {readingTime} read
          </p>
        </div>
        <h4 className="tags flex flex-wrap g-10">{tagsComponent}</h4>
      </header>

      <div className="article-body">
        <p className="content">{data?.content}</p>
      </div>
    </article>
  ) : (
    <NotFound />
  );

  const handleCommentPost = async (e) => {
    e.preventDefault();
    try {
      const message = await postComment({ id, comment }).unwrap();
      setComment("");
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const SingleComment = ({ comment }) => {
    const commentDateAgo = formatDistanceToNow(new Date(comment.createdAt))
    return (
      <div className="comments flex g-20">
        <div className="comment-profile-icon">
          <AccountCircleIcon
            sx={{ fontSize: "2rem", color: "var(--text-white)" }}
            title={comment?.author?.fullname || 'unknown'}
          />
        </div>

        <div className="comment-details">
          <div className="comment-author flex justify-between align-center">

            <h3>{comment?.author?.fullname || 'unknown'}</h3>
            <time className="color-ccc font-blog" dateTime={comment?.createdAt} pubdate>{commentDateAgo} ago</time>
          </div>

          <p>{comment.text}</p>
        </div>
      </div>
    );
  };

  const comments = isLoading ? (
    <Loader />
  ) : data?.comments?.length ? (
    data.comments.map((comment) => (
      <div className="comment-wrapper" key={uuid()}>
        <SingleComment comment={comment} />
        <hr className="comment-divider" />
      </div>
    ))
  ) : (
    <p style={{ fontFamily: "var(--blog-text)", color: "var(--text-white)" }}>
      No comments. Be the first to comment
    </p>
  );

  return (
    <main className="singleArtilePage-main">
      {article}

      {!isLoading && data && <hr />}

      {!isLoading && data && (
        <section className="comment-section">
          <header>
            <h2>Comments</h2>
            <small className="color-ccc">
              Comments are write only. You can't edit or delete your comment
              once posted.
            </small>
          </header>
          <div className="add-comment-form">
            <form onSubmit={handleCommentPost}>
              <div className="form-field flex flex-column g-10">
                <label htmlFor="comment">Add a comment</label>
                <textarea
                  rows="2"
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                />
              </div>

              <button type="submit" title="Add comment">
                Add
              </button>
            </form>
          </div>

          <div className="comments-list flex flex-column g-10">{comments}</div>
        </section>
      )}
    </main>
  );
};

export default SingleArticlePage;
