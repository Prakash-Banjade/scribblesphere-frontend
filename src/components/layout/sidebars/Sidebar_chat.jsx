import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Tab, Tabs, IconButton } from '@mui/material'
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineArrowBackIosNew, MdOutlineMoreVert } from "react-icons/md";
import { RiChatNewFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import useAppTheme from "../../../hooks/useAppTheme";
import { useAddToConversationMutation, useGetMyDetailsQuery } from "../../../features/user/userApiSlice";
import SpinnerLoader from "../../SpinnerLoader";
import BackBtn from "../../BackBtn";
import ProfilePicture from "../../../features/user/ProfilePicture";
import useLayoutContext from "../../../hooks/useLayoutContext";
import { useSocket } from "../../../context/SocketProvider";
import { format } from 'date-fns'
import NewConversationModal from "../../../features/messaging/NewConversationModal";
import useSnackbarShow from "../../../hooks/useSnackbarShow";

const Sidebar_chat = ({ open, setOpen, small, setShowSideBar, showSideBar }) => {
  const { dark } = useAppTheme();
  const location = useLocation();
  const { socket } = useSocket()
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [connections, setConnections] = useState([]);
  const [newChatOpen, setNewChatOpen] = useState(false);

  const { data, isLoading, isError, isSuccess, refetch } = useGetMyDetailsQuery();

  const showSnackbar = useSnackbarShow();

  const [search, setSearch] = useState('')

  useEffect(() => {
    const onUpdate = () => refetch();

    socket.on('update', onUpdate);


    return () => {
      socket.off('update', onUpdate)
    }
  }, [])

  const navLinkDefault =
    `px-2 py-1 rounded-2xl w-full sm:text-base text-sm flex items-center gap-4 transition-all`
    ;
  const navLinkClass = ({ isActive, isPending }) =>
    isPending
      ? "pending"
      : isActive
        ? `${dark ? 'text-text-100' : 'text-text-900'} ${dark ? 'bg-darkBg' : 'bg-slate-100'} ${navLinkDefault}`
        : `${dark ? 'text-text-100' : 'text-text-900'} ${dark ? 'hover:bg-darkBg' : 'hover:bg-slate-100'} ${navLinkDefault}`;

  useEffect(() => {
    if (!isLoading && !isError) {
      setConnections(data.connections.filter(conn => conn.status === 'connected'))
      console.log(data)
    }
  }, [data, isLoading])

  const SingleConnect = ({ user, conversation }) => {

    const [addToConversation, addConvState] = useAddToConversationMutation();
    // function to add connection to conversation
    const handleAddToConversationClick = async (id) => {
      try {
        const response = await addToConversation(id).unwrap();
        if (response.status === 'success') {
          console.log('added')
        }

      } catch (e) {
        console.log(e)
        showSnackbar(e.data?.message, 'error')
      }
    }


    const currentConversation = data?.conversations?.find(conv => conv.user._id === user._id);
    const latestConversation = currentConversation?.latestMessage;
    const seen = currentConversation?.seen;

    return (
      <>
        <section className={`${open ? 'p-2' : ''} flex gap-4 items-center w-full`}>
          <div>
            <ProfilePicture src={user?.profile?.url} alt={user?.fullname} width={60} userId={user?._id} />
          </div>
          <div className={`flex flex-col w-full ${!open ? 'sr-only' : ''} transition-all`}>
            <header className="flex items-center justify-between">
              <h2 className="sm:text-base text-lg font-medium" style={{ color: 'var(--text-100)' }}>{user?.fullname}</h2>
              {conversation ? <time className="text-xs" style={{ color: 'var(--text-400)' }} dateTime={latestConversation?.createdAt}>{format(new Date(latestConversation?.createdAt), 'dd/mm/yyyy')}</time> :
                <Button variant="contained" size="small" sx={{ minWidth: '85px' }} onClick={() => handleAddToConversationClick(user._id)} disabled={addConvState.isLoading}>{addConvState.isLoading ? 'Adding...' : 'Add'}</Button>
              }
            </header>
            {!conversation && <p className="sm:text-sm text-xs" style={{ color: 'var(--text-400)' }}>{user?.details?.profession}</p>}
            {
              conversation && <p className={`sm:text-sm text-xs ${!seen ? 'font-semibold' : ''}`} style={{ color: seen ? 'var(--text-500)' : 'var(--text-200)' }}>{`${latestConversation?.self ? 'You: ' : ''} ${latestConversation?.text || ''}`}</p>
            }
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

  const connectionsList = Boolean(connections?.length) ? connections.map(user => <li key={user._id}>
    <SingleConnect user={user?.user} />
    <hr style={{ borderColor: 'var(--line-color)' }} />
  </li>) : noConnectionsMessage;


  const conversationsList = Boolean(data?.conversations?.length) ? data.conversations.map(conv => <li key={conv._id}>
    <NavLink to={`/messaging/${conv.user._id}`} className={navLinkClass} title={conv.user?.fullname}>
      <SingleConnect user={conv?.user} conversation />
    </NavLink>
    {/* <hr style={{ borderColor: 'var(--line-color)' }} /> */}
  </li>) : <p className="text-center mt-3 text-sm" style={{ color: 'var(--text-300)' }}>No conversations. Try adding new chats and start conversation</p>;


  return (
    <nav
      className={`primary_nav ${open ? "w-[400px]" : "w-[70px]"
        } h-[100dvh] max-h-[100dvh] transition-all overflow-y-auto ${small ? "absolute top-0 z-40" : "border-r"
        }
      ${showSideBar ? "left-0" : "-left-full"}
      `}
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}
    >
      <section className={`actions flex items-center p-2 h-[60px] ${open ? 'justify-between' : 'justify-center'}`}>
        {open && <BackBtn to="/authors" />}

        <div className='flex items-center gap-3 text-2xl justify-end' style={{ color: 'var(--text-200)' }}>

          {
            (open || small || showSideBar) && <>
              <IconButton type="button" onClick={() => navigate('/authors')} title="Communities">
                <FaUsers />
              </IconButton>
              <IconButton type="button" title="New Chat" onClick={() => setNewChatOpen(true)}>
                <RiChatNewFill />
              </IconButton>
              <IconButton type="button">
                <MdOutlineMoreVert />
              </IconButton>
            </>
          }

          {showSideBar || small ? (
            <IconButton
              onClick={() => setShowSideBar(false)}
              title="Close"
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
        </div>


      </section>

      <section className="search border rounded-[100px] overflow-hidden flex gap-2 m-2 px-4 items-center focus-within:outline-primary outline-1 outline outline-transparent " style={{ borderColor: 'var(--line-color)', background: 'var(--bg-primary)' }}>
        <button type="button" className={`text-lg focus:outline-none text-gray-400`} disabled={open} onClick={() => {
          setOpen(true)
          searchRef.current.focus();
        }} title={"Search conversation"}>
          <GoSearch />
        </button>

        <input ref={searchRef} type="search" className={`sm:p-2.5 p-1.5 rounded-md text-sm resize-none w-full bg-transparent focus:outline-none`} style={{ color: 'var(--text-200)' }} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search conversation" />
      </section>

      {isLoading ? <SpinnerLoader /> : <ul className="mt-8 flex flex-col min-w-full select-none">
        {conversationsList}
      </ul>}

      <NewConversationModal open={newChatOpen} setOpen={setNewChatOpen} connections={connectionsList} />
    </nav >
  );
};

export default Sidebar_chat;     