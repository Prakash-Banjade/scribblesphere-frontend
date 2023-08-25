import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidV4 } from 'uuid';
import "../../scss/CreateArticle.scss";
import { useUpdateArticleMutation, useGetArticleByIdQuery } from "./articlesApiSlice";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import { Button, Alert, AlertTitle } from "@mui/material";
import useAppTheme from "../../hooks/useAppTheme";
import { RxCross2 } from 'react-icons/rx'
import { MdKeyboardBackspace } from "react-icons/md";
import useSnackbarShow from "../../hooks/useSnackbarShow";

const TAG_REGEX = /[^A-Za-z0-9.]/g;

const CreateArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagline, setTagline] = useState('')
  const [tagInput, setTagInput] = useState('')


  const { dark } = useAppTheme();

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate()
  const { id } = useParams()

  const [update, { isLoading }] = useUpdateArticleMutation();
  const { data, isLoading: articleLoading, isSuccess: isArticleSuccess } = useGetArticleByIdQuery(id)

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setContent(data.content)
      setTagline(data.tagline)
      setTags(data.tags)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    else if (name === "content") setContent(value);
    else if (name === "tags") setTags(value);
    else if (name === "tagline") setTagline(value);
  };

  // logic for tag entering
  const handleTagInputchange = e => {
    const { value } = e.target;

    if (!value[value.length - 1]?.match(TAG_REGEX)) setTagInput(value);
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      e.preventDefault();
      setTags(prev => [...prev, `#${tagInput}`])
      setTagInput('')
      e.target.focus();
    }

    if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();

      const prevTag = tags.length >= 1 ? tags[tags.length - 1].slice(1) : ''
      setTags(prev => prev.filter((tag, ind) => ind !== prev.length - 1))
      setTagInput(prevTag)
    }
  }

  const handleRemoveTag = (e, currentTag) => {
    setTags(prev => prev.filter(tag => tag !== currentTag));
  }

  const showSnackbar = useSnackbarShow()

  // submitting the article
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrMsg("");

    const articleDetails = {
      title,
      tagline,
      content,
      tags,
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
      const response = await update({ ...articleDetails, id });

      if (response?.data?.status === 200) {
        setSuccessMsg("You article has been posted successfully.");
        setTitle("");
        setContent("");
        setTags([]);

        showSnackbar('Article updated successfully', 'success')
        setTimeout(() => {
          setSuccessMsg("");
          navigate('/articles/myarticles')
        }, 2000);
      } else {
        throw response.error
      }
    } catch (e) {
      setErrMsg(e?.data.message);
      showSnackbar(e.data.message, 'error')
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [title, content, tags, tagline, tagInput]);

  useEffect(() => {
    document.title = "Update Article | ScribbleSphere";
  }, []);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }], // To add text color and background color options
      [{ 'align': ['right', 'center', ''] }], // To add alignment options with icons
      [{ 'script': 'sub' }, { 'script': 'super' }], // To add subscript and superscript options
      ['link', 'image'], // To add link, image, and video options
      ['formula'], // To add formula option for mathematical equations
      ['clean'],
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
    'list', 'ordered', 'bullet', 'check', 'indent', 'color', 'background',
    'align', 'script', 'sub', 'super', 'link', 'image', 'formula', 'clean'
  ];

  return (
    <>
      <button className={`text-2xl mb-5 rounded-md  ${dark ? 'hover:bg-gray-500' : 'hover:bg-slate-300'} transition-all`} style={{ color: 'var(--text-200)' }} onClick={() => navigate(-1)} title="Back">
        <MdKeyboardBackspace />
      </button>

      <div className="create-article-main">
        <header className="heading">
          <h2>Edit Article</h2>
          <p>
            Easy creation, your language, your way, your style.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex-center flex-column g-20 relative min-h-[300px]">
          <div className={`form-field flex flex-col gap-5 mt-5`}>
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
              value={articleLoading ? 'Loading...' : title}
              onChange={handleInputChange}
              minLength={15}
              maxLength={250}
              required
            />
          </div>

          <div className={`form-field flex flex-col gap-5 mt-5`}>
            <div className="flex flex-col">
              <label htmlFor="article_content">Now start writing the content here:</label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Your content is the beating heart of your article, where your thoughts take flight and your voice finds its true expression. It's the realm where imagination knows no bounds, and your ideas come alive.
              </small>
            </div>
            <div id="#textEditor" className="rounded-lg" style={{ background: 'var(--text-editor-bg)' }}>
              <ReactQuill id="article_content" className="content-textArea" theme="snow" value={articleLoading ? 'Loading...' : content} onChange={setContent}
                modules={modules}
                formats={formats}
                placeholder="Let Your Words Dance Across the Pages..."
              />
            </div>
          </div>

          <div className={`form-field flex flex-col gap-5 mt-5`}>
            <div className="flex flex-col">
              <label htmlFor="tagline">
                Write a short tagline for your article
              </label>
              <small className="text-xs font-light" style={{ color: 'var(--text-500)' }}>
                Your tagline is the very first impression that entices readers to delve deeper into your story
              </small>
              <small className="text-xs text-right font-light" style={{ color: 'var(--text-500)' }}>
                {tagline.length} / 1000
              </small>
            </div>

            <textarea
              placeholder="A Snippet of Your Article's Brilliance..."
              name="tagline"
              rows="3"
              id="tagline"
              value={articleLoading ? 'Loading...' : tagline}
              maxLength={1000}
              onChange={handleInputChange}
            />
          </div>

          <div className={`form-field flex flex-col gap-5 mt-5`}>
            <div className="flex flex-col">
              <label htmlFor="tags">
                Finally write some tags <small className="text-xs" style={{ color: 'var(--text-300)' }}>(optional)</small>
              </label>
              <small className="text-xs font-light flex items-center justify-between" style={{ color: 'var(--text-500)' }}>
                Tags are the silent heroes that wield incredible power within your article
                <span>{tags.length} / 5</span>
              </small>
            </div>

            <div className="textArea-wrapper flex flex-wrap">
              <section className="m-2 flex gap-1 flex-wrap">
                {
                  tags.map(tag => (
                    <span className="px-2 py-1 h-[32px] rounded-md flex items-center gap-1" key={uuidV4()}>{tag}
                      <button type="button" title="Remove" onClick={(e) => handleRemoveTag(e, tag)}>
                        <RxCross2 />
                      </button>
                    </span>))
                }
              </section>
              {tags.length < 5 && <textarea
                placeholder="Enter to add"
                name="tags"
                rows="1"
                maxLength={15}
                id="tags"
                value={tagInput}
                onKeyDown={handleKeyDown}
                onChange={handleTagInputchange}
              />}
            </div>
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
                <AlertTitle>Updated Successfully</AlertTitle>
                {successMsg}
              </Alert>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {(!title || !content || !tagline) && <small className="text-xs text-center font-light" style={{ color: 'var(--text-500)' }}>
              You can't leave the {!title ? 'title' : !content ? 'content' : 'tagline'} blank.
            </small>}
            <div className="flex items-center flex-wrap gap-2 justify-end">
              <Button
                type="button"
                disabled={isLoading || (!title || !content || !tagline)}
                onClick={() => navigate(-1)}
                variant="outlined"
                sx={{ padding: '10px 25px' }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading || (!title || !content || !tagline)}
                type="submit"
                variant="contained"
                sx={{
                  padding: '10px 25px',
                  color: 'white',
                  backgroundColor: "var(--primary-color)",
                  "&:disabled": {
                    color: 'white',
                    backgroundColor: "var(--primary-color)",
                    opacity: 0.5,
                  },
                }}
              >
                <span>
                  {isLoading ? 'Updating...' : 'Update'}
                </span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateArticle;
