import React, { useEffect, useState } from "react";
import "../../scss/Dash.scss";
import { selectCurrentEmail, selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";
import { useGetMyArticlesQuery } from "../article/articlesApiSlice";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../components/SpinnerLoader";
import SingleArticle from "../article/SingleArticle";
import { useGetMyDetailsQuery } from "./userApiSlice";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";

const Dash = () => {
  const [greeting, setGreeting] = useState("Good morning!");
  const user = useSelector(selectCurrentUser);
  const email = useSelector(selectCurrentEmail);
  const [open, setOpen] = useState(true);
  const [needProfiling, setNeedProfiling] = useState(false);

  const myDetails = useGetMyDetailsQuery();
  const { data, isLoading, refetch } = useGetMyArticlesQuery(3);

  useEffect(() => {
    if (!myDetails.isLoading) {
      setNeedProfiling(
        myDetails?.data.details?.socialLinks?.length === 0 ||
          myDetails?.data.details?.writesOn?.length === 0 ||
          myDetails?.data.details?.qualification?.length === 0 ||
          myDetails?.data.details?.address?.length === 0
      );
    }
  }, [myDetails.isLoading]);

  useEffect(() => {
    // refetch();
    const currentHour = new Date().getHours();
    setGreeting(
      currentHour < 12
        ? "Good morning"
        : currentHour < 18
        ? "Good afternoon!"
        : "Good evening"
    );

    document.title = "Dashboard | ScribbleSphere";
  }, []);

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

  const alertProfiling = (
    <Collapse in={open}>
      <Alert severity="info">
        <div
          className="profile-alert-wrapper flex flex-wrap justify-between g-20"
          style={{ minWidth: "100%" }}
        >
          <p className="font-primary fw-500">Finish up setting your profile!</p>
          <div className="action-btns flex g-10">
            <Button variant="contained" sx={{ p: 0 }}>
              <Link to="/profile">Go to profile</Link>
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpen(false)}
            >
              Later
            </Button>
          </div>
        </div>
      </Alert>
    </Collapse>
  );

  return (
    <main className="dash-section-main">
      {needProfiling && !myDetails.isLoading && alertProfiling}

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
        <header className="heading">
          <h2>Recent Articles Posted</h2>
        </header>
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
    </main>
  );
};

export default Dash;
