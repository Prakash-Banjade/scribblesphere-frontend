import { Button } from '@mui/material';
import React from 'react'
import {Link} from 'react-router-dom'

const FollowedUsersNotification = ({ userDetails }) => {
    // console.log(userDetails)
    const following = userDetails?.following;
    // console.log(following?.length)
    return (
        <div className="wrapper grow shrink basis-[500px]">
            <header className="heading">
                <h2>Your interests</h2>
            </header>

            <section className="interest-container border p-3 rounded-lg" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--line-color)' }}>
                {
                    following?.length === 0 ? (
                        <div className="flex flex-col gap-2" style={{color: 'var(--text-200)'}}>
                            <h3 className="sm:text-xl text-lg mb-3">You aren't following any authors!</h3>
                            <p>Explore the creativity of other users.</p>
                            <p className="flex items-center gap-1">See active users <Button variant="text" component={Link} to="/authors" sx={{ '&:hover': { textDecoration: 'underline' } }}>here!</Button> </p>
                        </div>
                    ) : ''
                }
            </section>
        </div>
    )
}

export default FollowedUsersNotification
