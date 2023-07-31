import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/CreateArticle.scss";
import { usePostArticleMutation } from "./articlesApiSlice";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import PropagateLoader from "react-spinners/PropagateLoader";
import useAppTheme from "../../hooks/useAppTheme";
import { MdKeyboardBackspace } from "react-icons/md";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { dark } = useAppTheme();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate()

  const [post, { isLoading }] = usePostArticleMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "tags") setTags(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");

    const articleDetails = {
      title,
      content,
      tags: tags
        ? tags
          .replace(/\s/g, "")
          .split(",")
          .filter((tag) => tag !== "")
        : [],
    };

    if (!title || !content)
      return setErrMsg("You article must have title and content");

    if (title.length < 15)
      return setErrMsg(
        "You title length is too short. Try something more relevant"
      );

    if (content.length < 1000)
      return setErrMsg(
        "Too short content. Minimun of 100 characters content is need to be posted."
      );

    try {
      const response = await post({ ...articleDetails });
      if (response?.data?.status === 201) {
        setSuccessMsg("You article has been posted successfully.");
        setTitle("");
        setContent("");
        setTags("");

        setTimeout(() => {
          setSuccessMsg("");
          navigate('/articles/myarticles')
        }, 2000);
      } else {
        throw response.error
      }
    } catch (e) {
      setErrMsg(e?.data.message);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, content, tags]);

  useEffect(() => {
    document.title = "Create Article | ScribbleSphere";
  }, []);

  const override = {
    display: "block",
    margin: "20px auto",
  };

  return (
    <>
      <button className={`text-2xl mb-5 rounded-md  ${dark ? 'hover:bg-gray-500' : 'hover:bg-slate-300'} transition-all`} style={{ color: 'var(--text-200)' }} onClick={() => navigate(-1)} title="Back">
        <MdKeyboardBackspace />
      </button>
      <div className="create-article-main">
        <header className="heading">
          <h2>Create Article</h2>
          <p>
            Easy creation, your language, your way, your style.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex-center flex-column g-20">
          <div className="form-field flex flex-column g-10">
            <label htmlFor="title">Title for you article:</label>
            <textarea
              rows="2"
              id={content}
              placeholder="15 to 150 chars only"
              name="title"
              value={title}
              onChange={handleInputChange}
              minLength={15}
              maxLength={150}
              required
            />
          </div>

          <div className="form-field flex flex-column g-10">
            <label htmlFor="content">Start your article here:</label>
            <textarea
              rows="15"
              id={content}
              name="content"
              placeholder="Minimum 1000 characters"
              value={content}
              onChange={handleInputChange}
              minLength={1000}
              maxLength={10000}
              required
            />
          </div>
          <div className="form-field flex flex-column g-10">
            <label htmlFor="tags">
              Finally write some tags for you article for searching puspose,
              (Comma separared) <small className="text-xs" style={{ color: 'var(--text-300)' }}>(optional)</small>
            </label>

            <textarea
              placeholder="Max 5 tags allowed"
              name="tags"
              rows="1"
              id="tags"
              value={tags}
              onChange={handleInputChange}
            />
          </div>

          {errMsg && (
            <div className="error">
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {errMsg}
              </Alert>
            </div>
          )}

          {successMsg && (
            <div className="success">
              <Alert severity="success">
                <AlertTitle>Successfully Posted</AlertTitle>
                {successMsg}
              </Alert>
            </div>
          )}

          <PropagateLoader
            color="grey"
            cssOverride={override}
            loading={isLoading}
          />

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            type="submit"
            variant="contained"
            sx={{
              width: "100%",
              padding: '10px',
              color: 'white',
              backgroundColor: "var(--primary-color)",
              "&:disabled": {
                opacity: 0.8,
              },
            }}
          >
            <span>
              {isLoading ? 'Posting...' : 'Post Article'}
            </span>
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
