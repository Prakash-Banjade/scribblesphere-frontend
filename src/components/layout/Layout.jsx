import React, { useState, useEffect, Suspense } from "react";
import "./Layout.css";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import useLayoutContext from "../../hooks/useLayoutContext";
import useInitializeUser from "../../hooks/useInitializeUser";

const Layout = () => {
  const [open, setOpen] = useState(true)
  const location = useLocation();
  const { bgWhite } = useLayoutContext()

  const [small, setSmall] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const { userId } = useAuth();

  // set current user details in userSlice
  useInitializeUser()

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia("(max-width: 800px)").matches;
      setSmall(isMobile);
      setShowSideBar(false);
      setOpen(true);
    };

    // Call the event handler initially
    handleResize();

    // Add the event listener for resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShowSideBar(false);
  }, [location]);

  return (
    <div className="layout-wrapper flex max-h-[100dvh] h-[100dvh]">
      <Sidebar
        open={open}
        setOpen={setOpen}
        small={small}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />

      {/* backdrop when sidebar is toggled in small devices */}
      {showSideBar && small && (
        <div
          className="absolute z-30 top-0 left-0 h-[100dvh] w-full"
          style={{ backgroundColor: "rgb(0 0 0 / .3)", backdropFilter: 'blur(.5px)' }}
          onClick={() => setShowSideBar(false)}
          onTouchStart={() => setShowSideBar(false)}
          onTouchMove={() => setShowSideBar(false)}
        ></div>
      )}

      <div
        className={`aside_content grow ${!open ? "closed" : ""} transition-all`}
      >
        <header className="w-full relative z-20 min-h-[60px] border-b flex items-center p-3 py-2" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>
          <Navbar
            open={open}
            small={small}
            showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
          />
        </header>

        <main className={`w-full max-w-full relative xl:p-5 lg:p-4 md:p-3 p-2`} style={{ background: !bgWhite ? 'var(--bg-primary)' : 'var(--bg-secondary)' }}>
          <ErrorBoundary fallback={<ErrorComponent />}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Layout;
