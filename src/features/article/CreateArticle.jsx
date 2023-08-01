import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/CreateArticle.scss";
import { usePostArticleMutation } from "./articlesApiSlice";
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import PropagateLoader from "react-spinners/PropagateLoader";
import useAppTheme from "../../hooks/useAppTheme";
import { MdKeyboardBackspace } from "react-icons/md";
// import TextEditor from "./TextEditor";

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

  // const modules = {
  //   toolbar: [
  //     [{ 'header': [1, 2, 3] }],
  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
  //     ['link', 'image'],
  //     ['clean']
  //   ],
  // }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }], // To add text color and background color options
      [{ 'align': ['right', 'center', ''] }], // To add alignment options with icons
      [{ 'script': 'sub' }, { 'script': 'super' }], // To add subscript and superscript options
      ['link', 'image', 'video'], // To add link, image, and video options
      ['formula'], // To add formula option for mathematical equations
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'ordered', 'bullet', 'check', 'indent', 'color', 'background',
    'align', 'script', 'sub', 'super', 'link', 'image', 'video', 'formula', 'clean'
  ];


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

          <div className="form-field flex flex-col g-10">
            <label htmlFor="article_content">Write content here:</label>
            <div className="rounded-lg" style={{ background: 'var(--text-editor-bg)' }}>
              <ReactQuill id="article_content" className="content-textArea" theme="snow" value={content} onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Start writing your content here"
              />
            </div>
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
