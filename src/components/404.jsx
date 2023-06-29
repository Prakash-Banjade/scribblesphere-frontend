import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div
      className="notFound-container"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        aligntItems: 'center',
        justifyContent: 'center'
      }}
    >
      <header className="heading flex-center flex-column g-10">
        <h2>404 - Not found</h2>
        <p>This is not the page you are looking for. </p>

        <Link
          to="/"
          style={{ textDecoration: "underline", color: "var(--primary-color)" }}
        >
          Head to Home page
        </Link>
      </header>
    </div>
  );
};

export default NotFound;
