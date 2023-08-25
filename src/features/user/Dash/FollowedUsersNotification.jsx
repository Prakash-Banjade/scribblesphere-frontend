import { Button } from '@mui/material';
import React from 'react'
import {Link} from 'react-router-dom'
import SpinnerLoader from '../../../components/SpinnerLoader';

const FollowedUsersNotification = ({ userDetails, isLoading }) => {
    // console.log(userDetails)
    const following = userDetails?.following;
    // console.log(following?.length)

    if (isLoading) return <SpinnerLoader />
    return (
        <div className="wrapper grow shrink basis-[500px] min-w-[300px]">
            <header className="heading">
                <h2>Your interests</h2>
            </header>

            <section className="interest-container  p-3 rounded-lg" style={{ background: '#0bbe641e' }}>
                {
                    following?.length === 0 ? (
                        <div className="flex flex-col gap-2" style={{color: 'var(--text-200)'}}>
                            <h3 className="sm:text-xl text-lg mb-3">You aren't following any authors!</h3>
                            <p>Explore the creativity of other users.</p>
                            <p className="flex items-center">See active users<Button variant="text" component={Link} to="/authors" sx={{ '&:hover': { textDecoration: 'underline' } }}>here!</Button> </p>
                        </div>
                    ) : <p>Now you are following someone</p>
                }
            </section>
        </div>
    )
}

export default FollowedUsersNotification
