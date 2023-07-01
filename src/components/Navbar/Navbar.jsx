import React, { useRef, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../scss/Navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentEmail,
  selectCurrentToken,
  selectCurrentUser,
  userLogout,
} from "../../features/auth/authSlice";

import { useLogoutMutation } from "../../features/logoutApiSlice";
import useInternetConnection from "../../hooks/useInternetConnection";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import CreateIcon from "@mui/icons-material/Create";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange, deepPurple } from "@mui/material/colors";

const Navbar = () => {
  const token = useSelector(selectCurrentToken);
  const email = useSelector(selectCurrentEmail);
  const user = useSelector(selectCurrentUser);
  const [logout, {isSuccess, isError, isLoading}] = useLogoutMutation();
  
  const navigate = useNavigate();
  
  const profileFeaturesRef = useRef();
  const handleProfileClick = (e) => {
    profileFeaturesRef.current.classList.toggle("open");
  };

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  const handleLogout = () => {
    if (isLoading) return;
    logout();
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileFeaturesRef.current &&
        !profileFeaturesRef.current.contains(event.target)
      ) {
        profileFeaturesRef.current.classList.remove("open");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isOnline = useInternetConnection();

  const Nav = (
    <nav className="flex-center justify-between">
      <div className="left-section flex-center g-20">
        <div className="logo-container grid-center">
          <a href="/" title="ScribbleSphere">
            <img src={logo} alt="ScribbleSphere Logo" />
          </a>
        </div>
      </div>

      {token ? (
        <div className="right-section flex-center g-20 loggedIn">
          <div className="search-tab">
            <Link to="/articles/search" className="flex-center">
              <SearchIcon sx={{ fontSize: "1.5rem" }} />
            </Link>
          </div>

          <div
            className={`profile ${isOnline ? "online" : ""} flex-center g-10`}
            onClick={handleProfileClick}
          >
            <Tooltip title={`${email?.slice(0, 9)}...`} arrow>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: "2.2rem",
                  height: "2.2rem",
                }}
              >
                {user?.slice(0, 1)}
              </Avatar>
            </Tooltip>
            <div className="features" ref={profileFeaturesRef}>
              <ul className="flex flex-column g-10">
                <li className="accountName">
                  <em>{email}</em>
                </li>
                <li>
                  <AccountCircleIcon sx={{ fontSize: "1.4rem" }} />
                  <Link to="/">Change profile picture</Link>
                </li>
                <li>
                  <CreateIcon sx={{ fontSize: "1.4rem" }} />
                  <Link to="/articles/create">Write article</Link>
                </li>
                <li className="logout" onClick={handleLogout}>
                  <LogoutIcon sx={{ fontSize: "1.4rem" }} />
                  {isLoading? 'Logging out...' : 'Log out'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="right-section dflex-center g-10">
          <Link to="/login" className="signin">
            Sign In
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );

  return Nav;
};

export default Navbar;
