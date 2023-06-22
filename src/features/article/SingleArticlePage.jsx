import React, { useState } from "react";
import {
  useGetArticleByIdQuery,
  usePostCommentMutation,
} from "../articlesApiSlice";
import { selectCurrentUser } from "../auth/authSlice";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { v4 as uuid } from "uuid";
import Loader from "../../components/Loader";
import "../../scss/SingleArticlePage.scss";
import CreateIcon from "@mui/icons-material/Create";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpinnerLoader from "../../components/SpinnerLoader";
import { useSelector } from "react-redux";

const SingleArticlePage = () => {
  const { id } = useParams();

  const [comment, setComment] = useState("");
  const { data, isLoading } = useGetArticleByIdQuery(id);
  const [postComment] = usePostCommentMutation();

  const tagsComponent = data?.tags?.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  const articleDate = new Date(data?.updatedAt);

  const options = { month: "long", day: "numeric", year: "numeric" };
  const formattedDate = articleDate.toLocaleDateString("en-US", options);

  const formattedDateAgo = formatDistanceToNow(new Date());

  const calculateReadingTime = (content) => {
    const averageReadingSpeed = 200;
    const cleanContent = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    const words = cleanContent.split(/\s+/);
    const readingTime = Math.ceil(words.length / averageReadingSpeed);

    const noun = readingTime <= 1 ? "minute" : "minutes";
    return `${readingTime} ${noun}`;
  };

  const article = isLoading ? (
    <Loader />
  ) : (
    <>
      <article className="flex flex-column">
        <div className="article-author">
          <span className="flex">
            <AccountCircleIcon sx={{ fontSize: "4rem" }} />
            <p>
              {data?.author?.fullname || Unknown} <br />
              Author
            </p>
          </span>
        </div>
        <header>
          <h3>{data.title}</h3>
          <div className="article-info-summary flex g-20 align-center">
            <time
              dateTime={data.updatedAt}
              title={`Published on ${formattedDate}`}
              pubdate="true"
            >
              {formatDistanceToNow(articleDate)} ago
            </time>

            <p className="min-read color-ccc fw-500 font-blog-text">
              {calculateReadingTime(data.content)} read
            </p>
          </div>
          <h4 className="tags flex g-10">{tagsComponent}</h4>
        </header>

        <div className="article-body">
          <p className="content">{data.content}</p>
        </div>
      </article>
    </>
  );

  const handleCommentPost = async (e) => {
    e.preventDefault();
    try {
      const message = await postComment({ id, comment }).unwrap();
      setComment('')
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentChange = (e) => setComment(e.target.value);

  const SingleComment = ({ comment }) => {
    return (
      <div className="comments flex g-20">
        <div className="comment-profile-icon">
          <AccountCircleIcon
            sx={{ fontSize: "2rem", color: "var(--text-white)" }}
            title={comment.author.fullname}
          />
        </div>

        <div className="comment-details">
          <div className="comment-author">{comment.author.fullname}</div>

          <p>{comment.text}</p>
        </div>
      </div>
    );
  };

  const comments = isLoading ? (
    <Loader />
  ) : data?.comments?.length ? (
    data.comments.map((comment) => (
      <SingleComment comment={comment} key={uuid()} />
    ))
  ) : (
    <p style={{ fontFamily: "var(--blog-text)", color: "var(--text-white)" }}>
      No comments. Be the first to comment
    </p>
  );

  return (
    <main className="singleArtilePage-main">
      {article}

      {!isLoading && <hr />}

      {!isLoading && (
        <section className="comment-section">
          <h2>Comments</h2>
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
