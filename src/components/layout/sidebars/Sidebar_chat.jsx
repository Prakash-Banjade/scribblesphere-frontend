import React from "react";
import { IconButton } from "@mui/material";
import { NavLink, Link, useLocation } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineCreate, MdSpaceDashboard, MdOutlineArrowBackIosNew, MdOutlineArticle, MdArticle } from "react-icons/md";
import { PiUsersFourDuotone, PiUsersFourFill } from 'react-icons/pi'
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Button } from '@mui/material'
import { PiNotebookBold } from "react-icons/pi";
import useAppTheme from "../../../hooks/useAppTheme";
import { useGetMyDetailsQuery } from "../../../features/user/userApiSlice";
import SpinnerLoader from "../../SpinnerLoader";
import BackBtn from "../../BackBtn";

const Hr = ({ styleOverride }) => (
  <hr className={`border-[#ccc] w-[95%] mx-auto my-0 ${styleOverride}`} />
);

const Sidebar_chat = ({ open, setOpen, small, setShowSideBar, showSideBar }) => {
  const { dark } = useAppTheme();
  const location = useLocation();

  const { data, isLoading, isError, isSuccess } = useGetMyDetailsQuery();

  const SingleConnect = ({ user }) => {
    return (
      <></>
    )
  }

  const connections = Boolean(data?.connections?.length) ? data?.connections?.map(user => <SingleConnect user={user} />) : (
    <div className="flex flex-col itmes-center justify-center gap-2">
      <p className="text-sm text-center" style={{ color: 'var(--text-300)' }}>You haven't connected to anyone! <br /> Try making some connections to chat with. <br /> <br />
        Find out other users here: <br /><br />
        <Button variant="contained" size="small" component={Link} to="/authors">Users</Button>
      </p>
    </div>
  )


  return (
    <nav
      className={`primary_nav ${open ? "w-[260px]" : "w-[68px]"
        } h-[100dvh] max-h-[100dvh] transition-all ${small ? "absolute top-0 z-40" : "border-r"
        }
      ${showSideBar ? "left-0" : "-left-full"}
      `}
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}
    >
      <section className={`header flex items-center p-2 h-[60px]`}>
        <BackBtn />
      </section>

      <ul className="mt-8 flex flex-col min-w-full select-none">
        {
          isLoading ? <SpinnerLoader /> : connections
        }
      </ul>
    </nav >
  );
};

export default Sidebar_chat;
