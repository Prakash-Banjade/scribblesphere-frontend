import React from "react";
import logo from '../../../assets/logo.svg'
import { IconButton } from "@mui/material";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineCreate, MdSpaceDashboard, MdOutlineArrowBackIosNew, MdOutlineArticle, MdArticle } from "react-icons/md";
import { PiUsersFourDuotone, PiUsersFourFill } from 'react-icons/pi'
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { PiNotebookBold } from "react-icons/pi";
import useAppTheme from "../../../hooks/useAppTheme";
import { GiAtomCore } from "react-icons/gi";
import { LuMessageSquare } from "react-icons/lu";
import { TbLayoutKanban } from "react-icons/tb";
import useLayoutContext from "../../../hooks/useLayoutContext";

const Hr = ({ styleOverride }) => (
  <hr className={`border-[#ccc] w-[95%] mx-auto my-0 ${styleOverride}`} />
);


const Sidebar_main = ({ open, setOpen, small, setShowSideBar, showSideBar }) => {
  const { dark } = useAppTheme();
  const { toggleChatSidebar } = useLayoutContext();


  const navLinkDefault =
    `px-5 py-3 w-full sm:text-base text-sm flex items-center gap-4 transition-all`
    ;
  const navLinkClass = ({ isActive, isPending }) =>
    isPending
      ? "pending"
      : isActive
        ? `text-white ${open ? 'ml-3 rounded-tl-[100px] rounded-bl-[100px]' : ''} bg-primary hover:bg-primary ${navLinkDefault}`
        : `${dark ? 'text-text-100' : 'text-text-900'} ${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} ${navLinkDefault}`;

  const location = useLocation();
  const navigate = useNavigate();

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
        <li className="flex items-center">
          <NavLink to="/authors" className={navLinkClass}>
            <span className="lg:text-2xl sm:text-xl text-lg">
              {location.pathname.includes("/authors") ? <PiUsersFourFill /> : <PiUsersFourDuotone />}
            </span>
            {open && "My Network"}
          </NavLink>
        </li>
      </ul>

      <Hr styleOverride="my-3" />

      <section className="tools-container px-5 py-3">
        {open && <h3 className="text-sm" style={{ color: 'var(--text-200)' }}>Tools</h3>}
        <ul className={`mt-3 flex min-w-full gap-4 flex-wrap select-none  ${!open && 'items-center justify-center'}`}>
          <li>
            <Link to="/" className="flex flex-col items-center justify-center gap-2">
              <span className={` rounded-md border text-2xl ${open ? 'px-4 py-3' : 'px-2 py-1'}`} style={{ borderColor: 'var(--line-color)', color: 'var(--text-200)' }}><GiAtomCore /></span>
              {open && <p className="text-xs " style={{ color: 'var(--text-300)' }}>SS-GPT</p>}
            </Link>
          </li>
          <li>
            <Link to="/messaging" className="flex flex-col items-center justify-center gap-2">
              <span className={` rounded-md border text-2xl ${open ? 'px-4 py-3' : 'px-2 py-1'}`} style={{ borderColor: 'var(--line-color)', color: 'var(--text-200)' }}><LuMessageSquare /></span>
              {open && <p className="text-xs " style={{ color: 'var(--text-300)' }}>Messaging</p>}
            </Link>
          </li>
          <li>
            <Link to="/" className="flex flex-col items-center justify-center gap-2">
              <span className={` rounded-md border text-2xl ${open ? 'px-4 py-3' : 'px-2 py-1'}`} style={{ borderColor: 'var(--line-color)', color: 'var(--text-200)' }}><TbLayoutKanban /></span>
              {open && <p className="text-xs " style={{ color: 'var(--text-300)' }}>Kanban</p>}
            </Link>
          </li>
        </ul>
      </section>
    </nav >
  );
};

export default Sidebar_main;
