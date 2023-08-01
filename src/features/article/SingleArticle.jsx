import React, { useState } from "react";
import "../../scss/SingleArticle.scss";
import ArticleDate from "./ArticleDateAgo";
import { Link, useNavigate } from "react-router-dom";
import useCalculateReadingTime from "../../hooks/useCalculateReadingTime";
import { setCurrentArticle, resetCurrentArticle } from "./articleSlice";
import { useDispatch } from "react-redux";
import DeleteModal from "../../components/DeleteModal.jsx";
import DOMPurify from 'dompurify';

import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Alert from "@mui/material/Alert";
import { useDeleteArticleMutation } from "./articlesApiSlice";

const SingleArticle = ({
  article,
  isAuthor,
  showContent,
  smallHeading,
  background,
  crud,
}) => {
  const { _id, title, content, tagline, tags, createdAt, author } = article;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();
  const [errDeleteMsg, setErrDeleteMsg] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const readingTime = useCalculateReadingTime(content);

  const tagsComponent = tags.map((tag) => (
    <span className="tag" key={tag}>
      {tag}
    </span>
  ));

  const handleDelete = async () => {
    try {
      const response = await deleteArticle({ id: _id });
      dispatch(resetCurrentArticle())
    } catch (e) {
      console.log(e.message);
      setErrDeleteMsg(e.message);
    }
  };

  const handleEditClick = () => {
    dispatch(setCurrentArticle({ ...article }));
    navigate("/articles/edit");
  };

  return (
    <article className={`singleArticle ${background ? "background" : ""}`}>
      <header>
        <h3>
          <Link
            to={`/articles/${article._id}`}
            className={`${smallHeading ? "small" : ""}`}
          >
            {title}
          </Link>
        </h3>
        <div className="article-info flex flex-wrap align-center">
          <ArticleDate createdAt={createdAt} />
          {isAuthor && (
            <span className="flex-none font-blog" style={{ color: 'var(--text-300)' }}>
              <CreateIcon />
              {author?.fullname || "Unknown"}
            </span>
          )}
          <p className="min-read fw-400 font-blog" style={{ color: 'var(--text-500)' }}>
            {readingTime} read
          </p>
        </div>
        <h4 className="tags flex flex-wrap" style={{ gap: "8px" }}>
          {tagsComponent}
        </h4>
      </header>

      {showContent && <p className="tagline">{tagline}</p>
      }

      <div className="more flex flex-wrap justify-between align-center">
        <Link to={`/articles/${article._id}`} className="readmore">
          Read more
        </Link>

        {errDeleteMsg && (
          <Alert severity="error" sx={{ width: "100%", mb: 1.5 }}>
            {errDeleteMsg}
          </Alert>
        )}

        <DeleteModal
          open={open}
          handleClose={handleClose}
          func={handleDelete}
        />

        {crud && (
          <div className="crud flex g-10">
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={handleEditClick}
              sx={{
                color: 'var(--primary-color)'
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleOpen}
              sx={{
                color: 'white'
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </article>
  );
};

export default SingleArticle;
