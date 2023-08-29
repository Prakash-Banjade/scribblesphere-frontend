import React, { useState, useEffect } from 'react'
import { useGetAllUsersQuery, useGetMyDetailsQuery, } from './userApiSlice'
import Loader from '../../components/Loader'
import useAppTheme from '../../hooks/useAppTheme'
import ProfilePicture from './ProfilePicture'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import FollowBtn from './FollowBtn'
import { useSocket } from '../../context/SocketProvider'

const AllUsers = () => {
    const { dark } = useAppTheme();
    const { data: details, isLoading: detailsLoading, isError: detailsError } = useGetMyDetailsQuery();
    const { data: users, isLoading, isSuccess, isError } = useGetAllUsersQuery()

    const {socket} = useSocket();
    const [connections, setConnections] = useState()
    console.log(connections)

    // console.log(data)
    useEffect(() => {
        if (!detailsLoading && !detailsError) {
            setConnections(details?.connections)
        }
    }, [details])

    useEffect(() => {
        const onReceiveConnectRequest = newReq => {
            setConnections(prev => [...prev, newReq])
        }
        
        socket.on('receive_connect_req', onReceiveConnectRequest)

        return () => {
            socket.off('receive_connect_req', onReceiveConnectRequest)
        }
        
    }, [])


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

    const SingleUserCard = ({ user }) => {
        return (
            <article className="user-card rounded-md border flex p-3 gap-3" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-secondary)' }}>
                <Link to={user._id} className="user-info items-center flex gap-3">
                    <ProfilePicture width={80} src={user?.profile?.url} />
                </Link>
                <section className='right-section flex gap-2 justify-between items-center flex-wrap flex-1'>
                    <Link to={user._id} className="user-details">
                        <h2 style={{ color: 'var(--text-200)' }} className="font-semibold hover:underline">{user?.fullname}</h2>
                        <h3 style={{ color: 'var(--text-300)' }}>{user?.details?.profession}</h3>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-400)' }}>{user?.details?.writesOn.join(' | ')}</p>
                    </Link>
                    <section className="actions space-x-1">
                        <FollowBtn user={user} color="info" />
                    </section>
                </section>
            </article>
        )
    }

    const usersCards = (
        <div className="users-list flex flex-col xl:gap-5 lg:gap-4 md:gap-3 gap-2 mt-10">
            {users?.map(user => <SingleUserCard key={user._id} user={user} />)}
        </div>
    )

    if (isLoading) return <Loader />
    return (
        <div className="wrapper max-w-[800px] mx-auto my-5">
            <header className="heading">
                <h2 style={{ color: 'var(--primary-color)' }}>active users network</h2>
                <p>Connect with fellow users who are currently active and engaging. Discover their interests, follow their updates, and foster meaningful connections within our vibrant community.</p>
            </header>

            {
                connections?.map(connect => {
                    return <div className="mb-2">
                        <h2 className="text-xl font-semibold" style={{color: 'var(--text-100)'}}>{connect?.user?.fullname}</h2>
                    </div>
                })
            }

            <UserSearchBar />

            {usersCards}
        </div>
    )
}

export default AllUsers
