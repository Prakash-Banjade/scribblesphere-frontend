import React, { useEffect, useState, useRef } from "react";
import { useSearchArticleQuery } from "./articlesApiSlice";
import SingleArticle from "./SingleArticle";
import Loader from "../../components/Loader";

import SearchIcon from "@mui/icons-material/Search";
import "../../scss/SearchArticles.scss";

const SearchArticles = () => {
  const [query, setQuery] = useState("");
  const [renderSearchArticles, setRenderSearchArticles] = useState(false);

  const searchInputRef = useRef();
  const searchContainerRef = useRef();

  const handleSearchSubmit = () => {
    setRenderSearchArticles(true);
  };

  const { data, isLoading } = useSearchArticleQuery({ q: query });

  const articles = Array.isArray(data) && data?.length !== 0 ? (
    data?.map((data) => {
      return <SingleArticle article={data} isAuthor key={data._id} />;
    })
  ) : Array.isArray(data) && data?.length === 0 ? (
    <p
      className="fw-500 color-ccc font-blog"
      style={{ fontSize: "1.4rem" }}
    >
      No article found with your query
    </p>
  ) : (
    ""
  );

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <main className="searchArticles">
      <div className="search-wrapper flex-center">
        <div className="search-container" ref={searchContainerRef}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search article here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          className="searchIcon flex-center"
          title="Search"
          onClick={handleSearchSubmit}
          type="submit"
        >
          <SearchIcon sx={{ color: "var(--text-white)", fontSize: "1.8rem", transform: 'translateY(2px)' }} />
        </button>
      </div>

      {Array.isArray(data) && (
        <div className="search-details flex flex-wrap g-20 justify-between">
          <p className="color-ccc font-blog fw-500">
            Search for: {query}
          </p>

          <p className="color-ccc font-blog fw-500">Total results: {Array.isArray(data)? data.length : 0}</p>
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="articlesList flex flex-column">{articles}</div>
      )}
    </main>
  );
};

export default SearchArticles;
