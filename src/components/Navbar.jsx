import React, { useRef } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import "../scss/Navbar.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentEmail,
  selectCurrentToken,
  userLogout
} from "../features/auth/authSlice";
import { useLogoutMutation } from "../features/logoutApiSlice";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateIcon from "@mui/icons-material/Create";

const Navbar = () => {
  const navLinkClass = ({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : "";

  const token = useSelector(selectCurrentToken);
  const email = useSelector(selectCurrentEmail);
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()

  const profileFeaturesRef = useRef()

  const navigate = useNavigate();

  const handleProfileClick = e => {
    profileFeaturesRef.current.classList.toggle('open')
  }

  const handleLogout = async () => {
      await logout();
      dispatch(userLogout())
      navigate('/')
  }

  const PublicNav = (
    <nav className="flex-center justify-between">
      <div className="left-section flex-center g-20">
        <div className="logo-container grid-center">
          <a href="/" title="ScribbleSphere">
            <img src={logo} alt="ScribbleSphere Logo" />
          </a>
        </div>

        <div className="links">
          <ul className="flex-center g-20">
            <li>
              <Link to="/">Latest Articles</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">Open Source</Link>
            </li>
            <li>
              <Link to="/dash">Dashboard</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="right-section dflex-center g-10">
        <Link to="/login" className="signin">
          Sign In
        </Link>
        <Link to="/" className="signup">
          Sign Up
        </Link>
      </div>
    </nav>
  );

  const LoggedInNav = (
    <nav className="flex-center justify-between">
      <div className="left-section flex-center g-20">
        <div className="logo-container grid-center">
          <a href="/" title="ScribbleSphere">
            <img src={logo} alt="ScribbleSphere Logo" />
          </a>
        </div>

        <div className="links">
          <ul className="flex-center g-20">
            <li>
              <Link to="/">Latest Articles</Link>
            </li>
            <li>
              <Link to="/">My Articles</Link>
            </li>
            <li>
              <Link to="/">Create</Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="right-section flex-center g-10 loggedIn"
      >
        <div className="profile flex-center g-10" title={`${email?.slice(0, 9)}...`} onClick={handleProfileClick}>
          <AccountCircleIcon
            sx={{ color: "var(--text-white)", fontSize: "2.5rem" }}
          />
          <p className="currEmail">{email?.slice(0, 9)}...</p>
        </div>

        <div className="features" ref={profileFeaturesRef}>
          <ul className="flex flex-column g-10">
            <li>
              <AccountCircleIcon
                sx={{ color: "var(--text-white)", fontSize: "1.4rem" }}
              />
              <Link to="/">Change profile picture</Link>
            </li>
            <li>
              <CreateIcon sx={{ color: "var(--text-white)", fontSize: "1.4rem"}} />
              <Link to="/">Write article</Link>
            </li>
            <li className="logout" onClick={handleLogout}>
              <LogoutIcon sx={{ fontSize: "1.4rem"}} />
              Log out
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return token ? LoggedInNav : PublicNav;
};

export default Navbar;
