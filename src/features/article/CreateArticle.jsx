import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../scss/CreateArticle.scss";
import { usePostArticleMutation } from "./articlesApiSlice";
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import { Button, Alert, AlertTitle, IconButton } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import PropagateLoader from "react-spinners/PropagateLoader";
import useAppTheme from "../../hooks/useAppTheme";
import { MdKeyboardBackspace } from "react-icons/md";
// import TextEditor from "./TextEditor";

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [tagline, setTagline] = useState('')


  const { dark } = useAppTheme();

  const [activeTab, setActiveTab] = useState(1)

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate()

  const [post, { isLoading }] = usePostArticleMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "tags") setTags(value);
    else if (name === "tagline") setTagline(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");

    const articleDetails = {
      title,
      tagline,
      content,
      tags: tags
        ? tags
          .replace(/\s/g, "")
          .split(",")
          .filter((tag) => tag !== "")
        : [],
    };

    if (!title || !content || !tagline)
      return setErrMsg("Title, content and tagline are mandatory");

    if (title.length < 15)
      return setErrMsg(
        "You title length is too short. Try something more relevant"
      );

    if (content.length < 1000)
      return setErrMsg(
        "Too short content. Minimun of 1000 characters content is need to be posted."
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
  }, [title, content, tags, tagline]);

  useEffect(() => {
    document.title = "Create Article | ScribbleSphere";
  }, []);

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

        <form onSubmit={handleSubmit} className="flex-center flex-column g-20 relative min-h-[300px]">
          <div className={`form-field flex flex-col gap-5  ${activeTab === 1 ? 'opacity-100 pointer-events-auto static' : 'opacity-0 pointer-events-none absolute'}`}>
            <div className="flex flex-col">
              <label htmlFor="title">Title for you article:</label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Your title is the key to unlocking the full potential of your article
              </small>
              <small className="text-xs text-right font-light" style={{ color: 'var(--text-500)' }}>
                {title.length} / 250
              </small>
            </div>
            <textarea
              rows="3"
              id="title"
              placeholder="Craft a Headline that Leaves a Mark.."
              name="title"
              value={title}
              onChange={handleInputChange}
              minLength={15}
              maxLength={250}
              required
            />
          </div>

          <div className={`form-field flex flex-col gap-5 ${activeTab === 2 ? 'opacity-100 pointer-events-auto static' : 'opacity-0 pointer-events-none absolute'}`}>
            <div className="flex flex-col">
              <label htmlFor="article_content">Now start writing the content here:</label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Your content is the beating heart of your article, where your thoughts take flight and your voice finds its true expression. It's the realm where imagination knows no bounds, and your ideas come alive.
              </small>
            </div>
            <div className="rounded-lg" style={{ background: 'var(--text-editor-bg)' }}>
              <ReactQuill id="article_content" className="content-textArea" theme="snow" value={content} onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Let Your Words Dance Across the Pages..."
              />
            </div>
          </div>

          <div className={`form-field flex flex-col gap-5 ${activeTab === 3 ? 'opacity-100 pointer-events-auto static' : 'opacity-0 pointer-events-none absolute'}`}>
            <div className="flex flex-col">
              <label htmlFor="tagline">
                Write a short tagline for your article
              </label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Your tagline is the very first impression that entices readers to delve deeper into your story
              </small>
              <small className="text-xs text-right font-light" style={{ color: 'var(--text-500)' }}>
                {tagline.length} / 250
              </small>
            </div>

            <textarea
              placeholder="A Snippet of Your Article's Brilliance..."
              name="tagline"
              rows="3"
              id="tagline"
              value={tagline}
              onChange={handleInputChange}
            />
          </div>

          <div className={`form-field flex flex-col gap-5 ${activeTab === 4 ? 'opacity-100 pointer-events-auto static' : 'opacity-0 pointer-events-none absolute'}`}>
            <div className="flex flex-col">
              <label htmlFor="tags">
                Finally write some tags,
                (Comma separared) <small className="text-xs" style={{ color: 'var(--text-300)' }}>(optional)</small>
              </label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Tags are the silent heroes that wield incredible power within your article
              </small>
            </div>

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

          <div className="flex gap-10 items-center justify-center mt-auto">
            <IconButton
              sx={{ color: "var(--text-300)", '&:disabled': { color: 'var(--text-500)' } }}
              disabled={activeTab === 1}
              title="Previous"
              onClick={() => {
                setActiveTab(activeTab !== 1 ? activeTab - 1 : activeTab)
              }}
            >
              <ArrowCircleLeftIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
            <IconButton
              sx={{ color: "var(--text-300)", '&:disabled': { color: 'var(--text-500)' } }}
              title="Next"
              onClick={() => {
                setActiveTab(activeTab < 4 ? activeTab + 1 : activeTab)
              }}
              disabled={activeTab === 4}
            >
              <ArrowCircleRightIcon sx={{ fontSize: '2.5rem' }} />
            </IconButton>
          </div>

          {activeTab === 4 && <div className="flex flex-col gap-3">
          <small className="text-xs text-center font-light" style={{ color: 'var(--text-500)' }}>
                You can't leave the {!title? 'title' : !content? 'content' : 'tagline'} blank.
              </small>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || (!title || !content || !tagline)}
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
          </div>}
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
