import React, { useEffect, useState } from "react";
import "../../../scss/Dash.scss";
import { Link } from "react-router-dom";
import SpinnerLoader from "../../../components/SpinnerLoader";
import { SiAzuredataexplorer } from 'react-icons/si'
import SingleArticle from "../../article/SingleArticle";
import { useGetMyDetailsQuery, useGetUserArticlesQuery } from "../userApiSlice";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import useAuth from "../../../hooks/useAuth";
import { AiOutlinePlus } from "react-icons/ai";
import useAppTheme from "../../../hooks/useAppTheme";
import FollowedUsersNotification from "./FollowedUsersNotification";

const LIMIT = 3;

const Dash = () => {
  const { dark } = useAppTheme();
  const [greeting, setGreeting] = useState("Good morning!");
  const { email, fullname, userId } = useAuth();
  const [open, setOpen] = useState(true);
  const [needProfiling, setNeedProfiling] = useState(false);

  const myDetails = useGetMyDetailsQuery();
  const { data, isLoading } = useGetUserArticlesQuery({ userId, limit: LIMIT });

  useEffect(() => {
    if (!myDetails.isLoading) {
      setNeedProfiling(
        myDetails?.data?.details?.address?.length === 0 ||
        myDetails?.data?.details?.writesOn?.length === 0 ||
        myDetails?.data?.details?.profession?.length === 0 ||
        myDetails?.data?.details?.description?.length === 0
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
    data?.map((article) => {
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
        color: "var(--text-300)",
        fontFamily: "var(--blog-font)",
      }}
    >
      You haven't posted any articles yet! Try creating one.
    </p>
  );

  const alertProfiling = (
    <Collapse in={open}>
      <Alert severity="info" sx={{ backgroundColor: dark ? '#e5f6fd' : '#c7e9f6' }}>
        <div
          className="profile-alert-wrapper flex flex-wrap justify-between gap-3"
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
    <div className="dash-section-main">
      {needProfiling && !myDetails.isLoading && alertProfiling}
      <section className={`flex flex-wrap gap-10 ${open ? 'mt-5' : ''}`}>
        <section className={`greeting-section section flex flex-column grow shrink basis-[500px]`}>
          <header>
            <h3 style={{ color: 'var(--text-200)' }}>
              {greeting}, {fullname}
            </h3>
          </header>
          <p className="message font-light">
            <span className="highlight">Unleash your creativity</span> and
            captivate readers with your{" "}
            <span className="highlight">amazing articles</span>.
            <br />
            <span className="highlight">Dive into a world of knowledge</span> as
            you explore, learn, and inspire.
          </p>

          <section className="actions mt-5 flex items-center gap-3">
            <Link to="/articles/create" className="flex items-center gap-1 px-5 py-3 rounded-md border border-primary text-primary w-fit font-medium text-lg hover:shadow-xl transition-all">
              Explore <span className="text-2xl"><SiAzuredataexplorer /></span>
            </Link>
            <Link to="/articles" className="flex items-center gap-1 px-5 py-3 rounded-md bg-primary text-white w-fit font-medium text-lg hover:shadow-xl transition-all">
              Create <span className="text-2xl"><AiOutlinePlus /></span>
            </Link>
          </section>
        </section>

        <FollowedUsersNotification userDetails={myDetails?.data} isLoading={isLoading} />
      </section>

      <section className="section myArticles-section mt-10">
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
    </div>
  );
};

export default Dash;
