import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineSpaceDashboard, MdOutlineCreate, MdSpaceDashboard, MdOutlineArrowBackIosNew, MdOutlineArticle, MdArticle } from "react-icons/md";
import { PiUsersFourDuotone, PiUsersFourFill } from 'react-icons/pi'
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Button, Tab, Tabs } from '@mui/material'
import { PiNotebookBold } from "react-icons/pi";
import useAppTheme from "../../../hooks/useAppTheme";
import { useGetMyDetailsQuery } from "../../../features/user/userApiSlice";
import SpinnerLoader from "../../SpinnerLoader";
import BackBtn from "../../BackBtn";
import ProfilePicture from "../../../features/user/ProfilePicture";
import useLayoutContext from "../../../hooks/useLayoutContext";

const Sidebar_chat = ({ open, setOpen, small, setShowSideBar, showSideBar }) => {
  const { dark } = useAppTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [connections, setConnections] = useState([]);
  const { activeTab, setActiveTab, selectedUser, setSelectedUser } = useLayoutContext();

  const { data, isLoading, isError, isSuccess } = useGetMyDetailsQuery();
  const handleChange = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const navLinkDefault =
    `p-1 w-full sm:text-base text-sm flex items-center gap-4 transition-all`
    ;
  const navLinkClass = ({ isActive, isPending }) =>
    isPending
      ? "pending"
      : isActive
        ? `text-white bg-primary hover:bg-primary ${navLinkDefault}`
        : `${dark ? 'text-text-100' : 'text-text-900'} ${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} ${navLinkDefault}`;

  const active = !dark ? 'bg-slate-200' : 'bg-[#222]'

  useEffect(() => {
    if (!isLoading && !isError) {
      setConnections(data.connections.filter(conn => conn.status === 'connected'))
      console.log(data)
    }
  }, [data, isLoading])

  const SingleConnect = ({ user, conversation }) => {
    // console.log(user)
    return (
      <>
        <section className="p-2 flex gap-2 items-center">
          <div className="">
            <ProfilePicture src={user?.profile?.url} alt={user?.fullname} width={40} />
          </div>
          <div className='flex flex-col'>
            <h2 className="sm:text-base text-lg" style={{ color: 'var(--text-200)' }}>{user?.fullname}</h2>
            {!conversation && <p className="sm:text-sm text-xs" style={{ color: 'var(--text-400)' }}>{user?.details?.profession}</p>}
          </div>
        </section>
      </>
    )
  }

  const noConnectionsMessage = (
    <div className="flex flex-col itmes-center justify-center gap-2">
      <p className="text-sm text-center" style={{ color: 'var(--text-300)' }}>You haven't connected to anyone! <br /> Try making some connections to chat with. <br /> <br />
        Find out other users here: <br /><br />
        <Button variant="contained" size="small" component={Link} to="/authors">Users</Button>
      </p>
    </div>
  )

  const connectionsList = Boolean(connections?.length) ? connections.map(user => <li key={user._id} className={`${!dark ? 'hover:bg-slate-200' : 'hover:bg-[#222]'} ${selectedUser === user?.user?._id ? active : ''} cursor-pointer`} title={user.user?.fullname} onClick={() => {
    setSelectedUser(user?.user?._id)
    navigate('/messaging')
  }}>
    <SingleConnect user={user?.user} />
    <hr style={{ borderColor: 'var(--line-color)' }} />
  </li>) : noConnectionsMessage;


  const conversationsList = Boolean(data?.conversations?.length) ? data.conversations.map(conv => <li key={conv._id}>
    <NavLink to={`/messaging/${conv.user._id}`} className={navLinkClass} title={conv.user?.fullname}>
      <SingleConnect user={conv?.user} conversation />
    </NavLink>
    <hr style={{ borderColor: 'var(--line-color)' }} />
  </li>) : noConnectionsMessage;


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
        <BackBtn to="/authors" />
      </section>

      <section className="text-sm">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          aria-label="profile tab switching"
        >
          <Tab sx={{ fontSize: '12px !important' }} value={1} label="Conversations" />
          <Tab sx={{ fontSize: '12px !important' }} value={2} label="Connections" />
        </Tabs>
      </section>

      {isLoading ? <SpinnerLoader /> : <ul className="mt-8 flex flex-col min-w-full select-none">
        {
          activeTab === 1 ? conversationsList : connectionsList
        }
      </ul>}
    </nav >
  );
};

export default Sidebar_chat;    