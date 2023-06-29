import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "../../scss/CreateArticle.scss";

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import PropagateLoader from "react-spinners/PropagateLoader";
import { useUpdateArticleMutation } from "../articlesApiSlice";

const UpdateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { currentArticle, setCurrentArticle, setCanAccessUpdate } = useAuth();

  const [updateArticle, { isLoading }] = useUpdateArticleMutation();

  useEffect(() => {
    let stringTags = currentArticle?.tags?.join(",");

    setTitle(currentArticle?.title || "");
    setContent(currentArticle?.content || "");
    setTags(stringTags || "");
  }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "tags") setTags(value);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");

    const articleDetails = {
      id: currentArticle._id,
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

    try {
      const response = await updateArticle(articleDetails);
      //   console.log(response)

      if (response?.data?.status !== 200) {
        console.log(response.error.status);
        throw response.error;
      }
      //   console.log(response.error)
      setSuccessMsg("Updated successfully.");
      setTitle("");
      setContent("");
      setTags("");
      setCurrentArticle({});

      setTimeout(() => {
        navigate("/articles/myarticles");
        setSuccessMsg("");
        setCanAccessUpdate(false)
      }, 1000);
    } catch (error) {
      console.log("error while saving");
      if (error?.data?.message) return setErrMsg(error.data.message);
      setErrMsg("Unable to save. Please report of any inconvinience");
      setCanAccessUpdate(false)
    }
  };

  const handleCancelClick = () => {
    setCurrentArticle({});
    setCanAccessUpdate(false)
    navigate("/articles/myarticles");
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, content, tags]);

  useEffect(() => {
    document.title = "Update Article | ScribbleSphere";
  }, []);

  const override = {
    display: "block",
    margin: "20px auto",
  };
  return (
    <main className="create-article-main">
      <header className="heading">
        <h2>Edit Article</h2>
      </header>

      <form onSubmit={handleSaveClick} className="flex-center flex-column g-20">
        <div className="form-field flex flex-column g-10">
          <label htmlFor="title">Title for you article:</label>
          <textarea
            rows="1"
            id={content}
            placeholder="Minimum of 15 characters and maximum of 100 characters"
            name="title"
            value={title}
            onChange={handleInputChange}
            minLength={15}
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
            placeholder="This field is required"
            value={content}
            onChange={handleInputChange}
            minLength={100}
            maxLength={5000}
            required
          />
        </div>
        <div className="form-field flex flex-column g-10">
          <label htmlFor="tags">Mention some tags (optional)</label>

          <textarea
            placeholder="This field is required"
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
          // color="#0bbe64"
          color="grey"
          cssOverride={override}
          loading={isLoading}
        />

        <div className="actionBtns flex g-10 flex-wrap">
          <Button
            disabled={isLoading}
            type="submit"
            variant="contained"
            onClick={handleSaveClick}
          >
            <span>Save</span>
          </Button>

          <Button
            onClick={handleCancelClick}
            disabled={isLoading}
            variant="contained"
            sx={{
              backgroundColor: "#676767",
              "&:hover": { backgroundColor: "#787878" },
              "&:disabled": {
                opacity: 0.9,
                backgroundColor: "#343434",
              },
            }}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </form>
    </main>
  );
};

export default UpdateArticle;
