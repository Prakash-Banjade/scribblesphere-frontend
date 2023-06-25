import React, { useEffect, useState } from "react";
import "../../scss/Dash.scss";
import { selectCurrentEmail, selectCurrentUser } from "./authSlice";
import { useSelector } from "react-redux";
import { useGetLimitedMyArticlesQuery } from "../articlesApiSlice";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader";
import SingleArticle from "../article/SingleArticle";
import { SettingsApplications } from "@mui/icons-material";

const Dash = () => {
  const [greeting, setGreeting] = useState("Good morning!");
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12
        ? "Good morning"
        : currentHour < 18
        ? "Good afternoon!"
        : "Good evening"
    );

    document.title = 'Dashboard | ScribbleSphere'
  }, []);

  const { data, isLoading } = useGetLimitedMyArticlesQuery(3);

  const myArticlesContent = isLoading ? (
    <SpinnerLoader />
  ) : data?.length ? (
    [...data].reverse().map((article) => {
      return (
        <SingleArticle
          article={article}
          key={article._id}
          articleID={article._id}
          showContent={false}
          smallHeading
          background
        />
      );
    })
  ) : (
    <p
      style={{
        fontWeight: "500",
        color: "white",
        fontFamily: "var(--blog-font)",
      }}
    >
      You haven't posted any articles yet! Try creating one.
    </p>
  );

  return (
    <main className="dash-section-main">
      <section className="greeting-section section flex flex-column">
        <header>
          <h3>
            {greeting} {user},
          </h3>
        </header>
        <p className="message">
          <span className="highlight">Unleash your creativity</span> and
          captivate readers with your{" "}
          <span className="highlight">amazing articles</span>.
          <br />
          <span className="highlight">Dive into a world of knowledge</span> as
          you explore, learn, and inspire.
        </p>

        <Link to="/articles/create" className="flex-center">
          Create <span>+</span>
        </Link>
      </section>

      <section className="section myArticles-section">
        <h2>Recent Artiles Posted</h2>
        <div className="dashArticles flex flex-wrap g-10">
          {myArticlesContent}
        </div>

        {data?.length > 0 ? (
          <div className="viewAll flex">
            <Link to="/articles/myarticles">Show all</Link>
          </div>
        ) : (
          ""
        )}
      </section>

      <section className="section profile-section">
        <h2>Profile</h2>
        <div className="dashArticles flex flex-wrap g-10">
          {myArticlesContent}
        </div>
      </section>

      
    </main>
  );
};

export default Dash;
