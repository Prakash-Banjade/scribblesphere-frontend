import React, { useEffect, useState } from "react";
import "../../scss/CreateArticle.scss";
import { usePostArticleMutation } from "../articlesApiSlice";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import PropagateLoader from "react-spinners/PropagateLoader";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

    if (content.length < 100)
      return setErrMsg(
        "Too short content. Minimun of 100 characters content is need to be posted."
      );

    console.log(articleDetails);

    try {
      const response = await post({ ...articleDetails });

      setSuccessMsg("You article has been posted successfully.");
      setTitle("");
      setContent("");
      setTags("");

      setTimeout(() => {
        setSuccessMsg("");
      }, 5000);
    } catch (e) {
      console.log(e);
      setErrMsg(e?.message);
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, content, tags]);

  const override = {
    // marginTop: "-20px",
    // marginBottom: "20px",
    display: "block",
    margin: "20px auto",
  };
  return (
    <main className="create-article-main">
      <header className="heading">
        <h2>Create Article</h2>
        <p>
          Write up to your maximum potential! Your article has the power to
          inspire, inform, and captivate readers around the world. Let your
          creativity flow and share your unique perspectives. Remember, every
          great article starts with a single word. Embrace this opportunity to
          make a difference through your writing. Happy article creation!
        </p>
      </header>

      <form onSubmit={handleSubmit} className="flex-center flex-column g-20">
        <div className="form-field flex flex-column g-10">
          <label htmlFor="title">Title for you article:</label>
          <textarea
            rows="1"
            id={content}
            name="title"
            value={title}
            onChange={handleInputChange}
            minLength={10}
            maxLength={100}
            required
          />
        </div>

        <div className="form-field flex flex-column g-10">
          <label htmlFor="content">Start your article here:</label>
          <textarea
            rows="15"
            id={content}
            name="content"
            value={content}
            onChange={handleInputChange}
            minLength={100}
            maxLength={5000}
            required
          />
        </div>
        <div className="form-field flex flex-column g-10">
          <label htmlFor="tags">
            Finally write some tags for you article for searching puspose,
            (Comma separared)
          </label>

          <textarea
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
              You can't leave the title or content empty —{" "}
              <strong>Check it out!</strong>
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
          // color="#0bbe64"
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
            backgroundColor: "var(--primary-color)",
            "&:hover": { backgroundColor: "#b51e4e" },
            "&:disabled": {
              opacity: 0.8,
              backgroundColor: "var(--primary-color)",
            },
          }}
        >
          <span>Post Artile</span>
        </Button>
      </form>
    </main>
  );
};

export default CreateArticle;
