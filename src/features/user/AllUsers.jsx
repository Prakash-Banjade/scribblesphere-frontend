import React from 'react'
import { useGetAllUsersQuery } from './userApiSlice'
import Loader from '../../components/Loader'
import useAppTheme from '../../hooks/useAppTheme'
import ProfilePicture from './ProfilePicture'
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'

const AllUsers = () => {
    const { dark } = useAppTheme();

    const { data: users, isLoading, isSuccess, isError } = useGetAllUsersQuery()
    // console.log(users)


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

                <Button type="submit" sx={{borderRadius: '8px'}} variant="contained">Search</Button>
            </form>
        </section>
    )

    const SingleUserCard = ({ user }) => {
        return (
            <article className="user-card rounded-md border flex items-center justify-between p-3" style={{ borderColor: 'var(--line-color)', background: 'var(--bg-secondary)' }}>
                <Link to={user._id} className="user-info flex items-center gap-3">
                    <ProfilePicture width={80} src={user?.profile?.url} />
                    <div className="user-details">
                        <h2 style={{ color: 'var(--text-200)' }} className="font-semibold hover:underline">{user?.fullname}</h2>
                        <h3 style={{ color: 'var(--text-300)' }}>{user?.details?.profession}</h3>
                        <p className="text-xs mt-1" style={{ color: 'var(--text-400)' }}>{user?.details?.writesOn.join(' | ')}</p>
                    </div>
                </Link>
                <section className="actions">
                    <Button variant="contained">Follow</Button>
                </section>
            </article>
        )
    }

    const usersCards = (
        <div className="users-list flex flex-col gap-4 mt-10">
            {users?.map(user => <SingleUserCard key={user.id} user={user} />)}
        </div>
    )

    if (isLoading) return <Loader />
    return (
        <div className="wrapper max-w-[800px] mx-auto my-5">
            <header className="heading">
                <h2 style={{ color: 'var(--primary-color)' }}>active users network</h2>
                <p>Connect with fellow users who are currently active and engaging. Discover their interests, follow their updates, and foster meaningful connections within our vibrant community.</p>
            </header>
            <UserSearchBar />

            {usersCards}
        </div>
    )
}

export default AllUsers
