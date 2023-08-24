import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllUsersQuery, useGetUserArticlesQuery, useGetUserByIdQuery } from './userApiSlice';
import Loader from '../../components/Loader';
import ProfilePicture from './ProfilePicture';
import SpinnerLoader from '../../components/SpinnerLoader';
import { formatDistanceToNow } from "date-fns";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin, BsPersonAdd } from 'react-icons/bs'
import { AiOutlineMessage } from 'react-icons/ai'
import { RiUserFollowLine } from 'react-icons/ri'
import useAuth from '../../hooks/useAuth';


const SingleUserPage = () => {
    const { id } = useParams();
    const { data: user, isLoading, isSuccess, isError } = useGetUserByIdQuery(id);
    const { data: articles, isLoading: articlesLoading, isError: articlesError } = useGetUserArticlesQuery({ userId: id, limit: 0 })

    const { userId } = useAuth();

    const { data: allUsers, isLoading: allUsersLoading, isError: allUsersError } = useGetAllUsersQuery();

    // console.log(user);
    // console.log(articles)
    // console.log(user?.following?.length)

    const writesOn = user?.details?.writesOn.map(item => '#' + item.toLowerCase()).join(', ')
    // console.log(writesOn)

    const dateAgo = (date) => formatDistanceToNow(new Date(date))
    const SingleArticle = ({ article }) => {
        return (
            <article>
                <section className="flex flex-col-reverse gap-1">
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-200)' }}>{article?.title}</h3>
                    <h4 className="text-xs" style={{ color: 'var(--text-500' }}>{user?.fullname} posted this {dateAgo(article.createdAt)} ago</h4>
                </section>

                <div className="text-xs mt-5" style={{ color: 'var(--text-400)' }}>{article?.comments?.length} comment(s)</div>

                <hr className='my-4' style={{ borderColor: 'var(--line-color)' }} />
            </article>
        )
    }

    const userArticles = (articlesLoading || isLoading) ? <SpinnerLoader /> : articles?.length !== 0 ? (
        articles.map(article => <SingleArticle key={article._id} article={article} />)
    ) : <p className="text-sm p-3" style={{ color: 'var(--text-300)' }}>No activities from {user?.fullname}</p>


    const userInterests = user?.following?.length !== 0 ? '' : <p className="text-sm p-3" style={{ color: 'var(--text-300)' }}>{user?.fullname} currently has no interests </ p>

    const SingleUserCard = ({ user }) => {
        return (
            <article className="shrink grow basis-[180px] p-3 rounded-md border flex flex-col gap-1.5 items-center justify-center" style={{ borderColor: 'var(--line-color)' }}>
                <Link to={`/authors/${user._id}`} className='flex flex-col items-center justify-center gap-1.5' title={user?.fullname}>
                    <ProfilePicture src={user?.profile?.url} width={50} />
                    <h2 className="text-lg text-center hover:underline" style={{ color: 'var(--text-200)' }}>{user?.fullname}</h2>
                </Link>
                <p className="text-xs text-center" style={{ color: 'var(--text-400)' }}>{user?.details?.profession}</p>

                <Button variant="outlined" size="small" sx={{ padding: '5px 15px', borderRadius: '100px' }} startIcon={<RiUserFollowLine />}>
                    Follow
                </Button>
            </article>
        )
    }

    const otherUsers = allUsersLoading ? <SpinnerLoader /> : allUsersError ? <p className="text-sm p-3" style={{ color: 'var(--text-300)' }}>Failed to fetch other users</ p> : allUsers?.length > 0 && allUsers?.filter(user => (user._id !== id && user._id !== userId)).sort((a, b) => 0.5 - Math.random()).map(user => <SingleUserCard key={user._id} user={user} />)

    // social media setup
    const mediaLogo = {
        facebook: {
            logo: <BsFacebook />,
            color: '#1877F2',
        },
        instagram: {
            logo: <BsInstagram />,
            color: '#E4405F',
        },
        linkedin: {
            logo: <BsLinkedin />,
            color: '#0A66C2',
        },
        twitter: {
            logo: <BsTwitter />,
            color: '#1DA1F2',
        }
    }

    if (isError) return <h3 className="text-xl p-3" style={{ color: 'var(--text-200)' }}>The requested user can't be fetched.</h3>
    if (isLoading) return <Loader />
    return (
        <div className="wrapper flex flex-col md:flex-row gap-5 justify-center flex-wrap">
            <section className="left-section grow shrink basis-[500px] flex flex-col gap-5">
                <div className="profile-overview box" style={{ padding: 0 }}>
                    <section className="min-h-[80px] flex pl-5 pr-5 relative" style={{ background: 'linear-gradient(to bottom right, #0bbe6422, transparent' }}>
                        <div className="translate-y-[60px] rounded-[50%]" style={{ border: '4px solid var(--bg-secondary)' }}>
                            <ProfilePicture src={user?.profile?.url} width={170} />
                        </div>
                        <span className="absolute text-2xl font-semibold w-full text-center content-center top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ color: 'var(--text-500)' }}>Cover photo coming soon!</span>
                    </section>
                    <section className="px-3 sm:px-5 py-2 sm:py-3 pb-0 mt-[60px] flex justify-between flex-wrap gap-3">
                        <header className="heading" style={{ margin: 0 }}>
                            <h2>{user?.fullname}</h2>
                            <p style={{ fontSize: '18px' }}>{user?.details?.profession}</p>
                        </header>
                        <div className="sm:text-lg text-base font-semibold" style={{ color: 'var(--text-200)' }}>{user?.details?.address}</div>
                    </section>
                    {user?.details?.writesOn.length > 0 && <section className="px-3 sm:px-5 py-1 sm:text-base text-xs" style={{ color: 'var(--text-400)' }}>
                        <p>Talks about {writesOn}</p>
                    </section>}
                    <section className="flex gap-5 px-3 sm:px-5 py-1 mb-2 sm:text-base text-xs font-light text-[#1e90ff]">
                        <p>{user?.followers?.length} followers</p>
                        <p>{user?.followers?.length} connections</p>
                    </section>
                    <section className="flex gap-4 px-3 sm:px-5 py-1 mb-2 sm:text-base text-xs font-light">
                        <Button variant="contained" size="small" sx={{ padding: '5px 15px', borderRadius: '100px' }} startIcon={<RiUserFollowLine />}>
                            Follow
                        </Button>
                        <Button variant="outlined" size="small" sx={{ padding: '5px 15px', borderRadius: '100px' }} startIcon={<AiOutlineMessage />}>
                            Message
                        </Button>
                    </section>
                    <section className="flex flex-col gap-5 px-3 sm:px-5 py-1 mb-2 sm:text-base text-xs font-light">
                        {
                            user?.details?.socialLinks?.map(socialLink => (

                                <a href={socialLink.link} rel="noopener noreferrer" key={socialLink.network} target="_blank" className="flex items-center gap-2" style={{ color: 'var(--text-300)' }}>
                                    <span className="text-xl" style={{ color: mediaLogo[socialLink.network].color }}>{mediaLogo[socialLink.network].logo}</span>
                                    {user.fullname}
                                </a>
                            ))
                        }
                    </section>
                </div>
                <div className="profile-about box" style={{ padding: 0 }}>
                    <section className="sm:p-5 p-3">
                        <h3 className="text-2xl mb-4" style={{ color: 'var(--text-200)' }}>About</h3>
                        <p className="sm:text-base text-sm" style={{ color: 'var(--text-300)' }}>{user?.details?.description}</p>
                    </section>
                </div>
                <div className="profile-activity box" style={{ padding: 0 }}>
                    <section className="sm:p-5 p-3">
                        <h3 className="text-2xl mb-4" style={{ color: 'var(--text-200)' }}>Activity</h3>

                        {userArticles}
                    </section>
                </div>
                <div className="profile-interests box" style={{ padding: 0 }}>
                    <section className="sm:p-5 p-3">
                        <h3 className="text-2xl mb-4" style={{ color: 'var(--text-200)' }}>Interests</h3>

                        {userInterests}
                    </section>
                </div>
            </section>
            <section className="right-section grow shrink basis-[200px] flex flex-col gap-5">
                <div className="profile-activity box">
                    <h3 className="text-xl mb-4" style={{ color: 'var(--text-200)' }}>People also search for</h3>

                    <section className="other-interests flex flex-wrap gap-3">
                        {otherUsers}
                    </section>

                </div>

            </section>
        </div>
    )
}

export default SingleUserPage
