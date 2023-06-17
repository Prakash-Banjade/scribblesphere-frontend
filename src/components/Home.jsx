import React from "react";
import "../scss/Home.scss";
import Logo from "../assets/logo-watermark.svg";
import { Link } from "react-router-dom";

const Home = () => {

  return (
    <main className="grid-center">
      <div className="background">
        <img src={Logo} draggable="false" alt="Logo" />
      </div>
      <div className="wrapper grid-center">
        <header className="flex-center-column">
          <h1>
            Connect, Explore, and Enrich: Your Portal to Captivating Articles
          </h1>
          <p>
            <span>ScribbleSphere</span>: Unleash Your Writing Potential
          </p>

          <Link to="/login">Start Writing</Link>
          {/* <button onClick={getRefresh}></button> */}
        </header>
      </div>
    </main>
  );
};

export default Home;
