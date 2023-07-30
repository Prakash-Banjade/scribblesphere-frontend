import React from "react";
import logo from '../../assets/logo.svg'
import { IconButton } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineCreate, MdSpaceDashboard, MdOutlineArrowBackIosNew, MdOutlineArticle, MdArticle } from "react-icons/md";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { PiNotebookBold} from "react-icons/pi";
import useAppTheme from "../../hooks/useAppTheme";
import { AiOutlineAccountBook } from "react-icons/ai";

const Hr = ({ styleOverride }) => (
  <hr className={`border-[#ccc] w-[95%] mx-auto my-0 ${styleOverride}`} />
);

const Sidebar = ({ open, setOpen, small, setShowSideBar, showSideBar }) => {
  const { dark } = useAppTheme();

  const navLinkDefault =
    `px-5 py-3 w-full sm:text-base text-sm flex items-center gap-4 ${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} transition-colors`
    ;
  const navLinkClass = ({ isActive, isPending }) =>
    isPending
      ? "pending"
      : isActive
        ? `text-primary ${dark ? 'bg-darkBg' : 'bg-slate-100'} ${navLinkDefault}`
        : `${dark ? 'text-text-100' : 'text-text-900'} ${navLinkDefault}`;

  const location = useLocation();

  return (
    <nav
      className={`primary_nav ${open ? "w-[260px]" : "w-[68px]"
        } h-[100dvh] max-h-[100dvh] transition-all ${small ? "absolute top-0 z-40" : "border-r"
        }
      ${showSideBar ? "left-0" : "-left-full"}
      `}
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}
    >
      <section className={`header flex ${open ? 'justify-between' : 'justify-center'} items-center p-2 h-[60px]`}>
        {
          open && <div className="flex items-center gap-2">
            <img src={logo} alt="Brand logo" className="block w-[40px]" />
            <h1 className="font-semibold text-lg text-primary">ScribbleSphere</h1>
          </div>
        }
        {showSideBar || small ? (
          <IconButton
            onClick={() => setShowSideBar(false)}
            sx={{ transform: "translate(-3px, 0)" }}
          >
            <span className="text-2xl">
              <RxCross1 />
            </span>
          </IconButton>
        ) : open && !small ? (
          <IconButton
            onClick={() => setOpen((prev) => !prev)}
          >
            <MdOutlineArrowBackIosNew />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="text-2xl">
              <RxHamburgerMenu />
            </span>
          </IconButton>
        )}
      </section>
      <ul className="mt-8 flex flex-col min-w-full select-none">
        <li className="flex items-center">
          <NavLink end to="/dash" className={navLinkClass}>
            <span className="lg:text-2xl sm:text-xl text-lg">
              {location.pathname === "/" || location.pathname === '/dash' ? (
                <MdSpaceDashboard />
              ) : (
                <MdOutlineSpaceDashboard />
              )}
            </span>
            {open && "Dashboard"}
          </NavLink>
        </li>
        <Hr styleOverride="my-3" />

        <li className="flex items-center">
          <NavLink end to="/articles" className={navLinkClass}>
            <span className="lg:text-2xl sm:text-xl text-lg">
              {location.pathname.includes('/articles') && !location.pathname.endsWith('myarticles') ? (
                <MdArticle />
              ) : (
                <MdOutlineArticle />
              )}
            </span>
            {open && "Latest Insights"}
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink to="/articles/myarticles" className={navLinkClass}>
            <span className="lg:text-2xl sm:text-xl text-lg">
              <PiNotebookBold />
            </span>
            {open && "My Articles"}
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink to="/articles/create" className={navLinkClass}>
            <span className="lg:text-2xl sm:text-xl text-lg">
              <MdOutlineCreate />
            </span>
            {open && "Create"}
          </NavLink>
        </li>
      </ul>
    </nav >
  );
};

export default Sidebar;
