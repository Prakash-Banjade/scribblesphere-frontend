import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { BiSolidDownArrow } from "react-icons/bi";
import { CiLight, CiDark } from "react-icons/ci";
import logo from '../../assets/logo.svg'
import { RiSearchLine, RiDashboardLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { MdOutlineCreate } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks//useAuth";
import useAppTheme from "../../hooks/useAppTheme";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import ProfilePicture from "../../features/user/ProfilePicture";

const Navbar = ({ open, small, setShowSideBar }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { dark, toggleTheme } = useAppTheme();
  const { fullname, email } = useAuth();


  const [logout, { isLoading, isError }] = useLogoutMutation();

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsProfileDropdownOpen(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);



  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };
  const location = useLocation();
  useEffect(() => {
    setIsProfileDropdownOpen(false);
  }, [location]);
  const [searchOpen, setSearchOpen] = useState(false);

  const mobileSearchRef = useRef(null);

  const handleSearchOpen = () => {
    setSearchOpen(true);
    mobileSearchRef.current.focus();
  };

  const handleLogOut = async () => {
    try {
      await logout();
      if (!isError) navigate("/login");
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <nav className={`w-full flex items-center justify-between gap-5`} style={{ background: 'var(--bg-secondary)' }}>
      <section className="flex gap-10 items-center relative flex-1">
        {small && (
          <IconButton
            sx={{ color: "var(--text-200)" }}
            onClick={() => {
              setShowSideBar(true);
            }}
          >
            <RxHamburgerMenu />
          </IconButton>
        )}
        {
          !open && <div className="flex items-center gap-2">
            <img src={logo} alt="Brand logo" className="block w-[40px]" />
            <h1 className="font-semibold text-lg text-primary">ScribbleSphere</h1>
          </div>
        }
        <form
          className={` absolute -left-[5px] w-full flex items-center gap-1 ${searchOpen
            ? "opacity-100 pointer-events-auto translate-x-0"
            : "translate-x-2 opacity-0 pointer-events-none"
            } transition-all`}
        >
          <label
            htmlFor="mobileSearch"
            className="text-sm font-medium text-gray-900 sr-only"
          >
            Search...
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="mobileSearch"
              ref={mobileSearchRef}
              className={`block w-full p-2.5 pl-10 text-md border-2 focus:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} rounded-lg focus:outline-none`}
              style={{ color: 'var(--text-100)', background: 'var(--bg-primary)' }}
              placeholder="Search..."
              required
              onBlur={(e) => {
                if (!e.target.value) setSearchOpen(false)
              }}
            />
          </div>
        </form>
      </section>

      <section className="flex gap-5 items-center justify-end sm:flex-none">
        {!searchOpen && (
          <button
            type="button"
            className="text-xl ml-auto"
            onClick={handleSearchOpen}
            title="Search"
            style={{ color: 'var(--text-100)' }}
          >
            <RiSearchLine />
          </button>
        )}
        {/* <div className="notification-wrapper text-slate-700 flex items-center justify-center relative text-xl">
          <IoMdNotificationsOutline />
          <span className="text-white bg-red-600 p-1 h-4 w-4 rounded-full text-[10px] flex items-center justify-center absolute -top-1 -right-1">
            2
          </span>
        </div> */}

        <div
          className="profile-wrapper flex gap-2 items-center cursor-pointer relative"
          onClick={handleDropdownToggle}
        >
          <button type="button" className="flex gap-2 items-center">
            <ProfilePicture width={42} />

            <div className="profile sm:flex flex-col hidden">
              <h3 className=" font-medium text-base flex items-center gap-1 leading-4 whitespace-nowrap" style={{ color: 'var(--text-100)' }}>
                {fullname}
                <span
                  className={`text-[10px] translate-y-1px transition-all ${isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                >
                  <BiSolidDownArrow />
                </span>
              </h3>
            </div>
          </button>

          <div
            className={`dropdown-container absolute right-1 top-[120%] z-[100] border rounded-md py-2 shadow-lg cursor-default transition-all ${isProfileDropdownOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "translate-y-[-10px] opacity-0 pointer-events-none"
              }`}
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}
            ref={dropdownRef}
            onClick={handleDropdownClick}
          >
            <header className="flex gap-1 flex-col mb-3 px-3">
              <h2 className="font-medium" style={{ color: 'var(--text-100)' }}>
                {email.slice(0, 12)}...
              </h2>
              <p className="text-[12px]" style={{ color: 'var(--text-400)' }}>{fullname}</p>
            </header>
            <hr style={{ borderColor: 'var(--line-color)' }} />
            <ul className="flex flex-col select-none font-light text-sm" style={{ color: 'var(--text-100)' }}>
              <li className="w-full flex items-center ">
                <Link
                  to="/profile"
                  className={`${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} whitespace-nowrap transition-colors grow py-3 pl-3 pr-[60px] flex items-center gap-3`}
                >
                  <span className="text-xl">
                    <CgProfile />
                  </span>
                  My Profile
                </Link>
              </li>
              <li className="w-full flex items-center ">
                <Link
                  to="/articles/create"
                  className={`${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} whitespace-nowrap transition-colors grow py-3 pl-3 pr-[60px] flex items-center gap-3`}
                >
                  <span className="text-xl">
                    <MdOutlineCreate />
                  </span>
                  Write Articles
                </Link>
              </li>
              <li className="w-full flex items-center ">
                <Link
                  to="/dash"
                  className={`${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} whitespace-nowrap transition-colors grow py-3 pl-3 pr-[60px] flex items-center gap-3`}
                >
                  <span className="text-xl">
                    <RiDashboardLine />
                  </span>
                  Dashboard
                </Link>
              </li>
              <li className="w-full flex items-center ">
                <button
                  type="button"
                  className={`${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} whitespace-nowrap transition-colors grow py-3 pl-3 pr-[60px] flex items-center gap-3`}
                  onClick={() => {
                    toggleTheme();
                    setIsProfileDropdownOpen(false);
                  }}
                >
                  <span className="text-xl">
                    {!dark ? <CiDark /> : <CiLight />}
                  </span>
                  {!dark ? 'Dark' : 'Light'} mode
                </button>
              </li>
              <hr style={{ borderColor: 'var(--line-color)' }} />
              <li className="w-full flex items-center text-red-500 ">
                <button
                  className={`${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} whitespace-nowrap transition-colors grow py-3 pl-3 pr-[60px] flex items-center gap-2`}
                  onClick={handleLogOut}
                  disabled={isLoading}
                >
                  <span className="text-xl">
                    <FiLogOut />
                  </span>
                  {isLoading ? 'Signing out...' : 'Sign Out'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
