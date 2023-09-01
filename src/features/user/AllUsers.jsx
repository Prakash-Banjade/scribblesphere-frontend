import React, { useState, useEffect } from 'react'
import { useGetAllUsersQuery, useGetMyDetailsQuery, } from './userApiSlice'
import Loader from '../../components/Loader'
import useAppTheme from '../../hooks/useAppTheme'
import ProfilePicture from './ProfilePicture'
import { Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import FollowBtn from './FollowBtn'
import { useSocket } from '../../context/SocketProvider'
import notificationAudio from '../../assets/audios/requestNotification.mp3'

const AllUsers = () => {
    const { dark } = useAppTheme();
    const { data: details, refetch } = useGetMyDetailsQuery();
    const { data: users, isLoading, isSuccess, isError } = useGetAllUsersQuery()
    // const { userId } = useAuth()

    const { socket } = useSocket();
    const location = useLocation();

    useEffect(() => {
        const onReceiveConnectRequest = (data) => {
            const notification = new Audio(notificationAudio);
            if (data.status === 200) {
                notification.play();
                refetch();
            }
        }
        const onRemoveConnectRequest = (data) => {
            if (data.status === 200) {
                refetch();
            }
        }

        const requestFailed = data => {
            console.log(data)
        }

        socket.on('receive_connect_req', onReceiveConnectRequest)
        socket.on('remove_connect_req', onRemoveConnectRequest)
        socket.on('connect_request_failed', requestFailed)

        return () => {
            socket.off('receive_connect_req', onReceiveConnectRequest)
            socket.off('remove_connect_req', onRemoveConnectRequest)
            socket.off('connect_request_failed', requestFailed)
        }

    }, [])

    useEffect(() => {
        refetch();
    }, [location])

    const handleConnectionResponse = (connectId, action) => {
        // console.log(connectId)
        socket.emit('response_connect_request', connectId, action, data => {
            console.log(data)
            if (data.status === 200) {
                console.log(data)
                refetch();
            }
        })
    }


    const UserSearchBar = () => (
        <section className="userSearchBar">
            <form
                className=" w-full flex gap-1"
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
                        className={`block w-full p-2.5 pl-10 text-md border-2 focus:border-primary ${dark ? 'border-lineColorDark' : 'border-lineColorLight'} rounded-lg focus:outline-none`}
                        style={{ color: 'var(--text-100)', background: 'var(--bg-primary)' }}
                        placeholder="Search..."
                        required
                    />
                </div>

                <Button type="submit" sx={{ borderRadius: '8px' }} variant="contained">Search</Button>
            </form>
        </section>
    )

    const SingleUserCard = ({ user, connectRequest, connectId, box }) => {
        return box ? (
            <article className="shrink grow basis-[180px] p-3 rounded-md border flex flex-col gap-1.5 items-center justify-between" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-secondary)' }}>
                <Link to={`/authors/${user._id}`} className='flex flex-col items-center justify-center gap-1.5' title={user?.fullname}>
                    <ProfilePicture src={user?.profile?.url} width={50} />
                    <h2 className="text-lg text-center hover:underline" style={{ color: 'var(--text-200)' }}>{user?.fullname}</h2>
                </Link>
                <p className="text-xs text-center" style={{ color: 'var(--text-400)' }}>{user?.details?.profession}</p>
                <FollowBtn color="info" user={user} />
            </article>
        ) : (
            <article className="user-card flex p-3 gap-3" style={{ borderColor: 'var(--line-color)' }}>
                <Link to={user?._id} className="user-info items-center flex gap-3">
                    <ProfilePicture width={80} src={user?.profile?.url} />
                </Link>
                <section className='right-section flex gap-2 justify-between items-center flex-wrap flex-1'>
                    <Link to={user?._id} className="user-details">
                        <h2 style={{ color: 'var(--text-200)' }} className="font-semibold hover:underline sm:text-base text-sm">{user?.fullname}
                            {connectRequest && <span className="font-light" style={{ color: 'var(--text-300)' }}> follows you and is inviting you to connect</span>}
                        </h2>
                        <h3 style={{ color: 'var(--text-300)' }}>{user?.details?.profession}</h3>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-400)' }}>{user?.details?.writesOn.join(' | ')}</p>
                    </Link>
                    {!connectRequest ? <section className="actions space-x-1">
                        <FollowBtn user={user} color="info" />
                    </section> : <section className="actions space-x-1">
                        <Button variant="outlined" size="small" sx={{ borderRadius: '100px', padding: '5px 15px' }} onClick={() => handleConnectionResponse(connectId, 'DELETE')}>Ignore</Button>
                        <Button variant="contained" size="small" sx={{ borderRadius: '100px', padding: '5px 15px' }} onClick={() => handleConnectionResponse(connectId, 'ADD')}>Connect</Button>
                    </section>}
                </section>
            </article>
        )
    }

    const usersCards = (
        <div className="users-list flex flex-wrap xl:gap-5 lg:gap-4 md:gap-3 gap-2">
            {users?.map(user => <SingleUserCard key={user._id} user={user} box />)}
        </div>
    )

    if (isLoading) return <Loader />
    if (isError) return <h1>Something went wrong</h1>
    return (
        <div className="wrapper max-w-[800px] mx-auto">


            {/* <UserSearchBar /> */}

            {details?.connections?.filter(conn => conn.status === 'pending').length > 0 && <section className="connection-request-list border rounded-md flex flex-col mt-5 mb-12" style={{ background: 'var(--bg-secondary', borderColor: 'var(--line-color)' }}>
                <header>
                    <h2 className="sm:text-base text-lg font-light p-3" style={{ color: 'var(--text-200)' }}>Invitations <strong> ({details?.connections?.filter(conn => conn.status === 'pending').length})</strong></h2>
                    <hr style={{ borderColor: 'var(--line-color)' }} />
                </header>
                {
                    details?.connections?.filter(conn => conn.status === 'pending')?.map(connect => {
                        return <>
                            <SingleUserCard key={connect?._id} user={connect?.user} connectId={connect._id} connectRequest />
                            <hr style={{ borderColor: 'var(--line-color)' }} />

                        </>
                    })
                }
            </section>}


            <header className=" mb-4">
                <h2 className="sm:text-lg text-base mb-1" style={{ color: 'var(--text-200)' }}>Top emerging creators to follow</h2>
                <p className='text-xs font-light' style={{ color: 'var(--text-500)' }}>Connect with fellow users who are currently active and engaging. Discover their interests, follow their updates, and foster meaningful connections within our vibrant community.</p>
            </header>
            {usersCards}
        </div>
    )
}

export default AllUsers
