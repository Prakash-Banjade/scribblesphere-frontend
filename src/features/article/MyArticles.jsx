import React, { useEffect } from "react";
import { useGetUserArticlesQuery } from "../user/userApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";
import "../../scss/ArticlesList.scss";

import CreateIcon from "@mui/icons-material/Create";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MyArticles = () => {
  const { fullname, userId } = useAuth();
  const { data, isLoading } = useGetUserArticlesQuery({userId, limit: 0});

  const articles = data?.map((data) => {
    return <div className="myArticle" key={data._id}>
      <SingleArticle article={data} key={data._id} showContent crud />
    </div>;
  });


  useEffect(() => {
    document.title = "My Articles | ScribbleSphere"
  }, [])

  return (
    <div className="articlesList-main flex flex-column g-20">
      {data?.length !== 0 ? (
        <>
          <header className="heading">
            <h2>My Articles</h2>
            <p className="flex g-10 w-fit" title="Author">
              <CreateIcon /> {fullname}
            </p>
          </header>
          <div className="articlesList flex flex-column">
            {isLoading ? <Loader /> : articles}
          </div>
        </>
      ) : (
        <div className="noArticles-msg flex-center flex-column g-10" style={{ padding: '10px' }}>
          <p className="text-lg" style={{ color: 'var(--text-200)' }}>You haven't created any articles.</p>
          <Button
            variant="contained"
            type="button"
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              fontWeight: "600",
              mt: 1,
              "&:hover": { backgroundColor: "#00a954" },
            }}
            size="large"
          >
            <Link to="/articles/create" className="color-text-white">
              Create now
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
