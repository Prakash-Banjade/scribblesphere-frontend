import React, { useEffect, useState } from "react";
import "../../scss/Dash.scss";
import {
  selectCurrentEmail,
  selectCurrentToken,
  selectCurrentRoles,
} from "./authSlice";
import { useSelector } from "react-redux";
import {
  useGetArticlesQuery,
  useGetMyArticlesQuery,
  useGetLimitedMyArticlesQuery
} from "../articlesApiSlice";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader";
import SingleArticle from "../article/SingleArticle";

const Dash = () => {
  const currentUser = useSelector(selectCurrentEmail);

  const token = useSelector(selectCurrentToken);

  const roles = useSelector(selectCurrentRoles);

  const [greeting, setGreeting] = useState("Good morning!");

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12
        ? "Good morning"
        : currentHour < 18
        ? "Good afternoon!"
        : "Good evening"
    );
  }, []);

  // const {data, isLoading} = useGetArticlesQuery()
  const { data, isLoading } = useGetLimitedMyArticlesQuery(5);

  const myArticlesContent = isLoading ? (
    <SpinnerLoader />
  ) : data.length ? (
    data.map((article) => {
      return <SingleArticle article={article} key={article._id} articleID={article._id} />;
    })
  ) : (
    <p>You haven't posted any articles yet! Try creating one.</p>
  );

  return (
    <section className="dash-section-main">
      <div className="greeting-section section flex flex-column">
        <header>
          <h3>{greeting} Prakash,</h3>
        </header>
        <p className="message">
          <span className="highlight">Unleash your creativity</span> and
          captivate readers with your{" "}
          <span className="highlight">amazing articles</span>.
          <br />
          <span className="highlight">Dive into a world of knowledge</span> as
          you explore, learn, and inspire.
        </p>

        <Link to="/" className="flex-center">
          Create <span>+</span>
        </Link>
      </div>

      <div className="section myArticles-section">
        <h2>My articles</h2>
        <div className="articles flex flex-wrap g-10"> {myArticlesContent}</div>
        {/* <SpinnerLoader /> */}

        <div className="viewAll flex">
          <Link to="/articles/myarticles">Show all</Link>
        </div>
      </div>
    </section>
  );
};

export default Dash;
